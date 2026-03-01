// import React from "react";
// import { X } from "lucide-react";

// export default function Modal({ isOpen, onClose, children }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-1000 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
//       <div className="relative w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-black/50 transition-all duration-200 cursor-pointer"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         {/* Modal Content */}
//         <div className="p-3 sm:p-4 md:p-6 max-h-[85vh] overflow-auto">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }