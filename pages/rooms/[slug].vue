<template>
  <main class="main">
    <div class="rooms-page">
      <div class="container">
        <div class="rooms-page__inner">
          <Tabs
            :tabs="rooms.map((r) => ({ label: r.title }))"
            v-model:selected="selectedIndex"
          >
            <template #icon="{ isActive }">
              <svg
                v-if="isActive"
                class="tabs__tab-icon"
                style="margin-right: 2rem"
                aria-hidden="true"
              >
                <use xlink:href="/svg/icons/inlineSprite.svg#arrow-right" />
              </svg>
            </template>

            <template
              v-for="(room, index) in rooms"
              :key="room.slug"
              #[`tab-${index}`]
            >
              <article class="rooms-page__content">
                <div class="rooms-page__overview">
                  <div class="rooms-page__description">
                    <h2 class="rooms-page__title">{{ room.title }}</h2>
                    <p class="rooms-page__text" v-html="room.description"></p>
                    <!-- <dl class="rooms-page__info">
                      <div
                        v-for="roomInfo in room.roomInfo"
                        :key="roomInfo.label"
                        class="rooms-page__info-item"
                      >
                        <dt class="rooms-page__info-label">
                          {{ roomInfo.label }}
                        </dt>
                        <dd class="rooms-page__info-value">
                          {{ roomInfo.value }}
                        </dd>
                      </div>
                    </dl> -->
                  </div>
                  <div class="rooms-page__media">
                    <SwiperSlider
                      :images="
                        room.images.map((img, idx) => ({
                          src: img,
                          alt: room.title + ' ' + (idx + 1),
                        }))
                      "
                    />
                  </div>
                </div>

                <div class="rooms-page__features">
                  <div class="rooms-page__features-room">
                    <h3 class="rooms-page__features-title">🧺 Номер оснащён</h3>
                    <ul class="rooms-page__features-list">
                      <li
                        v-for="(item, i) in room.features.inRoom"
                        :key="i"
                        class="rooms-page__features-item"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                  <div class="rooms-page__features-bathroom">
                    <h3 class="rooms-page__features-title">🚿 Ванная комната</h3>
                    <ul class="rooms-page__features-list">
                      <li
                        v-for="(item, i) in room.features.bathroom"
                        :key="i"
                        class="rooms-page__features-item"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="rooms-page__booking">
                  <div
                    style="margin: 0 !important; width: 100%"
                    class="hero__booking-left"
                    id="_bn_widget_"
                  ></div>
                  <p class="rooms-page__price">
                    Стоимость от {{ formatRoomPrice(room.price) }} руб.
                  </p>
                </div>
              </article>
            </template>
          </Tabs>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "#imports";
import Tabs from "~/components/Tabs.vue";
import SwiperSlider from "~/components/page/SwiperSlider.vue";
import { rooms as roomsData } from "~/data/rooms";
import { createError } from "h3";

// --- Route ---
const route = useRoute();
const router = useRouter();

// --- SSR Fetch изображений ---
const imagesMap = await $fetch<Record<string, string[]>>("/api/rooms-images");

// --- Подставляем изображения в rooms ---
const rooms = roomsData.map((room) => ({
  ...room,
  images: imagesMap?.[room.slug] || [],
}));

const formatRoomPrice = (price: string) =>
  new Intl.NumberFormat("ru-RU").format(Number(price));

// --- инициализация selectedIndex сразу из URL ---
const slugFromUrl = String(route.params.slug || "");
const initialIndex = rooms.findIndex((r) => r.slug === slugFromUrl);
if (initialIndex === -1) {
  throw createError({ statusCode: 404, statusMessage: "Номер не найден" });
}
const selectedIndex = ref<number>(initialIndex);

// --- активный номер ---
const activeRoom = computed(() => rooms[selectedIndex.value]);

