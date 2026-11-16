<template>
  <section id="new-year" class="ny-events" aria-labelledby="ny-events-title">
    <div class="container">
      <div class="ny-events__inner">
        <div class="ny-events__title-wrapper">
          <h2 id="ny-events-title" class="ny-events__title">
            Новогодние мероприятия — встречаем 2027 год вместе!
          </h2>
        </div>

        <div class="ny-events__cards">
          <!-- Новогодние корпоративы -->
          <article
            class="ny-events__card ny-events__card--corporate"
            aria-labelledby="ny-events-corporate-title"
          >
            <img
              class="ny-events__card-image"
              src="/new-year/corporate.jpg"
              alt="Новогодний корпоратив в парк-отеле «Троя»"
            />

            <div class="ny-events__card-content">
              <div class="ny-events__card-main">
                <div class="ny-events__date">
                  <time datetime="2026-12"> Весь декабрь 2026 </time>
                </div>

                <h3
                  id="ny-events-corporate-title"
                  class="ny-events__card-title"
                >
                  Новогодние корпоративы <br>в парк-отеле «Троя»
                </h3>

                <div class="ny-events__corporate-actions">
                  <button
                    class="ny-events__corporate-button"
                    type="button"
                    @click="openForm('corporate')"
                  >
                    Оставить заявку
                  </button>

                  <a
                    class="ny-events__corporate-phone"
                    href="tel:+79384737313"
                    aria-label="Позвонить по номеру +7 938 473-73-13"
                  >
                    +7 (938) 473-73-13
                  </a>
                </div>
              </div>

              <div class="ny-events__description">
                <p>
                  Шоу-программа, ведущий, призы и подарки, Дед Мороз и
                  Снегурочка, стильная фотозона и велком-зона.
                </p>

                <p>
                  Количество свободных дат ограничено. Забронируйте дату по
                  телефону или оставьте заявку.
                </p>
              </div>
            </div>
          </article>

          <!-- Новогодняя ночь -->
          <article
            class="ny-events__card ny-events__card--new-year"
            aria-labelledby="ny-events-party-title"
            ref="corporateCard"
          >
            <div class="ny-events__stars" aria-hidden="true">
              <svg
                v-for="star in corporateStars"
                :key="`${star.id}-${star.generation}`"
                class="ny-events__star"
                :class="[
                  `ny-events__star--${star.type}`,
                  { 'ny-events__star--initial': star.isInitial },
                ]"
                :style="{
                  left: `${star.x}px`,
                  top: `${star.y}px`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  '--star-rotation': `${star.rotation}deg`,
                  '--star-angle': `${star.rotateAngle}deg`,
                  '--star-duration': `${star.duration}s`,
                  '--star-delay': `${star.delay}s`,
                  '--star-min-opacity': star.minOpacity,
                  '--star-max-opacity': star.opacity,
                }"
                @animationend="respawnStar(star.id)"
                viewBox="0 0 16 16"
                fill="none"
              >
                <defs>
                  <linearGradient
                    :id="`star-v-${star.id}`"
                    x1="8"
                    y1="16"
                    x2="8"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      :stop-color="
                        star.type === 'white' ? '#FFFFFF' : '#C34124'
                      "
                      stop-opacity="0"
                    />
                    <stop
                      offset="0.50284"
                      :stop-color="
                        star.type === 'white' ? '#FFFFFF' : '#FBEC78'
                      "
                    />
                    <stop
                      offset="1"
                      :stop-color="
                        star.type === 'white' ? '#FFFFFF' : '#C34124'
                      "
                      stop-opacity="0"
                    />
                  </linearGradient>

                  <linearGradient
                    :id="`star-h-${star.id}`"
                    x1="0"
                    y1="8"
                    x2="16"
                    y2="8"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      :stop-color="
                        star.type === 'white' ? '#FFFFFF' : '#C34124'
                      "
                      stop-opacity="0"
                    />
                    <stop
                      offset="0.50284"
                      :stop-color="
                        star.type === 'white' ? '#FFFFFF' : '#FBEC78'
                      "
                    />
                    <stop
                      offset="1"
                      :stop-color="
                        star.type === 'white' ? '#FFFFFF' : '#C34124'
                      "
                      stop-opacity="0"
                    />
                  </linearGradient>
                </defs>

                <path d="M8 0L8 16" :stroke="`url(#star-v-${star.id})`" />
                <path d="M16 8L0 8" :stroke="`url(#star-h-${star.id})`" />
              </svg>
            </div>
            <div class="ny-events__card-content">
              <div class="ny-events__card-main">
                <div class="ny-events__date">
                  <time datetime="2026-12-31T21:00">
                    31 декабря 2026 года · Начало в 21:00
                  </time>
                </div>

                <h3 id="ny-events-party-title" class="ny-events__card-title">
                  Встречайте Новый год 2027 <br> в ресторане «Свои Люди»!
                </h3>

                <div class="ny-events__description">
                  <p>
                    Вас ждут праздничная атмосфера, харизматичный ведущий,
                    шоу-программа, призы и подарки, Дед Мороз и Снегурочка,
                    стильная фотозона и уютная велком-зона.
                  </p>

                  <p>Можно со своим алкоголем.</p>

                  <p>
                    Забронируйте места по телефону или оставьте заявку — мы
                    свяжемся с вами.
                  </p>
                </div>
              </div>

              <div class="ny-events__card-footer">
                <div class="ny-events__party-actions">
                  <button
                    class="ny-events__party-button"
                    type="button"
                    @click="openForm('night')"
                  >
                    Оставить заявку
                  </button>

                  <a
                    class="ny-events__party-phone"
                    href="tel:+79384737313"
                    aria-label="Позвонить по номеру +7 938 473-73-13"
                  >
                    +7 (938) 473-73-13
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <NewYearRequestModal
      v-for="event in events"
      :key="event.id"
      :event="event"
      :show="openedForm === event.id"
      @update:show="(value) => !value && (openedForm = null)"
    />
  </section>
