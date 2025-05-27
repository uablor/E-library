<template>
  <div class="p-4 space-y-10 bg-pink-50">
    <!-- Section: Trending Books -->
    <section>
      <div class="relative mb-4 ">
        <div class="text-white bg-green-600 w-50  px-4 py-2  rounded-tl-lg">
          <router-link to="/client/bookDetails" >
          <h2 class=" cursor-pointer">{{ $t('home.trendingbooks') }}</h2>
          </router-link>
        </div>
      </div>
      <div class="relative  bg-white  p-4 rounded flex items-center justify-center">
        <!-- Left Arrow -->
        <button @click="scrollLeft('trending')" class="text-green-600 text-2xl font-bold cursor-pointer pr-2 ">
          &lt;
        </button>

        <!-- Book List -->
      

    <div   ref="trending"  class="flex overflow-x-auto gap-15 scrollbar-hide scroll-smooth"  >
        <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book1.jpg" alt="book" class="w-75 h-53 shadows-img" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book21.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book22.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book23.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book24.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book25.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book26.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book27.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book28.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book29.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book30.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           

        </div>


        <!-- Right Arrow -->
        <button @click="scrollRight('trending')" class="text-green-600 text-2xl font-bold ml-2 cursor-pointer">
          &gt;
        </button>
      </div>
    </section>

    <!-- Section: Classic Books -->
    <section class="-mt-6">
      <div class="relative mb-4">
        <div class="text-white bg-green-600 w-50  px-4 py-2  rounded-tl-lg">

          <h2 >{{ $t('home.classic') }}</h2>
        </div>
        <!-- <h2 class="text-white bg-green-600 px-4 py-2 w-fit rounded-tl-lg">{{ $t('home.classic') }}</h2> -->
      </div>
      <div class="relative  bg-white  p-4 rounded flex items-center">
        <!-- Left Arrow -->
        <button @click="scrollLeft('classic')" class="text-green-600 text-2xl font-bold cursor-pointer pr-2">
          &lt;
        </button>

        <!-- Book List -->
        <div
          ref="classic"
          class="flex overflow-x-auto gap-15 scrollbar-hide scroll-smooth"
        >
         <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book31.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
         <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book32.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book33.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book34.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book35.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book36.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book30.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book30.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book30.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>
           <div   class="flex flex-col items-center py-6">
            <img src="../../../../assets/images/book_home/book30.jpg" alt="book" class="w-75 h-53 shadows-img object-cover object-center" />
            <router-link :to="{ path: '/client/bookDetails' }">
            <button class="text-white font-bold bg-green-600 w-35 py-2  mt-4 text-center transition cursor-pointer hover:scale-115 hover:bg-white hover:text-green-600 hover:border-green-600 border-3 border-green-600">{{ $t('home.readinnow') }}</button>
            </router-link>
          </div>

        </div>

        <!-- Right Arrow -->
        <button @click="scrollRight('classic')" class="text-green-600 text-2xl font-bold ml-2 cursor-pointer ">
          &gt;
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const trending = ref(null)
const classic = ref(null)

function scrollLeft(refName) {
  if (refName === 'trending' && trending.value) {
    trending.value.scrollLeft -= 200
  }
  if (refName === 'classic' && classic.value) {
    classic.value.scrollLeft -= 200
  }
}

function scrollRight(refName) {
  if (refName === 'trending' && trending.value) {
    trending.value.scrollLeft += 200
  }
  if (refName === 'classic' && classic.value) {
    classic.value.scrollLeft += 200
  }
}
</script>

<style>
/* Optional: hide scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.shadows-img {
  box-shadow: 1px 2px 5px 5px rgba(0, 0, 0, 0.2);
  /* border: 3px solid #fff; */
}
</style>
