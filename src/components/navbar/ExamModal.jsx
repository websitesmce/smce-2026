import React from "react";

export default function ExamModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-white/20 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative animate-fade-in">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-[#800000]"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center text-[#800000]">
          Exam Portals
        </h2>

        <div className="flex flex-col gap-4">
          <a
            href="http://103.42.248.219/ecap/default.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-5 bg-[#800000] hover:bg-red-800 text-white rounded-md text-center font-medium transition-all"
          >
            ECAP Portal
          </a>

          <a
            href="https://smceexamcell.in/examcell/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-5 bg-[#800000] hover:bg-red-800 text-white rounded-md text-center font-medium transition-all"
          >
            SMCE Exam Cell Portal
          </a>
        </div>
      </div>
    </div>
  );
}