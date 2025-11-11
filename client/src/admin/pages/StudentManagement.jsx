// src/admin/pages/StudentManagement.jsx

import React, { useState, useEffect } from "react";

// SVG Icons (same)
const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BookIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const CurrencyIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const BellIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.24 8.56a5.97 5.97 0 01-4.66-7.11 1 1 0 00-.68-1.15 1 1 0 00-1.22.7A7.97 7.97 0 008 12a7.97 7.97 0 004.38 7.13 1 1 0 001.35-.63 1 1 0 00-.56-1.3 5.99 5.99 0 01-3.93-8.64z" />
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

const ChartIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [courses] = useState([
    { id: 1, name: "Web Development", fee: 50000, duration: "3 months" },
    { id: 2, name: "Data Science", fee: 75000, duration: "6 months" },
    { id: 3, name: "Digital Marketing", fee: 35000, duration: "2 months" },
    { id: 4, name: "Graphic Design", fee: 45000, duration: "4 months" },
  ]);
  const [reminders, setReminders] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // FULL FAKE DATA ADDED
  const fakeStudents = [
    { id: 1, name: "Aarav Sharma", email: "aarav@edu.com", phone: "+919876543201", selectedCourse: "1", totalFees: 50000, paidFees: 30000, pendingFees: 20000, enrollmentDate: "2024-01-15" },
    { id: 2, name: "Diya Patel", email: "diya@edu.com", phone: "+919876543202", selectedCourse: "2", totalFees: 75000, paidFees: 75000, pendingFees: 0, enrollmentDate: "2023-11-20" },
    { id: 3, name: "Vihaan Gupta", email: "vihaan@edu.com", phone: "+919876543203", selectedCourse: "3", totalFees: 35000, paidFees: 15000, pendingFees: 20000, enrollmentDate: "2024-02-10" },
    { id: 4, name: "Ananya Singh", email: "ananya@edu.com", phone: "+919876543204", selectedCourse: "4", totalFees: 45000, paidFees: 45000, pendingFees: 0, enrollmentDate: "2023-09-05" },
    { id: 5, name: "Arjun Kumar", email: "arjun@edu.com", phone: "+919876543205", selectedCourse: "1", totalFees: 50000, paidFees: 10000, pendingFees: 40000, enrollmentDate: "2024-03-12" },
    { id: 6, name: "Isha Verma", email: "isha@edu.com", phone: "+919876543206", selectedCourse: "2", totalFees: 75000, paidFees: 40000, pendingFees: 35000, enrollmentDate: "2023-10-18" },
    { id: 7, name: "Rohan Mehta", email: "rohan@edu.com", phone: "+919876543207", selectedCourse: "3", totalFees: 35000, paidFees: 35000, pendingFees: 0, enrollmentDate: "2024-01-25" },
    { id: 8, name: "Saanvi Joshi", email: "saanvi@edu.com", phone: "+919876543208", selectedCourse: "4", totalFees: 45000, paidFees: 20000, pendingFees: 25000, enrollmentDate: "2023-12-08" },
    { id: 9, name: "Kabir Reddy", email: "kabir@edu.com", phone: "+919876543209", selectedCourse: "1", totalFees: 50000, paidFees: 50000, pendingFees: 0, enrollmentDate: "2023-08-30" },
    { id: 10, name: "Myra Kapoor", email: "myra@edu.com", phone: "+919876543210", selectedCourse: "2", totalFees: 75000, paidFees: 25000, pendingFees: 50000, enrollmentDate: "2024-02-28" }
  ];

  const fakeAttendance = {
    1: { "2024-01-16": "present", "2024-01-17": "present", "2024-01-18": "absent", "2024-01-19": "present", "2024-01-20": "present" },
    2: { "2023-11-21": "present", "2023-11-22": "present", "2023-11-23": "present", "2023-11-24": "present", "2023-11-25": "present" },
    3: { "2024-02-11": "present", "2024-02-12": "absent", "2024-02-13": "present", "2024-02-14": "absent", "2024-02-15": "present" },
    4: { "2023-09-06": "present", "2023-09-07": "present", "2023-09-08": "present", "2023-09-09": "present", "2023-09-10": "present" },
    5: { "2024-03-13": "absent", "2024-03-14": "present", "2024-03-15": "absent", "2024-03-16": "present", "2024-03-17": "present" },
    6: { "2023-10-19": "present", "2023-10-20": "present", "2023-10-21": "absent", "2023-10-22": "present", "2023-10-23": "present" },
    7: { "2024-01-26": "present", "2024-01-27": "present", "2024-01-28": "present", "2024-01-29": "present", "2024-01-30": "present" },
    8: { "2023-12-09": "present", "2023-12-10": "absent", "2023-12-11": "present", "2023-12-12": "present", "2023-12-13": "absent" },
    9: { "2023-08-31": "present", "2023-09-01": "present", "2023-09-02": "present", "2023-09-03": "present", "2023-09-04": "present" },
    10: { "2024-02-29": "present", "2024-03-01": "absent", "2024-03-02": "present", "2024-03-03": "present", "2024-03-04": "absent" }
  };

  const fakeReminders = [
    { id: 1, studentId: 1, message: "Fee reminder: ₹20000 pending for Aarav Sharma. Course: Web Development", date: "2024-04-18", completed: false, createdAt: "2024-04-15" },
    { id: 2, studentId: 3, message: "Fee reminder: ₹20000 pending for Vihaan Gupta. Course: Digital Marketing", date: "2024-05-10", completed: false, createdAt: "2024-05-07" },
    { id: 3, studentId: 5, message: "Fee reminder: ₹40000 pending for Arjun Kumar. Course: Web Development", date: "2024-06-12", completed: false, createdAt: "2024-06-09" },
    { id: 4, studentId: 6, message: "Fee reminder: ₹35000 pending for Isha Verma. Course: Data Science", date: "2024-04-18", completed: false, createdAt: "2024-04-15" },
    { id: 5, studentId: 8, message: "Fee reminder: ₹25000 pending for Saanvi Joshi. Course: Graphic Design", date: "2024-05-08", completed: false, createdAt: "2024-05-05" },
    { id: 6, studentId: 10, message: "Fee reminder: ₹50000 pending for Myra Kapoor. Course: Data Science", date: "2024-05-28", completed: false, createdAt: "2024-05-25" }
  ];

  // Load fake data
  useEffect(() => {
    const load = (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
      if (key === "students") setStudents(data);
      if (key === "reminders") setReminders(data);
      if (key === "attendance") setAttendance(data);
    };
    load("students", fakeStudents);
    load("reminders", fakeReminders);
    load("attendance", fakeAttendance);
  }, []);

  // Filter
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phone.includes(searchTerm)
  );

  // Helpers
  const getAttPct = (sid) => {
    const rec = attendance[sid];
    if (!rec) return 0;
    const total = Object.keys(rec).length;
    const present = Object.values(rec).filter(v => v === "present").length;
    return total ? Math.round((present / total) * 100) : 0;
  };

  const getStatusColor = (pct) => pct >= 75 ? "text-green-600 bg-green-50 border-green-200" : pct >= 50 ? "text-yellow-600 bg-yellow-50 border-yellow-200" : "text-red-600 bg-red-50 border-red-200";

  const addReminder = (student) => {
    const course = courses.find(c => c.id === parseInt(student.selectedCourse));
    const newR = {
      id: Date.now(),
      studentId: student.id,
      message: `Fee reminder: ₹${student.pendingFees} pending for ${student.name}. Course: ${course?.name}`,
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      completed: false,
      createdAt: new Date().toLocaleDateString(),
    };
    const updated = [...reminders, newR];
    setReminders(updated);
    localStorage.setItem("reminders", JSON.stringify(updated));
    alert(`Reminder added for ${student.name}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Student Management</h1>
          <p className="text-gray-600 mt-1">Fees, Attendance & Reminders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
          {[
            { label: "Students", value: students.length, icon: UserIcon, color: "blue" },
            { label: "Courses", value: courses.length, icon: BookIcon, color: "green" },
            { label: "Pending Fees", value: `₹${students.reduce((s, st) => s + st.pendingFees, 0).toLocaleString()}`, icon: CurrencyIcon, color: "purple" },
            { label: "Reminders", value: reminders.filter(r => !r.completed).length, icon: BellIcon, color: "orange" }
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

        {/* Table - Compact */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-4 md:p-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">Students Directory</h2>
              <div className="relative">
                <input
                  type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-sm border rounded-md w-full md:w-48"
                />
                <SearchIcon className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50 text-xs">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">Student</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Course</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Fees</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-600">Attn</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-600">Rem</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {filtered.map(s => {
                  const course = courses.find(c => c.id === parseInt(s.selectedCourse));
                  const attPct = getAttPct(s.id);
                  const pendingRem = reminders.filter(r => r.studentId === s.id && !r.completed).length;
                  return (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {s.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{s.name}</div>
                            <div className="text-xs text-gray-500 truncate">{s.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-xs">
                        <div className="font-medium">{course?.name || "—"}</div>
                        <div className="text-gray-600">{course?.duration}</div>
                      </td>
                      <td className="px-3 py-3 text-xs">
                        <div>₹{s.totalFees.toLocaleString()}</div>
                        <div className={s.pendingFees > 0 ? "text-red-600" : "text-green-600"}>₹{s.pendingFees.toLocaleString()}</div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(attPct)}`}>
                          {attPct}%
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        {pendingRem > 0 ? (
                          <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs font-medium">
                            {pendingRem}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex justify-center gap-1">
                          <button onClick={() => setSelectedStudent(s)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="View">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button onClick={() => addReminder(s)} className="p-1.5 text-purple-600 hover:bg-purple-50 rounded" title="Reminder">
                            <BellIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-500">No students found</div>
          )}
        </div>

        {/* FULL DETAILED MODAL */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedStudent.name}</h2>
                      <p className="text-blue-100">Student Details</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedStudent(null)} className="text-white hover:text-blue-200">
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
                        <span className="text-gray-900 font-semibold">{selectedStudent.name}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Email Address</span>
                        <span className="text-gray-900">{selectedStudent.email}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Phone Number</span>
                        <span className="text-gray-900">{selectedStudent.phone}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium">Enrollment Date</span>
                        <span className="text-gray-900 font-semibold">{selectedStudent.enrollmentDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <BookIcon className="w-5 h-5 mr-2 text-gray-600" /> Course Information
                    </h3>
                    {(() => {
                      const course = courses.find(x => x.id === parseInt(selectedStudent.selectedCourse));
                      return course ? (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600 font-medium">Course Name</span>
                            <span className="text-gray-900 font-semibold">{course.name}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600 font-medium">Duration</span>
                            <span className="text-gray-900">{course.duration}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600 font-medium">Course Fee</span>
                            <span className="text-green-600 font-semibold">₹{course.fee.toLocaleString()}</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No course assigned</p>
                      );
                    })()}
                  </div>
                </div>

                {/* Financial Overview */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                    <CurrencyIcon className="w-5 h-5 mr-2 text-gray-600" /> Financial Overview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">₹{selectedStudent.totalFees.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 font-medium">Total Course Fee</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">₹{selectedStudent.paidFees.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 font-medium">Amount Paid</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-2 ${selectedStudent.pendingFees > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ₹{selectedStudent.pendingFees.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Pending Balance</div>
                    </div>
                  </div>
                </div>

                {/* Performance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <ChartIcon className="w-5 h-5 mr-2 text-gray-600" /> Attendance Summary
                    </h3>
                    <div className="text-center">
                      <div className={`text-5xl font-bold mb-3 ${getStatusColor(getAttPct(selectedStudent.id))}`}>
                        {getAttPct(selectedStudent.id)}%
                      </div>
                      <div className="text-sm text-gray-600">Overall Attendance Rate</div>
                      <div className="mt-3 text-xs text-gray-500">
                        Based on {Object.keys(attendance[selectedStudent.id] || {}).length} class days
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <BellIcon className="w-5 h-5 mr-2 text-gray-600" /> Reminders Status
                    </h3>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-orange-600 mb-3">
                        {reminders.filter(r => r.studentId === selectedStudent.id && !r.completed).length}
                      </div>
                      <div className="text-sm text-gray-600">Active Reminders</div>
                      <div className="mt-3 text-xs text-gray-500">Pending fee and follow-up reminders</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => addReminder(selectedStudent)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                  >
                    <BellIcon className="w-4 h-4" /> <span>Add Fee Reminder</span>
                  </button>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagement;