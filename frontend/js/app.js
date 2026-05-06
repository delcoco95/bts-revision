/* ================================================================
   BTS SIO SISR — SPA v2 — Black & White
   ================================================================ */

const SUBJECTS = [
  { id:'sisr',    label:'SISR',             desc:'Modèle OSI, IP, VLANs, 802.1X, AD, routage, Docker',icon:'⊞', chapters:10 },
  { id:'cyber',   label:'Cybersécurité',    desc:'Attaques, firewall, cryptographie, SIEM, pentest, RGPD',icon:'◎', chapters:10 },
  { id:'cejm',    label:'CEJM (E3)',        desc:'Culture éco, juridique, managériale',         icon:'◇', chapters:10 },
  { id:'maths',   label:'Mathématiques',    desc:'Numération, Boole, stats, RSA, cryptographie',icon:'∑', chapters:8  },
  { id:'anglais', label:'Anglais',          desc:'IT English, progression A2 → B2',            icon:'◈', chapters:8  },
  { id:'culture', label:'Culture Générale', desc:'Synthèse, dissertation, expression',         icon:'◐', chapters:6  },
  { id:'e5',      label:'Épreuve E5',       desc:'Oral portfolio BTS SIO SISR',                icon:'▷', chapters:4  },
  { id:'e6',      label:'Épreuve E6',       desc:'Parcours de professionnalisation',           icon:'▷', chapters:3  },
  { id:'e7',      label:'Épreuve E7',       desc:'Admin systèmes et réseaux (SISR)',           icon:'▷', chapters:10 },
];
const SUBJECT_IDS = new Set(SUBJECTS.map(s => s.id));
const S = Object.fromEntries(SUBJECTS.map(s => [s.id, s]));
// Static mode: detect GitHub Pages or any non-localhost environment
const IS_STATIC = !['localhost','127.0.0.1'].includes(window.location.hostname);
const DATA_BASE = IS_STATIC ? './data' : null;

// Unified data fetcher: uses static files on GitHub Pages, API on localhost
async function dataFetch(type, id) {
  if (IS_STATIC) {
    const fname = type === 'sujets' ? sujets_.json
                : type === 'quiz'   ? quiz_.json
                : type === 'glossaire' ? 'glossaire.json'
                : type === 'acronymes' ? 'acronymes.json'
                : cours_.json;
    const r = await fetch(${DATA_BASE}/);
    return r.ok ? r.json() : null;
  }
  const url = type === 'sujets' ? /api/cours/sujets/
            : type === 'quiz'   ? /api/quiz/
            : type === 'glossaire' ? '/api/glossaire'
            : type === 'acronymes' ? '/api/acronymes'
            : /api/cours/;
  const r = await fetch(url);
  return r.ok ? r.json() : null;
}


const EXT_LINKS = {
  sisr:    [
    {label:'OpenClassrooms — Réseau',  url:'https://openclassrooms.com/fr/courses/1561696'},
    {label:'Cisco NetAcad',            url:'https://www.netacad.com/'},
    {label:'Doc Cisco',                url:'https://www.cisco.com/c/en/us/support/index.html'},
    {label:'RFC Editor',               url:'https://www.rfc-editor.org/'},
  ],
  cyber:   [
    {label:'ANSSI Guides',             url:'https://www.ssi.gouv.fr/entreprise/publications/'},
    {label:'OWASP',                    url:'https://owasp.org/'},
    {label:'HackTheBox',               url:'https://www.hackthebox.com/'},
    {label:'MITRE ATT&CK',            url:'https://attack.mitre.org/'},
  ],
  cejm:    [
    {label:'Legifrance',               url:'https://www.legifrance.gouv.fr/'},
    {label:'CNIL RGPD',                url:'https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on'},
    {label:'INSEE Données',            url:'https://www.insee.fr/fr/statistiques'},
  ],
  maths:   [
    {label:'Khan Academy Maths',       url:'https://fr.khanacademy.org/math'},
    {label:'Mathsenpoche BTS',         url:'https://www.mathsenpoche.com/'},
    {label:'APMEP Annales BTS',        url:'https://www.apmep.fr/Annales-BTS'},
  ],
  anglais: [
    {label:'BBC Learning English',     url:'https://www.bbc.co.uk/learningenglish/'},
    {label:'English Grammar Online',  url:'https://www.ego4u.com/'},
    {label:'IT English Podcast',       url:'https://www.twit.tv/'},
    {label:'Grammarly',                url:'https://www.grammarly.com/'},
  ],
  culture: [
    {label:'Le Monde',                 url:'https://www.lemonde.fr/'},
    {label:'France Culture',           url:'https://www.radiofrance.fr/franceculture'},
    {label:'Courrier International',   url:'https://www.courrierinternational.com/'},
  ],
  e5:      [
    {label:'Référentiel BTS SIO',      url:'https://www.reseaucerta.org/'},
    {label:'Exemples portfolios',      url:'https://btssio.net/'},
  ],
  e7:      [
    {label:'Microsoft Learn AD',       url:'https://learn.microsoft.com/fr-fr/windows-server/identity/'},
    {label:'Doc Linux Ubuntu',         url:'https://doc.ubuntu-fr.org/'},
    {label:'Docker Docs',              url:'https://docs.docker.com/'},
  ],
};

let state = {
  page: 'dashboard', subject: null, chapterIdx: 0,
  progress: {}, coursData: {}, quizData: {},
  glossaireData: null, acronymesData: null,
};

