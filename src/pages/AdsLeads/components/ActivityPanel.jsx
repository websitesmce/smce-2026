import React, { useEffect, useRef, useMemo, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { getStatus } from "../utils/statusConfig";

// ── Config ────────────────────────────────────────────────────────────────────

const TYPE_CONFIG = {
  status: { label: "Status Change", cls: "bg-blue-50 text-blue-700 border-blue-200" },
  task:   { label: "Task",          cls: "bg-green-50 text-green-700 border-green-200" },
  note:   { label: "Note",          cls: "bg-amber-50 text-amber-700 border-amber-200" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const toMs = (ts) =>
  ts?.seconds ? ts.seconds * 1000 : ts ? new Date(ts).getTime() : 0;

function relativeTime(ts) {
  if (!ts) return "Just now";
  try {
    const d = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
    const diff = Date.now() - d.getTime();
    const mins  = Math.floor(diff / 60_000);
    const hours = Math.floor(diff / 3_600_000);
    const days  = Math.floor(diff / 86_400_000);
    if (mins < 1)   return "Just now";
    if (mins < 60)  return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7)   return `${days}d ago`;
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  } catch {
    return "—";
  }
}

// ── ActivityPanel ─────────────────────────────────────────────────────────────

function ActivityPanel({ lead }) {
  const bottomRef = useRef(null);
  const [confirmIdx, setConfirmIdx] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const sorted = useMemo(() => {
    if (!Array.isArray(lead?.activities)) return [];
    return [...lead.activities].sort((a, b) => toMs(a.createdAt) - toMs(b.createdAt));
  }, [lead?.activities]);

  // Auto-scroll to latest entry
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sorted.length]);

  // Clear confirm state when lead changes
  useEffect(() => {
    setConfirmIdx(null);
  }, [lead?.id]);

  const handleDelete = async (sortedIdx) => {
    setDeleting(true);
    try {
      // Filter out the entry at sortedIdx and write the full array back
      const updated = sorted.filter((_, i) => i !== sortedIdx);
      await updateDoc(doc(db, "admissions", lead.id), { activities: updated });
      setConfirmIdx(null);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  if (!lead) return null;

  return (
    <div className="flex flex-col h-full">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 px-5 pt-5 pb-4 shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Activity Timeline</p>
            <h2 className="mt-0.5 text-[17px] font-bold text-gray-900 truncate">{lead.name || "—"}</h2>
          </div>
          <span className="shrink-0 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-500">
            {sorted.length} {sorted.length === 1 ? "entry" : "entries"}
          </span>
        </div>
      </div>

      {/* ── Timeline ───────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">No activity yet</p>
              <p className="text-xs text-gray-400 mt-0.5 max-w-[180px] leading-relaxed">
                Status changes, notes, and call outcomes will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {sorted.map((act, idx) => {
              const isLatest  = idx === sorted.length - 1;
              const isConfirm = confirmIdx === idx;
              const typeCfg   = TYPE_CONFIG[act.type] ?? { label: "Activity", cls: "bg-gray-100 text-gray-600 border-gray-200" };
              const fromSc    = act.from ? getStatus(act.from) : null;
              const toSc      = act.to   ? getStatus(act.to)   : null;
              const changed   = act.type === "status" && act.from !== act.to;

              return (
                <div
                  key={idx}
                  className={`group rounded-xl border bg-white p-4 shadow-sm transition-all ${
                    isConfirm
                      ? "border-red-200 ring-1 ring-red-100"
                      : isLatest
                      ? "border-[#800000]/20 ring-1 ring-[#800000]/10 hover:shadow-md"
                      : "border-gray-200 hover:shadow-md"
                  }`}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Type chip */}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${typeCfg.cls}`}>
                        {typeCfg.label}
                      </span>

                      {/* Status transition */}
                      {changed && fromSc && toSc && (
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${fromSc.badge}`}>
                            {fromSc.label}
                          </span>
                          <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${toSc.badge}`}>
                            {toSc.label}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right: timestamp + delete button */}
                    <div className="flex items-center gap-2 shrink-0">
                      {isLatest && !isConfirm && (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#800000] bg-[#800000]/10 px-2 py-0.5 rounded-full border border-[#800000]/10">
                          Latest
                        </span>
                      )}
                      <span className="text-[11px] text-gray-400 font-medium">{relativeTime(act.createdAt)}</span>

                      {/* X button — visible on hover or when confirming */}
                      {!isConfirm && (
                        <button
                          onClick={() => setConfirmIdx(idx)}
                          title="Delete this entry"
                          className="opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Activity text */}
                  {act.text && !isConfirm && (
                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                      {act.text}
                    </p>
                  )}

                  {/* Inline delete confirmation */}
                  {isConfirm && (
                    <div className="mt-1">
                      <p className="text-xs text-red-600 font-medium mb-2.5">
                        Delete this activity entry? This can't be undone.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(idx)}
                          disabled={deleting}
                          className="flex-1 h-7 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[11px] font-semibold transition disabled:opacity-60"
                        >
                          {deleting ? "Deleting…" : "Yes, Delete"}
                        </button>
                        <button
                          onClick={() => setConfirmIdx(null)}
                          disabled={deleting}
                          className="px-3 h-7 rounded-lg bg-gray-100 text-gray-600 text-[11px] font-semibold hover:bg-gray-200 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default ActivityPanel;
