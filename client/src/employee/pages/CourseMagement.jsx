import React, { useState, useEffect } from "react";
import { format, differenceInDays } from "date-fns";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  BellIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  XMarkIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

const CourseManagement = () => {
  /* ==================== STATE ==================== */
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Web Development",
      description: "Complete full-stack web development with HTML, CSS, JS, React & Node",
      whatYouLearn: "HTML5, CSS3, JavaScript ES6+, React.js, Node.js, Express, MongoDB, REST APIs, Deployment",
      language: "English", // Fixed internally
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      students: [
        {
          id: 1,
          name: "Yadnesh Umredkar",
          email: "yadneshumredkar70@gmail.com",
          phone: "+91902965759",
          joinDate: "2024-01-15",
          feeStatus: "pending",
          totalFee: 18888,
          paidAmount: 1600,
          reminderMessage: "Please pay remaining ₹17,288 by 20th Nov to avoid late fee.",
        },
        {
          id: 2,
          name: "Priya Singh",
          email: "priya@edu.com",
          phone: "+919876543202",
          joinDate: "2024-01-18",
          feeStatus: "paid",
          totalFee: 18000,
          paidAmount: 18000,
          reminderMessage: "",
        },
        {
          id: 3,
          name: "Rohan Verma",
          email: "rohan@edu.com",
          phone: "+919876543203",
          joinDate: "2024-01-20",
          feeStatus: "pending",
          totalFee: 18000,
          paidAmount: 10000,
          reminderMessage: "₹8,000 pending. Pay soon!",
        },
      ],
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  /* ==================== ANALYTICS ==================== */
  const totalStudents = courses.reduce((sum, c) => sum + c.students.length, 0);
  const totalCourses = courses.length;

  const totalPendingFees = courses.reduce(
    (sum, c) =>
      sum +
      c.students.reduce(
        (sSum, s) => sSum + (s.feeStatus === "pending" ? s.totalFee - s.paidAmount : 0),
        0
      ),
    0
  );

  const reminders = courses.reduce(
    (sum, c) => sum + c.students.filter((s) => s.feeStatus === "pending").length,
    0
  );

  /* ==================== HELPERS ==================== */
  const formatCurrency = (amount) => `₹${amount.toLocaleString()}`;

  const calculateDuration = (start, end) => {
    const days = differenceInDays(new Date(end), new Date(start));
    return `${days} days`;
  };

  const getFeeStatusBadge = (status) => {
    return status === "paid" ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircleIcon className="w-4 h-4 mr-1" />
        Paid
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <XCircleIcon className="w-4 h-4 mr-1" />
        Pending
      </span>
    );
  };

  const openStudentDetail = (student) => {
    setSelectedStudent(student);
    setShowStudentDetailModal(true);
  };

  const sendWhatsAppReminder = (student) => {
    const pending = student.totalFee - student.paidAmount;
    const message = student.reminderMessage || 
      `Dear ${student.name},\n\nYour pending fee is *${formatCurrency(pending)}*.\nPlease pay soon to continue your course.\n\nThank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${student.phone}?text=${encodedMessage}`;
    
    window.open(whatsappURL, "_blank");
  };

  /* ==================== COURSE CRUD ==================== */
  const handleSaveCourse = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      title: form.courseTitle.value,
      description: form.description.value,
      whatYouLearn: form.whatYouLearn.value,
      language: "English", // Fixed
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      students: editingCourse?.students || [],
    };

    if (editingCourse) {
      setCourses((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? { ...c, ...data } : c))
      );
      setSelectedCourse((prev) => ({ ...prev, ...data }));
    } else {
      const newCourse = { ...data, id: Date.now() };
      setCourses((prev) => [...prev, newCourse]);
      setSelectedCourse(newCourse);
    }

    setShowCourseModal(false);
    setEditingCourse(null);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Delete this course and all its students?")) {
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
      if (selectedCourse?.id === courseId) {
        setSelectedCourse(courses[0] || null);
      }
    }
  };

  /* ==================== STUDENT CRUD ==================== */
  const handleSaveStudent = (e) => {
    e.preventDefault();
    const form = e.target;
    const totalFee = parseInt(form.totalFee.value) || 18000;
    const paidAmount = parseInt(form.paidAmount?.value) || 0;

    const data = {
      id: editingStudent?.id || Date.now(),
      name: form.studentName.value,
      email: form.email.value,
      phone: form.phone.value.startsWith("+") ? form.phone.value : `+91${form.phone.value}`,
      joinDate: form.joinDate.value,
      feeStatus: paidAmount >= totalFee ? "paid" : "pending",
      totalFee,
      paidAmount,
      reminderMessage: editingStudent?.reminderMessage || "",
    };

    setCourses((prev) =>
      prev.map((c) =>
        c.id === selectedCourse.id
          ? {
              ...c,
              students: editingStudent
                ? c.students.map((s) => (s.id === editingStudent.id ? data : s))
                : [...c.students, data],
            }
          : c
      )
    );

    setSelectedCourse((prev) => ({
      ...prev,
      students: editingStudent
        ? prev.students.map((s) => (s.id === editingStudent.id ? data : s))
        : [...prev.students, data],
    }));

    setShowStudentModal(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm("Remove this student from the course?")) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === selectedCourse.id
            ? { ...c, students: c.students.filter((s) => s.id !== studentId) }
            : c
        )
      );
      setSelectedCourse((prev) => ({
        ...prev,
        students: prev.students.filter((s) => s.id !== studentId),
      }));
    }
  };

  const updateStudentReminder = (message) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === selectedCourse.id
          ? {
              ...c,
              students: c.students.map((s) =>
                s.id === selectedStudent.id ? { ...s, reminderMessage: message } : s
              ),
            }
          : c
      )
    );
    setSelectedStudent((prev) => ({ ...prev, reminderMessage: message }));
  };

  /* ==================== EFFECTS ==================== */
  useEffect(() => {
    if (courses.length > 0 && !selectedCourse) {
      setSelectedCourse(courses[0]);
    }
  }, [courses, selectedCourse]);

  /* ==================== RENDER ==================== */
  if (!selectedCourse) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-xl text-gray-500 mb-4">No courses available</p>
          <button
            onClick={() => {
              setEditingCourse(null);
              setShowCourseModal(true);
            }}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 flex items-center mx-auto"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create First Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* ==================== TOP DASHBOARD ==================== */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Fees, Attendance & Reminders</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border-l-4 border-blue-500">
              <div>
                <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
                <p className="text-sm text-gray-600 mt-1">Students</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border-l-4 border-green-500">
              <div>
                <p className="text-3xl font-bold text-green-600">{totalCourses}</p>
                <p className="text-sm text-gray-600 mt-1">Courses</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <AcademicCapIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border-l-4 border-purple-500">
              <div>
                <p className="text-3xl font-bold text-purple-600">{formatCurrency(totalPendingFees)}</p>
                <p className="text-sm text-gray-600 mt-1">Pending Fees</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border-l-4 border-orange-500">
              <div>
                <p className="text-3xl font-bold text-orange-600">{reminders}</p>
                <p className="text-sm text-gray-600 mt-1">Reminders</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <BellIcon className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* ==================== COURSE MANAGEMENT ==================== */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
          <button
            onClick={() => {
              setEditingCourse(null);
              setShowCourseModal(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            New Course
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Course Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-indigo-600" />
                Courses
              </h3>
              <div className="space-y-2">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className={`p-3 rounded cursor-pointer transition-colors ${
                      selectedCourse.id === course.id
                        ? "bg-indigo-50 border-l-4 border-indigo-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <p className="font-medium text-sm">{course.title}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(course.startDate), "MMM d")} - {format(new Date(course.endDate), "MMM d, yyyy")}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{course.students.length} students</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Details & Students */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedCourse.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedCourse.description}</p>
                  <div className="flex items-center gap-6 mt-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-1 text-indigo-600" />
                      <span><strong>Start:</strong> {format(new Date(selectedCourse.startDate), "dd MMM yyyy")}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-1 text-red-600" />
                      <span><strong>End:</strong> {format(new Date(selectedCourse.endDate), "dd MMM yyyy")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCourse(selectedCourse);
                      setShowCourseModal(true);
                    }}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(selectedCourse.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <LightBulbIcon className="w-5 h-5 mr-2 text-yellow-600" />
                  What You'll Learn
                </h4>
                <p className="text-sm text-gray-600">{selectedCourse.whatYouLearn}</p>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <UsersIcon className="w-5 h-5 mr-2 text-indigo-600" />
                  Enrolled Students ({selectedCourse.students.length})
                </h3>
                <button
                  onClick={() => {
                    setEditingStudent(null);
                    setShowStudentModal(true);
                  }}
                  className="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700 flex items-center"
                >
                  <UserPlusIcon className="w-4 h-4 mr-1" />
                  Add Student
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Fee</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedCourse.students.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-4 py-8 text-center text-gray-500">No students enrolled yet.</td>
                      </tr>
                    ) : (
                      selectedCourse.students.map((student) => {
                        const pending = student.totalFee - student.paidAmount;
                        return (
                          <tr key={student.id}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <button
                                onClick={() => openStudentDetail(student)}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-900 hover:underline"
                              >
                                {student.name}
                              </button>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{student.email}</div>
                              <div className="text-xs text-gray-400">{student.phone}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              {formatCurrency(student.totalFee)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600">
                              {formatCurrency(student.paidAmount)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-red-600">
                              {formatCurrency(pending)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {getFeeStatusBadge(student.feeStatus)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                              {student.feeStatus === "pending" && (
                                <button
                                  onClick={() => sendWhatsAppReminder(student)}
                                  className="text-green-600 hover:text-green-800 mr-2"
                                  title="Send WhatsApp Reminder"
                                >
                                  <svg className="w-4 h-4 inline" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.263c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                  </svg>
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setEditingStudent(student);
                                  setShowStudentModal(true);
                                }}
                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                              >
                                <PencilIcon className="w-4 h-4 inline" />
                              </button>
                              <button
                                onClick={() => handleDeleteStudent(student.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <TrashIcon className="w-4 h-4 inline" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== STUDENT DETAIL MODAL ==================== */}
      {showStudentDetailModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-white text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-3">
                  {selectedStudent.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                  <p className="text-sm opacity-90">Student Details</p>
                </div>
              </div>
              <button
                onClick={() => setShowStudentDetailModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <UserIcon className="w-5 h-5 mr-2 text-indigo-600" />
                    Personal Information
                  </h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr><td className="py-1 font-medium">Full Name</td><td className="py-1">{selectedStudent.name}</td></tr>
                      <tr><td className="py-1 font-medium">Email</td><td className="py-1">{selectedStudent.email}</td></tr>
                      <tr><td className="py-1 font-medium">Phone</td><td className="py-1">{selectedStudent.phone}</td></tr>
                      <tr><td className="py-1 font-medium">Enrolled</td><td className="py-1">{format(new Date(selectedStudent.joinDate), "dd MMM yyyy")}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <AcademicCapIcon className="w-5 h-5 mr-2 text-green-600" />
                    Course Details
                  </h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr><td className="py-1 font-medium">Course</td><td className="py-1">{selectedCourse.title}</td></tr>
                      <tr><td className="py-1 font-medium">Duration</td><td className="py-1">{calculateDuration(selectedCourse.startDate, selectedCourse.endDate)}</td></tr>
                      <tr><td className="py-1 font-medium">Total Fee</td><td className="py-1 text-green-600 font-semibold">{formatCurrency(selectedStudent.totalFee)}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-5">
                <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                  <CurrencyDollarIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Financial Overview
                </h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{formatCurrency(selectedStudent.totalFee)}</p>
                    <p className="text-xs text-gray-600">Total Fee</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(selectedStudent.paidAmount)}</p>
                    <p className="text-xs text-gray-600">Paid</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(selectedStudent.totalFee - selectedStudent.paidAmount)}</p>
                    <p className="text-xs text-gray-600">Pending</p>
                  </div>
                </div>
              </div>

              {selectedStudent.feeStatus === "pending" && (
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <BellIcon className="w-5 h-5 mr-2 text-orange-600" />
                    Custom Reminder Message
                  </h4>
                  <textarea
                    value={selectedStudent.reminderMessage}
                    onChange={(e) => updateStudentReminder(e.target.value)}
                    placeholder="Enter custom reminder..."
                    className="w-full p-3 border border-orange-200 rounded-md text-sm focus:ring-2 focus:ring-orange-500"
                    rows="3"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-2">
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-green-600">80%</p>
                  <p className="text-sm text-gray-600">Attendance</p>
                  <p className="text-xs text-gray-500">Based on 5 classes</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-2">
                    <BellIcon className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="text-3xl font-bold text-orange-600">
                    {selectedStudent.feeStatus === "pending" ? 1 : 0}
                  </p>
                  <p className="text-sm text-gray-600">Reminders</p>
                  <p className="text-xs text-gray-500">Pending fee</p>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-4">
                {selectedStudent.feeStatus === "pending" && (
                  <button
                    onClick={() => sendWhatsAppReminder(selectedStudent)}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.263c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Send WhatsApp
                  </button>
                )}
                <button
                  onClick={() => setShowStudentDetailModal(false)}
                  className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== COURSE MODAL (NO LANGUAGE FIELD) ==================== */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto p-6">
            <h3 className="text-xl font-bold mb-6">{editingCourse ? "Edit Course" : "Create New Course"}</h3>
            <form onSubmit={handleSaveCourse} className="space-y-5">
              <input type="text" name="courseTitle" defaultValue={editingCourse?.title} placeholder="Course Title" required className="w-full px-3 py-2 border rounded-md" />
              <textarea name="description" defaultValue={editingCourse?.description} placeholder="Description" required rows="2" className="w-full px-3 py-2 border rounded-md"></textarea>
              <textarea name="whatYouLearn" defaultValue={editingCourse?.whatYouLearn} placeholder="What You'll Learn" required rows="3" className="w-full px-3 py-2 border rounded-md"></textarea>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" name="startDate" defaultValue={editingCourse?.startDate} required className="w-full px-3 py-2 border rounded-md" />
                <input type="date" name="endDate" defaultValue={editingCourse?.endDate} required className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => { setShowCourseModal(false); setEditingCourse(null); }} className="px-5 py-2 border rounded text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                  {editingCourse ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== STUDENT MODAL (NO LANGUAGE) ==================== */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold mb-6">{editingStudent ? "Edit Student" : "Add New Student"}</h3>
            <form onSubmit={handleSaveStudent} className="space-y-4">
              <input type="text" name="studentName" defaultValue={editingStudent?.name} placeholder="Full Name" required className="w-full px-3 py-2 border rounded-md" />
              <input type="email" name="email" defaultValue={editingStudent?.email} placeholder="Email" required className="w-full px-3 py-2 border rounded-md" />
              <input type="tel" name="phone" defaultValue={editingStudent?.phone?.replace("+91", "")} placeholder="Phone (10 digits)" required className="w-full px-3 py-2 border rounded-md" />
              <input type="date" name="joinDate" defaultValue={editingStudent?.joinDate || new Date().toISOString().split("T")[0]} required className="w-full px-3 py-2 border rounded-md" />
              <input type="number" name="totalFee" defaultValue={editingStudent?.totalFee || 18000} placeholder="Total Fee" required className="w-full px-3 py-2 border rounded-md" />
              <input type="number" name="paidAmount" defaultValue={editingStudent?.paidAmount || 0} placeholder="Paid Amount" className="w-full px-3 py-2 border rounded-md" />
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => { setShowStudentModal(false); setEditingStudent(null); }} className="px-5 py-2 border rounded text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  {editingStudent ? "Update" : "Add"} Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;