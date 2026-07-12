/*==========================================
   VE NATURALS
   SHOP JAVASCRIPT
   PART 1
==========================================*/


"use strict";



/*==========================================
   PRODUCT DATA
==========================================*/


const products = [

{
id:1,
name:"VE Garam Masala",
price:149,
category:"Spices",
image:"images/products/garam-masala.jpg"
},

{
id:2,
name:"VE Haldi Powder",
price:99,
category:"Spices",
image:"images/products/haldi-powder.jpg"
},

{
id:3,
name:"VE Red Chilli Powder",
price:120,
category:"Spices",
image:"images/products/redchili-powder.jpg"
},

{
id:4,
name:"VE Coriander Powder",
price:110,
category:"Spices",
image:"images/products/coriander-powder.jpg"
},

{
id:5,
name:"VE Black Pepper",
price:199,
category:"Spices",
image:"images/products/kali-mirch.jpg"
},

{
id:6,
name:"VE Cumin Seeds",
price:159,
category:"Spices",
image:"images/products/cumin-seeds.jpg"
}

];




/*==========================================
   QUANTITY PLUS MINUS
==========================================*/


function plusQty(button){


let input = button.parentElement.querySelector("input");


let value = parseInt(input.value);


input.value = value + 1;


}




function minusQty(button){


let input = button.parentElement.querySelector("input");


let value = parseInt(input.value);



if(value > 1){

input.value = value - 1;

}


}




/*==========================================
   WHATSAPP ORDER
==========================================*/


function whatsappOrder(productName){


let phone = "919935830935";


let message = 
`Hello VE Naturals,
I want to buy ${productName}.`;


let url =
"https://wa.me/"+phone+
"?text="+encodeURIComponent(message);



window.open(url,"_blank");


}





/*==========================================
   ADD TO CART
==========================================*/


let cart = JSON.parse(localStorage.getItem("cart")) || [];



function addToCart(productName,price){


let item = {

name:productName,

price:price,

quantity:1

};



cart.push(item);



localStorage.setItem(
"cart",
JSON.stringify(cart)
);



showCartMessage();


}




/*==========================================
   CART SUCCESS MESSAGE
==========================================*/


function showCartMessage(){


let msg=document.querySelector(".cart-success");



if(msg){


msg.style.display="block";



setTimeout(()=>{


msg.style.display="none";


},2000);



}


}



/*==========================================
   AUTO CONNECT CART BUTTON
==========================================*/


document.querySelectorAll(".cart-btn")
.forEach(btn=>{


btn.addEventListener("click",()=>{


let card =
btn.closest(".product-card");



let name =
card.querySelector("h3").innerText;



let price =
card.querySelector(".new-price")
?
card.querySelector(".new-price").innerText.replace("₹","")
:
0;



addToCart(name,price);



});


});



console.log(
"VE NATURALS SHOP JS PART 1 LOADED"
);
/*==========================================
   VE NATURALS
   SHOP JAVASCRIPT
   PART 2
==========================================*/



/*==========================================
   PRODUCT DISPLAY
==========================================*/


const productContainer =
document.querySelector(".product-grid");



function displayProducts(productList){


if(!productContainer) return;



productContainer.innerHTML="";



productList.forEach(product=>{


let card = document.createElement("div");


card.className="product-card";



card.innerHTML=`

<div class="badge">
NEW
</div>


<div class="product-image">

<img src="${product.image}"
alt="${product.name}">

</div>



<div class="product-content">


<h3 class="product-title">

${product.name}

</h3>



<div class="rating">

★★★★★

</div>



<div class="price">

<span class="new-price">

₹${product.price}

</span>

</div>



<div class="quantity-box">


<button onclick="minusQty(this)">
-
</button>


<input type="number" value="1">


<button onclick="plusQty(this)">
+
</button>


</div>



<div class="product-buttons">


<button class="cart-btn"
onclick="addToCart('${product.name}',${product.price})">

🛒 Add To Cart

</button>



<button class="buy-btn"
onclick="whatsappOrder('${product.name}')">

📲 Buy Now

</button>


</div>


</div>

`;



productContainer.appendChild(card);



});


}





/*==========================================
   SEARCH PRODUCT
==========================================*/


const searchInput =
document.querySelector(".shop-search input");



if(searchInput){


searchInput.addEventListener("keyup",()=>{


let value =
searchInput.value.toLowerCase();



let filtered =
products.filter(product=>{


return product.name
.toLowerCase()
.includes(value);



});



displayProducts(filtered);



});


}






