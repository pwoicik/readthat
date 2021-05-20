<?php
    include "pdo.php";

    $posts = null;
    if (isset($_GET["id"])) {
        $query = $pdo->prepare("SELECT * FROM posts WHERE id=:id");
        $query->execute(["id" => $_GET["id"]]);
        $posts = $query->fetch(PDO::FETCH_ASSOC);
    } else if (isset($_GET["start"])) {
        $query = $pdo->prepare("SELECT p.id, headline, p.content, p.timestamp, COUNT(c.id) comment_count FROM posts p LEFT JOIN comments c ON p.id=c.post_id WHERE p.id<=:id GROUP BY p.id ORDER BY p.id DESC limit 10");
        $query->execute(["id" => $_GET["start"]]);
        $posts = $query->fetchAll(PDO::FETCH_ASSOC);
    } else {
        $query = $pdo->query("SELECT p.id, headline, p.content, p.timestamp, COUNT(c.id) comment_count FROM posts p LEFT JOIN comments c ON p.id=c.post_id GROUP BY p.id ORDER BY p.id DESC limit 10");
        $posts = $query->fetchAll(PDO::FETCH_ASSOC);
    }
    
    echo json_encode($posts);

    header("Content-Type:application/json");
?>