/* ─────────────────────── INIT ─────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  setupSidebarToggle();
  setupNav();
  setupSearch();
  navigate('dashboard');
  renderSidebarProgress();
});

function setupSidebarToggle() {
  const btn = document.getElementById('menuToggle');
  const sb  = document.getElementById('sidebar');
  if (btn) btn.addEventListener('click', () => sb.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (sb && !sb.contains(e.target) && !btn.contains(e.target))
      sb.classList.remove('open');
  });
}

function setupNav() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const nav = el.dataset.nav;
      if (SUBJECT_IDS.has(nav)) navigate('subject', nav);
      else navigate(nav);
      document.getElementById('sidebar').classList.remove('open');
    });
  });
}

function setupSearch() {
  const inp = document.getElementById('globalSearch');
  const box = document.getElementById('searchResults');
  if (!inp) return;
  let t;
  inp.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(() => runSearch(inp.value.trim(), box), 250);
  });
  document.addEventListener('click', e => {
    if (!inp.contains(e.target) && !box.contains(e.target))
      box.classList.remove('open');
  });
}

async function runSearch(q, box) {
  if (!q || q.length < 2) { box.classList.remove('open'); return; }
  const ql = q.toLowerCase();
  const hits = [];

  SUBJECTS.forEach(s => {
    if (s.label.toLowerCase().includes(ql) || s.desc.toLowerCase().includes(ql))
      hits.push({ sub:'Matière', label:s.label, fn:() => navigate('subject', s.id) });
    const d = state.coursData[s.id];
    if (d) (d.chapitres||[]).forEach((ch,i) => {
      if ((ch.titre||'').toLowerCase().includes(ql))
        hits.push({ sub:s.label, label:ch.titre||ch.chapitre||ch.title, fn:() => navigate('reader',s.id,i) });
    });
  });

  if (state.glossaireData)
    state.glossaireData.filter(g=>g.terme.toLowerCase().includes(ql)).slice(0,3).forEach(g =>
      hits.push({ sub:'Glossaire', label:g.terme, fn:()=>navigate('glossaire') }));

  if (state.acronymesData)
    state.acronymesData.filter(a=>a.acronyme.toLowerCase().includes(ql)).slice(0,3).forEach(a =>
      hits.push({ sub:'Acronymes', label:a.acronyme+' — '+a.signification, fn:()=>navigate('acronymes') }));

  box.innerHTML = hits.slice(0,8).map((h,i) =>
    `<div class="search-item" data-i="${i}"><div class="si-sub">${h.sub}</div>${h.label}</div>`
  ).join('') || '<div class="search-item"><div class="si-sub">Aucun résultat</div></div>';

  hits.slice(0,8).forEach((h,i) => {
    const el = box.querySelector(`[data-i="${i}"]`);
    if (el) el.addEventListener('click', () => { h.fn(); box.classList.remove('open'); });
  });
  box.classList.add('open');
}

/* ─────────────────────── NAVIGATION ─────────────────────── */
window.navigate = function(page, subject, chapIdx) {
  state.page = page;
  if (subject !== undefined) state.subject = subject;
  if (chapIdx !== undefined) state.chapterIdx = chapIdx;
  updateActiveNav();
  const c = document.getElementById('pageContainer');
  if (!c) return;
  renderPage(c);
  document.getElementById('mainArea')?.scrollTo(0, 0);
};

function updateActiveNav() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.classList.remove('active');
    const nav = el.dataset.nav;
    const match = (state.page === nav) ||
                  (state.page === 'subject' && nav === state.subject) ||
                  (state.page === 'reader'  && nav === state.subject) ||
                  (state.page === 'quiz'    && nav === state.subject) ||
                  (state.page === 'sujets'  && nav === state.subject);
    if (match) el.classList.add('active');
  });
}

function renderPage(c) {
  const routes = {
    dashboard: () => renderDashboard(c),
    subject:   () => renderSubjectLanding(c, state.subject),
    reader:    () => renderReader(c, state.subject, state.chapterIdx),
    quiz:      () => renderQuizPage(c, state.subject),
    sujets:    () => renderSujetsPage(c, state.subject),
    glossaire: () => renderGlossairePage(c),
    acronymes: () => renderAcronymesPage(c),
    chat:      () => renderChatPage(c),
    jury:      () => renderJuryPage(c),
    planning:  () => renderPlanningPage(c),
  };
  const fn = routes[state.page];
  if (fn) fn(); else c.innerHTML = '<div style="padding:40px;color:#666">Page inconnue</div>';
}

/* ─────────────────────── DASHBOARD ─────────────────────── */
function renderDashboard(c) {
  const allChaps = SUBJECTS.reduce((s,x) => s+x.chapters, 0);
  const doneChaps = Object.values(state.progress).reduce((s,a) => s+(a?a.length:0), 0);
  const pct = Math.round((doneChaps/allChaps)*100)||0;

  c.innerHTML = `
    <div class="welcome-bar">
      <div>
        <div class="wb-title">Bonjour Nedj 👋</div>
        <div class="wb-sub">Plateforme BTS SIO SISR 2026 — IRIS Nice<br>
          Cours complets, quiz, sujets officiels, assistant IA, simulation jury.</div>
        <div class="wb-stats">
          <div class="stat-box"><div class="stat-val">${SUBJECTS.length}</div><div class="stat-lbl">Matières</div></div>
          <div class="stat-box"><div class="stat-val">${doneChaps}<span style="font-size:.7em;color:#666">/${allChaps}</span></div><div class="stat-lbl">Chapitres</div></div>
          <div class="stat-box"><div class="stat-val">${pct}%</div><div class="stat-lbl">Progression</div></div>
        </div>
      </div>
      <div class="session-badge">BTS SIO SISR<br>Session 2026</div>
    </div>

    <div class="sec-title">Accès rapide</div>
    <div class="quick-grid">
      <div class="quick-btn" onclick="navigate('glossaire')"><div class="qb-label">◈ Glossaire IT</div></div>
      <div class="quick-btn" onclick="navigate('acronymes')"><div class="qb-label">◇ Acronymes</div></div>
      <div class="quick-btn" onclick="navigate('chat')"><div class="qb-label">◎ Assistant IA</div></div>
      <div class="quick-btn" onclick="navigate('jury')"><div class="qb-label">◐ Jury IA</div></div>
      <div class="quick-btn" onclick="navigate('planning')"><div class="qb-label">◷ Planning</div></div>
    </div>

    <div class="sec-title">Matières</div>
    <div class="subject-grid">
      ${SUBJECTS.map(s => {
        const done = (state.progress[s.id]||[]).length;
        const p = s.chapters ? Math.round((done/s.chapters)*100) : 0;
        return `<div class="subject-card" onclick="navigate('subject','${s.id}')">
          <div class="sc-tag">${s.id.toUpperCase()}</div>
          <div class="sc-title">${s.label}</div>
          <div class="sc-desc">${s.desc}</div>
          <div class="sc-foot">
            <div class="sc-chap">${s.chapters} chapitres</div>
            <div class="sc-pct">${p}%</div>
          </div>
          <div class="sc-bar"><div class="sc-bar-fill" style="width:${p}%"></div></div>
        </div>`;
      }).join('')}
    </div>`;
}

