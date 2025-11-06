// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/Home/hero/Hero';
import AboutUs from '../components/Home/about/AboutUs';
import WhySMCE from '../components/Home/WhySMCE';
import CoursesOverview from '../components/Home/CoursesOverview';
import PlacementsCareers from '../components/Home/PlacementsCareers';
import VisionMission from '../components/Home/VisionMission';
import RankingsSection from '../components/Home/RankingsSection';
import AdmissionsInfo from '../components/Home/AdmissionsInfo';
import AnnouncementsNotifications from '../components/Home/AnnouncementsNotifications';
import Testimonials from '../components/Home/Testimonials';
import Footer from '../components/Home/Footer';
import WhatsApp from '../components/Home/hero/WhatsApp';

function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* Page Sections */}
      <section className="w-full">
        <Hero />
      </section>

      <section className="min-h-screen w-full">
        <AboutUs />
      </section>

      <section className="min-h-screen w-full">
        <WhySMCE />
      </section>
      <section className="min-h-screen w-full">
        <CoursesOverview />
      </section>
      <section className="w-full">
        <PlacementsCareers />
      </section>
      <section className="w-full">
        <VisionMission />
      </section>
      <section className="w-full">
        <RankingsSection />
      </section>
      <section className="w-full">
        <AdmissionsInfo />
      </section>
      <section className="w-full">
        <WhatsApp />
      </section>
      <section className="w-full">
        <Testimonials />
      </section>
      <section className="w-full">
        <Footer />
      </section>
    </div>
  );
}

export default HomePage;