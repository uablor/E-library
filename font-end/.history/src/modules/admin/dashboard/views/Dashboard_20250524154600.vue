<template>
  <div class="bg-pink-50 p-4">
    <div class="p-6 bg-white shadow rounded-lg">
      <div>
        <select class="form-select w-full border border-gray-300 rounded p-2">
          <option value="" disabled selected>-- ເລືອກ chart ຫຼື form ທົ່ວໄປ --</option>
          <option value="lo">chart</option>
          <option value="en"></option>
         
        </select>
      </div>
      <h1 class="text-3xl font-bold mb-6 text-gray-500"><i class="fa-solid fa-chart-simple"></i> Dashboard</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 cursor-pointer">
        
        <!-- Item 1 -->
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition gap-5 flex">
          <div>
            <div class="text-4xl mb-4"><i class="fa-solid fa-users"></i></div>
            <h2 class="text-lg font-semibold mb-1">ລາຍງານຜູ້ໃຊ້</h2>
            <p class="text-gray-600">120 ລາຍການ</p>
            <button class="cursor-pointer transition bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              ເບີ່ງລາຍລະອຽດເພີ່ມເຕີມ
            </button>
          </div>
        </div>

        <!-- Item 2 -->
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition gap-5 flex">
          <div>
            <div class="text-4xl mb-4">🎓</div>
            <h2 class="text-lg font-semibold mb-1">ລາຍງານນັກສຶກສາ</h2>
            <p class="text-gray-600">85 ລາຍການ</p>
            <button class="cursor-pointer transition bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              ເບີ່ງລາຍລະອຽດເພີ່ມເຕີມ
            </button>
          </div>
        </div>

        <!-- Item 3 -->
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition gap-5 flex">
          <div>
            <div class="text-4xl mb-4">📚</div>
            <h2 class="text-lg font-semibold mb-1">ລາຍງານປື້ມເອກະສານ</h2>
            <p class="text-gray-600">350 ລາຍການ</p>
            <button class="cursor-pointer transition bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              ເບີ່ງລາຍລະອຽດເພີ່ມເຕີມ
            </button>
          </div>
        </div>

        <!-- Item 4 -->
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition gap-5 flex">
          <div>
            <div class="text-4xl mb-4"><i class="fa-solid fa-star text-yellow-500"></i></div>
            <h2 class="text-lg font-semibold mb-1">ຄະແນນ & ຄວາມຄິດເຫັນ</h2>
            <p class="text-gray-600">67 ລາຍການ</p>
            <button class="cursor-pointer transition bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              ເບີ່ງລາຍລະອຽດເພີ່ມເຕີມ
            </button>
          </div>
        </div>

        <!-- Item 5 -->
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition gap-5 flex">
          <div>
            <div class="text-4xl mb-4">🛡️</div>
            <h2 class="text-lg font-semibold mb-1">ລາຍງານສິດ</h2>
            <p class="text-gray-600">4 ລາຍການ</p>
            <button class="cursor-pointer transition bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              ເບີ່ງລາຍລະອຽດເພີ່ມເຕີມ
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// No need for script since we're not using dynamic data
</script>
