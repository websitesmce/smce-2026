import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

const QUICK_LINKS = [
  { label: "Admissions",  href: "/admission-form" },
  { label: "Programs",    href: "/programmes-offered" },
  { label: "Placements",  href: "/placements" },
  { label: "FAQs",        href: "/faqs" },
  { label: "Downloads",   href: "/downloads" },
  { label: "RTI",         href: "/rti" },
  { label: "Newsletters", href: "/newsletters" },
  { label: "Alumni",      href: "/alumni" },
];

const STATUTORY = [
  { label: "NAAC",                 href: "/naac" },
  { label: "NBA",                  href: "/nba" },
  { label: "AICTE",                href: "/aicte" },
  { label: "UGC",                  href: "/ugc" },
  { label: "Mandatory Disclosure", href: "/mandatory-disclosure" },
  { label: "Audit Reports",        href: "/audit-reports" },
  { label: "Governing Body",       href: "/governing-body" },
  { label: "Mentoring System",     href: "/mentoring" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/smcengg",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@srimittapallicollegeofengi5006",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/smce_guntur",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/school/sri-mittapalli-college-of-engineering",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

function FooterLink({ href, label }) {
  const isExternal = href.startsWith("http");
  return isExternal ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
    >
      {label}
    </a>
  ) : (
    <Link
      to={href}
      className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0d1117] text-white">

      {/* ── Top CTA strip ──────────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-1">
              Sri Mittapalli College of Engineering
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              Your journey starts here — explore SMCE
            </h3>
          </div>
          <Link
            to="/admission-form"
            className="shrink-0 inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:bg-white/10 text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200"
          >
            Get in Touch
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                <img src={logo} alt="SMCE" className="h-8 w-8 object-contain" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-white">SMCE</p>
                <p className="text-[10px] text-gray-500 tracking-wide">Autonomous</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
              Sri Mittapalli College of Engineering — empowering technocrats with
              quality education, industry integration, and global standards since 2006.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#800000] hover:border-[#800000] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
              Quick Links
            </h5>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href} label={l.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Statutory */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
              Statutory &amp; Disclosures
            </h5>
            <ul className="space-y-2.5">
              {STATUTORY.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href} label={l.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Map */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-white mb-5">
              Contact
            </h5>
            <address className="not-italic space-y-3 text-sm text-gray-400 mb-5">
              <p className="leading-relaxed">
                Tummalapalem, NH16,<br />
                Guntur, Andhra Pradesh — 522233
              </p>
              <p>
                <a href="tel:+919000447117" className="hover:text-white transition-colors">
                  +91 90004 47117
                </a>
                {" / "}
                <a href="tel:+919032727017" className="hover:text-white transition-colors">
                  +91 90327 27017
                </a>
              </p>
              <p>
                <a href="mailto:smce.principal@gmail.com" className="hover:text-white transition-colors break-all">
                  smce.principal@gmail.com
                </a>
              </p>
            </address>

            {/* Map embed */}
            <div className="rounded-xl overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d473183.54054988036!2d80.272146!3d16.197512!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a7a0bb7359303%3A0x7f3b7688913f48c3!2sSri%20Mittapalli%20College%20of%20Engineering(Autonomous%20)-%20Guntur!5e1!3m2!1sen!2sus!4v1750590028271!5m2!1sen!2sus"
                width="100%"
                height="140"
                className="border-0 block"
                allowFullScreen=""
                loading="lazy"
                title="SMCE Location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom strip ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://www.smce.ac.in" className="hover:text-white transition-colors">
              smce.ac.in
            </a>
            . All Rights Reserved. Designed &amp; Developed by{" "}
            <a href="https://bennydavid.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 transition-colors font-medium">
              Benny David
            </a>
          </p>
          <div className="flex gap-5 items-center">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors">
                {l}
              </a>
            ))}
            <span className="text-white/10">·</span>
            <Link
              to="/login"
              className="hover:text-white/70 transition-colors text-white/25"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
