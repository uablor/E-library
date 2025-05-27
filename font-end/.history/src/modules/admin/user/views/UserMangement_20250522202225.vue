<template>
  <div class="p-5 bg-pink-50 mb-5">
    <div class="p-6 bg-white shadow-md rounded-lg">
      <!-- Title and controls -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-500">
          <i class="fa-solid fa-users"></i> ຈັດການຜູ້ໃຊ້
        </h1>

        <!-- Buttons and search -->
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div>
            <div class="py-2 px-4 whitespace-nowrap flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
             <button @click="openModal" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">ເພີ່ມສິດ</button>
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
                @click="openAddUser">ເພີ່ມຜູ້ໃຊ້</button>
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
              <th class="py-3 px-4 whitespace-nowrap">Avatar</th>
              <th class="py-3 px-4 whitespace-nowrap">Code_Student</th>
              <th class="py-3 px-4 whitespace-nowrap">Username</th>
              <th class="py-3 px-4 whitespace-nowrap">Email</th>
              <th class="py-3 px-4 whitespace-nowrap">Fullname</th>
              <th class="py-3 px-4 whitespace-nowrap">Birthday</th>
              <th class="py-3 px-4 whitespace-nowrap">Address</th>
              <th class="py-3 px-4 whitespace-nowrap">Department</th>
              <th class="py-3 px-4 whitespace-nowrap">Phone</th>
              <th class="py-3 px-4 whitespace-nowrap">is_staff</th>
              <th class="py-3 px-4 whitespace-nowrap">is_active</th>
              <th class="py-3 px-4 whitespace-nowrap">is_superuser</th>
              <th class="py-3 px-4 whitespace-nowrap">is_verify</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" @click="selectUser(user)" :class="[
              'border-b hover:bg-gray-50 cursor-pointer',
              selectedUser?.id === user.id ? 'bg-yellow-100' : ''
            ]" class="border-b hover:bg-gray-50">
              <td class="py-2 px-4 whitespace-nowrap">
                <img :src="user.avatar" alt="avatar" class="w-10 h-10 rounded-full object-cover" />
              </td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.code_student }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.username }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.email }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.firstname }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.birthday }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.address }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.department }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.phone }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.is_staff }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.is_active }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.is_superuser }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.is_verify }}</td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal addUser -->
  <AddUserModal :show="isModalOpen" :user="selectedUser" @close="isModalOpen = false" @save="saveUser" />

  <!-- Edit Modal -->
  <EditUserModal :show="isEditModalOpen" :userData="selectedUser" @close="isEditModalOpen = false"
    @update="handleUserUpdate" />

   <!-- Modal Group -->
    <GroupFormModal
      :visible="showModal"
      :group="selectedGroup"
      :permissions="allPermissions"
      :isEdit="isEditMode"
      @close="showModal = false"
      @submit="handleFormSubmit"
    />
</template>


<script setup leng="ts">
import { ref,reactive,onMounted } from 'vue'
import AddUserModal from './modal_clients/AddUserModal.vue'
import EditUserModal from './modal_clients/EditUserModal.vue'
import GroupFormModal from "../components/Group_permission/Group_permission.vue"
import {Permission} from "../entities/user.entity.ts"

// const users = ref([])

const isModalOpen = ref(false)
// const editModalVisible = ref(false)
const selectedUser = ref(null)

