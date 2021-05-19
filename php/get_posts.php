<?php
    include "psql.php";

    $pdo = new PDO($db_pg, $user, $password);

    if (isset($_GET["id"])) {
        $query = $pdo->query("select * from posts order by id desc limit 10");
    }

    $query = $pdo->query("select * from posts order by id desc limit 10");
    $posts = $query->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($posts);

    header("Content-type:application/json");
?>