</template>

<script setup lang="ts">
import NewYearRequestModal from "~/components/newyear/NewYearRequestModal.vue";
import { newYearEvents as events, type NewYearEventId } from "~/data/newYear";

const openedForm = ref<NewYearEventId | null>(null);

const openForm = (id: NewYearEventId) => {
  openedForm.value = id;
};

interface Star {
  id: number;
  generation: number;
  x: number;
  y: number;
  type: "white" | "color";
  size: number;
  rotation: number;
  opacity: number;
  duration: number;
  delay: number;
  minOpacity: number;
  rotateAngle: number;
  isInitial: boolean;
}

const STAR_COUNT = 50;
const STAR_MIN_DISTANCE = 120;

interface StarPosition {
  x: number;
  y: number;
  size: number;
}

const generateStarSize = () => {
  return Math.random() > 0.75 ? 26 + Math.random() * 4 : 18 + Math.random() * 5;
};

const generateStar = (
  id: number,
  width: number,
  height: number,
  existingStars: Star[] = [],
  previousPosition?: StarPosition,
): Star | null => {
  const maxAttempts = 5000;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const size = generateStarSize();

    const x = Math.random() * Math.max(0, width - size);
    const y = Math.random() * Math.max(0, height - size);

    // Центр новой звезды
    const centerX = x + size / 2;
    const centerY = y + size / 2;

    // Проверяем расстояние до всех остальных звёзд
    const isTooClose = existingStars.some((star) => {
      const otherX = star.x + star.size / 2;
      const otherY = star.y + star.size / 2;

      return Math.hypot(centerX - otherX, centerY - otherY) < STAR_MIN_DISTANCE;
    });

    if (isTooClose) continue;

    // Не разрешаем появляться рядом с предыдущим местом этой звезды
    if (previousPosition) {
      const previousX = previousPosition.x + previousPosition.size / 2;
      const previousY = previousPosition.y + previousPosition.size / 2;

      if (
        Math.hypot(centerX - previousX, centerY - previousY) < STAR_MIN_DISTANCE
      ) {
        continue;
      }
    }

    return {
      id,
      x,
      y,
      type: Math.random() > 0.4 ? "color" : "white",
      size,
      rotation: Math.random() * 360,
      opacity: 0.5 + Math.random() * 0.5,
      duration: 5 + Math.random() * 3,
      delay: Math.random() * 1.5,
      minOpacity: 0.12 + Math.random() * 0.18,
      rotateAngle: 8 + Math.random() * 12,
      generation: 0,
      isInitial: true,
    };
  }

  // Если свободного места нет — не создаём звезду с нарушением дистанции
  return null;
};

const generateStars = (
  width: number,
  height: number,
  count: number,
): Star[] => {
  const stars: Star[] = [];

  for (let i = 0; i < count; i++) {
    const star = generateStar(i, width, height, stars);

    if (star) {
      stars.push(star);
    }
  }

  return stars;
};

