import React, { useMemo, useState, useCallback } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../services/firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getStatus, ALL_STATUSES } from "../utils/statusConfig";

// ── Helpers ──────────────────────────────────────────────────────────────────

const toMs = (ts) =>
  ts?.seconds ? ts.seconds * 1000 : ts ? new Date(ts).getTime() : 0;

const sameDay = (a, b) =>
  new Date(a).toDateString() === new Date(b).toDateString();

// ── LeadTable ─────────────────────────────────────────────────────────────────

function LeadTable({ leads, loading, activeTab, selectedDate, setSelectedDate, selectedLeadId, onSelectLead }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  // Inline Done note: { leadId, note } | null
  const [taskInput, setTaskInput] = useState(null);

  const handlePrevDay = () => {
    setSelectedDate((d) => { const n = new Date(d); n.setDate(n.getDate() - 1); return n; });
  };
  const handleNextDay = () => {
    setSelectedDate((d) => { const n = new Date(d); n.setDate(n.getDate() + 1); return n; });
  };

  const handleTaskUpdate = async (lead, status, note = "") => {
    try {
      const activity = {
        type: "task",
        text: status === "done" ? (note.trim() || "Follow-up completed") : "Follow-up missed",
        createdAt: new Date(),
      };
      await updateDoc(doc(db, "admissions", lead.id), {
        taskStatus: status,
        activities: arrayUnion(activity),
      });
      setTaskInput(null);
    } catch (err) {
      console.error(err);
    }
  };

  // ── Filtering + sorting (memoized — only recalculates when inputs change) ──
  const filtered = useMemo(() => {
    let arr = [...leads];

    if (activeTab === "scheduled") {
      const start = new Date(selectedDate); start.setHours(0, 0, 0, 0);
      const end   = new Date(selectedDate); end.setHours(23, 59, 59, 999);
      arr = arr.filter((l) => {
        if (!l.scheduledAt) return false;
        const ms = toMs(l.scheduledAt);
        return ms >= start.getTime() && ms <= end.getTime();
      });
      arr.sort((a, b) => toMs(a.scheduledAt) - toMs(b.scheduledAt));
    } else {
      if (activeTab === "unlabeled") arr = arr.filter((l) => !l.status || l.status === "new");
      if (activeTab === "new") {
        arr.sort((a, b) => {
          const ap = !a.status || a.status === "new" ? 0 : 1;
          const bp = !b.status || b.status === "new" ? 0 : 1;
          return ap !== bp ? ap - bp : toMs(b.createdAt) - toMs(a.createdAt);
        });
      }
    }

    if (statusFilter !== "all") arr = arr.filter((l) => (l.status || "new") === statusFilter);

    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter((l) => l.name?.toLowerCase().includes(q) || l.phone?.includes(q));
    }

    return arr;
  }, [leads, activeTab, selectedDate, statusFilter, search]);

  // ── Group by date ─────────────────────────────────────────────────────────
  const groups = useMemo(() => {
    const map = {};
    filtered.forEach((lead) => {
      const src = activeTab === "scheduled" ? lead.scheduledAt : lead.createdAt;
      if (!src) return;
      const key = new Date(toMs(src)).toDateString();
      (map[key] = map[key] || []).push(lead);
    });
    return map;
  }, [filtered, activeTab]);

  const dateLabel = useCallback((key) => {
    const d = new Date(key);
    const today = new Date();
    const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1);
    if (sameDay(d, today)) return "Today";
    if (sameDay(d, tomorrow)) return "Tomorrow";
    return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  }, []);

  const isToday = sameDay(selectedDate, new Date());

  return (
    <div className="flex flex-col h-full">

      {/* ── Sticky header ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 pt-4 pb-3 space-y-3">

        {/* Date navigator */}
        {(activeTab === "scheduled" || activeTab === "new") && (
          <div className="bg-gray-50 rounded-xl p-3 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                {activeTab === "scheduled" ? "Scheduled" : "Timeline"}
              </span>
              <span className="text-sm font-bold text-gray-800">
                {isToday
                  ? "Today"
                  : selectedDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevDay}
                className="h-8 w-8 rounded-lg border border-gray-200 bg-white text-sm flex items-center justify-center hover:bg-gray-100 transition shrink-0"
              >
                &#8592;
              </button>
              <button
                onClick={() => setSelectedDate(new Date())}
                className={`flex-1 h-8 rounded-lg text-xs font-semibold transition ${
                  isToday ? "bg-[#800000] text-white" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Today
              </button>
              <DatePicker
                selected={selectedDate}
                onChange={(d) => setSelectedDate(d)}
                dateFormat="dd MMM"
                className="h-8 w-20 text-center rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#800000]/20 cursor-pointer"
              />
              <button
                onClick={handleNextDay}
                className="h-8 w-8 rounded-lg border border-gray-200 bg-white text-sm flex items-center justify-center hover:bg-gray-100 transition shrink-0"
              >
                &#8594;
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or phone..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#800000]/20 focus:border-[#800000]/30 transition"
          />
        </div>

        {/* Status filter chips */}
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition ${
              statusFilter === "all"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
            }`}
          >
            All
          </button>
          {ALL_STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border transition ${
                statusFilter === s.value
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusFilter === s.value ? "bg-white/70" : s.dot}`} />
              {s.label}
            </button>
          ))}
        </div>

        <p className="text-[11px] text-gray-400 font-medium">
          {filtered.length} lead{filtered.length !== 1 ? "s" : ""}
          {search.trim() ? ` matching "${search}"` : ""}
        </p>
      </div>

      {/* ── Lead list ──────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto py-2">
        {loading ? (
          <div className="flex items-center justify-center h-32 gap-2 text-sm text-gray-400">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading leads...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2 text-center px-6">
            <svg className="w-8 h-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-sm text-gray-400">{search.trim() ? "No results found" : "No leads"}</p>
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {Object.keys(groups).map((dateKey) => (
              <div key={dateKey}>
                <div className="px-4 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                    {dateLabel(dateKey)}
                  </span>
                </div>
                <div className="space-y-1.5 px-3">
                  {groups[dateKey].map((lead) => {
                    const sc = getStatus(lead.status);
                    const isSelected = lead.id === selectedLeadId;
                    const canAct = activeTab === "scheduled" && !lead.taskStatus;
                    const isInputOpen = taskInput?.leadId === lead.id;

                    return (
                      <div
                        key={lead.id}
                        onClick={() => !isInputOpen && onSelectLead?.(lead)}
                        className={`relative rounded-xl border overflow-hidden cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? "border-[#800000]/20 bg-[#800000]/[0.03] shadow-sm"
                            : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                        }`}
                      >
                        {/* Left color bar */}
                        <div className={`absolute inset-y-0 left-0 w-[3px] ${sc.bar}`} />

                        <div className="pl-4 pr-3.5 py-3.5">
                          {/* Name + badge */}
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h3 className="text-[13px] font-semibold text-gray-900 leading-snug truncate">
                              {lead.name || "Unnamed"}
                            </h3>
                            <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-semibold ${sc.badge}`}>
                              {sc.label}
                            </span>
                          </div>

                          {/* Course · Branch */}
                          <p className="text-[11px] text-gray-400 mb-2">
                            {[lead.course, lead.branch].filter(Boolean).join(" · ")}
                          </p>

                          {/* Phone + task result */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                              </svg>
                              <span className="text-[12px] text-gray-700 font-medium">{lead.phone || "—"}</span>
                            </div>
                            {lead.taskStatus === "done" && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-200 font-medium">Done</span>
                            )}
                            {lead.taskStatus === "missed" && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 font-medium">Missed</span>
                            )}
                          </div>

                          {/* Scheduled time */}
                          {activeTab === "scheduled" && lead.scheduledAt && (
                            <p className="text-[10px] text-gray-400 mt-1.5 font-medium">
                              {new Date(toMs(lead.scheduledAt)).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          )}

                          {/* ── Task actions (Scheduled tab only) ──────────── */}
                          {canAct && !isInputOpen && (
                            <div className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => setTaskInput({ leadId: lead.id, note: "" })}
                                className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold bg-green-100 text-green-700 hover:bg-green-200 transition"
                              >
                                Mark Done
                              </button>
                              <button
                                onClick={() => handleTaskUpdate(lead, "missed")}
                                className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition"
                              >
                                Missed
                              </button>
                            </div>
                          )}

                          {/* ── Inline note input (after "Mark Done") ──────── */}
                          {isInputOpen && (
                            <div className="mt-3 space-y-2" onClick={(e) => e.stopPropagation()}>
                              <input
                                autoFocus
                                value={taskInput.note}
                                onChange={(e) => setTaskInput((p) => ({ ...p, note: e.target.value }))}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleTaskUpdate(lead, "done", taskInput.note);
                                  if (e.key === "Escape") setTaskInput(null);
                                }}
                                placeholder="Add a note (optional)..."
                                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-green-200 transition"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleTaskUpdate(lead, "done", taskInput.note)}
                                  className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold bg-green-600 text-white hover:bg-green-700 transition"
                                >
                                  Confirm Done
                                </button>
                                <button
                                  onClick={() => setTaskInput(null)}
                                  className="px-3 py-1.5 rounded-lg text-[11px] bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeadTable;
