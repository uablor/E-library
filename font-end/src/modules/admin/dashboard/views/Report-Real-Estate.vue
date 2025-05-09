<template>
    <div class="card">
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                <h2 class="mb-3">
                    {{ $t('table.title.report_real_estate') }}
                </h2>
            </span>
            <span class="w-full sm:w-auto flex-order-0 sm:flex-order-1 mb-4 sm:mb-0">
                <!-- <Button 
                    icon="pi pi-plus-circle"
                    rounded 
                    severity="info" 
                    @click="pushRouteAddHouse()"
                /> -->
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
                <div class="col-12 md:col-12 flex flex-row is-margin-top">
                    <div class="col-12 md:col-12">
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
                </div>
                <div class="col-12 md:col-12 flex flex-row is-margin-top">
                    <div class="col-12 md:col-3">
                        <label>
                            {{ $t('messages.realestate_type') }}
                            <span class="text-red-500"> *</span>
                        </label>
                        <Dropdown 
                            name="real_estate_type"
                            v-model="form.real_estate_type_id" 
                            :options="realestateType.props" 
                            optionLabel="name" 
                            :placeholder="$t('placeholder.dropdownSelect')" 
                            class="w-full" 
                            optionValue="id"
                            :highlightOnSelect="true" 
                            @change="onSearch"
                        />
                    </div>
                    <div class="col-12 md:col-3">
                        <label>
                            {{ $t('messages.service_model') }}
                            <span class="text-red-500"> *</span>
                        </label>
                        <Dropdown 
                            v-model="form.service_model" 
                            :options="servicemodels" 
                            optionLabel="name" 
                            :placeholder="$t('placeholder.dropdownSelect')" 
                            optionValue="id"
                            :highlightOnSelect="true" 
                            class="w-full" 
                            @change="onSearch"
                        />
                    </div>
                    <div class="col-12 md:col-3">
                        <label>
                            {{ $t('messages.room_type') }}
                            <span class="text-red-500"> *</span>
                        </label>
                        <Dropdown 
                            v-model="form.room_type" 
                            :options="roomTypes" 
                            optionLabel="name" 
                            :placeholder="$t('placeholder.dropdownSelect')" 
                            class="w-full" 
                            optionValue="id"
                            :highlightOnSelect="true" 
                            @change="onSearch"
                        />
                    </div>
                    <div class="col-12 md:col-3">
                        <label>
                            {{ $t('messages.country') }}
                            <span class="text-red-500"> *</span>
                        </label>
                        <Dropdown 
                            v-model="form.country_id" 
                            :options="getCountries.data.props" 
                            optionLabel="name" 
                            :placeholder="$t('placeholder.dropdownSelect')" 
                            class="w-full" 
                            optionValue="id"
                            :highlightOnSelect="true" 
                            filter
                            @change="filterProvinceById(form.country_id)"
                        />
                    </div>
                    <!-- <div class="col-12 md:col-3">
                        <label>
                            {{ $t('messages.province') }}
                            <span class="text-red-500"> *</span>
                        </label>
                        <Dropdown 
                            v-model="form.province_id" 
                            :options="getProvinces.data.props" 
                            optionLabel="name" 
                            :placeholder="$t('placeholder.dropdownSelect')" 
                            class="w-full" 
                            optionValue="id"
                            :highlightOnSelect="true" 
                            filter
                            @change="filterDistrictByid(form.province_id)"
                        />
                    </div>
                    <div class="col-12 md:col-3">
                        <label>
                            {{ $t('messages.district') }}
                            <span class="text-red-500"> *</span>
                        </label>
                        <Dropdown 
                            v-model="form.district_id" 
                            :options="getDistricts.data.props" 
                            optionLabel="name" 
                            :placeholder="$t('placeholder.dropdownSelect')" 
                            class="w-full" 
                            optionValue="id"
                            :highlightOnSelect="true" 
                            filter
                            @change="onSearch"
                        />
                    </div> -->
                </div>
            </template>

            <Column field="id" :header="$t('table.header.index')">
                <template #body="item">
                    {{ item.index + 1 }}
                </template>
            </Column>
            <Column field="image" :header="$t('table.header.image')" headerStyle="min-width: 8rem">
                <template #body="{ data }">
                    <Image :src="data.image" alt="Image" preview style="max-width: 80px;"/>
                </template>
            </Column>
            <Column field="customer.customer_number" :header="$t('table.header.customer_number')" headerStyle="min-width: 7rem"></Column>
            <Column field="customer.name" :header="$t('table.header.customer')" headerStyle="min-width: 7rem"></Column>
            <Column field="real_esate_number" :header="$t('table.header.real_esate_number')" headerStyle="min-width: 7rem"></Column>
            <Column field="name" :header="$t('table.header.real_estate_name')" headerStyle="min-width: 7rem"></Column>
            <Column field="trans_real_estate_type.name" :header="$t('table.header.realestate_type')" headerStyle="min-width: 7rem"></Column>
            <Column field="service_model" :header="$t('table.header.service_model')" headerStyle="min-width: 7rem"></Column>
            <Column field="room_type" :header="$t('table.header.room_type')" headerStyle="min-width: 6rem"></Column>
            <Column field="owner_name" :header="$t('table.header.owner')" headerStyle="min-width: 6rem"></Column>
            <Column field="agent_name" :header="$t('table.header.name')" headerStyle="min-width: 6rem"></Column>
            <Column field="country.name" :header="$t('table.header.country')" headerStyle="min-width: 6rem"></Column>
            <!-- <Column field="district.province.name" :header="$t('table.header.province')" headerStyle="min-width: 8rem"></Column> -->
            <!-- <Column field="district.name" :header="$t('table.header.district')" headerStyle="min-width: 7rem"></Column> -->
            <Column field="village" :header="$t('table.header.address')" headerStyle="min-width: 12rem"></Column>
            <!-- <Column field="zip_code" :header="$t('table.header.zip_code')" headerStyle="min-width: 6rem"></Column> -->
            <Column field="wide" :header="$t('table.header.wide')" headerStyle="min-width: 6rem"></Column>
            <Column field="long" :header="$t('table.header.long')" headerStyle="min-width: 6rem"></Column>
            <Column field="status" :header="$t('table.header.status')" headerStyle="min-width: 6rem"></Column>
            <!-- <Column headerStyle="min-width: 7rem">
                <template #body="{ data }">
                    <div class="flex flex-wrap gap-2 btn-right">
                        <Button 
                            type="button" 
                            icon="pi pi-trash" 
                            rounded 
                            severity="danger"
                            @click="confirmDelete(data.id)"
                        />
                    </div>
                </template>
            </Column> -->
        </DataTable>
    </div>
