import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import smceLogo from "../../../assets/logo/logo.png";
import imageRight from "/src/assets/home/Hero-imgs/9.jpg";

function EyeOpen() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function EyeClosed() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">

      {/* ── LEFT: Login panel ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Top bar */}
        <div className="px-8 pt-7 pb-0 flex items-center gap-3 shrink-0">
          <div className="h-9 w-9 rounded-xl overflow-hidden border border-gray-200 shadow-sm shrink-0">
            <img src={smceLogo} alt="SMCE" className="h-full w-full object-cover" />
          </div>
          <div className="leading-none">
            <p className="text-sm font-bold text-gray-900">SMCE</p>
            <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-widest">Admissions Portal</p>
          </div>
        </div>

        {/* Center: form */}
        <div className="flex-1 flex items-center justify-center px-8 py-10">
          <div className="w-full max-w-[380px]">

            {/* Heading block */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-[#800000]/8 border border-[#800000]/20 rounded-full px-3.5 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#800000] animate-pulse" />
                <span className="text-[11px] font-semibold text-[#800000] tracking-wide">Admin Access</span>
              </div>
              <h1 className="text-[32px] font-bold text-gray-900 leading-tight tracking-tight">
                Welcome back
              </h1>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Sign in to manage your admission leads and enquiries.
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <p className="text-xs text-red-700 font-medium leading-relaxed">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
                  Email address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    autoComplete="email"
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    className="w-full h-11 bg-white border border-gray-200 rounded-xl pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:border-[#800000]/40 focus:ring-2 focus:ring-[#800000]/10 transition-all"
                    placeholder="you@smce.edu.in"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    className="w-full h-11 bg-white border border-gray-200 rounded-xl pl-10 pr-11 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:border-[#800000]/40 focus:ring-2 focus:ring-[#800000]/10 transition-all"
                    placeholder="••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeClosed /> : <EyeOpen />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 mt-1 bg-[#003180] hover:bg-[#002560] active:bg-[#001e4d] text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Footer help */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Need help?{" "}
                <a href="tel:8008932032" className="font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                  8008932032
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-8 py-5 border-t border-gray-100 shrink-0">
          <p className="text-[11px] text-gray-400 text-center">
            © {new Date().getFullYear()} Sri Mittapalli College of Engineering · All rights reserved.
          </p>
        </div>
      </div>

      {/* ── RIGHT: Hero panel (desktop only) ──────────────────────────────── */}
      <div className="hidden lg:flex relative w-[55%] xl:w-[58%] overflow-hidden bg-gray-900">
        {/* Background image */}
        <img
          loading="lazy"
          src={imageRight}
          alt="SMCE Campus"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#003180]/85 via-[#003180]/30 to-[#800000]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">

          {/* Live badge */}
          <div>
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              CRM · Live Dashboard
            </span>
          </div>

          {/* Main copy */}
          <div className="space-y-5">
            <h2 className="text-4xl xl:text-[46px] font-bold text-white leading-[1.15] tracking-tight">
              Shape futures.<br />
              <span className="text-amber-300">One lead</span> at a time.
            </h2>
            <p className="text-white/65 text-[15px] max-w-sm leading-relaxed">
              Manage every admission enquiry — from first contact to enrollment — faster, smarter, together.
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "👥", value: "Real-time", label: "Lead tracking" },
              { icon: "⚡", value: "< 1 hr", label: "Response time" },
              { icon: "🎓", value: "8+ Programs", label: "Offered" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 space-y-1.5"
              >
                <span className="text-2xl leading-none">{stat.icon}</span>
                <p className="text-base font-bold text-white leading-tight">{stat.value}</p>
                <p className="text-[11px] text-white/55 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;
