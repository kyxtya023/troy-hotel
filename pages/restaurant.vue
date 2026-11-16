<template>
  <main class="main">
    <Hero
      title="Ресторан «Свои люди» — здесь вас встречают как родных"
      subtitle="Ресторан «СВОИ ЛЮДИ» — еда, атмосфера и моменты, которые остаются с вами"
      image="/restaurant/XXXL1.jpg"
      align="center"
      :showBookingButton="true"
      bookingButtonText="Забронировать столик"
      buttonTag="button"
      :images="[
        '/restaurant/xxxl-slider/1.jpg',
        '/restaurant/xxxl-slider/2.jpg',
        '/restaurant/xxxl-slider/3.jpg',
      ]"
      :useSlider="true"
      :sliderDelay="5000"
      @open-modal="openBookingModal"
    />

    <!-- Новогодняя кампания отключена. Для восстановления раскомментировать блок и импорт. -->
    <NewYearEvents />

    <section class="restaurant-info">
      <div class="restaurant-info__container container">
        <div class="restaurant-info__inner">
          <div class="restaurant-info__intro">
            <div class="restaurant-info__images">
              <FullscreenImage
                v-for="(img, idx) in restaurantData.images"
                :key="idx"
                :src="img.src"
                :alt="img.alt"
                :class="[
                  'restaurant-info__image',
                  idx === 0 ? 'restaurant-info__image1' : '',
                  idx === 1 ? 'restaurant-info__image2' : '',
                ]"
              />
            </div>

            <div class="restaurant-info__text">
              <div class="restaurant-info__text-wrapper">
                <h1 class="restaurant-info__title title">
                  {{ restaurantData.title }}
                </h1>
                <p
                  v-for="(desc, i) in restaurantData.description"
                  :key="i"
                  class="restaurant-info__description"
                >
                  {{ desc }}
                </p>
              </div>

              <!-- Список меню в 2 колонки -->
              <div class="restaurant-info__menu-block">
                <div class="restaurant-info__menu-title">
                  Основные виды блюд:
                </div>
                <ul class="restaurant-info__menu-list">
                  <li
                    v-for="(item, idx) in restaurantData.menuItems"
                    :key="idx"
                    class="restaurant-info__menu-item"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- <div class="restaurant-info__menu-preview">
            <div class="restaurant-info__menu-text">
              <h2 class="restaurant-info__menu-title">
                {{ restaurantData.menu.title }}
              </h2>
              <ul class="restaurant-info__menu-list">
                <li v-for="(item, idx) in restaurantData.menu.items" :key="idx" class="restaurant-info__menu-item">
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="restaurant-info__menu-image-wrapper">
              <FullscreenImage :src="restaurantData.menu.image.src" :alt="restaurantData.menu.image.alt"
                class="restaurant-info__menu-image" />
            </div>
          </div> -->
        </div>
      </div>
    </section>

    <section class="advantages">
      <div class="container">
        <div class="advantages__inner">
          <header class="advantages__header">
            <h2 class="advantages__subtitle title">
              Что делает нас особенными
            </h2>
          </header>

          <div class="advantages__videos">
            <article
              v-for="(video, idx) in videos"
              :key="idx"
              class="advantages__video"
            >
              <div class="video-card">
                <transition name="fade" mode="out-in">
                  <!-- <template v-if="activeVideo === idx"> -->
                  <!-- <VideoPlayer :src="videoSrc" :style="{ width: '100%', height: videoHeight + 'px' }" /> -->
                  <!-- </template> -->

                  <!-- <template v-else> -->
                  <div class="video-card__poster">
                    <img
                      :src="video.poster"
                      :alt="video.title"
                      class="video-card__image"
                    />

                    <div class="video-card__content">
                      <h3 class="video-card__title">{{ video.title }}</h3>
                      <p class="video-card__text">{{ video.text }}</p>
                    </div>

                    <!-- <button class="video-card__play-btn" aria-label="Запустить видео" @click="startVideo(idx)">
                        <svg class="video-card__icon" aria-hidden="true">
                          <use :xlink:href="'/svg/icons/inlineSprite.svg#play'" />
                        </svg>
                      </button> -->
                  </div>
                  <!-- </template> -->
                </transition>
              </div>
            </article>
          </div>

          <div class="advantages__list-wrapper">
            <div class="advantages__list-title">Также для вас</div>
            <div class="advantages__list">
              <article class="advantages__item">
                <div class="advantages__number">
                  <img src="/restaurant/frame.png" alt="" /><span>1</span>
                </div>
                <div class="advantages__content">
                  <h3 class="advantages__item-title">
                    Организация торжеств под ключ
                  </h3>
                  <p class="advantages__item-text">
                    Банкеты, флористика, ведущие, фотографы — всё в одном месте,
                    без лишней суеты.
                  </p>
                </div>
              </article>

              <article class="advantages__item">
                <div class="advantages__number">
                  <img src="/restaurant/frame.png" alt="" /><span>2</span>
                </div>
                <div class="advantages__content">
                  <h3 class="advantages__item-title">
                    Разнообразие развлечений
                  </h3>
                  <p class="advantages__item-text">
                    Бильярд, кино, караоке — выберите формат вечера, который вам
                    по душе.
                  </p>
                </div>
              </article>

              <article class="advantages__item">
                <div class="advantages__number">
                  <img src="/restaurant/frame.png" alt="" /><span>3</span>
                </div>
                <div class="advantages__content">
                  <h3 class="advantages__item-title">
                    Пространство для больших событий
                  </h3>
                  <p class="advantages__item-text">
                    Отдельный банкетный зал на 80 гостей с возможностью
                    индивидуального оформления.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
    <RestaurantMenu :menuData="BanquetMenu" />

    <Cta
      title="Хотите забронировать столик?"
      text="Позвоните по телефону, уточним свободные даты и забронируем столик"
      buttonText="+7 968 199-91-81"
      href="tel:+79681999181"
      :ctaMedium="true"
    />

    <gallery title="Атмосфера ресторана" :images="restaurantGallery" />

    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showModal3" class="modal-overlay" @click.self="showModal3 = false">
          <div class="modal-v3">
            <button class="modal-v3__close" @click="showModal3 = false" aria-label="Закрыть">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <h2 class="modal-v3__title">Хотите забронировать столик?</h2>
            <p class="modal-v3__text">Позвоните нам, и мы подберём для вас идеальное место</p>
            <a href="tel:+79681999181" class="modal-v3__button">
              <span class="modal-v3__button-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </span>
              <span class="modal-v3__button-text">
                <span class="modal-v3__button-label">Позвонить</span>
                <span class="modal-v3__button-number">+7 968 199-91-81</span>
              </span>
            </a>
            <p class="modal-v3__hours">Работаем круглосуточно</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import RestaurantMenu from "~/components/page/RestaurantMenu.vue";
