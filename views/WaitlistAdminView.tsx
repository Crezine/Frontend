import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiCheckCircle, 
  FiBell, 
  FiClock, 
  FiSearch, 
  FiDownload, 
  FiRefreshCw, 
  FiMail, 
  FiPhone, 
  FiArrowLeft, 
  FiCopy, 
  FiCheck,
  FiShield
} from 'react-icons/fi';
import { waitlistService, WaitlistEntry, WaitlistStats } from '../src/services/waitlistService';
import { AppView } from '../types';
import BrandLogo from '../components/BrandLogo';
import { showToast } from '../src/utils/toast';

interface WaitlistAdminViewProps {
  navigate?: (view: AppView) => void;
}

type FilterTab = 'all' | 'pending' | 'notified' | 'verified';

export const WaitlistAdminView: React.FC<WaitlistAdminViewProps> = ({ navigate }) => {
  const [subscribers, setSubscribers] = useState<WaitlistEntry[]>([]);
  const [stats, setStats] = useState<WaitlistStats>({
    total: 0,
    verified: 0,
    notified: 0,
    unverified: 0,
    pendingNotification: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [notifyingEmail, setNotifyingEmail] = useState<string | null>(null);
  const [isLiveApi, setIsLiveApi] = useState<boolean | null>(null);

  const fetchData = async (silent = false) => {
    if (!silent) setIsLoading(true);
    setIsRefreshing(true);
    try {
      const [listData, statsData] = await Promise.all([
        waitlistService.getAdminWaitlist(),
        waitlistService.getWaitlistStats(),
      ]);

      setSubscribers(listData);
      setStats(statsData);
      setIsLiveApi(true);
    } catch (err) {
      console.warn('Waitlist admin fetch failed, falling back to local subscribers', err);
      const localList = waitlistService.getLocalSubscribers();
      setSubscribers(localList);
      setIsLiveApi(false);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMarkNotified = async (email: string) => {
    try {
      setNotifyingEmail(email);
      await waitlistService.markAsNotified(email);
      showToast.success(`Marked ${email} as notified!`);
      // Update state locally
      setSubscribers((prev) =>
        prev.map((sub) =>
          sub.email.toLowerCase() === email.toLowerCase()
            ? { ...sub, isNotified: true, notifiedAt: new Date().toISOString() }
            : sub
        )
      );
      setStats((prev) => ({
        ...prev,
        notified: prev.notified + 1,
        pendingNotification: Math.max(0, prev.pendingNotification - 1),
      }));
    } catch (err: any) {
      showToast.error(err?.message || 'Failed to update notification status');
    } finally {
      setNotifyingEmail(null);
    }
  };

  const handleCopy = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedEmail(text);
      showToast.info('Email copied to clipboard');
      setTimeout(() => setCopiedEmail(null), 2000);
    }
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      showToast.warning('No waitlist entries to export');
      return;
    }

    const headers = ['Rank', 'Name', 'Email', 'Phone', 'Craft', 'Referral Source', 'Verified', 'Notified', 'Joined Date'];
    const rows = subscribers.map((sub, idx) => [
      sub.position || idx + 1,
      `"${(sub.name || sub.fullName || '').replace(/"/g, '""')}"`,
      `"${sub.email.replace(/"/g, '""')}"`,
      `"${(sub.phoneNumber || '').replace(/"/g, '""')}"`,
      `"${(sub.craft || '').replace(/"/g, '""')}"`,
      `"${(sub.referralSource || '').replace(/"/g, '""')}"`,
      sub.isVerified ? 'Yes' : 'No',
      sub.isNotified ? 'Yes' : 'No',
      `"${new Date(sub.joinedAt).toLocaleDateString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `crezine-waitlist-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast.success('Waitlist exported to CSV!');
  };

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((sub) => {
      // Tab filter
      if (activeTab === 'pending' && sub.isNotified) return false;
      if (activeTab === 'notified' && !sub.isNotified) return false;
      if (activeTab === 'verified' && !sub.isVerified) return false;

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchName = (sub.name || sub.fullName || '').toLowerCase().includes(q);
      const matchEmail = sub.email.toLowerCase().includes(q);
      const matchCraft = (sub.craft || '').toLowerCase().includes(q);
      const matchPhone = (sub.phoneNumber || '').toLowerCase().includes(q);
      const matchRef = (sub.referralSource || '').toLowerCase().includes(q);

      return matchName || matchEmail || matchCraft || matchPhone || matchRef;
    });
  }, [subscribers, activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-black font-montserrat flex flex-col">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              if (navigate) navigate('landing' as AppView);
              else window.location.href = '/';
            }}
            className="p-2 rounded-full hover:bg-black/5 active:scale-95 transition-all text-black/60 hover:text-black cursor-pointer"
            title="Back to Landing"
            aria-label="Back"
          >
            <FiArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          
          <BrandLogo onClick={() => {
            if (navigate) navigate('landing' as AppView);
            else window.location.href = '/';
          }} />

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-black/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full font-rubik flex items-center gap-1">
              <FiShield className="w-3.5 h-3.5 text-secondary" />
              Admin
            </span>
            <span className="text-xs text-black/50 font-medium">Waitlist Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Refresh Button */}
          <button
            onClick={() => fetchData(true)}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 text-xs font-medium text-black/70 hover:text-black hover:bg-black/5 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            title="Refresh list"
          >
            <FiRefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary text-white text-xs font-medium hover:bg-secondary/90 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <FiDownload className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* View Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal font-rubik text-black tracking-tight">
              Waitlist Applicants
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-black/60 font-light max-w-2xl">
              Monitor applicant queue, review creative crafts, track verification status, and notify users for early onboarding.
            </p>
          </div>

          {/* API Connection Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/50 border border-black/5 text-xs text-black/70 self-start md:self-auto font-medium">
            <span className={`w-2 h-2 rounded-full ${isLiveApi ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span>{isLiveApi ? 'Backend API Connected' : 'Local Storage Mode'}</span>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Total Signups */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-black/10 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-black/50 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider">Total Signups</span>
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <FiUsers className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold font-rubik text-black">{stats.total}</p>
              <p className="text-[11px] text-black/45 mt-0.5">Platform applicants</p>
            </div>
          </div>

          {/* Verified Accounts */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-black/10 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-black/50 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider">Verified</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold font-rubik text-black">{stats.verified}</p>
              <p className="text-[11px] text-emerald-600 mt-0.5">
                {stats.total > 0 ? `${Math.round((stats.verified / stats.total) * 100)}% verified` : '0%'}
              </p>
            </div>
          </div>

          {/* Notified */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-black/10 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-black/50 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider">Notified</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <FiBell className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold font-rubik text-black">{stats.notified}</p>
              <p className="text-[11px] text-blue-600 mt-0.5">Invited to onboard</p>
            </div>
          </div>

          {/* Pending Notification */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-black/10 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-black/50 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider">Pending Access</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <FiClock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold font-rubik text-black">{stats.pendingNotification}</p>
              <p className="text-[11px] text-amber-600 mt-0.5">Waiting in queue</p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-black/10 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 [scrollbar-width:none]">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-secondary text-white shadow-xs'
                  : 'text-black/60 hover:text-black hover:bg-black/5'
              }`}
            >
              All ({subscribers.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'pending'
                  ? 'bg-secondary text-white shadow-xs'
                  : 'text-black/60 hover:text-black hover:bg-black/5'
              }`}
            >
              Pending ({subscribers.filter((s) => !s.isNotified).length})
            </button>
            <button
              onClick={() => setActiveTab('notified')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'notified'
                  ? 'bg-secondary text-white shadow-xs'
                  : 'text-black/60 hover:text-black hover:bg-black/5'
              }`}
            >
              Notified ({subscribers.filter((s) => s.isNotified).length})
            </button>
            <button
              onClick={() => setActiveTab('verified')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'verified'
                  ? 'bg-secondary text-white shadow-xs'
                  : 'text-black/60 hover:text-black hover:bg-black/5'
              }`}
            >
              Verified ({subscribers.filter((s) => s.isVerified).length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] sm:max-w-xs">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/35 w-3.5 h-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, email, craft..."
              className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-accent/30 rounded-xl border border-black/10 focus:outline-none focus:border-secondary focus:bg-white text-black font-montserrat placeholder:text-black/35 transition-all"
            />
          </div>
        </div>

        {/* Subscribers Table / List Container */}
        <div className="bg-white rounded-2xl border border-black/10 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-black/50">
              <div className="w-8 h-8 border-3 border-secondary/20 border-t-secondary rounded-full animate-spin" />
              <p className="text-xs font-medium">Loading waitlist entries...</p>
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-accent text-black/40 flex items-center justify-center mb-3">
                <FiUsers className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-semibold font-rubik text-black">No applicants found</h3>
              <p className="mt-1 text-xs text-black/60 max-w-sm">
                {searchQuery
                  ? `No applicants match "${searchQuery}". Try adjusting your search query.`
                  : 'The waitlist currently has no entries under this filter.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-montserrat">
                <thead>
                  <tr className="bg-accent/40 border-b border-black/5 text-[11px] font-semibold text-black/60 uppercase tracking-wider">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Craft / Source</th>
                    <th className="py-3 px-4">Joined</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-xs">
                  {filteredSubscribers.map((entry, index) => {
                    const isCopied = copiedEmail === entry.email;
                    const isBeingNotified = notifyingEmail === entry.email;

                    return (
                      <motion.tr
                        key={entry.id || entry.email || index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-accent/20 transition-colors"
                      >
                        {/* Spot Position */}
                        <td className="py-3 px-4 font-rubik font-semibold text-black/60">
                          #{entry.position || index + 1}
                        </td>

                        {/* Applicant Name & Email */}
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-black">
                              {entry.name || entry.fullName || 'Anonymous Creative'}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5 text-black/60 font-light">
                              <span className="truncate max-w-[200px]">{entry.email}</span>
                              <button
                                onClick={() => handleCopy(entry.email)}
                                className="text-black/35 hover:text-black transition-colors cursor-pointer"
                                title="Copy email"
                              >
                                {isCopied ? <FiCheck className="w-3 h-3 text-emerald-600" /> : <FiCopy className="w-3 h-3" />}
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="py-3 px-4 text-black/70 font-light">
                          {entry.phoneNumber ? (
                            <span className="inline-flex items-center gap-1 text-[11px]">
                              <FiPhone className="w-3 h-3 text-black/40" />
                              {entry.phoneNumber}
                            </span>
                          ) : (
                            <span className="text-black/30 italic">—</span>
                          )}
                        </td>

                        {/* Craft / Referral */}
                        <td className="py-3 px-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent/60 text-secondary text-[11px] font-medium border border-black/5">
                            {entry.craft || entry.referralSource || 'Creator'}
                          </span>
                        </td>

                        {/* Joined Date */}
                        <td className="py-3 px-4 text-black/60 font-light text-[11px] whitespace-nowrap">
                          {entry.joinedAt ? new Date(entry.joinedAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          }) : 'Recent'}
                        </td>

                        {/* Status Badges */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            {entry.isVerified ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-medium border border-gray-200">
                                Unverified
                              </span>
                            )}

                            {entry.isNotified ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-200">
                                <FiCheck className="w-2.5 h-2.5" />
                                Notified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-medium border border-amber-200">
                                Pending
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          {entry.isNotified ? (
                            <span className="text-[11px] font-medium text-emerald-600 inline-flex items-center gap-1">
                              <FiCheck className="w-3.5 h-3.5" /> Notified
                            </span>
                          ) : (
                            <button
                              onClick={() => handleMarkNotified(entry.email)}
                              disabled={isBeingNotified}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-white hover:bg-secondary/90 active:scale-95 text-[11px] font-medium transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                            >
                              {isBeingNotified ? (
                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <FiBell className="w-3 h-3" />
                              )}
                              <span>Notify</span>
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WaitlistAdminView;
