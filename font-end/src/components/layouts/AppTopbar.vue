<template>
    <header class="flex align-items-center justify-content-between pl-3 pr-4 h-4rem surface-ground" style="padding-left: 1.5rem;">
        <div class="flex align-items-center justify-content-center gap-2">
            <div
                class="cursor-pointer flex align-items-center justify-content-center border-circle hover:bg-gray-200 hover:text-gray-800 hover:border-2 border-gray-500"
                style="width: 40px; height: 40px"
                @click="emit('toggleSidebar')"
            >
                <i class="pi pi-bars font-bold" style="font-size: 1rem"></i>
            </div>
            <Breadcrumb
                :model="items"
                :pt="{
                  root: { class: 'surface-ground border-none' },
                  icon: { class: 'text-indigo-500' },
                  label: { class: 'font-bold text-400' }
                }"
            />
        </div>
        <div>
          <Dropdown 
            v-model="selectedLocale" 
            :options="locales" 
            optionLabel="name" 
            class="w-full" 
            optionValue="code"
            :highlightOnSelect="true" 
            @change="setLocale"
          />
        </div>
        <div>
            <a class="cursor-pointer" @click="visibleRight = true">
                <img
                :src="getUserProfile.data.props.profile"
                class="mr-3 bg-no-repeat border-circle lg:mr-0"
                style="width: 32px; height: 32px"
                />
            </a>
        </div>
    </header>
    <Sidebar v-model:visible="visibleRight" position="right" class="w-full sm:w-25rem">
    <h2>{{ getUserProfile.data.props.name }}</h2>
    <ul class="list-none mt-3 p-0">
      <li @click="gotToAdminOwnerProfile" v-if="getUserProfile.data.props.role.name === 'admin-owner'">
        <a
          class="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150"
        >
          <span> <i class="pi pi-user text-xl text-color"></i> </span>
          <div class="ml-3">
            <span class="mb-2 font-semibold">{{ $t('messages.profile') }}</span>
            <p class="text-color-secondary m-0">{{ $t('messages.my_profile') }}</p>
          </div>
        </a>
      </li>
      <li @click="gotToUserOwnerProfile" v-if="getUserProfile.data.props.role.name === 'user-owner'">
        <a
          class="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150"
        >
          <span> <i class="pi pi-user text-xl text-color"></i> </span>
          <div class="ml-3">
            <span class="mb-2 font-semibold">{{ $t('messages.profile') }}</span>
            <p class="text-color-secondary m-0">{{ $t('messages.my_profile') }}</p>
          </div>
        </a>
      </li>
      <li @click="gotToUserProfile" v-if="getUserProfile.data.props.role.name !== 'admin-owner' && getUserProfile.data.props.role.name !== 'user-owner' ">
        <a
          class="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150"
        >
          <span> <i class="pi pi-user"></i> </span>
          <div class="ml-3">
            <span class="mb-2 font-semibold">{{ $t('messages.profile') }}</span>
            <p class="text-color-secondary m-0">{{ $t('messages.my_profile') }}</p>
          </div>
        </a>
      </li>
      <li @click="changePassword(getUserProfile.data.props.id)">
        <a
          class="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150"
        >
          <span> <i class="pi pi-lock text-xl text-color"></i> </span>
          <div class="ml-3">
            <span class="mb-2 font-semibold">{{ $t('messages.change_password') }}</span>
          </div>
        </a>
      </li>
      <li @click="logout()">
        <a
          class="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150"
        >
          <span> <i class="pi pi-power-off text-xl" style="color: brown"></i> </span>
          <div class="ml-3">
            <span class="mb-2 font-semibold" style="color: brown">{{ $t('messages.sign_out') }}</span>
          </div>
        </a>
      </li>
    </ul>
  </Sidebar>

  <change-user-password
      ref="editForm" 
      :form="form"
      :user-id="userId"
      :change-user-password="changeUserPassword"
      :state="state"
  />
</template>

<script setup lang="ts">
  import Breadcrumb from 'primevue/breadcrumb'
  import Sidebar from 'primevue/sidebar'
  import { ref, onMounted } from "vue";
  import { RouteLocationNormalizedLoaded, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
  import { useAuthStore } from '../../modules/auth/stores/auth.store'
  import Dropdown from 'primevue/dropdown';
  import { useI18n } from 'vue-i18n';
  import { adminUserStore } from '@/modules/realEstate/admin/user/stores/user.store';
  import { customerStore } from '@/modules/realEstate/rentHouse/customer/stores/customer.store';
  import ChangeUserPassword from '@/modules/realEstate/rentHouse/customer/components/Change-User-Password.Component.vue';

  const { t } = useI18n();
  
  const { logout } = useAuthStore();
  const { getUserProfile, getProfile  } = adminUserStore();
  const { form, state, changeUserPassword } = customerStore();

  const breadcrumbItems = ref<Array<string>>([]);
  const visibleRight = ref(false);
  const emit = defineEmits<{ (e: 'toggleSidebar'): void }>();
  const items = ref();
  const route = useRoute();
  const router = useRouter()

  const selectedLocale = ref();
  const locales = ref([
      { name: 'English', code: 'en' },
      { name: 'ລາວ', code: 'la' },
      { name: 'ไทย', code: 'th' },
      { name: 'Tiếng Việt', code: 'vi' },
      { name: 'China', code: 'lk' },
  ]);

  const editForm = ref();
  const userId = ref();
  const changePassword = async (id: any) => {
    visibleRight.value = false;
      userId.value = id;
      editForm.value.visible = true;
  }

  const gotToUserProfile = () => {
    visibleRight.value = false;
    router.push({
      name: 'admin.user.profile'
    })
  }

  const gotToAdminOwnerProfile = () => {
    visibleRight.value = false;
    router.push({
      name: 'owner.user.profile'
    })
  }

  const gotToUserOwnerProfile = () => {
    visibleRight.value = false;
    router.push({
      name: 'owner.user.owner.profile'
    })
  }

  const setLocale = async () => {
    await localStorage.setItem('locale', selectedLocale.value);
    window.location.reload();
  }

  function getBreadcrumbItems(to: RouteLocationNormalizedLoaded) {
    breadcrumbItems.value = []

    to.matched.forEach((matched, idx) => {
      if (idx !== 0) {
        breadcrumbItems.value.push(matched.meta['label'] as string)
      }
    })

    items.value = breadcrumbItems.value.map((item) => {
      return { label: t(item) }
    })
  }

  onBeforeRouteUpdate((to) => {
    getBreadcrumbItems(to)
  })

  onMounted(async () => {
    const locale = localStorage.getItem('locale') || 'en';
    selectedLocale.value = locale;

    getBreadcrumbItems(route)
    await getProfile();
  })
</script>

<style scoped>
  .md\:w-14rem {
    width: 80px !important;
  }
  .p-dropdown {
    border: none !important;
    /* background: none !important; */
  }
</style>