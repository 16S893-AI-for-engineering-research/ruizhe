import type { ImageMetadata } from 'astro';
import marmotPhoto from '../images/marmot.jpg';
import figMarmot from '../images/fig-marmot-splits.png';
import figGuidance from '../images/fig-guidance-curves.png';
import figNo2 from '../images/fig-no2-cems-map.png';

export const profile = {
  name: 'Ruizhe Huang',
  role: 'Ph.D. Student, Mechanical Engineering & Computational Science and Engineering',
  affiliation: 'Massachusetts Institute of Technology',
  location: 'Cambridge, MA, USA',
  advisor: { name: 'Prof. Sherrie Wang', url: 'https://earthintelligence.mit.edu/' },
  tagline:
    'I work on recovering the parts of the Earth system our observations miss — fusing sparse ground stations, satellite imagery, and reanalysis into fields that resolve what a coarse grid averages away.',
  email: 'rzhuang@mit.edu',
  phone: '+1 857-275-0272',
  phoneHref: '+18572750272',
  github: 'https://github.com/Ruizhe0723',
  githubHandle: 'Ruizhe0723',
  linkedin: 'https://www.linkedin.com/in/ruizhe-huang-058008269/',
  course: {
    code: '16.S893',
    name: 'AI Agents for Engineering Research',
    url: 'https://github.com/16S893-AI-for-engineering-research',
  },
};

export const interests = [
  'Recovering unresolved Earth-system variability by fusing sparse in-situ observations with Earth observations',
  'Generative data assimilation and probabilistic downscaling of near-surface weather',
  'Satellite-based detection and quantification of greenhouse gas and pollutant emissions',
  'Evaluation protocols and benchmarks for geospatial and weather foundation models',
];

export type Research = {
  title: string;
  short: string;
  period: string;
  venue?: string;
  summary: string;
  points: string[];
  tags: string[];
  /** Wide figure rendered full-bleed beneath the card text. */
  figure?: ImageMetadata;
  figureAlt?: string;
  figureCaption?: string;
  /** Small round thumbnail beside the title. */
  avatar?: ImageMetadata;
  avatarAlt?: string;
  avatarCredit?: { text: string; url: string };
};

export const research: Research[] = [
  {
    title: 'Partial Recovery of Meter-Scale Surface Weather',
    short: 'Marmot',
    period: 'Jul. 2026 – Present',
    venue: 'Under review at Science',
    summary:
      'A transformer that fuses sparse station observations, 30 m Earth-observation embeddings, and ERA5 reanalysis to infer near-surface temperature, dewpoint, and wind at 30 m resolution across the contiguous U.S.',
    points: [
      'Co-led the redesign of the model architecture fusing three sources at radically different resolutions and sampling densities.',
      'Designed the evaluation framework separating pointwise accuracy from genuine sub-grid structure recovery: leave-cell-out spatial splits, pairwise-contrast R², and a nested bootstrap over held-out cells and training seeds.',
      'Identified and corrected a leakage in the prior interpolation baseline.',
      'Cut error by 11–28% against the strongest baselines, including the 3 km HRRR analysis, and recovered time-varying contrasts between stations down to sub-kilometer separations — including diurnal reversals.',
      'Led the final audit of training, evaluation, and figure code before submission. Co-first and co-corresponding author.',
    ],
    tags: ['Transformers', 'Earth observation', 'Evaluation design', 'ERA5'],
    figure: figMarmot,
    figureAlt:
      'Three panels comparing a random train/val/test split against a leave-cell-out split on the ERA5 0.25° grid, plus matching cell-size profiles across splits.',
    figureCaption:
      'Leave-cell-out splitting on the ERA5 grid. A random split mixes 64% of multi-station cells across folds; assigning whole cells drops that to 0% while keeping the cell-size profile matched. Synthetic stations shown.',
    avatar: marmotPhoto,
    avatarAlt: 'A hoary marmot sitting in alpine grass.',
    avatarCredit: {
      text: 'Colin Canterbury/USFWS · public domain',
      url: 'https://commons.wikimedia.org/wiki/File:Marmot_day.jpg',
    },
  },
  {
    title: 'Generative AI for Weather Data Assimilation',
    short: 'Guidance++',
    period: 'May 2025 – May 2026',
    venue: 'Manuscript in preparation',
    summary:
      'Flow-matching models with adaptive ODE solvers that transport noise onto the ERA5 distribution, turned into a practical data-assimilation method.',
    points: [
      'Implemented flow matching with adaptive ODE solvers to map noise to ERA5 distributions.',
      'Developed Guidance++, which reduces ERA5 reanalysis error by 31% across U.S. test stations.',
      'Runs 50× faster with 7× less memory, and is 80% more accurate than the previous state-of-the-art flow-based method.',
      'Ran the largest-scale benchmark of generative weather AI to date, spanning four years of data.',
    ],
    tags: ['Flow matching', 'Data assimilation', 'Generative models', 'Benchmarking'],
    figure: figGuidance,
    figureAlt:
      'Two line charts of the Bayesian guidance weight against time, showing how the peak shifts between the noisy and clean ends as the observation noise and gamma parameters change.',
    figureCaption:
      'The Bayesian guidance schedule. Observation noise and γ decide whether guidance peaks at the noisy or the clean end of the trajectory; normalising to the peak exposes the mirror symmetry between them.',
  },
  {
    title: 'Global Variability in the Detectability of Power Plant NO₂ Plumes from Space',
    short: 'NO₂ plumes',
    period: 'Oct. 2024 – Oct. 2025',
    venue: 'Atmospheric Measurement Techniques, 2026',
    summary:
      'When can a satellite actually see a power plant’s plume? A detectability map for more than 6,000 plants worldwide, and what drives the differences between them.',
    points: [
      'Designed a satellite-based algorithm producing a U.S. plume-detectability map and isolating plume snapshots for downstream emission analysis.',
      'Built a deep learning model quantifying how meteorological, environmental, and sensor conditions govern NO₂ plume visibility at regional and global scales.',
      'Produced the first global detectability maps for over 6,000 power plants, revealing distinct geographic patterns.',
      'Drew out the implications for satellite sensor design and emissions-inversion strategy.',
    ],
    tags: ['Remote sensing', 'Air quality', 'Deep learning', 'Emissions'],
    figure: figNo2,
    figureAlt:
      'World map shading countries by whether they have a comprehensive, partial, or limited national continuous emission monitoring mandate.',
    figureCaption:
      'Where ground-truth emissions data exists at all. National CEMS mandates by tier — the coverage gap this motivates satellite-based estimation to fill.',
  },
];