import gallery, { type GalleryImage } from "~/components/Gallery.vue";
import FullscreenImage from "~/components/FullScreenImage.vue";
import VideoPlayer from "~/components/ui/PlayerVideo.vue";
import Cta from "~/components/Cta.vue";
import NewYearEvents from "~/components/newyear/NewYearEvents.vue";

import { restaurantSEO } from "~/seo/restaurant";

const { data: restaurantGallery } = await useAsyncData<GalleryImage[]>(
  "restaurantGallery",
  () => $fetch("/api/restaurant-gallery"),
  {
    default: () => [],
  }
);

const videoSrc = "/spa/sample-5s.mp4"; // путь к вашему видео

const videos = [
  {
    poster: "/restaurant/video-card-1.jpg",
    title: "Основной зал",
    text: "Просторный зал, где каждая деталь создаёт особое настроение. Уединённые столики и большие столы для компаний — здесь каждый найдёт свой уголок.",
  },
  {
    poster: "/restaurant/video-card-2.jpg",
    title: "Летний дворик",
    text: "Уютная веранда с живой растительностью и мягким светом. Вечером — романтика как во дворике вечерней Венеции. Вечера без комаров и мошек.",
  },
  {
    poster: "/restaurant/video-card-3.jpg",
    title: "VIP-караоке",
    text: "Отдельный зал, комфортные диваны, вместимость до 15 человек, профессиональная аппаратура «Evolution» - идеальное место для вечера с друзьями и близкими.",
  },
];

