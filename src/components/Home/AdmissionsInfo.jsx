import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import apply from "/src/assets/home/apply.png"
import eligibility from "/src/assets/home/eligibility.png"
import counselling from "/src/assets/home/counselling.png"
import confirmation from "/src/assets/home/confirmation.png"

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: "1",
    title: "How to Apply",
    description:
      "Begin your journey by filling out the online application form. Ensure all details are accurate.",
    image: apply,
  },
  {
    step: "2",
    title: "Eligibility & Process",
    description:
      "Review eligibility criteria. Qualified candidates will be notified and invited for document verification.",
    image: eligibility,
  },
  {
    step: "3",
    title: "Counselling Info",
    description:
      "Attend the counselling session and choose Sri Mittapalli College of Engineering using our code: MPLG.",
    image: counselling,
  },
  {
    step: "4",
    title: "Confirmation",
    description:
      "Pay the admission fee and receive your seat confirmation and joining instructions.",
    image: confirmation,
  },
];

const faqs = [
  {
    question: "What is the eligibility for B.Tech admission?",
    answer:
      "You must have completed 10+2 with Physics, Chemistry, and Mathematics. Entrance scores may be required based on state norms.",
  },
  {
    question: "Is management quota available?",
    answer:
      "Yes, we offer limited management quota seats. Contact our admission office for detailed guidance.",
  },
  {
    question: "How do I participate in counselling?",
    answer:
      "Register for the state-level counselling and use the college code MPLG to select our institution.",
  },
  {
    question: "Can I apply online?",
    answer:
      "Yes, our application process is fully online. Visit the Admissions page and follow the instructions provided.",
  },
];

export default function AdmissionsInfo() {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".step-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 sm:px-12 md:px-20 py-24 bg-white">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          Admissions Information
        </h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
          A clear, guided admission process for students and parents.
        </p>
      </div>

      {/* Admission Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-28">
        {steps.map((item, index) => (
          <div
            key={index}
            className="step-card flex flex-col items-center text-center bg-white shadow-md rounded-xl p-5 transition duration-300"
          >
            <div className="w-10 h-10 mb-4 rounded-full bg-[#800000] text-white font-bold flex items-center justify-center">
              {item.step}
            </div>
            <h4 className="text-base font-semibold text-gray-800 mb-2">
              {item.title}
            </h4>
            <p className="text-sm text-gray-500 mb-4 flex-1">{item.description}</p>
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="shadow-md rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full px-5 py-4 flex justify-between items-center bg-white"
              >
                <span className="text-sm sm:text-base font-medium text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-800 ${
                    openIndex === index
                      ? "rotate-180 text-[#800000]"
                      : "text-gray-400"
                  }`}
                />
              </button>
              <div
                className={`px-5 pt-0 pb-4 text-sm text-gray-600 transition-all duration-1200 ease-in ${
                  openIndex === index ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}