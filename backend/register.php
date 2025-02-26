<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once(__DIR__ . "/class.db.php");

$data = json_decode(file_get_contents("php://input"), true);
if(!isset($data["usuario"]) || !isset($data["password"])) {
    echo json_decode(["status" => "error", "message" => "faltan datos"]);
    exit;
}

$usuario = $data["usuario"];
$password = md5($data["password"]);
$password = md5($data["password"]);
$password = md5($data["password"]);

$db = new DB();
$conn = $db->getConn();

$consulta = "SELECT * FROM usuarios WHERE user = ? OR email = ?";
$sentencia = $conn->prepare($consulta);
$sentencia->bind_param("ss", $usuario, $password);
$sentencia->execute();
$result = $sentencia->get_result();
$sentencia->close();

if ($result->num_rows > 0) {
    $consulta = "INSERT INTO usuarios (user, email, password, urlFoto) VALUES (?,?,?,?)"
    $sentencia = $conn->prepare($consulta);
    $sentencia->bind_param("ssss",)
} else {
    echo json_encode(["status" => "error", "message" => "Credenciales incorrectas"]);
}
exit;