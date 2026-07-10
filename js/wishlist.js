/*==========================================
    VE NATURALS
    Wishlist JavaScript
    Part 1
==========================================*/

"use strict";

/*==============================
  Select Elements
==============================*/

const wishlistButtons = document.querySelectorAll(".wishlist-btn");
const wishlistCounter = document.querySelector(".wishlist-count");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/*==============================
  Update Counter
==============================*/

function updateWishlistCounter(){

    if(wishlistCounter){

        wishlistCounter.textContent = wishlist.length;

    }

}

/*==============================
  Save Wishlist
==============================*/

function saveWishlist(){

    localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

    );

    updateWishlistCounter();

}

/*==============================
  Add Product
==============================*/

function addToWishlist(product){

    const exists = wishlist.find(item=>item.id===product.id);

    if(exists){

        alert("Product already exists in Wishlist");

        return;

    }

    wishlist.push(product);

    saveWishlist();

    alert("Product added to Wishlist ❤️");

}
/*==========================================
    VE NATURALS
    Wishlist JavaScript
    Part 2
==========================================*/

/*==============================
  Wishlist Button Click
==============================*/

wishlistButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const product={

            id:button.dataset.id,

            name:button.dataset.name,

            price:button.dataset.price,

            image:button.dataset.image

        };

        addToWishlist(product);

        button.classList.add("active");

        const icon=button.querySelector("i");

        if(icon){

            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");

        }

    });

});

/*==============================
  Restore Wishlist Icons
==============================*/

wishlistButtons.forEach(button=>{

    const id=button.dataset.id;

    const exists=wishlist.find(item=>item.id===id);

    if(exists){

        button.classList.add("active");

        const icon=button.querySelector("i");

        if(icon){

            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");

        }

    }

});

/*==============================
  Remove Product
==============================*/

function removeFromWishlist(id){

    wishlist=wishlist.filter(item=>item.id!==id);

    saveWishlist();

}

/*==============================
  Toggle Wishlist
==============================*/

function toggleWishlist(button){

    const id=button.dataset.id;

    const exists=wishlist.find(item=>item.id===id);

    if(exists){

        removeFromWishlist(id);

        button.classList.remove("active");

        const icon=button.querySelector("i");

        if(icon){

            icon.classList.remove("fa-solid");

            icon.classList.add("fa-regular");

        }

    }else{

        const product={

            id:button.dataset.id,

            name:button.dataset.name,

            price:button.dataset.price,

            image:button.dataset.image

        };

        addToWishlist(product);

    }

}

/*==============================
  Initialize Counter
==============================*/

updateWishlistCounter();
/*==========================================
    VE NATURALS
    Wishlist JavaScript
    Part 3
==========================================*/

/*==============================
  Wishlist Container
==============================*/

const wishlistContainer =
document.querySelector(".wishlist-container");

/*==============================
  Display Wishlist
==============================*/

function displayWishlist(){

    if(!wishlistContainer) return;

    wishlistContainer.innerHTML = "";

    if(wishlist.length === 0){

        wishlistContainer.innerHTML = `

        <div class="empty-wishlist">

            <i class="fa-regular fa-heart"></i>

            <h2>Your Wishlist is Empty</h2>

            <p>Add your favourite products to wishlist.</p>

            <a href="shop.html" class="shop-btn">

                Continue Shopping

            </a>

        </div>

        `;

        return;

    }

    wishlist.forEach(product=>{

        wishlistContainer.innerHTML += `

        <div class="wishlist-item">

            <img src="${product.image}"
                 alt="${product.name}">

            <div class="wishlist-info">

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

            </div>

            <div class="wishlist-actions">

                <button
                    class="move-cart"
                    data-id="${product.id}">

                    <i class="fa-solid fa-cart-shopping"></i>

                    Add to Cart

                </button>

                <button
                    class="remove-item"
                    data-id="${product.id}">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

        `;

    });

    attachWishlistEvents();

}

/*==============================
  Remove Item Event
==============================*/

function attachWishlistEvents(){

    document.querySelectorAll(".remove-item")

    .forEach(button=>{

        button.addEventListener("click",()=>{

            removeFromWishlist(button.dataset.id);

            displayWishlist();

        });

    });

}
/*==========================================
    VE NATURALS
    Wishlist JavaScript
    Part 4
==========================================*/

/*==============================
  Move To Cart
==============================*/

function moveToCart(id){

    const product = wishlist.find(item => item.id === id);

    if(!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(item => item.id === id);

    if(!exists){

        product.quantity = 1;

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

    }

    removeFromWishlist(id);

    displayWishlist();

    alert("Product moved to Cart 🛒");

}

/*==============================
  Move Cart Event
==============================*/

function attachMoveCartEvents(){

    document.querySelectorAll(".move-cart").forEach(button=>{

        button.addEventListener("click",()=>{

            moveToCart(button.dataset.id);

        });

    });

}

/*==============================
  Clear Wishlist
==============================*/

const clearWishlistBtn =
document.querySelector(".clear-wishlist");

if(clearWishlistBtn){

    clearWishlistBtn.addEventListener("click",()=>{

        const confirmDelete = confirm(
            "Are you sure you want to clear your wishlist?"
        );

        if(confirmDelete){

            wishlist = [];

            saveWishlist();

            displayWishlist();

        }

    });

}

/*==============================
  Refresh Wishlist
==============================*/

function refreshWishlist(){

    saveWishlist();

    displayWishlist();

    updateWishlistCounter();

}
/*==========================================
    VE NATURALS
    Wishlist JavaScript
    Part 5 (Final)
==========================================*/

/*==============================
  Initialize Wishlist
==============================*/

document.addEventListener("DOMContentLoaded",()=>{

    updateWishlistCounter();

    displayWishlist();

    attachMoveCartEvents();

});

/*==============================
  Storage Sync
==============================*/

window.addEventListener("storage",()=>{

    wishlist = JSON.parse(

        localStorage.getItem("wishlist")

    ) || [];

    updateWishlistCounter();

    displayWishlist();

});

/*==============================
  Refresh After Update
==============================*/

function refreshWishlistUI(){

    wishlist = JSON.parse(

        localStorage.getItem("wishlist")

    ) || [];

    updateWishlistCounter();

    displayWishlist();

}

/*==============================
  Auto Refresh Every 5 Seconds
==============================*/

setInterval(()=>{

    refreshWishlistUI();

},5000);

/*==============================
  Performance Optimization
==============================*/

window.addEventListener("pageshow",()=>{

    refreshWishlistUI();

});

/*==============================
  Console Message
==============================*/

console.log("====================================");
console.log(" VE NATURALS WISHLIST READY ");
console.log("====================================");

/*==============================
  Global Functions
==============================*/

window.addToWishlist = addToWishlist;
window.removeFromWishlist = removeFromWishlist;
window.refreshWishlist = refreshWishlistUI;

/*==========================================
        End Wishlist Script
==========================================*/
