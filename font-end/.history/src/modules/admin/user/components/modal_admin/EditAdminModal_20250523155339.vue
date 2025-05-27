<!-- src/components/modals/EditUserModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white w-full max-w-xl rounded-lg shadow p-6 relative">
      <h2 class="text-xl font-bold mb-4  p-4">ເເກ້ໄຂຜູ້ໃຊ້</h2>

      <form @submit.prevent="submitEdit" class="flex gap-5 justify-between">
        <div>
          
        </div>
       <div>
            <div >
              <div class="ml-25" >
                <img src="../../../../../assets/images/profile-one.webp" alt="no image" width="100" height="100"/>
              </div>
              <label class="block text-sm font-medium">ຮູບຜູ້ໃຊ້</label>
              <input type="file"  class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
         
         
           <div class="mb-4">
             <label class="block text-gray-700">ຊື່ຜູ້ໃຊ້</label>
             <input v-model="form.username" type="text" class="w-full border rounded px-3 py-2 mt-1" />
           </div>
         
           <div class="mb-4">
             <label class="block text-gray-700">ອີເມວ</label>
             <input v-model="form.email" type="email" class="w-full border rounded px-3 py-2 mt-1" />
           </div>
         
          
      
       </div>
<div>
  
  
    <!-- Boolean checkboxes -->
    <div class="grid grid-cols-2 gap-4">
      <label class="flex items-center space-x-2">
        <input v-model="form.is_staff" type="checkbox" />
        <span>Is Staff</span>
      </label>
  
      <label class="flex items-center space-x-2">
        <input v-model="form.is_active" type="checkbox" />
        <span>Is Active</span>
      </label>
  
      <label class="flex items-center space-x-2">
        <input v-model="form.is_superuser" type="checkbox" />
        <span>Is Superuser</span>
      </label>
  
      <label class="flex items-center space-x-2">
        <input v-model="form.is_verify" type="checkbox" />
        <span>Is Verified</span>
      </label>
    </div>
  
    <div class="flex justify-end mt-4">
      <button type="button" @click="close" class="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
    </div>
</div>
      </form>

      <button @click="close" class="absolute top-2 right-2 text-gray-500 hover:text-black">&times;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watchEffect } from 'vue'

const props = defineProps({
  show: Boolean,
  userData: Object,
  boolenstatus: Boolean
})

const emit = defineEmits(['close', 'update','changeBoolenstatus'])
function close() {
  emit('close') // This should notify the parent to close the modal
   emit('changeBoolenstatus', true)
}
function submitEdit() {
  // code to handle form submission goes here
  emit('update', form.value)
}
const form = ref({

  username: '',
  email: '',
  is_staff: false,
  is_active: false,
  is_superuser: false,
  is_verify: false
})

watchEffect(() => {
  if (props.show && props.userData) {
    form.value = { ...props.userData } as typeof form.value;

  }
})

</script>
