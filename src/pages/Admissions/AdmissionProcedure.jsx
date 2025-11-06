import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, ClipboardCheck } from "lucide-react";
import Choosing from "../../assets/blogs-img/choosing.jpeg"

gsap.registerPlugin(ScrollTrigger);

export default function AdmissionProcedure() {

  const programSteps = [
    {
      program: "B.Tech",
      color: "text-green-600",
      eligibility: [
        "Pass 10+2 with minimum 45% aggregate in Physics and Mathematics."
      ],
      steps: [
        "AP EAMCET based online counselling – 70% seats.",
        "30% B-Category seats through 10+2 merit, as per APSCHE (ANDHRA PRADESH STATE COUNCIL OF HIGHER EDUCATION)."
      ]
    },
    {
      program: "M.Tech",
      color: "text-blue-600",
      eligibility: [
        "B.E/B.Tech in relevant field with 50% marks minimum."
      ],
      steps: [
        "GATE/PGECET ranks based online counselling – 70% seats.",
        "30% B-Category seats based on UG merit as per APSCHE (ANDHRA PRADESH STATE COUNCIL OF HIGHER EDUCATION)."
      ]
    },
    {
      program: "MBA",
      color: "text-rose-600",
      eligibility: [
        "Any Bachelor's degree with 50% marks minimum."
      ],
      steps: [
        "APICET based online counselling – 70% seats.",
        "30% B-Category seats as per APSCHE (ANDHRA PRADESH STATE COUNCIL OF HIGHER EDUCATION) norms."
      ]
    }
  ];

  return (
    <section
      className="bg-white text-gray-900 px-6 sm:px-10 md:px-16 lg:px-24 pt-[120px] pb-28"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">
          Admission Procedure
        </h1>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
          Understand eligibility and streamlined steps to join our B.Tech, M.Tech and MBA programs.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {programSteps.map((prog, index) => (
          <div
            key={index}
            className="rounded-xl bg-gray-50 border border-gray-200 p-6 shadow-lg hover:shadow-xl transition duration-300"
          >
            <h2 className={`text-2xl font-bold mb-4 ${prog.color}`}>{prog.program}</h2>

            <div className="mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-gray-500" /> Eligibility
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {prog.eligibility.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <ClipboardCheck className="w-5 h-5 text-gray-500" /> Steps to Apply
              </h3>
              <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                {prog.steps.map((s, i) => (
                  <li key={i}><span className="font-medium text-gray-900">Step {i + 1}:</span> {s}</li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="mt-24">
        <h3 className="text-2xl font-bold text-[#800000] mb-4">Additional Notes</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>APSCHE will release notifications for Convener Quota admissions.</li>
          <li>Spot admissions may fill vacant convener quota seats after counselling.</li>
          <li>College will publish separate notifications for B-Category admissions.</li>
        </ul>
      </div>

      {/* Guidance Section */}
      <div className="mt-24">
        <h3 className="text-3xl font-bold mb-6 text-[#800000] text-center">
          Explore the Right Path for You
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Choosing a Branch",
              img: Choosing,
              desc: "Discover what branch suits your interests — from coding to electronics."
            },
            {
              title: "Future Career Scope",
              img: "/images/guide-career.jpg",
              desc: "Learn about job trends, tech fields, and career outcomes."
            },
            {
              title: "Personalised Roadmaps",
              img: "/images/guide-roadmap.jpg",
              desc: "Get guidance on course selection and success planning at SMCE."
            }
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 bg-white"
            >
              <div
                className="h-88 bg-cover bg-center"
                style={{ backgroundImage: `url(${card.img})` }}
              ></div>
              <div className="p-5">
                <h4 className="text-xl font-bold mb-2 text-gray-800">
                  {card.title}
                </h4>
                <p className="text-sm text-gray-600">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}