<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Credentials: true"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once(__DIR__ . "/class.db.php");

if(!isset($_POST["titulo"]) || !isset($_POST["descr"]) || !isset($_POST["categoria"])){
    echo json_encode(["status" => "error", "message" => "Faltan datos obligatorios"]);
    exit;
}

$titulo = trim($_POST["titulo"]);
$descripcion = trim($_POST["descr"]);
$categoria = trim($_POST["categoria"]);

$db = new DB();
$conn = $db->getConn();

// Verificar si el usuario o email ya existen
$consulta = "SELECT id_project FROM proyectos WHERE titulo = ? AND descripcion_proyecto = ? AND categoria = ?";
$sentencia = $conn->prepare($consulta);
$sentencia->bind_param("sss", $titulo, $categoria, $descripcion);
$sentencia->execute();
$result = $sentencia->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "No puede haber dos proyectos exactamente iguales"]);
    exit;
}
$sentencia->close();

$consulta = "INSERT INTO proyectos (titulo, descripcion_proyecto, categoria) VALUES (?,?,?)";
$sentencia = $conn->prepare($consulta);
$sentencia->bind_param("sss", $titulo, $descripcion, $categoria);
$sentencia->execute();
$sentencia->close();

session_start();
$user = $_SESSION["usuario"];
$idUsu = "";
$idPro = "";

$consulta = "SELECT id FROM usuarios WHERE user = ?";
$sentencia = $conn->prepare($consulta);
$sentencia->bind_param("s", $user);
$sentencia->execute();
$sentencia->bind_result($idUsu);
$sentencia->fetch();
$sentencia->close();

$consulta = "SELECT id_project FROM proyectos WHERE titulo = ? AND descripcion_proyecto = ? AND categoria = ?";
$sentencia = $conn->prepare($consulta);
$sentencia->bind_param("sss", $titulo, $descripcion, $categoria);
$sentencia->execute();
$sentencia->bind_result($idPro);
$sentencia->fetch();
$sentencia->close();

$consulta = "INSERT INTO proyectos_usuarios (id_proyecto, id_usuario, rol) VALUES (?,?,1)";
$sentencia = $conn->prepare($consulta);
$sentencia->bind_param("ii", $idPro, $idUsu);
$sentencia->execute();
$sentencia->close();

echo json_encode(["status" => "exitoso", "message" => "GG subido!!!"]);

exit;
?>