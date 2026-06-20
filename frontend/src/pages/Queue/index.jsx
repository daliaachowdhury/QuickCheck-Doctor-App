import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Play, User, CheckCircle, Search } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

// ── Mock queue data ─────────────────────────────────────────────────────────
const INITIAL_QUEUE = [
  { id: 'A104', token: 'A104', name: 'Rahul Sharma',    age: 32, gender: 'Male',   status: 'Waiting',    time: '12 mins' },
  { id: 'A105', token: 'A105', name: 'Priya Singh',     age: 24, gender: 'Female', status: 'Waiting',    time: '10 mins' },
  { id: 'A106', token: 'A106', name: 'Amit Patel',      age: 45, gender: 'Male',   status: 'Called',     time: '5 mins'  },
  { id: 'A107', token: 'A107', name: 'Neha Kapoor',     age: 31, gender: 'Female', status: 'Vitals',     time: '18 mins' },
  { id: 'A108', token: 'A108', name: 'Vikram Malhotra', age: 34, gender: 'Male',   status: 'Consulting', time: '2 mins'  },
];

const TABS = ['All', 'Waiting', 'Called', 'Vitals', 'Consulting'];

const STATUS_COLORS = {
  Waiting:    'text-amber-700 bg-amber-50 border-amber-200',
  Called:     'text-blue-700 bg-blue-50 border-blue-200',
  Vitals:     'text-purple-700 bg-purple-50 border-purple-200',
  Consulting: 'text-emerald-700 bg-emerald-50 border-emerald-200',
};

export default function Queue() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]   = useState('All');
  const [queue, setQueue]           = useState(INITIAL_QUEUE);
  const [searchQuery, setSearchQuery] = useState('');

  // Navigate to patient details — whole card is clickable
  const goToPatient = (patient) => {
    navigate(`/patient/${patient.id}`);
  };

  // Status transition on Call / Start buttons
  const handleAction = (e, patient) => {
    // Prevent the card-level onClick from also firing
    e.stopPropagation();

    const { id, status, token } = patient;

    if (status === 'Waiting' || status === 'Vitals') {
      // Call: advance to "Called"
      setQueue(prev => prev.map(p => p.id === id ? { ...p, status: 'Called', time: 'Called just now' } : p));
      return;
    }

    if (status === 'Called') {
      // Start: advance to "Consulting" then go to patient page
      console.log('🏥 Queue Start → /patient/' + token);
      setQueue(prev => prev.map(p => p.id === id ? { ...p, status: 'Consulting', time: 'Consulting now' } : p));
      navigate(`/patient/${token}`);
    }
  };

  const filtered = queue.filter(p => {
    const matchTab    = activeTab === 'All' || p.status === activeTab;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
                     || p.token.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">

      {/* ── Title row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-brand-text">Live Queue</h2>
          <p className="text-xs text-brand-muted font-medium mt-0.5">Click any card to view patient details</p>
        </div>
        <span className="bg-primary/10 text-primary text-sm font-bold px-4 py-2 rounded-xl w-fit">
          {queue.filter(p => p.status !== 'Consulting').length} Patients Left
        </span>
      </div>

      {/* ── Search ── */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
        <input
          type="text"
          placeholder="Search by name or token..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-brand-text placeholder-brand-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* ── Filter Tabs ── */}
      <div className="flex gap-1 bg-brand-border/30 p-1 rounded-xl overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[70px] py-2 px-3 rounded-lg text-xs font-bold transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
              activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-brand-muted hover:text-brand-text'
            }`}
          >
            {tab}
            <span className="ml-1 text-[10px] font-medium opacity-60">
              ({tab === 'All' ? queue.length : queue.filter(p => p.status === tab).length})
            </span>
          </button>
        ))}
      </div>

      {/* ── Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
        {filtered.length > 0 ? filtered.map(patient => (
          /*
           * FIX: onClick is on the ENTIRE Card so any click opens patient details.
           * Action buttons call e.stopPropagation() so they don't trigger navigation.
           */
          <div
            key={patient.id}
            onClick={() => goToPatient(patient)}
            className="h-full flex flex-col cursor-pointer"
          >
            <Card
              className="flex-1 flex flex-col gap-4 hover:border-primary/30 hover:shadow-md transition-all"
            >
              {/* Top row: token badge + name + status chip */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex gap-3 items-start">
                  {/* Token badge */}
                  <div className="w-12 h-12 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center font-black text-xs text-brand-text flex-shrink-0">
                    {patient.token}
                  </div>
                  {/* Patient info */}
                  <div className="flex flex-col">
                    <h4 className="font-extrabold text-brand-text text-sm leading-tight hover:text-primary transition-colors">
                      {patient.name}
                    </h4>
                    <span className="text-xs text-brand-muted font-medium mt-1">
                      {patient.gender} • {patient.age} Yrs
                    </span>
                  </div>
                </div>
                {/* Status chip */}
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border flex-shrink-0 ${STATUS_COLORS[patient.status] || 'text-brand-muted bg-brand-bg border-brand-border'}`}>
                  {patient.status}
                </span>
              </div>

              {/* Bottom row: wait time + action button */}
              <div className="flex justify-between items-center pt-3 border-t border-brand-border/60">
                <span className="text-xs font-medium text-brand-muted">Wait: {patient.time}</span>

                <div className="flex gap-2">
                  {/* Call button — Waiting / Vitals */}
                  {(patient.status === 'Waiting' || patient.status === 'Vitals') && (
                    <Button
                      variant="outline"
                      className="flex items-center gap-1.5 py-1.5 px-3"
                      onClick={(e) => handleAction(e, patient)}
                    >
                      <Phone size={14} /><span>Call</span>
                    </Button>
                  )}

                  {/* Start button — Called */}
                  {patient.status === 'Called' && (
                    <Button
                      variant="primary"
                      className="flex items-center gap-1.5 py-1.5 px-3 shadow-sm shadow-blue-500/10"
                      onClick={(e) => handleAction(e, patient)}
                    >
                      <Play size={14} fill="currentColor" /><span>Start</span>
                    </Button>
                  )}

                  {/* In Consultation badge */}
                  {patient.status === 'Consulting' && (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 px-2 py-1 bg-emerald-50 rounded-lg">
                      <CheckCircle size={14} />In Consultation
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )) : (
          <div className="col-span-full text-center py-16">
            <User className="mx-auto text-brand-muted/40 mb-3" size={40} />
            <p className="text-sm font-semibold text-brand-muted">No patients in this queue status</p>
          </div>
        )}
      </div>
    </div>
  );
}
