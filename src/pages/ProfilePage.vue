<script setup>
import { AppState } from '@/AppState';
import PageNavigation from '@/components/globals/PageNavigation.vue';
import PostCard from '@/components/globals/PostCard.vue';
import PostForm from '@/components/globals/PostForm.vue';
import { postsService } from '@/services/PostsService';
import { profilesService } from '@/services/ProfilesService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const profile = computed(() => AppState.activeProfile)
const ads = computed(() => AppState.ads)
const banners = computed(() => AppState.bannerAds)
const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account)

onMounted(() => {
  getProfileById()
  getPostsByCreatorId()
})

watch(() => route.params.profileId, () => {
  getProfileById()
  getPostsByCreatorId()
}, { immediate: true })

async function getProfileById() {
  try {
    const profileId = route.params.profileId
    await profilesService.getProfileById(profileId)
  }
  catch (error) {
    Pop.meow(error);
    logger.error(error)
  }
}

async function getPostsByCreatorId() {
  try {
    const profileId = route.params.profileId
    await postsService.getPostsByCreatorId(profileId)
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
      <div v-if="profile" class="card my-3">
        <section class="row cover-img-bg align-items-center" :style="{ backgroundImage: `url(${profile.coverImg})` }">
          <div class="profile-bg">
            <div class="d-flex align-items-center p-3 mb-3 position-relative">
              <img class="img-fluid profile-img me-3" :src="profile.picture" :alt="profile.name" :title="profile.name">
              <i v-if="profile.graduated" class="mdi mdi-account-school ms-2 fs-5 grad-stat-icon shadow"></i>
              <i v-else class="mdi mdi-town-hall ms-2 fs-5 grad-stat-icon"></i>
              <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank" class="text-light"
                title="Connect with me on linkedin!">
                <i class="mdi mdi-linkedin fs-1 ms-3 icon-shadow"></i>
              </a>
              <a v-if="profile.github" :href="profile.github" target="_blank" class="text-light"
                title="Connect with me on github!">
                <i class="mdi mdi-github fs-1 ms-3 icon-shadow"></i>
              </a>
              <a v-if="profile.resume" :href="profile.resume" target="_blank" class="text-light"
                title="Check out my resume!">
                <i class="mdi mdi-file-account fs-1 ms-3 icon-shadow"></i>
              </a>
            </div>
          </div>
          <div class="px-5 text-shadow text-light">
            <span>{{ profile.class }}</span>
            <h1>{{ profile.name }}</h1>
            <p>{{ profile.bio }}</p>
          </div>
        </section>
      </div>
      <div v-else>
        <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
      </div>
      <div class="col-md-9">
        <div v-if="account?.id == route.params.profileId">
          <PostForm />
        </div>
        <div v-for="post in posts" :key="post.id">
          <PostCard :postProp="post" />
        </div>
      </div>
      <div class="col-3 ads">
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


<style lang="scss" scoped>
.cover-img-bg {
  background-size: cover;
  background-position: center;
}

.profile-img {
  height: 115px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

img {
  object-fit: cover;
  object-position: center;
}

.grad-stat-icon {
  position: absolute;
  left: 4em;
  top: 4.5em;
  background-color: white;
  padding: .25em .5em;
  border-radius: 50%;
  box-shadow: 0 0 2px black;
}

.icon-shadow {
  text-shadow: 0 0 1px black;
}

.text-shadow {
  text-shadow: 0 0 .5em black;
}

@media (max-width: 700px) {
  .ads {
    display: none;
  }
}
</style>