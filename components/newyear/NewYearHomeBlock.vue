<template>
  <section class="ny-home">
    <div class="container">
      <div class="ny-home__inner">
        <img
          class="ny-home__image"
          src="/new-year/newyear-bg.jpg"
          alt=""
          aria-hidden="true"
        />

        <div class="ny-home__glass-wrapper">
          <div class="ny-home__glass-left">
            <div class="ny-home__block-text">
              <h2 class="ny-home__title">Встречайте Новый год в «Трое»</h2>

              <p class="ny-home__descr">
                Новогодние корпоративы для вашей компании в декабре и
                праздничная новогодняя ночь в ресторане «Свои Люди».
                Шоу-программа, ведущий и атмосфера настоящего праздника.
              </p>
            </div>

            <div class="ny-home__badges">
              <div class="ny-home__badge-group">
                <p class="ny-home__badge-date">ВЕСЬ ДЕКАБРЬ 2026</p>
                <span class="ny-home__badge"> Новогодние корпоративы </span>
              </div>

              <div class="ny-home__badge-group">
                <p class="ny-home__badge-date">31 ДЕКАБРЯ - 21:00</p>
                <span class="ny-home__badge"> Новогодняя ночь </span>
              </div>
            </div>
          </div>

          <div class="ny-home__glass-right">
            <p class="ny-home__list-title">Вас ждёт праздничная программа</p>

            <ul class="ny-home__list">
              <li class="ny-home__list-item">
                Ведущий, DJ, конкурсы и розыгрыши
              </li>
              <li class="ny-home__list-item">
                Призы и подарки, в том числе сертификаты на услуги отеля
              </li>
              <li class="ny-home__list-item">Дед Мороз и Снегурочка</li>
              <li class="ny-home__list-item">
                Стильная фотозона для праздничных снимков
              </li>
              <li class="ny-home__list-item">
                Велком-зона с игристым, фруктами и закусками: канапе,
                тарталетками и брускеттами
              </li>
            </ul>

            <NuxtLink class="ny-home__btn" to="/restaurant#new-year">
              Подробнее
              <span class="ny-home__btn-arrow">↗</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ny-home {
  position: relative;
}

.ny-home__inner {
  position: relative;
  isolation: isolate;
  min-height: 65rem;
  overflow: hidden;
  border-radius: 4rem;
  background: #211e19;
  color: #fff;
}

/* Фоновая фотография */
.ny-home__image {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

  -webkit-mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.72) 35%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.72) 35%,
    rgba(0, 0, 0, 0) 100%
  );
}

/* Общая стеклянная оболочка */
.ny-home__glass-wrapper {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;

  max-width: 82rem;

  margin: 6rem 6rem 6rem auto;
  padding: 5rem;
  gap: 5rem;

  overflow: hidden;

  border: 1px solid rgba(146, 146, 146, 0.75);
  border-radius: 3rem;

  background: rgb(89 89 89 / 50%);
  /* background: rgba(92, 80, 61, 0.5); */
  backdrop-filter: blur(10px);

  -webkit-backdrop-filter: blur(40px);

  box-shadow:
    0 2rem 5rem rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

/* Левая колонка */
.ny-home__glass-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.ny-home__block-text {
  max-width: 65rem;
}

.ny-home__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 3.2rem;
  line-height: 120%;
  color: var(--noble-black-100);
  margin-bottom: 2rem;
}

.ny-home__descr {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 140%;
  color: var(--gray-100);
}

/* Нижние бейджи */
.ny-home__badges {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 5rem;
}

.ny-home__badge-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.ny-home__badge-date {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 2.1rem;
  line-height: 120%;
  color: var(--gray-100);
}

.ny-home__badge {
  display: inline-flex;
  align-items: center;
  border-radius: 2rem;
  padding: 0.7rem 1.6rem;
  background: #fbec78;
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 120%;
  color: var(--noble-black-600);
}

/* Правая колонка */
.ny-home__glass-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.ny-home__list-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 2.1rem;
  line-height: 140%;
  color: var(--noble-black-100);
  margin-bottom: 2.5rem;
}

/* Список программы */
.ny-home__list {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  margin: 0;
  padding: 0;

  list-style: none;
}

.ny-home__list-item {
  border-left: 1px solid #edd146;
  padding-left: 2.4rem;

  font-family: var(--second-family);
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 140%;
  color: var(--noble-black-100);
}

/* Кнопка */
.ny-home__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  min-height: 5.5rem;
  margin-top: 2.5rem;
  border-radius: 2rem;
  padding: 2rem 3.5rem;
  background: #fbec78;
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 133%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  transition: all 0.2s;
}

.ny-home__btn:hover {
  background-color: var(--sunglow-600);
  box-shadow: 0 12px 24px rgba(226, 180, 43, 0.24);
  transform: translateY(-1px);
}

.ny-home__btn-arrow {
  font-size: 1.8rem;
  transition: transform 0.3s ease;
}

.ny-home__btn:hover .ny-home__btn-arrow {
  transform: translate(3px, -3px);
}

/* =========================================
   АДАПТИВ НОВОГОДНЕГО БЛОКА
========================================= */

