// src/features/participantDashboard/hooks/useParticipantDashboard.js
import { useState, useEffect } from 'react';
import authService from '../../../services/authService';

const useParticipantDashboard = () => {
  const [currentView, setCurrentView] = useState('home');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Intentar obtener el correo del localStorage
    const storedEmail = localStorage.getItem('userEmail');
    setUserEmail(storedEmail || '');
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  return {
    currentView,
    setCurrentView,
    userEmail,
    handleLogout,
  };
};

export default useParticipantDashboard;
