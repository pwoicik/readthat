<?php
    include "pdo.php";

    $data = [
        "headline" => $_POST["headline"],
        "content" => $_POST["content"],
    ];
    $query = "INSERT INTO posts VALUES (default, :headline, :content)";
    $pdo->prepare($query)->execute($data);
?>
