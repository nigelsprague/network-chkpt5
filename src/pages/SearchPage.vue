<script setup>
import { AppState } from '@/AppState';
import { adsService } from '@/services/AdsService';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, onUnmounted } from 'vue';
import { ref } from 'vue';

async function searchPosts() {
  try {
    await postsService.searchPosts(editableQuery.value)
  }
  catch (error) {
    Pop.meow(error);
    logger.error(error)
  }
}

onUnmounted(() => {
  postsService.clearSearchQuery()
})

const editableQuery = ref('')
const ads = computed(() => AppState.ads)
const banners = computed(() => AppState.bannerAds)
const posts = computed(() => AppState.posts)

onMounted(() => {
  getAds()
  getBannerAds()
})


async function getAds() {
  try {
    await adsService.getAds()
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
  <div class="container">
    <section class="row">
      <div v-for="banner in banners" :key="banner.title" class="">
        <img class="img-fluid w-100" :src="banner.banner" :alt="banner.title">
        <div class="col mt-3">
          <form @submit.prevent="searchPosts()">
            <div class="d-flex">
              <input v-model="editableQuery" type="text" class="form-control flex-grow-1" name="query" id="query"
                placeholder="Show me..." required>
              <button class="btn btn-outline-success ms-2" type="submit"><i class="mdi mdi-magnify"></i></button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-9">
        <div v-for="post in posts" :key="post.id">
          <PostCard :postProp="post" />
        </div>
      </div>
      <div class="col-3 ads">
        <div v-for="ad in ads" :key="ad.title" class="mt-3 mb-5">
          <img class="img-fluid" :src="ad.tall" :alt="ad.title">
        </div>
        <div v-for="ad in ads" :key="ad.title" class="mt-3 mb-5">
          <img class="img-fluid" :src="ad.tall" :alt="ad.title">
        </div>
        <div v-for="ad in ads" :key="ad.title" class="mt-3 mb-5">
          <img class="img-fluid" :src="ad.tall" :alt="ad.title">
        </div>
        <div v-for="ad in ads" :key="ad.title" class="mt-3 mb-5">
          <img class="img-fluid" :src="ad.tall" :alt="ad.title">
        </div>
        <div v-for="ad in ads" :key="ad.title" class="mt-3 mb-5">
          <img class="img-fluid" :src="ad.tall" :alt="ad.title">
        </div>
      </div>
    </section>
    <PageNavigation />
    <div v-for="banner in banners" :key="banner.title" class="">
      <img class="img-fluid w-100" :src="banner.banner" :alt="banner.title">
    </div>
  </div>
</template>


<style lang="scss" scoped>
@media (max-width: 700px) {
  .ads {
    display: none;
  }
}
</style>