# Game Library

A single-page app for managing a personal video game collection. Add titles with platform and status, rate them, add notes, and search or filter the list. All data is stored locally and can be exported or imported as JSON.

---

## Features

| Area | Description |
|------|-------------|
| **Library** | Add, edit, and remove games. Fields: title, platform, status (Backlog / Playing / Completed / Dropped), 1–5 star rating, notes. |
| **Search & filter** | Full-text search on title and platform; filter by status with counts per tab. |
| **Export** | Download the full library as a pretty-printed JSON file. Safe to open and edit in any editor. |
| **Import** | When the list is empty, an import control appears; load a previously exported JSON file to restore or migrate data. |
| **UI** | Dark theme, responsive layout, touch-friendly status tabs on mobile. |

Data is kept in the browser’s **localStorage**; no backend or account required.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Runtime | React 19, TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 |
| Components | shadcn (Base UI), Lucide React icons |

---

## Getting started

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build (output in `dist/`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Project structure

```
src/
├── components/     # React components
│   ├── GameHeader.tsx
│   ├── GameList.tsx
│   ├── GameTabs.tsx
│   ├── SearchBox.tsx
│   ├── AddEditGameForm.tsx
│   └── ui/         # shadcn primitives
├── hooks/
│   └── useGameLibrary.ts   # Library state + localStorage sync
├── lib/
│   ├── gameModel.ts        # Types, status/config, createGame
│   ├── storage.ts          # loadGames / saveGames
│   └── exportGames.ts      # getExportContent, parseExportedFile, downloadTextFile
├── App.tsx
└── index.css
```

`index.html` mounts the app and sets the dark theme via `class="dark"` on `<html>`.

---

## Data and portability

- **Storage:** The library is persisted in `localStorage` under the key `game-library`.
- **Export:** Header download button writes the current list as `game-library.txt` (JSON). Format is a single JSON array of game objects; you can edit it and re-import.
- **Import:** Shown only when there are no games. Accepts a JSON file that parses to an array of objects with at least `title` and `platform`; missing fields are defaulted and invalid entries skipped.

---

## License

MIT
