<template>
  <div class="p-5 bg-pink-50">

    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">👥 ຈັດການຜູ້ໃຊ້</h1>
  
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded-lg">
          <thead class="bg-gray-100 text-left">
            <tr>
              <th class="py-3 px-4">Code_Student</th>
              <th class="py-3 px-4">Username</th>
              <th class="py-3 px-4">Email</th>
              <th class="py-3 px-4">Firstname</th>
              <th class="py-3 px-4">Birthday</th>
              <th class="py-3 px-4">Address</th>
              <th class="py-3 px-4">Department</th>
              <th class="py-3 px-4">Phone</th>
              <th class="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.code_student" class="border-b hover:bg-gray-50">
              <td class="py-2 px-4">{{ user.code_student }}</td>
              <td class="py-2 px-4">{{ user.username }}</td>
              <td class="py-2 px-4">{{ user.email }}</td>
              <td class="py-2 px-4">{{ user.firstname }}</td>
              <td class="py-2 px-4">{{ user.birthday }}</td>
              <td class="py-2 px-4">{{ user.address }}</td>
              <td class="py-2 px-4">{{ user.department }}</td>
              <td class="py-2 px-4">{{ user.phone }}</td>
              <td class="py-2 px-4 flex space-x-2">
                <button class="bg-blue-500 text-white px-3 py-1 rounded" @click="editUser(user)">Edit</button>
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
    code_student: 'STU001',
    username: 'somboun123',
    email: 'somboun@gmail.com',
    firstname: 'ສົມບູນ',
    birthday: '2000-01-15',
    address: 'ເມືອງໄຊເສດຖາ, ແຂວງວຽງຈັນ',
    department: 'ວິທະຍາສາດຄອມພິວເຕີ',
    phone: '020 12345678',
  },
  {
    code_student: 'STU002',
    username: 'mani_lao',
    email: 'mani@email.com',
    firstname: 'ມານີ',
    birthday: '1999-12-10',
    address: 'ເມືອງສີສັດຕະນາກ, ແຂວງວຽງຈັນ',
    department: 'ບັນຊີ',
    phone: '020 98765432',
  },
   {
    code_student: 'STU001',
    username: 'somboun123',
    email: 'somboun@gmail.com',
    firstname: 'ສົມບູນ',
    birthday: '2000-01-15',
    address: 'ເມືອງໄຊເສດຖາ, ແຂວງວຽງຈັນ',
    department: 'ວິທະຍາສາດຄອມພິວເຕີ',
    phone: '020 12345678',
  },
  {
    code_student: 'STU002',
    username: 'mani_lao',
    email: 'mani@email.com',
    firstname: 'ມານີ',
    birthday: '1999-12-10',
    address: 'ເມືອງສີສັດຕະນາກ, ແຂວງວຽງຈັນ',
    department: 'ບັນຊີ',
    phone: '020 98765432',
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
