// ~/seo/legal.ts
export const legalSEO = {
  title: "Правовая информация | Парк-отель «Троя» – документы и реквизиты",
  meta: [
    {
      name: "description",
      content:
        "Правовая информация Парк-отеля «Троя»: реквизиты компании, договор оферты, согласие на обработку персональных данных, правила бронирования и политика конфиденциальности."
    },
    {
      name: "keywords",
      content:
        "Troy Hotel, правовая информация, реквизиты компании, договор оферты, персональные данные, правила бронирования, политика конфиденциальности"
    },
    {
      property: "og:title",
      content: "Правовая информация | Парк-отель «Троя» – документы и реквизиты"
    },
    {
      property: "og:description",
      content:
        "Правовая информация Парк-отеля «Троя»: реквизиты компании, договор оферты, согласие на обработку персональных данных, правила бронирования."
    },
    { property: "og:type", content: "website" },
    { property: 'og:image', content: 'https://troy-hotel.ru/home/home-2.jpg' },
    { property: "og:url", content: "https://troy-hotel.ru/legal" }
  ],
  link: [
    { rel: "canonical", href: "https://troy-hotel.ru/legal" }
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Правовая информация Парк-отель «Троя»",
        url: "https://troy-hotel.ru/legal",
        description:
          "Правовая информация Парк-отеля «Троя»: реквизиты компании, договор оферты, согласие на обработку персональных данных, правила бронирования и политика конфиденциальности.",
        publisher: {
          "@type": "Organization",
          name: "Парк-отель «Троя»",
          url: "https://troy-hotel.ru",
          logo: "https://troy-hotel.ru/logo.png"
        },
        mainEntity: {
          "@type": "CreativeWork",
          name: "Правовая информация",
          text: "Официальные документы и правовая информация Парк-отеля «Троя»: реквизиты компании, договор оферты, согласие на обработку персональных данных, правила бронирования и политика конфиденциальности."
        }
      }, null, 2)
    }
  ]
}
