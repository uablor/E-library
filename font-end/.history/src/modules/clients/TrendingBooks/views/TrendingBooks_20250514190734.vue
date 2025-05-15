<template>
  <div class="max-w-4xl mx-auto bg-pink-50 rounded-lg shadow p-6">
    <!-- Header -->
    <div class="relative bg-gray-400 text-white text-lg font-semibold py-2 px-4 rounded-t-md">
      Trending Books: Now
     
    </div>
     <div>See what readers from the community are adding to their bookshelves</div>    <!-- Filters -->
 <div class="flex flex-wrap gap-2 mt-4 mb-6 text-sm">
    <span
      @click="selected = 'Now'"
      :class="selected === 'Now' ? activeClass : inactiveClass"
    >Now</span>

    <span
      @click="selected = 'Today'"
      :class="selected === 'Today' ? activeClass : inactiveClass"
    >Today</span>

    <span
      @click="selected = 'This Week'"
      :class="selected === 'This Week' ? activeClass : inactiveClass"
    >This Week</span>

    <span
      @click="selected = 'This Month'"
      :class="selected === 'This Month' ? activeClass : inactiveClass"
    >This Month</span>

    <span
      @click="selected = 'This Year'"
      :class="selected === 'This Year' ? activeClass : inactiveClass"
    >This Year</span>

    <span
      @click="selected = 'All Time'"
      :class="selected === 'All Time' ? activeClass : inactiveClass"
    >All Time</span>
  </div>

    <!-- Book Card -->
    <div
      v-for="(book, index) in books"
      :key="index"
      class="flex items-center  rounded-md p-4 mb-4 bg-white"
    >
      <img :src="book.cover" alt="Book Cover" class="w-20 h-28 object-cover rounded-md" />
      <div class="ml-4 flex-1">
        <div class="text-base font-semibold">{{ book.title }}</div>
        <div class="text-sm text-gray-600 mb-1">by {{ book.author }}</div>
        <div class="text-xs text-gray-500">{{ book.published }}</div>
        <div class="text-xs text-gray-500">Someone marked as Want to Read 12</div>
      </div>
      <button
        class="ml-4 px-4 py-1 rounded text-sm font-medium"
        :class="book.inLibrary ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'"
      >
        {{ book.inLibrary ? 'Read' : 'not in Library' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('Now')

const activeClass = 'bg-green-600 text-white px-3 py-1 rounded cursor-pointer'
const inactiveClass = 'bg-gray-200 text-gray-700 px-3 py-1 rounded cursor-pointer'
\
</script>
<style scoped>
</style>