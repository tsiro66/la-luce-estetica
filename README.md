# La Luce Estetica

Aesthetics & body-treatment studio website. Built with [Astro](https://astro.build) + Tailwind CSS v4.

## 🧞 Commands

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `pnpm install` | Installs dependencies                        |
| `pnpm dev`     | Starts local dev server at `localhost:4321`  |
| `pnpm build`   | Builds the production site to `./dist/`      |
| `pnpm preview` | Previews the build locally                   |

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
| Home Page         | `src/data/home.json`        | Hero, marquee, featured-section copy, studio teaser, booking banner |
| Placeholder Pages | `src/data/pages.json`       | Titles & notes of Services / Studio / FAQ / Contact |
| Treatments        | `src/content/treatments/`   | One Markdown file per treatment (name, category, duration, price, order, featured, description) |
| Media             | `public/uploads/`           | Uploaded images, served from `/uploads/...`         |

The CMS field configuration lives in [.pages.yml](./.pages.yml). Keep it in sync whenever the data files change shape.

### Notes

- Hero & studio-teaser images: leaving the image field empty falls back to the built-in placeholder art.
- Treatments: `order` controls listing position, `featured: true` items appear on the homepage.
- Treatment descriptions (Markdown body) are used by the Services page.
