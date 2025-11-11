import React, { useState, useEffect } from "react";

const StudentForm = () => {
  const [date, setDate] = useState("");
  const [formData, setFormData] = useState({ name: "", course: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let d = urlParams.get("date");

    // Normalize date format to DD-MM-YYYY
    if (d) {
      d = d.replace(/\//g, "-");
    } else {
      const today = new Date();
      d = today.toLocaleDateString("en-GB").split("/").join("-");
    }

    setDate(d);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.name.trim()) {
      setMessage("⚠️ Please enter your name.");
      return;
    }

    try {
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbxXgNLeKL6Q3frAwENOLQkCU3csJ1_t3ru3fAdlcnFzyOi1n3pDvCJgaSoVQRMlfNhE/exec";

      // Always send normalized DD-MM-YYYY date
      const normalizedDate = date.replace(/\//g, "-");

      const response = await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: formData.name.trim(),
          course: formData.course.trim(),
          date: normalizedDate,
        }),
      });

      const text = await response.text();

      // ✅ Handle Google Apps Script responses
      if (text.includes("OK")) {
        setMessage("✅ Attendance marked successfully!");
        setFormData({ name: "", course: "" });
      } else if (text.includes("Duplicate")) {
        setMessage("⚠️ You have already marked attendance for this date.");
      } else {
        setMessage("❌ Unexpected response. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      setMessage("❌ Failed to submit attendance! Check your internet connection.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-purple-700 mb-4 text-center">
          🧾 Attendance Form
        </h1>

        <p className="text-center text-gray-600 mb-4">
          Date: <strong>{date}</strong>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Course"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Submit Attendance
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-semibold text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentForm;
