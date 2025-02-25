<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once(__DIR__ . "/class.db.php");

$db = new DB();
$response = $db->testConnection(); // Devuelve un array limpio

// Evitar salida duplicada
if (ob_get_length()) ob_clean();

echo json_encode($response, JSON_UNESCAPED_UNICODE);
exit;
?>
