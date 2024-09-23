<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
import { onMounted } from 'vue';
import { adsService } from './services/AdsService';
import Pop from './utils/Pop';
import { logger } from './utils/Logger';


onMounted(() => {
  getAds()
  getBannerAds()
})

async function getAds() {
  try {
    await adsService
      .getAds()
  }
  catch (error) {
    Pop.meow(error);
    logger.log(error)
  }
}

async function getBannerAds() {
  try {
    await adsService.getBannerAds()
  }
  catch (error) {
    Pop.meow(error);
    logger.log(error)
  }
}

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

:root {
  --main-height: calc(100vh - 32px - 64px);
}
</style>
