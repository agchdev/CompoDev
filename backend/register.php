<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once(__DIR__ . "/class.db.php");

if (!isset($_POST["usuario"]) || !isset($_POST["email"]) || !isset($_POST["password"])) {
    echo json_encode(["status" => "error", "message" => "Faltan datos obligatorios"]);
    exit;
}

$usuario = trim($_POST["usuario"]);
$email = trim($_POST["email"]);
$password = password_hash($_POST["password"], PASSWORD_BCRYPT);
$urlFoto = $_FILES["urlFotoPhp"]['tmp_name'];
$format = explode(".", $_FILES["urlFotoPhp"]["name"]);

print_r($_POST);

$ruta = "./uploads/";
// Manejo de subida de imagen
if (!empty($urlFoto)) {
    if(!file_exists($ruta)) mkdir($ruta);

    $destino = $ruta.$usuario.".".$format[1];
    
    if (move_uploaded_file($urlFoto, $destino)) {
        $urlFoto = $destino;
    } else {
        echo json_encode(["status" => "error", "message" => "Error al subir la imagen"]);
        exit;
    }
}

$db = new DB();
$conn = $db->getConn();

// Verificar si el usuario o email ya existen
$consulta = "SELECT id FROM usuarios WHERE user = ? OR email = ?";
$sentencia = $conn->prepare($consulta);
$sentencia->bind_param("ss", $usuario, $email);
$sentencia->execute();
$result = $sentencia->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "El usuario o email ya están en uso"]);
    exit;
}
$sentencia->close();

// Insertar nuevo usuario
$consulta = "INSERT INTO usuarios (user, email, password, urlFoto) VALUES (?, ?, ?, ?)";
$sentencia = $conn->prepare($consulta);
$sentencia->bind_param("ssss", $usuario, $email, $password, $urlFoto);

if ($sentencia->execute()) {
    echo json_encode(["status" => "success", "message" => "Usuario registrado correctamente"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al registrar usuario"]);
}
$sentencia->close();
$conn->close();
exit;
?>
