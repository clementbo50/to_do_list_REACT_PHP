<?php
require_once('../config.php');

$database = new Database();

$pdo = $database->connect();
// Vérifier si des données ont été envoyées en POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données POST
    $id = $_POST['id'];
    $completed = $_POST['completed'];
    //file_put_contents('debug.log', var_export($id, true) . PHP_EOL, FILE_APPEND);
   
   $completed ==='true' ? $completedInt = 1 : $completedInt = 0; 
   
   
    // Préparer la requête SQL d'UPDATE
    $sql = "UPDATE tasks SET completed = :completed WHERE id = :id";
    $stmt = $pdo->prepare($sql);

    // Liaison des paramètres
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':completed', $completedInt);

    // Exécution de la requête
    try {
        $stmt->execute();
        // Réponse JSON pour indiquer le succès de l'opération
        echo json_encode(array('success' => true, 'message' => 'Tâche mise à jour avec succès'));
    } catch (PDOException $e) {
        // En cas d'erreur d'exécution de la requête, afficher l'erreur
        echo json_encode(array('success' => false, 'message' => 'Erreur lors de la mise à jour de la tâche : ' . $e->getMessage()));
    }
} else {
    // Si aucune donnée n'a été envoyée en POST, renvoyer une erreur
    echo json_encode(array('success' => false, 'message' => 'Aucune donnée n\'a été envoyée'));
}
?>
