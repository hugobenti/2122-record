# Critique P1 Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the four P1 issues from the 2026-11-12 impeccable critique (16/32) on all routes, one pull request per task, each driven and checked by its impeccable command.

**Architecture:** PR 0 sets the rules (`AGENTS.md`), tooling and test harness. PR 1 adds semantic color tokens and a safe background that every later PR consumes. PRs 2–4 each migrate the components they touch to the AGENTS.md file split (`X.tsx` / `useX.ts` / `X.style.ts` / `X.type.ts` / `X.data.ts`) while fixing their issue. PR 5 polishes and re-runs the critique.

**Tech Stack:** CRA 5, React 18, TypeScript 4.9, react-router-dom 7, Tailwind 3, Jest 27 + Testing Library 13, vendored impeccable 0.1.18.

**Spec:** the critique snapshot `.impeccable/critique/2026-11-12T21-36-24Z__src.md` (local, untracked). Each task below restates the findings it fixes. Priority chosen by Hugo: robustness + accessibility first; inner pages carry the home identity (2122 lettering, octopus, dark studio mood); scope = the 4 P1s.

## Global Constraints

- `AGENTS.md` is binding: full component split for new and touched components, `I`/`T` type prefixes, token-only colors in touched code, pt-BR copy inline, `npm run css` after any class change with `src/main.css` committed.
- One task = one branch from freshly fetched `origin/main` = one PR. Hugo reviews and merges. Never commit to `main`.
- Gate before every PR: `npm run lint`, `npm run typecheck`, `CI=true npm test`, `npm run build`, `npm run css` leaves no diff.
- Worktrees: run `npm ci`, and copy `.env.local` from the main checkout (never commit it) so Airtable data loads.
- Dev servers for agents: `PORT=3122 BROWSER=none npm start`; stop them before reporting.
- Detector baseline (critique run, main @ 185852e): CLI `src` = 11 (4 `gray-on-color`, 7 `ai-color-palette`, all judged false positives). URL scans: `/` = 13 (desktop) / 9 (390×844); `/servicos`, `/catalogo` and `/portfolio` = 4 each. A PR may not add findings on the routes it touches.
- Accessible names and status copy are pt-BR; the exact strings are pinned in each task.

## Impeccable on every task

Every task runs its impeccable command from the vendored skill, in this order:

1. `.claude/skills/impeccable/scripts/impeccable context --target <primary file>`. Follow its directives; it reports that PRODUCT.md is missing, which is expected (incumbent code is the authority).
2. Read `.claude/skills/impeccable/reference/<command>.md` and follow it for the task's scope. Read `reference/craft-floor.md` immediately before the first UI edit.
3. After the gate passes: run `npm run design:detect -- --json <changed .tsx files>`, plus URL scans of each touched route at the default viewport and with `--viewport 390x844`.
4. The PR body carries: before/after detector counts per route, screenshots at 1440×900 and 390×844 of each touched route, and any judgment findings listed for Hugo rather than applied (AGENTS.md "Design review").

## Agents and models

| PR | Branch | Impeccable | Implementer (model) | Reviewer (model) | Depends on |
|---|---|---|---|---|---|
| 0 | `chore/agents-md` | detector baseline | this session (Claude Opus 5.5) | Hugo | — |
| 1 | `fix/background-tokens` | `audit` (before + after) | `sonnet-implementer` (Claude Sonnet 5.5, thinking medium) | `sonnet-reviewer` (Claude Sonnet 5.5, thinking high) | PR 0 merged |
| 2 | `fix/mobile-nav` | `adapt` | `sonnet-implementer` (Sonnet 5.5, medium) | `sonnet-reviewer` (Sonnet 5.5, high) | PR 1 merged |
| 3 | `fix/airtable-states` | `harden` | `sonnet-implementer` (Sonnet 5.5, medium) | `sonnet-reviewer` (Sonnet 5.5, high) | PR 1 merged |
| 4 | `feat/contact-path` | `clarify` | `sonnet-implementer` (Sonnet 5.5, medium) | `sonnet-reviewer` (Sonnet 5.5, high) | PR 1 merged |
| 5 | `chore/polish` | `polish`, then `critique` | `task` agent (session model, Claude Opus 5.5) | orchestrator runs `critique` with two isolated `task` agents (A design review, B detector) | PRs 1–4 merged |

