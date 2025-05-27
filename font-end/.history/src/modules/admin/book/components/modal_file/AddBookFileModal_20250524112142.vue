<template>
  <div v-if="props.show" class="fixed inset-0 z-50 bg-opacity-70 flex items-center justify-center"
    style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white rounded-lg shadow-md w-full max-w-lg p-6 relative">
      <h2 class="text-xl font-bold mb-4">ເພີ່ມໄຟລ໌ປື້ມ</h2>

      <button class="absolute top-2 right-2 text-gray-600 hover:text-red-500 cursor" @click="$emit('close')">✕</button>

      <form @submit.prevent="handleSave">
        <!-- Select Book -->
        <div class="mb-3">
          <label class="form-label">ປື້ມເອກະສານ</label>
          <select class="form-select w-full border border-gray-300 rounded p-2" v-model="formBookFile" required>
            <option value="" disabled>ເລືອກປື້ມເອກະສານ</option>
            <option v-for="book in props.books" :key="book.id" :value="book.id">
              {{ book.title }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">ປະເພດປື້ມ</label>
          <select class="form-select w-full border border-gray-300 rounded p-2" v-model="selectedBookType" required>
            <option value="">ເລືອກປະເພດປື້ມ</option>
            <option v-for="bookType in props.booktypes" :key="bookType.id" :value="bookType.id">{{ bookType.name }}
            </option>
          </select>
        </div>
        <!-- File Upload -->
        <div class="mb-3">
          <label class="form-label">ເລືອກໄຟລ໌ເອກະສານ</label>
          <input type="file" class="form-control w-full border border-gray-300 rounded p-2" @change="handleFileChange"
            required />
        </div>

        <!-- Buttons -->
        <div class="mt-6 flex justify-end space-x-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-400">
            ຍົກເລີກ
          </button>
          <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer hover:bg-green-600">
            ບັນທຶກ
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { PropType } from 'vue';
import type { HTMLInputElement } from '@types/web';
import { BookFile } from '../../entities/bookFile.entity';
import { Book } from '../../entities/book.entity';
import { BookType } from '../../entities/bookType.entity';

const formBookFile = reactive<BookFileWithFile[]>([]);

const selectedBookType = ref<BookType[]>([]);

interface BookFileWithFile extends BookFile {
  file: File | null;
}
const props = defineProps({
  show: Boolean,
  books: {
    type: Array as PropType<Book[]>,
    required: true,
  },
  booktypes: {
    type: Array as PropType<BookType[]>,
    required: true,
  },
})
const emit = defineEmits(['close', 'save'])

function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0] || null
  formBookFile[0].file = file
}

function handleSave() {
  if (!formBookFile[0].book_id_name || !formBookFile[0].file) {
    console.log('Please select a book and a file.')
    return
  }
  if (Array.isArray(selectedBookType.value) && selectedBookType.value.length > 0) {
    if (!selectedBookType.value[0].id || !selectedBookType.value[0].name) {
      console.log('Please select a booktype .')
      return
    }
  }

  if (Array.isArray(selectedBookType.value) && selectedBookType.value.length > 0) {
    emit('save', { ...formBookFile[0], ...selectedBookType.value[0] })
  }
}
</script>