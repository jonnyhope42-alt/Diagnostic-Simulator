import React from 'react';
import { MedicalCase } from '../types';

interface Props {
  data: MedicalCase;
  totalCost: number;
}

export const PatientBanner: React.FC<Props> = ({ data, totalCost }) => {
  return (
    <div className="bg-[#005EB8] text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-20">
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          Clinical Diagnostics
        </h1>
        <div className="mt-2 flex gap-6 text-sm opacity-90">
          <span><strong>Patient:</strong> {data.patientName}</span>
          <span><strong>DOB:</strong> {new Date().getFullYear() - data.age} ({data.age}y)</span>
          <span><strong>Sex:</strong> {data.gender}</span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs uppercase tracking-wider opacity-80">Current Spend</div>
        <div className={`text-2xl font-bold ${totalCost > 3000 ? 'text-red-200' : 'text-white'}`}>
          £{totalCost.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );
};