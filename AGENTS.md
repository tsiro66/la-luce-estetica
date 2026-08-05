## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Content management

All visible copy is editable via PagesCMS (see `.pages.yml` at the repo root and README). Content lives in:

- `src/data/site.json` — global settings: brand, nav, Treatwell URL, SEO defaults, footer
- `src/data/home.json` — every homepage section
- `src/data/pages.json` — placeholder page titles/notes
- `src/content/treatments/` — treatment entries (Astro content collection, schema in `src/content.config.ts`)

When changing the shape of any data file, update `.pages.yml` fields to match.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
