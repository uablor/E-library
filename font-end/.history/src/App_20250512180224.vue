<script setup lang="ts">
import { ref } from "vue";
 
import AppLayout from "./components/layouts/AppLayout.vue";
import DefaultLayout from "./views/DefaultLayout.vue";
import { useRoute } from 'vue-router';
import router from "./router";

// const route = useRoute();
// const token = ref(localStorage.getItem("token") ?? false);

</script>

<template>
  <!-- <AppLayout/> -->
   <router-view v-slot="{ Component }">
    </template>
</template>

<style scoped>

</style>
