<template>
  <main class="main">
    <div class="legal">
      <div class="container">
        <div class="legal__inner">
          <!-- Заголовок -->
          <header class="legal__header">
            <h1 class="legal__title">Правовая информация</h1>
            <p class="legal__subtitle">
              Здесь вы найдете все юридические документы и информацию о компании
            </p>
          </header>

          <!-- Поиск -->
          <div class="legal__search">
            <div class="legal__search-wrapper">
              <svg class="legal__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                class="legal__search-input"
                placeholder="Поиск по документам..."
                @input="handleSearch"
              />
              <button
                v-if="searchQuery"
                class="legal__search-clear"
                @click="clearSearch"
                aria-label="Очистить поиск"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p v-if="searchQuery && filteredSections.length === 0" class="legal__search-empty">
              По вашему запросу ничего не найдено
            </p>
            <p v-if="searchQuery && filteredSections.length > 0" class="legal__search-results">
              Найдено совпадений: {{ totalMatches }}
            </p>
          </div>

          <!-- Секции документов -->
          <div class="legal__sections">
            <div
              v-for="(section, index) in filteredSections"
              :key="section.id"
              class="legal__section"
              :class="{ 'legal__section--open': openSections.includes(section.id) }"
            >
              <button
                class="legal__section-header"
                @click="toggleSection(section.id)"
                :aria-expanded="openSections.includes(section.id)"
              >
                <div class="legal__section-info">
                  <span class="legal__section-number">{{ String(index + 1).padStart(2, '0') }}</span>
                  <h2 class="legal__section-title">{{ section.title }}</h2>
                </div>
                <div class="legal__section-toggle">
                  <svg
                    class="legal__section-icon"
                    :class="{ 'legal__section-icon--rotated': openSections.includes(section.id) }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </button>
              
              <Transition name="accordion">
                <div v-show="openSections.includes(section.id)" class="legal__section-content">
                  <div class="legal__section-body">
                    <LegalCompanyDetails v-if="section.type === 'company'" />
                    <div v-else v-html="renderSectionContent(section)"></div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Контакты -->
          <div class="legal__contacts">
            <h3 class="legal__contacts-title">Остались вопросы?</h3>
            <p class="legal__contacts-text">
              По всем юридическим вопросам вы можете связаться с нами:
            </p>
            <div class="legal__contacts-info">
              <a href="mailto:info@troy-hotel.ru" class="legal__contacts-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                info@troy-hotel.ru
              </a>
              <a href="tel:+78002002533" class="legal__contacts-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +7 800 200-25-33
              </a>
              <a href="tel:+79681999181" class="legal__contacts-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +7 968 199-91-81
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '#app'
import offerContent from '../content/legal/offer.md?raw'
import personalDataContent from '../content/legal/personal-data.md?raw'
import bookingRulesContent from '../content/legal/booking-rules.md?raw'
import privacyPolicyContent from '../content/legal/privacy-policy.md?raw'

useHead({
  title: 'Правовая информация — Парк-отель «Троя»',
  meta: [
    {
      name: 'description',
      content: 'Правовая информация, реквизиты компании, договор оферты, политика конфиденциальности и правила бронирования парк-отеля «Троя» в Краснодаре.'
    }
  ]
})

definePageMeta({
  pageTransition: {
    name: 'fade-soft',
    mode: 'out-in',
    css: true,
    duration: { enter: 300, leave: 300 }
  }
})

interface LegalSection {
  id: string
  title: string
  keywords: string[]
  type?: 'company' | 'document'
  content?: string
  format?: 'markdown'
}

const sections: LegalSection[] = [
  {
    id: 'company',
    title: 'Реквизиты компании',
    keywords: ['реквизиты', 'инн', 'огрн', 'кпп', 'адрес', 'компания', 'юридический', 'банк', 'расчётный счёт'],
    type: 'company'
  },
  {
    id: 'offer',
    title: 'Договор оферты',
    keywords: ['договор', 'оферта', 'публичная оферта', 'условия', 'бронирование', 'услуги', 'акцепт', 'заказ'],
    format: 'markdown',
    content: offerContent
  },
  {
    id: 'personal-data',
    title: 'Согласие на обработку персональных данных',
    keywords: ['персональные данные', 'согласие', 'обработка', 'конфиденциальность', 'защита данных', 'cookies', 'фз-152'],
    format: 'markdown',
    content: personalDataContent
  },
  {
    id: 'booking-rules',
    title: 'Правила бронирования',
    keywords: ['бронирование', 'правила', 'заселение', 'выселение', 'отмена', 'регистрация', 'проживание', 'питомцы'],
    format: 'markdown',
    content: bookingRulesContent
  },
  {
    id: 'privacy-policy',
    title: 'Политика конфиденциальности',
    keywords: ['конфиденциальность', 'политика', 'данные', 'защита', 'cookies', 'безопасность', 'приватность'],
    format: 'markdown',
    content: privacyPolicyContent
  }
]

