function getNavTemplate() {
  return /*html*/ `
    <div onclick="window.location.href='./index.html';" class="main_container--nav--logo">
      <img src="./assets/img/bestell_logo.png" alt="QuickBite Logo">
    </div>
    `;
}

function getContainerHeadTemplate(menuDishes) {
  return /*html*/ `
      <div class="main_container--content--order_area--img_container_head">
        <img class="main_container--content--order_area--img_container_head--img" src="./assets/img/header.png" alt="Header Img" />
        <img onclick="useEasterEgg()" class="main_container--content--order_area--img_container_head--logo" src="./assets/img/maskottchen1.png" alt="Logo Dragon" />
      </div>
      <div class="main_container--content--order_area--restaurant_info">
        <h1 class="main_container--content--order_area--restaurant_info--heading">QuickBite</h1>
        <p class="main_container--content--order_area--restaurant_info--opening_times">Öffnungszeiten</p>
        <p class="main_container--content--order_area--restaurant_info--opening_times">Mo-Do 10:00 - 23:00</p>
        <p class="main_container--content--order_area--restaurant_info--opening_times">Fr-So 10:00 - 00:00</p>
        <div class="main_container--content--order_area--restaurant_info--rating">
      <svg
        class="main_container--content--order_area--restaurant_info--rating--stars" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 576 512">        
        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
        <!--!Font Awesome Free 6.6.0 by @font-awesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      </svg>
      <svg
        class="main_container--content--order_area--restaurant_info--rating--stars" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 576 512">        
        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
        <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      </svg>
      <svg
        class="main_container--content--order_area--restaurant_info--rating--stars" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 576 512">        
        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
        <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      </svg>
      <svg
        class="main_container--content--order_area--restaurant_info--rating--stars" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 576 512">        
        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
        <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      </svg>
      <svg 
        class="main_container--content--order_area--restaurant_info--rating--stars" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 576 512">
        <path d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3 0 289.2zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z"/>
        <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      </svg>
        </div>
      </div>
      <nav id="main_container--content--order_area--nav" class="main_container--content--order_area--nav">
        <div class="main_container--content--order_area--nav--menu_dishes">
          ${menuDishes}
        </div>
      </nav>      
  `;
}

function getCategoryNamesTemplate(index, menuDishes) {
  return /*html*/ `
    <a href="#dishesLink${index}">${menuDishes[index]}</a>
  `;
}

function getCategoryTemplate(index, heading) {
  return /*html*/ `
      <div class="main_container--content--order_area--main_dishes">      
      <div class="main_container--content--order_area--main_dishes--content">
        <img id="dishesLink${index}" src="./assets/img/${index}.jpg" alt="Img" class="main_container--content--order_area--main_dishes--img" />
        <h2 class="main_container--content--order_area--main_dishes--content--heading">${heading}</h2>
        <div id="dishes${index}" >
        </div>
      </div>
    </div>
    
  `;
}

function getDishesTemplate(index, dishesArray, dishType) {
  return /*html*/ `
  
    <div class="main_container--content--order_area--main_dishes--content--dishes">
      <h3 class="main_container--content--order_area--main_dishes--content--dishes--heading">${dishesArray[index].name}</h3>
      <p class="main_container--content--order_area--main_dishes--content--dishes--ingredients"> ● ${dishesArray[index].ingredients
        .join(" ● ")
        .replace(/, /g, " ")}</p>
      <span class="main_container--content--order_area--main_dishes--content--dishes--price">${dishesArray[index].price}€</span>
      <svg  onclick="updateBasketValue(${index},'${dishType}')" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path
          d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
    </div> 
  `;
}

function renderFooterTemplate() {
  return /*html*/ `
    <div class="footer-content">

      <div class="mascot-wrapper">
        <img class="footer-mascot" src="./assets/img/maskottchen1.png" alt="QuickBite Mascot">

        <div class="dust dust1"></div>
        <div class="dust dust2"></div>
        <div class="dust dust3"></div>
      </div>

      <p class="footer-copyright">© 2026 QuickBite • All Rights Reserved</p>

    </div>
  `;
}

