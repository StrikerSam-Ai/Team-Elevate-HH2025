import React, { useState } from 'react';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import Chatbot from './Chatbot';
import './style.css';
import Footer from './Footer';
import Jaya from './Jaya.jpg';
import dashboard from './dashboard.jpg';  
import SlideTransition from './SlideTransition';
import reminder from './reminder.jpg'; 
import Namaste from './namaste.png';  

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

  const handleAddTask = () => alert('Add Task clicked');
  const handleAddMedicine = () => alert('Add Medicine clicked');
  const handleRemoveMedicine = () => alert('Remove Medicine clicked');
  const handleAddReminder = () => alert('Add Reminder clicked');

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <SlideTransition />  
      <div className="dashboard-container">
        <nav className="navbar">
          <div className="nav-content">
            <div className="logo">Logo</div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/community">Community</Link>
              <Link to="/events">Events</Link>
            </div>
          </div>
          <div className="profile-photo" onClick={() => setIsProfileOpen(true)}>
            <img src={Jaya} alt="Profile" />
          </div>
        </nav>

        <section className="welcome-section">
          <div className="welcome-content">
            <h1>Welcome back!</h1>
            <img src={Namaste} alt="Namaste" className="namaste-icon" />
          </div>
          <div className="welcome-image">
            <img src={dashboard} alt="Dashboard Overview" />
          </div>
        </section>

        <section className="daily-tasks">
          <div className="section-header">
            <h2 className="task-heading">Daily Tasks</h2>
            <button onClick={handleAddTask} className="add-button-container">Add Task</button>
          </div>
          <div className="tasks-container">
            <div className="tasks-list">
              {tasks.map(task => (
                <div key={task.id} className="task-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskToggle(task.id)} />
                    {task.text}
                  </label>
                </div>
              ))}
            </div>
            <div className="tasks-image">
              <img src={reminder} alt="Daily Tasks Reminder" />
            </div>
          </div>
        </section>

        <section className="medicine-section">
          <div className="medicine-info">
            <h2>Medicine Details</h2>
            <div className="medicine-details">
              <p>Name: {medicine.name}</p>
              <p>Color: {medicine.color}</p>
              <p>Dose: {medicine.dose}</p>
              <p>Time: {medicine.time}</p>
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
        </section>

        <Footer />
      </div>

      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};

export default Dashboard;