const activeVideo = ref<number | null>(null);
const videoHeight = ref<number>(0);

const isModalOpenQuestion = ref(false);

// Модальные окна бронирования
const showModal1 = ref(false);
const showModal2 = ref(false);
const showModal3 = ref(false);

// Функция открытия модального окна (откроет выбранный вариант)
// После выбора варианта оставьте только нужный
const openBookingModal = () => {
  showModal3.value = true;
};

const startVideo = async (idx: number) => {
  activeVideo.value = idx;
  await nextTick();
  updateVideoHeight(idx);
};

const stopVideo = () => {
  activeVideo.value = null;
  videoHeight.value = 0;
};

// Функция для вычисления высоты постера
const updateVideoHeight = (idx: number) => {
  const poster = document.querySelectorAll<HTMLElement>(".video-card__poster")[
    idx
  ];
  if (poster) videoHeight.value = poster.offsetHeight;
};

// Слушаем изменение активного видео
watch(activeVideo, (newVal) => {
  if (newVal !== null) {
    updateVideoHeight(newVal);
  }
});

// Слушаем ресайз окна
const onResize = () => {
  if (activeVideo.value !== null) {
    updateVideoHeight(activeVideo.value);
  }
};

onMounted(() => {
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

const BanquetMenu = {
  title: "Меню ресторана “Свои Люди”",
  dishes: [
    {
      type: "big" as const,
      img: "/restaurant/menu/1.jpg",
      title: "Бевстроганов с пюре",
    },
    {
      type: "small" as const,
      img: "/restaurant/menu/2.jpg",
      title: "Мини цыпленок тапака",
    },
    {
      type: "small" as const,
      img: "/restaurant/menu/3.jpg",
      title: "Сковородка с курицей",
    },
    {
      type: "small" as const,
      img: "/restaurant/menu/11.jpg",
      title: "Салат с лососем гриль",
    },
    {
      type: "small" as const,
      img: "/restaurant/menu/12.jpg",
      title: "Цезарь с креветкой",
    },
    {
      type: "small" as const,
      img: "/restaurant/menu/4.jpg",
      title: "Стейк из семги",
    },
    {
      type: "small" as const,
      img: "/restaurant/menu/5.jpg",
      title: "Том ям",
    },
    {
      type: "small" as const,
      img: "/restaurant/menu/6.jpg",
      title: "Сырное мороженое",
    },
    {
      type: "small" as const,
      img: "/restaurant/menu/7.jpg",
      title: "Тирамису",
    },
    {
      type: "small" as const,
      img: "/restaurant/menu/8.jpg",
      title: "Филе утки",
    },
    {
      type: "small" as const,
      img: "/restaurant/menu/9.jpg",
      title: "Стейк салат",
    },
    {
      type: "small" as const,
      img: "/restaurant/menu/10.jpg",
      title: "Торт три шоколада",
    },
  ],
};

const restaurantData = {
  title: "Ресторан Свои Люди",
  description: [
    "«СВОИ ЛЮДИ» — это место, куда приходят за вкусом, уютом и тёплыми эмоциями. Летний дворик с живыми растениями идеально подойдёт для тёплых вечеров, романтических встреч или дружеских посиделок.",
    "Меню ресторана предлагает разнообразные блюда, приготовленные из свежих и качественных продуктов. Гости могут попробовать традиционные супы, салаты, горячие блюда из мяса и рыбы, множество вариантов пиццы, фирменные бургеры а также разнообразные десерты.",
  ],
  images: [
    { src: "/restaurant/restaurant-1.jpg", alt: "Интерьер ресторана" },
    { src: "/restaurant/restaurant-2.jpg", alt: "Летний дворик ресторана" },
  ],
  menuItems: [
    "Традиционные супы",
    "Свежие салаты",
    "Горячие блюда из мяса",
    "Блюда из рыбы",
    "Разнообразные виды пиццы",
    "Фирменные бургеры",
    "Домашние десерты",
  ],
};

useHead(restaurantSEO);

definePageMeta({
  pageTransition: {
    name: "fade-soft",
    mode: "out-in",
    css: true,
    duration: { enter: 300, leave: 300 },
  },
});
</script>

<style scoped>
.video-card {
  position: relative;
  border-radius: 45px;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  padding: 3.5rem 2.4rem;
}

.video-card__poster {
  position: relative;
}

.video-card__image {
  width: 100%;
  display: block;
  object-fit: cover;
  border-radius: 4.5rem;
  height: clamp(30rem, 25vw, 45rem);
}

.video-card__content {
  margin-top: 2.5rem;
}

.video-card__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 28px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  margin-bottom: 1rem;
}

.video-card__text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-500);
}

