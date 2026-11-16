<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__content">
          <div class="footer__brand">
            <div class="footer__logo">
              <img
                style="max-height: 120px"
                src="/logo.png"
                alt="Парк-отель Троя логотип"
              />
            </div>
            <div class="footer__extra">
              <div class="footer__info">
                <div class="footer__item footer__item--phones">
                  <span class="footer__item-title">Телефоны</span>
                  <a href="tel:+78002002533" class="footer__item-text" data-allow-mismatch="children"
                    >+7 800 200-25-33</a
                  >
                  <a href="tel:+79681999181" class="footer__item-text" data-allow-mismatch="children"
                    >+7 968 199-91-81</a
                  >
                </div>
                <div class="footer__item">
                  <span class="footer__item-title">Почта</span>
                  <a href="mailto:info@troy-hotel.ru" class="footer__item-text"
                    >info@troy-hotel.ru</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="footer__contacts">
            <h4 class="footer__title">Контакты</h4>
            <ul class="footer__list">
              <li class="footer__list-item">Краснодар, ул. 1-го Мая 131</li>
              <li class="footer__list-item footer__list-item--phone">
                <span class="footer__list-label">Основной номер</span>
                <a href="tel:+78002002533" class="footer__link" data-allow-mismatch="children"
                  >+7 800 200-25-33</a
                >
              </li>
              <li class="footer__list-item footer__list-item--phone">
                <span class="footer__list-label">Бронирование</span>
                <a href="tel:+79681999181" class="footer__link" data-allow-mismatch="children">+7 968 199-91-81</a>
              </li>
            </ul>
          </div>

          <div class="footer__partners">
            <h4 class="footer__subtitle">Наши партнёры</h4>
            <div class="footer__partners-list">
              <img
                src="/home/advantages/hotel-recommend.jpg"
                alt="101 отель рекомендует"
                class="footer__partner-logo"
              />
              <div class="footer__partner-map">
                <img
                  src="/home/advantages/yandex-badge.png"
                  alt="Парк-отель Троя на Яндекс.Картах"
                  class="footer__partner-map-icon"
                />
                <div class="footer__partner-rating">
                  <div class="footer__partner-title">Хорошее место — 2026</div>
                  <div class="footer__partner-descr">
                    Награда для любимых мест пользователей Яндекс карт
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <div class="footer__privacy">
            <NuxtLink class="footer__privacy-link" to="/legal">Правовая информация</NuxtLink>
            <span class="footer__separator"></span>
            
            <div style="color: var(--noble-black-300)">
              Разработано
              <a
                class="footer__privacy-link"
                href="https://t.me/chernyshevskiii"
                >Ильей Чернышевским</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup></script>

<style scoped>
/* Основной блок */
.footer {
  margin-top: 5rem;
  position: relative;
  background: var(--white);
  z-index: 0;
}

.footer__inner {
  border-radius: 60px;
  z-index: 0;
  overflow: hidden;
}

.footer__content {
  padding: 100px;
  grid-template-columns: 1fr 1fr 1fr;
  display: grid;
}

/* Бренд */
.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  /* max-width: 42rem; */
  /* width: 100%; */
  flex: 1;
}

.footer__logo img {
  /* max-height: 60px;
  width: auto; */
}

.footer__social {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.footer__social-link {
}

.footer__social-link {
}

/* Контакты */
.footer__contacts {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  flex: 1;
}

.footer__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 22px;
  line-height: 100%;
  color: var(--noble-black-600);
}

.footer__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer__list-item {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 100%;
  color: var(--noble-black-600);
  white-space: nowrap;
  -webkit-touch-callout: none;
  /* Отключает меню */
  -webkit-user-select: text;
  /* Позволяет выделять */
  -webkit-tap-highlight-color: transparent;
}

.footer__list-item--phone {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  white-space: normal;
}

.footer__list-label {
  font-family: var(--second-family);
  font-weight: 350;
  font-size: 14px;
  line-height: 130%;
  color: var(--noble-black-300);
}

.footer__link {
  color: var(--noble-black-600);
  transition: color 0.3s ease;
}

.footer__link:hover {
  color: var(--sunglow-600);
}

