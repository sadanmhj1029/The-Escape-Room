
import React from 'react';
import { History, Moon, FlaskConical, DoorOpen } from 'lucide-react';
import { GameState } from '../types';

interface LobbyProps {
  onSelectPuzzle: (puzzle: GameState) => void;
  solved: string[];
}

export const Lobby: React.FC<LobbyProps> = ({ onSelectPuzzle, solved }) => {
  const puzzles = [
    { id: 'PUZZLE1', name: 'The Locked Cabinet', icon: <History />, color: 'text-blue-400', desc: 'History of Microscopy' },
    { id: 'PUZZLE2', name: 'The Dark Room', icon: <Moon />, color: 'text-purple-400', desc: 'Imaging Techniques' },
    { id: 'PUZZLE3', name: 'The Culture Lab', icon: <FlaskConical />, color: 'text-green-400', desc: 'Classification' },
    { id: 'PUZZLE4', name: 'The Final Door', icon: <DoorOpen />, color: 'text-yellow-400', desc: 'Cell Structure' },
  ];

  return (
    <div className="min-h-screen p-8 lab-gradient flex flex-col items-center">
      <h2 className="text-3xl font-mono-lab text-slate-100 mb-12 border-b-2 border-slate-600 pb-2">
        LABORATORY HUB
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {puzzles.map((p) => {
          const isSolved = solved.includes(p.id);
          const isLocked = p.id === 'PUZZLE4' && solved.length < 3;

          return (
            <button
              key={p.id}
              disabled={isLocked}
              onClick={() => onSelectPuzzle(p.id as GameState)}
              className={`group card-lab flex items-center gap-6 text-left transition-all ${
                isLocked ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:border-yellow-500 hover:scale-105'
              }`}
            >
              <div className={`p-4 rounded-full bg-slate-900 ${p.color} ${isSolved ? 'ring-4 ring-green-500' : ''}`}>
                {p.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                <p className="text-sm text-slate-400 italic">{p.desc}</p>
                {isSolved && <span className="text-xs text-green-500 font-bold uppercase mt-2 block">Solved</span>}
                {isLocked && <span className="text-xs text-red-400 font-bold uppercase mt-2 block">Requires 3 Clues</span>}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-16 text-slate-500 italic text-sm text-center">
        Solve all stations to unlock the final security door.
      </div>
    </div>
  );
};
