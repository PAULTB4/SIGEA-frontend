import React from 'react';
import { useLanding } from '../features/landing/hooks/useLanding';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../features/landing/components/heroSection';
import ProgramsSection from '../features/landing/components/programsSection';
import CertificationsSection from '../features/landing/components/certificationsSection';
import ReviewsSection from '../features/landing/components/reviewsSection';
import AboutSection from '../features/landing/components/aboutSection';
import NextEventSection from '../features/landing/components/nextEventSection';

function LandingPage() {
  const { programs, certifications, reviews, nextEvent, loading } = useLanding();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ProgramsSection programs={programs} loading={loading} />
        <NextEventSection nextEvent={nextEvent} loading={loading} />
        <CertificationsSection certifications={certifications} loading={loading} />
        <ReviewsSection reviews={reviews} loading={loading} />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
