import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { doc, onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../../services/firebase";
import Navbar from "../components/Navbar";
import LeadTable from "../components/LeadTable";
import LeadDetails from "../components/LeadDetails";
import ActivityPanel from "../components/ActivityPanel";
import DownloadModal from "../components/DownloadModal";
import { ALL_STATUSES } from "../utils/statusConfig";

// ── Empty state ─────────────────────────────────────────────────────────────

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

  // Use a ref to hold the selected-lead unsub so handleSelectLead can be stable (no deps)
  const selectedLeadUnsubRef = useRef(null);

  // ── Single real-time collection listener ─────────────────────────────────
  // Powers both the lead list AND the stats strip — no duplicate subscriptions.
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

  // ── Per-lead real-time listener (for selected lead's live detail + activity) ─
  const handleSelectLead = useCallback((lead) => {
    if (selectedLeadUnsubRef.current) selectedLeadUnsubRef.current();
    const unsub = onSnapshot(doc(db, "admissions", lead.id), (snap) => {
      if (snap.exists()) setSelectedLead({ id: snap.id, ...snap.data() });
    });
    selectedLeadUnsubRef.current = unsub;
  }, []);

  // Cleanup on unmount
  useEffect(() => () => { if (selectedLeadUnsubRef.current) selectedLeadUnsubRef.current(); }, []);

  return (
    <div className="h-screen flex flex-col bg-[#f4f6f8] overflow-hidden">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenDownload={() => setIsDownloadOpen(true)}
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
            <LeadDetails lead={selectedLead} />
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
