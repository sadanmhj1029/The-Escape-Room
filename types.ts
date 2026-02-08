
export type GameState = 
  | 'INTRO' 
  | 'LOBBY' 
  | 'PUZZLE1' 
  | 'PUZZLE2' 
  | 'PUZZLE3' 
  | 'PUZZLE4' 
  | 'ESCAPE' 
  | 'RESULTS';

export interface DiscoveryCard {
  id: string;
  name: string;
  year: number;
  description: string;
}

export interface Clues {
  p1Code: string; // The order of microscope parts
  p2Clue: string; // 32RME
  p3Binary: string; // 01000101 -> 69
}

export interface PlayerStats {
  startTime: number;
  hintsUsed: number;
  puzzlesSolved: string[];
}
