# La Luce Estetica

Aesthetics & body-treatment studio website. Built with [Astro](https://astro.build) + Tailwind CSS v4.

## 🧞 Commands

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `pnpm install` | Installs dependencies                        |
| `pnpm dev`     | Starts local dev server at `localhost:4321`  |
| `pnpm build`   | Builds the production site to `./dist/`      |
| `pnpm preview` | Previews the build locally                   |

## ✉️ Contact form (Resend)

The `/contact` form sends email via [Resend](https://resend.com) through an Astro Action (`src/actions/index.ts`). Configure it with environment variables (see `.env.example`):

| Variable         | Purpose                                                          |
| :--------------- | :--------------------------------------------------------------- |
| `RESEND_API_KEY` | API key from [resend.com/api-keys](https://resend.com/api-keys) — **required** |
| `EMAIL_TO`       | Recipient inbox; defaults to the footer email in `site.json`     |
| `EMAIL_FROM`     | Verified sender, e.g. `La Luce Estetica <hello@yourdomain>`; defaults to the footer email |

For production you must verify a sending domain at [resend.com/domains](https://resend.com/domains) (the built-in `onboarding@resend.dev` sender works only for local testing to your own account address). Replies to a submission go to the visitor's email via `Reply-To`.

Hosting note: the site pages stay static; the Netlify adapter (already configured in `astro.config.mjs`) runs only the action endpoint. Deploying elsewhere? Swap `@astrojs/netlify` for the matching adapter (`@astrojs/vercel`, `@astrojs/cloudflare`, …) — nothing else changes.

## ✍️ Editing content with PagesCMS

All visible text on the site is editable through [PagesCMS](https://pagescms.org), which edits this repository's files directly via GitHub — no separate database.

### First-time setup

1. Push this repository to GitHub (already done: `tsiro66/la-luce-estetica`).
2. Go to [app.pagescms.org](https://app.pagescms.org) and sign in with GitHub.
3. Choose the repository and the branch you deploy from (e.g. `main`).
4. Edit content in the dashboard — changes are committed straight to the branch.

Whenever a commit lands on the branch, your hosting provider rebuilds the site automatically.

### What is editable

| CMS collection    | File / folder               | Controls                                            |
| :---------------- | :-------------------------- | :-------------------------------------------------- |
| Site Settings     | `src/data/site.json`        | Brand name, wordmark, nav, Treatwell URL, footer, SEO defaults |
| Home Page         | `src/data/home.json`        | Hero, marquee, best-sellers section copy, studio teaser, booking banner |
| Page Meta         | `src/data/pages.json`       | Titles & notes of Services / Studio / FAQ / Contact |
| Contact Page      | `src/data/contact.json`     | Contact page copy, form labels, success/error messages |
| Treatments        | `src/content/treatments/`   | One Markdown file per treatment (SEO title, subtitle, category, duration, bestseller, description, problems, benefits, before/after, FAQ, general info) |
| Media             | `public/uploads/`           | Uploaded images, served from `/uploads/...`         |

The CMS field configuration lives in [.pages.yml](./.pages.yml). Keep it in sync whenever the data files change shape.

### Notes

- Hero: set `hero.video` in `home.json` to an mp4/webm URL to replace the photo with an autoplaying muted loop (client video pending).
- Treatments: `order` controls position within its category, `bestseller: true` items appear in the homepage Best Sellers section.
- Treatment pages live at `/services/{slug}` (one static page per treatment, 34 total).
- The laser, wax and brow region menus live in `src/data/services-menu.json` (not CMS-editable).
- The 360° virtual tour scenes live in `src/assets/tour/` and are wired in `src/pages/studio.astro`; add a scene by dropping an equirectangular JPEG there and adding it to `tourScenes`.
- Prices are intentionally omitted — booking goes through Treatwell.
- The site is in Greek (`lang="el"`); fonts (Playfair Display, Commissioner) fully support Greek.
