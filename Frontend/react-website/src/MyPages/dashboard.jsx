import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Chatbot from './Chatbot';
import './style.css';

const Dashboard = () => {
  const [showChat, setShowChat] = useState(false);

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
    alert('Add Task clicked');
  };

  const handleAddMedicine = () => {
    alert('Add Medicine clicked');
  };

  const handleRemoveMedicine = () => {
    alert('Remove Medicine clicked');
  };

  const handleAddReminder = () => {
    alert('Add Reminder clicked');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="logo">Logo</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard" className="active">Dashboard</Link>
          <Link to="/community">Community</Link>
          <Link to="/events">Events</Link>
        </div>
      </nav>

      <section className="welcome-section">
        <h1>Welcome back!</h1>
        <p>Here's your daily health summary</p>
      </section>

      <section className="daily-tasks">
        <div className="section-header">
          <h2>Daily Tasks</h2>
          <button onClick={handleAddTask} className="add-button">Add Task</button>
        </div>
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
      </section>

      <div className="medicine-section">
        <div className="medicine-info">
          <h2>Medicine Details</h2>
          <div className="medicine-details">
            <p><strong>Name:</strong> {medicine.name}</p>
            <p><strong>Color:</strong> {medicine.color}</p>
            <p><strong>Dose:</strong> {medicine.dose}</p>
            <p><strong>Time:</strong> {medicine.time}</p>
          </div>
          <div className="medicine-buttons">
            <button onClick={handleAddMedicine} className="add-button">Add Medicine</button>
            <button onClick={handleRemoveMedicine} className="remove-button">Remove</button>
          </div>
        </div>

        <div className="reminder-section">
          <h2>Reminders</h2>
          <ul className="reminders-list">
            {reminders.map((reminder, index) => (
              <li key={index}>{reminder}</li>
            ))}
          </ul>
          <button onClick={handleAddReminder} className="add-button">Add Reminder</button>
        </div>
      </div>

      <div className="floating-chatbot">
        <button className="chat-toggle-button" onClick={() => setShowChat(!showChat)}>
          Chat
        </button>
        {showChat && <Chatbot />}
      </div>
    </div>
  );
};

export default Dashboard;