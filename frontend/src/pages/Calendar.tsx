import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import ThemeToggle from '../components/ThemeToggle';

// Standardized appointment status types
type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled';

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  booking_status: BookingStatus;
}

interface Patient {
  id: string;
  name: string;
}

interface AppointmentEntry {
  appointment: Appointment;
  patient: Patient;
}

type AppointmentsMap = Record<string, AppointmentEntry[]>;

function pad(number: number): string {
  return String(number).padStart(2, '0');
}

function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(date);
}

function formatSelectedLabel(dateKey: string): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', weekday: 'short' }).format(
    new Date(year, month - 1, day)
  );
}

function getRelativeDateKey(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return toDateKey(d);
}

function buildCalendarMatrix(referenceDate: Date): Array<Date | null> {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const leadingEmptyCells = (firstDay.getDay() + 6) % 7; // Monday-based calendar
  const cells: Array<Date | null> = [];

  for (let index = 0; index < leadingEmptyCells; index += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }

  return cells;
}

function createMockAppointments(): AppointmentsMap {
  const d0 = getRelativeDateKey(0); // today
  const d1 = getRelativeDateKey(1); // tomorrow
  const d2 = getRelativeDateKey(2); // 2 days later
  const dMinus1 = getRelativeDateKey(-1); // yesterday
  const d4 = getRelativeDateKey(4); // 4 days later
  
  return {
    [dMinus1]: [
      {
        appointment: { id: 'A099', appointment_date: dMinus1, appointment_time: '10:00 AM', booking_status: 'Confirmed' },
        patient: { id: 'P100', name: 'John Doe' }
      },
      {
        appointment: { id: 'A100', appointment_date: dMinus1, appointment_time: '11:00 AM', booking_status: 'Confirmed' },
        patient: { id: 'P101', name: 'Jane Smith' }
      }
    ],
    [d0]: [
      {
        appointment: { id: 'A101', appointment_date: d0, appointment_time: '09:00 AM', booking_status: 'Confirmed' },
        patient: { id: 'P001', name: 'Amina Rahman' }
      },
      {
        appointment: { id: 'A102', appointment_date: d0, appointment_time: '11:15 AM', booking_status: 'Pending' },
        patient: { id: 'P002', name: 'Daniel Moyo' }
      },
      {
        appointment: { id: 'A103', appointment_date: d0, appointment_time: '02:30 PM', booking_status: 'Pending' },
        patient: { id: 'P007', name: 'Jean Dupont' }
      },
      {
        appointment: { id: 'A104', appointment_date: d0, appointment_time: '04:00 PM', booking_status: 'Cancelled' },
        patient: { id: 'P008', name: 'Sarah Connor' }
      }
    ],
    [d1]: [
      {
        appointment: { id: 'A201', appointment_date: d1, appointment_time: '10:00 AM', booking_status: 'Confirmed' },
        patient: { id: 'P003', name: 'Sara Khan' }
      },
      {
        appointment: { id: 'A202', appointment_date: d1, appointment_time: '11:30 AM', booking_status: 'Pending' },
        patient: { id: 'P009', name: 'Liam Neeson' }
      }
    ],
    [d2]: [
      {
        appointment: { id: 'A301', appointment_date: d2, appointment_time: '01:30 PM', booking_status: 'Confirmed' },
        patient: { id: 'P004', name: 'Noah Patel' }
      }
    ],
    [d4]: [
      {
        appointment: { id: 'A401', appointment_date: d4, appointment_time: '04:00 PM', booking_status: 'Confirmed' },
        patient: { id: 'P005', name: 'Mila Ahmed' }
      }
    ]
  };
}

