import React, { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Go for a morning walk', completed: false },
    { id: 2, text: 'Drink 2L water', completed: false },
    { id: 3, text: 'Feed the dog', completed: false }
  ]);

  const [reminders, setReminders] = useState([
    'Community event at 3pm',
    'Buy grocery'
  ]);

  const [medicine, setMedicine] = useState({
    name: 'metformin',
    color: 'Red',
    dose: '1 tablet',
    time: 'Before breakfast, before dinner'
  });

  const handleTaskToggle = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = () => {
    // Add  task 
    alert('Add Task clicked');
  };

  const handleAddMedicine = () => {
    // Add  medicine 
    alert('Add Medicine clicked');
  };

  const handleRemoveMedicine = () => {
    //  medicine removal 
    alert('Remove Medicine clicked');
  };

  const handleAddReminder = () => {
    // Add  reminder 
    alert('Add Reminder clicked');
  };

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">Logo</div>
        <div className="nav-links">
          <Link to="/dashboard" className="active">Dashboard</Link>
          <Link to="/event-finder">Event Finder</Link>
          <Link to="/community">Community</Link>
          <Link to="/about">About Us</Link>
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>WELCOME BACK</h1>
        <p>Stay Organized, Stay Healthy - Your Daily Planner at a Glance</p>
        <p>Have a great day!</p>
      </section>

      {/* Daily Tasks Section */}
      <section className="daily-tasks">
        <div className="section-header">
          <h2>"Here's your to-do list for the day. One step at a time, you've got this!"</h2>
          <p>“Stay On Track, Stay Well, Stay Happy.”</p>
        </div>
        <div className="tasks-container">
          <div className="tasks-list">
            {tasks.map(task => (
              <div key={task.id} className="task-item">
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleTaskToggle(task.id)}
                  />
                  {task.text}
                </label>
              </div>
            ))}
          </div>
          <button className="add-button" onClick={handleAddTask}>Add Task</button>
        </div>
      </section>

      {/* Medicine Section */}
      <section className="medicine-section">
        <div className="medicine-info">
          <h2>Do not forget to take your medicine</h2>
          <div className="medicine-details">
            <p>Tablet name: {medicine.name}</p>
            <p>Tablet Color: {medicine.color}</p>
            <p>Dose: {medicine.dose}</p>
            <p>Time: {medicine.time}</p>
          </div>
          <div className="medicine-buttons">
            <button className="add-button" onClick={handleAddMedicine}>Add Medicine</button>
            <button className="remove-button" onClick={handleRemoveMedicine}>Remove</button>
          </div>
        </div>

        {/* Reminder Section */}
        <div className="reminder-section">
          <h2>REMINDER</h2>
          <ul className="reminders-list">
            {reminders.map((reminder, index) => (
              <li key={index}>{index + 1}. {reminder}</li>
            ))}
          </ul>
          <button className="add-button" onClick={handleAddReminder}>Add Reminder</button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;