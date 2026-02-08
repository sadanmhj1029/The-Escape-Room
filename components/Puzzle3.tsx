
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, AlertCircle, Microscope, HelpCircle, Info } from 'lucide-react';
import { MICROBE_POOL, shuffleArray } from '../constants';

interface Puzzle3Props {
  onSolve: (clue: string) => void;
  onBack: () => void;
}

const CATEGORIES = ['Bacteria', 'Fungi', 'Algae', 'Protozoa', 'Virus'];

export const Puzzle3: React.FC<Puzzle3Props> = ({ onSolve, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [activeMicrobe, setActiveMicrobe] = useState<typeof MICROBE_POOL[0] | null>(null);
  const [showHint, setShowHint] = useState(false);

  const currentMicrobes = useMemo(() => {
    return shuffleArray(MICROBE_POOL).slice(0, 5);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAssign = (category: string) => {
    if (!activeMicrobe) return;
    setAssignments(prev => ({ ...prev, [activeMicrobe.id]: category }));
    setActiveMicrobe(null);
  };

  const isComplete = currentMicrobes.every(m => assignments[m.id] === m.type);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen p-8 lab-gradient">
      <div className="flex justify-between items-center mb-12">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Hub
        </button>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowHint(!showHint)}
            className={`p-2 rounded-full transition-all ${showHint ? 'bg-green-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-green-400'}`}
          >
            <HelpCircle size={24} />
          </button>
          <div className={`flex items-center gap-3 px-6 py-2 rounded-full border-2 font-mono-lab shadow-lg transition-colors ${timeLeft < 30 ? 'bg-red-900 border-red-500 text-red-200 animate-pulse' : 'bg-slate-900 border-slate-700 text-slate-300'}`}>
            <span className="text-xl font-bold">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-mono-lab text-green-400 uppercase tracking-widest">Culture Classification</h2>
          {showHint && (
            <div className="mt-4 bg-green-900/20 border border-green-500/30 p-4 rounded text-green-200 text-sm font-mono-lab italic animate-in slide-in-from-top-2 text-left max-w-xl mx-auto">
              <Info size={14} className="inline mr-2" />
              Hint: Bacteria are often rod-shaped or circular without nuclei. Protozoa are complex moving single cells. Algae are green/photosynthetic. Fungi have branches (hyphae) or budding yeast forms.
            </div>
          )}
          <p className="text-slate-400 mt-2 italic">Specimens are unstable. Identify the following 5 random cultures to secure the area.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="grid grid-cols-2 gap-6 h-fit">
            {currentMicrobes.map((m, idx) => {
              const assignedTo = assignments[m.id];
              const isCorrect = assignedTo === m.type;
              
              return (
                <button
                  key={m.id}
                  disabled={!!assignedTo}
                  onClick={() => setActiveMicrobe(m)}
                  className={`group relative p-6 rounded-lg aspect-square flex flex-col items-center justify-center transition-all duration-300 ${
                    assignedTo 
                      ? isCorrect 
                        ? 'bg-green-900/40 border-green-500 border-2 shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                        : 'bg-red-900/40 border-red-500 border-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                      : 'bg-slate-800/50 border border-slate-700 hover:border-green-400 hover:bg-slate-800'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full border-4 mb-4 transition-all duration-500 flex items-center justify-center overflow-hidden bg-black/40 ${isCorrect ? 'border-green-500' : assignedTo ? 'border-red-500' : 'border-slate-700 group-hover:border-green-500/50'}`}>
                    <Microscope size={24} className={isCorrect ? 'text-green-500' : 'text-slate-600'} />
                  </div>
                  <span className="text-[10px] font-mono-lab text-slate-300 uppercase text-center tracking-tighter">
                    {assignedTo ? m.name : `Culture Sample #${idx + 1}`}
                  </span>
                  
                  {assignedTo && !isCorrect && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setAssignments(prev => {
                          const next = { ...prev };
                          delete next[m.id];
                          return next;
                        });
                      }}
                      className="absolute top-2 right-2 text-red-400 hover:text-red-200 p-1 bg-black/50 rounded-full"
                    >
                      <AlertCircle size={16} />
                    </button>
                  )}
                </button>
              );
            })}
          </div>

          <div className="space-y-6">
            <div className="card-lab p-8 flex flex-col items-center justify-center min-h-[350px] bg-slate-900/50 border-2 border-slate-700">
              {activeMicrobe ? (
                <div className="w-full space-y-6 text-center animate-in slide-in-from-right-4">
                  <div className="text-green-400 font-mono-lab text-[10px] uppercase mb-2 tracking-[0.3em]">Genetic Scan in Progress</div>
                  <h4 className="text-2xl font-bold text-white font-mono-lab">{activeMicrobe.name}</h4>
                  <div className="p-4 bg-black/40 rounded-lg border border-slate-800 text-sm italic text-slate-300">
                    "Observed characteristics: {activeMicrobe.trait}"
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-8">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleAssign(cat)}
                        className="btn-lab text-xs py-3 border-slate-700 hover:border-green-500 hover:text-green-400 transition-all active:scale-95"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveMicrobe(null)}
                    className="text-[10px] text-slate-500 hover:text-white font-mono-lab uppercase"
                  >
                    Cancel Analysis
                  </button>
                </div>
              ) : (
                <div className="text-slate-600 text-center font-mono-lab italic max-w-xs">
                  <Microscope size={48} className="mx-auto mb-6 opacity-10" />
                  Select an active petri dish to begin classification. All samples must be identified to override the lock.
                </div>
              )}
            </div>
          </div>
        </div>

        {isComplete && (
          <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="p-8 bg-green-900/30 border-2 border-green-500 rounded-lg text-green-200 text-center shadow-2xl backdrop-blur-md">
                <p className="font-mono-lab text-2xl font-bold uppercase mb-2 tracking-widest">Classification Success</p>
                <p className="text-sm italic opacity-80">Encryption token generated: ASCII 01000101 ('E')</p>
             </div>
             <button 
               onClick={() => onSolve('69')}
               className="btn-lab px-16 py-4 bg-green-600 text-white font-bold text-xl hover:bg-green-500 shadow-lg shadow-green-500/20 animate-bounce"
             >
               Confirm Clearance
             </button>
          </div>
        )}
      </div>
    </div>
  );
};