const corporateStars = ref<Star[]>([]);
const partyStars = ref<Star[]>([]);

const corporateCard = ref<HTMLElement | null>(null);
const partyCard = ref<HTMLElement | null>(null);

const respawnStar = (id: number) => {
  if (!corporateCard.value) return;

  const index = corporateStars.value.findIndex((star) => star.id === id);

  if (index === -1) return;

  const previousStar = corporateStars.value[index];

  const otherStars = corporateStars.value.filter((star) => star.id !== id);

  const newStar = generateStar(
    id,
    corporateCard.value.clientWidth,
    corporateCard.value.clientHeight,
    otherStars,
    {
      x: previousStar.x,
      y: previousStar.y,
      size: previousStar.size,
    },
  );

  // Если место не найдено, оставляем старую звезду и пробуем снова
  if (!newStar) {
    corporateStars.value[index] = {
      ...previousStar,
      generation: previousStar.generation + 1,
      isInitial: false,
      duration: 5 + Math.random() * 3,
      delay: 0,
    };

    return;
  }

  newStar.generation = previousStar.generation + 1;
  newStar.isInitial = false;
  newStar.delay = 0;

  corporateStars.value[index] = newStar;
};

const createCardStars = () => {
  if (corporateCard.value) {
    corporateStars.value = generateStars(
      corporateCard.value.clientWidth,
      corporateCard.value.clientHeight,
      STAR_COUNT,
    );
  }

  if (partyCard.value) {
    partyStars.value = generateStars(
      partyCard.value.clientWidth,
      partyCard.value.clientHeight,
      STAR_COUNT,
    );
  }
};

onMounted(async () => {
  await nextTick();

  createCardStars();

  await nextTick();

  requestAnimationFrame(() => {
    corporateStars.value = corporateStars.value.map((star) => ({
      ...star,
      isInitial: false,
    }));

    partyStars.value = partyStars.value.map((star) => ({
      ...star,
      isInitial: false,
    }));
  });
});
</script>

<style scoped>
/* ========================================
   STAR APPEARANCE + TWINKLE + ROTATION
======================================== */

.ny-events__star {
  position: absolute;
  display: block;
  pointer-events: none;
  overflow: visible;

  animation-duration: var(--star-duration);
  animation-timing-function: linear;
  animation-delay: var(--star-delay);
  animation-iteration-count: 1;
  animation-fill-mode: both;

  will-change: opacity, rotate;
}

.ny-events__star--white {
  animation-name: star-life-white;
}

.ny-events__star--color {
  animation-name: star-life-color;
}

.ny-events__star--initial {
  opacity: var(--star-max-opacity);
  animation: none;
}

.ny-events__star:not(.ny-events__star--initial) {
  animation-name: star-life-white;
  animation-duration: var(--star-duration);
  animation-delay: var(--star-delay);
  animation-iteration-count: 1;
  animation-fill-mode: both;
}

.ny-events__star--color:not(.ny-events__star--initial) {
  animation-name: star-life-color;
}

@keyframes star-life-white {
  0% {
    opacity: 0;
    rotate: calc(var(--star-rotation) - var(--star-angle));
  }

  25% {
    opacity: var(--star-max-opacity);
    rotate: var(--star-rotation);
  }

  50% {
    opacity: var(--star-max-opacity);
    rotate: calc(var(--star-rotation) + var(--star-angle));
  }

  60% {
    opacity: calc(var(--star-max-opacity) * 0.95);
  }

  70% {
    opacity: calc(var(--star-max-opacity) * 0.8);
  }

  80% {
    opacity: calc(var(--star-max-opacity) * 0.55);
  }

  90% {
    opacity: calc(var(--star-max-opacity) * 0.25);
  }

  100% {
    opacity: 0;
    rotate: calc(var(--star-rotation) - var(--star-angle));
  }
}

@keyframes star-life-color {
  0% {
    opacity: 0;
    rotate: calc(var(--star-rotation) - var(--star-angle));
  }

  25% {
    opacity: var(--star-max-opacity);
    rotate: var(--star-rotation);
  }

  50% {
    opacity: var(--star-max-opacity);
    rotate: calc(var(--star-rotation) + var(--star-angle));
  }

  60% {
    opacity: calc(var(--star-max-opacity) * 0.95);
  }

  70% {
    opacity: calc(var(--star-max-opacity) * 0.8);
  }

  80% {
    opacity: calc(var(--star-max-opacity) * 0.55);
  }

  90% {
    opacity: calc(var(--star-max-opacity) * 0.25);
  }

  100% {
    opacity: 0;
    rotate: calc(var(--star-rotation) - var(--star-angle));
  }
}

