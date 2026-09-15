import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://16s893-ai-for-engineering-research.github.io',
  // Served from /ruizhe on GitHub Pages; `npm run dev` sets DEV=true for a clean local root.
  base: process.env.DEV === 'true' ? '/' : '/ruizhe',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