Why these models: PRs 1–4 pin names, values, copy and tests, so the remaining judgment fits Sonnet. Polish and critique are open-ended design judgment across all routes, and critique must spawn two isolated sub-agents, which `sonnet-implementer` cannot do (`spawns: ""`). PRs 2, 3 and 4 touch disjoint components and may run in parallel once PR 1 is merged. Their only shared file is the generated `src/main.css`; resolve conflicts in it by rebasing and re-running `npm run css`, never by hand.

## Review Focus

- **White page behind pale text:** full-page captures at 1440×900 and 390×844, iOS overscroll, and the background photo failing to load must show the dark base, never white. PR 1 owns this; it is checked by screenshot because jsdom has no layout.
- **Missing or expired Airtable token:** a 401 must produce the friendly error state with retry and a YouTube fallback, never a table ID or status text. PR 3 test: `Catalog` with fetch → 401.
- **Retry clicked while a request is in flight, or the page left mid-fetch:** only the latest request may set state. PR 3 test: `useAirtableRecords` ignores the superseded response.
- **Mobile menu open when the route changes or Esc is pressed:** the menu closes, `aria-expanded` flips back, and focus returns to the toggle on Esc. PR 2 tests.
- **Collapsed service details:** must be out of the accessibility tree and tab order, not just transparent text. PR 4 test: collapsed panel content is not found by `getByRole`/`getByText` and the button reports `aria-expanded="false"`.

---

### Task 0: Rules, tooling, test harness (`chore/agents-md`) — done in this session

**Files:** `AGENTS.md`, `CLAUDE.md` (`@AGENTS.md`), `package.json` (scripts `lint`, `typecheck`, `css`, `design:detect`; `plugin:jsx-a11y/recommended`; Jest `moduleNameMapper` for react-router 7), `src/setupTests.ts` (TextEncoder polyfill), `src/utils/cx.ts`, `.claude/skills/impeccable/` (vendored 0.1.18, `scripts/bin/` ignored), `.claude/settings.json` (detector hook), `.gitignore`, `src/main.css` (regenerated), lint-warning fixes in `AppContext.tsx`, `FeaturedArtist.tsx`, `AnimatePolvo.tsx`; deletes the broken boilerplate `src/App.test.tsx`; adds this plan.

**Produces:** `cx(...parts: Array<string | false | null | undefined>): string` from `src/utils/cx.ts`; a working `CI=true npm test` for react-router components.

- [x] Lint 0 warnings, typecheck clean, tests run (no tests yet), build compiles, detector runs from the vendored path (11 findings, same as baseline).

---

### Task 1: Semantic color tokens and a safe background (`fix/background-tokens`)

Fixes critique P1 #3: light text sits on a fixed `100vh` photo with no fallback color (`index.css:141-150`), so uncovered areas render white. It also fixes the hero subtitle (`text-violet-400` over the photo, 3.0:1).

**Files:**
- Create: `src/theme/colors.js` (CommonJS so `tailwind.config.js` can `require` it), `src/theme/contrast.ts`, `src/theme/contrast.test.ts`
- Modify: `tailwind.config.js`, `src/index.css:20-22,141-150`, `src/main.css` (generated), `AGENTS.md` (Token-only styling bullet: name `src/theme/colors.js` and the tested pairs)
- Migrate (full split): `src/components/Welcome/` → `Welcome.tsx`, `useWelcome.ts`, `Welcome.style.ts`, `Welcome.type.ts`, `welcomeText.ts`, `welcomeText.test.ts`

**Interfaces:**
- Produces, used by Tasks 2–5: these Tailwind utilities, generated from `theme.extend.colors` (the default palette stays until every component is migrated):

| Token | Hex | Replaces |
|---|---|---|
| `surface-base` | `#0c0a09` | page fallback (stone-950) |
| `surface` | `#292524` | header/footer `stone-800` |
| `surface-sunken` | `#1c1917` | embed frames `stone-900` |
| `surface-section` | `#27272a` | `zinc-800` sections |
| `surface-card` | `#3f3f46` | `zinc-700` cards |
| `ink` | `#f5f5f4` | white, `stone-50/100/200` |
| `ink-muted` | `#d6d3d1` | `stone-300`, `slate-300`, `gray-200` |
| `accent` | `#c4b5fd` | `violet-300`, `violet-200`, `purple-100` |
| `accent-soft` | `#e9d5ff` | `purple-200` titles |
| `accent-strong` | `#a78bfa` | `violet-400`, `violet-500`, `purple-400` |
| `action` / `action-hover` | `#6b21a8` / `#7e22ce` | CTA `purple-800` / hover `purple-600` |
| `line` / `line-strong` | `#44403c` / `#78716c` | `stone-700` / `stone-500` borders |

