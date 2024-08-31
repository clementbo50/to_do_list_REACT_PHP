<?php
require_once('../config.php');

$database = new Database();

$pdo = $database->connect();

// Vérifier si des données ont été envoyées en POST
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    // Récupérer les données JSON envoyées dans le corps de la requête
    $json_data = file_get_contents('php://input');
    // Décoder les données JSON en un tableau associatif
    $data = json_decode($json_data, true);

    // Vérifier si l'identifiant de la tâche est présent dans les données
    if (isset($_GET['id'])) {
        // Récupérer l'identifiant de la tâche
        $id = isset($_GET['id']) ? $_GET['id'] : null;

        // Préparer la requête SQL de suppression
        $sql = "DELETE FROM tasks WHERE id = :id";
        $stmt = $pdo->prepare($sql);

        // Liaison du paramètre
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        // Exécution de la requête
        try {
            $stmt->execute();
            // Réponse JSON pour indiquer le succès de l'opération
            echo json_encode(array('success' => true, 'message' => 'Tâche supprimée avec succès'));
        } catch (PDOException $e) {
            // En cas d'erreur d'exécution de la requête, afficher l'erreur
            echo json_encode(array('success' => false, 'message' => 'Erreur lors de la suppression de la tâche : ' . $e->getMessage()));
        }
    } else {
        // Si l'identifiant de la tâche n'est pas présent dans les données, renvoyer une erreur
        echo json_encode(array('success' => false, 'message' => 'L\'identifiant de la tâche est manquant'));
    }
} else {
    // Si aucune donnée n'a été envoyée en POST, renvoyer une erreur
    echo json_encode(array('success' => false, 'message' => 'Aucune donnée n\'a été envoyée'));
}
?>
