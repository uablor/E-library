<template>
  <div class="dashboard-container">
    <h1 class="title">📊 Dashboard ຂອງ Admin</h1>
    <div class="cards">
      <div v-for="item in reports" :key="item.title" class="card">
        <div class="icon">{{ item.icon }}</div>
        <div class="info">
          <h2>{{ item.title }}</h2>
          <p>{{ item.count }} ລາຍການ</p>
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

<style scoped>
.dashboard-container {
  padding: 2rem;
  font-family: sans-serif;
}

.title {
  font-size: 28px;
  margin-bottom: 1.5rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card {
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 10px;
  width: 220px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 40px;
  margin-right: 1rem;
}

.info h2 {
  font-size: 18px;
  margin: 0;
}

.info p {
  font-size: 14px;
  color: #555;
}
</style>
