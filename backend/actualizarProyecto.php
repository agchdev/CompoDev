<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Credentials: true"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once(__DIR__ . "/class.db.php");

session_start();

if (!isset($_SESSION["usuario"])) {
    // Si no hay usuario en sesión, puedes manejarlo como desees.
    // Por ejemplo, devolver un mensaje de error o un objeto vacío:
    echo json_encode(["status" => "Error", "message" => "No tiene permisos"]);
    exit;
}

if (!isset($_POST["html_edit"]) || !isset($_POST["css_edit"]) || !isset($_POST["js_edit"]) || !isset($_POST["id"])) {
    echo json_encode(["status" => "error", "message" => "Faltan datos obligatorios"]);
    exit;
}

$html = trim($_POST["html_edit"]);
$css = trim($_POST["css_edit"]);
$js = trim($_POST["js_edit"]);
$id_project = (int) $_POST["id"]; 

$db = new DB();
$conn = $db->getConn();

$consulta = "UPDATE proyectos
            SET html = ?,
                css = ?,
                js  = ?
            WHERE id_project = ?";
$sentencia = $conn->prepare($consulta);
$sentencia->bind_param("sssi", $html, $css, $js, $id_project);
if($sentencia->execute()){
    echo json_encode(["status" => "succes", "message" => "Cambios realizados con exito!"]);
    exit;
}else{
    echo json_encode(["status" => "error", "message" => "Error desconocido"]);
    exit;
}

// Cerramos la sentencia y la conexión
$sentencia->close();
$conn->close();
?>