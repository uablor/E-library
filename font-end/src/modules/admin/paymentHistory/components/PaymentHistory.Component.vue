<template>
    <Dialog 
        v-model:visible="visible" 
        modal 
        :header="$t('dialog.header.update_payment_service')" 
        :style="{ width: '50vw'}" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
    <div>
        <br/>
        <Fieldset :legend="$t('messages.info') + ' ' + $t('messages.owner') + ' & ' + $t('messages.real_estate')">
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span>
                    {{$t('messages.owner')}}: {{ props.data.real_estate_list.owner_name }}
                </span>
                <span>
                    {{$t('messages.name')}}: {{ props.data.real_estate_list.agent_name }}
                </span>
                <span>
                    {{$t('messages.phone_number')}}: {{ props.data.real_estate_list.account.tel }}
                </span>
                <span>
                    {{$t('messages.address')}}: {{ props.data.real_estate_list.account.address }}
                </span>
            </div>
            <br/>
            <Divider/>
            <br/>
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span>
                    {{$t('messages.real_estate_number')}}: {{ props.data.real_estate_list.real_esate_number }}
                </span>
                <span>
                    {{$t('messages.real_estate_name')}}: {{ props.data.real_estate_list.name }}
                </span>
                <span>
                    {{$t('messages.realestate_type')}}: {{ props.data.service_charge_list.real_estate_type.name }}
                </span>
            </div>
            <br/>
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span>
                    {{ $t('messages.service_model') }}: {{ props.data.real_estate_list.service_model }}
                </span>
                <span>
                    {{$t('messages.room_type')}}: {{ props.data.real_estate_list.room_type }}
                </span>
                <span>
                    {{$t('messages.total_bed')}}: {{ props.data.real_estate_list.total_bed }}
                </span>
                <span>
                    {{ $t('messages.total_bath') }}: {{ props.data.real_estate_list.total_bath }}
                </span>
            </div>
            <br/>
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span>
                    {{$t('messages.garage')}}: {{ props.data.real_estate_list.garage }}
                </span>
                <span>
                    {{ $t('messages.wide') }}: {{ props.data.real_estate_list.wide }}
                </span>
                <span>
                    {{$t('messages.long')}}: {{ props.data.real_estate_list.long }}
                </span>
                <span>
                    {{$t('messages.address')}}: {{ props.data.real_estate_list.village }}
                </span>
            </div>
        </Fieldset>
        <br/>
        <Fieldset :legend="$t('messages.info') + ' ' + $t('messages.service_charge')">
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span>
                    {{$t('messages.service_charge')}}: 
                    {{ conCatServiceChargePrices(props.data.payment_service_charges) }}
                    ({{ props.data.qty }} / {{ props.data.unit_price }})
                </span>
            </div>
            <br/>
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                <span>
                    {{$t('messages.total_price')}}: {{ conCatAndTotalServiceChargePrices(props.data.payment_service_charges, props.data.qty) }}
                </span>
            </div>
            <br/>
            <div>
                <span>
                    {{$t('messages.status')}}: {{ props.data.status }}
                </span>
                <span style="margin-left: 40px;"></span>
                <span>
                    {{$t('messages.payment_date')}}: {{ props.data.date_payment }}
                </span>
            </div>
            <br/>
            <div>
                <span>
                    {{$t('messages.from_date')}}: {{ props.data.from_date }}
                </span>
                <span style="margin-left: 40px;"></span>
                <span>
                    {{$t('messages.to_date')}}: {{ props.data.to_date }}
                </span>
            </div>
        </Fieldset>
        <br/>
        <Divider/>
        <br/>
        <div style="text-align: right;">
            <Button 
                :label="$t('messages.confirm')" 
                @click="updatePayment(props.data.id, 'confirm')" 
                :disabled="validationPermissions(GET_PERMISSIONS.PAYMENT_HISTORY.CONFIRM)"
            />
            <span style="margin-left: 10px;">
                <Button 
                    :label="$t('messages.reject')" 
                    severity="danger" 
                    @click="updatePayment(props.data.id, 'reject')" 
                    :disabled="validationPermissions(GET_PERMISSIONS.PAYMENT_HISTORY.REJECT)"
                />
            </span>
        </div>
    </div>
    </Dialog>
</template>
<script setup lang="ts">
    import Dialog from 'primevue/dialog';
    import { ref } from 'vue';
    import Fieldset from 'primevue/fieldset';
    import Divider from 'primevue/divider';
    import Button from 'primevue/button';
    import { paymentServiceHistoryStore } from '../stores/payment-history.store';
    import { useI18n } from 'vue-i18n';
    import { useToast } from 'primevue/usetoast';
    import { conCatAndTotalServiceChargePrices, conCatServiceChargePrices } from '@/common/utils/concat';
    import { GET_PERMISSIONS } from '@/common/utils/const';
    import { validationPermissions } from '@/common/utils/validation-permissions';

    const { form, state, updatePaymentService } = paymentServiceHistoryStore();

    const toast = useToast();
    const { t } = useI18n();
    
    const visible = ref<boolean>(false);
    defineExpose({ visible });
    const emit = defineEmits<{ (e: 'onSuccess'): void; (e: 'onHide'): void }>();

    const props = defineProps<{
      data: any
    }>()

    const updatePayment = async (id: string, type: string) => {
        form.id = id;
        form.type = type;

        await updatePaymentService(form);

        if (state.error) {
            await showWarningValidateBackend();
        } else {
            await clearData();
            await showToastSuccess();
            visible.value = false;
        }
    }

    const clearData = async () => {
        emit('onSuccess');

        form.id = "";
        form.type = "";
    }
    const showWarningValidateBackend = () => {
        toast.add({ severity: 'error', summary: 'ເກີດຂໍ້ຜິດພາດ.', detail: `${state.error}`, life: 3000 });
    }
    const showToastSuccess = () => {
        toast.add({ severity: 'success', summary: t('toast.summary.success'), detail: t('toast.detail.successfully'), life: 3000 });
    }
</script>