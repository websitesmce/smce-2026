import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWifi, FaChair, FaChalkboard, FaBookReader } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Classroom() {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f9f9f9] pt-[100px] text-gray-800">
      {/* Hero Section */}
      <div
        className="h-[50vh] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/images/classroom-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1
          ref={titleRef}
          className="text-white text-4xl sm:text-5xl font-extrabold z-10 text-center px-4"
        >
          Modern Classrooms at SMCE
        </h1>
      </div>

      {/* Content Section */}
      <section
        ref={contentRef}
        className="max-w-6xl mx-auto px-6 sm:px-10 py-16 space-y-12"
      >
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <div className="text-4xl text-[#800000] mb-4">
              <FaBookReader />
            </div>
            <h3 className="text-xl font-semibold mb-2">ICT Enabled Classrooms</h3>
            <p>
              ICT enabled classrooms with advanced teaching tools to enhance the
              learning experience and collaboration.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <div className="text-4xl text-[#800000] mb-4">
              <FaWifi />
            </div>
            <h3 className="text-xl font-semibold mb-2">Wi-Fi Facility</h3>
            <p>
              All classrooms are connected with high-speed Wi-Fi enabling students
              and faculty to access digital learning resources instantly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <div className="text-4xl text-[#800000] mb-4">
              <FaChair />
            </div>
            <h3 className="text-xl font-semibold mb-2">Well Furnished Seating</h3>
            <p>
              Classrooms are well-furnished with ergonomic seating arrangements to
              accommodate up to 70 students comfortably.
            </p>
          </div>
        </div>

        {/* Motivational Block */}
        <div className="bg-[#fff4f4] text-center p-10 rounded-xl shadow">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#800000]">
            Learn, Connect, Grow
          </h2>
          <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
            SMCE classrooms are more than just spaces—they are the launchpads for
            innovation, curiosity, and academic success. Every session here is
            designed to shape the future leaders of tomorrow.
          </p>
        </div>
      </section>
    </div>
  );
}
