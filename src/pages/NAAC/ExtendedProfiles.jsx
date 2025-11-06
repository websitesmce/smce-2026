import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';

const extendedProfileData = [
  {
    title: 'Programme',
    points: [
      { id: '1.1', text: 'Number of courses offered by the institution across all programs during the year.', pdf: '/pdfs/extended/1.1.pdf' },
    ],
  },
  {
    title: 'Student',
    points: [
      { id: '2.1', text: 'Number of students during the year.', pdf: '/pdfs/extended/2.1.pdf' },
      { id: '2.2', text: 'Number of seats in Year Marked for Reserve Category as per GOI/State Government Rule during the year.', pdf: '/pdfs/extended/2.2.pdf' },
      { id: '2.3', text: 'Number of outgoing/final year students during the year.', pdf: '/pdfs/extended/2.3.pdf' },
    ],
  },
  {
    title: 'Academic',
    points: [
      { id: '3.1', text: 'Number of full-time teachers during the year.', pdf: '/pdfs/extended/3.1.pdf' },
      { id: '3.2', text: 'Number of sanctioned posts during the year.', pdf: '/pdfs/extended/3.2.pdf' },
    ],
  },
  {
    title: 'Institution',
    points: [
      { id: '4.1', text: 'Total number of classrooms and seminar halls.', pdf: '/pdfs/extended/4.1.pdf' },
      { id: '4.2', text: 'Total expenditure excluding salary during the year.', pdf: '/pdfs/extended/4.2.pdf' },
      { id: '4.3', text: 'Total number of computers on campus for academic purposes.', pdf: '/pdfs/extended/4.3.pdf' },
    ],
  },
];

function ExtendedProfiles() {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionToggle = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 mt-[90px]">
      <h1 className="text-3xl font-bold mb-8 text-center">Extended Profiles</h1>
      <div className="space-y-6">
        {extendedProfileData.map((section, idx) => (
          <div key={section.title} className="rounded-lg shadow-sm bg-white">
            <button
              className={`w-full flex justify-between items-center px-6 py-4 text-2xl font-bold rounded-lg focus:outline-none transition-colors ${
                activeSection === idx
                  ? 'bg-blue-100 text-blue-800'
                  : 'hover:bg-gray-100 text-gray-800'
              }`}
              onClick={() => handleSectionToggle(idx)}
              aria-expanded={activeSection === idx}
            >
              {section.title}
              <span className="ml-4 text-lg">{activeSection === idx ? '-' : '+'}</span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeSection === idx ? 'max-h-[1000px] px-8 py-4 opacity-100' : 'max-h-0 px-8 py-0 opacity-0'
              }`}
              aria-hidden={activeSection !== idx}
            >
              <ul className="space-y-4">
                {section.points.map((point) => (
                  <li
                    key={point.id}
                    className="flex items-center justify-between bg-gray-50 rounded-md px-4 py-3"
                  >
                    <div>
                      <span className="font-semibold mr-2">{point.id}.</span>
                      <span>{point.text}</span>
                    </div>
                    <a
                      href={point.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="View PDF"
                    >
                      <FaEye size={22} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExtendedProfiles;