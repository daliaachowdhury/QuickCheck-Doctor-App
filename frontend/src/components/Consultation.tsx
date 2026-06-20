import React from 'react';

export interface ConsultationState {
  patientName: string;
  patientAge: string;
  patientEmail: string;
  chiefComplaint: string;
  symptoms: string[];
  diagnosis: string;
  treatmentPlan: string;
  clinicalNotes: string;
}

interface ConsultationProps {
  consultation: ConsultationState;
  onChange: (field: keyof ConsultationState, value: string | string[]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  statusMessage: string;
  statusType: 'success' | 'error' | '';
}

const symptomOptions = [
  'Fever',
  'Pain',
  'Cough',
  'Shortness of breath',
  'Headache',
  'Nausea',
  'Fatigue',
  'Dizziness'
];

export default function Consultation({
  consultation,
  onChange,
  onSubmit,
  statusMessage,
  statusType
}: ConsultationProps) {
  
  const toggleSymptom = (symptom: string) => {
    const currentSymptoms = consultation.symptoms || [];
    const newSymptoms = currentSymptoms.includes(symptom)
      ? currentSymptoms.filter((item) => item !== symptom)
      : [...currentSymptoms, symptom];
    onChange('symptoms', newSymptoms);
  };

  return (
    <section className="form-section">
      <form onSubmit={onSubmit} className="consultation-form">
        <fieldset className="form-fieldset">
          <legend>Patient Information</legend>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientName">Patient Name *</label>
              <input
                id="patientName"
                type="text"
                className="placeholder-gray-400"
                placeholder="e.g. Sarah Khan"
                value={consultation.patientName}
                onChange={(event) => onChange('patientName', event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientAge">Age *</label>
              <input
                id="patientAge"
                type="number"
                className="placeholder-gray-400"
                placeholder="e.g. 34"
                value={consultation.patientAge}
                onChange={(event) => onChange('patientAge', event.target.value)}
                min="0"
                max="150"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientEmail">Email *</label>
              <input
                id="patientEmail"
                type="email"
                className="placeholder-gray-400"
                placeholder="e.g. patient@example.com"
                value={consultation.patientEmail}
                onChange={(event) => onChange('patientEmail', event.target.value)}
                required
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="form-fieldset">
          <legend>Clinical Assessment</legend>

          <div className="form-group full-width">
            <label htmlFor="chiefComplaint">Chief Complaint *</label>
            <textarea
              id="chiefComplaint"
              className="placeholder-gray-400"
              placeholder="e.g. Fever and headache since 2 days"
              value={consultation.chiefComplaint}
              onChange={(event) => onChange('chiefComplaint', event.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Associated Symptoms</label>
            <div className="checkbox-group">
              {symptomOptions.map((symptom) => (
                <div className="checkbox-item" key={symptom}>
                  <input
                    type="checkbox"
                    id={`sym-${symptom}`}
                    checked={consultation.symptoms.includes(symptom)}
                    onChange={() => toggleSymptom(symptom)}
                  />
                  <label htmlFor={`sym-${symptom}`}>{symptom}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="diagnosis">Diagnosis *</label>
            <textarea
              id="diagnosis"
              className="placeholder-gray-400"
              placeholder="e.g. Viral Fever"
              value={consultation.diagnosis}
              onChange={(event) => onChange('diagnosis', event.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="treatmentPlan">Treatment Plan</label>
            <textarea
              id="treatmentPlan"
              className="placeholder-gray-400"
              placeholder="e.g. Paracetamol 500mg and oral fluids"
              value={consultation.treatmentPlan}
              onChange={(event) => onChange('treatmentPlan', event.target.value)}
              rows={3}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="clinicalNotes">Additional Notes</label>
            <textarea
              id="clinicalNotes"
              className="placeholder-gray-400"
              placeholder="e.g. Patient advised rest and hydration"
              value={consultation.clinicalNotes}
              onChange={(event) => onChange('clinicalNotes', event.target.value)}
              rows={3}
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
  );
}
