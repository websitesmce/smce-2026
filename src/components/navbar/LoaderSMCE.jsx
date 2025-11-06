import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logo from '../../assets/logo/logo.png'; // Update the path if different

function LoaderSMCE() {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => {
            if (loaderRef.current) loaderRef.current.style.display = 'none';
          },
        });
      },
    });

    tl.fromTo(
      logoRef.current,
      {
        scale: 0.5,
        opacity: 0,
        rotate: 0,
      },
      {
        scale: 1,
        opacity: 1,
        rotate: 360,
        duration: 1.2,
        ease: 'power2.out',
      }
    )
      .fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.2,
        },
        '-=0.3'
      )
      .fromTo(
        subTextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.3'
      );
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-white flex flex-col justify-center items-center transition-opacity duration-500"
    >
      <img
        ref={logoRef}
        src={logo}
        alt="SMCE Logo"
        className="h-14 sm:h-16 lg:h-20 mb-4 object-contain"
      />
      <div
        ref={textRef}
        className="text-[12px] sm:text-[18px] lg:text-[22px] font-semibold leading-tight tracking-wide text-[#C24805]"
        style={{ fontFamily: 'MyCustomFont' }}
      >
        SRI MITTAPALLI
      </div>
      <div
        ref={subTextRef}
        className="text-[10px] sm:text-[12px] lg:text-[15px] text-gray-800 font-[Arial] font-semibold"
      >
        COLLEGE OF ENGINEERING
      </div>
    </div>
  );
}

export default LoaderSMCE;