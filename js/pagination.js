/*==========================================
    VE NATURALS
    Pagination JavaScript
    Part 1
==========================================*/

"use strict";

/*==============================
  Select Elements
==============================*/

const products = document.querySelectorAll(".product-card");
const pagination = document.querySelector(".pagination");

const productsPerPage = 12;
let currentPage = 1;

/*==============================
  Show Products
==============================*/

function showProducts(page){

    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;

    products.forEach((product,index)=>{

        if(index >= start && index < end){

            product.style.display = "block";

        }else{

            product.style.display = "none";

        }

    });

}

/*==============================
  Total Pages
==============================*/

function totalPages(){

    return Math.ceil(products.length / productsPerPage);

}
/*==========================================
    VE NATURALS
    Pagination JavaScript
    Part 2
==========================================*/

/*==============================
  Create Pagination Buttons
==============================*/

function createPagination(){

    if(!pagination) return;

    pagination.innerHTML = "";

    const total = totalPages();

    for(let i = 1; i <= total; i++){

        const button = document.createElement("button");

        button.classList.add("page-btn");

        button.innerText = i;

        if(i === currentPage){

            button.classList.add("active");

        }

        button.addEventListener("click",()=>{

            currentPage = i;

            showProducts(currentPage);

            updateActiveButton();

            window.scrollTo({

                top:0,
                behavior:"smooth"

            });

        });

        pagination.appendChild(button);

    }

}

/*==============================
  Update Active Button
==============================*/

function updateActiveButton(){

    const buttons = document.querySelectorAll(".page-btn");

    buttons.forEach((btn,index)=>{

        btn.classList.remove("active");

        if(index + 1 === currentPage){

            btn.classList.add("active");

        }

    });

}
/*==========================================
    VE NATURALS
    Pagination JavaScript
    Part 3
==========================================*/

/*==============================
  Previous Button
==============================*/

function previousPage(){

    if(currentPage > 1){

        currentPage--;

        showProducts(currentPage);

        updateActiveButton();

        updateNavigationButtons();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    }

}

/*==============================
  Next Button
==============================*/

function nextPage(){

    if(currentPage < totalPages()){

        currentPage++;

        showProducts(currentPage);

        updateActiveButton();

        updateNavigationButtons();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    }

}

/*==============================
  Previous & Next Buttons
==============================*/

const prevButton = document.querySelector(".prev-page");
const nextButton = document.querySelector(".next-page");

if(prevButton){

    prevButton.addEventListener("click", previousPage);

}

if(nextButton){

    nextButton.addEventListener("click", nextPage);

}

/*==============================
  Enable / Disable Buttons
==============================*/

function updateNavigationButtons(){

    if(prevButton){

        prevButton.disabled = currentPage === 1;

    }

    if(nextButton){

        nextButton.disabled = currentPage === totalPages();

    }

}
/*==========================================
    VE NATURALS
    Pagination JavaScript
    Part 4
==========================================*/

/*==============================
  First Page Button
==============================*/

const firstButton = document.querySelector(".first-page");

if(firstButton){

    firstButton.addEventListener("click",()=>{

        currentPage = 1;

        showProducts(currentPage);

        updateActiveButton();

        updateNavigationButtons();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}

/*==============================
  Last Page Button
==============================*/

const lastButton = document.querySelector(".last-page");

if(lastButton){

    lastButton.addEventListener("click",()=>{

        currentPage = totalPages();

        showProducts(currentPage);

        updateActiveButton();

        updateNavigationButtons();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}

/*==============================
  Keyboard Navigation
==============================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowLeft"){

        previousPage();

    }

    if(e.key==="ArrowRight"){

        nextPage();

    }

});

/*==============================
  Active Page Scroll
==============================*/

function scrollPagination(){

    if(!pagination) return;

    pagination.scrollIntoView({

        behavior:"smooth",
        block:"nearest"

    });

}

/*==============================
  Mobile Optimization
==============================*/

window.addEventListener("resize",()=>{

    if(window.innerWidth < 768){

        pagination.classList.add("mobile-pagination");

    }else{

        pagination.classList.remove("mobile-pagination");

    }

});
/*==========================================
    VE NATURALS
    Pagination JavaScript
    Part 5 (Final)
==========================================*/

/*==============================
  Refresh Pagination
==============================*/

function refreshPagination(){

    createPagination();

    showProducts(currentPage);

    updateActiveButton();

    updateNavigationButtons();

}

/*==============================
  Go To Page
==============================*/

function goToPage(page){

    if(page < 1 || page > totalPages()) return;

    currentPage = page;

    refreshPagination();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/*==============================
  Initialize Pagination
==============================*/

document.addEventListener("DOMContentLoaded",()=>{

    if(products.length > 0){

        refreshPagination();

    }

});

/*==============================
  Page Change Animation
==============================*/

function animateProducts(){

    products.forEach(product=>{

        if(product.style.display !== "none"){

            product.style.opacity = "0";

            product.style.transform = "translateY(20px)";

            setTimeout(()=>{

                product.style.opacity = "1";

                product.style.transform = "translateY(0)";

            },150);

        }

    });

}

document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("page-btn") ||
       e.target.classList.contains("prev-page") ||
       e.target.classList.contains("next-page") ||
       e.target.classList.contains("first-page") ||
       e.target.classList.contains("last-page")){

        animateProducts();

    }

});

/*==============================
  Console Message
==============================*/

console.log("====================================");
console.log(" VE NATURALS PAGINATION READY ");
console.log("====================================");

/*==============================
  Global Functions (Optional)
==============================*/

window.goToPage = goToPage;
window.nextPage = nextPage;
window.previousPage = previousPage;

/*==========================================
        End Pagination Script
==========================================*/
