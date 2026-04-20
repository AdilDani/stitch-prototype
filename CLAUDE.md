# STITCH — Prototype Context

This document is the complete specification for the STITCH frontend prototype. Hand it to Claude Code as context when iterating.

---

## What STITCH is

A platform for **serialized immersive fiction**. Authors publish chapter-by-chapter with scrollytelling (splash art + audio envelopes that ramp volume normal-distribution-style around a peak paragraph). Readers get a spoiler-safe community experience and gamified reading habits (streaks, badges). Each novel lives inside its own themed "enclosure" — a sub-experience distinct from the global hub.

Two conceptual levels:

1. **NovelSite** — the global hub. Discover, library, global discussions, global media, profile. Uses the base paper/ink palette.
2. **Specific Novel** — the enclosed themed experience per novel. Each novel can override the palette (default dark for STITCH_ENGINE). Global nav fades out; a hidden novel-themed navbar replaces it, revealed by hovering the top edge.

Author side: **Director's Suite** (a.k.a. "Prose & Protocol"). Dashboard, chapter editor with audio-envelope controls, CMS page-builders for novel home + community, story bible + asset library.

---

## Tech shape (prototype, not final app)

- Static HTML/CSS/JS. No framework, no build step.
- Multiple linked HTML files in one folder.
- Shared design tokens in `css/core.css`.
- Shared hidden-nav component in `css/novel-nav.css`.
- Mock data + localStorage persistence in `js/state.js`.
- Shared UI helpers + procedural SVG art in `js/ui.js`.
- All art is inline SVG — no image files, works offline.

Final app stack (for reference, not prototype): Spring Boot Java + PostgreSQL + Redis + MinIO + Next.js/React.

---

## File inventory (21 HTML files)

### Auth (3)
- `login.html` — Google OAuth + email OTP entry
- `otp.html` — 6-digit code verification
- `join-code.html` — Private invite code entry

### NovelSite hub, mobile-first (5)
- `home.html` — User dashboard: hero, countdowns, library, schedule
- `discover.html` — Catalog with search/filter/trending
- `global-discussions.html` — Global forum with spoiler-safe filtering
- `global-media.html` — Global fanart/memes/official tabs
- `profile.html` — User profile, streak, honors

### Specific novel, mobile-first (6)
- `novel-home.html` — CMS-driven landing page (from scratch)
- `chapters.html` — Act-grouped chapter list
- `read.html` — Immersive scrollytelling reader
- `novel-discussions.html` — Per-novel forum
- `novel-media.html` — Per-novel gallery
- `novel-community.html` — CMS-driven lore page

### Director's Suite, desktop-first (5)
- `author-dashboard.html` — Metrics + direct actions
- `author-editor.html` — Chapter editor (signature page — audio envelope is the hero feature)
- `author-cms-home.html` — Drag-drop CMS for novel home (from scratch)
- `author-cms-community.html` — Drag-drop CMS for community page (from scratch)
- `author-story-bible.html` — Wiki + asset library (from scratch)

### Edge state (1)
- `locked.html` — 404/spoiler-guard state (from scratch)

### Map (1)
- `index.html` — Prototype entry point, links to all 20 pages

---

## Design system — exact tokens

### Fonts (Google Fonts, loaded in `core.css`)
- `--font-display`: **Archivo** (400, 500, 600, 700, 800, 900) — UI type, buttons, headings
- `--font-body`: **Archivo** — body text in the hub
- `--font-editorial`: **Fraunces** (italic variants included) — serif display, pull quotes, entry body text in story bible, reader prose
- `--font-mono`: **JetBrains Mono** — kickers, labels, metadata, tech details

### Palette — base (NovelSite hub)
| Token | Value | Use |
|---|---|---|
| `--ink` | `#0a0a0a` | Primary text, borders, strong backgrounds |
| `--ink-2` | `#1a1a1a` | Slightly lifted dark surfaces |
| `--ink-3` | `#2a2a2a` | Even lifted |
| `--paper` | `#f4f2ec` | Primary background, warm off-white |
| `--paper-2` | `#eae7dd` | Card backgrounds, subtle fills |
| `--paper-3` | `#d8d4c7` | Dividers, darker fills |
| `--line` | `rgba(10,10,10,0.12)` | Hairline dividers |
| `--line-strong` | `rgba(10,10,10,0.28)` | Stronger dividers, input borders |
| `--muted` | `rgba(10,10,10,0.56)` | Muted text |
| `--muted-2` | `rgba(10,10,10,0.38)` | More muted text |
| `--accent` | `#d14829` | **Coral red — single signal color.** Rubberstamps, CTAs, active states, signature shadows |
| `--accent-2` | `#f2b705` | Amber highlight, sparingly |

**Critical:** `#d14829` is used *sparingly*. It's the single voice of emphasis. Never use it for body text, never use it for large surfaces, never for decorative labels, breadcrumb separators, or status numbers. It is valid ONLY for: primary CTAs (buttons that initiate action), active tab/filter underlines, hard shadows on interactive elements, spoiler-boundary indicators, live/pulsing dots, rubberstamp tags, and semantic quote accent borders (matching `locked.html`'s `subline` treatment). On any given screen, only one or two coral elements should be visible at a time.

