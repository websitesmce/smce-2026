export const STATUS = {
  new: {
    label: "New",
    badge: "bg-blue-100 text-blue-700 border border-blue-200",
    dot: "bg-blue-400",
    bar: "bg-blue-400",
    activityBorder: "border-l-blue-300",
  },
  followup: {
    label: "Follow Up",
    badge: "bg-amber-100 text-amber-700 border border-amber-200",
    dot: "bg-amber-400",
    bar: "bg-amber-400",
    activityBorder: "border-l-amber-300",
  },
  visit: {
    label: "College Visit",
    badge: "bg-purple-100 text-purple-700 border border-purple-200",
    dot: "bg-purple-400",
    bar: "bg-purple-400",
    activityBorder: "border-l-purple-300",
  },
  pending: {
    label: "Pending",
    badge: "bg-orange-100 text-orange-700 border border-orange-200",
    dot: "bg-orange-400",
    bar: "bg-orange-400",
    activityBorder: "border-l-orange-300",
  },
  admission: {
    label: "Admitted",
    badge: "bg-green-100 text-green-700 border border-green-200",
    dot: "bg-green-500",
    bar: "bg-green-500",
    activityBorder: "border-l-green-400",
  },
  closed: {
    label: "Closed",
    badge: "bg-red-100 text-red-700 border border-red-200",
    dot: "bg-red-400",
    bar: "bg-red-400",
    activityBorder: "border-l-red-300",
  },
};

export const getStatus = (key) => STATUS[key || "new"] ?? STATUS.new;

export const ALL_STATUSES = Object.entries(STATUS).map(([value, cfg]) => ({
  value,
  ...cfg,
}));

export const STATUS_OPTIONS = ALL_STATUSES.map(({ value, label }) => ({ value, label }));
