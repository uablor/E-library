<template>
  <div class="mx-auto px-50  p-4  ">
    <div class=" rounded-md shadow p-4  bg-pink-50">

      <div class="flex flex-col items-center bg-white pb-5 ">
        <div class="" style="margin-top: -20px; margin-left: 1rem; ">

          <DotLottieVue class="xl:w-100 lg:w-130 md:w-100 sm:w-80" autoplay loop
            src="https://lottie.host/c2ae2160-ce68-4919-8619-9002ceae6eb0/ruJM7wQ2b4.lottie" />
        </div>
        <h2 class="text-lg font-semibold mt-2">kong_mong_thao</h2>
        <p class="text-gray-600 text-sm">code student 1923HEUEI02025</p>
      </div>

      <div class="flex justify-between border-b border-gray-400 bg-white ">
        <button class="text-green-600 border-b border-green-600 py-2 px-4 font-medium">My account</button>
        <button class="py-2 px-4 text-gray-500 hover:text-green-600">Favorite book</button>
        <button class="py-2 px-4 text-gray-500 hover:text-green-600">Currently Reading</button>
        <button class="py-2 px-4 text-gray-500 hover:text-green-600">Want to Read</button>
        <button class="py-2 px-4 text-gray-500 hover:text-green-600">Already Read</button>
      </div>
      <div class="bg-white">

        <div class="    flex gap-20   items-center mt-1 pt-2 text-sm  space-y-2 px-4">
          <div class="text-gray-500  ">
            <p class="flex gap-1"><strong>Code</strong> <strong> student</strong> </p>
            <p><strong>User name</strong></p>
            <p><strong>Email</strong></p>
            <p><strong>Firstname</strong> </p>
            <p><strong>Lastname</strong> </p>
            <p><strong>Birthday</strong> </p>
            <p><strong>Address</strong> </p>
            <p><strong>Department</strong> </p>
            <p><strong>Phone</strong></p>
          </div>
          <div class="text-green-600 ">
            <p>1923HEUEI02025</p>
            <p>Kong Mong taho</p>
            <p><a href="mailto:kongmongthao348@gmail.com" class="text-green-700 underline">kongmongthao348@gmail.com</a>
            </p>
            <p>kong</p>
            <p>Thao</p>
            <p>07/06/2005</p>
            <p><p>ບ້ານ ຊີວິໄລ,ເມືອງ ໄຊທານີ,</p><p> ແຂວງ ວຽງຈັນ</p> </p>
            <p>neenKong</p>
            <p>+856 2078961715</p>
          </div>
          <div class="hidden md:block " style=" margin-left: 1rem; ">
            <DotLottieVue class="xl:w-100 lg:w-130 md:w-100 sm:w-80 pt-20" autoplay loop
              src="https://lottie.host/c119af40-106a-4da5-b1ba-c1d386673c2b/ICkxka5WLB.lottie" />
          </div>
        </div>
        <div class="flex ml-5 mt-6 pb-4 gap-4">
          <button
            class=" cursor-pointer w-30 px-6 py-2 border border-green-700 text-green-700 rounded hover:bg-white">Edit</button>
          <button class=" cursor-pointer w-30 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">Log
            out</button>
        </div>

      </div>


    </div>
  </div>

</template>
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

</script>
<style scoped></style>