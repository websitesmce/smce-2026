import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";

function Navbar({ activeTab = "new", onTabChange, onRefresh }) {
  const navigate = useNavigate();

  const tabs = [
    { key: "new", label: "New" },
    { key: "scheduled", label: "Scheduled" },
    { key: "unlabeled", label: "Unlabeled" },
  ];

  return (
    <div className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-[#800000]"></div>
          <h1 className="text-lg font-semibold text-[#800000]">
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
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-[#800000] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <select
            className="md:hidden border rounded-md px-2 py-1 text-sm"
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
            className="px-4 py-2 rounded-md text-sm font-medium border hover:border-red-500 hover:text-white bg-[#e64229] text-white transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;