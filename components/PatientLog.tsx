import React, { useRef, useEffect } from 'react';
import { LogEntry, LogType } from '../types';

interface Props {
  logs: LogEntry[];
}

export const PatientLog: React.FC<Props> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getTypeStyle = (type: LogType) => {
    switch(type) {
      case LogType.HISTORY: return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case LogType.LAB: return 'bg-red-50 border-red-200 text-red-900';
      case LogType.IMAGING: return 'bg-purple-50 border-purple-200 text-purple-900';
      case LogType.INTERVENTION: return 'bg-green-50 border-green-200 text-green-900';
      case LogType.SYSTEM: return 'bg-gray-100 border-gray-200 text-gray-600 italic';
      case LogType.DIAGNOSIS: return 'bg-blue-50 border-blue-200 text-blue-900';
      default: return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
       <div className="p-3 bg-[#425563] text-white text-sm font-bold uppercase tracking-wider">
        Case Timeline
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {logs.map((log) => (
          <div key={log.id} className={`p-3 rounded border shadow-sm text-sm ${getTypeStyle(log.type)}`}>
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold uppercase text-xs tracking-wide opacity-75">{log.type}</span>
              <span className="text-xs opacity-50">{log.timestamp}</span>
            </div>
            <div className="font-bold mb-1">{log.title}</div>
            <div className="whitespace-pre-wrap leading-relaxed">{log.content}</div>
            {log.cost > 0 && (
              <div className="mt-2 text-right text-xs font-mono font-bold opacity-60">
                Cost: £{log.cost}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};