function renderSidebarProgress() {
  const el = document.getElementById('sidebarProgress');
  if (!el) return;
  el.innerHTML = SUBJECTS.slice(0,6).map(s => {
    const done = (state.progress[s.id]||[]).length;
    const p = s.chapters ? Math.round((done/s.chapters)*100) : 0;
    return `<div class="sp-row">
      <div class="sp-label">${s.label}</div>
      <div class="sp-bar"><div class="sp-fill" style="width:${p}%"></div></div>
      <div class="sp-pct">${p}%</div>
    </div>`;
  }).join('');
}

/* ─────────────────────── SUBJECT LANDING ─────────────────────── */
async function renderSubjectLanding(c, id) {
  const s = S[id]; if (!s) return;
  c.innerHTML = '<div style="padding:40px;text-align:center"><span class="spinner"></span></div>';
  const cours = await fetchCours(id);
  const chaps = cours.chapitres || [];
  const done  = state.progress[id] || [];
  const pct   = chaps.length ? Math.round((done.length/chaps.length)*100) : 0;

  c.innerHTML = `
    <div class="course-header">
      <div class="breadcrumb"><span onclick="navigate('dashboard')">Accueil</span><span class="sep">›</span><span>${s.label}</span></div>
      <div class="ch-title">${s.label}</div>
      <div class="ch-desc">${s.desc}</div>
      <div class="ch-meta">
        <span><strong>${chaps.length}</strong> chapitres</span>
        <span><strong>${done.length}</strong> terminés</span>
        <span><strong>${pct}%</strong> complété</span>
      </div>
    </div>
    <div class="course-actions">
      <button class="btn btn-white" onclick="navigate('reader','${id}',0)">▷ Commencer</button>
      <button class="btn" onclick="navigate('quiz','${id}')">Quiz</button>
      <button class="btn" onclick="navigate('sujets','${id}')">Sujets BTS</button>
    </div>
    ${(EXT_LINKS[id]||[]).length ? `
      <div class="ext-links">
        <div class="ext-links-title">Ressources externes</div>
        <div class="ext-link-list">
          ${(EXT_LINKS[id]||[]).map(l => `<a class="ext-link" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('')}
        </div>
      </div>` : ''}
    <div class="sec-title" style="margin-top:20px">Chapitres</div>
    <div class="chapter-list">
      ${chaps.map((ch,i) => {
        const isDone = done.includes(i);
        return `<div class="chapter-row ${isDone?'done':i===0?'current':''}" onclick="navigate('reader','${id}',${i})">
          <div class="cr-num">${isDone?'✓':i+1}</div>
          <div class="cr-body">
            <div class="cr-sub">Chapitre ${i+1}</div>
            <div class="cr-title">${ch.titre||ch.chapitre||ch.title||'Sans titre'}</div>
            <div class="cr-meta">${(ch.sections||[]).length} sections</div>
          </div>
          <div class="cr-arrow">›</div>
        </div>`;
      }).join('')}
    </div>`;
}

/* ─────────────────────── READER ─────────────────────── */
async function renderReader(c, id, idx) {
  const s = S[id]; if (!s) return;
  c.style.padding = '0';
  c.innerHTML = '<div style="padding:40px;text-align:center"><span class="spinner"></span></div>';
  const cours = await fetchCours(id);
  const chaps = cours.chapitres || [];
  if (!chaps.length) {
    c.style.padding = ''; c.innerHTML = '<div style="padding:40px;color:#666">Aucun cours disponible.</div>'; return;
  }
  const i    = Math.max(0, Math.min(idx, chaps.length-1));
  const ch   = chaps[i];
  const done = state.progress[id] || [];
  const pct  = Math.round(((i+1)/chaps.length)*100);
  const isDone = done.includes(i);

  c.innerHTML = `
    <div class="reader-wrap">
      <div class="reader-toc">
        <div class="toc-back" onclick="navigate('subject','${id}')">‹ ${s.label}</div>
        <div class="toc-title">${s.label}</div>
        <div class="toc-bar">
          <div class="toc-bar-track"><div class="toc-bar-fill" style="width:${Math.round((done.length/chaps.length)*100)}%"></div></div>
          <div class="toc-bar-label">${done.length}/${chaps.length} terminés</div>
        </div>
        <ul class="toc-list">
          ${chaps.map((c2,j) => {
            const d = done.includes(j);
            return `<li class="toc-item"><a onclick="navigate('reader','${id}',${j})" class="${j===i?'toc-active':''} ${d?'toc-done':''}">
              <span class="toc-check">${d?'✓':'○'}</span>
              <span class="toc-label">${c2.titre||c2.title||'Chapitre '+(j+1)}</span>
            </a></li>`;
          }).join('')}
        </ul>
      </div>
      <div class="reader-body">
        <div class="reader-topbar">
          <div class="reader-progress-line"><div class="reader-progress-fill" style="width:${pct}%"></div></div>
          <div class="reader-crumb">
            <span onclick="navigate('dashboard')">Accueil</span>
            <span class="sep">›</span>
            <span onclick="navigate('subject','${id}')">${s.label}</span>
            <span class="sep">›</span>
            <span>${ch.titre||ch.chapitre||ch.title}</span>
          </div>
        </div>
        <div class="reader-content">
          <div class="rc-chap-num">Chapitre ${i+1} / ${chaps.length}</div>
          <div class="rc-chap-title">${ch.titre||ch.chapitre||ch.title}</div>
          ${ch.domaine?`<div class="rc-domain">${ch.domaine}</div>`:''}
          <hr class="rc-divider">
          ${renderChapContent(ch, id)}
          ${(EXT_LINKS[id]||[]).length ? `
            <div class="ext-links" style="margin-top:24px">
              <div class="ext-links-title">Aller plus loin</div>
              <div class="ext-link-list">
                ${(EXT_LINKS[id]||[]).map(l => `<a class="ext-link" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('')}
              </div>
            </div>` : ''}
          <div class="reader-nav">
            ${i>0 ? `<button class="rn-btn" onclick="navigate('reader','${id}',${i-1})">
              <div class="rn-dir">◀ Précédent</div>
              <div class="rn-label">${chaps[i-1].titre||chaps[i-1].title}</div>
            </button>` : '<div></div>'}
            <button class="mark-done-btn ${isDone?'done':''}" onclick="toggleDone('${id}',${i})">
              ${isDone ? '✓ Terminé' : 'Marquer terminé'}
            </button>
            ${i<chaps.length-1 ? `<button class="rn-btn" onclick="navigate('reader','${id}',${i+1})" style="text-align:right">
              <div class="rn-dir">Suivant ▶</div>
              <div class="rn-label">${chaps[i+1].titre||chaps[i+1].title}</div>
            </button>` : '<div></div>'}
          </div>
        </div>
      </div>
    </div>`;
}

function renderChapContent(ch, subjectId) {
  let h = '';
  if (ch.introduction) h += `<div class="rc-section"><div class="rc-text"><p>${ch.introduction}</p></div></div>`;
  if (ch.contenu && typeof ch.contenu === 'string') h += `<div class="rc-section"><div class="rc-text">${md2html(ch.contenu)}</div></div>`;
  if (ch.cours && typeof ch.cours === 'string') h += `<div class="rc-section"><div class="rc-text">${md2html(ch.cours)}</div></div>`;

  const sections = ch.sections || ch.sous_sections || [];
  sections.forEach((sec, si) => {
    const title   = sec.titre  || sec.title   || '';
    const text    = sec.contenu|| sec.content || sec.texte || sec.text || '';
    const methode = sec.methode || sec.methodes || '';
    const exemple = sec.exemple || sec.example || '';
    const code    = sec.code   || '';

    h += `<div class="rc-section">
      <div class="rc-sec-title">${si+1}. ${title}</div>
      <div class="rc-text">${md2html(text)}</div>`;

    if (methode) h += `<div class="callout callout-tip"><div class="c-title">Méthode</div>${md2html(typeof methode==='string'?methode:methode.join('\n'))}</div>`;
    if (exemple) h += `<div class="callout callout-example"><div class="c-title">Exemple concret</div>${escHtml(exemple)}</div>`;
    if (code)    h += `<div class="code-wrap"><div class="code-header"><span class="code-lang">${sec.lang||'bash'}</span><button class="code-copy" onclick="copyCode(this)">Copier</button></div><pre><code>${escHtml(code)}</code></pre></div>`;

    const notions = sec.notions_cles || sec.notions || [];
    if (notions.length) {
      h += '<div class="notions-wrap">';
      notions.forEach(n => {
        if (typeof n === 'string') h += `<div class="notion-pill">${n}</div>`;
        else h += `<div class="notion-pill">${n.terme||n.nom||n}<div class="np-tooltip">${n.definition||n.desc||''}</div></div>`;
      });
      h += '</div>';
    }
    h += '</div>';
  });

  if (ch.notions_cles && ch.notions_cles.length) {
    h += '<div class="rc-section"><div class="rc-sec-title">Notions clés</div><div class="notions-wrap">';
    ch.notions_cles.forEach(n => {
      if (typeof n==='string') h += `<div class="notion-pill">${n}</div>`;
      else h += `<div class="notion-pill">${n.terme||n.nom}<div class="np-tooltip">${n.definition||n.desc||''}</div></div>`;
    });
    h += '</div></div>';
  }

  // Exercises from JSON
  const exs = ch.exercices || ch.quiz || ch.exercice || [];
  if (exs && exs.length) {
    h += '<div class="rc-section"><div class="rc-sec-title">Exercices</div>';
    exs.forEach((ex,i) => h += renderExercise(ex,i));
    h += '</div>';
  }

  // AI dynamic exercise zone
  h += `<div class="rc-section">
    <div class="rc-sec-title">Exercice dynamique IA</div>
    <div class="exercise-block" id="aiex-${subjectId}">
      <div class="ex-header"><div class="ex-badge">IA</div><div class="ex-ai-badge">Généré par Gemini</div></div>
      <div class="ex-ai-generate">
        <div style="font-size:.83rem;color:#666;margin-bottom:8px">Demandez à l'IA un exercice sur ce chapitre :</div>
        <textarea class="ex-ai-input" id="exReq-${subjectId}" rows="2" placeholder="Ex: Explique-moi le routage OSPF avec un exercice pratique..."></textarea>
        <div style="margin-top:8px;display:flex;gap:8px">
          <button class="btn btn-sm btn-white" onclick="genAIExercise('${subjectId}','${escAttr(ch.titre||ch.chapitre||ch.title||'')}')">Générer l'exercice</button>
          <button class="btn btn-sm" onclick="genAIQuizFromTopic('${subjectId}','${escAttr(ch.titre||ch.chapitre||ch.title||'')}')">Quiz rapide</button>
        </div>
        <div id="aiexResult-${subjectId}" style="margin-top:12px"></div>
      </div>
    </div>
  </div>`;

  if (ch.points_cles || ch.a_retenir) {
    const items = ch.points_cles || ch.a_retenir;
    h += '<div class="rc-section"><div class="rc-sec-title">À retenir</div><ul class="checklist">';
    items.forEach(it => h += `<li>${it}</li>`);
    h += '</ul></div>';
  }

  return h || '<div class="callout callout-note"><div class="c-title">Note</div>Contenu en cours de chargement.</div>';
}

function renderExercise(ex, idx) {
  const choices = ex.choix || ex.choices || [];
  const correct = ex.reponse_correcte !== undefined ? ex.reponse_correcte : (ex.correct !== undefined ? ex.correct : -1);
  return `<div class="exercise-block">
    <div class="ex-header"><div class="ex-badge">Exercice ${idx+1}</div><div class="ex-ai-badge">${ex.type||'QCM'}</div></div>
    <div class="ex-body">
      <div class="ex-q">${ex.question||ex.enonce||''}</div>
      ${choices.length ? `<div class="ex-choices">${choices.map((ch2,ci) =>
        `<div class="ex-choice" onclick="checkEx(this,${ci},${correct})">
          <span class="choice-letter">${String.fromCharCode(65+ci)}</span>${ch2}
        </div>`).join('')}</div>` : ''}
      <div class="ex-correction">${ex.explication||ex.correction||''}</div>
    </div>
    <div class="ex-footer">
      <button class="btn btn-sm" onclick="showCorr(this)">Voir correction</button>
      <button class="btn btn-sm btn-ghost" onclick="askAICorrect(this,'${escAttr(ex.question||'')}')">Aide IA</button>
    </div>
  </div>`;
}

window.checkEx = function(el, ci, correct) {
  el.closest('.ex-choices').querySelectorAll('.ex-choice').forEach((c2,i) => {
    c2.classList.remove('correct','wrong');
    if (i===correct) c2.classList.add('correct');
    else if (i===ci)  c2.classList.add('wrong');
  });
};
window.showCorr = function(btn) {
  btn.closest('.exercise-block').querySelector('.ex-correction').classList.add('show');
};
window.askAICorrect = async function(btn, question) {
  const block = btn.closest('.exercise-block');
  const ans   = block.querySelector('.ex-body')?.textContent || '';
  const res   = await aiCall('/api/ai/correct', { question, userAnswer: ans, subject:'BTS SIO SISR' });
  const c2    = block.querySelector('.ex-correction');
  c2.innerHTML = formatAIText(res.correction || res.error || 'Erreur IA');
  c2.classList.add('show');
};

window.genAIExercise = async function(subjectId, chapTitle) {
  const req = document.getElementById(`exReq-${subjectId}`)?.value || chapTitle;
  const out = document.getElementById(`aiexResult-${subjectId}`);
  if (!out) return;
  out.innerHTML = '<span class="spinner"></span> Génération en cours...';
  const res = await aiCall('/api/ai/chat', { message: `Crée un exercice pratique BTS SIO SISR sur : "${req}" (chapitre: ${chapTitle}). Format : question claire, 4 propositions A/B/C/D, bonne réponse indiquée, explication détaillée.` });
  out.innerHTML = `<div class="callout callout-note" style="margin-top:0">${formatAIText(res.response||res.reply||res.error||'Erreur')}</div>`;
};

window.genAIQuizFromTopic = async function(subjectId, chapTitle) {
  const out = document.getElementById(`aiexResult-${subjectId}`);
  if (!out) return;
  out.innerHTML = '<span class="spinner"></span> Génération quiz...';
  const res = await aiCall('/api/ai/chat', { message: `Génère 3 questions QCM BTS SIO SISR sur "${chapTitle}". Pour chaque question : question, 4 choix (A/B/C/D), bonne réponse, explication courte. Formate clairement.` });
  out.innerHTML = `<div class="callout callout-note" style="margin-top:0">${formatAIText(res.response||res.reply||res.error||'Erreur')}</div>`;
};

/* ─────────────────────── QUIZ PAGE ─────────────────────── */
async function renderQuizPage(c, id) {
  const s = S[id]; if (!s) return;
  c.innerHTML = '<div style="padding:40px;text-align:center"><span class="spinner"></span></div>';
  const data = await fetchQuiz(id);
  const qs   = data.questions || [];

  c.innerHTML = `
    <div class="page-title">Quiz — ${s.label}</div>
    <div class="page-sub">${qs.length} questions · <button class="btn btn-sm btn-white" onclick="genAIQuizFull('${id}')">+ Générer quiz IA</button></div>
    <div class="quiz-wrap">
      <div id="aiQuizZone-${id}"></div>
      ${qs.map((q,i) => renderQCard(q,i)).join('')}
      ${!qs.length ? '<div class="empty">Aucune question disponible. Utilisez le bouton "Générer quiz IA" ci-dessus.</div>' : ''}
    </div>`;
}

window.genAIQuizFull = async function(id) {
  const s = S[id]; if (!s) return;
  const zone = document.getElementById(`aiQuizZone-${id}`);
  if (!zone) return;
  zone.innerHTML = '<span class="spinner"></span> Génération en cours...';
  const res = await aiCall('/api/ai/chat', { message: `Génère 5 questions QCM variées pour réviser "${s.label}" au niveau BTS SIO SISR. Format JSON : [{question, choix:[], reponse_correcte:0, explication}]. Renvoie uniquement le JSON.` });
  const text = res.response || res.reply || '';
  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const qs = JSON.parse(jsonMatch[0]);
      zone.innerHTML = `<div style="margin-bottom:14px;font-size:.8rem;color:#666">— Quiz généré par IA (${qs.length} questions) —</div>` + qs.map((q,i) => renderQCard(q,i+100)).join('');
      return;
    }
  } catch(e) {}
  zone.innerHTML = `<div class="callout callout-note">${formatAIText(text)}</div>`;
};