/* .video-card__play-btn {
  position: absolute;
  top: 2.5rem;
  right: 3rem;
  background: #fff;
  border-radius: 50%;
  border: none;
  width: 4.4rem;
  height: 4.4rem;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
} */

/* .video-card__icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: var(--noble-black-600);
} */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  /* .video-card {
    border-radius: 0;
  } */

  /* .video-card__image {
    border-radius: 45px;
    margin-bottom: 2rem;
    filter: brightness(1);
  } */

  /* .video-card__content {
    position: static;
  } */

  .video-card__title {
    font-size: 2.4rem;
    color: var(--noble-black-600);
  }

  .video-card__text {
    color: var(--noble-black-600);
  }
}

.advantages {
}

.advantages__inner {
  border-radius: 60px;
  padding: 40px;
  background: var(--white);
}

.advantages__header {
  margin-bottom: 6rem;
}

.advantages__title {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 120%;
  letter-spacing: 0.2em;
  text-align: center;
  color: #7e7e7e;
  margin-bottom: 1.5rem;
}

.advantages__subtitle {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 120%;
  text-align: center;
  color: #1c1c1c;
}

.advantages__videos {
  margin-bottom: 5rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
}

.advantages__video {
  width: 100%;
  display: flex;
}

.advantages__list-wrapper {
}

.advantages__list-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 28px;
  line-height: 120%;
  color: #1c1c1c;
  margin-bottom: 3.5rem;
}

.advantages__list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5rem;
}

.advantages__item {
  display: flex;
  gap: 2.4rem;
}

.advantages__number {
  position: relative;
  display: inline-block;
  width: 55px;
  height: 55px;
}

.advantages__number > span {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.advantages__content {
}

.advantages__item-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  margin-bottom: 1rem;
}

.advantages__item-text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #000;
}

@media (max-width: 1366px) {
  .advantages__list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 1200px) {
  .advantages__video {
    justify-content: center;
  }

  .advantages__videos {
    justify-content: center;
    grid-template-columns: 1fr 1fr;
  }

  .video-card__image {
    height: clamp(33rem, 37vw, 50rem);
  }
}

@media (max-width: 870px) {
  .advantages__list {
    grid-template-columns: 1fr;
  }

  .advantages__videos {
    grid-template-columns: 1fr;
  }

  .video-card__image {
    height: clamp(37rem, 50vw, 50rem);
  }
}

@media (max-width: 768px) {
  .advantages__list-title {
    font-size: 24px;
  }

  .advantages__videos {
    justify-content: center;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 675px) {
  .advantages__header {
    margin-bottom: 3.5rem;
  }
}

@media (max-width: 575px) {
  .advantages__inner {
    padding: 3rem 2rem;
    border-radius: 4.5rem;
  }
}

@media (max-width: 480px) {
  .advantages__inner {
    padding: 3rem 1.5rem;
  }

  .advantages__item {
    flex-direction: column;
  }

  .advantages__videos {
    gap: 4rem;
  }

  .video-card {
    border-radius: 35px;
    box-shadow: none;
    padding: 2.5rem 1rem;
  }

  .video-card__image {
    border-radius: 3.5rem;
  }
}

@media (max-width: 480px) {
  .video-card__image {
    height: 33.5rem;
  }
}

/* restaurant-info */
.restaurant-info__container {
}

.restaurant-info__inner {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  border-radius: 60px;
  padding: 40px;
  background: var(--white);
}

.restaurant-info__intro {
  display: flex;
  gap: 6rem;
  align-items: flex-start;
}

.restaurant-info__text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 51.1rem;
  min-width: 0;
}

