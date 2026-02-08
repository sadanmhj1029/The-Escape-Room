
import React, { useState, useEffect } from 'react';
import { GameState, Clues, PlayerStats } from './types';
import { IntroScene } from './components/IntroScene';
import { Lobby } from './components/Lobby';
import { Puzzle1 } from './components/Puzzle1';
import { Puzzle2 } from './components/Puzzle2';
import { Puzzle3 } from './components/Puzzle3';
import { Puzzle4 } from './components/Puzzle4';
import { ResultsPage } from './components/ResultsPage';
import { LabAssistant } from './components/LabAssistant';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('INTRO');
  const [clues, setClues] = useState<Clues>({ p1Code: '', p2Clue: '', p3Binary: '' });
  const [stats, setStats] = useState<PlayerStats>({
    startTime: Date.now(),
    hintsUsed: 0,
    puzzlesSolved: [],
  });

  const handlePuzzleSolve = (clueKey: keyof Clues, value: string, puzzleId: string) => {
    setClues(prev => ({ ...prev, [clueKey]: value }));
    setStats(prev => ({
      ...prev,
      puzzlesSolved: prev.puzzlesSolved.includes(puzzleId) 
        ? prev.puzzlesSolved 
        : [...prev.puzzlesSolved, puzzleId]
    }));
    setGameState('LOBBY');
  };

  const currentPuzzleStatus = () => {
    switch (gameState) {
      case 'PUZZLE1': return `Working on history timeline. Solved ${stats.puzzlesSolved.length} puzzles.`;
      case 'PUZZLE2': return `In the darkroom. Sliders being adjusted. Solved ${stats.puzzlesSolved.length} puzzles.`;
      case 'PUZZLE3': return `Classifying microbes in culture lab. Solved ${stats.puzzlesSolved.length} puzzles.`;
      case 'PUZZLE4': return `At the final security door. Scanning cells. Solved ${stats.puzzlesSolved.length} puzzles.`;
      default: return `In the lobby hub. Solved ${stats.puzzlesSolved.length} puzzles.`;
    }
  };

  const renderScene = () => {
    switch (gameState) {
      case 'INTRO':
        return <IntroScene onStart={() => {
          setStats(prev => ({ ...prev, startTime: Date.now() }));
          setGameState('LOBBY');
        }} />;
      
      case 'LOBBY':
        return (
          <Lobby 
            onSelectPuzzle={(p) => setGameState(p)} 
            solved={stats.puzzlesSolved} 
          />
        );
      
      case 'PUZZLE1':
        return (
          <Puzzle1 
            onSolve={(clue) => handlePuzzleSolve('p1Code', clue, 'PUZZLE1')} 
            onBack={() => setGameState('LOBBY')} 
          />
        );
      
      case 'PUZZLE2':
        return (
          <Puzzle2 
            onSolve={(clue) => handlePuzzleSolve('p2Clue', clue, 'PUZZLE2')} 
            onBack={() => setGameState('LOBBY')} 
          />
        );
      
      case 'PUZZLE3':
        return (
          <Puzzle3 
            onSolve={(clue) => handlePuzzleSolve('p3Binary', clue, 'PUZZLE3')} 
            onBack={() => setGameState('LOBBY')} 
          />
        );
      
      case 'PUZZLE4':
        return (
          <Puzzle4 
            p1Clue={clues.p1Code}
            p2Clue={clues.p2Clue}
            p3Clue={clues.p3Binary}
            onSolve={() => setGameState('RESULTS')} 
            onBack={() => setGameState('LOBBY')} 
          />
        );
      
      case 'RESULTS':
        return (
          <ResultsPage 
            time={stats.startTime} 
            hints={stats.hintsUsed} 
            onRestart={() => window.location.reload()} 
          />
        );
      
      default:
        return <div>Invalid State</div>;
    }
  };

  return (
    <div className="font-sans text-slate-100 bg-slate-900 min-h-screen">
      {renderScene()}
      
      {gameState !== 'INTRO' && gameState !== 'RESULTS' && (
        <LabAssistant 
          puzzleId={gameState} 
          currentStatus={currentPuzzleStatus()} 
          onHintUsed={() => setStats(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }))}
        />
      )}
    </div>
  );
};

export default App;
