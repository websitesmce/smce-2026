import React, { useState } from "react";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "../../../services/firebase";
import * as XLSX from "xlsx";

function DownloadModal({ isOpen, onClose }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both dates");
      return;
    }

    try {
      setLoading(true);

      const start = new Date(fromDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999);

      const q = query(
        collection(db, "admissions"),
        where("createdAt", ">=", Timestamp.fromDate(start)),
        where("createdAt", "<=", Timestamp.fromDate(end))
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("No leads found for selected range");
        return;
      }

      const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          "Lead Name": d.name || "",
          "Phone Number": d.phone || "",
          "Email Address": d.email || "",
          Course: d.course || "",
          Branch: d.branch || "",
          Status: d.status || "",
          "Created At": d.createdAt?.seconds
            ? new Date(d.createdAt.seconds * 1000).toLocaleString()
            : "",
        };
      });

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Leads");

      const fileName = `leads_${fromDate}_to_${toDate}.xlsx`;
      XLSX.writeFile(wb, fileName);

      onClose();
    } catch (err) {
      console.error(err);
      alert("Download failed");
    } finally {
      setLoading(false);
    }
  };

  const setQuickRange = (type) => {
    const today = new Date();

    if (type === "today") {
      const d = today.toISOString().split("T")[0];
      setFromDate(d);
      setToDate(d);
    }

    if (type === "last7") {
      const past = new Date();
      past.setDate(today.getDate() - 7);
      setFromDate(past.toISOString().split("T")[0]);
      setToDate(today.toISOString().split("T")[0]);
    }

    if (type === "month") {
      const first = new Date(today.getFullYear(), today.getMonth(), 1);
      setFromDate(first.toISOString().split("T")[0]);
      setToDate(today.toISOString().split("T")[0]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 p-6 space-y-6 animate-fadeIn">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            Download Leads
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-sm"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 flex-wrap">
          {[
            { key: "today", label: "Today" },
            { key: "last7", label: "Last 7 Days" },
            { key: "month", label: "This Month" },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => setQuickRange(btn.key)}
              className="px-3 py-1.5 text-xs rounded-full border bg-gray-50 hover:bg-gray-100 transition"
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Date Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-[11px] text-gray-400 font-medium">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-gray-300 outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-gray-400 font-medium">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-gray-300 outline-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDownload}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md transition"
          >
            {loading ? "Downloading..." : "Download Excel"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DownloadModal;