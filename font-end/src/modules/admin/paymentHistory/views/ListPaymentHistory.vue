<template>
    <div class="card">
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                <h2 class="mb-3">
                    {{ $t('table.title.payment_service')}}
                </h2>
            </span>
        </div>
        <Divider/>
        <DataTable 
            :value="state.data.props" 
            paginator 
            :rowsPerPageOptions="[5, 10, 20, 50]" 
            tableStyle="min-width: 50rem"
            :loading="state.isLoading" 
            lazy
            :totalRecords="state.data.total"
            @page="onPageChange"
            :first="first"
            scrollable
            :rows="setStateFilter.limit"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :currentPageReportTemplate="`${$t('table.pagination.show')} {first} ${$t('table.pagination.to')} {last} ${$t('table.pagination.from')} {totalRecords} ${$t('table.pagination.row')}`"
        >
            <template #header>
                <div class="col-12 md:col-12 flex flex-row">
                    <div class="col-12 md:col-5">
                        <label>
                            {{ $t('messages.owner') }}
                        </label>
                        <Dropdown 
                            name="status"
                            v-model="form.customer_id" 
                            :options="getCustomers.data.props" 
                            :optionLabel="option => `${option.customer_number} > ${option.name} > ${option.owner} > ${option.tel}`" 
                            :placeholder="$t('placeholder.dropdownSelect')" 
                            class="w-full" 
                            optionValue="id"
                            :highlightOnSelect="true" 
                            @change="onSearch"
                        />
                    </div>
                    <div class="col-12 md:col-3">
                        <label>
                            {{ $t('messages.payment_date') }}
                        </label>
                        <InputText 
                            v-model="paymentDate" 
                            type="date" 
                            style="width: 100% !important" 
                            @change="onSearch"
                        />
                    </div>
                    <div class="col-12 md:col-2">
                        <label>
                            {{ $t('messages.status') }}
                        </label>
                        <Dropdown 
                            name="status"
                            v-model="form.status" 
                            :options="paymentStatues" 
                            :optionLabel="option => `${option.name}`" 
                            :placeholder="$t('placeholder.dropdownSelect')" 
                            class="w-full" 
                            optionValue="id"
                            :highlightOnSelect="true" 
                            @change="onSearch"
                        />
                    </div>
                    <div class="col-12 md:col-2" style="text-align: right;">
                        <Button 
                            icon="pi pi-search" 
                            severity="info" 
                            style="margin-top: 22px !important; color: white" 
                            @click="onSearch"
                        />
                        <span style="margin-left: 10px;"></span>
                        <Button 
                            icon="pi pi-refresh" 
                            severity="warning" 
                            style="margin-top: 22px !important; color: white" 
                            @click="clearSearch"
                        />
                    </div>
                </div>
            </template>

            <Column field="id" :header="$t('table.header.index')" frozen>
                <template #body="item">
                    {{ item.index + 1 }}
                </template>
            </Column>
            <Column headerStyle="min-width: 4rem" frozen>
                <template #body="{ data }">
                    <div class="flex flex-wrap gap-2 btn-right">
                        <Button 
                            type="button" 
                            :icon="data.status === 'confirm' ? 'pi pi-check-square' : 'pi pi-calculator'" 
                            rounded 
                            :severity="data.status === 'confirm' ? 'success' : 'danger'"
                            style="color: white" 
                            @click="editItem(data)"
                            :disabled="validationPermissions(GET_PERMISSIONS.PAYMENT_HISTORY.CONFIRM)"
                        />
                    </div>
                </template>
            </Column>
            <Column field="date_payment" :header="$t('table.header.date_payment')" headerStyle="min-width: 8rem"></Column>
            <Column field="bill_no" :header="$t('table.header.bill_number')" headerStyle="min-width: 6rem"></Column>
            <Column field="real_estate_list.real_esate_number" :header="$t('table.header.real_esate_number')" headerStyle="min-width: 6rem"></Column>
            <Column field="real_estate_list.name" :header="$t('table.header.real_estate_name')" headerStyle="min-width: 6rem"></Column>
            <Column :header="$t('table.header.name') +  ' / ' + $t('table.header.owner')" headerStyle="min-width: 12rem">
                <template #body="{data}">
                    <span>{{ data.real_estate_list.agent_name }}</span>
                    <span> - {{ data.real_estate_list.owner_name }}</span>
                </template>
            </Column>
            <Column :header="$t('table.header.unit_price')" headerStyle="min-width: 10rem">
                <template #body="{data}">
                    (<span>{{ data.qty }} / {{ data.unit_price }}</span>)
                </template>
            </Column>
            <Column field="service_charges" :header="$t('table.header.service')" headerStyle="min-width: 13rem">
                <template #body="{ data }">
                    {{ conCatServiceChargePrices(data.payment_service_charges) }}
                </template>
            </Column>
            <Column field="service_charges" :header="$t('table.header.total')" headerStyle="min-width: 14rem">
                <template #body="{ data }">
                    {{ conCatAndTotalServiceChargePrices(data.payment_service_charges, data.qty) }}
                </template>
            </Column>
            <Column :header="$t('table.header.start_end_date')" headerStyle="min-width: 14rem">
                <template #body="{data}">
                    <span style="color: rgb(4, 4, 209)">{{ data.from_date }}</span>
                    <span style="color: red"> / {{ data.to_date }}</span>
                </template>
            </Column>
            <Column field="status" :header="$t('table.header.status')"></Column>
            <Column field="updated_by.name" :header="$t('table.header.updated_by')" headerStyle="min-width: 8rem"></Column>
        </DataTable>

        <payment-history-component
            ref="createForm"
            :data="dataEdit"
            @on-success="onSuccess"
        />
    </div>