/*==========================================
   CATEGORY FILTER
==========================================*/


const categoryLinks =
document.querySelectorAll(".category-list a");



categoryLinks.forEach(link=>{


link.addEventListener("click",(e)=>{


e.preventDefault();



let category =
link.innerText.trim();



if(category==="All"){


displayProducts(products);


}

else{


let filtered =
products.filter(item=>{


return item.category===category;


});


displayProducts(filtered);


}



});


});






/*==========================================
   PRICE FILTER
==========================================*/


const priceRange =
document.querySelector(".price-range");



if(priceRange){


priceRange.addEventListener("input",()=>{


let maxPrice =
parseInt(priceRange.value);



let filtered =
products.filter(product=>{


return product.price <= maxPrice;


});



displayProducts(filtered);



});


}






/*==========================================
   SORT PRODUCT
==========================================*/


const sortSelect =
document.querySelector(".sort-box select");



if(sortSelect){


sortSelect.addEventListener("change",()=>{


let value =
sortSelect.value;



let sorted =
[...products];



if(value==="low"){


sorted.sort(
(a,b)=>a.price-b.price
);


}



if(value==="high"){


sorted.sort(
(a,b)=>b.price-a.price
);


}



displayProducts(sorted);



});


}





/*==========================================
   INITIAL LOAD
==========================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


displayProducts(products);


});



console.log(
"VE NATURALS SHOP JS PART 2 LOADED"
);
/*==========================================
   VE NATURALS
   SHOP JAVASCRIPT
   PART 3
   PAGINATION SYSTEM
==========================================*/


/*==========================================
   PAGINATION SETTINGS
==========================================*/


let currentPage = 1;

const productsPerPage = 12;



let currentProducts = [...products];





/*==========================================
   SHOW PAGINATED PRODUCTS
==========================================*/


function showPaginatedProducts(){


let start =
(currentPage - 1) * productsPerPage;



let end =
start + productsPerPage;



let pageProducts =
currentProducts.slice(start,end);



displayProducts(pageProducts);



updateProductCount();



}





/*==========================================
   CREATE PAGINATION BUTTONS
==========================================*/


function createPagination(){


const pagination =
document.querySelector(".pagination");



if(!pagination) return;



pagination.innerHTML="";



let totalPages =
Math.ceil(
currentProducts.length / productsPerPage
);




/* Previous Button */


let prev =
document.createElement("button");


prev.innerHTML="←";


prev.className="prev-page";



prev.onclick=function(){


if(currentPage>1){


currentPage--;

showPaginatedProducts();

createPagination();


}


};



pagination.appendChild(prev);





/* Page Buttons */


for(let i=1;i<=totalPages;i++){


let btn =
document.createElement("button");



btn.innerText=i;


btn.className="page-btn";



if(i===currentPage){

btn.classList.add("active");

}



btn.onclick=function(){


currentPage=i;


showPaginatedProducts();


createPagination();


window.scrollTo({

top:0,

behavior:"smooth"

});


};



pagination.appendChild(btn);



}







/* Next Button */


let next =
document.createElement("button");


next.innerHTML="→";


next.className="next-page";



next.onclick=function(){


if(currentPage < totalPages){


currentPage++;


showPaginatedProducts();


createPagination();


}


};



pagination.appendChild(next);



}







/*==========================================
   PRODUCT COUNT
==========================================*/


function updateProductCount(){


let count =
document.querySelector(".product-count");



if(count){


count.innerHTML=

`
Showing 
${currentProducts.length}
Products
`;

}


}






/*==========================================
   CONNECT SEARCH WITH PAGINATION
==========================================*/


function updateProducts(data){


currentProducts=[...data];


currentPage=1;


showPaginatedProducts();


createPagination();


}







/*==========================================
   INITIAL PAGINATION LOAD
==========================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


currentProducts=[...products];


showPaginatedProducts();


createPagination();


});






console.log(
"VE NATURALS PAGINATION PART 3 READY"
);
/*==========================================
   VE NATURALS
   SHOP JAVASCRIPT
   PART 4
   LANGUAGE SWITCH SYSTEM
==========================================*/



"use strict";



/*==========================================
   LANGUAGE DATA
==========================================*/


