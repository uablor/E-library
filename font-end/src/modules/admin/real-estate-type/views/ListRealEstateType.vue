<template>
    <div>
        <!-- Right Card -->
        <div class="card card-first">
            <form @submit.prevent="isEditing ? onUpdate() : onSubmit()" class="flex flex-column gap-3 h-full">
                <div class="col-12 md:col-12 flex flex-row">
                    <div class="col-12 md:col-10">
                        <div class="flex flex-column h-full">
                            <my-input-text 
                                ref="autoFocusCursor"
                                name="name" 
                                :label="$t('messages.name')"
                                required 
                                :placeholder="$t('placeholder.inputText')" 
                                class="h-full" 
                            />
                        </div>
                    </div>
                    <div class="col-12 md:col-2">
                        <Button 
                            type="submit" 
                            severity="warning"
                            :loading="state.btnLoading"
                            :disabled="validationPermissions(GET_PERMISSIONS.REAL_ESTATE_TYPE.CREATE)"
                        >
                            <i :class="`${isEditing ? 'pi pi-pencil' : 'pi pi-plus-circle'}`" style="margin-right: 8px;"></i>
                            {{ isEditing ? $t('button.edit') : $t('button.save') }}
                        </Button>
                    </div>
                </div>
            </form>
        </div>


        <div class="card">
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                    <h2 class="mb-3">
                        {{ $t('table.title.real_estate_type') }}
                    </h2>
                </span>
                <span class="w-full sm:w-auto flex-order-0 sm:flex-order-1 mb-4 sm:mb-0">
                    <Button 
                        icon="pi pi-refresh" 
                        rounded 
                        severity="warning" 
                        @click="RefreshData()"
                        :loading="state.btnLoading"
                    />
                </span>
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
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                        <i class="pi pi-search" style="margin-top: -10px"/>
                        <input-text
                            v-model="filteredName"
                            :placeholder="$t('placeholder.textSearch')" 
                            style="font-family: NotoSansLao, Montserrat"
                            class="w-full"
                            @keyup.enter="onSearch"
                            @input="onClearSearch"
                        />
                        </span>
                    </div>
                    </template>
                    <Column field="id" :header="$t('table.header.index')" style="width: 25%">
                        <template #body="item">
                            {{ item.index + 1 }}
                        </template>
                    </Column>
                <Column field="name" :header="$t('table.header.name')" style="width: 25%"></Column>
                <Column :header="$t('table.header.lang')">
                    <template #body="slotProps">
                        {{ conCatString(slotProps.data.langs) }}
                    </template>
                </Column>
                <Column headerStyle="width: 10rem">
                    <template #body="{ data }">
                        <div class="flex flex-wrap gap-2 btn-right">
                            <Button 
                                type="button" 
                                icon="pi pi-language" 
                                rounded 
                                severity="info"  
                                style="color: white;" 
                                @click="editItem(data)"
                                :disabled="validationPermissions(GET_PERMISSIONS.REAL_ESTATE_TYPE.UPDATE)"
                            />
                            <Button 
                                type="button" 
                                icon="pi pi-pencil" 
                                rounded 
                                severity="warning"  
                                style="color: white;" 
                                @click="editItem(data)"
                                :disabled="validationPermissions(GET_PERMISSIONS.REAL_ESTATE_TYPE.UPDATE)"
                            />
                            <Button 
                                type="button" 
                                icon="pi pi-trash" 
                                rounded 
                                severity="danger"
                                @click="confirmDelete(data.id)" 
                                :disabled="validationPermissions(GET_PERMISSIONS.REAL_ESTATE_TYPE.DELETE)"
                            />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
    import Column from 'primevue/column';
    import InputText from 'primevue/inputtext'
    import Button from 'primevue/button'
    import { realEstateTypeStore } from '../stores/real-estate-type.store';
    import { useToast } from "primevue/usetoast";
    import { useForm } from 'vee-validate'
    import MyInputText from '@/components/customComponents/FormInputText.vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useConfirm } from "primevue/useconfirm";
    import { useI18n } from 'vue-i18n';
    import { realEstateTypeSchema } from '../schema/real-estate-type.shema';
    import { RealEstateTypeEntity } from '../entities/real-estate-type.entity';
    import { validationPermissions } from '@/common/utils/validation-permissions';
    import { GET_PERMISSIONS } from '@/common/utils/const';
    import { conCatString } from '@/common/utils/concat';

    const { t } = useI18n();
    const toast = useToast();
    const confirm = useConfirm();

    const isEditing = ref(false);
    const autoFocusCursor = ref();
    const { push } = useRouter()
    const { query } = useRoute()

    const { register, update, remove, getAll, form, state, setStateFilter } = realEstateTypeStore();

    const translatedErrorMessages = {
        name: t('placeholder.inputText')
    }
    const { handleSubmit, handleReset, setFieldValue } = useForm<any>({
        validationSchema: realEstateTypeSchema(translatedErrorMessages)
    })

    const RefreshData = async() => {
        state.btnLoading = true;
        isEditing.value = false;

        if (setStateFilter.filter) {
            setStateFilter.filter.name = '';
        }
        
        await handleReset();
        await initComponent();
        state.btnLoading = false;
    }

    const deleteItem = async (id: RealEstateTypeEntity) => {
        await remove(id);
    }

    const editItem = async (value: RealEstateTypeEntity) => {
        isEditing.value = true;

        setFieldValue('id', value.id);
        setFieldValue('name', value.name);
        
        scrollToInput();
    }

    const onUpdate = handleSubmit(async(values) => {
        form.id = values.id;
        form.name = values.name;

        await update();

        if (state.error) {
            showWarningValidateBackend();
        } else {
            showToastSuccess();
            handleReset();
            isEditing.value = false;
        }
    });
    
    const onSubmit = handleSubmit(async (values) => {
        form.name = values.name;

        await register();
        
        if (state.error) {
            showWarningValidateBackend();
        } else {
            showToastSuccess();
            handleReset();
        }
    })

    async function onPageChange(event: DataTablePageEvent) {
        setStateFilter.page = event.page + 1;
        setStateFilter.limit = event.rows;

        const { page, limit, filter } = setStateFilter
        push({ name: 'real.estate.type', query: { page, limit, search: filter?.name ? filter.name : undefined } })

        await getAll();
    }

    const first = computed(() => {
        let result: number = 0

        if(setStateFilter.page && setStateFilter.limit){
            result = (setStateFilter.page - 1) * setStateFilter.limit
        }
        return result
    })

    const confirmDelete = async (id: RealEstateTypeEntity) => {
        confirm.require({
            message: t('confirmDelete.message'),
            header: t('confirmDelete.header'),
            rejectLabel: t('confirmDelete.rejectLabel'),
            acceptLabel: t('confirmDelete.acceptLabel'),
            rejectClass: 'p-button-secondary p-button-outlined',
            acceptClass: 'p-button-danger',
            accept: async () => {
                await deleteItem(id)
                toast.add({ severity: 'success', summary: t('toast.summary.delete'), detail: t('toast.detail.delete'), life: 3000 });
            },
            reject: () => {
                toast.add({ severity: 'error', summary: t('toast.summary.cancel_delete'), detail: t('toast.detail.cancel_delete'), life: 3000 });
            }
        });
    }

    const showToastSuccess = () => {
        toast.add({ severity: 'success', summary: t('toast.summary.success'), detail: t('toast.detail.successfully'), life: 3000 });
    }

    const showWarningValidateBackend = () => {
        toast.add({ severity: 'error', summary: t('toast.summary.error'), detail: `${state.error}`, life: 3000 });
    }

    async function initComponent() {
        if (Object.keys(query).length !== 0) {
            setStateFilter.page = query.page ? Number(query.page) : 1
            setStateFilter.limit = query.limit ? Number(query.limit) : 10
            
            if (setStateFilter.filter?.name === '') {
                setStateFilter.filter.name = query.search ? (query.search as string) : '';
                push({ query: { page: setStateFilter.page, limit: setStateFilter.limit, search: undefined } })
            } else {
                push({
                    query: {
                        page: setStateFilter.page,
                        limit: setStateFilter.limit,
                        search: setStateFilter.filter?.name,
                    }
                })
            }
        }
        await getAll()
    }

    
    onMounted(async () => {
        setStateFilter.limit = 10;
        await initComponent();
    })

    const filteredName = computed<string>({
        get: () => setStateFilter.filter!.name,
        set: (value) => {
            if (setStateFilter.filter) {
                setStateFilter.filter.name = value;
            } else {
                setStateFilter.filter = { name: value };
            }
        }
    })


    async function onSearch() {
        await getAll();
    }

    async function onClearSearch(e: any) {
        if (e.target.value === '') {
            if (setStateFilter.filter?.name !== undefined) {
                setStateFilter.filter.name = ''
            }
            
            push({ query: { name: undefined } })

            await getAll()
        }
    }

    const scrollToInput = () => {
        // Ensure nameInput is available
        if (autoFocusCursor.value) {
            const inputElement = autoFocusCursor.value.$el;
            const inputRect = inputElement.getBoundingClientRect();

            // Check if the input is already in the viewport
            if (inputRect.top >= 0 && inputRect.bottom <= window.innerHeight) {
                inputElement.querySelector('input')?.focus();
            } else {
                // If not, scroll to the input element
                window.scrollTo({
                    top: window.scrollY + inputRect.top - window.innerHeight / 2,
                    behavior: 'smooth',
                });

                // Focus on the input after scrolling completes
                setTimeout(() => {
                    inputElement.querySelector('input')?.focus();
                }, 500); // Adjust the timeout based on your scroll duration
            }
        }
    };
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