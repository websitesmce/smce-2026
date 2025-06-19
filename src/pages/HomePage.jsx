// src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Hero from '../components/Home/hero/Hero';
import AboutUs from '../components/Home/about/AboutUs';
import WhySMCE from '../components/Home/WhySMCE';
import CoursesOverview from '../components/Home/CoursesOverview';
import PlacementsCareers from '../components/Home/PlacementsCareers';

function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Fixed Navbar (if applicable) */}
      <Navbar />

      {/* Page Sections */}
      <section className="min-h-screen w-full">
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
      <section className="min-h-screen w-full">
        <PlacementsCareers />
      </section>
    </div>
  );
}

export default HomePage;