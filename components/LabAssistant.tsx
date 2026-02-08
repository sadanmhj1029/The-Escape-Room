
import React, { useState } from 'react';
import { Bot, Sparkles, Loader2 } from 'lucide-react';
import { getLabAssistantHint } from '../services/geminiService';

interface LabAssistantProps {
  puzzleId: string;
  currentStatus: string;
  onHintUsed: () => void;
}

export const LabAssistant: React.FC<LabAssistantProps> = ({ puzzleId, currentStatus, onHintUsed }) => {
  const [hint, setHint] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetHint = async () => {
    setLoading(true);
    const result = await getLabAssistantHint(puzzleId, currentStatus);
    setHint(result);
    setLoading(false);
    onHintUsed();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex flex-col items-end gap-2">
        {hint && (
          <div className="bg-slate-900 border-2 border-yellow-500 p-4 rounded-lg max-w-xs shadow-2xl animate-in fade-in slide-in-from-bottom-2">
            <p className="text-sm font-mono-lab text-yellow-500 mb-1 flex items-center gap-1">
              <Sparkles size={14} /> TRANSMISSION:
            </p>
            <p className="text-xs text-slate-200 leading-relaxed italic">"{hint}"</p>
            <button 
              onClick={() => setHint(null)}
              className="mt-2 text-[10px] text-slate-400 hover:text-white underline"
            >
              Dismiss
            </button>
          </div>
        )}
        <button
          onClick={handleGetHint}
          disabled={loading}
          className="w-14 h-14 bg-yellow-500 text-slate-900 rounded-full shadow-lg hover:bg-yellow-400 flex items-center justify-center transition-all group active:scale-95 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Bot className="group-hover:scale-110 transition-transform" />}
        </button>
      </div>
    </div>
  );
};
