<template>
  <div class="min-h-screen flex items-center justify-center bg-pink-100">
    <div ref="bookContainer" class="flipbook-container shadow-lg rounded-lg overflow-hidden"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PageFlip } from 'page-flip'

const bookContainer = ref<HTMLElement | null>(null)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8000/api/book_file/15/')
    const data = await res.json()
    const imageUrls: string[] = data.image_urls

    const pages: HTMLElement[] = []
    for (const url of imageUrls) {
      const el = document.createElement('div')
      el.className = 'page'
      el.innerHTML = `<img src="${'http://localhost:8000' + url}" class="w-full h-full object-contain rounded-md" />`
      pages.push(el)
    }

    if (bookContainer.value) {
      const flipBook = new PageFlip(bookContainer.value, {
        width: 500,
        height: 700,
        size: 'stretch',
        showCover: true,
        useMouseEvents: true
      })

      flipBook.loadFromHTML(pages)
    }
  } catch (err) {
    console.error('Failed to load flipbook:', err)
  }
})
</script>

<style scoped>
.flipbook-container {
  width: 500px;
  height: 700px;
  background-color: #fff0f5; /* สีชมพูอ่อน */
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  transform-origin: center center;
}
</style>
