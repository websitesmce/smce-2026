import { useParams } from "react-router-dom";
import committeeData from "../../data/committeeData.js";

export default function CommitteeDetails() {
  const { id } = useParams();
  const data = committeeData[id];

  if (!data) return <div className="pt-32 text-center">Committee not found.</div>;

  return (
    <section className="pt-[180px] pb-20 px-6 sm:px-10 md:px-16 lg:px-24  bg-white text-gray-800">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-[#800000]">{data.title}</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{data.description}</p>
      </div>

      {/* Download PDF */}
      {data.pdf && (
        <div className="text-center mb-8">
          <a
            href={data.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#800000] text-white py-2 px-6 rounded-md hover:bg-red-800 transition"
          >
            Download PDF
          </a>
        </div>
      )}

      {/* Extra Button (e.g., Alumni Registration) */}
      {data.button && (
        <div className="text-center mb-8">
          <a
            href={data.button.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition"
          >
            {data.button.label}
          </a>
        </div>
      )}

      {/* Functions List */}
      {data.functions && (
        <div className="max-w-3xl mx-auto space-y-3 text-gray-700 text-base leading-relaxed">
          <h2 className="text-2xl font-semibold text-[#800000] mb-4 text-center">Functions</h2>
          <ul className="space-y-2 list-disc list-inside">
            {data.functions.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Minutes & Action Taken Reports */}
      {data.minutes && (
        <div className="max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold text-[#800000] mb-4 text-center">
            Minutes & Action Taken Reports
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.minutes.map((item, index) => (
              <a
                key={index}
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-[#800000] text-white py-2 px-4 rounded-md hover:bg-red-800 transition"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}