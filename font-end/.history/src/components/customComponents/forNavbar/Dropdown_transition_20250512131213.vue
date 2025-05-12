<template>
  <div class="relative inline-block">
    <button
      @click="toggleDropdown"
      class="bg-green-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
     <!-- <i v-if="!isOpen" class="fa-solid fa-angle-right mt-2 mr-2"></i>
         <i v-if="isOpen" class="fa-solid fa-angle-down mt-2 mr-2"></i> -->
      Books manage
    </button>
    <transition name="slide-down">
      <div
        v-if="isOpen"
        class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-green-600 z-10"
      >
        <ul class="py-2 text-white">
          <li>
            <a
              href="#"
              class="block px-4 py-2 text-sm hover:bg-green-700 focus:outline-none focus:bg-green-700"
              >Book</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 text-sm hover:bg-green-700 focus:outline-none focus:bg-green-700"
              >Book type</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 text-sm hover:bg-green-700 focus:outline-none focus:bg-green-700"
              >Categories</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 text-sm hover:bg-green-700 focus:outline-none focus:bg-green-700"
              >Book file</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 text-sm hover:bg-green-700 focus:outline-none focus:bg-green-700"
              >Book score</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 text-sm hover:bg-green-700 focus:outline-none focus:bg-green-700"
              >Book_View_Tracking</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 text-sm hover:bg-green-700 focus:outline-none focus:bg-green-700"
              >Book_View_Tracking</a
            >
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event) => {
  if (isOpen.value && !event.target.closest('.inline-block')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
  overflow: hidden; /* Prevent content from jumping during transition */
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-leave-to {
  transform: translateY(-10px); /* Slight upward movement during leave */
  opacity: 0;
}
</style>