function renderQCard(q, idx) {
  const choices = q.choix || q.choices || [];
  const qtype = (q.type||'qcm').toLowerCase();
  const uid = `q_${idx}_${Date.now()}`;

  // Find correct answer index for QCM
  let correctIdx = -1;
  if (qtype === 'qcm' || choices.length > 0) {
    const rc = q.reponse_correcte;
    if (typeof rc === 'number') correctIdx = rc;
    else if (typeof rc === 'string') correctIdx = choices.findIndex(c => c === rc || c.startsWith(rc));
    else if (q.correct !== undefined) correctIdx = q.correct;
  }

  const correctStr = q.reponse_correcte !== undefined ? String(q.reponse_correcte) : '';
  const expl = q.explication || '';
  const corrTxt = q.reponse_correcte !== undefined ? `<div class="q-correct-ans"><strong>Réponse :</strong> ${correctStr}</div>` : '';

  let bodyHtml = '';

  if (qtype === 'cas_pratique' || qtype === 'pratique') {
    // Open-ended: textarea + submit
    bodyHtml = `
      <div class="q-open-area">
        <textarea class="q-textarea" id="ta_${uid}" placeholder="Rédigez votre réponse ici..." rows="5"></textarea>
        <button class="btn btn-sm" onclick="qSubmitOpen('${uid}')">Vérifier / Afficher la correction</button>
      </div>
      <div class="q-expl" id="expl_${uid}">
        ${corrTxt}
        ${expl ? `<div class="q-expl-text">${expl}</div>` : ''}
      </div>`;
  } else if (qtype === 'vrai_faux') {
    const vfCorrect = q.reponse_correcte === true || String(q.reponse_correcte).toLowerCase() === 'vrai' || String(q.reponse_correcte).toLowerCase() === 'true';
    bodyHtml = `
      <div class="q-vf-row">
        <button class="q-vf-btn" onclick="qCheckVF(this, true, ${vfCorrect}, '${uid}')">Vrai</button>
        <button class="q-vf-btn" onclick="qCheckVF(this, false, ${vfCorrect}, '${uid}')">Faux</button>
      </div>
      <div class="q-expl" id="expl_${uid}">
        ${corrTxt}
        ${expl ? `<div class="q-expl-text">${expl}</div>` : ''}
      </div>`;
  } else {
    // QCM default
    bodyHtml = `
      <div class="q-choices" id="choices_${uid}">
        ${choices.map((ch2,ci) => `<div class="q-choice" onclick="qCheck(this,${ci},${correctIdx},'${uid}')">
          <strong>${String.fromCharCode(65+ci)}.</strong> ${ch2}
        </div>`).join('')}
      </div>
      <div class="q-expl" id="expl_${uid}">
        ${corrTxt}
        ${expl ? `<div class="q-expl-text">${expl}</div>` : ''}
      </div>
      <div style="margin-top:10px"><button class="btn btn-sm btn-ghost" onclick="qReveal('${uid}')">Afficher correction</button></div>`;
  }

  return `<div class="q-card" id="card_${uid}">
    <div class="q-card-head"><span>Q${idx+1}</span><span class="q-type-badge">${q.type||'QCM'}</span></div>
    <div class="q-body">
      <div class="q-text">${q.question||q.enonce||''}</div>
      ${bodyHtml}
    </div>
  </div>`;
}

