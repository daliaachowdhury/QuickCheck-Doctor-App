import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical, AlertCircle } from 'lucide-react';

// ── Mock patient database ──────────────────────────────────────────────────────
export const MOCK_PATIENTS = {
  'A104': {
    id: 'A104', token: 'A104', name: 'Rahul Sharma', age: 32, gender: 'Male',
    phone: '9876543210', bloodGroup: 'O+',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    vitals: [
      { label: 'BP', value: '120/80', unit: 'mmHg' },
      { label: 'Pulse', value: '72', unit: 'bpm' },
      { label: 'Temp', value: '98.6', unit: '°F' },
      { label: 'Weight', value: '68', unit: 'kg' },
      { label: 'SpO2', value: '98', unit: '%' },
      { label: 'Resp Rate', value: '18', unit: 'bpm' },
    ],
    chiefComplaint: 'Mild fever accompanied by dry cough, sore throat, and nasal congestion for the past 3 days.',
    lastVisitDate: '12 April 2024',
    lastVisitDiagnosis: 'Seasonal Allergies',
    allergies: 'Penicillin, Dust Mites, Sulfonamides',
  },
  'A105': {
    id: 'A105', token: 'A105', name: 'Priya Singh', age: 24, gender: 'Female',
    phone: '+91 91234 56789', bloodGroup: 'A+',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256',
    vitals: [
      { label: 'BP', value: '110/70', unit: 'mmHg' },
      { label: 'Pulse', value: '80', unit: 'bpm' },
      { label: 'Temp', value: '99.1', unit: '°F' },
      { label: 'Weight', value: '55', unit: 'kg' },
      { label: 'SpO2', value: '97', unit: '%' },
      { label: 'Resp Rate', value: '16', unit: 'bpm' },
    ],
    chiefComplaint: 'Recurring headache and mild dizziness for the past 5 days. Reports disturbed sleep.',
    lastVisitDate: '02 March 2024',
    lastVisitDiagnosis: 'Migraine followup',
    allergies: 'Aspirin',
  },
  'A106': {
    id: 'A106', token: 'A106', name: 'Amit Patel', age: 45, gender: 'Male',
    phone: '+91 99887 76655', bloodGroup: 'B+',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256',
    vitals: [
      { label: 'BP', value: '140/90', unit: 'mmHg' },
      { label: 'Pulse', value: '88', unit: 'bpm' },
      { label: 'Temp', value: '98.2', unit: '°F' },
      { label: 'Weight', value: '82', unit: 'kg' },
      { label: 'SpO2', value: '96', unit: '%' },
      { label: 'Resp Rate', value: '20', unit: 'bpm' },
    ],
    chiefComplaint: 'Chest tightness and shortness of breath on exertion. Hypertensive for 3 years.',
    lastVisitDate: '18 February 2024',
    lastVisitDiagnosis: 'Hypertension monitoring',
    allergies: 'Ibuprofen, Latex',
  },
  'A107': {
    id: 'A107', token: 'A107', name: 'Neha Kapoor', age: 31, gender: 'Female',
    phone: '+91 96543 21098', bloodGroup: 'B-',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    vitals: [
      { label: 'BP', value: '115/75', unit: 'mmHg' },
      { label: 'Pulse', value: '78', unit: 'bpm' },
      { label: 'Temp', value: '98.4', unit: '°F' },
      { label: 'Weight', value: '56', unit: 'kg' },
      { label: 'SpO2', value: '98', unit: '%' },
      { label: 'Resp Rate', value: '16', unit: 'bpm' },
    ],
    chiefComplaint: 'Routine checkup. Reports fatigue and sleep trouble.',
    lastVisitDate: '05 May 2024',
    lastVisitDiagnosis: 'Vitamin D Deficiency',
    allergies: 'Dust, Pollen',
  },
  'A108': {
    id: 'A108', token: 'A108', name: 'Vikram Malhotra', age: 34, gender: 'Male',
    phone: '+91 97654 32109', bloodGroup: 'AB+',
    image: '', // Left empty to test fallback to initials
    vitals: [
      { label: 'BP', value: '125/82', unit: 'mmHg' },
      { label: 'Pulse', value: '76', unit: 'bpm' },
      { label: 'Temp', value: '100.4', unit: '°F' },
      { label: 'Weight', value: '74', unit: 'kg' },
      { label: 'SpO2', value: '99', unit: '%' },
      { label: 'Resp Rate', value: '17', unit: 'bpm' },
    ],
    chiefComplaint: 'Fever of 100°F since yesterday. Mild body aches and fatigue.',
    lastVisitDate: '10 January 2024',
    lastVisitDiagnosis: 'Acute viral fever',
    allergies: 'No known allergies',
  },
};

