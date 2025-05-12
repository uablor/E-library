<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="emit('close')">
      <!-- Overlay -->
      <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <!-- Panel wrapper -->
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex  max-w-100 pl-10">
            <!-- Sliding Panel -->
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full" enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0"
              leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                <!-- Close button -->
<!-- Panel content -->
<div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
  <div class="px-4 sm:px-6 bg-green-600 h-15 -mt-4 flex items-center justify-between"
       style="box-shadow: 0px 7px 6px rgba(0, 0, 0, 0.25);">
    <DialogTitle class="text-lg sm:text-xl md:text-2xl font-semibold text-white mt-1">
      E-LIBRARY
    </DialogTitle>
    <DotLottieVue class="w-16 sm:w-20 md:w-24" autoplay loop src="..." />
  </div>

  <div class="relative mt-6 flex-1 px-4 sm:px-6">
    <!-- Login / Signup buttons -->
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <button class="px-6 py-2 font-bold bg-white border-2 border-green-600 transition hover:bg-green-600 hover:text-white">
        <span>Log In</span>
      </button>
      <button class="px-6 py-2 font-bold bg-green-600 text-white border-2 border-green-600 transition hover:bg-white hover:text-green-600">
        <span>Sign Up</span>
      </button>
    </div>

    <!-- Dropdown Menu: Browse -->
    <div class="relative inline-block mt-6 sm:mt-8 pl-4 sm:pl-6">
      <button class="text-base sm:text-lg font-semibold py-2 px-4 border-b-2 w-full text-slate-800">
        Browse
      </button>
      <div class="absolute left-0 ml-5 -mt-2 pl-4 w-48 sm:w-56 z-10">
        <ul class="py-2 text-white text-sm sm:text-base">
          <!-- list items... -->
        </ul>
      </div>
    </div>

    <!-- Dropdown Menu: Resources -->
    <div class="relative inline-block mt-12 sm:mt-16 pl-4 sm:pl-6">
      <button class="text-base sm:text-lg font-semibold py-2 px-4 border-b-2 w-full text-slate-800">
        Resources
      </button>
      <div class="absolute left-0 ml-5 -mt-2 pl-4 w-48 sm:w-56 z-10">
        <ul class="py-2 text-white text-sm sm:text-base">
          <!-- list items... -->
        </ul>
        <DotLottieVue class="w-24 sm:w-28 md:w-32" autoplay loop src="..." />
      </div>
    </div>
  </div>
</div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { defineProps, defineEmits, ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  open: Boolean
})

const emit = defineEmits(['close'])

// path of drop down meus


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
// end of path dorop down menus
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
  /* Prevent content from jumping during transition */
}

.slide-down-enter-from {
  transform: translateY(-15%);
  opacity: 0;
}

.slide-down-enter-to {
  transform: translateY(5%);
  opacity: 1;
}

.slide-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-down-leave-to {
  transform: translateY(-5px);
  /* Slight upward movement during leave */
  opacity: 0;
}
</style>