export default function Calendar() {
  const navigate = useNavigate();
  const today = new Date();
  const todayKey = toDateKey(today);

  // Core UI States
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [currentMonth, setCurrentMonth] = useState(today);
  const [appointmentsByDate] = useState<AppointmentsMap>(createMockAppointments);
  const [isLoading, setIsLoading] = useState(false);

  // Availability Card States
  const [workingHours, setWorkingHours] = useState({ start: '09:00', end: '17:00' });
  const [slotDuration, setSlotDuration] = useState<number>(15);
  const [activeWeekdays, setActiveWeekdays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [saveMessage, setSaveMessage] = useState('');

  // Month navigation handlers
  const handlePrevMonth = () => {
    setIsLoading(true);
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setTimeout(() => setIsLoading(false), 200);
  };

  const handleNextMonth = () => {
    setIsLoading(true);
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setTimeout(() => setIsLoading(false), 200);
  };

  // Date selection handler
  const handleDateSelect = (dateKey: string) => {
    setIsLoading(true);
    setSelectedDate(dateKey);
    setTimeout(() => setIsLoading(false), 200);
  };

  // Weekday selection toggler
  const toggleWeekday = (day: string) => {
    setActiveWeekdays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  // Save Settings handler
  const handleSaveAvailability = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('success');
      setSaveMessage('Availability changes saved successfully!');
      setTimeout(() => {
        setSaveStatus('idle');
        setSaveMessage('');
      }, 2000);
    }, 600);
  };

  // Render variables
  const selectedDateAppointments = appointmentsByDate[selectedDate] || [];
  const monthCells = buildCalendarMatrix(currentMonth);

  return (
    <main className="min-h-screen bg-[var(--light-bg)] text-[var(--text-primary)] pb-32 pt-4 transition-colors duration-250">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section */}
        <header className="flex items-center justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-3.5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-200">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--light-bg)] text-[var(--text-secondary)] hover:bg-[var(--light-bg)]/80 transition cursor-pointer border border-[var(--border-color)]"
              aria-label="Go back"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <div>
              <h1 className="text-base font-bold text-[var(--text-primary)] leading-tight">
                Calendar &amp; Schedule
              </h1>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5 font-medium">
                Manage appointments and availability
              </p>
            </div>
          </div>
          <div>
            <ThemeToggle />
          </div>
        </header>

        {/* Middle Section: Calendar (50%) & Availability Card (50%) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-start">
          
          {/* Left Side: Monthly Calendar */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {formatMonthYear(currentMonth)}
              </h2>
              
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--light-bg)] transition cursor-pointer"
                  aria-label="Previous month"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--light-bg)] transition cursor-pointer"
                  aria-label="Next month"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Week Labels */}
            <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)] mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            {/* Calendar Cells Grid */}
            <div className="grid grid-cols-7 gap-1 relative min-h-[175px]">
              {isLoading && (
                <div className="absolute inset-0 bg-[var(--card-bg)]/75 backdrop-blur-xs flex items-center justify-center z-10 rounded-lg">
                  <svg className="animate-spin h-5 w-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
              )}
              
              {monthCells.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} className="aspect-square bg-[var(--light-bg)]/40 rounded-lg" />;
                }

                const dateKey = toDateKey(date);
                const isSelected = dateKey === selectedDate;
                const isCurrentDay = dateKey === todayKey;
                const dayAppointments = appointmentsByDate[dateKey] || [];
                const appointmentCount = dayAppointments.length;

                return (
                  <button
                    key={dateKey}
                    type="button"
                    onClick={() => handleDateSelect(dateKey)}
                    className={[
                      'aspect-square rounded-lg border text-xs font-semibold relative transition duration-150 cursor-pointer flex flex-col items-center justify-center gap-0.5',
                      isSelected
                        ? 'border-teal-600 bg-teal-600 text-white dark:border-teal-500 dark:bg-teal-500 shadow-xs'
                        : 'border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-teal-350 dark:hover:border-teal-650 hover:bg-teal-50/10',
                      isCurrentDay && !isSelected ? 'ring-1.5 ring-teal-500/35' : ''
                    ].join(' ')}
                  >
                    <span className="font-bold text-xs">{date.getDate()}</span>
                    {appointmentCount > 0 && (
                      <span className={`h-1 w-1 rounded-full ${
                        isSelected ? 'bg-white' : 'bg-teal-500 dark:bg-teal-400'
                      }`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: Doctor Availability Card */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
            <h2 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Doctor Availability
            </h2>

            {/* Notification feedback */}
            {saveMessage && (
              <div className="mb-4 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/20 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {saveMessage}
              </div>
            )}

            <div className="space-y-4">
              {/* Working Hours */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Working Hours
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="time"
                    value={workingHours.start}
                    onChange={(e) => setWorkingHours(prev => ({ ...prev, start: e.target.value }))}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] text-xs font-semibold text-[var(--text-primary)] outline-none focus:border-teal-500"
                  />
                  <span className="text-[11px] text-[var(--text-muted)] font-bold uppercase">to</span>
                  <input
                    type="time"
                    value={workingHours.end}
                    onChange={(e) => setWorkingHours(prev => ({ ...prev, end: e.target.value }))}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] text-xs font-semibold text-[var(--text-primary)] outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Consultation Duration */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Consultation Duration
                </label>
                <select
                  value={slotDuration}
                  onChange={(e) => setSlotDuration(Number(e.target.value))}
                  className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] outline-none focus:border-teal-500"
                >
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={20}>20 minutes</option>
                  <option value={30}>30 minutes</option>
                </select>
              </div>

              {/* Available Days */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Available Days
                </label>
                <div className="flex gap-1.5 justify-between">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                    const isActive = activeWeekdays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleWeekday(day)}
                        className={`flex-1 h-8 rounded-xl font-bold text-[10px] flex items-center justify-center transition border cursor-pointer ${
                          isActive
                            ? 'bg-teal-600 border-teal-600 text-white dark:bg-teal-500 dark:border-teal-500'
                            : 'bg-[var(--light-bg)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-color)]/80'
                        }`}
                      >
                        {day.substring(0, 3)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Save Changes Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveAvailability}
                  disabled={saveStatus === 'saving'}
                  className="w-full py-2.5 rounded-xl bg-teal-600 dark:bg-teal-500 text-xs font-bold text-white hover:bg-teal-700 dark:hover:bg-teal-600 transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_12px_rgba(15,118,110,0.1)] dark:shadow-none"
                >
                  {saveStatus === 'saving' ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving Changes...
                    </>
                  ) : saveStatus === 'success' ? (
                    'Changes Saved ✔'
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Bottom Section: Upcoming Appointments List */}
        <section className="w-full">
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-200">
            <h2 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <svg className="w-4.5 h-4.5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Upcoming Appointments — {formatSelectedLabel(selectedDate)}
            </h2>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <svg className="animate-spin h-6 w-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            ) : selectedDateAppointments.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--light-bg)] p-8 text-center text-xs text-[var(--text-muted)]">
                No appointments scheduled for this date.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedDateAppointments.map((entry) => (
                  <div
                    key={entry.appointment.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-color)] bg-[var(--light-bg)]/50 hover:border-teal-500/20 transition duration-150"
                  >
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">
                        {entry.patient.name}
                      </p>
                      <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mt-0.5">
                        {entry.appointment.appointment_time}
                      </p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      entry.appointment.booking_status === 'Confirmed'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 ring-1 ring-emerald-250/20'
                        : entry.appointment.booking_status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 ring-1 ring-amber-250/20'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 ring-1 ring-rose-250/20'
                    }`}>
                      {entry.appointment.booking_status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
      <BottomNav active="calendar" />
    </main>
  );
}
