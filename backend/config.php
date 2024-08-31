﻿<?php
class Database {
    private $host = 'localhost';
    private $db_name = 'todo_list';
    private $username = 'root';
    private $password = '';
    public $conn;

    // Méthode de connexion à la base de données
    public function connect() {
        $this->conn = null;

        try {
            $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name . ';charset=utf8mb4', $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo 'Erreur de connexion : ' . $e->getMessage();
        }

        return $this->conn;
    }
}
?>
