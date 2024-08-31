import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TaskItems.css';

function TaskItems({ tasks, fetchData, selectedTaskCalendar, setSelectedTaskCalendar }) {

  

  


  async function handleCompletedTask(idChange, changeTask) {
    try {

      const formData = new URLSearchParams();
      formData.append('id', idChange);
      formData.append('completed', changeTask);

      const response = await axios.post(
        'http://localhost:8000/backend/api/update_checkbox.php',
        formData,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      if (response.status === 200) {
        console.log('Enregistrement mis à jour avec succès');
        fetchData();
      } else {
        console.error('Erreur lors de la mise à jour de l\'enregistrement:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  }

  async function deleteTask(idTask){
     try{
      

      const response = await axios.delete(
        `http://localhost:8000/backend/api/delete_task.php?id=${idTask}`,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      if (response.status === 200) {
        console.log('Tache supprimé avec succès');
        fetchData();
      } else {
        console.error('Erreur lors de la supression', response.statusText);
      }

    }catch(error){
      console.error('Erreur lors de la requête:', error);

    }
  }

  function formatToFrenchDateFormat(dateStr) {
    // Diviser la date en année, mois et jour
    const [year, month, day] = dateStr.split('-');

    // Réorganiser les parties de la date pour le format français
    const formattedDate = `${day}-${month}-${year}`;

    // Formater la date au format français
    const [frenchYear, frenchMonth, frenchDay] = formattedDate.split('-');
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    const monthIndex = parseInt(frenchMonth) - 1;
    const monthName = months[monthIndex];
    const formattedFrenchDate = `${frenchDay}  ${monthName} ${frenchYear} `;

    return formattedFrenchDate;
}


//Filtre pour obtenir les taches d'aujourd'hui
  const currentDate = new Date().toISOString().split('T')[0];

  const tasksOfTheDay = tasks.filter(task => task.date === currentDate)

// Affiche 'Tâches du jour' lorsque selectedTaskCalendar est vide et filteredTasks est vide
const titleCase1 = !selectedTaskCalendar  ? 'Tâches du jour' : '';



// Affiche 'Liste de tâches au <date>' lorsque selectedTaskCalendar n'est pas vide
const titleCase3 = selectedTaskCalendar ? `Liste de tâches au : ${formatToFrenchDateFormat(selectedTaskCalendar)}` : '';

// Combinez les cas pour obtenir le titre final
const title = titleCase1 || titleCase3;



    console.log(tasks);

  return (
    <div className="task-container">
      <div className="task-list">
        
        
      {title && <h3>{title}</h3>}


            {(selectedTaskCalendar ? tasks : tasksOfTheDay).length === 0 ? (
          <h3>Aucune tâche  pour aujourd'hui.</h3>
        ) : null}

        

        {(selectedTaskCalendar ? tasks : tasksOfTheDay).map(({ id, title, description, auteur, dateFr, completed }) => 
        
        !selectedTaskCalendar || selectedTaskCalendar === dateFr ?(

          
  

            <div key={id} className={`task-item ${completed ? 'completed validated' : ''}`}>
              <input
                type="checkbox"
                id={`task-checkbox-${id}`}
                className="task-checkbox"
                checked={completed}
                onChange={(e) => handleCompletedTask(id, e.target.checked)}
              />
            
                <label htmlFor={`task-checkbox-${id}`} className="task-checkbox-label">
                      
                      <span className="checkbox-label">{completed === 1 ?'Fait' : 'Tache à realiser'}</span>
                      <span className="checkbox-custom"></span>
                      
                    
                  </label>
              

              
              {completed === 1 ?

                  <button className="delete-button" onClick={ () => deleteTask(id)}>
                      <span className="delete-icon">×</span>
                  </button>
                
              : null}
              
              <div className="task-info">
              

                <p className="task-label"><b>Titre :</b> <u>{title}</u></p>
                <p className="task-label"><b>Description : </b></p>
                <p className="task-description">{description}</p>
                  <div className="container-dateAuteur">
                    <p className="task-label auteurdate"><b>publié par {auteur} </b></p>
                    <p className="task-label auteurdate"><b>Au :</b> {dateFr ? formatToFrenchDateFormat(dateFr) : "Date non précisée"} </p>


                  </div>
                
                
              </div>
            </div>
                
        ):null
        
        )}
      </div>
  </div>
  

  );
}

export default TaskItems;
