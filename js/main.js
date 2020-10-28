const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");


cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
   modal.classList.toggle("is-open");
}

// * day 1

const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");

let login = '';

function toggleModalAuth() {
   modalAuth.classList.toggle("is-open");
}

function authorized() {
   console.log("Авторизован");
}

function notAuthorized() {
   console.log("Не авторизован");

   function logIn(e) {
      e.preventDefault();
      console.log('Логин');
   }

   buttonAuth.addEventListener("click", toggleModalAuth);
   closeAuth.addEventListener("click", toggleModalAuth);
   logInForm.addEventListener("submit", logIn)
}

if (login) {
   authorized();
} else {
   notAuthorized();
}
