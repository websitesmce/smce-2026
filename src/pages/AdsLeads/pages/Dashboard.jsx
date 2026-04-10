import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LeadTable from "../components/LeadTable";
import LeadDetails from "../components/LeadDetails";
import ActivityPanel from "../components/ActivityPanel";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("new");
  const [selectedLead, setSelectedLead] = useState(null);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden gap-4 p-4">
        
        {/* Left - Lead Table */}
        <div className="w-1/3 bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
          <LeadTable
            activeTab={activeTab}
            onSelectLead={setSelectedLead}
          />
        </div>

        {/* Middle - Lead Details */}
        <div className="w-1/3 bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
          {selectedLead ? (
            <LeadDetails lead={selectedLead} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm text-center px-6">
              Select a lead to view details
            </div>
          )}
        </div>

        {/* Right - Activity Panel */}
        <div className="w-1/3 bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
          {selectedLead ? (
            <ActivityPanel lead={selectedLead} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm text-center px-6">
              Activity will appear here
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;