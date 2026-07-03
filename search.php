<?php
include 'db.php';

$search = "";
$category = "";

if (isset($_GET['search'])) {
    $search = mysqli_real_escape_string($conn, $_GET['search']);
}

if (isset($_GET['category'])) {
    $category = mysqli_real_escape_string($conn, $_GET['category']);
}

if (!empty($search) && !empty($category)) {
    $sql = "SELECT * FROM products 
            WHERE (product_name LIKE '%$search%'
            OR category LIKE '%$search%'
            OR description LIKE '%$search')";           
} elseif (!empty($search)) {
    $sql = "SELECT * FROM products 
            WHERE product_name LIKE '%$search%'";
} elseif (!empty($category)) {
    $sql = "SELECT * FROM products 
            WHERE category = '$category'";
} else {
    $sql = "SELECT * FROM products";
}

$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Products</title>
    <style>
        body{
            font-family: Arial, sans-serif;
            background:#f8f8f8;
            padding:30px;
        }
        .products{
            display:grid;
            grid-template-columns:repeat(4,1fr);
            gap:20px;
            margin-top:20px;
        }
        .product-card{
            background:#fff;
            padding:15px;
            border-radius:10px;
            box-shadow:0 2px 8px rgba(0,0,0,0.08);
            text-align:center;
        }
        .product-card img{
            width:150px;
            height:150px;
            object-fit:contain;
        }
        .product-card h3{
            margin:10px 0;
            font-size:18px;
        }
        .product-card p{
            margin:5px 0;
        }
    </style>
</head>
<body>

<h2>Search Results</h2>

<div class="products">
<?php
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
?>
        <div class="product-card">
            <img src="images/<?php echo $row['image']; ?>" alt="">
            <h3><?php echo $row['product_name']; ?></h3>
            <p>Category: <?php echo $row['category']; ?></p>
            <p>₹<?php echo $row['price']; ?></p>
        </div>
<?php
    }
} else {
    echo "<p>No products found.</p>";
}
?>
</div>

</body>
</html>


