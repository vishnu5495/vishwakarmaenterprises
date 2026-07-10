/*==========================================
    VE NATURALS
    Search JavaScript
    Part 1
==========================================*/

"use strict";

/*==============================
  Select Elements
==============================*/

const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const productCards = document.querySelectorAll(".product-card");
const noResult = document.querySelector(".no-result");

/*==============================
  Live Search Function
==============================*/

function searchProducts(){

    const keyword = searchInput.value.toLowerCase().trim();

    let found = false;

    productCards.forEach(card=>{

        const title = card.querySelector(".product-title").textContent.toLowerCase();

        const category = card.dataset.category
            ? card.dataset.category.toLowerCase()
            : "";

        if(title.includes(keyword) || category.includes(keyword)){

            card.style.display = "block";

            found = true;

        }else{

            card.style.display = "none";

        }

    });

    if(noResult){

        noResult.style.display = found ? "none" : "block";

    }

}

/*==============================
  Live Search Event
==============================*/

if(searchInput){

    searchInput.addEventListener("keyup",searchProducts);

}
/*==========================================
    VE NATURALS
    Search JavaScript
    Part 2
==========================================*/

/*==============================
  Search Button Click
==============================*/

if(searchBtn){

    searchBtn.addEventListener("click",()=>{

        searchProducts();

    });

}

/*==============================
  Enter Key Search
==============================*/

if(searchInput){

    searchInput.addEventListener("keydown",(e)=>{

        if(e.key==="Enter"){

            e.preventDefault();

            searchProducts();

        }

    });

}

/*==============================
  Clear Search
==============================*/

const clearSearchBtn = document.querySelector(".clear-search");

if(clearSearchBtn){

    clearSearchBtn.addEventListener("click",()=>{

        searchInput.value="";

        searchProducts();

        searchInput.focus();

    });

}

/*==============================
  Reset Product List
==============================*/

function resetProducts(){

    productCards.forEach(card=>{

        card.style.display="block";

    });

    if(noResult){

        noResult.style.display="none";

    }

}

/*==============================
  Empty Search
==============================*/

if(searchInput){

    searchInput.addEventListener("input",()=>{

        if(searchInput.value.trim()===""){

            resetProducts();

        }

    });

}
/*==========================================
    VE NATURALS
    Search JavaScript
    Part 3
==========================================*/

/*==============================
  Search Suggestions
==============================*/

const suggestions = [
    "Neem Powder",
    "Amla Powder",
    "Ashwagandha Powder",
    "Giloy Powder",
    "Tulsi Powder",
    "Triphala Powder",
    "Turmeric Powder",
    "Black Pepper",
    "Kitchen King Masala",
    "Garam Masala",
    "Coriander Powder",
    "Cumin Seeds"
];

const suggestionBox = document.querySelector(".search-suggestions");

/*==============================
  Show Suggestions
==============================*/

function showSuggestions(){

    if(!searchInput || !suggestionBox) return;

    const keyword = searchInput.value.toLowerCase().trim();

    suggestionBox.innerHTML = "";

    if(keyword === ""){

        suggestionBox.style.display = "none";
        return;

    }

    const filtered = suggestions.filter(item =>
        item.toLowerCase().includes(keyword)
    );

    if(filtered.length === 0){

        suggestionBox.style.display = "none";
        return;

    }

    filtered.forEach(item=>{

        const div = document.createElement("div");

        div.className = "suggestion-item";

        div.textContent = item;

        div.addEventListener("click",()=>{

            searchInput.value = item;

            suggestionBox.style.display = "none";

            searchProducts();

            saveRecentSearch(item);

        });

        suggestionBox.appendChild(div);

    });

    suggestionBox.style.display = "block";

}

/*==============================
  Input Event
==============================*/

if(searchInput){

    searchInput.addEventListener("input",showSuggestions);

}

/*==============================
  Hide Suggestions
==============================*/

document.addEventListener("click",(e)=>{

    if(
        suggestionBox &&
        !e.target.closest(".search-box")
    ){

        suggestionBox.style.display = "none";

    }

});

/*==============================
  Recent Searches
==============================*/

