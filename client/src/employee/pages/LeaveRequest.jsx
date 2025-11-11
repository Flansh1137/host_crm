// src/pages/employee/LeaveRequest.jsx
import React, { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { differenceInDays } from "date-fns"; // <-- Import from date-fns
import {
  Calendar, MessageSquare, Send, CheckCircle, XCircle, Clock, User, CalendarRange
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const IST = "Asia/Kolkata";

const LeaveRequest = () => {
  const [requests, setRequests] = useState([]);
  const [isAdmin] = useState(false); // Set true to test admin
  const currentUser = { id: "1", name: "John Doe" };

  // Load & Save
  useEffect(() => {
    const saved = localStorage.getItem("leaveRequests");
    if (saved) setRequests(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("leaveRequests", JSON.stringify(requests));
  }, [requests]);

  // Form State
  const [form, setForm] = useState({
    type: "single", // single | multi
    singleType: "vacation", // vacation | half | off
    singleDate: formatInTimeZone(new Date(), IST, "yyyy-MM-dd"),
    startDate: formatInTimeZone(new Date(), IST, "yyyy-MM-dd"),
    endDate: formatInTimeZone(new Date(), IST, "yyyy-MM-dd"),
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.message.trim()) {
      toast.error("Please write a reason");
      return;
    }

    if (form.type === "multi") {
      const days = differenceInDays(new Date(form.endDate), new Date(form.startDate)) + 1;
      if (days < 2 || days > 5) {
        toast.error("Multi-day leave must be 2 to 5 days");
        return;
      }
    }

    const newRequest = {
      id: Date.now().toString(),
      type: form.type,
      singleType: form.type === "single" ? form.singleType : null,
      singleDate: form.type === "single" ? form.singleDate : null,
      startDate: form.type === "multi" ? form.startDate : null,
      endDate: form.type === "multi" ? form.endDate : null,
      message: form.message,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    setRequests(prev => [...prev, newRequest]);
    toast.success("Leave request sent!");
    resetForm();
  };

  const resetForm = () => {
    setForm({
      type: "single",
      singleType: "vacation",
      singleDate: formatInTimeZone(new Date(), IST, "yyyy-MM-dd"),
      startDate: formatInTimeZone(new Date(), IST, "yyyy-MM-dd"),
      endDate: formatInTimeZone(new Date(), IST, "yyyy-MM-dd"),
      message: "",
    });
  };

  const updateStatus = (id, status) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast.success(`Request ${status}!`);
  };

  const myRequests = isAdmin
    ? requests
    : requests.filter(r => r.employeeId === currentUser.id);

  const getDuration = (req) => {
    if (req.type === "multi") {
      const days = differenceInDays(new Date(req.endDate), new Date(req.startDate)) + 1;
      return `${days} day${days > 1 ? 's' : ''}`;
    }
    return req.singleType === "vacation" ? "Full Day" :
           req.singleType === "half" ? "Half Day" : "Off";
  };

  const getDateDisplay = (req) => {
    if (req.type === "multi") {
      return `${formatInTimeZone(new Date(req.startDate), IST, "MMM dd")} – ${formatInTimeZone(new Date(req.endDate), IST, "MMM dd, yyyy")}`;
    }
    return formatInTimeZone(new Date(req.singleDate), IST, "EEEE, MMMM d, yyyy");
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-6 max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <CalendarRange className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Leave Request</h1>
              <p className="text-gray-600">Request vacation, half day, off, or 2–5 day leave</p>
            </div>
          </div>
          <div className="text-lg font-mono text-purple-700 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {formatInTimeZone(new Date(), IST, "h:mm a")}
          </div>
        </div>

        {/* Employee Form */}
        {!isAdmin && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
              <Send className="w-5 h-5 text-green-600" />
              Submit New Request
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Leave Type: Single or Multi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leave Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                >
                  <option value="single">Single Day</option>
                  <option value="multi">Multi-Day (2–5 days)</option>
                </select>
              </div>

              {/* Single Day */}
              {form.type === "single" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Day Type
                    </label>
                    <select
                      value={form.singleType}
                      onChange={(e) => setForm({ ...form, singleType: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="vacation">Full Vacation</option>
                      <option value="half">Half Day</option>
                      <option value="off">Off (No Work)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={form.singleDate}
                      onChange={(e) => setForm({ ...form, singleDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* Multi-Day */}
              {form.type === "multi" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={form.endDate}
                      min={form.startDate}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason / Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="e.g., Family vacation, medical treatment, personal work..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Send className="w-5 h-5" /> Submit Request
              </button>
            </form>
          </div>
        )}

        {/* Request List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border">
          <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            {isAdmin ? "All Team Requests" : "My Requests"}
          </h2>

          {myRequests.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              {isAdmin ? "No requests yet" : "You have no leave requests"}
            </p>
          ) : (
            <div className="space-y-4">
              {myRequests.map(req => {
                const duration = getDuration(req);
                const dateDisplay = getDateDisplay(req);

                return (
                  <div
                    key={req.id}
                    className="p-5 bg-gray-50 rounded-xl border hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-gray-800 flex items-center gap-2">
                          <User className="w-4 h-4" /> {req.employeeName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {dateDisplay} ({duration})
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        req.status === "approved" ? "bg-green-100 text-green-700" :
                        req.status === "rejected" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-lg border mb-3">
                      <p className="text-sm text-gray-700 italic">"{req.message}"</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <p className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Submitted: {formatInTimeZone(new Date(req.submittedAt), IST, "MMM dd, h:mm a")}
                      </p>

                      {isAdmin && req.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(req.id, "approved")}
                            className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1 text-xs font-medium"
                          >
                            <CheckCircle className="w-4 h-4" /> Approve
                          </button>
                          <button
                            onClick={() => updateStatus(req.id, "rejected")}
                            className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-1 text-xs font-medium"
                          >
                            <XCircle className="w-4 h-4" /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LeaveRequest;