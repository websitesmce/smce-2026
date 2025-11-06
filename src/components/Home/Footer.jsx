import React from "react";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white pt-16 pb-8 px-6 sm:px-12 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            {[
              "Admissions",
              "Programs",
              "Placements",
              "FAQs",
              "Downloads",
              "RTI",
              "Newsletters",
              "Staff",
              "Alumni",
            ].map((item, idx) => (
              <li key={idx} className="hover:text-white cursor-pointer">
                <span className="mr-2">›</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Statutory / Disclosure Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Statutory & Disclosures</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            {[
              "NAAC",
              "NBA",
              "AICTE",
              "UGC",
              "Mandatory Disclosure",
              "Audit Reports",
              "Governing Body",
              "Mentoring System",
            ].map((item, idx) => (
              <li key={idx} className="hover:text-white cursor-pointer">
                <span className="mr-2">›</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <p className="text-sm text-gray-300 mb-2">
            <MapPin className="inline-block w-4 h-4 mr-2" />
            Sri Mittapalli College Of Engineering (Autonomous),<br />
            Tummalapalem, NH16, Guntur,<br />
            Andhra Pradesh - 522233
          </p>
          <p className="text-sm text-gray-300 mb-2">
            <Mail className="inline-block w-4 h-4 mr-2" />
            smce.principal@gmail.com
          </p>
          <p className="text-sm text-gray-300 mb-2">
            <Mail className="inline-block w-4 h-4 mr-2" />
            smcengg@yahoo.co.in
          </p>
          <p className="text-sm text-gray-300">
            Mobile: +91 9000447117 / +91 9032727017
          </p>
        </div>

        {/* Embedded Map */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Map</h4>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d473183.54054988036!2d80.272146!3d16.197512!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a7a0bb7359303%3A0x7f3b7688913f48c3!2sSri%20Mittapalli%20College%20of%20Engineering(Autonomous%20)-%20Guntur!5e1!3m2!1sen!2sus!4v1750590028271!5m2!1sen!2sus"
            width="100%"
            height="200"
            className="rounded-xl border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          © {new Date().getFullYear()} <a href="https://www.smce.ac.in" className="hover:underline">smce.ac.in</a>. All Rights Reserved. Designed & Developed by <a target="blank" href="https://bennydavid.com/" className="text-white hover:underline">Benny David</a>
        </div>
        <div className="flex gap-4">
          {[Twitter, Facebook, Youtube, Linkedin, Instagram].map((Icon, idx) => (
            <a key={idx} href="#" className="text-gray-400 hover:text-white">
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