For elements that were coral but don't meet the above criteria, replace with: `rgba(237,237,237,0.5)` for muted text/labels, `rgba(237,237,237,0.2)` for borders, `#ededed` for emphasis text, `rgba(237,237,237,0.45)` for progress fill (status bars).

### Palette — novel-scope dark (default for STITCH_ENGINE and other dark novels)
Activate with `.novel-scope` class on a container, or inline style override.

| Token | Value |
|---|---|
| `--novel-ink` | `#ededed` (text) |
| `--novel-paper` | `#0d0d0f` (background) |
| `--novel-accent` | `#d14829` (same coral) |

On dark-scope pages, muted tones shift to `rgba(237,237,237, 0.x)`.

### Grain texture
Applied globally via `body::before` pseudo-element:
- SVG `<filter>` with `fractalNoise`, baseFrequency 0.9
- `mix-blend-mode: multiply` on light pages, `overlay` or higher opacity on dark pages
- Default opacity ~0.12, heavier on dark/immersive pages: novel-scope pages use 0.18 with `mix-blend-mode: overlay`. `locked.html` uses 0.14 with `contrast(170%) brightness(110%)`.

### Signature shadows — "hard shadow, no blur"
Used on hover/interactive elements:
```css
box-shadow: 6px 6px 0 var(--accent);   /* on light surfaces */
box-shadow: 6px 6px 0 var(--ink);      /* alternative */
box-shadow: 6px 6px 0 #ededed;         /* on dark pages */
```
Hover pattern:
```css
transition: transform .15s, box-shadow .15s;
:hover { transform: translate(-3px,-3px); box-shadow: 9px 9px 0 var(--accent); }
:active { transform: translate(0,0); box-shadow: 0 0 0 var(--accent); }
```

### Typography rules
- **Display headings** — Archivo 900, letter-spacing -0.03em to -0.05em, line-height 0.85–0.95. Aggressive, tight, all caps often.
- **Kickers / labels** — JetBrains Mono, 10–11px, letter-spacing 0.14em–0.2em, uppercase, colored `--muted` or `--accent`.
- **Editorial pull-quotes / body prose in reader / story bible entries** — Fraunces italic, 16–20px, line-height 1.5–1.7.
- **UI buttons** — Archivo 800, 10–12px, letter-spacing 0.14em, uppercase.

### Layout constraints
- `--nav-h: 60px` — global navbar height
- `--max-w: 1280px` — desktop content max width
- `--mobile-w: 440px` — mobile content max (legacy token, kept for reference)
- **All reader/hub pages**: fluid single-column layout. Default max-width 720px centered, no side borders. At ≥1200px: max-width scales to 760px. `novel-home.html` and `read.html` additionally reserve side rails at ≥1200px (empty for now, content TBD).
- **All author pages**: desktop-first, assume ≥1280px, grid-based 3-column layouts.

---

## Shared components

### `css/novel-nav.css` — hidden hover nav
Used on all 5 novel-scope pages (`novel-home`, `chapters`, `novel-discussions`, `novel-media`, `novel-community`). **Not on `read.html`** — reader is even more immersive, no nav at all.

Structure:
- `.nnav-host` — fixed top, invisible 24px hotzone across the full width
- Pulsing 3px `--novel-accent` bar at the very top as an indicator
- On `mouseenter` (or focus/scroll up), slides down a nav bar with:
  - Novel wordmark on the left
  - Tab links: HOME / CHAPTERS / DISCUSSIONS / MEDIA / COMMUNITY
  - Back-arrow icon top-left (mirror behavior) to return to NovelSite (`home.html`)
- Mounted via `mountNovelNav({ novelId, active: 'home' })` from `js/ui.js`.

### Back-arrow "mirror"
On novel-scope pages and `read.html`:
```css
.back-mirror {
  position: fixed; top: 16px; left: 16px; z-index: 150;
  width: 38px; height: 38px;
  background: rgba(10,10,10,0.65); backdrop-filter: blur(6px);
  border: 1px solid rgba(237,237,237,0.25);
}
```
Links back to the novel home (from chapters/media/etc.) or to NovelSite home (from `novel-home.html`).

### Spoiler blur component
Used in `global-discussions`, `global-media`, `novel-discussions`, `novel-media`.
```css
.spoiler-content { filter: blur(14px); }
.spoiler-overlay {
  position: absolute; inset: 0;
  display: grid; place-items: center;
  font-family: var(--font-mono); /* "TAP TO REVEAL · CH. X · SPOILER" */
}
```
Triggers when `post.chapter > user.readCaps[novelId]` OR `post.spoiler === true`. Tap/click the overlay to reveal (adds `.revealed` class that removes the blur).

---

## Mock data model (`js/state.js`)

### User (persisted to `localStorage` key `stitch_state_v1`)
```js
{
  name: 'Alex Mercer',
  handle: '@alex.mercer',
  streak: 12,
  followed: ['stitch-engine', 'obsidian-throne', 'whispers-deep', 'concrete-echoes'],
  readCaps: {
    'stitch-engine': 5,
    'obsidian-throne': 41,
    'whispers-deep': 18,
    'concrete-echoes': 22,
    // ... chapter cap per novel; anything higher is spoiler-blurred
  },
  honors: ['day-one-reader', 'community-pillar', 'top-contributor'],
}
```

