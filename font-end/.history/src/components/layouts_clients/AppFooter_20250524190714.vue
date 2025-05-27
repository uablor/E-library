<template>
  <footer class="bg-green-800 text-white py-8">
    <div v-if="route.path == '/client/register'" 
     class="hidden md:block" style="margin-top: -200px; margin-left: 10rem; "  >
           <DotLottieVue class="xl:w-100 lg:w-130 md:w-100 sm:w-80" autoplay loop src="https://lottie.host/51cda32a-704b-41fb-8d9f-cf0d35c4382c/6CkZQLPcoY.lottie" />
    </div>
  <div class="max-w-7xl container mx-auto   px-8 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 ml-20">
      <!-- About Section -->
      <div>
        <h2 class="text-xl font-semibold mb-4">About the Library</h2>
        <p class="text-sm text-gray-300">
          Our Library Management System streamlines the process of managing books, patrons, and transactions, ensuring efficient and effective library operations.
        </p>
      </div>


  <!-- Quick Links -->
  <div class="xl:ml-30 lg:ml-26 md:ml-18">
    <h2 class="text-xl font-semibold mb-4 ">Quick Links</h2>
    <div class="flex justify-between">

      <ul class="space-y-2">
        <li><router-link to="/client/home"><a href="#" class="text-gray-300 hover:text-white transition">Home</a></router-link></li>
        <li><router-link to="/client/bookDetails"><a href="#" class="text-gray-300 hover:text-white transition">Trending Books</a></router-link></li>
        <li><router-link to="/client/profile"><a href="#" class="text-gray-300 hover:text-white transition">Login</a></router-link><a href="#" class="text-gray-300 hover:text-white transition">My Account</a></li>
        <li><a href="#" class="text-gray-300 hover:text-white transition">Contact Us</a></li>
      </ul>
      <DotLottieVue class="md:hidden sm:w-100 -mt-10" autoplay loop src="https://lottie.host/51cda32a-704b-41fb-8d9f-cf0d35c4382c/6CkZQLPcoY.lottie" />
    </div>
    </div>

  <!-- Contact Information -->
  <div class="xl:ml-20 lg:ml-15">
    <h2 class="text-xl font-semibold mb-4">Contact Us</h2>
    <p class="text-sm text-gray-300">E-Library Systems <br>Vientiane capital, Laos</p>
    <p class="text-sm text-gray-300 mt-2">Phone: (123) 456-7890</p>
    <p class="text-sm text-gray-300">Email: info@librarysystem.com</p>
  </div>
</div>

<!-- Social Media Icons -->
<div class="mt-8 flex justify-center space-x-6">
  <a href="#" class="text-gray-300 hover:text-white transition">
    <i class="fab fa-facebook-f"></i>
  </a>
  <a href="#" class="text-gray-300 hover:text-white transition">
    <i class="fab fa-twitter"></i>
  </a>
  <a href="#" class="text-gray-300 hover:text-white transition">
    <i class="fab fa-instagram"></i>
  </a>
  <a href="#" class="text-gray-300 hover:text-white transition">
    <i class="fab fa-linkedin-in"></i>
  </a>
</div>




  </div>
  <!-- Footer Bottom -->
<div class="w-full mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
  &copy; 2025 Quest College Library. All rights reserved.
</div>
</footer>

</template>
<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import {useRoute} from 'vue-router'

const route = useRoute();


</script>
<style scoped></style>
