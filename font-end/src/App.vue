<script setup lang="ts">
import { ref } from "vue";
 
import AppLayout from "./components/layouts/AppLayout.vue";
import DefaultLayout from "./views/DefaultLayout.vue";
import { useRoute } from 'vue-router';

// const route = useRoute();
// const token = ref(localStorage.getItem("token") ?? false);

</script>

<template>
  <AppLayout/>
</template>

<style scoped>

</style>
