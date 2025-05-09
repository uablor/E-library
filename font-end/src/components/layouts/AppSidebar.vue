<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { provinceStore } from '@/modules/realEstate/address/stores/province.store';
  import { realEstateServiceStore } from '@/modules/realEstate/rentHouse/memberServices/stores/real-estate-service.store';
  import { districtStore } from '@/modules/realEstate/address/stores/district.store';
  import { useI18n } from 'vue-i18n';
  import { countryStore } from '@/modules/realEstate/address/stores/country.store';
  import { GET_ROLES } from '@/common/utils/const';
  import { GET_PERMISSIONS } from '../../common/utils/const';
  import { reportRentBuyStore } from '../../modules/realEstate/admin/dashboard/stores/rent-store';
  import { onMounted, ref } from 'vue';

  const { t } = useI18n();
  const { getAllAppointmentPending, appointmentPending } = reportRentBuyStore();
  
  const { setStateFilter: setStateDistrictFilter } = districtStore();
  const { setStateFilter: setStateProvinceFilter } = provinceStore();
  const { setStateFilter } = countryStore();
  const { setStateFilter: setStateRealEstateServiceFilter } = realEstateServiceStore();

  const appointment = ref<Number>(0);

  onMounted(async() => {
    if (currentRoles.includes(GET_ROLES.ADMIN_OWNER) || currentRoles.includes(GET_ROLES.USER_OWNER)) {
      await getAllAppointmentPending();
      appointment.value = appointmentPending.data.props ? appointmentPending.data.props : 0;
    }
  })

  export interface menuItem {
    key: string
    label: string
    icon: string
    iconList?: string
    to?: string
    color?: string
    children?: [
      { key: string; label: string; icon: string; to?: string; color?: string }
    ]
  }

  const router = useRouter()
  const menu: Array<any> = [
    {
      key: '1',
      label: t('sidebar.settings'),
      icon: 'pi pi-cog',
      color: 'text-black-500',
      to: 'settings',
      children: [
        {
          key: '1',
          label:  t('sidebar.country'),
          name: 'admin-country',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'country',
          roles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
          permission: GET_PERMISSIONS.COUNTRY.VIEW
        },
        {
          key: '2',
          label: t('sidebar.province'),
          name: 'admin-province',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'province',
          roles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
          permission: GET_PERMISSIONS.PROVINCE.VIEW
        },
        {
          key: '3',
          label: t('sidebar.district'),
          name: 'admin-district',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'district',
          roles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
          permission: GET_PERMISSIONS.DISTRICT.VIEW
        },
        {
          key: '4',
          label: t('sidebar.service'),
          name: 'admin-service-charge',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'real.estate.services',
          roles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
          permission: GET_PERMISSIONS.SERVICE_CHARGE.VIEW
        },
        {
          key: '5',
          label: t('sidebar.user'),
          name: 'admin-user',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'admin.user',
          roles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
          permission: GET_PERMISSIONS.ADMIN_USER.VIEW
        },
        {
          key: '6',
          label: t('sidebar.house'),
          name: 'owner-real-estate',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'owner.house',
          roles: [GET_ROLES.ADMIN_OWNER, GET_ROLES.USER_OWNER],
          permission: GET_PERMISSIONS.REAL_ESTATE.VIEW
        },
        {
          key: '7',
          label: t('sidebar.payment_service'),
          name: 'owner-payment-service',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'owner.payment.service',
          roles: [GET_ROLES.ADMIN_OWNER, GET_ROLES.USER_OWNER],
          permission: GET_PERMISSIONS.PAYMENT_REAL_ESTATE.VIEW
        },
        {
          key: '8',
          label: t('sidebar.appointment'),
          name: 'owner-appointment',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'owner.appointment',
          qty: appointment,
          roles: [GET_ROLES.ADMIN_OWNER, GET_ROLES.USER_OWNER],
          permission: GET_PERMISSIONS.APPOINTMENT.VIEW
        },
        {
          key: '9',
          label: t('sidebar.rent_buy'),
          name: 'owner-rent-buy',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'owner.rent.buy',
          roles: [GET_ROLES.ADMIN_OWNER, GET_ROLES.USER_OWNER],
          permission: GET_PERMISSIONS.RENT_BUY.VIEW
        },
        {
          key: '10',
          label: t('sidebar.user'),
          name: 'owner-user',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'owner.user',
          roles: [GET_ROLES.ADMIN_OWNER, GET_ROLES.USER_OWNER],
          permission: GET_PERMISSIONS.OWNER_USER.VIEW
        },
        {
          key: '11',
          label: t('sidebar.real_estate_type'),
          name: 'admin-real_estate_type',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'real.estate.type',
          roles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
          permission: GET_PERMISSIONS.REAL_ESTATE_TYPE.VIEW
        },
        {
          key: '12',
          label: t('sidebar.footer'),
          name: 'admin-footer',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'footer',
          roles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
          permission: GET_PERMISSIONS.FOOTER.VIEW
        },
        {
          key: '13',
          label: t('sidebar.policy'),
          name: 'admin-policy',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'admin.policy',
          roles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
          permission: GET_PERMISSIONS.POLICY.VIEW
        },
        {
          key: '14',
          label: t('sidebar.about'),
          name: 'admin-about-us',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'admin.about',
          roles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
          permission: GET_PERMISSIONS.ABOUT_US.VIEW
        },
        {
          key: '15',
          label: t('sidebar.warning'),
          name: 'admin-warning',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'admin.warning',
          roles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
          permission: GET_PERMISSIONS.WARNING.VIEW
        },
        {
          key: '16',
          label: t('sidebar.qrcode_bank'),
          name: 'admin-qrocde-bank',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'admin.qrcode.bank',
          roles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
          permission: GET_PERMISSIONS.BANK_QRCODE.VIEW
        },
      ]
    },
    {
      key: '2',
      label: t('sidebar.report'),
      icon: 'pi pi-chart-line',
      color: 'text-black-500',
      to: 'settings',
      children: [
        {
          key: '1',
          label:  t('sidebar.report_real_estate'),
          name: 'admin-report-real-estate',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'report.real.estate',
          roles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
          permission: GET_PERMISSIONS.REPORT_REAL_ESTATE.VIEW
        },
        {
          key: '2',
          label:  t('sidebar.report_rent_buy'),
          name: 'admin-report-rent-buy',
          icon: 'pi pi-chart-line',
          color: 'text-red-500',
          to: 'report.rent.buy',
          roles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
          permission: GET_PERMISSIONS.REPORT_RENT_Buy.VIEW
        }
      ]
    },
  ]

  const routeNames = ['province', 'country', 'district', 'real.estate.services'];

  const clearStateAll = async (routeName: string) => {
    if (routeNames.includes(routeName)) {
      setStateFilter.page = 1;
      setStateFilter.limit = 10;

      setStateDistrictFilter.page = 1;
      setStateDistrictFilter.limit = 10;

      setStateProvinceFilter.page = 1;
      setStateProvinceFilter.limit = 10;

      setStateRealEstateServiceFilter.page = 1;
      setStateRealEstateServiceFilter.limit = 10;
    }
  }

  const goToRoute = async (routeName: string) => {
    await clearStateAll(routeName);
    router.push({ name: routeName});
  }


  const rolesString = localStorage.getItem('roles') || '';
  const currentRoles = rolesString ? JSON.parse(rolesString) : [];

  const permissionsString = localStorage.getItem('permissions') || '';
  const currentPermissions = rolesString ? JSON.parse(permissionsString) : [];


  const hasRoleAdmin = () => {
   if (currentRoles.includes(GET_ROLES.SUPER_ADMIN) || currentRoles.includes(GET_ROLES.ADMIN)) {
    return true;
   } else {
    return false;
   }
  }

  const hasPermission = (permission: any) => {
   if (currentRoles.includes(GET_ROLES.SUPER_ADMIN) || currentRoles.includes(GET_ROLES.ADMIN)) {
    return true;
   } else {
    return currentPermissions.includes(permission);
   }
  }

  const hasMatchingRoleAndPermission = (childRoles: any, permission: string, name: string) => {
    if (currentRoles.includes(GET_ROLES.SUPER_ADMIN) || currentRoles.includes(GET_ROLES.ADMIN) || currentRoles.includes(GET_ROLES.ADMIN_OWNER)) {
      return childRoles.some((role: string) => currentRoles.includes(role));
    } else {
      /** Owner & Admin User */
      if (name === 'owner-user') {
        if (currentPermissions.includes(permission) && currentRoles.includes(GET_ROLES.USER_OWNER)) {
          return true;
        } else {
          return false;
        }
      }
      if (name === 'admin-user') {
        if (currentPermissions.includes(permission) && currentRoles.includes(GET_ROLES.USER)) {
          return true;
        } else {
          return false;
        }
      }

      // /** Owner Real-Estate */
      // if (name === 'owner-real-estate') {
      //   if (currentPermissions.includes(permission) && currentRoles.includes(GET_ROLES.USER_OWNER)) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }

      // /** Owner Appointment */
      // if (name === 'owner-appointment') {
      //   if (currentPermissions.includes(permission) && currentRoles.includes(GET_ROLES.USER_OWNER)) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }

      // /** Owner Rent-Buy */
      // if (name === 'owner-rent-buy') {
      //   if (currentPermissions.includes(permission) && currentRoles.includes(GET_ROLES.USER_OWNER)) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }

      // /** Admin Report Rent & Buy */
      // if (name === 'admin-report-rent-buy') {
      //   if (currentPermissions.includes(permission) && currentRoles.includes(GET_ROLES.USER)) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }

      // /** Admin Report Real-Estate */
      // if (name === 'admin-report-real-estate') {
      //   if (currentPermissions.includes(permission) && currentRoles.includes(GET_ROLES.USER)) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }

      return currentPermissions.includes(permission);
    }
  }
