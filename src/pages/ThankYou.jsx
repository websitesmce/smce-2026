import { useSearchParams, Link } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import PlacementHighlights from "../components/PlacementHighlights";

// Department images for program cards
import imgCSE    from "../assets/department-img/cse-main.jpeg";
import imgCSEAI  from "../assets/department-img/cse-ai-main.jpeg";
import imgCSEDS  from "../assets/department-img/cse-ds.jpeg";
import imgIT     from "../assets/department-img/it.jpeg";
import imgECE    from "../assets/department-img/ece.png";
import imgMBA    from "../assets/department-img/sh.jpg";

// Campus images for visual strip
import campus1 from "../assets/home/Hero-imgs/1.jpg";
import campus2 from "../assets/home/Hero-imgs/5.jpg";
import campus3 from "../assets/home/Hero-imgs/6.jpg";

// ── Program cards data ───────────────────────────────────────────────────────

const PROGRAMS = [
  { degree: "B.Tech", name: "CSE",     image: imgCSE,   color: "bg-blue-500",   href: "/cse-department",     seats: 60 },
  { degree: "B.Tech", name: "CSE-AI",  image: imgCSEAI, color: "bg-violet-500", href: "/cse-ai-department",  seats: 60 },
  { degree: "B.Tech", name: "CSE-DS",  image: imgCSEDS, color: "bg-sky-500",    href: "/cse-ds-department",  seats: 60 },
  { degree: "B.Tech", name: "IT",      image: imgIT,    color: "bg-emerald-500",href: "/it-department",      seats: 60 },
  { degree: "B.Tech", name: "ECE",     image: imgECE,   color: "bg-amber-500",  href: "/ece-department",     seats: 60 },
  { degree: "MBA",    name: "Business", image: imgMBA,  color: "bg-rose-500",   href: "/mba-department",     seats: 60 },
];

// ── What happens next ────────────────────────────────────────────────────────

