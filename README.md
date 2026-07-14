# Next.js + Flowbite Template

A production-ready starter for building static sites with Next.js 16 App
Router, TypeScript, Tailwind CSS, and Flowbite React. The template includes
ESLint flat config, Prettier, Husky, lint-staged, Vitest, and GitHub Actions
workflows for CI and GitHub Pages deployment.

## Requirements

- [Bun](https://bun.sh/) 1.2 or newer

The repository pins Bun with both `.bun-version` and the `packageManager` field
in `package.json` (`bun@1.2.23`).

## Getting started

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `bun run dev` - start the Next.js development server.
- `bun run build` - build the static export into `./out`.
- `bun run start` - run the configured Next.js production server command.
- `bun run lint` - run ESLint.
- `bun run lint:fix` - run ESLint and apply safe fixes.
- `bun run typecheck` - run TypeScript without emitting files.
- `bun run test` - run the Vitest suite once.
- `bun run test:watch` - run Vitest in watch mode.
- `bun run prettier` - format supported files with Prettier.
- `bun run prettier:check` - check formatting without writing changes.
- `bun run prepare` - install Husky hooks.

## Project structure

```text
src/
  app/         App Router routes, layout, metadata, and global styles
  components/  Reusable UI components built with Flowbite React and Tailwind CSS
  util/        Shared utility types and helpers
```

## Deployment

The site is deployed to GitHub Pages with `.github/workflows/nextjs.yml`.
The workflow checks out the repository, sets up Bun with `oven-sh/setup-bun`,
installs dependencies with `bun install --frozen-lockfile`, runs
`bun run build`, uploads `./out`, and deploys it with `actions/deploy-pages`.

`actions/configure-pages` is configured with `static_site_generator: next`,
which injects the GitHub Pages `basePath` during CI. `next.config.mjs` enables
static export with `output: 'export'` and disables image optimization with
`images.unoptimized` so the app can run from GitHub Pages.

The CI workflow at `.github/workflows/ci.yml` runs on pull requests and
non-`main` pushes. It installs dependencies with Bun, then runs lint,
typecheck, tests, and build.

## Use this template

Create a new repository from this starter with GitHub's **Use this template**
button, then clone your new repository and run:

```bash
bun install
bun run dev
```

Update the app metadata, pages, and components for your project before
deploying.