// --- динамический SEO ---
useHead(() => {
  const room = activeRoom.value;
  return {
    title: room.seo.title,
    meta: [
      { name: "description", content: room.seo.description },
      { name: "keywords", content: room.seo.keywords },
      { property: "og:title", content: room.seo.ogTitle },
      { property: "og:description", content: room.seo.ogDescription },
      { property: "og:image", content: room.seo.ogImage },
      { property: "og:type", content: "website" },
    ],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify(room.schema),
      },
    ],
  };
});

// --- обновление URL при смене таба ---
watch(selectedIndex, (newIndex) => {
  const newSlug = rooms[newIndex]?.slug;
  if (!newSlug) return;
  if (String(route.params.slug) !== newSlug) {
    router.replace({ path: `/rooms/${newSlug}` }).catch(() => {});
  }
});

// --- синхронизация при ручном изменении URL / Back/Forward ---
watch(
  () => String(route.params.slug),
  (newSlug) => {
    const idx = rooms.findIndex((r) => r.slug === newSlug);
    if (idx === -1) {
      router.replace("/404").catch(() => {});
      return;
    }
    if (idx !== selectedIndex.value) selectedIndex.value = idx;
  }
);

declare global {
  interface Window {
    Bnovo_Widget?: any;
  }
}

onMounted(() => {
  const script = document.createElement("script");
  script.src = "//widget.reservationsteps.ru/js/bnovo.js";
  script.async = true;
  script.onload = () => {
    // @ts-ignore
    if (window.Bnovo_Widget) {
      // @ts-ignore
      Bnovo_Widget.init(() => {
        // @ts-ignore
        Bnovo_Widget.open("_bn_widget_", {
          type: "horizontal",
          uid: "6630067e-2593-4574-b66b-1f7b6b74fdbc",
          lang: "ru",
          currency: "RUB",
          width: "200",
          height: "auto",
          width_mobile: "300",
          background: "#ffffff",
          background_mobile: "#ffffff",
          bg_alpha: "100",
          bg_alpha_mobile: "100",
          border_color_mobile: "#C6CAD3",
          padding: "15",
          padding_mobile: "15",
          border_radius: "20",
          button_font_size: "18",
          button_height: "75",
          font_type: "verdana",
          without_title: "on",
          title_color: "#242742",
          title_color_mobile: "#242742",
          title_size: "22",
          title_size_mobile: "22",
          inp_color: "#242742",
          inp_bordhover: "#BBBBBB",
          inp_bordcolor: "#DDDDDD",
          inp_alpha: "100",
          btn_background: "#FBEC78",
          btn_background_over: "#E2B42B",
          btn_textcolor: "#1A1D21",
          btn_textover: "#1A1D21",
          btn_bordcolor: "#FBEC78",
          btn_bordhover: "#E2B42B",
          arrival: "Заезд",
          departure: "Выезд",
          adults_default: "1",
          btn_text: "Забронировать",
          cancel_color: "#FBEC78",
          switch_mobiles_width: "1500",
          dates_preset: "on",
          dfrom_tomorrow: "on",
          dto_nextday: "on",
          down_mode: "on",
        });
      });
    }
  };
  document.body.appendChild(script);
});
</script>

<style scoped>
.r-video {
  max-width: 120rem !important;
  width: clamp(40rem, 93vw, 120rem);
  height: clamp(40rem, 50vw, 70rem);
}

@media (max-width: 575px) {
  .r-video {
    width: clamp(20rem, 89vw, 120rem);
  }
}

.hero__booking-left {
  margin: 0 !important;
  width: 163px !important;
}

.rooms-page__images-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  border: none;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
  height: 100%;
}

/* Левая стрелка слегка выезжает при наведении */
.rooms-page__images-button--left:hover {
  transform: translate(-0.5rem, -50%);
}

/* Правая стрелка слегка выезжает при наведении */
.rooms-page__images-button--right:hover {
  transform: translate(0.5rem, -50%);
}

