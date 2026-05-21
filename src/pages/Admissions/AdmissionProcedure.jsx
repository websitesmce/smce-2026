import { Link } from "react-router-dom";

const PROGRAMS = [
  {
    program: "B.Tech",
    fullName: "Bachelor of Technology",
    duration: "4 Years",
    seats: "300 Seats",
    accentBar: "bg-emerald-500",
    accentText: "text-emerald-600",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-100",
    badge: "bg-emerald-100 text-emerald-700",
    icon: "🎓",
    eligibility: "Pass 10+2 with minimum 45% aggregate in Physics and Mathematics.",
    steps: [
      { label: "Convener Quota (70%)", desc: "AP EAMCET-based online counselling conducted by APSCHE." },
      { label: "B-Category (30%)",     desc: "Seats filled through 10+2 merit as per APSCHE norms." },
    ],
  },
  {
    program: "M.Tech",
    fullName: "Master of Technology",
    duration: "2 Years",
    seats: "36 Seats",
    accentBar: "bg-blue-500",
    accentText: "text-blue-600",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-100",
    badge: "bg-blue-100 text-blue-700",
    icon: "🔬",
    eligibility: "B.E / B.Tech in a relevant field with a minimum of 50% marks.",
    steps: [
      { label: "Convener Quota (70%)", desc: "GATE / PGECET rank-based online counselling via APSCHE." },
      { label: "B-Category (30%)",     desc: "Filled on UG merit basis as per APSCHE norms." },
    ],
  },
  {
    program: "MBA",
    fullName: "Master of Business Administration",
    duration: "2 Years",
    seats: "60 Seats",
    accentBar: "bg-rose-500",
    accentText: "text-rose-600",
    accentBg: "bg-rose-50",
    accentBorder: "border-rose-100",
    badge: "bg-rose-100 text-rose-700",
    icon: "📊",
    eligibility: "Any Bachelor's degree with a minimum of 50% marks.",
    steps: [
      { label: "Convener Quota (70%)", desc: "APICET rank-based online counselling via APSCHE." },
      { label: "B-Category (30%)",     desc: "Filled as per APSCHE B-Category norms." },
    ],
  },
];

const NOTES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    text: "APSCHE will release official notifications for Convener Quota admissions. Follow their schedule.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    text: "Spot admissions may fill vacant Convener Quota seats after regular counselling rounds.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    text: "SMCE will publish separate notifications for B-Category admissions. Contact us for details.",
  },
];

export default function AdmissionProcedure() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero banner ────────────────────────────────────────────────────── */}
      <div
        className="pt-[120px] pb-16 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #800000 0%, #5c0000 60%, #3a0000 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
            Admissions 2026 — Now Open
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Admission Procedure
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A clear, structured path to joining SMCE's B.Tech, M.Tech, and MBA programs —
            eligibility requirements and step-by-step guidance.
          </p>
        </div>

        {/* Quick info strip */}
        <div className="relative max-w-3xl mx-auto mt-10 grid grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {[
            { value: "NAAC A+", label: "Accredited" },
            { value: "MPLG",    label: "College Code" },
            { value: "396+",    label: "Total Seats" },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.06] backdrop-blur-sm px-6 py-4 text-center">
              <p className="text-xl sm:text-2xl font-extrabold text-amber-300 leading-none">{s.value}</p>
              <p className="text-white/50 text-[11px] font-semibold uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Program cards ──────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-[#800000] uppercase tracking-widest mb-2">Eligibility & Process</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Choose Your Program</h2>
          <p className="text-gray-400 text-sm mt-2 max-w-lg mx-auto">
            Each program follows a state-regulated admission process governed by APSCHE norms.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PROGRAMS.map((prog) => (
            <div
              key={prog.program}
              className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              {/* Accent top bar */}
              <div className={`h-1.5 w-full ${prog.accentBar}`} />

              <div className="p-6 flex flex-col flex-1 gap-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${prog.badge}`}>
                      {prog.program}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 mt-2 leading-snug">{prog.fullName}</h3>
                  </div>
                  <span className="text-3xl leading-none shrink-0">{prog.icon}</span>
                </div>

                {/* Meta pills */}
                <div className="flex gap-2 flex-wrap">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {prog.duration}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    {prog.seats}
                  </span>
                </div>

                {/* Eligibility */}
                <div className={`rounded-xl border ${prog.accentBorder} ${prog.accentBg} p-4`}>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${prog.accentText} mb-2`}>
                    Eligibility
                  </p>
                  <div className="flex items-start gap-2">
                    <svg className={`w-4 h-4 shrink-0 mt-0.5 ${prog.accentText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-gray-700 leading-relaxed">{prog.eligibility}</p>
                  </div>
                </div>

                {/* Steps */}
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                    How to Apply
                  </p>
                  <div className="space-y-3">
                    {prog.steps.map((step, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className={`shrink-0 w-6 h-6 rounded-full ${prog.accentBar} text-white text-[11px] font-extrabold flex items-center justify-center shadow-sm`}>
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-[12px] font-bold text-gray-800">{step.label}</p>
                          <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <Link
                  to="/admission-form"
                  className={`mt-auto block w-full text-center text-xs font-semibold py-2.5 rounded-xl border transition-all duration-200 ${prog.accentBorder} ${prog.accentBg} ${prog.accentText} hover:opacity-80`}
                >
                  Enquire for {prog.program} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Important Notes ────────────────────────────────────────────────── */}
      <div className="bg-[#0f172a] py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white">Important Notes</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {NOTES.map((note, i) => (
              <div
                key={i}
                className="flex gap-4 items-start bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5 hover:bg-white/[0.07] transition-colors"
              >
                <div className="shrink-0 w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  {note.icon}
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Contact / CTA strip ────────────────────────────────────────────── */}
      <div className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 flex flex-col md:flex-row items-center justify-between gap-8">

            <div className="text-center md:text-left">
              <p className="text-xs font-bold text-[#800000] uppercase tracking-widest mb-2">Need Guidance?</p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-1">
                Talk to an Admissions Counsellor
              </h3>
              <p className="text-sm text-gray-500">
                Our team is available Mon–Sat, 9AM–5PM to answer all your queries.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-5 justify-center md:justify-start">
                <a
                  href="tel:+919000447117"
                  className="inline-flex items-center gap-2 bg-[#800000] hover:bg-[#6a0000] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  +91-90004-47117
                </a>
                <a
                  href="https://wa.me/919000447117?text=Hi!%20I%20need%20help%20with%20admissions%20at%20SMCE."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
                >
                  <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* College code */}
            <div className="shrink-0 text-center bg-[#0f172a] rounded-2xl px-10 py-6">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">EAPCET College Code</p>
              <p className="text-4xl font-extrabold text-amber-400 tracking-wider">MPLG</p>
              <p className="text-[11px] text-white/30 mt-2">Use during EAPCET counselling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
