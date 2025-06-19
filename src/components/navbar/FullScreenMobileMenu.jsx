// components/FullScreenMobileMenu.js
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ArrowLeft, Menu } from "lucide-react";

function FullScreenMobileMenu({ linksData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const menuRef = useRef(null);
  const tapRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { x: "100%" },
        { x: 0, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  const openSubmenu = (index) => {
    // Animate tap feedback
    gsap.fromTo(
      tapRefs.current[index],
      { scale: 0.98 },
      { scale: 1, duration: 0.2, ease: "power1.out" }
    );
    setTimeout(() => setActiveSection(index), 100);
  };

  const goBack = () => setActiveSection(null);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="text-[#800000] px-4 py-2 font-semibold"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div
        ref={menuRef}
        className="fixed inset-0 bg-white z-[999] px-6 pt-[80px] pb-10 overflow-y-auto"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="flex justify-between items-center mb-6">
          {activeSection !== null && (
            <button
              onClick={goBack}
              className="text-[#800000] flex items-center gap-1 font-medium"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="text-red-600 font-semibold"
          >
            Close
          </button>
        </div>

        {activeSection === null ? (
          <ul className="space-y-3">
            {linksData.map((link, index) => (
              <li
                key={index}
                ref={(el) => (tapRefs.current[index] = el)}
                onClick={() => openSubmenu(index)}
                className="text-base font-semibold text-gray-800 bg-gray-100 rounded-md px-4 py-3 active:scale-[0.97] transition-transform duration-150"
              >
                {link.title}
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-[#800000] mb-4">
              {linksData[activeSection].title}
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              {linksData[activeSection].description}
            </p>

            <ul className="space-y-3">
              {linksData[activeSection].subLinks.map((sublink, i) => (
                <li key={i}>
                  <a
                    href={sublink.href}
                    className="block text-base font-medium text-gray-800 bg-gray-100 rounded-md px-4 py-2 active:scale-[0.97] transition-transform duration-150"
                  >
                    {sublink.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4 text-sm text-gray-600">
              <p>
                <strong>Email:</strong> {linksData[activeSection].contact.email}
              </p>
              <p>
                <strong>Phone:</strong> {linksData[activeSection].contact.phone}
              </p>
              <p>
                <strong>Hours:</strong> {linksData[activeSection].contact.hours}
              </p>
              <p>
                <strong>Location:</strong> {linksData[activeSection].contact.location}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FullScreenMobileMenu;