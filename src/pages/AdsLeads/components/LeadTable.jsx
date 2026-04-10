import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../services/firebase";

function LeadTable({ activeTab = "new", onSelectLead }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const q = query(collection(db, "admissions"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLeads(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Filter based on tab
  const filteredLeads = leads.filter((lead) => {
    // Show ALL leads in "new" tab but prioritize new ones
    if (activeTab === "new") return true;

    // Scheduled tab
    if (activeTab === "scheduled") return lead.status === "scheduled";

    // Unlabeled (no status at all)
    if (activeTab === "unlabeled") return !lead.status;

    return true;
  });

  const getStatusStyles = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "followup":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "pending":
        return "bg-orange-100 text-orange-700 border border-orange-200";
      case "closed":
        return "bg-red-100 text-red-700 border border-red-200";
      case "admission":
        return "bg-green-100 text-green-700 border border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const groupByDate = (leads) => {
    const groups = {};

    leads.forEach((lead) => {
      if (!lead.createdAt) return;

      const date = new Date(
        lead.createdAt.seconds
          ? lead.createdAt.seconds * 1000
          : lead.createdAt
      );

      const key = date.toDateString();

      if (!groups[key]) groups[key] = [];
      groups[key].push(lead);
    });

    return groups;
  };

  let sortedLeads = [...filteredLeads];

  if (activeTab === "new") {
    sortedLeads.sort((a, b) => {
      const aPriority = !a.status || a.status === "new" ? 0 : 1;
      const bPriority = !b.status || b.status === "new" ? 0 : 1;
      return aPriority - bPriority;
    });
  }

  const groupedLeads = groupByDate(sortedLeads);

  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-700">Leads</h2>
      </div>

      {loading ? (
        <div className="p-4 text-sm text-gray-500">Loading leads...</div>
      ) : filteredLeads.length === 0 ? (
        <div className="p-4 text-sm text-gray-500">No leads found</div>
      ) : (
        <div className="py-3 space-y-6">
          {Object.keys(groupedLeads).map((dateKey) => (
            <div key={dateKey}>
              
              {/* Date Header */}
              <div className="px-4 mb-2">
                <p className="text-[11px] text-gray-400 font-semibold tracking-wide">
                  {new Date(dateKey).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-2">
                {groupedLeads[dateKey].map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => onSelectLead && onSelectLead(lead)}
                    className="p-5 mx-3 rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-white to-gray-50 shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-[17px] font-semibold text-gray-900 tracking-tight">
                        {lead.name || "No Name"}
                      </h3>

                      <span
                        className={`text-[11px] px-3 py-1 rounded-full font-medium capitalize ${getStatusStyles(
                          lead.status
                        )}`}
                      >
                        {lead.status || "new"}
                      </span>
                    </div>

                    <p className="text-[13px] text-gray-500 mt-1">
                      {lead.course} • {lead.branch}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <Phone size={14} className="text-gray-400" />
                      <p className="text-[14px] font-medium text-gray-800 tracking-wide">
                        {lead.phone || "No phone"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LeadTable;