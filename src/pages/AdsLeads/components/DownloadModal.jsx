import React, { useState } from "react";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "../../../services/firebase";
import * as XLSX from "xlsx";

function DownloadModal({ isOpen, onClose }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const formatDateKey = (date) => {
    return new Date(date).toLocaleDateString("en-CA");
  };

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

      const groupedData = {};

      snapshot.docs.forEach((docSnap) => {
        const d = docSnap.data();

        const createdDate = d.createdAt?.seconds
          ? new Date(d.createdAt.seconds * 1000)
          : new Date();

        const dateKey = formatDateKey(createdDate);

        if (!groupedData[dateKey]) {
          groupedData[dateKey] = [];
        }

        let leadStage = "Pending";

        if (d.outcome) {
          leadStage = d.outcome;
        } else if (d.status === "admission") {
          leadStage = "Admission Confirmed";
        } else if (d.status === "closed") {
          leadStage = "Dead Lead";
        }

        groupedData[dateKey].push({
          "Lead Name": d.name || "",
          "Phone Number": d.phone || "",
          "Email Address": d.email || "",
          Course: d.course || "",
          Branch: d.branch || "",
          Location: d.village || "",
          Status: d.status || "Pending",
          "Lead Stage": leadStage,
          "Follow Up Outcome": d.outcome || "Pending",
          "Scheduled Follow Up": d.scheduledAt?.seconds
            ? new Date(d.scheduledAt.seconds * 1000).toLocaleString()
            : "-",
          "Created At": createdDate.toLocaleString(),
        });
      });

      const wb = XLSX.utils.book_new();

      Object.keys(groupedData).forEach((dateKey) => {
        const ws = XLSX.utils.json_to_sheet(groupedData[dateKey]);

        XLSX.utils.book_append_sheet(
          wb,
          ws,
          dateKey.slice(0, 31)
        );
      });

      const summaryData = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();

        return {
          Name: d.name || "",
          Phone: d.phone || "",
          Course: d.course || "",
          Branch: d.branch || "",
          Status: d.status || "Pending",
          Outcome: d.outcome || "Pending",
        };
      });

      const summarySheet = XLSX.utils.json_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, summarySheet, "All Leads Summary");

      const fileName = `SMCE_Leads_${fromDate}_to_${toDate}.xlsx`;
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
            Export Leads Report
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-sm"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Download grouped Excel sheets by date with lead stages, outcomes, and follow-up details.
        </p>

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