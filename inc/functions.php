<?php

function all_problems_array() {
    include ("connection.php");

    try {
        $results = $db->query("SELECT prob, category FROM brainstorm_problems");
    } catch (Exception $e) {
        echo "Unable to connect to database";
        echo $e->getMessage();
        exit;
    }

    $problems = $results->fetchAll();
    return $problems;
}

function one_problem_array($id) {
    include ("connection.php");
    try {
        $results = $db->prepare("SELECT * FROM brainstorm_problems WHERE brainstorm_problems.num = ?");
        $results->bindParam(1,$id,PDO::PARAM_INT);
        $results->execute();
    } catch (Exception $e) {
        echo "Unable to connect to database";
        echo $e->getMessage();
        exit;
    }

    $problems = $results->fetch();
    return $problems;
}

function add_response($problemId, $answers, $time, $userId, $date){
    include ("connection.php");
    $sql = 'INSERT INTO brainstorm_responses(brain_id, answer, time, id, date) VALUES(?, ?, ?, ?, ?)';

    try {
        $results = $db->prepare($sql);
        $results->bindValue(1, $problemId, PDO::PARAM_INT);
        $results->bindValue(2, $answers, PDO::PARAM_STR);
        $results->bindValue(3, $time, PDO::PARAM_INT);
        $results->bindValue(4, $userId, PDO::PARAM_INT);
        $results->bindValue(5, $date, PDO::PARAM_STR);
        $results->execute(); 
    } catch (Exception $e) {
        echo "Error!:" . $e->getMessage() . "<br/>";
        return false;
    }
    return true;
}