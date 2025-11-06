import React from "react";
import { Link, useNavigate } from "react-router-dom";
import committeeData from "../../data/committeeData";

const committees = Object.entries(committeeData).map(([id, details]) => ({
  id,
  title: details.title,
  description: details.description,
}));

export default function CommitteesPage() {
  const navigate = useNavigate();
  return (
    <section className="pt-[120px] pb-20 px-6 sm:px-10 md:px-16 lg:px-24 bg-white text-gray-800">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">
          Institutional Committees
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Learn more about the diverse committees established at SMCE to manage and guide academic, administrative, and student-related affairs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {committees.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/committees/${item.id}`)}
            className="cursor-pointer bg-[#fdf9f9] hover:bg-[#fef1f1] border border-gray-200 rounded-xl shadow-sm p-6 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-[#0c0b0b] min-h-[3.5rem]">{item.title}</h3>
            <p className="text-gray-600 mt-2 text-sm line-clamp-3">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
