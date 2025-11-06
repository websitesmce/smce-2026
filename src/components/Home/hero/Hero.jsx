import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// Placeholder imports for images (ensure these paths are correct in your project)
import Image1 from '../../../assets/home/Hero-imgs/1.jpg';
import Image2 from '../../../assets/home/Hero-imgs/2.jpg';
import Image3 from '../../../assets/home/Hero-imgs/5.jpg';
import Image4 from '../../../assets/home/Hero-imgs/6.jpg';
import Image5 from '../../../assets/home/Hero-imgs/9.jpg';

const CUSTOM_FONT = 'Arial, sans-serif'; 
const RED_COLOR = '#800000'; // Maroon for highlights
const ACCENT_COLOR = '#C24805'; // Orange-Red for title
const INTERVAL_TIME = 6500; // Time between slide changes

const slides = [
  {
    // 1: Girl holding a book -> Focus on individual growth and career readiness.
    text: [
      { text: 'We empower every student to ', highlight: false },
      { text: 'excel professionally.', highlight: true },
    ],
    image: Image1,
  },
  {
    // 2: Student in classroom -> Focus on learning environment and clarity.
    text: [
      { text: 'Spacious classrooms ensure ', highlight: false },
      { text: 'focused learning with ease.', highlight: true },
    ],
    image: Image2,
  },
  {
    // 3: Student in computer lab -> Focus on technology and modern skills.
    text: [
      { text: 'Gain future-ready skills in our ', highlight: false },
      { text: 'advanced computer labs.', highlight: true },
    ],
    image: Image3,
  },
  {
    // 4: Well-equipped Electronic labs -> Focus on practical exposure and industry tools.
    text: [
      { text: 'Learn hands-on with ', highlight: false },
      { text: 'industry-standard equipment.', highlight: true },
    ],
    image: Image4,
  },
  {
    // 5: Drone shot of campus -> Focus on campus life and a holistic experience.
    text: [
      { text: 'Experience a vibrant and ', highlight: false },
      { text: 'green campus life.', highlight: true },
    ],
    image: Image5,
  },
  
];

// Subtly smaller font size clamping for dynamic text (remains the same)
const getDynamicTextFontSize = () => {
  const width = window.innerWidth;
  if (width < 768) return 'clamp(1.0rem, 4.5vw, 1.6rem)'; // Slightly increased
  if (width >= 768 && width < 1024) return 'clamp(1.2rem, 2.5vw, 1.8rem)'; // Slightly increased
  return 'clamp(1.3rem, 1.8vw, 2.0rem)';
};