@media (prefers-reduced-motion: reduce) {
  .ny-events__star {
    animation: none;
    opacity: 1;
    rotate: 0deg;
    will-change: auto;
  }
}

/* ========================================
   NEW YEAR EVENTS
======================================== */

.ny-events {
  scroll-margin-top: 13rem;
}

.ny-events__inner {
  border-radius: 6rem;
  padding: 1.5rem;
  background: var(--noble-black-0);
}

.ny-events__title-wrapper {
  padding: 3rem 6rem;
}

.ny-events__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 3.8rem;
  line-height: 140%;
  letter-spacing: 0;
  color: var(--noble-black-600);
}

/* ========================================
   CARDS
======================================== */

.ny-events__cards {
  display: flex;
  gap: 3rem;
}

.ny-events__card {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border: 0.1rem solid #929292;
  border-radius: 4.5rem;
  padding: 5rem 5rem 3.5rem;
  flex: 1 1 0;
  min-width: 0;
  min-height: 57.8rem;
}

.ny-events__card--corporate {
  background: #222;
}

.ny-events__card--new-year {
  background: #222;
}

/* ========================================
   CARD IMAGE
======================================== */

.ny-events__card-image {
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.8);
}

/* ========================================
   CARD CONTENT
======================================== */

.ny-events__card-content {
  position: relative;
  z-index: 1;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ny-events__card-main {
  min-width: 0;
}

.ny-events__card-footer {
  margin-top: 2.5rem;
}

/* ========================================
   DATE AND TITLES
======================================== */

.ny-events__date {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 2.1rem;
  line-height: 120%;
  color: var(--noble-black-100);
  margin-bottom: 2rem;
}

.ny-events__card-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 3.2rem;
  line-height: 120%;
  color: var(--noble-black-100);
  margin-bottom: 2rem;
  overflow-wrap: break-word;
}

/* ========================================
   DESCRIPTION
======================================== */

.ny-events__description {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  font-family: var(--second-family);
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 120%;
  color: var(--noble-black-100);
}

/* ========================================
   CORPORATE CARD BUTTONS
======================================== */

.ny-events__corporate-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.ny-events__corporate-button {
  border: none;
  border-top: 0.1rem solid var(--glass-stroke);
  border-radius: 2rem;
  padding: 1.5rem 2rem;
  background: var(--glass-modal);
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 150%;
  letter-spacing: 0.01em;
  color: var(--noble-black-100);
  cursor: pointer;
  transition: all 0.25s ease;
}

.ny-events__corporate-button:hover {
  background: rgb(80, 80, 80);
  transform: translateY(-1px);
}

.ny-events__corporate-phone {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-top: 0.1rem solid var(--glass-stroke);
  border-radius: 2rem;
  padding: 1.5rem 2rem;
  background: #fbec78;

  font-family: var(--font-family);
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 150%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  text-decoration: none;
  transition: all 0.25s ease;
}

.ny-events__corporate-phone:hover {
  background-color: var(--sunglow-600);
  box-shadow: 0 12px 24px rgba(226, 180, 43, 0.24);
  color: var(--noble-black-600) !important;
  transform: translateY(-1px);
}

/* ========================================
   NEW YEAR PARTY BUTTONS
======================================== */

.ny-events__party-actions {
  position: relative;
  isolation: isolate;
  padding-top: 2.5rem;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
}

/* Мягкое свечение */
.ny-events__party-actions::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: -5rem;
  left: 50%;
  transform: translate(-50%, 0);

  width: 160%;
  height: 10rem;

  background: radial-gradient(
    ellipse 40% 25% at center,
    rgba(251, 236, 120, 0.65) 0%,
    rgba(251, 236, 120, 0.35) 30%,
    rgba(251, 236, 120, 0.12) 60%,
    transparent 100%
  );

  filter: blur(1.5rem);
  pointer-events: none;
}

/* Градиентная линия */
.ny-events__party-actions::after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);

  width: 100%;
  height: 0.2rem;

  background: linear-gradient(
    90deg,
    rgba(251, 236, 120, 0) 0%,
    #fbec78 50.48%,
    rgba(251, 236, 120, 0) 100%
  );

  pointer-events: none;
}

