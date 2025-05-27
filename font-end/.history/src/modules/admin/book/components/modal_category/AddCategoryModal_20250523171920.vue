<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-opacity-70 flex items-center justify-center"
    style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
      <h2 class="text-xl font-bold mb-4">
        ເພີ່ມໝວກໝູ່ປື້ມ
      </h2>

      <button class="absolute top-2 right-2 text-gray-600 hover:text-red-500" @click="$emit('close')">✕</button>

      <form @submit.prevent="handleSave">
        <div class="flex gap-10">
          <div>
            <div>
              <label class="block text-sm font-medium"</label>
              <input v-model="localUser.title"
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
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">ຍົກເລີກ</button>
          <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">ບັນທຶກ</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
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

<style scoped></style>
