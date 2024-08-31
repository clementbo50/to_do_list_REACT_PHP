import axios from 'axios';
import React, { useState } from 'react';
import '../styles/TaskFormulaire.css';

function TaskFormulaire({ fetchData, isComponentVisible, setIsComponentVisible }) {
    const [taskDescription, setTaskDescription] = useState("");
    const [taskTitle, setTaskTitle] = useState("");
    const [taskAuteur, setTaskAuteur] = useState("");
    const [taskDate, setTaskDate] = useState(0);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Réinitialiser les erreurs
        setErrors({});

        // Vérifier la longueur maximale des champs
        const newErrors = {};
        if (taskTitle.length > 255) {
            newErrors.title = "Le titre ne peut pas dépasser 255 caractères";
        }
 

        if (taskAuteur.length > 255) {
            newErrors.description = "L'auteur ne peut pas dépasser 255 caractères";
        }

        if (!taskTitle  || !taskDescription || !taskAuteur || taskDate === 0){
            newErrors.vides ="l'un de vos champs est vide ou sont vides";
        }

        // Vérifier les injections SQL
    
        // Vérifier les attaques XSS
        const xssPattern = /<script>|<\/script>|<style>|<\/style>|<img>|<iframe>|<svg>|<\/svg>/i;
        if (xssPattern.test(taskTitle) || xssPattern.test(taskDescription)) {
            newErrors.xssAttack = "La saisie contient des caractères non autorisés";
        }

        // Mettre à jour les erreurs
        setErrors(newErrors);

        // Si aucune erreur, soumettre le formulaire
        if (Object.keys(newErrors).length === 0) {

            try {
                const formData = { title: taskTitle, description: taskDescription, auteur: taskAuteur, date: taskDate };
                await axios.post('http://localhost:8000/backend/api/insert_task.php', formData);
                fetchData(); // Met à jour la liste des tâches après l'ajout
                setTaskTitle(""); // Réinitialise le champ de texte
                setTaskDescription("");
                setTaskAuteur("");
                setTaskDate(0);
            } catch (error) {
                console.error('Erreur lors de la requête:', error);
            }
        }
    };

    return (
        <div className="form-container">
     
             
            <form onSubmit={handleSubmit} className="task-form">
                
                <h3>📝 Formulaire d'ajout de tache 📝 </h3>

                {errors.sqlInjection && <span className="error">{errors.sqlInjection}</span>}
                {errors.xssAttack && <span className="error">{errors.xssAttack}</span>}
                {errors.vides && <span className="error">{errors.vides}</span>}
                <label>Auteur: </label>
                <input
                    type="text"
                    className="task-input"
                    placeholder="Préciser l'auteur"
                    value={taskAuteur}
                    onChange={(e) => setTaskAuteur(e.target.value)}
                />
                
                <label>Titre : </label>
                {errors.title && <span className="error">{errors.title}</span>}
                <input
                    type="text"
                    className="task-input"
                    placeholder="Préciser le titre"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                <label>Date : </label>
                <input
                    type="date"
                    className="task-input"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                />
                <label>Description : </label>
                {errors.description && <span className="error">{errors.description}</span>}
                <textarea
                    className="task-input"
                    placeholder="Ajouter une nouvelle tâche"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                />
                


                
                <button className="task-button" type="submit">Valider</button>
            </form>
           
        </div>
    );
}

export default TaskFormulaire;
