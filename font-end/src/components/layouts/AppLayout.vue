<script setup lang="ts">
  import AppSidebar from './AppSidebar.vue'
  import AppFooter from './AppFooter.vue'
  import AppTopbar from './AppTopbar.vue'
  import LoadingComponent from '../customComponents/LoadingComponent.vue'
  import { ref } from 'vue';
  const toggle = ref<boolean>(true)
</script>

<template>
  <div :class="[toggle ? 'layout-mobile-active' : '', 'layout-container']">
    <AppSidebar :style="toggle ? 'width: 15rem;' : 'width: 0rem'" />
    <div
      class="layout-content"
      :style="toggle ? '' : 'margin-left: 0rem;transition: 0.2s ease-in-out;'"
      style="overflow: hidden;"
    >
      <AppTopbar @toggle-sidebar="() => (toggle = !toggle)"/>
      <main class="layout-main-container surface-ground">
        <router-view v-slot="{Component}">
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
    <div class="layout-mask" @click="() => (toggle = !toggle)"></div>
  </div>
</template>

<style scoped lang="css"></style>