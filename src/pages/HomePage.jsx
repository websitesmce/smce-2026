import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';

// Above-fold components — loaded eagerly (no lazy)
import Hero from '../components/Home/hero/Hero';

// Below-fold components — code-split, only downloaded when near viewport
const AboutUs           = lazy(() => import('../components/Home/about/AboutUs'));
const WhySMCE           = lazy(() => import('../components/Home/WhySMCE'));
const CoursesOverview   = lazy(() => import('../components/Home/CoursesOverview'));
const PlacementsCareers = lazy(() => import('../components/Home/PlacementsCareers'));
const VisionMission     = lazy(() => import('../components/Home/VisionMission'));
const RankingsSection   = lazy(() => import('../components/Home/RankingsSection'));
const AdmissionsInfo    = lazy(() => import('../components/Home/AdmissionsInfo'));
const Testimonials      = lazy(() => import('../components/Home/Testimonials'));
const Footer            = lazy(() => import('../components/Home/Footer'));

// ── Skeleton shown while a chunk is downloading ─────────────────────────────

function SectionSkeleton({ height = 600 }) {
  return (
    <div
      className="w-full animate-pulse bg-gray-50"
      style={{ minHeight: height }}
      aria-hidden="true"
    >
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-5">
        <div className="h-2.5 w-14 bg-gray-200 rounded-full" />
        <div className="h-9 w-72 bg-gray-200 rounded-xl" />
        <div className="h-4 w-80 bg-gray-100 rounded-lg" />
        <div className="grid grid-cols-3 gap-4 pt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-gray-100 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Intersection-Observer gate ───────────────────────────────────────────────
// Delays both mounting AND the network fetch of the JS chunk until the user
// is within 500 px of the section. Combines with React.lazy for true
// bandwidth-on-demand loading.

function LazySection({ component, height = 600 }) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Capital alias so JSX treats it as a component, not a DOM element
  const Comp = component;

  return (
    <div ref={ref}>
      {mounted ? (
        <Suspense fallback={<SectionSkeleton height={height} />}>
          <Comp />
        </Suspense>
      ) : (
        <SectionSkeleton height={height} />
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* ── Above fold — eager ── */}
      <section id="home" className="w-full">
        <Hero />
      </section>

      {/* ── Below fold — lazy on-demand ── */}
      <section id="about">
        <LazySection component={AboutUs} height={700} />
      </section>

      <section id="why-smce">
        <LazySection component={WhySMCE} height={650} />
      </section>

      <section id="courses">
        <LazySection component={CoursesOverview} height={800} />
      </section>

      <section id="placements">
        <LazySection component={PlacementsCareers} height={550} />
      </section>

      <section id="vision">
        <LazySection component={VisionMission} height={900} />
      </section>

      <section id="rankings">
        <LazySection component={RankingsSection} height={500} />
      </section>

      <section id="admissions">
        <LazySection component={AdmissionsInfo} height={800} />
      </section>

      <section id="testimonials">
        <LazySection component={Testimonials} height={600} />
      </section>

      <LazySection component={Footer} height={400} />
    </div>
  );
}
