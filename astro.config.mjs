import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// @ts-check
export default defineConfig({
  // TODO: replace with the real domain once confirmed (custom or Cloudflare).
  site: 'https://la-luce-estetica.pages.dev',
  integrations: [sitemap()],
  // Site pages stay prerendered/static; the Cloudflare adapter exists so the
  // Astro Action (src/actions/index.ts -> Resend enquiry email) can run as an
  // on-demand server endpoint.
  output: 'server',
  adapter: cloudflare({
    // Build-time (sharp) image optimization. Pages here are prerendered, so
    // no on-demand image endpoint is needed; "passthrough" (the adapter
    // default) would ship the full-resolution originals instead.
    imageService: 'compile',
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
