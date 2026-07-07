// ============================
// VE NATURALS SCRIPT.JS
// ============================

// Sticky Header
window.addEventListener("scroll", function () {

const header = document.querySelector(".main-header");

if (window.scrollY > 100) {
header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.15)";
}
else{
header.style.boxShadow = "0 2px 15px rgba(0,0,0,.08)";
}

});


// ============================
// SEARCH DEMO
// ============================

const searchBtn = document.querySelector(".search-box button");

if(searchBtn){

searchBtn.addEventListener("click", function(){

let keyword =
document.querySelector(".search-box input").value;

if(keyword == ""){

alert("Please enter product name");

}else{

alert("Searching for: " + keyword);

}

});

}


// ============================
// NEWSLETTER
// ============================

const newsletterForm =
document.querySelector(".newsletter form");

if(newsletterForm){

newsletterForm.addEventListener("submit", function(e){

e.preventDefault();

let email =
this.querySelector("input").value;

if(email == ""){

alert("Enter your email");

}else{

alert("Thank You For Subscribing!");

this.reset();

}

});

}


// ============================
// PRODUCT HOVER EFFECT
// ============================

const cards =
document.querySelectorAll(".product-card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transition="0.3s";

});

});


// ============================
// BACK TO TOP BUTTON
// ============================

const btn =
document.createElement("button");

btn.innerHTML="↑";

btn.id="topBtn";

document.body.appendChild(btn);

btn.style.position="fixed";
btn.style.bottom="25px";
btn.style.right="25px";
btn.style.width="50px";
btn.style.height="50px";
btn.style.border="none";
btn.style.borderRadius="50%";
btn.style.background="#0c7a2d";
btn.style.color="#fff";
btn.style.fontSize="22px";
btn.style.cursor="pointer";
btn.style.display="none";
btn.style.zIndex="9999";

window.addEventListener("scroll",()=>{

if(window.scrollY > 300){

btn.style.display="block";

}else{

btn.style.display="none";

}

});

btn.addEventListener("click",()=>{

window.scrollTo({
top:0,
behavior:"smooth"
});

});


// ============================
// SMOOTH SCROLL
// ============================

document.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

anchor.addEventListener("click",
function(e){

e.preventDefault();

document.querySelector(
this.getAttribute("href")
).scrollIntoView({

behavior:"smooth"

});

});

});

console.log("VE Naturals Loaded Successfully");
