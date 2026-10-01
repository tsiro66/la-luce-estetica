import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

// @ts-check
export default defineConfig({
  // Site pages stay prerendered/static; Netlify adapter exists so the
  // Astro Action (src/actions/index.ts -> Resend enquiry email) can run
  // as an on-demand server endpoint.
  output: 'server',
  adapter: netlify({
    // Local deno 2.9.x rejects the `--allow-scripts` flag the Netlify edge
    // dev server passes to `deno eval`, which crashes dev with an
    // unhandled rejection. Edge-function emulation only powers edge
    // middleware (none used here); actions run via the functions path.
    devFeatures: { edgeFunctions: false },
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
