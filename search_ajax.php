<?php
include 'db.php';

$search = isset($_POST['search']) ? trim($_POST['search']) : '';
$category = isset($_POST['category']) ? trim($_POST['category']) : '';

$sql = "SELECT * FROM products WHERE 1";

$params = [];
$types = "";

/* Category filter */
if (!empty($category)) {
    $sql .= " AND category = ?";
    $params[] = $category;
    $types .= "s";
}

/* Search filter: product name OR category OR description */
if (!empty($search)) {
    $sql .= " AND (product_name LIKE ? OR category LIKE ? OR description LIKE ?)";
    $like = "%$search%";
    $params[] = $like;
    $params[] = $like;
    $params[] = $like;
    $types .= "sss";
}

/* If nothing entered, show latest/all products */
$sql .= " ORDER BY id DESC";

$stmt = mysqli_prepare($conn, $sql);

if (!empty($params)) {
    mysqli_stmt_bind_param($stmt, $types, ...$params);
}

mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $img = !empty($row['image']) ? "images/" . $row['image'] : "https://via.placeholder.com/80x80?text=No+Image";
        ?>
        <div class="result-card">
            <img src="<?php echo $img; ?>" alt="<?php echo htmlspecialchars($row['product_name']); ?>">
            
            <div class="result-info">
                <h3><?php echo htmlspecialchars($row['product_name']); ?></h3>
                <p class="category"><?php echo htmlspecialchars($row['category']); ?></p>
                <p class="desc"><?php echo htmlspecialchars($row['description']); ?></p>
                <p class="price">?<?php echo htmlspecialchars($row['price']); ?></p>
            </div>

            <button class="cart-btn">
                <i class="fa-solid fa-cart-shopping"></i>
            </button>
        </div>
        <?php
    }
} else {
    echo '<div class="no-result">No products found.</div>';
}
?>