
import React from 'react';
import { Microscope, DoorClosed } from 'lucide-react';

interface IntroSceneProps {
  onStart: () => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 lab-gradient">
      <div className="max-w-2xl text-center card-lab animate-in fade-in zoom-in duration-1000">
        <div className="mb-8 flex justify-center gap-4">
          <Microscope size={64} className="text-yellow-500 animate-pulse" />
          <DoorClosed size={64} className="text-slate-500" />
        </div>
        <h1 className="text-4xl font-bold font-mono-lab mb-6 text-yellow-500 uppercase tracking-widest">
          The Microscopy Escape Room
        </h1>
        <div className="space-y-4 text-slate-300 mb-8 leading-relaxed">
          <p>It was supposed to be a quick midnight check-up on your samples.</p>
          <p>But as the clock struck 12, the magnetic lock on the laboratory door engaged. You're trapped in the Microbiology Wing.</p>
          <p>To override the security system, you must solve four experimental puzzles left by the lead scientist.</p>
          <p className="text-yellow-400 font-bold">The air is thin, the microbes are growing... Can you escape?</p>
        </div>
        <button 
          onClick={onStart}
          className="btn-lab px-12 py-4 text-xl hover:scale-105"
        >
          ENTER THE LAB
        </button>
      </div>
    </div>
  );
};