### Novels (8 total, all with unique procedural SVG covers)
IDs: `stitch-engine`, `obsidian-throne`, `whispers-deep`, `concrete-echoes`, `echoes-fall`, `long-winter`, `concrete-horizon`, `silent-echoes`.

Each novel:
```js
{
  id, title, author, genre, tagline, synopsis,
  cover: 'stitch-engine',  // key into COVERS map in ui.js
  latestChapter: 5, totalChapters: 12,
  nextDrop: '2026-04-20T18:00:00Z',  // used by countdown timers
  theme: 'dark' | 'light',
  acts: [{ id, name, cleared, total, unlocked }],
}
```

### Chapters (10 for stitch-engine, acts 1–2)
```js
{
  id: 1, act: 1, novel: 'stitch-engine',
  title: 'The Cold Boot Sequence',
  published: '2 weeks ago',
  cleared: true,
  // optional:
  current: true,   // user's current reading position
  locked: true,    // beyond their readCap or act 2
  act2: true,      // in locked act
}
```

### Posts (8 samples in POSTS)
```js
{
  id, novel, chapter, title, body, type,  // 'discussion' | 'fanart' | 'meme'
  author, avatar, likes, comments, time,
  spoiler: boolean,  // explicit spoiler flag
}
```

### Media (14 items in MEDIA)
```js
{
  id, novel, chapter, type,  // 'official' | 'fanart' | 'meme'
  art: 'citadel',            // key into ART map in ui.js
  title, author,
  spoiler: boolean,
}
```

### Helpers
- `STITCH.getUser()` → current user object
- `STITCH.setUser(patch)` → merge + persist
- `STITCH.getNovel(id)` → novel by ID
- `STITCH.getPost(id)` → post by ID
- `STITCH.isSpoiler(item)` → checks `item.spoiler || item.chapter > readCap[novel]`

---

## Procedural art (`js/ui.js`)

All covers and gallery art are inline SVG generated by keyed functions. No image files.

### `coverSvg(id)` — novel covers
Keys: `stitch-engine`, `obsidian-throne`, `whispers-deep`, `concrete-echoes`, `echoes-fall`, `long-winter`, `concrete-horizon`, `silent-echoes`.

### `artSvg(id)` — gallery/asset art
Keys: `citadel`, `subject`, `schematic`, `wastes`, `aftermath`, `protocol-error`, `archartist`, `quote-meme`, `blur`, `inksoul`, `embers`, `camera`, `orchard`, `meme-concrete`, `hero`, `chapter4`, `brutalist`, `anomaly`.

### Other helpers
- `fmtNum(n)` → formats big numbers (1200 → "1.2K")
- `initials(name)` → extracts initials for avatars
- `renderGlobalNav(activeKey)` → mounts the sticky hub nav on `home/discover/global-discussions/global-media/profile`
- `mountNovelNav({ novelId, active, title })` → mounts hidden novel nav

---

## Per-page specifications

### AUTH

#### `login.html`
- Two-column layout: dark aside (left) + form (right)
- Aside: grid texture, "STITCH" wordmark, 3 pitch points about the platform
- Main form: title, Google OAuth button (with Google logo), "or continue with email" divider, email input, "CONTINUE" primary button, small print "By continuing, you agree to..."
- Signature hover: 6px coral hard shadow on primary button
- Background: paper, grain at default opacity

#### `otp.html`
- Centered layout on paper
- Step-crumb breadcrumb at top: "EMAIL ← OTP → PROFILE"
- "Check your inbox" heading (Archivo 900)
- Subtext with redacted email ("alex@****.com")
- 6 individual input cells for the code
  - Auto-advance to next cell on input
  - Paste handling: split 6-char paste across cells
  - Hint text below: "any 6 digits work"
- Resend timer: countdown from 28 seconds, then "RESEND CODE" link
- Primary verify button
- On submit → `home.html`

#### `join-code.html`
- Centered modal-style card on dark background
- Radial coral glow behind the card
- Title: "JOIN BY PRIVATE CODE"
- 6-character code input with a visual separator after the 3rd character (e.g. `ABC-123`)
- Badge: "🔒 E2E ENCRYPTED"
- Submit → `home.html`
- Alternative link: "Don't have a code? Browse public novels →" to `discover.html`

### NOVELSITE HUB (mobile-first, 520px phone frame)

#### `home.html`
- **Sticky global nav** (60px) with: HOME / DISCOVER / DISCUSSIONS / MEDIA / PROFILE. Home is active.
- **Hero**: "Good evening, Alex." + streak badge ("🔥 12 DAY STREAK")
- **Countdowns section**: horizontal-scrolling cards, one per novel in user.followed that has nextDrop. Live JS timers updating every 1s: "CH. 6 DROPS IN 3D · 14H · 22M · 03S". Click card → `novel-home.html?id=X`.
- **Library section**: 2-column grid of followed novels. Each card: procedural cover SVG + title + author + progress bar (chapter cleared / total).
- **Join-by-code strip**: dashed border, "HAVE A PRIVATE CODE?" with arrow → `join-code.html`
- **Release schedule** list (vertical): novel cover thumb + title + "Next: Apr 20, 18:00 UTC"
- **FAB** bottom-right: "+" button → `discover.html`

