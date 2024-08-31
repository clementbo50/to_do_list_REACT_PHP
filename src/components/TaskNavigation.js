import '../styles/TaskNavigation.css'
function TaskNavigation({isComponentVisible, setIsComponentVisible}){

    const toggleVisibility = (componentName) => {
        // Créer un nouvel objet pour mettre à jour l'état
        const updatedVisibility = {};
    
        // Parcourir tous les composants
        for (const key in isComponentVisible) {
            // Définir le composant cliqué à true et les autres à false
            updatedVisibility[key] = key === componentName ? true : false;
        }
    
        // Mettre à jour l'état avec le nouvel objet de visibilité
        setIsComponentVisible(updatedVisibility);
    };
    
 
    return(
        <aside className="nav-container">

            <label className={`${isComponentVisible.formulaire ? 'completed' : ''}`} >
                <button className='nav-button' onClick={() => toggleVisibility('formulaire')}>➕</button>
            Formulaire
            </label>

            <label className={`${isComponentVisible.calendrier ? 'completed' : ''}`}>
                <button className='nav-button' onClick={() => toggleVisibility('calendrier')}>📆</button>
                Calendrier
            </label>

            

        </aside>
     )
}
export default TaskNavigation;
