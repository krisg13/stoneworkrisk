import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build
export default defineConfig({
  site: 'https://www.stoneworkrisk.com',
  output: "hybrid",
  adapter: cloudflare()
});