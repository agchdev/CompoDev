<?php
class DB {
    private $conn;

    public function __construct() {
        // require_once('../../../cred.php');

        $this->conn = new mysqli("localhost", "root", "", "agenda2");


        // Manejo de errores en la conexión
        if ($this->conn->connect_error) {
            die(json_encode(["status" => "error", "message" => "Error de conexión: " . $this->conn->connect_error]));
        }
    }

    // Método para obtener la conexión mysqli
    public function getConn() {
        return $this->conn;
    }

    // Método para probar la conexión correctamente
    public function testConnection() {
        if ($this->conn->connect_error) {
            return json_encode(["status" => "error", "message" => "Error de conexión: " . $this->conn->connect_error]);
        }
        return json_encode(["status" => "success", "message" => "Conexión a la base de datos establecida."]);
    }
}

// Prueba de conexión (solo si se accede directamente a este archivo)
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $db = new DB();
    echo $db->testConnection();
}
?>
