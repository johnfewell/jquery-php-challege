<?php

$dsn = 'mysql:host=localhost;dbname=rkt';
$username = 'root';
$password = 'fEM%yKhSx4&3';

try {
$db = new PDO($dsn, $username, $password);
$db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo "Unable to connect to database";
    echo $e->getMessage();
    exit;
}



