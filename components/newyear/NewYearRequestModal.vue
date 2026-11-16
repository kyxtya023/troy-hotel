<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="show" class="ny-modal-backdrop" @click.self="close">
        <div
          ref="dialogRef"
          class="ny-modal"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`${idPrefix}-title`"
        >
          <button
            type="button"
            class="ny-modal__close"
            aria-label="Закрыть"
            @click="close"
          >
            <svg class="ny-modal__close-icon" aria-hidden="true">
              <use xlink:href="/svg/icons/inlineSprite.svg#cross" />
            </svg>
          </button>

          <div class="ny-modal__media" aria-hidden="true">
            <img
              :src="event.image.srcMobile"
              alt=""
              class="ny-modal__image"
              width="640"
              height="400"
              decoding="async"
            />
          </div>

          <!-- Правая часть: контент -->
          <div class="ny-modal__content">
            <template v-if="status === 'success'">
              <div class="ny-modal__success" role="status">
                <span class="ny-modal__success-mark" aria-hidden="true">
                  <svg>
                    <use xlink:href="/svg/icons/inlineSprite.svg#check" />
                  </svg>
                </span>

                <h2 :id="`${idPrefix}-title`" class="ny-modal__title">
                  Спасибо! Ваша заявка отправлена. С вами свяжутся
                </h2>

                <Button
                  tag="button"
                  label="Закрыть"
                  color="black"
                  size="large"
                  @click="close"
                />
              </div>
            </template>

            <template v-else>
              <h2 :id="`${idPrefix}-title`" class="ny-modal__title">
                {{ event.formTitle }}
              </h2>

              <p class="ny-modal__subtitle">
                {{ event.when }}
              </p>

              <form
                class="ny-modal__form"
                novalidate
                @submit.prevent="onSubmit"
              >
                <div class="ny-modal__field">
                  <label :for="`${idPrefix}-name`">Имя</label>

                  <Field
                    :id="`${idPrefix}-name`"
                    ref="nameRef"
                    name="name"
                    type="text"
                    autocomplete="name"
                    placeholder="Введите имя"
                  />

                  <ErrorMessage name="name" class="ny-modal__error" />
                </div>

                <div class="ny-modal__field">
                  <label :for="`${idPrefix}-phone`">Телефон</label>

                  <Field
                    :id="`${idPrefix}-phone`"
                    name="phone"
                    type="tel"
                    autocomplete="tel"
                    inputmode="tel"
                    placeholder="+7 (XXX) XXX-XX-XX"
                    @input="onPhoneInput"
                  />

                  <ErrorMessage name="phone" class="ny-modal__error" />
                </div>

                <!-- Ловушка для ботов -->
                <div class="ny-modal__trap" aria-hidden="true">
                  <label :for="`${idPrefix}-website`">Сайт</label>
                  <input
                    :id="`${idPrefix}-website`"
                    v-model="trap"
                    type="text"
                    tabindex="-1"
                    autocomplete="off"
                  />
                </div>

                <div class="ny-modal__field">
                  <label class="ny-modal__consent">
                    <Field
                      type="checkbox"
                      name="consent"
                      :value="true"
                      :unchecked-value="false"
                    />

                    <span>
                      Я ознакомлен(а) с
                      <nuxt-link to="/privacy" target="_blank" rel="noopener">
                        Политикой конфиденциальности
                      </nuxt-link>
                      и даю
                      <nuxt-link to="/consent" target="_blank" rel="noopener">
                        согласие на обработку моих персональных данных
                      </nuxt-link>
                    </span>
                  </label>

                  <ErrorMessage name="consent" class="ny-modal__error" />
                </div>

                <p
                  v-if="status === 'error'"
                  class="ny-modal__alert"
                  role="alert"
                >
                  Заявка не отправилась. Попробуйте ещё раз или позвоните
                  <a :href="event.phoneHref">{{ event.phone }}</a>
                </p>

                <Button
                  tag="button"
                  :label="
                    status === 'sending' ? 'Отправляем…' : 'Отправить заявку'
                  "
                  color="yellow"
                  size="large"
                  :disabled="status === 'sending'"
                  custom-class="ny-modal__submit"
                />
              </form>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "~/components/ui/VButton.vue";
