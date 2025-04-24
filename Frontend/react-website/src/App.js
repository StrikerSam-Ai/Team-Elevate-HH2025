import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './MyPages/Home';
import Dashboard from './MyPages/dashboard';
import Community from './MyPages/community';
import Groups from './MyPages/Groups';
import EventFinder from './MyPages/EventFinder';
import Login from './MyPages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/groups/:groupId" element={<Groups />} />
        <Route path="/event-finder" element={<EventFinder />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;


