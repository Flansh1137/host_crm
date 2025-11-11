// src/admin/pages/EmployeeManagement.jsx

import React, { useState, useEffect } from "react";

// SVG Icons (same as your code)
const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const DepartmentIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const SalaryIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const PerformanceIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const EyeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EditIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const TrophyIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [departments] = useState([
    { id: 1, name: "Sales", head: "Sales Manager" },
    { id: 2, name: "Marketing", head: "Marketing Director" },
    { id: 3, name: "Development", head: "Tech Lead" },
    { id: 4, name: "HR", head: "HR Manager" },
    { id: 5, name: "Finance", head: "Finance Controller" },
    { id: 6, name: "Operations", head: "Operations Manager" }
  ]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("performance");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [employeeTypeFilter, setEmployeeTypeFilter] = useState("all");
  const [newEmployee, setNewEmployee] = useState({
    name: "", email: "", phone: "", department: "", position: "", salary: "", joiningDate: "", status: "Active", employeeType: "Employee"
  });

  // FAKE DATA (same)
  const fakeEmployees = [ /* ... same as your code ... */ ];

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("employees");
    if (saved) setEmployees(JSON.parse(saved));
    else {
      setEmployees(fakeEmployees);
      localStorage.setItem("employees", JSON.stringify(fakeEmployees));
    }
  }, []);

  // Filter & Sort
  const filteredAndSorted = employees
    .filter(emp => {
      const search = searchTerm.toLowerCase();
      return (
        emp.name.toLowerCase().includes(search) ||
        emp.email.toLowerCase().includes(search) ||
        emp.position.toLowerCase().includes(search) ||
        emp.phone.includes(search)
      ) && (departmentFilter === "all" || emp.department === departmentFilter) &&
        (employeeTypeFilter === "all" || emp.employeeType === employeeTypeFilter);
    })
    .sort((a, b) => {
      if (sortBy === "performance") return b.performance - a.performance;
      if (sortBy === "salary") return b.salary - a.salary;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "department") {
        const dA = departments.find(d => d.id === parseInt(a.department))?.name || "";
        const dB = departments.find(d => d.id === parseInt(b.department))?.name || "";
        return dA.localeCompare(dB);
      }
      if (sortBy === "joiningDate") return new Date(b.joiningDate) - new Date(a.joiningDate);
      return 0;
    })
    .map((emp, i) => ({ ...emp, rank: i + 1 }));

  // Color Helpers
  const getRankColor = (r) => r === 1 ? "text-yellow-600 bg-yellow-50 border-yellow-200" : r <= 3 ? "text-green-600 bg-green-50 border-green-200" : "text-blue-600 bg-blue-50 border-blue-200";
  const getPerformanceColor = (p) => p >= 90 ? "text-green-600 bg-green-50 border-green-200" : p >= 80 ? "text-blue-600 bg-blue-50 border-blue-200" : p >= 70 ? "text-yellow-600 bg-yellow-50 border-yellow-200" : "text-red-600 bg-red-50 border-red-200";
  const getEmployeeTypeColor = (t) => t === "Employee" ? "text-blue-600 bg-blue-50 border-blue-200" : t === "Intern" ? "text-purple-600 bg-purple-50 border-purple-200" : "text-orange-600 bg-orange-50 border-orange-200";

  // CRUD
  const handleAdd = (e) => {
    e.preventDefault();
    const emp = {
      id: Date.now(), ...newEmployee, salary: +newEmployee.salary,
      performance: Math.floor(Math.random() * 30) + 70,
      attendance: Math.floor(Math.random() * 20) + 80
    };
    const updated = [...employees, emp];
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
    setIsAddModalOpen(false);
    setNewEmployee({ name: "", email: "", phone: "", department: "", position: "", salary: "", joiningDate: "", status: "Active", employeeType: "Employee" });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updated = employees.map(emp => emp.id === selectedEmployee.id ? { ...selectedEmployee, salary: +selectedEmployee.salary } : emp);
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
    setIsEditModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this employee?")) {
      const updated = employees.filter(e => e.id !== id);
      setEmployees(updated);
      localStorage.setItem("employees", JSON.stringify(updated));
      if (selectedEmployee?.id === id) setSelectedEmployee(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Employee Management</h1>
          <p className="text-gray-600 mt-1">Performance-based ranking & analytics</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
          {[
            { label: "Total", value: employees.length, icon: UserIcon, color: "blue" },
            { label: "Top Performers", value: employees.filter(e => e.performance >= 90).length, icon: TrophyIcon, color: "green" },
            { label: "Active Interns", value: employees.filter(e => e.employeeType === "Intern" && e.status === "Active").length, icon: DepartmentIcon, color: "purple" },
            { label: "Avg Performance", value: Math.round(employees.reduce((s, e) => s + e.performance, 0) / employees.length) + "%", icon: PerformanceIcon, color: "orange" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4 border-l-4" style={{ borderLeftColor: i === 0 ? "#3B82F6" : i === 1 ? "#10B981" : i === 2 ? "#8B5CF6" : "#F97316" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters & Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-4 md:p-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">Employees Directory</h2>
              <div className="flex flex-col md:flex-row gap-2">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-1.5 text-sm border rounded-md">
                  <option value="performance">Performance</option>
                  <option value="salary">Salary</option>
                  <option value="name">Name</option>
                  <option value="department">Department</option>
                  <option value="joiningDate">Joining Date</option>
                </select>
                <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)} className="px-3 py-1.5 text-sm border rounded-md">
                  <option value="all">All Depts</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
                <select value={employeeTypeFilter} onChange={e => setEmployeeTypeFilter(e.target.value)} className="px-3 py-1.5 text-sm border rounded-md">
                  <option value="all">All Types</option>
                  <option value="Employee">Employee</option>
                  <option value="Intern">Intern</option>
                </select>
                <div className="relative">
                  <input
                    type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-sm border rounded-md w-full md:w-48"
                  />
                  <SearchIcon className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
                </div>
                <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1">
                  <UserIcon className="w-4 h-4" /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Compact Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50 text-xs">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Rank</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">Employee</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Dept & Role</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Salary & Type</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-600">Perf</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-600">Attn</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {filteredAndSorted.map(emp => {
                  const dept = departments.find(d => d.id === parseInt(emp.department));
                  return (
                    <tr key={emp.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 text-center">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold border ${getRankColor(emp.rank)}`}>
                          #{emp.rank} {emp.rank === 1 && <TrophyIcon className="w-3 h-3 ml-1" />}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{emp.name}</div>
                            <div className="text-xs text-gray-500 truncate">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-xs">
                        <div className="font-medium">{dept?.name || "—"}</div>
                        <div className="text-gray-600 truncate">{emp.position}</div>
                      </td>
                      <td className="px-3 py-3 text-xs">
                        <div>₹{emp.salary.toLocaleString()}</div>
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium border ${getEmployeeTypeColor(emp.employeeType)}`}>
                          {emp.employeeType}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${getPerformanceColor(emp.performance)}`}>
                          {emp.performance}%
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${getPerformanceColor(emp.attendance)}`}>
                          {emp.attendance}%
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex justify-center gap-1">
                          <button onClick={() => setSelectedEmployee(emp)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="View">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button onClick={() => { setSelectedEmployee(emp); setIsEditModalOpen(true); }} className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded" title="Edit">
                            <EditIcon className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(emp.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete">
                            <DeleteIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredAndSorted.length === 0 && (
            <div className="text-center py-10 text-gray-500">No employees found</div>
          )}
        </div>

        {/* FULL DETAILED MODAL – Jaise pehle tha */}
        {selectedEmployee && !isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedEmployee.name}</h2>
                      <p className="text-blue-100">{selectedEmployee.position}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedEmployee(null)} className="text-white hover:text-blue-200">
                    <CloseIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Personal Info */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <UserIcon className="w-5 h-5 mr-2 text-gray-600" /> Personal Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Full Name</span>
                        <span className="text-gray-900 font-semibold">{selectedEmployee.name}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Email Address</span>
                        <span className="text-gray-900">{selectedEmployee.email}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Phone Number</span>
                        <span className="text-gray-900">{selectedEmployee.phone}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium">Joining Date</span>
                        <span className="text-gray-900 font-semibold">{selectedEmployee.joiningDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Department Info */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <DepartmentIcon className="w-5 h-5 mr-2 text-gray-600" /> Department & Role
                    </h3>
                    {(() => {
                      const dept = departments.find(d => d.id === parseInt(selectedEmployee.department));
                      return dept ? (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600 font-medium">Department</span>
                            <span className="text-gray-900 font-semibold">{dept.name}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600 font-medium">Head</span>
                            <span className="text-gray-900">{dept.head}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600 font-medium">Position</span>
                            <span className="text-gray-900">{selectedEmployee.position}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600 font-medium">Employee Type</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEmployeeTypeColor(selectedEmployee.employeeType)}`}>
                              {selectedEmployee.employeeType}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No department assigned</p>
                      );
                    })()}
                  </div>
                </div>

                {/* Salary & Performance */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                    <SalaryIcon className="w-5 h-5 mr-2 text-gray-600" /> Compensation & Performance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">₹{selectedEmployee.salary.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 font-medium">Monthly Salary</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-2 ${getPerformanceColor(selectedEmployee.performance)}`}>
                        {selectedEmployee.performance}%
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Performance Score</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-2 ${getPerformanceColor(selectedEmployee.attendance)}`}>
                        {selectedEmployee.attendance}%
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Attendance Rate</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => { setIsEditModalOpen(true); }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                  >
                    <EditIcon className="w-4 h-4" /> <span>Edit Employee</span>
                  </button>
                  <button
                    onClick={() => setSelectedEmployee(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {(isAddModalOpen || isEditModalOpen) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
              <h3 className="text-xl font-bold mb-4">{isAddModalOpen ? "Add" : "Edit"} Employee</h3>
              <form onSubmit={isAddModalOpen ? handleAdd : handleEdit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {["name", "email", "phone", "position", "salary", "joiningDate"].map(field => (
                    <input
                      key={field}
                      type={field.includes("Date") ? "date" : field === "email" ? "email" : field === "salary" ? "number" : "text"}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={isAddModalOpen ? newEmployee[field] : selectedEmployee[field]}
                      onChange={e => isAddModalOpen
                        ? setNewEmployee({ ...newEmployee, [field]: e.target.value })
                        : setSelectedEmployee({ ...selectedEmployee, [field]: e.target.value })
                      }
                      required
                      className="px-3 py-2 border rounded-md text-sm"
                    />
                  ))}
                  <select
                    value={isAddModalOpen ? newEmployee.department : selectedEmployee.department}
                    onChange={e => isAddModalOpen
                      ? setNewEmployee({ ...newEmployee, department: e.target.value })
                      : setSelectedEmployee({ ...selectedEmployee, department: e.target.value })
                    }
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="">Select Dept</option>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                  <select
                    value={isAddModalOpen ? newEmployee.employeeType : selectedEmployee.employeeType}
                    onChange={e => isAddModalOpen
                      ? setNewEmployee({ ...newEmployee, employeeType: e.target.value })
                      : setSelectedEmployee({ ...selectedEmployee, employeeType: e.target.value })
                    }
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="Employee">Employee</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="px-4 py-2 bg-gray-500 text-white rounded-md text-sm">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;