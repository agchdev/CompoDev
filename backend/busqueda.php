<?php
// Configurar CORS (ajusta a tu dominio / entorno)
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Credentials: true"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Establecer que devolveremos JSON
header("Content-Type: application/json");

// Incluir tu clase de conexión DB
require_once(__DIR__ . "/class.db.php");

$busqueda = trim($_POST["busqueda"]);
$cat = trim($_POST["cat"]);
$extra = trim($_POST["extra"]);

// echo "cat => ".$cat;
// echo "extra => ".$extra;

$db = new DB();
$conn = $db->getConn();

if($extra == ""){
    $consulta = "SELECT * 
                FROM proyectos 
                WHERE titulo LIKE ? AND categoria LIKE ?";
}else{
    if($extra == "reciente") $consulta = "SELECT * 
                                    FROM proyectos 
                                    WHERE titulo LIKE ? AND categoria LIKE ? 
                                    ORDER BY fecha_subido ASC";
    if($extra == "liked") $consulta = "SELECT * 
                                    FROM proyectos 
                                    WHERE titulo LIKE ? AND categoria LIKE ? 
                                    ORDER BY likes ASC";
}
$sentencia = $conn->prepare($consulta);
$inp = "%".$busqueda."%";
$cate = "%".$cat."%";
$sentencia->bind_param("ss", $inp, $cate);
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