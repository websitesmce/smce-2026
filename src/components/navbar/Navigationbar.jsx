import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import FullScreenMobileMenu from "./FullScreenMobileMenu";

const linksData = [
  {
    title: "Administration",
    description:
      "The administration is guided by the Trust and senior leaders like the Chairman, Principal, and Director, ensuring smooth governance and academic quality.",
    subLinks: [
      {
        label: "About Trust",
        href: "/about-trust",
        detail: "Overview of the trust that governs SMCE.",
      },
      {
        label: "Chairman",
        href: "#",
        detail: "Message and profile of our Chairman.",
      },
      {
        label: "Secretary",
        href: "#",
        detail: "Meet the Secretary overseeing SMCE operations.",
      },
      {
        label: "Director",
        href: "#",
        detail: "Know more about the Director's vision and mission.",
      },
      {
        label: "Vice President",
        href: "#",
        detail: "Vice President’s contribution and leadership.",
      },
      {
        label: "Principal",
        href: "#",
        detail: "Insight into academic leadership by our Principal.",
      },
    ],
    contact: {
      email: "admin@smce.edu.in",
      phone: "+91-12345-67890",
      hours: "Mon-Fri, 9AM - 5PM",
      location: "Admin Block, SMCE Campus",
    },
  },
  {
    title: "Academics",
    description:
      "SMCE offers quality academic programs with a focus on holistic student development through an outcome-based education system.",
    subLinks: [
      {
        label: "Academic Regulations",
        href: "#",
        detail: "Rules and guidelines for academic conduct.",
      },
      {
        label: "Academic Calendars",
        href: "#",
        detail: "Plan your semester with our official calendars.",
      },
    ],
    contact: {
      email: "academics@smce.edu.in",
      phone: "+91-98765-43210",
      hours: "Mon-Fri, 9AM - 5PM",
      location: "Academic Office, SMCE Campus",
    },
  },
  {
    title: "Admissions",
    description:
      "Join a vibrant student community at SMCE with admissions based on merit and reservation norms governed by regulatory bodies.",
    subLinks: [
      {
        label: "Programs Offered",
        href: "#",
        detail: "Discover various UG and PG programs.",
      },
      {
        label: "Admission Procedure",
        href: "#",
        detail: "Steps and requirements for admission.",
      },
      {
        label: "Fee Structure",
        href: "#",
        detail: "Detailed tuition and fee breakdowns.",
      },
      {
        label: "B-Category Application",
        href: "#",
        detail: "Apply under management quota.",
      },
    ],
    contact: {
      email: "admissions@smce.edu.in",
      phone: "+91-99887-77665",
      hours: "Mon-Fri, 9AM - 5PM",
      location: "Admissions Office, SMCE Campus",
    },
  },
  {
    title: "Departments",
    description:
      "Each department at SMCE is equipped with experienced faculty and labs, focusing on core engineering disciplines and research.",
    subLinks: [
      {
        label: "CSE",
        href: "#",
        detail: "Computer Science Engineering Department.",
      },
      {
        label: "CSE - AI",
        href: "#",
        detail: "Specialization in Artificial Intelligence.",
      },
      {
        label: "CSE - DS",
        href: "#",
        detail: "Focus on Data Science technologies.",
      },
      {
        label: "IT",
        href: "#",
        detail: "Department of Information Technology.",
      },
      {
        label: "ECE",
        href: "#",
        detail: "Electronics and Communication Engineering.",
      },
      { label: "SNH", href: "#", detail: "Science & Humanities Department." },
      { label: "MBA", href: "#", detail: "Master of Business Administration." },
    ],
    contact: {
      email: "hod@smce.edu.in",
      phone: "+91-88995-44220",
      hours: "Mon-Fri, 9AM - 5PM",
      location: "Respective Dept Blocks, SMCE",
    },
  },
  {
    title: "Examination Cell",
    description:
      "The Examination Cell ensures fair conduct of assessments and timely declaration of results under JNTUK guidelines.",
    subLinks: [
      {
        label: "Controller of Examinations",
        href: "#",
        detail: "Head of exam-related operations.",
      },
      {
        label: "COE",
        href: "#",
        detail: "Details about the Examination Cell.",
      },
      {
        label: "Examination Tables",
        href: "#",
        detail: "Semester-wise examination schedules.",
      },
      {
        label: "Results",
        href: "#",
        detail: "Access and verify your results.",
      },
      {
        label: "Previous Question Papers",
        href: "#",
        detail: "Reference for past examinations.",
      },
      {
        label: "Contact Information",
        href: "#",
        detail: "Reach out to the exam cell.",
      },
    ],
    contact: {
      email: "examcell@smce.edu.in",
      phone: "+91-90909-10101",
      hours: "Mon-Fri, 9AM - 5PM",
      location: "Exam Cell, SMCE Campus",
    },
  },
  {
    title: "Student Corner",
    description:
      "A space dedicated to all student services including clubs, grievance cell, scholarships, and placement support.",
    subLinks: [
      {
        label: "Digital Library",
        href: "#",
        detail: "Access ebooks, journals, and more.",
      },
      {
        label: "Student Grievance Cell",
        href: "#",
        detail: "Submit and resolve grievances.",
      },
      {
        label: "Classrooms",
        href: "#",
        detail: "Technology-enabled learning spaces.",
      },
      {
        label: "Laboratories",
        href: "#",
        detail: "State-of-the-art practical labs.",
      },
      {
        label: "Hostel",
        href: "#",
        detail: "Safe and comfortable accommodation.",
      },
      {
        label: "Transport",
        href: "#",
        detail: "Commute facilities for students.",
      },
      { label: "NSS", href: "#", detail: "National Service Scheme at SMCE." },
      {
        label: "Health Center",
        href: "#",
        detail: "Medical support for students.",
      },
      {
        label: "Auditorium",
        href: "#",
        detail: "For seminars and student events.",
      },
      {
        label: "Canteen",
        href: "#",
        detail: "Nutritious food at affordable prices.",
      },
    ],
    contact: {
      email: "student@smce.edu.in",
      phone: "+91-77777-88888",
      hours: "Mon-Fri, 9AM - 5PM",
      location: "Student Affairs Office, SMCE",
    },
  },
  {
    title: "Statutory Body",
    description:
      "Compliance with AICTE, UGC, NAAC, and NBA norms through regular updates and transparent functioning.",
    subLinks: [
      {
        label: "Governing Body",
        href: "#",
        detail: "Oversight committee for policy and vision.",
      },
      {
        label: "Academic Council",
        href: "#",
        detail: "Regulates academic activities and changes.",
      },
      {
        label: "Board of Studies",
        href: "#",
        detail: "Department-level academic boards.",
      },
      {
        label: "BOS",
        href: "#",
        detail: "Curriculum and course framework development.",
      },
      {
        label: "Finance Committee",
        href: "#",
        detail: "Handles budgetary and fund allocation.",
      },
      { label: "AICTE", href: "#", detail: "Approval and standards by AICTE." },
      {
        label: "JNTUK",
        href: "#",
        detail: "Affiliating university and norms.",
      },
      {
        label: "NBA",
        href: "#",
        detail: "Program accreditation and assessment.",
      },
      {
        label: "NAAC",
        href: "#",
        detail: "Institutional quality assurance body.",
      },
      {
        label: "ISO",
        href: "#",
        detail: "International quality management certification.",
      },
      { label: "IQAC", href: "#", detail: "Internal Quality Assurance Cell." },
      {
        label: "IIC",
        href: "#",
        detail: "Institution Innovation Council at SMCE.",
      },
      {
        label: "Anti-Ragging Committee",
        href: "#",
        detail: "Preventing ragging through vigilance.",
      },
      {
        label: "College Committees",
        href: "#",
        detail: "Various functional committees of SMCE.",
      },
    ],
    contact: {
      email: "statutory@smce.edu.in",
      phone: "+91-66666-55555",
      hours: "Mon-Fri, 9AM - 5PM",
      location: "Statutory Office, SMCE",
    },
  },
  {
    title: "NAAC",
    description:
      "Accreditation and assessment reports and activities are documented under NAAC to ensure institutional quality.",
    subLinks: [
      {
        label: "AQAR 2023-24",
        href: "#",
        detail: "Annual Quality Assurance Report for 2023-24.",
      },
      {
        label: "AQAR 2022-23",
        href: "#",
        detail: "Annual Quality Assurance Report for 2022-23.",
      },
      {
        label: "ICT",
        href: "#",
        detail: "Use of ICT tools in teaching and learning.",
      },
      {
        label: "IQAC",
        href: "#",
        detail: "IQAC's role in internal quality checks.",
      },
      {
        label: "Extended Profile",
        href: "#",
        detail: "Quantitative data submitted to NAAC.",
      },
    ],
    contact: {
      email: "naac@smce.edu.in",
      phone: "+91-33333-22222",
      hours: "Mon-Fri, 9AM - 5PM",
      location: "IQAC Room, SMCE",
    },
  },
];

