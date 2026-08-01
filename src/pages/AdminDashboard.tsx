import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  MessageSquare,
  TrendingUp,
  Bell,
  Search,
  Plus,
  LogOut,
  ArrowUpRight,
  ShieldCheck,
  Eye,
  FileText,
  X
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock Stats & Data
const monthlyPerformance = [
  { month: 'Jan', inquiries: 32, revenue: 320 },
  { month: 'Feb', inquiries: 45, revenue: 410 },
  { month: 'Mar', inquiries: 58, revenue: 590 },
  { month: 'Apr', inquiries: 51, revenue: 520 },
  { month: 'May', inquiries: 72, revenue: 680 },
  { month: 'Jun', inquiries: 89, revenue: 840 },
  { month: 'Jul', inquiries: 104, revenue: 950 },
];

const categoryDistribution = [
  { name: 'Commercial High-Rise', value: 40, color: '#d4af37' },
  { name: 'Luxury Residential', value: 30, color: '#4169e1' },
  { name: 'Industrial Complex', value: 20, color: '#38bdf8' },
  { name: '3D Master Planning', value: 10, color: '#f59e0b' },
];

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  status: 'Pending' | 'In Contact' | 'Approved' | 'Completed';
  date: string;
}

const mockInquiries: Inquiry[] = [
  {
    id: 'INQ-9041',
    name: 'Alexander Sterling',
    email: 'a.sterling@sterlingcorp.com',
    phone: '+1 (555) 234-5678',
    service: 'Commercial High-Rise Engineering',
    budget: '$2.5M - $5M',
    status: 'Pending',
    date: 'Jul 24, 2026',
  },
  {
    id: 'INQ-9042',
    name: 'Elena Rostova',
    email: 'elena@rostovadesigns.io',
    phone: '+1 (555) 876-5432',
    service: 'Luxury Villa Architectural Design',
    budget: '$1M - $2M',
    status: 'In Contact',
    date: 'Jul 23, 2026',
  },
  {
    id: 'INQ-9043',
    name: 'Dr. Harrison Ford',
    email: 'hford@apexmedical.org',
    phone: '+1 (555) 345-6789',
    service: 'Medical Center Structural Planning',
    budget: '$10M+',
    status: 'Approved',
    date: 'Jul 21, 2026',
  },
  {
    id: 'INQ-9044',
    name: 'Sophia Chen',
    email: 'sophia@urbantech.cn',
    phone: '+1 (555) 987-6543',
    service: '3D Bim Virtual Blueprint Rendering',
    budget: '$500k - $1M',
    status: 'Completed',
    date: 'Jul 19, 2026',
  },
  {
    id: 'INQ-9045',
    name: 'Marcus Vance',
    email: 'marcus@vancegroup.uk',
    phone: '+44 20 7946 0912',
    service: 'Industrial Logistics Hub Design',
    budget: '$8M - $12M',
    status: 'In Contact',
    date: 'Jul 18, 2026',
  },
];

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'projects' | 'services'>('overview');
  const [inquiries] = useState<Inquiry[]>(mockInquiries);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [currentUser, setCurrentUser] = useState<string>('Administrator');

  useEffect(() => {
    const auth = localStorage.getItem('fde_admin_auth');
    if (!auth) {
      // Allow preview, or redirect if desired
      const user = localStorage.getItem('fde_admin_user');
      if (user) setCurrentUser(user);
    } else {
      const user = localStorage.getItem('fde_admin_user');
      if (user) setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fde_admin_auth');
    navigate('/admin/login');
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Inquiry['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'In Contact':
        return 'bg-royal-blue/20 text-blue-300 border-royal-blue/40';
      case 'Approved':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Completed':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row font-body selection:bg-gold selection:text-black">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-[#0a0a0c] border-r border-white/10 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold to-amber-300 text-black flex items-center justify-center font-heading font-extrabold text-xl shadow-lg shadow-gold/15">
              FD
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg tracking-tight text-white leading-none">
                FUTURE DESIGN
              </h2>
              <span className="text-[10px] tracking-[0.2em] font-semibold text-gold uppercase">
                Admin Control Center
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'inquiries', label: 'Project Inquiries', icon: MessageSquare, badge: inquiries.length },
              { id: 'projects', label: 'Portfolio Projects', icon: Building2 },
              { id: 'services', label: 'Engineering Services', icon: Briefcase },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-gold to-amber-400 text-black font-semibold shadow-md shadow-gold/20'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? 'text-black' : 'text-gold'} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-black/20 text-black' : 'bg-gold/20 text-gold'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
            <div className="w-9 h-9 rounded-full bg-gold/20 text-gold border border-gold/40 flex items-center justify-center font-bold text-sm">
              {currentUser.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{currentUser}</p>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Session
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-950/40 hover:bg-red-900/40 border border-red-500/30 text-red-300 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-white">
              Executive Dashboard
            </h1>
            <p className="text-white/50 text-sm mt-0.5">
              Real-time project inquiries, engineering analytics, and operational metrics.
            </p>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search inquiries or projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-black/60 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold w-60 lg:w-72 transition-all"
              />
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gold hover:text-white transition-all relative"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-royal-blue text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-black">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-[#0c0c0e] border border-gold/30 rounded-2xl shadow-2xl p-4 z-50 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="font-semibold text-xs text-gold uppercase tracking-wider">
                        Recent Notifications
                      </span>
                      <button
                        onClick={() => setUnreadCount(0)}
                        className="text-[11px] text-white/40 hover:text-white transition-colors"
                      >
                        Mark all read
                      </button>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {mockInquiries.slice(0, 3).map((inq) => (
                        <div
                          key={inq.id}
                          className="p-2.5 bg-white/5 hover:bg-gold/10 rounded-xl text-xs space-y-1 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between font-semibold text-white">
                            <span>{inq.name}</span>
                            <span className="text-[10px] text-gold">{inq.date}</span>
                          </div>
                          <p className="text-white/60 text-[11px]">{inq.service}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => alert('New project form modal opening...')}
              className="px-4 py-2.5 bg-gradient-to-r from-gold to-gold-dim text-black font-semibold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-gold/15 hover:shadow-gold/30 transition-all"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">New Project</span>
            </button>
          </div>
        </div>

        {/* Key KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            {
              title: 'Total Inquiries',
              value: '128',
              change: '+18.4% vs last month',
              icon: MessageSquare,
              color: 'from-gold/20 to-amber-500/5',
              borderColor: 'border-gold/30',
            },
            {
              title: 'Active Projects',
              value: '24',
              change: '8 in planning phase',
              icon: Building2,
              color: 'from-royal-blue/20 to-blue-500/5',
              borderColor: 'border-royal-blue/30',
            },
            {
              title: 'Estimated Pipeline',
              value: '$28.4M',
              change: '+24.1% revenue grow',
              icon: TrendingUp,
              color: 'from-emerald-500/20 to-teal-500/5',
              borderColor: 'border-emerald-500/30',
            },
            {
              title: 'Satisfaction Score',
              value: '99.4%',
              change: 'Based on 140+ reviews',
              icon: ShieldCheck,
              color: 'from-purple-500/20 to-indigo-500/5',
              borderColor: 'border-purple-500/30',
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`bg-gradient-to-b ${stat.color} bg-[#0c0c0e] border ${stat.borderColor} p-5 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 shadow-xl`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs uppercase tracking-wider font-semibold text-white/50">
                    {stat.title}
                  </span>
                  <div className="p-2 bg-black/40 border border-white/10 rounded-xl text-gold">
                    <Icon size={18} />
                  </div>
                </div>
                <h3 className="font-heading text-3xl font-bold text-white tracking-tight mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs text-white/60 flex items-center gap-1 font-medium">
                  <ArrowUpRight size={14} className="text-emerald-400" />
                  <span>{stat.change}</span>
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Analytics Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Area Chart */}
          <div className="lg:col-span-2 bg-[#0c0c0e] border border-white/10 p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">Inquiry & Revenue Growth</h3>
                <p className="text-xs text-white/50">Monthly volume of engineering client inquiries</p>
              </div>
              <span className="px-3 py-1 bg-gold/15 text-gold border border-gold/30 text-xs font-semibold rounded-full">
                Live Data 2026
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyPerformance}>
                  <defs>
                    <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d4af37" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4169e1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#4169e1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#ffffff50" fontSize={12} />
                  <YAxis stroke="#ffffff50" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0c0c0e',
                      borderColor: '#d4af3740',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="inquiries"
                    stroke="#d4af37"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorInquiries)"
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4169e1"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Project Distribution Donut Chart */}
          <div className="bg-[#0c0c0e] border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-white mb-1">Sector Breakdown</h3>
              <p className="text-xs text-white/50 mb-4">Project distribution by engineering domain</p>
              <div className="h-44 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0c0c0e',
                        borderColor: '#ffffff20',
                        borderRadius: '10px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-2 pt-4 border-t border-white/10">
              {categoryDistribution.map((cat, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-white/70">{cat.name}</span>
                  </div>
                  <span className="font-bold text-white">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-[#0c0c0e] border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-heading font-bold text-xl text-white">Client Project Inquiries</h3>
              <p className="text-xs text-white/50">Manage incoming leads, project specifications, and follow-ups.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-white/10 overflow-x-auto">
              {['All', 'Pending', 'In Contact', 'Approved', 'Completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    statusFilter === status
                      ? 'bg-gold text-black shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-white/80">
              <thead className="bg-black/60 text-xs uppercase tracking-wider text-white/50 border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Inquiry ID</th>
                  <th className="py-3.5 px-4 font-semibold">Client Name</th>
                  <th className="py-3.5 px-4 font-semibold">Service Required</th>
                  <th className="py-3.5 px-4 font-semibold">Estimated Budget</th>
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-gold text-xs">{inq.id}</td>
                      <td className="py-4 px-4 font-semibold text-white">
                        <div>{inq.name}</div>
                        <div className="text-xs font-normal text-white/40">{inq.email}</div>
                      </td>
                      <td className="py-4 px-4 text-white/80">{inq.service}</td>
                      <td className="py-4 px-4 font-semibold text-gold">{inq.budget}</td>
                      <td className="py-4 px-4 text-xs text-white/50">{inq.date}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                            inq.status
                          )}`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="px-3 py-1.5 bg-white/5 hover:bg-gold/20 border border-white/10 hover:border-gold/40 text-gold rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1"
                        >
                          <Eye size={13} /> View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-white/40 text-sm">
                      No inquiries found matching your query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Inquiry Details Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0c0c0e] border border-gold/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedInquiry(null)}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="p-3 bg-gold/15 border border-gold/30 rounded-xl text-gold">
                  <FileText size={22} />
                </div>
                <div>
                  <span className="text-xs font-mono text-gold font-bold">{selectedInquiry.id}</span>
                  <h3 className="font-heading font-bold text-xl text-white">Inquiry Details</h3>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <label className="text-xs uppercase text-white/40 font-semibold">Client Name</label>
                  <p className="font-semibold text-white text-base">{selectedInquiry.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase text-white/40 font-semibold">Email Address</label>
                    <p className="text-white/80">{selectedInquiry.email}</p>
                  </div>
                  <div>
                    <label className="text-xs uppercase text-white/40 font-semibold">Phone</label>
                    <p className="text-white/80">{selectedInquiry.phone}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase text-white/40 font-semibold">Service Type</label>
                  <p className="text-white/80">{selectedInquiry.service}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase text-white/40 font-semibold">Budget Range</label>
                    <p className="font-semibold text-gold">{selectedInquiry.budget}</p>
                  </div>
                  <div>
                    <label className="text-xs uppercase text-white/40 font-semibold">Current Status</label>
                    <div>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(
                          selectedInquiry.status
                        )}`}
                      >
                        {selectedInquiry.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert(`Action taken for inquiry ${selectedInquiry.id}`);
                    setSelectedInquiry(null);
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-gold to-gold-dim text-black rounded-xl text-sm font-semibold shadow-md shadow-gold/20 transition-all"
                >
                  Contact Client
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
