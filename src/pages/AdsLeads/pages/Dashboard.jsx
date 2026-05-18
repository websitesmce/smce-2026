import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { doc, onSnapshot, collection, query, orderBy, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../services/firebase";
import Navbar from "../components/Navbar";
import LeadTable from "../components/LeadTable";
import LeadDetails from "../components/LeadDetails";
import ActivityPanel from "../components/ActivityPanel";
import DownloadModal from "../components/DownloadModal";
import { ALL_STATUSES } from "../utils/statusConfig";

// ── Empty state ──────────────────────────────────────────────────────────────

function EmptyPanel({ icon, title, subtitle }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 px-8 text-center">
      <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500">{title}</p>
        <p className="text-xs text-gray-400 mt-1 max-w-[200px] leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}

function PersonIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function ClockIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [activeTab, setActiveTab] = useState("new");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Undo/redo stacks — each entry: { id, leadId, leadName, description, prevFields, newFields, timestamp }
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const selectedLeadUnsubRef = useRef(null);

  // ── Single real-time collection listener ─────────────────────────────────
  useEffect(() => {
    const q = query(collection(db, "admissions"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setLeads(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLeadsLoading(false);
    });
    return () => unsub();
  }, []);

  // ── Stats computed from leads (zero extra reads) ─────────────────────────
  const stats = useMemo(() => {
    const counts = { total: leads.length };
    leads.forEach((l) => {
      const s = l.status || "new";
      counts[s] = (counts[s] || 0) + 1;
    });
    return counts;
  }, [leads]);

  // ── Per-lead real-time listener ──────────────────────────────────────────
  const handleSelectLead = useCallback((lead) => {
    if (selectedLeadUnsubRef.current) selectedLeadUnsubRef.current();
    const unsub = onSnapshot(doc(db, "admissions", lead.id), (snap) => {
      if (snap.exists()) setSelectedLead({ id: snap.id, ...snap.data() });
    });
    selectedLeadUnsubRef.current = unsub;
  }, []);

  useEffect(() => () => { if (selectedLeadUnsubRef.current) selectedLeadUnsubRef.current(); }, []);

  // ── Undo / Redo history ──────────────────────────────────────────────────

  // Called by LeadDetails after a successful save
  const pushHistory = useCallback((entry) => {
    setUndoStack((prev) => [...prev.slice(-4), entry]); // keep max 5
    setRedoStack([]);
  }, []);

  // Revert a specific history entry (from the modal)
  const handleUndoEntry = useCallback(async (entry) => {
    try {
      await updateDoc(doc(db, "admissions", entry.leadId), {
        ...entry.prevFields,
        activities: arrayUnion({
          type: "status",
          from: entry.newFields.status,
          to: entry.prevFields.status,
          text: `Reverted: ${entry.description}`,
          createdAt: new Date(),
        }),
      });
      setUndoStack((prev) => prev.filter((e) => e.id !== entry.id));
      setRedoStack((prev) => [...prev.slice(-4), entry]);
    } catch (err) {
      console.error("Revert failed:", err);
    }
  }, []);

  // Re-apply the most recent undo
  const handleRedo = useCallback(async () => {
    if (!redoStack.length) return;
    const entry = redoStack[redoStack.length - 1];
    try {
      await updateDoc(doc(db, "admissions", entry.leadId), {
        ...entry.newFields,
        activities: arrayUnion({
          type: "status",
          from: entry.prevFields.status,
          to: entry.newFields.status,
          text: `Re-applied: ${entry.description}`,
          createdAt: new Date(),
        }),
      });
      setRedoStack((prev) => prev.slice(0, -1));
      setUndoStack((prev) => [...prev.slice(-4), entry]);
    } catch (err) {
      console.error("Redo failed:", err);
    }
  }, [redoStack]);

  return (
    <div className="h-screen flex flex-col bg-[#f4f6f8] overflow-hidden">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenDownload={() => setIsDownloadOpen(true)}
        undoStack={undoStack}
        redoStack={redoStack}
        onUndoEntry={handleUndoEntry}
        onRedo={handleRedo}
        isHistoryOpen={isHistoryOpen}
        onToggleHistory={() => setIsHistoryOpen((v) => !v)}
      />

      {/* ── Stats Strip ──────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 px-6 py-2 flex items-center gap-6 overflow-x-auto shrink-0">
        <div className="flex items-baseline gap-1.5 shrink-0">
          <span className="text-xl font-bold text-gray-900">{stats.total}</span>
          <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Total</span>
        </div>
        <div className="h-4 w-px bg-gray-200 shrink-0" />
        {ALL_STATUSES.map((s) => (
          <div key={s.value} className="flex items-center gap-1.5 shrink-0">
            <span className={`w-2 h-2 rounded-full ${s.dot}`} />
            <span className="text-sm font-bold text-gray-800">{stats[s.value] ?? 0}</span>
            <span className="text-xs text-gray-400">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Three-panel layout ────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 gap-3 p-3">

        {/* Lead List */}
        <div className="w-[30%] min-w-[260px] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <LeadTable
            leads={leads}
            loading={leadsLoading}
            activeTab={activeTab}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedLeadId={selectedLead?.id}
            onSelectLead={handleSelectLead}
          />
        </div>

        {/* Lead Details */}
        <div className="w-[37%] min-w-[300px] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {selectedLead ? (
            <LeadDetails lead={selectedLead} onSave={pushHistory} />
          ) : (
            <EmptyPanel
              icon={<PersonIcon className="w-5 h-5 text-gray-300" />}
              title="No lead selected"
              subtitle="Click any lead from the list to view details and manage their status."
            />
          )}
        </div>

        {/* Activity Timeline */}
        <div className="flex-1 min-w-[240px] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {selectedLead ? (
            <ActivityPanel lead={selectedLead} />
          ) : (
            <EmptyPanel
              icon={<ClockIcon className="w-5 h-5 text-gray-300" />}
              title="Activity timeline"
              subtitle="Select a lead to see the full history of calls, notes, and status changes."
            />
          )}
        </div>

      </div>

      <DownloadModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
    </div>
  );
}

export default Dashboard;
