const STORAGE_VERSION = "v1";
let delivery = true;

function switchToDelivery() {
  isDelivery = true;
  updateBasketSummary();
}

function switchToPickup() {
  isDelivery = false;
  updateBasketSummary();
}
let ordered = false;
let baskedOpen = false;
let easterEgg = false;

function renderNav() {
  const navRef = document.getElementById("main_container--nav");
  navRef.innerHTML += getNavTemplate();
}

function renderContainerHead() {
  const containerHeadRef = document.getElementById("container_head");
  let menuDishes = getCategoryNames();
  containerHeadRef.innerHTML += getContainerHeadTemplate(menuDishes);
}

function getDeliveryText(isDelivery) {
  return isDelivery
    ? "Dein Essen wird schon bald frisch und heiß zu dir geliefert."
    : "Deine Bestellung steht schon bald zur Abholung bereit.";
}

function getCategoryNames() {
  let menuDishes = [];
  let menuDishesTemplate = "";
  for (let index = 0; index < Object.keys(dishes).length; index++) {
    const dish = Object.keys(dishes)[index];
    const heading = categoryHeadings[dish];
    menuDishes.push(heading);
    menuDishesTemplate += getCategoryNamesTemplate(index, menuDishes);
  }
  return menuDishesTemplate;
}

function renderCategory() {
  const dishesContainerRef = document.getElementById("dishes_container");

  for (let index = 0; index < Object.keys(dishes).length; index++) {
    const dish = Object.keys(dishes)[index];
    const heading = categoryHeadings[dish];
    if (heading) {
      dishesContainerRef.innerHTML += getCategoryTemplate(index, heading);
    }
  }
  updateBasketContents();
}

function renderDishes(dishType) {
  let dishesArray;
  let containerId;
  for (let index = 0; index < Object.keys(dishes).length; index++) {
    const dish = Object.keys(dishes)[index];
    if (dishType === dish) {
      dishesArray = dishes[dish];
      containerId = "dishes" + index;
    }
  }
  const containerRef = document.getElementById(containerId);
  containerRef.innerHTML = "";
  for (let index = 0; index < dishesArray.length; index++) {
    containerRef.innerHTML += getDishesTemplate(index, dishesArray, dishType);
  }
}

function renderFooter() {
  const footerRef = document.getElementById("main_container--footer");
  footerRef.innerHTML = renderFooterTemplate();
}

function init() {
  getFromLocalStorage();
  renderNav();
  renderFooter();
  renderContainerHead();
  renderCategory();
  renderBasketNav();
  const dishKeys = Object.keys(dishes); // https://www.w3schools.com/jsref/jsref_object_keys.asp
  for (let index = 0; index < dishKeys.length; index++) {
    renderDishes(dishKeys[index]);
  }
  checkDelivery();
  renderBasketButton();
  fixedScroll();
  autoEasterEgg();
}

init();

function checkDelivery() {
  const deliveryButtonRef = document.getElementById("delivery_button");
  const pickupButtonRef = document.getElementById("pickup_button");
  if (delivery) {
    pickupButtonRef.style.backgroundColor = "rgb(216, 216, 216)";
    deliveryButtonRef.style.backgroundColor = "white";
  } else {
    pickupButtonRef.style.backgroundColor = "white";
    deliveryButtonRef.style.backgroundColor = "rgb(216, 216, 216)";
  }
}

function switchToDelivery() {
  const deliveryButtonRef = document.getElementById("delivery_button");
  const pickupButtonRef = document.getElementById("pickup_button");
  if (!delivery) {
    delivery = true;
    pickupButtonRef.style.backgroundColor = "rgb(216, 216, 216)";
    deliveryButtonRef.style.backgroundColor = "white";
  }
  updateBasketContents();
  saveToLocalStorage();
}

function switchToPickup() {
  const deliveryButtonRef = document.getElementById("delivery_button");
  const pickupButtonRef = document.getElementById("pickup_button");
  if (delivery) {
    delivery = false;
    deliveryButtonRef.style.backgroundColor = "rgb(216, 216, 216)";
    pickupButtonRef.style.backgroundColor = "white";
  }
  updateBasketContents();
  saveToLocalStorage();
}

