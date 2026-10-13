import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// @ts-check
export default defineConfig({
  // TODO: replace with the real domain once confirmed (custom or Cloudflare).
  site: 'https://la-luce-estetica.pages.dev',
  integrations: [sitemap()],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
