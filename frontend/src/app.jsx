import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const App = () => {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = (newToken, userRole) => {
    setToken(newToken);
    setRole(userRole);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage onSignup={handleLogin} />} />
        <Route
          path="/student"
          element={
            role === 'student' ? (
              <StudentDashboard token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/teacher"
          element={
            role === 'teacher' ? (
              <TeacherDashboard token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
