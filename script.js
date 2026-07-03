document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const categorySelect = document.getElementById("category");
    const resultsBox = document.getElementById("searchResults");
    const searchBtn = document.getElementById("searchBtn");

    function fetchProducts() {
        const search = searchInput.value.trim();
        const category = categorySelect.value;

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "search_ajax.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onload = function () {
            if (xhr.status === 200) {
                resultsBox.innerHTML = xhr.responseText;
                resultsBox.style.display = "block";
            }
        };

        xhr.send(
            "search=" + encodeURIComponent(search) +
            "&category=" + encodeURIComponent(category)
        );
    }

    /* Live search while typing */
    searchInput.addEventListener("keyup", function () {
        fetchProducts();
    });

    /* Search when category changes */
    categorySelect.addEventListener("change", function () {
        fetchProducts();
    });

    /* Search on search button click */
    searchBtn.addEventListener("click", function (e) {
        e.preventDefault();
        fetchProducts();
    });

    /* Hide results if clicked outside */
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".search-wrapper")) {
            resultsBox.style.display = "none";
        }
    });

    /* Show all products when input gets focus */
    searchInput.addEventListener("focus", function () {
        fetchProducts();
    });
});