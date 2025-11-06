import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaSnowflake, FaUtensils, FaWind } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Canteen() {
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
        delay: 0.3,
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
        style={{ backgroundImage: "url('/images/canteen-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1
          ref={titleRef}
          className="text-white text-4xl sm:text-5xl font-extrabold z-10 text-center px-4"
        >
          SMCE Canteen
        </h1>
      </div>

      {/* Content Section */}
      <section
        ref={contentRef}
        className="max-w-6xl mx-auto mt-16 space-y-10"
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <img
            src="/images/canteen.jpg"
            alt="Canteen"
            className="w-full h-72 object-cover rounded-xl shadow-md"
          />

          {/* Text Content */}
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              The canteen has a modern kitchen with the latest appliances to
              provide Indian cuisine. The interior is tastefully crafted to offer
              a soothing environment and a much-needed break.
            </p>

            <ul className="space-y-3 text-base">
              <li>
                <FaSnowflake className="inline-block text-[#800000] mr-2" />
                The canteen has chillers and freezer facility.
              </li>
              <li>
                <FaWind className="inline-block text-[#800000] mr-2" />
                Adequate and well-furnished with proper ventilation.
              </li>
              <li>
                <FaUtensils className="inline-block text-[#800000] mr-2" />
                Serves hygienic and low-cost food to students and staff.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
