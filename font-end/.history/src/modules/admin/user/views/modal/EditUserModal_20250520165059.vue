<!-- src/components/modals/EditUserModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white w-full max-w-md rounded-lg shadow p-6 relative">
      <h2 class="text-xl font-bold mb-4">Edit User</h2>

      <form @submit.prevent="submitEdit">
       
  <div class="mb-4">
    <label class="block text-gray-700">Code Student</label>
    <input v-model="form.code_student" type="text" class="w-full border rounded px-3 py-2 mt-1" />
  </div>

  <div class="mb-4">
    <label class="block text-gray-700">Username</label>
    <input v-model="form.username" type="text" class="w-full border rounded px-3 py-2 mt-1" />
  </div>

  <div class="mb-4">
    <label class="block text-gray-700">Email</label>
    <input v-model="form.email" type="email" class="w-full border rounded px-3 py-2 mt-1" />
  </div>

  <div class="mb-4">
    <label class="block text-gray-700">Firstname</label>
    <input v-model="form.firstname" type="text" class="w-full border rounded px-3 py-2 mt-1" />
  </div>

  <div class="mb-4">
    <label class="block text-gray-700">Birthday</label>
    <input v-model="form.birthday" type="date" class="w-full border rounded px-3 py-2 mt-1" />
  </div>

  <div class="mb-4">
    <label class="block text-gray-700">Address</label>
    <input v-model="form.address" type="text" class="w-full border rounded px-3 py-2 mt-1" />
  </div>

  <div class="mb-4">
    <label class="block text-gray-700">Department</label>
    <input v-model="form.department" type="text" class="w-full border rounded px-3 py-2 mt-1" />
  </div>

  <div class="mb-4">
    <label class="block text-gray-700">Phone</label>
    <input v-model="form.phone" type="text" class="w-full border rounded px-3 py-2 mt-1" />
  </div>

  <!-- Boolean checkboxes -->
  <div class="grid grid-cols-2 gap-4">
    <label class="flex items-center space-x-2">
      <input v-model="form.is_staff" type="checkbox" />
      <span>Is Staff</span>
    </label>

    <label class="flex items-center space-x-2">
      <input v-model="form.is_active" type="checkbox" />
      <span>Is Active</span>
    </label>

    <label class="flex items-center space-x-2">
      <input v-model="form.is_superuser" type="checkbox" />
      <span>Is Superuser</span>
    </label>

    <label class="flex items-center space-x-2">
      <input v-model="form.is_verify" type="checkbox" />
      <span>Is Verified</span>
    </label>
  </div>

  <div class="flex justify-end mt-4">
    <button type="button" @click="close" class="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
  </div>
      </form>

      <button @click="close" class="absolute top-2 right-2 text-gray-500 hover:text-black">&times;</button>
    </div>
  </div>
</template>

<script setup leng="ts">
import { ref, defineProps, defineEmits, watchEffect } from 'vue'

const props = defineProps({
  show: Boolean,
  userData: Object
})

const emit = defineEmits(['close', 'update'])

const form = ref({
  code_student: '',
  username: '',
  email: '',
  firstname: '',
  birthday: '',
  address: '',
  department: '',
  phone: '',
  is_staff: false,
  is_active: false,
  is_superuser: false,
  is_verify: false
})

watchEffect(() => {
  if (props.show && props.userData) {
    form.value = { ...props.userData }
  }
})

</script>
