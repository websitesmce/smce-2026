import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";

const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-700 border border-blue-200" },
  { value: "followup", label: "Follow Up", color: "bg-yellow-100 text-yellow-700 border border-yellow-200" },
  { value: "pending", label: "Pending", color: "bg-orange-100 text-orange-700 border border-orange-200" },
  { value: "admission", label: "Admission Done", color: "bg-green-100 text-green-700 border border-green-200" },
  { value: "closed", label: "Closed", color: "bg-red-100 text-red-700 border border-red-200" },
];

function LeadDetails({ lead }) {
  const [status, setStatus] = useState(lead?.status || "new");
  const [scheduleDate, setScheduleDate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!lead) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm">
        Select a lead
      </div>
    );
  }

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateDoc(doc(db, "admissions", lead.id), {
        status,
        scheduledAt: scheduleDate ? new Date(scheduleDate) : null,
      });

      alert("Updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const currentStatus = STATUS_OPTIONS.find((s) => s.value === status);

  return (
    <div className="h-full p-5 overflow-y-auto">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition p-5 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-gray-900">
            {lead.name || "No Name"}
          </h2>

          <span className={`text-xs px-3 py-1 rounded-full font-medium ${currentStatus?.color}`}>
            {currentStatus?.label}
          </span>
        </div>

        {/* Info */}
        <div className="space-y-3 text-sm text-gray-600">
          <p><span className="text-gray-400">Phone:</span> {lead.phone}</p>
          <p><span className="text-gray-400">Email:</span> {lead.email || "-"}</p>
          <p><span className="text-gray-400">Course:</span> {lead.course}</p>
          <p><span className="text-gray-400">Branch:</span> {lead.branch}</p>
          <p><span className="text-gray-400">Location:</span> {lead.village}</p>
        </div>

        {/* Divider */}
        <div className="border-t pt-4 space-y-4">

          {/* Status Dropdown */}
          <div>
            <label className="text-xs text-gray-500 block mb-1">Update Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Schedule */}
          <div>
            <label className="text-xs text-gray-500 block mb-1">Schedule Follow Up</label>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition"
            />
          </div>

          {/* Action */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-gray-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default LeadDetails;