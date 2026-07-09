/*==========================================
    VE NATURALS
    Hero Slider
    Part 1
==========================================*/

"use strict";

/*==============================
  Select Elements
==============================*/

const slider = document.querySelector(".hero-slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".slider-prev");
const nextBtn = document.querySelector(".slider-next");
const dotsContainer = document.querySelector(".slider-dots");

let currentSlide = 0;
let autoSlide;

/*==============================
  Create Navigation Dots
==============================*/

if(slides.length > 0 && dotsContainer){

    slides.forEach((_, index)=>{

        const dot = document.createElement("span");

        dot.classList.add("dot");

        if(index === 0){

            dot.classList.add("active");

        }

        dot.setAttribute("data-slide", index);

        dotsContainer.appendChild(dot);

    });

}

const dots = document.querySelectorAll(".dot");

/*==============================
  Show Slide
==============================*/

function showSlide(index){

    slides.forEach(slide=>{

        slide.classList.remove("active");

    });

    dots.forEach(dot=>{

        dot.classList.remove("active");

    });

    slides[index].classList.add("active");

    dots[index].classList.add("active");

    currentSlide = index;

}
/*==========================================
    VE NATURALS
    Hero Slider
    Part 2
==========================================*/

/*==============================
  Next Slide
==============================*/

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    showSlide(currentSlide);

}

/*==============================
  Previous Slide
==============================*/

function prevSlide(){

    currentSlide--;

    if(currentSlide < 0){

        currentSlide = slides.length - 1;

    }

    showSlide(currentSlide);

}

/*==============================
  Auto Slide
==============================*/

function startAutoSlide(){

    autoSlide = setInterval(()=>{

        nextSlide();

    },5000);

}

/*==============================
  Stop Auto Slide
==============================*/

function stopAutoSlide(){

    clearInterval(autoSlide);

}

/*==============================
  Restart Auto Slide
==============================*/

function restartSlider(){

    stopAutoSlide();

    startAutoSlide();

}
/*==========================================
    VE NATURALS
    Hero Slider
    Part 3
==========================================*/

/*==============================
  Previous Button
==============================*/

if(prevBtn){

    prevBtn.addEventListener("click",()=>{

        prevSlide();

        restartSlider();

    });

}

/*==============================
  Next Button
==============================*/

if(nextBtn){

    nextBtn.addEventListener("click",()=>{

        nextSlide();

        restartSlider();

    });

}

/*==============================
  Dot Navigation
==============================*/

dots.forEach(dot=>{

    dot.addEventListener("click",()=>{

        const slideIndex = Number(dot.dataset.slide);

        showSlide(slideIndex);

        restartSlider();

    });

});

/*==============================
  Keyboard Navigation
==============================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        nextSlide();

        restartSlider();

    }

    if(e.key==="ArrowLeft"){

        prevSlide();

        restartSlider();

    }

});

/*==============================
  Initialize Slider
==============================*/

if(slides.length > 0){

    showSlide(0);

    startAutoSlide();

}
/*==========================================
    VE NATURALS
    Hero Slider
    Part 4
==========================================*/

/*==============================
  Pause On Hover
==============================*/

if(slider){

    slider.addEventListener("mouseenter",()=>{

        stopAutoSlide();

    });

    slider.addEventListener("mouseleave",()=>{

        startAutoSlide();

    });

}

/*==============================
  Touch Swipe Support
==============================*/

let touchStartX = 0;
let touchEndX = 0;

if(slider){

    slider.addEventListener("touchstart",(e)=>{

        touchStartX = e.changedTouches[0].screenX;

    });

    slider.addEventListener("touchend",(e)=>{

        touchEndX = e.changedTouches[0].screenX;

        handleSwipe();

    });

}

function handleSwipe(){

    if(touchEndX < touchStartX - 50){

        nextSlide();
        restartSlider();

    }

    if(touchEndX > touchStartX + 50){

        prevSlide();
        restartSlider();

    }

}

/*==============================
  Mouse Drag Support
==============================*/

let mouseDown = false;
let startX = 0;
let endX = 0;

if(slider){

    slider.addEventListener("mousedown",(e)=>{

        mouseDown = true;
        startX = e.clientX;

    });

    slider.addEventListener("mouseup",(e)=>{

        if(!mouseDown) return;

        mouseDown = false;

        endX = e.clientX;

        if(endX < startX - 50){

            nextSlide();

        }else if(endX > startX + 50){

            prevSlide();

        }

        restartSlider();

    });

    slider.addEventListener("mouseleave",()=>{

        mouseDown = false;

    });

}

/*==============================
  Prevent Image Drag
==============================*/

slides.forEach(slide=>{

    const img = slide.querySelector("img");

    if(img){

        img.setAttribute("draggable","false");

    }

});
/*==========================================
    VE NATURALS
    Hero Slider
    Part 5 (Final)
==========================================*/

/*==============================
  Pause When Tab Is Hidden
==============================*/

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        stopAutoSlide();

    }else{

        restartSlider();

    }

});

/*==============================
  Window Resize
==============================*/

window.addEventListener("resize",()=>{

    showSlide(currentSlide);

});

/*==============================
  Prevent Multiple Timers
==============================*/

function safeStartSlider(){

    stopAutoSlide();

    startAutoSlide();

}

/*==============================
  Initialize Slider
==============================*/

document.addEventListener("DOMContentLoaded",()=>{

    if(slides.length > 0){

        showSlide(currentSlide);

        safeStartSlider();

    }

});

/*==============================
  Console Message
==============================*/

console.log("====================================");
console.log(" VE NATURALS HERO SLIDER LOADED ");
console.log("====================================");

/*==============================
  Export Functions (Optional)
==============================*/

window.nextHeroSlide = nextSlide;
window.prevHeroSlide = prevSlide;

/*==========================================
          End Slider Script
==========================================*/
