<template>
  <section class="services">
    <div class="container">
      <div class="services__inner">
        <h2 class="services__title title">Ваш комфорт в деталях</h2>

        <div class="services__desktop">
          <div class="services__grid">
            <article
              v-for="(item, idx) in services"
              :key="`desktop-${idx}`"
              class="service"
              :class="{ 'is-open': openIndex === idx }"
              :style="{ '--delay': `${idx * 70}ms` }"
              tabindex="0"
              @mouseenter="onEnter(idx)"
              @mouseleave="onLeave"
              @focus="onEnter(idx)"
              @blur="onLeave"
            >
              <div class="service__decor" aria-hidden="true"></div>

              <div
                class="service__icon"
                aria-hidden="true"
                v-html="item.icon"
              ></div>

              <h3 class="service__name">{{ item.title }}</h3>

              <div class="service__spacer"></div>

              <div class="service__bottom">
                <span class="service__more">
                  <span class="service__more-label">Подробнее</span>
                  <svg
                    class="service__more-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>

                <p class="service__text">{{ item.description }}</p>
              </div>
            </article>
          </div>
        </div>

        <ClientOnly>
          <div class="services__mobile">
            <swiper-container
              ref="servicesSwiperRef"
              :init="false"
              class="services__slider"
            >
              <swiper-slide
                v-for="(item, idx) in services"
                :key="`mobile-${idx}`"
                class="services__slide"
              >
                <article
                  class="service service--mobile"
                  :class="{ 'is-open': openIndex === idx }"
                  tabindex="0"
                  @click="onToggle(idx)"
                  @keydown.enter.prevent="onToggle(idx)"
                  @keydown.space.prevent="onToggle(idx)"
                >
                  <div class="service__decor" aria-hidden="true"></div>

                  <div
                    class="service__icon"
                    aria-hidden="true"
                    v-html="item.icon"
                  ></div>

                  <h3 class="service__name">{{ item.title }}</h3>

                  <div class="service__spacer"></div>

                  <div class="service__bottom">
                    <span class="service__more">
                      <span class="service__more-label">Подробнее</span>
                      <svg
                        class="service__more-arrow"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>

                    <p class="service__text">{{ item.description }}</p>
                  </div>
                </article>
              </swiper-slide>
            </swiper-container>

            <div v-if="services.length > 1" class="services__dots">
              <button
                v-for="(_, idx) in services"
                :key="`dot-${idx}`"
                type="button"
                class="services__dot"
                :class="{ 'is-active': idx === servicesActiveIndex }"
                :aria-label="`Перейти к карточке ${idx + 1}`"
                @click="goToSlide(idx)"
              ></button>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const openIndex = ref<number | null>(null);
const servicesSwiperRef = ref(null);
const servicesActiveIndex = ref(0);

// На десктопе раскрываем по наведению, на мобильном — по тапу.
const isTouch = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none)").matches;

const onEnter = (idx: number) => {
  if (isTouch()) return;
  openIndex.value = idx;
};

const onLeave = () => {
  if (isTouch()) return;
  openIndex.value = null;
};

const onToggle = (idx: number) => {
  if (!isTouch()) return;
  openIndex.value = openIndex.value === idx ? null : idx;
};

const servicesSwiper = useSwiper(servicesSwiperRef, {
  slidesPerView: 1.12,
  spaceBetween: 16,
  breakpoints: {
    640: {
      slidesPerView: 1.35,
      spaceBetween: 18,
    },
    768: {
      slidesPerView: 1.85,
      spaceBetween: 20,
    },
    900: {
      slidesPerView: 2.05,
      spaceBetween: 20,
    },
  },
});

const goToSlide = (idx: number) => {
  servicesSwiper.instance.value?.slideTo?.(idx);
  servicesActiveIndex.value = idx;
};

onMounted(() => {
  servicesSwiper.instance?.value?.init();
  servicesSwiper.instance.value?.on?.("slideChange", () => {
    servicesActiveIndex.value =
      servicesSwiper.instance.value?.realIndex ??
      servicesSwiper.instance.value?.activeIndex ??
      0;
  });
});

