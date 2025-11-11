import React, { useState, useEffect } from "react";

const StudentForm = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get("date");
    setDate(d || new Date().toLocaleDateString("en-IN"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !course.trim()) {
      setMsg("Fill both fields");
      setTimeout(() => setMsg(""), 3000);
      return;
    }

    // PASTE YOUR NEW /exec URL HERE
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxXgNLeKL6Q3frAwENOLQkCU3csJ1_t3ru3fAdlcnFzyOi1n3pDvCJgaSoVQRMlfNhE/exec";

    const body = new URLSearchParams();
    body.append("name", name.trim());
    body.append("course", course.trim());
    body.append("date", date);

    try {
      const res = await fetch(WEB_APP_URL, {
        method: "POST",
        body,
      });
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-2">
          Attendance
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
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
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            Submit
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