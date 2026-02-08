
import React, { useState, useMemo } from 'react';
import { DISCOVERY_CARDS, shuffleArray } from '../constants';
import { ArrowLeft, HelpCircle, Info } from 'lucide-react';
import { DiscoveryCard } from '../types';

interface Puzzle1Props {
  onSolve: (clue: string) => void;
  onBack: () => void;
}

export const Puzzle1: React.FC<Puzzle1Props> = ({ onSolve, onBack }) => {
  const [selectedCards, setSelectedCards] = useState<DiscoveryCard[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const randomizedPool = useMemo(() => shuffleArray(DISCOVERY_CARDS), []);
  const availableCards = randomizedPool.filter(c => !selectedCards.find(sc => sc.id === c.id));

  const handleSelect = (card: DiscoveryCard) => {
    if (selectedCards.length >= 6) return;
    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);
    
    if (newSelected.length === 6) {
      const isCorrect = newSelected.every((c, idx) => {
        if (idx === 0) return true;
        return c.year >= newSelected[idx - 1].year;
      });

      if (isCorrect) {
        setIsComplete(true);
        setFeedback('TIMELINE STABILIZED. CABINET UNLOCKED.');
      } else {
        setFeedback('HISTORICAL ANOMALY DETECTED. CHRONOLOGY IS INCORRECT.');
        setTimeout(() => {
          setSelectedCards([]);
          setFeedback('');
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen p-8 lab-gradient">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white">
          <ArrowLeft size={20} /> Back to Hub
        </button>
        <button 
          onClick={() => setShowHint(!showHint)}
          className={`p-2 rounded-full transition-all ${showHint ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-blue-400'}`}
        >
          <HelpCircle size={24} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-mono-lab text-blue-400 uppercase">The Locked Cabinet</h2>
          
          {showHint && (
            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded text-blue-200 text-sm font-mono-lab italic animate-in slide-in-from-top-2">
              <Info size={14} className="inline mr-2" />
              Hint: Start with Van Leeuwenhoek (1600s), then move to the germ theory boom (Pasteur/Koch in the 1800s), penicillin (1928), and finally the high-tech 1900s tools like Electron Microscopy and PCR.
            </div>
          )}

          <p className="text-slate-300 leading-relaxed">
            The lead researcher's cabinet is locked behind a chronometric seal. 
            Arrange the major microbiological discoveries in order from earliest to latest.
          </p>

          <div className="card-lab min-h-[400px] flex flex-col gap-4">
            <h3 className="text-sm font-mono-lab text-slate-500 mb-4 uppercase tracking-widest">Timeline Dropzone</h3>
            {selectedCards.length === 0 && (
              <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-700 rounded text-slate-600 italic text-center px-4">
                Select cards from the panel to reconstruct the historical sequence...
              </div>
            )}
            <div className="space-y-2">
              {selectedCards.map((card, idx) => (
                <div key={card.id} className="p-3 bg-slate-900 border-l-4 border-blue-500 animate-in slide-in-from-left-2 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-blue-400 font-mono-lab mr-4">EVENT_{idx + 1}</span>
                    <span className="text-white font-bold text-sm">{card.name}</span>
                  </div>
                  <span className="text-[10px] font-mono-lab text-slate-600">ID: {card.id}</span>
                </div>
              ))}
            </div>
            
            {feedback && (
              <div className={`mt-4 p-3 font-mono-lab text-sm text-center rounded animate-pulse ${isComplete ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                {feedback}
              </div>
            )}
            
            {isComplete && (
              <button 
                onClick={() => onSolve('MICROSCOPE-LENS-SYSTEM')}
                className="mt-4 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded font-bold uppercase transition-all shadow-lg"
              >
                Access Cabinet Files
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 overflow-y-auto max-h-[80vh] pr-4 scrollbar-hide">
          {availableCards.map(card => (
            <button
              key={card.id}
              onClick={() => handleSelect(card)}
              className="p-4 bg-slate-800 border border-slate-700 rounded-lg text-left hover:border-blue-400 transition-all group hover:bg-slate-700/50"
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{card.name}</h4>
              </div>
              <p className="text-xs text-slate-400 italic line-clamp-2 leading-relaxed">{card.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
