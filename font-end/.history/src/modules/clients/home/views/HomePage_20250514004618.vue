<template>
  <div class="p-4 space-y-10 bg-pink-50">
    <!-- Section: Trending Books -->
    <section>
      <div class="relative mb-4">
        <h2 class="text-white bg-green-600 px-4 py-2 w-fit rounded-tl-lg">Trending Books</h2>
      </div>
      <div class="relative border bg-gray-400 border-green-300 p-4 rounded flex items-center justify-center">
        <!-- Left Arrow -->
        <button @click="scrollLeft('trending')" class="text-white text-2xl font-bold ">
          &lt;
        </button>

        <!-- Book List -->
      

    <div
          ref="trending"
          class="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth"
        >
        <div  v-for="i in 55" :key="i" class="flex flex-col items-center">
            <img src="../../../../assets/images/book1.jpg" alt="book" class="w-75 h-auto shadow" />
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center">read now</button>
        </div>
        </div>


        <!-- Right Arrow -->
        <button @click="scrollRight('trending')" class="text-white text-2xl font-bold ml-2">
          &gt;
        </button>
      </div>
    </section>

    <!-- Section: Classic Books -->
    <section class="-mt-6">
      <div class="relative mb-4">
        <h2 class="text-white bg-green-600 px-4 py-2 w-fit rounded-tl-lg">Classic Books</h2>
      </div>
      <div class="relative border bg-gray-400 border-green-300 p-4 rounded flex items-center">
        <!-- Left Arrow -->
        <button @click="scrollLeft('classic')" class="text-white text-2xl font-bold ">
          &lt;
        </button>

        <!-- Book List -->
        <div
          ref="classic"
          class="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth"
        >
        <div  v-for="i in 55" :key="i" class="flex flex-col items-center ">
            <img src="../../../../assets/images/book1.jpg" alt="book" class="w-75 h-auto shadows-img " />
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center">read now</button>
        </div>
        </div>

        <!-- Right Arrow -->
        <button @click="scrollRight('classic')" class="text-white text-2xl font-bold ml-2 ">
          &gt;
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const trending = ref(null)
const classic = ref(null)

function scrollLeft(refName) {
  if (refName === 'trending' && trending.value) {
    trending.value.scrollLeft -= 200
  }
  if (refName === 'classic' && classic.value) {
    classic.value.scrollLeft -= 200
  }
}

function scrollRight(refName) {
  if (refName === 'trending' && trending.value) {
    trending.value.scrollLeft += 200
  }
  if (refName === 'classic' && classic.value) {
    classic.value.scrollLeft += 200
  }
}
</script>

<style>
/* Optional: hide scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.shadows-img {
  box-shadow: 0 4px 8px 9px rgba(0, 0, 0, 0.2);
  border: 3px solid #fff;
}
</style>
