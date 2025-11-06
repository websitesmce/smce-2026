import React from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}