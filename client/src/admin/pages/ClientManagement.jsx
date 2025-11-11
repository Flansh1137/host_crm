// src/admin/pages/ClientManagement.jsx

import React, { useState, useEffect } from "react";

// Professional Icons as SVG Components
const ClientIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const EmailIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const BuildingIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    status: "Active",
    value: "",
    lastContact: "",
    notes: ""
  });

  // Client Statuses
  const statuses = ["Active", "Inactive", "Prospect", "VIP"];
  
  // Industries
  const industries = ["Technology", "Healthcare", "Finance", "Education", "Retail", "Manufacturing", "Other"];

  // FAKE CLIENTS DATA
  const fakeClients = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@techsolutions.com",
      phone: "+91 98765 43210",
      company: "Tech Solutions Inc.",
      industry: "Technology",
      status: "Active",
      value: 2500000,
      lastContact: "2024-03-15",
      notes: "Interested in enterprise plan. Follow up next week.",
      projects: 5,
      joinedDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@globalhealth.com",
      phone: "+91 87654 32109",
      company: "Global Health Systems",
      industry: "Healthcare",
      status: "VIP",
      value: 1800000,
      lastContact: "2024-03-14",
      notes: "Key decision maker. Very satisfied with services.",
      projects: 8,
      joinedDate: "2022-08-20"
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@financetech.com",
      phone: "+91 76543 21098",
      company: "FinanceTech Innovations",
      industry: "Finance",
      status: "Active",
      value: 3200000,
      lastContact: "2024-03-12",
      notes: "Planning to expand services. Schedule meeting.",
      projects: 12,
      joinedDate: "2021-11-10"
    },
    {
      id: 4,
      name: "Sneha Gupta",
      email: "sneha@edutech.com",
      phone: "+91 65432 10987",
      company: "EduTech Solutions",
      industry: "Education",
      status: "Prospect",
      value: 800000,
      lastContact: "2024-03-10",
      notes: "New prospect. Send proposal by Friday.",
      projects: 0,
      joinedDate: "2024-02-28"
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram@retailpro.com",
      phone: "+91 94321 09876",
      company: "Retail Pro",
      industry: "Retail",
      status: "Inactive",
      value: 1200000,
      lastContact: "2024-02-15",
      notes: "Not responding to emails. Follow up call needed.",
      projects: 3,
      joinedDate: "2023-05-20"
    },
    {
      id: 6,
      name: "Ananya Reddy",
      email: "ananya@manufacture.com",
      phone: "+91 83210 98765",
      company: "Manufacture Corp",
      industry: "Manufacturing",
      status: "Active",
      value: 4500000,
      lastContact: "2024-03-13",
      notes: "Long-term partner. Discuss renewal next month.",
      projects: 15,
      joinedDate: "2020-09-05"
    },
    {
      id: 7,
      name: "Rohan Mehta",
      email: "rohan@digitalagency.com",
      phone: "+91 72109 87654",
      company: "Digital Agency Pro",
      industry: "Technology",
      status: "Active",
      value: 1600000,
      lastContact: "2024-03-11",
      notes: "Requested additional features. Send quote.",
      projects: 6,
      joinedDate: "2023-03-15"
    },
    {
      id: 8,
      name: "Neha Joshi",
      email: "neha@consulting.com",
      phone: "+91 61098 76543",
      company: "Strategic Consulting",
      industry: "Finance",
      status: "VIP",
      value: 2800000,
      lastContact: "2024-03-09",
      notes: "Very important client. Handle with priority.",
      projects: 10,
      joinedDate: "2022-12-01"
    }
  ];

  // FORCE LOAD FAKE DATA
  useEffect(() => {
    const savedClients = localStorage.getItem("crm-clients");
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    } else {
      setClients(fakeClients);
      localStorage.setItem("crm-clients", JSON.stringify(fakeClients));
    }
  }, []);

  // Sort and filter clients
  const filteredAndSortedClients = clients
    .filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || client.status === statusFilter;
      const matchesIndustry = industryFilter === "all" || client.industry === industryFilter;
      
      return matchesSearch && matchesStatus && matchesIndustry;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "value":
          return b.value - a.value;
        case "company":
          return a.company.localeCompare(b.company);
        case "lastContact":
          return new Date(b.lastContact) - new Date(a.lastContact);
        case "projects":
          return b.projects - a.projects;
        default:
          return 0;
      }
    });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "text-green-600 bg-green-50 border-green-200";
      case "VIP": return "text-purple-600 bg-purple-50 border-purple-200";
      case "Prospect": return "text-blue-600 bg-blue-50 border-blue-200";
      case "Inactive": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getIndustryColor = (industry) => {
    const colors = {
      "Technology": "text-blue-600 bg-blue-50 border-blue-200",
      "Healthcare": "text-green-600 bg-green-50 border-green-200",
      "Finance": "text-purple-600 bg-purple-50 border-purple-200",
      "Education": "text-orange-600 bg-orange-50 border-orange-200",
      "Retail": "text-pink-600 bg-pink-50 border-pink-200",
      "Manufacturing": "text-indigo-600 bg-indigo-50 border-indigo-200",
      "Other": "text-gray-600 bg-gray-50 border-gray-200"
    };
    return colors[industry] || colors["Other"];
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    const client = {
      id: Date.now(),
      ...newClient,
      value: parseInt(newClient.value),
      projects: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    const updatedClients = [...clients, client];
    setClients(updatedClients);
    localStorage.setItem("crm-clients", JSON.stringify(updatedClients));
    setIsAddModalOpen(false);
    setNewClient({
      name: "",
      email: "",
      phone: "",
      company: "",
      industry: "",
      status: "Active",
      value: "",
      lastContact: "",
      notes: ""
    });
  };

  const handleEditClient = (e) => {
    e.preventDefault();
    const updatedClients = clients.map(client =>
      client.id === selectedClient.id ? { 
        ...selectedClient, 
        value: parseInt(selectedClient.value)
      } : client
    );
    setClients(updatedClients);
    localStorage.setItem("crm-clients", JSON.stringify(updatedClients));
    setIsEditModalOpen(false);
    setSelectedClient(null);
  };

  const handleDeleteClient = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      const updatedClients = clients.filter(client => client.id !== id);
      setClients(updatedClients);
      localStorage.setItem("crm-clients", JSON.stringify(updatedClients));
      if (selectedClient?.id === id) {
        setSelectedClient(null);
      }
    }
  };

  const openEditModal = (client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === "Active").length,
    vip: clients.filter(c => c.status === "VIP").length,
    totalValue: clients.reduce((sum, client) => sum + client.value, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Client Management</h1>
          <p className="text-gray-600 text-lg">Manage and track all client relationships efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Clients</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ClientIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Clients</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.active}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <ChartIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">VIP Clients</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.vip}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <ClientIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Value</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">₹{stats.totalValue.toLocaleString()}</p>
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
                <h2 className="text-2xl font-bold text-gray-800">Clients Portfolio</h2>
                <p className="text-gray-600 mt-1">Manage and track all client relationships</p>
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="value">Sort by Value</option>
                    <option value="company">Sort by Company</option>
                    <option value="lastContact">Sort by Last Contact</option>
                    <option value="projects">Sort by Projects</option>
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
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Industries</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search clients..."
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
                    <ClientIcon className="w-4 h-4" />
                    <span>Add Client</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Clients Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client Information</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company & Industry</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Value & Projects</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status & Last Contact</th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedClients.map(client => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-200">
                    {/* Client Information */}
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-600 mt-1">Joined {new Date(client.joinedDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Details */}
                    <td className="px-6 py-6">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <EmailIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{client.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <PhoneIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{client.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Company & Industry */}
                    <td className="px-6 py-6">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <BuildingIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{client.company}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-semibold border ${getIndustryColor(client.industry)}`}>
                          {client.industry}
                        </div>
                      </div>
                    </td>

                    {/* Value & Projects */}
                    <td className="px-6 py-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Value:</span>
                          <span className="text-sm font-semibold text-green-600">₹{client.value.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Projects:</span>
                          <span className="text-sm font-semibold text-blue-600">{client.projects}</span>
                        </div>
                      </div>
                    </td>

                    {/* Status & Last Contact */}
                    <td className="px-6 py-6">
                      <div className="space-y-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(client.status)}`}>
                          {client.status}
                        </div>
                        <div className="text-xs text-gray-500">
                          Last contact: {new Date(client.lastContact).toLocaleDateString()}
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedClient(client)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1"
                        >
                          <EyeIcon className="w-4 h-4" />
                          <span className="text-sm">View</span>
                        </button>
                        <button
                          onClick={() => openEditModal(client)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1"
                        >
                          <EditIcon className="w-4 h-4" />
                          <span className="text-sm">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClient(client.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1"
                        >
                          <DeleteIcon className="w-4 h-4" />
                          <span className="text-sm">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredAndSortedClients.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <ClientIcon className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No clients found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or add new clients</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Client Details Modal */}
      {selectedClient && !isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedClient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedClient.name}</h2>
                    <p className="text-blue-100">{selectedClient.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="text-white hover:text-blue-200 transition-colors duration-200"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Client Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Client Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Full Name</span>
                      <span className="text-gray-900 font-semibold">{selectedClient.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Company</span>
                      <span className="text-gray-900">{selectedClient.company}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Industry</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getIndustryColor(selectedClient.industry)}`}>
                        {selectedClient.industry}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Joined Date</span>
                      <span className="text-gray-900">{new Date(selectedClient.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Contact & Status */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact & Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Email</span>
                      <span className="text-gray-900">{selectedClient.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Phone</span>
                      <span className="text-gray-900">{selectedClient.phone}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedClient.status)}`}>
                        {selectedClient.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Last Contact</span>
                      <span className="text-gray-900">{new Date(selectedClient.lastContact).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">₹{selectedClient.value.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedClient.projects}</div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round((selectedClient.projects / (new Date() - new Date(selectedClient.joinedDate)) / (1000 * 60 * 60 * 30)) * 100) / 100}
                    </div>
                    <div className="text-sm text-gray-600">Projects/Month</div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes</h3>
                <p className="text-gray-700">{selectedClient.notes}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    openEditModal(selectedClient);
                    setSelectedClient(null);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <EditIcon className="w-4 h-4" />
                  <span>Edit Client</span>
                </button>
                <button
                  onClick={() => {
                    handleDeleteClient(selectedClient.id);
                    setSelectedClient(null);
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

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <ClientIcon className="w-6 h-6 mr-2 text-blue-600" />
                Add New Client
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddClient} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter client's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="client@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                  <input
                    type="text"
                    required
                    value={newClient.company}
                    onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={newClient.industry}
                    onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newClient.status}
                    onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Value (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={newClient.value}
                    onChange={(e) => setNewClient({ ...newClient, value: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2500000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Contact Date</label>
                  <input
                    type="date"
                    value={newClient.lastContact}
                    onChange={(e) => setNewClient({ ...newClient, lastContact: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  rows={3}
                  value={newClient.notes}
                  onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add any notes about the client..."
                />
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
                  <ClientIcon className="w-4 h-4" />
                  <span>Create Client</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {isEditModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <EditIcon className="w-6 h-6 mr-2 text-yellow-600" />
                Edit Client
              </h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedClient(null);
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditClient} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={selectedClient.name}
                    onChange={(e) => setSelectedClient({ ...selectedClient, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={selectedClient.email}
                    onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={selectedClient.phone}
                    onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                  <input
                    type="text"
                    required
                    value={selectedClient.company}
                    onChange={(e) => setSelectedClient({ ...selectedClient, company: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={selectedClient.industry}
                    onChange={(e) => setSelectedClient({ ...selectedClient, industry: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedClient.status}
                    onChange={(e) => setSelectedClient({ ...selectedClient, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Value (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={selectedClient.value}
                    onChange={(e) => setSelectedClient({ ...selectedClient, value: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Contact Date</label>
                  <input
                    type="date"
                    value={selectedClient.lastContact}
                    onChange={(e) => setSelectedClient({ ...selectedClient, lastContact: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  rows={3}
                  value={selectedClient.notes}
                  onChange={(e) => setSelectedClient({ ...selectedClient, notes: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedClient(null);
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
                  <span>Update Client</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;