/* Для мягкой анимации при клике можно добавить эффект нажатия */
.rooms-page__images-button:active {
  transform: translateY(-50%) scale(0.95);
}

.rooms-page__images-button--left {
  left: 0;
}

.rooms-page__images-button--right {
  right: 0;
}

.rooms-page__images-button.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

swiper-container {
  width: 100% !important;
}

swiper-slide {
  width: 100% !important;
}

.rooms-page__media {
  position: relative;
  height: clamp(375px, 50vw, 675px);
}

/* @media (max-width: 1400px) {.rooms-page__media {  height: 400px;}}
@media (max-width: 1300px) {.rooms-page__media {height: 375px;}}
@media (max-width: 1400px) {.rooms-page__media {}}
@media (max-width: 1400px) {.rooms-page__media {}} */

.rooms-page__images {
  width: 100%;
  position: relative;
}

.rooms-page__slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* растягиваем слайд */
}

.rooms-page {
}

.rooms-page__inner {
  border-radius: 60px;
  padding: 60px;
  background: var(--white);
  overflow: hidden;
}

.rooms-page__content {
  margin-top: 9rem;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 7rem;
}

.rooms-page__overview {
  display: flex;
  flex-direction: column;
  gap: 7rem;
}

.rooms-page__description {
  flex: 0 1 40%;
  /* max-width: 47.5rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  text-align: center;
}

.rooms-page__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 32px;
  line-height: 140%;
  letter-spacing: 0em;
  color: var(--noble-black-600);
  margin-bottom: 0;
}

.rooms-page__text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  /* max-width: 47.5rem; */
}

.rooms-page__info {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.rooms-page__info-item {
  border: 1px solid var(--noble-black-100);
  border-radius: 2rem;
  padding: 1.5rem 1.75rem;
  background: rgba(251, 236, 120, 0.12);
}

.rooms-page__info-label {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  color: var(--noble-black-300);
}

.rooms-page__info-value {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-600);
  margin-top: 0.4rem;
}

.rooms-page__images {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rooms-page__image {
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 45px;
  object-fit: cover;
  position: relative;
}

.rooms-page__features {
  display: flex;
  gap: 15rem;
}

.rooms-page__features-room {
}

.rooms-page__features-bathroom {
}

.rooms-page__features-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  margin-bottom: 1.5rem;
}

.rooms-page__features-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.rooms-page__features-item {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #000;
}

.rooms-page__booking {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
}

.rooms-page__button {
  max-width: 25rem !important;
}

.rooms-page__price {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 100%;
  color: #1c1c1c;
  opacity: 0.6;
}

.tabs__tab-icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: #fbec78;
}

@media (max-width: 1024px) {
  .rooms-page__inner {
    padding: 4rem;
  }
}

@media (max-width: 850px) {
  .rooms-page__description {
    flex-direction: column;
    align-items: center;
  }

  .rooms-page__features {
    gap: 17%;
  }
}

@media (max-width: 768px) {
  .rooms-page__inner {
    padding: 4rem 3rem;
  }

  .rooms-page__content {
    margin-top: 6rem;
    gap: 5rem;
  }

  .rooms-page__overview {
    gap: 4rem;
  }

  .rooms-page__title {
    font-size: 2.7rem;
  }

  .rooms-page__images-button {
    padding: 0 1rem;
  }
}

@media (max-width: 650px) {
  .rooms-page__features {
    flex-direction: column;
    gap: 4rem;
  }
}

@media (max-width: 575px) {
  .rooms-page__inner {
    padding: 4rem 2rem;
    border-radius: 45px;
  }

  .rooms-page__title {
    font-size: 2.4rem;
  }

  .rooms-page__features-title {
    font-size: 2.2rem;
  }

  .rooms-page__booking {
    flex-direction: column-reverse;
  }
}

@media (max-width: 480px) {
  .rooms-page__features-title {
    font-size: 2rem;
  }
}
</style>