const languageData = {


en:{


home:"Home",

shop:"Shop",

spices:"Spices",

herbal:"Herbal Products",

combo:"Combo Packs",

contact:"Contact",

search:"Search VE Naturals Products...",

addCart:"Add To Cart",

buyNow:"Buy Now",

offers:"Best Offers",

natural:"100% Natural Products",

shipping:"Free Shipping Above ₹499"


},



hi:{


home:"होम",

shop:"शॉप",

spices:"मसाले",

herbal:"हर्बल प्रोडक्ट्स",

combo:"कॉम्बो पैक",

contact:"संपर्क करें",

search:"VE Naturals प्रोडक्ट खोजें...",

addCart:"कार्ट में जोड़ें",

buyNow:"अभी खरीदें",

offers:"बेहतरीन ऑफर",

natural:"100% प्राकृतिक उत्पाद",

shipping:"₹499 से ऊपर फ्री डिलीवरी"


}



};





/*==========================================
   CHANGE LANGUAGE
==========================================*/


function changeLanguage(lang){



localStorage.setItem(
"language",
lang
);



applyLanguage(lang);



}





/*==========================================
   APPLY LANGUAGE
==========================================*/


function applyLanguage(lang){



let data =
languageData[lang];



if(!data) return;






/* Navbar */


let navLinks =
document.querySelectorAll(".navbar a");



if(navLinks.length>=6){


navLinks[0].innerText=data.home;

navLinks[1].innerText=data.shop;

navLinks[2].innerText=data.spices;

navLinks[3].innerText=data.herbal;

navLinks[4].innerText=data.combo;

navLinks[5].innerText=data.contact;


}





/* Search */


let search =
document.querySelector(".search-box input");



if(search){

search.placeholder=data.search;

}





/* Buttons */


document.querySelectorAll(".cart-btn")
.forEach(btn=>{


btn.innerText="🛒 "+data.addCart;


});




document.querySelectorAll(".buy-btn")
.forEach(btn=>{


btn.innerText="📲 "+data.buyNow;


});





/* Top Bar */


let topBar =
document.querySelector(".top-bar");



if(topBar){


topBar.innerHTML=
`
<div>
🌿 ${data.natural}
</div>

<div>
🚚 ${data.shipping}
|
🔥 ${data.offers}
</div>
`;

}



}





/*==========================================
   LOAD SAVED LANGUAGE
==========================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


let savedLanguage =
localStorage.getItem("language")
||"en";



applyLanguage(savedLanguage);



});






console.log(
"VE NATURALS LANGUAGE SYSTEM READY"
);
/*==========================================
   VE NATURALS
   SHOP JAVASCRIPT
   PART 5
   CART SYSTEM
==========================================*/



"use strict";



/*==========================================
   CART STORAGE
==========================================*/


let shoppingCart = 
JSON.parse(localStorage.getItem("cart"))
|| [];





/*==========================================
   ADD PRODUCT TO CART
==========================================*/


function addToCart(name,price){



let existingProduct =
shoppingCart.find(item=>item.name===name);



if(existingProduct){


existingProduct.quantity++;


}

else{


shoppingCart.push({

name:name,

price:Number(price),

quantity:1


});


}



saveCart();


cartNotification();


}







/*==========================================
   SAVE CART
==========================================*/


function saveCart(){


localStorage.setItem(

"cart",

JSON.stringify(shoppingCart)

);


}






/*==========================================
   CART MESSAGE
==========================================*/


function cartNotification(){


let message =
document.querySelector(".cart-success");



if(message){


message.style.display="block";



setTimeout(()=>{


message.style.display="none";


},2000);



}


}







/*==========================================
   REMOVE ITEM
==========================================*/


function removeCartItem(index){



shoppingCart.splice(index,1);



saveCart();


loadCart();


}








/*==========================================
   UPDATE QUANTITY
==========================================*/


function updateCartQuantity(index,qty){



if(qty<1){

qty=1;

}



shoppingCart[index].quantity=
Number(qty);



saveCart();


loadCart();



}








/*==========================================
   CART TOTAL
==========================================*/


function cartTotal(){


let total=0;



shoppingCart.forEach(item=>{


total +=
item.price * item.quantity;



});



return total;


}








/*==========================================
   DISPLAY CART
==========================================*/