.restaurant-info__text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.restaurant-info__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0em;
  color: var(--noble-black-600);
}

.restaurant-info__description {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
}

.restaurant-info__menu-preview {
  display: flex;
  justify-content: space-between;
  gap: 4rem;
}

.restaurant-info__menu-text {
  flex: 1 1 50%;
}

.restaurant-info__menu-block {
  margin-top: 3rem;
}

.restaurant-info__menu-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  margin-bottom: 1.5rem;
}

.restaurant-info__menu-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem 2rem;
}

.restaurant-info__menu-item {
  border-left: 1px solid #edd146;
  padding: 5px 0px 5px 24px;
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  display: flex;
  align-items: center;
}

.restaurant-info__images {
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  flex: 1 1 50%;
  min-width: 0;
}

.restaurant-info__image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 45px;
  flex: 1 1 0;
  min-width: 0;
}

.restaurant-info__image1 {
  flex: 1 1 50%;
  max-width: 48rem;
}

.restaurant-info__image2 {
  margin-top: 4rem;
  max-height: 30rem;
  max-width: 40rem;
}

.restaurant-info__image2 {
  flex: 1 1 28%;
}

.restaurant-info__menu-image-wrapper {
}

.restaurant-info__menu-image {
  border-radius: 45px;
  max-width: 660px;
  width: 100%;
  height: auto;
  object-fit: cover;
}

@media (max-width: 1272px) {
  .restaurant-info__intro {
    flex-direction: column-reverse;
  }

  .restaurant-info__text {
    flex-direction: row;
    max-width: none;
    gap: 5rem;
  }

  .restaurant-info__menu-block {
    flex: 1 1 50%;
  }

  .restaurant-info__text-wrapper {
    flex: 1 1 40%;
  }
}

@media (max-width: 998px) {
  .restaurant-info__menu-preview {
    flex-direction: column;
  }

  .restaurant-info__text {
    flex-direction: column;
    max-width: none;
    gap: 3rem;
  }

  .restaurant-info__menu-block {
    flex: none;
  }

  .restaurant-info__text-wrapper {
    flex: none;
  }
}

@media (max-width: 768px) {
  .restaurant-info__image1 {
    flex: 1 1 35%;
  }
}

@media (max-width: 650px) {
  .restaurant-info__menu-list {
    grid-template-columns: 1fr;
  }
}

/* Мобильные: на небольших экранах переводим в колонку */
@media (max-width: 575px) {
  .restaurant-info__inner {
    border-radius: 4.5rem;
    padding: 3rem 2rem;
  }

  .restaurant-info__menu-title {
    font-size: 2rem;
  }

  .restaurant-info__images {
    flex-direction: column;
    width: 100%;
  }

  .restaurant-info__image2 {
    margin-top: 0;
    margin-left: auto;
  }

  /* в колонке убрать отступ */
  .restaurant-info__text {
    max-width: none;
  }

  /* текст занимает всю ширину */
}

/* ================== МОДАЛЬНЫЕ ОКНА ================== */