/* Ноутбуки */
@media (max-width: 1400px) {

  .ny-home__inner {
    min-height: 62rem;
  }

  .ny-home__glass-wrapper {
    max-width: 75rem;
    margin: 4rem 4rem 4rem auto;
    padding: 4rem;
    gap: 3.5rem;
  }

  .ny-home__title {
    font-size: 2.9rem;
  }

  .ny-home__descr {
    font-size: 1.7rem;
  }

  .ny-home__badge-date {
    font-size: 1.8rem;
  }

  .ny-home__list-item {
    font-size: 1.6rem;
  }
}

/* Небольшие ноутбуки */
@media (max-width: 1100px) {

  .ny-home__inner {
    min-height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .ny-home__image {
    position: absolute;
    inset: 0 0 auto;
    z-index: 0;
    width: 100%;
    height: 45rem;
    object-fit: cover;
    object-position: center;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.72) 65%,
      rgba(0, 0, 0, 0) 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.72) 65%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .ny-home__glass-wrapper {
    position: relative;
    z-index: 1;
    width: calc(100% - 3rem);
    max-width: none;
    margin: 40rem auto 1rem;
    padding: 3rem;
    gap: 3rem;
  }

  .ny-home__title {
    font-size: 2.7rem;
  }

  .ny-home__descr {
    font-size: 1.6rem;
  }

  .ny-home__badge-date {
    font-size: 1.6rem;
  }

  .ny-home__badge {
    font-size: 1.4rem;
  }

  .ny-home__list-title {
    font-size: 1.9rem;
  }

  .ny-home__list-item {
    padding-left: 1.6rem;
    font-size: 1.5rem;
  }

  .ny-home__list {
    gap: 1.7rem;
  }

  .ny-home__btn {
    padding: 1.6rem 2.5rem;
    font-size: 1.6rem;
  }
}

/* Планшеты */
@media (max-width: 768px) {
  .ny-home__inner {
    min-height: auto;
  }

  /* Фотография остаётся видимой сверху */
  .ny-home__image {
    position: relative;
    display: block;
    inset: auto;
    z-index: 0;

    width: 100%;
    height: 35rem;

    object-fit: cover;
    object-position: center 35%;

    -webkit-mask-image: linear-gradient(
      to bottom,
      #000 0%,
      #000 65%,
      transparent 100%
    );

    mask-image: linear-gradient(to bottom, #000 0%, #000 65%, transparent 100%);
  }

  /* Стекло располагается ниже фотографии */
  .ny-home__glass-wrapper {
    grid-template-columns: 1fr;
    margin-top: 0;
    padding: 2.5rem;
    gap: 3rem;

    border-radius: 2.5rem;
  }

  .ny-home__glass-left {
    gap: 3rem;
  }

  .ny-home__glass-right {
    padding-top: 2.5rem;
    border-top: 1px solid rgba(146, 146, 146, 0.4);
  }

  .ny-home__title {
    font-size: 3.2rem;
  }

  .ny-home__descr {
    font-size: 1.7rem;
    line-height: 145%;
  }

  .ny-home__badges {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 0;
  }

  .ny-home__badge-date {
    font-size: 1.6rem;
  }

  .ny-home__list-title {
    font-size: 2.2rem;
  }

  .ny-home__list {
    gap: 2rem;
  }

  .ny-home__list-item {
    font-size: 1.6rem;
    line-height: 145%;
  }

  .ny-home__btn {
    margin-top: 3rem;
  }
}

/* Телефоны */
@media (max-width: 480px) {

  .ny-home__inner {
    border-radius: 2rem;
  }

  .ny-home__image {
    height: 28rem;
    object-position: center 30%;
  }

  .ny-home__glass-wrapper {
    width: calc(100% - 2rem);
    padding: 2rem;
    gap: 2rem;
    border-radius: 2rem;
  }

  .ny-home__title {
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
  }

  .ny-home__descr {
    font-size: 1.5rem;
    line-height: 150%;
  }

  .ny-home__badges {
    flex-direction: column;
    gap: 1.8rem;
  }

  .ny-home__badge-date {
    font-size: 1.5rem;
  }

  .ny-home__badge {
    font-size: 1.4rem;
    padding: 0.7rem 1.4rem;
  }

  .ny-home__glass-right {
    padding-top: 2.5rem;
  }

  .ny-home__list-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .ny-home__list {
    gap: 1.6rem;
  }

  .ny-home__list-item {
    font-size: 1.5rem;
    padding-left: 1.5rem;
  }

  .ny-home__btn {
    width: 100%;
    justify-content: center;
    margin-top: 2.5rem;
    padding: 1.5rem 2rem;
    font-size: 1.6rem;
  }
}

/* Очень маленькие телефоны */
@media (max-width: 360px) {

  .ny-home__image {
    height: 20rem;
  }

  .ny-home__glass-wrapper {
    padding: 1.8rem;
  }

  .ny-home__title {
    font-size: 2.5rem;
  }

  .ny-home__badge-date {
    font-size: 1.4rem;
  }
}
</style>
