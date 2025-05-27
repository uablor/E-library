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
          <button
            class="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 w-full sm:w-auto"
            @click="addUser"
          >
            ເພີ່ມປື້ມ
          </button>

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
             <th class="py-3 px-4">image</th>
              <th class="py-3 px-4">title</th>
              <th class="py-3 px-4">author</th>
              <th class="py-3 px-4">isbn</th>
              <th class="py-3 px-4">publisher</th>
              <th class="py-3 px-4">publish_date</th>
              <th class="py-3 px-4">category</th>
              <th class="py-3 px-4">type</th>
              <th class="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="border-b hover:bg-gray-50"
            >
           <td class="py-2 px-4 whitespace-nowrap">
                <img :src="user.image" alt="avatar" class="w-10 h-10  object-cover" />
              </td>
              <!-- <td class="py-2 px-4 whitespace-nowrap">{{ user.image }}</td> -->
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

<script setup>
import { ref } from 'vue'

const users = ref([
  {  id: 1,
    image: "../",
    title: "ຄວາມຮັກໃນລະດູໃບໄມ້ປຽກ",
    author: "ສຸກສັນ ສີທອງ",
    isbn: "978-1-23456-789-0",
    publisher: "ສຳນັກພິມດວງດີ",
    publish_date: "2010-05-20",
    category: "ນິຍາຍຮັກ",
    type: "ນິລະນາຍ"
  },
  { id: 2,
    image: "https://cdn.pixabay.com/photo/2015/09/05/20/02/reading-925589_1280.jpg",
    title: "ປະຫວັດສາດລາວສະໄໝກ່ອນ",
    author: "ຈັນທະວົງ ພົມມະວົງ",
    isbn: "978-1-23456-789-1",
    publisher: "ສຳນັກພິມປັນຍາ",
    publish_date: "2005-08-15",
    category: "ປື້ມປະຫວັດສາດ",
    type: "ວິຊາການ"
  },
  {  id: 3,
    image: "https://cdn.pixabay.com/photo/2016/03/27/21/16/book-1283865_1280.jpg",
    title: "ສິນທະປະແລະວັດທະນະທຳລາວ",
    author: "ນິທິສານ ສີສະຫວາດ",
    isbn: "978-1-23456-789-2",
    publisher: "ສຳນັກພິມສິນທະປະ",
    publish_date: "2012-11-10",
    category: "ສິນທະປະ",
    type: "ວິຊາການ"
  },
  { id: 4,
    image: "https://cdn.pixabay.com/photo/2014/08/27/15/03/book-429646_1280.jpg",
    title: "ສິນທະປະກັບຄວາມຄິດສ້າງສັນ",
    author: "ສຸກວັນ ວົງສະໄຫມ",
    isbn: "978-1-23456-789-3",
    publisher: "ສຳນັກພິມສີທອງ",
    publish_date: "2018-03-12",
    category: "ສິນທະປະ",
    type: "ເລື່ອງສັ້ນ"
  },
  { id: 5,
    image: "https://cdn.pixabay.com/photo/2016/11/21/16/43/book-1845614_1280.jpg",
    title: "ການຈັດການເວລາຢ່າງມີປະສິດທິພາບ",
    author: "ນາງ ບຸນສະຫວັນ",
    isbn: "978-1-23456-789-4",
    publisher: "ເມືອງໃຫມ່ພິມ",
    publish_date: "2021-09-01",
    category: "ການພັດທະນາຕົນເອງ",
    type: "ຄູ່ມື"
  },
  { id: 6,
    image: "https://cdn.pixabay.com/photo/2015/01/08/18/25/book-593782_1280.jpg",
    title: "ສູ່ຄວາມສຳເລັດ",
    author: "ທ້າວ ວິໄລ",
    isbn: "978-1-23456-789-5",
    publisher: "ໂຄງການປັນຍາ",
    publish_date: "2015-06-18",
    category: "ແຮງບັນດານໃຈ",
    type: "ນິລະນາຍ"
  },
  { id: 7,
    image: "https://cdn.pixabay.com/photo/2017/01/31/18/45/book-2022464_1280.jpg",
    title: "ພາລະກິດໃນຝັນ",
    author: "ສຸລິນ ຈັນທະວົງ",
    isbn: "978-1-23456-789-6",
    publisher: "ບໍລິສັດເປັນດີ",
    publish_date: "2019-12-05",
    category: "ນິຍາຍ",
    type: "ດຣາມາ"
  }

])

function editUser(user) {
  alert(`Edit user: ${user.title}`)
  // you can open a modal here to edit
}

function deleteUser(user) {
  const confirmed = confirm(`ຕ້ອງການລຶບຜູ້ໃຊ້ ${user.title} ແທ້ບໍ?`)
  if (confirmed) {
    users.value = users.value.filter(u => u.image !== user.image)
  }
}
</script>
