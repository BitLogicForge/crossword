# Innovations and Roadmap for Crossword React App

This document proposes product, UX, and technical enhancements tailored to the current codebase (React + TS + Vite + MUI, Redux Toolkit, i18n, simple generator in `src/logic/mycross.ts`). Use it as a backlog and prioritization guide.

## Quick snapshot of current features
- Grid generation: places words with simple feasibility checks and fills empty cells with random letters (`MyCrosswordGenerator`).
- Word management: add/remove words; indicates words that couldn’t be placed.
- UI: responsive with MUI; dark/light theme toggle; language selector; basic grid display.
- i18n: multiple locales configured; detection enabled (debug currently on).
- Redux store slices for app/crossword/notifications.

## Product/UX innovations
1) Crossword Engine 2.0
- Backtracking + scoring: maximize intersections, penalize isolated letters.
- Symmetry & blocks: support American-style symmetry and `SYMBOL.BLOCKED` placement.
- Constraints: no adjacent non-intersecting letters; min-intersection requirements.
- Reproducible seeds: generate deterministic puzzles from a seed.
- Difficulty presets: tune width/height, word bank size, intersection score.

2) Clues, numbering, and play mode
- Extend `TWord` with `clue?: string` and support Across/Down numbering.
- Active word highlighting; keyboard navigation (arrow keys, Tab, Backspace).
- Hints: reveal letter/word, check correctness, show conflicts.
- Timer, streaks, and completion stats.

3) Import/Export & Sharing
- JSON schema for puzzles (grid, blocks, placements, words, clues, seed, locale).
- Shareable URL (encoded state/seed) and local save/load.
- Printable and PDF export (print-friendly layout).
- Image export (PNG/SVG) of the finished grid.
- Optional: .puz compatibility (stretch).

4) Word list tools
- Bulk add (paste newline/CSV), de-dupe, profanity filter (configurable).
- Per-word editing (label/clue), reordering, “required” flag for must-place.
- Dictionary check (per locale) and auto-suggest crossings.

5) Accessibility & UX polish
- Full keyboard control and ARIA labels for grid cells.
- High-contrast mode, adjustable cell size/zoom slider.
- Announce conflicts and placement failures via live regions.

6) PWA & Offline
- Installable PWA, offline caching of core assets and recent puzzles.
- Offline word bank per language.

7) Internationalization
- Disable i18n debug in prod; lazy-load resources.
- Right-to-left language support; locale-specific word banks.

8) Theming
- Unify theming (see Tech section) and add a Theme Editor (primary/secondary, fonts, cell size).
- Persist user theme in localStorage.

9) Social & discovery
- Share finished puzzles and seeds; daily challenge seed.
- Leaderboards (privacy-friendly; optional, via backend or serverless).

## Technical improvements
1) Code structure & theming
- Consolidate theme logic: `App.tsx` creates a theme and sets options; there’s also `providers/ThemeProvider.tsx`. Pick one approach (prefer single ThemeProvider in App) and remove duplication.
- Move theme options to a single source; ensure palette tokens are used consistently in components.

2) Generator quality (`src/logic/mycross.ts`)
- Introduce scoring and choose placement by best score, not random.
- Implement backtracking when no placements remain.
- Track blocked cells and adjacency rules; optionally auto-place blocks for symmetry.
- Add seedable RNG.
- Add unit tests and property tests for placement validity.

3) State & persistence (`src/stores/slices/crossSlice.ts`)
- Add `clue` field to words; store puzzle metadata (title, author, seed, locale).
- Undo/redo stack for edits and placements.
- LocalStorage persistence (gridSize, words, preferences, last puzzle).
- Validation: trim/uppercase once; reject duplicates; configurable max length.

4) Grid & interaction (`src/components`)
- `CrossGrid`: render numbering, block cells, selection state, and caret.
- `LetterCell`: support focus/selection, aria-attrs, keyboard handling; reduce random animation on every render for performance.
- `WordsList`: inline edit, drag-and-drop reorder, status badges (placed/required/no-place), filter.
- `WordAdd`: bulk mode, import from file, validation feedback.

5) i18n & config (`src/i18n.ts`)
- Turn off `debug` in production; load only needed namespaces; refine detection order.

6) Performance & quality
- Memoize heavy renders; consider virtualization for large grids.
- ESLint/Prettier config; strict TS options; React Profiler checks.
- CI via GitHub Actions (lint, build, test). Precommit hooks (lint-staged).

7) Analytics & privacy
- Optional privacy-friendly analytics (Plausible/Umami) with a clear opt-in.

## Minimal puzzle JSON schema (proposal)
```json
{
  "title": "My Puzzle",
  "author": "bitlogicforge",
  "locale": "en",
  "seed": "abc123",
  "width": 15,
  "height": 15,
  "blocks": [[x, y], [x, y]],
  "words": [
    { "id": "w1", "label": "APPLE", "clue": "Fruit" }
  ],
  "placements": [
    { "wordId": "w1", "x": 0, "y": 0, "direction": "horizontal" }
  ]
}
```

## Prioritized roadmap (Impact ⬆ / Effort ⬇ first)
- High impact, low-medium effort
  - Disable i18n debug in prod; persist theme and grid preferences.
  - Bulk add words, de-duplication, and validation.
  - Scored placement (best-of candidates) before full backtracking.
  - Keyboard navigation + active word highlight.
- Medium impact
  - Shareable URL with seed/state; printable view; JSON import/export.
  - Timer + completion stats; hints (check/reveal letter/word).
- Larger items
  - Full backtracking generator with symmetry and blocks.
  - PWA offline; theme editor; .puz support; leaderboards.

## File-level change hints
- `src/logic/mycross.ts`: add scoring function, seedable RNG, backtracking; support `SYMBOL.BLOCKED` and adjacency rules.
- `src/stores/slices/crossSlice.ts`: extend `TWord` to `{ id, label, clue? }`; add undo/redo and persistence; de-dupe on add.
- `src/components/CrossGrid.tsx`: add numbering and selection; render blocks; performance memoization.
- `src/components/LetterCell.tsx`: focus/selection props; deterministic animations or reduced motion; aria-labels.
- `src/components/WordAdd.tsx`: bulk input textarea mode; detect duplicates; CSV/newline parsing.
- `src/components/WordsList.tsx`: inline edit, reorder (dnd-kit), badges for status.
- `src/i18n.ts`: set `debug: false` in production; lazy load.
- `src/App.tsx` and `src/providers/ThemeProvider.tsx`: consolidate theme.

## Next steps (suggested 1–2 sprints)
- Sprint 1
  - Persist preferences and words to localStorage.
  - Bulk add + validation + de-dupe.
  - i18n debug off in prod; add RU/PL word banks examples.
- Sprint 2
  - Scored placements + keyboard navigation + active word highlight.
  - JSON import/export + shareable URL.

— End of proposals —
