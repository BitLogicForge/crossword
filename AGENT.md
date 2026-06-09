# 🧩 Agent & Developer Onboarding Guide

Welcome to the **Crossword React App** codebase! This document is designed for AI agents and developer colleagues to immediately understand the project structure, state flow, core crossword-generation algorithm, and roadmap.

---

## 🗺️ Project Overview

The **Crossword React App** is a client-side, open-source crossword puzzle generator built with **React 19**, **TypeScript**, **Vite**, **Material UI (MUI)**, **Redux Toolkit (RTK)**, and **i18next**. 

Since there is no backend architecture, the puzzle generation, list management, and user configurations are executed entirely in the user's browser, making the app highly suited for static hosting platforms like GitHub Pages.

- **Primary Goal:** Enable users to feed in custom word banks, adjust grid sizes, dynamically generate/regenerate crossword layouts, and toggle full grid completions (filled with random letters).
- **Live Demo:** [bitlogicforge.github.io/crossword](https://bitlogicforge.github.io/crossword)

---

## 📁 Codebase Layout

Understanding where things live is crucial. Here is an annotated directory map:

```yaml
crossword/
├── .devcontainer/        # Docker container config for isolated cloud development
├── public/               # Static assets (icons, OG images, favicon, translations placeholder)
├── src/
│   ├── assets/           # React component assets (images, SVGs)
│   ├── components/       # Reusable UI parts & layout pieces
│   │   ├── CrossGrid.tsx        # The grid visual container (render loop)
│   │   ├── LetterCell.tsx       # Individual cell rendering, using framer-motion
│   │   ├── LanguageSelector.tsx # Controls i18n locale switching
│   │   ├── WordAdd.tsx          # Dynamic word insertion forms
│   │   └── WordsList.tsx        # View list of current puzzle words
│   ├── constants/        # System-wide variables and enums
│   │   └── Cgeneral.ts          # Severity levels, sizes, and layout SYMBOLs ('.', '#')
│   ├── data/             # Starter assets
│   │   └── initial.ts           # Basic 5-word seed array ('apple', 'banana', etc.)
│   ├── locales/          # Multilingual text templates
│   │   ├── en.json, pl.json, fr.json, de.json, es.json, it.json, ru.json
│   │   └── index.ts             # Resources bundle mapping
│   ├── logic/            # The algorithmic cores
│   │   └── mycross.ts           # MyCrosswordGenerator class
│   ├── notifications/    # Custom overlay notification manager
│   │   ├── notificationSlice.ts # Controls active list & config overlays
│   │   └── NotificationProvider.tsx # High-level UI wrapper
│   ├── pages/            # Viewport templates
│   │   └── MainPage.tsx         # The main grid workspace and layout grid
│   ├── providers/        # Third-party context setups
│   ├── stores/           # Redux global slices
│   │   ├── slices/
│   │   │   ├── appSlice.ts      # Global theme selection
│   │   │   └── crossSlice.ts    # Puzzle state & word bank lists
│   │   ├── hooks.ts             # Typed React-Redux hook selectors/dispatchers
│   │   └── store.ts             # Store aggregator
│   ├── types/            # TypeScript type descriptors
│   │   └── general.ts           # Global interfaces (e.g. TWord)
│   ├── utils/            # Helper scripts
│   │   └── utils.ts             # Helper utils (e.g. random ID generation)
│   ├── App.tsx           # Entry application layout & theme constructor
│   ├── index.css         # Reset styles & root overrides
│   ├── main.tsx          # App mounter
│   └── theme.ts          # Core styling configurations (Palette colors & responsive sizes)
```

---

## ⚙️ Core Algorithmic Engine (`src/logic/mycross.ts`)

The placement engine revolves around the `MyCrosswordGenerator` class. It operates sequentially on the provided word list:

### 1. Initialization
- The generator takes a `width`, `height`, and an array of `TWord[]`.
- It resets the state grid coordinates to `SYMBOL.EMPTY` (`'.'`) and maps the input words to uppercase.

### 2. Candidate Scan & Placement
- For each word, the generator performs a full scan of the 2D matrix via `listPossiblePlacements(word)`.
- It tests layout boundaries and letter overlaps both horizontally (`DIRECTION.H`) and vertically (`DIRECTION.V`):
  ```typescript
  // checks whether a cell is either empty or matches the character exactly
  if (this.cross.grid[y][x + i] !== SYMBOL.EMPTY && this.cross.grid[y][x + i] !== word[i]) {
    return false; // Collision detected
  }
  ```
- If placements exist, it chooses one **completely at random**:
  ```typescript
  const placement = placements[Math.floor(Math.random() * placements.length)];
  this.placeWord(placement);
  ```
- If no matches fit, it registers the word into the `noPlace` array (communicating failure back to Redux).

### 3. Grid Filling
- If `showFilled` is checked, the generator duplicates the solved grid and replaces every remaining `SYMBOL.EMPTY` (`'.'`) cell with a randomly generated capital letter from `A-Z`.

---

## 💾 State Management Strategy

We use **Redux Toolkit** to synchronize state. The stores are partitioned into three dedicated slices:

| Slice | Key State Items | Primary Reducers |
| :--- | :--- | :--- |
| **`cross`** | `gridSize` (`width`, `height`), `currentGrid`, `currentGridFilled`, `showFilled`, `words` (active bank), `noPlace` (unplaced bank) | `setGridWidth`, `setGridHeight`, `addWordToList`, `removeWordFromList`, `toggleFilledGrid` |
| **`app`** | `isDarkTheme`, `themeOptions` cache | `toggleTheme`, `setDarkTheme`, `setThemeOptions` |
| **`notifications`** | `notifications` (active arrays), queue configs | `addNotification`, `removeNotification`, `clearAllNotifications` |

---

## 🎨 Styling & Theming System

The app utilizes custom-tailored **Material UI (MUI)** configurations:
- **Primary Color:** Forest Green (`#2e7d32` / `#60ad5e` / `#005005`)
- **Secondary Color:** Warm Amber (`#f9a825` / `#ffd95b` / `#c17900`)
- **Dynamic Switcher:** `App.tsx` dynamically generates and feeds an updated `theme` object into the `<ThemeProvider>` depending on `app.isDarkTheme`.
- **Transitions:** Individual cells utilize `framer-motion` transitions to scale and shift cell backgrounds seamlessly upon regeneration.

---

## 🛠️ Developer Tooling Commands

Below is a reference cheat-sheet for running task scripts:

```bash
# 1. Install Project Dependencies
npm install

# 2. Run local hot-reloaded dev server (Vite)
npm run dev

# 3. Perform manual static type checks
npm run type-check

# 4. Check ESLint conformance
npm run lint

# 5. Automatically fix minor style violations (ESLint + Prettier)
npm run lint:fix
npm run format

# 6. Build the static production assets (outputs to /dist)
npm run build

# 7. Deploy directly to GitHub Pages hosting
npm run deploy
```

---

## 🚀 Future Engineering Roadmap (For Agents & Devs)

If you are an agent assigned to modify this codebase, consult `INNOVATIONS.md` for full context. Here is a quick summary of the highest-priority improvements to tackle next:

1. **Crossword Engine 2.0 (High Priority / High Complexity)**
   - Replace the *random-placement* strategy in `src/logic/mycross.ts` with a **backtracking and scored constraint solver**.
   - Score placements based on how many intersections they create (prefer dense connections) and penalize isolated blocks.
   
2. **Local Storage Persistence**
   - Save the active word lists, preferred grid sizes, and chosen theme inside standard browser `localStorage` to retain state across sessions.

3. **Multi-Input Bulk Insert**
   - Enhance `src/components/WordAdd.tsx` to handle newline/CSV bulk inserts, automatic word de-duplication, and input cleaning.

4. **Active Navigation & Selection Highlight**
   - Add focus outlines, keyboard arrow-key navigation on `LetterCell.tsx`, and highlight the currently active word across the grid to prepare the app for interactive gameplay.
