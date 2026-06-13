import { useState } from "react";
import { db } from "../services/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import logo from "../assets/logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import PlacementHighlights from "../components/PlacementHighlights";

const branchOptions = {
  "B.Tech": ["CSE", "CSE-AI", "CSE-DS", "IT", "ECE"],
  MBA: ["MBA"],
  "M.Tech": ["CSE", "VLSI & ES"],
};

const stats = [
  { value: "A+",    label: "NAAC Grade"         },
  { value: "NBA",   label: "Accredited Programs" },
  { value: "5000+", label: "Alumni Network"      },
  { value: "25+",   label: "Years of Excellence" },
];

const highlights = [
  {
    title: "NAAC A+ Grade Institution",
    desc: "Certified with the highest NAAC grade — a mark of academic quality, governance, and student outcomes.",
  },
  {
    title: "UGC Autonomous Status",
    desc: "Flexible, industry-aligned curriculum designed under Acharya Nagarjuna University.",
  },
  {
    title: "98% Placement Record",
    desc: "Consistent placements with 200+ recruiting MNCs and core engineering companies.",
  },
  {
    title: "Modern Campus & Faculty",
    desc: "Smart classrooms, research labs, and PhD-qualified faculty with deep industry expertise.",
  },
];

const generateUID = () => "SMCE-" + Date.now().toString().slice(-6);

const inputCls = (err) =>
  `w-full border ${
    err ? "border-red-400 bg-red-50" : "border-gray-200"
  } rounded-lg px-4 py-2.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]/25 focus:border-[#800000] transition-colors`;

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function HighlightCard({ title, desc }) {
  return (
    <div className="flex gap-3 items-start bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#800000] shrink-0" />
      <div>
        <p className="font-semibold text-gray-900 text-sm">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function AdmissionForm() {
  const [form, setForm] = useState({ name: "", phone: "", course: "", branch: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit mobile number";
    if (!form.course) e.course = "Please select a course";
    if (!form.branch) e.branch = "Please select a branch";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "course" ? { branch: "" } : {}),
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const uid = generateUID();
    try {
      await addDoc(collection(db, "admissions"), {
        ...form,
        userId: uid,
        createdAt: serverTimestamp(),
        status: "new",
      });
      navigate(`/thank-you?ref=${uid}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div
        className="pt-[130px] pb-14 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #800000 0%, #5c0000 60%, #3a0000 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <img src={logo} alt="SMCE Logo" className="h-20 mx-auto mb-5 drop-shadow-lg" />
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
            Admissions Open 2026 &mdash; Limited Seats
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Begin Your Engineering
            <br />
            <span className="text-yellow-300">Journey at SMCE</span>
          </h1>
          <p className="text-white/70 text-base max-w-xl mx-auto leading-relaxed">
            Sri Mittapalli College of Engineering &mdash; Autonomous &bull;{" "}
            <span className="text-amber-300 font-semibold">NAAC A+ Grade</span> &bull; NBA Accredited
          </p>
          <a
            href="#placements"
            className="group inline-flex flex-col items-center gap-2 mt-9 text-white/70 hover:text-white transition-colors"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">
              See Where Our Students Land
            </span>
            <span className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 group-hover:bg-white/10 transition-all animate-bounce">
              <ChevronDown size={18} />
            </span>
          </a>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`py-5 px-6 text-center ${
                i < stats.length - 1 ? "border-r border-gray-100" : ""
              }`}
            >
              <div className={`text-2xl font-bold ${i === 0 ? "text-amber-500" : "text-[#800000]"}`}>
                {s.value}
              </div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div id="apply-form" className="max-w-5xl mx-auto px-6 py-12 scroll-mt-24">
        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Form Card */}
          <div className="md:col-span-3">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Apply Now</h2>
                <p className="text-gray-400 text-sm mb-7">
                  Get a free counselling call within 24 hours
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <Field label="Full Name *" error={errors.name}>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={inputCls(errors.name)}
                    />
                  </Field>

                  <Field label="Mobile Number *" error={errors.phone}>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={inputCls(errors.phone)}
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Course *" error={errors.course}>
                      <select
                        name="course"
                        value={form.course}
                        onChange={handleChange}
                        className={inputCls(errors.course)}
                      >
                        <option value="">Select Course</option>
                        {Object.keys(branchOptions).map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Branch *" error={errors.branch}>
                      <select
                        name="branch"
                        value={form.branch}
                        onChange={handleChange}
                        disabled={!form.course}
                        className={inputCls(errors.branch)}
                      >
                        <option value="">Select Branch</option>
                        {(branchOptions[form.course] || []).map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#800000] hover:bg-[#6a0000] active:bg-[#5a0000] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 text-base disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Get Free Counselling"
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    By submitting, you agree to be contacted by our admissions team.
                  </p>
                </form>
              </div>
            </div>

            {/* Why Choose SMCE */}
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose SMCE?</h3>
              {highlights.map((h, i) => (
                <HighlightCard key={i} title={h.title} desc={h.desc} />
              ))}
              <div className="bg-[#800000] rounded-xl p-5 text-white">
                <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-1">
                  Admission Helpline
                </p>
                <a
                  href="tel:+919000447117"
                  className="text-2xl font-bold text-white hover:underline block"
                >
                  +91-90004-47117
                </a>
                <p className="text-xs text-white/50 mt-1">
                  Mon&ndash;Sat &bull; 9AM &ndash; 5PM
                </p>
              </div>
            </div>
          </div>
      </div>

      {/* Placements Highlights */}
      <PlacementHighlights ctaHref="#apply-form" />

      {/* Contact Footer */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-wrap gap-6 items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">Admissions Office, SMCE</p>
            <p className="text-sm text-gray-400 mt-0.5">Guntur District, Andhra Pradesh</p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
              <a
                href="mailto:admissions@smce.edu.in"
                className="font-medium text-[#800000] hover:underline"
              >
                admissions@smce.edu.in
              </a>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Hours</p>
              <p className="font-medium text-gray-700">Mon&ndash;Fri, 9AM &ndash; 5PM</p>
            </div>
          </div>
          <Link
            to="/admission-procedure"
            className="bg-[#800000] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#6a0000] transition-colors whitespace-nowrap"
          >
            Admission Procedure
          </Link>
        </div>
      </div>
    </div>
  );
}
