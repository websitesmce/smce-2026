import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Transport() {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

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
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen pt-[100px] pb-20 bg-white text-gray-800">
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
         College Transport Facility
        </h1>
      </div>

      {/* Content Section */}
      <section
        ref={contentRef}
        className="max-w-5xl mx-auto mt-16 space-y-10"
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="w-full">
            <img
              src="/images/college-bus.jpg"
              alt="College Bus"
              className="rounded-xl shadow-md w-full object-cover h-72 sm:h-80"
            />
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-2xl font-bold text-[#800000] mb-4">
              Transportation
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              The institute ensures that the college buses are comfortable, safe, and affordable to all students. The bus routes with pickup and drop points are designed by the management and core committee based on student requirements and student ratio.
            </p>
          </div>
        </div>

        {/* Routes Info */}
        <div className="bg-[#fff5f5] p-6 sm:p-10 rounded-xl shadow-md">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#800000] mb-4">
            College buses are available from the following areas:
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Guntur, Tenali, Chilakaluripet, Narasaraopet, Martur, Parchoor, and their connecting areas.
          </p>
        </div>
      </section>
    </div>
  );
}