window.qCheck = function(el, ci, correct, uid) {
  el.closest('.q-choices').querySelectorAll('.q-choice').forEach((c2,i) => {
    c2.classList.remove('correct','wrong');
    if (i===correct) c2.classList.add('correct');
    else if (i===ci && i!==correct) c2.classList.add('wrong');
  });
  qReveal(uid);
};

window.qCheckVF = function(btn, value, correct, uid) {
  const row = btn.closest('.q-vf-row');
  row.querySelectorAll('.q-vf-btn').forEach(b => {
    b.classList.remove('vf-correct','vf-wrong');
    const bVal = b.textContent.trim().toLowerCase() === 'vrai';
    if (bVal === correct) b.classList.add('vf-correct');
    else if (bVal === value && value !== correct) b.classList.add('vf-wrong');
  });
  qReveal(uid);
};

window.qSubmitOpen = function(uid) {
  qReveal(uid);
  const ta = document.getElementById(`ta_${uid}`);
  if (ta) ta.classList.add('submitted');
};

window.qReveal = function(uid) {
  const el = document.getElementById(`expl_${uid}`);
  if (el) el.classList.add('show');
};


/* ─────────────────────── SUJETS ─────────────────────── */
async function renderSujetsPage(c, id) {
  const s = S[id]; if (!s) return;
  c.innerHTML = '<div style="padding:40px;text-align:center"><span class="spinner"></span></div>';
  let sujets = [];
  try {
    const r = await fetch(`/api/cours/sujets/${id}`);
    if (r.ok) sujets = await r.json();
  } catch(e) {}

  c.innerHTML = `
    <div class="page-title">Sujets BTS — ${s.label}</div>
    <div class="page-sub">${sujets.length} sujet(s)</div>
    ${!sujets.length ? '<div class="empty">Aucun sujet disponible.</div>' : sujets.map(sj => `
      <div class="sujet-card">
        <div class="sj-header">
          <div>
            <div class="sj-title">${sj.titre||'Sujet'}</div>
            <div class="sj-meta">${sj.annee||''} ${sj.duree?'· '+sj.duree:''}</div>
          </div>
          <div class="sj-badge">${sj.type||'Sujet type'}</div>
        </div>
        <div class="sj-enonce">${sj.enonce||sj.sujet||''}</div>
        <div class="sj-correction-area">
          <button class="btn btn-sm" onclick="toggleCorr(this)">Afficher la correction</button>
          <div class="sj-correction">${typeof sj.correction === 'object' ? (sj.correction.contenu||'') : (sj.correction||'')}</div>
        </div>
      </div>`).join('')}`;
}
window.toggleCorr = function(btn) {
  const d = btn.nextElementSibling;
  d.classList.toggle('show');
  btn.textContent = d.classList.contains('show') ? 'Masquer la correction' : 'Afficher la correction';
};

