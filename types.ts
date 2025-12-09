export enum LogType {
  SYSTEM = 'SYSTEM',
  HISTORY = 'HISTORY',
  VITALS = 'VITALS',
  LAB = 'LAB',
  IMAGING = 'IMAGING',
  INTERVENTION = 'INTERVENTION',
  DIAGNOSIS = 'DIAGNOSIS'
}

export interface LogEntry {
  id: string;
  timestamp: string;
  type: LogType;
  title: string;
  content: string;
  cost: number;
}

export interface MedicalCase {
  patientName: string;
  age: number;
  gender: string;
  presentingComplaint: string;
  historyOfPresentingComplaint: string;
  pastMedicalHistory: string;
  drugHistory: string;
  allergies: string;
  socialHistory: string;
  trueDiagnosis: string; // Hidden from user
  differentials: string[]; // 5 plausible options
  initialVitals: {
    hr: number;
    bp: string;
    rr: number;
    o2: number;
    temp: number;
    gcs: number;
  };
}

export interface TestOption {
  id: string;
  name: string;
  cost: number;
  category: 'LAB' | 'IMAGING' | 'BEDSIDE' | 'SPECIAL';
}

export enum GameStatus {
  LOADING = 'LOADING',
  ACTIVE = 'ACTIVE',
  SOLVED = 'SOLVED',
  FAILED = 'FAILED'
}
