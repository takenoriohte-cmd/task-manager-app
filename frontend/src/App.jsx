import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TaskCreate from './components/TaskCreate';
import TaskEdit from './components/TaskEdit';
import ProjectList from './components/ProjectList';
import ProjectCreate from './components/ProjectCreate'; // 追加

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks/new" element={<TaskCreate />} />
        <Route path="/tasks/edit/:id" element={<TaskEdit />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/new" element={<ProjectCreate />} /> {/* 追加 */}
      </Routes>
    </Router>
  );
}

export default App;