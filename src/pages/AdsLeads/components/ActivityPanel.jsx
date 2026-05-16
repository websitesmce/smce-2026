import React, { useEffect, useRef } from "react";


const STATUS_OPTIONS = {
  new: "border-blue-300",
  followup: "border-yellow-300",
  pending: "border-orange-300",
  admission: "border-green-300",
  closed: "border-red-300",
};

const STATUS_LABELS = {
  new: "New",
  followup: "Follow Up",
  visit: "College Visit",
  pending: "Pending",
  admission: "Admission",
  closed: "Closed",
};

const TYPE_STYLES = {
  status: "bg-blue-50 text-blue-700 border-blue-100",
  task: "bg-green-50 text-green-700 border-green-100",
  note: "bg-gray-100 text-gray-700 border-gray-200",
  default: "bg-gray-100 text-gray-600 border-gray-200",
};

function ActivityPanel({ lead }) {
  const endRef = useRef(null);

  const activities = Array.isArray(lead?.activities)
    ? [...lead.activities]
    : [];

  // Scroll to latest activity
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activities]);

  // Format date safely
  const formatDate = (createdAt) => {
    if (!createdAt) return "Just now";

    try {
      const date = createdAt?.seconds
        ? new Date(createdAt.seconds * 1000)
        : new Date(createdAt);

      return date.toLocaleString();
    } catch {
      return "Invalid date";
    }
  };

  // Sort oldest first (chat-like flow)
  const sortedActivities = activities.sort((a, b) => {
    const aTime = a?.createdAt?.seconds
      ? a.createdAt.seconds * 1000
      : new Date(a?.createdAt || 0).getTime();

    const bTime = b?.createdAt?.seconds
      ? b.createdAt.seconds * 1000
      : new Date(b?.createdAt || 0).getTime();

    return aTime - bTime;
  });

  // Empty state when no lead selected
  if (!lead) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm">
        Activity will appear here
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col rounded-[28px] border border-gray-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] overflow-hidden">

      {/* Header */}
      <div className="border-b border-gray-100 bg-white px-6 pt-6 pb-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-semibold">
              Activity Timeline
            </p>

            <h2 className="mt-1 text-[22px] font-bold tracking-tight text-gray-900">
              Lead Updates
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Notes, follow-ups & status movements
            </p>
          </div>

          <div className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm">
            {sortedActivities.length} Activities
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 lg:px-5 py-5 space-y-4">

        {sortedActivities.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center px-6">
            <div className="rounded-full bg-white border border-gray-200 shadow-sm px-4 py-2 text-xs font-semibold tracking-wide text-gray-500">
              Timeline Empty
            </div>

            <p className="mt-4 text-sm font-medium text-gray-700">
              No activity recorded yet
            </p>

            <p className="mt-1 max-w-[240px] text-xs leading-relaxed text-gray-400">
              Follow-up updates, notes, reschedules, and admissions activity will appear here.
            </p>
          </div>
        ) : (
          sortedActivities.map((act, idx) => {
            const borderColor =
              act.type === "status"
                ? STATUS_OPTIONS[act.to] || "border-gray-200"
                : "border-gray-200";
            return (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-[24px] border-l-4 ${borderColor} border border-gray-200/80 bg-white p-5 shadow-[0_6px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)]`}
              >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-70"></div>
                <div className="space-y-2">
                  {/* Top Row */}
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      {/* Type Chip */}
                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold uppercase tracking-wide shadow-sm ${
                          TYPE_STYLES[act.type] || TYPE_STYLES.default
                        }`}
                      >
                        {act.type || "activity"}
                      </span>

                      {/* Status Transition */}
                      {act.type === "status" && (
                        <div className="flex items-center gap-1 text-xs">
                          <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-600 shadow-sm">
                            {STATUS_LABELS[act.from] || act.from}
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className="rounded-full bg-gray-900 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                            {STATUS_LABELS[act.to] || act.to}
                          </span>
                        </div>
                      )}
                    </div>

                    <span className="rounded-full bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-400 border border-gray-100">
                      {formatDate(act.createdAt)}
                    </span>
                  </div>

                  {/* Message */}
                  {act.text && (
                    <div className="rounded-2xl bg-[#fafafa] border border-gray-100 px-4 py-3 text-sm leading-relaxed text-gray-700">
                      {act.text}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Scroll anchor */}
        <div ref={endRef} />
      </div>
    </div>
  );
}

export default ActivityPanel;