#### `discover.html`
- **Sticky top**: search input + filter icon
- **Tag chips row** (horizontally scrollable): All, Sci-Fi, Fantasy, Horror, Literary, Mystery, Romance. Click to filter. Multi-select not required — single-select is fine.
- **Trending carousel**: horizontal-scroll wide cards with hero art + title + author. Hides when search is active.
- **Wide banner** for "Wasteland Diaries" (featured novel) — full-width card with art + tagline
- **Curated grid**: 2-column grid of all NOVELS filtered by search/tag
- Each card click → `novel-home.html?id=X`

#### `global-discussions.html`
- **Sticky filter bar** at top:
  - Row 1: Novel filter chips (user.followed + "All"), multi-select toggle
  - Row 2: Chapter-depth range slider (1–48, default 24). Label: "CHAPTER DEPTH"
  - Row 3: Sort button that cycles "NEW → TOP → TRENDING"
- **Feed**: stacked post cards
  - Each post: avatar + handle + time + novel badge + CHAPTER tag (e.g. "CH. 12")
  - Title (bold) + body preview (2-3 lines)
  - Bottom row: ❤ likes · 💬 comments
  - **Spoiler blur** wraps the whole card if `post.chapter > user.readCaps[post.novel]` OR `post.spoiler === true`
    - Tap overlay reveals
- Scrollable, filterable live

#### `global-media.html`
- **Tab bar** (sticky): FANART / MEMES / OFFICIAL / ALL
- **Filter button**: cycles through user.followed novels (shows "FILTER: All" or "FILTER: STITCH_ENGINE")
- **Spoiler toggle**: eye icon — if pressed, reveals all blurred media
- **Masonry grid** (CSS columns, 2 columns)
- Each item:
  - Art block (procedural SVG)
  - Meta: type + chapter + author
  - Spoiler blur overlay if needed
- **Quote memes** render as pull-quote cards (Fraunces italic text on paper-2 card) instead of SVG art

#### `profile.html`
- **Header**: avatar (big), name, handle, bio, "EDIT PROFILE" button
- **Streak ring**: circular progress "UNBROKEN 12 DAY STREAK" with a progress bar beneath showing progress to next milestone (e.g. 30 days)
- **Stats row**: Chapters read / Posts made / Novels followed
- **Honors grid** (3-column):
  - Day-One Reader (unlocked)
  - Community Pillar (unlocked)
  - Top Contributor (unlocked)
  - "???" locked slots — grayed out with lock icon
- **Recent activity** feed (optional)

### SPECIFIC NOVEL (mobile-first, 520px phone frame, dark scope for stitch-engine)

