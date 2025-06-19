import React from "react";
import heroVideo from "../../../assets/video/hero.mp4";

const quickLinks = [
  { label: "Admissions", href: "#admissions" },
  { label: "Departments", href: "#departments" },
  { label: "Campus Life", href: "#campus-life" },
  { label: "Contact Us", href: "#contact" },
];

function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-end items-center h-full pb-16 px-4">
        <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {quickLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-white font-semibold text-lg hover:underline hover:underline-offset-4 transition-all duration-200 hover:opacity-90"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
