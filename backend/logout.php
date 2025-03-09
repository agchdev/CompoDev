<?php
session_start();

// Configurar CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// logout.php
session_unset();
session_destroy();

echo json_encode([
    'status' => 'success',
    'message' => 'Sesión cerrada'
]);
