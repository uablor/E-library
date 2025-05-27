<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-opacity-70 flex items-center justify-center"
    style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white rounded-lg shadow-md w-full max-w-2xl p-6 relative">
      <h2 class="text-xl font-bold mb-4">
        ເພີ່ມໝວກໝູ່ປື້ມ
      </h2>

      <button class="absolute top-2 right-2 text-gray-600 hover:text-red-500" @click="$emit('close')">✕</button>

      <form @submit.prevent="handleSave">
        
          <div>
           
          <div class="mt-4">
              <label class="block text-sm font-medium">ຊື່ໝວກໝູ່</label>
              <input v-model="localUser.name"
                class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="mt-4">
              <label class="block text-sm font-medium">ຄຳອະທິບາຍ</label>
              <input v-model="localUser.description"
                class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="mt-4">
              <label class="block text-sm font-medium">ມື້ທີ່ໄດ້ເພີ່ມ</label>
              <input v-model="localUser.created_at" type="date"
                class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
 <div class="mt-4">
              <label class="block text-sm font-medium">ມື້ທີ່ໄດ້ອັບເດບ</label>
              <input v-model="localUser.updated_at" type="date"
                class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
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
import { watch, reactive, toRefs } from 'vue'

const props = defineProps({
  show: Boolean,
  user: Object,
})

const emit = defineEmits(['close', 'save'])

const localUser = reactive({})

// Watch for changes in the passed-in user prop
watch(
  () => props.user,
  (newUser) => {
    Object.assign(localUser, newUser || {})
  },
  { immediate: true }
)

function handleSave() {
  emit('save', { ...localUser })
}
</script>

<style scoped></style>