const searchQuery = ref('')
const openSections = ref<string[]>([])

const filteredSections = computed(() => {
  if (!searchQuery.value.trim()) {
    return sections
  }
  
  const query = searchQuery.value.toLowerCase()
  return sections.filter(section => {
    const titleMatch = section.title.toLowerCase().includes(query)
    const contentMatch = (section.content || '').toLowerCase().includes(query)
    const keywordsMatch = section.keywords.some(k => k.toLowerCase().includes(query))
    return titleMatch || contentMatch || keywordsMatch
  })
})

const totalMatches = computed(() => {
  if (!searchQuery.value.trim()) return 0
  
  const query = searchQuery.value.toLowerCase()
  let count = 0
  
  filteredSections.value.forEach(section => {
    const content = (section.content || '').toLowerCase()
    const title = section.title.toLowerCase()
    
    // Count matches in title
    let pos = 0
    while ((pos = title.indexOf(query, pos)) !== -1) {
      count++
      pos += query.length
    }
    
    // Count matches in content (approximate, as content has HTML)
    pos = 0
    while ((pos = content.indexOf(query, pos)) !== -1) {
      count++
      pos += query.length
    }
  })
  
  return count
})

function toggleSection(id: string) {
  const index = openSections.value.indexOf(id)
  if (index === -1) {
    openSections.value.push(id)
  } else {
    openSections.value.splice(index, 1)
  }
}

function handleSearch() {
  // Auto-open sections that match search
  if (searchQuery.value.trim()) {
    openSections.value = filteredSections.value.map(s => s.id)
  }
}

function clearSearch() {
  searchQuery.value = ''
  openSections.value = []
}

function renderSectionContent(section: LegalSection): string {
  if (section.format === 'markdown') {
    return renderMarkdownContent(section.content || '')
  }

  return highlightText(section.content || '')
}

function renderMarkdownContent(content: string): string {
  const blocks = content
    .split(/\n{2,}/)
    .map(block => block.trim())
    .filter(Boolean)

  return blocks.map(block => {
    if (block.startsWith('## ')) {
      return '<h3 class="legal__heading">' + renderInlineText(block.slice(3)) + '</h3>'
    }

    if (block.startsWith('# ')) {
      return '<p class="legal__paragraph"><strong>' + renderInlineText(block.slice(2)) + '</strong></p>'
    }

    return '<p class="legal__paragraph">' + renderInlineText(block.replace(/\n+/g, ' ')) + '</p>'
  }).join('')
}

