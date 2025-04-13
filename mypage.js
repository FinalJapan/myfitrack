<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>MyFitTrack - マイページ</title>

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Manrope Font -->
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap" rel="stylesheet">
  <link rel="manifest" href="manifest.json" />
  <meta name="theme-color" content="#00704A" />

  <style>
    body {
      font-family: 'Manrope', sans-serif;
      background: linear-gradient(to bottom right, #ffffff, #f3f4f6);
    }

    @keyframes fade-in-up {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in-up {
      animation: fade-in-up 0.6s ease-out both;
    }
  </style>
</head>

<body class="text-gray-800">

  <header class="bg-[#00704A] text-white px-6 py-4 shadow-md flex justify-between items-center">
    <h1 class="text-2xl font-bold tracking-widest">MyFitTrack</h1>
    <button id="logoutBtn" class="text-sm hover:text-amber-200 transition">LOGOUT</button>
  </header>

  <main class="max-w-4xl mx-auto p-6 space-y-8">

    <!-- PROFILE CARD -->
    <div class="bg-white/10 border border-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-6 animate-fade-in-up">
      <h2 class="text-xl font-bold mb-4 text-[#00704A]">👤 PROFILE</h2>

      <div class="flex items-center gap-4 mb-4">
        <label for="age" class="w-32">年齢:</label>
        <input type="number" id="age" class="w-40 bg-white/30 border border-[#00704A] text-gray-800 px-4 py-2 rounded placeholder-gray-400 focus:ring-2 focus:ring-[#00704A]/50 transition" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <span class="w-32">性別:</span>
        <div class="flex gap-4">
          <label class="flex items-center"><input type="radio" name="gender" value="male" class="mr-1" checked> 男性</label>
          <label class="flex items-center"><input type="radio" name="gender" value="female" class="mr-1"> 女性</label>
        </div>
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="height" class="w-32">身長 (cm):</label>
        <input type="number" id="height" class="w-40 bg-white/30 border border-[#00704A] text-gray-800 px-4 py-2 rounded placeholder-gray-400 focus:ring-2 focus:ring-[#00704A]/50 transition" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="currentWeight" class="w-32">現体重 (kg):</label>
        <input type="number" id="currentWeight" class="w-40 bg-white/30 border border-[#00704A] text-gray-800 px-4 py-2 rounded placeholder-gray-400 focus:ring-2 focus:ring-[#00704A]/50 transition" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="targetWeight" class="w-32">目標体重 (kg):</label>
        <input type="number" id="targetWeight" class="w-40 bg-white/30 border border-[#00704A] text-gray-800 px-4 py-2 rounded placeholder-gray-400 focus:ring-2 focus:ring-[#00704A]/50 transition" />
      </div>

      <button id="saveWeight" class="w-full mt-4 bg-[#00704A] text-white font-bold py-3 px-6 rounded-full shadow hover:shadow-[#00704A]/50 hover:bg-[#005c3d] transition-all duration-300">
        💾 SAVE
      </button>
      <p id="weightInfo" class="mt-4 text-sm text-gray-700"></p>

      <div class="inline-block bg-white/20 border border-[#00704A]/40 p-4 rounded mt-6 shadow backdrop-blur">
        <p class="text-sm text-[#00704A] font-semibold">🎯 推奨摂取カロリー</p>
        <p class="text-xl font-bold text-gray-900 whitespace-nowrap" id="recommendedCalories">約 0 kcal / 日</p>
      </div>
    </div>

    <!-- FOOD CARD -->
    <div class="bg-white/10 border border-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-6 animate-fade-in-up">
      <h2 class="text-xl font-bold mb-4 text-[#00704A]">🍱 食事記録</h2>

      <div class="flex items-center gap-4 mb-4">
        <label for="foodName" class="w-32">メニュー名:</label>
        <input type="text" id="foodName" class="flex-1 bg-white/30 border border-[#00704A] text-gray-800 px-4 py-2 rounded placeholder-gray-400" placeholder="例: カレーライス" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="calories" class="w-32">カロリー:</label>
        <input type="number" id="calories" class="flex-1 bg-white/30 border border-[#00704A] text-gray-800 px-4 py-2 rounded placeholder-gray-400" placeholder="kcal" />
      </div>

      <button id="addMeal" class="w-full bg-[#00704A] text-white font-bold py-3 px-6 rounded-full shadow hover:shadow-[#00704A]/50 hover:bg-[#005c3d] transition-all duration-300">
        🍣 追加
      </button>

      <ul id="suggestList" class="suggest-box mt-2 text-gray-800"></ul>
    </div>

    <!-- CALORIE CARD -->
    <div class="bg-white/10 border border-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-6 animate-fade-in-up">
      <h2 class="text-xl font-bold mb-4 text-[#00704A]">📊 今日の摂取カロリー</h2>
      <ul id="mealList" class="text-sm space-y-1 text-gray-900"></ul>
      <p id="totalCalories" class="font-medium text-lime-700 mt-3">合計: 0 kcal</p>
    </div>

  </main>

  <footer class="text-center text-xs text-gray-400 py-4 mt-12 tracking-widest">
    &copy; 2025 MyFitTrack / Manrope UI
  </footer>

  <script src="mypage.js" defer></script>
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('./service-worker.js')
          .then(reg => console.log('✅ SW registered', reg))
          .catch(err => console.error('❌ SW failed', err));
      });
    }
  </script>
</body>
</html>
