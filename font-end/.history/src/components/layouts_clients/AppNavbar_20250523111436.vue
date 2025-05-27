can you improve my responseive ""<template>

    <header class="text-white flex justify-between  items-center  py-3 container mx-auto ">
        <!-- Left: Logo and Title and input -->
        <div class="logo-search">
            <div class="flex items-center gap-2 w-full sm:w-auto mb-3  sm:mb-0 logo-library">
                <div>
                    <router-link to="/client/home">
                    <img src="../../assets/images/Librarylogo.png" alt="Quest College" class="w-40 sm:w-50 mt-3 " />
                </router-link>
                </div>
                <div class="flex gap-5">
                    <router-link to="/client/profile">
                    <button class="hidden md:block cursor-pointer text-black hover:underline mt-2 text-sm sm:text-base">
                       {{ $t('navbar.mybooks') }}
                    </button>
                    </router-link>
                    <select class="hidden md:block text-black px-2 py-1 h-9 focus:outline-none cursor-pointer browse">
                        <option value="all"><i>{{ $t('navbar.browse') }}</i></option>
                    </select>

                </div>
            </div>
        </div>


 
        <!-- 1 Right: menu Auth Buttons -->
        <div class=" navbar-menus flex items-center gap-3 w-full  sm:w-auto justify-end sm:justify-start"
            style="padding-right:-20px;">
            <!-- Center: Dropdown + Search -->
            <div class="block lg:hidden">
                <div class="ml-24 mt-2">
                         <div class="relative">
        <div class="flex items-center gap-1 text-white cursor-pointer" @click="toggleDropdown">
         <i class="fas fa-search text-xl w-5 text-black mb-2 "></i>
        </div>

        <!-- Dropdown Search Form -->
        <div
          v-if="showDropdown"
          class="absolute right-0 mt-2 bg-white shadow-lg rounded-md  w-[250px] p-3 z-50"
        >
          <div class="flex flex-col space-y-2">
            <select
              class="bg-green-600 text-white px-2 py-1 h-9 focus:outline-none cursor-pointer rounded"
            >
              <option value="all">{{ $t('navbar.all') }}</option>
            </select>
            <input
              type="text"
              :placeholder="$t('navbar.search') + '..........'"
             
              class="focus:outline-none text-black shadow-md h-9 py-1 pl-3 rounded"
            />
          </div>
        </div>
      </div>
                </div>
            </div>
            <div class=" hidden lg:block  flex-col sm:flex-row items-center  w-full sm:w-auto mb-3 sm:mb-0  search-all">
                <select
                    class="custom-select bg-green-600 all-input shadow-md  text-white px-2 py-1 h-9 focus:outline-none cursor-pointer w-full sm:w-auto">
                    <option value="all">{{ $t('navbar.all') }}</option>
                </select>

                <input type="text" :placeholder="$t('navbar.search') + '..........'"
                    class="focus:outline-none text-black shadow-md h-9 py-1 pl-3 w-full sm:w-64" />

            </div>

          
            <button class="hidden md:block cursor-pointer text-black hover:underline text-sm sm:text-base">
                {{ $t('navbar.login') }}
            </button>
            <button
                class="bg-white text-green-600 px-3 py-1 rounded hover:bg-green-100 cursor-pointer text-sm sm:text-base ">
                {{ $t('navbar.signup') }}
            </button>

            <button class="cursor-pointer" @click="emit('toggle-sidebar')">
                <span
                    class="inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 hover:bg-green-600">
                    <i class="fa-solid fa-bars text-green-600 hover:text-white"></i>
                </span>
            </button>

        </div>
    </header>
    <div class=" md:hidden flex justify-center gap-5 items-center py-3 container bg-gray-400 mx-auto">
        <select class=" text-white px-2 py-1 h-9 focus:outline-none cursor-pointer browse">
            <option value="all"><i>{{ $t('navbar.browse') }}</i></option>
        </select>
        <button class=" cursor-pointer text-black hover:underline text-sm sm:text-base">
            {{ t('navbar.mybooks') }}
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount,defineEmits } from 'vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
declare var window: any;
const windowWidth = ref(window.innerWidth)

const emit = defineEmits(['toggle-sidebar'])
const showDropdown = ref(false)
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}
const updateWidth = () => {
    windowWidth.value = window.innerWidth
}

onMounted(() => {
    window.addEventListener('resize', updateWidth)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWidth)
})

</script>

<style scoped></style>