function renderInlineText(text: string): string {
  const escaped = escapeHtml(text)
  const withStrong = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  return highlightText(withStrong)
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function highlightText(content: string): string {
  if (!searchQuery.value.trim()) return content

  const query = searchQuery.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${query})`, 'gi')
  return content.replace(regex, '<mark class="legal__highlight">$1</mark>')
}
</script>

<style scoped>
.legal {
  min-height: 100vh;
}

.legal__inner {
  border-radius: 60px;
  padding: 60px;
  background: var(--white);
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* Header */
.legal__header {
  text-align: center;
  margin-bottom: 1rem;
}

.legal__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 4.8rem;
  line-height: 120%;
  color: var(--noble-black-600);
  margin-bottom: 1.5rem;
}

.legal__subtitle {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-300);
}

/* Search */
.legal__search {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.legal__search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.legal__search-icon {
  position: absolute;
  left: 20px;
  width: 20px;
  height: 20px;
  color: var(--noble-black-300);
  pointer-events: none;
}

.legal__search-input {
  width: 100%;
  padding: 16px 50px 16px 52px;
  border: 2px solid var(--noble-black-100);
  border-radius: 16px;
  font-family: var(--second-family);
  font-size: 16px;
  font-weight: 300;
  color: var(--noble-black-600);
  background: #f8f8f8;
  transition: all 0.3s ease;
}

.legal__search-input::placeholder {
  color: var(--noble-black-300);
}

.legal__search-input:focus {
  outline: none;
  border-color: var(--sunglow-500);
  background: var(--white);
  box-shadow: 0 4px 20px rgba(255, 209, 71, 0.15);
}

.legal__search-clear {
  position: absolute;
  right: 16px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--noble-black-300);
  transition: color 0.2s;
}

.legal__search-clear:hover {
  color: var(--noble-black-600);
}

.legal__search-clear svg {
  width: 100%;
  height: 100%;
}

.legal__search-empty,
.legal__search-results {
  text-align: center;
  margin-top: 1rem;
  font-family: var(--second-family);
  font-size: 14px;
  color: var(--noble-black-300);
}

/* Sections */
.legal__sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.legal__section {
  border: 2px solid var(--noble-black-100);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.legal__section:hover {
  border-color: var(--noble-black-200);
}

.legal__section--open {
  border-color: var(--sunglow-500);
  box-shadow: 0 4px 25px rgba(255, 209, 71, 0.12);
}

.legal__section-header {
  width: 100%;
  padding: 24px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.3s ease;
}

.legal__section-header:hover {
  background: #fafafa;
}

.legal__section--open .legal__section-header {
  background: linear-gradient(135deg, #fffef5 0%, #fff9e6 100%);
}

.legal__section-info {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.legal__section-number {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 14px;
  color: var(--sunglow-600);
  min-width: 28px;
}

.legal__section-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 130%;
  color: var(--noble-black-600);
  margin: 0;
}

.legal__section-toggle {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--noble-black-100);
  transition: all 0.3s ease;
}

.legal__section--open .legal__section-toggle {
  background: var(--sunglow-500);
}

.legal__section-icon {
  width: 20px;
  height: 20px;
  color: var(--noble-black-400);
  transition: transform 0.3s ease, color 0.3s ease;
}

.legal__section--open .legal__section-icon {
  color: var(--noble-black-600);
}

.legal__section-icon--rotated {
  transform: rotate(180deg);
}

/* Content */
.legal__section-content {
  overflow: hidden;
}

.legal__section-body {
  padding: 0 30px 30px;
  border-top: 1px solid var(--noble-black-100);
  padding-top: 24px;
}

/* Accordion animation */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 2000px;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}

/* Document styles */
:deep(.legal__paragraph) {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 16px;
  line-height: 160%;
  color: var(--noble-black-600);
  margin-bottom: 1.5rem;
}

:deep(.legal__heading) {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-600);
  margin: 2.5rem 0 1.5rem;
}

:deep(.legal__heading:first-child) {
  margin-top: 0;
}

:deep(.legal__list) {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

:deep(.legal__list li) {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 16px;
  line-height: 160%;
  color: var(--noble-black-600);
}

:deep(.legal__table-wrapper) {
  width: 100%;
  overflow-x: auto;
  margin: 1.5rem 0;
}

:deep(.legal__table) {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 15px;
  line-height: 150%;
  color: var(--noble-black-600);
}

:deep(.legal__table td) {
  border: 1px solid var(--noble-black-100);
  padding: 10px 12px;
  vertical-align: top;
}

:deep(.legal__link) {
  color: var(--noble-black-600);
  text-decoration: underline;
  transition: color 0.2s;
}

:deep(.legal__link:hover) {
  color: var(--sunglow-600);
}

:deep(.legal__date) {
  color: var(--noble-black-300);
  font-style: italic;
  margin-top: 2rem;
}

:deep(.legal__highlight) {
  background: var(--sunglow-300);
  padding: 0 2px;
  border-radius: 2px;
}

/* Contacts */
.legal__contacts {
  margin-top: 2rem;
  padding: 40px;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  border-radius: 24px;
  text-align: center;
}

.legal__contacts-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  line-height: 130%;
  color: var(--noble-black-600);
  margin-bottom: 1rem;
}

.legal__contacts-text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: var(--noble-black-400);
  margin-bottom: 2rem;
}

.legal__contacts-info {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.legal__contacts-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 18px;
  color: var(--noble-black-600);
  text-decoration: none;
  padding: 12px 20px;
  background: var(--white);
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.legal__contacts-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  color: var(--sunglow-600);
}

.legal__contacts-link svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 1200px) {
  .legal__title {
    font-size: 4rem;
  }
}

@media (max-width: 1024px) {
  .legal__inner {
    padding: 45px;
  }
}

@media (max-width: 768px) {
  .legal__inner {
    padding: 35px;
  }
  
  .legal__title {
    font-size: 3.2rem;
  }
  
  .legal__section-header {
    padding: 20px 24px;
  }
  
  .legal__section-info {
    gap: 1.5rem;
  }
  
  .legal__section-title {
    font-size: 18px;
  }
  
  .legal__section-body {
    padding: 0 24px 24px;
  }
  
  .legal__contacts {
    padding: 30px 20px;
  }
  
  .legal__contacts-info {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}

@media (max-width: 575px) {
  .legal__inner {
    padding: 3rem 2rem;
    border-radius: 45px;
  }
  
  .legal__title {
    font-size: 2.8rem;
  }
  
  .legal__section {
    border-radius: 20px;
  }
  
  .legal__section-header {
    padding: 18px 20px;
  }
  
  .legal__section-number {
    display: none;
  }
  
  .legal__section-toggle {
    width: 36px;
    height: 36px;
  }
  
  .legal__section-body {
    padding: 0 20px 20px;
  }
  
  .legal__search-input {
    padding: 14px 45px 14px 48px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .legal__title {
    font-size: 2.4rem;
  }
  
  .legal__section-title {
    font-size: 16px;
  }
}
</style>



