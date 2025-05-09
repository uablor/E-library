<template>
  <div
    class="flex align-items-center justify-content-center min-h-screen lg:grid lg:nested-grid lg:m-0"
  >
    <div
      class="col-8 min-h-screen hidden lg:block backgroundImage bg-cover bg-center bg-no-repeat"
    />
    <div class="col-4 flex flex-column align-items-center">
      <div class="col-12 flex justify-content-center flex-column align-items-center">
        <div
          class="flex flex-column border-1 border-100 border-round-md p-5 shadow-1 lg:border-none lg:shadow-none"
        >
          <div class="flex flex-column align-items-center">
            <img src="https://logomaker.designfreelogoonline.com/media/productdesigner/logo/resized/1286_bird-01.png" style="width: 5rem" />
            <span class="font-bold text-3xl">UK LAOS</span>
          </div>
          <form @submit.prevent="loginUser()" class="mt-3">
            <div class="flex flex-column gap-3 mb-3">
                <div>
                    <span class="p-input-icon-left">
                    <my-input-text
                        name="email"
                        :label="$t('messages.email')"
                        class="w-18rem"
                        :placeholder="$t('placeholder.inputText')" 
                    />
                    </span>
                </div>
              <div style="margin-top: -30px;">
                <div class="password-input-container">
                  <my-input-text-password
                      :type="showPassword"
                      name="password"
                      :label="$t('messages.password')"
                      class="w-18rem"
                      required
                      :placeholder="$t('placeholder.inputText')" 
                  />
                  <span class="toggle-password" @click="togglePasswordVisibility">
                    <i :class="['pi', showPassword ? 'pi-eye-slash' : 'pi-eye']"></i>
                  </span>
                </div>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <Button
                class="w-full surface-500 border-none"
                type="submit"
                label="ເຂົ້າສູ່ລະບົບ"
                :loading="state.isLoading"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import MyInputText from '@/components/customComponents/FormInputText.vue'
  import MyInputTextPassword from '@/components/customComponents/FormInputPass.vue'
  import Button from 'primevue/button'
  import { useForm } from 'vee-validate';
  import { loginSchema } from '../schema/login.shema'
  import { useAuthStore } from '../stores/auth.store'
  import { useToast } from "primevue/usetoast";
  import { ref } from 'vue';

    const { form, state, login } = useAuthStore()
    const toast = useToast();
    const { handleSubmit, handleReset } = useForm<any>({
        validationSchema: loginSchema
    })

    const loginUser = handleSubmit(async (value) => {
      if (!value.email || !value.password) {
        await checkEmailPassword();
        return true;
      }

      await login(value);

      if (state.errorMessage) {
          showWarningValidateBackend();
      } else {
          showToastSuccess();
          handleReset();
      }
    })

    const showToastSuccess = () => {
        toast.add({ severity: 'success', summary: 'ສຳເລັດເເລ້ວ', detail: 'ຍີນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບ.', life: 3000 });
    }

    const checkEmailPassword = () => {
        toast.add({ severity: 'error', summary: 'ລອງໃໝ່', detail: 'ກວດສອບອີເມວ ຫຼື ລະຫັດຜ່ານກ່ອນ.', life: 3000 });
    }

    const showWarningValidateBackend = () => {
        toast.add({ severity: 'error', summary: 'ເເຈ້ງເຕືອນ', detail: `${state.errorMessage}`, life: 3000 });
    }

    const showPassword = ref(false);
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
</script>

<style scoped>
    .backgroundImage {
        background: url('https://www.journeyera.com/wp-content/uploads/2022/01/luxury-5-star-hotels-kathmandu-thamel-251085752.jpg');
    }
    
    .password-input-container {
      position: relative;
    }

    .password-input {
      padding-right: 30px; /* Adjust as needed based on icon size */
    }

    .toggle-password {
      position: absolute;
      top: 68%;
      right: 8px; /* Adjust as needed */
      transform: translateY(-50%);
      cursor: pointer;
    }
</style>