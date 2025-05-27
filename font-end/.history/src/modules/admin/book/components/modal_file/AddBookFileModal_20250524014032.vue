<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-opacity-70 flex items-center justify-center"
    style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white rounded-lg shadow-md w-full max-w-lg p-6 relative">
      <h2 class="text-xl font-bold mb-4">
        ເພີ່ມປະເພດປື້ມ
      </h2>

      <button class="absolute top-2 right-2 text-gray-600 hover:text-red-500" @click="$emit('close')">✕</button>

      <form @submit.prevent="handleSave">
                    <!-- Select Book -->
            <div class="mb-3">
              <label class="form-label">Select Book</label>
              <select class="form-select" v-model="formBookFile.book_id" required>
                <option value="" disabled>Select a book</option>
                <option v-for="book in books" :key="book.id" :value="book.id">
                  {{ book.title }}
                </option>
              </select>
            </div>

            <!-- File Upload -->
            <div class="mb-3">
              <label class="form-label">Choose File</label>
              <input type="file" class="form-control" @change="handleFileChange" required />
            </div>


        <div class="mt-6 flex justify-end space-x-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">ຍົກເລີກ</button>
          <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">ບັນທຶກ</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'

const props = defineProps({
  show: Boolean,
  bookType: Object,
})

const emit = defineEmits(['close', 'save'])

// const localBookType = reactive({})
const formBookFile = ref({
  book_id: '',
  file: null,
})
// Sync incoming bookType prop
watch(
  () => props.bookType,
  (newVal) => {
    Object.assign(formBookFile, newVal || {})
  },
  { immediate: true }
)

function handleSave() {
  emit('save', { ...formBookFile })
}
</script>

<style scoped></style>
