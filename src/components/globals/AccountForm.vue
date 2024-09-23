<script setup>
import { AppState } from '@/AppState.js';
import { accountService } from '@/services/AccountService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { onMounted, ref } from 'vue';

const editableAccountData = ref({
  name: '',
  picture: '',
  bio: '',
  coverImg: '',
  linkedin: '',
  github: '',
  resume: '',
  graduated: false
})

onMounted(() => {
  editableAccountData.value = { ...AppState.account }
})

async function updateAccount() {
  try {
    await accountService.updateAccount(editableAccountData.value)
    Pop.success("Changes saved!")
  } catch (error) {
    Pop.meow(error)
    logger.error(error)
  }
}

</script>


<template>
  <form @submit.prevent="updateAccount()">
    <div class="mb-3">
      <label for="accountName" class="form-label">Account Name</label>
      <input v-model="editableAccountData.name" type="text" name="accountName" id="accountName" class="form-control"
        maxlength="100">
    </div>
    <div class="mb-3">
      <label for="accountPicture" class="form-label">Account Picture</label>
      <input v-model="editableAccountData.picture" type="url" name="accountPicture" id="accountPicture"
        class="form-control" maxlength="500">
    </div>
    <div class="mb-3">
      <label for="accountCoverImg" class="form-label">Account CoverImg</label>
      <input v-model="editableAccountData.coverImg" type="url" name="accountCoverImg" id="accountCoverImg"
        class="form-control" maxlength="500">
    </div>
    <div class="mb-3">
      <label for="accountLinkedin" class="form-label">Account Linkedin</label>
      <input v-model="editableAccountData.linkedin" type="url" name="accountLinkedin" id="accountLinkedin"
        class="form-control" maxlength="500">
    </div>
    <div class="mb-3">
      <label for="accountGithub" class="form-label">Account Github</label>
      <input v-model="editableAccountData.github" type="url" name="accountGithub" id="accountGithub"
        class="form-control" maxlength="500">
    </div>
    <div class="mb-3">
      <label for="accountResume" class="form-label">Account Resume</label>
      <input v-model="editableAccountData.resume" type="url" name="accountResume" id="accountResume"
        class="form-control" maxlength="500">
    </div>
    <div class="mb-3">
      <label for="accountBio" class="form-label">Account Bio</label>
      <textarea v-model="editableAccountData.bio" name="accountBio" id="accountBio" class="form-control"
        maxlength="1000"></textarea>
    </div>
    <div class="mb-3">
      <label for="accountGraduated" class="form-label me-3">Have You Graduated?</label>
      <input v-model="editableAccountData.graduated" type="checkbox" name="accountGraduated" id="accountGraduated">
    </div>
    <div>
      <button class="w-100" type="submit">Save Changes</button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>