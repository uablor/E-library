<template>
    <div>
        <div class="card">
            <Dropdown 
                v-model="form.country_id" 
                :options="getCountries.data.props" 
                optionLabel="name" 
                :placeholder="$t('placeholder.dropdownSelect')" 
                optionValue="id"
                :highlightOnSelect="true" 
                class="w-full" 
                filter
                @change="onSearch"
            />
        </div>
        <div class="columns is-multiline">
            <div class="column is-4 is-mobile-12 is-box" v-for="(item, index) in getRealEstateTypes.data.props" :key="index">
                <div class="card">
                    <p style="font-size: 20px; font-weight: bold; text-align: center;">{{ item.trans_real_estate_type.name }}</p>
                    <Divider/>
                    <div style="margin-top: 10px; line-height: 2rem;">
                        <p>
                            {{ $t('messages.total_qty') }}: {{ item.total }}
                            <span style="margin-left: 10px; color: #00b7c3;">
                                <i class="pi pi-angle-right"></i>
                            </span>
                            <span style="margin-left: 10px; color: blue"> {{ $t('messages.qty_rent') }}: {{ item.total_rent }}</span>
                        </p>
                        <p>
                            <span style="color: red;">
                                {{ $t('messages.qty_sale') }}: {{ item.total_buy }}
                            </span>
                            <span style="margin-left: 10px; color: #00b7c3">
                                <i class="pi pi-angle-right"></i>
                            </span>
                            <span style="margin-left: 10px; color: green"> {{ $t('messages.balance') }}: {{ item.total_balance }}</span>
                        </p>
                    </div>
                    <Divider/>
                    <div style="line-height: 2rem;">
                        <p style="color: green;">
                            {{ $t('messages.total') }}: {{ formatNumber(item.sum_total_buy + item.sum_total_rent, item.currency) }}
                        </p>
                        <p style="color: red;">
                            {{ $t('messages.total_sale') }}: {{ formatNumber(item.sum_total_buy, item.currency) }}
                        </p>
                        <p style="color: blue;">
                            {{ $t('messages.total_rent') }}: {{ formatNumber(item.sum_total_rent, item.currency) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { onMounted } from 'vue';
    import { dashboardStore } from '../stores/store';
    import Divider from 'primevue/divider';
    import Dropdown from 'primevue/dropdown';
    import { formatNumber } from '@/common/utils/format.currency';

    const { form, reportRealEstateTypes, getRealEstateTypes, setStateFilter, getCountries, getAllCountries } = dashboardStore();

    const onSearch = async () => {
        if (setStateFilter.filter) {
            setStateFilter.filter.country_id = form.country_id === 'all' ? '' : form.country_id;
        }
       
        await reportRealEstateTypes();
    }

    async function initComponent() {
        await getAllCountries();
        form.country_id = getCountries.data.props.length > 0 ? getCountries.data.props[0].id : undefined;
        if (setStateFilter.filter) {
            setStateFilter.filter.country_id = form.country_id === 'all' ? '' : form.country_id;
        }
        
        await reportRealEstateTypes();
    }

    
    onMounted(async () => {
        await initComponent();
    })
</script>

<style scoped>
    @import 'bulma/css/bulma.css';

    .is-box:hover {
        cursor: pointer;
    }
</style>