import React from "react";

const PreviousQuestions = () => {
  const resources = [
    {
      name: "Autonomous",
      url: "../../pdfs/Autonomous.pdf",
    },
    {
      name: "JNTU Kakinada",
      url: "../../pdfs/Autonomous.pdf",
    },
  ];

  return (
    <section className="min-h-screen pt-[120px] px-6 sm:px-10 md:px-16 lg:px-24 pb-24 bg-gradient-to-b from-white to-[#f9f9f9] text-gray-800">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#800000]">
          Previous Question Papers
        </h1>
        <p className="text-gray-600 mt-3 text-lg max-w-xl mx-auto">
          Access the archive of previous year question papers for both Autonomous and JNTU Kakinada examinations.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        {resources.map((res) => (
          <a
            key={res.name}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#800000] hover:bg-red-800 text-white px-6 py-3 rounded-md shadow-md font-semibold transition duration-300"
          >
            {res.name}
          </a>
        ))}
      </div>
    </section>
  );
};

export default PreviousQuestions;