<script setup>
import { AppState } from '@/AppState';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed } from 'vue';
import { useRoute } from 'vue-router';


const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)
const profile = computed(() => AppState.activeProfile)
const route = useRoute()

async function changePage(pageNum) {
  try {
    if (AppState.postQuery == '') {
      await postsService.changeHomePage(pageNum)
    } else if(profile.value.id == route.params.creatorId) {
      await postsService.changeProfilePage(pageNum, profile.value.id)
    } else {
      await postsService.changeSearchPage(pageNum, AppState.postQuery)
    }
  }
  catch (error){
    Pop.meow(error);
    logger.log(error)
  }
}

async function changeProfilePage(pageNum) {
  try {
    await postsService.changeProfilePage(pageNum, profile.value.id)
  }
  catch (error){
    Pop.meow(error);
    logger.log(error)
  }
}
</script>


<template>
<div class="d-flex gap 4 justify-content-evenly
         align-items-center px-5 my-3">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage < 2" class="btn btn-outline-info">Newer</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage == totalPages" class="btn btn-outline-info">Older</button>
        </div>
</template>


<style lang="scss" scoped>

</style>