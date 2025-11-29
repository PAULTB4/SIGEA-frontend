import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useMemo 
} from 'react';
import authService from '../../../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      setLoading(true);
      
      const timeoutId = setTimeout(() => {
        console.warn('Session check timeout');
        setLoading(false);
      }, 3000);
      
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('authToken');

        if (storedUser && token) {
          const isValid = authService.isAuthenticated();
          
          if (isValid) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } else {
            console.log('Token inválido - limpiando sesión');
            authService.logout();
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error al verificar sesión:', error);
        authService.logout();
        setUser(null);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };
    
    checkUserSession();
  }, []);

 const login = async (credentials) => {
  try {
    setLoading(true);
    
    const response = await authService.login(
      credentials.email, 
      credentials.password
    );
    
    console.log('Response del authService:', response); // Debug
    
    // ✅ IMPORTANTE: NO incluir el token en userData
    const userData = {
      email: response.user.email,
      role: response.user.role
      // ❌ NO incluir: token: response.token
    };

    // Guardar en localStorage (el authService ya guardó el token)
    localStorage.setItem('user', JSON.stringify(userData));
    // El authService ya hizo esto, pero por seguridad lo repetimos:
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('tokenTimestamp', Date.now().toString());
    
    console.log('Usuario guardado:', userData); // Debug
    
    setUser(userData);

    return { success: true, role: userData.role };
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  } finally {
    setLoading(false);
  }
};

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};