- Produces: `contrastRatio(foreground: string, background: string): number` and `blendOver(top: string, bottom: string, alpha: number): string` (hex in, hex out) in `src/theme/contrast.ts`.
- Constant `SCRIM_ALPHA = 0.7` exported from `src/theme/colors.js`. The photo scrim is `surface-base` at this alpha.

- [ ] **Step 1: Run `$impeccable audit` on `src` (diagnosis only).** Record its contrast and theming findings in the PR body as the "before" state.
- [ ] **Step 2: Write `src/theme/contrast.test.ts`, failing.**
  - `contrastRatio('#ffffff', '#000000')` ≈ 21 (toBeCloseTo, 1); `contrastRatio('#777777', '#ffffff')` ≈ 4.48 (2).
  - `blendOver('#000000', '#ffffff', 0.5)` = `'#808080'`.
  - For every allowed pair, ratio ≥ 4.5 (`it.each`):
    - `surface-base`, `surface`, `surface-sunken`, `surface-section`: ink, ink-muted, accent, accent-soft, accent-strong
    - `surface-card`: ink, ink-muted, accent, accent-soft
    - `action`, `action-hover`: ink
    - `photo`, defined as `blendOver(surface.base, '#b3b3b3', SCRIM_ALPHA)`, the brightest pixel the 70%-brightness photo can produce: ink, ink-muted, accent, accent-soft
  - Expected ratios (precomputed): `accent` on photo 5.87, `accent-strong` on `surface` 5.57.
- [ ] **Step 3: Run `CI=true npm test -- contrast`.** Expected: FAIL, module not found.
- [ ] **Step 4: Implement `src/theme/colors.js`, `src/theme/contrast.ts` (WCAG 2.x relative-luminance formula), and the `tailwind.config.js` `require`.**
- [ ] **Step 5: Run the test.** Expected: PASS.
- [ ] **Step 6: Background in `src/index.css`.**
  - `html, body { background-color: theme('colors.surface.base') }`.
  - `.app-background`: `position: fixed; inset: 0`, replacing `width: 110vw; height: 100vh`; keep the filter.
  - `.app-background::after`: `content: ""; position: absolute; inset: 0; background: rgb(12 10 9 / 0.7)`.
  - Run `npm run css`.
- [ ] **Step 7: Test the Welcome text logic, failing.** `welcomeText.test.ts` for `splitAtMiddleSpace(text: string): [string, string]`:
  - `'Seu som no topo'` → `['Seu som', 'no topo']`
  - no space → `[text, '']`
  - `''` → `['', '']`
- [ ] **Step 8: Migrate Welcome to the full split.**
  - `useWelcome.ts` owns the rotation, resize and IntersectionObserver logic. It returns `{ lines: [string, string], isMobile, phase: TWelcomePhase }`, where `TWelcomePhase = 'visible' | 'exiting' | 'entering'`.
  - When `matchMedia('(prefers-reduced-motion: reduce)')` matches, swap phrases without the translate animation.
  - `Welcome.style.ts`: `title: 'extra-large-title text-ink'`, `subtitle.base` including `text-accent` (was `text-violet-400`), and `subtitle.phase` keyed by phase.
  - Rendered output is otherwise unchanged.
- [ ] **Step 9: Gate and impeccable.**
  - Run the gate.
  - Run `$impeccable audit` again; the "after" state goes in the PR body.
  - Run the detector on `/`, `/catalogo` and `/portfolio` at both viewports.
  - Take full-page screenshots at 1440×900 and 390×844 showing no white anywhere.
- [ ] **Step 10: Commit** `fix: dark page fallback, photo scrim and semantic color tokens`.

---

### Task 2: Mobile navigation (`fix/mobile-nav`)

Fixes critique P1 #1:
- The mobile panel uses `max-h-[50vh] overflow-hidden` with a 500 ms transition, and clipped "Portfolio" at 390×844 (`Header.tsx:98-122`).
- The toggle has no accessible name and no `aria-expanded`/`aria-controls` (`Header.tsx:85-91`).
- Home and Sobre are separate items for the same page.

