<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useField } from 'vee-validate'
import { useRoute } from 'vue-router';
import { watch } from 'vue'
const props = defineProps<{
  name: string
  label?: string
  required?: boolean
  placeholder?: string
  value?: string
  isEditing?: boolean
}>()

const { value: fieldValue, errorMessage } = useField<string>(props.name)
const route = useRoute()

// Update the value of the input field when props.value changes
watch(() => props.value, (newValue) => {
  fieldValue.value = newValue as string
})

const allowedRouteNames = ['country', 'province', 'district']
const showLabel = route?.name !== null && route?.name !== undefined && allowedRouteNames.includes(route.name as string)
</script>

<template>
  <div class="flex flex-column gap-2 mb-3">
    <label v-if="!showLabel" :for="props.name">
      {{ props.label }}
      <span class="text-red-500" v-if="props.required"> *</span>
    </label>
    <!-- Use fieldValue as the v-model to bind it to the input -->
    <input-text
      v-model="fieldValue"
      :id="props.name"
      :class="{ 'p-invalid': errorMessage }"
      type="text"
      :aria-describedby="`text-error-${props.name}`"
      :placeholder="props.placeholder"
    />
    <small class="p-error" :id="`text-error-${props.name}`">{{ errorMessage }}</small>
  </div>
</template>
