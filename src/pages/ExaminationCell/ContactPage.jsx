import React, { useState } from "react";
import smceLogo from "./smce-logo.png";

export default function ContactPage() {
  const [status, setStatus] = useState("");

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
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
      <section className="min-h-screen pt-[120px] px-6 sm:px-10 md:px-16 lg:px-24 pb-24 bg-gradient-to-b from-white to-[#f9f9f9] text-gray-800">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">Contact Us</h1>
          <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
            Reach out to Sri Mittapalli College of Engineering for any exam-related,
            academic, or administrative queries. We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start h-full">
          {/* Contact Info + Map */}
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-6 h-full flex flex-col">
            {/* Administrative Officer */}
            {/* <div>
              <h3 className="text-xl font-semibold text-[#800000]">Ch. Srinivasa Rao</h3>
              <p className="text-gray-700 text-sm">Examination Cell</p>
              <p className="text-sm">📞 9000447117</p>
              <p className="text-sm">
                ✉️ <a href="mailto:smce.principal@gmail.com" className="text-blue-600">smce.principal@gmail.com</a>
              </p>
            </div> */}
            {/* Office Superintendent */}
            {/* <div>
              <h3 className="text-xl font-semibold text-[#800000]">V. Srinivasa Rao</h3>
              <p className="text-gray-700 text-sm">Office Superintendent</p>
              <p className="text-sm">📞 9247745046</p>
              <p className="text-sm">
                ✉️ <a href="mailto:smce.principal@gmail.com" className="text-blue-600">smce.principal@gmail.com</a>
              </p>
            </div> */}
           {/* <div>
              <h3 className="text-xl font-semibold text-[#800000]">Dr. M. Nageswara Rao</h3>
              <p className="text-gray-700 text-sm">Controller of Examinations</p>
              <p className="text-sm">📞 +91 91212 14729</p>
              <p className="text-sm">
                ✉️ <a href="mailto:cemittapalli@gmail.com" className="text-blue-600">cemittapalli@gmail.com</a>
              </p>
            </div> */}
            {/* <div>
              <h3 className="text-xl font-semibold text-[#800000]">Mr. P. Pradeep</h3>
              <p className="text-gray-700 text-sm">Asst. Controller of Examination</p>
              <p className="text-sm">📞 +91 91212 14729</p>
              <p className="text-sm">
                ✉️ <a href="mailto:smce.examsincharge@gmail.com" className="text-blue-600">smce.examsincharge@gmail.com</a>
              </p>
            </div> */}
            <div>
              <h3 className="text-xl font-semibold text-[#800000]">Address</h3>
              <p className="text-sm">
                NH‑16, Tummalapalem (Village),<br />
                Guntur (Dist), Andhra Pradesh – 522 233.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-[#800000]">Map</h4>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d473183.54054988036!2d80.272146!3d16.197512!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a7a0bb7359303%3A0x7f3b7688913f48c3!2sSri%20Mittapalli%20College%20of%20Engineering(Autonomous%20)-%20Guntur!5e1!3m2!1sen!2sus!4v1750590028271!5m2!1sen!2sus"
                width="100%"
                className="rounded-xl border-0 w-full h-64 sm:h-72 md:h-80 lg:flex-1"
                style={{ minHeight: "200px" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="h-full flex flex-col">
            {status === "success" ? (
              <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-6 rounded-xl shadow text-center space-y-2 flex-1 flex flex-col justify-center">
                <h2 className="text-2xl font-semibold">Thank you!</h2>
                <p>Your message has been sent successfully. We’ll respond soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6 flex-1 flex flex-col justify-center">
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_autoresponse" value="Thank you for contacting SMCE. We'll respond shortly." />

                <div>
                  <label className="block font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#800000] transition"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#800000] transition"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#800000] transition"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Query Type *</label>
                  <select
                    name="query"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#800000] transition"
                  >
                    <option value="">Select a type</option>
                    <option>General Information</option>
                    <option>Exam Related</option>
                    <option>Admissions</option>
                    <option>Faculty Communication</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Message (Optional)</label>
                  <textarea
                    name="message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#800000] transition"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#800000] hover:bg-red-800 text-white py-3 px-4 rounded-md font-medium transition duration-300"
                >
                  Submit
                </button>
                {status === "error" && (
                  <p className="text-red-600 text-sm mt-3">Something went wrong. Please try again later.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Quick Contacts Section */}
      <section className="px-6 sm:px-10 md:px-16 lg:px-24 pb-20 pt-10 bg-gradient-to-br from-[#fce9e9] via-[#fff5f5] to-[#fce9e9] text-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#800000] text-center mb-8">Quick Contacts</h2>

          {/* Anchor Navigation Bar */}
          <nav className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10">
            <a href="#principal" className="text-sm sm:text-base px-3 py-1 rounded-full bg-[#f3eaea] hover:bg-[#800000] hover:text-white transition">Principal</a>
            <a href="#hod-cse" className="text-sm sm:text-base px-3 py-1 rounded-full bg-[#f3eaea] hover:bg-[#800000] hover:text-white transition">HoD CSE</a>
            <a href="#hod-ece" className="text-sm sm:text-base px-3 py-1 rounded-full bg-[#f3eaea] hover:bg-[#800000] hover:text-white transition">HoD ECE</a>
            <a href="#hod-it-ai-ds" className="text-sm sm:text-base px-3 py-1 rounded-full bg-[#f3eaea] hover:bg-[#800000] hover:text-white transition">HoD IT/AI/DS</a>
            <a href="#hod-sha" className="text-sm sm:text-base px-3 py-1 rounded-full bg-[#f3eaea] hover:bg-[#800000] hover:text-white transition">HoD S&amp;H Part A</a>
            <a href="#hod-shb" className="text-sm sm:text-base px-3 py-1 rounded-full bg-[#f3eaea] hover:bg-[#800000] hover:text-white transition">HoD S&amp;H Part B</a>
            <a href="#hod-mba" className="text-sm sm:text-base px-3 py-1 rounded-full bg-[#f3eaea] hover:bg-[#800000] hover:text-white transition">HoD MBA</a>
            <a href="#iqac" className="text-sm sm:text-base px-3 py-1 rounded-full bg-[#f3eaea] hover:bg-[#800000] hover:text-white transition">IQAC</a>
            <a href="#coe" className="text-sm sm:text-base px-3 py-1 rounded-full bg-[#f3eaea] hover:bg-[#800000] hover:text-white transition">Controller of Examinations</a>
            <a href="#tpcell" className="text-sm sm:text-base px-3 py-1 rounded-full bg-[#f3eaea] hover:bg-[#800000] hover:text-white transition">Training &amp; Placement Cell</a>
            <a href="#admin-officer" className="text-sm sm:text-base px-3 py-1 rounded-full bg-[#f3eaea] hover:bg-[#800000] hover:text-white transition">Administrative Officer</a>
            <a href="#rnd" className="text-sm sm:text-base px-3 py-1 rounded-full bg-[#f3eaea] hover:bg-[#800000] hover:text-white transition">R &amp; D Cell</a>
            <a href="#nss" className="text-sm sm:text-base px-3 py-1 rounded-full bg-[#f3eaea] hover:bg-[#800000] hover:text-white transition">NSS Co-Ordinator</a>
            <a href="#transport" className="text-sm sm:text-base px-3 py-1 rounded-full bg-[#f3eaea] hover:bg-[#800000] hover:text-white transition">Transport Co-Ordinators</a>
          </nav>

          {/* Principal Section */}
          <section className="mt-0" id="principal">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6 text-center">Principal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Prof. Dr. S. Gopi Krishna</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">Principal</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:9032727017" className="text-blue-600">9032727017</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.principal@gmail.com" className="text-blue-600">smce.principal@gmail.com</a></div>
              </div>
            </div>
          </section>

          {/* Administration Section */}
          <section className="mt-12" id="admin-officer">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6 text-center">Administration</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Ch. Srinivasa Rao</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">Administrative Officer</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:9000447117" className="text-blue-600">9000447117</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.principal@gmail.com" className="text-blue-600">smce.principal@gmail.com</a></div>
              </div>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">V. Srinivasa Rao</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">Office Superintendent</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:9247745046" className="text-blue-600">9247745046</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.principal@gmail.com" className="text-blue-600">smce.principal@gmail.com</a></div>
              </div>
            </div>
          </section>

          {/* IQAC Section */}
          <section className="mt-12" id="iqac">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6 text-center">IQAC</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Dr. Sk. J. Shareef</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">IQAC Coordinator</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:8885527777" className="text-blue-600">88855 27777</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.iqac@gmail.com" className="text-blue-600">smce.iqac@gmail.com</a></div>
              </div>
            </div>
          </section>

          {/* Departments Section */}
          <section className="mt-12" id="departments">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6 text-center">Departments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
              {/* HoD, CSE & IT */}
              <div id="hod-cse" className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Dr. M. V. Pavan Kumar</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">HoD, CSE &amp; IT</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:9966077732" className="text-blue-600">99660 77732</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.hodcse@gmail.com" className="text-blue-600">smce.hodcse@gmail.com</a></div>
              </div>
              {/* HoD, AI & DS */}
              <div id="hod-it-ai-ds" className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Dr. J. Siva Sankar Babu</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">HoD, AI &amp; DS</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:9398487218" className="text-blue-600">93984 87218</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.hoditai@gmail.com" className="text-blue-600">smce.hoditai@gmail.com</a></div>
              </div>
              {/* HoD, ECE */}
              <div id="hod-ece" className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Prof. P. M. Subhani</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">HoD, ECE</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:9885004373" className="text-blue-600">98850 04373</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.hodece@gmail.com" className="text-blue-600">smce.hodece@gmail.com</a></div>
              </div>
              {/* HoD, S&H (Part A) */}
              <div id="hod-sha" className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Dr. M. Venkata Ramana</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">HoD, S&amp;H (Part A)</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:9948866873" className="text-blue-600">99488 66873</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.ash@gmail.com" className="text-blue-600">smce.ash@gmail.com</a></div>
              </div>
              {/* HoD, S&H (Part B) */}
              <div id="hod-shb" className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Dr. V. Madhuri</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">HoD, S&amp;H (Part B)</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:9849569101" className="text-blue-600">98495 69101</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.ash@gmail.com" className="text-blue-600">smce.ash@gmail.com</a></div>
              </div>
              {/* HoD, MBA */}
              <div id="hod-mba" className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Dr. Sk. J. Shareef</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">HoD, MBA</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:8885527777" className="text-blue-600">88855 27777</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.hodmba@gmail.com" className="text-blue-600">smce.hodmba@gmail.com</a></div>
              </div>
            </div>
          </section>

          {/* Controller of Examinations Section */}
          <section className="mt-12" id="coe">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6 text-center">Controller of Examinations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Dr. M. Nageswara Rao</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">Controller of Examinations</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:9121214729" className="text-blue-600">91212 14729</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:cemittapalli@gmail.com" className="text-blue-600">cemittapalli@gmail.com</a></div>
              </div>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Mr. P. Pradeep</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">Asst. Controller of Examinations</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:9121214729" className="text-blue-600">91212 14729</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.examsincharge@gmail.com" className="text-blue-600">smce.examsincharge@gmail.com</a></div>
              </div>
            </div>
          </section>

          {/* Training & Placement Cell Section */}
          <section className="mt-12" id="tpcell">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6 text-center">Training &amp; Placement Cell</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Prof. K. Vijay Kumar</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">Training &amp; Placement Officer</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:7382442092" className="text-blue-600">73824 42092</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.tpo@gmail.com" className="text-blue-600">smce.tpo@gmail.com</a></div>
              </div>
            </div>
          </section>

          {/* R&D Cell Section */}
          <section className="mt-12" id="rnd">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6 text-center">R &amp; D Cell</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Dr. T. Mahesh Babu</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">R&amp;D Cell Coordinator</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:9440495073" className="text-blue-600">94404 95073</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.randd@gmail.com" className="text-blue-600">smce.randd@gmail.com</a></div>
              </div>
            </div>
          </section>

          {/* NSS Coordinator Section */}
          <section className="mt-12" id="nss">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6 text-center">NSS Coordinator</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Prof. G. Raj Kumar</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">NSS Coordinator</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:9985892136" className="text-blue-600">99858 92136</a></div>
                <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.nss@gmail.com" className="text-blue-600">smce.nss@gmail.com</a></div>
              </div>
            </div>
          </section>

          {/* Transport Coordinators Section */}
          <section className="mt-12" id="transport">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#800000] mb-6 text-center">Transport Coordinators</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center break-words">
                <img src={smceLogo} alt="SMCE Logo" className="w-12 h-12 mx-auto mb-4 rounded-full" />
                <div className="text-xl font-bold text-gray-900 mb-1 break-words">Prof. Y. Ashok</div>
                <div className="text-sm font-semibold text-[#800000] mb-2 break-words">Transport Coordinator</div>
                <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:8074531061" className="text-blue-600">80745 31061</a></div>
                <div className="text-sm text-gray-700 break-words mb-4">✉️ <a href="mailto:smce.transport@gmail.com" className="text-blue-600">smce.transport@gmail.com</a></div>
                <div className="border-t pt-4 mt-2">
                  <div className="text-xl font-bold text-gray-900 mb-1 break-words">Brahmam</div>
                  <div className="text-sm font-semibold text-[#800000] mb-2 break-words">Asst. Transport Coordinator</div>
                  <div className="text-sm text-gray-700 mb-1 break-words">📞 <a href="tel:7989475758" className="text-blue-600">79894 75758</a></div>
                  <div className="text-sm text-gray-700 break-words">✉️ <a href="mailto:smce.transport@gmail.com" className="text-blue-600">smce.transport@gmail.com</a></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}