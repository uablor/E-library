can you improve my responseive ""<template>

    <header class="text-white flex justify-between  items-center  py-3 container mx-auto ">
        <!-- Left: Logo and Title and input -->
        <div class="logo-search">
            <div class="flex items-center gap-2 w-full sm:w-auto mb-3  sm:mb-0 logo-library">
                <div>
                    <img src="../../assets/images/Librarylogo.png" alt="Quest College" class="w-40 sm:w-50 mt-3 " />
                </div>
                <div class="flex gap-5">
                    <button class="hidden md:block cursor-pointer text-black hover:underline text-sm sm:text-base">
                        My books
                    </button>
                    <select class="hidden md:block text-black px-2 py-1 h-9 focus:outline-none cursor-pointer browse">
                        <option value="all"><i>Browse</i></option>
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
        <div class="flex items-center gap-2 text-black cursor-pointer" @click="toggleDropdown">
           <i class="fas fa-search text-xl w-5 text-black "></i>
        </div>

        <!-- Dropdown -->
        <div
          v-if="showDropdown"
          class="absolute right-0 mt-2 w-50 bg-white rounded-md shadow-lg  z-10 p-2"
        >
         <div class="  flex-col sm:flex-row items-center  w-full sm:w-auto mb-3 sm:mb-0  search-all">
                <select
                    class="custom-select bg-green-600 all-input shadow-md  text-white px-2 py-1 h-9 focus:outline-none cursor-pointer w-full sm:w-auto">
                    <option value="all">All</option>
                </select>

                <input type="text" placeholder="Search.........."
                    class="focus:outline-none text-black shadow-md h-9 py-1 pl-3 w-full sm:w-64" />

            </div>
        </div>
      </div>
                    <!-- <i class="fas fa-search text-xl w-5 text-black "></i> -->
                </div>
            </div>
            <div class=" hidden lg:block  flex-col sm:flex-row items-center  w-full sm:w-auto mb-3 sm:mb-0  search-all">
                <select
                    class="custom-select bg-green-600 all-input shadow-md  text-white px-2 py-1 h-9 focus:outline-none cursor-pointer w-full sm:w-auto">
                    <option value="all">All</option>
                </select>

                <input type="text" placeholder="Search.........."
                    class="focus:outline-none text-black shadow-md h-9 py-1 pl-3 w-full sm:w-64" />

            </div>

            <!-- <select class="hidden md:block text-black px-2 py-1 h-9 focus:outline-none cursor-pointer browse">
                <option value="all"><i>Browse</i></option>
            </select>
            <button class="hidden md:block cursor-pointer text-black hover:underline text-sm sm:text-base">
                My books
            </button> -->
            <button class="hidden md:block cursor-pointer text-black hover:underline text-sm sm:text-base">
                Log in
            </button>
            <button
                class="bg-white text-green-600 px-3 py-1 rounded hover:bg-green-100 cursor-pointer text-sm sm:text-base flex gap-1">
                <span> Sign</span><span>up</span>
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
            <option value="all"><i>Browse</i></option>
        </select>
        <button class=" cursor-pointer text-black hover:underline text-sm sm:text-base">
            My books
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount,defineEmits } from 'vue'
const windowWidth = ref(window.innerWidth)

const emit = defineEmits(['toggle-sidebar'])
const updateWidth = () => {
    windowWidth.value = window.innerWidth
}

onMounted(() => {
    window.addEventListener('resize', updateWidth)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWidth)
})

const showDropdown = ref(false)


// Toggle the dropdown
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Close dropdown when clicking outside
const handleClickOutside = (event:any) => {
  const dropdown = document.querySelector('.relative')
  if (dropdown && !dropdown.contains(event.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

</script>

<style scoped></style>
