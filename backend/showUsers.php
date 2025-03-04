<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once(__DIR__ . "/class.db.php");

class Users {
    private $conn;

    public function __construct() {
        $db = new DB();
        $this->conn = $db->getConn();
    }

    public function getAllUsers() {
        $sql = "SELECT id, user FROM usuarios";
        $result = $this->conn->query($sql);

        $users = [];

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $users[] = [
                    "id" => $row["id"],
                    "user" => $row["user"]
                ];
            }
            echo json_encode(["status" => "success", "users" => $users], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(["status" => "error", "message" => "No se encontraron usuarios"], JSON_UNESCAPED_UNICODE);
        }
        exit;
    }
}

// Evitar salida duplicada
if (ob_get_length()) ob_clean();

$users = new Users();
$users->getAllUsers();
?>