const users = ref([
  {
    id: 1,
    avatar: 'https://i.pravatar.cc/150?img=1',
    code_student: 'STU001',
    username: 'somboun123',
    email: 'somboun@gmail.com',
    firstname: 'ສົມບູນ',
    birthday: '2000-01-15',
    address: 'ເມືອງໄຊເສດຖາ, ແຂວງວຽງຈັນ',
    department: 'ວິທະຍາສາດຄອມພິວເຕີ',
    phone: '020 12345678',
    is_staff: true,
    is_active: true,
    is_superuser: false,
    is_verify: true,
  },
  {
    id: 2,
    avatar: 'https://i.pravatar.cc/150?img=2',
    code_student: 'STU002',
    username: 'mani_lao',
    email: 'mani@email.com',
    firstname: 'ມານີ',
    birthday: '1999-12-10',
    address: 'ເມືອງສີສັດຕະນາກ, ແຂວງວຽງຈັນ',
    department: 'ບັນຊີ',
    phone: '020 98765432',
    is_staff: false,
    is_active: true,
    is_superuser: false,
    is_verify: true,
  },
  {
    id: 3,
    avatar: 'https://i.pravatar.cc/150?img=3',
    code_student: 'STU003',
    username: 'nith_lao',
    email: 'nith@example.com',
    firstname: 'ນິດ',
    birthday: '2001-05-21',
    address: 'ເມືອງຈັນທະບູລີ, ແຂວງວຽງຈັນ',
    department: 'ພາສາອັງກິດ',
    phone: '020 56789012',
    is_staff: false,
    is_active: true,
    is_superuser: false,
    is_verify: false,
  },
  {
    id: 4,
    avatar: 'https://i.pravatar.cc/150?img=4',
    code_student: 'STU004',
    username: 'khamphou',
    email: 'khamphou@example.com',
    firstname: 'ຄໍາພູ',
    birthday: '1998-08-08',
    address: 'ເມືອງໄຊທານີ, ແຂວງວຽງຈັນ',
    department: 'ນິເທດ',
    phone: '020 22334455',
    is_staff: true,
    is_active: false,
    is_superuser: false,
    is_verify: false,
  },
  {
    id: 5,
    avatar: 'https://i.pravatar.cc/150?img=5',
    code_student: 'STU005',
    username: 'vilay_dev',
    email: 'vilay.dev@gmail.com',
    firstname: 'ວິໄລ',
    birthday: '1997-03-03',
    address: 'ເມືອງປາກງື່ມ, ແຂວງວຽງຈັນ',
    department: 'ໄຟຟ້າ',
    phone: '020 33445566',
    is_staff: false,
    is_active: true,
    is_superuser: false,
    is_verify: true,
  },
  {
    id: 6,
    avatar: 'https://i.pravatar.cc/150?img=6',
    code_student: 'STU006',
    username: 'keo_sisavat',
    email: 'keo@gmail.com',
    firstname: 'ແກ້ວ',
    birthday: '2002-11-11',
    address: 'ເມືອງຫາດຊາຍຟອງ, ແຂວງຈໍາປາສັກ',
    department: 'ສຶກສາພື້ນຖານ',
    phone: '020 11223344',
    is_staff: true,
    is_active: true,
    is_superuser: true,
    is_verify: true,
  },
])






// Open Add Modal
function openAddUser() {
  selectedUser.value = {
    avatar: '',
    code_student: '',
    username: '',
    email: '',
    firstname: '',
    birthday: '',
    address: '',
    department: '',
    phone: '',
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
  const index = users.value.findIndex(u => u.code_student === userData.code_student)
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


//Group and permission

const showModal = ref(false)
const isEditMode = ref(false)

const selectedGroup = reactive<GroupData>({
  name: '',
  permissions: []
})

const allPermissions = reactive<Permission[any]>([])

const fetchPermissions = async () => {
  // Replace with actual API call
  allPermissions.value = [
    { id: 1, name: 'Can add user' },
    { id: 2, name: 'Can change user' },
    { id: 3, name: 'Can delete user' },
    { id: 4, name: 'Can view user' }
  ]
}

const openModal = () => {
  selectedGroup.value = { name: '', permissions: [] }
  isEditMode.value = false
  showModal.value = true
}

const handleFormSubmit = (groupData: GroupData) => {
  console.log('Group submitted:', groupData)
  // API call here
  showModal.value = false
}

onMounted(() => {
  fetchPermissions()
})
</script>
