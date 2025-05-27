

<template>

    <!-- end table -->
      
  <!-- Dropdown -->
  <div class="mb-6 text-center md:text-left">
    <select
      v-model="selectedForm"
      class="bg-green-600 text-white px-4 py-2 h-10 focus:outline-none cursor-pointer rounded-lg"
    >
      <option value="all">Select Score Type or Category</option>
      <option value="false">Book Sore</option>
      <option value="true">Book File</option>
    </select>
  </div>

  <!-- Book Type Form -->
  <div v-if="change_From_caogrory_to_type == false">
    <h2 class="text-xl md:text-2xl font-bold mb-4 text-gray-500">📘 Book Score</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-4 rounded shadow">
      <div>
        <label class="block font-medium mb-1">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full border border-gray-300 outline-green-300 p-2 rounded"
          required
        />
      </div>

      <div>
        <label class="block font-medium mb-1">Description</label>
        <textarea
          v-model="form.description"
          class="w-full border border-gray-300 outline-green-300 p-2 rounded"
          required
        ></textarea>
      </div>

      <div class="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {{ form.id ? 'Update' : 'Create' }}
        </button>
        <button
          type="button"
          @click="resetForm"
          class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>
    </form>
  </div>

  <!-- Book Category Form -->
  <div v-else class="space-y-6">
    <h2 class="text-xl md:text-2xl font-bold mb-4 text-gray-500">📂 Book File Management</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-4 rounded shadow">
      <div>
        <label class="block font-medium mb-1">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full border border-gray-300 outline-green-300 p-2 rounded"
          required
        />
      </div>

      <div>
        <label class="block font-medium mb-1">Description</label>
        <textarea
          v-model="form.description"
          class="w-full border border-gray-300 outline-green-300 p-2 rounded"
          required
        ></textarea>
      </div>

      <div class="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {{ form.id ? 'Update' : 'Create' }}
        </button>
        <button
          type="button"
          @click="resetForm"
          class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>
    </form>

</div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const selectedForm = ref('false') // default to Book Type
const change_From_caogrory_to_type = ref(false)

watch(selectedForm, (newVal) => {
  change_From_caogrory_to_type.value = newVal === 'true'
})
interface BookData {
  id?: number
  name: string
  description: string
  created_at?: Date
  updated_at?: Date
}

const items = ref<BookData[]>([])
const form = ref<BookData>({
  name: '',
  description: '',
})

function handleSubmit() {
  if (form.value.id != null) {
    // Update
    const index = items.value.findIndex((i) => i.id === form.value.id)
    if (index !== -1) {
      form.value.updated_at = new Date()
      items.value[index] = { ...form.value }
    }
  } else {
    // Create
    const newItem: BookData = {
      ...form.value,
      id: Date.now(),
      created_at: new Date(),
      updated_at: new Date(),
    }
    items.value.push(newItem)
  }
  resetForm()
}


function resetForm() {
  form.value = {
    name: '',
    description: '',
  }
}


</script>
