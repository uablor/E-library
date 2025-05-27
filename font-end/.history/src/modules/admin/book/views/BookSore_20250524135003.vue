<template>
  <div class="p-5 bg-pink-50 mb-5">
    <div class="p-6 bg-white shadow-md rounded-lg">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-500">
          <i class="fa-solid fa-star"></i> ຄະແນນປື້ມຂອງຜູ້ໃຊ້
        </h1>

        <div class="flex flex-col sm:flex-row items-center ">
             <div class="bg-green-600 shadow-md text-white px-2 py-1 h-9 focus:outline-none cursor-pointer rounded-l sm:rounded-l">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>
          <input
            type="text"
            v-model="searchQuery"
            class="focus:outline-none text-black shadow-md h-9 py-1 pl-3 pr- rounded-r sm:rounded-r"
            placeholder="ຄົ້ນຫາຕາມຊື່ປື້ມ / ຜູ້ໃຊ້"
          />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded-lg text-sm md:text-base">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-3 px-4">#</th>
              <th class="py-3 px-4">ຜູ້ໃຊ້</th>
              <th class="py-3 px-4">ຊື່ປື້ມ</th>
              <th class="py-3 px-4">ຄະແນນ</th>
              <th class="py-3 px-4">ຄຳອະທິບາຍ</th>
              <th class="py-3 px-4">ວັນທີສ້າງ</th>
              <th class="py-3 px-4">ອັບເດດລ່າສຸດ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(score, index) in filteredBookScores"
              :key="index"
              class="border-b text-center hover:bg-green-50"
            >
              <td class="py-2 px-4">{{ index + 1 }}</td>
              <td class="py-2 px-4">{{ score.User?.fullname || '-' }}</td>
              <td class="py-2 px-4">{{ score.Books?.title || '-' }}</td>
              <td class="py-2 px-4">{{ score.scop_star }}</td>
              <td class="py-2 px-4">{{ score.comment }}</td>
              <td class="py-2 px-4">{{ score.created_at }}</td>
              <td class="py-2 px-4">{{ score.updated_at }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface User {
  fullname: string
}

interface Book {
  title: string
}

interface BookScore {
  User: User
  Books: Book
  comment: string
  scop_star: string
  created_at: string
  updated_at: string
}

const searchQuery = ref('')

const bookScores = ref<BookScore[]>([
  {
    User: { fullname: 'ທ້າວ ອັນນັນ' },
    Books: { title: 'ປື້ມປະຫວັດສາດ' },
    comment: 'ດີຫຼາຍໆ',
    scop_star: '5',
    created_at: '2024-05-20',
    updated_at: '2024-05-21'
  },
  {
    User: { fullname: 'ນາງ ສຸພາ' },
    Books: { title: 'ນິທານແມວນ້ອຍ' },
    comment: 'ອ່ານງ່າຍ ແລະເຂົ້າໃຈ',
    scop_star: '4',
    created_at: '2024-05-19',
    updated_at: '2024-05-20'
  }
])

const filteredBookScores = computed(() => {
  return bookScores.value.filter(score => {
    const user = score.User?.fullname?.toLowerCase() || ''
    const book = score.Books?.title?.toLowerCase() || ''
    const query = searchQuery.value.toLowerCase()
    return user.includes(query) || book.includes(query)
  })
})
</script>
