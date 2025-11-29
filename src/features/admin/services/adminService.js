/* src/features/admin/services/adminService.js */
import apiClient from '../../../services/axiosConfig';

// Base path para no repetirlo
const BASE_PATH = '/usuarios/administrador';

const adminService = {
  /**
   * Obtener datos del Home de Administrador
   * Endpoint: GET /api/v1/usuarios/administrador/home
   */
  getAdminHome: async () => {
    const response = await apiClient.get(`${BASE_PATH}/home`);
    return response.data;
  },

  /**
   * Crear un nuevo Rol
   * Endpoint: POST /api/v1/usuarios/administrador/crear-rol
   * Payload: { nombreRol, descripcion }
   */
  createRole: async (nombreRol, descripcion) => {
    const response = await apiClient.post(`${BASE_PATH}/crear-rol`, {
      nombreRol,
      descripcion
    });
    return response.data;
  },

  /**
   * Registrar un nuevo usuario (Administrativo)
   * Endpoint: POST /api/v1/usuarios/administrador/auth/register
   */
  registerUser: async (userData) => {
    // Mapeamos los datos del formulario al formato exacto que pide el Back
    const payload = {
      nombres: userData.firstName,
      apellidos: userData.lastName,
      correo: userData.email,
      password: userData.password,
      telefono: userData.phone,
      extensionTelefonica: userData.phoneExtension || "",
      rolId: [userData.roleId] // El back espera un array de strings
    };
    
    const response = await apiClient.post(`${BASE_PATH}/auth/register`, payload);
    return response.data;
  }
};

export default adminService;