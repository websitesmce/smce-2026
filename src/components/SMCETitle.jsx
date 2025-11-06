import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import logo from "../assets/logo/logo.png";

export default function SMCETitle() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textWrapRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        logoRef.current,
        {
          scale: 1.4,
          rotate: 360,
          opacity: 0,
        },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 1.6,
          ease: "power4.out",
        }
      )
        .to(
          containerRef.current,
          {
            x: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .fromTo(
          textWrapRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.9"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <a href="/" className="block px-4 pt-8 sm:px-8">
      <div
        ref={containerRef}
        className="w-fit flex flex-col items-center justify-center sm:flex-row sm:gap-3 transition-all"
      >
        {/* Logo */}
        <img
          ref={logoRef}
          src={logo}
          alt="SMCE Logo"
          className="h-10 sm:h-9 lg:h-10 object-contain"
        />

        {/* Title Reveal */}
        <div ref={textWrapRef} className="hidden sm:block overflow-hidden">
          <div
            ref={textRef}
            className="flex flex-col sm:flex-row sm:items-center sm:gap-3 text-black"
          >
            <div className="hidden lg:block h-full w-px bg-gray-400" />
            <div className="text-left">
              <div className="text-[13px] sm:text-[15px] lg:text-[17px] font-semibold leading-tight tracking-wide">
                SRI MITTAPALLI
              </div>
              <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600">
                College of Engineering
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}