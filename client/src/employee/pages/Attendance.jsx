// src/pages/employee/Attendance.jsx
import React, { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { Clock, LogIn, LogOut, Calendar, AlertCircle, RefreshCw } from "lucide-react";

const IST = "Asia/Kolkata";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [currentInTime, setCurrentInTime] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // === REAL-TIME CLOCK (IST + AM/PM) ===
  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        setCurrentTime(formatInTimeZone(now, IST, "h:mm:ss a"));
      } catch (err) {
        console.error("Clock update failed:", err);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // === LOAD DATA FROM localStorage ===
  useEffect(() => {
    const loadAttendance = async () => {
      setLoading(true);
      setError(null);
      try {
        const saved = localStorage.getItem("employeeAttendance");
        if (saved) {
          const data = JSON.parse(saved);
          if (Array.isArray(data)) {
            setRecords(data);

            const today = formatInTimeZone(new Date(), IST, "yyyy-MM-dd");
            const lastRecord = data[data.length - 1];

            if (lastRecord && lastRecord.date === today && lastRecord.out === null) {
              setIsClockedIn(true);
              setCurrentInTime(lastRecord.in);
            }
          } else {
            throw new Error("Invalid data format");
          }
        }
      } catch (err) {
        console.error("Failed to load attendance:", err);
        setError("Failed to load attendance records. Using empty state.");
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, []);

  // === SAVE TO localStorage ===
  const saveToStorage = async (newRecords) => {
    setSaving(true);
    try {
      localStorage.setItem("employeeAttendance", JSON.stringify(newRecords));
    } catch (err) {
      console.error("Failed to save:", err);
      setError("Could not save attendance. Changes may be lost.");
    } finally {
      setSaving(false);
    }
  };

  // === CLOCK IN ===
  const handleClockIn = async () => {
    if (saving) return;
    setError(null);
    try {
      const now = new Date();
      const inTime = formatInTimeZone(now, IST, "h:mm:ss a");

      const newRecord = {
        id: Date.now(),
        date: formatInTimeZone(now, IST, "yyyy-MM-dd"),
        in: inTime,
        out: null,
        duration: null,
      };

      const updated = [...records, newRecord];
      setRecords(updated);
      setIsClockedIn(true);
      setCurrentInTime(inTime);

      await saveToStorage(updated);
    } catch (err) {
      setError("Failed to clock in. Please try again.");
    }
  };

  // === CLOCK OUT ===
  const handleClockOut = async () => {
    if (saving || !isClockedIn) return;
    setError(null);
    try {
      const now = new Date();
      const outTime = formatInTimeZone(now, IST, "h:mm:ss a");

      const updatedRecords = records.map((r, i) =>
        i === records.length - 1 && r.out === null
          ? {
              ...r,
              out: outTime,
              duration: calculateDuration(r.in, outTime),
            }
          : r
      );

      setRecords(updatedRecords);
      setIsClockedIn(false);
      setCurrentInTime(null);

      await saveToStorage(updatedRecords);
    } catch (err) {
      setError("Failed to clock out. Please try again.");
    }
  };

  // === DURATION CALCULATION ===
  const calculateDuration = (inTime, outTime) => {
    const parseTime = (t) => {
      const [time, period] = t.split(" ");
      let [h, m, s] = time.split(":").map(Number);
      if (period === "PM" && h !== 12) h += 12;
      if (period === "AM" && h === 12) h = 0;
      return h * 3600 + m * 60 + s;
    };

    const inSeconds = parseTime(inTime);
    const outSeconds = parseTime(outTime);
    const diff = outSeconds - inSeconds;

    if (diff < 0) return "Invalid time";

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  // === TODAY'S DATA ===
  const today = formatInTimeZone(new Date(), IST, "yyyy-MM-dd");
  const todayRecords = records.filter((r) => r.date === today);

  const totalMinutesToday = todayRecords.reduce((acc, r) => {
    if (r.duration && r.duration !== "Invalid time") {
      const match = r.duration.match(/(\d+)h (\d+)m/);
      if (match) {
        return acc + parseInt(match[1]) * 60 + parseInt(match[2]);
      }
    }
    return acc;
  }, 0);

  const totalHours = Math.floor(totalMinutesToday / 60);
  const totalMins = totalMinutesToday % 60;

  // === SKELETON LOADER ===
  const SkeletonCard = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-2/5 mb-3"></div>
      <div className="h-12 bg-gray-200 rounded w-full"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-indigo-600" />
          Attendance
        </h2>
        <div className="flex items-center gap-2 text-lg font-mono text-indigo-700">
          <RefreshCw className="w-5 h-5 animate-spin" />
          {currentTime}
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Clock In/Out Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Current Status</p>
            <p className="text-2xl font-bold">
              {isClockedIn ? (
                <span className="text-green-600">Clocked In</span>
              ) : (
                <span className="text-gray-500">Not Clocked In</span>
              )}
            </p>
          </div>
          <div className="p-3 bg-indigo-50 rounded-full">
            <Clock className="w-10 h-10 text-indigo-600" />
          </div>
        </div>

        {isClockedIn && currentInTime && (
          <p className="text-sm text-gray-600 mb-4">
            Clocked in at: <strong className="text-indigo-700">{currentInTime}</strong>
          </p>
        )}

        <button
          onClick={isClockedIn ? handleClockOut : handleClockIn}
          disabled={saving}
          className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-sm ${
            saving
              ? "bg-gray-300 cursor-not-allowed text-gray-600"
              : isClockedIn
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {saving ? (
            <>Saving...</>
          ) : isClockedIn ? (
            <>
              <LogOut className="w-5 h-5" /> Clock Out
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" /> Clock In
            </>
          )}
        </button>
      </div>

      {/* Today's Records */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Today’s Records
          <span className="block text-sm font-normal text-gray-500 mt-1">
            {formatInTimeZone(new Date(), IST, "EEEE, MMMM d, yyyy")}
          </span>
        </h3>

        {todayRecords.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No attendance recorded today.
          </p>
        ) : (
          <div className="space-y-3">
            {todayRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {record.in} – {record.out || "—"}
                  </p>
                  {record.duration && (
                    <p className="text-sm text-gray-600">
                      Duration: <strong className="text-indigo-700">{record.duration}</strong>
                    </p>
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    record.out
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {record.out ? "Completed" : "Active"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
        <p className="text-sm text-indigo-700 font-medium">
          Total Time Today
        </p>
        <p className="text-3xl font-bold text-indigo-800">
          {totalHours}h {totalMins}m
        </p>
      </div>

      {/* Dev Tools */}
      {process.env.NODE_ENV === "development" && (
        <div className="text-xs text-gray-500 text-center">
          <button
            onClick={() => {
              if (window.confirm("Clear all attendance records?")) {
                localStorage.removeItem("employeeAttendance");
                window.location.reload();
              }
            }}
            className="text-red-500 underline"
          >
            Clear All Records (Dev)
          </button>
        </div>
      )}
    </div>
  );
};

export default Attendance;