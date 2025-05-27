<!-- src/components/modals/EditUserModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white w-full max-w-md rounded-lg shadow p-6 relative">
      <h2 class="text-xl font-bold mb-4">Edit User</h2>

      <form @submit.prevent="submitEdit">
        <div class="mb-4">
          <label class="block text-gray-700">Name</label>
          <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input v-model="form.email" type="email" class="w-full border rounded px-3 py-2 mt-1" />
        </div>

        <!-- Add more fields as needed -->

        <div class="flex justify-end mt-4">
          <button type="button" @click="close" class="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>

      <button @click="close" class="absolute top-2 right-2 text-gray-500 hover:text-black">&times;</button>
    </div>
  </div>
</template>

<script setup leng>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: Boolean,
  userData: Object
})

const emit = defineEmits(['close', 'update'])

const form = ref({
  name: '',
  email: ''
})

watch(() => props.userData, (newVal) => {
  if (newVal) {
    form.value = { ...newVal } // pre-fill the form
  }
}, { immediate: true })

const close = () => emit('close')

const submitEdit = () => {
  emit('update', form.value)
  close()
}
</script>
