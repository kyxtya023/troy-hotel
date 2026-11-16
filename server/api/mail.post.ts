import nodemailer from "nodemailer";
import { defineEventHandler, readBody } from "h3";

type FormType =
  | "banquet"
  | "banquet-price"
  | "banquet_feedback"
  | "booking"
  | "group_booking"
  | "conference"
  | "conference-price"
  | "ny_corporate"
  | "ny_night";

const NEW_YEAR_FORMS: Partial<Record<FormType, string>> = {
  ny_corporate: "Заявка на новогодний корпоратив",
  ny_night: "Заявка на новогоднюю ночь",
};

// // Защита от повторной отправки: одна и та же заявка (форма + телефон) раз в минуту
const RESUBMIT_WINDOW = 60 * 1000;
const recentRequests = new Map<string, number>();

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export default defineEventHandler(async (event) => {
  const body = await readBody<{ type: FormType; form: Record<string, any> }>(event);
  const { type, form } = body;

  const config = useRuntimeConfig(event);

  if (!form || typeof form !== "object") {
    return { ok: false, message: "Пустая заявка" };
  }

  const isNewYear = Object.hasOwn(NEW_YEAR_FORMS, type);

  if (isNewYear) {
    // Ловушка для ботов заполнена или форма отправлена мгновенно — молча пропускаем
    if (form.website || Number(form.elapsed) < 1500) {
      return { ok: false, skipped: true, message: "Заявка отклонена" };
    }

    const name = String(form.name ?? "").trim();
    const phoneDigits = String(form.phone ?? "").replace(/\D/g, "");
    if (!form.consent || !name || name.length > 100 || phoneDigits.length < 10 || phoneDigits.length > 15) {
      return { ok: false, message: "Проверьте имя и телефон" };
    }

    const key = `${type}:${phoneDigits}`;
    const now = Date.now();
    for (const [k, time] of recentRequests) {
      if (now - time > RESUBMIT_WINDOW) recentRequests.delete(k);
    }
    // Повтор той же заявки считаем доставленным, второе письмо не шлём
    if (recentRequests.has(key)) {
      return { ok: true, duplicate: true };
    }
    recentRequests.set(key, now);
  }

  // Если пользователь не дал согласие, письмо не отправляем
  if (!form.consent) {
    return {
      ok: false,
      skipped: true,
      message: "Пользователь не дал согласие на обработку данных, письмо не отправлено"
    };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: config.mailUser,
      pass: config.mailPass,
    },
  });

  const date = new Date().toLocaleString();

  const wrapHtml = (title: string, content: string) => `
    <div style="font-family: Stem, Arial, sans-serif; color: #1c1c1c;">
      <h2 style="
        font-weight: 500;
        font-size: 32px;
        line-height: 140%;
        color: #1c1c1c;
        margin-bottom: 20px;
      ">${title}</h2>
      ${content}
      <p style="font-family: Stem, Arial, sans-serif; font-weight: 300; font-size: 14px; color: #666; margin-top: 20px;">Дата подачи: ${date}</p>
    </div>
  `;

  const row = (label: string, value: string) => `
    <p style="font-family: Stem, Arial, sans-serif; font-weight: 300; font-size: 18px; line-height: 140%; color: #1c1c1c;">
      <strong style="font-weight: 500;">${label}:</strong> ${escapeHtml(value)}
    </p>
  `;

  // Добавляем строку с согласием
  const consentRow = row("Согласие на обработку персональных данных", form.consent ? "Да" : "Нет");

  let subject = "";
  let html = "";

  switch (type) {
    case "banquet":
      subject = `[Банкет] Заявка от ${form.name} (${form.phone})`;
      html = wrapHtml(
        "Заявка на банкет",
        row("Имя", form.name) +
        row("Телефон", form.phone) +
        row("Вопрос", form.question || "-") +
        consentRow
      );
      break;

    case "banquet-price":
      subject = `[Банкет расчет] Заявка от ${form.name} (${form.phone})`;
      html = wrapHtml(
        "Расчет стоимости банкета",
        row("Имя", form.name) +
        row("Телефон", form.phone) +
        row("Количество людей и дата", form.question || "-") +
        consentRow
      );
      break;

    case "banquet_feedback":
      subject = `[Обратная связь банкет] Сообщение от ${form.name}`;
      html = wrapHtml(
        "Сообщение с сайта",
        row("Имя", form.name) +
        row("Телефон", form.phone) +
        row("Вопрос / Комментарий", form.question || "-") +
        consentRow
      );
      break;

    case "group_booking":
      subject = `[Групповое бронирование] ${form.name} (${form.phone})`;
      html = wrapHtml(
        "Групповое бронирование",
        row("Имя", form.name) +
        row("Телефон", form.phone) +
        row("Вопрос / Комментарий", form.question || "-") +
        consentRow
      );
      break;

    case "conference":
      subject = `[Конференция] ${form.name} (${form.phone})`;
      html = wrapHtml(
        "Заявка от конференции",
        row("Имя", form.name) +
        row("Телефон", form.phone) +
        row("Количество людей и дата", form.question || "-") +
        consentRow
      );
      break;

    case "conference-price":
      subject = `[Конференции расчет] Заявка от ${form.name} (${form.phone})`;
      html = wrapHtml(
        "Расчет стоимости конферц.зала",
        row("Имя", form.name) +
        row("Телефон", form.phone) +
        row("Количество людей и дата", form.question || "-") +
        consentRow
      );
      break;

    case "ny_corporate":
    case "ny_night":
      subject = `[${NEW_YEAR_FORMS[type]}] ${String(form.name).trim()} (${form.phone})`;
      html = wrapHtml(
        NEW_YEAR_FORMS[type]!,
        row("Имя", String(form.name).trim()) +
        row("Телефон", form.phone) +
        consentRow
      );
      break;

    default:
      subject = `[Неизвестная форма]`;
      html = wrapHtml(
        "Данные формы",
        `<pre>${escapeHtml(JSON.stringify(form, null, 2))}</pre>` + consentRow
      );
  }

  try {
    await transporter.sendMail({
      from: `"Сайт Парк-отель Троя" <${config.mailUser}>`,
      to: config.mailTo,
      subject,
      html,
      replyTo: form.email || undefined,
    });

    return { ok: true };
  } catch (err: any) {
    console.error("Ошибка при отправке письма:", err);
//     // Письмо не ушло — разрешаем отправить заявку повторно
    if (isNewYear) {
      recentRequests.delete(`${type}:${String(form.phone ?? "").replace(/\D/g, "")}`);
    }
    return { ok: false, error: err.message };
  }
});
