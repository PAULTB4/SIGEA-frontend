import { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Award, Users } from 'lucide-react';

const COLORS = {
  PRIMARY: '#598AEB',
  SECONDARY: '#59C87B',
  ACCENT_MINT: '#59EBBF',
};

// API endpoint configuration
// API endpoint configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';
/**
 * Generic data fetching hook with mock/real API support
 * @param {string} key - Data type key ('programs', 'certs', 'reviews')
 * @param {number} dataLength - Number of items to fetch
 * @returns {Object} { data, loading, error }
 */
const useFetchData = (key, dataLength = 3) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (USE_MOCK_API) {
          // Use mock data
          const mockData = getMockData(key, dataLength);
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1200));
          setData(mockData);
        } else {
          // Use real API
          const endpoint = getEndpoint(key);
          const response = await axios.get(`${API_BASE_URL}${endpoint}?limit=${dataLength}`);
          setData(response.data.data || response.data || []);
        }
      } catch (err) {
        console.error(`Error fetching ${key}:`, err);
        setError(err.message);
        // Fallback to mock data on error
        const mockData = getMockData(key, dataLength);
        setData(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key, dataLength]);

  return { data, loading, error };
};

/**
 * Get mock data based on key
 */
const getMockData = (key, dataLength) => {
  let mockData = [];

  if (key === 'programs') {
    mockData = [
      { id: 1, title: 'Gestión Ágil de Proyectos TI', icon: BookOpen, description: 'Aprende metodologías ágiles aplicadas a la gestión de proyectos tecnológicos.' },
      { id: 2, title: 'Diplomado en Inteligencia de Negocios', icon: Award, description: 'Especialización en análisis de datos y toma de decisiones empresariales.' },
      { id: 3, title: 'Conferencia de Seguridad en la Nube', icon: Users, description: 'Expertos compartiendo mejores prácticas en seguridad cloud.' },
      { id: 4, title: 'Taller de Transformación Digital', icon: BookOpen, description: 'Moderniza tu organización con tecnología digital.' },
    ];
  } else if (key === 'certs') {
    mockData = [
      { id: 4, title: 'Certificación en Data Science 2025', desc: 'Valida tu conocimiento en análisis avanzado.', color: COLORS.PRIMARY },
      { id: 5, title: 'Taller de Blockchain Aplicado', desc: 'Obtén el certificado de participación inmediata.', color: COLORS.SECONDARY },
      { id: 6, title: 'Webinars de Emprendimiento Digital', desc: 'Recursos y material exclusivo para egresados.', color: COLORS.ACCENT_MINT },
      { id: 7, title: 'Certificado en Seguridad Digital', desc: 'Acreditación en protección de datos y ciberseguridad.', color: COLORS.PRIMARY },
    ];
  } else if (key === 'reviews') {
    mockData = [
      { id: 7, name: 'Juan A.', role: 'Estudiante', text: 'El proceso de inscripción es ágil y sin errores. La mejor plataforma que he usado.' },
      { id: 8, name: 'Helen M.', role: 'Docente', text: 'Excelente soporte para la organización y emisión de certificados a tiempo.' },
      { id: 9, name: 'Paul T.', role: 'Egresado', text: 'Pude validar mi certificado digital de forma instantánea. Muy profesional.' },
    ];
  }

  return mockData.slice(0, dataLength);
};

/**
 * Map data type keys to API endpoints
 */
const getEndpoint = (key) => {
  const endpoints = {
    programs: '/programs',
    certs: '/certifications',
    reviews: '/reviews'
  };
  return endpoints[key] || '/programs';
};

// === Specific hooks for each section ===

/**
 * Fetch active programs/activities
 */
export const useProgramData = (dataLength = 3) => useFetchData('programs', dataLength);

/**
 * Fetch available certifications
 */
export const useCertData = (dataLength = 3) => useFetchData('certs', dataLength);

/**
 * Fetch user testimonials/reviews
 */
export const useReviewData = (dataLength = 3) => useFetchData('reviews', dataLength);

// Export colors for use in components
export { COLORS };
