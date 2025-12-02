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
            authService.logout();
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
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
  setLoading(true);

  try {
    const response = await authService.login(
      credentials.email,
      credentials.password,
      credentials.rememberMe || false
    );

    // ✅ AGREGAR: Obtener el userId del token
    const userId = authService.getUserId();

    // Si llegamos aquí, el login fue exitoso
    const userData = {
      id: userId,
      email: response.user.email,
      role: response.user.role
    };

    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('tokenTimestamp', Date.now().toString());

    setUser(userData);

    return { success: true, role: userData.role };

  } catch (error) {
    // ✅ El error ya viene de authService con el mensaje correcto
    // Solo re-lanzarlo tal cual
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