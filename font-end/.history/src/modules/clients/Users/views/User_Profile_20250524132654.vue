<template>
  <div class="mx-auto px-4 p-4 max-w-4xl">
    <div class="rounded-md shadow p-4 bg-pink-50">
      <div class="flex flex-col items-center bg-white pb-5 relative">
        <!-- Animated Ring and Lottie -->
         <div class="profile-ring mt-[-60px] mb-2">
          <img
            src="../../../../assets/"
            alt="User Avatar"
            class="profile-image"
          />
        </div>

        <!-- User Info -->
        <h2 class="text-lg font-semibold mt-2">kong_mong_thao</h2>
        <p class="text-gray-600 text-sm">code student 1923HEUEI02025</p>
      </div>

      <!-- Tabs -->
      <div class="flex justify-between border-b border-gray-400 bg-white flex-wrap">
        <button class="text-green-600 border-b border-green-600 py-2 px-4 font-medium">My account</button>
        <button class="py-2 px-4 text-gray-500 hover:text-green-600">Favorite book</button>
        <button class="py-2 px-4 text-gray-500 hover:text-green-600">Currently Reading</button>
        <button class="py-2 px-4 text-gray-500 hover:text-green-600">Want to Read</button>
        <button class="py-2 px-4 text-gray-500 hover:text-green-600">Already Read</button>
      </div>

      <!-- Profile Data -->
      <div class="bg-white">
        <div class="flex gap-10 flex-wrap items-start mt-3 pt-2 text-sm px-4">
          <div class="text-gray-500 space-y-2">
            <p><strong>Code student</strong></p>
            <p><strong>User name</strong></p>
            <p><strong>Email</strong></p>
            <p><strong>Firstname</strong></p>
            <p><strong>Lastname</strong></p>
            <p><strong>Birthday</strong></p>
            <p><strong>Address</strong></p>
            <p><strong>Department</strong></p>
            <p><strong>Phone</strong></p>
          </div>
          <div class="text-green-600 space-y-2">
            <p>1923HEUEI02025</p>
            <p>Kong Mong taho</p>
            <p>
              <a href="mailto:kongmongthao348@gmail.com" class="text-green-700 underline">
                kongmongthao348@gmail.com
              </a>
            </p>
            <p>kong</p>
            <p>Thao</p>
            <p>07/06/2005</p>
            <p>ບ້ານ ຊີວິໄລ,ເມືອງ ໄຊທານີ, ແຂວງ ວຽງຈັນ</p>
            <p>neenKong</p>
            <p>+856 2078961715</p>
          </div>
          <div class="hidden md:block pt-10">
            <DotLottieVue
              class="w-52 h-52"
              autoplay
              loop
              src="https://lottie.host/c119af40-106a-4da5-b1ba-c1d386673c2b/ICkxka5WLB.lottie"
            />
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex ml-5 mt-6 pb-4 gap-4">
          <button
            class="cursor-pointer w-30 px-6 py-2 border border-green-700 text-green-700 rounded hover:bg-white">
            Edit
          </button>
          <button
            class="cursor-pointer w-30 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Log out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { onMounted, ref } from 'vue'

const ringRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const ring = ringRef.value
  const numDots = 36
  const radius = 140
  const center = 150

  if (ring) {
    for (let i = 0; i < numDots; i++) {
      const angle = (i / numDots) * 2 * Math.PI
      const dot = document.createElement('div')
      dot.className = 'dot'
      dot.style.left = `${center + radius * Math.cos(angle)}px`
      dot.style.top = `${center + radius * Math.sin(angle)}px`
      dot.style.animationDelay = `${i * 0.1}s`
      ring.appendChild(dot)
    }
  }
})
</script>

<style scoped>
.ring-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
}

.ring {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  animation: rotate 10s linear infinite;
  top: 0;
  left: 0;
}

.dot {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: red;
  transform: translate(-50%, -50%);
  animation: colorShift 5s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes colorShift {
  0% {
    background: red;
  }

  25% {
    background: yellow;
  }

  50% {
    background: lime;
  }

  75% {
    background: cyan;
  }

  100% {
    background: red;
  }
}

.center-image {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  transform: translate(-50%, -50%);
  z-index: 10;
  border: 3px solid white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