import { phoneValidator } from "~/utils/phoneValidation";
import { formatPhoneNumber } from "~/utils/phoneFormatting";
import type { NewYearEvent } from "~/data/newYear";

const props = defineProps<{
  show: boolean;
  event: NewYearEvent;
}>();

const emit = defineEmits<{
  (e: "update:show", value: boolean): void;
}>();

const idPrefix = `ny-${props.event.id}`;
const status = ref<"idle" | "sending" | "success" | "error">("idle");
const trap = ref("");
const openedAt = ref(0);
const dialogRef = ref<HTMLElement | null>(null);

const { handleSubmit, setFieldValue, resetForm } = useForm({
  validationSchema: yup.object({
    name: yup
      .string()
      .trim()
      .required("Введите имя")
      .max(100, "Слишком длинное имя"),
    phone: phoneValidator.required("Введите телефон"),
    consent: yup.boolean().oneOf([true], "Нужно согласие на обработку данных"),
  }),
  initialValues: { name: "", phone: "", consent: false },
});

const reachGoal = (goal: string) => {
  try {
    window.ym(53290438, "reachGoal", goal);
    window.ym(53290438, "reachGoal", "form_submit_any");
    console.log("[YandexMetrika] Цель отправлена:", goal);
  } catch (error) {
    console.error("[YandexMetrika] Ошибка при отправке цели:", goal, error);
  }
};

const onSubmit = handleSubmit(async (values) => {
  // Повторный клик во время отправки игнорируем
  if (status.value === "sending") return;
  status.value = "sending";

  try {
    const res = await $fetch<{ ok: boolean }>("/api/mail", {
      method: "POST",
      body: {
        type: props.event.formType,
        form: {
          ...values,
          website: trap.value,
          elapsed: Date.now() - openedAt.value,
        },
      },
    });

    if (res.ok) {
      status.value = "success";
      reachGoal(props.event.goal);
    } else {
      status.value = "error";
    }
  } catch (error) {
    console.error("Ошибка отправки заявки:", error);
    status.value = "error";
  }
});

const onPhoneInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  setFieldValue("phone", formatPhoneNumber(target.value));
};

const close = () => {
  if (status.value === "sending") return;
  emit("update:show", false);
};

watch(
  () => props.show,
  async (open) => {
    if (!import.meta.client) return;
    document.body.classList.toggle("_lock", open);

    if (open) {
      openedAt.value = Date.now();
      if (status.value !== "sending") status.value = "idle";
      await nextTick();
      dialogRef.value?.querySelector<HTMLInputElement>("input")?.focus();
    } else if (status.value === "success") {
      resetForm();
      trap.value = "";
    }
  },
);

onBeforeUnmount(() => {
  if (import.meta.client) document.body.classList.remove("_lock");
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* =========================
   BACKDROP
========================= */

.ny-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2rem;

  background: rgba(0, 0, 0, 0.6);
  overflow-y: auto;
  overscroll-behavior: contain;
}

/* =========================
   MODAL
========================= */

.ny-modal {
  position: relative;

  display: flex;
  align-items: stretch;

  width: 100%;
  max-width: 85rem;
  max-height: calc(100dvh - 4rem);
  min-height: 0;

  overflow: hidden;

  padding: 1rem;
  border: 1px solid #929292;
  border-radius: 25px;

  backdrop-filter: blur(25px);
  background: rgba(92, 80, 61, 0.6);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
}

/* =========================
   MEDIA
========================= */

.ny-modal__media {
  position: relative;

  flex: 0 0 42%;
  min-width: 0;
  min-height: 0;

  overflow: hidden;
  border-radius: 15px;

  background: var(--noble-black-700);
}

.ny-modal__image {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;
}

.ny-modal__media::after {
  content: "";

  position: absolute;
  inset: 0;

  background: linear-gradient(
    to bottom,
    rgba(19, 22, 25, 0.55) 0%,
    rgba(19, 22, 25, 0.15) 35%,
    rgba(19, 22, 25, 0) 65%
  );

  pointer-events: none;
}

.ny-modal__garland {
  position: absolute;
  top: 0;
  left: 1.6rem;
  right: 1.6rem;

  z-index: 1;
}

/* =========================
   CLOSE
========================= */

.ny-modal__close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 5;

  width: 4rem;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);

  box-shadow: 0 4px 12px rgba(13, 15, 16, 0.2);

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.ny-modal__close-icon {
  display: block;
  width: 2.2rem;
  height: 2.2rem;

  stroke: var(--noble-black-800);
}

