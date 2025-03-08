<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

session_start();

// Verificamos si el usuario está autenticado
if (!isset($_SESSION["usuario"])) {
    echo json_encode(["status" => "error", "message" => "No tiene permisos"]);
    exit;
}

// Obtenemos el 'id' y la 'screenshot' (DataURL base64)
$id = $_POST["id"]          ?? null;
$screenshot = $_POST["screenshot"] ?? null;

if (!$id || !$screenshot) {
    echo json_encode(["status" => "error", "message" => "Faltan datos"]);
    exit;
}

// $screenshot viene con la forma 'data:image/png;base64,iVBORw0K...'
$parts = explode(",", $screenshot);
if (count($parts) !== 2) {
    echo json_encode(["status" => "error", "message" => "Formato de screenshot inválido"]);
    exit;
}
$encodedImg = $parts[1];

// Decodificamos el base64
$decodedImg = base64_decode($encodedImg);
if (!$decodedImg) {
    echo json_encode(["status" => "error", "message" => "No se pudo decodificar la imagen"]);
    exit;
}

$folder = __DIR__ . "/miniaturas";
if (!is_dir($folder)) {
    mkdir($folder, 0777, true); // Crea la carpeta con permisos de escritura
}

$filename = "miniatura_$id.png";
file_put_contents("$folder/$filename", $decodedImg);

// Guardar la imagen en disco, por ejemplo:
$filename = "miniatura_$id.png";

file_put_contents(__DIR__ . "/miniaturas/" . $filename, $decodedImg);
// Aquí podrías hacer un UPDATE en tu tabla para guardar
// la ruta 'miniaturas/miniatura_$id.png' y mostrarla en el perfil.

echo json_encode([
    "status"  => "success",
    "message" => "Miniatura guardada",
    "file"    => $filename
]);
