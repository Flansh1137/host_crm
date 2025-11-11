import React from "react";
import {
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

// Public Pages
import AdminLogin from "../pages/AdminLogin";
import EmployeeLogin from "../pages/EmployeeLogin";
import StudentForm from "../pages/StudentForm"; // ✅ Add this

// Admin Dashboard
import DashboardAdmin from "../admin/components/DashboardAdmin";

// Employee Dashboard
import DashboardEmployee from "../employee/components/DashboardEmployee";

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const token =
    localStorage.getItem("adminToken") ||
    localStorage.getItem("employeeToken");
  const userRole = localStorage.getItem("userRole");

  if (!token || (role && userRole !== role)) {
    return <Navigate to={role === "admin" ? "/admin" : "/employee/login"} replace />;
  }

  return children;
};

// Public Layout
const PublicLayout = ({ children }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">CRM System</h1>
      <p className="text-gray-600">Choose your login portal</p>
    </div>

    <nav className="flex gap-4 mb-8">
      <Link
        to="/admin"
        className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors font-medium"
      >
        Admin Login
      </Link>
      <Link
        to="/employee/login"
        className="px-6 py-3 border border-gray-600 text-gray-600 rounded-lg hover:bg-gray-600 hover:text-white transition-colors font-medium"
      >
        Employee Login
      </Link>
    </nav>

    <div className="w-full max-w-md">{children}</div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/employee/login" replace />} />

      {/* ✅ Public Student Form Route */}
      <Route path="/student-form" element={<StudentForm />} />

      {/* Public Login Pages */}
      <Route
        path="/*"
        element={
          <PublicLayout>
            <Routes>
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/employee/login" element={<EmployeeLogin />} />
              <Route path="*" element={"NOT FOUND"} />
            </Routes>
          </PublicLayout>
        }
      />

      {/* Protected Admin Dashboard */}
      <Route
        path="/admin/dashboard/*"
        element={
          <ProtectedRoute role="admin">
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />

      {/* Protected Employee Dashboard */}
      <Route
        path="/employee/dashboard/*"
        element={
          <ProtectedRoute role="employee">
            <DashboardEmployee />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={"NOT FOUND"} />
    </Routes>
  );
};

export default AppRoutes;
