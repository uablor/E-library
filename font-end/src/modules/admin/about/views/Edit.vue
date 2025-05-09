<template>
    <div class="card">
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span class="p-input-icon-left w-full sm:w-20rem flex-order-1 sm:flex-order-0">
                <h2 style="font-weight: bold; font-size: 20px;" class="arrow-left" @click="goBack">
                    <i class="pi pi-arrow-left" style="color: green"></i>
                    {{ $t('messages.about') }}
                </h2>
            </span>
        </div>
        <Divider/>
        <br/>
        <form @submit.prevent="submitForm">
            <div class="columns is-12 is-multiline">
                <div class="column is-12 is-mobile-12">
                    <my-input-text 
                        name="title" 
                        :label="$t('messages.title')" 
                        required 
                        :placeholder="$t('placeholder.inputText')"  
                        class="h-full" 
                    />
                </div>
                <div class="column is-12 is-mobile-12" style="margin-top: -30px;">
                    <my-input-text 
                        name="link_videos" 
                        :label="$t('messages.link_videos')" 
                        required 
                        :placeholder="$t('placeholder.inputText')"  
                        class="h-full" 
                    />
                </div>
                <div class="column is-12 is-mobile-12" style="margin-top: -30px;">
                    <label>
                        {{ $t('messages.description')}}
                        <span class="text-red-500"> *</span>
                    </label>
                    <QuillEditor 
                        :toolbar="toolbarOptions"
                        v-model:content="getById.data.props.description" 
                        content-type="html" 
                        style="display: flex" 
                    />
                </div>
            </div>
            <div class="column is-12 is-mobile-12" style="text-align: right;">
                <Button 
                    style="font-family: 'NotoSansLao','Montserrat', 'sans-serif'"
                    type="submit"
                    severity="info" 
                    :disabled="validationPermissions(GET_PERMISSIONS.ABOUT_US.UPDATE)"
                >
                    <i class="pi pi-save" style="margin-right: 8px;"></i>
                    {{ $t('button.edit_data') }}
                </Button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { useForm } from 'vee-validate';
    import { onMounted } from 'vue';
    import { adminAboutStore } from '../stores/store';
    import { useRoute, useRouter } from 'vue-router';
    import { PEntity } from '../entities/entity';
    import Button from 'primevue/button';
    import Divider from 'primevue/divider';
    import MyInputText from '@/components/customComponents/FormInputText.vue';
    import { QuillEditor } from "@vueup/vue-quill";
    import "@vueup/vue-quill/dist/vue-quill.snow.css";
    import { useI18n } from 'vue-i18n';
    import { useToast } from 'primevue/usetoast';
    import { validationPermissions } from '@/common/utils/validation-permissions';
    import { GET_PERMISSIONS } from '@/common/utils/const';


    const { getOne, getById, form, state, update } = adminAboutStore();

    const route = useRoute();
    const { t } = useI18n();
    const toast = useToast();
    const router = useRouter();

    const { handleSubmit, setFieldValue, handleReset } = useForm<any>({})

    const submitForm = handleSubmit( async (value: any) => {
        form.id = (route.params.id as string);
        form.title = value.title;
        form.link_videos = value.link_videos;
        form.description = getById.data.props.description;

        await update();

        if (state.error) {
            await showWarningValidateBackend();
        } else {
            await showToastSuccess();
            await handleReset();
            await getData();
        }
    })

    const toolbarOptions = [
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'image', 'video'],         
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }]
    ];

    const showWarningValidateBackend = () => {
        toast.add({ severity: 'error', summary: t('toast.summary.error'), detail: `${state.error}`, life: 3000 });
    }

    const showToastSuccess = () => {
        toast.add({ severity: 'success', summary: t('toast.summary.success'), detail: t('toast.detail.successfully'), life: 3000 });
    }

    const getData = async () => {
        await getOne(route.params.id as PEntity);

        const response = getById.data.props;
        setFieldValue('title', response.title);
        setFieldValue('link_videos', response.link_videos);
    }

    const goBack = async () => { 
        router.push({ name: 'admin.about'});
    }

    onMounted(async () => {
        await getData();
    })
</script>

<style scoped>
     @import 'bulma/css/bulma.css';

    .arrow-left:hover {
        cursor: pointer;
        color: green;
    }
</style>