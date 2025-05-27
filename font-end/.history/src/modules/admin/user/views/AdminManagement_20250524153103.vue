<template>
  <div class="p-5 bg-pink-50 mb-5">
    <div class="p-6 bg-white shadow-md rounded-lg">
      <!-- Title and controls -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-500">
          <i class="fa-solid fa-users"></i> ຈັດການAdmin
        </h1>

        <!-- Buttons and search -->
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <select v-model="viewMode" @change="toggleSoftDelete"
            class=" block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="" disabled>-- ເລືອກ --</option>
            <option value="normal">Users</option>
            <option value="soft">Soft Delete</option>
          </select>
          <div>
            <div class="py-2 px-4 whitespace-nowrap flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button v-if="viewMode === 'soft'"
                class="bg-green-600 text-white px-4 py-1 rounded w-20 hover:bg-green-700">
                ກູ້ຄືນ
              </button>
              <button v-if="viewMode === 'normal'" @click="openModal"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">ເພີ່ມສິດ</button>
              <button v-if="viewMode === 'normal'"
                class="cursor-pointer bg-yellow-500 text-white px-8 py-1 rounded hover:bg-yellow-700 w-full sm:w-auto"
                @click="selectedUser && openEditModal()" :disabled="!selectedUser || inbtnEdit_Delete"
                :class="{ 'opacity-50 cursor-not-allowed': !selectedUser || inbtnEdit_Delete }">ເເກ້ໄຂ</button>
              <button
                class="cursor-pointer bg-red-500 text-white px-8 py-1 rounded hover:bg-red-700 w-full sm:w-auto w-50"
                @click="deleteUser" :disabled="!selectedUser || inbtnEdit_Delete"
                :class="{ 'opacity-50 cursor-not-allowed': !selectedUser || inbtnEdit_Delete }">ລືບ</button>
              <button v-if="viewMode === 'normal'"
                class="cursor-pointer bg-green-600 text-white px-8 py-1 rounded hover:bg-green-700 w-full sm:w-auto"
                @click="openAddUser">ເພີ່ມຜູ້ໃຊ້</button>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center ">
            <div
              class="bg-green-600 shadow-md text-white px-2 py-1 h-9 focus:outline-none cursor-pointer rounded-l sm:rounded-l">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <input type="text" placeholder="ຄົ້ນຫາຕາມຊື່ຜູ້ໃຊ້........." v-model="searchQuery"
              class="focus:outline-none text-black shadow-md h-9 py-1 pl-3 pr-3 rounded-r sm:rounded-r" />
          </div>
        </div>
      </div>

      <!-- Responsive Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded-lg text-sm md:text-base">
          <thead class="bg-gray-100 text-left">
            <tr class="text-center">
              <th class="py-3 px-4 whitespace-nowrap">Avatar</th>
              <th class="py-3 px-4 whitespace-nowrap">Username</th>
              <th class="py-3 px-4 whitespace-nowrap">Email</th>
              <th class="py-3 px-4 whitespace-nowrap ">is_staff</th>
              <th class="py-3 px-4 whitespace-nowrap ">is_active</th>
              <th class="py-3 px-4 whitespace-nowrap ">is_superuser</th>
              <th class="py-3 px-4 whitespace-nowrap ">is_verify</th>

            </tr>
          </thead>
          <tbody v-if="isSoftDeleteOpen">
            <tr v-for="user in filteredUsers" :key="user.id" @click="selectUser(user)"
              :class="['border-b  cursor-pointer text-center', selectedUser?.id === user.id ? 'bg-green-600 text-white' : '']">
              <td class="py-2 px-4 whitespace-nowrap">
                <img :src="user.avatar" alt="avatar" class="w-10 h-10 rounded-full object-cover" />
              </td>

              <td class="py-2 px-4 whitespace-nowrap">{{ user.username }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.email }}</td>

              <td class="py-2 px-4 whitespace-nowrap"><i :class="['fa-solid',user.is_staff ? 'fa-check' : 'fa-circle-exclamation',selectedUser && selectedUser.id === user.id ? 'text-white' : user.is_staff ? 'text-green-600' : 'text-yellow-600']"></i></td>

              <!-- Copy the same logic to other fields -->
              <td class="py-2 px-4 whitespace-nowrap"><i :class="['fa-solid',user.is_active ? 'fa-check' : 'fa-circle-exclamation',selectedUser && selectedUser.id === user.id ? 'text-white': user.is_active ? 'text-green-600' : 'text-yellow-600' ]"></i></td>
              <td class="py-2 px-4 whitespace-nowrap"><i :class="['fa-solid',user.is_superuser ? 'fa-check' : 'fa-circle-exclamation', selectedUser && selectedUser.id === user.id ? 'text-white' : user.is_superuser ? 'text-green-600'                      : 'text-yellow-600'
                ]"></i>
              </td>

              <!-- Copy the same logic to other fields -->
              <td class="py-2 px-4 whitespace-nowrap">
                <i :class="[
                  'fa-solid',
                  user.is_verify ? 'fa-check' : 'fa-circle-exclamation',
                  selectedUser && selectedUser.id === user.id
                    ? 'text-white'
                    : user.is_verify
                      ? 'text-green-600'
                      : 'text-yellow-600'
                ]"></i>
              </td>

            </tr>
          </tbody>

          <!-- soft delete -->
          <tbody v-else>
            <tr v-for="user in filteredUsersSoft_delete" :key="user.id" @click="selectUser(user)"
              :class="['border-b  cursor-pointer text-center', selectedUser?.id === user.id ? 'bg-green-600 text-white' : '']">
              <td class="py-2 px-4 whitespace-nowrap">
                <img :src="user.avatar" alt="avatar" class="w-10 h-10 rounded-full object-cover" />
              </td>

              <td class="py-2 px-4 whitespace-nowrap">{{ user.username }}</td>
              <td class="py-2 px-4 whitespace-nowrap">{{ user.email }}</td>
              <td class="py-2 px-4 whitespace-nowrap "><i
                  :class="['fa-solid', user.is_staff ? 'fa-check text-green-600' : 'fa-circle-exclamation text-yellow-600', selectedUser?.id === user.id ? 'text-white' : user.is_staff ? 'text-green-600' : 'text-yellow-600']"></i>
              </td>
              <td class="py-2 px-4 whitespace-nowrap "><i
                  :class="['fa-solid', user.is_active ? 'fa-check' : 'fa-circle-exclamation', selectedUser?.id === user.id ? 'text-white' : user.is_staff ? 'text-green-600' : 'text-yellow-600']"></i>
              </td>
              <td class="py-2 px-4 whitespace-nowrap "><i
                  :class="['fa-solid', user.is_superuser ? 'fa-check' : 'fa-circle-exclamation', selectedUser?.id === user.id ? 'text-white' : user.is_staff ? 'text-green-600' : 'text-yellow-600']"></i>
              </td>
              <td class="py-2 px-4 whitespace-nowrap "><i
                  :class="['fa-solid', user.is_verify ? 'fa-check' : 'fa-circle-exclamation', selectedUser?.id === user.id ? 'text-white' : user.is_staff ? 'text-green-600' : 'text-yellow-600']"></i>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal addUser -->
  <AddAdminModal :show="isModalOpen" :user="selectedUser ?? {}" @close="isModalOpen = false" @save="saveUser" />

  <!-- Edit Modal -->
  <EditAdminModal :show="isEditModalOpen" :userData="selectedUser !== null ? selectedUser : {}"
    :boolenstatus="inbtnEdit_Delete" @close="isEditModalOpen = false" @changeBoolenstatus="inbtnEdit_Delete = $event"
    @update="handleUserUpdate" />

  <!-- Modal Group -->
  <GroupFormModal :visible="showModal" :group="selectedGroup" :permissions="allPermissions" :isEdit="isEditMode"
    @close="showModal = false" @submit="handleFormSubmit" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import AddAdminModal from '../components/modal_admin/AddAdminModal.vue'
