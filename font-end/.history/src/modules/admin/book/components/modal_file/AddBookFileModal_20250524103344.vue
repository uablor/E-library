<template>
  <div v-if="props.show" class="fixed inset-0 z-50 bg-opacity-70 flex items-center justify-center"
    style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white rounded-lg shadow-md w-full max-w-lg p-6 relative">
      <h2 class="text-xl font-bold mb-4">ເພີ່ມໄຟລ໌ປື້ມ</h2>

      <button class="absolute top-2 right-2 text-gray-600 hover:text-red-500" @click="$emit('close')">✕</button>

      <form @submit.prevent="handleSave">
        <!-- Select Book -->
        <div class="mb-3">
          <label class="form-label">Select Book</label>
          <select class="form-select w-full border border-gray-300 rounded p-2" v-model="formBookFile.book_id" required>
            <option value="" disabled>Select a book</option>
            <option v-for="book in props.books" :key="book.id" :value="book.id">
              {{ book.title }}
            </option>
          </select>
        </div>

        <!-- File Upload -->
        <div class="mb-3">
          <label class="form-label">Choose File</label>
          <input type="file" class="form-control w-full border border-gray-300 rounded p-2" @change="handleFileChange"
            required />
        </div>
          <div>
          <label class="form-label">ປະເພດປື້ມ</label>
          <select name="" id=""></select>
          </div>
        <!-- Buttons -->
        <div class="mt-6 flex justify-end space-x-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">
            ຍົກເລີກ
          </button>
          <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            ບັນທຶກ
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue';
import type { HTMLInputElement } from '@types/web';
import {BookType} from '../../entities/bookType.entity';
const props = defineProps({
  show: Boolean,
  books: {
    type: Array as PropType<Book[]>,
    required: true,
  },
  bookType: {
    type: Array as PropType<BookType[]>,
    required: true,
  },
})
interface Book {
  id: number;
  title: string;
}
const emit = defineEmits(['close', 'save'])

const formBookFile = ref({
  book_id: '',
  file: null,
})

function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0] || null
  formBookFile.value.file = file
}

function handleSave() {
  if (!formBookFile.value.book_id || !formBookFile.value.file) {
    console.log('Please select a book and a file.')
    return
  }

  emit('save', { ...formBookFile.value })
}
</script>