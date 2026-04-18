/* ============================================================
   STITCH — SHARED UI BEHAVIORS
   - global nav render
   - novel hover-nav (slides down at top edge)
   - spoiler toggle (event delegation)
   - procedurally-drawn covers & art (SVG)
   ============================================================ */

/* ------------------------------------------------------------
   GLOBAL NAV
   ------------------------------------------------------------ */
function renderGlobalNav(activeKey) {
  const nav = document.querySelector('[data-global-nav]');
  if (!nav) return;
  const items = [
    { key: 'home', label: 'Home', href: 'home.html' },
    { key: 'discover', label: 'Discover', href: 'discover.html' },
    { key: 'discussions', label: 'Discussions', href: 'global-discussions.html' },
    { key: 'media', label: 'Media', href: 'global-media.html' },
  ];
  const u = STITCH.getUser();
  nav.innerHTML = `
    <div class="brand">STITCH</div>
    <div class="nav-items">
      ${items.map(i => `<a class="nav-item ${i.key === activeKey ? 'active' : ''}" href="${i.href}">${i.label}</a>`).join('')}
    </div>
    <a href="profile.html" class="profile-btn" title="Profile">${u.initials}</a>
  `;
}

/* ------------------------------------------------------------
   NOVEL NAV — hidden by default, slides down on top-edge hover.
   Also includes the back-arrow to NovelSite at top-left.
   ------------------------------------------------------------ */
function mountNovelNav({ novelId, active, title }) {
  const n = STITCH.getNovel(novelId);
  if (!n) return;
  const host = document.createElement('div');
  host.className = 'nnav-host';
  host.innerHTML = `
    <div class="nnav-hotzone" aria-hidden="true"></div>
    <div class="nnav-pulse" aria-hidden="true"></div>
    <div class="nnav" role="navigation" aria-label="${n.title} navigation">
      <a href="home.html" class="nnav-back" title="Back to NovelSite" aria-label="Back to NovelSite">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </a>
      <div class="nnav-title">${n.title}</div>
      <div class="nnav-links">
        <a href="novel-home.html?id=${novelId}" class="nnav-link ${active==='home'?'active':''}">Novel</a>
        <a href="chapters.html?id=${novelId}" class="nnav-link ${active==='chapters'?'active':''}">Chapters</a>
        <a href="novel-discussions.html?id=${novelId}" class="nnav-link ${active==='discussions'?'active':''}">Discussions</a>
        <a href="novel-media.html?id=${novelId}" class="nnav-link ${active==='media'?'active':''}">Media</a>
        <a href="novel-community.html?id=${novelId}" class="nnav-link ${active==='community'?'active':''}">Community</a>
      </div>
    </div>
  `;
  document.body.appendChild(host);

  const nnav = host.querySelector('.nnav');
  const hot = host.querySelector('.nnav-hotzone');
  let timeout;
  const show = () => { clearTimeout(timeout); nnav.classList.add('open'); host.querySelector('.nnav-pulse').style.opacity = 0; };
  const hide = () => { timeout = setTimeout(() => nnav.classList.remove('open'), 600); };
  hot.addEventListener('mouseenter', show);
  nnav.addEventListener('mouseenter', show);
  hot.addEventListener('mouseleave', hide);
  nnav.addEventListener('mouseleave', hide);
  // touch: tap the pulse to toggle
  host.querySelector('.nnav-pulse').addEventListener('click', () => nnav.classList.toggle('open'));
}

/* ------------------------------------------------------------
   SPOILER TOGGLE — delegated
   ------------------------------------------------------------ */
document.addEventListener('click', (e) => {
  const s = e.target.closest('.spoiler:not(.revealed)');
  if (s && e.target.closest('.spoiler-overlay')) {
    s.classList.add('revealed');
    e.stopPropagation();
  }
});

/* ------------------------------------------------------------
   COVER ART — procedural SVG by id
   ------------------------------------------------------------ */
