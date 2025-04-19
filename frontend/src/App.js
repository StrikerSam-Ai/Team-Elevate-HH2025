import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './MyPages/Home';
import Dashboard from './MyPages/dashboard';
import Community from './MyPages/community';
import EventFinder from './MyPages/EventFinder';
import Groups from './MyPages/Groups';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/events" element={<EventFinder />} />
        <Route path="/groups/:groupId" element={<Groups />} />
      </Routes>
    </Router>
  );
}

export default App;