function renderBasketNav() {
  const basketHeaderRef = document.getElementById("basket_Header");
  basketHeaderRef.innerHTML += renderBasketHeader();
}

function updateBasketContents() {
  const basketDishesRef = document.getElementById("basket_dishes");
  basketDishesRef.innerHTML = "";
  const dishKeys = Object.keys(dishes); // https://www.w3schools.com/jsref/jsref_object_keys.asp
  for (let index = 0; index < dishKeys.length; index++) {
    const dishType = dishKeys[index];
    const dishesArray = dishes[dishType];
    for (let index = 0; index < dishesArray.length; index++) {
      if (dishesArray[index].basketValue > 0) {
        let currentPrice = dishesArray[index].price;
        currentPrice = (currentPrice * dishesArray[index].basketValue).toFixed(2).replace(".", ",");
        basketDishesRef.innerHTML += renderBasketDishes(index, dishesArray, dishType, currentPrice);
      }
    }
  }
  calculateBasketOverallPrice();
  saveToLocalStorage();
  autoEasterEgg();
}

function removeFromBasket(index, dishType) {
  let selectedDishArray = dishes[dishType];
  selectedDishArray[index].basketValue = selectedDishArray[index].basketValue - 1;
  updateBasketContents();
}

function updateBasketValue(index, dishType) {
  ordered = false;
  let selectedDishArray = dishes[dishType];
  selectedDishArray[index].basketValue = selectedDishArray[index].basketValue + 1;
  updateBasketContents();
  if (!baskedOpen) renderBasketButton();
  fixedScroll();
  autoEasterEgg();
}

function clearBasket(index, dishType) {
  let selectedDishArray = dishes[dishType];
  selectedDishArray[index].basketValue = 0;
  updateBasketContents();
}

function triggerOrder() {
  let categories = Object.keys(dishes);
  for (let indexCategories = 0; indexCategories < categories.length; indexCategories++) {
    const category = categories[indexCategories];
    for (let indexDishesCategories = 0; indexDishesCategories < dishes[category].length; indexDishesCategories++) {
      dishes[category][indexDishesCategories].basketValue = 0;
    }
  }
  ordered = true;
  updateBasketContents();
  renderBasketButton();
  function hideBasketButton() {
  document.getElementById("basketButton")?.classList.add("d_none");
}
  fixedScroll();
}

function useEasterEgg() {
  easterEgg = true;
  updateBasketContents();
  const EasterEggIconRef = document.getElementById("EasterEggIcon");
  if (EasterEggIconRef !== null) EasterEggIconRef.classList.add("d_block");
}

function autoEasterEgg() {
  if (easterEgg) {
    const EasterEggIconRef = document.getElementById("EasterEggIcon");
    if (EasterEggIconRef !== null) EasterEggIconRef.classList.add("d_block");
  }
}

function deliveryCostsValue() {
  if (easterEgg) {
    return 2.99;
  } else {
    return 4.99;
  }
}

function calculateBasketOverallPrice() {
  const prices = document.querySelectorAll(".main_container--content--basket--dishes_container--dishes--info--data--price--value");
  const summary = document.getElementById("basket_summary");

  let overall = 0;
  prices.forEach(p => overall = Math.round((overall + parseFloat(p.innerHTML.replace(",", "."))) * 100) / 100);

  if (overall === 0) {
    summary.innerHTML = ordered
      ? basketOrderedTemplate(getDeliveryText(delivery))
      : basketPreOrderTemplate();
    return 0;
  }

  let deliveryC = delivery ? deliveryCostsValue() : 0;
  let total = (overall + deliveryC).toFixed(2).replace(".", ",");
  let sub = overall.toFixed(2).replace(".", ",");
  let del = deliveryC.toFixed(2).replace(".", ",");

  summary.innerHTML = renderBasketSummary(sub, del, total);
  return overall;
}

function toggleBasket() {
  baskedOpen = !baskedOpen;

  const b = document.getElementById("basket");
  const o = document.getElementById("order_area");
  const btn = document.getElementById("basketButton");
  const close = document.getElementById("basketClose");

  b.classList.toggle("d_block");
  o.classList.toggle("d_none");
  close.classList.toggle("d_block");

 if (window.innerWidth <= 900) {
  if (baskedOpen) btn.classList.add("d_none");
  else btn.classList.remove("d_none");
}

  if (!baskedOpen) renderBasketButton();
}

