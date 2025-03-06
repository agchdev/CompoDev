<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Primero, verifica si hay sesión
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    echo json_encode(["status" => "error", "message" => "No hay sesión activa"]);
    exit;
}

require_once(__DIR__ . "/class.db.php");

$db = new DB();
$conn = $db->getConn();

$consulta = "SELECT * FROM usuarios WHERE user = ?";
$sentencia = $conn->prepare($consulta);
$sentencia->bind_param("s", $_SESSION["usuario"]);
$sentencia->execute();
$result = $sentencia->get_result();

$user=[];

if($result && $result->num_rows > 0){
    while ($row = $result->fetch_assoc()) {
        $user[] = [
            "id" => $row["id"],
            "user" => $row["user"],
            "email" => $row["email"],
            "urlFoto" => $row["urlFoto"],
            "descripcion" => $row["descripcion"],
            "verificado" => $row["verificado"]
        ];
    }
}

if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
    echo json_encode(["status" => "success", "usuario" => $user], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["status" => "error", "message" => "No hay sesión activa"], JSON_UNESCAPED_UNICODE);
}

?>
