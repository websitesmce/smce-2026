import React from "react";
import {
  Home,
  Info,
  Phone,
  Image as Gallery,
  Newspaper,
  PartyPopper,
} from "lucide-react";
import logo from "../../assets/logo/logo.png";

function Topbar() {
  return (
    <div className="w-full bg-[#800000] text-white py-2.5 relative z-100">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8">
        {/* Left Links */}
        <div className="flex gap-5 text-sm font-medium">
          <div className="hidden lg:flex gap-5">
            <a href="#" className="relative group">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#" className="relative group">
              About Us
              <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#" className="relative group">
              Contact Us
              <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          <div className="flex lg:hidden gap-3 text-white text-lg">
            <a href="#" title="Home"><Home size={18} /></a>
            <a href="#" title="About Us"><Info size={18} /></a>
            <a href="#" title="Contact Us"><Phone size={18} /></a>
          </div>
        </div>

        {/* Right Links */}
        <div className="flex gap-5 text-sm font-medium">
          <div className="hidden lg:flex gap-5">
            <a href="#" className="relative group">
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
            <a href="#" title="Gallery"><Gallery size={18} /></a>
            <a href="#" title="News"><Newspaper size={18} /></a>
            <a href="#" title="Events"><PartyPopper size={18} /></a>
          </div>
        </div>
      </div>

      {/* Center Logo Section */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-0 z-10">
        <a href="/" className="block">
          <div className="
            bg-white rounded-b-2xl shadow-md 
            flex flex-col items-center justify-center px-4 py-2
            sm:flex-row sm:gap-3 sm:px-5 sm:py-2
            lg:gap-3 lg:px-8 lg:py-2
          ">
            <img
              src={logo}
              alt="SMCE Logo"
              className="h-8 sm:h-9 lg:h-10 object-contain"
            />
            {/* Desktop & Tablet Text */}
            <div className="hidden sm:flex flex-col sm:flex-row sm:items-center sm:gap-3 text-black">
              <div className="hidden lg:block h-full w-px bg-gray-400" />
              <div className="text-left">
                <div className="text-[13px] sm:text-[15px] lg:text-[17px] font-semibold leading-tight tracking-wide">
                  SRI MITTAPALLI
                </div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600">
                  College of Engineering
                </div>
              </div>
            </div>
            {/* Mobile-only Text */}
            <div className="sm:hidden mt-1 text-[11px] font-semibold text-black">
              SMCE
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Topbar;
