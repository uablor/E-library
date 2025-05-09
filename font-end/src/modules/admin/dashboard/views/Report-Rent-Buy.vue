<template>
    <div class="card">
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span class="p-input-icon-left w-full sm:w-30rem flex-order-1 sm:flex-order-0">
                <h2 class="mb-3">
                    {{ $t('table.title.report_rent_buy') }} 
                </h2>
            </span>
            <span v-if="form.customer_id !== 'all' && state.data.summary" style="font-size: 18px; font-weight: bold; color: green">
                {{  $t('messages.total_price') }} :
                {{ formatNumber(state.data.summary, state.data.currency) }}
            </span>
        </div>
        <DataTable 
            :value="state.data.props" 
            @page="onPageChange"
            paginator 
            :first="first"
            :rowsPerPageOptions="[5, 10, 20, 50]" 
            tableStyle="min-width: 50rem"
            :loading="state.isLoading" 
            lazy
            :totalRecords="state.data.total"
            :rows="setStateFilter.limit"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :currentPageReportTemplate="`${$t('table.pagination.show')} {first} ${$t('table.pagination.to')} {last} ${$t('table.pagination.from')} {totalRecords} ${$t('table.pagination.row')}`"
        >
            <template #header>
                <div class="col-12 md:col-12 flex flex-row" style="margin-top: -15px;">
                    <div class="col-12 md:col-3">
                        <label>
                            {{ $t('messages.search') }}
                            <span class="text-red-500"> *</span>
                        </label>
                        <input-text
                            v-model="filterItems"
                            :placeholder="$t('placeholder.textSearch')" 
                            style="font-family: NotoSansLao, Montserrat"
                            class="w-full"
                            name="search"
                            @keyup.enter="onSearch"
                            @input="onClearSearch"
                        />
                    </div>
                    <div class="col-12 md:col-2">
                        <label>
                            {{ $t('messages.owner') }}
                        </label>
                        <Dropdown 
                            name="customer"
                            v-model="form.customer_id" 
                            :options="getCustomers.data.props" 
                            :optionLabel="option => `${option.customer_number} - ${option.name} - ${option.tel}`" 
                            :placeholder="$t('placeholder.dropdownSelect')" 
                            class="w-full" 
                            optionValue="id"
                            :highlightOnSelect="true" 
                            filter
                            @change="onSearch"
                        />
                    </div>
                    <div class="col-12 md:col-2">
                        <label>
                            {{ $t('messages.status') }}
                        </label>
                        <Dropdown 
                            name="real_estate_type"
                            v-model="form.service_model" 
                            :options="serviceModels" 
                            optionLabel="name" 
                            :placeholder="$t('placeholder.dropdownSelect')" 
                            class="w-full" 
                            optionValue="id"
                            :highlightOnSelect="true" 
                            @change="onSearch"
                        />
                    </div>
                    <div class="col-12 md:col-2">
                        <label>
                            {{ $t('messages.start_date') }}
                        </label>
                        <InputText 
                            v-model="fromDate" 
                            type="date" 
                            style="width: 100% !important" 
                            @change="onSearch"
                        />
                    </div>
                    <div class="col-12 md:col-2">
                        <label>
                            {{ $t('messages.end_date') }}
                        </label>
                        <InputText 
                            v-model="toDate" 
                            type="date" 
                            style="width: 100% !important" 
                            @change="onSearch"
                        />
                    </div>
                    <div class="col-12 md:col-1" style="text-align: right;">
                        <Button 
                            icon="pi pi-refresh" 
                            severity="warning" 
                            style="margin-top: 22px !important; color: white" 
                            @click="clearSearch"
                        />
                    </div>
                </div>
            </template>
            <Column field="id" :header="$t('table.header.index')">
                <template #body="item">
                    {{ item.index + 1 }}
                </template>
            </Column>
            <Column field="date" :header="$t('table.header.date_rent')" headerStyle="min-width: 7rem"></Column>
            <Column field="number" :header="$t('table.header.rent_number')" headerStyle="min-width: 10rem"></Column>
            <Column field="customer_name" :header="$t('table.header.customer_name')" headerStyle="min-width: 10rem"></Column>
            <Column field="customer_tel" :header="$t('table.header.customer_phone')" headerStyle="min-width: 10rem"></Column>
            <Column :header="$t('table.header.info_account')" headerStyle="min-width: 25rem">
                <template #body="{ data }">
                    {{ data.real_estate_list.account.customer_number }}
                    <span>
                        <i class="pi pi-angle-right" style="color: green; margin-left: 5px; width: 20px"></i>
                        {{ data.real_estate_list.account.name }}
                    </span>
                    <span>
                        <i class="pi pi-angle-right" style="color: green; margin-left: 5px; width: 20px"></i>
                        {{ data.real_estate_list.account.owner }}
                    </span>
                    <span>
                        <i class="pi pi-angle-right" style="color: green; margin-left: 5px; width: 20px"></i>
                        {{ data.real_estate_list.account.tel }}
                    </span>
                </template>
            </Column>
            <Column field="real_estate_list.real_esate_number" :header="$t('table.header.real_esate_number')" headerStyle="min-width: 12rem"></Column>
            <Column field="real_estate_list.name" :header="$t('table.header.real_estate_name')" headerStyle="min-width: 8rem"></Column>
            <Column field="real_estate_list.trans_real_estate_type.name" :header="$t('table.header.real_estate_type')" headerStyle="min-width: 10rem"></Column>
            <Column field="service_model" :header="$t('table.header.service_model')" headerStyle="min-width: 8rem"></Column>
            <Column field="from_date" :header="$t('table.header.from_date')" headerStyle="min-width: 8rem"></Column>
            <Column field="to_date" :header="$t('table.header.to_date')" headerStyle="min-width: 8rem"></Column>
            <Column :header="$t('table.header.price')" headerStyle="min-width: 15rem">
                <template #body="{ data }">
                    {{ formatNumber(data.price , data.currency)  }} - ( {{ data.qty }} / {{ data.unit_price }})
                </template>
            </Column>
            <Column :header="$t('table.header.total')" headerStyle="min-width: 13rem">
                <template #body="{ data }">
                    {{ formatNumber(data.total , data.currency) }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { reportRentBuyStore } from '../stores/rent-store';
    import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
    import Column from 'primevue/column';
    import Dropdown from 'primevue/dropdown';
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import { useRouter } from 'vue-router';
    import { useI18n } from 'vue-i18n';
    import { formatNumber } from '@/common/utils/format.currency';

    const { form, setStateFilter, state, getAllReportRentBuy, getAllCustomers, getCustomers } = reportRentBuyStore();
    const router = useRouter();
    const { t } = useI18n();

    const serviceModels = ref([
        { id: 'all', name: t('messages.all') },
        { id: 'rent', name: t('messages.service_rent') },
        { id: 'buy', name: t('messages.service_sale') }
    ]);
    const fromDate = ref();
    const toDate = ref();

    async function onClearSearch(e: any) {
        const fieldName = e.target.name;

        if (e.target.value === '') {
            if (fieldName === 'search') {
                if (setStateFilter.filter?.search !== undefined) {
                    setStateFilter.filter.search = ''
                }
            }
            await getAllReportRentBuy();
        }
    }

    const filterItems = computed<string>({
        get: () => setStateFilter.filter!.search || '',
        set: (value) => {
            if (setStateFilter.filter) {
                setStateFilter.filter.search = value;
            }
        }
    })

    const clearSearch = async () => {

        if (setStateFilter.filter) {
            setStateFilter.filter.service_model = "";
            setStateFilter.filter.from_date = "";
            setStateFilter.filter.to_date = "";
            setStateFilter.filter.search = "";
        }
        form.customer_id = getCustomers.data.props.length > 0 ? getCustomers.data.props[0].id : undefined;
        toDate.value = "";
        fromDate.value = "";
        form.to_date = "";
        form.from_date = "";
        form.service_model = "all";

        await onSearch();
    }

    const onSearch = async () => {
        if (setStateFilter.filter) {
            setStateFilter.filter.service_model = form.service_model === 'all' ? '' : form.service_model;
            setStateFilter.filter.from_date = fromDate.value;
            setStateFilter.filter.to_date = toDate.value;
            setStateFilter.filter.customer_id = form.customer_id;
        }

        await getAllReportRentBuy();
    }

    async function onPageChange(event: DataTablePageEvent) {
        setStateFilter.page = event.page + 1;
        setStateFilter.limit = event.rows;

        const { page, limit } = setStateFilter
        router.push({ name: 'report.rent.buy', query: 
            { 
                page, 
                limit
            } 
        })

        await getAllReportRentBuy();
        form.customer_id = getCustomers.data.props.length > 0 ? getCustomers.data.props[0].id : undefined;
        form.service_model = "all";
    }

    const first = computed(() => {
        let result: number = 0

        if(setStateFilter.page && setStateFilter.limit){
            result = (setStateFilter.page - 1) * setStateFilter.limit
        }
        return result
    })

    onMounted(async() => {
        await getAllCustomers();
        form.service_model = "all";
        getCustomers.data.props.unshift({ id: 'all', name: t('messages.all'), customer_number: t('messages.all'), tel: t('messages.all') });
        form.customer_id = getCustomers.data.props.length > 0 ? getCustomers.data.props[0].id : undefined;
        
        // if (setStateFilter.filter) {
        //     setStateFilter.filter.service_model = form.service_model === 'all' ? '' : form.service_model;
        //     setStateFilter.filter.from_date = form.from_date;
        //     setStateFilter.filter.to_date = form.to_date;
        //     setStateFilter.filter.customer_id = form.customer_id;
        // }

        await getAllReportRentBuy();
    })
</script>

<style scoped>

</style>