import EditAdminModal from '../components/modal_admin/EditAdminModal.vue'
import GroupFormModal from "../components/Group_permission/Group_permission.vue"
import { Permission, GroupData, User } from "../entities/user.entity"
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
declare var window: any;
const viewMode = ref('normal')
const isSoftDeleteOpen = ref(true) // <-- fixed: added `const` and initialized to `false`

function toggleSoftDelete() {
  isSoftDeleteOpen.value = (viewMode.value === 'normal')
}

const isModalOpen = ref<boolean>(false)
const isEditModalOpen = ref<boolean>(false)
const selectedUser = ref<User | null>(null)
const showModal = ref<boolean>(false)
const isEditMode = ref<boolean>(false)
const inbtnEdit_Delete = ref<boolean>(false)
const users = ref<User[]>([
  {
    id: 1,
    avatar: 'https://i.pravatar.cc/150?img=2',
    username: 'mani_lao',
    email: 'mani@email.com',
    is_staff: false,
    is_active: true,
    is_superuser: false,
    is_verify: true,
  },
  {
    id: 2,
    avatar: 'https://i.pravatar.cc/150?img=3',
    username: 'nith_lao',
    email: 'nith@example.com',
    is_staff: false,
    is_active: true,
    is_superuser: false,
    is_verify: false,
  },
  {
    id: 3,
    avatar: 'https://i.pravatar.cc/150?img=4',
    username: 'khamphou',
    email: 'khamphou@example.com',
    is_staff: true,
    is_active: false,
    is_superuser: false,
    is_verify: false,
  },
  {
    id: 4,
    avatar: 'https://i.pravatar.cc/150?img=5',
    username: 'vilay_dev',
    email: 'vilay.dev@gmail.com',
    is_staff: false,
    is_active: true,
    is_superuser: false,
    is_verify: true,
  },
  {
    id: 5,
    avatar: 'https://i.pravatar.cc/150?img=6',
    username: 'keo_sisavat',
    email: 'keo@gmail.com',
    is_staff: true,
    is_active: true,
    is_superuser: true,
    is_verify: true,
  },
])
const usersSoft_delete = ref<User[]>([
  {
    id: 1,
    avatar: 'https://i.pravatar.cc/150?img=1',
    username: 'somboun123',
    email: 'somboun@gmail.com',
    is_staff: true,
    is_active: true,
    is_superuser: false,
    is_verify: true,
  },
  {
    id: 2,
    avatar: 'https://i.pravatar.cc/150?img=2',
    username: 'mani_lao',
    email: 'mani@email.com',
    is_staff: false,
    is_active: true,
    is_superuser: false,
    is_verify: true,
  },
  {
    id: 3,
    avatar: 'https://i.pravatar.cc/150?img=3',
    username: 'nith_lao',
    email: 'nith@example.com',
    is_staff: false,
    is_active: true,
    is_superuser: false,
    is_verify: false,
  },
  {
    id: 4,
    avatar: 'https://i.pravatar.cc/150?img=4',
    username: 'khamphou',
    email: 'khamphou@example.com',
    is_staff: true,
    is_active: false,
    is_superuser: false,
    is_verify: false,
  },
  {
    id: 5,
    avatar: 'https://i.pravatar.cc/150?img=5',
    username: 'vilay_dev',
    email: 'vilay.dev@gmail.com',
    is_staff: false,
    is_active: true,
    is_superuser: false,
    is_verify: true,
  },
  {
    id: 6,
    avatar: 'https://i.pravatar.cc/150?img=6',
    username: 'keo_sisavat',
    email: 'keo@gmail.com',
    is_staff: true,
    is_active: true,
    is_superuser: true,
    is_verify: true,
  },
])

