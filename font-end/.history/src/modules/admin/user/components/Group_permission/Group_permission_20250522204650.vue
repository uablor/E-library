<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
      <h2 class="text-lg font-bold mb-4">{{ isEdit ? 'Edit Group' : 'Create Group' }}</h2>
      
      <form @submit.prevent="submitForm">
        <!-- Group Name -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Group Name</label>
          <input
            v-model="form.name"
            type="text"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <!-- Permissions -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
          <div v-for="perm in permissions" :key="perm.id" class="flex items-center mb-1">
            <input
              type="checkbox"
              :value="perm.id"
              v-model="form.permissions"
              class="mr-2"
            />
            <span>{{ perm.name }}</span>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-2">
          <button type="button" class="bg-gray-200 px-4 py-2 rounded" @click="$emit('close')">Cancel</button>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, reactive, watch } from 'vue'

interface Permission {
  id: number
  name: string
}

interface GroupData {
  name: string
  permissions: number[]
}

const props = defineProps<{
  visible: boolean
  group: GroupData
  permissions: Permission[]
  isEdit: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', groupData: GroupData): void
  (e: 'close'): void
}>()

const form = reactive<GroupData>({
  name: '',
  permissions: []
})

// Fill form with props.group when modal opens
watch(
  () => props.group,
  (newGroup) => {
    form.name = newGroup.name
    form.permissions = [...newGroup.permissions] // create a shallow copy
  },
  { immediate: true, deep: true }
)

const submitForm = () => {
  emit('submit', { name: form.name, permissions: [...form.permissions] })
}
</script>
