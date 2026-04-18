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
