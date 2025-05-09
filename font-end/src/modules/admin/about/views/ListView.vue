<template>
    <div>
        <div class="card">
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <h2 class="mb-3">
                        {{ $t('table.title.about') }}
                    </h2>
                </span>
                <!-- <span class="w-full sm:w-auto flex-order-0 sm:flex-order-1 mb-4 sm:mb-0">
                    <Button 
                        :label="$t('button.add') + ' ' + $t('messages.policy')"
                        severity="info" 
                    />
                </span> -->
            </div>
            <DataTable 
                :value="state.data.props" 
                :loading="state.isLoading" 
                lazy
                tableStyle="min-width: 50rem"
                :totalRecords="state.data.total"
                @page="onPageChange"
                paginator
                :first="first"
                :rows="setStateFilter.limit"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                :currentPageReportTemplate="`${$t('table.pagination.show')} {first} ${$t('table.pagination.to')} {last} ${$t('table.pagination.from')} {totalRecords} ${$t('table.pagination.row')}`"

            >
                <Column field="id" :header="$t('table.header.index')">
                    <template #body="item">
                        {{ item.index + 1 }}
                    </template>
                </Column>
                <Column field="title" :header="$t('table.header.title')"></Column>
                <Column field="link_videos" :header="$t('table.header.link_videos')"></Column>
                <Column headerStyle="width: 10rem">
                    <template #body="{ data }">
                        <div class="flex flex-wrap gap-2 btn-right">
                            <Button 
                                type="button" 
                                icon="pi pi-pencil" 
                                rounded 
                                severity="warning"  
                                style="color: white;" 
                                @click="editItem(data.id)"
                                :disabled="validationPermissions(GET_PERMISSIONS.ABOUT_US.UPDATE)"
                            />
                            <!-- <Button 
                                type="button" 
                                icon="pi pi-trash" 
                                rounded 
                                severity="danger"
                            /> -->
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { onMounted, computed } from 'vue';
    import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
    import Column from 'primevue/column';
    import Button from 'primevue/button';
    import { adminAboutStore } from '../stores/store';
    import { useRoute, useRouter } from 'vue-router';
    import { validationPermissions } from '@/common/utils/validation-permissions';
    import { GET_PERMISSIONS } from '@/common/utils/const';


    const { push } = useRouter()
    
    const { query } = useRoute()

    const { getAll, state, setStateFilter } = adminAboutStore();

    const editItem = (id: string) => {
        push({ name: 'admin.edit.about', params: { id: id} });
    }

    async function onPageChange(event: DataTablePageEvent) {
        setStateFilter.page = event.page + 1;
        setStateFilter.limit = event.rows;

        const { page, limit } = setStateFilter
        push({ name: 'admin.about', query: { page, limit} })

        await getAll();
    }

    const first = computed(() => {
        let result: number = 0

        if(setStateFilter.page && setStateFilter.limit){
            result = (setStateFilter.page - 1) * setStateFilter.limit
        }
        return result
    })

    async function initComponent() {
        if (Object.keys(query).length !== 0) {
            setStateFilter.page = query.page ? Number(query.page) : 1
            setStateFilter.limit = query.limit ? Number(query.limit) : 10
            
            push({
                query: {
                    page: setStateFilter.page,
                    limit: setStateFilter.limit
                }
            })
        }
        await getAll()
    }

    
    onMounted(async () => {
        await initComponent();
    })
</script>

<style scoped>
    .card-first {
      height: 100px;
      border: 1px solid #ccc;
      padding: 10px;
    }
    .btn-right {
        display: flex;
        justify-content: flex-end;
    }
</style>