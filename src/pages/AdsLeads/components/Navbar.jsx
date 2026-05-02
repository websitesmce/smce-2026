import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.png"

function Navbar({ activeTab = "new", onTabChange, onRefresh, onOpenDownload }) {
  const navigate = useNavigate();

  const tabs = [
    { key: "new", label: "New" },
    { key: "scheduled", label: "Scheduled" },
    { key: "unlabeled", label: "Unlabeled" },
  ];

  return (
    <div className="w-full border-b border-gray-100 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg overflow-hidden shadow-sm">
            <img src={logo} alt="" />
          </div>
          <h1 className="text-[18px] font-semibold text-[#800000] tracking-tight">
            SMCE Leads Dashboard
          </h1>
        </div>

        {/* Center Tabs */}
        <div className="hidden md:flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                onTabChange && onTabChange(tab.key);
                onRefresh && onRefresh();
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-[#800000] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <select
            className="md:hidden border border-gray-200 rounded-lg px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={activeTab}
            onChange={(e) => {
              onTabChange && onTabChange(e.target.value);
              onRefresh && onRefresh();
            }}
          >
            {tabs.map((tab) => (
              <option key={tab.key} value={tab.key}>
                {tab.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => onOpenDownload && onOpenDownload()}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:shadow transition-all duration-200"
          >
            Download
          </button>

          {/* 🔴 Logout Button */}
          <button
            onClick={async () => {
              try {
                await signOut(auth);
                navigate("/login");
              } catch (err) {
                console.error(err);
              }
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[#e64229] text-white hover:bg-[#d63a22] shadow-sm hover:shadow-md transition-all duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;