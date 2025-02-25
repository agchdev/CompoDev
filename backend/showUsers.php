<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once("db.php");

class Users {
    private $conn;

    public function __construct() {
        $db = new DB();
        $this->conn = $db->getConn();
    }

    public function getAllUsers() {
        $sql = "SELECT id, usuario FROM usuarios"; // Ajusta los nombres según tu base de datos
        $result = $this->conn->query($sql); // No se necesita prepare() porque no hay parámetros

        $users = [];

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) { // Usamos fetch_assoc() para arrays asociativos
                $users[] = [
                    "id" => $row["id"],
                    "usuario" => $row["usuario"]
                ];
            }
            return json_encode(["status" => "success", "users" => $users]);
        } else {
            return json_encode(["status" => "error", "message" => "No se encontraron usuarios"]);
        }
    }
}

// Si se accede directamente a este archivo, devolver los usuarios
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $users = new Users();
    echo $users->getAllUsers();
}
?>
