import { useState } from "react";
import { db } from "../services/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import logo from "../assets/logo/logo.png";
import { Link } from "react-router-dom";

const branchOptions = {
  "B.Tech": ["CSE", "CSE-AI", "CSE-DS", "IT", "ECE"],
  MBA: ["MBA"],
  "M.Tech": ["CSE", "VLSI & ES"],
};

const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "NAAC", label: "Accredited" },
  { value: "NBA", label: "Approved Programs" },
  { value: "5000+", label: "Alumni Network" },
];

const highlights = [
  {
    title: "Autonomous Institution",
    desc: "Flexible, industry-aligned curriculum under Acharya Nagarjuna University.",
  },
  {
    title: "Strong Placement Record",
    desc: "Consistent placements with leading MNCs and core engineering companies.",
  },
  {
    title: "Modern Infrastructure",
    desc: "Smart classrooms, research labs, and high-speed Wi-Fi across campus.",
  },
  {
    title: "Experienced Faculty",
    desc: "PhD-qualified faculty with deep industry and research expertise.",
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

function SuccessState({ userId }) {
  return (
    <div className="max-w-lg mx-auto text-center bg-white rounded-2xl shadow-md border border-gray-100 p-12">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h2>
      <p className="text-gray-500 mb-6 leading-relaxed">
        Our admissions counsellor will call you within{" "}
        <span className="font-semibold text-gray-800">24 hours</span> to guide you
        through the next steps.
      </p>
      <div className="bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 inline-block">
        <p className="text-xs text-gray-400 uppercase tracking-wide">Reference ID</p>
        <p className="font-bold text-[#800000] text-xl mt-1">{userId}</p>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="text-sm text-gray-500 mb-1">Need immediate help? Call us:</p>
        <a href="tel:+919988777665" className="text-[#800000] font-bold text-lg hover:underline">
          +91-99887-77665
        </a>
      </div>
    </div>
  );
}

export default function AdmissionForm() {
  const [form, setForm] = useState({ name: "", phone: "", course: "", branch: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState({});

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
    setUserId(uid);
    try {
      await addDoc(collection(db, "admissions"), {
        ...form,
        userId: uid,
        createdAt: serverTimestamp(),
        status: "new",
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
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
          <div className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 font-medium mb-5">
            Admissions Open 2026 &mdash; Limited Seats Available
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Your Engineering Career
            <br className="hidden md:block" />
            <span className="text-yellow-300">Starts Here</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Sri Mittapalli College of Engineering &mdash; Autonomous &bull; NAAC
            Accredited &bull; NBA Approved
          </p>
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
              <div className="text-2xl font-bold text-[#800000]">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {submitted ? (
          <SuccessState userId={userId} />
        ) : (
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
                  href="tel:+919988777665"
                  className="text-2xl font-bold text-white hover:underline block"
                >
                  +91-99887-77665
                </a>
                <p className="text-xs text-white/50 mt-1">
                  Mon&ndash;Sat &bull; 9AM &ndash; 5PM
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

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
