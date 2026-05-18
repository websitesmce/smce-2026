import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logo from '../../assets/logo/logo.png';

export default function LoaderSMCE() {
  const loaderRef   = useRef(null);
  const logoRef     = useRef(null);
  const titleRef    = useRef(null);
  const badgeRef    = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut',
          onComplete: () => {
            if (loaderRef.current) loaderRef.current.style.display = 'none';
          },
        });
      },
    });

    tl.fromTo(logoRef.current,
      { scale: 0.45, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.7)' }
    )
    .fromTo(titleRef.current,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
      '-=0.35'
    )
    .fromTo(badgeRef.current,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo(progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.8, ease: 'power1.inOut', transformOrigin: 'left center' },
      '+=0.15'
    );
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #800000 0%, #4a0000 100%)' }}
    >
      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Soft center glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center select-none px-6">

        {/* Logo badge */}
        <div
          ref={logoRef}
          className="w-[92px] h-[92px] rounded-full bg-white shadow-2xl flex items-center justify-center ring-4 ring-white/20 mb-8"
        >
          <img src={logo} alt="SMCE Logo" className="h-[72px] w-[72px] object-contain" />
        </div>

        {/* College name */}
        <div ref={titleRef}>
          <h1
            className="text-[1.8rem] sm:text-[2.25rem] font-bold text-white tracking-[0.2em] leading-tight"
            style={{ fontFamily: 'MyCustomFont, Arial, sans-serif' }}
          >
            SRI MITTAPALLI
          </h1>
          <p className="text-white/80 text-sm sm:text-base font-semibold tracking-[0.26em] mt-1.5 uppercase">
            College of Engineering
          </p>
        </div>

        {/* Autonomous badge */}
        <div ref={badgeRef} className="mt-4">
          <span className="inline-flex items-center gap-2 border border-white/20 rounded-full px-5 py-1.5 text-white/55 text-[11px] tracking-[0.22em] font-semibold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Autonomous
          </span>
        </div>
      </div>

      {/* Amber progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
        <div
          ref={progressRef}
          className="h-full bg-amber-400"
          style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
        />
      </div>
    </div>
  );
}