/* Дополнительная информация */
/* .footer__cont-extra-wrapper {
  display: flex;
  justify-content: space-between;

  gap: 6rem;
  flex: 1;
} */

.footer__extra {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  flex: 1;
  /* max-width: 51.4rem; */
}

.footer__info {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.footer__item {
  display: flex;
  flex-direction: column;
}

.footer__item--phones {
  gap: 0.6rem;
}

.footer__item-title {
  font-family: var(--second-family);
  font-weight: 350;
  font-size: 18px;
  line-height: 100%;
  color: var(--noble-black-300);
  margin-bottom: 1.3rem;
}

.footer__item-text {
  font-family: var(--second-family);
  font-weight: 350;
  font-size: 24px;
  line-height: 100%;
  text-transform: uppercase;
  color: var(--noble-black-600);
  transition: color 0.3s ease;
}

.footer__item-text:hover {
  color: var(--sunglow-600);
}

/* Партнёры */
.footer__partners {
  flex: 1;
}

.footer__subtitle {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 22px;
  line-height: 100%;
  color: var(--noble-black-600);
  margin-bottom: 3rem;
}

.footer__partners-list {
  display: flex;
  gap: 4.5rem;
}

.footer__partner-logo {
  border-radius: 15px;
  width: 120px;
  height: 120px;
}

.footer__partner-map {
  display: flex;
  align-items: flex-start;
  gap: 2.4rem;
  flex-direction: column;
}

.footer__partner-map-icon {
}

.footer__partner-rating {
}

.footer__partner-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  color: var(--noble-black-600);
}

.footer__partner-descr {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 17px;
  line-height: 140%;
  color: var(--noble-black-300);
  min-width: 230px;
}

.footer__bottom {
  padding: 60px;
  display: flex;
  justify-content: center;
}

.footer__privacy {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
}

.footer__separator {
  width: 2px;
  height: 20px;
  background-color: #999;
  display: inline-block;
}

.footer__privacy-link {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-600);
  margin: 0 5px;
  transition: color 0.3s ease;
}

.footer__privacy-link:hover {
  color: var(--sunglow-600);
}



/* @media (max-width: 1365.98px) {
  .footer__content {
    flex-direction: column;
    gap: 7rem;
  }

  .footer__brand {
    flex-direction: row;
    max-width: none;
    justify-content: space-between;
  }
} */

@media (max-width: 1300px) {
  .footer__privacy {
    flex-direction: column;
    gap: 2rem;
  }

  .footer__privacy-link {
    text-align: center;
  }

  .footer__separator {
    width: 60px;
    height: 2px;
  }

  .footer__content {
    padding: 70px;
  }
}

@media (max-width: 1150px) {
  .footer__content {
    padding: 50px 30px;
    grid-template-columns: 1fr 1fr;
    row-gap: 5rem;
  }

  .footer__content .footer__partners {
    grid-column: 1 / -1; /* занимает все колонки */
  }
}

/* @media (max-width: 1150px) {
  .footer__content {
    flex-direction: column;
  }
} */

@media (max-width: 1100px) {
  .footer__cont-extra-wrapper {
    flex-direction: column;
  }

  .footer__cont-extra-wrapper > .footer__partners {
    display: none;
  }

  .footer__partner-descr {
    min-width: auto;
  }

  .footer__content {
    padding: 50px 30px;
  }

  .footer__brand > .footer__partners {
    display: block;
  }
}

@media (max-width: 1023.98px) {
  /* .footer__partners-list {
    flex-direction: column;
  } */

  /* .footer__partner-map {
    flex-direction: column;
    align-items: flex-start;
  } */

  .footer__partner-descr {
    max-width: 25rem;
  }
}

@media (max-width: 850px) {
  .footer__content {
    grid-template-columns: 1fr;
    row-gap: 5rem;
  }
}

@media (max-width: 650px) {
  .footer__brand {
    flex-direction: column;
  }

  .footer__item-text {
    font-size: 22px;
  }
}

@media (max-width: 575px) {
  .footer__inner {
    border-radius: 45px;
  }

  .footer__content {
    padding: 4rem 2rem;
  }

  .footer__item-text {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .footer__content {
    padding: 3rem 1rem;
  }

  .footer__partners-list {
    flex-direction: column;
  }
}
</style>
