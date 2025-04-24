import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './MyPages/Home';
import Dashboard from './MyPages/dashboard';
import Community from './MyPages/community';
import EventFinder from './MyPages/EventFinder';
import Groups from './MyPages/Groups';
import Groups1 from './MyPages/Groups1';
import Profile from './MyPages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/events" element={<EventFinder />} />
        <Route path="/groups/:id" element={<Groups />} />
        <Route path="/groups1" element={<Groups1 />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;


