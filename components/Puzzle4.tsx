
import React, { useState, useMemo } from 'react';
import { ArrowLeft, ShieldCheck, ShieldAlert, Zap, Terminal, HelpCircle, Info } from 'lucide-react';
import { shuffleArray } from '../constants';

interface Puzzle4Props {
  onSolve: (clue: string) => void;
  onBack: () => void;
  p1Clue: string;
  p2Clue: string;
  p3Clue: string;
}

interface Question {
  id: number;
  label: string;
  text: string;
  options: string[];
  correct: string;
  hint: string;
}

const MASTER_QUESTION_POOL: Omit<Question, 'id'>[] = [
  {
    label: "ALPHA: HISTORY VERIFICATION",
    text: "Based on the records you restored in the cabinet, who was the first to use a handcrafted lens to observe 'animalcules'?",
    options: ["Louis Pasteur", "Antonie van Leeuwenhoek", "Robert Koch", "Alexander Fleming"],
    correct: "Antonie van Leeuwenhoek",
    hint: "This Dutch merchant-scientist used simple lenses to view bacteria in lake water in 1676."
  },
  {
    label: "BETA: SPECTRAL VERIFICATION",
    text: "To resolve the hidden identification data in the Dark Room, which advanced imaging technique was required?",
    options: ["Bright-field", "Dark-field", "Fluoresce", "Phase-contrast"],
    correct: "Fluoresce",
    hint: "Think back to the filter that made specimens glow bright green against a dark background."
  },
  {
    label: "GAMMA: BIOLOGICAL VERIFICATION",
    text: "During your culture analysis, you identified specimens like 'Amoeba proteus' and 'Paramecium'. What category do they belong to?",
    options: ["Bacteria", "Algae", "Protozoa", "Virus"],
    correct: "Protozoa",
    hint: "These are complex single-celled eukaryotic organisms, often mobile and predatory."
  },
  {
    label: "DELTA: MICROSCOPY PHYSICS",
    text: "Which type of microscopy uses a beam of electrons rather than light to image specimens at extremely high resolution?",
    options: ["Confocal", "Dark-field", "Electron Microscopy", "Scanning Probe"],
    correct: "Electron Microscopy",
    hint: "Invented in 1931, it can visualize objects much smaller than the wavelength of light."
  },
  {
    label: "EPSILON: CELL WALL CHECK",
    text: "Which bacterial classification is characterized by a thick peptidoglycan layer that retains crystal violet stain?",
    options: ["Gram-negative", "Gram-positive", "Acid-fast", "Eukaryotic"],
    correct: "Gram-positive",
    hint: "Named after the scientist who developed the differential staining technique for bacterial cell walls."
  },
  {
    label: "ZETA: VIRAL MORPHOLOGY",
    text: "What is the name of the protein coat that surrounds the genetic material of a virus?",
    options: ["Cell membrane", "Capsid", "Envelope", "Nucleoid"],
    correct: "Capsid",
    hint: "It is often geometric in shape, protecting the viral DNA or RNA."
  },
  {
    label: "ETA: THE FIRST VACCINE",
    text: "Who is credited with creating the first successful vaccine, specifically for Smallpox?",
    options: ["Edward Jenner", "Jonas Salk", "Louis Pasteur", "Albert Sabin"],
    correct: "Edward Jenner",
    hint: "He used cowpox material to create immunity against smallpox in 1796."
  },
  {
    label: "THETA: THE GERM THEORY",
    text: "Who finally disproved spontaneous generation and established the Germ Theory of Disease?",
    options: ["Louis Pasteur", "Robert Hooke", "John Snow", "Lazzaro Spallanzani"],
    correct: "Louis Pasteur",
    hint: "His swan-neck flask experiment showed that life doesn't appear from nowhere."
  }
];

export const Puzzle4: React.FC<Puzzle4Props> = ({ onSolve, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answeredSteps, setAnsweredSteps] = useState<number[]>([]);
  const [failed, setFailed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const quiz: Question[] = useMemo(() => {
    const selected = shuffleArray(MASTER_QUESTION_POOL).slice(0, 3);
    return selected.map((q, idx) => ({
      ...q,
      id: idx,
      options: shuffleArray(q.options)
    }));
  }, []);

  const handleAnswer = (choice: string) => {
    if (choice === quiz[currentStep].correct) {
      const nextSteps = [...answeredSteps, currentStep];
      setAnsweredSteps(nextSteps);
      setShowHint(false);
      if (currentStep < quiz.length - 1) setCurrentStep(currentStep + 1);
    } else {
      setFailed(true);
      setShowHint(false);
      setTimeout(() => {
        setFailed(false);
        setCurrentStep(0);
        setAnsweredSteps([]);
      }, 1500);
    }
  };

  const isFullyVerified = answeredSteps.length === quiz.length;

  return (
    <div className="min-h-screen p-8 lab-gradient flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center mb-12">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-mono-lab uppercase text-xs">
          <ArrowLeft size={16} /> Return to Hub
        </button>
        <div className="flex gap-4">
          {quiz.map((q) => (
            <div 
              key={q.id}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                answeredSteps.includes(q.id) ? 'bg-green-500 border-green-400' : 'bg-slate-900 border-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-3xl w-full">
        {!isFullyVerified ? (
          <div className={`card-lab border-2 transition-all relative ${failed ? 'border-red-500' : 'border-slate-700'}`}>
            <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
              <div className="flex items-center gap-3">
                <Terminal size={20} className="text-yellow-500" />
                <h2 className="text-sm font-mono-lab text-yellow-500 uppercase">{quiz[currentStep].label}</h2>
              </div>
              <button onClick={() => setShowHint(!showHint)} className={`p-2 rounded-full ${showHint ? 'bg-yellow-500 text-slate-900' : 'text-slate-500 hover:text-yellow-500'}`}>
                <HelpCircle size={20} />
              </button>
            </div>

            <div className="space-y-8">
              <div className="min-h-[100px]">
                {showHint ? (
                   <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded text-yellow-200 text-sm font-mono-lab italic animate-in fade-in">
                     <Info size={14} className="inline mr-2" />
                     {quiz[currentStep].hint}
                   </div>
                ) : (
                  <p className="text-xl font-bold text-slate-100 leading-relaxed">
                    {failed ? "AUTHENTICATION FAILED. REBOOTING..." : quiz[currentStep].text}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quiz[currentStep].options.map((opt) => (
                  <button key={opt} disabled={failed} onClick={() => handleAnswer(opt)} className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-left hover:border-yellow-500 hover:bg-slate-800 transition-all text-slate-300">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="card-lab border-green-500 bg-green-950/20 p-12 text-center animate-in zoom-in">
             <ShieldCheck size={80} className="text-green-500 mx-auto mb-6" />
             <h2 className="text-3xl font-bold text-white font-mono-lab uppercase mb-4">Identity Verified</h2>
             <button onClick={() => onSolve('ESCAPE-COMPLETE')} className="px-12 py-5 bg-green-600 hover:bg-green-500 text-white font-bold text-2xl uppercase rounded-lg shadow-lg transition-all">
               Escape Now <Zap className="inline-block ml-3" size={24} />
             </button>
          </div>
        )}
      </div>
    </div>
  );
};
