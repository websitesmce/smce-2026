import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";



export default function StudentGrievance() {
    const [status, setStatus] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formsubmit.co/ajax/benjuda19@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await res.json();
      if (result.success === "true") {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const committeeMembers = [
    { name: "Dr.S.Gopi Krishna", department: "Principal", designation: "Chair person" },
    { name: "Ch.Srinivasa Rao", department: "AO", designation: "Convener" },
    { name: "Dr.V.Madhuri", department: "HOD, ASH", designation: "Coordinator" },
    { name: "M.Sujan Kumar", department: "Asst.Prof, ASH", designation: "Member" },
    { name: "J.Ramesh", department: "Asst.Prof, IT", designation: "Member" },
    { name: "M.Venkata Ramana", department: "Asst.Prof, CSE", designation: "Member" },
    { name: "M.Parameswara Rao", department: "Asst.Prof, ECE", designation: "Member" },
    { name: "Y.Yesu Babu", department: "Asst.Prof, AI", designation: "Member" },
    { name: "Y.Mohana Rao", department: "Asst.Prof, MBA", designation: "Member" },
    { name: "L.Narasiah (21U91A0582)", department: "IV CSE", designation: "Student Member" },
    { name: "R.Bindu Latha (21U91A05C5)", department: "IV CSE", designation: "Student Member" },
    { name: "Chilukuri Keerthi", department: "IV CSE", designation: "Student Member" },
    { name: "A.Yasaswini (22U91A0503)", department: "III CSE", designation: "Student Member" },
    { name: "M.H.Sai Kiran (22U91A0579)", department: "III CSE", designation: "Student Member" },
    { name: "O.SudhakarReddy (23U91A05A2)", department: "II CSE", designation: "Student Member" },
    { name: "T.Kavyanjali (21U91A0479)", department: "IV ECE", designation: "Student Member" },
    { name: "A.Sri Ram (22U91A0401)", department: "III ECE", designation: "Student Member" },
    { name: "P.Abhilash (23U91A0423)", department: "II ECE", designation: "Student Member" },
    { name: "SK.Rohith (21U91A4355)", department: "IV AI", designation: "Student Member" },
    { name: "M.S.L.Sowjanya (22U91A4325)", department: "III AI", designation: "Student Member" },
    { name: "V.Srinivas (23U91A43A5)", department: "II AI", designation: "Student Member" },
    { name: "B.Nagalokesh (21U91A1205)", department: "IV IT", designation: "Student Member" },
    { name: "K.Nagalakshmi (22U91A1224)", department: "III IT", designation: "Student Member" },
    { name: "K,Hemanth (23U91A1214)", department: "II IT", designation: "Student Member" },
    { name: "H.Thiruma Reddy (22U91A4413)", department: "III DS", designation: "Student Member" },
    { name: "P.Harshini (23U91A4449)", department: "II DS", designation: "Student Member" },
  ];
  
  const grievanceContacts = [
    { name: "Dr. Sk. J. Shareef", mobile: "9912580344" },
    { name: "Ch. Srinivasa Rao", mobile: "9000447117" },
    { name: "P.L.N. Manoj Kumar", mobile: "9398488824" },
    { name: "Y. Ashok", mobile: "8074531061" },
    { name: "J. Ramesh", mobile: "6303125949" },
    { name: "G. Raja Kumar", mobile: "8309102321" },
    { name: "M. Parameswara Rao", mobile: "7013226023" },
  ];
  
  return (
    <div className="min-h-screen w-full bg-white text-gray-800 pt-[100px]">
      {/* Hero Section */}
      <div
        className="h-[50vh] bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage: "url('/images/student-grievance-hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1
          ref={titleRef}
          className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold z-10 text-center px-4"
        >
          Student Grievance Cell
        </h1>
      </div>

      {/* Content Section */}
      <section
        ref={contentRef}
        className="max-w-5xl mx-auto px-6 sm:px-10 py-16 space-y-8"
      >
        <p className="text-lg leading-relaxed">
          In order to provide opportunities for redressal of certain grievances of students
          have already enrolled in any institution, as well as for those seeking admission
          to such institutions, AICTE has notified All India Council for Technical Education
          (Redressal of Grievance of Students) Regulation, 2019 vide
          F.No.1-101/PGRC/AICTE/Regulation/2019 dated 07.11.2019 for establishment of
          Grievance Redressal Mechanism for all AICTE approved Technical Institutions.
          (Ref – AICTE Approval Process Handbook 2020-21) Sri Mittapalli College of
          Engineering, follows these regulation and guidelines to establish the Student
          Grievance Redressal Committee.
        </p>

        <p className="text-lg leading-relaxed">
          <strong>Who Can Complain -</strong> A student in person or a group of students,
          if feel unfair practices in any of the institution’s operations that can cause
          threat to his/her/their opportunities in education, carrier enhancement,
          cultural enhancement, and Personality Development can submit the complaint. If a
          student feels humiliated, assaulted by teacher/coordinator/administrator/other
          students he can go for the grievances. A student, while he is enrolled in the
          Institute for any of its courses can go for Grievance – Redressal by dropping
          the written complaint online.
        </p>

        <p className="text-lg leading-relaxed">
          The student grievances related to ragging cases and internal complaint committee
          could be submitted to the committee by filling the form of online complaint box.
          Student aggrieved shall mention about the same in his/her complaint message.
        </p>

        <div className="bg-[#fff4f4] p-6 sm:p-10 rounded-xl">
          <p className="text-lg font-semibold text-center">
            The URL of the online Grievance Redressal Portal -{" "}
            <a
              href="https://smce.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#800000] underline"
            >
              https://smce.ac.in
            </a>
          </p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-6 space-y-6">
  <div>
    <h2 className="text-2xl sm:text-3xl font-semibold text-[#800000] mb-4">
      Objectives of the Student Grievance Redressal Committee
    </h2>
    <ul className="list-disc list-inside space-y-3 text-lg text-gray-800 leading-relaxed">
      <li>
        The main objectives of the Student Grievance Redressal Committee is to
        prevent unfair practices if caused with one or more students.
      </li>
      <li>
        To provide a mechanism to students for Redressal of their Grievances.
      </li>
      <li>
        To govern the discipline to avoid incidences that may cause threats to
        dignity of students and hence to the institute.
      </li>
    </ul>
  </div>
</section>
<section className="max-w-5xl mx-auto px-6 sm:px-10 py-12 space-y-8">
  <div className="grid md:grid-cols-2 gap-8 items-center">
    {/* Text Content */}
    <div className="bg-[#fff8f8] p-6 sm:p-8 rounded-xl shadow-md">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-4">
        Mechanism to Resolve and Disposal of Grievance
      </h2>
      <p className="text-gray-800 leading-relaxed text-[17px] mb-4">
        The SGRC will submit its report with recommendations, if any, to the
        institute and a copy thereof to the aggrieved student, within a period
        of <strong>15 days</strong> from the date of receipt of the complaint.
      </p>
      <p className="text-gray-800 leading-relaxed text-[17px]">
        If the complaint is found <strong>baseless, fake, irrelevant, or anonymous</strong> and the committee finds wrongful intention, it will be
        disposed off with appropriate recommendations.
      </p>
    </div>

    {/* Optional Image */}
    <div className="w-full h-full">
      <img
        src="/images/grievance-resolution.jpg"
        alt="Grievance resolution illustration"
        className="rounded-xl w-full h-auto object-cover shadow-md"
      />
    </div>
  </div>
</section>
<section className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
  <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
    Student Grievance Redressal Committee
  </h2>
  <p className="text-gray-700 mb-8">
    As per the guidelines of AICTE, composition of the institute’s Student Grievance Redressal Committee is as follows:
  </p>

  <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
    <table className="min-w-full bg-white text-sm sm:text-base text-left">
      <thead className="bg-[#800000] text-white">
        <tr>
          <th className="py-3 px-4">S.No</th>
          <th className="py-3 px-4">Name</th>
          <th className="py-3 px-4">Department</th>
          <th className="py-3 px-4">Designation</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {committeeMembers.map((member, index) => (
          <tr
            key={index}
            className="hover:bg-[#fff4f4] transition duration-200"
          >
            <td className="py-3 px-4">{index + 1}</td>
            <td className="py-3 px-4">{member.name}</td>
            <td className="py-3 px-4">{member.department}</td>
            <td className="py-3 px-4">{member.designation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
<section className="max-w-4xl mx-auto px-6 sm:px-10 py-16">
  <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6">
    Grievance Contact Information
  </h2>

  <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
    <table className="min-w-full bg-white text-sm sm:text-base text-left">
      <thead className="bg-[#800000] text-white">
        <tr>
          <th className="py-3 px-4">S.No</th>
          <th className="py-3 px-4">Name of the Committee Member</th>
          <th className="py-3 px-4">Mobile</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {grievanceContacts.map((person, index) => (
          <tr
            key={index}
            className="hover:bg-[#fff4f4] transition duration-200"
          >
            <td className="py-3 px-4">{index + 1}</td>
            <td className="py-3 px-4">{person.name}</td>
            <td className="py-3 px-4 text-blue-600">{person.mobile}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
<section className="max-w-3xl mx-auto px-6 sm:px-10 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6 text-center">
        Online Grievance Submission
      </h2>

      {status === "success" ? (
        <div className="p-6 bg-white rounded-xl shadow-lg text-center space-y-4">
          <h2 className="text-2xl font-bold text-green-600">✅ Submitted Successfully</h2>
          <p className="text-gray-600">
            Your grievance has been submitted. We will respond shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-xl space-y-6">
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_autoresponse"
            value="Thank you for submitting your grievance. We will review and respond shortly."
          />

          <div>
            <label className="block font-medium mb-1">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]/50"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Program <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="program"
              required
              placeholder="Enter Program"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]/50"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]/50"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Mobile <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              required
              placeholder="Enter Mobile Number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]/50"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              name="message"
              placeholder="Write your grievance here..."
              rows="5"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#800000]/50"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#800000] hover:bg-red-800 text-white py-3 px-4 rounded-md font-medium transition-all duration-300"
          >
            Submit
          </button>

          {status === "error" && (
            <p className="text-red-600 text-sm mt-3">
              Something went wrong. Please try again later.
            </p>
          )}
        </form>
      )}
    </section>
    </div>
  );
}