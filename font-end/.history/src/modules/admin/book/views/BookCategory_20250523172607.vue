<template>
  <div class="p-5 bg-pink-50 mb-5">
    <div class="p-6 bg-white shadow-md rounded-lg">
      <!-- Title and controls -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-500">
          <i class="fa-solid fa-book"></i> 📂 ປະເພດປື້ມ
        </h1>

        <div class="flex sm:flex-row gap-2 sm:gap-4">
          <select v-model="viewMode" @change="toggleSoftDelete" class="block w-full rounded border px-3 py-2">
            <option value="" disabled>-- ເລືອກ --</option>
            <option value="normal">ໝວກປື້ມທົ່ວໄປ</option>
            <option value="soft">ລາຍການທີ່ຖືກລຶບ</option>
          </select>

          <div class="flex gap-2">
            <button class="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-700"
              @click="openEditModal(selectedCategory)" :disabled="!selectedCategory"
              :class="{ 'opacity-50 cursor-not-allowed': !selectedCategory }">
              ແກ້ໄຂ
            </button>
            <button class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
              @click="deleteCategory" :disabled="!selectedCategory"
              :class="{ 'opacity-50 cursor-not-allowed': !selectedCategory }">
              ລຶບ
            </button>
            <button class="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700" @click="openAddModal">
              ເພີ່ມໝວກປື້ມ
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded-lg text-sm md:text-base">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-3 px-4">#</th>
              <th class="py-3 px-4">ຊື່ປະເພດ</th>
              <th class="py-3 px-4">ລາຍລະອຽດ</th>
              <th class="py-3 px-4">ສ້າງໃນວັນທີ</th>
              <th class="py-3 px-4">ອັບເດດ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in currentCategories" :key="category.id" @click="selectCategory(category)"
              :class="['border-b hover:bg-gray-50 cursor-pointer', selectedCategory?.id === category.id ? 'bg-yellow-100' : '']">
              <td class="py-2 px-4">{{ category.id }}</td>
              <td class="py-2 px-4">{{ category.name }}</td>
              <td class="py-2 px-4">{{ category.description }}</td>
              <td class="py-2 px-4">{{ category.created_at }}</td>
              <td class="py-2 px-4">{{ category.updated_at }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modals -->
  <AddBookModal :show="isModalOpen" @close="isModalOpen = false" @save="saveCategory" />
  <EditBookModal :show="isEditModalOpen" :userData="selectedCategory" @close="isEditModalOpen = false"
    @update="handleCategoryUpdate" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AddBookModal from '../components/modal_category/AddBookModal.vue'
import EditBookModal from '../components/modal_book/EditBookModal.vue'

interface Category {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

const isModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedCategory = ref<Category | null>(null)
const viewMode = ref<'normal' | 'soft'>('normal')

const categories = ref<Category[]>([
  { id: 1, name: 'ນິທານ', description: 'ໝວກປື້ມກ່ຽວກັບນິທານ', created_at: '2024-01-01', updated_at: '2024-02-01' },
  { id: 2, name: 'ວິທະຍາສາດ', description: 'ໝວກປື້ມວິທະຍາສາດ', created_at: '2024-01-15', updated_at: '2024-02-05' },
  { id: 3, name: 'ປະຫວັດສາດ', description: 'ໝວກປື້ມປະຫວັດສາດ', created_at: '2024-01-20', updated_at: '2024-02-10' }
])

const softDeletedCategories = ref<Category[]>([
  { id: 4, name: 'ໂຄງການລຶບ', description: 'ໝວກຖືກລຶບ', created_at: '2023-01-01', updated_at: '2023-06-01' }
])

const currentCategories = computed(() => viewMode.value === 'normal' ? categories.value : softDeletedCategories.value)

function toggleSoftDelete() {
  // Just for view
}

function openAddModal() {
  isModalOpen.value = true
}

function openEditModal(category: Category | null) {
  if (category) {
    selectedCategory.value = category
    isEditModalOpen.value = true
  }
}

function saveCategory(newCategory: Category) {
  categories.value.push({ ...newCategory, id: Date.now(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
  isModalOpen.value = false
}

function handleCategoryUpdate(updated: Category) {
  const index = categories.value.findIndex(c => c.id === updated.id)
  if (index !== -1) {
    categories.value[index] = { ...updated, updated_at: new Date().toISOString() }
  }
  isEditModalOpen.value = false
}

function deleteCategory() {
  if (selectedCategory.value) {
    const index = categories.value.findIndex(c => c.id === selectedCategory.value!.id)
    if (index !== -1) {
      const deleted = categories.value.splice(index, 1)[0]
      softDeletedCategories.value.push(deleted)
    }
    selectedCategory.value = null
  }
}

function selectCategory(category: Category) {
  selectedCategory.value = category
}
</script>
