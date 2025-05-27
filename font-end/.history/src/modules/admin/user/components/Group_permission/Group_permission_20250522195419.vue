<!-- GroupFormModal.vue -->
<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
      <h2 class="text-xl font-semibold mb-4">{{ isEdit ? 'Edit Group' : 'Add Group' }}</h2>

      <!-- Group Name -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Group Name:</label>
        <input
          v-model="localGroup.name"
          type="text"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <!-- Permissions -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Permissions:</label>
        <div class="border rounded-md p-3 max-h-52 overflow-y-auto">
          <div
            v-for="perm in allPermissions"
            :key="perm.id"
            class="flex items-center space-x-2 mb-2"
          >
            <input
              type="checkbox"
              :value="perm.id"
              v-model="localGroup.permissions"
              class="accent-blue-600"
            />
            <label>{{ perm.name }}</label>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex justify-end space-x-2">
        <button @click="close" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
        <button @click="submitForm" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { toRefs } from 'vue'

const props = defineProps({
  visible: Boolean,
  group: Object,
  permissions: Array,
  isEdit: Boolean
})

const emits = defineEmits(['close', 'submit'])

const { group, permissions } = toRefs(props)
// const localGroup = ref({ name: '', permissions: [] })
watch(group, (newVal: { name: string; permissions: Permission[] }) => {
  localGroup.value = { ...newVal }
}, { immediate: true })
interface Permission {
  id: number;
  name: string;
}

const allPermissions = ref<Permission[]>([])

watch(group, (newVal) => {
  localGroup.value = { ...newVal }
}, { immediate: true })

watch(permissions, (newVal) => {
  allPermissions.value = [...newVal]
}, { immediate: true })

const close = () => emits('close')
const submitForm = () => emits('submit', localGroup.value)
</script>
