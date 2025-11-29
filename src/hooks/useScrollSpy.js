/* src/hooks/useScrollSpy.js */
import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds, offset = 150) => {
  const [activeId, setActiveId] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Detectar si se ha hecho scroll
      setIsScrolled(window.scrollY > 50);

      // 2. Detectar sección activa
      const scrollPosition = window.scrollY + offset;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(id);
            return; // Terminar loop una vez encontrado
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Llamar una vez al inicio
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return { activeId, isScrolled };
};