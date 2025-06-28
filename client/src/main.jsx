/* filepath: d:\mocca\client\src\main.jsx */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Meet from './pages/Meet.jsx';
import Navbar from './components/Navbar.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className="pt-16"> {/* Add padding for fixed navbar */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route
            path="/meet/:roomId"
            element={
              <ProtectedRoute>
                <Meet />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);