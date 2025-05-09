<template>
  <div class="flex flex-col md:flex-row min-h-screen">
    <!-- Left panel -->
    <div
      class="w-full md:w-1/2 bg-green-600 text-white flex flex-col justify-center p-8"
    >
      <img
        src="@/assets/images/quest-logo.png"
        alt="Quest College Logo"
        class="w-40 mb-4"
      />
      <h1 class="text-4xl font-bold mb-4">Sign Up</h1>
      <p class="">
        Get your free Open Library card and borrow digital books from the nonprofit Internet Archive
      </p>
    </div>

    <!-- Right panel -->
    <div
      class="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-6 sm:p-10 overflow-y-auto"
    >
      <div class="w-full max-w-md">
        <div class="flex items-center gap-2 mb-6">
          <div class="flex-grow border-t border-gray-400"></div>
          <span class="text-center font-semibold text-xl text-gray-700"
            >start</span
          >
          <div class="flex-grow border-t border-gray-400"></div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
            <!-- User Info -->
            <input
              v-model="user.username"
              type="text"
              placeholder="Username"
              class="input"
            />
            <input
              v-model="user.email"
              type="email"
              placeholder="Email"
              class="input"
            />
            <input
              v-model="user.password"
              type="password"
              placeholder="Password"
              class="input"
            />

            <!-- Student Info -->
            <input
              v-model="student.first_name"
              type="text"
              placeholder="First Name"
              class="input"
            />
            <input
              v-model="student.last_name"
              type="text"
              placeholder="Last Name"
              class="input"
            />
            <input
              v-model="student.phone"
              type="text"
              placeholder="Phone Number"
              class="input"
            />
            <input
              v-model="student.department"
              type="text"
              placeholder="Department"
              class="input"
            />
            <input
              v-model="student.code_student"
              type="text"
              placeholder="Student Code"
              class="input"
            />
            <input
              v-model="student.villege_id"
              type="text"
              placeholder="Village ID"
              class="input"
            />
            <input
              v-model="student.brith_day"
              type="date"
              placeholder="Birth Day"
              class="input"
            />
          </div>
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" v-model="subscribe" />
            I want to receive news, announcements, and resources from the
            Internet Archive.
          </label>

          <button
            type="submit"
            class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>

        <p class="text-xs text-center mt-4">
          By signing up, you agree to the Internet Archive’s
          <a href="#" class="text-blue-600 underline">Terms of Service</a>.
        </p>

        <p class="text-sm text-center mt-2">
          Already have an account?
          <a href="#" class="text-blue-600 underline">Log in</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { StudentEntity } from "../entities/student.enity";
import type { UserEntity } from "../entities/user.entity";

const user = reactive<UserEntity>({
  username: "",
  email: "",
  password: "",
});

const student = reactive<StudentEntity>({
  first_name: "",
  last_name: "",
  phone: "",
  department: "",
  brith_day: null,
  code_student: "",
  villege_id: "",
});

const subscribe = ref(false);

function handleSubmit() {
  console.log("User:", user);
  console.log("Student:", student);
  console.log("Subscribed:", subscribe.value);

  // ตัวอย่างส่ง API:
  // await axios.post('/api/signup', { user, student, subscribe: subscribe.value })
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