function loadCart(){



let cartBox =
document.querySelector(".cart-items");



if(!cartBox) return;



cartBox.innerHTML="";



shoppingCart.forEach((item,index)=>{



cartBox.innerHTML +=

`

<div class="cart-product">


<h3>
${item.name}
</h3>


<p>
Price : ₹${item.price}
</p>


<input type="number"
value="${item.quantity}"

onchange="
updateCartQuantity(${index},this.value)
">


<p>

Total :
₹${item.price * item.quantity}

</p>



<button onclick="
removeCartItem(${index})
">

❌ Remove

</button>


</div>

`;



});





let totalBox =
document.querySelector(".cart-total");



if(totalBox){


totalBox.innerHTML=

`
Total Amount :
₹${cartTotal()}
`;

}



}









/*==========================================
   WHATSAPP CHECKOUT
==========================================*/


function checkoutWhatsApp(){



let phone=
"919935830935";



let message=
"Hello VE Naturals,%0A%0AOrder Details:%0A";




shoppingCart.forEach(item=>{


message +=

`${item.name} 
Qty:${item.quantity}
Amount:₹${item.price*item.quantity}

`;


});



message +=

`Total Amount:
₹${cartTotal()}`;



let url=

"https://wa.me/"
+phone
+"?text="
+encodeURIComponent(message);



window.open(url,"_blank");


}







/*==========================================
   LOAD CART ON PAGE OPEN
==========================================*/


document.addEventListener(

"DOMContentLoaded",

()=>{


loadCart();


});





console.log(
"VE NATURALS CART SYSTEM PART 5 READY"
);
/*==========================================
   VE NATURALS
   SHOP JAVASCRIPT
   PART 6
   WISHLIST + REVIEW + OFFER
==========================================*/


"use strict";



/*==========================================
   WISHLIST SYSTEM
==========================================*/


let wishlist =

JSON.parse(localStorage.getItem("wishlist"))
|| [];





function addWishlist(productName){


let exist =

wishlist.includes(productName);



if(!exist){


wishlist.push(productName);


localStorage.setItem(

"wishlist",

JSON.stringify(wishlist)

);


showWishlistMessage();


}

}





function removeWishlist(productName){


wishlist =

wishlist.filter(item=>item!==productName);



localStorage.setItem(

"wishlist",

JSON.stringify(wishlist)

);


}





function showWishlistMessage(){


let msg =
document.querySelector(".wishlist-message");



if(msg){


msg.style.display="block";


setTimeout(()=>{


msg.style.display="none";


},2000);


}


}








/*==========================================
   WISHLIST COUNT
==========================================*/


function wishlistCount(){


let count =

document.querySelector(".wishlist-count");



if(count){


count.innerText =

wishlist.length;


}


}



document.addEventListener(

"DOMContentLoaded",

()=>{


wishlistCount();


});








/*==========================================
   ADVANCED SEARCH
==========================================*/


function searchProducts(value){


value=value.toLowerCase();



let result =

products.filter(product=>{


return (

product.name
.toLowerCase()
.includes(value)

||

product.category
.toLowerCase()
.includes(value)


);


});



currentProducts=result;


currentPage=1;


showPaginatedProducts();


createPagination();



}






let searchBox =

document.querySelector(".search-box input");



if(searchBox){


searchBox.addEventListener(

"keyup",

()=>{


searchProducts(
searchBox.value
);


});


}







/*==========================================
   PRODUCT REVIEW SYSTEM
==========================================*/


let reviews =

JSON.parse(localStorage.getItem("reviews"))
|| [];





function addReview(product,rating,text){



reviews.push({

product:product,

rating:rating,

comment:text


});



localStorage.setItem(

"reviews",

JSON.stringify(reviews)

);



alert(
"Thank you for your review"
);


}







function getProductRating(product){



let productReviews =

reviews.filter(

r=>r.product===product

);



if(productReviews.length===0){

return "★★★★★";

}



let total=0;



productReviews.forEach(r=>{


total+=Number(r.rating);


});



let avg =

Math.round(
total/productReviews.length
);



return "★".repeat(avg)
+
"☆".repeat(5-avg);



}








/*==========================================
   OFFER POPUP
==========================================*/


function showOfferPopup(){



let popup =

document.querySelector(".offer-popup");



if(popup){


popup.classList.add("show");



setTimeout(()=>{


popup.classList.remove("show");


},8000);



}


}





window.addEventListener(

"load",

()=>{


setTimeout(

showOfferPopup,

3000

);


});








/*==========================================
   RECENTLY VIEWED
==========================================*/


