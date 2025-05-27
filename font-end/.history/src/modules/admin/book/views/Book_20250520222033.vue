<template>
  <div class="p-5 bg-pink-50 mb-5">
    <div class="p-6 bg-white shadow-md rounded-lg">
      <!-- Title and controls -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
         <h1 class="text-2xl sm:text-3xl font-bold text-gray-500">
          <i class="fa-solid fa-book"></i> ຈັດການປື້ມ
        </h1>

        <!-- Buttons and search -->
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div>
            <div class="py-2 px-4 whitespace-nowrap flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                 <button
                class="cursor-pointer bg-green-600 text-white px-5 py-1 rounded hover:bg-green-700 w-full sm:w-auto"
                >Soft delete</button>
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
              <th class="py-3 px-4">image</th>
              <th class="py-3 px-4">title</th>
              <th class="py-3 px-4">author</th>
              <th class="py-3 px-4">isbn</th>
              <th class="py-3 px-4">publisher</th>
              <th class="py-3 px-4">publish_date</th>
              <th class="py-3 px-4">category</th>
              <th class="py-3 px-4">type</th>

            </tr>
          </thead>
          <tbody>
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


<script setup leng="ts">
import { ref } from 'vue'
import AddBookModal from '../components/modal_book/AddBookModal.vue'
import EditBookModal from '../components/modal_book/EditBookModal.vue'

// const users = ref([])

const isModalOpen = ref(false)
// const editModalVisible = ref(false)
const selectedUser = ref(null)
const isSoftDeleteOpen = ref(false)

const books = ref([
  {  id: 1,
    image: new URL('@/assets/images/book1.jpg', import.meta.url).href,
    title: "ຄວາມຮັກໃນລະດູໃບໄມ້ປຽກ",
    author: "ສຸກສັນ ສີທອງ",
    isbn: "978-1-23456-789-0",
    publisher: "ສຳນັກພິມດວງດີ",
    publish_date: "2010-05-20",
    category: "ນິຍາຍຮັກ",
    type: "ນິລະນາຍ"
  },
  { id: 2,
    image: new URL('@/assets/images/book2.jpg', import.meta.url).href,
    title: "ປະຫວັດສາດລາວສະໄໝກ່ອນ",
    author: "ຈັນທະວົງ ພົມມະວົງ",
    isbn: "978-1-23456-789-1",
    publisher: "ສຳນັກພິມປັນຍາ",
    publish_date: "2005-08-15",
    category: "ປື້ມປະຫວັດສາດ",
    type: "ວິຊາການ"
  },
  {  id: 3,
    image: new URL('@/assets/images/book3.jpg', import.meta.url).href,
    title: "ສິນທະປະແລະວັດທະນະທຳລາວ",
    author: "ນິທິສານ ສີສະຫວາດ",
    isbn: "978-1-23456-789-2",
    publisher: "ສຳນັກພິມສິນທະປະ",
    publish_date: "2012-11-10",
    category: "ສິນທະປະ",
    type: "ວິຊາການ"
  },
  { id: 4,
    image: new URL('@/assets/images/book4.jpg', import.meta.url).href,
    title: "ສິນທະປະກັບຄວາມຄິດສ້າງສັນ",
    author: "ສຸກວັນ ວົງສະໄຫມ",
    isbn: "978-1-23456-789-3",
    publisher: "ສຳນັກພິມສີທອງ",
    publish_date: "2018-03-12",
    category: "ສິນທະປະ",
    type: "ເລື່ອງສັ້ນ"
  },
  { id: 5,
    image: new URL('@/assets/images/book5.jpg', import.meta.url).href,
    title: "ການຈັດການເວລາຢ່າງມີປະສິດທິພາບ",
    author: "ນາງ ບຸນສະຫວັນ",
    isbn: "978-1-23456-789-4",
    publisher: "ເມືອງໃຫມ່ພິມ",
    publish_date: "2021-09-01",
    category: "ການພັດທະນາຕົນເອງ",
    type: "ຄູ່ມື"
  },
  { id: 6,
    image: new URL('@/assets/images/book6.jpg', import.meta.url).href,
    title: "ສູ່ຄວາມສຳເລັດ",
    author: "ທ້າວ ວິໄລ",
    isbn: "978-1-23456-789-5",
    publisher: "ໂຄງການປັນຍາ",
    publish_date: "2015-06-18",
    category: "ແຮງບັນດານໃຈ",
    type: "ນິລະນາຍ"
  },
  { id: 7,
    image: new URL('@/assets/images/book7.jpg', import.meta.url).href,
    title: "ພາລະກິດໃນຝັນ",
    author: "ສຸລິນ ຈັນທະວົງ",
    isbn: "978-1-23456-789-6",
    publisher: "ບໍລິສັດເປັນດີ",
    publish_date: "2019-12-05",
    category: "ນິຍາຍ",
    type: "ດຣາມາ"
  }
])




// const openAddUser = () => {
//   isModalOpen.value = true
//   selectedUser.value = null
// }

// Open Add Modal
function openAddUser() {
  selectedUser.value = {
    image: '',
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    publish_date: '',
    category: '',
    type: '',
   
  }
  isModalOpen.value = true
}

// Open Edit Modal
function openEditUser(user) {
  selectedUser.value = { ...user }
  isModalOpen.value = true
}

// Save from modal
function saveUser(userData) {
  const index = users.value.findIndex(u => u.image === userData.image)
  if (index !== -1) {
    users.value[index] = userData
  } else {
    users.value.push(userData)
  }
  isModalOpen.value = false
}

// edit user

// const selectedUser = ref(null)
const isEditModalOpen = ref(false)

const selectUser = (user) => {
  selectedUser.value = user
}
function openEditModal() {
  if (!selectedUser.value) {
    alert('Please select a user before editing.')
    return
  }

  isEditModalOpen.value = true
}

//delete user
const deleteUser = () => {
  if (!selectedUser.value) return;
  const confirmed = confirm("Are you sure you want to delete this user?");
  if (confirmed) {
    users.value = users.value.filter((u) => u.id !== selectedUser.value.id);
    selectedUser.value = null;
  }
};

//Soft delete
const softDeleteUser = () => {
  if (!selectedUser.value) return;
  const confirmed = confirm("Are you sure you want to soft delete this user?");
  if (confirmed) {
    users.value = users.value.filter((u) => u.id !== selectedUser.value.id);
    selectedUser.value = null;
  }
};
</script>
