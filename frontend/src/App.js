// src/App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

function Sidebar() {
  // Define your sidebar here
  return (
    <div className="sidebar">
      <a href="#widgets">Widgets</a>
      <a href="#app">App</a>
      <a href="#dashboard">Dashboard</a>
      <a href="#settings">Settings</a>
    </div>
  );
}

function Dashboard() {
  // Define your dashboard grid here
  return (
    <div className="dashboard">
      {Array.from({ length: 9 }, (_, i) => (
        <div className="grid-item" key={i}>Item {i + 1}</div>
      ))}
    </div>
  );
}

export default App;
