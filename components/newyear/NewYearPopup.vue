<template>
  <transition name="ny-popup">
    <aside
      v-if="visible && !blocked"
      class="ny-popup"
      aria-labelledby="ny-popup-title"
    >
      <button
        type="button"
        class="ny-popup__close"
        aria-label="Закрыть"
        @click="dismiss"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <img
        :src="data.image"
        alt=""
        class="ny-popup__image"
        width="240"
        height="240"
      />

      <div class="ny-popup__content">
        <h2 id="ny-popup-title" class="ny-popup__title">{{ data.title }}</h2>
        <div class="ny-popup__action">
          <p class="ny-popup__text">{{ data.text }}</p>
          <NuxtLink :to="data.link" class="ny-popup__button" @click="remember">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="/svg/icons/inlineSprite.svg#arrow-right-tiny" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </aside>
  </transition>
</template>

<script setup lang="ts">
import { newYearPopup as data, NEW_YEAR_POPUP_UNTIL } from "~/data/newYear";

const STORAGE_KEY = "ny2027PopupClosedAt";
const SHOW_DELAY = 2000;
const HIDE_FOR = 24 * 60 * 60 * 1000; // после закрытия не показываем сутки

// На этих страницах окно лишнее: там уже есть основной блок или юридический текст
const HIDDEN_ON = ["/restaurant", "/banquet", "/privacy", "/consent", "/legal"];

// Пока на экране виджет бронирования или сам новогодний блок, окно убираем,
// чтобы оно не перекрывало бронирование и не дублировало блок
const AVOID_SELECTOR = "";

const route = useRoute();
const visible = ref(false);
const blocked = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;
let observer: IntersectionObserver | undefined;
const onScreen = new Set<Element>();

const watchAvoided = (): boolean => {
  observer?.disconnect();
  onScreen.clear();
  blocked.value = false;

  if (!AVOID_SELECTOR) return false;

  const elements = document.querySelectorAll(AVOID_SELECTOR);

  if (!elements.length) return false;

  if (!("IntersectionObserver" in window)) {
    // Если IntersectionObserver недоступен,
    // не блокируем показ уведомления.
    return false;
  }

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) onScreen.add(entry.target);
      else onScreen.delete(entry.target);
    }

    blocked.value = onScreen.size > 0;

    if (blocked.value) {
      visible.value = false;
      clearTimeout(timer);
    }
  });

  elements.forEach((el) => observer!.observe(el));

  return true;
};

const readClosedAt = () => {
  try {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
};

const remember = () => {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {}
  visible.value = false;
};

const dismiss = remember;

const isAllowedHere = () =>
  !HIDDEN_ON.some(
    (path) => route.path === path || route.path.startsWith(`${path}/`),
  );

const cookieChoiceMade = () => {
  try {
    return localStorage.getItem("cookiesAccepted") !== null;
  } catch {
    return true;
  }
};

const schedule = () => {
  clearTimeout(timer);
  observer?.disconnect();

  visible.value = false;
  blocked.value = false;

  if (Date.now() >= NEW_YEAR_POPUP_UNTIL.getTime()) return;
  if (Date.now() - readClosedAt() < HIDE_FOR) return;
  if (!isAllowedHere()) return;
  if (!cookieChoiceMade()) return;

  // Сначала проверяем, есть ли блоки, которые запрещают показ.
  watchAvoided();

  // Если подходящий блок уже виден, popup не показываем.
  if (blocked.value) return;

  timer = setTimeout(() => {
    if (!isAllowedHere()) return;
    if (blocked.value) return;

    visible.value = true;
  }, SHOW_DELAY);
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && visible.value && !blocked.value) dismiss();
};

watch(() => route.path, schedule);

onMounted(() => {
  schedule();
  window.addEventListener("cookies-choice", schedule);
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  clearTimeout(timer);
  observer?.disconnect();
  window.removeEventListener("cookies-choice", schedule);
  window.removeEventListener("keydown", onKeydown);
});
</script>

<style scoped>

.icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: var(--noble-black-100);
}

