// Import your background image here - update the path as needed
import coursesBg from "../../assets/img/courses.png";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import departmentData from "../../../departmentData.json";

gsap.registerPlugin(ScrollTrigger);

const CourseCard = ({ title, desc, tenure, href }) => (
  <Link
    to={href}
    className="fade-in group relative flex flex-col justify-between rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
  >
    <div className="p-4 sm:p-5 pb-12 sm:pb-14">
      <h3 className="text-base sm:text-lg font-semibold sm:font-bold text-gray-900 group-hover:text-[#800000] transition-colors">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-snug">{desc}</p>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-14 sm:h-16 bg-gradient-to-t from-[#f9f9f9] to-transparent px-4 sm:px-5 py-2 sm:py-3 flex items-center justify-between">
      <span className="text-xs sm:text-sm text-gray-500 font-medium">{tenure}</span>
      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 group-hover:text-[#800000] transition-colors" />
    </div>
  </Link>
);

function CoursesOverview() {
  const sectionRef = useRef(null);
  const [btechCourses, setBtechCourses] = useState([]);
  const [pgCourses, setPgCourses] = useState([]);

  useEffect(() => {
    const btech = [];
    const pg = [];

    Object.entries(departmentData.departments).forEach(([key, dept]) => {
      const deptTitle = dept?.title || "";
      if (["CSE", "CSE-AI", "CSE-DS", "IT", "ECE"].includes(key)) {
        btech.push({
          title: `B.Tech - ${key}`,
          desc: deptTitle,
          tenure: "4 Years",
          href: `/${key.toLowerCase().replace("s&h", "sh").replace("cse-", "cse-")}-department`,
        });
      } else {
        if (key !== "S&H") {
          pg.push({
            title: key === "MBA" ? "MBA" : `M.Tech - ${key}`,
            desc: deptTitle,
            tenure: "2 Years | Intake: 18",
            href: `/${key.toLowerCase()}-department`,
          });
        }
      }
    });

    pg.push({
      title: "M.Tech - CSE",
      desc: "Computer Science and Engineering",
      tenure: "2 Years | Intake: 18",
      href: "/",
    });
    pg.push({
      title: "M.Tech - VLSI & ES",
      desc: "VLSI Design & Embedded Systems",
      tenure: "2 Years | Intake: 18",
      href: "/",
    });

    setBtechCourses(btech);
    setPgCourses(pg);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".fade-in").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
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
    <section
      ref={sectionRef}
      className="relative bg-fixed bg-contain bg-center px-4 sm:px-8 md:px-16 lg:px-24 py-20"
      style={{
        backgroundImage: `url(${coursesBg})`,
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      <div className="fade-in mb-14 text-left">
        <div className="flex justify-left items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-amber-400"></div>
          <p className="font-semibold text-sm sm:text-base text-[#800000]">Explore Programs</p>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Courses That Shape Your Future
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl text-sm sm:text-base leading-relaxed">
          SMCE offers a blend of top-tier undergraduate and postgraduate programs with a
          strong focus on innovation, employability, and global industry relevance.
        </p>
      </div>

      {/* B.Tech Courses */}
      <div className="mb-16">
        <h3 className="text-xl sm:text-2xl font-bold text-[#800000] mb-6">Undergraduate Programs (B.Tech)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {btechCourses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              desc={course.desc}
              tenure={course.tenure}
              href={course.href}
            />
          ))}
        </div>
      </div>

      {/* PG Courses */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#800000] mb-6">Postgraduate Programs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pgCourses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              desc={course.desc}
              tenure={course.tenure}
              href={course.href}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
}

export default CoursesOverview;