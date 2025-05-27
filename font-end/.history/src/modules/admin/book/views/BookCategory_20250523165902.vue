<template>
    <div class="p-5 bg-pink-50 mb-5">
        <div class="p-6 bg-white shadow-md rounded-lg">
            <!-- Title and controls -->
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-500">
                    <i class="fa-solid fa-book"></i> 📂 ໝວກໝູ່ປື້ມ
                </h1>

                <!-- Buttons and search -->
                <div class="flex  sm:flex-row gap-2 sm:gap-4">
                      <select v-model="viewMode" @change="toggleSoftDelete"   class=" block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                                    <option value="" disabled>-- ເລືອກ  --</option>
                                    <option value="normal">Form Books</option>
                                    <option value="soft">Soft Delete</option>
                                </select>
                    <div>
                       
                        <div
                            class="py-2 px-4 whitespace-nowrap flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            
                                <!-- <label class="block text-sm font-medium mt-1">Soft delete</label> -->
                               
                              
                            <button
                                class="cursor-pointer bg-yellow-500  text-white px-8 py-1 rounded hover:bg-yellow-700 w-full sm:w-auto"
                                @click="openEditModal(selectedUser)" :disabled="!selectedUser"
                                :class="{ 'opacity-50 cursor-not-allowed': !selectedUser }">ເເກ້ໄຂ</button>

                            <button
                                class="cursor-pointer bg-red-500  text-white px-8 py-1 rounded hover:bg-red-700 w-full sm:w-auto w-50"
                                @click="deleteUser" :disabled="!selectedUser"
                                :class="{ 'opacity-50 cursor-not-allowed': !selectedUser }">ລືບ</button>
                            <button
                                class="cursor-pointer bg-green-600 text-white px-8 py-1 rounded hover:bg-green-700 w-full sm:w-auto"
                                @click="openAddUser">ເພີ່ມປື້ມ</button>
                        </div>

                    </div>


                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center ">
                        <select
                            class="bg-green-600 shadow-md text-white px-2 py-1 h-9 focus:outline-none cursor-pointer rounded-l sm:rounded-l">
                            <option value="all">{{ $t('navbar.all') }}</option>
                        </select>
                        <input type="text" :placeholder="$t('navbar.search') + '..........'"
                            class="focus:outline-none text-black shadow-md h-9 py-1 pl-3 rounded-r sm:rounded-r" />
                    </div>
                </div>
            </div>

            <!-- Responsive Table -->
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white shadow-md rounded-lg text-sm md:text-base">
                    <thead class="bg-gray-100 text-left">
                        <tr>
                           <th class="py-3 px-4">#</th>
                       <th  class="py-3 px-4">Name</th>
                       <th  class="py-3 px-4">Description</th>
                       <th  class="py-3 px-4">Created_At</th>
                       <th  class="py-3 px-4">Updated_At</th>
                       <th  class="py-3 px-4">Actions</th>

                        </tr>
                    </thead>
                    <tbody v-if="isSoftDeleteOpen">
                        <tr v-for="user in books" :key="user.id" @click="selectUser(user)" :class="[
                            'border-b hover:bg-gray-50 cursor-pointer',
                            selectedUser?.id === user.id ? 'bg-yellow-100' : ''
                        ]" class="border-b hover:bg-gray-50">
                            <td class="py-2 px-4 whitespace-nowrap">
                                <img :src="user.image" alt="avatar" class="w-20 h-30  object-cover" />
                            </td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ user.title }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ user.author }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ user.isbn }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ user.publisher }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ user.publish_date }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ user.category }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ user.type }}</td>

                        </tr>
                    </tbody>

                    <!-- table of soft delete -->
                    <tbody v-else>
                        <tr v-for="user in bookSoftsDelete" :key="user.id" @click="selectUser(user)" :class="[
                            'border-b hover:bg-gray-50 cursor-pointer',
                            selectedUser?.id === user.id ? 'bg-yellow-100' : ''
                        ]" class="border-b hover:bg-gray-50">
                            <td class="py-2 px-4 whitespace-nowrap">
                                <img :src="user.image" alt="avatar" class="w-20 h-30  object-cover" />
                            </td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ user.title }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ user.author }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ user.isbn }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ user.publisher }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ user.publish_date }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ user.category }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ user.type }}</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal addUser -->
    <AddBookModal :show="isModalOpen" :user="selectedUser" @close="isModalOpen = false" @save="saveUser" />
    <!-- Edit Modal -->
    <EditBookModal :show="isEditModalOpen" :userData="selectedUser" @close="isEditModalOpen = false"
        @update="handleUserUpdate" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AddBookModal from '../components/modal_book/AddBookModal.vue'