let recentProducts =

JSON.parse(
localStorage.getItem("recent")
)
||[];





function addRecent(productName){



recentProducts =

recentProducts.filter(

item=>item!==productName

);



recentProducts.unshift(productName);



if(recentProducts.length>10){


recentProducts.pop();


}



localStorage.setItem(

"recent",

JSON.stringify(recentProducts)

);


}








console.log(
"VE NATURALS SHOP JS PART 6 READY"
);
/*==========================================
   VE NATURALS
   SHOP JAVASCRIPT
   PART 7
   USER ACCOUNT SYSTEM
==========================================*/

"use strict";

/*==========================================
   USER STORAGE
==========================================*/

let currentUser =
JSON.parse(localStorage.getItem("veUser")) || null;


/*==========================================
   LOGIN
==========================================*/

function loginUser(name,email){

    currentUser={

        name:name,
        email:email,
        login:true

    };

    localStorage.setItem(
        "veUser",
        JSON.stringify(currentUser)
    );

    updateUserUI();

}


/*==========================================
   LOGOUT
==========================================*/

function logoutUser(){

    localStorage.removeItem("veUser");

    currentUser=null;

    updateUserUI();

}


/*==========================================
   USER PANEL
==========================================*/

function updateUserUI(){

    let userName=document.querySelector(".user-name");

    let loginBtn=document.querySelector(".login-btn");

    let logoutBtn=document.querySelector(".logout-btn");

    if(currentUser){

        if(userName)
            userName.innerText=currentUser.name;

        if(loginBtn)
            loginBtn.style.display="none";

        if(logoutBtn)
            logoutBtn.style.display="inline-block";

    }else{

        if(userName)
            userName.innerText="Guest";

        if(loginBtn)
            loginBtn.style.display="inline-block";

        if(logoutBtn)
            logoutBtn.style.display="none";

    }

}


/*==========================================
   ORDER HISTORY
==========================================*/

let orderHistory =
JSON.parse(localStorage.getItem("veOrders"))
|| [];


function saveOrder(order){

    orderHistory.push(order);

    localStorage.setItem(
        "veOrders",
        JSON.stringify(orderHistory)
    );

}


function showOrders(){

    let box=document.querySelector(".order-history");

    if(!box) return;

    box.innerHTML="";

    orderHistory.forEach((order,index)=>{

        box.innerHTML += `

<div class="order-card">

<h3>Order #${index+1}</h3>

<p>Date : ${order.date}</p>

<p>Total : ₹${order.total}</p>

<p>Status : ${order.status}</p>

</div>

`;

    });

}


/*==========================================
   PLACE ORDER
==========================================*/

function placeOrder(){

    let order={

        date:new Date().toLocaleDateString(),

        total:cartTotal(),

        status:"Pending"

    };

    saveOrder(order);

    checkoutWhatsApp();

}


/*==========================================
   ORDER STATUS
==========================================*/

function updateOrderStatus(index,status){

    if(orderHistory[index]){

        orderHistory[index].status=status;

        localStorage.setItem(
            "veOrders",
            JSON.stringify(orderHistory)
        );

    }

}


/*==========================================
   PROFILE
==========================================*/

function showProfile(){

    if(!currentUser){

        alert("Please Login");

        return;

    }

    alert(

"Name : "+currentUser.name+

"\nEmail : "+currentUser.email

    );

}


/*==========================================
   INIT
==========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

    updateUserUI();

    showOrders();

}

);

console.log("VE NATURALS SHOP JS PART 7 READY");
/*==========================================
   VE NATURALS
   SHOP JAVASCRIPT
   PART 8
   PAYMENT + COUPON + SHIPPING
==========================================*/

"use strict";

/*==========================================
   COUPON SYSTEM
==========================================*/

const coupons = {

    "WELCOME10":10,

    "VE20":20,

    "NATURAL50":50

};

let discount = 0;

function applyCoupon(){

    let code =
    document.querySelector("#couponCode").value
    .trim()
    .toUpperCase();

    if(coupons[code]){

        discount = coupons[code];

        alert(
        "Coupon Applied : ₹"+discount
        );

    }else{

        discount = 0;

        alert(
        "Invalid Coupon Code"
        );

    }

    updateBill();

}

/*==========================================
   SHIPPING CHARGE
==========================================*/

function shippingCharge(total){

    if(total>=499){

        return 0;

    }

    return 60;

}

