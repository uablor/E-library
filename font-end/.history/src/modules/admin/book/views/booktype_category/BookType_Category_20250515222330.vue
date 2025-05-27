<template>
  <div class="p-6 max-w-4xl mx-auto space-y-10">
    <h2 class="text-2xl font-bold text-blue-700">📘 Book Type Management</h2>
    <FormSection
      title="Add Book Type"
      :items="bookTypes"
      :form="bookTypeForm"
      @submit="handleTypeSubmit"
      @edit="editBookType"
      @delete="deleteBookType"
    />

    <h2 class="text-2xl font-bold text-green-700">📂 Book Category Management</h2>
    <FormSection
      title="Add Book Category"
      :items="bookCategories"
      :form="bookCategoryForm"
      @submit="handleCategorySubmit"
      @edit="editBookCategory"
      @delete="deleteBookCategory"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import FormSection from './FormSection.vue'

// Book Types
const bookTypes = ref([])
const bookTypeForm = reactive({
  name: '',
  description: '',
  created_at: '',
  updated_at: '',
  editIndex: null
})

// Book Categories
const bookCategories = ref([])
const bookCategoryForm = reactive({
  name: '',
  description: '',
  created_at: '',
  updated_at: '',
  editIndex: null
})

// Methods
function handleTypeSubmit() {
  if (bookTypeForm.editIndex !== null) {
    bookTypes.value[bookTypeForm.editIndex] = { ...bookTypeForm }
  } else {
    bookTypes.value.push({ ...bookTypeForm })
  }
  resetForm(bookTypeForm)
}

function handleCategorySubmit() {
  if (bookCategoryForm.editIndex !== null) {
    bookCategories.value[bookCategoryForm.editIndex] = { ...bookCategoryForm }
  } else {
    bookCategories.value.push({ ...bookCategoryForm })
  }
  resetForm(bookCategoryForm)
}

function editBookType(index) {
  Object.assign(bookTypeForm, { ...bookTypes.value[index], editIndex: index })
}

function deleteBookType(index) {
  bookTypes.value.splice(index, 1)
}

function editBookCategory(index) {
  Object.assign(bookCategoryForm, { ...bookCategories.value[index], editIndex: index })
}

function deleteBookCategory(index) {
  bookCategories.value.splice(index, 1)
}

function resetForm(form) {
  Object.assign(form, {
    name: '',
    description: '',
    created_at: '',
    updated_at: '',
    editIndex: null
  })
}
</script>
