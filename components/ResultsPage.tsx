
import React from 'react';
import { Trophy, Clock, HelpCircle, RefreshCcw, Share2 } from 'lucide-react';

interface ResultsPageProps {
  time: number;
  hints: number;
  onRestart: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ time, hints, onRestart }) => {
  const duration = Math.floor((Date.now() - time) / 1000);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  const getRank = () => {
    if (duration < 600) return { title: 'Lead Researcher', color: 'text-yellow-500' };
    if (duration < 1200) return { title: 'Senior Pathologist', color: 'text-blue-400' };
    return { title: 'Lab Assistant', color: 'text-slate-400' };
  };

  const rank = getRank();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900 lab-gradient">
      <div className="max-w-xl w-full card-lab text-center space-y-8 animate-in zoom-in duration-700">
        <div className="relative">
          <Trophy size={80} className={`mx-auto ${rank.color} animate-bounce`} />
          <div className="absolute inset-0 blur-2xl bg-yellow-500/10 -z-10 rounded-full" />
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl font-bold font-mono-lab uppercase text-white tracking-widest">Lab Overridden!</h2>
          <p className="text-slate-400">You have successfully escaped the Microbiology Wing.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/30 p-4 rounded-lg border border-slate-800">
            <Clock className="mx-auto mb-2 text-slate-500" size={24} />
            <div className="text-2xl font-bold font-mono-lab text-white">{minutes}m {seconds}s</div>
            <div className="text-[10px] text-slate-500 uppercase mt-1">Total Time</div>
          </div>
          <div className="bg-black/30 p-4 rounded-lg border border-slate-800">
            <HelpCircle className="mx-auto mb-2 text-slate-500" size={24} />
            <div className="text-2xl font-bold font-mono-lab text-white">{hints}</div>
            <div className="text-[10px] text-slate-500 uppercase mt-1">Hints Used</div>
          </div>
        </div>

        <div className="p-6 bg-slate-800/50 rounded-lg border-2 border-slate-700">
          <div className="text-xs uppercase text-slate-500 mb-1 font-mono-lab">Certification Status</div>
          <div className={`text-2xl font-bold uppercase ${rank.color}`}>{rank.title}</div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onRestart}
            className="flex-1 btn-lab bg-slate-700 flex items-center justify-center gap-2"
          >
            <RefreshCcw size={18} /> Restart Lab
          </button>
          <button 
            className="flex-1 btn-lab bg-blue-600 border-blue-500 text-white flex items-center justify-center gap-2"
            onClick={() => alert('Certificate Generated: ' + rank.title)}
          >
            <Share2 size={18} /> Share Results
          </button>
        </div>

        <div className="text-[10px] text-slate-600 font-mono-lab uppercase">
          Microscopy Escape Room v1.0 • Educational Module 2024
        </div>
      </div>
    </div>
  );
};
