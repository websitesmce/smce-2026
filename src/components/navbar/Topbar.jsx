import React, { useState } from "react";
import {
  Home,
  Info,
  Phone,
  Image as Gallery,
  Newspaper,
  PartyPopper,
  LogIn,
} from "lucide-react";
import logo from "../../assets/logo/logo.png";
import ExamModal from "./ExamModal";

function Topbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-[#800000] text-white py-2.5 relative z-100">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8">
        {/* Left Links */}
        <div className="flex gap-5 text-sm font-medium">
          <div className="hidden lg:flex gap-5">
            <a href="/" className="relative group">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#" onClick={openModal} className="relative group cursor-pointer">
              Login
              <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="/contact-us" className="relative group">
              Contact Us
              <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          <div className="flex lg:hidden gap-3 text-white text-lg">
            <a href="/" title="Home">
              <Home size={18} />
            </a>
            <a href="#" onClick={openModal} title="Login">
              <LogIn size={18} />
            </a>
            <a href="/contact-us" title="Contact Us">
              <Phone size={18} />
            </a>
          </div>
        </div>

        {/* Right Links */}
        <div className="flex gap-5 text-sm font-medium">
          <div className="hidden lg:flex gap-5">
            <a href="/gallery" className="relative group">
              Gallery
              <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#" className="relative group">
              News
              <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#" className="relative group">
              Events
              <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          <div className="flex lg:hidden gap-3 text-white text-lg">
            <a href="/gallery" title="Gallery">
              <Gallery size={18} />
            </a>
            <a href="#" title="News">
              <Newspaper size={18} />
            </a>
            <a href="#" title="Events">
              <PartyPopper size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Center Logo Section */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-0 z-10">
        <a href="/" className="block">
          <div
            className="
            bg-white rounded-b-2xl shadow-md 
            flex flex-col items-center justify-center px-2 py-1
            sm:flex-row sm:gap-3 sm:px-3 sm:py-1
            lg:gap-3 lg:px-5 lg:py-1
          "
          >
            <img
              src={logo}
              alt="SMCE Logo"
              className="h-6 sm:h-7 lg:h-8 object-contain"
            />
            {/* Desktop & Tablet Text */}
            <div className="hidden sm:flex flex-col sm:flex-row sm:items-center sm:gap-3 text-black">
              <div className="hidden lg:block h-full w-px bg-gray-400" />
              <div className="text-center">
                <div
                  className="text-[10px] sm:text-[14px] lg:text-[18px] font-semibold leading-tight tracking-wide text-[#C24805]"
                  style={{ fontFamily: "MyCustomFont" }}
                >
                  SRI MITTAPALLI
                </div>
                <div className="text-[8px] sm:text-[10px] lg:text-[13px] text-gray-800 font-[Arial] font-semibold">
                  COLLEGE OF ENGINEERING
                </div>
                <div className="text-[6px] sm:text-[8px] lg:text-[9px] text-gray-800 font-[Arial] font-semibold">
                  AUTONOMOUS
                </div>
              </div>
            </div>
            {/* Mobile-only Text */}
            <div className="sm:hidden mt-1 text-[9px] font-semibold text-[#C24805]" style={{ fontFamily: "MyCustomFont" }}>
              SMCE
            </div>
          </div>
        </a>
      </div>
      <ExamModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Topbar;
