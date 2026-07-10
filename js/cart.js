/*==========================================
    VE NATURALS
    Cart JavaScript
    Part 1
==========================================*/

"use strict";

/*==============================
  Select Elements
==============================*/

const addCartButtons = document.querySelectorAll(".add-cart");
const cartCounter = document.querySelector(".cart-count");
const cartContainer = document.querySelector(".cart-container");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/*==============================
  Save Cart
==============================*/

function saveCart(){

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    updateCartCounter();

}

/*==============================
  Update Cart Counter
==============================*/

function updateCartCounter(){

    if(cartCounter){

        cartCounter.textContent = cart.length;

    }

}

/*==============================
  Add Product To Cart
==============================*/

function addToCart(product){

    const exists = cart.find(item => item.id === product.id);

    if(exists){

        exists.quantity++;

    }else{

        product.quantity = 1;

        cart.push(product);

    }

    saveCart();

    alert(product.name + " added to Cart.");

}

/*==============================
  Initialize Counter
==============================*/

updateCartCounter();
/*==========================================
    VE NATURALS
    Cart JavaScript
    Part 2
==========================================*/

/*==============================
  Add To Cart Button Event
==============================*/

addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const product = {

            id: button.dataset.id,
            name: button.dataset.name,
            price: Number(button.dataset.price),
            image: button.dataset.image,
            quantity: 1

        };

        addToCart(product);

        button.classList.add("added");

        setTimeout(() => {

            button.classList.remove("added");

        }, 1000);

    });

});

/*==============================
  Remove Product
==============================*/

function removeFromCart(id){

    cart = cart.filter(item => item.id !== id);

    saveCart();

    displayCart();

}

/*==============================
  Increase Quantity
==============================*/

function increaseQuantity(id){

    const product = cart.find(item => item.id === id);

    if(product){

        product.quantity++;

        saveCart();

        displayCart();

    }

}

/*==============================
  Decrease Quantity
==============================*/

function decreaseQuantity(id){

    const product = cart.find(item => item.id === id);

    if(!product) return;

    if(product.quantity > 1){

        product.quantity--;

    }else{

        removeFromCart(id);

        return;

    }

    saveCart();

    displayCart();

}
/*==========================================
    VE NATURALS
    Cart JavaScript
    Part 3
==========================================*/

/*==============================
  Cart Display
==============================*/

function displayCart(){

    if(!cartContainer) return;

    cartContainer.innerHTML = "";

    if(cart.length === 0){

        cartContainer.innerHTML = `

        <div class="empty-cart">

            <i class="fa-solid fa-cart-shopping"></i>

            <h2>Your Cart is Empty</h2>

            <p>Add products to your shopping cart.</p>

            <a href="shop.html" class="shop-btn">

                Continue Shopping

            </a>

        </div>

        `;

        return;

    }

    let subtotal = 0;

    cart.forEach(product=>{

        subtotal += product.price * product.quantity;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <div class="cart-image">

                <img src="${product.image}" alt="${product.name}">

            </div>

            <div class="cart-details">

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

            </div>

            <div class="cart-quantity">

                <button class="qty-minus"
                        data-id="${product.id}">

                    -

                </button>

                <span>${product.quantity}</span>

                <button class="qty-plus"
                        data-id="${product.id}">

                    +

                </button>

            </div>

            <div class="cart-total">

                ₹${product.price * product.quantity}

            </div>

            <button class="remove-cart"

                    data-id="${product.id}">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

    });

    updateCartSummary(subtotal);

    attachCartEvents();

}

/*==============================
  Cart Summary
==============================*/

function updateCartSummary(subtotal){

    const subtotalBox = document.querySelector(".subtotal-price");
    const totalBox = document.querySelector(".total-price");

    const shipping = subtotal >= 999 ? 0 : 99;

    const total = subtotal + shipping;

    if(subtotalBox){

        subtotalBox.innerHTML = "₹" + subtotal;

    }

    if(totalBox){

        totalBox.innerHTML = "₹" + total;

    }

}
/*==========================================
    VE NATURALS
    Cart JavaScript
    Part 4
==========================================*/

/*==============================
  Cart Events
==============================*/

function attachCartEvents(){

    /* Plus Button */

    document.querySelectorAll(".qty-plus").forEach(button=>{

        button.addEventListener("click",()=>{

            increaseQuantity(button.dataset.id);

        });

    });

    /* Minus Button */

    document.querySelectorAll(".qty-minus").forEach(button=>{

        button.addEventListener("click",()=>{

            decreaseQuantity(button.dataset.id);

        });

    });

    /* Remove Button */

    document.querySelectorAll(".remove-cart").forEach(button=>{

        button.addEventListener("click",()=>{

            if(confirm("Remove this product from cart?")){

                removeFromCart(button.dataset.id);

            }

        });

    });

}

/*==============================
  Clear Cart
==============================*/

const clearCartBtn = document.querySelector(".clear-cart");

if(clearCartBtn){

    clearCartBtn.addEventListener("click",()=>{

        if(confirm("Are you sure you want to clear your cart?")){

            cart = [];

            saveCart();

            displayCart();

        }

    });

}

/*==============================
  Refresh Cart
==============================*/

function refreshCart(){

    saveCart();

    displayCart();

}

/*==============================
  Checkout Button
==============================*/

const checkoutBtn = document.querySelector(".checkout-btn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click",()=>{

        if(cart.length===0){

            alert("Your cart is empty.");

            return;

        }

        window.location.href="checkout.html";

    });

}
/*==========================================
    VE NATURALS
    Cart JavaScript
    Part 5 (Final)
==========================================*/

/*==============================
  Coupon Code
==============================*/

const couponInput = document.querySelector(".coupon-input");
const applyCouponBtn = document.querySelector(".apply-coupon");

let discount = 0;

if(applyCouponBtn){

    applyCouponBtn.addEventListener("click",()=>{

        if(!couponInput) return;

        const code = couponInput.value.trim().toUpperCase();

        if(code === "VE10"){

            discount = 10;
            alert("10% Discount Applied");

        }else if(code === "VE20"){

            discount = 20;
            alert("20% Discount Applied");

        }else{

            discount = 0;
            alert("Invalid Coupon Code");

        }

        displayCart();

    });

}

/*==============================
  Local Storage
