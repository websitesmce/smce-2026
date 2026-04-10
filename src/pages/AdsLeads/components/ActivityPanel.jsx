import React, { useEffect, useState, useRef } from "react";
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../../../services/firebase";

function ActivityPanel({ lead }) {
  const [activities, setActivities] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (!lead) return;

    const fetchActivities = async () => {
      try {
        const q = query(
          collection(db, "activities"),
          where("leadId", "==", lead.id),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched activities:", data);
        setActivities(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchActivities();
  }, [lead]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activities]);

  const handleAddNote = async () => {
    if (!note.trim()) return;

    try {
      setLoading(true);

      await addDoc(collection(db, "activities"), {
        leadId: lead.id,
        text: note,
        type: "user",
        createdAt: serverTimestamp(),
      });

      setNote("");

      // refresh
      const snapshot = await getDocs(
        query(
          collection(db, "activities"),
          where("leadId", "==", lead.id),
          orderBy("createdAt", "desc")
        )
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setActivities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!lead) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm">
        Activity will appear here
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">

      {/* Header */}
      <div className="px-5 pt-5 mb-2">
        <h2 className="text-[16px] font-semibold text-gray-900">
          Activity
        </h2>
        <p className="text-xs text-gray-400">
          Notes & follow-ups
        </p>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-400">No activity yet</p>
        ) : (
          activities.map((item) => {
            const isUser = item.type === "user" || !item.type;

            return (
              <div
                key={item.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-[13px] shadow-sm ${
                    isUser
                      ? "bg-[#800000]/90 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  <p>{item.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      isUser ? "text-white/70" : "text-gray-400"
                    }`}
                  >
                    {item.createdAt
                      ? new Date(
                          item.createdAt.seconds
                            ? item.createdAt.seconds * 1000
                            : item.createdAt
                        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                      : ""}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="border-t px-4 py-3 bg-white sticky bottom-0">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add note..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000] resize-none"
          rows={3}
        />

        <button
          onClick={handleAddNote}
          disabled={loading}
          className="w-full bg-[#800000] text-white py-3 rounded-xl text-sm font-medium hover:opacity-90 transition mt-2"
        >
          {loading ? "Saving..." : "Add Note"}
        </button>
      </div>
    </div>
  );
}

export default ActivityPanel;