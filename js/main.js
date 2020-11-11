"use strict";

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

let login = localStorage.getItem("Login Delivery");

const card = [];

// * Получение данных из базы
const getData = async function (url) {
   const response = await fetch(url);

   // * Отлавливание ошибки
   if (!response.ok) {
      throw new Error(
         `Ошибка по адресу ${url}, статус: ошибка ${response.status}`
      );
   }

   return await response.json();
};

function toggleModal() {
   modal.classList.toggle("is-open");
}

// * Открытие и закрытие модального окна авторизации
function toggleModalAuth() {
   modalAuth.classList.toggle("is-open");
}

function returnMain() {
   containerPromo.classList.remove("hide");
   restaurants.classList.remove("hide");
   menu.classList.add("hide");
}

function authorized() {
   userName.textContent = login;

   buttonAuth.style.display = "none";
   userName.style.display = "inline";
   buttonOut.style.display = "block";

   // ! Выход
   function logOut() {
      login = null;
      localStorage.removeItem("Login Delivery");
      buttonAuth.style.display = "";
      userName.style.display = "";
      buttonOut.style.display = "";
      cartButton.style.display = "";
      buttonOut.removeEventListener("click", logOut);
      checkAuth();
      returnMain();
   }

   console.log("Авторизован");
   userName.textContent = login;
   buttonAuth.style.display = "none";
   userName.style.display = "inline";
   buttonOut.style.display = "flex";
   cartButton.style.display = "flex";
   buttonOut.addEventListener("click", logOut);
}

function notAuthorized() {
   console.log("Не авторизован");

   // ! Вход
   function logIn(e) {
      e.preventDefault();
      login = loginInput.value;

      localStorage.setItem("Login Delivery", login);

      toggleModalAuth();
      buttonAuth.removeEventListener("click", toggleModalAuth);
      closeAuth.removeEventListener("click", toggleModalAuth);
      logInForm.removeEventListener("submit", logIn);
      logInForm.reset();
      checkAuth();
   }

   buttonAuth.addEventListener("click", toggleModalAuth);
   closeAuth.addEventListener("click", toggleModalAuth);
   logInForm.addEventListener("submit", logIn);
}

// * Проверка авторизован ли пользователь
function checkAuth() {
   if (login) {
      authorized();
   } else {
      notAuthorized();
   }
}

// * Генератор карточек ресторанов
function createCardRestaurants({
   // ! Деструктуризация обьектов
   image,
   kitchen,
   name,
   price,
   stars,
   products,
   time_of_delivery: timeOfDelivery,
}) {
   const card = `
      <a class="card card-restaurant" data-products='${products}'>
        <img
            src="${image}"
            alt="image"
            class="card-image"
        />
        <div class="card-text">
            <div class="card-heading">
              <h3 class="card-title">${name}</h3>
              <span class="card-tag tag">${timeOfDelivery} мин</span>
            </div>
            <div class="card-info">
              <div class="rating">${stars}</div>
              <div class="price">От ${price} ₽</div>
              <div class="category">${kitchen}</div>
            </div>
        </div>
      </a>
    `;

   cardsRestaurants.insertAdjacentHTML("beforeend", card);
}

// * Генератор карточек пицц
function createCardGood({ description, image, name, price }) {
   const card = document.createElement("div");
   card.classList.add("card");

   card.insertAdjacentHTML(
      "beforeend",
      `
      <img
        src="${image}"
        alt="image"
        class="card-image"
      />
      <div class="card-text">
        <div class="card-heading">
            <h3 class="card-title card-title-reg">
              ${name}
            </h3>
        </div>
        <div class="card-info">
            <div class="ingredients">
              ${description}
            </div>
        </div>
        <div class="card-buttons">
            <button
              class="button button-primary button-add-cart"
            >
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price card-price-bold">${price} ₽</strong>
        </div>
      </div>
  `
   );

   cardsMenu.insertAdjacentElement("beforeend", card);
}

function openGoods(event) {
   const target = event.target;
   if (login) {
      const restaurant = target.closest(".card-restaurant");

      if (restaurant) {
         cardsMenu.textContent = "";
         containerPromo.classList.add("hide");
         restaurants.classList.add("hide");
         menu.classList.remove("hide");
         getData(`./db/${restaurant.dataset.products}`).then(function (data) {
            data.forEach(createCardGood);
         });
      }
   } else {
      toggleModalAuth();
   }
}

function addToCart(e) {
   const target = e.target;
   const buttonAddToCard = target.closest(".button-add-cart");

   if ((target == buttonAddToCard)) {
      const card = target.closest('.card');
      const title = card.querySelector('.card-title-reg');
      const cost = card.querySelector('.card-price');
   }
}

function init() {
   getData("./db/partners.json").then(function (data) {
      data.forEach(createCardRestaurants);
   });

   cartButton.addEventListener("click", toggleModal);

   cardsMenu.addEventListener("click", addToCart);

   close.addEventListener("click", toggleModal);

   cardsRestaurants.addEventListener("click", openGoods);

   logo.addEventListener("click", function () {
      containerPromo.classList.remove("hide");
      restaurants.classList.remove("hide");
      menu.classList.add("hide");
   });

   checkAuth();

   new Swiper(".swiper-container", {
      loop: true,
      sliderPreview: 1,
      autoplay: true,
   });
}

init();
