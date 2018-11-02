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

    $problem = $results->fetch();
    return $problem;
}

// {"responseGroup0":
// {"categoryName":"Pre-ordering",
// "answers":["Average time customers wait to place and order (segmented into key day parts)","Average number of customers waiting (segmented into key day parts)"]},
// "responseGroup1":
// {"categoryName":"Post-ordering","answers":["Average time customers wait after placing orders (segmented by day parts)","Average length of time to prepare ordered items","Average length of time to ring up order and process payment","Total wait time (including pre-order) from arrival to order completed"]},
// "responseGroup2":
// {"categoryName":"Additional Metrics","answers":["Average number of customers per order","Number of customner interactions per order"]}
// }

function one_problem_answers_array($id) {
    include ("connection.php");
    try {
        $results = $db->prepare("SELECT * FROM brainstorm_answers WHERE brainstorm_answers.brain_id = ?");
        $results->bindParam(1,$id,PDO::PARAM_INT);
        $results->execute();
    } catch (Exception $e) {
        echo "Unable to connect to database";
        echo $e->getMessage();
        exit;
    }

    $answers = $results->fetch();
    return $answers;
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