const STEPS = [
  {
    n: "01",
    title: "Counsellor Call",
    desc: "Our admissions counsellor will call you within 24 hours to walk you through your options.",
    color: "bg-sky-500",
  },
  {
    n: "02",
    title: "Document Verification",
    desc: "Shortlisted candidates are invited for document verification at the campus.",
    color: "bg-violet-500",
  },
  {
    n: "03",
    title: "EAPCET Counselling",
    desc: "Attend state-level counselling and pick SMCE using college code MPLG.",
    color: "bg-amber-500",
  },
  {
    n: "04",
    title: "Seat Confirmation",
    desc: "Pay the fee, receive your joining letter, and begin your journey at SMCE.",
    color: "bg-emerald-500",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ThankYou() {
  const [params] = useSearchParams();
  const refId = params.get("ref") || "";

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero banner ────────────────────────────────────────────────────── */}
      <div
        className="pt-[110px] pb-14 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #800000 0%, #5c0000 60%, #3a0000 100%)" }}
      >
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <img src={logo} alt="SMCE" className="h-16 mx-auto mb-6 drop-shadow-lg" />

          {/* Success ring */}
          <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center mx-auto mb-5 shadow-xl">
            <svg className="w-10 h-10 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 bg-green-400/20 border border-green-300/30 rounded-full px-4 py-1.5 text-sm text-green-200 font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
            Application Received Successfully
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
            You're one step closer
            <br className="hidden md:block" />
            <span className="text-yellow-300">to SMCE</span>
          </h1>
          <p className="text-white/65 text-base max-w-lg mx-auto leading-relaxed">
            Our admissions counsellor will call you within{" "}
            <span className="text-white font-semibold">24 hours</span>. In the meantime, explore what makes SMCE special.
          </p>

          {/* Reference ID */}
          {refId && (
            <div className="mt-6 inline-block bg-white/10 border border-white/20 rounded-2xl px-8 py-4">
              <p className="text-[11px] text-white/50 uppercase tracking-widest mb-1">Your Reference ID</p>
              <p className="text-2xl font-bold text-amber-300 tracking-wider">{refId}</p>
              <p className="text-[11px] text-white/40 mt-1">Save this for your records</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Campus image strip ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 h-36 sm:h-48">
        {[campus1, campus2, campus3].map((src, i) => (
          <div key={i} className="relative overflow-hidden">
            <img src={src} alt="SMCE Campus" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* ── What happens next ──────────────────────────────────────────────── */}
      <div className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-[#800000] uppercase tracking-widest mb-2">Next Steps</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What happens after you submit?</h2>
            <p className="text-gray-400 text-sm mt-2">A clear path from enquiry to your first day on campus.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s) => (
              <div key={s.n} className="flex flex-col items-center text-center p-5 rounded-2xl border border-gray-100 bg-gray-50">
                <div className={`w-12 h-12 rounded-full ${s.color} text-white font-extrabold text-lg flex items-center justify-center mb-4 shadow-md`}>
                  {s.n}
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1.5">{s.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Placements Highlights ──────────────────────────────────────────── */}
      <PlacementHighlights showCta={false} />

      {/* ── Explore Programs ───────────────────────────────────────────────── */}
      <div className="bg-[#f8f9fb] py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-[#800000] uppercase tracking-widest mb-2">While You Wait</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Explore Our Programs</h2>
            <p className="text-gray-400 text-sm mt-2">Learn more about the department you applied for.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {PROGRAMS.map((p) => (
              <Link
                key={p.name}
                to={p.href}
                className="group relative rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Card image */}
                <div className="h-28 sm:h-36 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${p.color}`} />
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-[10px] text-white/60 font-semibold uppercase tracking-widest">{p.degree}</p>
                  <p className="text-sm font-bold text-white leading-snug">{p.name}</p>
                  <p className="text-[10px] text-white/50 mt-0.5">{p.seats} seats</p>
                </div>
                {/* Arrow */}
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Credentials + Accreditations ───────────────────────────────────── */}
      <div className="bg-[#0f172a] py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
            {[
              { value: "A+", label: "NAAC Grade",          color: "text-amber-400" },
              { value: "NBA", label: "Accredited",          color: "text-violet-400" },
              { value: "UGC", label: "Autonomous",          color: "text-sky-400"   },
              { value: "ISO", label: "9001:2015",            color: "text-emerald-400" },
            ].map((c) => (
              <div key={c.label} className="bg-[#0f172a] px-6 py-5 text-center">
                <p className={`text-2xl font-extrabold ${c.color}`}>{c.value}</p>
                <p className="text-white/35 text-[11px] font-semibold uppercase tracking-widest mt-1">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Contact + Actions ──────────────────────────────────────────────── */}
      <div className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Contact card */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 space-y-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Admissions Contact</p>
              <div className="space-y-3">
                <a
                  href="tel:+919000447117"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#800000]/10 flex items-center justify-center shrink-0 group-hover:bg-[#800000] transition-colors">
                    <svg className="w-4 h-4 text-[#800000] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Call / WhatsApp</p>
                    <p className="text-base font-bold text-gray-900">+91-90004-47117</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/919000447117?text=Hi!%20I%20just%20submitted%20my%20admission%20enquiry.%20My%20reference%20ID%20is%20${refId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0 group-hover:bg-[#25D366] transition-colors">
                    <svg className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">WhatsApp Chat</p>
                    <p className="text-sm font-semibold text-gray-700">Message us directly</p>
                  </div>
                </a>

                <a
                  href="mailto:admissions@smce.edu.in"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-colors">
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Email</p>
                    <p className="text-sm font-semibold text-gray-700">admissions@smce.edu.in</p>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Address</p>
                    <p className="text-sm font-semibold text-gray-700">Tummalapalem, NH16, Guntur, AP — 522233</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA card */}
            <div className="rounded-2xl bg-[#0f172a] p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">College Code</p>
                <p className="text-5xl font-extrabold text-amber-400 tracking-wider mb-4">MPLG</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Use this code during EAPCET counselling to select Sri Mittapalli College of Engineering as your institution.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 bg-[#800000] hover:bg-[#6a0000] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  Go to Homepage
                </Link>
                <Link
                  to="/admission-procedure"
                  className="flex items-center justify-center gap-2 border border-white/20 text-white/70 hover:text-white hover:bg-white/10 text-sm font-semibold px-6 py-3 rounded-xl transition-all"
                >
                  View Admission Procedure
                </Link>
                <Link
                  to="/contact-us"
                  className="flex items-center justify-center gap-2 border border-white/10 text-white/40 hover:text-white/70 hover:bg-white/5 text-sm font-medium px-6 py-2.5 rounded-xl transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom strip ───────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100 bg-white py-5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Sri Mittapalli College of Engineering · Autonomous ·{" "}
            <span className="text-amber-500 font-semibold">NAAC A+</span>
          </p>
        </div>
      </div>
    </div>
  );
}
