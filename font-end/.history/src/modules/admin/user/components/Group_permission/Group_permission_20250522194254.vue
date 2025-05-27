<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4">Edit Group</h2>
    
    <!-- Group Name -->
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-1" for="groupName">Name:</label>
      <input
        v-model="group.name"
        id="groupName"
        type="text"
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
        placeholder="Enter group name"
      />
    </div>

    <!-- Permissions -->
    <div class="mb-6">
      <label class="block text-gray-700 font-medium mb-2">Permissions:</label>
      <div class="border rounded-md p-3 max-h-60 overflow-y-auto">
        <div
          v-for="perm in allPermissions"
          :key="perm.id"
          class="flex items-center space-x-2 mb-2"
        >
          <input
            type="checkbox"
            :value="perm.id"
            v-model="group.permissions"
            class="accent-blue-600"
          />
          <label class="text-gray-800">{{ perm.name }}</label>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex justify-end space-x-3">
      <button
        @click="cancel"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
      >
        Cancel
      </button>
      <button
        @click="submitForm"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const group = ref({
  name: '',
  permissions: [] // array of permission IDs
})

const allPermissions = ref([])

// Simulated fetch - replace with API call
const fetchPermissions = async () => {
  // Example: Replace with actual fetch from your API
  allPermissions.value = [
    { id: 1, name: 'Can add user' },
    { id: 2, name: 'Can change user' },
    { id: 3, name: 'Can delete user' },
    { id: 4, name: 'Can view user' },
  ]
}

const submitForm = () => {
  // POST or PUT to your backend
  console.log('Submitted group:', group.value)
}

const cancel = () => {
  // Reset or navigate away
  group.value = { name: '', permissions: [] }
}

onMounted(() => {
  fetchPermissions()
})
</script>
