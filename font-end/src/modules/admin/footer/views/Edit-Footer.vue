<template>
    <div class="card">
        <form @submit.prevent="submitForm">
            <div class="columns is-12 is-multiline">
                <div class="column is-12 is-mobile-12">
                    <label style="font-weight: bold;">
                        {{ $t('messages.shop_on')}}
                        <span class="text-red-500"> *</span>
                    </label>
                    <QuillEditor 
                        :toolbar="toolbarOptions"
                        v-model:content="getFooter.data.props.shop_on" 
                        content-type="html" 
                    />
                </div>
                <div class="column is-12 is-mobile-12" style="margin-top: 60px;">
                    <label style="font-weight: bold;">
                        {{ $t('messages.customer_service') }}
                        <span class="text-red-500"> *</span>
                    </label>
                    <QuillEditor 
                        :toolbar="toolbarOptions"
                        v-model:content="getFooter.data.props.customer_service" 
                        content-type="html" 
                    />
                </div>
                <div class="column is-12 is-mobile-12" style="margin-top: 60px;">
                    <label style="font-weight: bold;">
                        {{ $t('messages.payment_information')}}
                        <span class="text-red-500"> *</span>
                    </label>
                    <QuillEditor 
                        :toolbar="toolbarOptions"
                        v-model:content="getFooter.data.props.payment_information" 
                        content-type="html" 
                    />
                </div>
            </div>
            <p style="font-weight: bold; margin-top: 80px">{{ $t('messages.contact_us') }}</p>
            <Divider/>
            <br/>
            <div class="columns is-12 is-multiline">
                <div class="column is-6 is-mobile-12">
                    <my-input-text 
                        name="facebook" 
                        :label="$t('messages.facebook')" 
                        required 
                        :placeholder="$t('placeholder.inputText')"  
                        class="h-full" 
                    />
                </div>
                <div class="column is-6 is-mobile-12">
                    <my-input-text 
                        name="line" 
                        :label="$t('messages.line')" 
                        required 
                        :placeholder="$t('placeholder.inputText')"  
                        class="h-full" 
                    />
                </div>
                <div class="column is-6 is-mobile-12 is-margin-top">
                    <my-input-text 
                        name="wechat" 
                        :label="$t('messages.wechat')" 
                        required 
                        :placeholder="$t('placeholder.inputText')"  
                        class="h-full" 
                    />
                </div>
                <div class="column is-6 is-mobile-12 is-margin-top">
                    <my-input-text 
                        name="whatsapp" 
                        :label="$t('messages.whatsapp')" 
                        required 
                        :placeholder="$t('placeholder.inputText')"  
                        class="h-full" 
                    />
                </div>
                <div class="column is-6 is-mobile-12 is-margin-top">
                    <my-input-text 
                        name="email" 
                        :label="$t('messages.email')" 
                        required 
                        :placeholder="$t('placeholder.inputText')"  
                        class="h-full" 
                    />
                </div>
                <div class="column is-6 is-mobile-12 is-margin-top">
                    <my-input-text 
                        name="phone_number" 
                        :label="$t('messages.phone_number')" 
                        required 
                        :placeholder="$t('placeholder.inputText')"  
                        class="h-full" 
                    />
                </div>
                <div class="column is-12 is-mobile-12" style="text-align: right;">
                    <Button 
                        style="font-family: 'NotoSansLao','Montserrat', 'sans-serif'"
                        type="submit"
                        severity="info" 
                        :disabled="validationPermissions(GET_PERMISSIONS.FOOTER.UPDATE)"
                    >
                        <i class="pi pi-save" style="margin-right: 8px;"></i>
                        {{ $t('button.edit_data') }}
                    </Button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import Divider from 'primevue/divider';
    import MyInputText from '@/components/customComponents/FormInputText.vue';
    import Button from 'primevue/button';
    import { footerStore } from '../stores/store';
    import { onMounted } from 'vue';
    import { FooterEntity } from '../entities/entity';
    import { useForm } from 'vee-validate';
    import { footerSchema } from '../schema/shema';
    import { useI18n } from 'vue-i18n';
    import { useToast } from 'primevue/usetoast';
    import { QuillEditor } from "@vueup/vue-quill";
    import "@vueup/vue-quill/dist/vue-quill.snow.css";
    import { GET_PERMISSIONS } from '@/common/utils/const';
    import { validationPermissions } from '@/common/utils/validation-permissions';


    const { t } = useI18n();
    const toast = useToast();
    const footerId = "1";
    const toolbarOptions = [
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'image', 'video'],         
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }]
    ];

    const { form, state, update, getOne, getFooter } = footerStore();

    const translatedErrorMessages = {
        facebook: t('placeholder.inputText')
    }

    const { handleSubmit, setFieldValue, handleReset } = useForm<any>({
        validationSchema: footerSchema(translatedErrorMessages)
    })

    const submitForm = handleSubmit( async (value: any) => {
        form.id = footerId;
        form.facebook = value.facebook;
        form.whatsapp = value.whatsapp;
        form.wechat = value.wechat;
        form.line = value.line;
        form.email = value.email;
        form.phone = value.phone_number;
        form.shop_on = getFooter.data.props.shop_on;
        form.payment_information = getFooter.data.props.payment_information;
        form.customer_service = getFooter.data.props.customer_service;

        await update();

        if (state.error) {
            await showWarningValidateBackend();
        } else {
            await showToastSuccess();
            await handleReset();
            await fetchData();
        }
    })

    const showWarningValidateBackend = () => {
        toast.add({ severity: 'error', summary: t('toast.summary.error'), detail: `${state.error}`, life: 3000 });
    }

    const showToastSuccess = () => {
        toast.add({ severity: 'success', summary: t('toast.summary.success'), detail: t('toast.detail.successfully'), life: 3000 });
    }
  
    const fetchData = async () => {
        await getOne(footerId as FooterEntity);

        const response = getFooter.data.props;

        setFieldValue('facebook', response.facebook);
        setFieldValue('whatsapp', response.whatsapp);
        setFieldValue('wechat', response.wechat);
        setFieldValue('line', response.line);
        setFieldValue('email', response.email);
        setFieldValue('phone_number', response.phone);
    }

    onMounted(async () => {
        await fetchData();
    })
</script>

<style scoped>
    @import 'bulma/css/bulma.css';

    .is-margin-top {
        margin-top: -30px;
    }
</style>