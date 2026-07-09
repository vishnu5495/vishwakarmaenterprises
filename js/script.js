/*==========================================
    VE NATURALS
    Main JavaScript
    Part 1
==========================================*/

"use strict";

/*==============================
  Select Elements
==============================*/

const header = document.querySelector(".header");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navbar = document.querySelector(".navbar");
const backToTop = document.querySelector(".back-to-top");
const navLinks = document.querySelectorAll(".navbar a");

/*==============================
  Sticky Header
==============================*/

window.addEventListener("scroll", () => {

    if(window.scrollY > 100){

        header.classList.add("sticky");

    }else{

        header.classList.remove("sticky");

    }

});

/*==============================
  Mobile Menu
==============================*/

if(mobileMenuBtn){

    mobileMenuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");
        mobileMenuBtn.classList.toggle("active");

    });

}

/*==============================
  Close Menu After Click
==============================*/

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        if(mobileMenuBtn){

            mobileMenuBtn.classList.remove("active");

        }

    });

});
/*==========================================
    VE NATURALS
    Main JavaScript
    Part 2
==========================================*/

/*==============================
  Back To Top Button
==============================*/

if(backToTop){

    window.addEventListener("scroll", () => {

        if(window.scrollY > 300){

            backToTop.style.display = "flex";

        }else{

            backToTop.style.display = "none";

        }

    });

    backToTop.addEventListener("click", (e) => {

        e.preventDefault();

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}

/*==============================
  Smooth Scroll
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",
                block:"start"

            });

        }

    });

});

/*==============================
  Active Navigation
==============================*/

const currentPage=window.location.pathname.split("/").pop();

navLinks.forEach(link=>{

    const href=link.getAttribute("href");

    if(href===currentPage){

        link.classList.add("active");

    }

});

/*==============================
  Window Loaded
==============================*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});
/*==========================================
    VE NATURALS
    Main JavaScript
    Part 3
==========================================*/

/*==============================
  Scroll Reveal Animation
==============================*/

const revealElements = document.querySelectorAll(
    ".fade-up, .fade-in, .zoom-in"
);

function revealOnScroll(){

    const windowHeight = window.innerHeight;

    revealElements.forEach(element=>{

        const elementTop = element.getBoundingClientRect().top;

        if(elementTop < windowHeight - 100){

            element.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/*==============================
  Counter Animation
==============================*/

const counters = document.querySelectorAll(".counter");

function startCounter(){

    counters.forEach(counter=>{

        const target = +counter.getAttribute("data-target");

        let count = 0;

        const speed = target / 150;

        function update(){

            count += speed;

            if(count < target){

                counter.innerText = Math.floor(count);

                requestAnimationFrame(update);

            }else{

                counter.innerText = target;

            }

        }

        update();

    });

}

let counterStarted = false;

window.addEventListener("scroll",()=>{

    const section = document.querySelector(".counter-section");

    if(!section) return;

    const top = section.getBoundingClientRect().top;

    if(top < window.innerHeight && !counterStarted){

        counterStarted = true;

        startCounter();

    }

});

/*==============================
  Image Lazy Loading
==============================*/

const lazyImages = document.querySelectorAll("img[data-src]");

if("IntersectionObserver" in window){

    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                const img = entry.target;

                img.src = img.dataset.src;

                img.removeAttribute("data-src");

                observer.unobserve(img);

            }

        });

    });

    lazyImages.forEach(img=>observer.observe(img));

}

/*==============================
  Button Click Animation
==============================*/

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",()=>{

        button.classList.add("clicked");

        setTimeout(()=>{

            button.classList.remove("clicked");

        },300);

    });

});
/*==========================================
    VE NATURALS
    Main JavaScript
    Part 4
==========================================*/

/*==============================
  Dark Mode Toggle
==============================*/

const themeBtn = document.querySelector(".theme-toggle");

if(themeBtn){

    themeBtn.addEventListener("click",()=>{

        document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark-mode")
            ? "dark"
            : "light"
        );

    });

    if(localStorage.getItem("theme")==="dark"){

        document.body.classList.add("dark-mode");

    }

}

/*==============================
  Search Popup
==============================*/

const searchBtn = document.querySelector(".search-btn");
const searchPopup = document.querySelector(".search-popup");
const closeSearch = document.querySelector(".close-search");

if(searchBtn && searchPopup){

    searchBtn.addEventListener("click",()=>{

        searchPopup.classList.add("active");

    });

}

if(closeSearch && searchPopup){

    closeSearch.addEventListener("click",()=>{

        searchPopup.classList.remove("active");

    });

}

/*==============================
  Cart Counter
==============================*/

const cartCount = document.querySelector(".cart-count");

let cartItems = Number(localStorage.getItem("cartCount")) || 0;

if(cartCount){

    cartCount.innerHTML = cartItems;

}

/*==============================
  Wishlist Counter
==============================*/

const wishlistCount = document.querySelector(".wishlist-count");

let wishlistItems = Number(localStorage.getItem("wishlistCount")) || 0;

if(wishlistCount){

    wishlistCount.innerHTML = wishlistItems;

}

/*==============================
  Notification
==============================*/

function showNotification(message){

    const notify = document.createElement("div");

    notify.className = "notification";

    notify.innerHTML = message;

    document.body.appendChild(notify);

    setTimeout(()=>{

        notify.classList.add("show");

    },100);

    setTimeout(()=>{

        notify.classList.remove("show");

        setTimeout(()=>{

            notify.remove();

        },300);

    },3000);

}

/*==============================
  Online / Offline Status
==============================*/

window.addEventListener("online",()=>{

    showNotification("✅ Internet Connected");

});

window.addEventListener("offline",()=>{

    showNotification("❌ Internet Disconnected");

});
/*==========================================
    VE NATURALS
    Main JavaScript
    Part 5 (Final)
==========================================*/

/*==============================
  Page Loader
==============================*/

window.addEventListener("load",()=>{

    const loader=document.querySelector(".loader");

    if(loader){

        loader.classList.add("hide");

        setTimeout(()=>{

            loader.style.display="none";

        },500);

    }

});

/*==============================
  Dynamic Copyright Year
==============================*/

const year=document.querySelector(".current-year");

if(year){

    year.textContent=new Date().getFullYear();

}

/*==============================
  Keyboard Shortcut
==============================*/

document.addEventListener("keydown",(e)=>{

    // ESC closes search popup

    if(e.key==="Escape"){

        if(searchPopup){

            searchPopup.classList.remove("active");

        }

    }

});

/*==============================
  Window Resize
==============================*/

window.addEventListener("resize",()=>{

    if(window.innerWidth>992){

        if(navbar){

            navbar.classList.remove("active");

        }

        if(mobileMenuBtn){

            mobileMenuBtn.classList.remove("active");

        }

    }

});

/*==============================
  Disable Right Click
  (Optional)
==============================*/

// document.addEventListener("contextmenu",(e)=>{
//     e.preventDefault();
// });

/*==============================
  Performance Optimization
==============================*/

window.addEventListener("pageshow",()=>{

    revealOnScroll();

});

/*==============================
  Initialize Website
==============================*/

document.addEventListener("DOMContentLoaded",()=>{

    console.log("====================================");
    console.log(" VE NATURALS WEBSITE LOADED ");
    console.log(" Version : 1.0");
    console.log("====================================");

    revealOnScroll();

});

/*==========================================
        End Main Script
==========================================*/
