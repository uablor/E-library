<template>
    <div class="p-4 space-y-10 bg-pink-50">
  <!-- Section: Trending Books -->
  <section>
    <div class="relative mb-4">
      <h2 class="text-white bg-green-600 px-4 py-2 w-fit rounded-tl-lg">Trending Books</h2>
    </div>
    <div class="relative border bg-gray-400 border-green-300 p-4 rounded flex items-center justify-center">
      <!-- Left Arrow -->
      <button class="text-white text-2xl font-bold mr-2 hidden sm:block">&lt;</button>

      <!-- Book List -->
      <div class="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 flex-1 xl:pl-17 sm:pl-5 ml-2 md:-ml-2">
        <img src="../../../../assets/images/book1.jpg" alt="book" class="w-35 h-auto  shadow" />
        <img src="../../../../assets/images/lovemovie.jpg" alt="book" class="w-35 h-auto shadow" />
        <img src="../../../../assets/images/book1.jpg" alt="book" class="w-35 h-auto shadow" />
        <img src="../../../../assets/images/book1.jpg" alt="book" class="w-35 h-auto shadow" />
        <img src="../../../../assets/images/book1.jpg" alt="book" class="w-35 h-auto shadow" />
      </div>

      <!-- Right Arrow -->
      <button class="text-white text-2xl font-bold ml-2 hidden sm:block">&gt;</button>
    </div>
  </section>

  <!-- Section: Kids -->
  <section class="-mt-6">
    <div class="relative  mb-4">
      <h2 class="text-white bg-green-600 px-4 py-2 w-fit rounded-tl-lg">Classic Books</h2>
    </div>
    <div class="relative border  bg-gray-400 border-green-300 p-4 rounded flex items-center">
      <!-- Left Arrow -->
      <button class="text-white text-2xl font-bold mr-2 hidden sm:block">&lt;</button>

      <!-- Book List -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 flex-1 xl:pl-17 sm:pl-5 ml-2 md:-ml-2 ">
        <img src="../../../../assets/images/book1.jpg" alt="book" class="w-35 h-auto shadow" />
        <img src="../../../../assets/images/book1.jpg" alt="book" class="w-35 h-auto shadow" />
        <img src="../../../../assets/images/book1.jpg" alt="book" class="w-35 h-auto shadow" />
        <img src="../../../../assets/images/book1.jpg" alt="book" class="w-35 h-auto shadow" />
        <img src="../../../../assets/images/book1.jpg" alt="book" class="w-35 h-auto shadow" />
      </div>

      <!-- Right Arrow -->
      <button class="text-white text-2xl font-bold ml-2 hidden sm:block">&gt;</button>
    </div>
  </section>
</div>

</template>
<script>
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
<style></style>