function showBasketButton() {
  const basketButtonRef = document.getElementById("basketButton");
  basketButtonRef.classList.remove("d_none");
}

function fixedScroll() {
  if (window.innerWidth <= 900 && baskedOpen) return;

  const btn = document.getElementById("basketButton");
  const basket = document.getElementById("basket");
  const dishes = document.getElementById("basket_dishes");

  const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 75;

  if (btn && window.innerWidth > 900) btn.classList.toggle("fixed-bottom", bottom);
  if (basket && window.innerWidth > 900) basket.classList.toggle("fixed-basket", bottom);
  if (dishes) dishes.classList.toggle("fixed-dishesBasket", bottom);
}

window.addEventListener("scroll", function () {
  fixedScroll();
});

function renderBasketButton() {
  const basketButtonContainerRef = document.getElementById("basket_button_container");
  let overallPrice = calculateBasketOverallPrice();
  basketButtonContainerRef.innerHTML = renderBasketButtonTemplate(overallPrice);
}

function saveToLocalStorage() {
  let currentBasketValue = {};
  const dishKeys = Object.keys(dishes); // https://www.w3schools.com/jsref/jsref_object_keys.asp
  for (let indexDishKeys = 0; indexDishKeys < dishKeys.length; indexDishKeys++) {
    const category = dishKeys[indexDishKeys];
    currentBasketValue[category] = [];
    for (let indexDishesCategory = 0; indexDishesCategory < dishes[category].length; indexDishesCategory++) {
      const dish = dishes[category][indexDishesCategory];
      currentBasketValue[category].push(dish.basketValue);
    }
  }
  localStorage.setItem("currentBasketValue", JSON.stringify(currentBasketValue));
  localStorage.setItem("delivery", JSON.stringify(delivery));
  localStorage.setItem("easterEgg", JSON.stringify(easterEgg));
}

function getFromLocalStorage() {
  const basketValuesStorage = JSON.parse(localStorage.getItem("currentBasketValue"));
  if (basketValuesStorage) {
    let categories = Object.keys(dishes);
    for (let indexCategories = 0; indexCategories < categories.length; indexCategories++) {
      const category = categories[indexCategories];
      if (basketValuesStorage[category]) {
        for (let indexDishesCategories = 0; indexDishesCategories < dishes[category].length; indexDishesCategories++) {
          dishes[category][indexDishesCategories].basketValue = basketValuesStorage[category][indexDishesCategories];
        }
      }
    }
  }

  const deliveryStorage = JSON.parse(localStorage.getItem("delivery"));
if (deliveryStorage !== null) delivery = deliveryStorage;

const easterEggStorage = JSON.parse(localStorage.getItem("easterEgg"));
if (easterEggStorage !== null) easterEgg = easterEggStorage;
}

function updateWidth() {
  const width = window.innerWidth; // https://www.w3schools.com/jsref/prop_win_innerwidth.asp
  if (width >= 900 && baskedOpen == true) {
    toggleBasket();
    dishesSticky();
  }
}
window.addEventListener("resize", updateWidth); // https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event

updateWidth();

function dishesSticky() {
  const stickyTriggerRef = document.getElementById("dishes0");
  const menuRef = document.getElementById("main_container--content--order_area--nav");
  const menuOffset = stickyTriggerRef.offsetTop - 170; // https://www.w3schools.com/jsref/prop_element_offsettop.asp
  if (window.scrollY > menuOffset) {
    // https://www.w3schools.com/jsref/prop_win_scrolly.asp
    menuRef.classList.add("sticky");
  } else {
    menuRef.classList.remove("sticky");
  }
}

window.addEventListener("scroll", function () {
  dishesSticky();
  highlightActiveCategory();
});

function highlightActiveCategory() {
  const sections = document.querySelectorAll('[id^="dishes"]');
  const navLinks = document.querySelectorAll(
    ".main_container--content--order_area--nav--menu_dishes a"
  );

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("menu-active");

    const href = link.getAttribute("href");
    if (href && current && href.includes(current)) {
      link.classList.add("menu-active");
    }
  });
}