export type Publication = {
  authors: string;
  title: string;
  venue: string;
  year: string;
  status: 'published' | 'review' | 'prep';
  url?: string;
};

export const publications: Publication[] = [
  {
    authors:
      'J. Giezendanner†, Q. Yang†, R. Huang†, Y. Zhang, E. Schmitt, A. Chandra, J. Vila, D. Hohl, C. Watson, S. Wang',
    title: 'Partial recovery of meter-scale surface weather',
    venue: 'Under review at Science',
    year: '2026',
    status: 'review',
  },
  {
    authors: 'R. Huang, S. Wang',
    title: 'Global variability in the detectability of power plant NO₂ plumes from space',
    venue: 'Atmospheric Measurement Techniques',
    year: '2026',
    status: 'published',
  },
  {
    authors: 'R. Huang, et al.',
    title: 'Generative AI for weather data assimilation',
    venue: 'Manuscript in preparation',
    year: '2026',
    status: 'prep',
  },
  {
    authors: 'C. Zhang, A. Yang, R. Huang, J. Laguarta Soler, X.-Y. Tong, J. Giezendanner, S. Wang',
    title: 'SatOSM: Mining OpenStreetMap for polygon-grounded geospatial pretraining',
    venue: 'Under review at KDD',
    year: '2027',
    status: 'review',
  },
];

export const education = [
  {
    school: 'Massachusetts Institute of Technology',
    degree: 'Ph.D. in Mechanical Engineering & Computational Science and Engineering',
    period: 'Jun. 2026 – Present',
    place: 'Cambridge, MA',
    note: null as string | null,
  },
  {
    school: 'Massachusetts Institute of Technology',
    degree: 'M.S. in Mechanical Engineering',
    period: 'Sep. 2023 – May 2026',
    place: 'Cambridge, MA',
    note: null,
  },
  {
    school: 'Peking University',
    degree: 'B.S. in Theoretical and Applied Mechanics',
    period: 'Sep. 2019 – Jul. 2023',
    place: 'Beijing, China',
    note: 'Major GPA 3.93/4.00 · Rank 1/21 for three consecutive years',
  },
];

export const awards = [
  { name: 'National Scholarship (Rank 1)', detail: 'Top 0.3% in college', year: '2021' },
  {
    name: 'Peking University · Dedao Major Challenge Scholar',
    detail: 'Top 5 of 120 students',
    year: '2023',
  },
];

export const skills = [
  { group: 'Languages', items: ['Python', 'PyTorch', 'C', 'C++'] },
  { group: 'Parallel computing', items: ['MPI', 'OpenMP', 'CUDA'] },
  {
    group: 'Computer systems',
    items: ['Computer architecture', 'Linking', 'Operating systems', 'Network programming', 'Concurrent programming'],
  },
  {
    group: 'Mathematics',
    items: [
      'Mathematical analysis',
      'Differential equations',
      'Differential geometry',
      'Linear algebra',
      'Numerical methods',
      'Probability & statistics',
    ],
  },
  { group: 'Tools', items: ['LaTeX', 'Linux shell', 'Git'] },
];

export const service = [
  {
    role: 'Chair, Sidney Pacific Coffee Hour',
    org: 'MIT',
    period: '2026 – Present',
    detail: 'Organize a weekly gathering for 100 graduate residents; coordinate venue, catering, and programming.',
  },
  {
    role: 'Chair, MechE Graduate Coffee Hour',
    org: 'MIT',
    period: '2025 – 2026',
    detail: 'Organized a weekly gathering for roughly 30 graduate students in Mechanical Engineering.',
  },
  {
    role: 'Mentor, MIT GAME Big/Little Buddy Program',
    org: 'MIT',
    period: '2025 – Present',
    detail: '',
  },
];
