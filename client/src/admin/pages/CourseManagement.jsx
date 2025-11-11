// src/admin/pages/CourseManagement.jsx

import React, { useState, useEffect } from "react";

// === COMPACT SVG ICONS ===
const BookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const StudentsIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const CurrencyIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const ClockIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const EyeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EditIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const TrendingUpIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const CategoryIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [students] = useState([
    { id: 1, name: "Aarav Sharma", email: "aarav@email.com", selectedCourse: "1" },
    { id: 2, name: "Priya Patel", email: "priya@email.com", selectedCourse: "2" },
    { id: 3, name: "Rohan Kumar", email: "rohan@email.com", selectedCourse: "3" },
    { id: 4, name: "Sneha Gupta", email: "sneha@email.com", selectedCourse: "4" },
    { id: 5, name: "Vikram Singh", email: "vikram@email.com", selectedCourse: "1" },
    { id: 6, name: "Ananya Reddy", email: "ananya@email.com", selectedCourse: "2" },
    { id: 7, name: "Karthik Iyer", email: "karthik@email.com", selectedCourse: "3" },
    { id: 8, name: "Meera Joshi", email: "meera@email.com", selectedCourse: "4" },
    { id: 9, name: "Arjun Malhotra", email: "arjun@email.com", selectedCourse: "1" },
    { id: 10, name: "Divya Choudhary", email: "divya@email.com", selectedCourse: "2" }
  ]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [newCourse, setNewCourse] = useState({
    name: "", category: "", level: "Beginner", duration: "", fee: "", instructor: "", description: "", startDate: "", status: "Active", maxStudents: ""
  });

  const categories = ["Web Development", "Data Science", "Digital Marketing", "Graphic Design", "Business", "Mobile Development", "Cloud Computing", "Cybersecurity"];
  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  // === FAKE COURSES ===
  const fakeCourses = [
    { id: 1, name: "Full Stack Web Development", category: "Web Development", level: "Intermediate", duration: "6 months", fee: 50000, instructor: "Dr. Rajesh Kumar", description: "Comprehensive full-stack development course covering frontend and backend technologies including React, Node.js, and MongoDB.", startDate: "2024-04-01", status: "Active", maxStudents: 50, enrolledStudents: 45, rating: 4.8, completionRate: 92 },
    { id: 2, name: "Data Science & Machine Learning", category: "Data Science", level: "Advanced", duration: "8 months", fee: 75000, instructor: "Prof. Priya Sharma", description: "Advanced data science course covering machine learning algorithms, data analysis, and AI concepts with real-world projects.", startDate: "2024-03-15", status: "Active", maxStudents: 30, enrolledStudents: 28, rating: 4.9, completionRate: 88 },
    { id: 3, name: "Digital Marketing Mastery", category: "Digital Marketing", level: "Beginner", duration: "3 months", fee: 35000, instructor: "Mr. Amit Patel", description: "Complete digital marketing course covering SEO, SEM, social media marketing, and analytics tools.", startDate: "2024-05-01", status: "Active", maxStudents: 40, enrolledStudents: 35, rating: 4.6, completionRate: 85 },
    { id: 4, name: "UI/UX Design Fundamentals", category: "Graphic Design", level: "Beginner", duration: "4 months", fee: 45000, instructor: "Ms. Sneha Gupta", description: "Learn UI/UX design principles, tools like Figma and Adobe XD, and create professional design portfolios.", startDate: "2024-04-15", status: "Active", maxStudents: 35, enrolledStudents: 32, rating: 4.7, completionRate: 90 },
    { id: 5, name: "Advanced Cloud Computing", category: "Cloud Computing", level: "Expert", duration: "5 months", fee: 60000, instructor: "Dr. Vikram Singh", description: "Master cloud computing concepts with AWS, Azure, and Google Cloud platforms. Includes certification preparation.", startDate: "2024-06-01", status: "Upcoming", maxStudents: 25, enrolledStudents: 18, rating: 4.9, completionRate: 94 },
    { id: 6, name: "Mobile App Development", category: "Mobile Development", level: "Intermediate", duration: "4 months", fee: 48000, instructor: "Mr. Karthik Iyer", description: "Build native and cross-platform mobile applications using React Native and Flutter with backend integration.", startDate: "2024-03-01", status: "Active", maxStudents: 30, enrolledStudents: 25, rating: 4.5, completionRate: 87 },
    { id: 7, name: "Business Analytics", category: "Business", level: "Intermediate", duration: "3 months", fee: 40000, instructor: "Dr. Ananya Reddy", description: "Learn business analytics tools and techniques to make data-driven business decisions and insights.", startDate: "2024-05-15", status: "Upcoming", maxStudents: 40, enrolledStudents: 22, rating: 4.4, completionRate: 89 },
    { id: 8, name: "Cybersecurity Fundamentals", category: "Cybersecurity", level: "Beginner", duration: "4 months", fee: 55000, instructor: "Mr. Arjun Malhotra", description: "Introduction to cybersecurity concepts, network security, ethical hacking, and security best practices.", startDate: "2024-04-20", status: "Active", maxStudents: 20, enrolledStudents: 15, rating: 4.8, completionRate: 91 }
  ];

  // === LOAD FROM LOCALSTORAGE OR FAKE ===
  useEffect(() => {
    const saved = localStorage.getItem("courses");
    if (saved) {
      setCourses(JSON.parse(saved));
    } else {
      setCourses(fakeCourses);
      localStorage.setItem("courses", JSON.stringify(fakeCourses));
    }
  }, []);

  // === FILTER & SORT ===
  const filteredAndSortedCourses = courses
    .filter(c => {
      const search = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.category.toLowerCase().includes(searchTerm.toLowerCase());
      const cat = categoryFilter === "all" || c.category === categoryFilter;
      const lvl = levelFilter === "all" || c.level === levelFilter;
      return search && cat && lvl;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity": return b.enrolledStudents - a.enrolledStudents;
        case "fee": return b.fee - a.fee;
        case "name": return a.name.localeCompare(b.name);
        case "rating": return b.rating - a.rating;
        case "completionRate": return b.completionRate - a.completionRate;
        case "startDate": return new Date(a.startDate) - new Date(b.startDate);
        default: return 0;
      }
    });

  // === COLOR HELPERS ===
  const getStatusColor = (s) => s === "Active" ? "text-green-600 bg-green-50 border-green-200" : s === "Upcoming" ? "text-blue-600 bg-blue-50 border-blue-200" : "text-gray-600 bg-gray-50 border-gray-200";
  const getLevelColor = (l) => l === "Beginner" ? "text-green-600 bg-green-50 border-green-200" : l === "Intermediate" ? "text-yellow-600 bg-yellow-50 border-yellow-200" : l === "Advanced" ? "text-orange-600 bg-orange-50 border-orange-200" : "text-red-600 bg-red-50 border-red-200";
  const getEnrollmentColor = (e, m) => (e/m)*100 >= 90 ? "text-red-600 bg-red-50 border-red-200" : (e/m)*100 >= 75 ? "text-yellow-600 bg-yellow-50 border-yellow-200" : "text-green-600 bg-green-50 border-green-200";

  // === CRUD ===
  const handleAddCourse = (e) => {
    e.preventDefault();
    const course = {
      id: Date.now(),
      ...newCourse,
      fee: parseInt(newCourse.fee),
      maxStudents: parseInt(newCourse.maxStudents),
      enrolledStudents: Math.floor(Math.random() * newCourse.maxStudents),
      rating: (Math.random() * 1 + 4).toFixed(1),
      completionRate: Math.floor(Math.random() * 20 + 80)
    };
    const updated = [...courses, course];
    setCourses(updated);
    localStorage.setItem("courses", JSON.stringify(updated));
    setIsAddModalOpen(false);
    setNewCourse({ name: "", category: "", level: "Beginner", duration: "", fee: "", instructor: "", description: "", startDate: "", status: "Active", maxStudents: "" });
  };

  const handleEditCourse = (e) => {
    e.preventDefault();
    const updated = courses.map(c => c.id === selectedCourse.id ? { ...selectedCourse, fee: parseInt(selectedCourse.fee), maxStudents: parseInt(selectedCourse.maxStudents) } : c);
    setCourses(updated);
    localStorage.setItem("courses", JSON.stringify(updated));
    setIsEditModalOpen(false);
    setSelectedCourse(null);
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const updated = courses.filter(c => c.id !== id);
      setCourses(updated);
      localStorage.setItem("courses", JSON.stringify(updated));
      if (selectedCourse?.id === id) setSelectedCourse(null);
    }
  };

  const openEditModal = (c) => { setSelectedCourse(c); setIsEditModalOpen(true); };
  const getEnrolledStudents = (id) => students.filter(s => s.selectedCourse === id.toString());

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Course Management</h1>
          <p className="text-gray-600 mt-1">Manage courses, fees, and enrollment</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
          {[
            { label: "Courses", value: courses.length, icon: BookIcon, color: "blue" },
            { label: "Students", value: courses.reduce((s, c) => s + c.enrolledStudents, 0), icon: StudentsIcon, color: "green" },
            { label: "Active", value: courses.filter(c => c.status === "Active").length, icon: TrendingUpIcon, color: "purple" },
            { label: "Avg Rating", value: (courses.reduce((s, c) => s + c.rating, 0) / courses.length).toFixed(1), icon: CurrencyIcon, color: "orange" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4 border-l-4" style={{ borderLeftColor: i === 0 ? "#3B82F6" : i === 1 ? "#10B981" : i === 2 ? "#8B5CF6" : "#F97316" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COMPACT TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-4 md:p-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">Course Catalog</h2>
              <div className="flex flex-col md:flex-row gap-2">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-1.5 text-sm border rounded-md">
                  <option value="popularity">Popularity</option>
                  <option value="fee">Fee</option>
                  <option value="name">Name</option>
                </select>
                <div className="relative">
                  <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-8 pr-3 py-1.5 text-sm border rounded-md w-full md:w-48" />
                  <SearchIcon className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
                </div>
                <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1">
                  <BookIcon /> Add
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50 text-xs">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">Course</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Cat & Level</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-600">Fee</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-600">Enroll</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-600">Rating</th>
                  <th className="px-3 py-2 text-center font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {filteredAndSortedCourses.map(c => {
                  const pct = Math.round((c.enrolledStudents / c.maxStudents) * 100);
                  return (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {c.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{c.name}</div>
                            <div className="text-xs text-gray-500 truncate">{c.instructor}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-xs">
                        <div>{c.category}</div>
                        <div className={`mt-1 px-2 py-0.5 rounded-full text-xs font-bold border ${getLevelColor(c.level)}`}>
                          {c.level}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-xs">
                        <div>₹{c.fee.toLocaleString()}</div>
                        <div className="text-gray-600">{c.duration}</div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${getEnrollmentColor(c.enrolledStudents, c.maxStudents)}`}>
                          {pct}%
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className="text-yellow-600 font-bold">⭐ {c.rating}</span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex justify-center gap-1">
                          <button onClick={() => setSelectedCourse(c)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="View">
                            <EyeIcon />
                          </button>
                          <button onClick={() => openEditModal(c)} className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded" title="Edit">
                            <EditIcon />
                          </button>
                          <button onClick={() => handleDeleteCourse(c.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete">
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredAndSortedCourses.length === 0 && (
            <div className="text-center py-10 text-gray-500">No courses found</div>
          )}
        </div>

        {/* === VIEW MODAL === */}
        {selectedCourse && !isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {selectedCourse.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedCourse.name}</h2>
                      <p className="text-blue-100">{selectedCourse.category} • {selectedCourse.level}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedCourse(null)} className="text-white hover:text-blue-200">
                    <CloseIcon />
                  </button>
                </div>
              </div>
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <BookIcon className="w-5 h-5 mr-2 text-gray-600" />
                      Course Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Course Name</span>
                        <span className="text-gray-900 font-semibold">{selectedCourse.name}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Instructor</span>
                        <span className="text-gray-900">{selectedCourse.instructor}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Category</span>
                        <span className="text-gray-900">{selectedCourse.category}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium">Level</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getLevelColor(selectedCourse.level)}`}>
                          {selectedCourse.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2 text-gray-600" />
                      Course Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Duration</span>
                        <span className="text-gray-900">{selectedCourse.duration}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Start Date</span>
                        <span className="text-gray-900">{selectedCourse.startDate}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Status</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedCourse.status)}`}>
                          {selectedCourse.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium">Max Students</span>
                        <span className="text-gray-900">{selectedCourse.maxStudents}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Description</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedCourse.description}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                    <TrendingUpIcon className="w-5 h-5 mr-2 text-gray-600" />
                    Performance & Enrollment
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">₹{selectedCourse.fee.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 font-medium">Course Fee</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{selectedCourse.enrolledStudents}</div>
                      <div className="text-sm text-gray-600 font-medium">Enrolled Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">{selectedCourse.rating}/5</div>
                      <div className="text-sm text-gray-600 font-medium">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{selectedCourse.completionRate}%</div>
                      <div className="text-sm text-gray-600 font-medium">Completion Rate</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Enrolled Students ({getEnrolledStudents(selectedCourse.id).length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getEnrolledStudents(selectedCourse.id).slice(0, 6).map(student => (
                      <div key={student.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    ))}
                    {getEnrolledStudents(selectedCourse.id).length > 6 && (
                      <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">
                          +{getEnrolledStudents(selectedCourse.id).length - 6} more students
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => openEditModal(selectedCourse)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                  >
                    <EditIcon className="w-4 h-4" />
                    <span>Edit Course</span>
                  </button>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === ADD COURSE MODAL === */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Add New Course</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddCourse} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                    <input
                      type="text"
                      required
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Full Stack Web Development"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      required
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                    <select
                      required
                      value={newCourse.level}
                      onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {levels.map(lvl => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 3 months"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Fee (₹)</label>
                    <input
                      type="number"
                      required
                      value={newCourse.fee}
                      onChange={(e) => setNewCourse({ ...newCourse, fee: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                    <input
                      type="text"
                      required
                      value={newCourse.instructor}
                      onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={newCourse.startDate}
                      onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Students</label>
                    <input
                      type="number"
                      required
                      value={newCourse.maxStudents}
                      onChange={(e) => setNewCourse({ ...newCourse, maxStudents: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      required
                      value={newCourse.status}
                      onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Active">Active</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Add Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* === EDIT COURSE MODAL === */}
        {isEditModalOpen && selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Edit Course</h2>
                <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleEditCourse} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                    <input
                      type="text"
                      required
                      value={selectedCourse.name}
                      onChange={(e) => setSelectedCourse({ ...selectedCourse, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      required
                      value={selectedCourse.category}
                      onChange={(e) => setSelectedCourse({ ...selectedCourse, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                    <select
                      required
                      value={selectedCourse.level}
                      onChange={(e) => setSelectedCourse({ ...selectedCourse, level: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {levels.map(lvl => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      required
                      value={selectedCourse.duration}
                      onChange={(e) => setSelectedCourse({ ...selectedCourse, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Fee (₹)</label>
                    <input
                      type="number"
                      required
                      value={selectedCourse.fee}
                      onChange={(e) => setSelectedCourse({ ...selectedCourse, fee: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                    <input
                      type="text"
                      required
                      value={selectedCourse.instructor}
                      onChange={(e) => setSelectedCourse({ ...selectedCourse, instructor: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={selectedCourse.startDate}
                      onChange={(e) => setSelectedCourse({ ...selectedCourse, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Students</label>
                    <input
                      type="number"
                      required
                      value={selectedCourse.maxStudents}
                      onChange={(e) => setSelectedCourse({ ...selectedCourse, maxStudents: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      required
                      value={selectedCourse.status}
                      onChange={(e) => setSelectedCourse({ ...selectedCourse, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Active">Active</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={selectedCourse.description}
                      onChange={(e) => setSelectedCourse({ ...selectedCourse, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Update Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CourseManagement;