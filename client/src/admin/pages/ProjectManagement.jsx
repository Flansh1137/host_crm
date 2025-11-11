// src/admin/pages/ProjectManagement.jsx

import React, { useState, useEffect } from "react";

// Professional Icons as SVG Components
const ProjectIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UsersIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const CurrencyIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const EyeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EditIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChartIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("priority");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    client: "",
    startDate: "",
    endDate: "",
    budget: "",
    status: "Planning",
    priority: "Medium",
    teamMembers: [],
    progress: 0
  });

  // Project Statuses
  const statuses = ["Planning", "In Progress", "On Hold", "Completed", "Cancelled"];
  
  // Priority Levels
  const priorities = ["Low", "Medium", "High", "Urgent"];

  // FAKE CLIENTS DATA
  const fakeClients = [
    { id: 1, name: "Tech Solutions Inc.", email: "contact@techsolutions.com" },
    { id: 2, name: "Global Enterprises", email: "info@globalent.com" },
    { id: 3, name: "Innovate Labs", email: "hello@innovatelabs.com" },
    { id: 4, name: "Digital Ventures", email: "contact@digitalventures.com" },
    { id: 5, name: "Future Systems", email: "info@futuresystems.com" }
  ];

  // FAKE TEAM MEMBERS DATA
  const fakeTeamMembers = [
    { id: 1, name: "Rajesh Kumar", role: "Project Manager", email: "rajesh@company.com" },
    { id: 2, name: "Priya Sharma", role: "Frontend Developer", email: "priya@company.com" },
    { id: 3, name: "Amit Patel", role: "Backend Developer", email: "amit@company.com" },
    { id: 4, name: "Sneha Gupta", role: "UI/UX Designer", email: "sneha@company.com" },
    { id: 5, name: "Vikram Singh", role: "QA Engineer", email: "vikram@company.com" },
    { id: 6, name: "Ananya Reddy", role: "DevOps Engineer", email: "ananya@company.com" }
  ];

  // FAKE PROJECTS DATA
  const fakeProjects = [
    {
      id: 1,
      name: "E-commerce Platform Development",
      description: "Build a comprehensive e-commerce platform with React frontend and Node.js backend. Includes user authentication, product management, payment integration, and order processing.",
      client: "1",
      startDate: "2024-01-15",
      endDate: "2024-06-15",
      budget: 250000,
      status: "In Progress",
      priority: "High",
      teamMembers: ["1", "2", "3", "4"],
      progress: 65,
      tasksCompleted: 23,
      totalTasks: 35,
      createdAt: "2024-01-10"
    },
    {
      id: 2,
      name: "Mobile Banking App",
      description: "Develop a secure mobile banking application with biometric authentication, transaction tracking, and financial analytics features.",
      client: "2",
      startDate: "2024-02-01",
      endDate: "2024-08-01",
      budget: 180000,
      status: "Planning",
      priority: "Urgent",
      teamMembers: ["1", "3", "5"],
      progress: 20,
      tasksCompleted: 8,
      totalTasks: 40,
      createdAt: "2024-01-25"
    },
    {
      id: 3,
      name: "CRM System Implementation",
      description: "Implement and customize a CRM system for sales and customer service teams with analytics and reporting capabilities.",
      client: "3",
      startDate: "2024-01-20",
      endDate: "2024-04-20",
      budget: 120000,
      status: "In Progress",
      priority: "Medium",
      teamMembers: ["2", "4", "6"],
      progress: 85,
      tasksCompleted: 34,
      totalTasks: 40,
      createdAt: "2024-01-15"
    },
    {
      id: 4,
      name: "AI-Powered Analytics Dashboard",
      description: "Create an AI-driven analytics dashboard with real-time data visualization, predictive analytics, and custom reporting features.",
      client: "4",
      startDate: "2024-03-01",
      endDate: "2024-09-01",
      budget: 300000,
      status: "Planning",
      priority: "High",
      teamMembers: ["1", "2", "3", "4", "5", "6"],
      progress: 10,
      tasksCompleted: 4,
      totalTasks: 45,
      createdAt: "2024-02-15"
    },
    {
      id: 5,
      name: "Website Redesign",
      description: "Complete redesign of corporate website with modern UI/UX, improved performance, and SEO optimization.",
      client: "5",
      startDate: "2024-01-10",
      endDate: "2024-03-10",
      budget: 80000,
      status: "Completed",
      priority: "Medium",
      teamMembers: ["2", "4"],
      progress: 100,
      tasksCompleted: 25,
      totalTasks: 25,
      createdAt: "2024-01-05"
    },
    {
      id: 6,
      name: "Inventory Management System",
      description: "Develop an inventory management system with barcode scanning, stock tracking, and automated reordering capabilities.",
      client: "1",
      startDate: "2024-02-15",
      endDate: "2024-07-15",
      budget: 150000,
      status: "On Hold",
      priority: "Low",
      teamMembers: ["3", "5"],
      progress: 30,
      tasksCompleted: 9,
      totalTasks: 30,
      createdAt: "2024-02-01"
    }
  ];

  // FORCE LOAD FAKE DATA
  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    const savedClients = localStorage.getItem("clients");
    const savedTeamMembers = localStorage.getItem("teamMembers");

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(fakeProjects);
      localStorage.setItem("projects", JSON.stringify(fakeProjects));
    }

    if (savedClients) {
      setClients(JSON.parse(savedClients));
    } else {
      setClients(fakeClients);
      localStorage.setItem("clients", JSON.stringify(fakeClients));
    }

    if (savedTeamMembers) {
      setTeamMembers(JSON.parse(savedTeamMembers));
    } else {
      setTeamMembers(fakeTeamMembers);
      localStorage.setItem("teamMembers", JSON.stringify(fakeTeamMembers));
    }
  }, []);

  // Sort and filter projects
  const filteredAndSortedProjects = projects
    .filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { "Urgent": 4, "High": 3, "Medium": 2, "Low": 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "progress":
          return b.progress - a.progress;
        case "budget":
          return b.budget - a.budget;
        case "name":
          return a.name.localeCompare(b.name);
        case "endDate":
          return new Date(a.endDate) - new Date(b.endDate);
        default:
          return 0;
      }
    });

  const getStatusColor = (status) => {
    switch (status) {
      case "Planning": return "text-blue-600 bg-blue-50 border-blue-200";
      case "In Progress": return "text-green-600 bg-green-50 border-green-200";
      case "On Hold": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Completed": return "text-purple-600 bg-purple-50 border-purple-200";
      case "Cancelled": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent": return "text-red-600 bg-red-50 border-red-200";
      case "High": return "text-orange-600 bg-orange-50 border-orange-200";
      case "Medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    if (progress >= 30) return "bg-orange-500";
    return "bg-red-500";
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const project = {
      id: Date.now(),
      ...newProject,
      budget: parseInt(newProject.budget),
      progress: parseInt(newProject.progress),
      tasksCompleted: Math.floor(Math.random() * 20),
      totalTasks: Math.floor(Math.random() * 30) + 20,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setIsAddModalOpen(false);
    setNewProject({
      name: "",
      description: "",
      client: "",
      startDate: "",
      endDate: "",
      budget: "",
      status: "Planning",
      priority: "Medium",
      teamMembers: [],
      progress: 0
    });
  };

  const handleEditProject = (e) => {
    e.preventDefault();
    const updatedProjects = projects.map(project =>
      project.id === selectedProject.id ? { 
        ...selectedProject, 
        budget: parseInt(selectedProject.budget),
        progress: parseInt(selectedProject.progress)
      } : project
    );
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setIsEditModalOpen(false);
    setSelectedProject(null);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter(project => project.id !== id);
      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      if (selectedProject?.id === id) {
        setSelectedProject(null);
      }
    }
  };

  const openEditModal = (project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  // Get client name by ID
  const getClientName = (clientId) => {
    return clients.find(client => client.id === parseInt(clientId))?.name || "Unknown Client";
  };

  // Get team members for a project
  const getProjectTeamMembers = (project) => {
    return teamMembers.filter(member => 
      project.teamMembers.includes(member.id.toString())
    );
  };

  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === "In Progress").length,
    completed: projects.filter(p => p.status === "Completed").length,
    totalBudget: projects.reduce((sum, project) => sum + project.budget, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Project Management</h1>
          <p className="text-gray-600 text-lg">Manage and track all projects efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Projects</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ProjectIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.inProgress}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <ChartIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.completed}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <CheckIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Budget</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">₹{stats.totalBudget.toLocaleString()}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <CurrencyIcon className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Projects Portfolio</h2>
                <p className="text-gray-600 mt-1">Manage and track all active projects</p>
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="priority">Sort by Priority</option>
                    <option value="progress">Sort by Progress</option>
                    <option value="budget">Sort by Budget</option>
                    <option value="name">Sort by Name</option>
                    <option value="endDate">Sort by Deadline</option>
                  </select>
                  
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>

                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Priority</option>
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400">
                      <SearchIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                  >
                    <ProjectIcon className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project Information</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client & Team</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Budget & Timeline</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status & Priority</th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedProjects.map(project => {
                  const projectTeam = getProjectTeamMembers(project);
                  
                  return (
                    <tr key={project.id} className="hover:bg-gray-50 transition-colors duration-200">
                      {/* Project Information */}
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                              {project.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-gray-900">{project.name}</div>
                            <div className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</div>
                          </div>
                        </div>
                      </td>

                      {/* Client & Team */}
                      <td className="px-6 py-6">
                        <div className="space-y-2">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{getClientName(project.client)}</div>
                            <div className="text-xs text-gray-500">Client</div>
                          </div>
                          <div className="flex -space-x-2">
                            {projectTeam.slice(0, 3).map(member => (
                              <div key={member.id} className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            ))}
                            {projectTeam.length > 3 && (
                              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-semibold border-2 border-white">
                                +{projectTeam.length - 3}
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{projectTeam.length} team members</div>
                        </div>
                      </td>

                      {/* Budget & Timeline */}
                      <td className="px-6 py-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Budget:</span>
                            <span className="text-sm font-semibold text-green-600">₹{project.budget.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Start:</span>
                            <span className="text-sm text-gray-900">{project.startDate}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">End:</span>
                            <span className="text-sm text-gray-900">{project.endDate}</span>
                          </div>
                        </div>
                      </td>

                      {/* Progress */}
                      <td className="px-6 py-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Progress:</span>
                            <span className="font-semibold">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {project.tasksCompleted}/{project.totalTasks} tasks
                          </div>
                        </div>
                      </td>

                      {/* Status & Priority */}
                      <td className="px-6 py-6">
                        <div className="space-y-2">
                          <div className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                            {project.status}
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(project.priority)}`}>
                            {project.priority} Priority
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1"
                          >
                            <EyeIcon className="w-4 h-4" />
                            <span className="text-sm">View</span>
                          </button>
                          <button
                            onClick={() => openEditModal(project)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1"
                          >
                            <EditIcon className="w-4 h-4" />
                            <span className="text-sm">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1"
                          >
                            <DeleteIcon className="w-4 h-4" />
                            <span className="text-sm">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredAndSortedProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <ProjectIcon className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or add new projects</p>
            </div>
          )}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && !isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedProject.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedProject.name}</h2>
                    <p className="text-blue-100">{getClientName(selectedProject.client)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white hover:text-blue-200 transition-colors duration-200"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Project Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Project Name</span>
                      <span className="text-gray-900 font-semibold">{selectedProject.name}</span>
                    </div>
                                       <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Description</span>
                      <span className="text-gray-900 max-w-xs text-right">{selectedProject.description}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Start Date</span>
                      <span className="text-gray-900">{selectedProject.startDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">End Date</span>
                      <span className="text-gray-900">{selectedProject.endDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Budget</span>
                      <span className="text-green-600 font-bold">₹{selectedProject.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Priority */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Status & Priority</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedProject.status)}`}>
                        {selectedProject.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Priority</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(selectedProject.priority)}`}>
                        {selectedProject.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Progress</span>
                      <span className="text-gray-900 font-bold">{selectedProject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(selectedProject.progress)}`}
                        style={{ width: `${selectedProject.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 text-center mt-2">
                      {selectedProject.tasksCompleted} of {selectedProject.totalTasks} tasks completed
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <UsersIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Team Members ({getProjectTeamMembers(selectedProject).length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getProjectTeamMembers(selectedProject).map(member => (
                    <div key={member.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    openEditModal(selectedProject);
                    setSelectedProject(null);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <EditIcon className="w-4 h-4" />
                  <span>Edit Project</span>
                </button>
                <button
                  onClick={() => {
                    handleDeleteProject(selectedProject.id);
                    setSelectedProject(null);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <DeleteIcon className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <ProjectIcon className="w-6 h-6 mr-2 text-blue-600" />
                Add New Project
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddProject} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                  <input
                    type="text"
                    required
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., E-commerce Platform"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                  <select
                    required
                    value={newProject.client}
                    onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  rows={3}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the project..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    required
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    required
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                    min={newProject.startDate}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₹)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="250000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
  <select
    value={newProject.priority}
    onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  >
    {priorities.map((priority) => (
      <option key={priority} value={priority}>
        {priority}
      </option>
    ))}
  </select>
</div>

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
                <div className="space-y-2 max-h-48 overflow-y-auto p-3 border border-gray-300 rounded-lg bg-gray-50">
                  {teamMembers.map(member => (
                    <label key={member.id} className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded">
                      <input
                        type="checkbox"
                        value={member.id}
                        checked={newProject.teamMembers.includes(member.id.toString())}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setNewProject(prev => ({
                            ...prev,
                            teamMembers: checked
                              ? [...prev.teamMembers, member.id.toString()]
                              : prev.teamMembers.filter(id => id !== member.id.toString())
                          }));
                        }}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-xs text-gray-500">{member.role}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <ProjectIcon className="w-4 h-4" />
                  <span>Create Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {isEditModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <EditIcon className="w-6 h-6 mr-2 text-yellow-600" />
                Edit Project
              </h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedProject(null);
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditProject} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                  <input
                    type="text"
                    required
                    value={selectedProject.name}
                    onChange={(e) => setSelectedProject({ ...selectedProject, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                  <select
                    required
                    value={selectedProject.client}
                    onChange={(e) => setSelectedProject({ ...selectedProject, client: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  rows={3}
                  value={selectedProject.description}
                  onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    required
                    value={selectedProject.startDate}
                    onChange={(e) => setSelectedProject({ ...selectedProject, startDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    required
                    value={selectedProject.endDate}
                    onChange={(e) => setSelectedProject({ ...selectedProject, endDate: e.target.value })}
                    min={selectedProject.startDate}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₹)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={selectedProject.budget}
                    onChange={(e) => setSelectedProject({ ...selectedProject, budget: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedProject.status}
                    onChange={(e) => setSelectedProject({ ...selectedProject, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={selectedProject.priority}
                    onChange={(e) => setSelectedProject({ ...selectedProject, priority: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
                <div className="space-y-2 max-h-48 overflow-y-auto p-3 border border-gray-300 rounded-lg bg-gray-50">
                  {teamMembers.map(member => (
                    <label key={member.id} className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded">
                      <input
                        type="checkbox"
                        value={member.id}
                        checked={selectedProject.teamMembers.includes(member.id.toString())}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setSelectedProject(prev => ({
                            ...prev,
                            teamMembers: checked
                              ? [...prev.teamMembers, member.id.toString()]
                              : prev.teamMembers.filter(id => id !== member.id.toString())
                          }));
                        }}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-xs text-gray-500">{member.role}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedProject(null);
                  }}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <EditIcon className="w-4 h-4" />
                  <span>Update Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Missing CheckIcon (used in stats card)
const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
//update 

export default ProjectManagement;