<template>
  <div class="max-w-4xl mx-auto bg-pink-50 rounded-lg shadow p-6">
    <!-- Header -->
    <div class="relative bg-gray-400 text-white text-lg font-semibold py-2 px-4 rounded-t-md">
      {{ $t('trendingbooks.title') }}
     
    </div>
     <div class="text-sm text-gray-600 ml-3 mt-2">{{ $t('trendingbooks.description') }}</div>    <!-- Filters -->
 <div class="flex flex-wrap gap-2 mt-4 mb-6 text-sm">
    <span
      @click="selected = 'Now'"
      :class="selected === 'Now' ? activeClass : inactiveClass"
    >{{ $t('trendingbooks.now') }}</span>

    <span
      @click="selected = 'Today'"
      :class="selected === 'Today' ? activeClass : inactiveClass"
    >{{ $t('trendingbooks.today') }}</span>

    <span
      @click="selected = 'This Week'"
      :class="selected === 'This Week' ? activeClass : inactiveClass"
    >{{ $t('trendingbooks.thisweek') }}</span>

    <span
      @click="selected = 'This Month'"
      :class="selected === 'This Month' ? activeClass : inactiveClass"
    >{{ $t('trendingbooks.thismonth') }}</span>

    <span
      @click="selected = 'This Year'"
      :class="selected === 'This Year' ? activeClass : inactiveClass"
    >{{ $t('trendingbooks.thisyear') }}</span>

    <span
      @click="selected = 'All Time'"
      :class="selected === 'All Time' ? activeClass : inactiveClass"
    >{{ $t('trendingbooks.alltime') }}</span>
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
        :class="book.inLibrary ? 'bg-green-600 text-white w-30' : 'bg-gray-300 text-gray-600 cursor-not-allowed'"
      >
        {{ book.inLibrary ? 'Read' : 'not in Library' }} {{ book.inLibrary ? $t('trendingbooks.read') : $ }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('Now')

const activeClass = 'bg-green-600 text-white px-3 py-1 rounded cursor-pointer'
const inactiveClass = 'bg-gray-200 text-gray-700 px-3 py-1 rounded cursor-pointer'
const books = [
  {
    title: 'The Idea of Gujarat',
    author: 'Edward Simpson',
    published: 'First published in 2010 — 1 edition',
    inLibrary: true,
    cover: 'https://covers.openlibrary.org/b/id/10523362-L.jpg',
  },
  {
    title: 'Secret Agent Jack Stalwart',
    author: 'Edward Simpson',
    published: 'First published in 2010 — 1 edition',
    inLibrary: false,
    cover: 'https://covers.openlibrary.org/b/id/10523412-L.jpg',
  },
  {
    title: "Say You'll Remember Me",
    author: 'Abby Jimenez',
    published: 'First published in 2010 — 1 edition',
    inLibrary: true,
    cover: 'https://covers.openlibrary.org/b/id/10523562-L.jpg',
  },
];
</script>
<style scoped>
</style>