/* =========================
   CONTENT
========================= */

.ny-modal__content {
  position: relative;

  flex: 1;
  min-width: 0;
  min-height: 0;

  overflow-y: auto;
  overscroll-behavior: contain;

  padding: clamp(2.8rem, 4vw, 5rem);
  scrollbar-width: thin;
}

/* =========================
   TITLES
========================= */

.ny-modal__title {
  margin-bottom: 1rem;
  padding-right: 3rem;

  font-family: var(--second-family);
  font-weight: 500;
  font-size: clamp(2.2rem, 2.5vw, 2.8rem);
  line-height: 120%;

  color: var(--noble-black-100);
}

.ny-modal__subtitle {
  margin-bottom: 2.8rem;

  font-family: var(--second-family);
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 130%;

  color: var(--gray-100);
}

/* =========================
   FORM
========================= */

.ny-modal__form {
  width: 100%;
}

.ny-modal__field {
  display: flex;
  flex-direction: column;

  margin-bottom: 2rem;
}

.ny-modal__field > label {
  margin-bottom: 0.5rem;

  font-family: var(--second-family);
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 140%;

  color: var(--noble-black-300);
}

.ny-modal__field input[type="text"],
.ny-modal__field input[type="tel"] {
  width: 100%;
  min-width: 0;
  min-height: 4.8rem;

  padding: 1rem 1.2rem;

  border: 1px solid #ddd;
  border-radius: 8px;

  font-family: var(--second-family);
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 140%;

  color: var(--noble-black-600);

  transition: border-color 0.2s ease;
}

.ny-modal__field input[type="text"]:focus,
.ny-modal__field input[type="tel"]:focus {
  border-color: var(--noble-black-600);
}

/* =========================
   CONSENT
========================= */

.ny-modal__field .ny-modal__consent {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  font-size: 1.5rem;
  line-height: 145%;

  color: var(--noble-black-100);

  cursor: pointer;
}

.ny-modal__consent input {
  flex-shrink: 0;

  width: 1.8rem;
  height: 1.8rem;

  margin-top: 0.3rem;

  accent-color: var(--noble-black-600);
}

.ny-modal__consent a {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: inherit;
  line-height: inherit;

  color: var(--gray-100);
  text-decoration: underline;
}

/* =========================
   ERRORS
========================= */

.ny-modal__error {
  margin-top: 0.4rem;

  font-family: var(--second-family);
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 140%;

  color: var(--red-power-600);
}

.ny-modal__alert {
  margin-bottom: 2rem;
  padding: 1.2rem 1.6rem;

  border-radius: 1.2rem;
  background: var(--red-power-100);

  font-size: 1.5rem;
  line-height: 140%;

  color: var(--red-power-900);
}

.ny-modal__alert a {
  color: inherit;
  font-weight: 500;
  text-decoration: underline;
}

/* =========================
   TRAP
========================= */

.ny-modal__trap {
  position: absolute;
  left: -9999px;

  width: 1px;
  height: 1px;

  overflow: hidden;
}

/* =========================
   SUBMIT
========================= */

.ny-modal :deep(.ny-modal__submit) {
  width: 100%;
  min-height: 5.6rem;
}

/* =========================
   SUCCESS
========================= */

.ny-modal__success {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.4rem;
}

.ny-modal__success-mark {
  width: 5.6rem;
  height: 5.6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;
  background: #fbec78;
}

.ny-modal__success-mark svg {
  width: 2.8rem;
  height: 2.8rem;

  stroke: var(--noble-black-600);
}

/* =========================
   HOVER / FOCUS
========================= */

@media (hover: hover) {
  .ny-modal__close:hover {
    background: #fbec78;
    transform: rotate(90deg);
  }
}

.ny-modal__close:focus-visible,
.ny-modal :deep(a:focus-visible),
.ny-modal :deep(button:focus-visible) {
  outline: 2px solid #fbec78;
  outline-offset: 3px;
}

/* =========================
   SMALL DESKTOP
========================= */