/* ─────────────────────── GLOSSAIRE ─────────────────────── */
async function renderGlossairePage(c) {
  if (!state.glossaireData) {
    c.innerHTML = '<div style="padding:40px;text-align:center"><span class="spinner"></span></div>';
    try { const gd = await dataFetch('glossaire', null); if(gd) state.glossaireData = gd; } catch(e) {}
  }
  const data = state.glossaireData || [];
  c.innerHTML = `
    <div class="page-title">Glossaire IT</div>
    <div class="page-sub">${data.length} définitions</div>
    <div class="dict-controls">
      <input class="dict-search" placeholder="Rechercher un terme..." oninput="filterGloss(this.value)">
      <div class="az-btns">
        <button class="az-btn on" onclick="filterGlossL('ALL',this)">Tout</button>
        ${[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(l=>`<button class="az-btn" onclick="filterGlossL('${l}',this)">${l}</button>`).join('')}
      </div>
    </div>
    <div id="glossGrid" class="glossary-grid">${glossCards(data)}</div>`;
}
function glossCards(data) {
  if (!data.length) return '<div class="empty">Aucun résultat</div>';
  return data.map(g => `<div class="g-card">
    <div class="g-term">${g.terme}</div>
    <div class="g-domain">${g.domaine||''}</div>
    <div class="g-def">${g.definition}</div>
    ${g.exemple?`<div class="g-example">Ex : ${g.exemple}</div>`:''}
  </div>`).join('');
}
window.filterGloss = function(q) {
  const d = (state.glossaireData||[]).filter(g => !q || g.terme.toLowerCase().includes(q.toLowerCase()) || g.definition.toLowerCase().includes(q.toLowerCase()));
  const grid = document.getElementById('glossGrid');
  if (grid) grid.innerHTML = glossCards(d);
};
window.filterGlossL = function(l,btn) {
  document.querySelectorAll('.az-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  const d = l==='ALL' ? (state.glossaireData||[]) : (state.glossaireData||[]).filter(g=>g.terme.toUpperCase().startsWith(l));
  const grid = document.getElementById('glossGrid');
  if (grid) grid.innerHTML = glossCards(d);
};

/* ─────────────────────── ACRONYMES ─────────────────────── */
async function renderAcronymesPage(c) {
  if (!state.acronymesData) {
    c.innerHTML = '<div style="padding:40px;text-align:center"><span class="spinner"></span></div>';
    try { const ad = await dataFetch('acronymes', null); if(ad) state.acronymesData = ad; } catch(e) {}
  }
  const data = state.acronymesData || [];
  const cats = [...new Set(data.map(a=>a.domaine||a.categorie||'Général'))];
  c.innerHTML = `
    <div class="page-title">Acronymes IT</div>
    <div class="page-sub">${data.length} acronymes</div>
    <div class="dict-controls">
      <input class="dict-search" placeholder="Rechercher..." oninput="filterAcro(this.value)">
      <div style="display:flex;gap:4px;flex-wrap:wrap">
        <button class="az-btn on" onclick="filterAcroC('ALL',this)">Tout</button>
        ${cats.map(cat=>`<button class="az-btn" style="width:auto;padding:0 8px" onclick="filterAcroC('${cat}',this)">${cat}</button>`).join('')}
      </div>
    </div>
    <table class="acro-table" id="acroTable">
      <thead><tr><th>Acronyme</th><th>Signification</th><th>Définition</th><th>Domaine</th></tr></thead>
      <tbody>${acroRows(data)}</tbody>
    </table>`;
}
let _acroQ='', _acroC='ALL';
function acroRows(d) {
  if (!d.length) return '<tr><td colspan="4" style="text-align:center;color:#555;padding:20px">Aucun résultat</td></tr>';
  return d.map(a=>`<tr><td><span class="at-acronym">${a.acronyme}</span></td><td><span class="at-full">${a.signification}</span></td><td>${a.definition||''}</td><td><span class="at-cat">${a.domaine||a.categorie||''}</span></td></tr>`).join('');
}
window.filterAcro = function(q) {
  _acroQ=q; applyAcroFilter();
};
window.filterAcroC = function(c2,btn) {
  _acroC=c2; document.querySelectorAll('.az-btn').forEach(b=>b.classList.remove('on')); btn.classList.add('on'); applyAcroFilter();
};
function applyAcroFilter() {
  let d = state.acronymesData||[];
  if(_acroQ) d=d.filter(a=>a.acronyme.toLowerCase().includes(_acroQ.toLowerCase())||a.signification.toLowerCase().includes(_acroQ.toLowerCase()));
  if(_acroC!=='ALL') d=d.filter(a=>(a.domaine||a.categorie)===_acroC);
  const tb = document.querySelector('#acroTable tbody');
  if(tb) tb.innerHTML = acroRows(d);
}

/* ─────────────────────── CHAT IA ─────────────────────── */
function renderChatPage(c) {
  c.innerHTML = `
    <div class="page-title">Assistant IA</div>
    <div class="page-sub">Posez une question sur n'importe quelle matière BTS SIO SISR.</div>
    <div class="chat-page">
      <div class="chat-mode-bar">
        <button class="mode-btn on" onclick="setChatModeBtn(this,'chat')">Chat général</button>
        <button class="mode-btn" onclick="setChatModeBtn(this,'correct')">Correction exercice</button>
        <button class="mode-btn" onclick="setChatModeBtn(this,'english')">Anglais</button>
      </div>
      <div class="chat-msgs" id="chatMessages">
        <div class="chat-msg ai">Bonjour Nedj ! Je suis votre assistant BTS SIO SISR.<br>
        Je peux vous expliquer des notions techniques, corriger vos exercices, ou vous entraîner en anglais.</div>
      </div>
      <div class="chat-input-row">
        <input id="chatInput" placeholder="Posez votre question..." onkeydown="if(event.key==='Enter')sendChat(chatMode)">
        <button class="btn btn-white" onclick="sendChat(chatMode)">Envoyer</button>
      </div>
    </div>`;
}
window.setChatModeBtn = function(btn, mode) {
  chatMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
};

/* ─────────────────────── JURY ─────────────────────── */
function renderJuryPage(c) {
  c.innerHTML = `
    <div class="page-title">Jury Jean Naymar</div>
    <div class="jury-intro">
      <h2>Simulation d'oral BTS SIO SISR</h2>
      <p>Jean Naymar est un jury exigeant. Il évaluera vos réponses comme lors d'un vrai oral E5.<br>
      Présentez votre portfolio ou répondez à ses questions techniques.</p>
    </div>
    <div class="chat-page">
      <div class="chat-mode-bar">
        <button class="mode-btn on" onclick="setJuryModeBtn(this,'e5')">Épreuve E5</button>
        <button class="mode-btn" onclick="setJuryModeBtn(this,'e6')">Épreuve E6</button>
        <button class="mode-btn" onclick="setJuryModeBtn(this,'technique')">Technique</button>
      </div>
      <div class="chat-msgs" id="chatMessages">
        <div class="chat-msg ai">Bonjour. Je suis Jean Naymar, membre du jury BTS SIO SISR.<br>
        Vous disposez de 10 minutes pour présenter votre portfolio. Commencez quand vous êtes prêt(e).</div>
      </div>
      <div class="chat-input-row">
        <input id="chatInput" placeholder="Votre réponse..." onkeydown="if(event.key==='Enter')sendChat('jury')">
        <button class="btn btn-white" onclick="sendChat('jury')">Répondre</button>
      </div>
    </div>`;
}
let _juryMode = 'e5';
window.setJuryModeBtn = function(btn, m) {
  _juryMode = m;
  document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
};

/* ─────────────────────── PLANNING ─────────────────────── */
function renderPlanningPage(c) {
  const weeks = [
    { w:'Semaine 1–2', items:['SISR — VLANs, 802.1X, routage', 'Cybersécurité — Firewall, PKI', 'Maths — Numération, Boole'] },
    { w:'Semaine 3–4', items:['SISR — Systèmes (AD, Windows Server, Linux)', 'CEJM — Droit du travail, RGPD', 'Maths — Stats, RSA'] },
    { w:'Semaine 5–6', items:['E5 — Portfolio, tableau de synthèse', 'Anglais — IT vocab, grammaire B1', 'CEJM — Management'] },
    { w:'Semaine 7–8', items:['E7 — Admin sys/réseaux', 'Culture Générale — Synthèse, dissertation', 'Simulation jury Jean Naymar'] },
  ];
  c.innerHTML = `
    <div class="page-title">Planning de révision</div>
    <div class="page-sub">Objectif : BTS SIO SISR avec mention — Session 2026</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px">
      ${weeks.map(w=>`<div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r);padding:16px 18px">
        <div style="font-size:.8rem;font-weight:700;margin-bottom:10px;color:var(--text-2)">${w.w}</div>
        <ul class="checklist">${w.items.map(i=>`<li>${i}</li>`).join('')}</ul>
      </div>`).join('')}
    </div>`;
}

