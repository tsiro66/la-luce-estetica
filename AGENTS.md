# La Luce Estetica

Astro 7 + Tailwind CSS 4 site for a Greek aesthetics studio. All copy is Greek (`lang="el"`) — don't translate UI strings. Prices are omitted on purpose (booking via Treatwell).

## Commands

- Package manager: pnpm. Node >= 22.12.
- Dev server in background: `pnpm exec astro dev --background`; manage with `astro dev stop | status | logs`.
- Build: `pnpm build`. No test suite.
- Deploy: `pnpm build && npx wrangler deploy` → https://la-luce-estetica.theogr99.workers.dev. **Git push does NOT deploy** — manual deploy after every change.

## Layout

- `src/pages/` — routes. `services/[slug].astro` renders one page per treatment from `src/content/treatments/` (schema in `src/content.config.ts`).
- `src/data/*.json` — all visible copy. Editable via PagesCMS; `.pages.yml` at repo root is the CMS field config — keep it in sync whenever a JSON file changes shape. CMS edits land as git commits on GitHub; they also still need a manual deploy.
- `src/assets/site/` — optimized stills. `src/assets/tour/` — equirectangular 360° JPEGs for the Pannellum tour in `src/pages/studio.astro` (`tourScenes` array defines scenes).
- `photos/` — local originals, NOT committed to the site. Anything used on the site gets downscaled/compressed into `src/assets/` first (e.g. 360° pano 11904×5952 13MB → `magick in.jpg -resize 5952x2976 -quality 80 out.jpg` ≈ 600KB; browsers load these fully).
- `src/actions/index.ts` — contact form → Resend email. Env (see `.env.example`): `RESEND_API_KEY` (required), `EMAIL_TO`, `EMAIL_FROM`. Until the business domain is verified at Resend, `EMAIL_FROM` must stay `onboarding@resend.dev` (test sender) and `EMAIL_TO` must be the Resend account owner's address.

## Build / deploy gotchas

- `astro.config.mjs`: Cloudflare adapter, `output: "server"` — pages are prerendered, only the contact action runs on-demand; images optimized at build (`imageService: "compile"`). The adapter is **Workers-only**: never deploy this output to a Cloudflare Pages project.
- `import.meta.env.*` is inlined at build: change `.env` → rebuild AND `wrangler deploy`. Built bundles silently keep stale values otherwise.
- Exported shell env vars override `.env` during build — build from a fresh shell or re-source `.env` first.
- `RESEND_API_KEY` is baked into the deployed worker bundle (accepted trade-off; runtime-secret refactor via `cloudflare:workers` `env` if it ever matters).
- After deploying, sanity-check `/contact`, a no-slash route (should 307), and an `/_astro/*` image.

## TODO

- Custom domain: update `site` in `astro.config.mjs`, the Sitemap line in `public/robots.txt`, verify at Resend, then set real `EMAIL_FROM`/`EMAIL_TO`. Rebuild + redeploy.
