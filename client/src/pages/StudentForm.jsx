import React, { useState, useEffect } from "react";

const StudentForm = () => {
  const [date, setDate] = useState("");
  const [formData, setFormData] = useState({ name: "", course: "" });
  const [message, setMessage] = useState(null); // ✅ JSX-safe (no TypeScript)

  // ---- Read ?date= from QR -------------------------------------------------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get("date");
    setDate(d || new Date().toLocaleDateString("en-IN"));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.course.trim()) {
      setMessage({ text: "Please fill all fields!", type: "error" });
      return;
    }

    // ---- Your deployed Web App URL ---------------------------------------
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbxXgNLeKL6Q3frAwENOLQkCU3csJ1_t3ru3fAdlcnFzyOi1n3pDvCJgaSoVQRMlfNhE/exec";

    try {
      const res = await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: formData.name.trim(),
          course: formData.course.trim(),
          date: date,
        }),
      });

      const result = await res.json();

      setMessage({
        text: result.message || "Attendance submitted successfully!",
        type: result.status === "error" ? "error" : "success",
      });

      if (result.status === "success") {
        setFormData({ name: "", course: "" });
      }

      setTimeout(() => setMessage(null), 4000);
    } catch (err) {
      console.error(err);
      setMessage({
        text: "Network error – check your connection.",
        type: "error",
      });
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-purple-700 mb-4 text-center">
          Attendance Form
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Date: <strong>{date || "Today"}</strong>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Course"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Submit Attendance
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-semibold ${
              message.type === "success"
                ? "text-green-600"
                : message.type === "error"
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentForm;
