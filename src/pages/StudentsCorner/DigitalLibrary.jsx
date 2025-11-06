import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function DigitalLibrary() {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-gray-800 pt-[100px]">
      {/* Hero Section */}
      <div
        className="h-[50vh] bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage: "url('/images/digital-library-hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1
          ref={titleRef}
          className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold z-10 text-center px-4"
        >
          SMCE Digital Library
        </h1>
      </div>

      {/* Content Section */}
      <section
        ref={contentRef}
        className="max-w-5xl mx-auto px-6 sm:px-10 py-16 space-y-10"
      >
        <p className="text-lg leading-relaxed">
          SMCE Central Library is the soul of the Institution. It acquires,
          processes, preserves, and disseminates information to the user
          community with the motto of empowering knowledge. It has an extensive
          collection of books, scientific and technical journals, and electronic
          reference materials for satisfying the academic and research needs of
          the student and faculty.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-[#f9f9f9] p-6 rounded-xl shadow">
            <h3 className="text-2xl font-bold mb-2 text-[#800000]">Library Stats</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Total Number of Titles: <strong>5005</strong></li>
              <li>Total Number of Volumes: <strong>29,400</strong></li>
              <li>Digital Library Systems: <strong>50</strong></li>
              <li>E-Resources Access: <strong>DELNET</strong></li>
              <li>Automation Software: <strong>ECAP</strong></li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <img
              src="/images/library-books.jpg"
              alt="Library Books"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="bg-[#fff4f4] p-6 sm:p-10 rounded-xl text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#800000]">
            Empowering Knowledge, Empowering Futures
          </h2>
          <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
            We encourage students to make the most of this digital repository to
            grow, learn, and lead. Every book you read, every article you explore
            here brings you a step closer to becoming the best version of yourself.
          </p>
        </div>
      </section>
    </div>
  );
}