function saveRecentSearch(text){

    let recent = JSON.parse(
        localStorage.getItem("recentSearches")
    ) || [];

    if(!recent.includes(text)){

        recent.unshift(text);

    }

    recent = recent.slice(0,5);

    localStorage.setItem(
        "recentSearches",
        JSON.stringify(recent)
    );

}
/*==========================================
    VE NATURALS
    Search JavaScript
    Part 4
==========================================*/

/*==============================
  Recent Search List
==============================*/

const recentBox = document.querySelector(".recent-searches");

function loadRecentSearches(){

    if(!recentBox) return;

    const recent = JSON.parse(
        localStorage.getItem("recentSearches")
    ) || [];

    recentBox.innerHTML = "";

    if(recent.length === 0){

        recentBox.innerHTML =
        "<p>No Recent Searches</p>";

        return;

    }

    recent.forEach(item=>{

        const div = document.createElement("div");

        div.className = "recent-item";

        div.innerHTML =
        `<i class="fa-solid fa-clock-rotate-left"></i> ${item}`;

        div.addEventListener("click",()=>{

            searchInput.value = item;

            searchProducts();

            if(suggestionBox){

                suggestionBox.style.display = "none";

            }

        });

        recentBox.appendChild(div);

    });

}

/*==============================
  Clear Recent Searches
==============================*/

const clearRecentBtn =
document.querySelector(".clear-recent");

if(clearRecentBtn){

    clearRecentBtn.addEventListener("click",()=>{

        localStorage.removeItem("recentSearches");

        loadRecentSearches();

    });

}

/*==============================
  Search Highlight
==============================*/

function highlightText(card, keyword){

    const title = card.querySelector(".product-title");

    if(!title) return;

    const text = title.textContent;

    if(keyword===""){

        title.innerHTML = text;

        return;

    }

    const regex = new RegExp(`(${keyword})`,"gi");

    title.innerHTML = text.replace(

        regex,

        "<mark>$1</mark>"

    );

}

/*==============================
  Highlight All Products
==============================*/

function updateHighlight(){

    const keyword = searchInput.value.trim();

    productCards.forEach(card=>{

        highlightText(card, keyword);

    });

}

/*==============================
  Search Input Event
==============================*/

if(searchInput){

    searchInput.addEventListener("input",()=>{

        searchProducts();

        updateHighlight();

    });

}

/*==============================
  Load Recent Searches
==============================*/

document.addEventListener("DOMContentLoaded",()=>{

    loadRecentSearches();

});
/*==========================================
    VE NATURALS
    Search JavaScript
    Part 5 (Final)
==========================================*/

/*==============================
  Keyboard Navigation
==============================*/

let currentSuggestion = -1;

if(searchInput){

    searchInput.addEventListener("keydown",(e)=>{

        const items = document.querySelectorAll(".suggestion-item");

        if(!items.length) return;

        if(e.key==="ArrowDown"){

            e.preventDefault();

            currentSuggestion++;

            if(currentSuggestion >= items.length){

                currentSuggestion = 0;

            }

            updateSuggestion(items);

        }

        if(e.key==="ArrowUp"){

            e.preventDefault();

            currentSuggestion--;

            if(currentSuggestion < 0){

                currentSuggestion = items.length - 1;

            }

            updateSuggestion(items);

        }

        if(e.key==="Enter"){

            if(currentSuggestion > -1){

                e.preventDefault();

                items[currentSuggestion].click();

            }

        }

    });

}

/*==============================
  Update Selected Suggestion
==============================*/

function updateSuggestion(items){

    items.forEach(item=>{

        item.classList.remove("active");

    });

    items[currentSuggestion].classList.add("active");

    items[currentSuggestion].scrollIntoView({

        block:"nearest"

    });

}

/*==============================
  Close Suggestion On Escape
==============================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        if(suggestionBox){

            suggestionBox.style.display="none";

        }

    }

});

/*==============================
  Performance Optimization
==============================*/

window.addEventListener("pageshow",()=>{

    if(searchInput){

        searchInput.blur();

    }

});

/*==============================
  Initialize Search
==============================*/

document.addEventListener("DOMContentLoaded",()=>{

    resetProducts();

    loadRecentSearches();

    console.log("==================================");
    console.log(" VE NATURALS SEARCH READY ");
    console.log("==================================");

});

/*==========================================
        End Search Script
==========================================*/