/*==========================================
   GST
==========================================*/

function calculateGST(amount){

    return amount * 0.05;

}

/*==========================================
   FINAL BILL
==========================================*/

function updateBill(){

    let subtotal = cartTotal();

    let gst = calculateGST(subtotal);

    let shipping = shippingCharge(subtotal);

    let finalAmount =

    subtotal +

    gst +

    shipping -

    discount;

    let bill =
    document.querySelector(".bill-summary");

    if(!bill) return;

    bill.innerHTML =

`
<p>Subtotal : ₹${subtotal.toFixed(2)}</p>

<p>GST (5%) : ₹${gst.toFixed(2)}</p>

<p>Shipping : ₹${shipping.toFixed(2)}</p>

<p>Discount : ₹${discount.toFixed(2)}</p>

<hr>

<h2>Total : ₹${finalAmount.toFixed(2)}</h2>

`;

}

/*==========================================
   ADDRESS
==========================================*/

function saveAddress(){

    let address={

        name:
        document.querySelector("#name").value,

        phone:
        document.querySelector("#phone").value,

        address:
        document.querySelector("#address").value,

        city:
        document.querySelector("#city").value,

        state:
        document.querySelector("#state").value,

        pin:
        document.querySelector("#pin").value

    };

    localStorage.setItem(

    "shippingAddress",

    JSON.stringify(address)

    );

    alert("Address Saved");

}

/*==========================================
   LOAD ADDRESS
==========================================*/

function loadAddress(){

    let data =

    JSON.parse(

    localStorage.getItem(

    "shippingAddress"

    ));

    if(!data) return;

    document.querySelector("#name").value=data.name;

    document.querySelector("#phone").value=data.phone;

    document.querySelector("#address").value=data.address;

    document.querySelector("#city").value=data.city;

    document.querySelector("#state").value=data.state;

    document.querySelector("#pin").value=data.pin;

}

/*==========================================
   DEMO PAYMENT
==========================================*/

function payNow(){

    updateBill();

    alert(

"Payment Gateway Demo\n\nRazorpay / UPI Integration\nwill be connected later."

    );

}

/*==========================================
   INIT
==========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

    loadAddress();

    updateBill();

}

);

console.log("VE NATURALS PART 8 READY");
/*==========================================
   VE NATURALS
   SHOP JAVASCRIPT
   PART 9
   NOTIFICATION + COUNTERS + SORTING
==========================================*/

"use strict";

/*==========================================
   TOAST NOTIFICATION
==========================================*/

function showToast(message){

    let toast = document.createElement("div");

    toast.className = "toast-message";

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(()=>{
        toast.classList.add("show");
    },100);

    setTimeout(()=>{
        toast.classList.remove("show");

        setTimeout(()=>{
            toast.remove();
        },300);

    },2500);

}

/*==========================================
   CART COUNT
==========================================*/

function updateCartCounter(){

    let cartCount =
    document.querySelector(".cart-count");

    if(!cartCount) return;

    let total = 0;

    shoppingCart.forEach(item=>{

        total += item.quantity;

    });

    cartCount.innerHTML = total;

}

/*==========================================
   WISHLIST COUNT
==========================================*/

function updateWishlistCounter(){

    let wish =
    document.querySelector(".wishlist-count");

    if(!wish) return;

    wish.innerHTML = wishlist.length;

}

/*==========================================
   ADD TO CART WITH TOAST
==========================================*/

const oldAddToCart = addToCart;

addToCart = function(name,price){

    oldAddToCart(name,price);

    updateCartCounter();

    showToast("🛒 Product Added Successfully");

}

/*==========================================
   ADD TO WISHLIST
==========================================*/

const oldWishlist = addWishlist;

addWishlist = function(name){

    oldWishlist(name);

    updateWishlistCounter();

    showToast("❤️ Added To Wishlist");

}

/*==========================================
   PRODUCT SORTING
==========================================*/

function sortProducts(type){

    if(type=="low"){

        currentProducts.sort((a,b)=>

        a.price-b.price);

    }

    if(type=="high"){

        currentProducts.sort((a,b)=>

        b.price-a.price);

    }

    if(type=="az"){

        currentProducts.sort((a,b)=>

        a.name.localeCompare(b.name));

    }

    if(type=="za"){

        currentProducts.sort((a,b)=>

        b.name.localeCompare(a.name));

    }

    currentPage=1;

    showPaginatedProducts();

    createPagination();

}

