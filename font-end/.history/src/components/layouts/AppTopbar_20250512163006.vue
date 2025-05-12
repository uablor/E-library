<template>
  <div class="bg-green-600 h-10 relative">
    <div class="flex justify-between items-center p-4 container mx-auto">
      <!-- Logo and title -->
      <div class="flex gap-1 -mt-4">
        <img src="../../assets/images/quest-logo.png" alt="quest-logo" class="w-10 h-10" />
        <h5 class="text-white" style="font-size: 20px;">Quest College</h5>
      </div>

      <!-- Settings button -->
      <div class="-mt-6 flex items-center gap-2 relative">
        <span class="text-white cursor-pointer" @click="toggleDropdown">Setting</span>
        <i class="fa-solid fa-gear text-white mt-1 cursor-pointer" @click="toggleDropdown"></i>

        <!-- Dropdown -->
        <div
          v-if="showDropdown"
          class="absolute top-8 right-0 bg-white border rounded shadow w-40 h-15 z-10 p-2 transition duration-200"
        >
          <label for="language" class="block text-sm text-gray-700">Language</label>
          <select
            id="language"
            v-model="selectedLanguage"
            class="w-full mt-1 text-sm border rounded px-1 py-1"
          >
            <option value="en">English</option>
            <option value="th">Thai</option>
            <option value="lo">Lao</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showDropdown = ref(false)
const selectedLanguage = ref('en')

// Toggle dropdown
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
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
