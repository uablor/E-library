

<template>
  <div class="bg-pink-50 p-4 rounded">

    <div class="flex flex-col gap-5 mx-auto container bg-white  p-5">
        <!-- table -->
   <div class="flex gap-5 mx-auto container ">
  
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
             <tr v-for="item in items" :key="item.id" class=" hover:bg-gray-50">
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
             <tr v-for="item in items" :key="item.id" class=" hover:bg-gray-50">
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
      <div class="w-150 mt-20 ">
        <div  class="ml-88">
          <select v-model="selectedForm" class="bg-green-600 text-white px-2 py-1 h-9 focus:outline-none cursor-pointer rounded-l">
         <option value="all" >Select Book Type or Category</option>
          <option value="false" >Book Type</option>
          <option value="true" >Book Category</option>
        </select>
        </div>
        <div v-if="change_From_caogrory_to_type == false" class="">
          <h2 class="text-2xl font-bold mb-4 text-gray-500">📘 Book Type Management</h2>
      
          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-4 rounded shadow">
            <div>
              <label class="block font-medium mb-1">Name</label>
              <input v-model="form.name" type="text" class="w-full border border-gray-300 outline-green-300 p-2 rounded  " required />
            </div>
      
            <div>
              <label class="block font-medium mb-1">Description</label>
              <textarea v-model="form.description" class="w-full border border-gray-300  outline-green-300 p-2 rounded" required></textarea>
            </div>
      
            <div class="flex space-x-2">
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {{ form.id ? 'Update' : 'Create' }}
              </button>
              <button type="button" @click="resetForm" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Clear</button>
            </div>
          </form>
      
         
        </div>
        <!-- this is category -->
         <div v-else class="space-y-6">
          <h2 class="text-2xl font-bold mb-4 text-gray-500">📂 Book category Management</h2>
      
          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-4 rounded shadow">
            <div>
              <label class="block font-medium mb-1">Name</label>
              <input v-model="form.name" type="text" class="w-full border  p-2 rounded" required />
            </div>
      
            <div>
              <label class="block font-medium mb-1">Description</label>
              <textarea v-model="form.description" class="w-full border  p-2 rounded" required></textarea>
            </div>
      
            <div class="flex space-x-2">
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {{ form.id ? 'Update' : 'Create' }}
              </button>
              <button type="button" @click="resetForm" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Clear</button>
            </div>
          </form>
      
        
        </div>
      </div>
      <div>
      </div>
    </div>
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

function formatDate(date?: Date) {
  return date ? new Date(date).toLocaleString() : ''
}
</script>
