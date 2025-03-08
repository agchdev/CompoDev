<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Credentials: true"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");


require_once(__DIR__ . "/class.db.php");

session_start();

if (!isset($_SESSION["usuario"])) {
    // Si no hay usuario en sesión, puedes manejarlo como desees.
    // Por ejemplo, devolver un mensaje de error o un objeto vacío:
    echo json_encode(["error" => "No hay usuario en sesión."]);
    exit;
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

$id = $_POST["id"] ?? null;
if ($id === null) {
    echo json_encode(["error" => "No se recibió el id"]);
    exit;
}

// Obtenemos el usuario de la sesión
$usuario = $_SESSION["usuario"];

// Conexión a la base de datos
$db = new DB();
$conn = $db->getConn();

//Preparamos la consulta
$consulta = "SELECT *
            FROM proyectos
            WHERE id_project = ?";
$sentencia = $conn->prepare($consulta);
$sentencia->bind_param("i", $id);
$sentencia->execute();

// Obtenemos los resultados
$resultado = $sentencia->get_result();

// Guardamos los resultados en un array
$datos = [];
while ($fila = $resultado->fetch_assoc()) {
    $datos[] = $fila;
}

// Devolvemos los datos en formato JSON
echo json_encode($datos, JSON_UNESCAPED_UNICODE);

// Cerramos la sentencia y la conexión
$sentencia->close();
$conn->close();
?>
