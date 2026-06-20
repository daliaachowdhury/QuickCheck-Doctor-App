import { useState } from 'react';
import './App.css';
import BottomNav from './components/BottomNav';
import Consultation, { ConsultationState } from './components/Consultation';
import Prescription, { PrescriptionState } from './components/Prescription';
import Summary, { MedicineEntry } from './pages/Summary';
import ThemeToggle from './components/ThemeToggle';

type AppStep = 'consultation' | 'prescription' | 'summary' | 'complete';
type StatusType = 'success' | 'error' | '';

export interface Visit {
  consultation: ConsultationState;
  prescription: PrescriptionState;
  advice: string;
}

export interface CompletedVisit {
  id: string;
  consultation: ConsultationState;
  prescription: PrescriptionState;
  advice: string;
  completedAt: string;
}

const createMedicineEntry = (): MedicineEntry => ({
  id: `MED-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  medicineName: '',
  dose: '',
  frequency: '',
  days: ''
});

const getEmptyVisit = (): Visit => ({
  consultation: {
    patientName: '',
    patientAge: '',
    patientEmail: '',
    chiefComplaint: '',
    symptoms: [],
    diagnosis: '',
    treatmentPlan: '',
    clinicalNotes: ''
  },
  prescription: {
    medicines: [createMedicineEntry()],
    investigations: '',
    followUpDate: ''
  },
  advice: ''
});

// ============================================================================
// DATABASE CONNECTION INTEGRATION DETAILS (READY FOR SUPABASE / OTHER DBs)
// ============================================================================
// To persist clinical visits to a backend database (e.g. Supabase, Firebase):
//
// 1. Install DB SDK: `npm install @supabase/supabase-js` or similar client.
// 2. Initialize in `src/utils/supabaseClient.ts`:
//    import { createClient } from '@supabase/supabase-js';
//    export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
//
// 3. Connect fetching logic:
//    Add a `useEffect` hook in `App` component to load visits on mount:
//    ```typescript
//    useEffect(() => {
//      async function loadVisits() {
//        const { data, error } = await supabase.from('visits').select('*').order('completed_at', { ascending: false });
//        if (!error && data) setCompletedVisits(data);
//      }
//      loadVisits();
//    }, []);
//    ```
//
// 4. Connect saving logic:
//    In `saveVisitToDatabase(newVisit)`, trigger:
//    ```typescript
//    const { data, error } = await supabase.from('visits').insert([newVisit]);
//    ```
// ============================================================================
async function saveVisitToDatabase(visit: CompletedVisit): Promise<boolean> {
  // Placeholder API/database call log. Replace this with your direct Supabase/Firebase insert call.
  console.log('Sending completed visit payload to database:', visit);
  return true;
}

export default function App() {
  const [step, setStep] = useState<AppStep>('consultation');
  const [visit, setVisit] = useState<Visit>(getEmptyVisit);
  const [completedVisits, setCompletedVisits] = useState<CompletedVisit[]>([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<StatusType>('');

  const handleConsultationChange = (
    field: keyof ConsultationState,
    value: string | string[]
  ) => {
    setVisit((prev) => ({
      ...prev,
      consultation: {
        ...prev.consultation,
        [field]: value
      }
    }));
  };

  const handlePrescriptionChange = (
    field: keyof PrescriptionState,
    value: any
  ) => {
    setVisit((prev) => ({
      ...prev,
      prescription: {
        ...prev.prescription,
        [field]: value
      }
    }));
  };

  const handleAdviceChange = (value: string) => {
    setVisit((prev) => ({
      ...prev,
      advice: value
    }));
  };

  const handleConsultationSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage('');
    setStatusType('');

    const { patientName, patientAge, patientEmail, chiefComplaint, diagnosis } =
      visit.consultation;

    if (!patientName.trim() || !patientAge.trim() || !patientEmail.trim()) {
      setStatusMessage('Patient information is required.');
      setStatusType('error');
      return;
    }

    if (!chiefComplaint.trim()) {
      setStatusMessage('Chief complaint is required.');
      setStatusType('error');
      return;
    }

    if (!diagnosis.trim()) {
      setStatusMessage('Diagnosis is required.');
      setStatusType('error');
      return;
    }

    const ageNum = Number.parseInt(patientAge, 10);
    if (Number.isNaN(ageNum) || ageNum < 0 || ageNum > 150) {
      setStatusMessage('Please enter a valid patient age.');
      setStatusType('error');
      return;
    }

    setStatusMessage('Consultation captured. Continue to prescription.');
    setStatusType('success');
    setStep('prescription');

    window.setTimeout(() => {
      setStatusMessage('');
      setStatusType('');
    }, 3000);
  };

  const handlePrescriptionSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage('');
    setStatusType('');

    const { medicines, followUpDate } = visit.prescription;

    const validMedicines = medicines.filter((entry) =>
      [entry.medicineName, entry.dose, entry.frequency, entry.days].some((value) =>
        value.trim()
      )
    );

    if (validMedicines.length === 0) {
      setStatusMessage('Add at least one medicine before continuing.');
      setStatusType('error');
      return;
    }

    for (const entry of validMedicines) {
      if (
        !entry.medicineName.trim() ||
        !entry.dose.trim() ||
        !entry.frequency.trim() ||
        !entry.days.trim()
      ) {
        setStatusMessage('Fill all medicine fields before continuing.');
        setStatusType('error');
        return;
      }
    }

    if (!followUpDate.trim()) {
      setStatusMessage('Follow-up date is required.');
      setStatusType('error');
      return;
    }

    setStatusMessage('Prescription saved. Review the complete visit.');
    setStatusType('success');
    setStep('summary');

    window.setTimeout(() => {
      setStatusMessage('');
      setStatusType('');
    }, 3000);
  };

  const handleCompleteVisit = async () => {
    const newCompletedVisit: CompletedVisit = {
      id: `VISIT-${Date.now()}`,
      consultation: { ...visit.consultation },
      prescription: { ...visit.prescription },
      advice: visit.advice.trim(),
      completedAt: new Date().toLocaleString()
    };

    // Save payload to DB placeholder
    await saveVisitToDatabase(newCompletedVisit);

    // Update local state list
    setCompletedVisits((current) => [newCompletedVisit, ...current]);

    setStatusMessage('Visit completed successfully.');
    setStatusType('success');
    setStep('complete');

    window.setTimeout(() => {
      setStatusMessage('');
      setStatusType('');
    }, 3000);
  };

  const startNewVisit = () => {
    setVisit(getEmptyVisit());
    setStep('consultation');
    setStatusMessage('');
    setStatusType('');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="eyebrow">QuickCheck Doctors App</p>
            <h1>Clinical Workflow</h1>
            <p className="subtitle">
              Consultation, prescription, and complete visit capture for live patient care.
            </p>
          </div>
          <div className="self-start sm:self-center">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="stepper" aria-label="Workflow steps">
          <div className={`stepper-item ${step === 'consultation' ? 'active' : ''}`}>
            <span>1</span>
            Consultation
          </div>
          <div className={`stepper-item ${step === 'prescription' ? 'active' : ''}`}>
            <span>2</span>
            Prescription
          </div>
          <div className={`stepper-item ${step === 'summary' ? 'active' : ''}`}>
            <span>3</span>
            Summary
          </div>
        </div>

        {step === 'consultation' && (
          <Consultation
            consultation={visit.consultation}
            onChange={handleConsultationChange}
            onSubmit={handleConsultationSubmit}
            statusMessage={statusMessage}
            statusType={statusType}
          />
        )}

        {step === 'prescription' && (
          <Prescription
            consultationSummary={{
              patientName: visit.consultation.patientName,
              patientAge: Number.parseInt(visit.consultation.patientAge, 10) || 0,
              patientEmail: visit.consultation.patientEmail,
              chiefComplaint: visit.consultation.chiefComplaint,
              diagnosis: visit.consultation.diagnosis,
              treatmentPlan: visit.consultation.treatmentPlan
            }}
            prescription={visit.prescription}
            onChange={handlePrescriptionChange}
            onSubmit={handlePrescriptionSubmit}
            onBack={() => setStep('consultation')}
            statusMessage={statusMessage}
            statusType={statusType}
          />
        )}

        {step === 'summary' && (
          <Summary
            visit={visit}
            onAdviceChange={handleAdviceChange}
            onCompleteVisit={handleCompleteVisit}
            onBack={() => setStep('prescription')}
            isCompleted={false}
          />
        )}

        {step === 'complete' && (
          <section className="completion-shell">
            <div className="completion-card">
              <p className="panel-label">Visit Completed</p>
              <h2>Summary &amp; Complete Visit</h2>
              <p className="completion-copy">
                The visit has been stored in state and is ready for future persistence.
              </p>
              <button type="button" className="secondary-btn" onClick={startNewVisit}>
                Start New Visit
              </button>
            </div>

            <Summary
              visit={visit}
              onAdviceChange={handleAdviceChange}
              onCompleteVisit={handleCompleteVisit}
              onBack={() => setStep('summary')}
              isCompleted
            />
          </section>
        )}

        {completedVisits.length > 0 && (
          <section className="records-section completed-records">
            <div className="section-heading">
              <h2>Stored Visits</h2>
              <p>Completed visits kept in state until database integration is added.</p>
            </div>
            <div className="records-list">
              {completedVisits.map((cv) => (
                <article key={cv.id} className="record-card">
                  <div className="record-header">
                    <div>
                      <h3>{cv.consultation.patientName}</h3>
                      <p className="record-meta">Completed at {cv.completedAt}</p>
                    </div>
                  </div>
                  <div className="record-body">
                    <div className="record-field">
                      <strong>Diagnosis</strong>
                      <p>{cv.consultation.diagnosis}</p>
                    </div>
                    <div className="record-field">
                      <strong>Follow-up Date</strong>
                      <p>{cv.prescription.followUpDate}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <BottomNav active="dashboard" />
    </div>
  );
}
