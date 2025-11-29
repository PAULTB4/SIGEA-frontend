import { useState, useEffect } from 'react';
import { landingService } from '../services/landingService';

export const useLanding = () => {
  const [programs, setPrograms] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [nextEvent, setNextEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLandingData();
  }, []);

  const loadLandingData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [programsRes, certsRes, reviewsRes, nextEventRes] = await Promise.all([
        landingService.getPrograms(),
        landingService.getCertifications(),
        landingService.getReviews(),
        landingService.getNextEvent(),
      ]);

      setPrograms(programsRes.data || []);
      setCertifications(certsRes.data || []);
      setReviews(reviewsRes.data || []);
      setNextEvent(nextEventRes.data || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    loadLandingData();
  };

  return {
    programs,
    certifications,
    reviews,
    nextEvent,
    loading,
    error,
    refetch,
  };
};
