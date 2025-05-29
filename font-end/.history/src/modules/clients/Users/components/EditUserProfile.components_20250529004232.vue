<!-- components/EditUserModal.vue -->
<template>
  <div class="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg">
      <h2 class="text-xl font-semibold mb-4">ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້</h2>
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium">ຊື່</label>
            <input type="text" v-model="form.firstname" class="w-full border rounded p-2" />
          </div>
          <div>
            <label class="block text-sm font-medium">ນາມສະກຸນ</label>
            <input type="text" v-model="form.lastname" class="w-full border rounded p-2" />
          </div>
          <div>
            <label class="block text-sm font-medium">ອີເມວ</label>
            <input type="email" v-model="form.email" class="w-full border rounded p-2" />
          </div>
          <div>
            <label class="block text-sm font-medium">ເບີໂທ</label>
            <input type="text" v-model="form.phone" class="w-full border rounded p-2" />
          </div>
          <div class="col-span-2">
            <label class="block text-sm font-medium">ທີ່ຢູ່</label>
            <textarea v-model="form.address" class="w-full border rounded p-2"></textarea>
          </div>
        </div>

        <div class="flex justify-end mt-6 gap-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100">
            ຍົກເລີກ
          </button>
          <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            ບັນທຶກ
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps<{
  userData: {
    firstname: string
    lastname: string
    email: string
    phone: string
    address: string
  }
}>()

const emit = defineEmits(['submit', 'close'])

const form = reactive({ ...props.userData })

watch(() => props.userData, (newVal) => {
  Object.assign(form, newVal)
})

function submitForm() {
  emit('submit', form)
}
</script>