const openAddUser = () => {
  selectedUser.value = {
    id: 0,
    avatar: '',
    code_student: '',
    username: '',
    email: '',
    firstname: '',
    birthday: '',
    address: '',
    department: '',
    phone: '',
    is_staff: true,
    is_active: true,
    is_superuser: true,
    is_verify: true,
  }
  isModalOpen.value = true
  // inbtnEdit_Delete.value = true

}



const saveUser = (userData: User) => {
  const index = users.value.findIndex(u => u.code_student === userData.code_student)
  if (index !== -1) {
    users.value[index] = userData
  } else {
    users.value.push(userData)
  }
  isModalOpen.value = false
}

const selectUser = (user: User) => {
  selectedUser.value = user
  //  inbtnEdit_Delete.value = newValue.length === 1 ? false : true;
}


const openEditModal = () => {

  if (!selectedUser.value) {
    window.alert('Please select a user before editing.')
    return
  }
  // // selectedUser.value = user
  inbtnEdit_Delete.value = false
  isEditModalOpen.value = true

}

const handleUserUpdate = (userData: User) => {
  const index = users.value.findIndex(u => u.id === userData.id);
  if (index !== -1) {
    users.value[index] = userData;
  }
}

function deleteUser() {
  if (selectedUser.value) {
    users.value = users.value.filter(u => u.id !== selectedUser.value?.id);
    selectedUser.value = null;
  }
}

const selectedGroup = ref<GroupData>({
  name: '',
  permissions: []
})

const allPermissions = ref<Permission[]>([])

const fetchPermissions = async () => {
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
  showModal.value = false
}

//sreach user fillter it 
const searchQuery = ref('');
const filteredUsers = computed(() =>
  users.value.filter(user =>
    user?.username?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user?.email?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
//soft delete
const filteredUsersSoft_delete = computed(() =>
  usersSoft_delete.value.filter(user =>
    user?.username?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user?.email?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);


onMounted(() => {
  fetchPermissions()
})
</script>
