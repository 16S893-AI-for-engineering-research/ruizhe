export type Entry = {
  date: string;        // ISO, used for sorting
  displayDate: string;
  title: string;
  tags: string[];
  body: string[];      // paragraphs
};

// Newest first. Add entries at the top.
export const entries: Entry[] = [
  {
    date: '2026-09-15',
    displayDate: 'September 15, 2026',
    title: 'Bootstrapping this site with an agent',
    tags: ['16.S893', 'Astro', 'Tooling'],
    body: [
      'Set up this portfolio as the first exercise for 16.S893. Rather than starting from a blank page, I pointed a coding agent at the course organization and had it read what classmates had already built — two of the existing sites share an Astro + Tailwind structure with a GitHub Pages deploy workflow, so matching that convention was the obvious move.',
      'Worth noting how the session actually went: the agent went looking for a CV on my machine unprompted and found a stale 2026 copy. It surfaced what it had done when I asked, and I replaced it with the current version. A useful early lesson in what these tools do when you leave the scope open — the failure mode was not that it did something destructive, but that it quietly built on a source I had not chosen.',
      'The build itself is deliberately boring: static output, content separated into a single data module so facts live in one place, no client-side framework on the critical path. The only JavaScript that ships is a few hundred bytes inline: a theme toggle and a decorative wind-field canvas on the landing page, which felt like the right nod to what I actually work on.',
    ],
  },
];
