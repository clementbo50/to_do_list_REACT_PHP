import React from 'react';
import TaskList from './TaskList';
import '../styles/App.css';

function App() {
  return (
    <div className="app-container">
      <div className="form-container">
        <TaskList />
      </div>
    </div>
  );
}

export default App;