function Hero() {
  const [index, setIndex] = useState(0);
  const collegeNameRef = useRef(null);
  const ctaRef = useRef(null); 
  const textRevealBoxRef = useRef(null);
  // Image reference remains on the <img> tag for GSAP
  const currentImageRef = useRef(null); 
  const initialLoadRef = useRef(true); 
  const isAnimatingRef = useRef(false); 

  // Function to advance the slide
  const nextSlide = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [setIndex]);

  // --- Initial Animation for Static Elements (Title only) ---
  useEffect(() => {
    if (initialLoadRef.current) {
      const initialTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate only the college name since CTAs are removed
      initialTl.fromTo(
          collegeNameRef.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1.2, delay: 0.5 }
      );
      
      initialLoadRef.current = false;
    }
  }, []); 

  // --- Animation for Dynamic Elements (Image & Text) ---
  useEffect(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    
    // GSAP kill tweens for the image
    gsap.killTweensOf([currentImageRef.current, textRevealBoxRef.current]);

    // --- Image Panning/Zooming Animation (ZOOM IN SLOWLY) ---
    // This animation (scale 1.05) is what was causing the overflow, now it will be clipped
    if (currentImageRef.current) {
      gsap.fromTo(
        currentImageRef.current,
        // Start state: Scale 1 (not zoomed), Centered (0%, 0%)
        { scale: 1, x: "0%", y: "0%" }, 
        // End state: Scale 1.05 (slightly zoomed in), Shifted for panning effect
        { scale: 1.05, x: "-2%", y: "2%", duration: 7, ease: "power2.out", overwrite: 'auto' }
      );
    }

    // --- Text Reveal Timeline ---
    const textTl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    const wordElements = textRevealBoxRef.current?.querySelectorAll('.word');
    
    // 0. Initial Text fade out
    if (index !== 0) { 
        textTl.to(wordElements, { y: 15, opacity: 0, duration: 0.3, stagger: 0.02 }, 0);
    }
    
    // 1. Exit Animation: Box closes from right to left (faster curve)
    if (index !== 0) { 
        textTl.to(
            textRevealBoxRef.current,
            { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', duration: 0.6, ease: "power3.in" },
            '>0.1' 
        );
    } else {
        textTl.addLabel("initial_start", 0);
    }
    
    // Set new text state (React handles content update) and reset clip-path for entry
    textTl.set(textRevealBoxRef.current, { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }, index !== 0 ? '+=0.1' : 'initial_start');

    // 2. Entry Animation: Box expands from left to right
    textTl.to(
        textRevealBoxRef.current,
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.8 },
        '<'
    );

    // 3. New Main Dynamic Text Staggered Fade In
    if (wordElements) {
      textTl.fromTo(
        wordElements,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.03, ease: 'power2.out' },
        '<0.3' 
      );
    }
    
    // Reset the animation guard after the timeline completes
    textTl.call(() => {
        isAnimatingRef.current = false;
    });

  }, [index]); 

  // --- Interval Setup ---
  useEffect(() => {
    // This effect handles the timer that changes the slide index
    const interval = setInterval(() => {
      if (!isAnimatingRef.current) { 
        nextSlide();
      }
    }, INTERVAL_TIME);

    return () => clearInterval(interval);
  }, [nextSlide]); 

  // Dynamic font size for the slide text (updated with slight increase)
  const dynamicSlideTextFontSize = getDynamicTextFontSize(); 
  
  // Custom font size for the main college name block
  const getCollegeNameFontSize = (defaultSize, mobileMultiplier, tabletMultiplier, desktopMultiplier) => {
    const width = window.innerWidth;
    if (width < 768) return `clamp(${defaultSize * mobileMultiplier}rem, 6vw, ${defaultSize * mobileMultiplier}rem)`; 
    if (width >= 768 && width < 1024) return `clamp(${defaultSize * tabletMultiplier}rem, 4.5vw, ${defaultSize * tabletMultiplier}rem)`; 
    return `clamp(${defaultSize * desktopMultiplier}rem, 3.2vw, ${defaultSize * desktopMultiplier}rem)`;
  };


  return (
    <section
      // Main section remains h-screen (100vh) to correctly position lower content
      className="hero-section relative w-full h-screen overflow-hidden text-white flex items-center" 
      style={{ userSelect: 'none' }}
    >
      
      {/* --- NEW IMAGE WRAPPER (The Clipping Container) --- */}
      {/* This element controls the visible area of the image and has overflow-hidden */}
      <div 
        className="image-wrapper absolute top-0 left-0 w-full z-0 overflow-hidden"
        // Mobile height: 80vh, Desktop/Tablet height: full (100% of h-screen)
        style={{ height: window.innerWidth < 768 ? '80vh' : '100%' }}
      >
        {/* Background Image Slideshow */}
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.image}
            alt={slide.text.map(t => t.text).join(' ')}
            ref={i === index ? currentImageRef : null}
            // Image height is now 100% of the WRAPPER's height
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
            style={{
              opacity: i === index ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
              // zIndex can be 0 or 1 since the wrapper handles the main stacking context
              zIndex: 1, 
              filter: 'brightness(0.8)' 
            }}
            loading={i === index ? 'eager' : 'lazy'}
            draggable={false}
            aria-hidden={i !== index}
          />
        ))}

        {/* Dark Overlay for Text Readability - Stays at 100% of WRAPPER height */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-20 pointer-events-none"
        />

        {/* --- Fade to White Gradient (Mobile Only) --- */}
        {/* Positioned at the bottom of the WRAPPER (which is 80vh high on mobile) */}
        <div
          aria-hidden="true"
          className="absolute left-0 w-full h-1/5 z-30 md:hidden pointer-events-none" 
          style={{
            // Adjusted: bottom: -0.2rem to create a slight overlap and remove any gap
            bottom: '-0.2rem', 
            // Fade from transparent (top of this 1/4 section) to full white (bottom)
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
          }}
        />

      </div>
      
      {/* --- Main Content Block (Left-Aligned, Space-Between Vertical Distribution) --- */}
      {/* Remains Z-20/Z-30 and stretches h-full (100vh) */}
      <div 
        className="relative z-40 w-full h-full flex flex-col justify-between mx-auto" 
        style={{ 
            maxWidth: '1400px', 
            // PADDING ADJUSTED for clearance above social icons
            padding: '8rem 0.75rem', 
            paddingTop: '110px', 
        }} 
      >
          {/* Top Content: College Name (Centered on Mobile/Tablet) */}
          <div className="flex flex-col items-center sm:items-start w-full text-center sm:text-left"> 
              
              {/* 1. College Name (Title Block) */}
              <div 
                  ref={collegeNameRef} 
                  className="mb-6 w-full" 
                  style={{ 
                      textShadow: '0 2px 6px rgba(0,0,0,0.7)',
                      // MARGIN TOP ADJUSTMENT: Fixed at 40px
                      marginTop: '40px' 
                  }}
              >
                  <div
                    className="text-white font-semibold leading-tight tracking-wider"
                    style={{ 
                      fontFamily: "MyCustomFont",
                      // MOBILE FONT SIZE REDUCTION: Changed mobileMultiplier from 1.3 to 1.1 for 'SRI MITTAPALLI'
                      fontSize: getCollegeNameFontSize(2.0, 1.1, 1.2, 1.4),
                      color: ACCENT_COLOR 
                    }}
                  >
                    SRI MITTAPALLI
                  </div>
                  <div 
                      className="text-white font-semibold"
                      style={{ 
                          fontFamily: CUSTOM_FONT,
                          // Kept the current multiplier for 'COLLEGE OF ENGINEERING'
                          fontSize: getCollegeNameFontSize(1.0, 1.3, 1.2, 1.0),
                          // INCREASED SPACING
                          lineHeight: '1.6' 
                      }}
                  >
                    COLLEGE OF ENGINEERING
                  </div>
                  <div 
                      className="text-white font-semibold"
                      style={{ 
                          fontFamily: CUSTOM_FONT,
                          // Kept the current multiplier for 'AUTONOMOUS'
                          fontSize: getCollegeNameFontSize(0.8, 1.1, 1.0, 0.8),
                          // INCREASED SPACING
                          lineHeight: '2.2' 
                      }}
                  >
                    AUTONOMOUS
                  </div>
              </div>

              {/* 2. CTAs (REMOVED AS REQUESTED) */}
              <div ref={ctaRef} className="hidden"> 
              </div>
          </div>


          {/* Bottom Content: Text Reveal Box (Lower Third Style) - Always left-aligned */}
          <div className="flex flex-col items-start"> 
              <div
                ref={textRevealBoxRef}
                className="p-4 md:p-6 shadow-2xl text-left" 
                style={{
                  color: 'black',
                  overflow: 'hidden',
                  clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', 
                  maxWidth: '500px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  // Fixed dimensions for smooth animation
                  minWidth: '350px', 
                  // MOBILE MIN HEIGHT ADJUSTMENT: Reduced for mobile/smaller screens
                  minHeight: window.innerWidth < 768 ? '80px' : '100px', 
                }}
              >
                <div
                  aria-live="polite"
                  className="hero-text"
                  style={{
                    fontSize: dynamicSlideTextFontSize, // Uses the slightly increased font size clamp
                    fontWeight: '700',
                    lineHeight: '1.3',
                    userSelect: 'none',
                  }}
                >
                  {slides[index].text.map(({ text, highlight }, idx) =>
                    text.split(' ').map((word, i) => (
                      <span
                        key={`${index}-${idx}-${i}`} 
                        className="word inline-block mr-2 opacity-0"
                        style={highlight ? { color: RED_COLOR } : {}}
                      >
                        {word}
                        {i < text.split(' ').length - 1 ? ' ' : ''}
                      </span>
                    ))
                  )}
                </div>
              </div>
          </div>
      </div>
      
      {/* Social Icons centered at bottom (position is relative to the bottom edge of the screen) */}
      <div
        className="social-icons absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 md:gap-6 z-40"
        style={{ maxWidth: '90vw', overflow: 'visible' }}
      >
        {/* FIX: Replaced FaTwitter with FaYoutube in the array initialization */}
        {[FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn].map((Icon, idx) => {
          let href = '#!'
          let ariaLabel = 'Social media link'
          if (Icon === FaFacebookF) {
            href = 'https://www.facebook.com/smcengg'
            ariaLabel = 'Facebook'
          } else if (Icon === FaYoutube) { // FIX: Changed logic from FaTwitter to FaYoutube
            href = 'https://www.youtube.com/@srimittapallicollegeofengi5006'
            ariaLabel = 'YouTube'
          } else if (Icon === FaInstagram) {
            href = 'https://www.instagram.com/smce_guntur?igsh=YnozNmpuajFmZjY='
            ariaLabel = 'Instagram'
          } else if (Icon === FaLinkedinIn) {
            href = 'https://www.linkedin.com/school/sri-mittapalli-college-of-engineering-nh-5-tummalapalem-pin-522-233-cc-u9-/'
            ariaLabel = 'LinkedIn'
          }
          return (
            <a
              key={idx}
              href={href}
              aria-label={ariaLabel}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-red-700 text-white rounded-full w-10 h-10 md:w-12 md:h-12 text-lg md:text-xl transition duration-300 hover:scale-110 hover:bg-red-800"
            >
              <Icon />
            </a>
          )
        })}
      </div>
    </section>
  )
}

export default Hero