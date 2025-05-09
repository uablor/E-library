<template>
    <div class="card">
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                <h2 style="font-weight: bold; font-size: 20px;" class="arrow-left" @click="goBack">
                    <i class="pi pi-arrow-left" style="color: green"></i>
                    {{ $t('messages.form_register') }}
                </h2>
            </span>
        </div>
        <Divider/>
        <br/>
        <form @submit.prevent="onSubmit()" class="flex flex-column gap-3 h-full">
            <div class="columns is-12 is-multiline">
                <div class="column is-3 is-mobile-12">
                    <my-input-text 
                        ref="autoFocusCursor"
                        name="name" 
                        :label="$t('messages.name')"
                        required 
                        :placeholder="$t('placeholder.inputText')" 
                        class="h-full" 
                    />
                </div>
                <div class="column is-3 is-mobile-12">
                    <my-input-text 
                        ref="autoFocusCursor"
                        name="email" 
                        :label="$t('messages.email')"
                        required 
                        :placeholder="$t('placeholder.inputText')" 
                        class="h-full" 
                    />
                </div>
                <div class="column is-3 is-mobile-12">
                    <label>
                        {{ $t('messages.role') }}
                        <span class="text-red-500"> *</span>
                    </label>
                    <Dropdown 
                        style="margin-top: 7px;"
                        v-model="form.roleId" 
                        :options="allRole.data.props" 
                        optionLabel="name" 
                        :placeholder="$t('placeholder.dropdownSelect')" 
                        class="w-full" 
                        optionValue="id"
                        :highlightOnSelect="true" 
                    />
                </div>
                <div class="column is-3 is-mobile-12">
                    <my-input-file 
                        name="profile" 
                        :label="$t('messages.profile')" 
                        required 
                        :multiple="true"
                        class="h-full" 
                        @change="handleFileChange"
                    />
                </div>
            </div>
            <p style="font-size: 18px; font-weight: bold;">
                <i class="pi pi-users"></i>
                <span style="width: 10px;"></span>
                {{ $t('messages.permission') }}
            </p>
            <Divider/>
            <div class="columns is-12 is-multiline" v-for="(item, index) in allPermission.data.props" :key="index">
                <div class="column is-12 is-mobile-12" style="font-size: 18px; font-weight: bold;">
                    <i class="pi pi-check-circle" style="color: green"></i> {{ item.name }}
                </div>

                <div class="column is-4 is-mobile-12" v-for="(per, idx) in item.permissions" :key="idx">
                    <label class="checkbox ml-2">
                        <Checkbox v-model="form.permissionIds" :inputId="'permission_' + idx" :name="'permission_' + idx" :value="per.id" />
                        {{ per.name }}
                    </label>
                </div>
            </div>
            <Divider style="margin-top: -10px;"/>
            <br/>
            <div style="text-align: right;">
                <Button type="submit" :label="$t('button.edit_data')" :loading="state.btnLoading" />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import MyInputText from '@/components/customComponents/FormInputText.vue';
    import { adminUserStore } from '../stores/user.store';
    import { onMounted, ref } from 'vue';
    import Dropdown from 'primevue/dropdown';
    import Divider from 'primevue/divider';
    import Checkbox from 'primevue/checkbox';
    import Button from 'primevue/button';
    import { useToast } from 'primevue/usetoast';
    import { useI18n } from 'vue-i18n';
    import { useForm } from 'vee-validate';
    import MyInputFile from '@/components/customComponents/FormInputFile.vue';
    import { editUserServiceSchema } from '../schemas/user.schema';
    import { useRoute, useRouter } from 'vue-router';
    import { showNotificationToast } from '@/common/utils/toast';
    import { uploadFileToServer } from '@/common/utils/upload-file';
    import { isValidFileSize, validFileTypes } from '@/common/utils/validation.file';
    import axios from 'axios';
    

    const { form, update, getAllRole, getAllPermission, allPermission, allRole, state, getOne, userGetByOne  } = adminUserStore();
    const toast = useToast();
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();

    const permissionIds = ref<number[]>([]);

    const translatedErrorMessages = {
        name: t('placeholder.inputText'),
        email: t('placeholder.inputText')
    }

    const { handleSubmit, setFieldValue } = useForm<any>({
        validationSchema: editUserServiceSchema(translatedErrorMessages)
    })

    const onSubmit = handleSubmit(async (value) => {
        form.id = String(route.params.id);
        form.name = value.name;
        form.email = value.email;
        form.password = value.password;
        form.password_confirmation = value.password_confirmation;
        form.profile = selectedImage.value;

        await update();

        if (state.error) {
            await showWarningValidateBackend();
        } else {
            await showToastSuccess();
            selectedImage.value = "";
            const inputFile = document.getElementById('profile') as HTMLInputElement;
            inputFile.value = '';
        }   
    })

    const selectedImage = ref();
    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];

        if (! await validFileTypes(file)) {
            await showNotificationToast({ toast, error: 'error', summary: t("toast.summary.error"), detail: t("toast.summary.profile_valid_file_mimes") });
            event.target.value = '';
            return;
        }
        if (! await isValidFileSize(file)) {
            await showNotificationToast({ toast, error: 'error', summary: t("toast.summary.error"), detail: t("toast.summary.profile_valid_file_size") });
            event.target.value = '';
            return;
        }

        await uploadFileToServer({ axios, file, state, selectedImage, toast, t });
    }

    onMounted(async() => {
        const id = Number(route.params.id);
        await getOne(id);
        await getAllRole();
        await getAllPermission();

        form.roleId = userGetByOne.data.props.role ? userGetByOne.data.props.role.id : undefined;
        setFieldValue('name', userGetByOne.data.props.name);
        setFieldValue('email', userGetByOne.data.props.email);

        const permissions = userGetByOne.data.props.permissions;
        if (permissions) {
            
            permissions.forEach((per: any) => {
                permissionIds.value.push(per.id);
            });

            form.permissionIds = permissionIds.value;
        }
    })

    const goBack = async () => { 
        router.push({ name: 'admin.user'});
    }
    
    const showWarningValidateBackend = () => {
        toast.add({ severity: 'error', summary: t('toast.summary.error'), detail: `${state.error}`, life: 3000 });
    }

    const showToastSuccess = () => {
        toast.add({ severity: 'success', summary: t('toast.summary.success'), detail: t('toast.detail.successfully'), life: 3000 });
    }

</script>

<style scoped>
    @import 'bulma/css/bulma.css';

    .arrow-left:hover {
        cursor: pointer;
        color: green;
    }
</style>