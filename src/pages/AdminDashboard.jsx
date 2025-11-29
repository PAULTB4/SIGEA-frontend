/* src/pages/AdminDashboard.jsx */
import React, { useState } from 'react';
import { Users, Shield, Plus, Home, UserPlus } from 'lucide-react';
import DashboardLayout from '../features/dashboard/components/DashboardLayout';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useAdminDashboard } from '../features/admin/hooks/useAdminDashboard';

// Componente del contenido del Home
const AdminHomeContent = ({ homeData, loading, error, successMessage, clearMessages, createRole, newRole, setNewRole, handleCreateRole }) => {
  if (loading && !homeData) {
    return (
      <div className="p-10 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* Mensajes de Feedback */}
      {(error || successMessage) && (
        <div className="mb-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center justify-between">
              <span className="text-sm">{error}</span>
              <button 
                onClick={clearMessages} 
                className="text-red-600 hover:text-red-800 font-bold text-lg"
              >
                ×
              </button>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center justify-between">
              <span className="text-sm">{successMessage}</span>
              <button 
                onClick={clearMessages} 
                className="text-green-600 hover:text-green-800 font-bold text-lg"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}

      {/* Sección 1: Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Usuarios Totales</p>
              <h3 className="text-2xl font-bold">
                {homeData?.totalUsuarios ?? 0}
              </h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <Shield size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Roles Activos</p>
              <h3 className="text-2xl font-bold">
                {homeData?.totalRoles ?? '-'}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Sección 2: Crear Rol */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold mb-6 text-gray-800">Crear Nuevo Rol</h3>
        <form onSubmit={handleCreateRole} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Rol
            </label>
            <input 
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Supervisor"
              value={newRole.nombre}
              onChange={e => setNewRole({...newRole, nombre: e.target.value})}
              required
            />
          </div>
          <div className="flex-[2] w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <input 
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descripción de permisos..."
              value={newRole.desc}
              onChange={e => setNewRole({...newRole, desc: e.target.value})}
              required
            />
          </div>
          <button 
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Creando...</span>
              </>
            ) : (
              <>
                <Plus size={18} />
                <span>Crear</span>
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { 
    homeData, 
    loading, 
    error, 
    successMessage, 
    clearMessages,
    createRole 
  } = useAdminDashboard();

  const [newRole, setNewRole] = useState({ nombre: '', desc: '' });

  const handleCreateRole = async (e) => {
    e.preventDefault();
    const success = await createRole(newRole.nombre, newRole.desc);
    if (success) setNewRole({ nombre: '', desc: '' });
  };

  // Configuración de navegación
  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'users', label: 'Gestión de Usuarios', icon: UserPlus }
  ];

  const viewConfig = {
    home: {
      title: 'Panel de Administración',
      subtitle: 'Gestión de usuarios y roles del sistema',
      component: () => (
        <AdminHomeContent 
          homeData={homeData}
          loading={loading}
          error={error}
          successMessage={successMessage}
          clearMessages={clearMessages}
          createRole={createRole}
          newRole={newRole}
          setNewRole={setNewRole}
          handleCreateRole={handleCreateRole}
        />
      )
    },
    users: {
      title: 'Gestión de Usuarios',
      subtitle: 'Administrar usuarios del sistema',
      component: () => (
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">Módulo de gestión de usuarios en desarrollo...</p>
        </div>
      )
    }
  };

  return (
    <DashboardLayout
      userEmail={user?.email}
      navItems={navItems}
      viewConfig={viewConfig}
      defaultView="home"
      onLogout={logout}
    />
  );
};

export default AdminDashboard;