import React, { useState, useRef, useEffect } from "react";
import { Bell, X, ChevronDown } from "lucide-react";
import { gsap } from "gsap";

const sampleNotifications = [
  {
    id: 1,
    title: "Admissions Deadline Extended",
    date: "2025-06-25",
    tag: "Urgent",
    details:
      "The last date for B.Tech applications has been extended to July 5th.",
    link: "#",
  },
  {
    id: 2,
    title: "New Placement Drive",
    date: "2025-06-23",
    tag: "New",
    details:
      "TCS and Infosys will be conducting a joint placement drive on July 10th.",
    link: "#",
  },
  {
    id: 3,
    title: "Exam Timetable Released",
    date: "2025-06-20",
    tag: "Important",
    details:
      "Mid-sem exam schedules are now available on the Examination Cell page.",
    link: "#",
  },{
    id: 3,
    title: "Test",
    date: "2025-06-20",
    tag: "Important",
    details:
      "testing",
    link: "#",
  },
];

export default function AnnouncementsNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const panelRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        panelRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        cardRefs.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
        }
      );
    }
  }, [isOpen]);

  const toggleItem = (id) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Floating Notification Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-white text-[#800000] shadow-xl rounded-full p-3 z-50 border border-gray-200 backdrop-blur-md"
      >
        <div className="relative">
          <Bell className="w-6 h-6" />
          {sampleNotifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {sampleNotifications.length}
            </span>
          )}
        </div>
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed bottom-20 right-6 max-w-sm w-[90vw] sm:w-96 bg-white/60 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-4 z-40"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-[#800000]">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* WhatsApp Chat Button Inside Panel */}
          <div className="mb-3">
            <a
              href="https://wa.me/919999999999?text=Hey%20there!%20I%20have%20a%20question%20regarding%20admissions."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-full flex items-center gap-2 shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M20.52 3.48A11.84 11.84 0 0 0 12 0C5.4 0 .24 6.24 0 12c0 2.1.6 4.14 1.74 5.94L0 24l6.24-1.62A11.94 11.94 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.18-1.26-6.18-3.48-8.52zM12 22.2c-1.8 0-3.54-.48-5.04-1.38l-.36-.24-3.72.96.96-3.66-.24-.36A10.42 10.42 0 0 1 1.8 12c0-5.58 4.62-10.2 10.2-10.2 2.7 0 5.22 1.08 7.08 2.94A9.96 9.96 0 0 1 22.2 12c0 5.58-4.62 10.2-10.2 10.2zm5.1-7.44c-.3-.18-1.74-.9-2.04-1-.3-.12-.54-.18-.78.18s-.9 1-.9 1.2-.36.24-.66.06c-.3-.12-1.26-.48-2.4-1.56-.9-.84-1.5-1.86-1.68-2.16-.18-.3 0-.48.12-.66.12-.12.3-.36.48-.54.12-.12.18-.24.3-.42.12-.18.06-.3 0-.48-.06-.12-.78-1.92-1.08-2.64-.3-.66-.6-.6-.84-.6H6c-.18 0-.48.06-.72.36s-.96.96-.96 2.34c0 1.38.96 2.7 1.08 2.88.12.18 1.86 3 4.5 4.2 1.56.66 2.16.72 2.94.6.48-.06 1.44-.6 1.62-1.2.18-.6.18-1.14.12-1.26-.06-.06-.24-.12-.54-.3z" />
              </svg>
              Chat with us on WhatsApp
            </a>
          </div>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
            {sampleNotifications.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="bg-white shadow rounded-xl p-4 transition-all duration-300 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-gray-800">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-400">{item.date}</p>
                    <span
                      className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        item.tag === "Urgent"
                          ? "bg-red-100 text-red-700"
                          : item.tag === "Important"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="text-gray-400 hover:text-[#800000] transition"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transform transition-transform duration-300 ${
                        openItem === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Expandable Content */}
                {openItem === item.id && (
                  <div className="mt-3 text-sm text-gray-600">
                    <p>{item.details}</p>
                    {item.link && (
                      <a
                        href={item.link}
                        className="mt-2 inline-block text-[#800000] text-sm underline"
                      >
                        View More
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}