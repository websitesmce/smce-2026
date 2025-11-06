import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Ananya Rao",
    role: "Alumni, Software Engineer at Infosys",
    tag: "student",
    quote:
      "SMCE gave me the foundation and confidence to thrive in the tech world. The industry connect and mentorship made all the difference.",
    image: "/assets/testimonials/ananya.jpg",
  },
  {
    name: "Rahul Dev",
    role: "Parent of CSE Graduate",
    tag: "parent",
    quote:
      "I'm grateful for the holistic development my child received. The college's commitment to quality is commendable.",
    image: "/assets/testimonials/rahul.jpg",
  },
  {
    name: "Sravani Iyer",
    role: "Staff, Training & Placement",
    tag: "staff",
    quote:
      "We ensure every student gets the best possible career guidance. The 98% placement rate reflects our dedication.",
    image: "/assets/testimonials/sravani.jpg",
  },
  {
    name: "Manoj B",
    role: "Researcher, IEEE Journal Contributor",
    tag: "journals",
    quote:
      "The research opportunities and support from SMCE helped me publish my first international paper.",
    image: "/assets/testimonials/manoj.jpg",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <section
      ref={sectionRef}
      className="bg-white py-24 px-6 sm:px-12 md:px-20 overflow-hidden"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          Testimonials & Alumni Stories
        </h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
          Words from our students, parents, and faculty that define SMCE's legacy.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="relative h-[440px] sm:h-[460px]">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`testimonial-card absolute top-0 left-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] transform rounded-3xl shadow bg-white border border-gray-100 p-8 flex flex-col justify-between text-center ${
                idx === active ? "z-20 opacity-100" : "z-10 opacity-0"
              }`}
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 mx-auto rounded-full object-cover shadow mb-4"
              />
              <p className="text-gray-700 text-sm sm:text-base italic min-h-[100px]">
                “{t.quote}”
              </p>
              <div className="mt-2">
                <p className="font-semibold text-gray-800">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
                <span className="inline-block mt-2 bg-amber-100 text-[#800000] text-[11px] uppercase px-2 py-1 rounded-full font-semibold">
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Pagination */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                active === idx ? "bg-[#800000] scale-110" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}