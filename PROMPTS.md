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

### 003 — Center novel navbar; clean chapters header

**Date:** 2026-04-20
**Branch:** iter/001-brutalist-novel-responsive
**Files touched:** css/novel-nav.css, chapters.html

**Request (verbatim):**
> in the novel pages, the navbar should be centered, currently all its elements are to the right, fix it. and remove the text in the chapters page that says "// STITCH_ENGINE · CHAPTER_ARCHIVE", as well as "Act by act. Read in sequence."

**Interpretation:**
Two small fixes. (1) The `.nnav-links` are `justify-content: flex-end` inside a 3-column grid, making them flush right. Fix by switching `.nnav` to flex with `justify-content: center`, positioning `.nnav-back` absolutely on the left, and hiding `.nnav-title`. (2) Remove the kicker and subtitle from the chapters header — the `h1` alone is sufficient.

**Alternatives considered but not taken:**
- Keeping the novel title in the navbar alongside centered links — rejected; user wants clean centered links, title adds clutter

**Changes made:**
- css/novel-nav.css — flex layout, back button absolute left, links centered, title hidden
- chapters.html — removed kicker div and sub paragraph from header markup and CSS

**Spec updates:** none

**Related prompts:** 001, 002

---

### 004 — Strip kickers and subtitles from novel content pages

**Date:** 2026-04-20
**Branch:** iter/001-brutalist-novel-responsive
**Files touched:** novel-community.html, novel-media.html, novel-discussions.html

**Request (verbatim):**
> from the novel pages, remove the following lines Lore & Protocol. / Curated materials · Archives · Video logs · Schematics · Transmissions / // STITCH_ENGINE · AUTHOR_DISPATCH / // STITCH_ENGINE · VISUAL_ARCHIVE / // STITCH_ENGINE · COMMUNITY_FORUM / "The Silent Archive"

**Interpretation:**
Remove all kicker and subtitle text from three novel pages. Each page keeps its `h1` but loses the mono kicker above it and the Fraunces italic secondary heading below it. Same pattern as the chapters.html cleanup in prompt 003.

**Alternatives considered but not taken:**
- Keeping kickers as data attributes for SEO — rejected; prototype only

**Changes made:**
- novel-community.html — removed kicker, sub-head, sub lines
- novel-media.html — removed kicker and sub lines
- novel-discussions.html — removed kicker, forum-name, and sub lines

**Spec updates:** none

**Related prompts:** 001, 003

---

### 005 — Hub pages: dark mode toggle + center global navbar

**Date:** 2026-04-20
**Branch:** iter/001-brutalist-novel-responsive
**Files touched:** css/core.css, home.html, discover.html, global-discussions.html, global-media.html, profile.html

**Request (verbatim):**
> all the GeneralSite pages should also get a darkmode button, and their navbar should also get centered, they are now all on the left, fix that

**Interpretation:**
Two changes across the 5 hub pages. (1) The global nav items (`BRAND · nav-items · profile`) are left-aligned; center the nav-items between the brand and profile button. (2) Add a sun/moon toggle button to each hub page that switches between the default paper/ink light theme and a dark theme, persisted to `localStorage` key `hub_theme`.

**Alternatives considered but not taken:**
- Sharing one `hub_theme` key with `novel_theme` — rejected; hub and novel themes should be independently controllable

**Changes made:**
- css/core.css — center global nav items; add hub dark-mode CSS class
- home.html, discover.html, global-discussions.html, global-media.html, profile.html — theme toggle button + JS

**Spec updates:** none

**Related prompts:** 001, 002

---

### 006 — Hub Discussions & Media: replace book chips with Feed modal

**Date:** 2026-04-21
**Branch:** iter/001-brutalist-novel-responsive
**Files touched:** global-discussions.html, global-media.html

**Request (verbatim):**
> go to the generalNovelSite pages. specifically the Discussions and Media pages. i want to rework how books are chosen, i dont want there to be a list of books you can press, i want there to be a "feed" button, that when pressed, opens up a modal, that has a list of all the followed books, and you can press them to toggle them on and off. for the Pressing of a book, and for the way a book looks in this modal, i want you to copy the way it is done in the Discussions page, since i think its really well done there. in the modal, i also want a "select all" button, that when pressed, becomes a "deselect all" button, its purpose is obvious. have the functionality working.

**Interpretation:**
Remove the horizontal novel-chip scrolling row from discussions and the cycling book-filter button from media. Replace both with a "FEED" button that opens a modal containing the followed-book list as full-width novel-chips (same avatar+label+active style as the existing chips in discussions). Modal includes a SELECT ALL / DESELECT ALL toggle button. Media moves from single-book cycle to multi-select Set. Both pages update filtering live as books are toggled in the modal.

**Alternatives considered but not taken:**
- Keeping chips inline and adding the modal alongside — rejected; user explicitly wants to remove the inline list
- Dropdown instead of modal — rejected; user said modal

**Changes made:**
- global-discussions.html — remove novel-row + all chip CSS, add feed-btn + modal overlay, update JS to use empty-set = all
- global-media.html — remove book-filter cycling button, add same feed-btn + modal, change bookFilter from single ID to Set

**Spec updates:** none

**Related prompts:** 005

---

### 007 — Director's Suite unified navbar + editor preview modal

**Date:** 2026-04-22
**Branch:** iter/001-brutalist-novel-responsive
**Files touched:** author-dashboard.html, author-editor.html, author-cms-home.html, author-cms-community.html, author-story-bible.html