</template>
<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
    import Column from 'primevue/column'; 
    import Divider from 'primevue/divider';
    import Button from 'primevue/button';
    import Dropdown from 'primevue/dropdown';
    import InputText from 'primevue/inputtext';
    import { PaymentEntity } from '../entities/payment.entity';
    import { useI18n } from 'vue-i18n';
    import { paymentServiceHistoryStore } from '../stores/payment-history.store';
    import PaymentHistoryComponent from '../components/PaymentHistory.Component.vue';
    import { reportRentBuyStore } from '../../dashboard/stores/rent-store';
    import { conCatAndTotalServiceChargePrices, conCatServiceChargePrices } from '@/common/utils/concat';
    import { validationPermissions } from '@/common/utils/validation-permissions';
    import { GET_PERMISSIONS } from '@/common/utils/const';

    const { t } = useI18n();

    const { form, getAll, state, setStateFilter } = paymentServiceHistoryStore();
    const { getAllCustomers, getCustomers } = reportRentBuyStore();

    const paymentStatues = ref([
        { id: 'all', name: t('messages.all') },
        { id: 'pending', name: t('messages.pending') },
        { id: 'confirm', name: t('messages.confirm') },
        { id: 'reject', name: t('messages.reject') },
    ]);

    const paymentDate = ref();
    const createForm = ref();
    const dataEdit = ref();

    const editItem = async (data: PaymentEntity) => {
        dataEdit.value = data;
        createForm.value.visible = true;
    }

    const onSearch = async () => {
        if (setStateFilter.filter) { 
            setStateFilter.filter.status = form.status === 'all' ? '' : form.status;
            setStateFilter.filter.date_payment = paymentDate.value;
            setStateFilter.filter.customer_id = form.customer_id;
        }
        await getAll();
    }

    const clearSearch = async () => {
        form.status = 'all';
        paymentDate.value = null;
        form.customer_id = "";
        await onSearch();
    }

    const onSuccess = async () => {
        await getAll();
    }

    async function onPageChange(event: DataTablePageEvent) {
        setStateFilter.page = event.page + 1; 
        setStateFilter.limit = event.rows;

        await getAll();
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
        form.status = 'all';
        await onSearch();
    });
</script>   

<style scoped>
    .btn-right {
        display: flex;
        justify-content: flex-end;
    }
</style>