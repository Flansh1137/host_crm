// src/pages/employee/TaskTracker.jsx
import React, { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { Plus, Users, FileText, Check } from "lucide-react";
import TaskCard from "../components/TaskCard";
import ProgressBar from "../components/ProgressBar";
import { toast, Toaster } from "react-hot-toast";

const IST = "Asia/Kolkata";

const TaskTracker = ({ isManager = false }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", type: "Daily", progress: 0, notes: "" });
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // === LOAD TASKS FROM localStorage ===
  useEffect(() => {
    const loadTasks = () => {
      setLoading(true);
      setError(null);
      try {
        const saved = localStorage.getItem("employeeTasks");
        if (saved) {
          const data = JSON.parse(saved);
          if (Array.isArray(data)) setTasks(data);
          else throw new Error("Invalid task data");
        }
      } catch (err) {
        console.error("Failed to load tasks:", err);
        setError("Failed to load tasks. Using empty state.");
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  // === SAVE TASKS TO localStorage ===
  const saveTasks = (newTasks) => {
    try {
      localStorage.setItem("employeeTasks", JSON.stringify(newTasks));
    } catch (err) {
      console.error("Failed to save tasks:", err);
      setError("Failed to save tasks.");
    }
  };

  // === ADD TASK ===
  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      toast.error("Task title is required");
      return;
    }
    const now = formatInTimeZone(new Date(), IST, "yyyy-MM-dd h:mm:ss a");
    const task = { ...newTask, id: Date.now(), lastUpdated: now };
    setTasks([...tasks, task]);
    saveTasks([...tasks, task]);
    setNewTask({ title: "", type: "Daily", progress: 0, notes: "" });
    toast.success("Task added!");
  };

  // === UPDATE TASK PROGRESS/NOTES ===
  const handleUpdateTask = (task) => {
    setEditTask(task);
  };

  const handleSaveUpdate = () => {
    if (!editTask || !editTask.title.trim()) {
      toast.error("Task title is required");
      return;
    }
    const now = formatInTimeZone(new Date(), IST, "yyyy-MM-dd h:mm:ss a");
    const updatedTasks = tasks.map((t) =>
      t.id === editTask.id ? { ...editTask, lastUpdated: now } : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditTask(null);
    toast.success("Task updated!");
  };

  // === DELETE TASK ===
  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter((t) => t.id !== id);
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      toast.success("Task deleted!");
    }
  };

  // === MANAGER VIEW DATA ===
  const pendingTasks = tasks.filter((t) => t.progress < 100);
  const teamProgress = tasks.length
    ? (tasks.reduce((acc, t) => acc + t.progress, 0) / tasks.length).toFixed(1)
    : 0;

  // === GENERATE REPORT (Basic) ===
  const generateReport = () => {
    const report = {
      date: formatInTimeZone(new Date(), IST, "yyyy-MM-dd h:mm:ss a"),
      totalTasks: tasks.length,
      completed: tasks.filter((t) => t.progress === 100).length,
      pending: pendingTasks.length,
      averageProgress: teamProgress,
    };
    toast.success("Report generated (check console)", {
      duration: 4000,
    });
    console.log("Task Report:", report);
    // In real app: download as PDF/CSV
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-6 max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FileText className="w-8 h-8 text-purple-600" />
            Task Tracker
          </h2>
          {isManager && (
            <button
              onClick={generateReport}
              className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <Check className="w-5 h-5" /> Generate Report
            </button>
          )}
        </div>

        {/* Add Task Form */}
        {!isManager && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Add New Task</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Task Title"
                className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={newTask.type}
                onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                className="p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <button
                onClick={handleAddTask}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add Task
              </button>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              isManager={isManager}
            />
          ))}
        </div>

        {/* Edit Modal */}
        {editTask && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Update Task</h3>
              <input
                type="text"
                value={editTask.title}
                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                className="w-full p-2 mb-4 border rounded-lg"
                placeholder="Task Title"
              />
              <select
                value={editTask.type}
                onChange={(e) => setEditTask({ ...editTask, type: e.target.value })}
                className="w-full p-2 mb-4 border rounded-lg"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <input
                type="number"
                value={editTask.progress}
                onChange={(e) =>
                  setEditTask({ ...editTask, progress: Math.min(100, Math.max(0, e.target.value)) })
                }
                className="w-full p-2 mb-4 border rounded-lg"
                placeholder="Progress (%)"
                min="0"
                max="100"
              />
              <textarea
                value={editTask.notes}
                onChange={(e) => setEditTask({ ...editTask, notes: e.target.value })}
                className="w-full p-2 mb-4 border rounded-lg"
                placeholder="Notes"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditTask(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUpdate}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </div>
        </div>
        )}

        {/* Manager Dashboard */}
        {isManager && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Team Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-purple-600">{tasks.length}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-red-600">{pendingTasks.length}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Avg. Progress</p>
                <div className="text-2xl font-bold text-green-600">{teamProgress}%</div>
                <ProgressBar progress={teamProgress} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskTracker;