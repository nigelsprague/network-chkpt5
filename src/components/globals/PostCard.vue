<script setup>
import { AppState } from '@/AppState';
import { Post } from '@/models/Post';
import { postsService } from '@/services/PostsService';
import { profilesService } from '@/services/ProfilesService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed } from 'vue';


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

async function deletePost() {
  try {
    const wantsToDelete = await Pop.confirm('Are you sure you want to delete this post?')
    if (!wantsToDelete) return
    await postsService.deletePost(props.postProp.id)
  }
  catch (error){
    Pop.meow(error);
    logger.log(error)
  }
}

async function setActiveProfile() {
  try {
    await profilesService.setActiveProfile(props.postProp)
  }
  catch (error){
    Pop.meow(error);
    logger.log(error)
  }
}

function setPostToEdit() {
  postsService.setPostToEdit(props.postProp)
}
</script>


<template>
  <div class="card p-3 my-3">
    <section class="row">
      <div class="d-flex align-items-center mb-3">
        <router-link :to="{name: 'ProfileDetails', params: {profileId: postProp.creatorId}}" :title="`Go to ${postProp.creator.name}'s Profile Page'`">
          <img @click="setActiveProfile()" class="img-fluid profile-img me-3" :src="postProp.creator.picture" :alt="postProp.creator.name" :title="`Visit ${postProp.creator.name}'s profile`">
        </router-link>
        <div>
          <h6>{{ postProp.creator.name }}</h6>
          <p>{{ postProp.publishedOn }} 
            <i v-if="postProp.creator.graduated" class="mdi mdi-account-school ms-2"></i>
            <i v-else class="mdi mdi-town-hall ms-2"></i>
          </p>
        </div>
        <div v-if="account?.id == postProp.creatorId" class="dropdown">
          <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="mdi mdi-dots-horizontal fs-3"></i>
          </button>
          <ul class="dropdown-menu">
            <li><button @click="setPostToEdit()" class="dropdown-item" data-bs-toggle="modal"
              data-bs-target="#editModal" type="button">Edit post</button></li>
            <li><button @click="deletePost()" class="dropdown-item text-danger" type="button">Delete post</button></li>
          </ul>
        </div>
      </div>
      <span>{{ postProp.body }}</span>
      <img class="img-fluid post-img my-2" :src="postProp.imgUrl" alt="">
      <div class="text-end fs-5 pe-4">
        <!-- <i @click="likePost(postProp.id)" role="button" v-if="postProp.likeIds == account.id" class="mdi mdi-heart me-1"></i> -->
        <i @click="likePost(postProp.id)" role="button"   class="mdi mdi-heart-outline me-1"></i>
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