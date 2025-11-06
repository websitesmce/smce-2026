import React from "react";
import heroVideo from "../../../assets/video/hero.mp4";

function Hero1() {
  const handleScroll = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="relative h-[75vh] w-full overflow-hidden mt-20">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Scroll Down Button Below Video */}
      <div className="flex justify-center py-12">
        <button
          onClick={handleScroll}
          className="animate-bounce text-black text-sm font-medium z-20"
        >
          Scroll Down ↓
        </button>
      </div>
    </>
  );
}

export default Hero1;
