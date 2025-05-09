<template>
    <div class="card">
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                <h2 class="mb-3">
                    {{ $t('table.title.user') }}
                </h2>
            </span>
            <span>
                <Button 
                :label="$t('button.add')" 
                severity="info" 
                @click="pushRouteAddUser"
                :disabled="validationPermissions(GET_PERMISSIONS.ADMIN_USER.CREATE)"
            />
            </span>
        </div>
        <Divider/>
        <br/>
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
            :rows="setStateFilter.limit"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :currentPageReportTemplate="`${$t('table.pagination.show')} {first} ${$t('table.pagination.to')} {last} ${$t('table.pagination.from')} {totalRecords} ${$t('table.pagination.row')}`"
        >
            <Column field="id" :header="$t('table.header.index')">
                <template #body="item">
                    {{ item.index + 1 }}
                </template>
            </Column>
            <Column field="profile" :header="$t('table.header.profile')" headerStyle="min-width: 8rem" frozen>
                <template #body="{ data }">
                    <Image :src="data.profile" alt="Image" preview style="max-width: 80px;"/>
                </template>
            </Column>
            <Column :header="$t('table.header.name')">
                <template #body="{data}">
                    {{ data.name }}
                </template>
            </Column>
            <Column :header="$t('table.header.email')">
                <template #body="{data}">
                    {{ data.email }}
                </template>
            </Column>
            <Column :header="$t('table.header.role')">
                <template #body="{data}">
                    {{ data.role.name }}
                </template>
            </Column>
            <Column :header="$t('table.header.permission')">
                <template #body="{data}">
                    {{ conCatPermission(data.permissions) }}
                </template>
            </Column>
            <Column headerStyle="width: 10rem">
                <template #body="{ data }">
                    <div class="flex flex-wrap gap-2 btn-right">
                        <Button 
                            type="button" 
                            icon="pi pi-pencil" 
                            rounded 
                            severity="warning"
                            style="color: white" 
                            @click="editUser(data.id)"
                            :disabled="validationPermissions(GET_PERMISSIONS.ADMIN_USER.UPDATE)"
                        />
                        <Button 
                            type="button" 
                            icon="pi pi-trash" 
                            rounded 
                            severity="danger"
                            style="color: white" 
                            :disabled="validationPermissions(GET_PERMISSIONS.ADMIN_USER.DELETE)"
                        />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
    import { adminUserStore } from '../stores/user.store';
    import { onMounted, computed } from 'vue';
    import Divider from 'primevue/divider';
    import Button from 'primevue/button';
    import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
    import Column from 'primevue/column'; 
    import { conCatPermission } from '../../../../../common/utils/concat';
    import { useRouter } from 'vue-router';
    import Image from 'primevue/image';
    import { GET_PERMISSIONS } from '@/common/utils/const';
    import { validationPermissions } from '@/common/utils/validation-permissions';

    const { getAll, state, setStateFilter  } = adminUserStore();
    const router = useRouter();


    const editUser = async (id: number) => {
        router.push({ name: 'admin.edit.user', params: { id: id } });
    }

    const pushRouteAddUser = async () => {
        router.push({ name: 'admin.add.user' });
    }

    const first = computed(() => {
        let result: number = 0

        if(setStateFilter.page && setStateFilter.limit){
            result = (setStateFilter.page - 1) * setStateFilter.limit
        }
        return result
    })

    async function onPageChange(event: DataTablePageEvent) {
        setStateFilter.page = event.page + 1; 
        setStateFilter.limit = event.rows;

        await fetchAll();
    }

    onMounted(async() => {
        await fetchAll();
    });

    const fetchAll = async() => {
        await getAll();
    }
</script>

<style scoped>
    .btn-right {
        display: flex;
        justify-content: flex-end;
    }
</style>