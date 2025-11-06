import React from "react";

function ICT() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 mt-[80px]">
      <h1 className="text-4xl md:text-5xl font-bold text-[#800000] mb-8 tracking-wide">
        ICT Enabled Teaching Learning
      </h1>

      <p className="mb-4 text-gray-700 leading-relaxed text-lg">
        <strong>ICT - Enabled Tools for effective Teaching and Learning Process:</strong>
        <br />
        The Institute follows ICT enabled teaching in addition to the traditional classroom education. 
        Subsequent efforts are taken by the institute to provide e-learning atmosphere in the classroom:
      </p>

      <ol className="list-decimal list-inside mb-6 text-gray-700 leading-relaxed space-y-3 text-lg">
        <li>
          In addition to chalk and talk method of teaching, the faculty members are using the IT enabled 
          learning tools such as PPT, Video clippings, Audio system, online sources, to expose the students 
          for advanced knowledge and practical learning.
        </li>
        <li>Classrooms are fully furnished with LCD/OHP/Computers.</li>
        <li>
          Most of the faculty use interactive methods for teaching. The major emphasis is on classroom 
          interaction in terms of research paper presentations, seminars, debates, group discussions, 
          assignments, quiz/tests/viva and laboratory work.
        </li>
      </ol>

      <p className="mb-4 text-gray-700 leading-relaxed text-lg">
        <strong>Institute premises are Wi-Fi enabled:</strong>
      </p>

      <ol className="list-decimal list-inside mb-6 text-gray-700 leading-relaxed space-y-3 text-lg">
        <li>
          Specialized computer laboratory with an internet connection has been provided to promote independent 
          learning. MAC-ID based Wi-Fi facility for access of internet is provided on individual laptop and 
          mobile devices.
        </li>
        <li>
          Well security is provided to Wi-Fi users. Its access is controlled by the system administrator.
        </li>
      </ol>

      {/* ICT Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-gray-700">
          <thead>
            <tr className="bg-[#800000] text-white text-lg">
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">S.No</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">ICT Tools and Resources</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 text-base">
              <td className="border border-gray-300 px-4 py-2 font-medium">1</td>
              <td className="border border-gray-300 px-4 py-2 font-medium">ICT Tools and Resources Available</td>
              <td className="border border-gray-300 px-4 py-2">
                LCD, OHP, e-Books, e-Journals, Internet, Wifi-Campus, Interactive Board, Statistical Softwares, Videos
              </td>
            </tr>
            <tr className="hover:bg-gray-50 text-base">
              <td className="border border-gray-300 px-4 py-2 font-medium">2</td>
              <td className="border border-gray-300 px-4 py-2 font-medium">E-Resources and Techniques Used</td>
              <td className="border border-gray-300 px-4 py-2">
                e-Books, e-Journals, Wifi - Campus, Online and Offline Videos, Educational CDs, Animation Templates
              </td>
            </tr>
            <tr className="hover:bg-gray-50 text-base">
              <td className="border border-gray-300 px-4 py-2 font-medium">3</td>
              <td className="border border-gray-300 px-4 py-2 font-medium">Number of ICT Enabled Classrooms</td>
              <td className="border border-gray-300 px-4 py-2">10</td>
            </tr>
            <tr className="hover:bg-gray-50 text-base">
              <td className="border border-gray-300 px-4 py-2 font-medium">4</td>
              <td className="border border-gray-300 px-4 py-2 font-medium">Number of Smart Classrooms</td>
              <td className="border border-gray-300 px-4 py-2">3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ICT;