const services = [
  {
    title: "Парковка",
    description:
      "Подземный и наземный паркинг. Услуга предоставляется бесплатно по факту приезда гостей при наличии свободных парковочных мест.",
    icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="7" width="30" height="34" rx="6" stroke="currentColor" stroke-width="2"/>
      <path d="M18 32V16h8a5 5 0 0 1 0 10h-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    title: "Размещение с животными",
    description:
      "Возможно в определённых категориях номеров. Услуга предоставляется по запросу и оплачивается дополнительно.",
    icon: `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 63.445 63.445" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M21.572,28.926c5.067,0,9.19-5.533,9.19-12.334s-4.123-12.334-9.19-12.334c-5.067,0-9.19,5.533-9.19,12.334 S16.504,28.926,21.572,28.926z M21.572,7.258c3.355,0,6.19,4.275,6.19,9.334s-2.834,9.334-6.19,9.334 c-3.356,0-6.19-4.275-6.19-9.334S18.216,7.258,21.572,7.258z"></path> <path d="M48.83,40.922c-0.189-0.256-0.37-0.498-0.466-0.707c-2.054-4.398-7.689-9.584-16.813-9.713L31.2,30.5 c-8.985,0-14.576,4.912-16.813,9.51c-0.077,0.156-0.247,0.361-0.427,0.576c-0.212,0.254-0.423,0.512-0.604,0.793 c-1.89,2.941-2.853,6.25-2.711,9.318c0.15,3.26,1.512,5.877,3.835,7.369c0.937,0.604,1.95,0.907,3.011,0.907 c2.191,0,4.196-1.233,6.519-2.664c1.476-0.907,3.002-1.848,4.698-2.551c0.191-0.063,0.968-0.158,2.241-0.158 c1.515,0,2.6,0.134,2.833,0.216c1.653,0.729,3.106,1.688,4.513,2.612c2.154,1.418,4.188,2.759,6.395,2.759 c0.947,0,1.867-0.248,2.732-0.742c4.778-2.715,5.688-10.162,2.03-16.603C49.268,41.52,49.048,41.219,48.83,40.922z M45.939,55.838 c-0.422,0.238-0.818,0.35-1.25,0.35c-1.308,0-2.9-1.049-4.746-2.264c-1.438-0.947-3.066-2.02-4.949-2.852 c-0.926-0.41-2.934-0.472-4.046-0.472c-1.629,0-2.76,0.128-3.362,0.375c-1.943,0.808-3.646,1.854-5.149,2.779 c-1.934,1.188-3.604,2.219-4.946,2.219c-0.49,0-0.931-0.137-1.389-0.432c-1.483-0.953-2.356-2.724-2.461-4.984 c-0.113-2.45,0.682-5.135,2.238-7.557c0.113-0.177,0.25-0.334,0.383-0.492c0.274-0.328,0.586-0.701,0.823-1.188 c1.84-3.781,6.514-7.82,14.115-7.82l0.308,0.002c7.736,0.109,12.451,4.369,14.137,7.982c0.225,0.479,0.517,0.875,0.773,1.223 c0.146,0.199,0.301,0.4,0.426,0.619C49.684,48.326,49.279,53.939,45.939,55.838z"></path> <path d="M41.111,28.926c5.068,0,9.191-5.533,9.191-12.334S46.18,4.258,41.111,4.258c-5.066,0-9.189,5.533-9.189,12.334 S36.044,28.926,41.111,28.926z M41.111,7.258c3.355,0,6.191,4.275,6.191,9.334s-2.834,9.334-6.191,9.334 c-3.355,0-6.189-4.275-6.189-9.334S37.756,7.258,41.111,7.258z"></path> <path d="M56.205,22.592c-4.061,0-7.241,4.213-7.241,9.59c0,5.375,3.181,9.588,7.241,9.588s7.24-4.213,7.24-9.588 C63.445,26.805,60.266,22.592,56.205,22.592z M56.205,38.77c-2.299,0-4.241-3.018-4.241-6.588c0-3.572,1.942-6.59,4.241-6.59 s4.24,3.018,4.24,6.59C60.445,35.752,58.503,38.77,56.205,38.77z"></path> <path d="M14.482,32.182c0-5.377-3.181-9.59-7.241-9.59S0,26.805,0,32.182c0,5.375,3.181,9.588,7.241,9.588 S14.482,37.557,14.482,32.182z M7.241,38.77C4.942,38.77,3,35.752,3,32.182c0-3.572,1.942-6.59,4.241-6.59 c2.299,0,4.241,3.018,4.241,6.59C11.482,35.752,9.54,38.77,7.241,38.77z"></path> </g> </g> </g></svg>`,
  },
  {
    title: "Обслуживание в номерах",
    description: "Ресторан «Свои люди» работает круглосуточно. Доставка еды в номер в любое время суток.",
    icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 34h32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M11 34a13 13 0 0 1 26 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M24 21v-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="24" cy="15" r="2" stroke="currentColor" stroke-width="2"/>
      <path d="M6 39h36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
  },
  {
    title: "Услуга стирки",
    description:
      "Услуга предоставляется по запросу и оплачивается дополнительно.",
    icon: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="7" width="28" height="34" rx="6" stroke="currentColor" stroke-width="2"/>
      <circle cx="24" cy="27" r="9" stroke="currentColor" stroke-width="2"/>
      <path d="M16.5 25c2-1.4 3.5-1.4 5.5 0s3.5 1.4 5.5 0 3.5-1.4 5.5 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="16" cy="13" r="1.6" fill="currentColor"/>
      <circle cx="22" cy="13" r="1.6" fill="currentColor"/>
    </svg>`,
  },
  {
    title: "Детский сервис",
    description:
      "Для самых маленьких гостей: детская кроватка, стульчики в ресторане, детское меню и игровая зона.",
icon: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="var(--ci-primary-color, #000000)" d="M445.057,345.134,464,274.1V232c-8.136-93.993-87.933-168-184-168H248V232H132.158l-17.844-78.768A32.155,32.155,0,0,0,83.038,128H16v32H83.038l40.475,178.67A80,80,0,1,0,224,416q0-4.05-.4-8H328.4q-.395,3.948-.4,8a80,80,0,1,0,117.057-70.866ZM280,96c78.411,0,143.145,59.678,151.164,136H280ZM144,464a48,48,0,1,1,48-48A48.055,48.055,0,0,1,144,464Zm194.763-88H213.237a80.166,80.166,0,0,0-57.316-39.108L139.408,264H432v5.9l-17.7,66.368c-2.082-.163-4.179-.271-6.3-.271A80.026,80.026,0,0,0,338.763,376ZM408,464a48,48,0,1,1,48-48A48.055,48.055,0,0,1,408,464Z" class="ci-primary"></path> </g></svg>`,
  },
  {
    title: "Караоке и бильярд",
    description:
      "Индивидуальное пространство для отдыха. Услуга предоставляется по запросу и оплачивается дополнительно.",
    icon: `  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <rect x="18" y="4" width="12" height="22" rx="6" stroke="currentColor" stroke-width="2"/>
        <path d="M10 20v2a14 14 0 0 0 28 0v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M24 36v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M16 44h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
  },
];
</script>

<style scoped>
.services {
  padding: 6rem 0 2rem 0;
}

.services__inner {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.services__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  color: var(--noble-black-600);
}

.services__mobile {
  display: none;
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}

.services__slider {
  width: 100%;
  overflow: visible;
}

.services__slide {
  display: flex;
  height: auto;
}

.service--mobile {
  width: 100%;
  min-height: 34rem;
  margin: 0;
}

.services__dots {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.services__dot {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: none;
  background: rgba(28, 28, 28, 0.18);
  transition: transform 0.25s ease, background-color 0.25s ease;
  cursor: pointer;
}

.services__dot.is-active {
  background: #fbec78;
  transform: scale(1.2);
}

/* ---------- Card ---------- */
.service {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--white);
  border-radius: 3.6rem;
  padding: 4rem 3.5rem;
  cursor: pointer;
  outline: none;
  box-shadow: 0 2px 12px rgba(26, 29, 33, 0.04);
  min-height: 32rem;
  transition:
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  animation: service-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay);
}

@keyframes service-in {
  from {
    opacity: 0;
    transform: translateY(26px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.service:hover,
.service.is-open,
.service:focus-visible {
  transform: translateY(-6px);
  box-shadow: 0 22px 48px rgba(26, 29, 33, 0.12);
}

/* ---------- Decor ---------- */
.service__decor {
  position: absolute;
  top: 4rem;
  left: 3.5rem;
  width: 7.2rem;
  height: 7.2rem;
  border-radius: 2.4rem;
  background: #fbec78;
  transform: scale(1);
  transform-origin: top left;
  transition:
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.65s ease;
  z-index: -1;
}

.service.is-open .service__decor,
.service:hover .service__decor,
.service:focus-visible .service__decor {
  transform: scale(14);
  opacity: 0.12;
}

/* ---------- Icon ---------- */
.service__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.2rem;
  height: 7.2rem;
  border-radius: 2.4rem;
  background: #fbec78;
  color: var(--noble-black-600);
  margin-bottom: 2.6rem;
  flex-shrink: 0;
  transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.service__icon :deep(svg) {
  width: 3.8rem;
  height: 3.8rem;
}

.service.is-open .service__icon,
.service:hover .service__icon,
.service:focus-visible .service__icon {
  transform: translateY(-2px) rotate(-4deg) scale(1.04);
}

/* ---------- Title ---------- */
.service__name {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 2.2rem;
  line-height: 132%;
  color: var(--noble-black-600);
  flex-shrink: 0;
}

/* ---------- Spacer ---------- */
/* Растягивает пространство между заголовком и нижним блоком,
   прижимая .service__bottom к низу карточки */
.service__spacer {
  flex: 1;
}

/* ---------- Bottom block ---------- */
/* "Подробнее" и текст описания занимают одно место,
   сменяя друг друга при наведении */
.service__bottom {
  position: relative;
  width: 100%;
  /* Высота под две строки описания.
     Если тексты длиннее — увеличь это значение. */
  height: 6rem;
  margin-top: 1.6rem;
  flex-shrink: 0;
}

/* ---------- "Подробнее" ---------- */
.service__more {
  position: absolute;
  bottom: 0;
  left: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1;
  color: var(--noble-black-300);
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.service__more-label {
  position: relative;
}

.service__more-label::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.service__more-arrow {
  width: 1.8rem;
  height: 1.8rem;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.service.is-open .service__more,
.service:hover .service__more,
.service:focus-visible .service__more {
  opacity: 0;
  transform: translateY(6px);
  pointer-events: none;
}

/* ---------- Description ---------- */
.service__text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 160%;
  color: var(--noble-black-400);
  opacity: 0;
  transform: translateY(-6px);
  pointer-events: none;
  transition:
    opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.08s,
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.08s;
}

.service.is-open .service__text,
.service:hover .service__text,
.service:focus-visible .service__text {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* ---------- Responsive ---------- */
@media (max-width: 1200px) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 1024px) {
  .services__desktop {
    display: none;
  }

  .services__mobile {
    display: block;
  }
}

@media (max-width: 768px) {
  .services {
    padding: 4rem 0 1rem 0;
  }

  .service {
    padding: 3rem 2.6rem;
    border-radius: 3rem;
  }

  .service__name {
    font-size: 2rem;
  }
}

@media (max-width: 575px) {
  .service__icon {
    width: 6.4rem;
    height: 6.4rem;
  }

  .service__decor {
    width: 6.4rem;
    height: 6.4rem;
  }
}

/* Уважение к настройкам уменьшения движения */
@media (prefers-reduced-motion: reduce) {
  .service,
  .service__decor,
  .service__icon,
  .service__text,
  .service__more,
  .service__more-arrow {
    transition-duration: 0.01ms;
    animation: none;
  }
}

@media (max-width: 767px) {
  .service__decor {
    top: 3rem;
    left: 2.5rem;
  }
}
</style>
