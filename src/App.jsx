import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  return (
    <div className="app">
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      
      </Routes>
    </div>
  );
};

export default App