function Navigationbar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSubLink, setHoveredSubLink] = useState(null);
  const dropdownRef = useRef(null);
  const dropdownTween = useRef(null);
  const contentRef = useRef(null);
  const timeoutRef = useRef(null);
  const isDropdownVisible = useRef(false);

  const activeLink = linksData[hoveredIndex];
  const activeSubDetail =
    hoveredSubLink !== null
      ? activeLink?.subLinks[hoveredSubLink]?.detail
      : null;

  const openDropdown = (index) => {
    clearTimeout(timeoutRef.current);
    setHoveredIndex(index);
    setHoveredSubLink(null);

    // Animate dropdown in
    if (!isDropdownVisible.current && dropdownRef.current) {
      isDropdownVisible.current = true;
      gsap.set(dropdownRef.current, { y: -20, opacity: 0 });

      dropdownTween.current = gsap.to(dropdownRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
      });
    } else {
      // Animate content fade when changing section
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  };

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      if (dropdownRef.current) {
        dropdownTween.current = gsap.to(dropdownRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.45,
          ease: "power2.inOut",
          onComplete: () => {
            setHoveredIndex(null);
            setHoveredSubLink(null);
            isDropdownVisible.current = false;
          },
        });
      }
    }, 300); // 1 second buffer
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="w-full bg-white text-gray-800 border-gray-200 relative z-10 mt-0 pt-3">
      {/* Top Navigation */}

      <FullScreenMobileMenu linksData={linksData} />

      {/* Desktop Links (hidden on small screens) */}
      <div className="hidden lg:flex justify-center gap-6 py-4 font-semibold text-[14px] lg:text-[16px] relative z-50">
        {linksData.map((link, index) => (
          <div
            key={index}
            className="relative group cursor-pointer px-2 hover:text-[#800000]"
            onMouseEnter={() => openDropdown(index)}
            onMouseLeave={closeDropdown}
          >
            {link.title}
          </div>
        ))}
      </div>

      {/* Dropdown */}
      {hoveredIndex !== null && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 w-full bg-white/80 backdrop-blur-md shadow-xl border-t border-gray-200 py-6 px-8 z-1
          "
          onMouseEnter={() => clearTimeout(timeoutRef.current)}
          onMouseLeave={closeDropdown}
        >
          <div
            ref={contentRef}
            className="transition-opacity duration-300 ease-in-out max-w-6xl mx-auto"
          >
            <div className="text-lg font-semibold text-[#800000] mb-4 leading-snug">
              {activeLink.description}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
              {/* Quick Links */}
              <div>
                <h4 className="text-md font-bold text-gray-900 mb-1 border-b border-[#800000] pb-1">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {activeLink.subLinks.map((sublink, i) => (
                    <li key={i}>
                      <a
                        href={sublink.href}
                        className="block px-3 py-1 rounded-md hover:bg-[#800000]/10 hover:text-[#800000] transition-all duration-150 font-medium"
                        onMouseEnter={() => setHoveredSubLink(i)}
                        onMouseLeave={() => setHoveredSubLink(null)}
                      >
                        {sublink.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Details */}
              <div>
                <h4 className="text-md font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                  Details
                </h4>
                <div className="text-gray-700 min-h-[60px] leading-relaxed">
                  {activeSubDetail ||
                    "Hover over a sublink to see more details."}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-md font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                  Contact
                </h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>
                    <strong>Email:</strong> {activeLink.contact.email}
                  </li>
                  <li>
                    <strong>Phone:</strong> {activeLink.contact.phone}
                  </li>
                  <li>
                    <strong>Hours:</strong> {activeLink.contact.hours}
                  </li>
                  <li>
                    <strong>Location:</strong> {activeLink.contact.location}
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-10 pt-4 border-t border-gray-200">
              © {new Date().getFullYear()} Sri Mittapalli College of
              Engineering. All rights reserved.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigationbar;
