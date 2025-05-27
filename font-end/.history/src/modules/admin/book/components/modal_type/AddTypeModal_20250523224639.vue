<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-opacity-70 flex items-center justify-center"
    style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white rounded-lg shadow-md w-full max-w-lg p-6 relative">
      <h2 class="text-xl font-bold mb-4">
        ເພີ່ມປະເພດປື້ມ
      </h2>

      <button class="absolute top-2 right-2 text-gray-600 hover:text-red-500" @click="$emit('close')">✕</button>

      <form @submit.prevent="handleSave">
        <div class="mt-4">
          <label class="block text-sm font-medium">ຊື່ປະເພດ</label>
          <input v-model="localBookType.name"
            class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium">ລາຍລະອຽດ</label>
          <input v-model="localBookType.description"
            class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium">ມື້ທີ່ເພີ່ມ</label>
          <input v-model="localBookType.created_at" type="date"
            class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium">ມື້ທີ່ອັບເດດ</label>
          <input v-model="localBookType.updated_at" type="date"
            class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
import { watch, reactive } from 'vue'

const props = defineProps({
  show: Boolean,
  bookType: Object,
})

const emit = defineEmits(['close', 'save'])

// const localBookType = reactive({})
const localBookType = reactive({
  name: '',
  description: '',
  created_at: '',
  updated_at: ''
})
// Sync incoming bookType prop
watch(
  () => props.bookType,
  (newVal) => {
    Object.assign(localBookType, newVal || {})
  },
  { immediate: true }
)

function handleSave() {
  emit('save', { ...localBookType })
}
</script>

<style scoped></style>
