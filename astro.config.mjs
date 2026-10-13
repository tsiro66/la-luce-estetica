import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// @ts-check
export default defineConfig({
  site: 'https://la-luce-estetica.pages.dev',
  integrations: [sitemap()],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