/* Общие стили для overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 10001; /* выше z-index: 10000 у шапки */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Анимация появления */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active .modal-v1,
.modal-fade-enter-active .modal-v2,
.modal-fade-enter-active .modal-v3,
.modal-fade-leave-active .modal-v1,
.modal-fade-leave-active .modal-v2,
.modal-fade-leave-active .modal-v3 {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-v1,
.modal-fade-enter-from .modal-v2,
.modal-fade-enter-from .modal-v3 {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

.modal-fade-leave-to .modal-v1,
.modal-fade-leave-to .modal-v2,
.modal-fade-leave-to .modal-v3 {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

/* ================== ВАРИАНТ 1: Минималистичное модальное окно ================== */
.modal-v1 {
  position: relative;
  background: var(--white);
  border-radius: 32px;
  padding: 60px 50px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
}

.modal-v1__close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
}

.modal-v1__close:hover {
  background: #e8e8e8;
  transform: rotate(90deg);
}

.modal-v1__close svg {
  width: 20px;
  height: 20px;
  stroke: var(--noble-black-400);
}

.modal-v1__icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #fbec78 0%, #f5e45a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.modal-v1__icon svg {
  width: 36px;
  height: 36px;
  stroke: var(--noble-black-600);
}

.modal-v1__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 28px;
  line-height: 130%;
  color: var(--noble-black-600);
  margin-bottom: 8px;
}

.modal-v1__text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: var(--noble-black-300);
  margin-bottom: 24px;
}

.modal-v1__phone {
  display: block;
  font-family: var(--second-family);
  font-weight: 600;
  font-size: 28px;
  color: var(--noble-black-600) !important;
  margin-bottom: 16px;
  opacity: 1 !important;
  text-decoration: none !important;
  white-space: nowrap;
}

.modal-v1__phone:hover,
.modal-v1__phone:visited,
.modal-v1__phone:active,
.modal-v1__phone:focus {
  color: var(--noble-black-600) !important;
  opacity: 1 !important;
  text-decoration: none !important;
}

.modal-v1__hours {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 14px;
  color: var(--noble-black-300);
}

@media (max-width: 480px) {
  .modal-v1 {
    padding: 50px 24px;
    border-radius: 24px;
  }
  
  .modal-v1__phone {
    font-size: 22px;
  }
  
  .modal-v1__title {
    font-size: 22px;
  }
  
  .modal-v1__icon {
    width: 64px;
    height: 64px;
  }
  
  .modal-v1__icon svg {
    width: 28px;
    height: 28px;
  }
}

/* ================== ВАРИАНТ 2: Двухколоночное модальное окно ================== */
.modal-v2 {
  position: relative;
  background: var(--white);
  border-radius: 40px;
  padding: 50px;
  max-width: 680px;
  width: 100%;
  display: flex;
  gap: 40px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
}

.modal-v2__close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
}

.modal-v2__close:hover {
  background: #e8e8e8;
  transform: rotate(90deg);
}

.modal-v2__close svg {
  width: 20px;
  height: 20px;
  stroke: var(--noble-black-400);
}

.modal-v2__left {
  flex: 1 1 50%;
}

.modal-v2__label {
  display: inline-block;
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--noble-black-300);
  margin-bottom: 12px;
}

.modal-v2__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 30px;
  line-height: 130%;
  color: var(--noble-black-600);
  margin-bottom: 12px;
}

.modal-v2__text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: var(--noble-black-300);
}

.modal-v2__right {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}

.modal-v2__card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #fbec78 0%, #f5e45a 100%);
  border-radius: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.modal-v2__card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(251, 236, 120, 0.4);
}

.modal-v2__card-icon {
  width: 52px;
  height: 52px;
  background: var(--noble-black-600);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.modal-v2__card-icon svg {
  width: 26px;
  height: 26px;
  stroke: var(--white);
}

.modal-v2__phone {
  font-family: var(--second-family);
  font-weight: 600;
  font-size: 22px;
  color: var(--noble-black-600) !important;
  opacity: 1 !important;
  text-decoration: none !important;
  white-space: nowrap;
}

.modal-v2__phone:hover,
.modal-v2__phone:visited,
.modal-v2__phone:active,
.modal-v2__phone:focus {
  color: var(--noble-black-600) !important;
  opacity: 1 !important;
  text-decoration: none !important;
}

.modal-v2__hours {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 14px;
  color: var(--noble-black-300);
  text-align: center;
}

@media (max-width: 640px) {
  .modal-v2 {
    flex-direction: column;
    gap: 24px;
    padding: 40px 24px;
    border-radius: 28px;
  }
  
  .modal-v2__title {
    font-size: 22px;
  }
  
  .modal-v2__phone {
    font-size: 18px;
  }
  
  .modal-v2__card {
    padding: 20px;
    gap: 12px;
  }
  
  .modal-v2__card-icon {
    width: 44px;
    height: 44px;
  }
  
  .modal-v2__card-icon svg {
    width: 22px;
    height: 22px;
  }
}

/* ================== ВАРИАНТ 3: С большой кнопкой ================== */
.modal-v3 {
  position: relative;
  background: var(--white);
  border-radius: 36px;
  padding: 50px 45px;
  max-width: 460px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
}

.modal-v3__close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 42px;
  height: 42px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
}

