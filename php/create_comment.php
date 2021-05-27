<?php
    include "pdo.php";

    $data = [
        "postID" => trim($_POST["post_id"]),
        "content" => trim($_POST["content"]),
    ];

    $content_len = strlen($data["content"]);
    if ($content_len > 0) {
        $query = "INSERT INTO comments VALUES (default, :postID, :content)";
        $pdo->prepare($query)->execute($data);
    } else {
        header('X-PHP-Response-Code: 400', true, 400);
    }
?>
