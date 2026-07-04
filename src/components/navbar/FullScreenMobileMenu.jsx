import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ArrowLeft, ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";

function FullScreenMobileMenu({ linksData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [expandedDocumentLink, setExpandedDocumentLink] = useState(null);
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
    gsap.fromTo(
      tapRefs.current[index],
      { scale: 0.98 },
      { scale: 1, duration: 0.2, ease: "power1.out" }
    );
    setExpandedDocumentLink(null);
    setTimeout(() => setActiveSection(index), 100);
  };

  const goBack = () => {
    setActiveSection(null);
    setExpandedDocumentLink(null);
  };

  const handleLinkClick = () => {
    // Smoothly close the menu after link click
    setIsOpen(false);
    setActiveSection(null);
    setExpandedDocumentLink(null);
  };

  const toggleDocumentLinks = (index) => {
    setExpandedDocumentLink((current) => (current === index ? null : index));
  };

  return (
    <div className="lg:hidden">
      {/* Hamburger Menu Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-[#800000] px-4 py-2 font-semibold"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu Panel */}
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

        {/* Top-Level Menu */}
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
            {/* Submenu Section */}
            <h3 className="text-xl font-semibold text-[#800000] mb-4">
              {linksData[activeSection].title}
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              {linksData[activeSection].description}
            </p>

            {/* Sublinks with close-on-click */}
            <ul className="space-y-3">
              {linksData[activeSection].subLinks.map((sublink, i) => (
                <li key={i}>
                  {sublink.documents ? (
                    <div className="flex overflow-hidden rounded-md bg-gray-100">
                      <Link
                        to={sublink.href}
                        onClick={handleLinkClick}
                        className="block min-w-0 flex-1 px-4 py-2 text-base font-medium text-gray-800 active:scale-[0.97] transition-transform duration-150"
                      >
                        {sublink.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleDocumentLinks(i)}
                        className="flex w-12 shrink-0 items-center justify-center border-l border-gray-200 text-[#800000]"
                        aria-expanded={expandedDocumentLink === i}
                        aria-label={`Show ${sublink.label} academic year documents`}
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-150 ${
                            expandedDocumentLink === i ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  ) : sublink.external ? (
                    <a
                      href={sublink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className="block text-base font-medium text-gray-800 bg-gray-100 rounded-md px-4 py-2 active:scale-[0.97] transition-transform duration-150"
                    >
                      {sublink.label}
                    </a>
                  ) : (
                    <Link
                      to={sublink.href}
                      onClick={handleLinkClick}
                      className="block text-base font-medium text-gray-800 bg-gray-100 rounded-md px-4 py-2 active:scale-[0.97] transition-transform duration-150"
                    >
                      {sublink.label}
                    </Link>
                  )}
                  {sublink.documents && expandedDocumentLink === i && (
                    <ul className="mt-2 grid gap-2 pl-3">
                      {sublink.documents.map((documentLink) => (
                        <li key={documentLink.href}>
                          <a
                            href={documentLink.href}
                            download
                            onClick={handleLinkClick}
                            className="block rounded-md border border-[#800000]/15 bg-white px-4 py-2 text-sm font-medium text-[#800000] active:scale-[0.97] transition-transform duration-150"
                            aria-label={`Download ${sublink.label} ${documentLink.label} document`}
                          >
                            {documentLink.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 border-t pt-4 text-sm text-gray-600">
              <p>
                <strong>Email:</strong>{" "}
                {linksData[activeSection].contact.email}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {linksData[activeSection].contact.phone}
              </p>
              <p>
                <strong>Hours:</strong>{" "}
                {linksData[activeSection].contact.hours}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {linksData[activeSection].contact.location}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FullScreenMobileMenu;
