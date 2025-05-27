

<template>
  <div>
    
  </div>
  <div class="flex flex-col gap-5 mx-auto container border">
      <!-- table -->
 <div class="flex gap-5 mx-auto container border">

       <table class=" w-200 bg-white shadow-md rounded-lg mt-6">
         <thead class="bg-gray-100">
           <tr>
             <th class="py-3 px-4">ID</th>
             <th class="py-3 px-4">Name</th>
             <th class="py-3 px-4">Description</th>
             <th class="py-3 px-4">Created At</th>
             <th class="py-3 px-4">Updated At</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="item in items" :key="item.id" class="border-b hover:bg-gray-50">
             <td class="py-2 px-4">{{ item.id }}</td>
             <td class="py-2 px-4">{{ item.name }}</td>
             <td class="py-2 px-4">{{ item.description }}</td>
             <td class="py-2 px-4">{{ formatDate(item.created_at) }}</td>
             <td class="py-2 px-4">{{ formatDate(item.updated_at) }}</td>
           </tr>
         </tbody>
       </table>
       <!-- table for book category -->
            <!-- table -->
       <table class="w-200 bg-white shadow-md rounded-lg mt-6">
         <thead class="bg-gray-100">
           <tr>
             <th class="py-3 px-4">ID</th>
             <th class="py-3 px-4">Name</th>
             <th class="py-3 px-4">Description</th>
             <th class="py-3 px-4">Created At</th>
             <th class="py-3 px-4">Updated At</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="item in items" :key="item.id" class="border-b hover:bg-gray-50">
             <td class="py-2 px-4">{{ item.id }}</td>
             <td class="py-2 px-4">{{ item.name }}</td>
             <td class="py-2 px-4">{{ item.description }}</td>
             <td class="py-2 px-4">{{ formatDate(item.created_at) }}</td>
             <td class="py-2 px-4">{{ formatDate(item.updated_at) }}</td>
           </tr>
         </tbody>
       </table>
     </div>
  <!-- end table -->
    <div class="w-150 mt-20">
      <div v-if="change_From_caogrory_to_type == false" class="">
        <h2 class="text-2xl font-bold mb-4">📘 Book Type Management</h2>
    
        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-4 rounded shadow">
          <div>
            <label class="block font-medium mb-1">Name</label>
            <input v-model="form.name" type="text" class="w-full border p-2 rounded" required />
          </div>
    
          <div>
            <label class="block font-medium mb-1">Description</label>
            <textarea v-model="form.description" class="w-full border p-2 rounded" required></textarea>
          </div>
    
          <div class="flex space-x-2">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {{ form.id ? 'Update' : 'Create' }}
            </button>
            <button type="button" @click="resetForm" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Clear</button>
          </div>
        </form>
    
        <!-- List -->
        <ul  class="mt-6 space-y-2">
          <li
            v-for="(item, index) in items"
            :key="item.id"
            class="border p-4 rounded flex justify-between items-center bg-gray-50"
          >
            <div>
              <h3 class="font-semibold">{{ item.name }}</h3>
              <p class="text-gray-600">{{ item.description }}</p>
              <small class="text-gray-400">Created: {{ formatDate(item.created_at) }}</small>
            </div>
            <div class="space-x-2">
              <button @click="editItem(item)" class="bg-yellow-400 px-2 py-1 rounded">Edit</button>
              <button @click="deleteItem(index)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </li>
        </ul>
      </div>
      <!-- this is category -->
       <div v-else class="space-y-6">
        <h2 class="text-2xl font-bold mb-4">📂 Book category Management</h2>
    
        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-4 rounded shadow">
          <div>
            <label class="block font-medium mb-1">Name</label>
            <input v-model="form.name" type="text" class="w-full border p-2 rounded" required />
          </div>
    
          <div>
            <label class="block font-medium mb-1">Description</label>
            <textarea v-model="form.description" class="w-full border p-2 rounded" required></textarea>
          </div>
    
          <div class="flex space-x-2">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {{ form.id ? 'Update' : 'Create' }}
            </button>
            <button type="button" @click="resetForm" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Clear</button>
          </div>
        </form>
    
        <!-- List -->
        <ul class="mt-6 space-y-2">
          <li
            v-for="(item, index) in items"
            :key="item.id"
            class="border p-4 rounded flex justify-between items-center bg-gray-50"
          >
            <div>
              <h3 class="font-semibold">{{ item.name }}</h3>
              <p class="text-gray-600">{{ item.description }}</p>
              <small class="text-gray-400">Created: {{ formatDate(item.created_at) }}</small>
            </div>
            <div class="space-x-2">
              <button @click="editItem(item)" class="bg-yellow-400 px-2 py-1 rounded">Edit</button>
              <button @click="deleteItem(index)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const change_From_caogrory_to_type = ref(false)
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

function editItem(item: BookData) {
  form.value = { ...item }
}

function deleteItem(index: number) {
  items.value.splice(index, 1)
}

function resetForm() {
  form.value = {
    name: '',
    description: '',
  }
}

function formatDate(date?: Date) {
  return date ? new Date(date).toLocaleString() : ''
}
</script>