**Files:**
- Migrate (full split): `src/components/Header/` → `Header.tsx`, `useHeader.ts` (rewrite), `Header.style.ts`, `Header.type.ts`, `Header.data.ts`; `MenuIcon.tsx` + `MenuIcon.style.ts` (icon gets `aria-hidden`)
- Test: `src/components/Header/Header.test.tsx`

**Interfaces:**
- Consumes: Task 1 tokens (`bg-surface`, `text-ink-muted`, `text-accent-strong`, `border-accent-strong`), `cx`.
- Produces: `NAV_ITEMS: INavItem[]` in `Header.data.ts`, `INavItem = { label: string; to: string }`. The items are Home `/`, Serviços `/servicos`, Catalogo `/catalogo`, Portfolio `/portfolio`. Sobre is removed from the nav; the `/sobre` route in `App.tsx` stays for existing links.

- [ ] **Step 1: Run `$impeccable adapt`** with target `src/components/Header/Header.tsx`, context mobile web at 390×844, touch and keyboard.
- [ ] **Step 2: Write `Header.test.tsx`, failing.** Render in `MemoryRouter initialEntries={['/servicos']}`.
  - Toggle `getByRole('button', { name: 'Abrir menu' })` has `aria-expanded="false"` and `aria-controls="menu-mobile"`.
  - After click: the name is `Fechar menu`, `aria-expanded="true"`, and `within(getByRole('navigation', { name: 'Menu mobile' }))` holds 4 links: Home, Serviços, Catalogo, Portfolio.
  - Esc closes the menu and focus returns to the toggle.
  - Clicking a mobile link closes the menu.
  - The desktop nav (`name: 'Menu principal'`) marks the current route link with `aria-current="page"`.
  - No link named "Sobre".
- [ ] **Step 3: Run `CI=true npm test -- Header`.** Expected: FAIL.
- [ ] **Step 4: Implement.**
  - `useHeader(): { isOpen; toggle; close; toggleRef; isActive(to: string): boolean; onHomeClick }`. Esc listener only while open; closes on `location.pathname` change. `onHomeClick` keeps the existing smooth scroll-to-top on `/` (`behavior: 'auto'` under reduced motion).
  - Panel `id="menu-mobile"` is rendered only while open: no `max-h` clipping, opacity fade with `motion-safe:` only.
  - Remove the scroll-section detection that existed only to highlight Sobre.
- [ ] **Step 5: Run the tests.** Expected: PASS.
- [ ] **Step 6: Gate and impeccable.**
  - Run the gate and the detector URL scans on all 4 routes at both viewports.
  - Screenshot 390×844 with the menu open: all 4 items visible.
  - Keyboard pass: Tab to the toggle, Enter, Tab through the links, Esc.
- [ ] **Step 7: Commit** `fix: accessible mobile menu without clipping`.

---

### Task 3: Airtable loading, error and empty states (`fix/airtable-states`)

Fixes critique P1 #4:
- Failures render `Erro ao carregar: Erro ao buscar tabela <ID>: <status>` with no retry (`airtableApi.ts:63-68`, `Catalog.tsx:61-68`, `Portfolio.tsx:53-58`, `FeaturedArtist.tsx:65-69`).
- Empty lists say only "Nenhum item encontrado".
- State changes are not announced.

**Files:**
- Modify: `src/services/airtableApi.ts` + create `airtableApi.type.ts` (`AirtableRecord` → `IAirtableRecord`), `airtableApi.test.ts`
- Replace: `src/services/useAirtablePrefetch.ts` → `useAirtableRecords.ts`, `useAirtableRecords.type.ts`, `useAirtableRecords.test.ts` (delete the old hook; its `delay` option goes away)
- Create: `src/utils/youtube.ts`, `youtube.test.ts`; `src/components/DataState/` → `DataState.tsx`, `DataState.style.ts`, `DataState.type.ts`, `DataState.data.ts`, `DataState.test.tsx`
- Migrate (full split): `Catalog/`, `Portfolio/` and `FeaturedArtist/`, each `X.tsx`, `useX.ts`, `X.style.ts`, `X.type.ts`, plus a record mapper (`catalogRecords.ts`, `portfolioRecords.ts`, `featuredArtistRecord.ts`) with its own test; `Catalog/Catalog.test.tsx` (integration)

