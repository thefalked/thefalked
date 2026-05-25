# thefalked.dev

Terminal-style portfolio inspired by [bradeac.dev](https://bradeac.dev/), with a neon purple theme.

## Stack

- React 19 + TypeScript
- [Vite+](https://viteplus.dev/guide/) — unified dev/build/lint toolchain (Oxlint + Oxfmt)
- [TanStack Router](https://tanstack.com/router) — file-based routing with auto code-splitting
- Tailwind CSS v4
- [Tailwind Variants](https://www.tailwind-variants.org/) — slot-based styling with data attributes
- [Fallow](https://docs.fallow.tools/) — dead code, duplication, and complexity analysis
- Bun

## Getting started

```bash
cd portfolio
bun install
bun run dev          # http://localhost:5173
```

## Scripts

```bash
bun run dev          # start dev server
bun run build        # typecheck + production build
bun run preview      # preview production build

bun run validate     # format + lint + test (CI gate)
bun run check        # format + lint
bun run check:fix    # auto-fix format + lint
bun run test         # run tests once
bun run test:watch   # watch mode

bun run lint         # Oxlint only
bun run lint:fix     # Oxlint auto-fix
bun run fmt          # Oxfmt format
bun run fmt:check    # Oxfmt check only

bun run fallow       # dead code + duplication + complexity scan
bun run fallow:audit # PR gate (changed files only)
```

Lint/format config lives in `vite.config.ts` (`lint` / `fmt` blocks). Oxlint runs with `typeAware` and `typeCheck` against `tsconfig.test.json` (includes tests). Test matchers are wired in `src/test/vitest.d.ts` for `@vitest/expect` + `@testing-library/jest-dom/vitest`.

## Deploy

### GitHub Pages

Push to `main` and the CI workflow (`.github/workflows/deploy.yml`) runs `validate` + `build`, then deploys to GitHub Pages. SPA routing works via a `404.html` copy of `index.html`.

Enable Pages in the repo: **Settings > Pages > Source: GitHub Actions**.

### Docker

```bash
docker build -t thefalked-portfolio ./portfolio
docker run -p 3000:3000 thefalked-portfolio
```

The image uses a multi-stage build: Bun installs dependencies and builds the static assets, then a slim `oven/bun:1-alpine` runtime serves them with Bun's built-in SPA fallback on port 3000.

## Terminal commands

Type in the terminal window:

- `help` — list commands
- `whoami` — about me
- `ls socials` / `ls projects`
- `cd home` / `cd projects`
- `pwd` / `clear`

## Customize

- **Content:** `src/data/portfolio.ts`
- **Routes:** `src/routes/` (file-based, auto-generated tree in `src/routeTree.gen.ts`)
- **Theme:** `src/index.css` (`--color-neon: #6e2b91`)

## Structure

```
src/
  data/                 # portfolio content
  lib/                  # shared pure logic (navigation, titles)
  utils/                # terminal command logic
  components/
    header/
      header.content.ts  # static content
      header.view.tsx    # JSX + tailwind-variants slots
      use-*.ts           # optional component hooks
      index.tsx          # joins content/hook + view
    terminal/
    terminal-input/
    terminal-output/
    root-layout/
    footer/
    particle-canvas/
```

## Theme

Primary accent: `#6e2b91`
