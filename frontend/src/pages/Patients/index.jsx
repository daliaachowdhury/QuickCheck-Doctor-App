import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, Phone, Calendar, ArrowRight } from 'lucide-react';
import { MOCK_PATIENTS } from '../Patient';
import Card from '../../components/common/Card';

export default function Patients() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const patientsList = Object.values(MOCK_PATIENTS);

  const filteredPatients = patientsList.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery)
  );

  return (
    <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl lg:text-3xl font-extrabold text-brand-text">Patients Directory</h2>
        <p className="text-xs text-brand-muted font-medium mt-0.5">Manage and view all registered patients</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
        <input
          type="text"
          placeholder="Search by name, patient ID, or phone number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-brand-text placeholder-brand-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Patients Display: Responsive Layout */}
      {filteredPatients.length > 0 ? (
        <>
          {/* Card grid for Mobile & Tablet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => navigate(`/patient/${patient.id}`)}
                className="cursor-pointer"
              >
                <Card className="flex flex-col gap-3 hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold text-sm">
                      {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-brand-text text-sm leading-tight">
                        {patient.name}
                      </h4>
                      <span className="text-xs text-brand-muted font-medium">
                        ID: {patient.id} &bull; {patient.gender} &bull; {patient.age} Yrs
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 pt-2 border-t border-brand-border/60 text-xs text-brand-muted">
                    <span className="flex items-center gap-1.5">
                      <Phone size={12} className="text-brand-muted" />
                      <span>{patient.phone}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-brand-muted" />
                      <span>Last Visit: <span className="font-semibold text-brand-text">{patient.lastVisitDate}</span></span>
                    </span>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Premium Table layout for Laptop & Desktop */}
          <div className="hidden lg:block bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-[#E5E7EB] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                  <th className="py-4 px-6">Patient</th>
                  <th className="py-4 px-6">Age / Gender</th>
                  <th className="py-4 px-6">Phone Number</th>
                  <th className="py-4 px-6">Last Visit</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] text-sm">
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    onClick={() => navigate(`/patient/${patient.id}`)}
                    className="hover:bg-blue-50/20 cursor-pointer transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-brand-text group-hover:text-primary transition-colors">{patient.name}</p>
                          <p className="text-xs text-brand-muted">ID: {patient.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#111827] font-medium">
                      {patient.age} Yrs &bull; {patient.gender}
                    </td>
                    <td className="py-4 px-6 text-brand-muted font-medium">
                      {patient.phone}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-[#111827] font-semibold">{patient.lastVisitDiagnosis}</span>
                        <span className="text-xs text-brand-muted">{patient.lastVisitDate}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 group-hover:bg-primary group-hover:text-white px-3 py-1.5 rounded-lg transition-all">
                        <span>View Details</span>
                        <ArrowRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm">
          <User className="mx-auto text-brand-muted/40 mb-3" size={40} />
          <p className="text-sm font-semibold text-brand-muted">No patients found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
