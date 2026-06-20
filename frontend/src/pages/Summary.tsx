export interface MedicineEntry {
  id: string;
  medicineName: string;
  dose: string;
  frequency: string;
  days: string;
}

export interface ConsultationSummaryData {
  patientName: string;
  patientAge: number | string;
  patientEmail: string;
  chiefComplaint: string;
  diagnosis: string;
  clinicalNotes: string;
}

export interface PrescriptionSummaryData {
  medicines: MedicineEntry[];
  investigations: string;
  followUpDate: string;
}

export interface VisitSummaryData {
  consultation?: ConsultationSummaryData;
  prescription?: PrescriptionSummaryData;
  advice?: string;
}

interface SummaryProps {
  visit: VisitSummaryData | null;
  onAdviceChange: (advice: string) => void;
  onCompleteVisit: () => void;
  onBack: () => void;
  isCompleted: boolean;
}

export default function Summary({
  visit,
  onAdviceChange,
  onCompleteVisit,
  onBack,
  isCompleted
}: SummaryProps) {
  const consultation = visit?.consultation;
  const prescription = visit?.prescription;

  return (
    <section className="summary-layout">
      <div className="summary-card">
        <p className="panel-label">Summary & Complete Visit</p>
        <h2>Complete Visit</h2>
        <p className="summary-copy">
          Review the stored consultation and prescription data before completing the visit.
        </p>

        <div className="summary-block">
          <strong>Diagnosis</strong>
          <p>{consultation?.diagnosis || 'No diagnosis entered yet.'}</p>
        </div>

        <div className="summary-block">
          <strong>Medicines</strong>
          {prescription?.medicines?.length ? (
            <div className="summary-medicine-list">
              {prescription.medicines.map((medicine) => (
                <div className="summary-medicine-item" key={medicine.id}>
                  <span>{medicine.medicineName}</span>
                  <span>{medicine.dose}</span>
                  <span>{medicine.frequency}</span>
                  <span>{medicine.days} days</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No medicines added yet.</p>
          )}
        </div>

        <div className="summary-block">
          <strong>Investigations</strong>
          <p>{prescription?.investigations || 'No investigations added yet.'}</p>
        </div>

        <div className="summary-block">
          <strong>Follow-up Date</strong>
          <p>{prescription?.followUpDate || 'No follow-up date selected.'}</p>
        </div>

        <div className="summary-block">
          <strong>Advice</strong>
          <textarea
            className="summary-advice placeholder-gray-400"
            value={visit?.advice || ''}
            onChange={(event) => onAdviceChange(event.target.value)}
            placeholder="e.g. Continue hydration and return if fever persists"
            rows={5}
          />
        </div>

        <div className="summary-actions">
          <button type="button" className="secondary-btn" onClick={onBack}>
            Back
          </button>
          <button
            type="button"
            className="submit-btn"
            onClick={onCompleteVisit}
            disabled={isCompleted}
          >
            Complete Visit
          </button>
        </div>

        {isCompleted && (
          <div className="status-message success summary-success">
            Visit has been completed and stored in state.
          </div>
        )}
      </div>

      <aside className="summary-sidecard">
        <p className="panel-label">Patient Context</p>
        <h3>{consultation?.patientName || 'No patient selected'}</h3>
        <p className="context-line">
          {consultation ? `Age ${consultation.patientAge} | ${consultation.patientEmail}` : 'Waiting for consultation data.'}
        </p>
        <div className="context-block">
          <strong>Chief Complaint</strong>
          <p>{consultation?.chiefComplaint || 'No chief complaint entered yet.'}</p>
        </div>
        <div className="context-block">
          <strong>Clinical Notes</strong>
          <p>{consultation?.clinicalNotes || 'No clinical notes entered yet.'}</p>
        </div>
      </aside>
    </section>
  );
}
