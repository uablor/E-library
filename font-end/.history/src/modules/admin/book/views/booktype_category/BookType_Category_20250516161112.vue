<!-- <template>
  <div class="p-6 max-w-2xl mx-auto space-y-10">
    <h2 class="text-2xl font-bold">📘 Book Type Management</h2>
    <form @submit.prevent="submitBookType" class="bg-white p-5 rounded shadow space-y-4">
      <FormGroup label="Name" v-model="bookType.name" />
      <FormGroup label="Description" v-model="bookType.description" />
      <FormGroup label="Created At" v-model="bookType.created_at" type="date" />
      <FormGroup label="Updated At" v-model="bookType.updated_at" type="date" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Book Type</button>
    </form>

    <h2 class="text-2xl font-bold">📂 Book Category Management</h2>
    <form @submit.prevent="submitBookCategory" class="bg-white p-5 rounded shadow space-y-4">
      <FormGroup label="Name" v-model="bookCategory.name" />
      <FormGroup label="Description" v-model="bookCategory.description" />
      <FormGroup label="Created At" v-model="bookCategory.created_at" type="date" />
      <FormGroup label="Updated At" v-model="bookCategory.updated_at" type="date" />
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save Book Category</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// State
const bookType = ref({
  name: '',
  description: '',
  created_at: '',
  updated_at: ''
})

const bookCategory = ref({
  name: '',
  description: '',
  created_at: '',
  updated_at: ''
})

// Submit Handlers
function submitBookType() {
  console.log("Book Type Data:", bookType.value)
  alert('✅ Book Type saved!')
}

function submitBookCategory() {
  console.log("Book Category Data:", bookCategory.value)
  alert('✅ Book Category saved!')
}
</script>

 Reusable Form Input Component
<script>
export default {
  components: {
    FormGroup: {
      props: ['label', 'modelValue', 'type'],
      emits: ['update:modelValue'],
      template: `
        <div>
          <label class="block mb-1 font-medium">{{ label }}</label>
          <input
            :type="type || 'text'"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      `
    }
  }
}
</script> -->

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold mb-4">Book Type Management</h2>

    <form v-model="selectedItem" @submit="handleSubmit" />

    <ul class="mt-6 space-y-2">
      <li v-for="(item, index) in items" :key="item.id" class="border p-2 flex justify-between items-center">
        <div>
          <h3 class="font-semibold">{{ item.name }}</h3>
          <p class="text-gray-600">{{ item.description }}</p>
        </div>
        <div class="space-x-2">
          <button @click="editItem(item)" class="bg-yellow-400 px-2 py-1 rounded">Edit</button>
          <button @click="deleteItem(index)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import BookForm from './BookForm.vue'

interface BookData {
  id?: number
  name: string
  description: string
  created_at?: Date
  updated_at?: Date
}

const items = ref<BookData[]>([])
const selectedItem = ref<BookData | null>(null)

function handleSubmit(data: BookData) {
  if (data.id != null) {
    const index = items.value.findIndex((i) => i.id === data.id)
    if (index !== -1) items.value[index] = { ...data }
  } else {
    data.id = Date.now()
    items.value.push(data)
  }
}

function editItem(item: BookData) {
  selectedItem.value = { ...item }
}

function deleteItem(index: number) {
  items.value.splice(index, 1)
}
</script>
