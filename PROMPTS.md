# PROMPTS — STITCH Design Evolution Log

---

### 001 — Brutalist novel pass + responsive layout

**Date:** 2026-04-18
**Branch:** iter/001-brutalist-novel-responsive
**Files touched:** chapters.html, novel-discussions.html, novel-media.html, novel-community.html, novel-home.html, home.html, discover.html, global-discussions.html, global-media.html, profile.html, read.html, css/core.css, CLAUDE.md

**Request (verbatim):**
> a coherent brutalist pass on the novel-scope pages and responsiveness across all mobile-first pages. Create an iter branch for this work.
>
> Scope — the four novel-scope pages specifically: chapters.html, novel-discussions.html, novel-media.html, novel-community.html. And secondarily, a responsive pass on all mobile-first pages.
>
> Changes required: (1) Coral discipline — remove all decorative use, keep only CTAs/active states/spoiler-boundary/live dots/hard shadows. (2) Remove 520px phone-frame borders, fluid 720px default, 760px at ≥1200px; side-rail stub at ≥1200px for novel-home and read. (3) Push editorial brutalism: Archivo 900 56–88px titles, Fraunces italic 32–48px secondary headings, hairline borders, grain 0.18, mono labels 0.18–0.22em. (4) Reference locked.html aesthetic. Separate spec: commit, one design(novel): commit per page.

**Interpretation:**
Apply a three-axis pass to novel-scope pages: coral audit (remove decorative signal, preserve functional), responsive layout (520px → 720px, side-rail stub at ≥1200px for novel-home/read), and editorial brutalism push (larger type, kickers, hairline borders, heavier grain). novel-home.html receives the full brutalist + responsive pass since it belongs to the same enclosure aesthetic.

**Alternatives considered but not taken:**
- Keeping 520px cap and adding side decorations — rejected; user explicitly wants the frame gone
- Two-pass approach (responsive first, then brutalism) — rejected; same branch per request
- Container queries instead of media queries — rejected; static prototype, media queries sufficient

**Changes made:**
- chapters.html — coral discipline, grain 0.18, layout 720px, kicker + enlarged h1 (80px), hairline borders, mono label tracking
- novel-discussions.html — coral discipline, grain 0.18, layout 720px, kicker + enlarged h1, Fraunces forum name secondary
- novel-media.html — coral discipline, grain 0.18, layout 720px, kicker + enlarged h1, type label muted
- novel-community.html — coral discipline, grain 0.18, layout 720px, kicker + enlarged h1, block kind muted, schematic stamp muted
- novel-home.html — coral discipline, grain 0.18, layout 720px + ≥1200px side-rail stub
- home.html, discover.html, global-discussions.html, global-media.html, profile.html — layout 720px → 760px at ≥1200px
- read.html — layout 720px + ≥1200px side-rail stub
- css/core.css — .phone-frame updated (no borders), mix-blend-mode note for dark pages

**Spec updates:**
- Per-page specs updated for all four novel-scope pages and novel-home
- "Design principles" updated to formalize coral discipline
- Phone-frame border pattern removed from documentation
- Known gaps updated

**Related prompts:** none

---

### 002 — Theme toggle + chapters behaviour overhaul

**Date:** 2026-04-20
**Branch:** iter/001-brutalist-novel-responsive
**Files touched:** CLAUDE.md, js/state.js, chapters.html, novel-home.html, novel-discussions.html, novel-media.html, novel-community.html

**Request (verbatim):**
> for all of the SpecificNovel sites, give them a button to swap from dark mode to light mode and vice versa. in the chapters page, there shouldnt be a necessity to "clear" an act to be able to read the rest. in the chapters page, there shouldnt be a length of the chapter like "22min", but instead there should be a word count, written as X.Xk words, like 3.2k words. acts should be collapsable elements, they are all collapsed by default, except for the one you are currently one, meaning that all unread acts are collapsed, and all read ones are also collapsed, only halfway-read acts should be open, or any ones that were explicitly opened. add the folowing behaviour : if a chapter is pressed, it is "read", which updates the total progress for the act, this should be saved in local storage for now i guess. if total act progress is 100% or X/X, it should be collapsed. remove the "active"/"sealed" next to chapter names.

**Interpretation:**
Five changes: (1) dark/light toggle on all 5 novel-scope pages, persisted to `localStorage`. (2) Remove act-gate logic from chapters.html — all published chapters are freely accessible. (3) Duration replaced with word count formatted as X.Xk. (4) Acts are collapsible — collapsed by default, auto-open for in-progress acts (some cleared, not all), auto-collapse when act reaches 100%. (5) Clicking any accessible chapter marks it as read in localStorage via STITCH state. Also: update CLAUDE.md iteration protocol and add `clearedChapters` to DEFAULT_USER in state.js.

**Alternatives considered but not taken:**
- Using CSS `prefers-color-scheme` instead of manual toggle — rejected; the novel dark theme is intentional by default regardless of OS setting
- Persisting act open/closed state to localStorage — rejected; toggled-open state is ephemeral (session only), only chapter-read state persists

**Changes made:**
- CLAUDE.md — iteration protocol updated with one-file-at-a-time rule
- js/state.js — added `clearedChapters` to DEFAULT_USER
- chapters.html — collapsible acts, word counts, click-to-read, no act gates, theme toggle
- novel-home.html — theme toggle button + light-mode CSS overrides
- novel-discussions.html — theme toggle button + light-mode CSS overrides
- novel-media.html — theme toggle button + light-mode CSS overrides
- novel-community.html — theme toggle button + light-mode CSS overrides

**Spec updates:**
- Iteration protocol section updated in CLAUDE.md

**Related prompts:** 001

---
