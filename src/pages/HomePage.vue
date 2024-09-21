<script setup>
import { AppState } from '@/AppState';
import PostCard from '@/components/globals/PostCard.vue';
import PostForm from '@/components/globals/PostForm.vue';
import { adsService } from '@/services/AdsService';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const ads = computed(() => AppState.ads)
const posts = computed(() => AppState.posts)

onMounted(() => {
  getAds()
  getAllPosts()
})

async function getAds() {
  try {
    await adsService.getAds()
  }
  catch (error){
    Pop.meow(error);
    logger.log(error)
  }
}

async function getAllPosts() {
  try {
    await postsService.getAllPosts()
  }
  catch (error){
    Pop.meow(error);
    logger.log(error)
  }
}

async function changePage() {
  try {
    logger.log('changing page')
  }
  catch (error){
    Pop.meow(error);
    logger.log(error)
  }
}
</script>

<template>
  <div class="container">
    <section class="row">
      <div class="col-9">
        <PostForm />
        <div v-for="post in posts" :key="post.id">
          <PostCard :postProp="post" />
        </div>
        <div class="d-flex gap 4 justify-content-evenly
         align-items-center px-5 my-3">
          <button @click="changePage()" class="btn btn-outline-info">Previous</button>
          <span>Page {{  }} of {{  }}</span>
          <button @click="changePage()" class="btn btn-outline-info">Next</button>
        </div>
      </div>
      <div class="col-3">
        <div v-for="ad in ads" :key="ad.title" class="mt-3 mb-5">
          <img class="img-fluid" :src="ad.tall" :alt="ad.title">
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
</style>