#### `novel-home.html` (BUILT FROM SCRATCH)
- **Dark novel-scope theme**. Grain opacity 0.18, `mix-blend-mode: overlay`.
- **Responsive**: max-width 720px; at ≥1200px: outer flex container with `rail-left` / `rail-right` divs (empty stubs, 220px each, reserved for future sidebar content)
- **Full-bleed hero art** (procedural SVG of the novel's world)
- **Pulsing chevron at top** — hints at the hidden novel navbar. Small coral pulse, centered, 3px bar.
- **Back-arrow top-left** (mirror style) → `home.html`
- **Novel wordmark + tagline** over hero
- **Sections**: SYNOPSIS (Fraunces italic pull-quote, stamp uses valid coral rubberstamp), LATEST CHAPTER card (Latest tag muted border, progress fill = coral, CTA btn = `#ededed` bg → coral hover), CHARACTER CARDS (avatar initials muted, not coral), NEWS FEED (date day number = `#ededed`, not coral), STATS STRIP (numbers in `#ededed`, not coral)
- Hairline borders: `rgba(237,237,237,0.12)` throughout

#### `chapters.html`
- **Dark novel-scope theme**. Grain opacity 0.18, `mix-blend-mode: overlay`.
- Back-arrow top-left
- Header: mono kicker `// STITCH_ENGINE · CHAPTER_ARCHIVE` + Archivo 900 `CHAPTERS.` at 56–88px (`clamp`), tight letter-spacing + Fraunces italic subtitle at 22–36px
- Overall progress bar: hairline 2px `rgba(237,237,237,0.12)`, fill `rgba(237,237,237,0.45)` (not coral)
- **Act groups**: act index in mono muted, cleared/locked badge in `rgba(237,237,237,0.2)` border (not coral)
- Chapter rows: cleared rows muted at 0.4; current chapter number in `#ededed`; Resume button is coral with white hard shadow
- Locked sequences: mono uppercase at 11px, muted; lock icon in `rgba(237,237,237,0.12)` border
- Responsive: max-width 720px, 760px at ≥1200px

#### `read.html`
- **Fully immersive** — no navbar, only a thin status bar at top. Grain 0.14, overlay blend.
- Responsive: max-width 720px; at ≥1200px, side rails reserved (empty stub divs `rail-left`, `rail-right`) for future marginalia/metadata
- **Progress bar fixed at bottom**: coral fill bar + `#ededed` percentage text

#### `novel-discussions.html`
- **Dark novel-scope theme**. Grain opacity 0.18.
- Header: mono kicker + Archivo 900 `DISCUSSIONS.` at 56–88px + Fraunces italic forum name `"The Silent Archive"` at 24–38px (secondary heading)
- Subtitle in mono muted: read-cap notice
- Filter chips: inactive muted at 0.65, active = coral (valid active-state use)
- Avatar background: `rgba(237,237,237,0.12)` (not coral)
- **CREATE POST** button = coral CTA with hard white shadow
- Chapter pills: neutral border; spoiler pills = coral (valid spoiler-boundary use)
- Post action hover: `#ededed` (not coral)
- Compose FAB: coral with hard white shadow
- Responsive: max-width 720px, 760px at ≥1200px

#### `novel-media.html`
- **Dark novel-scope theme**. Grain opacity 0.18.
- Header: mono kicker + Archivo 900 `GALLERY.` at 56–88px + Fraunces italic subtitle
- Tabs: active tab uses coral underline (valid active-state); type labels in `rgba(237,237,237,0.4)` (not coral)
- **Stacked single-column layout** (not masonry)
- Spoiler cover icon: coral (valid spoiler-boundary signal)
- Responsive: max-width 720px, 760px at ≥1200px

#### `novel-community.html` (CMS-driven)
- **Dark novel-scope theme**. Grain opacity 0.18.
- Header: mono kicker + Archivo 900 `COMMUNITY.` at 56–88px + Fraunces italic `Lore & Protocol.` secondary heading
- Block kind labels (Archive · Entry, Video log, Schematic): `rgba(237,237,237,0.45)` mono (not coral)
- Live dot in block header: coral (valid live/pulse use)
- Archive excerpt: Fraunces italic with **coral left border** (semantic quote accent, matches `locked.html` subline)
- "Read full text" button: ghost → coral on hover with hard shadow
- Video play button: coral CTA
- Schematic stamp: `rgba(237,237,237,0.35)` border, muted text (not coral)
- Audio waveform active bars: `rgba(237,237,237,0.65)` (not coral)
- Audio play button: coral CTA; current time text: `#ededed`
- **Footer**: "END OF DIRECTORY · V 1.0.4" (JetBrains Mono, muted)
- Responsive: max-width 720px, 760px at ≥1200px

### DIRECTOR'S SUITE (desktop-first, ≥1280px)

#### Shared author shell
All author pages use this shell:
- **Topbar** (56px, dark):
  - Left: "PROSE & PROTOCOL" brand + "NARRATIVE ENGINE" subtitle
  - Center: breadcrumbs in mono
  - Right: PREVIEW (ghost) + PUBLISH/SAVE (coral primary) buttons
- Sometimes a **tabstrip** below topbar (for story bible: Bible / Assets tabs)

#### `author-dashboard.html`
- **Left sidebar** (260px, dark):
  - "PROSE & PROTOCOL" wordmark
  - Nav: DASHBOARD (active), NOVEL CMS, COMMUNITY CMS, EDITOR, STORY BIBLE
- **Main content** (paper):
  - Title: "The Long Winter / Your narrative is resonating"
  - Badge: "14 DAY WRITING STREAK" (coral)
  - **3 metric cards** (grid):
    - TOTAL READERS: 14,208 (+12%)
    - ENGAGEMENT: 8.4% (+2.1%)
    - RECENT ACTIVITY: "Chapter 12 published. 42 new comments."
  - **Direct Actions list** (3 rows):
    - Edit Novel Home CMS → `author-cms-home.html`
    - Manage Community Lore → `author-cms-community.html`
    - Open Chapter Editor → `author-editor.html`

#### `author-editor.html` — **SIGNATURE PAGE**
- Tabstrip below topbar: EDITOR / STORY BIBLE / ASSETS
- **3-column layout**:
  - **LEFT (240px) — CHAPTERS panel**:
    - List: 01–05, current chapter (04) highlighted coral
    - "+ NEW CHAPTER" button
  - **CENTER — Editor canvas**:
    - Chapter title input: "Chapter 04: The Descent" (Archivo 900)
    - **Block-based editor** (Jupyter-style):
      - BLOCK 1 (TEXT): rich text area with content
      - BLOCK 2 (SPLASH ART): image preview + re-upload button
      - BLOCK 3 (TEXT): more text
    - Each block has: Split / Merge / Delete / Move up/down controls
    - "+ ADD NEW BLOCK" button at bottom (choose type: text, splash, pull-quote, section break)
  - **RIGHT (320px) — Inspector**:
    - Selected block controls change based on block type
    - For **SPLASH ART** block (BLOCK 2 SETTINGS):
      - Animation dropdown: Fade / Parallax / Ken Burns / None
      - Z-Index dropdown: Background / Midground / Foreground
      - Placement dropdown: Full bleed / Inset / Margin note
    - **AUDIO MAP** section (THE SIGNATURE FEATURE):
      - Track name + Change button
      - **Interactive SVG normal-distribution curve**:
        - Drag peak handle (vertical) to adjust peak volume (0.0–1.0)
        - Drag spread handle (horizontal) to adjust sigma (tight ↔ slow build)
        - Drag horizontal position to change peak-paragraph index
      - Live-update numeric array output beneath: e.g. `[0.1, 0.3, 0.6, 0.9, 1.0, 0.9, 0.6, 0.3, 0.1]`
      - Labels: "TIGHT FOCUS ↔ SLOW BUILD"
      - Peak Volume slider (0.0–1.0, default 0.85)
      - Paragraph Index for Peak (numeric stepper)
      - Spread (Blocks) range slider
- This is the most important page. The audio envelope interaction is the single most novel feature of STITCH.

#### `author-cms-home.html` (BUILT FROM SCRATCH)
- Same author shell
- **3-column layout**:
  - **LEFT (240px) — Block palette**:
    - Hero, Text, Image Grid, Character Cards, News Feed, Schedule, Embed
    - Draggable items
  - **CENTER — Live preview** of novel home being built (iframe-style, shows the actual page)
  - **RIGHT (320px) — Inspector** for the selected block
- Drag from palette → drop on canvas → block appears
- Click block on canvas → inspector shows its properties
- Inspector includes: Duplicate / Delete / Move Up / Move Down buttons

#### `author-cms-community.html` (BUILT FROM SCRATCH)
- Same shell as cms-home, but community-specific blocks:
  - **Page Header** (novel name + title)
  - **Lore Archive** (kicker + title + italic excerpt + CTA)
  - **Video Log** (thumbnail + play + title + meta)
  - **Schematics** (wireframe box + title + detail + CTA)
  - **Transmission** (waveform + play + duration + title)
  - **Divider** (spacer)
- Live preview renders in dark novel-scope theme (since community page is in the novel enclosure)

#### `author-story-bible.html` (BUILT FROM SCRATCH)
- Tabstrip: **BIBLE** / **ASSETS**
- **BIBLE tab**:
  - **Left sidebar** (260px): grouped by Character / Location / Concept / Event. Each item: avatar + name + meta + type badge
  - **Main content**: rich entry view with:
    - Kicker (type + tag)
    - Name (Archivo 900, 56px)
    - Pronunciation (Fraunces italic)
    - Meta bar: first appearance + appears in + status
    - 2-column grid of IDENTITY + PHYSICALITY cards (for characters)
    - Entry body in Fraunces editorial, with @mentions that link to other entries
    - "LINKED ENTRIES" pills at bottom
  - **Right panel** (340px):
    - USED IN DRAFT (chapter references)
    - CONSISTENCY checker (flags name variants)
    - TIMELINE (Year 0, Year 7, etc.)
  - **"+ NEW ENTRY" FAB**
- **ASSETS tab**:
  - Toolbar: ALL / IMAGES / AUDIO filter tabs + "+ UPLOAD" button
  - Grid of assets (auto-fill, minmax 200px):
    - Image assets: procedural SVG thumbnail + filename + dimensions
    - Audio assets: waveform visualization + filename + duration

### EDGE STATE

#### `locked.html` (BUILT FROM SCRATCH)
- **Fully dark, immersive**
- **Scanline overlay** (repeating linear gradient, mix-blend overlay)
- **Tile grid background** (24px grid)
- Topline: "● PROTOCOL 403 / SPOILER-GUARD" (pulsing red dot) — "STITCH · V 1.0.4"
- Main:
  - Kicker: "// ACCESS_DENIED · CHAPTER_OUT_OF_BOUNDS"
  - **Headline**: Mixed Archivo + Fraunces treatment:
    - "YOU'RE" (Archivo 900)
    - "ahead of" (Fraunces italic, coral)
    - "YOURSELF." (Archivo 900)
  - Subline: italic Fraunces pullquote with coral left border
  - **Meta block** (bordered):
    - REQUESTED: STITCH_ENGINE · CH. 12
    - YOUR PROGRESS: CH. 05 · 41%
    - GAP: +7 CHAPTERS (coral)
    - STATUS: SEALED (coral)
  - **Actions**:
    - Primary: "CONTINUE FROM CHAPTER 5 →" → `read.html?id=stitch-engine&ch=5` (coral, hard white shadow)
    - Secondary row (2 ghost buttons): VIEW CHAPTERS | BACK TO NOVEL
- Footline: "NO TRACE LEFT ON SERVER" + live blinking clock

### PROTOTYPE MAP

#### `index.html`
- Entry point only — not a real user-facing page
- Giant "STITCH" wordmark
- 5 sections: Auth / Hub / Novel / Author / Edge
- Card per page with name + description
- "BUILT FROM SCRATCH" badge on pages not derived from the PDF references

---

## Behavioral promises already implemented

1. **Pulsing chevron at top of novel pages** → hidden navbar slides in on hover of top 24px hotzone → back-arrow top-left for exit. Implemented in `novel-nav.css` + `ui.js mountNovelNav()`.
2. **Audio envelope UI** in author-editor: interactive SVG curve, draggable handles, live numeric array output. **This is the signature feature — don't weaken it.**
3. **Spoiler blur**: real CSS `filter: blur(14px)`, tappable overlay, based on `readCap` vs chapter.
4. **Live filters**: tag chips, novel filters, fanart/meme toggles, chapter-depth slider all actually filter the rendered list.
5. **Procedural SVG covers and art**: no image hosting.
6. **Live countdown timers** on `home.html`: `setInterval(..., 1000)` updating "3D · 14H · 22M · 03S".
7. **Persistent state** via localStorage key `stitch_state_v1`.

---

## Known gaps / things to push further

1. **`author-editor.html` audio envelope** — the SVG curve is drawn but the drag handles could be tighter. Worth polishing since this is the signature feature.
2. **Desktop side rails on `novel-home.html` and `read.html`** — `.rail-left` / `.rail-right` divs are present at ≥1200px but empty. Content to fill in a future iter: novel metadata panel, chapter selector, marginalia for the reader.
3. **`author-cms-*` pages** — drag-drop works for adding blocks but reordering via drag isn't implemented (only via Up/Down buttons in the inspector).
4. **Real audio playback** in reader is stubbed (the scrollytelling audio is not actually wired up).
5. **Mobile author view** not designed — Director's Suite is explicitly desktop-first. `Mobile_Chapter_Editor.pdf` existed but wasn't implemented as a separate page.
6. **No real backend integration** — `join-code.html` doesn't verify codes, OTP accepts any 6 digits, login doesn't call Google OAuth.
7. **Only `stitch-engine` has rich chapter data** — other 7 novels have metadata but no full chapter lists.
8. **Hub pages at ≥1200px** — currently just widen the column to 760px. A future iter could add an optional sidebar (reading stats, active novels, upcoming drops) at desktop widths.

---

## Design principles — things to keep when iterating

- **Push harder on editorial brutalism.** Bold Archivo black, tight letter-spacing, unapologetic size jumps (body 14px → headings 56–120px).
- **Grain is non-negotiable.** Every page has the `body::before` grain overlay.
- **Coral `#d14829` is a scarce resource.** Valid uses only: primary CTA buttons, active tab/filter underlines, hard shadows on interactive elements, spoiler-boundary indicators, live/pulse dots, rubberstamp tags, semantic quote-accent borders. On any given screen, at most one or two coral elements should be visible. Replace everything else with muted white variants (`rgba(237,237,237,0.x)`). The test: if removing the coral doesn't break comprehension, it shouldn't be there.
- **Hard shadows, never soft.** `6px 6px 0 <color>`, no blur.
- **Mono for labels, Fraunces italic for voice, Archivo 900 for volume.** Never mix registers within a single element.
- **Dark novel-scope should feel sealed.** Less muted, more contrast, higher grain opacity.
- **Author tools should feel like a workshop.** Grid-dense, technical, inspector-heavy. Not like Notion.

---

## Working with this codebase

- `css/core.css` is the shared design system. Changes here cascade everywhere.
- `css/novel-nav.css` is only loaded by the 5 novel-scope pages.
- `js/state.js` is the single source of truth for mock data. Changes here affect all pages.
- `js/ui.js` is the shared rendering/helper layer. `coverSvg()` and `artSvg()` are the only sources of art.
- Each HTML page has its own `<style>` block for page-specific layout. Shared tokens reference the CSS variables from `core.css`.

When adding a new block type to a CMS, you need to update:
1. `renderBlock()` in the CMS page — the canvas rendering
2. Inspector fields for that block type
3. The palette item in the left column
4. Default data object in the drop handler
5. If the block appears on the live page (`novel-community.html`), mirror the rendering there too.

When adding a new novel:
1. Add entry to `NOVELS` array in `state.js`
2. Add cover SVG to `COVERS` map in `ui.js`
3. Add chapter entries if needed
4. Add to user's `followed` + `readCaps` if the test user should see it





---

## Iteration protocol

Every user request in a Claude Code session must be logged to `PROMPTS.md` **before** any code changes are made. This is non-negotiable — it is the single source of truth for design evolution.

### Format

Each entry in `PROMPTS.md` follows this structure:

~~~
### NNN — [short title, max 8 words]

**Date:** YYYY-MM-DD
**Branch:** [current branch name]
**Files touched:** [comma-separated list, filled in after work is done]

**Request (verbatim):**
> [user's exact message, quoted]

**Interpretation:**
[1-3 sentences explaining how the request was understood and what was decided to be done]

**Alternatives considered but not taken:**
- [approach A] — why rejected
- [approach B] — why rejected

**Changes made:**
[bullet list of actual edits, one per file or logical unit]

**Spec updates:**
[list any sections of CLAUDE.md that were updated to reflect this change, or "none"]

**Related prompts:** [list of prior prompt numbers this builds on or corrects, or "none"]

---
~~~

### Numbering

- Prompts are numbered sequentially starting from 001.
- Three-digit zero-padded: 001, 002, ..., 042, 127.
- Never reuse a number even if a prompt is abandoned. Mark abandoned work as `**Status:** abandoned — [reason]`.

### When the user's message is a correction or clarification of a previous prompt

- Still create a new entry with a new number.
- In the **Related prompts** field, reference the prior number: `Related prompts: 038 (corrects)`.
- The previous entry is not edited — `PROMPTS.md` is append-only history.

### Before starting any work

1. Read the user's message.
2. Append a new entry to `PROMPTS.md` with the request, interpretation, and alternatives.
3. Only then begin code changes — **one file at a time**. Read a file, edit it, commit, then move to the next. Do not read all affected files upfront before editing any of them.
4. After changes are complete, update the **Files touched**, **Changes made**, and **Spec updates** fields.

### What counts as a prompt

Any user message that requests work. Meta-questions ("what files exist?", "explain this code") are not logged. Design discussions that don't result in changes are not logged. If unsure, err toward logging.

---

## Spec maintenance protocol

`CLAUDE.md` (this file) is the living specification. It must always reflect the current state of the codebase.

### When to update CLAUDE.md

Update this file whenever any of the following change:

- A page's layout, sections, or core behavior
- The design system (colors, fonts, spacing tokens, shadow patterns)
- The data model in `js/state.js`
- Shared components (hidden nav, spoiler blur, back-arrow mirror)
- File inventory (pages added, removed, renamed)
- Known gaps or design principles

### How to update

- Edit the relevant section directly. Do not append "update notes" at the bottom.
- Keep the document organized by the existing structure (design system → file inventory → per-page specs → principles → gaps).
- If a known gap is resolved, remove it from the gaps section.
- If a new gap is discovered, add it.
- The "Design principles" section is load-bearing — changes there require explicit user confirmation in the prompt.

### Drift check

At the start of every session, briefly verify that the top-level structure of `CLAUDE.md` still matches reality:
- Do all 21 HTML files listed actually exist?
- Do the palette tokens in `core.css` match what's documented?
- Are any pages listed as "built from scratch" that have since gained PDF references?

If drift is detected, note it in the first response of the session and offer to correct it before beginning work.

---

## Git protocol

This project uses Git for version tracking. After every logical unit of work, changes are committed and pushed.

### Branch structure

- `main` — always renders, always deployable. Never commit broken code here directly.
- `iter/NNN-short-description` — one branch per significant iteration pass. NNN matches the prompt number that initiated the pass.
- Small fixes can go directly to `main`. Design passes spanning multiple pages go on an iter branch.

### Commit convention

Conventional Commits, relaxed form. Prefix determines intent:

- `design:` — visual or interaction changes
- `design(scope):` — visual changes scoped to an area, e.g. `design(novel):`, `design(author):`
- `spec:` — updates to CLAUDE.md or PROMPTS.md only
- `content:` — mock data changes in state.js
- `fix:` — bug fixes
- `feat:` — genuinely new capability (rare at this stage)
- `wip:` — experimental, may be reverted
- `chore:` — dependencies, tooling, gitignore, etc.

Commit messages are imperative, lowercase after prefix, under 72 characters for the subject line.

Examples:

~~~
design(novel): remove phone-frame borders, fluid layout
design: push Archivo 900 harder on chapter headers
spec: update palette discipline section in CLAUDE.md
content: add 9th novel for testing layout overflow
fix(audio-envelope): drag handles respect SVG viewBox now
~~~

### Commit discipline

- **Spec changes in their own commits.** Never mix `design:` or `feat:` changes with `spec:` updates in the same commit. This makes it possible to audit when the spec drifted from reality.
- **One logical change per commit.** If a single prompt produces changes to 5 unrelated areas, split into 5 commits.
- **`PROMPTS.md` updates can ride with the commit they document.** Include `PROMPTS.md` in the same commit as the change it records, so history reads cleanly.

### After every prompt that produces code changes

Execute this sequence:

1. Stage all changes: `git add -A`
2. Commit with the appropriate prefixed message.
3. Push to the current branch: `git push origin HEAD`
4. If any commit failed lint/test/render checks, surface the failure clearly and do not push.

If the user has not asked for a commit explicitly, still commit and push — this is the default behavior and does not need confirmation. Only skip if the user explicitly says "don't commit this" or "hold off on pushing."

### Tagging

Tag any version that represents a coherent design state:

- `v0.1-initial-brutalist`
- `v0.2-dark-pass`
- `v0.3-responsive-novel`

Tags are created only when the user asks, or when completing a large iteration branch before merging to `main`. Tag names are lowercase with hyphens.

### .gitignore

Ensure the following are ignored:

~~~
*.zip
.DS_Store
.claude/
node_modules/
dist/
*.log
~~~

### What not to commit

- Generated zip files of the project
- Any file containing real credentials (there shouldn't be any in this prototype)
- Editor-specific files (`.vscode/`, `.idea/`) unless the user has explicitly added them

---

## Session start checklist

At the beginning of every Claude Code session:

1. Read `CLAUDE.md` in full.
2. Read the most recent 3 entries in `PROMPTS.md` to understand current direction.
3. Check `git status` — if there are uncommitted changes, ask the user whether to commit them first or roll them back.
4. Check current branch — if on `main` and the user's first request is a design pass, suggest creating an `iter/` branch first.
5. Perform the drift check described in the Spec maintenance protocol.
