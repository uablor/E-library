<template>
  <div class="p-5 bg-pink-50 mb-5">
    <div class="p-6 bg-white shadow-md rounded-lg">
      <!-- Title and controls -->
      <div class="flex  sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-500">
          <i class="fa-solid fa-book"></i> ຈັດການໄຟປື້ມເອກະສານ
        </h1>

        <div >

          
         <div class="flex sm:flex-row gap-2 sm:gap-4">
              
   <select v-model="viewMode" @change="toggleSoftDelete" class="block w-full rounded border border-gray-300 px-3 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
             <option value="" disabled>-- ເລືອກ --</option>
             <option value="normal">ໄຟ໌ປື້ມເອກະສານ</option>
             <option value="soft">ລາຍການທີ່ຖືກລຶບ</option>
           </select>
           <div class="py-2 px-4 whitespace-nowrap flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button v-if="viewMode === 'soft'"  class="bg-green-600 text-white px-4 py-1 rounded w-20 hover:bg-green-700"     >
               ກູ້ຄືນ
             </button>

             <button v-if="viewMode === 'normal'"  class="bg-yellow-500 text-white px-4 py-1 w-20 rounded hover:bg-yellow-700"
               @click="openEditModal(selectedBookFile)" :disabled="!selectedBookFile"
               :class="{ 'opacity-50 cursor-not-allowed': !selectedBookFile }">
               ແກ້ໄຂ
             </button>
             <button  v-if="viewMode === 'normal'" class="bg-red-500 text-white px-4 py-1 w-20 rounded hover:bg-red-700"
               @click="deleteBookFile" :disabled="!selectedBookFile"
               :class="{ 'opacity-50 cursor-not-allowed': !selectedBookFile }">
               ລຶບ
             </button>
             <button  v-if="viewMode === 'normal'" class="bg-green-600 text-white px-4 py-1 rounded w-30 hover:bg-green-700" @click="openAddModal">
               ເພີ່ມໄຟ໌ປື້ມ
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
    <th class="py-3 px-4">File URL</th>
    <th class="py-3 px-4">Book name</th>
    <th class="py-3 px-4">Type</th>
    <th class="py-3 px-4">Upload Time</th>
    <th class="py-3 px-4">Created At</th>
    <th class="py-3 px-4">Updated At</th>
  </tr>
</thead>
<tbody>
  <tr
    v-for="file in currentBookFiles"
    :key="file.id"
    @click="selectBookFile(file)"
    :class="['border-b cursor-pointer text-center', selectedBookFile?.id === file.id ? 'bg-green-600' : '']"
  >
    <td class="py-2 px-4">{{ file.id }}</td>
    <td class="py-2 px-4">{{ file.file_url }}</td>
    <td class="py-2 px-4">{{ file.book_id_name }}</td>
    <td class="py-2 px-4">{{ file.file_type }}</td>
    <td class="py-2 px-4">{{ file.upload_timestamp }}</td>
    <td class="py-2 px-4">{{ file.created_at }}</td>
    <td class="py-2 px-4">{{ file.updated_at }}</td>
  </tr>
</tbody>

        </table>
      </div>
    </div>
  </div>

  <!-- Modals -->
  <AddBookFileModal :show="isModalOpen" :books="bookList" :booktypes="bookTypeList" @close="isModalOpen = false" @save="saveBookFile" />
  <EditBookFileModal :show="isEditModalOpen" :userData="selectedBookFile" @close="isEditModalOpen = false"
    @update="handleBookFileUpdate" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AddBookFileModal from '../components/modal_file/AddBookFileModal.vue'
import EditBookFileModal from '../components/modal_file/EditBookFileModal.vue'
import { BookFile } from '../entities/bookFile.entity'
import { BookType } from '../entities/bookType.entity'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const searchQuery = ref('')
const isModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedBookFile = ref<BookFile | null>(null)
const viewMode = ref<'normal' | 'soft'>('normal')

const bookList = ref([
  { id: 1, title: 'Book One' },
  { id: 2, title: 'Book Two' },
  { id: 3, title: 'Book Three' },
])

const bookTypeList = ref([
  { id: 1, name: 'ປະຫວັດສາດປະຈຸບັນນິທານ' },
  { id: 2, name: 'ເປັນເລກແນ່ນໍາ' },
  { id: 3, name: 'ເປັນເລກແນ່ນໍາ' },
])
const bookFiles = ref<BookFile[]>([
  {
    id: 1,
    file_url: 'book1.pdf',
    file_type: 'PDF',
    upload_timestamp: '2024-05-01 10:00',
    created_at: '2024-05-01 10:00',
    updated_at: '2024-05-01 10:00',
    deleted_at: null,
    book_id_name: 'ປະຫວັດສາດປະຈຸບັນນິທານ'
  }
])

const softDeletedBookFiles = ref<BookFile[]>([])

const currentBookFiles = computed(() =>
  viewMode.value === 'normal' ? filteredBookFiles.value : filteredBookFilesSoftDeleted.value
)

function toggleSoftDelete() {}

function openAddModal() {
  isModalOpen.value = true
}

function openEditModal(bookFile: BookFile | null) {
  if (bookFile) {
    selectedBookFile.value = bookFile
    isEditModalOpen.value = true
  }
}

function saveBookFile(newBookFile: BookFile) {
  bookFiles.value.push({ ...newBookFile, deleted_at: null })
//   bookFiles.value.push({ ...newBookFile, id: Date.now(), created_at: new Date(), updated_at: new Date(), deleted_at: null })
  isModalOpen.value = false
}
function handleBookFileUpdate(updated: BookType) {
  const index = bookFiles.value.findIndex(f => f.id === updated.id)
  if (index !== -1) {
   bookFiles.value[index] = { 
      ...updated, 
      file_url: '', // add default value or retrieve from somewhere
      file_type: '', // add default value or retrieve from somewhere
      upload_timestamp: '', // add default value or retrieve from somewhere
      deleted_at: null, // add default value or retrieve from somewhere
      book_id_name: '', // add default value or retrieve from somewhere
      updated_at: '',
      created_at: '' // you might want to update this as well
    }
    // bookFiles.value[index] = { ...updated, updated_at: new Date() }
  }
  isEditModalOpen.value = false
}
function deleteBookFile() {
  if (selectedBookFile.value) {
    const index = bookFiles.value.findIndex(f => f.id === selectedBookFile.value!.id)
    if (index !== -1) {
      const deleted = bookFiles.value.splice(index, 1)[0]
      deleted.deleted_at = new Date()
      softDeletedBookFiles.value.push(deleted)
    }
    selectedBookFile.value = null
  }
}

function selectBookFile(file: BookFile) {
  selectedBookFile.value = file
}

const filteredBookFiles = computed(() =>
  bookFiles.value.filter(file =>
    file.file_url?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const filteredBookFilesSoftDeleted = computed(() =>
  softDeletedBookFiles.value.filter(file =>
    file.file_url?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

</script>