**Request (verbatim):**
> go through the directors suite sites, they should have a unified navbar, they currently dont. they should be able to navigate between all directors suite page. the nav bar needs to be centered of course. for a better UX, pressing preview in the chapter editor page shouldnt take you to another page, it should instead open a modal, that spans the height of the entire page, and that is closable, and that has a "open in new tab" button, that will actually end up opening the chapter link in a new tab

**Interpretation:**
Two changes. (1) All 5 Director's Suite pages get a unified topbar with the brand left, five nav links centered (DASHBOARD / EDITOR / NOVEL CMS / COMMUNITY / STORY BIBLE) with active state per page, and page-specific action buttons right. The dashboard currently uses a sidebar for navigation — the sidebar nav links are removed, the topbar is added spanning both grid columns. (2) The "Preview" button in author-editor.html opens a full-viewport-height modal overlay instead of navigating away. The modal has a header bar with a close button and "OPEN IN NEW TAB" link, and renders a reader-style preview of the current chapter content.

**Alternatives considered but not taken:**
- Keeping the dashboard sidebar as primary nav and adding topbar as secondary — redundant duplication of nav
- Using an iframe in the preview modal pointing to read.html — iframe cross-navigation would lose the mock content; a rendered preview panel is cleaner for the prototype

**Changes made:**
- author-dashboard.html — add topbar (spanning sidebar+main columns), remove side-nav from sidebar, adjust grid to grid-template-rows: 56px 1fr, update sidebar sticky height
- author-editor.html — replace .tabs with .topbar-nav centered nav, add preview modal HTML/CSS/JS
- author-cms-home.html — replace .crumbs with .topbar-nav, switch topbar to flex layout
- author-cms-community.html — replace .crumbs with .topbar-nav, switch topbar to flex layout
- author-story-bible.html — replace .crumbs with .topbar-nav, switch topbar to flex layout

**Spec updates:** none

**Related prompts:** none

---

### 008 — Editor chapters panel: act-grouped collapsible list

**Date:** 2026-04-22
**Branch:** iter/001-brutalist-novel-responsive
**Files touched:** author-editor.html

**Request (verbatim):**
> the author editor page, in the leftmost column, the chapters should be grouped in acts, that are all collapsed by default, and that can be pressed so that all the chapters in it are shown, each act has a + button to add a chapter, and the total list of acts has a + button to add an act

**Interpretation:**
Replace the flat chapter list with collapsible act groups. Two acts for The Long Winter: Act I (Frost, CH. 01–03 published) and Act II (Descent, CH. 04–05 — the active chapter's act opens by default). Each act header is clickable to collapse/expand its chapters, has a chapter count label, and a + button to append a new draft chapter. A footer + button adds a new act. All acts start collapsed except the one containing the active chapter.

**Alternatives considered but not taken:**
- All acts open by default — rejected; user asked for collapsed by default

**Changes made:**
- author-editor.html — new act-group CSS, replaced flat .chap-item list with two .act-group containers, added JS for toggle/add-chapter/add-act

**Spec updates:** none

**Related prompts:** 007

---

### 009 — Preview modal: narrower shell, transparent sides

**Date:** 2026-04-24
**Branch:** main
**Files touched:** author-editor.html

**Request (verbatim):**
> in the preview modal in the author editor page, make the modal only slightly wider than the text area, while the rest of that space isnt black like it is now, but it should instead be semi transparent so it can show the background so that it is easier to understand that this just a modal.

**Interpretation:**
The preview modal shell currently spans 100% width with a solid `#0d0d0f` background, making the entire screen go black. Constrain the shell to roughly 760px (just wider than the 680px inner content + 24px padding each side), center it, and keep only the backdrop's existing semi-transparent dark overlay on the sides — no solid fill outside the shell column.

**Alternatives considered but not taken:**
- Reducing opacity of the full-width shell — still black, just lighter; doesn't communicate "modal over editor"
- Making the backdrop more transparent — would lose focus; the shell boundary is the right signal

**Changes made:**
- author-editor.html — `.preview-modal-shell` width constrained to `min(780px, 96vw)`, centered via flex parent, solid background kept only on the shell; backdrop remains semi-transparent

**Spec updates:** none

**Related prompts:** 007

---

### 010 — Editor blocks: clean borders, markdown toolbar, X delete

**Date:** 2026-04-24
**Branch:** main
**Files touched:** author-editor.html

**Request (verbatim):**
> in the author editor page, the blocks in the middle of the page, should be fully displayed, meaning there should not be a scrollbar. they should also have the "block X text block/image block" and any text in its border should get removed, so the split merge delete, as well as the replace for images should get removed. the text blocks should have the markdown mode styling options, and all blocks should have small x on the top right of the block, the x will be on the block, and not a on a border of the block, meaning the block's border should be just a line, and not have a large width that contains elements

**Interpretation:**
Remove the `block-head` bar entirely from all blocks — no label, no tools (Split/Merge/Delete/Replace). The block border becomes a simple thin line. Add a small, lightweight markdown formatting toolbar inside each text block (B, I, H1, H2, quote, code). Add a small absolute-positioned X button on the top-right of every block (visible on hover). Auto-resize textareas so they expand to their content with no internal scrollbar.

**Alternatives considered but not taken:**
- Keeping block-head but making it thinner — user specifically said the border should just be a line, no thick header containing elements
- Putting the X on the border itself — user explicitly said the X should be on the block content, not the border

**Changes made:**
- author-editor.html — remove .block-head CSS and HTML; add .block-close absolute button; add .block-toolbar markdown formatting row for text blocks; auto-resize textareas via JS; add delete block handler

**Spec updates:** none

**Related prompts:** none

---
