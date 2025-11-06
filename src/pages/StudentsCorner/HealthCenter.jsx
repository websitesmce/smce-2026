import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaDownload, FaUserMd, FaAmbulance, FaBriefcaseMedical } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function HealthCenter() {
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
        style={{ backgroundImage: "url('/images/healthcenter-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1
          ref={titleRef}
          className="text-white text-4xl sm:text-5xl font-extrabold z-10 text-center px-4"
        >
          SMCE Health Center
        </h1>
      </div>

      {/* Content Section */}
      <section
        ref={contentRef}
        className="max-w-5xl mx-auto mt-16 space-y-10"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div>
            <img
              src="/images/healthcenter.jpg"
              alt="Health Center"
              className="w-full h-72 object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              SMCE provides medicare for all our students and staff. Health care facilities for students and staff are felt to be the basic need. A doctor has been appointed as College Doctor. The Health Centre functions to provide immediate medicinal and first aid to all students and staff if the situation arises.
            </p>
            <ul className="text-base space-y-2">
              <li>
                <FaUserMd className="inline-block mr-2 text-[#800000]" />
                On-campus Doctor for consultation and treatment.
              </li>
              <li>
                <FaBriefcaseMedical className="inline-block mr-2 text-[#800000]" />
                Equipped with thermometer, sterilizer, auto-clave, dressing drum, weight machine, B.P. apparatus, patient bed, etc.
              </li>
              <li>
                <FaAmbulance className="inline-block mr-2 text-[#800000]" />
                24×7 transportation to nearby Katuri Medical College (5 km).
              </li>
            </ul>

            {/* Download PDF Button */}
            <a
              href="/pdfs/HealthCenter.pdf"
              download
              className="inline-flex items-center mt-4 px-5 py-3 bg-[#800000] hover:bg-red-800 text-white rounded-md transition-all duration-300 font-medium shadow"
            >
              <FaDownload className="mr-2" />
              Download the Health Center PDF
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
