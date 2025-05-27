<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" style="background-color: rgb;">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-semibold text-gray-700">ແກ້ໄຂໄຟລ໌ເອກະສານ</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-red-600 text-xl">&times;</button>
      </div>
      <div class="p-4 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-600">File URL</label>
          <input type="text" v-model="edited.file_url"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600">Book Name</label>
          <input type="text" v-model="edited.book_id_name"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600">File Type</label>
          <input type="text" v-model="edited.file_type"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600">Upload Timestamp</label>
          <input type="datetime-local" v-model="edited.upload_timestamp"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-500" />
        </div>
      </div>
      <div class="flex justify-end gap-2 p-4 border-t">
        <button @click="$emit('close')"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">ຍົກເລີກ</button>
        <button @click="submit"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">ບັນທຶກ</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { BookFile } from '../../entities/bookFile.entity'

const props = defineProps<{
  show: boolean
  userData: BookFile | null
}>()

const emit = defineEmits(['close', 'update'])

const edited = ref<BookFile>({
  id: 0,
  file_url: '',
  book_id_name: '',
  file_type: '',
  upload_timestamp: '',
  created_at: '',
  updated_at: '',
  deleted_at: null
})

// sync with props when modal opens
watch(
  () => props.userData,
  (newData) => {
    if (newData) {
      edited.value = { ...newData }
    }
  },
  { immediate: true }
)

function submit() {
  emit('update', edited.value)
}
</script>
