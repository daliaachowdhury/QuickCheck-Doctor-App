import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Queue from '../pages/Queue';
import Patient from '../pages/Patient';
import Patients from '../pages/Patients';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Standalone pages — no header/nav */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Default redirect to Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* All app pages inside the shared MainLayout shell */}
      <Route element={<MainLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/queue" element={<Queue />} />

        {/* Patient Directory */}
        <Route path="/patients" element={<Patients />} />

        {/* Patient Details */}
        <Route path="/patient/:id" element={<Patient />} />


        <Route path="/calendar" element={
          <div className="text-center py-16 font-medium text-brand-muted">
            📅 Calendar coming soon
          </div>
        } />
        <Route path="/more" element={
          <div className="text-center py-16 font-medium text-brand-muted">
            ⚙️ Settings coming soon
          </div>
        } />

        {/* 404 catch-all inside the app */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
