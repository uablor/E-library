<template>
  <div class="flex border rounded-lg shadow p-4 bg-pink-50 w-full max-w-5xl mx-auto">
    <!-- Left Section: Book Cover and Info -->
    <div class="w-1/4 flex flex-col items-center gap-4 bg-white p-4 rounded-lg shadow">
      <img
        src="../../../../assets/images/book1.jpg"
        alt="The Idea of Gujarat"
        class="w-full object-cover rounded"
      />

      <button class="bg-green-100 text-green-800 font-medium px-3 py-1 rounded">📖 Preview Only</button>
      <button class="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-1 rounded">Search inside</button>

      <div class="relative w-full">
        <select class="w-full mt-2 p-2 bg-white border rounded">
          <option>✓ Already Read</option>
          <option>Want to Read</option>
          <option>Currently Reading</option>
        </select>
      </div>

      <div class="text-center text-sm">
        <p class="text-gray-600">When did you finish this book?</p>
        <p class="text-blue-600 hover:underline cursor-pointer">2025 Today <span class="text-xs">Other</span></p>
      </div>

      <div class="text-yellow-500 text-lg">★★★★★</div>

      <div class="flex justify-around w-full text-sm text-gray-600">
        <button class="hover:underline">✍️ Review</button>
        <button class="hover:underline">📝 Notes</button>
        <button class="hover:underline">🔗 Share</button>
      </div>
    </div>

    <!-- Right Section: Book Details -->
    <div class="w-3/4 pl-8">
      <p class="text-sm italic text-gray-500 mb-2">
        An edition of <span class="font-medium">The Idea of Gujarat: History, Ethnography and Text</span> (2010)
      </p>
      <h1 class="text-xl font-semibold italic">The Idea of Gujarat</h1>
    </div>
  </div>
</template>

<script setup>
// No logic needed for static example; dynamic features can be added as needed
</script>

<style scoped>
/* Scoped styles if needed */
</style>
