<?php
    include "psql.php";

    $pdo = new PDO($db_pg, $user, $password);

    $data = [
        'headline' => $_POST["headline"],
        'content' => $_POST["content"],
    ];
    $sql = "INSERT INTO posts VALUES (default, :headline, :content)";
    $pdo->prepare($sql)->execute($data);
?>
