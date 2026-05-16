import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { getStatus, STATUS_OPTIONS } from "../utils/statusConfig";

// ── Helpers ──────────────────────────────────────────────────────────────────

const tsToDate = (ts) =>
  ts?.seconds ? new Date(ts.seconds * 1000) : ts ? new Date(ts) : null;

const tsToMs = (ts) => tsToDate(ts)?.getTime() ?? null;

function InfoBlock({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-3">
      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value || "—"}</p>
    </div>
  );
}

// ── LeadDetails ───────────────────────────────────────────────────────────────

function LeadDetails({ lead }) {
  const [status, setStatus] = useState(lead?.status || "new");
  const [scheduleDate, setScheduleDate] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  // Full reset when a different lead is selected
  useEffect(() => {
    if (!lead) return;
    setStatus(lead.status || "new");
    setNote("");
    setScheduleDate(tsToDate(lead.scheduledAt));
  }, [lead?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep status badge in sync with live Firestore updates
  const liveStatus = lead?.status;
  useEffect(() => {
    if (liveStatus) setStatus(liveStatus);
  }, [liveStatus]);

  if (!lead) return null;

  const sc = getStatus(status);
  const createdAt = tsToDate(lead.createdAt);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      // Build a meaningful activity label
      let text = "Lead updated";
      if (note.trim()) {
        text = note.trim();
      } else if ((lead.status || "new") !== status) {
        text = `${getStatus(lead.status).label} → ${getStatus(status).label}`;
      } else if (scheduleDate) {
        text = `Follow-up scheduled for ${scheduleDate.toLocaleDateString("en-IN", {
          day: "numeric", month: "short",
        })} at ${scheduleDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;
      }

      const activity = {
        type: note.trim() ? "note" : "status",
        from: lead.status || "new",
        to: status,
        text,
        createdAt: new Date(),
      };

      // ── Core fix: reset taskStatus when scheduledAt changes to a new date ──
      // This makes the Done / Missed buttons reappear for every rescheduled call.
      const prevMs = tsToMs(lead.scheduledAt);
      const newMs = scheduleDate?.getTime() ?? null;
      const scheduledChanged = prevMs !== newMs;

      await updateDoc(doc(db, "admissions", lead.id), {
        status,
        scheduledAt: scheduleDate ?? null,
        activities: arrayUnion(activity),
        ...(scheduledChanged && scheduleDate ? { taskStatus: null } : {}),
      });

      setNote("");
    } catch (err) {
      console.error(err);
      alert("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">

      {/* ── Sticky header ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-5 pt-5 pb-4 shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Lead Profile</p>
            <h2 className="mt-0.5 text-[22px] font-bold text-gray-900 leading-tight truncate">{lead.name || "No Name"}</h2>
            {createdAt && (
              <p className="text-xs text-gray-400 mt-0.5">
                {createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                {" · "}
                {createdAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </p>
            )}
          </div>
          <span className={`shrink-0 text-[11px] px-3 py-1 rounded-full font-semibold ${sc.badge}`}>
            {sc.label}
          </span>
        </div>
      </div>

      <div className="flex-1 px-5 py-4 space-y-4">

        {/* Lead ID */}
        <div className="flex items-center justify-between rounded-xl border border-[#800000]/10 bg-[#800000]/[0.03] px-4 py-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Lead ID</p>
            <p className="mt-0.5 text-base font-bold text-[#800000] tracking-wide">{lead.userId || "—"}</p>
          </div>
          <span className="text-[10px] font-semibold text-[#800000] bg-[#800000]/10 border border-[#800000]/10 rounded-full px-2.5 py-1">
            CRM Ref
          </span>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${lead.phone}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm"
          >
            <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Call
          </a>
          <a
            href={`https://wa.me/91${lead.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm"
          >
            <svg className="w-4 h-4 text-[#25D366] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Contact & course info */}
        <div className="grid grid-cols-2 gap-2">
          <InfoBlock label="Mobile" value={lead.phone} />
          <InfoBlock label="Course" value={lead.course} />
          <div className="col-span-2">
            <InfoBlock label="Branch" value={lead.branch} />
          </div>
        </div>

        {/* Current schedule (if any) */}
        {lead.scheduledAt && (
          <div className="rounded-xl border border-amber-100 bg-amber-50 px-3.5 py-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-amber-600 font-semibold mb-0.5">Scheduled Follow Up</p>
              <p className="text-sm font-semibold text-amber-800">
                {tsToDate(lead.scheduledAt)?.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                {" · "}
                {tsToDate(lead.scheduledAt)?.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            {lead.taskStatus === "done" && (
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-green-100 text-green-700 border border-green-200 font-semibold">Done</span>
            )}
            {lead.taskStatus === "missed" && (
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-red-100 text-red-700 border border-red-200 font-semibold">Missed</span>
            )}
          </div>
        )}

        <div className="border-t border-dashed border-gray-200" />

        {/* ── Update Lead form ─────────────────────────────────────────────── */}
        <div className="space-y-3.5">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Update Lead</p>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:border-[#800000]/40 focus:outline-none focus:ring-2 focus:ring-[#800000]/10 transition-all"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 flex items-center justify-between">
              Schedule Follow Up
              {scheduleDate && (
                <button
                  type="button"
                  onClick={() => setScheduleDate(null)}
                  className="text-[10px] text-red-400 hover:text-red-600 font-semibold"
                >
                  Clear date
                </button>
              )}
            </label>
            <DatePicker
              selected={scheduleDate}
              onChange={(date) => setScheduleDate(date)}
              showTimeSelect
              timeIntervals={15}
              dateFormat="Pp"
              placeholderText="Pick date & time"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:border-[#800000]/40 focus:outline-none focus:ring-2 focus:ring-[#800000]/10 transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a follow-up note or comment..."
              rows={3}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm focus:border-[#800000]/40 focus:outline-none focus:ring-2 focus:ring-[#800000]/10 resize-none transition-all"
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full rounded-xl bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white py-3 text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeadDetails;
