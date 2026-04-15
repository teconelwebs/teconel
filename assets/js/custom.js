console.log('custom.js is loaded and working!');



// var swiper = new Swiper('.swiper-container', {
//         slidesPerView: 1,
//         spaceBetween: 10,
//         navigation: {
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//         },
//         breakpoints: {
//             640: {
//                 slidesPerView: 2,
//                 spaceBetween: 20,
//             },
//             768: {
//                 slidesPerView: 3,
//                 spaceBetween: 30,
//             },
//             1024: {
//                 slidesPerView: 5,
//                 spaceBetween: 40,
//             },
//         }
// });

function cartQty(action) {
    // Select the quantity input element
    var quantityInput = document.querySelector('.quantity');
    
    // Get the current quantity value
    var currentQuantity = parseInt(quantityInput.value);
    
    // Determine the new quantity based on the action
    if (action === 'plus') {
        if (currentQuantity < parseInt(quantityInput.max)) {
            quantityInput.value = currentQuantity + 1;
        }
    } else if (action === 'minus') {
        if (currentQuantity > parseInt(quantityInput.min)) {
            quantityInput.value = currentQuantity - 1;
        }
    }
}

// document.addEventListener('DOMContentLoaded', function () {
//             const plusButton = document.querySelector('.quantity-plus');
//             const minusButton = document.querySelector('.quantity-minus');
//             const quantityInput = document.querySelector('.quantity');

//             plusButton.addEventListener('click', function () {
//                 let currentValue = parseInt(quantityInput.value);
//                 if (currentValue < parseInt(quantityInput.max)) {
//                     quantityInput.value = currentValue + 1;
//                 }
//             });

//             minusButton.addEventListener('click', function () {
//                 let currentValue = parseInt(quantityInput.value);
//                 if (currentValue > parseInt(quantityInput.min)) {
//                     quantityInput.value = currentValue - 1;
//                 }
//             });
//         });