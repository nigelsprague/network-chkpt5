<script setup>
import { AppState } from '@/AppState';
import PostForm from '@/components/globals/PostForm.vue';
import UserProfileCard from '@/components/globals/UserProfileCard.vue';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed } from 'vue';

const ads = computed(() => AppState.ads)
const posts = computed(() => AppState.posts)

async function getProfilePosts() {
  try {
    await postsService.getProfilePosts()
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
        <UserProfileCard />
        <PostForm />
        <div v-for="post in posts" :key="post.id">
          <!-- <PostCard :postProp="post" /> -->
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


<style lang="scss" scoped>

</style>