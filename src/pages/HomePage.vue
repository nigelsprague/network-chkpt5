<script setup>
import { AppState } from '@/AppState';
import PageNavigation from '@/components/globals/PageNavigation.vue';
import PostCard from '@/components/globals/PostCard.vue';
import PostForm from '@/components/globals/PostForm.vue';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, onUnmounted } from 'vue';

const ads = computed(() => AppState.ads)
const banners = computed(() => AppState.bannerAds)
const posts = computed(() => AppState.posts)

onMounted(() => {
  getAllPosts()
})

onUnmounted(() => {
  postsService.clearPosts()
})

async function getAllPosts() {
  try {
    await postsService.getAllPosts()
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
        <img class="img-fluid w-100 mt-3" :src="banner.banner" :alt="banner.title">
      </div>
      <div class="col-md-9">
        <PostForm />
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
      </div>
    </section>
    <PageNavigation />
    <div v-for="banner in banners" :key="banner.title" class="">
      <img class="img-fluid w-100" :src="banner.banner" :alt="banner.title">
    </div>
  </div>
</template>

<style scoped lang="scss">
@media (max-width: 700px) {
  .ads {
    display: none;
  }
}
</style>
