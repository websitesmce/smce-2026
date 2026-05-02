import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { collection, query, orderBy, onSnapshot, where, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../services/firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function LeadTable({ activeTab = "new", onSelectLead }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState("all");

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d);
  };

  const handleTaskUpdate = async (lead, status) => {
    try {
      let noteText = "";

      if (status === "done") {
        noteText = prompt("Enter follow-up note (optional):") || "Follow-up completed";
      }

      const activity = {
        type: "task",
        text: status === "done" ? noteText : "Follow-up missed",
        createdAt: new Date(),
      };

      await updateDoc(doc(db, "admissions", lead.id), {
        taskStatus: status,
        activities: arrayUnion(activity),
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let q;

    if (activeTab === "scheduled") {
      const start = new Date(selectedDate);
      start.setHours(0,0,0,0);

      const end = new Date(selectedDate);
      end.setHours(23,59,59,999);

      q = query(
        collection(db, "admissions"),
        where("scheduledAt", ">=", start),
        where("scheduledAt", "<=", end),
        orderBy("scheduledAt", "asc")
      );
    } else {
      q = query(
        collection(db, "admissions"),
        orderBy("createdAt", "desc")
      );
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLeads(data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [activeTab, selectedDate]);

  // Filter based on tab and status filter
  const filteredLeads = leads.filter((lead) => {
    // Scheduled tab (query already filters by selectedDate)
    if (activeTab === "scheduled" && !lead.scheduledAt) return false;

    // Unlabeled tab
    if (activeTab === "unlabeled" && lead.status) return false;

    // Status filter (applies to ALL tabs)
    if (statusFilter !== "all" && lead.status !== statusFilter) return false;

    return true;
  });

  const getStatusStyles = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "followup":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "visit":
        return "bg-purple-100 text-purple-700 border border-purple-200";
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
      const sourceDate =
        activeTab === "scheduled" ? lead.scheduledAt : lead.createdAt;

      if (!sourceDate) return;

      const date = new Date(
        sourceDate.seconds ? sourceDate.seconds * 1000 : sourceDate
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
      <div className="px-4 pt-4 space-y-3">
        {activeTab === "scheduled" && (
          <div className="flex items-center gap-3">
            <button onClick={handlePrevDay} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-100 transition shadow-sm">←</button>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <button onClick={handleNextDay} className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-100 transition shadow-sm">→</button>
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          {["all","new","followup","visit","pending","admission","closed"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border backdrop-blur-sm hover:scale-[1.03] ${statusFilter === s ? "bg-gray-900 text-white shadow-md" : "bg-white/70 text-gray-600 hover:bg-gray-100 hover:text-gray-800"}`}
            >
              {s === "followup"
                ? "Follow Up"
                : s === "visit"
                ? "College Visit"
                : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 pb-1">
        <h2 className="text-sm font-semibold text-gray-700">
          {activeTab === "scheduled"
            ? new Date(selectedDate).toDateString() === new Date().toDateString()
              ? "Today’s Follow-ups"
              : `Follow-ups • ${selectedDate.toLocaleDateString()}`
            : "Leads"}
        </h2>
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
                <p className="text-[11px] text-gray-400 font-medium tracking-wider uppercase">
                  {(() => {
                    const date = new Date(dateKey);
                    const today = new Date();
                    const tomorrow = new Date();
                    tomorrow.setDate(today.getDate() + 1);

                    if (date.toDateString() === today.toDateString()) return "Today";
                    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

                    return date.toLocaleDateString();
                  })()}
                </p>
              </div>

              <div className="space-y-2">
                {groupedLeads[dateKey].map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => onSelectLead && onSelectLead(lead)}
                    className={`p-5 mx-3 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border-l-4 ${
                      lead.status === "new"
                        ? "border-l-blue-400"
                        : lead.status === "followup"
                        ? "border-l-yellow-400"
                        : lead.status === "visit"
                        ? "border-l-purple-400"
                        : lead.status === "pending"
                        ? "border-l-orange-400"
                        : lead.status === "admission"
                        ? "border-l-green-400"
                        : lead.status === "closed"
                        ? "border-l-red-400"
                        : "border-l-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-[17px] font-semibold text-gray-900 tracking-tight">
                        {lead.name || "No Name"}
                      </h3>

                      <span
                        className={`text-[11px] px-3 py-1 rounded-full font-semibold capitalize tracking-wide ${getStatusStyles(
                          lead.status
                        )}`}
                      >
                        {lead.status || "new"}
                      </span>
                    </div>

                    <p className="text-[13px] text-gray-500 mt-1">
                      {lead.course} • {lead.branch}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-gray-400" />
                        <p className="text-[14px] font-medium text-gray-800 tracking-wide truncate max-w-[140px]">
                          {lead.phone || "No phone"}
                        </p>
                      </div>

                      {activeTab === "scheduled" && lead.taskStatus !== "done" && lead.taskStatus !== "missed" && (
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTaskUpdate(lead, "done");
                            }}
                            className="text-[11px] px-2.5 py-1 rounded-md bg-green-100 text-green-700 hover:bg-green-200 shadow-sm hover:shadow transition-all duration-200"
                          >
                            Done
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTaskUpdate(lead, "missed");
                            }}
                            className="text-[11px] px-2.5 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 shadow-sm hover:shadow transition-all duration-200"
                          >
                            Missed
                          </button>
                        </div>
                      )}
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