function renderBasketHeader() {
  return /*html*/ `
  <h1 class="main_container--content--basket--header_container--heading">Warenkorb</h1>
  <svg
    onclick="toggleBasket()"
    class="main_container--content--basket--header_container--close_button"
    id="basketClose" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 -960 960 960">
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
  </svg>
  <div class="main_container--content--basket--header_container--switch_delivery">
  <button onclick="setDeliveryMode(true)" id="delivery_button" class="main_container--content--basket--header_container--switch_delivery--button">
  <svg     
    class="main_container--content--basket--header_container--switch_delivery--button--icon"
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 -960 960 960">
    <path d="M200-80q-83 0-141.5-58.5T0-280q0-83 58.5-141.5T200-480q83 0 141.5 58.5T400-280q0 83-58.5 141.5T200-80Zm0-80q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm240-40v-200L312-512q-12-11-18-25.5t-6-30.5q0-16 6.5-30.5T312-624l112-112q12-12 27.5-18t32.5-6q17 0 32.5 6t27.5 18l76 76q28 28 64 44t76 16v80q-57 0-108.5-22T560-604l-32-32-96 96 88 92v248h-80Zm180-540q-33 0-56.5-23.5T540-820q0-33 23.5-56.5T620-900q33 0 56.5 23.5T700-820q0 33-23.5 56.5T620-740ZM760-80q-83 0-141.5-58.5T560-280q0-83 58.5-141.5T760-480q83 0 141.5 58.5T960-280q0 83-58.5 141.5T760-80Zm0-80q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/>
  </svg>
  <div class="main_container--content--basket--header_container--switch_delivery--button--info">
    <p>Lieferung</p>
    <p>15-40min</p>
  </div>
  </button>
  <button onclick="setDeliveryMode(false)" id="pickup_button" class="main_container--content--basket--header_container--switch_delivery--button">
  <svg 
    class="main_container--content--basket--header_container--switch_delivery--button--icon"
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 -960 960 960">
    <path d="M400-80v-280h-80v-240q0-33 23.5-56.5T400-680h160q33 0 56.5 23.5T640-600v240h-80v280H400Zm80-640q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720Z"/>
  </svg>
  <div class="main_container--content--basket--header_container--switch_delivery--button--info">
    <p>Abholung</p>
    <p>15min</p>
  </div>
  </button>
  </div>
`;
}

function basketPreOrderTemplate() {
  return /*html*/ `
    <div class="main_container--content--basket--summary_container--order_info">
      <h1 class="main_container--content--basket--summary_container--order_info--heading">Wähle dein Festmahl</h1>
      <p class="main_container--content--basket--summary_container--order_info--textarea">Stöbere durch unsere Speisekarte, stelle dein Menü zusammen und genieße deine Mahlzeit.</p>
    </div>
  `;
}

function renderBasketDishes(index, dishesArray, dishType, currentPrice) {
  return /*html*/ `
<div class="main_container--content--basket--dishes_container--dishes">
  <span class="main_container--content--basket--dishes_container--dishes--info">
    <div class="main_container--content--basket--dishes_container--dishes--info--name">${dishesArray[index].name}</div>
    <div class="main_container--content--basket--dishes_container--dishes--info--data">
      <div class="main_container--content--basket--dishes_container--dishes--info--data--value">
        <svg
          onclick="removeFromBasket(${index},'${dishType}')"
          class="main_container--content--basket--dishes_container--dishes--info--data--value--button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960">
          <path d="M200-440v-80h560v80H200Z" />
        </svg>
        ${dishesArray[index].basketValue}
        <svg
          onclick="updateBasketValue(${index},'${dishType}')"
          class="main_container--content--basket--dishes_container--dishes--info--data--value--button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960">
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </div>
      <div class="main_container--content--basket--dishes_container--dishes--info--data--price">
        <span class="main_container--content--basket--dishes_container--dishes--info--data--price--value">${currentPrice}</span>€
      </div>
      <svg
        onclick="clearBasket(${index},'${dishType}')"
        class="main_container--content--basket--dishes_container--dishes--info--data--value--button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960">
        <path
          d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
      </svg>
    </div>    
  </span>
</div>
  `;
}

function renderBasketSummary(subtotal, deliveryCosts, overallPrice) {
  return /*html*/ `
    <div class="main_container--content--basket--summary_container--overall_price_container">
      <div class="main_container--content--basket--summary_container--overall_price_container--subtotal">
        <span>Zwischensumme:</span>
        <span>${subtotal}€</span>
      </div>
      <div class="main_container--content--basket--summary_container--overall_price_container--delivery_costs">
        <span>Lieferkosten:</span>
        <span class="main_container--content--basket--summary_container--overall_price_container--delivery_costs--span">
        <!-- !Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
        <svg 
          id="EasterEggIcon"
          class="main_container--content--basket--summary_container--overall_price_container--delivery_costs--span--EasterEgg"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 512 512">
          <path fill="#cc0000" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
        </svg>
          ${deliveryCosts}€
        </span>
      </div>
      <div class="main_container--content--basket--summary_container--overall_price_container--overall_price">
        <span>Gesamt:</span> 
        <span>${overallPrice}€</span>
      </div>
      <button onclick="triggerOrder()" class="main_container--content--basket--summary_container--overall_price_container--pay_button">Bezahlen: ${overallPrice}€</button>
    </div>
    
  `;
}

function basketOrderedTemplate() {

  let deliveryText = delivery
    ? "Dein Essen wird schon bald frisch und heiß zu dir geliefert."
    : "Deine Bestellung steht schon bald zur Abholung bereit.";

  return /*html*/ `
    <div class="main_container--content--basket--summary_container--order_info">
      <h1 class="main_container--content--basket--summary_container--order_info--heading">
        Vielen Dank für deine Bestellung!
      </h1>

      <p class="main_container--content--basket--summary_container--order_info--textarea">
        ${deliveryText}
      </p>

      <img class="main_container--content--basket--summary_container--order_info--img"
        src="./assets/img/burger_basket.png"
        alt="">
    </div>
  `;
}

function renderBasketButtonTemplate(overallPrice) {
  return /*html*/ `      
    <button onclick="toggleBasket()" class="main_container--basket" id="basketButton">Warenkorb:<p>${overallPrice}€</p></button>
  `;
}
