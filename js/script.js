let delivery = true;
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
        currentPrice = (currentPrice * dishesArray[index].basketValue).toFixed(2);
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
  hideBasketButton();
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
  const priceRef = document.querySelectorAll(".main_container--content--basket--dishes_container--dishes--info--data--price--value");
  const basketSummaryRef = document.getElementById("basket_summary");
  let overallPrice = 0;
  let subtotal = 0;
  let deliveryCosts = 0;
  if (delivery) deliveryCosts = deliveryCostsValue();
  for (let index = 0; index < priceRef.length; index++) {
    const eachPrice = parseFloat(priceRef[index].innerHTML); // https://www.w3schools.com/jsref/jsref_parsefloat.asp
    overallPrice += eachPrice;
  }
  if (overallPrice != "0.00") {
    overallPrice = (overallPrice + deliveryCosts).toFixed(2);
    subtotal = (overallPrice - deliveryCosts).toFixed(2);
    basketSummaryRef.innerHTML = renderBasketSummary(subtotal, deliveryCosts, overallPrice);
  } else {
    if (ordered) basketSummaryRef.innerHTML = basketOrderedTemplate();
    if (!ordered) basketSummaryRef.innerHTML = basketPreOrderTemplate();
  }
  return overallPrice;
}

function toggleBasket() {
  fixedScroll();
  baskedOpen = !baskedOpen;
  const basketRef = document.getElementById("basket");
  const orderAreaRef = document.getElementById("order_area");
  const basketButtonRef = document.getElementById("basketButton");
  const basketCloseRef = document.getElementById("basketClose");
  basketRef.classList.toggle("d_block");
  orderAreaRef.classList.toggle("d_none");
  basketButtonRef.classList.toggle("d_none");
  basketCloseRef.classList.toggle("d_block");
  if (!baskedOpen) renderBasketButton();
  dishesSticky();
}

function hideBasketButton() {
  const basketButtonRef = document.getElementById("basketButton");
  basketButtonRef.classList.toggle("d_none");
}

function fixedScroll() {
  const basketElementRef = document.getElementById("basketButton");
  const basketRef = document.getElementById("basket");
  const basketDishesRef = document.getElementById("basket_dishes");
  let scrollPosition = window.innerHeight + window.scrollY;
  let documentHeight = document.documentElement.scrollHeight;
  if (scrollPosition >= documentHeight - 75) {
    if (basketElementRef !== null) basketElementRef.classList.add("fixed-bottom");
    if (basketRef !== null && window.innerWidth > 900) basketRef.classList.add("fixed-basket");
    if (basketDishesRef !== null) basketDishesRef.classList.add("fixed-dishesBasket");
  } else {
    if (basketElementRef !== null) basketElementRef.classList.remove("fixed-bottom");
    if (basketRef !== null && window.innerWidth > 900) basketRef.classList.remove("fixed-basket");
    if (basketDishesRef !== null) basketDishesRef.classList.remove("fixed-dishesBasket");
  }
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
  if (deliveryStorage !== null) delivery = JSON.parse(deliveryStorage);

  const easterEggStorage = JSON.parse(localStorage.getItem("easterEgg"));
  if (easterEggStorage !== null) easterEgg = JSON.parse(easterEggStorage);
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
});
