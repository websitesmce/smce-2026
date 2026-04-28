import React, { useEffect, useRef } from "react";

const STATUS_OPTIONS = {
  new: "border-blue-300",
  followup: "border-yellow-300",
  pending: "border-orange-300",
  admission: "border-green-300",
  closed: "border-red-300",
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

  // Sort latest first
  const sortedActivities = activities.sort((a, b) => {
    const aTime = a?.createdAt?.seconds
      ? a.createdAt.seconds * 1000
      : new Date(a?.createdAt || 0).getTime();

    const bTime = b?.createdAt?.seconds
      ? b.createdAt.seconds * 1000
      : new Date(b?.createdAt || 0).getTime();

    return bTime - aTime;
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
                className={`p-4 rounded-2xl bg-white border-l-4 ${borderColor} border-t border-r border-b border-gray-100 shadow-sm hover:shadow-md transition`}
              >
                <p className="text-sm text-gray-800 leading-relaxed">
                  {act.type === "status" ? (
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">
                        {act.from} → {act.to}
                      </div>
                      {act.text && (
                        <div className="text-sm text-gray-600">
                          {act.text}
                        </div>
                      )}
                    </div>
                  ) : (
                    act.text || "No message"
                  )}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {formatDate(act.createdAt)}
                </p>
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