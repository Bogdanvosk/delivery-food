'use strict'

const modal = document.querySelector('.modal')
const closeButton = document.querySelector('.modal-close')
const cartButton = document.querySelector('#cart-button')
const cancelButton = document.querySelector('#modal-cancel')

const toggleModal = () => {
    modal.classList.toggle('active')
}

cartButton.addEventListener('click', toggleModal)
closeButton.addEventListener('click', toggleModal)
cancelButton.addEventListener('click', toggleModal)