/*==========================================
   SORT SELECT
==========================================*/

let sortSelect =
document.querySelector(".sort-select");

if(sortSelect){

sortSelect.onchange=function(){

sortProducts(this.value);

};

}

/*==========================================
   NEW ARRIVAL LABEL
==========================================*/

function isNewProduct(product){

return product.new===true;

}

/*==========================================
   BEST SELLER LABEL
==========================================*/

function isBestSeller(product){

return product.best===true;

}

/*==========================================
   FEATURED LABEL
==========================================*/

function isFeatured(product){

return product.featured===true;

}

/*==========================================
   INITIAL LOAD
==========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

updateCartCounter();

updateWishlistCounter();

});

console.log("VE NATURALS SHOP JS PART 9 READY");
/*==========================================
   VE NATURALS
   SHOP JAVASCRIPT
   PART 10
   QUICK VIEW + GALLERY + STOCK
==========================================*/

"use strict";

/*==========================================
   QUICK VIEW POPUP
==========================================*/

function openQuickView(product){

    const popup=document.querySelector(".quick-view");

    if(!popup) return;

    popup.classList.add("active");

    popup.querySelector(".quick-title").innerHTML=product.name;

    popup.querySelector(".quick-price").innerHTML="₹"+product.price;

    popup.querySelector(".quick-image").src=product.image;

    popup.querySelector(".quick-description").innerHTML=product.description;

    popup.querySelector(".quick-stock").innerHTML=

    product.stock>0 ?

    "✅ In Stock"

    :

    "❌ Out Of Stock";

}

/*==========================================
   CLOSE POPUP
==========================================*/

function closeQuickView(){

    document.querySelector(".quick-view")
    .classList.remove("active");

}

/*==========================================
   PRODUCT IMAGE GALLERY
==========================================*/

function changeProductImage(src){

    const image=document.querySelector(".quick-image");

    if(image){

        image.src=src;

    }

}

/*==========================================
   IMAGE ZOOM
==========================================*/

function imageZoom(){

    const image=document.querySelector(".quick-image");

    if(!image) return;

    image.addEventListener("mousemove",()=>{

        image.style.transform="scale(1.5)";

    });

    image.addEventListener("mouseleave",()=>{

        image.style.transform="scale(1)";

    });

}

/*==========================================
   STOCK STATUS
==========================================*/

function stockStatus(stock){

    if(stock>20){

        return "🟢 In Stock";

    }

    if(stock>0){

        return "🟠 Limited Stock";

    }

    return "🔴 Out Of Stock";

}

/*==========================================
   DISCOUNT %
==========================================*/

function calculateDiscount(oldPrice,newPrice){

    return Math.round(

    ((oldPrice-newPrice)/oldPrice)*100

    );

}

/*==========================================
   RELATED PRODUCTS
==========================================*/

function relatedProducts(category){

    return products.filter(

    p=>p.category===category

    ).slice(0,4);

}

/*==========================================
   LOADING EFFECT
==========================================*/

function loadingProducts(){

    const grid=document.querySelector(".product-grid");

    if(!grid) return;

    grid.classList.add("loading");

    setTimeout(()=>{

        grid.classList.remove("loading");

    },1000);

}

/*==========================================
   PAGE LOAD
==========================================*/

window.addEventListener("load",()=>{

    loadingProducts();

    imageZoom();

});

console.log("VE NATURALS PART 10 READY");
/*==========================================
   VE NATURALS
   SHOP JAVASCRIPT
   PART 11
   PREMIUM FEATURES
==========================================*/

"use strict";

/*==========================================
   COMPARE PRODUCTS
==========================================*/

let compareList=[];

function addCompare(product){

    if(compareList.length>=3){

        alert("Maximum 3 products can be compared.");

        return;

    }

    compareList.push(product);

    showCompare();

}

function showCompare(){

    let box=document.querySelector(".compare-box");

    if(!box) return;

    box.innerHTML="";

    compareList.forEach(item=>{

        box.innerHTML+=`

<div class="compare-item">

<h3>${item.name}</h3>

<p>Price : ₹${item.price}</p>

<p>Category : ${item.category}</p>

</div>

`;

    });

}

/*==========================================
   SHARE PRODUCT
==========================================*/

function shareProduct(name){

    let url=window.location.href;

    let text="Check this product: "+name;

    window.open(

"https://wa.me/?text="+

encodeURIComponent(text+"\n"+url),

"_blank"

);

}