**Interfaces:**
- Consumes: Task 1 tokens, `cx`, `AnimatePolvo` (the octopus carries the home identity into the error state).
- Produces:
  - `class AirtableError extends Error { status: number }`. The message is `Airtable request failed (<status>)` and never contains the table ID.
  - `useAirtableRecords(tableId: string, viewId?: string): IAirtableRecordsState`, where `IAirtableRecordsState = { status: TLoadStatus; records: IAirtableRecord[]; retry: () => void }` and `TLoadStatus = 'loading' | 'error' | 'empty' | 'ready'`.
  - `youtubeId(url: string): string | null`.
  - `DataState` props `IDataStateProps = { status: Exclude<TLoadStatus, 'ready'>; message: string; onRetry?: () => void }`.

- [ ] **Step 1: Run `$impeccable harden`** with target `src/components/Catalog/Catalog.tsx`. Scope: network failure, 401/404/5xx, empty table, malformed links.
- [ ] **Step 2: Write the failing tests.**
  - `airtableApi.test.ts`: `fetch` → `{ ok: false, status: 503 }` rejects with an `AirtableError` whose `status` is 503 and whose message does not contain `tbl8TfB4rZ6J8mwxM`.
  - `useAirtableRecords.test.ts` (`renderHook`, mocked `getTableRecords`):
    - resolves records → `loading` then `ready`
    - `[]` → `empty`
    - rejects → `error`
    - `retry()` after an error → `loading` then `ready`, with fetch called twice
    - **superseded response ignored:** first call resolves after `retry()`'s second call, and final records come from the second call
  - `youtube.test.ts`:
    - `https://www.youtube.com/watch?v=abc123&t=42` → `abc123`
    - `https://youtu.be/abc123` → `abc123`
    - `abc123` → `abc123`
    - `''` → `null`
  - Mapper tests: a missing `Nome` → `'Sem nome'` (existing behavior); a portfolio link via `youtu.be` → `videoId: 'abc123'`; a record with no link → `videoId: null`.
  - `DataState.test.tsx`:
    - The container has `role="status"`.
    - Error: shows the message, button `Tentar de novo` calls `onRetry`, link `Ouvir no YouTube (abre em nova aba)` has href `https://www.youtube.com/@2122prod`, `target="_blank"` and `rel="noopener noreferrer"`.
    - Empty: message plus the same link, no retry button.
  - `Catalog.test.tsx`:
    - **Recovery:** fetch → 401, error copy is shown; then the next fetch resolves 1 record, click `Tentar de novo`, and the beat name renders.
    - **No leaks:** no text matches `/tbl|401|Unauthorized/`.
- [ ] **Step 3: Run `CI=true npm test`.** Expected: the new tests FAIL.
- [ ] **Step 4: Implement.** Copy, pinned:

| Component | loading | error | empty |
|---|---|---|---|
| Catalog | `Carregando catálogo…` | `Não conseguimos carregar o catálogo agora.` | `Nenhum beat publicado por enquanto.` |
| Portfolio | `Carregando portfolio…` | `Não conseguimos carregar o portfolio agora.` | `Nenhum projeto publicado por enquanto.` |
| FeaturedArtist | `Carregando artista…` | `Não conseguimos carregar o artista em destaque agora.` | renders nothing (as today) |

  - The spinner animates only under `motion-safe:`.
  - Embeds render only when `videoId` is present.
  - Catalog stops calling `getTableRecords` directly and uses the hook.
  - Rendered layout of the ready state is unchanged apart from token colors.
- [ ] **Step 5: Run `CI=true npm test`.** Expected: PASS.
- [ ] **Step 6: Gate and impeccable.**
  - Run the gate, then the detector on `/`, `/catalogo` and `/portfolio` at both viewports.
  - Screenshot the error state by starting the dev server with `REACT_APP_AIRTABLE_TOKEN=invalid`.
  - Screenshot the ready state with the real token.
- [ ] **Step 7: Commit** `fix: friendly Airtable error, empty and retry states`.

---

### Task 4: Contact path (`feat/contact-path`)

Fixes critique P1 #2:
- `/servicos` ends with no way to act.
- "Fale com a gente" opens an Instagram DM on desktop but the profile on mobile, through `window.open` with no external cue (`About.tsx:82-108`).
- The footer email is plain text (`Footer.tsx:14`).

Because Services is migrated, its disclosures also get `aria-expanded`, "Leia menos", and collapsed content removed from the a11y tree (AGENTS.md accessibility rule). `text-violet-500` fails AA at 3.52:1 and moves to `accent-strong`.

