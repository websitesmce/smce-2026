import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";

const TABS = [
  { key: "new",       label: "All Leads"  },
  { key: "scheduled", label: "Scheduled"  },
  { key: "unlabeled", label: "Unlabeled"  },
];

function Navbar({ activeTab = "new", onTabChange, onOpenDownload }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm shrink-0">
      <div className="px-5 h-14 flex items-center justify-between gap-4">

        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="h-8 w-8 rounded-lg overflow-hidden border border-gray-100 shadow-sm shrink-0">
            <img src={logo} alt="SMCE" className="h-full w-full object-cover" />
          </div>
          <div className="leading-none">
            <p className="text-[15px] font-bold text-[#800000]">SMCE Leads</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Admissions CRM</p>
          </div>
        </div>

        {/* Tab switcher — desktop */}
        <nav className="hidden md:flex items-center bg-gray-100 rounded-lg p-1 gap-0.5">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange?.(tab.key)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${
                activeTab === tab.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab switcher — mobile */}
        <select
          className="md:hidden border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white shadow-sm focus:outline-none"
          value={activeTab}
          onChange={(e) => onTabChange?.(e.target.value)}
        >
          {TABS.map((tab) => (
            <option key={tab.key} value={tab.key}>{tab.label}</option>
          ))}
        </select>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onOpenDownload?.()}
            className="flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export
          </button>
          <button
            onClick={handleSignOut}
            className="h-9 px-3.5 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition shadow-sm"
          >
            Sign Out
          </button>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
