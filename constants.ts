import { TestOption } from "./types";

export const NHS_BLUE = '#005EB8';
export const NHS_DARK_BLUE = '#003087';
export const NHS_BRIGHT_BLUE = '#0072CE';
export const NHS_GREY = '#425563';
export const NHS_PALE_GREY = '#F0F4F5';

export const INITIAL_BUDGET = 5000;

export const AVAILABLE_TESTS: TestOption[] = [
  // Bedside
  { id: 'ecg', name: '12-Lead ECG', cost: 35, category: 'BEDSIDE' },
  { id: 'abg', name: 'Arterial Blood Gas', cost: 45, category: 'BEDSIDE' },
  { id: 'urinalysis', name: 'Urinalysis Dipstick', cost: 5, category: 'BEDSIDE' },
  { id: 'fundoscopy', name: 'Fundoscopy', cost: 0, category: 'BEDSIDE' },
  
  // Labs
  { id: 'fbc', name: 'Full Blood Count', cost: 12, category: 'LAB' },
  { id: 'u_e', name: 'Urea & Electrolytes', cost: 12, category: 'LAB' },
  { id: 'lft', name: 'Liver Function Tests', cost: 15, category: 'LAB' },
  { id: 'crp', name: 'C-Reactive Protein', cost: 10, category: 'LAB' },
  { id: 'trop', name: 'Troponin T', cost: 25, category: 'LAB' },
  { id: 'd_dimer', name: 'D-Dimer', cost: 20, category: 'LAB' },
  { id: 'coag', name: 'Coagulation Screen', cost: 15, category: 'LAB' },
  { id: 'blood_culture', name: 'Blood Cultures', cost: 40, category: 'LAB' },
  { id: 'tft', name: 'Thyroid Function', cost: 18, category: 'LAB' },
  { id: 'autoimmune', name: 'Autoimmune Screen', cost: 85, category: 'LAB' },
  { id: 'lp', name: 'Lumbar Puncture (CSF Analysis)', cost: 120, category: 'LAB' },

  // Imaging
  { id: 'cxr', name: 'CXR (Chest X-Ray)', cost: 35, category: 'IMAGING' },
  { id: 'axr', name: 'AXR (Abdominal X-Ray)', cost: 35, category: 'IMAGING' },
  { id: 'ct_head', name: 'CT Head', cost: 180, category: 'IMAGING' },
  { id: 'ct_abdo', name: 'CT Abdomen/Pelvis', cost: 250, category: 'IMAGING' },
  { id: 'ctpa', name: 'CT Pulmonary Angiogram', cost: 280, category: 'IMAGING' },
  { id: 'mri_brain', name: 'MRI Brain', cost: 450, category: 'IMAGING' },
  { id: 'uss_abdo', name: 'Ultrasound Abdomen', cost: 90, category: 'IMAGING' },
  { id: 'echo', name: 'Echocardiogram', cost: 150, category: 'IMAGING' },
  
  // Special
  { id: 'consult_cardio', name: 'Cardiology Consult', cost: 100, category: 'SPECIAL' },
  { id: 'consult_neuro', name: 'Neurology Consult', cost: 100, category: 'SPECIAL' },
  { id: 'consult_resp', name: 'Respiratory Consult', cost: 100, category: 'SPECIAL' },
  { id: 'consult_surg', name: 'Surgical Consult', cost: 100, category: 'SPECIAL' },
];
