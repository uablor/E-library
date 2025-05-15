<template>
  <div class="p-4 space-y-10 bg-pink-50">
    <!-- Trending Books -->
    <section>
      <div class="relative mb-4">
        <h2 class="text-white bg-green-600 px-4 py-2 w-fit rounded-tl-lg">Trending Books</h2>
      </div>
      <div class="relative border bg-gray-400 border-green-300 p-4 rounded flex items-center justify-center">
        <!-- Left Arrow -->
        <button @click="scrollLeft('classic')" class="text-white text-2xl font-bold mr-2">&lt;</button>

        <!-- Scrollable Book List -->
        <div ref="trendingRef" class="scrollbar-hide scroll-smooth gap-4 flex overflow-x-auto xl:pl-17 sm:pl-5 ml-2 md:-ml-2">
          <img v-for="i in 15" :key="i" src="../../../../assets/images/book1.jpg" alt="book" class="w-35 h-auto shadow" />
        </div>

        <!-- Right Arrow -->
        <button @click="scrollRight(classicRef)" class="text-white text-2xl font-bold ml-2">&gt;</button>
      </div>
    </section>

    <!-- Classic Books -->
    <section class="-mt-6">
      <div class="relative mb-4">
        <h2 class="text-white bg-green-600 px-4 py-2 w-fit rounded-tl-lg">Classic Books</h2>
      </div>
      <div class="relative border bg-gray-400 border-green-300 p-4 rounded flex items-center">
        <!-- Left Arrow -->
        <button @click="scrollLeft(trendingRef)" class="text-white text-2xl font-bold mr-2">&lt;</button>

        <!-- Scrollable Book List -->
        <div ref="classicRef" class="scrollbar-hide scroll-smooth gap-4 flex overflow-x-auto xl:pl-17 sm:pl-5 ml-2 md:-ml-2">
          <img v-for="i in 15" :key="i" src="../../../../assets/images/book1.jpg" alt="book" class="w-35 h-auto shadow" />
        </div>

        <!-- Right Arrow -->
        <button @click="scrollRight(classicRef)" class="text-white text-2xl font-bold ml-2">&gt;</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const trendingRef = ref(null)
const classicRef = ref(null)

function scrollLeft(refElement) {
  if(refElement ==='trendingRef' && trendingRef.value) {
    trendingRef.value.scrollLeft -= 200
  }
  if (refElement === 'classicRef' && classicRef.value) {
    classicRef.value.scrollLeft -= 200
  }
}

function scrollRight(refElement) {
  if(refElement ==='trendingRef' && trendingRef.value) {
    trendingRef.value.scrollLeft += 200
  }
  if (refElement === 'classicRef' && classicRef.value) {
    classicRef.value.scrollLeft += 200
  }
}

</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
