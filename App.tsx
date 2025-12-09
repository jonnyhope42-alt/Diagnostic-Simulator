import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GameStatus, MedicalCase, LogEntry, LogType, TestOption } from './types';
import { generateMedicalCase, interpretTestResult } from './services/geminiService';
import { PatientBanner } from './components/PatientBanner';
import { ClinicalNotes } from './components/ClinicalNotes';
import { ActionPanel } from './components/ActionPanel';
import { PatientLog } from './components/PatientLog';
import { INITIAL_BUDGET } from './constants';

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.LOADING);
  const [medicalCase, setMedicalCase] = useState<MedicalCase | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentCost, setCurrentCost] = useState(0);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize Game
  useEffect(() => {
    initGame();
  }, []);

  const initGame = async () => {
    setGameStatus(GameStatus.LOADING);
    const newCase = await generateMedicalCase();
    setMedicalCase(newCase);
    setLogs([{
      id: uuidv4(),
      timestamp: new Date().toLocaleTimeString(),
      type: LogType.SYSTEM,
      title: 'New Patient Arrival',
      content: `Patient admitted to ED. ${newCase.presentingComplaint}.`,
      cost: 0
    }]);
    setCurrentCost(0);
    setSelectedDiagnosis(null);
    setGameStatus(GameStatus.ACTIVE);
  };

  const addLog = (type: LogType, title: string, content: string, cost: number) => {
    const newLog: LogEntry = {
      id: uuidv4(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      title,
      content,
      cost
    };
    setLogs(prev => [...prev, newLog]);
    setCurrentCost(prev => prev + cost);
  };

  const handleOrderTest = async (test: TestOption) => {
    if (!medicalCase || isProcessing) return;

    setIsProcessing(true);
    addLog(LogType.SYSTEM, `Ordering ${test.name}`, 'Waiting for results...', 0);

    const result = await interpretTestResult(medicalCase, test.name, test.category);

    // Simulate delay for realism
    setTimeout(() => {
      addLog(
        test.category === 'IMAGING' ? LogType.IMAGING : LogType.LAB, 
        `${test.name} Result`, 
        result, 
        test.cost
      );
      setIsProcessing(false);
    }, 1500);
  };

  const handleRevealHistory = (section: string) => {
    if (!medicalCase) return;
    let title = '';
    let content = '';

    switch(section) {
      case 'PMH':
        title = 'Past Medical History';
        content = medicalCase.pastMedicalHistory;
        break;
      case 'DHx':
        title = 'Drug History';
        content = medicalCase.drugHistory;
        break;
      case 'SHx':
        title = 'Social History';
        content = medicalCase.socialHistory;
        break;
      case 'ALL':
        title = 'Allergies';
        content = medicalCase.allergies;
        break;
    }

    // Check if already revealed (simple check by title in logs)
    const alreadyRevealed = logs.some(l => l.title === title);
    if (!alreadyRevealed) {
      addLog(LogType.HISTORY, title, content, 0);
    }
  };

  const handleSubmitDiagnosis = () => {
    if (!medicalCase || !selectedDiagnosis) return;

    const isCorrect = selectedDiagnosis === medicalCase.trueDiagnosis;

    if (isCorrect) {
      setGameStatus(GameStatus.SOLVED);
      addLog(LogType.DIAGNOSIS, 'Case Closed', `CORRECT DIAGNOSIS: ${selectedDiagnosis}. Patient treatment started successfully. Outcome: Full Recovery.`, 0);
    } else {
      setGameStatus(GameStatus.FAILED);
      addLog(LogType.DIAGNOSIS, 'Case Failed', `INCORRECT DIAGNOSIS: ${selectedDiagnosis}. \n\nThe correct diagnosis was: ${medicalCase.trueDiagnosis}. \n\nPatient condition deteriorated.`, 0);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="bg-[#007F3B] text-white text-center py-1 text-xs font-bold uppercase tracking-widest shrink-0">
        PROTOTYPE FOR NON CLINICAL USE ONLY
      </div>

      {gameStatus === GameStatus.LOADING ? (
        <div className="flex-1 flex items-center justify-center bg-[#F0F4F5] flex-col">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#005EB8] mb-4"></div>
          <h2 className="text-[#005EB8] font-bold text-xl">Admitting Patient...</h2>
          <p className="text-gray-500 mt-2">Generating complex clinical scenario.</p>
        </div>
      ) : (
        <>
          {medicalCase && (
            <PatientBanner data={medicalCase} totalCost={currentCost} />
          )}

          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
            {/* Left: Notes & Differentials */}
            <div className="md:col-span-3 h-full overflow-hidden">
              {medicalCase && (
                <ClinicalNotes 
                  data={medicalCase}
                  selectedDiagnosis={selectedDiagnosis}
                  onSelectDiagnosis={setSelectedDiagnosis}
                  isGameActive={gameStatus === GameStatus.ACTIVE}
                  onSubmitDiagnosis={handleSubmitDiagnosis}
                />
              )}
            </div>

            {/* Center: Actions */}
            <div className="md:col-span-5 h-full overflow-hidden border-r border-gray-200">
               {gameStatus === GameStatus.ACTIVE ? (
                  <ActionPanel 
                    onOrderTest={handleOrderTest} 
                    isProcessing={isProcessing}
                    isGameActive={true}
                    onRevealHistory={handleRevealHistory}
                  />
               ) : (
                 <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8 text-center">
                   <h2 className={`text-3xl font-bold mb-4 ${gameStatus === GameStatus.SOLVED ? 'text-green-600' : 'text-red-600'}`}>
                     {gameStatus === GameStatus.SOLVED ? 'Patient Discharged' : 'Critical Incident'}
                   </h2>
                   <p className="text-gray-600 mb-8 max-w-md">
                     {gameStatus === GameStatus.SOLVED 
                       ? `Well done. You correctly identified ${medicalCase?.trueDiagnosis} with a total cost of £${currentCost}.`
                       : `The diagnosis was incorrect. The patient suffered due to delayed treatment of ${medicalCase?.trueDiagnosis}.`
                     }
                   </p>
                   <button 
                     onClick={initGame}
                     className="px-6 py-3 bg-[#005EB8] text-white font-bold rounded shadow hover:bg-[#003087] transition"
                   >
                     Next Patient
                   </button>
                 </div>
               )}
            </div>

            {/* Right: Log */}
            <div className="md:col-span-4 h-full overflow-hidden">
              <PatientLog logs={logs} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;