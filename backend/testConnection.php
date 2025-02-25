<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once("class.db.php");

$db = new DB();
echo $db->testConnection();
?>