const COVERS = {
  'cover-stitch': `
    <svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="420" fill="#0d0d0f"/>
      <g stroke="#d14829" stroke-width="1" fill="none" opacity="0.9">
        ${Array.from({length:24}).map((_,i)=>`<line x1="0" y1="${i*18+20}" x2="300" y2="${i*18+26}" stroke-dasharray="${Math.random()*8+2},${Math.random()*10+2}"/>`).join('')}
      </g>
      <rect x="40" y="160" width="220" height="2" fill="#d14829"/>
      <text x="150" y="240" text-anchor="middle" fill="#ededed" font-family="Archivo" font-weight="900" font-size="44" letter-spacing="-2">STITCH</text>
      <text x="150" y="288" text-anchor="middle" fill="#ededed" font-family="Archivo" font-weight="900" font-size="44" letter-spacing="-2">ENGINE</text>
      <text x="150" y="380" text-anchor="middle" fill="#d14829" font-family="Archivo" font-weight="700" font-size="10" letter-spacing="4">SYSTEM ARCHITECT</text>
    </svg>`,
  'cover-obsidian': `
    <svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="420" fill="#14110e"/>
      <polygon points="150,40 260,200 150,380 40,200" fill="#2b211b" stroke="#8a6b4a" stroke-width="1"/>
      <polygon points="150,80 230,200 150,340 70,200" fill="#1c1612"/>
      <text x="150" y="210" text-anchor="middle" fill="#e8d5b5" font-family="Fraunces" font-weight="900" font-size="28">THE</text>
      <text x="150" y="240" text-anchor="middle" fill="#e8d5b5" font-family="Fraunces" font-weight="900" font-size="20">OBSIDIAN</text>
      <text x="150" y="265" text-anchor="middle" fill="#e8d5b5" font-family="Fraunces" font-weight="900" font-size="22">THRONE</text>
    </svg>`,
  'cover-whispers': `
    <svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="wg" cx="50%" cy="40%"><stop offset="0%" stop-color="#3a5a70"/><stop offset="100%" stop-color="#0a1820"/></radialGradient></defs>
      <rect width="300" height="420" fill="url(#wg)"/>
      ${Array.from({length:80}).map((_,i)=>`<circle cx="${Math.random()*300}" cy="${Math.random()*420}" r="${Math.random()*1.5}" fill="#c8dceb" opacity="${Math.random()*0.4+0.1}"/>`).join('')}
      <text x="150" y="220" text-anchor="middle" fill="#e8f0f5" font-family="Fraunces" font-style="italic" font-weight="400" font-size="28">Whispers</text>
      <text x="150" y="260" text-anchor="middle" fill="#e8f0f5" font-family="Fraunces" font-style="italic" font-weight="400" font-size="16">of the Deep</text>
    </svg>`,
  'cover-concrete': `
    <svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="420" fill="#8a8a86"/>
      ${Array.from({length:5}).map((_,i)=>`<rect x="${30+i*50}" y="${80+i*20}" width="40" height="${260-i*20}" fill="#5a5a56" stroke="#2a2a2a"/>`).join('')}
      <text x="150" y="380" text-anchor="middle" fill="#0a0a0a" font-family="Archivo" font-weight="900" font-size="24" letter-spacing="-1">CONCRETE ECHOES</text>
    </svg>`,
  'cover-echoes': `
    <svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="420" fill="#d8c8a0"/>
      <g opacity="0.4">${Array.from({length:8}).map((_,i)=>`<circle cx="${40+i*30}" cy="${200+Math.sin(i)*30}" r="20" fill="#7a5a2e"/>`).join('')}</g>
      <text x="150" y="250" text-anchor="middle" fill="#3a2818" font-family="Fraunces" font-weight="700" font-size="26">Echoes of Fall</text>
    </svg>`,
  'cover-winter': `
    <svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="420" fill="#c8d4da"/>
      <polygon points="0,260 90,220 160,250 230,200 300,240 300,420 0,420" fill="#e8ecef"/>
      <text x="150" y="180" text-anchor="middle" fill="#1a2830" font-family="Archivo" font-weight="900" font-size="36" letter-spacing="-1">THE LONG</text>
      <text x="150" y="214" text-anchor="middle" fill="#1a2830" font-family="Archivo" font-weight="900" font-size="36" letter-spacing="-1">WINTER</text>
    </svg>`,
  'cover-horizon': `
    <svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="420" fill="#0d0d0f"/>
      <g fill="#2a2a2a">
        ${Array.from({length:9}).map((_,i)=>`<rect x="${30+i*28}" y="${140+Math.random()*80}" width="${18+Math.random()*6}" height="${120+Math.random()*100}"/>`).join('')}
      </g>
      <text x="150" y="350" text-anchor="middle" fill="#f2f2f2" font-family="Archivo" font-weight="900" font-size="14" letter-spacing="2">CONCRETE HORIZON</text>
      <text x="150" y="385" text-anchor="middle" fill="#888" font-family="Archivo" font-weight="400" font-size="10" letter-spacing="3">BY E.R. VANCE</text>
    </svg>`,
  'cover-silent': `
    <svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="slg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0c1a2e"/><stop offset="100%" stop-color="#1a2840"/></linearGradient></defs>
      <rect width="300" height="420" fill="url(#slg)"/>
      <ellipse cx="150" cy="200" rx="120" ry="4" fill="#f0e8d0" opacity="0.8"/>
      <text x="150" y="170" text-anchor="middle" fill="#f0e8d0" font-family="Fraunces" font-weight="400" font-style="italic" font-size="44" letter-spacing="-2">S</text>
      <text x="150" y="290" text-anchor="middle" fill="#f0e8d0" font-family="Archivo" font-weight="300" font-size="10" letter-spacing="6">SILENT ECHOES</text>
    </svg>`,
};

