import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  site: 'https://www.stoneworkrisk.com',
  // Inline the shared stylesheet into each page so every page is a single
  // request and preview.html stays a self-contained file.
  build: { inlineStylesheets: 'always' },
});
