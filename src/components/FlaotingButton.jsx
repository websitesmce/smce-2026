import React from "react";
import { Link } from "react-router-dom";
import { FaWpforms } from "react-icons/fa";

const styles = `
@keyframes admissionExpand {
  0%, 35% {
    max-width: 0;
    opacity: 0;
    padding-right: 0;
  }

  45%, 75% {
    max-width: 140px;
    opacity: 1;
    padding-right: 20px;
  }

  100% {
    max-width: 0;
    opacity: 0;
    padding-right: 0;
  }
}

.animate-admission-expand {
  overflow: hidden;
  display: inline-block;
  max-width: 0;
  opacity: 0;
  animation: admissionExpand 10s infinite;
}
`;

function FlaotingButton() {
  React.useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div className="fixed bottom-24 right-5 z-[999] flex items-center">
      <Link
        to="/admission-form"
        aria-label="Go to Admission Form"
        className="group relative overflow-hidden rounded-full border border-gray-200 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.18)] transition-all duration-500 hover:scale-105 active:scale-95"
      >
        <div className="flex items-center">
          {/* Icon */}
          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white">
            <FaWpforms className="text-2xl text-[#800000] transition-transform duration-300 group-hover:rotate-6" />
          </div>

          {/* Expanding Text */}
          <div className="animate-admission-expand whitespace-nowrap pr-5 text-sm font-semibold tracking-wide text-[#800000]">
            Apply Now
          </div>
        </div>

        {/* Soft Glow */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#80000010] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
      </Link>
    </div>
  );
}

export default FlaotingButton;