</template>

<script setup lang="ts">
    import Image from 'primevue/image';
    import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
    import Column from 'primevue/column';
    import InputText from 'primevue/inputtext';
    import { onMounted, ref, computed } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import Dropdown from 'primevue/dropdown';
    import { realEstateServiceStore } from '../../../rentHouse/memberServices/stores/real-estate-service.store';
    import { HouseEntity } from '../../../owner/house/entities/house.entity';
    // import { useConfirm } from "primevue/useconfirm";
    // import { useToast } from "primevue/usetoast";
    import { useI18n } from 'vue-i18n';
    import { dashboardStore } from '../stores/store';

    const { t } = useI18n();
    const router = useRouter()
    const { query } = useRoute()

    // const toast = useToast();
    // const confirm = useConfirm();

    const { form, getAllRealEstate, state, setStateFilter, getCountries, getAllCountries, getAllProvinces, getProvinces, getAllDistricts, getDistricts } = dashboardStore();
    const { getOne, realestateType } = realEstateServiceStore();

    const servicemodels = ref([
        { id: 'all', name: t('messages.all') },
        { id: 'sale', name: t('messages.service_sale') },
        { id: 'rent', name: t('messages.service_rent') }
    ]);

    const roomTypes = ref([
        { id: 'all', name: t('messages.all') },
        { id: 'air', name: t('messages.air') },
        { id: 'fan', name: t('messages.fan') },
        { id: 'no', name: t('messages.none') },
    ]);

    async function initComponent() {
        if (Object.keys(query).length !== 0) {
            setStateFilter.page = query.page ? Number(query.page) : 1
            setStateFilter.limit = query.limit ? Number(query.limit) : 10


            router.push({
                query: {
                    page: setStateFilter.page,
                    limit: setStateFilter.limit
                }
            })
        }
        await fetchAll();
    }

    onMounted(async() => {
        await initComponent();
    })

    // const editHouse = async (id: number) => {
    //     router.push({ name: 'owner.edit.house', params: { id: id } });
    // }

    // const deleteHouse = async (id: HouseEntity) => {
    //     await remove(id);

    //     if (state.error) {
    //         await showWarningValidateBackend();
    //     } else {
    //         await initComponent();
    //     }
    // }

    async function onPageChange(event: DataTablePageEvent) {
        setStateFilter.page = event.page + 1;
        setStateFilter.limit = event.rows;

        const { page, limit } = setStateFilter
        router.push({ name: 'report.real.estate', query: 
            { 
                page, 
                limit
            } 
        })

        await getAllRealEstate();
    }

    const first = computed(() => {
        let result: number = 0

        if(setStateFilter.page && setStateFilter.limit){
            result = (setStateFilter.page - 1) * setStateFilter.limit
        }
        return result
    })

    const onSearch = async () => {
        if (setStateFilter.filter) {
            setStateFilter.filter.real_estate_type_id = form.real_estate_type_id === 'all' ? '' : form.real_estate_type_id;
            setStateFilter.filter.service_model = form.service_model === 'all' ? '' : form.service_model;
            setStateFilter.filter.room_type = form.room_type === 'all' ? '' : form.room_type;
            setStateFilter.filter.district_id = form.district_id === 'all' ? '' : form.district_id;
        }
       
        await getAllRealEstate();
    }

    async function onClearSearch(e: any) {
        const fieldName = e.target.name;

        if (e.target.value === '') {
            if (fieldName === 'search') {
                if (setStateFilter.filter?.search !== undefined) {
                    setStateFilter.filter.search = ''
                }
            }
            await getAllRealEstate();
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

    const fetchAll = async() => {
        await getAllRealEstate();
        await getOne();

        realestateType.props.unshift({ id: 'all', name: t('messages.all') });
       
        form.room_type = 'all';
        form.service_model = 'all';

        /** Get Countries */
        await getAllCountries();
        await getCountries.data.props.unshift({ id: 'all', name: t('messages.all') });
        form.country_id = getCountries.data.props.length > 0 ? getCountries.data.props[0].id : undefined;

        await getAllProvinces(getCountries.data.props[0].id as HouseEntity);
        getProvinces.data.props.unshift({ id: 'all', name: t('messages.all') });

        form.real_estate_type_id = realestateType.props.length > 0 ? realestateType.props[0].id : undefined;
        form.province_id = getProvinces.data.props.length > 0 ? getProvinces.data.props[0].id : undefined;
        
        await getAllDistricts(getProvinces.data.props[0].id);
        await getDistricts.data.props.unshift({ id: 'all', name: t('messages.all') });
        await selectedDistrict();
    }

    const selectedDistrict = async () => {
        form.district_id = getDistricts.data.props.length > 0 ? getDistricts.data.props[0].id : undefined;
    }

    const filterProvinceById = async (id: any) => {
        if (setStateFilter.filter) {
            await getAllProvinces(id);
            getProvinces.data.props.unshift({ id: 'all', name: t('messages.all') });
            form.province_id = getProvinces.data.props.length > 0 ? getProvinces.data.props[0].id : undefined;

            if (setStateFilter.filter) {
                setStateFilter.filter.country_id = form.country_id === 'all' ? '' : form.country_id;
                setStateFilter.filter.district_id = form.district_id === 'all' ? '' : form.district_id;
                setStateFilter.filter.province_id = form.province_id === 'all' ? '' : form.province_id;
            }

            await getAllRealEstate();
        }
    }

    // const filterDistrictByid = async (id: any) => {
    //     await getAllDistricts(id);
    //     await getDistricts.data.props.unshift({ id: 'all', name: t('messages.all') });
    //     await selectedDistrict();

    //     if (setStateFilter.filter) {
    //         setStateFilter.filter.country_id = form.country_id === 'all' ? '' : form.country_id;
    //         setStateFilter.filter.district_id = form.district_id === 'all' ? '' : form.district_id;
    //         setStateFilter.filter.province_id = form.province_id === 'all' ? '' : form.province_id;
    //     }

    //     await getAllRealEstate();
    // }

    // const confirmDelete = async (id: HouseEntity) => {
    //     confirm.require({
    //         message: t('confirmDelete.message'),
    //         header: t('confirmDelete.header'),
    //         rejectLabel: t('confirmDelete.rejectLabel'),
    //         acceptLabel: t('confirmDelete.acceptLabel'),
    //         rejectClass: 'p-button-secondary p-button-outlined',
    //         acceptClass: 'p-button-danger',
    //         accept: async () => {
    //             await deleteHouse(id);

    //             toast.add({ severity: 'success', summary: t('toast.summary.delete'), detail: t('toast.detail.delete'), life: 3000 });
    //         },
    //         reject: () => {
    //             toast.add({ severity: 'error', summary: t('toast.summary.cancel_delete'), detail: t('toast.detail.cancel_delete'), life: 3000 });
    //         }
    //     });
    // }

    // const showWarningValidateBackend = () => {
    //     toast.add({ severity: 'error', summary: t('toast.summary.error'), detail: `${state.error}`, life: 3000 });
    // }
</script>

<style>
    .btn-right {
        display: flex;
        justify-content: flex-end;
    }
    .is-margin-top {
        margin-top: -15px;
    }
</style>