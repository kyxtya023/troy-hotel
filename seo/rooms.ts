import { rooms } from "~/data/rooms";

const SITE_URL = "https://troy-hotel.ru";

export const roomsPageSEO = {
  title: "Номера — Парк-отель «Троя» в Краснодаре",
  meta: [
    {
      name: "description",
      content:
        "Номерной фонд парк-отеля «Троя» в Краснодаре: Комфорт DBL, Комфорт TWIN, Комфорт трехместный, Джуниор Сьют, Люкс, Апартаменты, Стандарт SGL и Стандарт DBL. Просторные номера, Wi-Fi и комфорт для отдыха и поездок.",
    },
    {
      name: "keywords",
      content:
        "отель Троя Краснодар, номера отеля Краснодар, Комфорт DBL, Комфорт TWIN, Комфорт трехместный, Джуниор Сьют, Люкс, Апартаменты, Стандарт SGL, Стандарт DBL",
    },
    {
      property: "og:title",
      content: "Номерной фонд — Парк-отель «Троя» в Краснодаре",
    },
    {
      property: "og:description",
      content:
        "Выберите подходящий номер в парк-отеле «Троя»: Комфорт DBL, Комфорт TWIN, Комфорт трехместный, Джуниор Сьют, Люкс, Апартаменты, Стандарт SGL и Стандарт DBL.",
    },
    {
      property: "og:image",
      content: "https://troy-hotel.ru/rooms/XXXL1.jpg",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${SITE_URL}/rooms`,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Номера — Парк-отель «Троя» в Краснодаре",
        description:
          "Выберите свой номер в парк-отеле «Троя»: Комфорт DBL, Комфорт TWIN, Комфорт трехместный, Джуниор Сьют, Люкс, Апартаменты, Стандарт SGL и Стандарт DBL.",
        url: `${SITE_URL}/rooms`,
        image: "https://troy-hotel.ru/rooms/XXXL1.jpg",
        mainEntity: rooms.map((room, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/rooms/${room.slug}`,
          name: room.title,
          image: room.seo.ogImage,
          description: room.shortDescription,
        })),
      }),
    },
  ],
};