/* Появление */
.ny-popup-enter-active {
  animation: ny-popup-premium-in 1.35s cubic-bezier(0.16, 1, 0.3, 1) both;
  transform-origin: left center;
  will-change: transform, opacity, filter;
}

/* Исчезновение */
.ny-popup-leave-active {
  animation: ny-popup-premium-out 0.65s cubic-bezier(0.65, 0, 0.35, 1) both;
  transform-origin: left center;
  will-change: transform, opacity, filter;
}

@keyframes ny-popup-premium-in {
  0% {
    opacity: 0;
    transform: translate3d(calc(-100vw - 120%), 50px, 0) rotate(-7deg) scale(0.8);
    filter: blur(8px);
  }

  65% {
    opacity: 1;
    transform: translate3d(22px, -8px, 0) rotate(1.5deg) scale(1.035);
    filter: blur(0);
  }

  82% {
    transform: translate3d(-6px, 3px, 0) rotate(-0.4deg) scale(0.99);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0) scale(1);
    filter: blur(0);
  }
}

@keyframes ny-popup-premium-out {
  0% {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0) scale(1);
    filter: blur(0);
  }

  35% {
    opacity: 1;
    transform: translate3d(15px, -8px, 0) rotate(2deg) scale(1.02);
  }

  100% {
    opacity: 0;
    transform: translate3d(calc(-100vw - 120%), 55px, 0) rotate(-8deg) scale(0.75);
    filter: blur(7px);
  }
}

/* Основная оболочка */
.ny-popup {
  position: fixed;
  left: 30px;
  bottom: 40px;
  right: auto;
  z-index: 100000;

  display: flex;
  align-items: center;
  gap: 1.5rem;

  width: 47.2rem;
  max-width: calc(100vw - 60px);
  max-height: calc(100dvh - 60px);

  overflow-y: auto;
  overflow-x: hidden;

  border: 1px solid #929292;
  border-radius: 25px;
  padding: 10px;

  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);

  background: rgba(92, 80, 61, 0.6);
  box-shadow: 0 16px 40px rgba(13, 15, 16, 0.35);
}

/* Изображение */
.ny-popup__image {
  flex: 0 0 11rem;
  width: 11rem;
  height: 13rem;

  border-radius: 1.5rem;
  object-fit: cover;
  object-position: right center;
}

/* Контент */
.ny-popup__content {
  flex: 1;
  min-width: 0;
  padding-right: 0.5rem;
}

.ny-popup__title {
  margin-bottom: 1.1rem;
  padding-right: 2rem;

  font-family: var(--second-family);
  font-weight: 500;
  font-size: 22px;
  line-height: 120%;
  color: var(--noble-black-100);
}

