/* ============================================================
   STITCH — MOCK STATE & DATA
   Persisted via localStorage so state survives navigation.
   ============================================================ */

const STITCH = (function () {
  const STORAGE_KEY = 'stitch_state_v1';

  // ----- current user -----
  const DEFAULT_USER = {
    username: 'Alex Mercer',
    handle: '@mercerwrites',
    initials: 'AM',
    bio: 'Avid reader of sci-fi epics and gritty urban fantasies. Believes the best stories are the ones that leave a scar.',
    streak: 12,
    streakTarget: 15,
    joined: 2023,
    badges: ['day-one', 'community-pillar', 'top-contributor'],
    followed: ['stitch-engine', 'obsidian-throne', 'whispers-deep', 'concrete-echoes'],
    readCaps: {
      'stitch-engine': 5,
      'obsidian-throne': 41,
      'whispers-deep': 12,
      'concrete-echoes': 8,
    },
    bookmarks: { 'stitch-engine': 5 },
  };

  // ----- novels -----
  const NOVELS = [
    {
      id: 'stitch-engine',
      title: 'Stitch Engine',
      author: 'System Architect',
      genre: 'Sci-Fi / Cyberpunk',
      synopsis: 'A systems engineer discovers that the city’s infrastructure is stitched together from fragments of deleted timelines. As anomalies bleed through, she must decide which version of reality to preserve.',
      totalChapters: 12,
      latestChapter: 5,
      nextRelease: '12:45:00',
      nextReleaseTs: Date.now() + 12 * 3600 * 1000 + 45 * 60 * 1000,
      acts: [
        { id: 'act-01', name: 'Initialization', cleared: 4, total: 5, unlocked: true },
        { id: 'act-02', name: 'Execution', cleared: 0, total: 4, unlocked: false },
        { id: 'act-03', name: 'Resolution', cleared: 0, total: 3, unlocked: false },
      ],
      theme: 'dark',
      cover: 'cover-stitch',
      accent: '#d14829',
    },
    {
      id: 'obsidian-throne',
      title: 'The Obsidian Throne',
      author: 'A.E. Vance',
      genre: 'Dark Fantasy',
      synopsis: 'When the old king is poisoned, four heirs race across a continent of black glass to claim a throne no one is meant to sit on.',
      totalChapters: 48,
      latestChapter: 41,
      nextRelease: '12:45:00',
      theme: 'light',
      cover: 'cover-obsidian',
      accent: '#3a2418',
    },
    {
      id: 'whispers-deep',
      title: 'Whispers of the Deep',
      author: 'L.R. Harbor',
      genre: 'Horror / Lovecraftian',
      synopsis: 'A marine biologist begins receiving transmissions from the Mariana Trench. They are in her own voice.',
      totalChapters: 14,
      latestChapter: 12,
      theme: 'light',
      cover: 'cover-whispers',
      accent: '#1f3a4f',
    },
    {
      id: 'concrete-echoes',
      title: 'Concrete Echoes',
      author: 'M. Sterling',
      genre: 'Urban Thriller',
      synopsis: 'Every building in the city remembers. Most cannot speak. One just learned how.',
      totalChapters: 10,
      latestChapter: 8,
      theme: 'light',
      cover: 'cover-concrete',
      accent: '#2a2a2a',
    },
    {
      id: 'echoes-fall',
      title: 'Echoes of Fall',
      author: 'Sarah Reads',
      genre: 'Literary Fiction',
      synopsis: 'Three sisters return to a shuttered orchard and find that the trees have been keeping score.',
      totalChapters: 20,
      latestChapter: 20,
      theme: 'light',
      cover: 'cover-echoes',
      accent: '#7a5a2e',
    },
    {
      id: 'long-winter',
      title: 'The Long Winter',
      author: 'Dani Amrani',
      genre: 'Post-Apocalyptic',
      synopsis: 'Year 47 of the snow. The last radio tower in the northern hemisphere has started receiving a reply.',
      totalChapters: 13,
      latestChapter: 12,
      theme: 'dark',
      cover: 'cover-winter',
      accent: '#5f7a82',
    },
    {
      id: 'concrete-horizon',
      title: 'The Concrete Horizon',
      author: 'E.R. Vance',
      genre: 'Sci-Fi',
      synopsis: 'A city built to outlast its architects begins to choose its own tenants.',
      totalChapters: 16,
      latestChapter: 14,
      theme: 'light',
      cover: 'cover-horizon',
      accent: '#1a1a1a',
    },
    {
      id: 'silent-echoes',
      title: 'Silent Echoes',
      author: 'M. Sterling',
      genre: 'Sci-Fi',
      synopsis: 'First contact was silent. So was the war that followed.',
      totalChapters: 8,
      latestChapter: 6,
      theme: 'dark',
      cover: 'cover-silent',
      accent: '#0c1a2e',
    },
  ];

  // ----- chapters (STITCH_ENGINE sample) -----
  const CHAPTERS = [
    { id: 1, act: 1, novel: 'stitch-engine', title: 'The Cold Boot Sequence', published: '2 weeks ago', cleared: true },
    { id: 2, act: 1, novel: 'stitch-engine', title: 'Fragments in the Cache', published: '12 days ago', cleared: true },
    { id: 3, act: 1, novel: 'stitch-engine', title: 'Syntax Error: Memory Corrupted', published: '9 days ago', cleared: true },
    { id: 4, act: 1, novel: 'stitch-engine', title: 'Compiling the First Thread', published: '6 days ago', cleared: true },
    { id: 5, act: 1, novel: 'stitch-engine', title: 'Executing Runtime Protocol', published: '2 days ago', cleared: false, current: true },
    { id: 6, act: 1, novel: 'stitch-engine', title: 'The Architecture of Silence', published: 'upcoming', locked: true },
    { id: 7, act: 1, novel: 'stitch-engine', title: 'Anomalous Data Packets', published: 'upcoming', locked: true },
    { id: 8, act: 2, novel: 'stitch-engine', title: 'Locked sequence', locked: true, act2: true },
    { id: 9, act: 2, novel: 'stitch-engine', title: 'Locked sequence', locked: true, act2: true },
    { id: 10, act: 2, novel: 'stitch-engine', title: 'Locked sequence', locked: true, act2: true },
  ];

  // ----- discussions / posts -----
  const POSTS = [
    {
      id: 'p1', novel: 'obsidian-throne', chapter: 3,
      author: 'EliasThorne', handle: '@EliasThorne', initials: 'ET',
      title: 'The pacing in Act 1 is phenomenal.',
      body: 'I\'m only three chapters in, but the way the world-building is layered without feeling like an info-dump is masterful. Does anyone else feel like the protagonist is an unreliable narrator?',
      age: '2h',
      likes: 142, comments: 28,
      type: 'discussion',
    },
    {
      id: 'p2', novel: 'echoes-fall', chapter: 42,
      author: 'SarahReads', handle: '@SarahReads', initials: 'SR',
      title: 'About that twist in Chapter 42...',
      body: 'I genuinely did not see the betrayal coming. The fact that he was working for the Syndicate the entire time changes the context of literally every interaction in the first book. My mind is completely blown.',
      age: '5h',
      likes: 890, comments: 156,
      spoiler: true,
      type: 'discussion',
    },
    {
      id: 'p3', novel: 'stitch-engine', chapter: 0,
      author: 'JD_TheCritique', handle: '@JD_TheCritique', initials: 'JD',
      title: 'Fan art of the Citadel. Exactly how I pictured it.',
      body: null,
      age: '1d',
      likes: 3200, comments: 402,
      type: 'fanart',
      hasImage: true,
      artStyle: 'citadel',
    },
    {
      id: 'p4', novel: 'stitch-engine', chapter: 12,
      author: 'CipherReader', handle: '@CipherReader', initials: 'CR',
      title: 'The revelation about the Architect\'s motives.',
      body: 'The revelation about the Architect\'s true motives completely changes the context of the first three chapters. Did anyone else catch the subtle foreshadowing in the dialogue during the train sequence?',
      age: '2h',
      likes: 42, comments: 15,
      type: 'discussion',
    },
    {
      id: 'p5', novel: 'stitch-engine', chapter: 24,
      author: 'Archivist_99', handle: '@Archivist_99', initials: 'A9',
      title: 'Chapter 24 — the glass shatter scene.',
      body: 'I can\'t believe they actually killed off the main antagonist this early. The power vacuum it leaves in the city is going to completely derail the protagonist\'s original plan. The description of the glass shattering was visceral.',
      age: '5h',
      likes: 128, comments: 56,
      spoiler: true,
      type: 'discussion',
    },
    {
      id: 'p6', novel: 'stitch-engine', chapter: 2,
      author: 'LoreSeeker', handle: '@LoreSeeker', initials: 'LS',
      title: 'Family tree mapping.',
      body: 'Mapped out the connections between the different families mentioned in the prologue. The structure looks awfully familiar to the old city layout.',
      age: '1d',
      likes: 89, comments: 34,
      type: 'theory',
    },
    {
      id: 'p7', novel: 'whispers-deep', chapter: 5,
      author: 'TidalDread', handle: '@TidalDread', initials: 'TD',
      title: 'The transmission in Ch. 5 is recorded.',
      body: 'I slowed down the audio file embedded in chapter 5 by 400%. There are words underneath the static. I am not okay.',
      age: '3h',
      likes: 512, comments: 88,
      type: 'theory',
    },
    {
      id: 'p8', novel: 'concrete-echoes', chapter: 4,
      author: 'UrbanGhost', handle: '@UrbanGhost', initials: 'UG',
      title: 'Meme I made after ch4.',
      body: null,
      age: '8h',
      likes: 721, comments: 49,
      type: 'meme',
      hasImage: true,
      artStyle: 'meme-concrete',
    },
  ];

  // ----- media / gallery -----
  const MEDIA = [
    { id: 'm1', novel: 'stitch-engine', type: 'official', title: 'The Spire — Exterior Concept', art: 'spire', chapter: 4 },
    { id: 'm2', novel: 'stitch-engine', type: 'fanart', title: 'Subject Identity Concealed', art: 'subject', spoiler: true, chapter: 8 },
    { id: 'm3', novel: 'stitch-engine', type: 'official', title: 'Stitch Engine Core Schematic', art: 'schematic', chapter: 3 },
    { id: 'm4', novel: 'stitch-engine', type: 'fanart', title: 'The Wastes of Sector 4', art: 'wastes', chapter: 4 },
    { id: 'm5', novel: 'stitch-engine', type: 'official', title: 'Event Alpha — Aftermath', art: 'aftermath', spoiler: true, chapter: 10 },
    { id: 'm6', novel: 'stitch-engine', type: 'meme', title: 'Protocol Error 404', art: 'protocol-error', chapter: 2 },
    { id: 'm7', novel: 'obsidian-throne', type: 'fanart', title: 'Archartist portrait', art: 'archartist', chapter: 2 },
    { id: 'm8', novel: 'obsidian-throne', type: 'meme', title: '"Ask who built them."', art: 'quote-meme', chapter: 1 },
    { id: 'm9', novel: 'obsidian-throne', type: 'fanart', title: 'Spoiler: Book 3', art: 'blur', spoiler: true, chapter: 38 },
    { id: 'm10', novel: 'obsidian-throne', type: 'fanart', title: 'Inksoul portrait', art: 'inksoul', chapter: 5 },
    { id: 'm11', novel: 'obsidian-throne', type: 'fanart', title: 'Spoiler: Finale', art: 'blur', spoiler: true, chapter: 47 },
    { id: 'm12', novel: 'obsidian-throne', type: 'official', title: 'Embers', art: 'embers', chapter: 20 },
    { id: 'm13', novel: 'whispers-deep', type: 'fanart', title: 'Safework', art: 'camera', chapter: 6 },
    { id: 'm14', novel: 'echoes-fall', type: 'fanart', title: 'The Orchard', art: 'orchard', chapter: 3 },
  ];

  // ----- state persistence -----
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...DEFAULT_USER, ...JSON.parse(raw) };
    } catch (e) { /* noop */ }
    return { ...DEFAULT_USER };
  }
  function save(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  let state = load();

  function setUser(patch) { state = { ...state, ...patch }; save(state); }
  function getUser() { return state; }
  function getNovel(id) { return NOVELS.find(n => n.id === id); }
  function getPost(id) { return POSTS.find(p => p.id === id); }

  // is a given item spoiler-hidden for the current user?
  // rule: if item.chapter > readCap for that novel → blur
  function isSpoiler(item) {
    if (!item) return false;
    if (item.spoiler) return true;
    const cap = state.readCaps?.[item.novel] ?? 0;
    if (item.chapter && item.chapter > cap) return true;
    return false;
  }

  return {
    NOVELS, CHAPTERS, POSTS, MEDIA,
    getUser, setUser, getNovel, getPost,
    isSpoiler, save, load,
  };
})();
