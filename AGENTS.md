# La Luce Estetica

Astro 7 + Tailwind CSS 4 site for a Greek aesthetics studio. All copy is Greek (`lang="el"`) — don't translate UI strings. Prices are omitted on purpose (booking via Treatwell).

## Commands

- Package manager: pnpm. Node >= 22.12.
- Dev server in background: `pnpm exec astro dev --background`; manage with `astro dev stop | status | logs`.
- Build: `pnpm build`. No test suite.
- Deploy: **git push = deploy**. The repo (`tsiro66/la-luce-estetica`, branch `master`) is connected to Cloudflare Pages — every push to `master` (including PagesCMS commits) triggers an automatic build (`pnpm build`, output `dist`). Live at https://la-luce-estetica.pages.dev.

## Layout

- `src/pages/` — routes. `services/[slug].astro` renders one page per treatment from `src/content/treatments/` (schema in `src/content.config.ts`).
- `src/data/*.json` — all visible copy. Editable via PagesCMS; `.pages.yml` at repo root is the CMS field config — keep it in sync whenever a JSON file changes shape. CMS edits land as git commits on GitHub and deploy automatically.
- `src/assets/site/` — optimized stills. `src/assets/tour/` — equirectangular 360° JPEGs for the Pannellum tour in `src/pages/studio.astro` (`tourScenes` array defines scenes).
- `photos/` — local originals, NOT committed to the site. Anything used on the site gets downscaled/compressed into `src/assets/` first (e.g. 360° pano 11904×5952 13MB → `magick in.jpg -resize 5952x2976 -quality 80 out.jpg` ≈ 600KB; browsers load these fully).
- `functions/api/contact.ts` — contact form → Resend email, as a Cloudflare Pages Function (serves POST `/api/contact`). Env via `context.env` (Pages dashboard bindings; `import.meta.env` does not exist in Functions). See `.env.example`: `RESEND_API_KEY` (required, secret), `EMAIL_TO`, `EMAIL_FROM`. Until the business domain is verified at Resend, `EMAIL_FROM` must stay `onboarding@resend.dev` (test sender) and `EMAIL_TO` must be the Resend account owner's address.
- `.dev.vars` (gitignored) — same env vars for local testing with `pnpm exec wrangler pages dev dist`.

## Build / deploy gotchas

- `astro.config.mjs`: `output: "static"` — everything is prerendered at build; images are optimized at build (sharp). No server-side rendering; the only on-demand code is the Pages Function.
- The contact form is a classic POST to `/api/contact` (no JS in the flow). The Function replies with 303 redirects to `/contact?sent=1` or `/contact?err={field}` (`name|email|phone|treatment|message|send`). The output is static, so `contact.astro` prerenders the success panel + error banner hidden and an inline script reveals them from the query string on `astro:page-load` (ClientRouter-safe).
- Pages env vars live in the dashboard (Production + Preview): `RESEND_API_KEY`, `EMAIL_TO`, `EMAIL_FROM`. Changing them needs no rebuild — bindings are read at runtime, unlike the old worker where they were baked at build.
- Pages auto-detects `functions/` at repo root; `dist/` is only the static asset dir. Wrangler config in `dist/` (adapter era) must never come back — if `dist/` contains `wrangler.json`, delete the folder and rebuild.
- After deploying, sanity-check `/contact` (and a form submit), an `/_astro/*` image, and `sitemap-index.xml`.

## Client-side routing

`<ClientRouter />` is in `Layout.astro` — client navigations swap the `<body>`. Page scripts touching DOM must re-init on `astro:page-load` and clean up on `astro:before-swap` (see `Header.astro`, the reveal observer in `Layout.astro`, the tour in `studio.astro`, and the contact result script in `contact.astro`). `define:vars` scripts are plain JS — no TS annotations.

## TODO

- Custom domain: Pages dashboard → Custom domains, then update `site` in `astro.config.mjs` and the Sitemap line in `public/robots.txt`, verify the domain at Resend, and set real `EMAIL_FROM`/`EMAIL_TO` in the Pages dashboard. Rebuild (URL changes) — env changes need only a dashboard update.
- The old `la-luce-estetica` worker stays live until the Pages site is verified, then delete it in the dashboard (Workers & Pages → the worker → Delete). Its `la-luce-estetica.theogr99.workers.dev` URL dies — expected.
