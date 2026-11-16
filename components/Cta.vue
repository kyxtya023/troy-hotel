<template>
  <section class="cta">
    <div class="container">
      <div
        class="cta__inner"
        :class="{
          'cta__inner--has-media': backgroundImage,
          'cta__medium': ctaMedium
        }"
        :style="backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}"
      >
        <div class="cta__content">
          <h2 class="cta__title">{{ title }}</h2>
          <p class="cta__text">{{ text }}</p>

          <a
            v-if="href"
            :href="href"
            :target="linkTarget"
            :rel="linkTarget ? 'noopener' : undefined"
            class="cta__button"
          >
            <span v-if="isPhoneLink" class="cta__button-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span>{{ buttonText }}</span>
          </a>
          <button v-else @click="$emit('click')" class="cta__button">
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title: string
  text: string
  buttonText?: string
  href?: string
  backgroundImage?: string
  ctaMedium?: boolean
}>()

defineEmits<{
  click: []
}>()

const isPhoneLink = computed(() => props.href?.startsWith("tel:") ?? false);
const linkTarget = computed(() => (isPhoneLink.value ? undefined : "_blank"));
</script>

<style scoped>
.cta__inner {
  position: relative;
  border-radius: 60px;
  padding: 115px;
  text-align: center;
  backdrop-filter: blur(2px);
  background-color: var(--white);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  z-index: 0;
}

.cta__content {
  position: relative;
  z-index: 2;
}

.cta__medium{
  margin: 0 auto;
  padding: 60px;
}  

.cta__inner--has-media {
  color: var(--white);
}

.cta__inner--has-media .cta__content {
  max-width: 92rem;
  margin: 0 auto;
  padding: 3.2rem 3.6rem;
  border-radius: 3.2rem;
  background: linear-gradient(
    135deg,
    rgba(26, 29, 33, 0.7) 0%,
    rgba(26, 29, 33, 0.56) 48%,
    rgba(26, 29, 33, 0.24) 100%
  );
  backdrop-filter: blur(3px);
}

.cta__inner--has-media .cta__title,
.cta__inner--has-media .cta__text {
  color: var(--white);
  text-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
}

.cta__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 36px;
  line-height: 122%;
  letter-spacing: -0.02em;
  text-align: center;
  color: #2a3342;
  margin-bottom: 1.6rem;
}

.cta__text {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
  text-align: center;
  color: #556987;
  max-width: 80rem;
  margin: 0 auto 5.4rem;
}

.cta__button {
  max-width: 250px;
  margin: 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 18px;
  line-height: 133%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  border-radius: 20px;
  padding: 15px 20px;
  min-width: 227px;
  height: 54px;
  background: #fbec78;
  transition: background-color 0.3s ease, box-shadow 0.3s ease,
    transform 0.3s ease, color 0.3s ease;
}

.cta__button-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cta__button-icon svg {
  width: 18px;
  height: 18px;
}

@media (hover: hover) {
  .cta__button:hover {
    background: var(--sunglow-600);
    box-shadow: 0 12px 24px rgba(226, 180, 43, 0.24);
    transform: translateY(-1px);
    color: var(--noble-black-600);
  }
}

/* адаптив */
@media (max-width: 998px) {
  .cta__inner {
    padding: 8rem 4rem;
  }

  .cta__inner--has-media .cta__content {
    padding: 2.8rem 3rem;
  }

  .cta__title {
    font-size: 3rem;
  }
  .cta__text {
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .cta__title {
    font-size: 2.7rem;
  }
}

@media (max-width: 575px) {
  .cta__title {
    font-size: 2.4rem;
  }
}

@media (max-width: 480px) {
  .cta__inner {
    padding: 4.5rem 2.5rem;
  }

  .cta__inner--has-media .cta__content {
    padding: 2.4rem 1.8rem;
    border-radius: 2.4rem;
  }

  .cta__text {
    margin-bottom: 3.5rem;
  }
}

@media (max-width: 380px) {
  .cta__inner {
    padding: 3rem 1.5rem;
  }
  .cta__title {
    font-size: 2.2rem;
  }
}
</style>
