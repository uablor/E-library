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
             <td class="py-2 px-4 whitespace-nowrap flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button class="bg-green-600 text-white px-3 py-1 rounded" @click="editUser(user)">Edit</button>
                <button class="bg-red-500 text-white px-3 py-1 rounded" @click="deleteUser(user)">Delete</button>
              </td>
              
          </div>
         

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center">
            <select
              class="bg-green-600 text-white px-2 py-1 h-9 focus:outline-none cursor-pointer rounded-l sm:rounded-l"
            >
              <option value="all">{{ $t('navbar.all') }}</option>
            </select>
            <input
              type="text"
              :placeholder="$t('navbar.search') + '..........'"
              class="focus:outline-none text-black shadow-md h-9 py-1 pl-3 rounded-r sm:rounded-r"
            />
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
              <th class="py-3 px-4 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.code_student"
              class="border-b hover:bg-gray-50"
            >
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


<script setup>
import { ref } from 'vue'

const users = ref([
 {
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

function editUser(user) {
  alert(`Edit user: ${user.username}`)
  // you can open a modal here to edit
}

function deleteUser(user) {
  const confirmed = confirm(`ຕ້ອງການລຶບຜູ້ໃຊ້ ${user.username} ແທ້ບໍ?`)
  if (confirmed) {
    users.value = users.value.filter(u => u.code_student !== user.code_student)
  }
}
</script>
