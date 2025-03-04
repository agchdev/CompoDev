<?php
// Inicia la sesión antes de cualquier output
session_start();

// Configurar CORS (ajusta a tu dominio / entorno)
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Credentials: true"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Establecer que devolveremos JSON
header("Content-Type: application/json");

// Incluir tu clase de conexión DB
require_once(__DIR__ . "/class.db.php");

// Decodificamos el JSON recibido
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["usuario"]) || !isset($data["password"])) {
    echo json_encode([
      "status" => "error", 
      "message" => "Faltan datos"
    ]);
    exit;
}

$usuario = $data["usuario"];
$passPlano = $data["password"];

$db = new DB();
$conn = $db->getConn();

$consulta = "SELECT * FROM usuarios WHERE user = ?";
$sentencia = $conn->prepare($consulta);
$sentencia->bind_param("s", $usuario);
$sentencia->execute();
$result = $sentencia->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // Este es el hash que se guardó al hacer password_hash() en el registro
    $hashGuardado = $row["password"];
        // 3. Verificamos la contraseña en texto plano contra el hash
        if (password_verify($passPlano, $hashGuardado)) {
            // Si las credenciales son correctas, creamos variables de sesión
            $_SESSION["loggedin"] = true;
            $_SESSION["usuario"] = $usuario;

            // Devuelves JSON con status de éxito
            echo json_encode([
                "status" => "success", 
                "message" => "Login exitoso"
            ]);
        }else{
            echo json_encode([
                "status" => "error", 
                "message" => "Credenciales incorrectas"
            ]);   
        }

    
} else {
    echo json_encode([
      "status" => "error", 
      "message" => "Credenciales incorrectas"
    ]);
}
exit;
