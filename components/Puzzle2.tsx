
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Zap, Microscope, Info, HelpCircle, Activity } from 'lucide-react';

interface Specimen {
  id: string;
  category: string;
  name: string;
  color: string;
  shape: string;
  description: string;
  requiredFilter: 'bright-field' | 'dark-field' | 'fluoresce' | 'phase-contrast';
}

const SPECIMEN_TYPES: Specimen[] = [
  { id: 'diatom', category: 'Algae', name: 'Diatom Shell', color: 'bg-cyan-500/40', shape: 'rounded-full border-4 border-double border-cyan-300/30', description: 'Geometric silica structure.', requiredFilter: 'bright-field' },
  { id: 'bacillus', category: 'Bacteria', name: 'Bacillus anthracis', color: 'bg-green-500/40', shape: 'rounded-lg w-32 h-8', description: 'Rod-shaped bacterial chain.', requiredFilter: 'phase-contrast' },
  { id: 'neuron', category: 'Eukaryote', name: 'Purkinje Cell', color: 'bg-purple-500/40', shape: 'rounded-full w-16 h-16 shadow-[0_0_20px_purple]', description: 'Complex branching neuron.', requiredFilter: 'fluoresce' },
  { id: 'radiolarian', category: 'Protozoa', name: 'Radiolarian', color: 'bg-blue-500/40', shape: 'rotate-45 w-24 h-24 border-2 border-dashed border-blue-400/50', description: 'Intricate mineral skeleton.', requiredFilter: 'dark-field' },
  { id: 'staph', category: 'Bacteria', name: 'Staphylococcus', color: 'bg-yellow-500/30', shape: 'rounded-full w-12 h-12 border-4 border-yellow-600/20', description: 'Grape-like clusters.', requiredFilter: 'bright-field' },
  { id: 'ebola', category: 'Virus', name: 'Ebola Virus', color: 'bg-red-500/40', shape: 'w-48 h-2 rounded-full rotate-12', description: 'Filamentous shape.', requiredFilter: 'fluoresce' },
  { id: 'volvox', category: 'Algae', name: 'Volvox Colony', color: 'bg-emerald-500/40', shape: 'rounded-full w-40 h-40 border-8 border-dotted border-emerald-300/20', description: 'Spherical colony.', requiredFilter: 'bright-field' },
  { id: 'amoeba', category: 'Protozoa', name: 'Amoeba proteus', color: 'bg-slate-400/30', shape: 'w-32 h-32 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] border-4 border-slate-500/20', description: 'Moves using pseudopods.', requiredFilter: 'dark-field' },
  { id: 'yeast', category: 'Fungi', name: 'Saccharomyces', color: 'bg-orange-400/30', shape: 'w-16 h-20 rounded-full border-2 border-orange-200/20', description: 'Budding yeast cells.', requiredFilter: 'phase-contrast' },
  { id: 't4phage', category: 'Virus', name: 'T4 Bacteriophage', color: 'bg-blue-600/40', shape: 'w-12 h-24 rounded-t-lg border-x-2 border-blue-300/30', description: 'Microscopic virus.', requiredFilter: 'fluoresce' },
  { id: 'spirogyra', category: 'Algae', name: 'Spirogyra', color: 'bg-green-600/40', shape: 'w-64 h-8 rounded-full border-2 border-green-200/20', description: 'Filamentous algae.', requiredFilter: 'phase-contrast' },
  { id: 'paramecium', category: 'Protozoa', name: 'Paramecium', color: 'bg-pink-400/30', shape: 'w-40 h-16 rounded-full border-2 border-pink-200/20', description: 'Ciliated protozoan.', requiredFilter: 'dark-field' },
  { id: 'strep', category: 'Bacteria', name: 'Streptococcus', color: 'bg-indigo-400/30', shape: 'w-48 h-4 rounded-full border-2 border-indigo-200/20', description: 'Chains of bacteria.', requiredFilter: 'bright-field' },
  { id: 'aspergillus', category: 'Fungi', name: 'Aspergillus', color: 'bg-stone-500/40', shape: 'w-24 h-24 rounded-full border-4 border-dashed border-stone-200/20', description: 'Common mold.', requiredFilter: 'dark-field' },
  { id: 'hiv', category: 'Virus', name: 'HIV', color: 'bg-red-600/40', shape: 'w-16 h-16 rounded-full border-4 border-red-200/40', description: 'Spherical virus.', requiredFilter: 'fluoresce' },
  { id: 'plasmodium', category: 'Protozoa', name: 'Plasmodium', color: 'bg-amber-400/30', shape: 'w-8 h-8 rounded-full border-2 border-amber-200/20', description: 'Malaria parasite.', requiredFilter: 'phase-contrast' },
  { id: 'trypanosoma', category: 'Protozoa', name: 'Trypanosoma', color: 'bg-violet-500/40', shape: 'w-32 h-4 rounded-full rotate-45 border-2 border-violet-200/20', description: 'Blood parasite.', requiredFilter: 'fluoresce' },
  { id: 'vorticella', category: 'Protozoa', name: 'Vorticella', color: 'bg-sky-400/30', shape: 'w-16 h-32 rounded-t-full border-2 border-sky-200/20', description: 'Bell-shaped ciliate.', requiredFilter: 'phase-contrast' },
  { id: 'clostridium', category: 'Bacteria', name: 'Clostridium', color: 'bg-rose-400/30', shape: 'w-24 h-6 rounded-full border-2 border-rose-200/20', description: 'Anaerobic bacteria.', requiredFilter: 'phase-contrast' },
  { id: 'vibrio', category: 'Bacteria', name: 'Vibrio cholerae', color: 'bg-teal-400/30', shape: 'w-16 h-4 rounded-full rotate-45 border-2 border-teal-200/20', description: 'Comma-shaped bacteria.', requiredFilter: 'dark-field' },
  { id: 'salmonella', category: 'Bacteria', name: 'Salmonella', color: 'bg-lime-500/30', shape: 'w-20 h-8 rounded-full border-2 border-lime-200/20', description: 'Enteric bacteria.', requiredFilter: 'bright-field' },
  { id: 'borrelia', category: 'Bacteria', name: 'Borrelia', color: 'bg-gray-400/40', shape: 'w-48 h-1 rounded-full border-2 border-gray-200/20', description: 'Spirochete bacteria.', requiredFilter: 'dark-field' },
  { id: 'mycoplasma', category: 'Bacteria', name: 'Mycoplasma', color: 'bg-cyan-600/40', shape: 'w-10 h-10 rounded-full border-2 border-cyan-200/20', description: 'Lacks cell wall.', requiredFilter: 'fluoresce' },
  { id: 'giardia', category: 'Protozoa', name: 'Giardia', color: 'bg-emerald-400/30', shape: 'w-24 h-32 rounded-full border-2 border-emerald-200/20', description: 'Pear-shaped parasite.', requiredFilter: 'phase-contrast' },
  { id: 'chlorella', category: 'Algae', name: 'Chlorella', color: 'bg-green-700/40', shape: 'w-12 h-12 rounded-full border-2 border-green-300/20', description: 'Unicellular algae.', requiredFilter: 'bright-field' },
  { id: 'legionella', category: 'Bacteria', name: 'Legionella', color: 'bg-orange-600/40', shape: 'w-16 h-4 rounded-full border-2 border-orange-200/20', description: 'Respiratory pathogen.', requiredFilter: 'fluoresce' },
  { id: 'listeria', category: 'Bacteria', name: 'Listeria', color: 'bg-blue-400/30', shape: 'w-12 h-6 rounded-full border-2 border-blue-200/20', description: 'Foodborne bacteria.', requiredFilter: 'phase-contrast' },
  { id: 'rhizopus', category: 'Fungi', name: 'Rhizopus', color: 'bg-zinc-600/40', shape: 'w-32 h-32 rounded-full border-4 border-zinc-400/20', description: 'Black bread mold.', requiredFilter: 'bright-field' },
  { id: 'candida', category: 'Fungi', name: 'Candida albicans', color: 'bg-white/40', shape: 'w-14 h-14 rounded-full border-2 border-white/20', description: 'Opportunistic yeast.', requiredFilter: 'fluoresce' },
  { id: 'actinomyces', category: 'Bacteria', name: 'Actinomyces', color: 'bg-amber-600/40', shape: 'w-40 h-40 border-8 border-dotted border-amber-400/20', description: 'Filamentous bacteria.', requiredFilter: 'dark-field' },
  { id: 'caulobacter', category: 'Bacteria', name: 'Caulobacter', color: 'bg-purple-400/30', shape: 'w-20 h-4 rounded-full border-2 border-purple-200/20', description: 'Stalked cell.', requiredFilter: 'phase-contrast' },
  { id: 'deinococcus', category: 'Bacteria', name: 'Deinococcus', color: 'bg-fuchsia-600/40', shape: 'w-20 h-20 rounded-lg border-2 border-fuchsia-200/20', description: 'Radiation survivor.', requiredFilter: 'fluoresce' },
  { id: 'halobacterium', category: 'Archaea', name: 'Halobacterium', color: 'bg-red-700/40', shape: 'w-24 h-12 rounded-full border-2 border-red-300/20', description: 'Extremophile.', requiredFilter: 'phase-contrast' },
  { id: 'spirillum', category: 'Bacteria', name: 'Spirillum volutans', color: 'bg-slate-300/40', shape: 'w-48 h-4 border-b-4 border-slate-100/20 rotate-12', description: 'Spiral bacteria.', requiredFilter: 'dark-field' },
  { id: 'euglena', category: 'Protozoa', name: 'Euglena', color: 'bg-green-400/40', shape: 'w-32 h-10 rounded-full border-2 border-green-100/20', description: 'Flagellated protist.', requiredFilter: 'bright-field' },
  { id: 'micrococcus', category: 'Bacteria', name: 'Micrococcus luteus', color: 'bg-yellow-400/40', shape: 'w-10 h-10 rounded-full border-2 border-yellow-200/20', description: 'Yellow bacteria.', requiredFilter: 'bright-field' },
  { id: 'penicillium', category: 'Fungi', name: 'Penicillium', color: 'bg-teal-600/30', shape: 'w-24 h-24 rounded-full border-4 border-dashed border-teal-200/20', description: 'Antibiotic producer.', requiredFilter: 'dark-field' },
  { id: 'chlamydomonas', category: 'Algae', name: 'Chlamydomonas', color: 'bg-green-500/40', shape: 'w-14 h-18 rounded-full border-2 border-green-300/20', description: 'Green algae.', requiredFilter: 'bright-field' },
  { id: 'adenovirus', category: 'Virus', name: 'Adenovirus', color: 'bg-blue-400/40', shape: 'w-14 h-14 rounded-full border-2 border-blue-200/20', description: 'Non-enveloped virus.', requiredFilter: 'fluoresce' },
  { id: 'stentor', category: 'Protozoa', name: 'Stentor', color: 'bg-blue-700/30', shape: 'w-32 h-40 rounded-t-full border-2 border-blue-300/20', description: 'Trumpet-shaped ciliate.', requiredFilter: 'dark-field' },
  { id: 'volvox_minor', category: 'Algae', name: 'Volvox Minor', color: 'bg-emerald-600/30', shape: 'w-32 h-32 rounded-full border-2 border-dotted border-emerald-400/20', description: 'Colonial algae.', requiredFilter: 'phase-contrast' }
];