export default function Patient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = id ? MOCK_PATIENTS[id] : null;

  if (!patient) {
    return (
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-0">
        <div className="w-full max-w-[500px] mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 border border-red-100 shadow-sm">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-extrabold text-brand-text mb-2">Patient Not Found</h2>
          <p className="text-brand-muted text-sm max-w-sm mb-8 leading-relaxed">
            The patient ID you are looking for might have been moved or does not exist in our database.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary hover:bg-blue-700 active:scale-95 text-white font-bold text-[14px] px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    /*
     * Negative margin trick: override the MainLayout max-w-7xl padding
     * and constrain this page to 600px max centered column.
     */
    <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-0">
      {/* Centered responsive page wrapper */}
      <div className="w-full max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] mx-auto px-4 pb-28">
 
        {/* ── Header ── */}
        <div className="flex items-center justify-between py-4 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#111827] transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <h2 className="text-[17px] font-bold text-[#111827] tracking-tight">Patient Details</h2>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#111827] transition-colors">
            <MoreVertical size={22} />
          </button>
        </div>

        {/* ── Patient Info Card ── */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex items-center gap-4 shadow-sm mb-4">
          {/* Photo / Avatar */}
          <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] flex-shrink-0 select-none">
            {patient.image ? (
              <img
                src={patient.image}
                alt={patient.name}
                className="w-full h-full rounded-2xl object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'flex';
                  }
                }}
              />
            ) : null}
            <div
              className={`w-full h-full rounded-2xl bg-blue-100 text-blue-600 items-center justify-center font-bold text-xl ${
                patient.image ? 'hidden' : 'flex'
              }`}
            >
              {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
          </div>
          {/* Info */}
          <div className="flex flex-col gap-[3px] min-w-0">
            <p className="text-[16px] font-bold text-[#111827] leading-snug truncate">{patient.name}</p>
            <p className="text-[13px] text-[#6B7280] font-medium">
              <span className="font-medium text-[#6B7280]">Age:</span> {patient.age} Yrs
            </p>
            <p className="text-[13px] text-[#6B7280] font-medium">
              <span className="font-medium text-[#6B7280]">Gender:</span> {patient.gender}
            </p>
            <p className="text-[12px] text-[#6B7280]">
              <span className="font-medium text-[#6B7280]">Phone:</span> {patient.phone}
            </p>
            <p className="text-[12px] text-[#6B7280]">
              <span className="font-medium text-[#6B7280]">Blood Group:</span>{' '}
              <span className="text-[#111827] font-semibold">{patient.bloodGroup}</span>
            </p>
          </div>
        </div>

        {/* ── Vitals Section ── */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
            Vitals (Today 10:15 AM)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {patient.vitals.map((v, i) => (
              <div
                key={i}
                className="bg-white border border-[#E5E7EB] rounded-xl py-3 px-2 flex flex-col items-center justify-center text-center shadow-sm"
              >
                <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide leading-none mb-1">
                  {v.label}
                </span>
                <span className="text-[15px] font-extrabold text-[#111827] leading-tight">
                  {v.value}
                </span>
                <span className="text-[10px] text-[#9CA3AF] mt-0.5 leading-none">{v.unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Chief Complaint ── */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
            Chief Complaint
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm">
            <p className="text-[13.5px] text-[#111827] leading-relaxed font-medium">
              {patient.chiefComplaint}
            </p>
          </div>
        </div>

        {/* ── Last Visit ── */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
            Last Visit
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl px-4 py-3 shadow-sm flex items-center justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-medium text-[#9CA3AF]">{patient.lastVisitDate}</span>
              <span className="text-[13.5px] font-semibold text-[#111827]">{patient.lastVisitDiagnosis}</span>
            </div>
            <button
              className="text-[12px] font-bold text-[#2563EB] hover:underline whitespace-nowrap flex-shrink-0"
              onClick={() => alert('History details coming soon')}
            >
              View History
            </button>
          </div>
        </div>

        {/* ── Allergies ── */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
            Allergies
          </p>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl px-4 py-3 shadow-sm">
            <p className="text-[13.5px] text-[#111827] font-medium leading-snug">{patient.allergies}</p>
          </div>
        </div>

      </div>

      {/* ── Sticky Bottom: Start Consultation ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E5E7EB] px-4 py-3 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
        <div className="w-full max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] mx-auto">
          <button
            onClick={() => alert(`Starting consultation for ${patient.name}`)}
            className="w-full bg-[#2563EB] hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-[15px] py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            Start Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
