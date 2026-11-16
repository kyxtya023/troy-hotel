<!-- layouts/default.vue -->
<template>
  <div class="wrapper">
    <Header />
    <div class="page">
      <NuxtPage />
    </div>
    <CookieBanner />
    <ScrollToTop />
    <!-- Новогодняя кампания отключена. Для восстановления раскомментировать блок и импорт. -->
    <NewYearPopup />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import CookieBanner from '~/components/CookieBanner.vue';
import ScrollToTop from '~/components/ScrollToTop.vue';
import NewYearPopup from '~/components/newyear/NewYearPopup.vue';
</script>

<style>
.page {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* min-height: 100vh; */
}
</style>
