import React, { useState } from 'react';
import { AVAILABLE_TESTS } from '../constants';
import { TestOption } from '../types';

interface Props {
  onOrderTest: (test: TestOption) => void;
  isProcessing: boolean;
  isGameActive: boolean;
  onRevealHistory: (type: string) => void;
}

export const ActionPanel: React.FC<Props> = ({ onOrderTest, isProcessing, isGameActive, onRevealHistory }) => {
  const [activeCategory, setActiveCategory] = useState<string>('BEDSIDE');

  const categories = [
    { id: 'BEDSIDE', label: 'Bedside' },
    { id: 'LAB', label: 'Laboratory' },
    { id: 'IMAGING', label: 'Imaging' },
    { id: 'SPECIAL', label: 'Specialist' }
  ];

  const filteredTests = AVAILABLE_TESTS.filter(t => t.category === activeCategory);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-3 bg-gray-800 text-white text-sm font-bold uppercase tracking-wider flex justify-between">
        <span>Order Board</span>
        {isProcessing && <span className="animate-pulse text-yellow-400">Processing Request...</span>}
      </div>

      {/* History Actions */}
      <div className="p-4 bg-white border-b border-gray-200">
         <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Patient Interview</h4>
         <div className="grid grid-cols-2 gap-2">
            <button 
               onClick={() => onRevealHistory('PMH')}
               className="px-3 py-2 bg-white border border-[#005EB8] text-[#005EB8] rounded hover:bg-blue-50 text-sm font-semibold transition"
               disabled={!isGameActive || isProcessing}
            >
              Past Medical History
            </button>
            <button 
               onClick={() => onRevealHistory('DHx')}
               className="px-3 py-2 bg-white border border-[#005EB8] text-[#005EB8] rounded hover:bg-blue-50 text-sm font-semibold transition"
               disabled={!isGameActive || isProcessing}
            >
              Drug History
            </button>
            <button 
               onClick={() => onRevealHistory('SHx')}
               className="px-3 py-2 bg-white border border-[#005EB8] text-[#005EB8] rounded hover:bg-blue-50 text-sm font-semibold transition"
               disabled={!isGameActive || isProcessing}
            >
              Social History
            </button>
            <button 
               onClick={() => onRevealHistory('ALL')}
               className="px-3 py-2 bg-white border border-[#005EB8] text-[#005EB8] rounded hover:bg-blue-50 text-sm font-semibold transition"
               disabled={!isGameActive || isProcessing}
            >
              Allergies
            </button>
         </div>
      </div>

      {/* Test Categories Tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeCategory === cat.id 
                ? 'border-[#005EB8] text-[#005EB8] bg-blue-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Test List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-1 gap-2">
          {filteredTests.map(test => (
            <button
              key={test.id}
              onClick={() => onOrderTest(test)}
              disabled={!isGameActive || isProcessing}
              className="group flex items-center justify-between p-3 bg-white border border-gray-200 rounded shadow-sm hover:border-[#005EB8] hover:ring-1 hover:ring-[#005EB8] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-left"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 text-sm">{test.name}</span>
                <span className="text-xs text-gray-500">{test.category}</span>
              </div>
              <div className="text-right">
                <span className="block font-mono font-bold text-gray-700">£{test.cost}</span>
                <span className="text-[10px] text-[#005EB8] opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold">
                  Order &rarr;
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};