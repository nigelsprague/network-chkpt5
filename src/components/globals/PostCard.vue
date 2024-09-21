<script setup>
import { AppState } from '@/AppState';
import { Post } from '@/models/Post';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, watch } from 'vue';

const account = computed(() => AppState.account)

const props = defineProps({
  postProp: {type: Post, required: true}
})

async function likePost(postId) {
  try {
    await postsService.likePost(postId)
  }
  catch (error){
    Pop.meow(error);
    logger.log(error)
  }
}

// async function setActiveProfile() {
//   try {
//     await postsService.setActiveProfile(props.postProp)
//   }
//   catch (error){
//     Pop.meow(error);
//     logger.log(error)
//   }
// }
</script>


<template>
  <div class="card p-3 my-3">
    <section class="row">
      <div class="d-flex align-items-center mb-3">
        <img class="img-fluid profile-img me-3" :src="postProp.creator.picture" :alt="postProp.creator.name" :title="postProp.creator.name">
        <div>
          <h6>{{ postProp.creator.name }}</h6>
          <p>{{ postProp.publishedOn }} <i v-if="postProp.creator.graduated" class="mdi mdi-account-school ms-2"></i></p>
        </div>
      </div>
      <span>{{ postProp.body }}</span>
      <img class="img-fluid post-img my-2" :src="postProp.imgUrl" alt="">
      <div class="text-end fs-5 pe-4">
        <!-- <i @click="likePost(postProp.id)" role="button" v-if="postProp.likeIds == account.id" class="mdi mdi-heart me-1"></i> -->
        <i @click="likePost(postProp.id)" role="button" class="mdi mdi-heart-outline me-1"></i>
        <span>{{ postProp.likes.length }}</span>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.profile-img{
  height: 65px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

img{
  object-fit: cover;
  object-position: center;
}
</style>