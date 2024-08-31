<?php
require_once('../config.php');

$database = new Database();

$pdo = $database->connect();

// Vérifier si des données ont été envoyées en POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données JSON envoyées dans le corps de la requête
    $json_data = file_get_contents('php://input');
    // Décoder les données JSON en un tableau associatif
    $data = json_decode($json_data, true);

    // Vérifier si le titre de la tâche est présent dans les données
    if (isset($data['title'])) {
        // Récupérer le titre de la tâche
        $title = $data['title'];
        $description = $data['description'];
        $auteur = $data['auteur'];
        $date = $data['date'];

        // Préparer la requête SQL d'insertion
        $sql = "INSERT INTO tasks (auteur, title, description, date) VALUES (:auteur, :title, :description, :date)";
        $stmt = $pdo->prepare($sql);

        // Liaison des paramètres
        $stmt->bindParam(':title', $title, PDO::PARAM_STR);
        $stmt->bindParam(':description', $description, PDO::PARAM_STR);
        $stmt->bindParam(':auteur', $auteur, PDO::PARAM_STR);
        $stmt->bindParam(':date', $date, PDO::PARAM_STR);

        // Exécution de la requête
        try {
            $stmt->execute();
            // Réponse JSON pour indiquer le succès de l'opération
            echo json_encode(array('success' => true, 'message' => 'Tâche ajoutée avec succès'));
        } catch (PDOException $e) {
            // En cas d'erreur d'exécution de la requête, afficher l'erreur
            echo json_encode(array('success' => false, 'message' => 'Erreur lors de l\'ajout de la tâche : ' . $e->getMessage()));
        }
    } else {
        // Si le titre de la tâche n'est pas présent dans les données, renvoyer une erreur
        echo json_encode(array('success' => false, 'message' => 'Le titre de la tâche est manquant'));
    }
} else {
    // Si aucune donnée n'a été envoyée en POST, renvoyer une erreur
    echo json_encode(array('success' => false, 'message' => 'Aucune donnée n\'a été envoyée'));
}
?>
