<template>
    <div class="card">
        <div class="columns is-12 is-multiline">
            <div class="column is-12 is-mobile-12">
                <label style="font-weight: bold;">
                    {{ $t('messages.shop_on')}}
                    <span class="text-red-500"> *</span>
                </label>
                <Editor editorStyle="min-height: 200px" style="margin-top: 10px;" />
            </div>
            <div class="column is-12 is-mobile-12">
                <label style="font-weight: bold;">
                    {{ $t('messages.customer_service')}}
                    <span class="text-red-500"> *</span>
                </label>
                <Editor editorStyle="min-height: 200px" style="margin-top: 10px;" />
            </div>
            <div class="column is-12 is-mobile-12">
                <label style="font-weight: bold;">
                    {{ $t('messages.payment_information')}}
                    <span class="text-red-500"> *</span>
                </label>
                <Editor editorStyle="min-height: 200px" style="margin-top: 10px;" />
            </div>
        </div>
       
        <p style="font-weight: bold;">{{ $t('messages.contact_us') }}</p>
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
            <div class="column is-4 is-mobile-12">
                <my-input-text 
                    name="whatsapp" 
                    :label="$t('messages.whatsapp')" 
                    required 
                    :placeholder="$t('placeholder.inputText')"  
                    class="h-full" 
                />
            </div>
            <div class="column is-4 is-mobile-12">
                <my-input-text 
                    name="email" 
                    :label="$t('messages.email')" 
                    required 
                    :placeholder="$t('placeholder.inputText')"  
                    class="h-full" 
                />
            </div>
            <div class="column is-4 is-mobile-12">
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
                >
                    <i class="pi pi-save" style="margin-right: 8px;"></i>
                    {{ $t('button.edit_data') }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Editor from 'primevue/editor';
    import Divider from 'primevue/divider';
    import MyInputText from '@/components/customComponents/FormInputText.vue';
    import Button from 'primevue/button';


</script>

<style scoped>
    @import 'bulma/css/bulma.css';

</style>