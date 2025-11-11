// src/pages/employee/DashboardEmployee.jsx
import React, { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";
import {
  Calendar, Clock, CheckCircle, XCircle, AlertCircle, BarChart3,
  User, TrendingUp, Award, Target
} from "lucide-react";
import { Link } from "react-router-dom";

const IST = "Asia/Kolkata";

const DashboardEmployee = () => {
  const [attendance, setAttendance] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [profile, setProfile] = useState({});

  // Load all data
  useEffect(() => {
    try {
      const att = localStorage.getItem("employeeAttendanceV2") || localStorage.getItem("employeeAttendance");
      if (att) setAttendance(JSON.parse(att));

      const leave = localStorage.getItem("leaveRequests");
      if (leave) setLeaveRequests(JSON.parse(leave));

      const task = localStorage.getItem("employeeTasks");
      if (task) setTasks(JSON.parse(task));

      const prof = localStorage.getItem("employeeProfile");
      if (prof) setProfile(JSON.parse(prof));
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    }
  }, []);

  // === ATTENDANCE STATS ===
  const today = formatInTimeZone(new Date(), IST, "yyyy-MM-dd");
  const todayRecords = attendance.filter(r => r.date === today);
  const totalMinutesToday = todayRecords.reduce((acc, r) => {
    if (r.duration && r.duration !== "Off" && !r.duration.includes("Invalid")) {
      const match = r.duration.match(/(\d+)h (\d+)m/);
      if (match) return acc + parseInt(match[1]) * 60 + parseInt(match[2]);
    }
    return acc;
  }, 0);
  const hoursToday = Math.floor(totalMinutesToday / 60);
  const minsToday = totalMinutesToday % 60;

  const monthlyHours = attendance.reduce((acc, r) => {
    if (r.duration && r.duration !== "Off" && !r.duration.includes("Invalid")) {
      const match = r.duration.match(/(\d+)h (\d+)m/);
      if (match) return acc + parseInt(match[1]) * 60 + parseInt(match[2]);
    }
    return acc;
  }, 0);
  const totalHoursMonth = Math.floor(monthlyHours / 60);

  // === LEAVE STATS ===
  const myLeaves = leaveRequests.filter(r => r.employeeId === "1"); // Change ID if dynamic
  const pending = myLeaves.filter(r => r.status === "pending").length;
  const approved = myLeaves.filter(r => r.status === "approved").length;
  const rejected = myLeaves.filter(r => r.status === "rejected").length;

  // === TASK STATS ===
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.progress === 100).length;
  const pendingTasks = tasks.filter(t => t.progress < 100).length;
  const avgProgress = totalTasks > 0
    ? Math.round(tasks.reduce((acc, t) => acc + t.progress, 0) / totalTasks)
    : 0;

  // === PROFILE INFO ===
  const { name = "Employee", role = "Team Member", department = "N/A" } = profile;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <User className="w-8 h-8" />
              Welcome back, {name.split(" ")[0]}!
            </h1>
            <p className="text-purple-100 mt-1">
              {role} • {department}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Today</p>
            <p className="text-2xl font-bold">
              {formatInTimeZone(new Date(), IST, "EEEE, MMM d")}
            </p>
            <p className="text-sm opacity-90 flex items-center justify-end gap-1 mt-1">
              <Clock className="w-4 h-4" />
              {formatInTimeZone(new Date(), IST, "h:mm a")}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Clock}
          title="Hours Today"
          value={`${hoursToday}h ${minsToday}m`}
          color="from-green-500 to-emerald-600"
          trend="+2h from yesterday"
        />
        <StatCard
          icon={Calendar}
          title="Monthly Hours"
          value={`${totalHoursMonth}h`}
          color="from-blue-500 to-indigo-600"
          trend="On track"
        />
        <StatCard
          icon={Target}
          title="Tasks Completed"
          value={`${completedTasks}/${totalTasks}`}
          color="from-purple-500 to-pink-600"
          trend={`${avgProgress}% avg progress`}
        />
        <StatCard
          icon={Award}
          title="Leave Balance"
          value={`${approved} Approved`}
          color="from-orange-500 to-red-600"
          trend={`${pending} pending`}
        />
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            Today's Attendance
          </h3>
          {todayRecords.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No records yet. Clock in!</p>
          ) : (
            <div className="space-y-3">
              {todayRecords.map(r => (
                <div key={r.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">
                      {r.in} → {r.out || "—"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {r.type === "full" ? "Full Day" : r.type === "half" ? "Half Day" : "Off"}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    r.out ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {r.out ? "Completed" : "Active"}
                  </span>
                </div>
              ))}
            </div>
          )}
          <Link
            to="/employee/dashboard/attendance"
            className="mt-4 inline-block text-purple-600 hover:underline text-sm font-medium"
          >
            View Full Log →
          </Link>
        </div>

        {/* Task Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Task Progress
          </h3>
          {totalTasks === 0 ? (
            <p className="text-gray-500 text-center py-8">No tasks assigned yet.</p>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span className="font-bold">{avgProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                    style={{ width: `${avgProgress}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
                  <p className="text-xs text-gray-600">Completed</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{pendingTasks}</p>
                  <p className="text-xs text-gray-600">Pending</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{totalTasks}</p>
                  <p className="text-xs text-gray-600">Total</p>
                </div>
              </div>
            </div>
          )}
          <Link
            to="/employee/dashboard/task"
            className="mt-4 inline-block text-purple-600 hover:underline text-sm font-medium"
          >
            View All Tasks →
          </Link>
        </div>
      </div>

      {/* Leave Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          Leave Requests
        </h3>
        {myLeaves.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No leave requests submitted.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-700">{pending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-700">{approved}</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-700">{rejected}</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </div>
        )}
        <div className="mt-4 text-right">
          <Link
            to="/employee/dashboard/leaverequest"
            className="text-purple-600 hover:underline text-sm font-medium"
          >
            Manage Leaves →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ActionButton
          to="/employee/dashboard/attendance"
          icon={Clock}
          label="Clock In/Out"
          color="bg-green-500"
        />
        <ActionButton
          to="/employee/dashboard/task"
          icon={Target}
          label="My Tasks"
          color="bg-purple-500"
        />
        <ActionButton
          to="/employee/dashboard/leaverequest"
          icon={Calendar}
          label="Request Leave"
          color="bg-blue-500"
        />
        <ActionButton
          to="/employee/dashboard/settings"
          icon={User}
          label="Settings"
          color="bg-gray-600"
        />
      </div>
    </div>
  );
};

// === STAT CARD ===
const StatCard = ({ icon: Icon, title, value, color, trend }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-3 rounded-xl bg-gradient-to-r ${color} text-white`}>
        <Icon className="w-6 h-6" />
      </div>
      <TrendingUp className="w-5 h-5 text-green-500" />
    </div>
    <p className="text-sm text-gray-600">{title}</p>
    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    {trend && <p className="text-xs text-gray-500 mt-2">{trend}</p>}
  </div>
);

// === ACTION BUTTON ===
const ActionButton = ({ to, icon: Icon, label, color }) => (
  <Link
    to={to}
    className={`${color} text-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:shadow-lg transition-all`}
  >
    <Icon className="w-6 h-6" />
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

export default DashboardEmployee;