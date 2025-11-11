import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";


/* ----------  EMPLOYEE PAGE COMPONENTS  ---------- */
const EmployeeOverview = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Employee Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600">Total Students</h3>
        <p className="text-3xl font-bold text-blue-600">120</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600">Courses Teaching</h3>
        <p className="text-3xl font-bold text-green-600">4</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-600">Pending Grading</h3>
        <p className="text-3xl font-bold text-orange-600">23</p>
      </div>
    </div>
    
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Dr. Smith</h3>
          <p className="text-gray-600">Professor</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Employee Portal</p>
        </div>
      </div>
    </div>
  </div>
);

const EmployeeStudents = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Student Management</h2>
    <p className="text-gray-600">Student list will appear here…</p>
  </div>
);

const EmployeeCourses = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Course Management</h2>
    <p className="text-gray-600">Course list will appear here…</p>
  </div>
);

const EmployeeAttendance = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Attendance Tracking</h2>
    <p className="text-gray-600">Attendance records will appear here…</p>
  </div>
);

const EmployeeGrading = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Grading System</h2>
    <p className="text-gray-600">Grading interface will appear here…</p>
  </div>
);

const EmployeeSchedule = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">My Schedule</h2>
    <p className="text-gray-600">Schedule management will appear here…</p>
  </div>
);

// Import your EmployeeSettings component
import EmployeeSettings from "../pages/EmployeeSettings";
import Attendance from "../pages/Attendance";
import TaskTracker from "../pages/TaskTracker";
// import LeaveRequest from "../pages/LeaveRequest";
import Dashboard from "../pages/DashboardEmployee"
import CourseManagement from "../pages/CourseMagement";
import StudentAttendance from "../pages/StudentAttendance";
import StudentForm from "../../pages/StudentForm";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import { SiGoogletasks } from "react-icons/si";
import { ImExit } from "react-icons/im";
import { SiGoogleforms } from "react-icons/si";
import { FaBusinessTime, FaMoneyBillWave } from "react-icons/fa";
import { BsQrCodeScan } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Expense from "../../employee/pages/Expense";
/* ----------  MAIN EMPLOYEE DASHBOARD LAYOUT  ---------- */
const DashboardEmployee = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("employeeToken");
    localStorage.removeItem("userRole");
    navigate("/employee/login");
  };

  const menuItems = [
    { path: "/employee/dashboard", label: "Dashboard", icon: <RiDashboardHorizontalFill /> },
    { path: "/employee/dashboard/students", label: "Students", icon: "👨‍🎓" },
    { path: "/employee/dashboard/courses", label: "Course Management", icon: <FaFileSignature/> },
    { path: "/employee/dashboard/attendance", label: "Employee Time", icon: <FaBusinessTime/> },
    { path: "/employee/dashboard/studentattendance", label: "Student QR Attendance", icon: <BsQrCodeScan/> },
    // { path: "/employee/dashboard/leaverequest", label: "Leave Request", icon: <ImExit/> },
    { path: "/dashboard/studentform", label: "Leave Request", icon: <SiGoogleforms/> },
    { path: "/employee/dashboard/task", label: "Task Tracker", icon: <SiGoogletasks/> },
    { path: "/employee/dashboard/expense", label: "Expense", icon: <FaMoneyBillWave />},
    { path: "/employee/dashboard/settings", label: "Settings", icon: <FiSettings/> },
  ];

  /* ----  PROTECTED ROUTE CHECK  ---- */
  const token = localStorage.getItem("employeeToken");
  if (!token) {
    return <Navigate to="/employee/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* ----------  SIDEBAR  ---------- */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gray-800 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-bold">Employee Portal</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-700"
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="mt-4 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-4 hover:bg-gray-700 transition-colors ${
                location.pathname === item.path ? "bg-gray-900" : ""
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
                "Employee Dashboard"}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Dr. Smith (Professor)</span>
              <button
                onClick={handleLogout}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/students" element={<EmployeeStudents />} />
            <Route path="/courses" element={<CourseManagement />} />
            <Route path="/attendance" element={<Attendance />} />
            {/* <Route path="/leaverequest" element={<LeaveRequest />} /> */}
            <Route path="/task" element={<TaskTracker />} />
            <Route path="/studentattendance" element={<StudentAttendance />} />
            <Route path="/settings" element={<EmployeeSettings />} />
            <Route path="/studentform" element={<StudentForm />} />
            <Route path="/expense" element={<Expense />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardEmployee;