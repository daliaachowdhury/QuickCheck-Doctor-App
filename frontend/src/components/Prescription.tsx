import React from 'react';
import { MedicineEntry } from '../pages/Summary';

export interface PrescriptionState {
  medicines: MedicineEntry[];
  investigations: string;
  followUpDate: string;
}

interface ConsultationSummary {
  patientName: string;
  patientAge: number | string;
  patientEmail: string;
  chiefComplaint: string;
  diagnosis: string;
  treatmentPlan: string;
}

interface PrescriptionProps {
  consultationSummary: ConsultationSummary;
  prescription: PrescriptionState;
  onChange: (field: keyof PrescriptionState, value: any) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  statusMessage: string;
  statusType: 'success' | 'error' | '';
}

const createMedicineEntry = (): MedicineEntry => ({
  id: `MED-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  medicineName: '',
  dose: '',
  frequency: '',
  days: ''
});

export default function Prescription({
  consultationSummary,
  prescription,
  onChange,
  onSubmit,
  onBack,
  statusMessage,
  statusType
}: PrescriptionProps) {

  const addMedicineEntry = () => {
    onChange('medicines', [...prescription.medicines, createMedicineEntry()]);
  };

  const removeMedicineEntry = (id: string) => {
    const list = prescription.medicines;
    const newList = list.length === 1 ? list : list.filter((entry) => entry.id !== id);
    onChange('medicines', newList);
  };

  const updateMedicineField = (
    id: string,
    field: keyof Omit<MedicineEntry, 'id'>,
    value: string
  ) => {
    const newList = prescription.medicines.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry
    );
    onChange('medicines', newList);
  };

  return (
    <section className="prescription-layout">
      <aside className="context-panel">
        <p className="panel-label">Consultation Summary</p>
        <h2>{consultationSummary.patientName}</h2>
        <p className="context-line">
          Age {consultationSummary.patientAge} | {consultationSummary.patientEmail}
        </p>
        <div className="context-block">
          <strong>Chief Complaint</strong>
          <p>{consultationSummary.chiefComplaint}</p>
        </div>
        <div className="context-block">
          <strong>Diagnosis</strong>
          <p>{consultationSummary.diagnosis}</p>
        </div>
        <div className="context-block">
          <strong>Treatment Plan</strong>
          <p>{consultationSummary.treatmentPlan || 'No treatment plan added.'}</p>
        </div>
        <button type="button" className="secondary-btn" onClick={onBack}>
          Edit Consultation
        </button>
      </aside>

      <section className="form-section prescription-section">
        <form onSubmit={onSubmit} className="consultation-form">
          <fieldset className="form-fieldset">
            <legend>Prescription</legend>

            <div className="medicine-header">
              <p>Medicine entries</p>
              <button type="button" className="add-medicine-btn" onClick={addMedicineEntry}>
                Add Medicine
              </button>
            </div>

            <div className="medicine-list">
              {prescription.medicines.map((entry, index) => (
                <div className="medicine-card" key={entry.id}>
                  <div className="medicine-card-header">
                    <h3>Medicine {index + 1}</h3>
                    <button
                      type="button"
                      className="remove-medicine-btn"
                      onClick={() => removeMedicineEntry(entry.id)}
                      disabled={prescription.medicines.length === 1}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor={`medicine-${entry.id}`}>Medicine Name</label>
                      <input
                        id={`medicine-${entry.id}`}
                        type="text"
                        className="placeholder-gray-400"
                        value={entry.medicineName}
                        onChange={(event) =>
                          updateMedicineField(entry.id, 'medicineName', event.target.value)
                        }
                        placeholder="e.g. Paracetamol"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`dose-${entry.id}`}>Dose</label>
                      <input
                        id={`dose-${entry.id}`}
                        type="text"
                        className="placeholder-gray-400"
                        value={entry.dose}
                        onChange={(event) =>
                          updateMedicineField(entry.id, 'dose', event.target.value)
                        }
                        placeholder="e.g. 500mg"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`frequency-${entry.id}`}>Frequency</label>
                      <input
                        id={`frequency-${entry.id}`}
                        type="text"
                        className="placeholder-gray-400"
                        value={entry.frequency}
                        onChange={(event) =>
                          updateMedicineField(entry.id, 'frequency', event.target.value)
                        }
                        placeholder="e.g. BD (twice a day)"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`days-${entry.id}`}>Days</label>
                      <input
                        id={`days-${entry.id}`}
                        type="text"
                        className="placeholder-gray-400"
                        value={entry.days}
                        onChange={(event) =>
                          updateMedicineField(entry.id, 'days', event.target.value)
                        }
                        placeholder="e.g. 5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="form-fieldset">
            <legend>Follow-up Planning</legend>

            <div className="form-group full-width">
              <label htmlFor="investigations">Investigations</label>
              <textarea
                id="investigations"
                className="placeholder-gray-400"
                placeholder="Please specify"
                value={prescription.investigations}
                onChange={(event) => onChange('investigations', event.target.value)}
                rows={4}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="followUpDate">Follow-up Date</label>
              <input
                id="followUpDate"
                type="date"
                value={prescription.followUpDate}
                onChange={(event) => onChange('followUpDate', event.target.value)}
              />
            </div>
          </fieldset>

          {statusMessage && (
            <div className={`status-message ${statusType}`}>{statusMessage}</div>
          )}

          <button type="submit" className="submit-btn">
            Next
          </button>
        </form>
      </section>
    </section>
  );
}
