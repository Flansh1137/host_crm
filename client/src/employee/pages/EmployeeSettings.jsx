// src/pages/employee/Settings.jsx
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { User, Mail, Phone, Briefcase, Calendar, Lock, Save, Edit3 } from "lucide-react";

const EmployeeSettings = () => {
  // === INITIAL DATA (from API or localStorage) ===
  const [originalData] = useState({
    id: "EMP001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    role: "Frontend Developer",
    department: "IT",
    joiningDate: "2023-06-01",
    contractDuration: "6 months",
    shift: "Morning",
    techSkills: "React, Node.js, Tailwind CSS",
    salaryType: "Monthly",
    salaryAmount: "₹60,000",
    amountPaid: "₹30,000",
    paymentStatus: "Partial",
    lastPaymentDate: "2025-10-01",
  });

  const [formData, setFormData] = useState(originalData);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});

  // === VALIDATION ===
  const validateProfile = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (!formData.phone.match(/^\+91 \d{10}$/)) newErrors.phone = "Invalid phone (+91 10 digits)";
    return newErrors;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!passwordData.current) newErrors.current = "Current password required";
    if (passwordData.new.length < 6) newErrors.new = "New password must be 6+ chars";
    if (passwordData.new !== passwordData.confirm) newErrors.confirm = "Passwords don't match";
    return newErrors;
  };

  // === HANDLE PROFILE SAVE ===
  const handleSaveProfile = async () => {
    const validationErrors = validateProfile();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors");
      return;
    }

    setErrors({});
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      // In real app: await updateProfileAPI(formData);
      localStorage.setItem("employeeProfile", JSON.stringify(formData));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  // === HANDLE PASSWORD CHANGE ===
  const handleChangePassword = async () => {
    const validationErrors = validatePassword();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Fix password errors");
      return;
    }

    setErrors({});
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      // In real app: await changePasswordAPI(passwordData);
      toast.success("Password changed successfully!");
      setPasswordData({ current: "", new: "", confirm: "" });
    } catch (err) {
      toast.error("Failed to change password");
    }
  };

  // === INPUT CHANGE HANDLER ===
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // === LOAD SAVED DATA ON MOUNT ===
  useEffect(() => {
    const saved = localStorage.getItem("employeeProfile");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  // === FIELD CONFIG ===
  const editableFields = [
    { key: "name", label: "Full Name", icon: User, type: "text" },
    { key: "email", label: "Email", icon: Mail, type: "email" },
    { key: "phone", label: "Phone", icon: Phone, type: "tel" },
    { key: "role", label: "Role", icon: Briefcase, type: "text" },
    { key: "department", label: "Department", icon: Briefcase, type: "text" },
    { key: "shift", label: "Shift", icon: Calendar, type: "text" },
    { key: "techSkills", label: " Skills", icon: Edit3, type: "text" },
  ];

  const readOnlyFields = [
    { key: "id", label: "Employee ID" },
    { key: "joiningDate", label: "Joining Date" },
    { key: "contractDuration", label: "Contract Duration" },
    { key: "salaryType", label: "Salary Type" },
    { key: "salaryAmount", label: "Salary Amount" },
    { key: "amountPaid", label: "Amount Paid" },
    { key: "paymentStatus", label: "Payment Status" },
    { key: "lastPaymentDate", label: "Last Payment" },
  ];

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-6 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-purple-600" />
            Employee Settings
          </h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-purple-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition"
            >
              <Edit3 className="w-5 h-5" /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSaveProfile}
                className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
              >
                <Save className="w-5 h-5" /> Save
              </button>
              <button
                onClick={() => {
                  setFormData(originalData);
                  setIsEditing(false);
                  setErrors({});
                }}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Editable Fields */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-5">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {editableFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key} className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Icon className="w-4 h-4" />
                    {field.label}
                  </label>
                  {isEditing ? (
                    <input
                      type={field.type}
                      value={formData[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition ${
                        errors[field.key] ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={field.label}
                    />
                  ) : (
                    <p className="text-gray-800 font-medium px-4 py-2 bg-gray-50 rounded-lg">
                      {formData[field.key]}
                    </p>
                  )}
                  {errors[field.key] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Read-Only Fields */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-5">Employment & Payment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {readOnlyFields.map((field) => (
              <div key={field.key} className="space-y-1">
                <label className="text-sm font-medium text-gray-600">{field.label}</label>
                <p className="text-gray-800 font-medium px-4 py-2 bg-gray-50 rounded-lg">
                  {formData[field.key]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Change Password
          </h3>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  errors.current ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.current && <p className="text-red-500 text-xs mt-1">{errors.current}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.new}
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  errors.new ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.new && <p className="text-red-500 text-xs mt-1">{errors.new}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  errors.confirm ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>

            <button
              onClick={handleChangePassword}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
            >
              <Lock className="w-5 h-5" /> Update Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper icon for header
const SettingsIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default EmployeeSettings;