.ny-events__party-button,
.ny-events__party-phone {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 2rem;
  padding: 1.5rem 4rem;

  font-family: var(--second-family);
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 133%;
  letter-spacing: 0.01em;
  text-decoration: none;

  cursor: pointer;
  transition: all 0.25s ease;
}

.ny-events__party-button {
  background: var(--noble-black-100);
  color: var(--noble-black-600);
}

.ny-events__party-phone {
  background: #fbec78;
  color: var(--noble-black-600);
}

.ny-events__party-button:hover {
  background: #b1b1b1;
  transform: translateY(-1px);
}

.ny-events__party-phone:hover {
  background-color: var(--sunglow-600);
  box-shadow: 0 12px 24px rgba(226, 180, 43, 0.24);
  color: var(--noble-black-600) !important;
  transform: translateY(-1px);
}

@media (max-width: 1300px) {
  .ny-events__card {
    padding: 4rem;
  }
}

/* ========================================
   TABLET
======================================== */

@media (max-width: 1100px) {
  .ny-events__inner {
    border-radius: 4rem;
  }

  .ny-events__title-wrapper {
    padding: 2.5rem 3rem;
  }

  .ny-events__title {
    font-size: 3.2rem;
  }

  .ny-events__cards {
    flex-direction: column;
    gap: 2rem;
  }

  .ny-events__card {
    width: 100%;
    min-height: 48rem;
    padding: 4rem;
  }

  .ny-events__card-title {
    font-size: 3rem;
  }

  .ny-events__date {
    font-size: 2rem;
  }
}

/* ========================================
   MOBILE
======================================== */

@media (max-width: 650px) {
  .ny-events {
    scroll-margin-top: 8rem;
  }

  .ny-events__inner {
    border-radius: 2.5rem;
    padding: 1rem;
  }

  .ny-events__title-wrapper {
    padding: 2rem 1.2rem;
  }

  .ny-events__title {
    font-size: clamp(2.2rem, 6vw, 2.8rem);
    line-height: 125%;
  }

  .ny-events__cards {
    flex-direction: column;
    gap: 1.5rem;
  }

  .ny-events__card {
    width: 100%;
    min-width: 0;
    height: auto;
    border-radius: 2.5rem;
    padding: 2.5rem 2rem;
  }

  .ny-events__card-content {
    gap: 2.5rem;
  }

  .ny-events__card-main {
    width: 100%;
  }

  .ny-events__date {
    font-size: 1.5rem;
    line-height: 135%;
    margin-bottom: 1.5rem;
  }

  .ny-events__card-title {
    font-size: clamp(2.2rem, 5.5vw, 2.6rem);
    line-height: 125%;
    margin-bottom: 1.8rem;
  }

  .ny-events__description {
    font-size: 1.6rem;
    line-height: 140%;
    gap: 1.2rem;
  }

  /* Корпоративы */
  .ny-events__corporate-actions {
    gap: 1rem;
    margin-top: 2rem;
    margin-bottom: 0;
  }

  .ny-events__corporate-button,
  .ny-events__corporate-phone {
    min-height: 5rem;
    padding: 1.3rem 1.5rem;
    border-radius: 1.5rem;
    font-size: 1.6rem;
    text-align: center;
  }

  /* Новогодняя ночь */
  .ny-events__card-footer {
    margin-top: 0;
  }

  .ny-events__party-actions {
    gap: 1rem;
    padding-top: 2rem;
  }

  .ny-events__party-actions::before {
    top: -3rem;
    height: 8rem;
    filter: blur(1.2rem);
  }

  .ny-events__party-actions::after {
    height: 0.1rem;
  }

  .ny-events__party-button,
  .ny-events__party-phone {
    min-height: 5rem;
    padding: 1.3rem 1.5rem;
    border-radius: 1.5rem;
    font-size: 1.6rem;
    text-align: center;
  }
}

/* ========================================
   SMALL MOBILE
======================================== */

@media (max-width: 480px) {
  .ny-events__card {
    min-height: min-content;
  }
}

@media (max-width: 380px) {
  .ny-events__inner {
    padding: 0.8rem;
    border-radius: 2rem;
  }

  .ny-events__title-wrapper {
    padding: 1.8rem 1rem;
  }

  .ny-events__title {
    font-size: 2.2rem;
  }

  .ny-events__card {
    padding: 2rem 1.5rem;
    border-radius: 2rem;
  }

  .ny-events__card-title {
    font-size: 2.1rem;
  }

  .ny-events__date {
    font-size: 1.4rem;
  }

  .ny-events__description {
    font-size: 1.5rem;
  }
}
</style>
