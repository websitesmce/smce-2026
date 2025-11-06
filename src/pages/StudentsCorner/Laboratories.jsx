import labImg1 from "../../assets/department-img/ROBOT1.jpg";
import labImg2 from "../../assets/labs/cse-lab12.png";
import labImg3 from "../../assets/labs/cse-lab5.png";
import labImg4 from "../../assets/labs/programming-lab2.jpg";
import labImg5 from "../../assets/department-img/IOT.jpeg";
import labImg6 from "../../assets/department-img/it.jpeg";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Laboratories() {
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

  const labs = [
    {
      label: "AI Lab",
      image: labImg1,
    },
    {
      label: "Data Science Lab",
      image: labImg2,
    },
    {
      label: "Software Engineering Lab",
      image: labImg3,
    },
    {
      label: "Machine Learning Lab",
      image: labImg4,
    },
    {
      label: "Networking Lab",
      image: labImg5,
    },
    {
      label: "IoT & Embedded Systems Lab",
      image: labImg6,
    },
  ];

  return (
    <div className="min-h-screen pt-[100px] bg-white text-gray-800">
      {/* Hero Section */}
      <div
        className="h-[50vh] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/images/laboratories-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1
          ref={titleRef}
          className="text-white text-4xl sm:text-5xl font-extrabold z-10 text-center px-4"
        >
          Laboratories at SMCE
        </h1>
      </div>

      {/* Heading */}
      <div ref={titleRef} className="text-center mt-12 px-6 sm:px-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#800000]">
          AI & DS Laboratories
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          We have fully equipped laboratories with high-speed internet, latest
          software, and structured networking to support hands-on learning and research.
        </p>
      </div>

      {/* Info Block */}
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto mt-10 bg-[#fff6f6] p-6 sm:p-10 rounded-xl shadow-md space-y-4 mb-12 px-6 sm:px-10"
      >
        <p className="text-lg leading-relaxed">
          We have several computer labs equipped with the latest software and
          high-end workstations. The labs are connected through structured
          networking and powered by a high-speed lease line internet. Printer
          and copier facilities are also available. Our dedicated faculty and
          staff possess exceptional credentials, matching those of top career
          instructors.
        </p>
      </div>

      {/* Labs Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 sm:px-10 pb-20">
        {labs.map((lab, idx) => (
          <div
            key={idx}
            className="relative group rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
          >
            <img
              src={lab.image}
              alt={lab.label}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-[#800000] text-white text-sm px-3 py-1 rounded-full shadow-lg">
              {lab.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