function coverSvg(id) {
  return COVERS[id] || COVERS['cover-stitch'];
}

/* ------------------------------------------------------------
   ART ASSETS — procedural SVGs used in media galleries & posts
   ------------------------------------------------------------ */
const ART = {
  citadel: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#0d0d0f"/><g fill="#2a2a2a" stroke="#555" stroke-width="0.5">${Array.from({length:7}).map((_,i)=>`<polygon points="${30+i*50},${240} ${60+i*50},${80+i*8} ${90+i*50},${240}"/>`).join('')}</g><circle cx="200" cy="140" r="6" fill="#d14829"/><circle cx="180" cy="140" r="3" fill="#d14829"/><circle cx="220" cy="140" r="3" fill="#d14829"/></svg>`,
  subject: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#3a3530"/><circle cx="200" cy="130" r="55" fill="#5a4f44"/><rect x="155" y="180" width="90" height="100" fill="#4a4036"/></svg>`,
  schematic: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#0a1a2a"/><g fill="none" stroke="#5ad" stroke-width="1.2"><circle cx="200" cy="150" r="80"/><circle cx="200" cy="150" r="60"/><circle cx="200" cy="150" r="40"/><line x1="120" y1="150" x2="280" y2="150"/><line x1="200" y1="70" x2="200" y2="230"/></g><rect x="190" y="140" width="20" height="20" fill="#5ad"/></svg>`,
  wastes: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="w"><stop offset="0%" stop-color="#f2b705"/><stop offset="100%" stop-color="#d14829"/></radialGradient></defs><rect width="400" height="300" fill="#1a0e08"/><circle cx="200" cy="200" r="140" fill="url(#w)" opacity="0.7"/></svg>`,
  aftermath: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#2a2020"/><g fill="#5a3830">${Array.from({length:30}).map(()=>`<polygon points="${Math.random()*400},${Math.random()*300} ${Math.random()*400},${Math.random()*300} ${Math.random()*400},${Math.random()*300}"/>`).join('')}</g></svg>`,
  'protocol-error': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#4db6ac"/><circle cx="200" cy="130" r="60" fill="#f4d0a8"/><rect x="160" y="190" width="80" height="70" fill="#3a3a3a"/><text x="200" y="290" text-anchor="middle" fill="#0a0a0a" font-family="Archivo" font-weight="800" font-size="14">PROTOCOL ERROR 404</text></svg>`,
  archartist: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#0a0a0a"/><g fill="#2a2a2a">${Array.from({length:14}).map((_,i)=>`<polygon points="200,130 ${200+Math.cos(i*Math.PI/14)*90},${200-Math.sin(i*Math.PI/14)*60} ${200+Math.cos((i+1)*Math.PI/14)*90},${200-Math.sin((i+1)*Math.PI/14)*60}"/>`).join('')}</g><ellipse cx="200" cy="120" rx="30" ry="38" fill="#e8d5b5"/></svg>`,
  'quote-meme': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f4f2ec"/><text x="30" y="80" fill="#0a0a0a" font-family="Fraunces" font-weight="700" font-size="22" font-style="italic">"When they tell you</text><text x="30" y="115" fill="#0a0a0a" font-family="Fraunces" font-weight="700" font-size="22" font-style="italic">the walls are meant to</text><text x="30" y="150" fill="#0a0a0a" font-family="Fraunces" font-weight="700" font-size="22" font-style="italic">protect you, ask who</text><text x="30" y="185" fill="#0a0a0a" font-family="Fraunces" font-weight="700" font-size="22" font-style="italic">built them."</text><text x="30" y="240" fill="#d14829" font-family="Archivo" font-weight="700" font-size="10" letter-spacing="3">QUOTE MEME · @TRUTH_SEEKER</text></svg>`,
  blur: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><defs><filter id="bl"><feGaussianBlur stdDeviation="20"/></filter></defs><rect width="400" height="300" fill="#3a3a3a"/><g filter="url(#bl)"><rect x="50" y="50" width="300" height="200" fill="#7a5a40"/><circle cx="200" cy="150" r="60" fill="#c8a070"/></g></svg>`,
  inksoul: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#1a1a1a"/><g stroke="#888" stroke-width="0.5" fill="none">${Array.from({length:20}).map((_,i)=>`<line x1="${200-(i*8)}" y1="40" x2="200" y2="260"/>`).concat(Array.from({length:20}).map((_,i)=>`<line x1="${200+(i*8)}" y1="40" x2="200" y2="260"/>`)).join('')}</g><rect x="185" y="40" width="30" height="220" fill="#1a1a1a"/></svg>`,
  embers: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="em"><stop offset="0%" stop-color="#f2b705"/><stop offset="50%" stop-color="#d14829"/><stop offset="100%" stop-color="#1a0500"/></radialGradient></defs><rect width="400" height="300" fill="#0a0000"/><circle cx="120" cy="220" r="90" fill="url(#em)" opacity="0.8"/><circle cx="280" cy="100" r="60" fill="url(#em)" opacity="0.6"/></svg>`,
  camera: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#0d1520"/><rect x="80" y="90" width="240" height="150" rx="6" fill="#1a1a1a" stroke="#888"/><circle cx="200" cy="165" r="50" fill="#0a0a0a" stroke="#666" stroke-width="2"/><circle cx="200" cy="165" r="30" fill="#2a2a2a"/><rect x="260" y="100" width="40" height="20" fill="#333"/><text x="200" y="275" text-anchor="middle" fill="#888" font-family="Archivo" font-weight="600" font-size="10" letter-spacing="2">SAFEWORK</text></svg>`,
  orchard: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#d8c8a0"/><g fill="#5a3a1a">${Array.from({length:8}).map((_,i)=>`<rect x="${30+i*48}" y="140" width="6" height="80"/><circle cx="${33+i*48}" cy="130" r="22" fill="#3a2a18"/>`).join('')}</g><rect y="220" width="400" height="80" fill="#8a6a3a"/></svg>`,
  'meme-concrete': `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f4f2ec"/><rect x="20" y="20" width="360" height="180" fill="#8a8a86"/><text x="200" y="240" text-anchor="middle" fill="#0a0a0a" font-family="Impact, Archivo" font-weight="900" font-size="24">WHEN THE BUILDING</text><text x="200" y="270" text-anchor="middle" fill="#0a0a0a" font-family="Impact, Archivo" font-weight="900" font-size="24">STARTS TALKING BACK</text></svg>`,
  hero: `<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a1a30"/><stop offset="60%" stop-color="#d14829"/><stop offset="100%" stop-color="#1a0a10"/></linearGradient></defs><rect width="1600" height="900" fill="url(#sky)"/><g fill="#0a0a0a">${Array.from({length:30}).map((_,i)=>`<polygon points="${i*55},900 ${i*55+30},${500+Math.random()*150} ${i*55+60},900"/>`).join('')}</g><g fill="#0a0a0a" opacity="0.9">${Array.from({length:15}).map((_,i)=>`<rect x="${40+i*100}" y="${620+Math.random()*100}" width="${30+Math.random()*20}" height="${180+Math.random()*80}"/>`).join('')}</g></svg>`,
  chapter4: `<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="800" height="300" fill="#e8e6df"/><g fill="#0d0d0f">${Array.from({length:60}).map(()=>`<line x1="${Math.random()*800}" y1="${Math.random()*300}" x2="${Math.random()*800}" y2="${Math.random()*300}" stroke="#0d0d0f" stroke-width="${Math.random()*2}" opacity="${Math.random()*0.4}"/>`).join('')}</g><circle cx="400" cy="150" r="90" fill="#0d0d0f" opacity="0.06"/><circle cx="400" cy="150" r="60" fill="#0d0d0f" opacity="0.1"/></svg>`,
  brutalist: `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="800" height="500" fill="#2a2a2a"/><g fill="#3a3a3a">${Array.from({length:12}).map((_,i)=>`<rect x="${60+i*60}" y="${100+i*10}" width="50" height="${350-i*10}" stroke="#1a1a1a"/>`).join('')}</g><g fill="#4a4a4a">${Array.from({length:50}).map(()=>`<rect x="${Math.random()*800}" y="${Math.random()*500}" width="3" height="3"/>`).join('')}</g></svg>`,
  anomaly: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="200" fill="#1a1a1a"/><g stroke="#ededed" fill="none" stroke-width="0.7">${Array.from({length:18}).map((_,i)=>`<ellipse cx="150" cy="100" rx="${10+i*7}" ry="${5+i*3}" opacity="${1-i/18}"/>`).join('')}</g></svg>`,
};

function artSvg(id) {
  return ART[id] || `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#333"/><text x="200" y="160" text-anchor="middle" fill="#888" font-family="Archivo">${id}</text></svg>`;
}

/* ------------------------------------------------------------
   FORMATTING HELPERS
   ------------------------------------------------------------ */
function fmtNum(n) {
  if (n >= 1000) return (n/1000).toFixed(1).replace(/\.0$/,'') + 'k';
  return String(n);
}

function initials(name) {
  return name.split(/\s+/).map(p => p[0]).slice(0,2).join('').toUpperCase();
}
