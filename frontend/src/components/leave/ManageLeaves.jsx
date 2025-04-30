import React, { useEffect, useState } from "react";

const ManageLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Sample static data or get from localStorage
    const data = JSON.parse(localStorage.getItem("leaves")) || [
      {
        id: 1,
        empId: "yousaf222",
        name: "yousaf",
        leaveType: "Sick Leave",
        department: "Logistic",
        days: 4,
        status: "Approved",
      },
      {
        id: 2,
        empId: "asif113",
        name: "asif",
        leaveType: "Annual Leave",
        department: "Database",
        days: 2,
        status: "Rejected",
      },
    ];
    setLeaves(data);
  }, []);

  const filteredLeaves = leaves
    .filter((leave) =>
      filter === "All" ? true : leave.status === filter
    )
    .filter((leave) =>
      leave.empId.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Manage Leaves</h2>

      <input
        type="text"
        placeholder="Search By Emp ID"
        className="mb-4 px-3 py-2 border rounded w-64"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mb-4 space-x-2">
        {["All", "Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded ${
              filter === status ? "bg-teal-600 text-white" : "bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">S No</th>
              <th className="border px-4 py-2">Emp ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Leave Type</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Days</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave, index) => (
              <tr key={leave.id} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{leave.empId}</td>
                <td className="border px-4 py-2">{leave.name}</td>
                <td className="border px-4 py-2">{leave.leaveType}</td>
                <td className="border px-4 py-2">{leave.department}</td>
                <td className="border px-4 py-2">{leave.days}</td>
                <td className="border px-4 py-2">{leave.status}</td>
                <td className="border px-4 py-2">
                  <button className="bg-teal-500 text-white px-3 py-1 rounded">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLeaves;