/* ─────────────────────── DATA FETCH ─────────────────────── */
async function fetchCours(id) {
  if (state.coursData[id]) return state.coursData[id];
  try {
    const d = await dataFetch('cours', id);
    if (d) {
      const normalized = Array.isArray(d) ? { chapitres: d } : d;
      if (!normalized.chapitres) normalized.chapitres = [];
      state.coursData[id] = normalized;
      return normalized;
    }
  } catch(e) {}
  return { chapitres: [] };
}

async function fetchQuiz(id) {
  if (state.quizData[id]) return state.quizData[id];
  try {
    const d = await dataFetch('quiz', id);
    if (d) {
      const normalized = Array.isArray(d) ? { questions: d } : d;
      if (!normalized.questions) normalized.questions = [];
      state.quizData[id] = normalized;
      return normalized;
    }
  } catch(e) {}
  return { questions: [] };
}

async function aiCall(endpoint, payload) {
  if (IS_STATIC) {
    return { error: "L'assistant IA nécessite le serveur local. Lance : cd backend && node server.js" };
  }
  try {
    const r = await fetch(endpoint, {
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)
    });
    return r.ok ? await r.json() : { error: `Erreur ${r.status}` };
  } catch(e) { return { error: e.message }; }
}

/* ─────────────────────── PROGRESS ─────────────────────── */
window.toggleDone = function(id, idx) {
  if (!state.progress[id]) state.progress[id] = [];
  const arr = state.progress[id];
  const pos = arr.indexOf(idx);
  if (pos===-1) arr.push(idx); else arr.splice(pos,1);
  saveProgress();
  renderSidebarProgress();
  renderReader(document.getElementById('pageContainer'), id, idx);
};
function saveProgress() { try { localStorage.setItem('bts_p', JSON.stringify(state.progress)); } catch(e) {} }
function loadProgress() { try { const p = localStorage.getItem('bts_p'); if(p) state.progress = JSON.parse(p); } catch(e) {} }

