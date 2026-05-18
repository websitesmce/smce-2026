import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";

const TABS = [
  { key: "new",       label: "All Leads"  },
  { key: "scheduled", label: "Scheduled"  },
  { key: "unlabeled", label: "Unlabeled"  },
];

// ── Relative time helper ─────────────────────────────────────────────────────

function relTime(ts) {
  if (!ts) return "";
  const diff = Date.now() - new Date(ts).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  if (mins < 1)   return "Just now";
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

// ── History Modal ────────────────────────────────────────────────────────────

function HistoryModal({ undoStack, redoStack, onUndoEntry, onRedo, onClose }) {
  const [confirmId, setConfirmId] = useState(null);

  // Newest changes first
  const undoItems = [...undoStack].reverse();
  const lastRedo  = redoStack.length > 0 ? redoStack[redoStack.length - 1] : null;

  const initials = (name = "") =>
    name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "?";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-16 right-4 z-50 w-[400px] max-h-[calc(100vh-80px)] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[15px] font-bold text-gray-900">Change History</h3>
              <p className="text-xs text-gray-400 mt-0.5">Click Revert to undo a saved change</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Keyboard hint */}
          <div className="flex items-center gap-3 mt-3">
            <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-[10px] font-mono">⌘Z</kbd>
              Quick undo
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-[10px] font-mono">⌘⇧Z</kbd>
              Quick redo
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">

          {/* Undo stack */}
          <div className="px-4 py-3">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Recent Changes
              {undoItems.length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold">
                  {undoItems.length}
                </span>
              )}
            </p>

            {undoItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
                <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-400 font-medium">No changes yet</p>
                <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed">
                  Lead updates will appear here so you can revert them.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {undoItems.map((entry, idx) => (
                  <div
                    key={entry.id}
                    className={`rounded-xl border p-3.5 transition-all ${
                      idx === 0
                        ? "border-[#800000]/20 bg-[#800000]/[0.02]"
                        : "border-gray-100 bg-gray-50/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold ${
                        idx === 0 ? "bg-[#800000]/10 text-[#800000]" : "bg-gray-100 text-gray-500"
                      }`}>
                        {initials(entry.leadName)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="text-[13px] font-semibold text-gray-900 truncate">{entry.leadName}</p>
                          <span className="text-[11px] text-gray-400 shrink-0">{relTime(entry.timestamp)}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed truncate">{entry.description}</p>

                        {/* Confirm step */}
                        {confirmId === entry.id ? (
                          <div className="mt-3 flex items-center gap-2">
                            <button
                              onClick={() => { onUndoEntry(entry); setConfirmId(null); onClose(); }}
                              className="flex-1 h-8 rounded-lg bg-[#800000] text-white text-[11px] font-semibold hover:bg-[#6a0000] transition"
                            >
                              Yes, Revert
                            </button>
                            <button
                              onClick={() => setConfirmId(null)}
                              className="px-3 h-8 rounded-lg bg-gray-100 text-gray-600 text-[11px] font-semibold hover:bg-gray-200 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmId(entry.id)}
                            className="mt-2.5 h-7 px-3 rounded-lg text-[11px] font-semibold border border-gray-200 text-gray-600 bg-white hover:border-[#800000]/30 hover:text-[#800000] hover:bg-[#800000]/5 transition"
                          >
                            Revert
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Redo section */}
          {lastRedo && (
            <div className="px-4 pb-4 border-t border-dashed border-gray-200 pt-3">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Redo Available
              </p>
              <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3.5">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] font-bold">
                    {initials(lastRedo.leadName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-[13px] font-semibold text-gray-900 truncate">{lastRedo.leadName}</p>
                      <span className="text-[11px] text-gray-400 shrink-0">{relTime(lastRedo.timestamp)}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed truncate">{lastRedo.description}</p>
                    <button
                      onClick={() => { onRedo(); onClose(); }}
                      className="mt-2.5 h-7 px-3 rounded-lg text-[11px] font-semibold border border-blue-200 text-blue-600 bg-white hover:bg-blue-50 transition"
                    >
                      Re-apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({
  activeTab = "new",
  onTabChange,
  onOpenDownload,
  undoStack = [],
  redoStack = [],
  onUndoEntry,
  onRedo,
  isHistoryOpen,
  onToggleHistory,
}) {
  const navigate = useNavigate();

  const canUndo = undoStack.length > 0;
  const canRedo = redoStack.length > 0;

  // Keyboard shortcuts: Ctrl/Cmd+Z → quick undo last, Ctrl/Cmd+Shift+Z → redo
  useEffect(() => {
    const handleKeyDown = (e) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === "z" && !e.shiftKey && canUndo) {
        e.preventDefault();
        onUndoEntry?.(undoStack[undoStack.length - 1]);
      }
      if (mod && (e.key === "y" || (e.key === "z" && e.shiftKey)) && canRedo) {
        e.preventDefault();
        onRedo?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canUndo, canRedo, undoStack, onUndoEntry, onRedo]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header className="w-full bg-white border-b border-gray-100 shadow-sm shrink-0">
        <div className="px-5 h-14 flex items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="h-8 w-8 rounded-lg overflow-hidden border border-gray-100 shadow-sm shrink-0">
              <img src={logo} alt="SMCE" className="h-full w-full object-cover" />
            </div>
            <div className="leading-none">
              <p className="text-[15px] font-bold text-[#800000]">SMCE Leads</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Admissions CRM</p>
            </div>
          </div>

          {/* Tab switcher — desktop */}
          <nav className="hidden md:flex items-center bg-gray-100 rounded-lg p-1 gap-0.5">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => onTabChange?.(tab.key)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 ${
                  activeTab === tab.key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Tab switcher — mobile */}
          <select
            className="md:hidden border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white shadow-sm focus:outline-none"
            value={activeTab}
            onChange={(e) => onTabChange?.(e.target.value)}
          >
            {TABS.map((tab) => (
              <option key={tab.key} value={tab.key}>{tab.label}</option>
            ))}
          </select>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Undo button */}
            <button
              onClick={() => canUndo && onUndoEntry?.(undoStack[undoStack.length - 1])}
              disabled={!canUndo}
              title="Undo last change (⌘Z)"
              className={`relative h-9 w-9 rounded-lg flex items-center justify-center border transition-all ${
                canUndo
                  ? "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                  : "border-transparent bg-transparent text-gray-300 cursor-not-allowed"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
              {canUndo && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#800000] text-white text-[9px] font-bold flex items-center justify-center">
                  {undoStack.length}
                </span>
              )}
            </button>

            {/* Redo button */}
            <button
              onClick={() => canRedo && onRedo?.()}
              disabled={!canRedo}
              title="Redo last change (⌘⇧Z)"
              className={`h-9 w-9 rounded-lg flex items-center justify-center border transition-all ${
                canRedo
                  ? "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                  : "border-transparent bg-transparent text-gray-300 cursor-not-allowed"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
              </svg>
            </button>

            {/* History button */}
            <button
              onClick={() => onToggleHistory?.()}
              title="Change history"
              className={`h-9 w-9 rounded-lg flex items-center justify-center border transition-all shadow-sm ${
                isHistoryOpen
                  ? "bg-[#800000] border-[#800000] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Divider */}
            <div className="h-5 w-px bg-gray-200" />

            {/* Export */}
            <button
              onClick={() => onOpenDownload?.()}
              className="flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Export
            </button>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="h-9 px-3.5 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition shadow-sm"
            >
              Sign Out
            </button>
          </div>

        </div>
      </header>

      {/* History modal */}
      {isHistoryOpen && (
        <HistoryModal
          undoStack={undoStack}
          redoStack={redoStack}
          onUndoEntry={onUndoEntry}
          onRedo={onRedo}
          onClose={() => onToggleHistory?.()}
        />
      )}
    </>
  );
}

export default Navbar;
