# Uttar Kalikata Sarbojanin Durgotsav Samity — Website

The official website for Uttar Kalikata Sarbojanin Durgotsav Samity (UKSD), a
Durga Puja committee in North Kolkata established in 1932. Built with React +
Vite + Tailwind CSS v4, originally scaffolded in Figma Make.

---

## 1. Getting Started (VS Code / Local Development)

### Prerequisites
- **Node.js** — v20 or newer recommended (check `.mise.toml` for the pinned version)
- **A package manager** — the project ships a `pnpm-lock.yaml`, so **pnpm** is
  preferred. `npm` also works fine (this update was built and verified with
  `npm`); just don't mix lockfiles — pick one and stick with it.

### Install & run

```bash
# with pnpm (recommended — matches the committed lockfile)
pnpm install
pnpm dev

# — or — with npm
npm install
npm run dev
```

The dev server starts on **http://localhost:8443** (port is configurable via
the `PORT` environment variable — see `vite.config.ts`).

### Other scripts

```bash
pnpm build      # production build → dist/
pnpm preview    # serve the production build locally
pnpm format     # run oxfmt
```

### Opening in VS Code
1. Unzip this folder and open it in VS Code.
2. Run `pnpm install` (or `npm install`) in the integrated terminal.
3. Run `pnpm dev` and open the printed local URL in your browser.
4. Recommended extensions: **ESLint**, **Tailwind CSS IntelliSense**,
   **Prettier** (optional — the project uses `oxfmt` for formatting).

---

## 2. Project Structure

```
├── index.html                  Vite HTML shell (populated by site.json at build time)
├── package.json                 Scripts & dependencies
├── vite.config.ts               Vite + React + Tailwind + Figma Make plugins
├── tsconfig.json                TypeScript config (path alias: @ → ./src)
├── public/
│   └── favicon.png              Site favicon (from the new committee logo)
├── src/
│   ├── main.tsx                 React entry point
│   ├── index.css                Tailwind import, fonts, global keyframes
│   ├── App.tsx                  The entire site — single-component app
│   └── imports/
│       ├── uksd_logo.png                              Committee logo (new)
│       ├── Shambhu_saha.png                            2025 theme artist photo
│       ├── Dhiman_Sutar.png                             2026 theme artist photo
│       └── mythologychallengeryt-...-125241.mp3        Dhak (drum) audio for the floating music button
└── .figma/make/site.json        Page <title>, meta description, favicon path, robots
```

`src/App.tsx` is intentionally a single large file (~1000 lines) containing
every section of the page (Navbar, Hero, About, Grand Themes, Schedule,
Gallery, Social Media, Work With Us, the new placeholder tabs, Contact,
Footer). Section boundaries are marked with `{/* ── SECTION NAME ── */}`
comments to make it easy to jump around.

---

## 3. What Changed in This Update

| # | Request | What was done |
|---|---|---|
| 1 | Theme artist photos not properly framed | Adjusted `objectPosition` and card height on both artist photo frames (Shambhu Saha & Dhiman Sutar) in the **Grand Themes** section so both faces are fully visible, not cropped, at all screen widths. |
| 2 | Remove 2026 theme note | The "THEME NOTE / TO BE ANNOUNCED SOON" box plus its paragraph was replaced with a single line: **"COMING SOON... TO BE ANNOUNCED."** |
| 3 | Remove "In Praise of the Sacred" | The 2025 theme's English subtitle now reads just **"Maha Alaye Maa"**. |
| 4 | Replace committee logo | The old 🔱 emoji-in-a-circle placeholder logo (navbar + footer) was replaced with the new circular committee emblem you provided (`src/imports/uksd_logo.png`). It's also now used as the browser favicon. |
| 5 | Update background theme to match new logo | The color palette (see `const C = {...}` near the top of `App.tsx`) was rebased around the new logo's warm terracotta/clay/gold tones — the base background shifted from a cool near-black maroon to a warm brown-black, with a terracotta radial vignette added behind the hero and warmer gradients applied to the Grand Themes and Vision & Mission sections and the countdown bar. |
| 6 | Add 3 new nav tabs | **Advertise With Us**, **Priviledge Form**, and **Watch With Us** were added to the navbar (desktop + mobile menu) and the footer's Quick Links / Community columns. Each links to a real section on the page (`#advertise-with-us`, `#priviledge-form`, `#watch-with-us`) that currently shows only a heading and "Content coming soon." — ready for you to fill in later. |

### Notes on specific decisions
- **Image framing (#1):** the original crop bug was caused by a **fixed pixel
  height** (`height: 340`) on a container whose **width** flexes with the
  responsive grid. That combination produces a different effective aspect
  ratio at every screen width, so no single `object-position` value could
  frame the face correctly everywhere — it looked fine at some widths and
  cut off chins/foreheads at others. The fix replaces the fixed height with
  `aspectRatio: '4 / 5'`, so the crop window always scales proportionally
  with the card's actual rendered width. Combined with tuned `object-position`
  values (`center 15%` for Shambhu Saha's portrait photo; Dhiman Sutar's
  more square photo needs no vertical adjustment) both faces now stay fully
  framed at every breakpoint, not just the one they were eyeballed at. If you
  swap in different photos later, you may need to re-tune the vertical
  `object-position` percentage for the new photo's face position, but the
  `aspectRatio` approach itself will keep it consistent across screen sizes.
- **Logo (#4):** the logo was resized to 512×512px and re-compressed for web
  use; a separate 128×128px version was generated for the favicon. The
  original high-resolution file you uploaded is not included in the zip to
  keep the download size down — let me know if you'd like the full-resolution
  version added back into `src/imports/`.
- **New tabs (#6):** the tab label **"Priviledge Form"** is kept spelled
  exactly as you requested (rather than "Privilege Form") to match your
  intended wording — happy to correct the spelling if it was a typo.

---

## 4. Adding Content to the New Tabs

Each new tab is currently rendered by a shared `PlaceholderSection` helper
component (defined just above `export default function App()` in `App.tsx`).
To add real content to, say, **Advertise With Us**:

1. Find this block in `App.tsx` (search for `advertise-with-us`):
   ```tsx
   <PlaceholderSection id="advertise-with-us" eyebrow="Partner With Us" title="Advertise With Us" accent={C.crimson} />
   ```
2. Replace it with a full `<section id="advertise-with-us">...</section>` —
   you can copy the structure of an existing section (e.g. **Work With Us** or
   **Contact**) as a starting template, since they already use the same
   design language (colors, fonts, spacing) defined by the `C` and `FONT_*`
   constants at the top of the file.
3. Repeat for `priviledge-form` and `watch-with-us`.

---

## 5. Deployment

This is a static Vite build — `pnpm build` outputs a fully static `dist/`
folder that can be deployed to any static host (Vercel, Netlify, GitHub
Pages, Cloudflare Pages, etc.). No server-side code is involved.

---

## 6. Credits

- Fonts: Cinzel Decorative, Cinzel, Poppins (Google Fonts)
- Gallery/hero photography: Unsplash (placeholder images — swap with your own
  event photography in `GALLERY_IMAGES` and the hero `<img src>` in `App.tsx`)
- Dhak audio: user-provided asset in `src/imports/`
