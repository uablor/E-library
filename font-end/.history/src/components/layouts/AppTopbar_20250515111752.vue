<template>
  <div class="bg-green-600 h-10 relative">
    <div class="flex justify-between items-center px-4 container mx-auto h-full">
      <!-- Logo and title -->
      <div class="flex items-center gap-2">
        <img src="../../assets/images/quest-logo.png" alt="quest-logo" class="w-10 h-10" />
        <h5 class="text-white text-lg font-semibold">{{ $t('quest') }}</h5>
      </div>

      <!-- Settings button with dropdown -->
      <div class="relative">
        <div class="flex items-center gap-2 text-white cursor-pointer" @click="toggleDropdown">
          <span>Setting</span>
          <i class="fa-solid fa-gear"></i>
        </div>

        <!-- Dropdown -->
        <div
          v-if="showDropdown"
          class="absolute right-0 mt-2 w-50 bg-white rounded-md shadow-lg  z-10 p-2"
        >
          <label for="language" class="block text-gray-700 text-sm mb-1">Language</label>
          <select
            id="language"
            v-model="selectedLanguage" @change="changeLanguage"
            class="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:border-blue-300"
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
import { useI18n } from 'vue-i18n';


// Dynam
const showDropdown = ref(false)
const selectedLanguage = ref('en')
const {t,  locale } = useI18n();
const changeLanguage = () => {
  locale.value = selectedLanguage.value;
};
// Toggle the dropdown
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
