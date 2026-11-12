# AGENTS.md

Guide for AI coding agents (and humans) working in this repo. Read it before changing anything.

## What this is

2122 Produções: the pt-BR website of a studio offering music production, marketing and legal services to independent artists. Create React App (`react-scripts` 5) with React 18, TypeScript 4.9, `react-router-dom` 7 and Tailwind 3. The featured artist, catalog and portfolio come from Airtable (`src/services/airtableApi.ts`; token in `REACT_APP_AIRTABLE_TOKEN`, see `env.example`).

## Repo map

```
src/pages        route screens; thin, they render components
src/components   one folder per component (see "Component architecture")
src/services     Airtable client and data hooks
src/context      AppContext: scroll-reveal refs and flags
src/utils        shared pure helpers (cx)
src/assets       images, the Elements font, AnimatePolvo
src/index.css    Tailwind source: base styles and custom classes
src/main.css     GENERATED from index.css by `npm run css`; committed, imported by App.tsx
public/          index.html (lang pt-BR, meta, JSON-LD), favicons, manifest
```

Dependencies flow one way: **utils → services / context → components → pages → App**. Nothing imports `pages`; `services` and `context` never import components.

## Rules

- **No third-party UI kit.** Build components in `src/components`. Behavior-only libraries are fine.
- **Every `.tsx` component is presentation only.** It renders props and what its hook returns: no logic, no data, no class strings. Derived values, formatting and behavior (state, effects, browser APIs, observers, timers, fetching) live in a `useX.ts` hook next to the component, built on pure `.ts` modules; static data it renders lives in `X.data.ts`; classes live in `X.style.ts`, composed with `cx()` (`src/utils/cx.ts`). Applies to new components and to every existing component a PR touches: the PR migrates it. Full rule: "Component architecture" below.
- **Types live in `X.type.ts`.** Every `interface` and `type` goes in a `.type.ts` file next to the file that uses it (`Header.tsx` → `Header.type.ts`); tests may keep local types. Interfaces start with `I` (`IPortfolioItem`), type aliases with `T` (`TButtonProps`).
- **Token-only styling.** Colors come from `src/theme/colors.js`, registered as semantic tokens in `tailwind.config.js` (`theme.extend.colors`); allowed text/background pairs are listed and checked in `src/theme/contrast.test.ts` (accent-strong is not allowed on surface-card or over the photo). Touched code uses the utilities those tokens generate, never raw palette classes (`text-violet-300`, `bg-stone-800`) or hex literals. A missing token is added to the token source and config, not inlined.
- **`main.css` is generated.** After changing `index.css`, `tailwind.config.js` or any class, run `npm run css` and commit `src/main.css` with the change. Classes are written as whole literals (never `` `text-${color}` ``) so Tailwind finds them.
- **Accessibility is a requirement:** semantic HTML, an accessible name on every control (icon buttons included), visible focus (`focus-visible`), WCAG 2.2 AA contrast for every text/background pair, keyboard access to everything clickable, state announced (`aria-expanded`, `role="status"` for loading/errors), and `prefers-reduced-motion` honored.
- **Copy is pt-BR**, `aria-label`s and error messages included. It stays inline in the markup; lists of copy (nav items, service bullets) are static data in `X.data.ts`.
- **Secrets stay out of git.** The Airtable token lives only in `.env.local`; never commit it or log it.

## Component architecture

Each concern has its own kind of file. A component file never mixes them.

- **`X.tsx` is presentation only.** It maps props and hook results to markup: JSX, destructuring, `.map` over ready-made arrays, simple conditionals on given values (`isOpen`, `index > 0`), and `cx()` for classes. Nothing else: no helper functions, arithmetic, template formatting, array manipulation (`filter`, `sort`, `join`…), module-level data, effects, timers, observers or `window` / `document`.
- **`useX.ts` is behavior and derived data.** State, effects, browser APIs, timers, fetching, and the view model the markup needs. It never returns JSX. A generic behavior hook is named after what it does (`useDisclosure`) and composed by the component's own hook.
- **Pure logic** that needs no React (mapping Airtable records, parsing a YouTube URL) goes in a plain `.ts` module with its own unit test; hooks call it.
- **`X.data.ts`** holds static data a component renders (nav items, service lists, external URLs).
- **`X.type.ts`** holds every type and interface, next to the file that uses it.

## Styling architecture

Markup and styling never share a file.

- **`X.style.ts` owns every class.** It exports one plain object per component: `base` for the classes every instance gets, one key per variant mapping each option to its classes, and named keys for other parts. No logic: values are plain strings, or `cx()` over strings and shared pieces. No `.join()` or template literals, so Tailwind sees every class literally.
- **`X.tsx` composes classes with `cx()`:** `cx(button.base, button.variant[variant], className)`. No class strings in `className` (literal, template, or inside a call/conditional).
- **Variants are declared once.** Prop types come from the style object (`variant?: keyof typeof button.variant`). Defaults live in the component's props.
- **Callers extend, never override.** A component accepts `className` and passes it last to `cx()`; use it for layout, not to restyle internals.

## Commands

| Command                               | What it does                                                     |
| ------------------------------------- | ---------------------------------------------------------------- |
| `npm start`                           | CRA dev server (port 3000)                                       |
| `npm run build`                       | production build into `build/`                                   |
| `npm run lint`                        | ESLint (CRA rules + jsx-a11y recommended), zero warnings allowed |
| `npm run typecheck`                   | `tsc --noEmit`                                                   |
| `CI=true npm test`                    | Jest + Testing Library, single run                               |
| `npm run css`                         | regenerate `src/main.css` from `src/index.css`                   |
| `npm run tailwind`                    | same, in watch mode                                              |
| `npm run design:detect -- <src\|url>` | Impeccable's deterministic design detector (see "Design review") |

Hugo's dev server usually holds port 3000; agents start their own on another port (`PORT=3122 BROWSER=none npm start`) and stop it when done.

## Design review

The **`impeccable`** skill (`/impeccable <command>`) lives in `.claude/skills/impeccable`, version in `scripts/VERSION`; its launcher downloads its binary into the ignored `scripts/bin/` on first run. `.claude/settings.json` runs its detector hook after UI edits. There is no `PRODUCT.md` or `DESIGN.md` yet: the incumbent code (the 2122 lettering, the octopus, the dark studio photo) is the visual authority. Critique snapshots go to `.impeccable/critique/` (local, untracked).

Its critiques are model judgment: useful, but they can miss real problems and flag non-problems. Order of trust when reviewing or changing UI:

1. **Deterministic checks decide.** `npm run lint` (jsx-a11y), `npm run typecheck`, `CI=true npm test`, and `npm run design:detect -- src` plus a scan of the running page (`npm run design:detect -- http://localhost:<port>/`, again with `--viewport 390x844`). File scans skip element rules such as contrast and tiny text; only the URL scan runs them.
2. **Judgment findings need evidence.** A finding from `/impeccable critique|audit` cites a file and line or selector and a screenshot of the rendered page at the size it ships, and says what to change. Without that it is a suggestion, not a defect.
3. **Hugo decides judgment calls.** Fix deterministic failures directly; list judgment findings in the PR for review instead of applying taste changes unasked. The rules above win over generic skill advice.

## Workflow

Never commit to `main`. Each stage of work gets its own branch from a freshly fetched `origin/main` (`feat/<name>`, `fix/<name>`, `refactor/<name>`, `chore/<name>`), stays small (≤ ~20 files) and lands through a pull request that Hugo reviews and merges. There is no CI: write the failing test first for anything with logic, and run lint, typecheck, test, build and `npm run css` (no diff left in `main.css`) before asking for review.
