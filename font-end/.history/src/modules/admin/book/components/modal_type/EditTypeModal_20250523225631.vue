<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50"
       style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">ແກ້ໄຂປະເພດປື້ມ</h2>

      <div class="space-y-4">
        <div>
          <label class="block text-gray-600 mb-1">ຊື່ປະເພດປື້ມ</label>
          <input v-model="form.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded" />
        </div>

        <div>
          <label class="block text-gray-600 mb-1">ລາຍລະອຽດ</label>
          <textarea v-model="form.description" class="w-full px-3 py-2 border border-gray-300 rounded"></textarea>
        </div>

        <div>
          <label class="block text-gray-600 mb-1">ວັນທີ່ສ້າງ</label>
          <input v-model="form.created_at" type="date" class="w-full px-3 py-2 border border-gray-300 rounded" />
        </div>

        <div>
          <label class="block text-gray-600 mb-1">ວັນທີ່ອັບເດດ</label>
          <input v-model="form.updated_at" type="date" class="w-full px-3 py-2 border border-gray-300 rounded" />
        </div>
      </div>

      <div class="mt-6 flex justify-end space-x-3">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
          ຍົກເລີກ
        </button>
        <button @click="updateBookType" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          ບັນທຶກ
        </button>
      </div>

      <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, reactive, watch } from 'vue'
import { BookType } from '../../entities/bookType.entity' // Rename to BookType if needed

const props = defineProps<{
  show: boolean
  userData: Type | null // Rename Type to BookType if you have a BookType entity
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update', updatedBookType: Type): void // Rename Type to BookType if renamed
}>()

const form = reactive({
  id: 0,
  name: '',
  description: '',
  created_at: '',
  updated_at: ''
})

watch(
  () => props.userData,
  (newVal) => {
    if (newVal) {
      Object.assign(form, newVal)
    }
  },
  { immediate: true }
)

function updateBookType() {
  emit('update', { ...form })
}
</script>
