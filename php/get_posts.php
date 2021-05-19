<?php
    include "psql.php";

    $pdo = new PDO($db_pg, $user, $password);

    $posts = null;
    if (isset($_GET["id"])) {
        $query = $pdo->prepare("SELECT * FROM posts WHERE id=:id");
        $query->execute(["id" => $_GET["id"]]);
        $posts = $query->fetch(PDO::FETCH_ASSOC);
    } else if (isset($_GET["start"])) {
        $query = $pdo->prepare("SELECT * FROM posts WHERE id<=:id ORDER BY id DESC LIMIT 10");
        $query->execute(["id" => $_GET["start"]]);
        $posts = $query->fetchAll(PDO::FETCH_ASSOC);
    } else {
        $query = $pdo->query("SELECT * FROM posts ORDER BY id DESC LIMIT 10");
        $posts = $query->fetchAll(PDO::FETCH_ASSOC);
    }
    
    echo json_encode($posts);

    header("Content-Type:application/json");
?>
