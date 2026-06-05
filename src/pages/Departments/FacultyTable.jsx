import React, { useState } from "react";
import { Search } from "lucide-react";

export default function FacultyTable({ faculty, departmentName }) {
  const [search, setSearch] = useState("");
  const [filterDesignation, setFilterDesignation] = useState("All");

  const designations = ["All", ...new Set(faculty.map((f) => f.designation))];

  const filtered = faculty.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.qualification.toLowerCase().includes(search.toLowerCase());
    const matchDesignation =
      filterDesignation === "All" || f.designation === filterDesignation;
    return matchSearch && matchDesignation;
  });

  const counts = {
    Professor: faculty.filter((f) => f.designation === "Professor").length,
    "Associate Professor": faculty.filter(
      (f) => f.designation === "Associate Professor"
    ).length,
    "Assistant Professor": faculty.filter(
      (f) => f.designation === "Assistant Professor"
    ).length,
  };

  return (
    <div className="space-y-10 text-gray-800">
      <div className="text-center space-y-3">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">
          Faculty
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          Meet our dedicated and experienced teaching staff of the{" "}
          {departmentName} department.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
        <div className="bg-[#800000] text-white rounded-xl p-4 text-center shadow-md">
          <p className="text-3xl font-bold">{faculty.length}</p>
          <p className="text-sm mt-1 opacity-90">Total Faculty</p>
        </div>
        <div className="bg-white border border-[#800000] rounded-xl p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-[#800000]">{counts.Professor}</p>
          <p className="text-sm mt-1 text-gray-600">Professors</p>
        </div>
        <div className="bg-white border border-[#800000] rounded-xl p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-[#800000]">
            {counts["Associate Professor"]}
          </p>
          <p className="text-sm mt-1 text-gray-600">Associate Profs.</p>
        </div>
        <div className="bg-white border border-[#800000] rounded-xl p-4 text-center shadow-sm">
          <p className="text-3xl font-bold text-[#800000]">
            {counts["Assistant Professor"]}
          </p>
          <p className="text-sm mt-1 text-gray-600">Assistant Profs.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name or qualification..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#800000] focus:ring-1 focus:ring-[#800000]"
          />
        </div>
        <select
          value={filterDesignation}
          onChange={(e) => setFilterDesignation(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#800000] bg-white"
        >
          {designations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-[#800000] text-white text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 w-12">S.No.</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Designation</th>
              <th className="px-4 py-3">Qualification</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-gray-400 italic"
                >
                  No faculty found matching your search.
                </td>
              </tr>
            ) : (
              filtered.map((f, i) => (
                <tr
                  key={i}
                  className={`border-b border-gray-100 hover:bg-[#fff5f5] transition-colors ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                  }`}
                >
                  <td className="px-4 py-3 text-gray-500 font-medium">
                    {i + 1}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {f.name}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        f.designation === "Professor"
                          ? "bg-red-100 text-[#800000]"
                          : f.designation === "Associate Professor"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {f.designation}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{f.qualification}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <p className="text-sm text-gray-400 text-center">
          Showing {filtered.length} of {faculty.length} faculty members
        </p>
      )}
    </div>
  );
}
