import TaskItems from './TaskItems.js';
import '../styles/TaskList.css'
import TaskFormulaire from './TaskFormulaire.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskNavigation from './TaskNavigation.js';
import TaskCalendrier from './TaskCalendrier.js';
function TaskList() {
    
    
    const [tasks, setTasks] = useState([]);
    //Enfant calendrier
    const [selectedTaskCalendar, setSelectedTaskCalendar] = useState("");

   



    const [isComponentVisible, setIsComponentVisible] =  useState({
      formulaire: false,
      calendrier: false,
      filtrage: false
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/backend/api/get_task.php');
            setTasks(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

   
  



  return (
    
   <div className="container-TaskList">

      <TaskNavigation isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible} />


      
        
        {isComponentVisible.formulaire ? <TaskFormulaire fetchData={fetchData} isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible}/>: null }

        {isComponentVisible.calendrier ? <TaskCalendrier selectedTaskCalendar={selectedTaskCalendar} setSelectedTaskCalendar={setSelectedTaskCalendar} tasks={tasks}/> : null}
      
      
     

      <TaskItems tasks={tasks}  fetchData={fetchData} setTasks={setTasks} isComponentVisible={isComponentVisible} selectedTaskCalendar={selectedTaskCalendar}  setSelectedTaskCalendar={setSelectedTaskCalendar} />

      
    </div>

  );
}

export default TaskList;

