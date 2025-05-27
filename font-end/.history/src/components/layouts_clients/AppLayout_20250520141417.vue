<script setup lang="ts">
import AppTopbar from '../layouts_clients/AppTopbar.vue'
import AppNavbar from '../layouts_clients/AppNavbar.vue'
import AppFooter from '../layouts_clients/AppFooter.vue'
import AppSidebar from '../layouts_clients/AppSidebar.vue'
import { Suspense, ref } from 'vue'

const sidebarOpen = ref(false) // Shared state
</script>

<template>
  <div>
    <AppTopbar />
    <AppNavbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <AppSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <main class="layout-main-container surface-ground container mx-auto">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <component :is="Component"></component>
            <template #fallback>
              <loading-component />
            </template>
          </Suspense>
        </template>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>