/*==========================================
   PRINT INVOICE
==========================================*/

function printInvoice(){

    window.print();

}

/*==========================================
   DARK MODE
==========================================*/

function toggleDarkMode(){

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(

"darkMode",

document.body.classList.contains("dark-mode")

);

}

window.addEventListener("load",()=>{

    if(localStorage.getItem("darkMode")=="true"){

        document.body.classList.add("dark-mode");

    }

});

/*==========================================
   BROWSER NOTIFICATION
==========================================*/

function sendNotification(){

    if(!("Notification" in window)) return;

    Notification.requestPermission()

    .then(permission=>{

        if(permission==="granted"){

            new Notification(

"VE Naturals",

{

body:"New offers are available!",

icon:"images/logo.png"

}

);

        }

    });

}

/*==========================================
   PWA INSTALL
==========================================*/

let deferredPrompt;

window.addEventListener(

"beforeinstallprompt",

(e)=>{

e.preventDefault();

deferredPrompt=e;

});

function installApp(){

if(deferredPrompt){

deferredPrompt.prompt();

}

}

/*==========================================
   INITIALIZE
==========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

sendNotification();

});

console.log("VE NATURALS PART 11 READY");
/*==========================================
   VE NATURALS
   SHOP JAVASCRIPT
   PART 12
   ADMIN PANEL
==========================================*/

"use strict";

/*==========================================
   PRODUCT STORAGE
==========================================*/

let adminProducts =
JSON.parse(localStorage.getItem("veProducts"))
|| [...products];

/*==========================================
   SAVE PRODUCTS
==========================================*/

function saveProducts(){

localStorage.setItem(

"veProducts",

JSON.stringify(adminProducts)

);

}

/*==========================================
   ADD PRODUCT
==========================================*/

function addProduct(product){

adminProducts.push(product);

saveProducts();

showToast("✅ Product Added");

refreshProducts();

}

/*==========================================
   DELETE PRODUCT
==========================================*/

function deleteProduct(index){

if(confirm("Delete Product?")){

adminProducts.splice(index,1);

saveProducts();

refreshProducts();

showToast("❌ Product Deleted");

}

}

/*==========================================
   EDIT PRODUCT
==========================================*/

function editProduct(index,data){

adminProducts[index]=data;

saveProducts();

refreshProducts();

showToast("✏️ Product Updated");

}

/*==========================================
   REFRESH PRODUCTS
==========================================*/

function refreshProducts(){

currentProducts=[...adminProducts];

currentPage=1;

showPaginatedProducts();

createPagination();

}

/*==========================================
   SALES DASHBOARD
==========================================*/

function dashboardData(){

let dashboard={

products:adminProducts.length,

orders:orderHistory.length,

customers:1,

cartItems:shoppingCart.length

};

console.table(dashboard);

return dashboard;

}

/*==========================================
   EXPORT PRODUCTS
==========================================*/

function exportProducts(){

let data=

JSON.stringify(adminProducts,null,2);

let blob=

new Blob([data],

{type:"application/json"});

let link=

document.createElement("a");

link.href=

URL.createObjectURL(blob);

link.download=

"VE_Products.json";

link.click();

}

/*==========================================
   IMPORT PRODUCTS
==========================================*/

function importProducts(file){

const reader=new FileReader();

reader.onload=function(e){

adminProducts=

JSON.parse(e.target.result);

saveProducts();

refreshProducts();

};

reader.readAsText(file);

}

/*==========================================
   BACKUP
==========================================*/

function backupWebsite(){

let backup={

products:adminProducts,

orders:orderHistory,

cart:shoppingCart,

wishlist:wishlist

};

localStorage.setItem(

"veBackup",

JSON.stringify(backup)

);

showToast("💾 Backup Created");

}

/*==========================================
   RESTORE
==========================================*/

function restoreWebsite(){

let backup=

JSON.parse(

localStorage.getItem("veBackup")

);

if(!backup) return;

adminProducts=backup.products;

orderHistory=backup.orders;

shoppingCart=backup.cart;

wishlist=backup.wishlist;

saveProducts();

refreshProducts();

showToast("♻️ Backup Restored");

}

/*==========================================
   INITIALIZE
==========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

refreshProducts();

dashboardData();

});

console.log("VE NATURALS ADMIN PANEL READY");
