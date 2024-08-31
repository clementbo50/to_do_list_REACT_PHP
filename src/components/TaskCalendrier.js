import { useState, useEffect } from "react";
import '../styles/TaskCalendrier.css';
function TaskCalendrier({selectedTaskCalendar, setSelectedTaskCalendar, tasks, setFilteredTasks}) {
    
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getStartDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    function formatToFrenchDateFormat(dateStr) {
        // Diviser la date en année, mois et jour
        const [year, month, day] = dateStr.split('-');
    
        // Réorganiser les parties de la date pour le format français
        const formattedDate = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
    
        return formattedDate;
    }
    
   


    const generateCalendar = () => {
        const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
        const startDayOfMonth = getStartDayOfMonth(selectedMonth, selectedYear);
        const firstDayPosition = startDayOfMonth === 0 ? 6 : startDayOfMonth - 1;
    
        const rows = Array.from({ length: 6 }, (_, i) => {
            return Array.from({ length: 7 }, (_, j) => {
                const dayCounter = i * 7 + j - firstDayPosition + 1;
                const date = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${dayCounter.toString().padStart(2, '0')}`;
                const formattedDate = formatToFrenchDateFormat(date); 
                if (dayCounter <= 0 || dayCounter > daysInMonth) {
                    return <td key={j} className="empty-day disabled" onClick={(e) => e.preventDefault()}></td>;
                } else {
                    return <td key={j} className="date-cell" data-date={formattedDate}>{dayCounter}</td>;
                }
            });
        });
    
        return (
            <table className="calendar">
                
                <thead>
                    <tr>
                        
                        <th>Dim</th>
                        <th>Lun</th>
                        <th>Mar</th>
                        <th>Mer</th>
                        <th>Jeu</th>
                        <th>Ven</th>
                        <th>Sam</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((cells, i) => <tr key={i} onClick={(e) => setSelectedTaskCalendar(e.target.dataset.date) }>{cells}</tr>)}
                </tbody>
            </table>
        );
    };
  
    
   


    return (
        <div className="TaskCalendrier">
             <div className="calendrier-input">
            <h3> 📆 Sélectioner le mois du calendrier 📆</h3>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
                {months.map((month, index) => <option key={index} value={index}>{month}</option>)}
            </select>
            <h3>📅 Sélectioner l'année du calendrier 📅</h3>
            <input
                type="number"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                min={1900} // Année minimale
                max={2100} // Année maximale
                step={1} // Incrément
            />
            </div>
            
            <div className="calendar-title">
                <h2>{months[selectedMonth]} {selectedYear}</h2>
             </div>
            
            {generateCalendar()}

           
           
        </div>
    );
}

export default TaskCalendrier;
