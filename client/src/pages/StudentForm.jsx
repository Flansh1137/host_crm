import React, { useState, useEffect } from "react";

const StudentForm = () => {
  const [date, setDate] = useState("");
  const [formData, setFormData] = useState({ name: "", course: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const d = urlParams.get("date");
    setDate(d || "Unknown Date");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.course) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const scriptURL = "https://script.google.com/macros/s/AKfycbwwX1iS38ZNT9G1-ypGhtILG8ZjNOTvU1UW6nIa1PLgCbravMh5RpzrvxsACqXkJeIc/exec";
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
          name: formData.name,
          course: formData.course,
          date: date,
        }),
      });
      setMessage("✅ Attendance marked successfully!");
      setFormData({ name: "", course: "" });
    } catch (error) {
      console.error("Error!", error.message);
      setMessage("❌ Failed to submit attendance!");
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
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Course"
            className="p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Submit Attendance
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
};

export default StudentForm;
