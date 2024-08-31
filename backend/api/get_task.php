<?php
// Informations de connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todo_list";

// Tentative de connexion à la base de données en utilisant PDO
try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
  // Définir le mode d'erreur PDO sur Exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Requête SQL pour récupérer toutes les tâches depuis la table des tâches
  $sql = "SELECT id, auteur, title, date, DATE_FORMAT(date, '%d-%m-%Y') AS dateFr, description, completed FROM tasks";
  $stmt = $conn->prepare($sql);
  $stmt->execute();

  // Récupérer les résultats de la requête sous forme de tableau associatif
  $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

  // Renvoyer les tâches au format JSON
  header('Content-Type: application/json');
  echo json_encode($tasks);
} catch(PDOException $e) {
  // En cas d'erreur de connexion à la base de données, afficher l'erreur
  echo "Erreur de connexion à la base de données : " . $e->getMessage();
}
// Fermer la connexion à la base de données
$conn = null;
?>
