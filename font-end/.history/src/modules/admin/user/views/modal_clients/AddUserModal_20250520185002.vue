<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-opacity-70 flex items-center justify-center" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
      <h2 class="text-xl font-bold mb-4">
        {{ user.code_student ? 'ແກ້ໄຂຜູ້ໃຊ້' : 'ເພີ່ມຜູ້ໃຊ້ໃໝ່' }}
      </h2>

      <button class="absolute top-2 right-2 text-gray-600 hover:text-red-500" @click="$emit('close')">✕</button>

      <form @submit.prevent="handleSave">
        <div class="grid grid-cols-2 gap-4">
          <div>

            <div >
              <div class="ml-25" >
                <img src="../../../../../assets/images/profile-one.webp" alt="no image" width="100" height="100"/>
              </div>
              <label class="block text-sm font-medium">ຮູບຜູ້ໃຊ້</label>
              <input type="file"  class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium">ລະຫັດນັກຮຽນ</label>
              <input v-model="localUser.code_student" class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium">ຊື່ຜູ້ໃຊ້</label>
              <input v-model="localUser.username" class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium">ອີເມວ</label>
              <input v-model="localUser.email" class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium">ຊື່ແທ້</label>
              <input v-model="localUser.firstname" class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium">ວັນເກີດ</label>
              <input type="date" v-model="localUser.birthday" class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium">ທີ່ຢູ່</label>
            <input v-model="localUser.address" class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium">ພະແນກ</label>
            <input v-model="localUser.department" class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium">ເບີໂທ</label>
            <input v-model="localUser.phone" class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">ຍົກເລີກ</button>
          <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">ບັນທຶກ</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup leng="ts">
import { watch, reactive, toRefs } from 'vue'

const props = defineProps({
  show: Boolean,
  user: Object,
})

const emit = defineEmits(['close', 'save'])

const localUser = reactive({})

// Watch for changes in the passed-in user prop
watch(
  () => props.user,
  (newUser) => {
    Object.assign(localUser, newUser || {})
  },
  { immediate: true }
)

function handleSave() {
  emit('save', { ...localUser })
}
</script>

<style scoped>

</style>
