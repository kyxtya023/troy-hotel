// Новогодние мероприятия 2026–2027 (ТЗ v1.4 от 26.10.2026).
// Тексты утверждены заказчиком — не дополнять условиями, ценами и меню.

export type NewYearEventId = "corporate" | "night";

export interface NewYearEvent {
  id: NewYearEventId;
  /** Короткое название части блока */
  label: string;
  title: string;
  when: string;
  text: string[];
  phone: string;
  phoneHref: string;
  /** Тип формы для /api/mail */
  formType: "ny_corporate" | "ny_night";
  formTitle: string;
  /** Идентификатор цели Яндекс Метрики */
  goal: string;
  image: { src: string; srcMobile: string; alt: string };
}

export const newYearPopup = {
  title: "Встречайте Новый год в «Трое»",
  text: "Подробнее о мероприятиях",
  link: "/restaurant#new-year",
  image: "/new-year/popup.jpg",
};

export const newYearEvents: NewYearEvent[] = [
  {
    id: "corporate",
    label: "Новогодние корпоративы",
    title: "Новогодние корпоративы в парк-отеле «Троя»",
    when: "Весь декабрь 2026 года",
    text: [
      "Шоу-программа, ведущий, призы и подарки, Дед Мороз и Снегурочка, стильная фотозона и велком-зона.",
      "Количество свободных дат ограничено. Забронируйте дату по телефону или оставьте заявку.",
    ],
    phone: "+7 938 473-73-13",
    phoneHref: "tel:+79384737313",
    formType: "ny_corporate",
    formTitle: "Заявка на новогодний корпоратив",
    goal: "ny_corporate_form_submit",
    image: {
      src: "/new-year/corporate-party.jpg",
      srcMobile: "/new-year/corporate-party.jpg",
      alt: "Коллеги поднимают бокалы за праздничным столом у новогодней ёлки",
    },
  },
  {
    id: "night",
    label: "Новогодняя ночь",
    title: "Встречайте Новый год 2027 в ресторане «Свои Люди»!",
    when: "31 декабря 2026 года · Начало в 21:00",
    text: [
      "Вас ждут праздничная атмосфера, харизматичный ведущий, шоу-программа, призы и подарки, Дед Мороз и Снегурочка, стильная фотозона и уютная велком-зона.",
      "Можно со своим алкоголем.",
      "Забронируйте места по телефону или оставьте заявку — мы свяжемся с вами.",
    ],
    phone: "+7 938 473-73-13",
    phoneHref: "tel:+79384737313",
    formType: "ny_night",
    formTitle: "Заявка на новогоднюю ночь",
    goal: "ny_night_form_submit",
    image: {
      src: "/new-year/night.jpg",
      srcMobile: "/new-year/night.jpg",
      alt: "Тёплые огни и свечи в ресторане «Свои Люди»",
    },
  },
];

/** После этой даты всплывающее окно больше не показывается */
export const NEW_YEAR_POPUP_UNTIL = new Date("2027-01-01T00:00:00+03:00");