**Files:**
- Create: `src/components/ContactCta/` → `ContactCta.tsx`, `ContactCta.style.ts`, `ContactCta.type.ts`, `ContactCta.data.ts`
- Migrate (full split): `About/` (`About.tsx`, `About.style.ts`; no hook needed once `window.open` is gone), `Services/` (`Services.tsx`, `useServices.ts`, `Services.style.ts`, `Services.type.ts`, `Services.data.ts`), `Footer/` (`Footer.tsx`, `Footer.style.ts`, `Footer.data.ts`)
- Test: `Services/Services.test.tsx`, `ContactCta/ContactCta.test.tsx`, `Footer/Footer.test.tsx`

**Interfaces:**
- Consumes: Task 1 tokens (`bg-action`, `hover:bg-action-hover`, `text-ink`, `text-accent-strong`, `bg-surface-section`, `bg-surface-card`), `cx`.
- Produces:
  - `INSTAGRAM_DM_URL = 'https://ig.me/m/2122producoes'` in `ContactCta.data.ts`. This is Instagram's direct-message link, and it works on web and in the app. Hugo confirms it is the intended inbox.
  - `ContactCta` props `IContactCtaProps = { label: string; className?: string }`. It renders `<a href={INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer">{label} ↗</a>`, with the arrow `aria-hidden` and an sr-only suffix ` (abre o Instagram em nova aba)`.

- [ ] **Step 1: Run `$impeccable clarify`** with target `src/components/Services/Services.tsx`. Audience: independent Brazilian artists deciding whether to hire 2122.
- [ ] **Step 2: Write the failing tests.**
  - `ContactCta.test.tsx`: the link's accessible name is `Fale com a gente (abre o Instagram em nova aba)`, with href `https://ig.me/m/2122producoes`, `target="_blank"` and `rel="noopener noreferrer"`.
  - `Services.test.tsx`:
    - Disclosure: the first `Leia mais` button (under `Músicas`) has `aria-expanded="false"` and `aria-controls` pointing at its panel, and `Captação de voz` is not in the document.
    - After click: the name is `Leia menos`, `aria-expanded="true"` and the text is visible.
    - Contact links: 4 links point to `https://ig.me/m/2122producoes`, one per service plus the page-end CTA.
  - `Footer.test.tsx`: link `2122producoes@gmail.com` has href `mailto:2122producoes@gmail.com`.
- [ ] **Step 3: Run `CI=true npm test`.** Expected: FAIL.
- [ ] **Step 4: Implement.**
  - `Services.data.ts` holds the three services (title, intro, details intro, bullets as `{ term, rest }`, closing paragraph, `ctaLabel`), with copy moved verbatim from `Services.tsx:68-236`.
  - The `ctaLabel` values are `Falar sobre música`, `Falar sobre marketing` and `Falar sobre jurídico`; the page-end CTA is `Fale com a gente`.
  - `useServices` keeps the scroll-into-view on expand, with `behavior: 'auto'` under reduced motion.
  - Collapsed panels use the `hidden` attribute, so the 1000 ms `max-h` animation is removed.
  - Both About buttons become `ContactCta label="Fale com a gente"`, keeping their responsive placement. Drop `opacity-80`: at full opacity, ink on `action` is 7.99:1.
  - Footer social links move to `Footer.data.ts`.
- [ ] **Step 5: Run `CI=true npm test`.** Expected: PASS.
- [ ] **Step 6: Gate and impeccable.**
  - Run the gate, then the detector on `/` and `/servicos` at both viewports.
  - Screenshot `/servicos` with one service expanded at both sizes.
- [ ] **Step 7: Commit** `feat: single Instagram contact path with CTAs on every service`.

---

### Task 5: Polish and re-critique (`chore/polish`)

**Files:** only files changed by Tasks 1–4, plus defects the detector or the polish pass finds in them. No new features, no P2 items (portfolio curation, catalog scroll cues). Any component touched here is migrated to the full split per AGENTS.md.

- [ ] **Step 1: Run `$impeccable polish`** on `src`.
  - Read the latest critique snapshot via `impeccable critique-storage latest src --json`.
  - Check every route at 1440×900 and 390×844.
  - Fix drift between the four PRs: token use, spacing of the new CTAs and DataState, focus styles.
- [ ] **Step 2: Gate.** Detector totals per route must be ≤ baseline.
- [ ] **Step 3: Commit** `chore: polish after critique fixes` and open the PR.
- [ ] **Step 4: After merge, the orchestrator runs `$impeccable critique` on the whole site** with two isolated `task` agents, persists the snapshot, and reports the trend against 16/32.
