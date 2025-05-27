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
          <div class="pointer-events-none fixed inset-y-0 right-0 flex  max-w-70 sm:max-w-80 xl:max-w-100 lg:max-w-100 md:max-w-100 pl-10">
            <!-- Sliding Panel -->
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full" enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0"
              leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto relative w-70 sm:w-screen md:w-screen lg:w-screen xl:w-screen max-w-md">
                <!-- Close button -->
                <div class="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                  <button type="button"
                    class="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
                    @click="emit('close')">
                    <span class="absolute -inset-2.5" />
                    <span class="sr-only">Close panel</span>
                    <XMarkIcon class="size-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Panel content -->
                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div class="px-4 sm:px-6 bg-green-600 h-15 -mt-4 flex "
                    style="box-shadow: 0px 7px 6px rgba(0, 0, 0, 0.25);">
                    <DialogTitle class="text-base font-semibold  text-white mt-3" style="font-size: 25px;">E-LIBRARY 
                    </DialogTitle>
                        <DotLottieVue
            class="w-25 "
            autoplay loop src="https://lottie.host/f524c4a6-ca9a-493c-83ac-3a07bbb9ef1c/s8RSmhPSHv.lottie" />
                  </div>
                  <div class="relative  mt-6 flex-1 px-4 sm:px-6">
                    <!-- Your content -->
                    <div class="flex gap-2 items-center justify-center  sm:-ml-39 md:-ml-18  -ml-9">
                      <button
                        class="sm:pl-7 sm:pr-7 sm:pt-1 sm:pb-1  md:pl-13 md:pr-13 md:pt-2 md:pb-2 lg:pl-13 lg:pr-13 lg:pt-2 lg:pb-2 xl:pl-13 xl:pr-13 xl:pt-2 xl:pb-2  pl-7 pr-7  font-bold bg-white border-2 border-green-600 transition cursor-pointer hover:bg-green-600 hover:text-white flex gap-1"><span>Log</span>
                        <span>In</span></button>
                      <button
                        class="sm:pl-7 sm:pr-7 sm:pt-1 sm:pb-1  md:pl-13 md:pr-13 md:pt-2 md:pb-2 lg:pl-13 lg:pr-13 lg:pt-2 lg:pb-2 xl:pl-13 xl:pr-13 xl:pt-2 xl:pb-2  pl-7 pr-7  font-bold bg-green-600 border-2 text-white border-green-600 transition cursor-pointer hover:bg-white hover:text-green-600 gap-1"><span>Sign</span>
                        <span>Up</span></button>
                    </div>
                    <!-- drop down menus -->
                    <div class="relative inline-block mt-5 pl-5 -ml-12">
                       <button 
                        class=" text-black font-semibold py-2 px-4  focus:outline-none border-b-2 w-150 flex focus:shadow-outline "
                        style="font-size: 20px; font-weight: bold; color:darkslategray;">
                          Dashboard 
                      </button>
                      <button 
                        class=" text-black font-semibold py-2 px-4  focus:outline-none border-b-2 w-150 flex focus:shadow-outline "
                        style="font-size: 20px; font-weight: bold; color:darkslategray;">
                          Manangement 
                      </button>
                      <div class="absolute left-0 ml-5 -mt-2 pl-4 w-150   z-10">
                        <ul class="py-2 text-white">
                          <li>
                              <router-link to="/admin/admin" >
                                <a href="#"
                                  class="block px-4 py-2 text-sm hover:bg-green-700 border-b border-b-gray-400 focus:outline-none bg-white text-black focus:bg-green-600 focus:text-white hover:text-white">Admin</a>
                              </router-link>
                          </li>
                          <li>
                             <router-link to="/admin/user">
                            <a href="#"
                              class="block px-4 py-2 text-sm hover:bg-green-700 border-b border-b-gray-400 focus:outline-none bg-white text-black  focus:bg-green-600 focus:text-white hover:text-white">Users
                           </a>
                            </router-link>
                          </li>
                          <li>
                            <router-link to="/admin/book">
                              <a href="#"
                                class="block px-4 py-2 text-sm hover:bg-green-700 border-b border-b-gray-400 focus:outline-none bg-white text-black  focus:bg-green-600 focus:text-white hover:text-white">Books</a>
                            </router-link>
                          </li>
                            <li>
                             <router-link to="/admin/bookfile">
                            <a href="#"
                              class="block px-4 py-2 text-sm hover:bg-green-700 border-b border-b-gray-400 focus:outline-none bg-white text-black  focus:bg-green-600 focus:text-white hover:text-white">Book file</a>
                            </router-link>
                            </li>
                          <li>
                            <router-link to="/admin/bookscore">
                              <a href="#"
                                class="block px-4 py-2 text-sm hover:bg-green-700 border-b border-b-gray-400 focus:outline-none bg-white text-black  focus:bg-green-600 focus:text-white hover:text-white">Book score</a>
                            </router-link>
                          </li>
                          <li>
                            <router-link to="/admin/bookcategory">
                              <a href="#"
                                class="block px-4 py-2 text-sm hover:bg-green-700 border-b border-b-gray-400 focus:outline-none bg-white text-black  focus:bg-green-600 focus:text-white hover:text-white">Book category</a>
                            </router-link>
                          </li>
                          <li>
                            <router-link to="/admin/booktype">
                            <a href="#"
                              class="block px-4 py-2 text-sm hover:bg-green-700 border-b border-b-gray-400 focus:outline-none bg-white text-black  focus:bg-green-600 focus:text-white hover:text-white">Book types</a>
                            </router-link>
                            </li>
                        </ul>
                      </div>

                    </div>

                    <div class="relative inline-block mt-70 pl-5 -ml-12">
                      <button 
                        class=" text-black font-semibold py-2 px-4  focus:outline-none border-b-2 w-150 flex focus:shadow-outline "
                        style="font-size: 20px; font-weight: bold; color:darkslategray;">
                          Resources 
                      </button>
                      <div class="absolute left-0 ml-5 -mt-2 pl-4 w-150   z-10">
                        <ul class="py-2 text-white">
                          <li>
                            <a href="#"
                              class="block px-4 py-2 text-sm hover:bg-green-700 border-b border-b-gray-400 focus:outline-none bg-white text-black focus:bg-green-600 focus:text-white hover:text-white">Help & Support</a>
                          </li>
                          <li>
                            <a href="#"
                              class="block px-4 py-2 text-sm hover:bg-green-700 border-b border-b-gray-400 focus:outline-none bg-white text-black  focus:bg-green-600 focus:text-white hover:text-white">Developer Center
                              type</a>
                          </li>
                          <li>
                            <a href="#"
                              class="block px-4 py-2 text-sm hover:bg-green-700 border-b border-b-gray-400 focus:outline-none bg-white text-black  focus:bg-green-600 focus:text-white hover:text-white">Librarians Portal</a>
                          </li>
                        </ul>
                         <DotLottieVue
            class="w-50 sm:w-58 md:w-82 lg:w-90 xl:w-100 mt-10"
            autoplay loop src="https://lottie.host/698dcce0-c993-4112-810a-8ed0d60654b6/iREmmwYill.lottie" />
                      </div>

                    </div>
                    <!-- end drop down menus  -->
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