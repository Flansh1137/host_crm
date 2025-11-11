import React, { useState } from "react";

const Expense = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if (
      !formData.employeeName ||
      !formData.category ||
      !formData.amount ||
      !formData.date
    ) {
      setMessage("Please fill all required fields!");
      return;
    }

    // add to expenses list (dynamic display)
    setExpenses((prev) => [...prev, formData]);

    // clear form
    setFormData({
      employeeName: "",
      category: "",
      amount: "",
      description: "",
      date: "",
    });

    // success message
    setMessage("✅ Expense added successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        Expense Management
      </h1>

      {/* Expense Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-2xl w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="employeeName"
          placeholder="Employee Name"
          value={formData.employeeName}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        >
          <option value="">Select Category</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Office Supplies">Office Supplies</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount (₹)"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        ></textarea>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 w-full"
        >
          Submit Expense
        </button>

        {message && (
          <p className="text-center text-green-600 font-medium">{message}</p>
        )}
      </form>

      {/* Table showing submitted expenses */}
      <div className="mt-10 w-full max-w-4xl">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          Submitted Expenses
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border shadow-md rounded-lg">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="py-2 px-3 text-left">Employee</th>
                <th className="py-2 px-3 text-left">Category</th>
                <th className="py-2 px-3 text-left">Amount</th>
                <th className="py-2 px-3 text-left">Date</th>
                <th className="py-2 px-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((exp, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-3">{exp.employeeName}</td>
                    <td className="py-2 px-3">{exp.category}</td>
                    <td className="py-2 px-3">₹{exp.amount}</td>
                    <td className="py-2 px-3">{exp.date}</td>
                    <td className="py-2 px-3">{exp.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-3 text-gray-500 italic"
                  >
                    No expenses yet — add your first one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expense;
