<template>
  <div v-if="show" class="modal fade show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content p-3">
        <div class="modal-header">
          <h5 class="modal-title">Add Book File</h5>
          <button type="button" class="btn-close" @click="emitClose"></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <!-- Select Book -->
            <div class="mb-3">
              <label class="form-label">Select Book</label>
              <select class="form-select" v-model="form.book_id" required>
                <option value="" disabled>Select a book</option>
                <option v-for="book in books" :key="book.id" :value="book.id">
                  {{ book.title }}
                </option>
              </select>
            </div>

            <!-- File Upload -->
            <div class="mb-3">
              <label class="form-label">Choose File</label>
              <input type="file" class="form-control" @change="handleFileChange" required />
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Add File</button>
              <button type="button" class="btn btn-secondary" @click="emitClose">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  show: Boolean,
  books: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['close', 'file-added'])

const form = ref({
  book_id: '',
  file: null,
})

const handleFileChange = (e) => {
  form.value.file = e.target.files[0]
}

const submitForm = async () => {
  try {
    const formData = new FormData()
    formData.append('book_id', form.value.book_id)
    formData.append('file', form.value.file)

    const response = await axios.post('http://localhost:3000/api/book-files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    alert('Book file added successfully')
    emit('file-added', response.data) // notify parent
    emitClose()
  } catch (error) {
    console.error('Error uploading book file:', error)
    alert('Failed to upload book file')
  }
}

const emitClose = () => {
  emit('close')
}
</script>
