<template>
  <div class="flex flex-col md:flex-row w-full">
    <!-- Left panel -->
    <div class="w-full md:w-1/2 bg-green-600 text-white flex flex-col justify-center sm:p-6 md:p-8 lg:p-12">
      <div class="flex justify-center items-center">
        <DotLottieVue
          class="xl:w-150 lg:w-140 md:w-120 sm:w-100 w-30 mb-10"
          autoplay loop
          src="https://lottie.host/f524c4a6-ca9a-493c-83ac-3a07bbb9ef1c/s8RSmhPSHv.lottie"
        />
      </div>
      <div class="text-center">
        <h1 class="text-xl md:text-3xl font-bold mb-2">
          {{ t('login.title') }}
        </h1>
        <p class="text-sm md:text-lg">
          {{ t('login.description') }}
        </p>
      </div>
    </div>

    <!-- Right panel -->
    <div class="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-6 md:p-10">
      <div class="w-full max-w-sm">
        <div class="text-center mb-6">
          <img src="@/assets/images/quest-logo.png" alt="Logo" class="w-20 mx-auto mb-2" />
          <h2 class="text-2xl font-bold">{{ t('login.welcome') }}</h2>
          <p class="text-gray-500">{{ t('login.please_login') }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block mb-1 font-semibold text-gray-700">{{ t('login.email') }}</label>
            <input v-model="user.email" type="email" :placeholder="t('login.email')" class="input" />
          </div>
          <div>
            <label class="block mb-1 font-semibold text-gray-700">{{ t('login.password') }}</label>
            <input v-model="user.password" type="password" :placeholder="t('login.password')" class="input" />
          </div>

          <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            {{ t('login.sign_in') }}
          </button>
        </form>

        <p class="text-sm text-center mt-4">
          {{ t('login.no_account') }}
          <router-link to="/register" class="text-blue-600 underline">{{ t('login.sign_up') }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { reactive } from 'vue'
import type { UserEntity } from '../entities/user.entity'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const user = reactive<UserEntity>({
  email: '',
  password: '',
})

function handleLogin() {
  console.log('Logging in with:', user)
  // Example: await axios.post('/api/login', user)
}
</script>
<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