</script>

<template>
    <aside class="shadow-1 h-screen fixed z-2 surface-overlay">
    <div class="flex flex-column h-full white-space-nowrap">
      <div
        class="flex align-items-center justify-content-center pt-3 overflow-hidden cursor-pointer"
      >
        <img src="https://logomaker.designfreelogoonline.com/media/productdesigner/logo/resized/1286_bird-01.png" style="width: 38px" />
        <span class="font-bold text-3xl" style="margin-left: 10px" @click="router.push({ name: 'home' })">UK LAO</span>
      </div>
      <br/>
        <div class="overflow-y-auto">
            <ul class="list-none p-0 m-0 overflow-hidden">
              <li v-if="hasRoleAdmin()">
                  <a 
                    @click="goToRoute('dashboard')"
                    :class="{ 'bg-highlight': router.currentRoute.value.name === 'dashboard' }"
                    v-ripple 
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                  >
                      <i class="pi pi-chart-line mr-2"></i>
                      <span class="font-medium">{{ $t('sidebar.dashboard')}}</span>
                  </a>
              </li>
              <li v-if="hasPermission(GET_PERMISSIONS.CUSTOMER.VIEW)">
                  <a 
                    @click="goToRoute('customer')"
                    :class="{ 'bg-highlight': router.currentRoute.value.name === 'customer' }"
                    v-ripple 
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                  >
                      <i class="pi pi-users mr-2"></i>
                      <span class="font-medium">{{ $t('sidebar.customer')}}</span>
                  </a>
              </li>
              <li v-if="hasPermission(GET_PERMISSIONS.PAYMENT_HISTORY.VIEW)">
                  <a 
                    @click="goToRoute('admin.payment.history')"
                    :class="{ 'bg-highlight': router.currentRoute.value.name === 'admin.payment.history' }"
                    v-ripple 
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                  >
                      <i class="pi pi-chart-line mr-2"></i>
                      <span class="font-medium">{{ $t('sidebar.payment_service')}}</span>
                  </a>
              </li>
            </ul>
            <ul class="list-none p-0 m-0 overflow-hidden">
              <li v-for="item in menu" :key="item.key">
                  <div
                      v-if="item.key === '1' || currentRoles.includes(GET_ROLES.SUPER_ADMIN) || currentRoles.includes(GET_ROLES.ADMIN) || currentRoles.includes(GET_ROLES.USER)"
                      v-ripple
                      v-styleclass="{
                          selector: '@next',
                          enterClass: 'hidden',
                          enterActiveClass: 'slidedown',
                          leaveToClass: 'hidden',
                          leaveActiveClass: 'slideup'
                      }"
                      class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                  >
                    <i :class="`${item.icon} ${item.color} mr-2`"></i>
                    <span class="font-medium">{{ item.label }}</span>
                    <i class="pi pi-chevron-down ml-auto"></i>
                  </div>
                  <ul 
                    class="list-none py-0 pl-3 pr-0 m-0 overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
                    :class="{ 'hidden': ![
                      'province', 
                      'country', 
                      'district', 
                      'real.estate.services', 
                      'owner.house', 
                      'owner.payment.service',
                      'admin.user',
                      'owner.appointment',
                      'owner.rent.buy',
                      'owner.user',
                      'owner.add.user',
                      'owner.edit.user',
                      'real.estate.type',
                      'footer',
                      'report.real.estate',
                      'admin.policy',
                      'admin.edit.policy',
                      'admin.about',
                      'admin.edit.about',
                      'admin.warning',
                      'admin.edit.warning',
                      'admin.qrcode.bank',
                      'report.rent.buy'
                    ].includes(String(router.currentRoute.value.name)) }"
                  >
                    <li v-for="children in item.children" :key="item.key">
                        <a 
                          v-if="hasMatchingRoleAndPermission(children.roles, children.permission, children.name)"
                          @click="goToRoute(children.to)"
                          :class="{ 'bg-highlight': router.currentRoute.value.name === children.to }"
                          v-ripple 
                          class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                            <i class="pi pi-chart-line mr-2"></i>
                            <span class="font-medium">{{ children.label }}</span>
                            <span 
                              v-if="children.qty"
                              class="inline-flex align-items-center justify-content-center ml-auto bg-primary border-circle" 
                              style="min-width: 1.5rem; height: 1.5rem; font-size: 14px !important; background-color: #d13438 !important;">
                              {{ children.qty }}
                            </span>
                        </a>
                    </li>
                  </ul>
                </li>
            </ul>
        </div>
      </div>
    <!-- </div> -->
  </aside>
</template>

<style scoped lang="scss">
  .bg-highlight {
    background-color: rgba(199, 195, 195, 0.604) !important; /* Add the desired highlight color */
  }
</style>