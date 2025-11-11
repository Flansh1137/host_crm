// src/admin/pages/AttendanceManagement.jsx

import React, { useState, useEffect } from "react";

// Professional Icons as SVG Components
const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CloseIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const UsersIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ChartIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const DownloadIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const FilterIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
  </svg>
);

const AttendanceManagement = () => {
  const [attendance, setAttendance] = useState({});
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("daily"); // daily, monthly, student
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState("present");

  // FAKE STUDENT DATA
  const fakeStudents = [
    { id: 1, name: "Aarav Sharma", email: "aarav@email.com", phone: "+919876543210", selectedCourse: "1" },
    { id: 2, name: "Priya Patel", email: "priya@email.com", phone: "+918765432109", selectedCourse: "2" },
    { id: 3, name: "Rohan Kumar", email: "rohan@email.com", phone: "+917654321098", selectedCourse: "3" },
    { id: 4, name: "Sneha Gupta", email: "sneha@email.com", phone: "+916543210987", selectedCourse: "4" },
    { id: 5, name: "Vikram Singh", email: "vikram@email.com", phone: "+919432109876", selectedCourse: "1" },
    { id: 6, name: "Ananya Reddy", email: "ananya@email.com", phone: "+918321098765", selectedCourse: "2" },
    { id: 7, name: "Karthik Iyer", email: "karthik@email.com", phone: "+917210987654", selectedCourse: "3" },
    { id: 8, name: "Meera Joshi", email: "meera@email.com", phone: "+916109876543", selectedCourse: "4" },
    { id: 9, name: "Arjun Malhotra", email: "arjun@email.com", phone: "+915098765432", selectedCourse: "1" },
    { id: 10, name: "Divya Choudhary", email: "divya@email.com", phone: "+914987654321", selectedCourse: "2" }
  ];

  // FAKE COURSE DATA
  const fakeCourses = [
    { id: 1, name: "Web Development" },
    { id: 2, name: "Data Science" },
    { id: 3, name: "Digital Marketing" },
    { id: 4, name: "Graphic Design" }
  ];

  // FAKE ATTENDANCE DATA
  const fakeAttendance = {
    1: { 
      "2024-03-01": "present", "2024-03-02": "present", "2024-03-03": "absent", 
      "2024-03-04": "present", "2024-03-05": "present", "2024-03-06": "late",
      "2024-03-07": "present", "2024-03-08": "absent", "2024-03-09": "present"
    },
    2: { 
      "2024-03-01": "present", "2024-03-02": "present", "2024-03-03": "present", 
      "2024-03-04": "present", "2024-03-05": "late", "2024-03-06": "present",
      "2024-03-07": "present", "2024-03-08": "present", "2024-03-09": "present"
    },
    3: { 
      "2024-03-01": "absent", "2024-03-02": "present", "2024-03-03": "present", 
      "2024-03-04": "absent", "2024-03-05": "present", "2024-03-06": "present",
      "2024-03-07": "late", "2024-03-08": "present", "2024-03-09": "absent"
    },
    4: { 
      "2024-03-01": "present", "2024-03-02": "present", "2024-03-03": "present", 
      "2024-03-04": "present", "2024-03-05": "present", "2024-03-06": "present",
      "2024-03-07": "present", "2024-03-08": "present", "2024-03-09": "present"
    },
    5: { 
      "2024-03-01": "present", "2024-03-02": "absent", "2024-03-03": "present", 
      "2024-03-04": "present", "2024-03-05": "present", "2024-03-06": "late",
      "2024-03-07": "present", "2024-03-08": "present", "2024-03-09": "present"
    },
    6: { 
      "2024-03-01": "present", "2024-03-02": "present", "2024-03-03": "present", 
      "2024-03-04": "present", "2024-03-05": "present", "2024-03-06": "present",
      "2024-03-07": "present", "2024-03-08": "present", "2024-03-09": "present"
    },
    7: { 
      "2024-03-01": "present", "2024-03-02": "present", "2024-03-03": "absent", 
      "2024-03-04": "present", "2024-03-05": "late", "2024-03-06": "present",
      "2024-03-07": "present", "2024-03-08": "present", "2024-03-09": "present"
    },
    8: { 
      "2024-03-01": "absent", "2024-03-02": "absent", "2024-03-03": "present", 
      "2024-03-04": "present", "2024-03-05": "present", "2024-03-06": "late",
      "2024-03-07": "present", "2024-03-08": "present", "2024-03-09": "present"
    },
    9: { 
      "2024-03-01": "present", "2024-03-02": "present", "2024-03-03": "present", 
      "2024-03-04": "present", "2024-03-05": "present", "2024-03-06": "present",
      "2024-03-07": "present", "2024-03-08": "present", "2024-03-09": "present"
    },
    10: { 
      "2024-03-01": "present", "2024-03-02": "present", "2024-03-03": "present", 
      "2024-03-04": "absent", "2024-03-05": "present", "2024-03-06": "present",
      "2024-03-07": "present", "2024-03-08": "late", "2024-03-09": "present"
    }
  };

  // FORCE LOAD FAKE DATA
  useEffect(() => {
    const savedAttendance = localStorage.getItem("attendance");
    const savedStudents = localStorage.getItem("students");
    const savedCourses = localStorage.getItem("courses");

    if (savedAttendance) {
      setAttendance(JSON.parse(savedAttendance));
    } else {
      setAttendance(fakeAttendance);
      localStorage.setItem("attendance", JSON.stringify(fakeAttendance));
    }

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    } else {
      setStudents(fakeStudents);
      localStorage.setItem("students", JSON.stringify(fakeStudents));
    }

    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      setCourses(fakeCourses);
      localStorage.setItem("courses", JSON.stringify(fakeCourses));
    }
  }, []);

  // Filter students based on search and course
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = selectedCourse === "all" || student.selectedCourse === selectedCourse;
    
    return matchesSearch && matchesCourse;
  });

  // Get attendance status for a student on selected date
  const getAttendanceStatus = (studentId, date = selectedDate) => {
    return attendance[studentId]?.[date] || "not marked";
  };

  // Mark attendance for a student
  const markAttendance = (studentId, status) => {
    const updatedAttendance = {
      ...attendance,
      [studentId]: {
        ...attendance[studentId],
        [selectedDate]: status
      }
    };
    setAttendance(updatedAttendance);
    localStorage.setItem("attendance", JSON.stringify(updatedAttendance));
  };

  // Bulk mark attendance for all filtered students
  const bulkMarkAttendance = () => {
    const updatedAttendance = { ...attendance };
    
    filteredStudents.forEach(student => {
      updatedAttendance[student.id] = {
        ...updatedAttendance[student.id],
        [selectedDate]: bulkStatus
      };
    });
    
    setAttendance(updatedAttendance);
    localStorage.setItem("attendance", JSON.stringify(updatedAttendance));
    setIsBulkModalOpen(false);
  };

  // Calculate attendance statistics
  const getAttendanceStats = () => {
    const totalStudents = filteredStudents.length;
    let present = 0;
    let absent = 0;
    let late = 0;
    let notMarked = 0;

    filteredStudents.forEach(student => {
      const status = getAttendanceStatus(student.id);
      switch (status) {
        case "present":
          present++;
          break;
        case "absent":
          absent++;
          break;
        case "late":
          late++;
          break;
        default:
          notMarked++;
      }
    });

    return {
      total: totalStudents,
      present,
      absent,
      late,
      notMarked,
      presentPercentage: totalStudents > 0 ? Math.round((present / totalStudents) * 100) : 0
    };
  };

  // Get student attendance summary
  const getStudentAttendanceSummary = (studentId) => {
    const studentAttendance = attendance[studentId] || {};
    const dates = Object.keys(studentAttendance);
    const presentDays = dates.filter(date => studentAttendance[date] === "present").length;
    const lateDays = dates.filter(date => studentAttendance[date] === "late").length;
    const totalDays = dates.length;
    
    return {
      totalDays,
      presentDays,
      lateDays,
      absentDays: totalDays - presentDays - lateDays,
      attendancePercentage: totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0
    };
  };

  // Get recent dates for attendance history
  const getRecentDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates.reverse();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present": return "text-green-600 bg-green-50 border-green-200";
      case "absent": return "text-red-600 bg-red-50 border-red-200";
      case "late": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "present": return <CheckIcon className="w-4 h-4" />;
      case "absent": return <CloseIcon className="w-4 h-4" />;
      case "late": return <span className="text-xs">⏰</span>;
      default: return <span className="text-xs">-</span>;
    }
  };

  const stats = getAttendanceStats();
  const recentDates = getRecentDates();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Attendance Management</h1>
          <p className="text-gray-600 text-lg">Track and manage student attendance efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Present Today</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.present}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Absent Today</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.absent}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <CloseIcon className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Attendance Rate</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.presentPercentage}%</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <ChartIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              {/* Date Selector */}
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-gray-600" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Course Filter */}
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>

              {/* View Mode */}
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="daily">Daily View</option>
                <option value="monthly">Monthly View</option>
                <option value="student">Student View</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <SearchIcon className="w-4 h-4" />
                </div>
              </div>

              {/* Bulk Actions */}
              <button
                onClick={() => setIsBulkModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <CheckIcon className="w-4 h-4" />
                <span>Bulk Mark</span>
              </button>

              {/* Export */}
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                <DownloadIcon className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {viewMode === "daily" ? "Daily Attendance" : 
                   viewMode === "monthly" ? "Monthly Overview" : "Student Attendance"}
                </h2>
                <p className="text-gray-600 mt-1">
                  {viewMode === "daily" ? `Attendance for ${selectedDate}` :
                   viewMode === "monthly" ? "Monthly attendance statistics" :
                   "Individual student attendance records"}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Present</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Absent</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>Late</span>
                </div>
              </div>
            </div>
          </div>

          {/* Daily View Table */}
          {viewMode === "daily" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student Information</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Attendance Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Overall Attendance</th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map(student => {
                    const course = courses.find(c => c.id === parseInt(student.selectedCourse));
                    const status = getAttendanceStatus(student.id);
                    const summary = getStudentAttendanceSummary(student.id);

                    return (
                      <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-200">
                        {/* Student Information */}
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            </div>
                            <div>
                              <div className="text-lg font-semibold text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-600 mt-1">{student.email}</div>
                              <div className="text-sm text-gray-500">{student.phone}</div>
                            </div>
                          </div>
                        </td>

                        {/* Course */}
                        <td className="px-6 py-6">
                          <div className="text-sm font-medium text-gray-900">{course?.name || "Not Assigned"}</div>
                        </td>

                        {/* Attendance Status */}
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-3">
                            <div className={`px-3 py-2 rounded-full border flex items-center space-x-2 ${getStatusColor(status)}`}>
                              {getStatusIcon(status)}
                              <span className="text-sm font-semibold capitalize">{status}</span>
                            </div>
                          </div>
                        </td>

                        {/* Overall Attendance */}
                        <td className="px-6 py-6">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">Overall:</span>
                              <span className="font-semibold">{summary.attendancePercentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-green-500"
                                style={{ width: `${summary.attendancePercentage}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {summary.presentDays}/{summary.totalDays} days
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => markAttendance(student.id, "present")}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1"
                            >
                              <CheckIcon className="w-4 h-4" />
                              <span className="text-sm">Present</span>
                            </button>
                            <button
                              onClick={() => markAttendance(student.id, "absent")}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1"
                            >
                              <CloseIcon className="w-4 h-4" />
                              <span className="text-sm">Absent</span>
                            </button>
                            <button
                              onClick={() => markAttendance(student.id, "late")}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1"
                            >
                              <span className="text-sm">Late</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Monthly View */}
          {viewMode === "monthly" && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
                      {recentDates.map(date => (
                        <th key={date} className="px-3 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          {new Date(date).getDate()}
                        </th>
                      ))}
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Overall</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStudents.slice(0, 10).map(student => {
                      const summary = getStudentAttendanceSummary(student.id);
                      
                      return (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-xs text-gray-500">
                              {courses.find(c => c.id === parseInt(student.selectedCourse))?.name}
                            </div>
                          </td>
                          
                          {recentDates.map(date => {
                            const status = getAttendanceStatus(student.id, date);
                            return (
                              <td key={date} className="px-3 py-4 text-center">
                                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                                  status === "present" ? "bg-green-100 text-green-800" :
                                  status === "absent" ? "bg-red-100 text-red-800" :
                                  status === "late" ? "bg-yellow-100 text-yellow-800" :
                                  "bg-gray-100 text-gray-800"
                                }`}>
                                  {getStatusIcon(status)}
                                </div>
                              </td>
                            );
                          })}
                          
                          <td className="px-6 py-4">
                            <div className="text-sm font-semibold text-gray-900">
                              {summary.attendancePercentage}%
                            </div>
                            <div className="text-xs text-gray-500">
                              {summary.presentDays}/{summary.totalDays}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Student View */}
          {viewMode === "student" && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map(student => {
                  const course = courses.find(c => c.id === parseInt(student.selectedCourse));
                  const summary = getStudentAttendanceSummary(student.id);
                  
                  return (
                    <div 
                      key={student.id}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-600">{course?.name}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Attendance Rate</span>
                          <span className={`text-lg font-bold ${
                            summary.attendancePercentage >= 80 ? "text-green-600" :
                            summary.attendancePercentage >= 60 ? "text-yellow-600" : "text-red-600"
                          }`}>
                            {summary.attendancePercentage}%
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              summary.attendancePercentage >= 80 ? "bg-green-500" :
                              summary.attendancePercentage >= 60 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                            style={{ width: `${summary.attendancePercentage}%` }}
                          ></div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="bg-green-100 text-green-800 py-1 rounded">
                            {summary.presentDays} Present
                          </div>
                          <div className="bg-red-100 text-red-800 py-1 rounded">
                            {summary.absentDays} Absent
                          </div>
                          <div className="bg-yellow-100 text-yellow-800 py-1 rounded">
                            {summary.lateDays} Late
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <UsersIcon className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No students found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Mark Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Bulk Mark Attendance</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Mark all filtered students as:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setBulkStatus("present")}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      bulkStatus === "present" 
                        ? "border-green-500 bg-green-50 text-green-700" 
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <CheckIcon className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm font-medium">Present</span>
                  </button>
                  <button
                    onClick={() => setBulkStatus("absent")}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      bulkStatus === "absent" 
                        ? "border-red-500 bg-red-50 text-red-700" 
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <CloseIcon className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm font-medium">Absent</span>
                  </button>
                  <button
                    onClick={() => setBulkStatus("late")}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      bulkStatus === "late" 
                        ? "border-yellow-500 bg-yellow-50 text-yellow-700" 
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg mx-auto mb-1">⏰</span>
                    <span className="text-sm font-medium">Late</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  This will mark <strong>{filteredStudents.length} students</strong> as <strong>{bulkStatus}</strong> for <strong>{selectedDate}</strong>.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsBulkModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={bulkMarkAttendance}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Confirm Bulk Mark
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedStudent.name}</h2>
                    <p className="text-blue-100">
                      {courses.find(c => c.id === parseInt(selectedStudent.selectedCourse))?.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-white hover:text-blue-200 transition-colors duration-200"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Attendance Summary */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Summary</h3>
                  {(() => {
                    const summary = getStudentAttendanceSummary(selectedStudent.id);
                    return (
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className={`text-4xl font-bold mb-2 ${
                            summary.attendancePercentage >= 80 ? "text-green-600" :
                            summary.attendancePercentage >= 60 ? "text-yellow-600" : "text-red-600"
                          }`}>
                            {summary.attendancePercentage}%
                          </div>
                          <div className="text-sm text-gray-600">Overall Attendance Rate</div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="bg-green-100 rounded-lg p-3">
                            <div className="text-xl font-bold text-green-700">{summary.presentDays}</div>
                            <div className="text-xs text-green-600">Present</div>
                          </div>
                          <div className="bg-red-100 rounded-lg p-3">
                            <div className="text-xl font-bold text-red-700">{summary.absentDays}</div>
                            <div className="text-xs text-red-600">Absent</div>
                          </div>
                          <div className="bg-yellow-100 rounded-lg p-3">
                            <div className="text-xl font-bold text-yellow-700">{summary.lateDays}</div>
                            <div className="text-xs text-yellow-600">Late</div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Recent Attendance */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Attendance</h3>
                  <div className="space-y-3">
                    {recentDates.map(date => {
                      const status = getAttendanceStatus(selectedStudent.id, date);
                      return (
                        <div key={date} className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">
                            {new Date(date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;