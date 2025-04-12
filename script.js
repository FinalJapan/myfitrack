let totalCalories = 0;
let mealList = [];
const STORAGE_KEY = "foodDB";

document.addEventListener("DOMContentLoaded", () => {
  const currentWeightInput = document.getElementById("currentWeight");
  const targetWeightInput = document.getElementById("targetWeight");
  const saveBtn = document.getElementById("saveWeight");
  const weightInfo = document.getElementById("weightInfo");

  const foodInput = document.getElementById("foodName");
  const calInput = document.getElementById("calories");
  const addBtn = document.getElementById("addMeal");
  const mealListEl = document.getElementById("mealList");
  const totalEl = document.getElementById("totalCalories");
  const suggestList = document.getElementById("suggestList");

  const weightData = JSON.parse(localStorage.getItem("weightData"));
  if (weightData) {
    currentWeightInput.value = weightData.current;
    targetWeightInput.value = weightData.target;
    weightInfo.textContent = `目標まであと ${(weightData.current - weightData.target).toFixed(1)}kg`;
  }

  let foodDB = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    { name: "ご飯", calories: 168 },
    { name: "味噌汁", calories: 40 },
    { name: "カレーライス", calories: 600 },
    { name: "焼き魚", calories: 180 },
    { name: "チキン南蛮", calories: 720 }
  ];

  saveBtn.addEventListener("click", () => {
    const current = parseFloat(currentWeightInput.value);
    const target = parseFloat(targetWeightInput.value);
    if (!isNaN(current) && !isNaN(target)) {
      const diff = current - target;
      weightInfo.textContent = `目標まであと ${diff.toFixed(1)}kg`;
      localStorage.setItem("weightData", JSON.stringify({ current, target }));
      showMyPage();
    }
  });

  foodInput.addEventListener("input", () => {
    const input = foodInput.value.trim();
    calInput.value = "";
    suggestList.innerHTML = "";
    if (input === "") return;

    const matched = foodDB.filter(item => item.name.includes(input));
    matched.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name}（${item.calories}kcal）`;
      li.addEventListener("click", () => {
        foodInput.value = item.name;
        calInput.value = item.calories;
        suggestList.innerHTML = "";
        addMealDirect(item.name, item.calories);
      });
      suggestList.appendChild(li);
    });
  });

  saveBtn.addEventListener("click", () => {
    const current = parseFloat(currentWeightInput.value);
    const target = parseFloat(targetWeightInput.value);
    if (!isNaN(current) && !isNaN(target)) {
      localStorage.setItem("weightData", JSON.stringify({ current, target }));
      showMyPage(); // ← 表示更新はマイページでのみ
    }
  });
  
  addBtn.addEventListener("click", () => {
    const food = foodInput.value.trim();
    const cal = parseFloat(calInput.value);
    if (food && !isNaN(cal)) {
      addMealDirect(food, cal);
    }
  });
  
  function addMealDirect(food, cal) {
    mealList.push({ food, cal });
    totalCalories += cal;
  
    if (!foodDB.find(item => item.name === food)) {
      foodDB.push({ name: food, calories: cal });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foodDB));
    }
  
    foodInput.value = "";
    calInput.value = "";
    suggestList.innerHTML = "";
    showMyPage(); // 表示更新
  }
  
  showMyPage(); // 初期表示
});

// マイページ表示更新
function showMyPage() {
  const weightData = JSON.parse(localStorage.getItem("weightData")) || { current: 0, target: 0 };
  const current = weightData.current || 0;
  const target = weightData.target || 0;
  const diff = (current - target).toFixed(1);

  document.getElementById("mypageWeight").textContent = `現在の体重：${current}kg`;
  document.getElementById("mypageTarget").textContent = `目標の体重：${target}kg`;
  document.getElementById("mypageDiff").textContent = `あと${diff}kg減らしたい！`;

  const mealListElem = document.getElementById("mypageMeals");
  const totalElem = document.getElementById("mypageTotal");
  let total = 0;
  mealListElem.innerHTML = "";

  mealList.forEach(meal => {
    const li = document.createElement("li");
    li.textContent = `${meal.food}：${meal.cal} kcal`;
    mealListElem.appendChild(li);
    total += meal.cal;
  });

  totalElem.textContent = `合計: ${total} kcal`;
}

// セクション切替
function toggleSection(target) {
  document.getElementById("trackSection").style.display = target === "track" ? "block" : "none";
  document.getElementById("mypageSection").style.display = target === "mypage" ? "block" : "none";
}
