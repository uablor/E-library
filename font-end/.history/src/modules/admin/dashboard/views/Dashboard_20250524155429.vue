<template>
  <div class="bg-pink-50 p-4">
    <div class="p-6 bg-white shadow rounded-lg">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold mb-6 text-gray-500">
          <i class="fa-solid fa-chart-simple"></i> Dashboard
        </h1>
        <select
          v-model="displayMode"
          class="text-center w-64 border border-gray-300 rounded p-2 outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="" disabled>-- ເລືອກ chart ຫຼື form ທົ່ວໄປ --</option>
          <option value="chart">chart</option>
          <option value="normal">form normal</option>
        </select>
      </div>

      <!-- FORM NORMAL -->
      <div
        v-if="displayMode === 'normal'"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 cursor-pointer"
      >
        <div v-for="(item, index) in formItems" :key="index" class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition gap-5 flex">
          <div>
            <div class="text-4xl mb-4" v-html="item.icon"></div>
            <h2 class="text-lg font-semibold mb-1">{{ item.title }}</h2>
            <p class="text-gray-600">{{ item.count }} ລາຍການ</p>
            <button class="cursor-pointer transition bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              ເບີ່ງລາຍລະອຽດເພີ່ມເຕີມ
            </button>
          </div>
        </div>
      </div>

      <!-- CHARTS -->
      <div
        v-else-if="displayMode === 'chart'"
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <div v-for="(chartId, index) in chartIds" :key="chartId" class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-lg font-bold mb-2">Chart {{ index + 1 }}</h2>
          <canvas :id="chartId"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Chart from 'chart.js/auto'

type FormItem = {
  icon: string
  title: string
  count: number
}

const displayMode = ref<string>('')

const formItems: FormItem[] = [
  {
    icon: '<i class="fa-solid fa-users"></i>',
    title: 'ລາຍງານຜູ້ໃຊ້',
    count: 120,
  },
  {
    icon: '🎓',
    title: 'ລາຍງານນັກສຶກສາ',
    count: 85,
  },
  {
    icon: '📚',
    title: 'ລາຍງານປື້ມເອກະສານ',
    count: 350,
  },
  {
    icon: '<i class="fa-solid fa-star text-yellow-500"></i>',
    title: 'ຄະແນນ & ຄວາມຄິດເຫັນ',
    count: 67,
  },
  {
    icon: '🛡️',
    title: 'ລາຍງານສິດ',
    count: 4,
  },
]

const chartIds: string[] = ['chart1', 'chart2', 'chart3', 'chart4', 'chart5']

const createCharts = () => {
  chartIds.forEach((id) => {
    const canvas = document.getElementById(id) as HTMLCanvasElement | null
    if (!canvas) return

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['A', 'B', 'C', 'D', 'E'],
        datasets: [
          {
            label: 'ຂໍ້ມູນ Chart',
            data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  })
}

watch(displayMode, (newVal) => {
  if (newVal === 'chart') {
    // Wait for DOM to update
    setTimeout(() => {
      createCharts()
    }, 300)
  }
})
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: 300px;
}
</style>
