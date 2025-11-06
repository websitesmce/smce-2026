import React, { useState } from 'react'

const membersData = [
  { name: "Dr. A. Sharma", designation: "Principal", role: "Chairperson" },
  { name: "Ms. B. Patel", designation: "Assistant Professor", role: "Coordinator" },
  { name: "Mr. C. Kumar", designation: "Student Representative", role: "Member" },
  { name: "Ms. D. Singh", designation: "External Expert", role: "Member" },
]

const reportsData = [
  { year: "2023-24", url: "#" },
  { year: "2022-23", url: "#" },
  { year: "2021-22", url: "#" },
]

function IQAC() {
  const [activeTab, setActiveTab] = useState('IQAC')

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-8">
        <button
          className={`px-6 py-2 rounded-t-md focus:outline-none transition font-semibold ${
            activeTab === 'IQAC'
              ? 'bg-blue-600 text-white font-bold'
              : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
          }`}
          onClick={() => setActiveTab('IQAC')}
        >
          IQAC
        </button>
        <button
          className={`px-6 py-2 rounded-t-md focus:outline-none transition font-semibold ${
            activeTab === 'Members'
              ? 'bg-blue-600 text-white font-bold'
              : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
          }`}
          onClick={() => setActiveTab('Members')}
        >
          Members
        </button>
        <button
          className={`px-6 py-2 rounded-t-md focus:outline-none transition font-semibold ${
            activeTab === 'Reports'
              ? 'bg-blue-600 text-white font-bold'
              : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
          }`}
          onClick={() => setActiveTab('Reports')}
        >
          A.Y Reports
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-md shadow p-6">
        {activeTab === 'IQAC' && (
          <section>
            <h1 className="text-3xl font-bold mb-4">Internal Quality Assurance Cell (IQAC)</h1>
            <p>
              The IQAC is committed to ensuring continuous improvement in all academic and administrative activities. 
              This section provides an overview of the cell's objectives, functions, and initiatives to foster a culture of quality within the institution.
            </p>
          </section>
        )}
        {activeTab === 'Members' && (
          <section>
            <h1 className="text-3xl font-bold mb-4">IQAC Members</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Designation</th>
                    <th className="px-4 py-2 text-left">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {membersData.map((member, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-2">{member.name}</td>
                      <td className="px-4 py-2">{member.designation}</td>
                      <td className="px-4 py-2">{member.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        {activeTab === 'Reports' && (
          <section>
            <h1 className="text-3xl font-bold mb-4">Annual Year Reports</h1>
            <div className="flex flex-col gap-4">
              {reportsData.map((report, idx) => (
                <a
                  key={idx}
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition w-full sm:w-auto">
                    {report.year} Report
                  </button>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default IQAC