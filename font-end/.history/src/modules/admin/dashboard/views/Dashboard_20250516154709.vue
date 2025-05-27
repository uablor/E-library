<template>
  <div class="bg-pink-50 p-4">

    <div class="p-6 bg-white shadow rounded-lg">
      <h1 class="text-3xl font-bold mb-6">📊 Dashboard ຂອງ Admin</h1>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 cursor-pointer">
        <div
          v-for="item in reports"
          :key="item.title"
          class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition "
        >
          <div class="text-4xl mb-4">{{ item.icon }}</div>
          <h2 class="text-lg font-semibold mb-1">{{ item.title }}</h2>
          <p class="text-gray-600">{{ item.count }} ລາຍການ</p>
          
        </div>
        
      </div>
     
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const reports = ref([
  { title: 'ລາຍງານຜູ້ໃຊ້', icon: '👤', count: 120 },
  { title: 'ລາຍງານນັກສຶກສາ', icon: '🎓', count: 85 },
  { title: 'ລາຍງານປື້ມເອກະສານ', icon: '📚', count: 350 },
  { title: 'ຄະແນນ & ຄວາມຄິດເຫັນ', icon: '🌟', count: 67 },
  { title: 'ລາຍງານສິດ', icon: '🛡️', count: 4 },
])
</script>
