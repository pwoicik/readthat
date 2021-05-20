<?php
    include "pdo.php";

    $data = [
        "postID" => $_POST["post_id"],
        "content" => $_POST["content"],
    ];
    $query = "INSERT INTO comments VALUES (default, :postID, :content)";
    $pdo->prepare($query)->execute($data);
?>
