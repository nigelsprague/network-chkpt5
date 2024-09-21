<script setup>
import { AppState } from '@/AppState';
import { Post } from '@/models/Post';
import { computed } from 'vue';

const account = computed(() => AppState.account)
</script>


<template>
  <div v-if="account" class="card p-3 my-3">
    <section class="row">
    <div class="profile-bg">
      <div class="d-flex align-items-center mb-3">
        <img class="img-fluid profile-img me-3" :src="account.picture" :alt="account.name" :title="account.name">
      </div>
    </div>
    <div class="px-5">
      <p>{{ account.class }}</p>
      <h2>{{ account.name }}</h2>
      <p>{{ account.bio }}</p>
    </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.profile-bg{
  object-fit: cover;
  object-position: center;
}

.profile-img{
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

img{
  object-fit: cover;
  object-position: center;
}
</style>