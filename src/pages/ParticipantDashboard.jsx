// src/pages/ParticipantDashboard.jsx
import React from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import DashboardLayout from '../features/dashboard/components/DashboardLayout';
import authService from '../services/authService';
import {
  participantNavItems,
  participantViewConfig,
} from '../features/dashboard/config/participantDashboardConfig';

const ParticipantDashboard = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  return (
    <DashboardLayout
      userEmail={user?.email}
      navItems={participantNavItems}
      viewConfig={participantViewConfig}
      defaultView="home"
      onLogout={handleLogout}
    />
  );
};

export default ParticipantDashboard;
