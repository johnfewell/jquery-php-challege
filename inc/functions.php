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



function get_item_html($id,$item) {
    $output = "<li><a href='details.php?id="
        . $id . "'><img src='" 
        . $item["img"] . "' alt='" 
        . $item["title"] . "' />" 
        . "<p>View Details</p>"
        . "</a></li>";
    return $output;
}

function array_category($catalog,$category) {
    $output = array();
    
    foreach ($catalog as $id => $item) {
        if ($category == null OR strtolower($category) == strtolower($item["category"])) {
            $sort = $item["title"];
            $sort = ltrim($sort,"The ");
            $sort = ltrim($sort,"A ");
            $sort = ltrim($sort,"An ");
            $output[$id] = $sort;            
        }
    }
    
    asort($output);
    return array_keys($output);
}

function add_response($problemId, $answer, $time, $userId, $date){
    include ("connection.php");
    $sql = 'INSERT INTO brain_responses(brain_id, answer, time, id, date) VALUESa(?, ?, ?, ?, ?)';

    try {
        $results = $db->prepare($sql);
        $results->bindValue(1, $problemId, PDO::PARAM_INT);
        $results->bindValue(2, $answer, PDO::PARAM_LONGTEXT);
        $results->bindValue(3, $time, PDO::PARAM_INT);
        $results->bindValue(4, $userId, PDO::PARAM_INT);
        $results->bindValue(5, $date, PDO::PARAM_DATE);
        $results->execute(); 
    } catch (Exception $e) {
        echo "Error!:" . $e->getMessage() . "<br/>";
        return false;
    }
    return true;
}