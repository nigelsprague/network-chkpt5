<script setup>
import { AppState } from '@/AppState';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed } from 'vue';


const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

async function changePage(pageNum) {
  try {
    await postsService.changePage(pageNum)
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
          <button @click="changePage(currentPage - 1)" class="btn btn-outline-info">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="changePage(currentPage + 1)" class="btn btn-outline-info">Next</button>
        </div>
</template>


<style lang="scss" scoped>

</style>