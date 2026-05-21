// src/App.jsx
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import { Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

// --- Page/Component Imports ---
import HomePage from './pages/HomePage';
import Navbar from './components/navbar/Navbar';
import AboutTrust from './pages/Administration/AboutTrust';
import Chairman from './pages/Administration/Chairman';
import Secretary from './pages/Administration/Secretary';
import Director from './pages/Administration/Director';
import VicePresident from './pages/Administration/VicePresident';
import Principal from './pages/Administration/Principal';
import AcademicsPage from './pages/Academics/AcademicsPage';
import AcademicCalendarPage from './pages/Academics/AcademicCalendarPage';
import ProgrammesOffered from './pages/Admissions/ProgrammesOffered';
import AdmissionProcedure from './pages/Admissions/AdmissionProcedure';
import DepartmentCSE from './pages/Departments/CSEDepartmentTabs';
import DepartmentCSEAI from './pages/Departments/DepartmentCSEAI';
import DepartmentCSEDS from './pages/Departments/DepartmentCSEDS';
import DepartmentIT from './pages/Departments/DepartmentIT';
import DepartmentECE from './pages/Departments/DepartmentECE';
import DepartmentSH from './pages/Departments/DepartmentSH';
import DepartmentMBA from './pages/Departments/DepartmentMBA';
import ControllerOfExaminations from './pages/ExaminationCell/ControllerOfExaminations';
import ContactPage from './pages/ExaminationCell/ContactPage';
import PreviousQuestions from './pages/ExaminationCell/PreviousQuestions';
import DigitalLibrary from './pages/StudentsCorner/DigitalLibrary';
import StudentGrievance from './pages/StudentsCorner/StudentGrievance';
import Classroom from './pages/StudentsCorner/Classroom';
import Laboratories from './pages/StudentsCorner/Laboratories';
import Hostel from './pages/StudentsCorner/Hostel';
import Transport from './pages/StudentsCorner/Transport';
import HealthCenter from './pages/StudentsCorner/HealthCenter';
import Canteen from './pages/StudentsCorner/Canteen';
import GoverningBody from './pages/StatutoryBody/GoverningBody';
import AcademicCouncil from './pages/StatutoryBody/AcademicCouncil';
import BoardOfStudies from './pages/StatutoryBody/BoardOfStudies';
import FinanceCommittee from './pages/StatutoryBody/FinanceCommittee';
import AicteAffiliations from './pages/StatutoryBody/AicteAffiliations';
import AntiRagging from './pages/StatutoryBody/AntiRagging';
import IQAC from './pages/StatutoryBody/IQAC';
import CommitteesPage from './pages/StatutoryBody/committees';
import CommitteeDetails from './pages/StatutoryBody/CommitteeDetails';
import LoaderSMCE from './components/navbar/LoaderSMCE';
import WhatsAppButton from './components/Home/hero/WhatsApp';
import AQAR2023_24 from './pages/NAAC/AQAR2023_24';
import AQAR2022_23 from './pages/NAAC/AQAR2022_23';
import ICT from './pages/NAAC/ICT';
import ExtendedProfiles from './pages/NAAC/ExtendedProfiles';

// Import the critical hero image for preloading
// IMPORTANT: Adjust this path if the image is located elsewhere relative to App.jsx
import criticalHeroImage from './assets/home/Hero-imgs/1.jpg'; 
import GalleryTiles from './components/Home/GalleryTiles';
import AQAR2024_25 from './pages/NAAC/AQAR2024_25';
import AdmissionForm from './pages/AdmissionForm';
import ThankYou from './pages/ThankYou';
import Login from './pages/AdsLeads/pages/Login';
import Dashboard from './pages/AdsLeads/pages/Dashboard';
import StudentPortal from './pages/StudentPortal';
import FlaotingButton from './components/FlaotingButton';

// Resets scroll position to the top on every route change.
// Must live inside <BrowserRouter> so useLocation works.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function ProtectedRoute({ user, authLoading, children }) {
  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#800000] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function LayoutWrapper({ children }) {
  const location = useLocation();

  const isDashboard =
    location.pathname === "/login" ||
    location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && location.pathname !== "/admission-form" && (
        <FlaotingButton />
      )}
      {!isDashboard && <WhatsAppButton />}
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [loaderAnimationDone, setLoaderAnimationDone] = useState(false);
  const [criticalImageLoaded, setCriticalImageLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // 1. Loader Animation Timer (2.5s)
  useEffect(() => {
    // This timer tracks the duration of the visible GSAP loader animation
    const timer = setTimeout(() => {
      setLoaderAnimationDone(true);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  // 2. Critical Image Preloader
  useEffect(() => {
    // Preload the first hero slide image
    const img = new Image();
    img.src = criticalHeroImage;
    
    const handleLoad = () => setCriticalImageLoaded(true);
    const handleError = () => {
        // Assume loaded even on error to prevent infinite loading state
        console.warn("Critical hero image failed to load, proceeding.");
        setCriticalImageLoaded(true); 
    };

    img.onload = handleLoad;
    img.onerror = handleError;

    return () => {
        img.onload = null;
        img.onerror = null;
    };
  }, []);

  // 3. Final Loading Check
  useEffect(() => {
      // The loading screen is removed only when BOTH conditions are met:
      if (loaderAnimationDone && criticalImageLoaded) {
          // This delay (1000ms) is crucial to allow the GSAP exit animation 
          // (which is outside the 2.5s initial timer) in LoaderSMCE to complete.
          const finalTimer = setTimeout(() => {
              setLoading(false);
          }, 1000); 
          return () => clearTimeout(finalTimer);
      }
  }, [loaderAnimationDone, criticalImageLoaded]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const location = window.location.pathname;

  const shouldSkipLoader = location === "/login" || location.startsWith("/dashboard");

  return (
    <>
      {!shouldSkipLoader && (loading || authLoading) ? (
        <LoaderSMCE />
      ) : (
        <BrowserRouter>
          <ScrollToTop />
          <LayoutWrapper>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-trust" element={<AboutTrust />} />
            <Route path="/chairman" element={<Chairman />} />
            <Route path="/secretary" element={<Secretary />} />
            <Route path="/director" element={<Director />} />
            <Route path="/vice-president" element={<VicePresident />} />
            <Route path="/principal" element={<Principal />} />
            <Route path="/academic-regulations" element={<AcademicsPage />} />
            <Route path="/academic-calendars" element={<AcademicCalendarPage />} />
            <Route path="/programmes-offered" element={<ProgrammesOffered />} />
            <Route path="/admission-procedure" element={<AdmissionProcedure />} />
            <Route path="/cse-department" element={<DepartmentCSE />} />
            <Route path="/cse-ai-department" element={<DepartmentCSEAI />} />
            <Route path="/cse-ds-department" element={<DepartmentCSEDS />} />
            <Route path="/it-department" element={<DepartmentIT />} />
            <Route path="/ece-department" element={<DepartmentECE />} />
            <Route path="/sh-department" element={<DepartmentSH />} />
            <Route path="/mba-department" element={<DepartmentMBA />} />
            <Route path="/controller-of-examination" element={<ControllerOfExaminations />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/question-papers" element={<PreviousQuestions />} />
            <Route path="/digital-library" element={<DigitalLibrary />} />
            <Route path="/student-grievance" element={<StudentGrievance />} />
            <Route path="/classroom" element={<Classroom />} />
            <Route path="/laboratories" element={<Laboratories />} />
            <Route path="/hostel" element={<Hostel />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/health-center" element={<HealthCenter />} />
            <Route path="/canteen" element={<Canteen />} />
            <Route path="/governing-body" element={<GoverningBody />} />
            <Route path="/academic-council" element={<AcademicCouncil />} />
            <Route path="/board-of-studies" element={<BoardOfStudies />} />
            <Route path="/finance-committe" element={<FinanceCommittee />} />
            <Route path="/aicte" element={<AicteAffiliations />} />
            <Route path="/anti-ragging" element={<AntiRagging />} />
            <Route path="/iqac" element={<IQAC />} />
            <Route path="/committees" element={<CommitteesPage />} />
            <Route path="/committees/:id" element={<CommitteeDetails />} />
            <Route path="/naac-aqar2024-25" element={<AQAR2024_25 />} />
            <Route path="/naac-aqar2023-24" element={<AQAR2023_24 />} />
            <Route path="/naac-aqar2022-23" element={<AQAR2022_23 />} />
            <Route path="/ict" element={<ICT />} />
            <Route path="/extended-profile" element={<ExtendedProfiles />} />
            <Route path="/gallery" element={<GalleryTiles />} />
            <Route path="/admission-form" element={<AdmissionForm />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student-portal" element={<StudentPortal />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user} authLoading={authLoading}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
  
            </Routes>
          </LayoutWrapper>
          <Analytics />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;