<template>
  <div class="bg-pink-50 p-4 rounded">
    <div class="flex flex-col gap-5 mx-auto container bg-white p-5">
      <!-- Tables Wrapper -->
      <div class="flex flex-col md:flex-row gap-5">
        <!-- Table 1 -->
        <table class="min-w-full bg-white shadow-md rounded-lg text-sm md:text-base md:w-1/2">
          <thead class="bg-gray-100 text-left">
            <tr>
              <th class="py-3 px-4">Image</th>
              <th class="py-3 px-4">Title</th>
              <th class="py-3 px-4">Author</th>
              <th class="py-3 px-4">ISBN</th>
              <th class="py-3 px-4">Publisher</th>
              <th class="py-3 px-4">Publish Date</th>
              <th class="py-3 px-4">Category</th>
              <th class="py-3 px-4">Type</th>
              <th class="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="'table1-' + user.isbn" class="border-b hover:bg-gray-50">
              <td class="py-2 px-4">
                <img :src="user.image" alt="Book" class="w-12 h-12 object-cover rounded" />
              </td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.title }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.author }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.isbn }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.publisher }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.publish_date }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.category }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.type }}</td>
              <td class="py-2 px-4 whitespace-nowrap flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button class="bg-green-600 text-white px-3 py-1 rounded" @click="editUser(user)">Edit</button>
                <button class="bg-red-500 text-white px-3 py-1 rounded" @click="deleteUser(user)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Table 2 -->
        <table class="min-w-full bg-white shadow-md rounded-lg text-sm md:text-base md:w-1/2">
          <thead class="bg-gray-100 text-left">
            <tr>
              <th class="py-3 px-4">Image</th>
              <th class="py-3 px-4">Title</th>
              <th class="py-3 px-4">Author</th>
              <th class="py-3 px-4">ISBN</th>
              <th class="py-3 px-4">Publisher</th>
              <th class="py-3 px-4">Publish Date</th>
              <th class="py-3 px-4">Category</th>
              <th class="py-3 px-4">Type</th>
              <th class="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="'table2-' + user.isbn" class="border-b hover:bg-gray-50">
              <td class="py-2 px-4">
                <img :src="user.image" alt="Book" class="w-12 h-12 object-cover rounded" />
              </td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.title }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.author }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.isbn }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.publisher }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.publish_date }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.category }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.type }}</td>
              <td class="py-2 px-4 whitespace-nowrap flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button class="bg-green-600 text-white px-3 py-1 rounded" @click="editUser(user)">Edit</button>
                <button class="bg-red-500 text-white px-3 py-1 rounded" @click="deleteUser(user)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const selectedForm = ref('false')
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

const users = ref([
  {
    image: 'https://via.placeholder.com/60',
    title: 'Book One',
    author: 'Author A',
    isbn: '1234567890',
    publisher: 'Publisher A',
    publish_date: '2021-01-01',
    category: 'Fiction',
    type: 'Hardcover'
  },
  {
    image: 'https://via.placeholder.com/60',
    title: 'Book Two',
    author: 'Author B',
    isbn: '0987654321',
    publisher: 'Publisher B',
    publish_date: '2022-05-12',
    category: 'Non-Fiction',
    type: 'Paperback'
  }
])

function handleSubmit() {
  if (form.value.id != null) {
    const index = items.value.findIndex((i) => i.id === form.value.id)
    if (index !== -1) {
      form.value.updated_at = new Date()
      items.value[index] = { ...form.value }
    }
  } else {
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

function editUser(user: any) {
  console.log('Edit user:', user)
}

function deleteUser(user: any) {
  console.log('Delete user:', user)
}
</script>
