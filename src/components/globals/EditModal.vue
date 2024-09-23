<script setup>
import { AppState } from '@/AppState';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';

onMounted(() => {
  editablePostData.value = {...AppState.activePost}
})

const editablePostData = ref({
  body: '',
  imgUrl: ''
})
const account = computed(() => AppState.account)
const post = computed(() => AppState.activePost)

// async function editPost() {
//   try {
//     await postsService.editPost(editablePostData.value)
//     Pop.success('Changed saved!')
//   }
//   catch (error){
//     Pop.meow(error);
//     logger.error(error)
//   }
// }
</script>


<template>
  <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editModalLabel">Edit Post</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="card p-3 my-3">
              <section class="row">
                <div class="mb-3">
                  <img  class="img-fluid account-img" :src="account.picture" :alt="account.name" :title="account.name">
                </div>
                <div class="col">
                  <!-- <form @submit.prevent="editPost()"> -->
                    <textarea v-model="editablePostData.body" class="w-100 mb-3" name="body" id="body" rows="4"></textarea>
                    <div class="d-flex justify-content-between">
                      <input v-model="editablePostData.imgUrl" type="text" id="imgURL" placeholder="Insert image link...">
                    </div>
                  <!-- </form> -->
                </div>
              </section>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        <button type="submit"><i class="mdi mdi-send"></i> Post</button>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>