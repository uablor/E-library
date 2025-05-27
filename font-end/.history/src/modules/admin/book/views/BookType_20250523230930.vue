<template>
  <div class="p-5 bg-pink-50 mb-5">
    <div class="p-6 bg-white shadow-md rounded-lg">
      <!-- Title and controls -->
      <div class="flex  sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-500">
          <i class="fa-solid fa-book"></i> ຈັດການປະເພດປື້ມ
        </h1>

        <div >
         <div class="flex sm:flex-row gap-2 sm:gap-4">
           <select v-model="viewMode" @change="toggleSoftDelete" class="block w-full rounded border border-gray-300 px-3 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
             <option value="" disabled>-- ເລືອກ --</option>
             <option value="normal">ປະເພດປື້ມທົ່ວໄປ</option>
             <option value="soft">ລາຍການທີ່ຖືກລຶບ</option>
           </select>
           <div class="py-2 px-4 whitespace-nowrap flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button v-if="viewMode === 'soft'"  class="bg-green-600 text-white px-4 py-1 rounded w-20 hover:bg-green-700"     >
               ກູ້ຄືນ
             </button>

             <button v-if="viewMode === 'normal'"  class="bg-yellow-500 text-white px-4 py-1 w-20 rounded hover:bg-yellow-700"
               @click="openEditModal(selectedType)" :disabled="!selectedType"
               :class="{ 'opacity-50 cursor-not-allowed': !selectedType }">
               ແກ້ໄຂ
             </button>
             <button  v-if="viewMode === 'normal'" class="bg-red-500 text-white px-4 py-1 w-20 rounded hover:bg-red-700"
               @click="deleteType" :disabled="!selectedType"
               :class="{ 'opacity-50 cursor-not-allowed': !selectedType }">
               ລຶບ
             </button>
             <button  v-if="viewMode === 'normal'" class="bg-green-600 text-white px-4 py-1 rounded w-30 hover:bg-green-700" @click="openAddModal">
               ເພີ່ມປະເພດປື້ມ
             </button>
              <div class="flex flex-col sm:flex-row items-stretch sm:items-center ">
                        <select
                            class="bg-green-600 shadow-md text-white px-2 py-1 h-9 focus:outline-none cursor-pointer rounded-l sm:rounded-l">
                            <option value="all">{{ t('navbar.all') }}</option>
                        </select>
                        <input type="text" :placeholder="t('navbar.search') + '..........'"  v-model="searchQuery"
                            class="focus:outline-none text-black shadow-md h-9 py-1 pl-3 rounded-r sm:rounded-r" />
                    </div>
           </div>
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
              <th class="py-3 px-4">ໄດ້ສ້າງໃນວັນທີ</th>
              <th class="py-3 px-4">ໄດ້ອັບເດດວັນທີ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="type in currentTypes" :key="type.id" @click="selectType(type)"
              :class="['border-b hover:bg-gray-50 cursor-pointer', selectedType?.id === type.id ? 'bg-yellow-100' : '']">
              <td class="py-2 px-4">{{ type.id }}</td>
              <td class="py-2 px-4">{{ type.name }}</td>
              <td class="py-2 px-4">{{ type.description }}</td>
              <td class="py-2 px-4">{{ type.created_at }}</td>
              <td class="py-2 px-4">{{ type.updated_at }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modals -->
  <AddTypeModal :show="isModalOpen" @close="isModalOpen = false" @save="saveType" />
  <EditTypeModal :show="isEditModalOpen" :userData="selectedType" @close="isEditModalOpen = false"
    @update="handleTypeUpdate" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AddTypeModal from '../components/modal_type/AddTypeModal.vue'
import EditTypeModal from '../components/modal_type/EditTypeModal.vue'
import {  BookType } from '../entities/booktype.entity'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const searchQuery = ref('');
const isModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedType = ref<BookType | null>(null)
const viewMode = ref<'normal' | 'soft'>('normal')

const types = ref<BookType[]>([
  { id: 1, name: 'ນິທານ', description: 'ປະເພດປື້ມນິທານ', created_at: '2024-01-01', updated_at: '2024-02-01' },
  { id: 2, name: 'ວິທະຍາສາດ', description: 'ປະເພດປື້ມວິທະຍາສາດ', created_at: '2024-01-15', updated_at: '2024-02-05' },
  { id: 3, name: 'ປະຫວັດສາດ', description: 'ປະເພດປື້ມປະຫວັດສາດ', created_at: '2024-01-20', updated_at: '2024-02-10' }
])

const softDeletedTypes = ref<BookType[]>([
  { id: 4, name: 'ໂຄງການລຶບ', description: 'ປະເພດຖືກລຶບ', created_at: '2023-01-01', updated_at: '2023-06-01' }
])

const currentTypes = computed(() => viewMode.value === 'normal' ? filteredTypes.value : filteredTypesSoft_delete.value)

function toggleSoftDelete() {}

function openAddModal() {
  isModalOpen.value = true
}

function openEditModal(type: BookType | null) {
  if (type) {
    selectedType.value = type
    isEditModalOpen.value = true
  }
}

function saveType(newType: BookType) {
  types.value.push({ ...newType, id: Date.now(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
  isModalOpen.value = false
}

function handleTypeUpdate(updated: BookType) {
  const index = types.value.findIndex(c => c.id === updated.id)
  if (index !== -1) {
    types.value[index] = { ...updated, updated_at: new Date().toISOString() }
  }
 isEditModalOpen.value = false
}

function deleteType() {
  if (selectedType.value) {
    const index = types.value.findIndex(c => c.id === selectedType.value!.id)
    if (index !== -1) {
      const deleted = types.value.splice(index, 1)[0]
      softDeletedTypes.value.push(deleted)
    }
    selectedType.value = null
  }
}

function selectType(type: BookType) {
  selectedType.value = type
}

const filteredTypes = computed(() =>
  types.value.filter((type: BookType) =>
    type.name.toLowerCase().includes(searchQuery.value.toLowerCase()) 
  )
);
const filteredTypesSoft_delete = computed(() =>
  softDeletedTypes.value.filter((type: BookType) =>
    type.name.toLowerCase().includes(searchQuery.value.toLowerCase()) 
  )
);
</script>