/* ─────────────────────── UTILS ─────────────────────── */
function escHtml(s) {
  return s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : '';
}
function escAttr(s) {
  return s ? String(s).replace(/'/g,"\\'").replace(/"/g,'&quot;') : '';
}
function md2html(text) {
  if (!text) return '';
  let h = escHtml(text);
  h = h.replace(/^### (.+)$/gm,'<h4>$1</h4>');
  h = h.replace(/^## (.+)$/gm, '<h3>$1</h3>');
  h = h.replace(/^# (.+)$/gm,  '<h3>$1</h3>');
  h = h.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  h = h.replace(/\*(.+?)\*/g,    '<em>$1</em>');
  h = h.replace(/`([^`]+)`/g,    '<code>$1</code>');
  h = h.replace(/^- (.+)$/gm,    '<li>$1</li>');
  h = h.replace(/(<li>.*<\/li>\n?)+/g, m=>'<ul>'+m+'</ul>');
  h = h.replace(/\n\n/g,'</p><p>');
  return '<p>'+h+'</p>';
}
window.copyCode = function(btn) {
  const pre = btn.closest('.code-wrap').querySelector('pre');
  if (pre) navigator.clipboard.writeText(pre.textContent).then(()=>{btn.textContent='Copié !';setTimeout(()=>btn.textContent='Copier',2000)});
};

