

<template>
  <div class="bg-pink-50 p-4 rounded">

    <div class=" gap-5 mx-auto container bg-white  p-5">
        <!-- table -->
   <div class="flex flex-col md:flex-col lg:flex-row xl:flex-row gap-5 mx-auto container">
           <div class=" overflow-x-auto" >
             <table class=" w-200 bg-white shadow-md rounded-lg mt-6">
               <thead class="bg-gray-100">
                 <tr>
                   <th class="py-3 px-4">#</th>
                   <th class="py-3 px-4">Name</th>
                   <th class="py-3 px-4">Description</th>
                   <th class="py-3 px-4">Created_At</th>
                   <th class="py-3 px-4">Updated_At</th>
                 </tr>
               </thead>
               <tbody>
                 
                 <tr  class=" hover:bg-gray-50">
                   <td class="py-2 px-4">1</td>
                   <td class="py-2 px-4">Book Score</td>
                   <td class="py-2 px-4">This is a book score</td>
                   <td class="py-2 px-4">2022-03-15 14:30:00</td>
                   <td class="py-2 px-4">2022-03-15 14:30:00</td>
                 </tr>
                 <tr  class=" hover:bg-gray-50">
                   <td class="py-2 px-4">2</td>
                   <td class="py-2 px-4">Book Score</td>
                   <td class="py-2 px-4">This is a book score</td>
                   <td class="py-2 px-4">2022-03-15 14:30:00</td>
                   <td class="py-2 px-4">2022-03-15 14:30:00</td>
                 </tr>
                 <tr  class=" hover:bg-gray-50">
                   <td class="py-2 px-4">3</td>
                   <td class="py-2 px-4">Book Score</td>
                   <td class="py-2 px-4">This is a book score</td>
                   <td class="py-2 px-4">2022-03-15 14:30:00</td>
                   <td class="py-2 px-4">2022-03-15 14:30:00</td>
                 </tr>
               </tbody>
             </table>
           </div>
         <!-- table for book category -->
              <!-- table -->
               <div class=" overflow-x-auto">

                 <table class="w-200 bg-white shadow-md rounded-lg mt-6">
                   <thead class="bg-gray-100">
                     <tr>
                       <th class="py-3 px-4">#</th>
                       <th class="py-3 px-4">Name</th>
                       <th class="py-3 px-4">Description</th>
                       <th class="py-3 px-4">Created_At</th>
                       <th class="py-3 px-4">Updated_At</th>
                     </tr>
                   </thead>
                   <tbody>
                    
                     <tr>
                       <td class="py-2 px-4">1</td>
                        <td class="py-2 px-4">Book Score</td>
                        <td class="py-2 px-4">This is a book score</td>
                        <td class="py-2 px-4">2022-03-15 14:30:00</td>
                        <td class="py-2 px-4">2022-03-15 14:30:00</td>
                     </tr>
                       <tr  class=" hover:bg-gray-50">
                       <td class="py-2 px-4">2</td>
                       <td class="py-2 px-4">Book Score</td>
                       <td class="py-2 px-4">This is a book score</td>
                       <td class="py-2 px-4">2022-03-15 14:30:00</td>
                       <td class="py-2 px-4">2022-03-15 14:30:00</td>
                     </tr>
                     <tr  class=" hover:bg-gray-50">
                       <td class="py-2 px-4">3</td>
                       <td class="py-2 px-4">Book Score</td>
                       <td class="py-2 px-4">This is a book score</td>
                       <td class="py-2 px-4">2022-03-15 14:30:00</td>
                       <td class="py-2 px-4">2022-03-15 14:30:00</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
       </div>
    <!-- end table -->
      <div class="w-full md:w-[600px] lg:w-[750px] mx-auto mt-10 px-4">
  <!-- Dropdown -->
 <BookScore_BookFile/>
</div>

      <div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import BookScore_BookFile from './BookScore_BookFile_form_Manage'
import {defineProps} from 'vue'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})
}


// function formatDate(date?: Date) {
//   return date ? new Date(date).toLocaleString() : ''
// }
</script>
