<template>
  <div class="bg-white p-5 rounded shadow space-y-4">
    <h3 class="text-lg font-semibold">{{ title }}</h3>
    <form @submit.prevent="$emit('submit')" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormGroup label="Name" v-model="form.name" />
      <FormGroup label="Description" v-model="form.description" />
      <FormGroup label="Created At" v-model="form.created_at" type="date" />
      <FormGroup label="Updated At" v-model="form.updated_at" type="date" />
      <div class="col-span-full">
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {{ form.editIndex !== null ? 'Update' : 'Add' }}
        </button>
      </div>
    </form>

    <!-- Table -->
    <div class="overflow-x-auto mt-6">
      <table class="min-w-full border text-sm">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="p-2">Name</th>
            <th class="p-2">Description</th>
            <th class="p-2">Created</th>
            <th class="p-2">Updated</th>
            <th class="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index" class="border-t">
            <td class="p-2">{{ item.name }}</td>
            <td class="p-2">{{ item.description }}</td>
            <td class="p-2">{{ item.created_at }}</td>
            <td class="p-2">{{ item.updated_at }}</td>
            <td class="p-2 space-x-2">
              <button @click="$emit('edit', index)" class="text-blue-600 hover:underline">Edit</button>
              <button @click="$emit('delete', index)" class="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
          <tr v-if="!items.length">
            <td colspan="5" class="text-center text-gray-500 py-4">No data found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  form: Object,
  items: Array
})
</script>

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
</script>
