import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import ClientManagement from "../pages/ClientManagement"

/* ----------  PAGE COMPONENTS  ---------- */
const AdminOverview = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600">Total Students</h3>
        <p className="text-3xl font-bold text-blue-600">1,234</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600">Total Employees</h3>
        <p className="text-3xl font-bold text-green-600">89</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600">Active Courses</h3>
        <p className="text-3xl font-bold text-purple-600">45</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600">Pending Requests</h3>
        <p className="text-3xl font-bold text-orange-600">12</p>
      </div>
    </div>
  </div>
);

const AdminStudents = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Student Management</h2>
    {/* Add your table / list here */}
    <p className="text-gray-600">Student list will appear here…</p>
  </div>
);

const AdminEmployees = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Employee Management</h2>
    <p className="text-gray-600">Employee list will appear here…</p>
  </div>
);

const AdminCourses = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Course Management</h2>
    <p className="text-gray-600">Course list will appear here…</p>
  </div>
);

const AdminAttendance = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Attendance Tracking</h2>
    <p className="text-gray-600">Attendance records will appear here…</p>
  </div>
);

const AdminReports = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Reports & Analytics</h2>
    <p className="text-gray-600">Charts and reports will appear here…</p>
  </div>
);

const AdminSettings = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">System Settings</h2>
    <p className="text-gray-600">Settings form will appear here…</p>
  </div>
);

// Import your StudentManagement component (make sure the path is correct)
import StudentManagement from "../pages/StudentManagement";
import EmployeeManagement from "../pages/EmployeeManagement";
import CourseManagement from "../pages/CourseManagement";
import AttendanceManagement from "../pages/AttendanceManagement";
import ProjectManagement from "../pages/ProjectManagement";

/* ----------  MAIN DASHBOARD LAYOUT  ---------- */
const DashboardAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userRole");
    navigate("/admin");
  };

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin/dashboard/student-management", label: "Students", icon: "💼" },
    { path: "/admin/dashboard/employees", label: "Employees", icon: "👥" },
    { path: "/admin/dashboard/courses", label: "Courses", icon: "📚" },
    { path: "/admin/dashboard/attendance", label: "Attendance", icon: "✅" },
    { path: "/admin/dashboard/project-management", label: "Project Management", icon: "✅" },
    { path: "/admin/dashboard/client-management", label: "Client Management", icon: "✅" },
    { path: "/admin/dashboard/reports", label: "Reports", icon: "📈" },
    { path: "/admin/dashboard/settings", label: "Settings", icon: "⚙️" },
  ];

  /* ----  PROTECTED ROUTE CHECK  ---- */
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* ----------  SIDEBAR  ---------- */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-blue-800 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-bold">Admin Panel</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-blue-700"
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="mt-4 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-4 hover:bg-blue-700 transition-colors ${
                location.pathname === item.path ? "bg-blue-900" : ""
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              {sidebarOpen && <span className="text-base">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ----------  MAIN CONTENT  ---------- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {menuItems.find((i) => i.path === location.pathname)?.label ||
                "Admin Dashboard"}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Admin User</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/students" element={<AdminStudents />} />
            <Route path="/student-management" element={<StudentManagement />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path="/courses" element={< CourseManagement />} />
            <Route path="/attendance" element={<AttendanceManagement />} />
            <Route path="/project-management" element={<ProjectManagement />} />
            <Route path="/client-management" element={< ClientManagement  />} />
            <Route path="/reports" element={<AdminReports />} />
            <Route path="/settings" element={<AdminSettings />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;