import EditBookModal from '../components/modal_book/EditBookModal.vue'

interface Book {
  id: number
  name: string
  title: string
  author: string
  isbn: string
  publisher: string
  publish_date: string
  category: string
  type: string
}

const isModalOpen = ref<boolean>(false)
const selectedUser = ref<Book | null>(null)
const viewMode = ref<'normal' | string>('normal')
const isSoftDeleteOpen = ref<boolean>(true)

function toggleSoftDelete(): void {
  isSoftDeleteOpen.value = (viewMode.value === 'normal')
}

const books = ref<Book[]>([
  {
    id: 1,
    name:,
    description: "ຄວາມຮັກໃນລະດູໃບໄມ້ປຽກ",
    created_at: "ສຸກສັນ ສີທອງ",
    updated_at : "978-1-23456-789-0",
    
  },
  {
    id: 2,
    name:,
    description: "ຄວາມຮັກໃນລະດູໃບໄມ້ປຽກ",
    created_at: "ສຸກສັນ ສີທອງ",
    updated_at : "978-1-23456-789-0",
  },
  {
    id: 3,
    name:,
    description: "ຄວາມຮັກໃນລະດູໃບໄມ້ປຽກ",
    created_at: "ສຸກສັນ ສີທອງ",
    updated_at : "978-1-23456-789-0",
  },
  {
    id: 4,
    name:,
    description: "ຄວາມຮັກໃນລະດູໃບໄມ້ປຽກ",
    created_at: "ສຸກສັນ ສີທອງ",
    updated_at : "978-1-23456-789-0",
  },
  {
    id: 5,
     name:,
    description: "ຄວາມຮັກໃນລະດູໃບໄມ້ປຽກ",
    created_at: "ສຸກສັນ ສີທອງ",
    updated_at : "978-1-23456-789-0",
  },
  {
    id: 6,
    name:,
    description: "ຄວາມຮັກໃນລະດູໃບໄມ້ປຽກ",
    created_at: "ສຸກສັນ ສີທອງ",
    updated_at : "978-1-23456-789-0",
  },
  {
    id: 7,
     name:,
    description: "ຄວາມຮັກໃນລະດູໃບໄມ້ປຽກ",
    created_at: "ສຸກສັນ ສີທອງ",
    updated_at : "978-1-23456-789-0",
  }
])

const bookSoftsDelete = ref<Book[]>([
  books.value[1],
  books.value[2],
  books.value[3],
])

function openAddUser(): void {
  selectedUser.value = {
    id: Date.now(),
    image: '',
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    publish_date: '',
    category: '',
    type: ''
  }
  isModalOpen.value = true
}

function openEditUser(user: Book): void {
  selectedUser.value = { ...user }
  isModalOpen.value = true
}

const isEditModalOpen = ref<boolean>(false)

function selectUser(user: Book): void {
  selectedUser.value = user
}

function openEditModal(): void {
  if (!selectedUser.value) {
    alert('Please select a user first.')
  } else {
    isEditModalOpen.value = true
  }
}

function saveUser(userData: Book): void {
  const index = books.value.findIndex(u => u.id === userData.id)
  if (index !== -1) {
    books.value[index] = userData
  } else {
    books.value.push(userData)
  }
  isModalOpen.value = false
}
</script>
