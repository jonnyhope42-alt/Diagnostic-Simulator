import React from 'react';
import { MedicalCase } from '../types';

interface Props {
  data: MedicalCase;
  selectedDiagnosis: string | null;
  onSelectDiagnosis: (diag: string) => void;
  isGameActive: boolean;
  onSubmitDiagnosis: () => void;
}

export const ClinicalNotes: React.FC<Props> = ({ 
  data, 
  selectedDiagnosis, 
  onSelectDiagnosis,
  isGameActive,
  onSubmitDiagnosis
}) => {
  return (
    <div className="bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-3 bg-[#003087] text-white text-sm font-bold uppercase tracking-wider">
        Clinical Presentation
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        {/* Vitals Section */}
        <section>
          <h3 className="text-[#005EB8] font-bold border-b-2 border-[#005EB8] mb-2 pb-1">Initial Observations</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 p-2 border border-gray-100 rounded">
              <span className="text-gray-500 block text-xs">HR</span>
              <span className="font-mono font-bold text-lg">{data.initialVitals.hr}</span>
            </div>
            <div className="bg-gray-50 p-2 border border-gray-100 rounded">
              <span className="text-gray-500 block text-xs">BP</span>
              <span className="font-mono font-bold text-lg">{data.initialVitals.bp}</span>
            </div>
            <div className="bg-gray-50 p-2 border border-gray-100 rounded">
              <span className="text-gray-500 block text-xs">RR</span>
              <span className="font-mono font-bold text-lg">{data.initialVitals.rr}</span>
            </div>
            <div className="bg-gray-50 p-2 border border-gray-100 rounded">
              <span className="text-gray-500 block text-xs">O2 Sats</span>
              <span className="font-mono font-bold text-lg">{data.initialVitals.o2}%</span>
            </div>
            <div className="bg-gray-50 p-2 border border-gray-100 rounded">
              <span className="text-gray-500 block text-xs">Temp</span>
              <span className="font-mono font-bold text-lg">{data.initialVitals.temp}°C</span>
            </div>
            <div className="bg-gray-50 p-2 border border-gray-100 rounded">
              <span className="text-gray-500 block text-xs">GCS</span>
              <span className="font-mono font-bold text-lg">{data.initialVitals.gcs}</span>
            </div>
          </div>
        </section>

        {/* Presentation */}
        <section>
          <h3 className="text-[#005EB8] font-bold border-b-2 border-[#005EB8] mb-2 pb-1">Presenting Complaint</h3>
          <p className="text-sm font-medium text-gray-800">{data.presentingComplaint}</p>
          <p className="text-sm text-gray-600 mt-1 italic">"{data.historyOfPresentingComplaint}"</p>
        </section>

        {/* Differentials - The Core Mechanic */}
        <section className="bg-[#F0F4F5] p-3 rounded border border-gray-300">
          <h3 className="text-[#003087] font-bold mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Differential Diagnosis
          </h3>
          <div className="space-y-2">
            {data.differentials.map((diff, idx) => (
              <label 
                key={idx} 
                className={`flex items-center p-2 rounded cursor-pointer transition-colors border ${selectedDiagnosis === diff ? 'bg-blue-100 border-blue-500 ring-1 ring-blue-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
              >
                <input 
                  type="radio" 
                  name="diagnosis" 
                  value={diff} 
                  checked={selectedDiagnosis === diff}
                  onChange={() => onSelectDiagnosis(diff)}
                  disabled={!isGameActive}
                  className="h-4 w-4 text-[#005EB8] focus:ring-[#005EB8] border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-800">{diff}</span>
              </label>
            ))}
          </div>
          <button 
            onClick={onSubmitDiagnosis}
            disabled={!selectedDiagnosis || !isGameActive}
            className="w-full mt-4 bg-[#0072CE] hover:bg-[#005EB8] disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded shadow-sm text-sm transition-colors"
          >
            Confirm Primary Diagnosis
          </button>
        </section>
      </div>
    </div>
  );
};