@media (max-width: 1100px) {
  .ny-modal {
    max-width: 75rem;
  }

  .ny-modal__media {
    flex-basis: 38%;
  }

  .ny-modal__content {
    padding: 3rem;
  }

  .ny-modal__title {
    font-size: 2.4rem;
  }

  .ny-modal__subtitle {
    margin-bottom: 2rem;
    font-size: 1.6rem;
  }

  .ny-modal__field {
    margin-bottom: 1.6rem;
  }
}

/* =========================
   MOBILE
========================= */

@media (max-width: 768px) {
  .ny-modal-backdrop {
    align-items: center;
    padding: 1.2rem;
  }

  .ny-modal {
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 42rem;

    max-height: calc(100dvh - 2.4rem);

    padding: 0.8rem;

    border-radius: 2rem;
  }

  /* Фото сверху */

  .ny-modal__media {
    flex: 0 0 auto;

    width: 100%;
    height: clamp(12rem, 27vw, 17rem);
    min-height: 12rem;
    max-height: 17rem;

    border-radius: 1.4rem;
  }

  .ny-modal__image {
    object-position: center 40%;
  }

  .ny-modal__garland {
    left: 1rem;
    right: 4.5rem;
  }

  /* Контент снизу */

  .ny-modal__content {
    flex: 1 1 auto;

    width: 100%;
    min-height: 0;

    padding: 2rem 1.4rem 1.6rem;

    overflow-y: auto;
  }

  /* Закрытие поверх фотографии */

  .ny-modal__close {
    top: 1.4rem;
    right: 1.4rem;

    width: 3.6rem;
    height: 3.6rem;

    background: rgba(255, 255, 255, 0.9);
  }

  .ny-modal__close-icon {
    width: 2rem;
    height: 2rem;
  }

  /* Заголовки */

  .ny-modal__title {
    margin-bottom: 0.8rem;
    padding-right: 0;

    font-size: 2.2rem;
    line-height: 125%;
  }

  .ny-modal__subtitle {
    margin-bottom: 1.8rem;

    font-size: 1.5rem;
    line-height: 140%;
  }

  /* Поля */

  .ny-modal__field {
    margin-bottom: 1.5rem;
  }

  .ny-modal__field > label {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  .ny-modal__field input[type="text"],
  .ny-modal__field input[type="tel"] {
    min-height: 4.6rem;
    padding: 0.9rem 1.1rem;

    font-size: 1.5rem;
  }

  /* Согласие */

  .ny-modal__field .ny-modal__consent {
    gap: 0.8rem;

    font-size: 1.25rem;
    line-height: 145%;
  }

  .ny-modal__consent input {
    width: 1.6rem;
    height: 1.6rem;
    margin-top: 0.2rem;
  }

  /* Ошибки */

  .ny-modal__error {
    font-size: 1.3rem;
  }

  .ny-modal__alert {
    margin-bottom: 1.5rem;
    padding: 1rem 1.2rem;

    font-size: 1.3rem;
  }

  /* Кнопка */

  .ny-modal :deep(.ny-modal__submit) {
    min-height: 5rem;
  }

  /* Успешная отправка */

  .ny-modal__success {
    gap: 1.8rem;
  }

  .ny-modal__success-mark {
    width: 4.8rem;
    height: 4.8rem;
  }

  .ny-modal__success-mark svg {
    width: 2.4rem;
    height: 2.4rem;
  }
}

/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 380px) {
  .ny-modal__media {
    height: 12rem;
  }

  .ny-modal__content {
    padding: 1.6rem 1rem 1.2rem;
  }

  .ny-modal__title {
    font-size: 1.9rem;
  }

  .ny-modal__subtitle {
    font-size: 1.35rem;
    margin-bottom: 1.4rem;
  }

  .ny-modal__field {
    margin-bottom: 1.2rem;
  }

  .ny-modal__field .ny-modal__consent {
    font-size: 1.15rem;
  }

  .ny-modal__close {
    top: 1.2rem;
    right: 1.2rem;

    width: 3.2rem;
    height: 3.2rem;
  }
}

/* =========================
   LOW HEIGHT
========================= */

@media (max-height: 650px) and (min-width: 576px) {
  .ny-modal-backdrop {
    align-items: flex-start;
  }

  .ny-modal {
    max-height: none;
  }

  .ny-modal__media {
    min-height: 48rem;
  }
}

/* =========================
   REDUCED MOTION
========================= */

@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }

  .ny-modal__close {
    transition: none;
  }
}
</style>