.modal-v3__close:hover {
  background: #e8e8e8;
  transform: rotate(90deg);
}

.modal-v3__close svg {
  width: 20px;
  height: 20px;
  stroke: var(--noble-black-400);
}

.modal-v3__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 26px;
  line-height: 130%;
  color: var(--noble-black-600);
  margin-bottom: 10px;
}

.modal-v3__text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: var(--noble-black-300);
  margin-bottom: 28px;
}

.modal-v3__button {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 20px 28px;
  background: linear-gradient(135deg, #fbec78 0%, #f5e45a 100%);
  border-radius: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-bottom: 20px;
}

.modal-v3__button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(251, 236, 120, 0.45);
}

.modal-v3__button-icon {
  width: 56px;
  height: 56px;
  background: var(--noble-black-600);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.modal-v3__button-icon svg {
  width: 28px;
  height: 28px;
  stroke: var(--white);
}

.modal-v3__button-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.modal-v3__button-label {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 13px;
  line-height: 1;
  color: var(--noble-black-400) !important;
}

.modal-v3__button-number {
  font-family: var(--second-family);
  font-weight: 600;
  font-size: 20px;
  line-height: 1.2;
  color: var(--noble-black-600) !important;
  opacity: 1 !important;
  white-space: nowrap;
}

.modal-v3__button:hover .modal-v3__button-number,
.modal-v3__button:visited .modal-v3__button-number,
.modal-v3__button:active .modal-v3__button-number,
.modal-v3__button:focus .modal-v3__button-number {
  color: var(--noble-black-600) !important;
  opacity: 1 !important;
}

.modal-v3__hours {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 14px;
  color: var(--noble-black-300);
}

@media (max-width: 480px) {
  .modal-v3 {
    padding: 40px 20px;
    border-radius: 28px;
  }
  
  .modal-v3__title {
    font-size: 20px;
  }
  
  .modal-v3__text {
    font-size: 14px;
    margin-bottom: 24px;
  }
  
  .modal-v3__button {
    padding: 16px;
    gap: 12px;
  }
  
  .modal-v3__button-icon {
    width: 44px;
    height: 44px;
  }
  
  .modal-v3__button-icon svg {
    width: 22px;
    height: 22px;
  }
  
  .modal-v3__button-number {
    font-size: 16px;
  }
  
  .modal-v3__button-label {
    font-size: 11px;
  }
  
  .modal-v3__button-text {
    gap: 3px;
  }
  .modal-v3__close{
      top: 8px;
      right: 8px;
  }
}

/* ================== Демо-блок для выбора варианта ================== */
.modal-demo__inner {
  border-radius: 60px;
  padding: 50px;
  background: var(--white);
  text-align: center;
}

.modal-demo__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  color: var(--noble-black-600);
  margin-bottom: 30px;
}

.modal-demo__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.modal-demo__btn {
  padding: 16px 28px;
  background: #fbec78;
  border: none;
  border-radius: 16px;
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 16px;
  color: var(--noble-black-600);
  cursor: pointer;
  transition: all 0.3s;
}

.modal-demo__btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(251, 236, 120, 0.4);
}

@media (max-width: 575px) {
  .modal-demo__inner {
    border-radius: 4.5rem;
    padding: 30px 20px;
  }
  
  .modal-demo__btn {
    width: 100%;
  }
}
</style>
