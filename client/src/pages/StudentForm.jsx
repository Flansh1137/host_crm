import React, { useState, useEffect } from "react";

const StudentForm = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [msg, setMsg] = useState("");

  // Read ?date= from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get("date");
    setDate(d || new Date().toLocaleDateString("en-IN"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !course.trim()) {
      setMsg("Please fill name and course");
      return;
    }

    const WEB_APP_URL = "YOUR_WEB_APP_URL_HERE"; // ← PASTE HERE

    const formBody = new URLSearchParams();
    formBody.append("name", name.trim());
    formBody.append("course", course.trim());
    formBody.append("date", date);

    try {
      const res = await fetch(WEB_APP_URL, {
        method: "POST",
        body: formBody,
        // Remove mode: no-cors → let browser handle CORS
      });

      const text = await res.text();

      if (text.includes("Success")) {
        setMsg("Attendance Marked!");
        setName("");
        setCourse("");
      } else {
        setMsg(text);
      }

      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Network error");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-2">
          Attendance
        </h1>
        <p className="text-center text-sm text-gray-600 mb-4">
          Date: <strong>{date}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <input
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Submit
          </button>
        </form>

        {msg && (
          <p
            className={`mt-4 text-center font-medium ${
              msg.includes("Success") || msg.includes("Marked")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentForm;