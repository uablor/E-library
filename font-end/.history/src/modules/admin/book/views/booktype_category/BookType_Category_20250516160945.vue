<!-- <template>
  <div class="p-6 max-w-2xl mx-auto space-y-10">
    <h2 class="text-2xl font-bold">📘 Book Type Management</h2>
    <form @submit.prevent="submitBookType" class="bg-white p-5 rounded shadow space-y-4">
      <FormGroup label="Name" v-model="bookType.name" />
      <FormGroup label="Description" v-model="bookType.description" />
      <FormGroup label="Created At" v-model="bookType.created_at" type="date" />
      <FormGroup label="Updated At" v-model="bookType.updated_at" type="date" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Book Type</button>
    </form>

    <h2 class="text-2xl font-bold">📂 Book Category Management</h2>
    <form @submit.prevent="submitBookCategory" class="bg-white p-5 rounded shadow space-y-4">
      <FormGroup label="Name" v-model="bookCategory.name" />
      <FormGroup label="Description" v-model="bookCategory.description" />
      <FormGroup label="Created At" v-model="bookCategory.created_at" type="date" />
      <FormGroup label="Updated At" v-model="bookCategory.updated_at" type="date" />
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save Book Category</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// State
const bookType = ref({
  name: '',
  description: '',
  created_at: '',
  updated_at: ''
})

const bookCategory = ref({
  name: '',
  description: '',
  created_at: '',
  updated_at: ''
})

// Submit Handlers
function submitBookType() {
  console.log("Book Type Data:", bookType.value)
  alert('✅ Book Type saved!')
}

function submitBookCategory() {
  console.log("Book Category Data:", bookCategory.value)
  alert('✅ Book Category saved!')
}
</script>

 Reusable Form Input Component->
<script>
export default {
  components: {
    FormGroup: {
      props: ['label', 'modelValue', 'type'],
      emits: ['update:modelValue'],
      template: `
        <div>
          <label class="block mb-1 font-medium">{{ label }}</label>
          <input
            :type="type || 'text'"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      `
    }
  }
}
</script> -->
