import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from "../../../services/firebase";

const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-700 border border-blue-200" },
  { value: "followup", label: "Follow Up", color: "bg-yellow-100 text-yellow-700 border border-yellow-200" },
  { value: "visit", label: "College Visit", color: "bg-purple-100 text-purple-700 border border-purple-200" },
  { value: "pending", label: "Pending", color: "bg-orange-100 text-orange-700 border border-orange-200" },
  { value: "admission", label: "Admission Done", color: "bg-green-100 text-green-700 border border-green-200" },
  { value: "closed", label: "Closed", color: "bg-red-100 text-red-700 border border-red-200" },
];

function LeadDetails({ lead }) {
  const [status, setStatus] = useState(lead?.status || "new");
  const [scheduleDate, setScheduleDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");
  const [liveLead, setLiveLead] = useState(lead);

  useEffect(() => {
    setStatus(lead?.status || "new");
  }, [lead]);

  useEffect(() => {
    if (!lead?.id) return;

    const ref = doc(db, "admissions", lead.id);

    const unsubscribe = onSnapshot(ref, (docSnap) => {
      if (docSnap.exists()) {
        const updated = { id: docSnap.id, ...docSnap.data() };
        setLiveLead(updated);
        setStatus(updated.status || "new");

        if (updated.scheduledAt) {
          const d = updated.scheduledAt.seconds
            ? new Date(updated.scheduledAt.seconds * 1000)
            : new Date(updated.scheduledAt);
          setScheduleDate(d);
        }
      }
    });

    return () => unsubscribe();
  }, [lead]);

  if (!liveLead) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm">
        Select a lead
      </div>
    );
  }

  const handleUpdate = async () => {
    try {
      setLoading(true);

      let text = "Lead updated";

      // Generate meaningful activity text
      if (note) {
        text = note;
      } else if (status && status !== liveLead.status) {
        const prev = STATUS_OPTIONS.find((s) => s.value === liveLead.status);
        const next = STATUS_OPTIONS.find((s) => s.value === status);

        text = `${prev?.label || "New"} → ${next?.label}`;
      }

      if (scheduleDate && !note) {
        const formattedDate = scheduleDate.toLocaleString();
        text = `Follow-up scheduled for ${formattedDate}`;
      }

      const activity = {
        type: note ? "note" : "status",
        from: liveLead.status || "new",
        to: status,
        text,
        createdAt: new Date(),
      };

      await updateDoc(doc(db, "admissions", liveLead.id), {
        status,
        scheduledAt: scheduleDate || null,
        activities: arrayUnion(activity),
      });

      setNote("");
      // Reset fields after submit
      setScheduleDate(null);
      setStatus("new");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const currentStatus = STATUS_OPTIONS.find((s) => s.value === status);

  return (
    <div className="h-full overflow-y-auto bg-[#f8fafc] p-4 lg:p-5">
      <div className="rounded-[28px] border border-gray-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all duration-300 p-6 lg:p-7 space-y-7">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-semibold">
              Lead Profile
            </p>

            <h2 className="mt-1 text-[28px] leading-tight font-bold text-gray-900 tracking-tight">
              {liveLead.name || "No Name"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Admissions Lead Management
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[11px] px-4 py-2 rounded-full font-semibold tracking-wide shadow-sm ${currentStatus?.color}`}>
              {currentStatus?.label}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="rounded-2xl border border-gray-100 bg-[#fafafa] p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400 font-semibold">
              Phone
            </p>
            <p className="mt-2 text-sm font-semibold text-gray-900 break-words">
              {liveLead.phone || "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-[#fafafa] p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400 font-semibold">
              Email
            </p>
            <p className="mt-2 text-sm font-semibold text-gray-900 break-words">
              {liveLead.email || "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-[#fafafa] p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400 font-semibold">
              Course
            </p>
            <p className="mt-2 text-sm font-semibold text-gray-900 break-words">
              {liveLead.course || "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-[#fafafa] p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400 font-semibold">
              Branch
            </p>
            <p className="mt-2 text-sm font-semibold text-gray-900 break-words">
              {liveLead.branch || "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-[#fafafa] p-4 sm:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400 font-semibold">
              Location
            </p>
            <p className="mt-2 text-sm font-semibold text-gray-900 break-words">
              {liveLead.village || "-"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200 pt-6 space-y-6">

          {/* Status Dropdown */}
          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-semibold mb-2 block">
              Lead Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-[#fcfcfc] px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 focus:border-[#800000]/30 focus:outline-none focus:ring-4 focus:ring-[#800000]/10"
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
            <label className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-semibold mb-2 block">
              Schedule Follow Up
            </label>
            <DatePicker
              selected={scheduleDate}
              onChange={(date) => setScheduleDate(date)}
              showTimeSelect
              timeIntervals={15}
              dateFormat="Pp"
              placeholderText="Select date & time"
              className="w-full rounded-2xl border border-gray-200 bg-[#fcfcfc] px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 focus:border-[#800000]/30 focus:outline-none focus:ring-4 focus:ring-[#800000]/10 truncate"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-semibold mb-2 block">
              Follow Up Notes
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Type update or follow-up note..."
              className="w-full rounded-2xl border border-gray-200 bg-[#fcfcfc] px-4 py-3 text-sm text-gray-700 shadow-sm transition-all duration-200 focus:border-[#800000]/30 focus:outline-none focus:ring-4 focus:ring-[#800000]/10 resize-none break-words"
              rows={3}
            />
          </div>

          {/* Action */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-[#091224] to-[#111827] py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_rgba(17,24,39,0.2)] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_16px_40px_rgba(17,24,39,0.28)]"
          >
            {loading ? "Updating Lead..." : "Save Lead Updates"}
          </button>

        

        </div>
      </div>
    </div>
  );
}

export default LeadDetails;