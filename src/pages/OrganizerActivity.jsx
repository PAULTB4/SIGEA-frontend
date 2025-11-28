// src/pages/OrganizerActivity.jsx
import React from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import DashboardLayout from '../features/dashboard/components/DashboardLayout';
import authService from '../services/authService';
import {
  organizerNavItems,
  organizerViewConfig,
} from '../features/dashboard/config/organizerDashboardConfig';

const OrganizerActivity = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  return (
    <DashboardLayout
      userEmail={user?.email}
      navItems={organizerNavItems}
      viewConfig={organizerViewConfig}
      defaultView="home"
      onLogout={handleLogout}
    />
  );
};

export default OrganizerActivity;