const CATEGORIES = ['Bacteria', 'Algae', 'Eukaryote', 'Protozoa', 'Virus', 'Fungi', 'Archaea'];

export const Puzzle2: React.FC<{ onSolve: (clue: string) => void; onBack: () => void; }> = ({ onSolve, onBack }) => {
  const [stain, setStain] = useState(0);
  const [focus, setFocus] = useState(0);
  const [filter, setFilter] = useState('none');
  const [condenser, setCondenser] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const targets = useMemo(() => {
    const specimen = SPECIMEN_TYPES[Math.floor(Math.random() * SPECIMEN_TYPES.length)];
    return {
      stain: 70 + Math.floor(Math.random() * 20),
      focus: 40 + Math.floor(Math.random() * 20),
      condenser: 80 + Math.floor(Math.random() * 20),
      code: Math.random().toString(36).substring(2, 7).toUpperCase(),
      specimen
    };
  }, []);

  const isOpticallyAligned = 
    Math.abs(stain - targets.stain) < 8 && 
    Math.abs(focus - targets.focus) < 8 && 
    filter === targets.specimen.requiredFilter && 
    condenser >= targets.condenser;

  const isFullySolved = isOpticallyAligned && selectedCategory === targets.specimen.category;

  const blurAmount = Math.abs(targets.focus - focus) / 1.5;
  const contrastAmount = stain;
  const opacityAmount = condenser / 100;

  return (
    <div className="min-h-screen p-8 bg-black text-slate-300">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Hub
        </button>
        <button 
          onClick={() => setShowHint(!showHint)}
          className={`p-2 rounded-full transition-all ${showHint ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-slate-900 text-slate-400 hover:text-purple-400'}`}
        >
          <HelpCircle size={24} />
        </button>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-mono-lab text-purple-400 uppercase tracking-tighter">The Dark Room</h2>
          {showHint && (
            <div className="mt-4 bg-purple-900/20 border border-purple-500/30 p-4 rounded text-purple-200 text-sm font-mono-lab italic animate-in slide-in-from-top-2 text-left max-w-xl mx-auto">
              <Info size={14} className="inline mr-2" />
              Hint: This specimen requires the <span className="font-bold text-white uppercase">{targets.specimen.requiredFilter}</span> filter. Adjust focus and contrast carefully.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video bg-slate-950 border-4 border-slate-900 rounded-lg flex items-center justify-center overflow-hidden shadow-inner">
              <div 
                className="w-full h-full flex flex-col items-center justify-center transition-all duration-300 relative z-10"
                style={{
                  filter: `blur(${blurAmount}px) contrast(${contrastAmount}%)`,
                  opacity: filter === 'none' ? 0.1 : opacityAmount,
                }}
              >
                <div className="relative w-64 h-64 flex items-center justify-center">
                   <div className={`absolute transition-all duration-700 ${targets.specimen.shape} 
                    ${filter === targets.specimen.requiredFilter ? 
                      (filter === 'fluoresce' ? targets.specimen.color + ' shadow-[0_0_30px_green]' : 
                       filter === 'dark-field' ? 'bg-white/10 ring-2 ring-white/10 border-white/40' :
                       filter === 'phase-contrast' ? 'bg-slate-700/50 border-white/10' : 
                       'bg-slate-900 border-slate-700') : 'opacity-10 grayscale blur-sm'}`} 
                   />
                   <div className={`absolute font-mono-lab font-bold tracking-[0.5em] transition-all duration-1000 ${isOpticallyAligned ? 'text-green-400 scale-100 opacity-100' : 'text-transparent scale-50 opacity-0'}`} style={{ fontSize: '3rem' }}>
                      {targets.code}
                   </div>
                </div>
                {isOpticallyAligned && (
                   <div className="mt-8 text-green-500 font-mono-lab text-xs animate-pulse flex items-center gap-2 bg-green-950/30 px-4 py-1 rounded-full border border-green-500/30">
                      <Zap size={14} /> IMAGE STABILIZED - ID: {targets.code}
                   </div>
                )}
              </div>
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full border border-slate-800">
                <Activity size={12} className={filter !== 'none' ? 'text-purple-400' : 'text-slate-600'} />
                <span className="text-[10px] font-mono-lab text-slate-400 uppercase">{filter.replace('-', ' ')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card-lab space-y-4 border-slate-800 bg-slate-900/40">
                <h3 className="font-mono-lab text-[10px] text-slate-500 uppercase tracking-widest">Optic Bench</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono-lab text-slate-500"><span>CONTRAST</span><span>{stain}%</span></div>
                    <input type="range" min="0" max="150" value={stain} onChange={(e) => setStain(Number(e.target.value))} className="w-full accent-purple-600 h-1 rounded-lg cursor-pointer" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono-lab text-slate-500"><span>Z-AXIS FOCUS</span><span>{focus}</span></div>
                    <input type="range" min="0" max="100" value={focus} onChange={(e) => setFocus(Number(e.target.value))} className="w-full accent-purple-600 h-1 rounded-lg cursor-pointer" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono-lab text-slate-500"><span>LAMP INTENSITY</span><span>{condenser}%</span></div>
                    <input type="range" min="0" max="100" value={condenser} onChange={(e) => setCondenser(Number(e.target.value))} className="w-full accent-purple-600 h-1 rounded-lg cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="card-lab space-y-4 border-slate-800 bg-slate-900/40">
                <h3 className="font-mono-lab text-[10px] text-slate-500 uppercase tracking-widest">Filters</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['none', 'bright-field', 'dark-field', 'fluoresce', 'phase-contrast'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`p-2 text-[9px] uppercase font-mono-lab border rounded transition-all active:scale-95 ${
                        filter === f ? 'border-purple-500 bg-purple-900/20 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'border-slate-800 text-slate-600 hover:border-slate-700'
                      }`}
                    >
                      {f.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card-lab space-y-6 border-slate-800 bg-slate-900/60 flex flex-col shadow-2xl">
            <div className="text-center pb-4 border-b border-slate-800">
              <Microscope className="mx-auto mb-2 text-purple-500" size={32} />
              <h3 className="font-mono-lab text-sm text-white uppercase tracking-widest">Identification</h3>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] scrollbar-hide">
              <div className="grid grid-cols-1 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    disabled={!isOpticallyAligned}
                    onClick={() => setSelectedCategory(cat)}
                    className={`p-3 text-xs uppercase font-mono-lab border rounded text-left transition-all ${
                      !isOpticallyAligned ? 'opacity-20 cursor-not-allowed' :
                      selectedCategory === cat 
                        ? (cat === targets.specimen.category ? 'border-green-500 bg-green-950/20 text-green-400' : 'border-red-500 bg-red-950/20 text-red-400')
                        : 'border-slate-800 hover:border-slate-600 text-slate-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            {isFullySolved && (
              <button 
                onClick={() => onSolve(targets.code)}
                className="w-full bg-green-600 hover:bg-green-500 text-slate-950 font-bold font-mono-lab p-4 rounded-lg uppercase text-xs tracking-widest transition-all shadow-lg animate-pulse"
              >
                Log Specimen Data
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
