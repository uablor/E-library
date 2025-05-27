<!-- src/components/modals/EditUserModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50"
    style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white w-full max-w-xl rounded-lg shadow p-6 relative">
      <h2 class="text-xl font-bold mb-4  p-4">ເເກ້ປື້ມເອກະສານ</h2>

      <form @submit.prevent="submitEdit" class="flex gap-5 justify-between">
        <div>
          <div>
            <div class="ml-25">
              <img src="../../../../../assets/images/book5.jpg" alt="no image" width="100" height="100" />
            </div>
            <label class="block text-sm font-medium">ຮູບປື້ມ</label>
            <input type="file"
              class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium">ຫົວຂໍ້</label>
            <input v-model="form.title"
              class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium">ຜູ້ຂຽນ</label>
            <input v-model="localUser.author"
              class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium">ໝາຍເລກປຶ້ມ</label>
            <input v-model="localUser.isbn"
              class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

        </div>
        <div>
          <div>
              <label class="block text-sm font-medium">ຜູ້ຈັດພິມ</label>
              <input v-model="localUser.publisher"
                class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium">ມື້ພິມອອກ</label>
              <input type="date" v-model="localUser.publish_date"
                class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium mt-1">ໝວດໝູ່</label>
              <select v-model="localUser.category"
                class="mt-2 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="" disabled selected>-- ເລືອກໝວດໝູ່ --</option>
                <option value="ວິທະຍາສາດ">ວິທະຍາສາດ</option>
                <option value="ປະຫວັດສາດ">ປະຫວັດສາດ</option>
                <option value="ວັນນະຄະດີ">ວັນນະຄະດີ</option>
                <option value="ອື່ນໆ">ອື່ນໆ</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium">ປະເພດ</label>
              <select v-model="localUser.type"
                class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="" disabled selected>-- ເລືອກປະເພດ --</option>
                <option value="ປື້ມໃໝ່">ປື້ມໃໝ່</option>
                <option value="ປື້ມໃຊ້ແລ້ວ">ປື້ມໃຊ້ແລ້ວ</option>
                <option value="ອື່ນໆ">ອື່ນໆ</option>
              </select>
            </div>

          </div>
      </form>

      <button @click="close" class="absolute top-2 right-2 text-gray-500 hover:text-black">&times;</button>
    </div>
  </div>
</template>

<script setup leng="ts">
import { ref, defineProps, defineEmits, watchEffect } from 'vue'

const props = defineProps({
  show: Boolean,
  userData: Object
})

const emit = defineEmits(['close', 'update'])
function close() {
  emit('close') // This should notify the parent to close the modal
}
const form = ref({
  image: '',
  title: '',
  author: '',
  isbn: '',
  publisher: '',
  publish_date: '',
  category: '',
  type: '',
})

watchEffect(() => {
  if (props.show && props.userData) {
    form.value = { ...props.userData }
  }
})

</script>
