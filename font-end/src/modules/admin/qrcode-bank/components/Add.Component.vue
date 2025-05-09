<template>
    <Dialog 
        v-model:visible="visible" 
        modal 
        @hide="clearData"
        :header="$t('messages.qrcode_bank')" 
        :style="{ width: '50vw' }" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <form @submit.prevent="onSubmit()" class="flex flex-column gap-3 h-full">
            <div class="flex flex-column align-items-center justify-content-center">
                <div class="col-12 md:col-12">
                    <div class="flex flex-column">
                        <my-input-file 
                            name="qrcode" 
                            :label="$t('messages.qrcode_bank')" 
                            required 
                            :multiple="true"
                            class="h-full" 
                            @change="handleProfileFileChange"
                        />
                    </div>
                </div>
                <Divider/>
                <br/>
                <div class="col-12 md:col-12">
                    <div class="flex flex-column">
                        <Button type="submit" :label="$t('button.add') + ' ' + $t('messages.qrcode_bank')" :loading="props.state.btnLoading"/>
                    </div>
                </div>
            </div>
        </form>
    </Dialog>
</template>

<script setup lang="ts">
    import Dialog from 'primevue/dialog';
    import { ref } from 'vue';
    import MyInputFile from '@/components/customComponents/FormInputFile.vue';
    import { useI18n } from 'vue-i18n';
    import { useToast } from 'primevue/usetoast';
    import { validFileTypes, isValidFileSize } from '@/common/utils/validation.file';
    import { showNotificationToast } from '@/common/utils/toast';
    import { uploadFileToServer } from '@/common/utils/upload-file';
    import axios from 'axios';
    import Divider from 'primevue/divider';
    import Button from 'primevue/button';

    const { t } = useI18n();
    const toast = useToast();

    const visible = ref<boolean>(false);
    defineExpose({ visible });
    const emit = defineEmits<{ (e: 'onSuccess'): void; (e: 'onHide'): void }>();

    const props = defineProps<{
      form: any,
      state: any,
      register: any
    }>();


    const selectedQrcode = ref();
    const handleProfileFileChange = async (event: any) => {
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

        await uploadFileToServer({ axios, file, state: props.state, selectedImage: selectedQrcode, toast, t });
    }

    const onSubmit = async () => {
        if (selectedQrcode.value) {
            props.form.filename = selectedQrcode.value;

            await props.register();

            if (props.state.error) {
                await showWarningValidateBackend();
            } else {
                await clearData();
                await showToastSuccess();
                visible.value = false;
            }
        } else {
            await showWarningValidate();
        }
    }

    const clearData = async () => {
        props.form.filename = '';
        selectedQrcode.value = "";
        const inputFile = document.getElementById('qrcode') as HTMLInputElement;
        inputFile.value = '';
        emit('onSuccess');
    }

    const showWarningValidate = () => {
        toast.add({ severity: 'error', summary: t('toast.summary.error'), detail: t('placeholder.dropdownSelect'), life: 3000 });
    }

    const showWarningValidateBackend = () => {
        toast.add({ severity: 'error', summary: t('toast.summary.error'), detail: `${props.state.error}`, life: 3000 });
    }

    const showToastSuccess = () => {
        toast.add({ severity: 'success', summary: t('toast.summary.success'), detail: t('toast.detail.successfully'), life: 3000 });
    }
</script>
