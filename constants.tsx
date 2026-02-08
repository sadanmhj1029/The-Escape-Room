
import { DiscoveryCard } from './types';

export const DISCOVERY_CARDS: DiscoveryCard[] = [
  { id: '1', name: "First observation of 'animalcules'", year: 1676, description: "Antonie van Leeuwenhoek uses a handcrafted lens." },
  { id: '2', name: "Germ theory of disease", year: 1861, description: "Louis Pasteur proves microbes don't spontaneously generate." },
  { id: '3', name: "Koch's postulates published", year: 1890, description: "Robert Koch links specific microbes to specific diseases." },
  { id: '4', name: "Penicillin discovered", year: 1928, description: "Alexander Fleming finds a mold that kills bacteria." },
  { id: '5', name: "First electron microscope", year: 1931, description: "Knoll and Ruska build a device far beyond light's limit." },
  { id: '6', name: "PCR technique invented", year: 1983, description: "Kary Mullis enables massive amplification of DNA sequences." },
];

export const MICROBE_POOL = [
  // Original 10
  { id: 'm1', name: 'Escherichia coli', type: 'Bacteria', trait: 'Rod-shaped, binary fission' },
  { id: 'm2', name: 'Penicillium', type: 'Fungi', trait: 'Branching hyphae, blue-green spores' },
  { id: 'm3', name: 'Chlamydomonas', type: 'Algae', trait: 'Green, oval with flagella' },
  { id: 'm4', name: 'Amoeba proteus', type: 'Protozoa', trait: 'Changing shape, pseudopods' },
  { id: 'm5', name: 'T4 Bacteriophage', type: 'Virus', trait: 'Geometric head, spider-like legs' },
  { id: 'm6', name: 'Staphylococcus aureus', type: 'Bacteria', trait: 'Grape-like clusters, golden growth' },
  { id: 'm7', name: 'Saccharomyces cerevisiae', type: 'Fungi', trait: 'Ovoid yeast cells, budding' },
  { id: 'm8', name: 'Spirogyra', type: 'Algae', trait: 'Spiral chloroplasts, filamentous' },
  { id: 'm9', name: 'Paramecium caudatum', type: 'Protozoa', trait: 'Slipper-shaped, covered in cilia' },
  { id: 'm10', name: 'Influenza Virus', type: 'Virus', trait: 'Spherical envelope, RNA spikes' },
  
  // 30+ New Additions
  { id: 'm11', name: 'Bacillus subtilis', type: 'Bacteria', trait: 'Rod-shaped, forms tough endospores' },
  { id: 'm12', name: 'Aspergillus niger', type: 'Fungi', trait: 'Black spores on globe-like conidiophores' },
  { id: 'm13', name: 'Volvox', type: 'Algae', trait: 'Spherical colonies with daughter colonies inside' },
  { id: 'm14', name: 'Euglena gracilis', type: 'Protozoa', trait: 'Green spindle-shape, flagellum, red eyespot' },
  { id: 'm15', name: 'Ebola Virus', type: 'Virus', trait: 'Filiform, shepherd’s crook shape' },
  { id: 'm16', name: 'Streptococcus pyogenes', type: 'Bacteria', trait: 'Long chains of spherical cells' },
  { id: 'm17', name: 'Candida albicans', type: 'Fungi', trait: 'Dimorphic: budding yeast and hyphae' },
  { id: 'm18', name: 'Diatoms', type: 'Algae', trait: 'Silica cell walls, symmetric geometric patterns' },
  { id: 'm19', name: 'Plasmodium falciparum', type: 'Protozoa', trait: 'Small ring-stage found inside red blood cells' },
  { id: 'm20', name: 'HIV', type: 'Virus', trait: 'Spherical envelope with glycoprotein spikes' },
  { id: 'm21', name: 'Vibrio cholerae', type: 'Bacteria', trait: 'Comma-shaped, single polar flagellum' },
  { id: 'm22', name: 'Rhizopus stolonifer', type: 'Fungi', trait: 'Fast-growing black bread mold with stolons' },
  { id: 'm23', name: 'Scenedesmus', type: 'Algae', trait: 'Flat colonies of 4 cells with pointy spines' },
  { id: 'm24', name: 'Trypanosoma brucei', type: 'Protozoa', trait: 'Ribbon-like, kinetoplast, moves through blood' },
  { id: 'm25', name: 'Rabies Virus', type: 'Virus', trait: 'Distinct bullet-shaped morphology' },
  { id: 'm26', name: 'Treponema pallidum', type: 'Bacteria', trait: 'Tightly coiled spiral (spirochete)' },
  { id: 'm27', name: 'Mucor', type: 'Fungi', trait: 'Tall, pin-like molds with white mycelium' },
  { id: 'm28', name: 'Porphyridium', type: 'Algae', trait: 'Unicellular red algae, spherical cells' },
  { id: 'm29', name: 'Stentor', type: 'Protozoa', trait: 'Giant trumpet-shaped ciliate' },
  { id: 'm30', name: 'Herpes Simplex Virus', type: 'Virus', trait: 'Icosahedral capsid, large lipid envelope' },
  { id: 'm31', name: 'Helicobacter pylori', type: 'Bacteria', trait: 'Spiral-shaped, multiple tufted flagella' },
  { id: 'm32', name: 'Cryptococcus neoformans', type: 'Fungi', trait: 'Yeast cells with a very thick sugar capsule' },
  { id: 'm33', name: 'Ulva lactuca', type: 'Algae', trait: 'Sea lettuce, thin sheets of cells' },
  { id: 'm34', name: 'Vorticella', type: 'Protozoa', trait: 'Bell-shaped with a long, contractile stalk' },
  { id: 'm35', name: 'Tobacco Mosaic Virus', type: 'Virus', trait: 'Rigid helical rod structure' },
  { id: 'm36', name: 'Clostridium botulinum', type: 'Bacteria', trait: 'Club-shaped rods, strict anaerobe' },
  { id: 'm37', name: 'Fusarium', type: 'Fungi', trait: 'Multi-celled, crescent-shaped macroconidia' },
  { id: 'm38', name: 'Ceratium', type: 'Algae', trait: 'Armored dinoflagellate with distinct horns' },
  { id: 'm39', name: 'Giardia lamblia', type: 'Protozoa', trait: 'Pear-shaped with two nuclei (looks like a face)' },
  { id: 'm40', name: 'Adenovirus', type: 'Virus', trait: 'Non-enveloped icosahedron with corner fibers' },
  { id: 'm41', name: 'Micrococcus luteus', type: 'Bacteria', trait: 'Bright yellow spherical colonies' },
  { id: 'm42', name: 'Neisseria gonorrhoeae', type: 'Bacteria', trait: 'Coffee-bean shaped diplococci' },
];

export const LAB_COLORS = {
  bg: '#2C3E50',
  accent: '#F1C40F',
  danger: '#E74C3C',
  success: '#2ECC71',
};

export const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
