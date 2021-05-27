<?php
    include "pdo.php";

    $data = [
        "headline" => trim($_POST["headline"]),
        "content" => trim($_POST["content"]),
    ];

    $headline_len = strlen($data["headline"]);
    $content_len = strlen($data["content"]);
    if ($headline_len > 0 && $headline_len <= 100 && $content_len > 0) {
        $query = "INSERT INTO posts VALUES (default, :headline, :content)";
        $pdo->prepare($query)->execute($data);
    } else {
        header('X-PHP-Response-Code: 400', true, 400);
    }
?>
