import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, UserCheck, Play, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { MOCK_PATIENTS } from '../Patient';

export default function Dashboard() {
  const navigate = useNavigate();
  const currentPatient = MOCK_PATIENTS['A104'] || {
    id: 'A104', token: 'A104', name: 'Rahul Sharma', time: '12 mins'
  };

  const stats = [
    { label: "Today's Patients", value: '24', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Waiting', value: '8', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'In Progress', value: '1', icon: Play, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Completed', value: '15', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const upcomingQueue = [
    { id: 2, name: 'Priya Singh', token: 'A105', status: 'Waiting', time: '10 mins ago' },
    { id: 3, name: 'Amit Patel', token: 'A106', status: 'Waiting', time: '15 mins ago' },
    { id: 4, name: 'Neha Kapoor', token: 'A107', status: 'Waiting', time: '22 mins ago' },
    { id: 5, name: 'Vikram Malhotra', token: 'A108', status: 'Waiting', time: '30 mins ago' },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 w-full max-w-6xl mx-auto">

      {/* ── Greeting Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-brand-muted uppercase tracking-wider">Good Morning,</p>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-brand-text">Dr. Rajat Sharma</h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-muted bg-white border border-brand-border px-3 py-2 rounded-xl w-fit shadow-sm">
          <Calendar size={14} className="text-primary" />
          <span>Tuesday, 20 May 2024</span>
        </div>
      </div>

      {/* ── Stats Grid: 1 col mobile → 2 cols tablet → 4 cols laptop/desktop ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="flex flex-col gap-3 justify-between">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-brand-muted tracking-wide uppercase leading-tight">{stat.label}</span>
                <div className={`p-1.5 rounded-lg ${stat.bg} ${stat.color}`}>
                  <Icon size={16} />
                </div>
              </div>
              <span className="text-3xl font-extrabold text-brand-text leading-none">{stat.value}</span>
            </Card>
          );
        })}
      </div>

      {/* ── Main content: stacked on mobile, side-by-side on lg+ ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 lg:gap-6">

        {/* Current Patient — takes 1 col on mobile/tablet/desktop */}
        <div className="sm:col-span-1 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-brand-muted uppercase tracking-wider">Current Patient</h3>
          <div
            className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-5 shadow-lg border border-blue-500/20 flex flex-col gap-5"
          >
            {/* Subtle decorative background shapes */}
            <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="absolute -left-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

            <div
              className="flex items-center gap-4 cursor-pointer group relative z-10"
              onClick={() => { console.log('🏠 Dashboard → Navigating to patient: A104'); navigate('/patient/A104'); }}
            >
              {/* Patient Photo */}
              <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-white/15 border border-white/20 select-none">
                {currentPatient.image ? (
                  <img
                    src={currentPatient.image}
                    alt={currentPatient.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`w-full h-full items-center justify-center font-bold text-lg text-white ${currentPatient.image ? 'hidden' : 'flex'}`}>
                  {currentPatient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              </div>

              {/* Layout: Photo (left), Details (right) */}
              <div className="flex flex-col gap-1 min-w-0">
                <h4 className="text-lg font-bold text-white group-hover:text-blue-100 transition-colors truncate">
                  {currentPatient.name}
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-white/15 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-white/10">
                    Token {currentPatient.token}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-100 font-medium mt-0.5">
                  <Clock size={13} className="text-blue-200" />
                  <span>Waiting for 12 mins</span>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-white hover:bg-blue-50 active:scale-[0.98] text-blue-600 font-bold text-[14px] py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all relative z-10 cursor-pointer"
              onClick={() => { console.log('🏠 Dashboard Start Consultation → A104'); navigate('/patient/A104'); }}
            >
              <span>Start Consultation</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Upcoming Queue — takes 2 cols on md+ */}
        <div className="sm:col-span-2 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-brand-muted uppercase tracking-wider">Upcoming Queue</h3>
            <button
              onClick={() => navigate('/queue')}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {upcomingQueue.map((patient) => (
              <Card
                key={patient.id}
                className="py-3 px-4 flex items-center justify-between hover:border-primary/20 transition-colors cursor-pointer group"
                onClick={() => { console.log('🏠 Dashboard queue card → Navigating to patient:', patient.token); navigate(`/patient/${patient.token}`); }}
              >
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-sm font-bold text-brand-text group-hover:text-primary transition-colors">{patient.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-brand-muted">
                    <span className="font-semibold text-primary">Token {patient.token}</span>
                    <span>•</span>
                    <span>{patient.time}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg whitespace-nowrap">
                  {patient.status}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
