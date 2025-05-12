<script setup lang="ts">
 import AppTopbar from '../layouts/AppTopbar.vue'
 import AppNavbar from '../layouts/AppNavbar.vue'
 import AppFooter from '../layouts/AppFooter.vue'
 import AppSidebar from './AppSidebar.vue'
  import { Suspense } from 'vue'
  // import AppSidebar from './AppSidebar
//   import LoadingComponent from '../customComponents/LoadingComponent.vue'
  import { ref } from 'vue';
  const toggle = ref<boolean>(true)
</script>

<template>
  <div>
    <AppTopbar/>
    <div>
        <AppNavbar/>
    </div>
     <div>

     </div>
      <main class="layout-main-container surface-ground container mx-auto">
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
  
    <!-- <div class="layout-mask" @click="() => (toggle = !toggle)"></div> -->
  </div>
</template>

<style scoped lang="css"></style>