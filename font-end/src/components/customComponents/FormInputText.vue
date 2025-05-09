<script setup lang="ts">
  import InputText from 'primevue/inputtext'
  import { useField } from 'vee-validate'
  import { useRoute } from 'vue-router'

  const props = defineProps<{
    name: string
    label?: string
    required?: boolean
    placeholder?: string
    value?: string,
    isEditing?: boolean
    disabled?: boolean
  }>()

  const { value, errorMessage } = useField<string>(() => props.name)
  const route = useRoute()


  if (props.value) {
    value.value = props.value
  }

  const allowedRouteNames = ['country', 'province', 'district', 'real.estate.type'];
  const showLabel = route?.name !== null && route?.name !== undefined && allowedRouteNames.includes(route.name as string);
</script>

<template>
  <div class="flex flex-column gap-2 mb-3">
    <label v-if="!showLabel" :for="name">
      {{ label }}
      <span class="text-red-500" v-if="required"> *</span>
    </label>
    <input-text
      v-model="value"
      :id="name"
      :class="{ 'p-invalid': errorMessage }"
      type="text"
      :aria-describedby="`text-error-${name}`"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <small class="p-error" :id="`text-error-${name}`">{{ errorMessage }}</small>
  </div>
</template>
