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
    <div className="h-full flex flex-col bg-white">

      {/* Header */}
      <div className="px-5 pt-5 pb-2 border-b border-gray-100">
        <h2 className="text-[16px] font-semibold text-gray-900">
          Activity
        </h2>
        <p className="text-xs text-gray-400">
          Notes & follow-ups
        </p>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">

        {sortedActivities.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            No activity yet
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
                className={`p-4 rounded-2xl bg-white/90 backdrop-blur-md border-l-4 ${borderColor} border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300`}
              >
                <div className="space-y-2">
                  {/* Top Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Type Chip */}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                          TYPE_STYLES[act.type] || TYPE_STYLES.default
                        }`}
                      >
                        {act.type || "activity"}
                      </span>

                      {/* Status Transition */}
                      {act.type === "status" && (
                        <div className="flex items-center gap-1 text-xs">
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                            {STATUS_LABELS[act.from] || act.from}
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className="px-2 py-0.5 rounded bg-gray-900 text-white">
                            {STATUS_LABELS[act.to] || act.to}
                          </span>
                        </div>
                      )}
                    </div>

                    <span className="text-[11px] text-gray-400">
                      {formatDate(act.createdAt)}
                    </span>
                  </div>

                  {/* Message */}
                  {act.text && (
                    <div className="text-sm text-gray-700 leading-relaxed">
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