.ny-popup__action {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.ny-popup__text {
  flex: 1;
  min-width: 0;
  margin: 0;

  font-family: var(--second-family);
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  color: var(--gray-100);
}

.ny-popup__button {
  flex: 0 0 auto;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 4.4rem;
  min-height: 4.4rem;

  border: 1px solid #fbec78;
  border-radius: 20px;
  padding: 10px;

  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.ny-popup__button:visited {
  color: var(--noble-black-600);
}

/* Кнопка закрытия */
.ny-popup__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 2.8rem;
  height: 2.8rem;

  border-radius: 50%;
  background: rgba(163, 163, 163, 0.8);
  color: var(--white);

  transition: background-color 0.2s ease;
}

.ny-popup__close svg {
  width: 1.8rem;
  height: 1.8rem;
}

.ny-popup__close:focus-visible,
.ny-popup__button:focus-visible {
  outline: 2px solid #fbec78;
  outline-offset: 2px;
}

@media (hover: hover) {
  .ny-popup__button:hover {
    background: var(--sunglow-600);
    color: var(--noble-black-600);
    transform: translateY(-2px);
  }

  .ny-popup__close:hover {
    background: rgba(255, 255, 255, 0.5);
  }
}

/* Небольшие ноутбуки */
@media (max-width: 1100px) {
  .ny-popup {
    width: 43rem;
    gap: 1.2rem;
  }

  .ny-popup__image {
    flex-basis: 10rem;
    width: 10rem;
    height: 12rem;
  }

  .ny-popup__title {
    font-size: 20px;
  }

  .ny-popup__text {
    font-size: 16px;
  }
}

/* Планшеты */
@media (max-width: 768px) {
  .ny-popup {
    left: 20px;
    bottom: 30px;
    width: 39rem;
    max-width: calc(100vw - 40px);
    gap: 1rem;
    border-radius: 22px;
  }

  .ny-popup__image {
    flex-basis: 9rem;
    width: 9rem;
    height: 11rem;
    border-radius: 1.2rem;
  }

  .ny-popup__title {
    font-size: 18px;
    margin-bottom: 0.8rem;
  }

  .ny-popup__text {
    font-size: 15px;
    line-height: 130%;
  }

  .ny-popup__action {
    gap: 0.8rem;
  }

  .ny-popup__button {
    min-width: 4rem;
    min-height: 4rem;
    border-radius: 15px;
  }

  .ny-popup__close {
    top: 0.8rem;
    right: 0.8rem;
  }
}

/* Телефоны */
@media (max-width: 575px) {
  .ny-popup {
    left: 1.2rem;
    right: 1.2rem;
    bottom: max(16px, env(safe-area-inset-bottom));
    width: auto;
    max-width: none;
    max-height: calc(100dvh - 32px);
    padding: 1.4rem 1.4rem 1.5rem;
    border-radius: 20px;
  }

  .ny-popup__content {
    width: 100%;
    padding-right: 0;
  }

  .ny-popup__title {
    padding-right: 3rem;
    margin-bottom: 0.8rem;
    font-size: 17px;
    line-height: 125%;
  }

  .ny-popup__action {
    gap: 1rem;
    align-items: center;
  }

  .ny-popup__text {
    font-size: 13px;
    line-height: 135%;
  }

  .ny-popup__button {
    min-width: 3.8rem;
    min-height: 3.8rem;
    padding: 0.7rem;
    border-radius: 13px;
  }

  .ny-popup__button .icon {
    width: 2rem;
    height: 2rem;
  }

  .ny-popup__close {
    top: 0.8rem;
    right: 0.8rem;
    width: 2.6rem;
    height: 2.6rem;
  }
}

/* Очень узкие экраны */
@media (max-width: 360px) {
  .ny-popup {
    left: 0.8rem;
    right: 0.8rem;
    padding: 1.2rem;
  }

  .ny-popup__title {
    font-size: 15px;
  }

  .ny-popup__text {
    font-size: 12px;
  }

  .ny-popup__action {
    gap: 0.6rem;
  }

  .ny-popup__button {
    min-width: 3.4rem;
    min-height: 3.4rem;
  }
}

/* Низкие экраны */
@media (max-height: 500px) and (min-width: 576px) {
  .ny-popup {
    bottom: 12px;
    max-height: calc(100dvh - 24px);
  }

  .ny-popup__image {
    height: 9rem;
  }
}

/* Адаптация анимации на мобильных */
@media (max-width: 575px) {
  .ny-popup-enter-active {
    animation-duration: 1.1s;
  }

  .ny-popup-leave-active {
    animation-duration: 0.5s;
  }

  @keyframes ny-popup-premium-in {
    0% {
      opacity: 0;
      transform: translate3d(calc(-100vw - 120%), 25px, 0) rotate(-5deg) scale(0.88);
      filter: blur(5px);
    }

    65% {
      opacity: 1;
      transform: translate3d(12px, -4px, 0) rotate(1deg) scale(1.025);
      filter: blur(0);
    }

    82% {
      transform: translate3d(-4px, 2px, 0) rotate(-0.25deg) scale(0.99);
    }

    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0) rotate(0) scale(1);
      filter: blur(0);
    }
  }
}

/* Учитываем настройки пользователя */
@media (prefers-reduced-motion: reduce) {
  .ny-popup-enter-active,
  .ny-popup-leave-active {
    animation: none;
  }

  .ny-popup-enter-from,
  .ny-popup-leave-to {
    opacity: 0;
  }
}

</style>
