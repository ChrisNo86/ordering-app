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
  let index = Object.keys(dishes).indexOf(dishType);
  if (index === -1) return;

  const dishesArray = dishes[dishType];
  const containerRef = document.getElementById("dishes" + index);

  containerRef.innerHTML = "";
  for (let i = 0; i < dishesArray.length; i++) {
    containerRef.innerHTML += getDishesTemplate(i, dishesArray, dishType);
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

  Object.keys(dishes).forEach(d => renderDishes(d));

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

function setDeliveryMode(isDelivery) {
  delivery = isDelivery;

  const dBtn = document.getElementById("delivery_button");
  const pBtn = document.getElementById("pickup_button");

  dBtn.style.backgroundColor = isDelivery ? "white" : "rgb(216,216,216)";
  pBtn.style.backgroundColor = isDelivery ? "rgb(216,216,216)" : "white";
checkDelivery();
  updateBasketContents();
  saveToLocalStorage();
}

function renderBasketNav() {
  const basketHeaderRef = document.getElementById("basket_Header");
  basketHeaderRef.innerHTML += renderBasketHeader();
}

function updateBasketContents() {
  const ref = document.getElementById("basket_dishes");
  ref.innerHTML = "";

  Object.keys(dishes).forEach(type => {
    dishes[type].forEach((dish, i) => {
      if (dish.basketValue > 0) {
        const price = (dish.price * dish.basketValue).toFixed(2);
        ref.innerHTML += renderBasketDishes(i, dishes[type], type, price);
      }
    });
  });

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
  Object.keys(dishes).forEach(cat => {
    dishes[cat].forEach(d => d.basketValue = 0);
  });

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
  const prices = document.querySelectorAll(".main_container--content--basket--dishes_container--dishes--info--data--price--value");
  const summaryRef = document.getElementById("basket_summary");

  let subtotal = [...prices].reduce((sum, el) => sum + parseFloat(el.innerHTML), 0);
  let deliveryCosts = delivery ? deliveryCostsValue() : 0;

  if (subtotal > 0) {
    let total = (subtotal + deliveryCosts).toFixed(2);
    summaryRef.innerHTML = renderBasketSummary(subtotal.toFixed(2), deliveryCosts, total);
    return total;
  }

  summaryRef.innerHTML = ordered ? basketOrderedTemplate() : basketPreOrderTemplate();
  return "0.00";
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
  const btn = document.getElementById("basketButton");
  const basket = document.getElementById("basket");
  const dishesRef = document.getElementById("basket_dishes");

  let isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 75;

  btn?.classList.toggle("fixed-bottom", isBottom);
  dishesRef?.classList.toggle("fixed-dishesBasket", isBottom);

  if (basket && window.innerWidth > 900) {
    basket.classList.toggle("fixed-basket", isBottom);
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
  let data = {};

  Object.keys(dishes).forEach(cat => {
    data[cat] = dishes[cat].map(d => d.basketValue);
  });

  localStorage.setItem("currentBasketValue", JSON.stringify(data));
  localStorage.setItem("delivery", JSON.stringify(delivery));
  localStorage.setItem("easterEgg", JSON.stringify(easterEgg));
}

function getFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("currentBasketValue"));

  if (data) {
    Object.keys(dishes).forEach(cat => {
      if (!data[cat]) return;
      dishes[cat].forEach((d, i) => d.basketValue = data[cat][i]);
    });
  }

  delivery = JSON.parse(localStorage.getItem("delivery")) ?? delivery;
  easterEgg = JSON.parse(localStorage.getItem("easterEgg")) ?? easterEgg;
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