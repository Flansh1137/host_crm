import React, { useState } from "react";

const StudentForm = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !course.trim()) {
      setMsg("Fill both fields");
      setTimeout(() => setMsg(""), 3000);
      return;
    }

    // PASTE YOUR /exec URL HERE
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycby4ysIuVumXjcxXX7M-v2GmV0q_SEQqopHJyjOC-SYFvQIA_zQzdQkhklhBjmH9HjTF/exec";

    const body = new URLSearchParams();
    body.append("name", name.trim());
    body.append("course", course.trim());
    // NO DATE NEEDED — AUTO-GENERATED

    try {
      const res = await fetch(WEB_APP_URL, { method: "POST", body });
      const text = await res.text();
      setMsg(text);
      if (text === "SUCCESS") {
        setName("");
        setCourse("");
      }
    } catch {
      setMsg("No internet");
    }
    setTimeout(() => setMsg(""), 4000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-4">
          Attendance
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Today: <strong>{new Date().toLocaleDateString("en-IN")}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700"
          >
            Mark Present
          </button>
        </form>

        {msg && (
          <p className={`mt-4 text-center font-medium ${msg === "SUCCESS" ? "text-green-600" : "text-red-600"}`}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentForm;