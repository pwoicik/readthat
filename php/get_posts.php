<?php
    include "psql.php";

    $pdo = new PDO($db_pg, $user, $password);
    $query = $pdo->query("select * from posts order by id desc limit 10");

    $posts = json_encode($query->fetchAll(PDO::FETCH_ASSOC));

    echo $posts;

    header("Content-type:application/json");
?>
