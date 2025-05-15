<template>
    <div class="flex  rounded-lg shadow p-4 bg-pink-50 w-full max-w-5xl mx-auto gap-4">
        <!-- Left Section: Book Cover and Info -->
        <div class="w-1/4 flex flex-col items-center gap-4 bg-white p-4 rounded-lg shadow">
            <img src="../../../../assets/images/book1.jpg" alt="The Idea of Gujarat"
                class="w-full object-cover rounded" />

            <button class="bg-green-100 text-green-800 font-medium px-3 py-1 rounded">📖 {{$t('bookdetails.p')}}</button>
            <button class="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-1 rounded">Search inside</button>

            <div class="relative w-full">
                <select class="w-full mt-2 p-2 bg-white border rounded">
                    <option>✓ Already Read</option>
                    <option>Want to Read</option>
                    <option>Currently Reading</option>
                </select>
            </div>

            <div class="text-center text-sm">
                <p class="text-gray-600">When did you finish this book?</p>
                <p class="text-blue-600 hover:underline cursor-pointer">2025 Today <span class="text-xs">Other</span>
                </p>
            </div>

            <div class="text-yellow-500 text-lg">★★★★★</div>

            <div class="flex justify-around w-full text-sm text-gray-600">
                <button class="hover:underline">✍️ Review</button>
                <button class="hover:underline">📝 Notes</button>
                <button class="hover:underline">🔗 Share</button>
            </div>
        </div>

        <!-- Right Section: Book Details -->
        <div class="w-3/4 pl-8  bg-white p-4 rounded-lg shadow">
            <p class="text-sm italic text-gray-500 mb-2">
                An edition of <span class="font-medium">The Idea of Gujarat: History, Ethnography and Text</span> (2010)
            </p>
            <h1 class="text-xl font-bold " style="font-size: 35px; font-family: 'Jomolhari', serif;">The Idea of Gujarat
            </h1>
            <p>by <span class="font-medium underline text-blue-950 hover:text-blue-800"><a href="#">Amitava
                        Ghosh</a></span></p>
            <div class="flex gap-3 mt-3">
                <div class="text-md"><span class="text-yellow-500">★★★ ★ </span>3.9 (180 ratings) . .</div>
                <div class="text-md">2,002 Want to read.</div>
                <div class="text-md">228 Currently reading.</div>
                <div class="text-md"> 281 Have read.</div>
            </div>
            <div class="flex gap-5 mt-5 justify-center items-center">
                <div class="border w-40 px-5 rounded border-gray-300 py-2 ">
                    <div class="text-center  px-5 rounded  " style="font-size: 12px;">
                        Publish Date <br>1990
                    </div>
                </div>

                <div class="border w-40 px-5 rounded border-gray-300 py-2 ">
                    <div class="text-center  " style="font-size: 12px;">
                        Publisher<br><span class="text-blue-900 hover:text-blue-500 cursor-pointer">T. Doherty
                            Associates</span>
                    </div>
                </div>

                <div class="border w-40 px-5 rounded border-gray-300 py-2 ">
                    <div class="text-center   " style="font-size: 12px;">
                        Language <br> <span class="text-blue-900 hover:text-blue-500 cursor-pointer">ภาษาอังกฤษ</span>
                    </div>
                </div>

                <div class="border w-40 px-5 rounded border-gray-300 py-2 ">
                    <div class="text-center   " style="font-size: 12px;">
                        Pages <br>670
                    </div>
                </div>

            </div>
            <div class="border mt-5 px-3 py-2 rounded border-gray-300">
                <div  class=" border-b border-gray-300  pb-3 pt-6" >
                    <h1 style="font-size: 20px; ;" class="font-bold text-gray-500 ">Book Detaills</h1>
             
                </div>
                <div>
                    <div class="mt-3">
                        <h3  style="font-size: 13px;" class="font-bold text-gray-500 ">Edition Notes</h3>
                        <div class="text-gray-500">
                            <p style="font-size: 13px;">Includes bibliographical references (p. 361-371) and index.</p>
                            <p style="font-size: 12px;">Published inNew York</p>
                        </div>
                    </div>
                     <div class="mt-5">
                        <h3  style="font-size: 13px;" class="font-bold text-gray-500 ">Classifications</h3>
                        <div class="text-gray-500">
                            <p style="font-size: 13px;">Dewey Decimal Class  423/.1</p>
                            <p style="font-size: 12px;">Library of CongressPE1449 .N34 1990</p>
                        </div>
                    </div>
                     <div class="mt-5">
                        <h3  style="font-size: 13px;" class="font-bold text-gray-500 ">The Physical Object</h3>
                        <div class="text-gray-500">
                            <p style="font-size: 13px;">Paginationxii, 373 p. ;</p>
                            <p style="font-size: 12px;">Number of pages    373</p>
                        </div>
                    </div>
                     <div class="mt-5">
                        <h3  style="font-size: 13px;" class="font-bold text-gray-500 ">Edition Identifiers</h3>
                        <div class="text-gray-500">
                            <p style="font-size: 13px;">Open LibraryOL1900306M.</p>
                            <p style="font-size: 12px;">Internet Archivekindwordsthesaur00neam</p>
                            <p style="font-size: 12px;">ISBN 100816018960</p>
                            <p style="font-size: 12px;">LCCN   90100600</p>
                            <p style="font-size: 12px;">OCLC/WorldCat   20395529</p>
                            <p style="font-size: 12px;">LibraryThing   197122</p>
                            <p style="font-size: 12px;">Goodreads   3719887</p>
                        </div>
                    </div>
                     <div class="mt-5">
                        <h3  style="font-size: 13px;" class="font-bold text-gray-500 ">Work Identifiers</h3>
                        <div class="text-gray-500">
                            <p style="font-size: 13px;">Work IDOL4186139W</p>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// No logic needed for static example; dynamic features can be added as needed
</script>

<style scoped>
/* Scoped styles if needed */
</style>
