<script setup>
import { AppState } from '@/AppState';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, ref } from 'vue';


const account = computed(() => AppState.account)
const posts = computed(() => AppState.posts)

const editablePostData = ref({
  body: '',
  imgUrl: ''
})

async function createPost() {
  try {
    const postData = editablePostData.value
    await postsService.createPost(postData)
    editablePostData.value = {
      body: '',
      imgUrl: ''
    }
  }
  catch (error){
    Pop.meow(error);
    logger.error(error)
  }
}
</script>


<template>
  <div v-if="account" class="card p-3 my-3">
    <section class="row">
      <div class="mb-3">
        <img class="img-fluid account-img" :src="account.picture" :alt="account.name" :title="account.name">
      </div>
      <div class="col">
        <form @submit.prevent="createPost()">
          <textarea v-model="editablePostData.body" class="w-100 mb-3" name="" id="" placeholder="Share what's new..." rows="4"></textarea>
          <div class="d-flex justify-content-between">
            <input v-model="editablePostData.imgUrl" type="text" id="imgURL" placeholder="Insert image link...">
            <button type="submit"><i class="mdi mdi-send"></i> Post</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.account-img{
  height: 65px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

img{
  object-fit: cover;
  object-position: center;
}

textarea {
  border: dashed lighten($color: #000000, $amount: 90);
}
</style>