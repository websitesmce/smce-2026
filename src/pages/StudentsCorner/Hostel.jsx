import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hostel() {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen pt-[100px] bg-white text-gray-800">
      {/* Hero Section */}
      <div
        className="h-[50vh] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/images/hostel-hero.jpg')" }} // Replace with your actual hero image
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1
          ref={titleRef}
          className="text-white text-4xl sm:text-5xl font-extrabold z-10 text-center px-4"
        >
          Hostel Facilities at SMCE
        </h1>
      </div>

      {/* Info Section */}
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto mt-12 px-6 sm:px-10 text-lg leading-relaxed pb-8"
      >
        <div className="bg-[#fff6f6] p-6 sm:p-10 rounded-xl shadow space-y-6">
          <p>
            Hostel provides accommodation for girls and mess facility for 200 students.
            Each room is well furnished with cots, fans, tables, chairs, and shelves
            with iron doors and wash basin with mirror.
          </p>
          <p>
            Hygienic drinking is available to inmates of the hostel.
          </p>
          <p>
          Kitchen with modern cooking facility and spacious dining hall is provided for inmates.
          </p>
        </div>
      </div>

      {/* Image Card Section */}
      <div
        ref={imageRef}
        className="max-w-4xl mx-auto px-6 sm:px-10 pb-20"
      >
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="/images/hostel-view.jpg" // Replace this with your actual image path
            alt="Inside View of Hostel"
            className="w-full h-72 sm:h-96 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
