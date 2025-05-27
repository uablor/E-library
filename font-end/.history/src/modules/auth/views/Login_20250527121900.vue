<template>
  <div class="flex flex-col md:flex-row w-full  mb-20 ">
    <!-- Left panel -->
    <div class="w-full md:w-1/2 bg-green-600 text-white flex flex-col justify-center   sm:p-6 md:p-8 lg:p-12">
      <div>
        <div class="-mt-50 flex justify-center items-center">
          <DotLottieVue
            class="xl:w-150 lg:w-140 md:w-120 sm:w-100 mt-50  w-30 mb-30 ml-3  md:ml-2 lg:ml-2 xl:ml-2 sm:ml-2 sm:mb-25 sm:mt-40   "
            autoplay loop src="https://lottie.host/f524c4a6-ca9a-493c-83ac-3a07bbb9ef1c/s8RSmhPSHv.lottie" />
        </div>
      </div>
      <div class="-mt-10 pl-2 ">

    
 <h1 class=" text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 -mt-20 text-center">
       
        {{ t('login.title') }}
        </h1>

        <p class=" text-center  text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
        {{ t('login.description') }}
        </p>
      </div>
    </div>

    <!-- Right panel -->
    <div class="w-full  border-green-800 md:w-1/2 bg-white flex flex-col justify-center items-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      <div class="w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <div class="flex items-center gap-2 mb-4 sm:mb-6">
          <div class="flex-grow border-t border-gray-400"></div>
          <span class="text-center font-semibold text-lg sm:text-xl text-gray-700">
             <img
            src="@/assets/images/quest-logo.png"
            alt="Quest College Logo"
            class="w-20"
            
          />
          </span>
          <div class="flex-grow border-t border-gray-400"></div>
        </div>
        <div class=" text-center">
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
          <router-link to="/client/register" class="text-blue-600 underline">{{ t('login.sign_up') }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { reactive, ref } from "vue";
import type { StudentEntity } from "../entities/student.enity";
import type { UserEntity } from "../entities/user.entity";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const user = reactive<UserEntity>({
  username: "",
  email: "",
  password: "",
});

const student = reactive<StudentEntity>({
  first_name: "",
  last_name: "",
  phone: "",
  department: "",
  brith_day: null,
  code_student: "",
  villege_id: "",
});

const subscribe = ref(false);

function handleSubmit() {
  console.log("User:", user);
  console.log("Student:", student);
  console.log("Subscribed:", subscribe.value);

  // ตัวอย่างส่ง API:
  // await axios.post('/api/signup', { user, student, subscribe: subscribe.value })
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
