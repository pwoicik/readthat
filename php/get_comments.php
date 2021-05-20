<?php
    include "pdo.php";

    $comments = null;
    if (isset($_GET["start"])) {
        $query = $pdo->prepare("SELECT * FROM comments WHERE post_id=:postID AND id<=:id ORDER BY id DESC LIMIT 10");
        $query->execute(["postID" => $_GET["post_id"], "id" => $_GET["start"]]);
        $comments = $query->fetchAll(PDO::FETCH_ASSOC);
    } else {
        $query = $pdo->prepare("SELECT * FROM comments WHERE post_id=:postID ORDER BY id DESC LIMIT 10");
        $query->execute(["postID" => $_GET["post_id"]]);
        $comments = $query->fetchAll(PDO::FETCH_ASSOC);
    }
    
    echo json_encode($comments);

    header("Content-Type:application/json");
?>
