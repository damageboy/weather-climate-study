# Weather & Climate Study Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 4-day interactive study website for a 6th-grader revising weather and climate geography.

**Architecture:** Multi-page static site (index + 4 day pages) sharing one CSS file and one JS file. All interactivity is vanilla JS. Progress stored in localStorage. CDN links allowed (Google Fonts, no heavy frameworks).

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox/grid), vanilla JavaScript ES6, localStorage, Google Fonts CDN.

**Output directory:** `/Users/dmg/Downloads/Geo-2026-03/site/`

---

## Content Reference

### Day 1 topics
- Weather = state of atmosphere at a given time. Climate = average weather over a long period.
- Instruments: thermometer (temperature, °C), anemometer (wind speed, mph/km/h), barometer (air pressure, millibars), wind vane (wind direction, compass bearings N/NE/E etc), rain gauge (precipitation, millimetres), visibility meter (visibility, metres/km).
- Siting rules: instruments in a Stevenson screen (shaded, ventilated box), away from buildings/trees, at standard height; rain gauge flush with ground level; anemometer high up in open air.

### Day 2 topics
- Cloud types: cumulus (fluffy, low, heavy showers), stratus (blanket, low, drizzle), cirrus (wispy, high >6 km, ice crystals, bad weather coming).
- Convectional rainfall: sun heats ground → air warms & rises → cools → condenses → rain. Inland, summer.
- Relief rainfall: moist air hits mountains → forced up → cools → condenses → rains on windward side. Leeward side = rain shadow (dry).
- Frontal rainfall: warm air mass meets cold air mass → warm air slides up over cold → cools → condenses → rain. Can fall anywhere.

### Day 3 topics
- Low pressure: air rising → clouds form → rain, wind, unsettled weather. Barometer falls.
- High pressure: air sinking → no clouds → clear skies, no rain. Barometer rises.
- High pressure summer: hot sunny days, drought possible, dew at night, thunderstorms inland, evenings cool.
- High pressure winter: cold clear days, frost, fog, ice on roads.

### Day 4 topics
- Latitude: further from equator = colder (sun rays spread over larger area). UK cooler than Egypt.
- Altitude: higher = colder (1°C per 100 m). Ben Nevis has snow in summer.
- Distance from sea: sea moderates temperature. Coastal areas cooler in summer, warmer in winter. Sea breeze.
- Prevailing wind: UK south-westerly wind brings moisture from Atlantic → rain especially on west coast.
- Ocean currents: North Atlantic Drift warms UK west coast in winter.
- Climate graphs: bar chart (rainfall mm) + line graph (temperature °C) on same axes for a location across 12 months.

---

## Task 1: Shared CSS (`site/style.css`)

**File:** Create `site/style.css`

Complete the entire CSS file in one step. No tests needed — verify visually in Task 6.

```css
/* site/style.css */

@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

/* ── CSS custom properties ── */
:root {
  --sky: #87CEEB;
  --sky-dark: #4A90D9;
  --cloud: #ffffff;
  --sun: #FFD700;
  --rain: #5B8DB8;
  --green: #4CAF50;
  --orange: #FF9800;
  --red: #F44336;
  --purple: #9C27B0;
  --day1: #FF9800;   /* orange */
  --day2: #4CAF50;   /* green */
  --day3: #4A90D9;   /* blue */
  --day4: #9C27B0;   /* purple */
  --text: #2c3e50;
  --light-bg: #f0f8ff;
  --card-shadow: 0 4px 15px rgba(0,0,0,0.1);
  --radius: 16px;
}

/* ── Reset & base ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Nunito', sans-serif;
  background: linear-gradient(180deg, #e0f0ff 0%, #f0f8ff 100%);
  color: var(--text);
  min-height: 100vh;
}

/* ── Nav bar ── */
nav {
  background: linear-gradient(135deg, var(--sky-dark), #2c6fad);
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
nav .logo { color: white; font-size: 1.3rem; font-weight: 900; text-decoration: none; }
nav .nav-links { display: flex; gap: 8px; flex-wrap: wrap; }
nav .nav-links a {
  color: white; text-decoration: none; padding: 6px 14px;
  border-radius: 20px; font-weight: 700; font-size: 0.85rem;
  transition: background 0.2s;
}
nav .nav-links a:hover, nav .nav-links a.active { background: rgba(255,255,255,0.25); }

/* ── Page header ── */
.page-header {
  text-align: center;
  padding: 40px 20px 20px;
}
.page-header h1 { font-size: 2.4rem; font-weight: 900; color: var(--sky-dark); }
.page-header p { font-size: 1.1rem; color: #555; margin-top: 8px; }
.day-badge {
  display: inline-block;
  padding: 6px 18px; border-radius: 20px;
  color: white; font-weight: 800; font-size: 0.95rem;
  margin-bottom: 10px;
}

/* ── Container ── */
.container { max-width: 900px; margin: 0 auto; padding: 0 20px 60px; }

/* ── Section titles ── */
.section-title {
  font-size: 1.5rem; font-weight: 900;
  margin: 40px 0 16px;
  display: flex; align-items: center; gap: 10px;
}
.section-title .icon { font-size: 1.6rem; }

/* ── Info cards (learn section) ── */
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
.info-card {
  background: white; border-radius: var(--radius);
  padding: 20px; box-shadow: var(--card-shadow);
  text-align: center; transition: transform 0.2s;
}
.info-card:hover { transform: translateY(-4px); }
.info-card .card-icon { font-size: 2.5rem; margin-bottom: 10px; }
.info-card h3 { font-size: 1rem; font-weight: 800; margin-bottom: 6px; color: var(--sky-dark); }
.info-card p { font-size: 0.85rem; color: #666; line-height: 1.4; }
.info-card .unit { display: inline-block; background: var(--light-bg); padding: 3px 10px;
  border-radius: 10px; font-size: 0.8rem; font-weight: 700; margin-top: 6px; color: var(--sky-dark); }

/* ── Definition boxes ── */
.definition-box {
  background: white; border-left: 6px solid var(--sky-dark);
  border-radius: 0 var(--radius) var(--radius) 0;
  padding: 18px 22px; margin-bottom: 16px;
  box-shadow: var(--card-shadow);
}
.definition-box h3 { font-size: 1.1rem; font-weight: 800; color: var(--sky-dark); margin-bottom: 6px; }
.definition-box p { font-size: 0.95rem; line-height: 1.5; }

/* ── Rainfall / pressure panels ── */
.panel {
  background: white; border-radius: var(--radius);
  padding: 22px; margin-bottom: 16px;
  box-shadow: var(--card-shadow);
}
.panel h3 { font-size: 1.15rem; font-weight: 800; margin-bottom: 10px; }
.panel .steps { list-style: none; padding: 0; }
.panel .steps li {
  padding: 8px 0 8px 32px;
  position: relative; font-size: 0.93rem; line-height: 1.4;
  border-bottom: 1px solid #f0f0f0;
}
.panel .steps li:last-child { border-bottom: none; }
.panel .steps li::before {
  content: attr(data-n);
  position: absolute; left: 0; top: 8px;
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--sky-dark); color: white;
  font-size: 0.75rem; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
}

/* ── Activities wrapper ── */
.activity {
  background: white; border-radius: var(--radius);
  padding: 24px; margin-bottom: 24px;
  box-shadow: var(--card-shadow);
}
.activity h2 {
  font-size: 1.2rem; font-weight: 900; margin-bottom: 6px;
  display: flex; align-items: center; gap: 8px;
}
.activity .instructions { font-size: 0.9rem; color: #666; margin-bottom: 18px; }

/* ── Drag-and-drop ── */
.dnd-area { display: flex; flex-direction: column; gap: 16px; }
.dnd-targets { display: flex; flex-direction: column; gap: 10px; }
.dnd-target {
  display: flex; align-items: center; gap: 12px;
  background: var(--light-bg); border-radius: 12px; padding: 12px 16px;
  min-height: 56px;
}
.dnd-target .target-label { font-weight: 700; font-size: 0.9rem; min-width: 160px; }
.drop-zone {
  flex: 1; min-height: 40px; border: 2px dashed #b0c4de;
  border-radius: 8px; display: flex; align-items: center;
  justify-content: center; font-size: 0.85rem; color: #aaa;
  transition: border-color 0.2s, background 0.2s;
}
.drop-zone.drag-over { border-color: var(--sky-dark); background: #e8f4fd; }
.drop-zone.correct { border-color: var(--green); background: #e8f5e9; }
.drop-zone.wrong { border-color: var(--red); background: #ffebee; }
.dnd-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
.chip {
  background: var(--sky-dark); color: white;
  padding: 8px 16px; border-radius: 20px;
  font-size: 0.85rem; font-weight: 700;
  cursor: grab; user-select: none;
  transition: opacity 0.2s, transform 0.1s;
  touch-action: none;
}
.chip:active { transform: scale(1.05); }
.chip.placed { opacity: 0.4; cursor: default; }

/* ── Flashcards ── */
.flashcard-deck { perspective: 1000px; }
.flashcard-viewport {
  display: flex; align-items: center; justify-content: center;
  gap: 16px; flex-wrap: wrap;
}
.flashcard-wrap { perspective: 1000px; }
.flashcard {
  width: 280px; height: 170px;
  position: relative; cursor: pointer;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
.flashcard.flipped { transform: rotateY(180deg); }
.flashcard-front, .flashcard-back {
  position: absolute; inset: 0;
  border-radius: var(--radius); backface-visibility: hidden;
  display: flex; align-items: center; justify-content: center;
  padding: 20px; text-align: center; box-shadow: var(--card-shadow);
}
.flashcard-front {
  background: linear-gradient(135deg, var(--sky-dark), #2c6fad);
  color: white; font-size: 1rem; font-weight: 800;
}
.flashcard-back {
  background: white; transform: rotateY(180deg);
  font-size: 0.88rem; line-height: 1.5; color: var(--text);
}
.flashcard-nav {
  display: flex; align-items: center; justify-content: center;
  gap: 16px; margin-top: 16px;
}
.fc-counter { font-weight: 700; font-size: 0.9rem; color: #666; }

/* ── Fill-in-blank ── */
.fitb-list { display: flex; flex-direction: column; gap: 14px; }
.fitb-item {
  background: var(--light-bg); border-radius: 12px;
  padding: 14px 18px; font-size: 0.95rem; line-height: 1.8;
}
.fitb-input {
  border: none; border-bottom: 2px solid var(--sky-dark);
  background: transparent; font-family: inherit;
  font-size: 0.95rem; font-weight: 700; color: var(--sky-dark);
  width: 120px; text-align: center; outline: none;
  transition: border-color 0.2s;
}
.fitb-input:focus { border-bottom-color: var(--sun); }
.fitb-input.correct { border-bottom-color: var(--green); color: var(--green); }
.fitb-input.wrong { border-bottom-color: var(--red); color: var(--red); }

/* ── Quiz ── */
.quiz-question { margin-bottom: 22px; }
.quiz-question .q-text { font-weight: 700; margin-bottom: 10px; font-size: 0.97rem; }
.quiz-options { display: flex; flex-direction: column; gap: 8px; }
.quiz-option {
  background: var(--light-bg); border: 2px solid transparent;
  border-radius: 10px; padding: 10px 16px;
  cursor: pointer; font-size: 0.9rem; font-weight: 600;
  transition: border-color 0.2s, background 0.2s;
  text-align: left;
}
.quiz-option:hover { border-color: var(--sky-dark); }
.quiz-option.selected { border-color: var(--sky-dark); background: #e8f4fd; }
.quiz-option.correct { border-color: var(--green); background: #e8f5e9; }
.quiz-option.wrong { border-color: var(--red); background: #ffebee; }

/* ── Buttons ── */
.btn {
  padding: 10px 24px; border-radius: 24px; border: none;
  font-family: inherit; font-size: 0.95rem; font-weight: 800;
  cursor: pointer; transition: transform 0.15s, opacity 0.2s;
}
.btn:hover { transform: translateY(-2px); }
.btn:active { transform: translateY(0); }
.btn-primary { background: var(--sky-dark); color: white; }
.btn-success { background: var(--green); color: white; }
.btn-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; }

/* ── Score / feedback ── */
.score-box {
  text-align: center; padding: 20px;
  border-radius: var(--radius); margin-top: 16px;
  font-weight: 800;
}
.score-box.good { background: #e8f5e9; color: #2e7d32; }
.score-box.ok   { background: #fff8e1; color: #f57f17; }
.score-box.bad  { background: #ffebee; color: #c62828; }
.score-box .stars { font-size: 1.8rem; margin-bottom: 6px; }
.score-box .score-text { font-size: 1.1rem; }

/* ── Progress dots on home ── */
.day-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-top: 20px; }
.day-card {
  background: white; border-radius: var(--radius);
  padding: 24px; text-align: center;
  box-shadow: var(--card-shadow); text-decoration: none; color: var(--text);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative; overflow: hidden;
}
.day-card:hover { transform: translateY(-6px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
.day-card .day-num {
  font-size: 2.5rem; font-weight: 900;
  margin-bottom: 8px;
}
.day-card h3 { font-size: 1rem; font-weight: 800; margin-bottom: 6px; }
.day-card p { font-size: 0.8rem; color: #777; }
.day-card .progress-bar {
  height: 6px; background: #eee; border-radius: 3px;
  margin-top: 14px; overflow: hidden;
}
.day-card .progress-fill {
  height: 100%; border-radius: 3px;
  transition: width 0.5s ease;
}
.day-card.d1 .day-num { color: var(--day1); }
.day-card.d2 .day-num { color: var(--day2); }
.day-card.d3 .day-num { color: var(--day3); }
.day-card.d4 .day-num { color: var(--day4); }
.day-card.d1 .progress-fill { background: var(--day1); }
.day-card.d2 .progress-fill { background: var(--day2); }
.day-card.d3 .progress-fill { background: var(--day3); }
.day-card.d4 .progress-fill { background: var(--day4); }

/* ── Hero banner on home ── */
.hero {
  text-align: center; padding: 50px 20px 30px;
}
.hero h1 { font-size: 2.6rem; font-weight: 900; color: var(--sky-dark); margin-bottom: 10px; }
.hero p { font-size: 1.1rem; color: #555; max-width: 500px; margin: 0 auto; }
.hero .weather-icons { font-size: 3rem; margin-bottom: 16px; letter-spacing: 8px; }

/* ── Completion banner ── */
.complete-banner {
  background: linear-gradient(135deg, var(--green), #2e7d32);
  color: white; border-radius: var(--radius);
  padding: 20px 24px; text-align: center;
  margin-bottom: 24px; display: none;
}
.complete-banner.show { display: block; }
.complete-banner h3 { font-size: 1.3rem; margin-bottom: 6px; }

/* ── Climate graph ── */
.climate-graph-wrap {
  background: white; border-radius: var(--radius);
  padding: 20px; box-shadow: var(--card-shadow);
}

/* ── Responsive ── */
@media (max-width: 600px) {
  .page-header h1 { font-size: 1.7rem; }
  .flashcard { width: 240px; height: 150px; }
  .dnd-target { flex-direction: column; align-items: flex-start; }
  .drop-zone { width: 100%; }
}
```

---

## Task 2: Shared JS (`site/app.js`)

**File:** Create `site/app.js`

Provides: localStorage progress tracking, drag-and-drop engine, flashcard engine, fill-in-blank checker, quiz engine, climate chart renderer (using Chart.js from CDN).

```javascript
/* site/app.js */

// ── Progress tracking ──────────────────────────────────────────────
const PROGRESS_KEY = 'geo_progress';

function getProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
  catch { return {}; }
}

function saveProgress(day, activity, score) {
  const p = getProgress();
  if (!p[day]) p[day] = {};
  p[day][activity] = score;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

function getDayProgress(day) {
  const p = getProgress();
  if (!p[day]) return 0;
  const scores = Object.values(p[day]);
  if (!scores.length) return 0;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

// ── Highlight active nav link ──────────────────────────────────────
function highlightNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav .nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === page) a.classList.add('active');
  });
}

// ── Drag-and-drop engine ───────────────────────────────────────────
// Usage: initDragDrop(containerId, pairs, dayKey, activityKey)
// pairs: [{ chip: 'thermometer', target: 'temperature' }, ...]
// targets and drop-zones must have data-target="xxx" and chips data-chip="xxx"
function initDragDrop(containerId, pairs, dayKey, activityKey) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const chips = container.querySelectorAll('.chip');
  const zones = container.querySelectorAll('.drop-zone');

  let dragged = null;

  chips.forEach(chip => {
    chip.setAttribute('draggable', 'true');

    chip.addEventListener('dragstart', e => {
      dragged = chip;
      e.dataTransfer.effectAllowed = 'move';
    });

    // Touch support
    chip.addEventListener('touchstart', e => {
      dragged = chip;
      chip.style.opacity = '0.6';
    }, { passive: true });

    chip.addEventListener('touchend', e => {
      chip.style.opacity = '';
      const touch = e.changedTouches[0];
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      const zone = el?.closest('.drop-zone');
      if (zone && dragged) dropOnZone(zone, dragged, pairs);
      dragged = null;
    });
  });

  zones.forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      if (dragged) dropOnZone(zone, dragged, pairs);
      dragged = null;
    });
  });

  function dropOnZone(zone, chip, pairs) {
    if (zone.querySelector('.chip')) return; // already occupied
    const chipVal = chip.dataset.chip;
    const targetVal = zone.dataset.target;
    const correct = pairs.find(p => p.chip === chipVal && p.target === targetVal);
    zone.innerHTML = '';
    const clone = chip.cloneNode(true);
    clone.style.cursor = 'default';
    zone.appendChild(clone);
    chip.classList.add('placed');
    if (correct) {
      zone.classList.add('correct');
    } else {
      zone.classList.add('wrong');
      // shake
      zone.animate([{ transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' },
                    { transform: 'translateX(-4px)' }, { transform: 'translateX(0)' }],
                   { duration: 300 });
    }
    checkDndComplete(container, pairs, dayKey, activityKey);
  }

  function checkDndComplete(container, pairs, dayKey, activityKey) {
    const zones = container.querySelectorAll('.drop-zone');
    let correct = 0, total = zones.length;
    zones.forEach(z => { if (z.classList.contains('correct')) correct++; });
    if (correct + container.querySelectorAll('.drop-zone.wrong').length === total) {
      const pct = Math.round((correct / total) * 100);
      saveProgress(dayKey, activityKey, pct);
      showDndScore(container, correct, total);
    }
  }

  function showDndScore(container, correct, total) {
    let box = container.querySelector('.score-box');
    if (!box) { box = document.createElement('div'); box.className = 'score-box'; container.appendChild(box); }
    const pct = Math.round((correct / total) * 100);
    box.className = 'score-box ' + (pct >= 80 ? 'good' : pct >= 50 ? 'ok' : 'bad');
    const stars = pct >= 80 ? '⭐⭐⭐' : pct >= 50 ? '⭐⭐' : '⭐';
    box.innerHTML = `<div class="stars">${stars}</div><div class="score-text">${correct}/${total} correct (${pct}%)</div>`;
    updatePageProgress();
  }
}

// ── Flashcard engine ───────────────────────────────────────────────
// cards: [{ front: '...', back: '...' }]
function initFlashcards(containerId, cards, dayKey, activityKey) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let current = 0;

  function render() {
    const c = cards[current];
    container.querySelector('.flashcard-front span').textContent = c.front;
    container.querySelector('.flashcard-back span').textContent = c.back;
    container.querySelector('.flashcard').classList.remove('flipped');
    container.querySelector('.fc-counter').textContent = `${current + 1} / ${cards.length}`;
  }

  container.querySelector('.flashcard').addEventListener('click', () => {
    container.querySelector('.flashcard').classList.toggle('flipped');
    saveProgress(dayKey, activityKey, 100);
    updatePageProgress();
  });

  container.querySelector('.btn-prev')?.addEventListener('click', () => {
    current = (current - 1 + cards.length) % cards.length;
    render();
  });
  container.querySelector('.btn-next')?.addEventListener('click', () => {
    current = (current + 1) % cards.length;
    render();
  });

  render();
}

// ── Fill-in-blank engine ───────────────────────────────────────────
// Called once; each input has data-answer="..."
function initFitb(containerId, dayKey, activityKey) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const inputs = container.querySelectorAll('.fitb-input');
  const btn = container.querySelector('.btn-check');

  btn?.addEventListener('click', () => {
    let correct = 0;
    inputs.forEach(inp => {
      const ans = inp.dataset.answer.trim().toLowerCase();
      const val = inp.value.trim().toLowerCase();
      // accept if answer contains input or input contains answer (allows partial)
      if (val === ans || ans.split('/').some(a => a.trim() === val)) {
        inp.classList.add('correct'); inp.classList.remove('wrong');
        correct++;
      } else {
        inp.classList.add('wrong'); inp.classList.remove('correct');
      }
    });
    const pct = Math.round((correct / inputs.length) * 100);
    saveProgress(dayKey, activityKey, pct);
    showFitbScore(container, correct, inputs.length);
    updatePageProgress();
  });

  function showFitbScore(container, correct, total) {
    let box = container.querySelector('.score-box');
    if (!box) { box = document.createElement('div'); box.className = 'score-box'; container.appendChild(box); }
    const pct = Math.round((correct / total) * 100);
    box.className = 'score-box ' + (pct >= 80 ? 'good' : pct >= 50 ? 'ok' : 'bad');
    const stars = pct >= 80 ? '⭐⭐⭐' : pct >= 50 ? '⭐⭐' : '⭐';
    box.innerHTML = `<div class="stars">${stars}</div><div class="score-text">${correct}/${total} correct (${pct}%)</div>`;
  }
}

// ── Quiz engine ────────────────────────────────────────────────────
// questions: [{ q: '...', options: ['a','b','c','d'], answer: 0 }]
function initQuiz(containerId, questions, dayKey, activityKey) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let answered = new Array(questions.length).fill(false);

  questions.forEach((q, qi) => {
    const qEl = container.querySelector(`[data-q="${qi}"]`);
    if (!qEl) return;
    qEl.querySelectorAll('.quiz-option').forEach((opt, oi) => {
      opt.addEventListener('click', () => {
        if (answered[qi]) return;
        answered[qi] = true;
        opt.classList.add('selected');
        if (oi === q.answer) {
          opt.classList.add('correct');
        } else {
          opt.classList.add('wrong');
          qEl.querySelectorAll('.quiz-option')[q.answer].classList.add('correct');
        }
        // Check if all answered
        if (answered.every(Boolean)) {
          const score = answered.filter((_, i) => {
            const qDiv = container.querySelector(`[data-q="${i}"]`);
            return qDiv?.querySelector('.quiz-option.correct.selected') !== null;
          }).length;
          const pct = Math.round((score / questions.length) * 100);
          saveProgress(dayKey, activityKey, pct);
          showQuizScore(container, score, questions.length);
          updatePageProgress();
        }
      });
    });
  });

  function showQuizScore(container, correct, total) {
    let box = container.querySelector('.score-box');
    if (!box) { box = document.createElement('div'); box.className = 'score-box'; container.appendChild(box); }
    const pct = Math.round((correct / total) * 100);
    box.className = 'score-box ' + (pct >= 80 ? 'good' : pct >= 50 ? 'ok' : 'bad');
    const stars = pct >= 80 ? '⭐⭐⭐' : pct >= 50 ? '⭐⭐' : '⭐';
    box.innerHTML = `<div class="stars">${stars}</div>
      <div class="score-text">${correct}/${total} correct (${pct}%)</div>
      ${pct < 100 ? '<div style="font-size:0.85rem;margin-top:6px;font-weight:600">Check the green answers above to review!</div>' : ''}`;
  }
}

// ── Update progress bar on day pages ──────────────────────────────
function updatePageProgress() {
  const bar = document.querySelector('.day-progress-fill');
  const pct = document.querySelector('.day-progress-pct');
  if (!bar) return;
  const day = document.body.dataset.day;
  const p = getDayProgress(day);
  bar.style.width = p + '%';
  if (pct) pct.textContent = p + '%';
}

// ── Climate graph (Chart.js) ───────────────────────────────────────
function renderClimateGraph(canvasId, label, months, temps, rainfall) {
  if (typeof Chart === 'undefined') return;
  const ctx = document.getElementById(canvasId)?.getContext('2d');
  if (!ctx) return;
  new Chart(ctx, {
    data: {
      labels: months,
      datasets: [
        {
          type: 'bar',
          label: 'Rainfall (mm)',
          data: rainfall,
          backgroundColor: 'rgba(74, 144, 217, 0.6)',
          borderColor: 'rgba(74, 144, 217, 1)',
          borderWidth: 1,
          yAxisID: 'y1',
        },
        {
          type: 'line',
          label: 'Temperature (°C)',
          data: temps,
          borderColor: '#FF6B35',
          backgroundColor: 'rgba(255,107,53,0.1)',
          borderWidth: 3,
          pointRadius: 5,
          pointBackgroundColor: '#FF6B35',
          tension: 0.4,
          yAxisID: 'y2',
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { title: { display: true, text: label, font: { size: 15, weight: 'bold' } } },
      scales: {
        y1: { type: 'linear', position: 'left', title: { display: true, text: 'Rainfall (mm)' }, beginAtZero: true },
        y2: { type: 'linear', position: 'right', title: { display: true, text: 'Temperature (°C)' }, grid: { drawOnChartArea: false } }
      }
    }
  });
}

// ── Init on load ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  highlightNav();
  updatePageProgress();
});
```

---

## Task 3: Home Page (`site/index.html`)

**File:** Create `site/index.html`

Shows hero section, 4 day cards with progress bars, overall encouragement.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather & Climate Study</title>
  <link rel="stylesheet" href="style.css">
</head>
<body data-day="home">

<nav>
  <a class="logo" href="index.html">🌤 Weather & Climate</a>
  <div class="nav-links">
    <a href="index.html">Home</a>
    <a href="day1.html">Day 1</a>
    <a href="day2.html">Day 2</a>
    <a href="day3.html">Day 3</a>
    <a href="day4.html">Day 4</a>
  </div>
</nav>

<div class="hero">
  <div class="weather-icons">🌦 ☁️ ⛅ 🌈</div>
  <h1>Weather & Climate</h1>
  <p>Your 4-day study guide! Work through each day to get ready for your test. ⭐</p>
</div>

<div class="container">
  <div class="day-cards">

    <a href="day1.html" class="day-card d1">
      <div class="day-num">1</div>
      <h3>Weather vs Climate &amp; Instruments</h3>
      <p>Thermometers, barometers, measuring units & more</p>
      <div class="progress-bar"><div class="progress-fill" id="prog1" style="width:0%"></div></div>
    </a>

    <a href="day2.html" class="day-card d2">
      <div class="day-num">2</div>
      <h3>Clouds &amp; Types of Rainfall</h3>
      <p>Convectional, relief and frontal rainfall</p>
      <div class="progress-bar"><div class="progress-fill" id="prog2" style="width:0%"></div></div>
    </a>

    <a href="day3.html" class="day-card d3">
      <div class="day-num">3</div>
      <h3>Air Pressure &amp; Weather</h3>
      <p>High pressure, low pressure, seasonal effects</p>
      <div class="progress-bar"><div class="progress-fill" id="prog3" style="width:0%"></div></div>
    </a>

    <a href="day4.html" class="day-card d4">
      <div class="day-num">4</div>
      <h3>Factors Influencing Climate</h3>
      <p>Latitude, altitude, sea, wind &amp; climate graphs</p>
      <div class="progress-bar"><div class="progress-fill" id="prog4" style="width:0%"></div></div>
    </a>

  </div>
</div>

<script src="app.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    [1,2,3,4].forEach(d => {
      const pct = getDayProgress('day' + d);
      const el = document.getElementById('prog' + d);
      if (el) el.style.width = pct + '%';
    });
  });
</script>
</body>
</html>
```

---

## Task 4: Day 1 Page (`site/day1.html`)

**File:** Create `site/day1.html`

**Topics:** Weather vs Climate definitions + all 6 instruments (thermometer, anemometer, barometer, wind vane, rain gauge, visibility meter) with unit, what it measures, siting notes.

**Activities:**
1. **Drag-and-drop** — match instrument name to what it measures
2. **Flashcards** — instrument → unit + siting
3. **Fill-in-the-blank** — key sentences about weather vs climate and instruments
4. **Quiz** — 6 multiple-choice questions

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Day 1 – Weather vs Climate & Instruments</title>
  <link rel="stylesheet" href="style.css">
</head>
<body data-day="day1">

<nav>
  <a class="logo" href="index.html">🌤 Weather & Climate</a>
  <div class="nav-links">
    <a href="index.html">Home</a>
    <a href="day1.html">Day 1</a>
    <a href="day2.html">Day 2</a>
    <a href="day3.html">Day 3</a>
    <a href="day4.html">Day 4</a>
  </div>
</nav>

<div class="page-header">
  <span class="day-badge" style="background:var(--day1)">Day 1</span>
  <h1>Weather vs Climate &amp; Measuring the Weather</h1>
  <p>Learn how scientists measure the weather — and how weather differs from climate.</p>
  <!-- Progress bar -->
  <div style="max-width:400px;margin:16px auto 0;background:#ddd;border-radius:6px;height:10px;overflow:hidden">
    <div class="day-progress-fill" style="height:100%;width:0%;background:var(--day1);border-radius:6px;transition:width 0.5s"></div>
  </div>
  <p style="font-size:0.85rem;color:#888;margin-top:4px">Progress: <span class="day-progress-pct">0%</span></p>
</div>

<div class="container">

  <!-- ── LEARN ─────────────────────────────────── -->
  <div class="section-title"><span class="icon">📖</span> Learn</div>

  <div class="definition-box" style="border-color:var(--day1)">
    <h3>Weather</h3>
    <p>Weather is the state of the atmosphere at a <strong>given time</strong>. It can change from hour to hour. Examples: rainy, sunny, windy, foggy.</p>
  </div>
  <div class="definition-box" style="border-color:var(--sky-dark)">
    <h3>Climate</h3>
    <p>Climate is the <strong>average weather</strong> in a place over a long period (usually 30 years). It changes much more slowly than weather.</p>
  </div>

  <div class="section-title"><span class="icon">🌡</span> Measuring Instruments</div>

  <div class="card-grid">
    <div class="info-card">
      <div class="card-icon">🌡️</div>
      <h3>Thermometer</h3>
      <p>Measures <strong>temperature</strong>. Kept in a <em>Stevenson screen</em> (shaded white box). <strong>Sited</strong>: 1.2 m above ground, away from buildings.</p>
      <span class="unit">°C (degrees Celsius)</span>
    </div>
    <div class="info-card">
      <div class="card-icon">💨</div>
      <h3>Anemometer</h3>
      <p>Measures <strong>wind speed</strong>. Cups spin in the wind. <strong>Sited</strong>: high up in the open, away from trees and buildings.</p>
      <span class="unit">mph or km/h</span>
    </div>
    <div class="info-card">
      <div class="card-icon">🔵</div>
      <h3>Barometer</h3>
      <p>Measures <strong>air pressure</strong>. If pressure falls → rain coming. If pressure rises → fair weather. <strong>Sited</strong>: indoors or in a screen.</p>
      <span class="unit">millibars (mb)</span>
    </div>
    <div class="info-card">
      <div class="card-icon">🐓</div>
      <h3>Wind Vane</h3>
      <p>Measures <strong>wind direction</strong>. Points into the wind. "SW wind" means wind <em>from</em> the south-west. <strong>Sited</strong>: high, open location.</p>
      <span class="unit">Compass bearing (N, NE, SW…)</span>
    </div>
    <div class="info-card">
      <div class="card-icon">🌧️</div>
      <h3>Rain Gauge</h3>
      <p>Measures <strong>precipitation</strong> (rain, hail, snow). <strong>Sited</strong>: outdoors, flush with ground level, away from trees.</p>
      <span class="unit">millimetres (mm)</span>
    </div>
    <div class="info-card">
      <div class="card-icon">👁️</div>
      <h3>Visibility Meter</h3>
      <p>Measures <strong>visibility</strong> — how far you can see. A beam of light is sent out and a sensor measures how much arrives. <strong>Sited</strong>: open area.</p>
      <span class="unit">metres or kilometres</span>
    </div>
  </div>

  <!-- ── PRACTICE ────────────────────────────────── -->
  <div class="section-title"><span class="icon">🧩</span> Practice</div>

  <!-- Activity 1: Drag-and-Drop -->
  <div class="activity" id="dnd1">
    <h2>🔗 Match the Instrument</h2>
    <p class="instructions">Drag each instrument name onto the correct "what it measures" box.</p>
    <div class="dnd-area">
      <div class="dnd-chips">
        <div class="chip" data-chip="thermometer" draggable="true">Thermometer</div>
        <div class="chip" data-chip="anemometer" draggable="true">Anemometer</div>
        <div class="chip" data-chip="barometer" draggable="true">Barometer</div>
        <div class="chip" data-chip="wind-vane" draggable="true">Wind Vane</div>
        <div class="chip" data-chip="rain-gauge" draggable="true">Rain Gauge</div>
        <div class="chip" data-chip="vis-meter" draggable="true">Visibility Meter</div>
      </div>
      <div class="dnd-targets">
        <div class="dnd-target"><span class="target-label">Temperature (°C)</span><div class="drop-zone" data-target="thermometer">drop here</div></div>
        <div class="dnd-target"><span class="target-label">Wind speed (mph)</span><div class="drop-zone" data-target="anemometer">drop here</div></div>
        <div class="dnd-target"><span class="target-label">Air pressure (mb)</span><div class="drop-zone" data-target="barometer">drop here</div></div>
        <div class="dnd-target"><span class="target-label">Wind direction</span><div class="drop-zone" data-target="wind-vane">drop here</div></div>
        <div class="dnd-target"><span class="target-label">Precipitation (mm)</span><div class="drop-zone" data-target="rain-gauge">drop here</div></div>
        <div class="dnd-target"><span class="target-label">Visibility (km)</span><div class="drop-zone" data-target="vis-meter">drop here</div></div>
      </div>
    </div>
  </div>

  <!-- Activity 2: Flashcards -->
  <div class="activity" id="fc1">
    <h2>🃏 Flashcards</h2>
    <p class="instructions">Click each card to flip it and reveal the answer. Use the arrows to move between cards.</p>
    <div class="flashcard-deck">
      <div class="flashcard-viewport">
        <div class="flashcard-wrap">
          <div class="flashcard">
            <div class="flashcard-front"><span></span></div>
            <div class="flashcard-back"><span></span></div>
          </div>
        </div>
      </div>
      <div class="flashcard-nav">
        <button class="btn btn-primary btn-prev">← Prev</button>
        <span class="fc-counter">1 / 8</span>
        <button class="btn btn-primary btn-next">Next →</button>
      </div>
    </div>
  </div>

  <!-- ── TEST ───────────────────────────────────── -->
  <div class="section-title"><span class="icon">✏️</span> Test Yourself</div>

  <!-- Activity 3: Fill-in-blank -->
  <div class="activity" id="fitb1">
    <h2>✍️ Fill in the Blanks</h2>
    <p class="instructions">Type the missing word(s) in each gap, then press Check.</p>
    <div class="fitb-list">
      <div class="fitb-item">Weather is the state of the atmosphere at a <input class="fitb-input" data-answer="given time" placeholder="???"> whereas climate is the <input class="fitb-input" data-answer="average" placeholder="???"> weather over a long period.</div>
      <div class="fitb-item">A <input class="fitb-input" data-answer="thermometer" placeholder="???"> measures temperature in <input class="fitb-input" data-answer="°C/degrees Celsius" placeholder="???">.</div>
      <div class="fitb-item">Wind speed is measured by an <input class="fitb-input" data-answer="anemometer" placeholder="???"> in miles per hour or <input class="fitb-input" data-answer="km/h" placeholder="???">.</div>
      <div class="fitb-item">Air pressure is measured in <input class="fitb-input" data-answer="millibars" placeholder="???"> using a <input class="fitb-input" data-answer="barometer" placeholder="???">.</div>
      <div class="fitb-item">A rain gauge measures <input class="fitb-input" data-answer="precipitation" placeholder="???"> and is sited <input class="fitb-input" data-answer="flush with/at" placeholder="???"> ground level.</div>
      <div class="fitb-item">Wind direction is measured as a compass bearing using a <input class="fitb-input" data-answer="wind vane" placeholder="???">. A south-westerly wind blows <strong>from</strong> the <input class="fitb-input" data-answer="south-west/SW" placeholder="???">.</div>
    </div>
    <div class="btn-row"><button class="btn btn-primary btn-check">Check answers</button></div>
  </div>

  <!-- Activity 4: Quiz -->
  <div class="activity" id="quiz1">
    <h2>❓ Quick Quiz</h2>
    <p class="instructions">Click the correct answer for each question.</p>

    <div class="quiz-question" data-q="0">
      <div class="q-text">1. What is the difference between weather and climate?</div>
      <div class="quiz-options">
        <button class="quiz-option">Weather is long-term; climate is short-term</button>
        <button class="quiz-option">Weather is the state of the atmosphere right now; climate is average weather over time</button>
        <button class="quiz-option">They mean exactly the same thing</button>
        <button class="quiz-option">Climate is measured with a thermometer; weather is not</button>
      </div>
    </div>

    <div class="quiz-question" data-q="1">
      <div class="q-text">2. Which instrument measures air pressure?</div>
      <div class="quiz-options">
        <button class="quiz-option">Anemometer</button>
        <button class="quiz-option">Thermometer</button>
        <button class="quiz-option">Barometer</button>
        <button class="quiz-option">Rain gauge</button>
      </div>
    </div>

    <div class="quiz-question" data-q="2">
      <div class="q-text">3. In what unit is air pressure measured?</div>
      <div class="quiz-options">
        <button class="quiz-option">Millimetres (mm)</button>
        <button class="quiz-option">Millibars (mb)</button>
        <button class="quiz-option">Degrees Celsius (°C)</button>
        <button class="quiz-option">Oktas</button>
      </div>
    </div>

    <div class="quiz-question" data-q="3">
      <div class="q-text">4. Where should a rain gauge be sited?</div>
      <div class="quiz-options">
        <button class="quiz-option">On the roof of a building</button>
        <button class="quiz-option">Inside a warm room</button>
        <button class="quiz-option">Flush with ground level, away from trees</button>
        <button class="quiz-option">At the top of a hill</button>
      </div>
    </div>

    <div class="quiz-question" data-q="4">
      <div class="q-text">5. What does an anemometer measure?</div>
      <div class="quiz-options">
        <button class="quiz-option">Temperature</button>
        <button class="quiz-option">Rainfall</button>
        <button class="quiz-option">Wind direction</button>
        <button class="quiz-option">Wind speed</button>
      </div>
    </div>

    <div class="quiz-question" data-q="5">
      <div class="q-text">6. A "south-westerly wind" blows FROM which direction?</div>
      <div class="quiz-options">
        <button class="quiz-option">The north-east</button>
        <button class="quiz-option">The south-west</button>
        <button class="quiz-option">The north-west</button>
        <button class="quiz-option">The south-east</button>
      </div>
    </div>

  </div>

  <div style="text-align:center;margin-top:30px">
    <a href="day2.html" class="btn btn-success">Next: Day 2 →</a>
  </div>

</div>

<script src="app.js"></script>
<script>
const D1_PAIRS = [
  { chip: 'thermometer', target: 'thermometer' },
  { chip: 'anemometer',  target: 'anemometer'  },
  { chip: 'barometer',   target: 'barometer'   },
  { chip: 'wind-vane',   target: 'wind-vane'   },
  { chip: 'rain-gauge',  target: 'rain-gauge'  },
  { chip: 'vis-meter',   target: 'vis-meter'   },
];
initDragDrop('dnd1', D1_PAIRS, 'day1', 'dnd');

const D1_CARDS = [
  { front: 'Thermometer', back: 'Measures temperature in °C. Kept in a Stevenson screen, 1.2 m above ground.' },
  { front: 'Anemometer',  back: 'Measures wind speed in mph or km/h. Sited high up in the open.' },
  { front: 'Barometer',   back: 'Measures air pressure in millibars (mb). Falling pressure = rain on the way.' },
  { front: 'Wind Vane',   back: 'Measures wind direction as a compass bearing. A SW wind blows FROM the south-west.' },
  { front: 'Rain Gauge',  back: 'Measures precipitation in millimetres (mm). Sited flush with ground level.' },
  { front: 'Visibility Meter', back: 'Measures how far you can see, in metres or km.' },
  { front: 'What is weather?', back: 'The state of the atmosphere at a given moment in time.' },
  { front: 'What is climate?', back: 'The average weather in a place over a long period (usually 30 years).' },
];
initFlashcards('fc1', D1_CARDS, 'day1', 'flashcards');
initFitb('fitb1', 'day1', 'fitb');

const D1_Q = [
  { q:'', options:[], answer: 1 },
  { q:'', options:[], answer: 2 },
  { q:'', options:[], answer: 1 },
  { q:'', options:[], answer: 2 },
  { q:'', options:[], answer: 3 },
  { q:'', options:[], answer: 1 },
];
initQuiz('quiz1', D1_Q, 'day1', 'quiz');
</script>
</body>
</html>
```

---

## Task 5: Day 2 Page (`site/day2.html`)

**File:** Create `site/day2.html`

**Topics:** Cloud types (cumulus, stratus, cirrus) + 3 types of rainfall (convectional, relief, frontal).

**Activities:**
1. **Drag-and-drop** — match rainfall type to its cause
2. **Flashcards** — cloud and rainfall term → definition
3. **Fill-in-the-blank** — step-by-step rainfall sequences
4. **Quiz** — 6 questions on clouds and rainfall

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Day 2 – Clouds & Rainfall</title>
  <link rel="stylesheet" href="style.css">
</head>
<body data-day="day2">

<nav>
  <a class="logo" href="index.html">🌤 Weather & Climate</a>
  <div class="nav-links">
    <a href="index.html">Home</a>
    <a href="day1.html">Day 1</a>
    <a href="day2.html">Day 2</a>
    <a href="day3.html">Day 3</a>
    <a href="day4.html">Day 4</a>
  </div>
</nav>

<div class="page-header">
  <span class="day-badge" style="background:var(--day2)">Day 2</span>
  <h1>Clouds &amp; The Three Types of Rainfall</h1>
  <p>Learn how clouds form and why rain falls in three different ways.</p>
  <div style="max-width:400px;margin:16px auto 0;background:#ddd;border-radius:6px;height:10px;overflow:hidden">
    <div class="day-progress-fill" style="height:100%;width:0%;background:var(--day2);border-radius:6px;transition:width 0.5s"></div>
  </div>
  <p style="font-size:0.85rem;color:#888;margin-top:4px">Progress: <span class="day-progress-pct">0%</span></p>
</div>

<div class="container">

  <!-- ── LEARN ─────────────────────────────────── -->
  <div class="section-title"><span class="icon">📖</span> Learn</div>

  <div class="section-title" style="font-size:1.1rem;margin-top:10px"><span class="icon">☁️</span> Cloud Types</div>
  <div class="card-grid">
    <div class="info-card">
      <div class="card-icon">⛅</div>
      <h3>Cumulus</h3>
      <p>Fluffy white clouds, <strong>low</strong> in the sky. Can grow tall and dark. Bring <strong>short heavy showers</strong>.</p>
    </div>
    <div class="info-card">
      <div class="card-icon">🌫️</div>
      <h3>Stratus</h3>
      <p>Big blankets of <strong>dull grey cloud</strong> hanging low. Cover the whole sky. Give a <strong>light drizzle</strong> but no real showers.</p>
    </div>
    <div class="info-card">
      <div class="card-icon">🌀</div>
      <h3>Cirrus</h3>
      <p>Thin wispy clouds very <strong>high up</strong> (over 6 km). So cold they are made of <strong>ice crystals</strong>. Mean bad weather is coming.</p>
    </div>
  </div>

  <div class="section-title" style="font-size:1.1rem"><span class="icon">🌧️</span> Three Types of Rainfall</div>

  <div class="panel" style="border-top: 4px solid #FF9800">
    <h3>☀️ Convectional Rainfall</h3>
    <ul class="steps">
      <li data-n="1">The sun heats the ground, which warms the air above it.</li>
      <li data-n="2">Warm air rises in <strong>convection currents</strong>.</li>
      <li data-n="3">Rising air cools. Water vapour <strong>condenses</strong> to form clouds.</li>
      <li data-n="4">Clouds grow and it rains.</li>
    </ul>
    <p style="margin-top:10px;font-size:0.88rem;color:#777">Common in <strong>summer</strong>, inland areas, far from the sea — where the ground gets hottest.</p>
  </div>

  <div class="panel" style="border-top: 4px solid #4CAF50">
    <h3>⛰️ Relief Rainfall</h3>
    <ul class="steps">
      <li data-n="1">Moist air (often from the ocean) blows towards a mountain or hill.</li>
      <li data-n="2">The air is <strong>forced to rise</strong> over the mountain.</li>
      <li data-n="3">As it rises, it cools. Water vapour condenses → clouds form → it rains on the <strong>windward</strong> side.</li>
      <li data-n="4">The air descends on the other side (<strong>leeward</strong> / rain shadow) and warms — so it stays dry.</li>
    </ul>
    <p style="margin-top:10px;font-size:0.88rem;color:#777">In the UK the prevailing wind is from the south-west, so the <strong>west coast</strong> gets lots of relief rainfall.</p>
  </div>

  <div class="panel" style="border-top: 4px solid #4A90D9">
    <h3>🌬️ Frontal Rainfall</h3>
    <ul class="steps">
      <li data-n="1">A warm <strong>air mass</strong> meets a cold air mass.</li>
      <li data-n="2">The warm air is lighter, so it slides <strong>up and over</strong> the cold air.</li>
      <li data-n="3">As the warm air rises, it cools. Water vapour condenses → clouds form → it rains.</li>
      <li data-n="4">Frontal rain can fall almost <strong>anywhere</strong>. In the UK it's common from Atlantic air masses.</li>
    </ul>
  </div>

  <!-- ── PRACTICE ────────────────────────────────── -->
  <div class="section-title"><span class="icon">🧩</span> Practice</div>

  <!-- Activity 1: Drag-and-Drop -->
  <div class="activity" id="dnd2">
    <h2>🔗 Match the Rainfall Type</h2>
    <p class="instructions">Drag each cause to the correct rainfall type.</p>
    <div class="dnd-area">
      <div class="dnd-chips">
        <div class="chip" data-chip="sun-heats" draggable="true">Sun heats ground → air rises</div>
        <div class="chip" data-chip="mountain" draggable="true">Air forced up over mountains</div>
        <div class="chip" data-chip="warm-cold" draggable="true">Warm air mass meets cold air mass</div>
        <div class="chip" data-chip="convection" draggable="true">Convection currents inland</div>
        <div class="chip" data-chip="windward" draggable="true">Windward side gets rain</div>
        <div class="chip" data-chip="air-mass" draggable="true">Air masses meet at a front</div>
      </div>
      <div class="dnd-targets">
        <div class="dnd-target"><span class="target-label">Convectional ☀️</span><div class="drop-zone" data-target="sun-heats">drop here</div></div>
        <div class="dnd-target"><span class="target-label">Convectional ☀️</span><div class="drop-zone" data-target="convection">drop here</div></div>
        <div class="dnd-target"><span class="target-label">Relief ⛰️</span><div class="drop-zone" data-target="mountain">drop here</div></div>
        <div class="dnd-target"><span class="target-label">Relief ⛰️</span><div class="drop-zone" data-target="windward">drop here</div></div>
        <div class="dnd-target"><span class="target-label">Frontal 🌬️</span><div class="drop-zone" data-target="warm-cold">drop here</div></div>
        <div class="dnd-target"><span class="target-label">Frontal 🌬️</span><div class="drop-zone" data-target="air-mass">drop here</div></div>
      </div>
    </div>
  </div>

  <!-- Activity 2: Flashcards -->
  <div class="activity" id="fc2">
    <h2>🃏 Flashcards</h2>
    <p class="instructions">Click a card to flip it. Use the arrows to go through all cards.</p>
    <div class="flashcard-deck">
      <div class="flashcard-viewport">
        <div class="flashcard-wrap">
          <div class="flashcard">
            <div class="flashcard-front"><span></span></div>
            <div class="flashcard-back"><span></span></div>
          </div>
        </div>
      </div>
      <div class="flashcard-nav">
        <button class="btn btn-primary btn-prev">← Prev</button>
        <span class="fc-counter">1 / 9</span>
        <button class="btn btn-primary btn-next">Next →</button>
      </div>
    </div>
  </div>

  <!-- ── TEST ───────────────────────────────────── -->
  <div class="section-title"><span class="icon">✏️</span> Test Yourself</div>

  <!-- Activity 3: Fill-in-blank -->
  <div class="activity" id="fitb2">
    <h2>✍️ Fill in the Blanks</h2>
    <p class="instructions">Complete each sentence with the missing word(s).</p>
    <div class="fitb-list">
      <div class="fitb-item">Cirrus clouds are made of <input class="fitb-input" data-answer="ice crystals" placeholder="???"> because they form so high up where it is freezing.</div>
      <div class="fitb-item"><input class="fitb-input" data-answer="Stratus" placeholder="???"> clouds form a grey blanket and give a light <input class="fitb-input" data-answer="drizzle" placeholder="???">.</div>
      <div class="fitb-item">In convectional rainfall, the sun heats the <input class="fitb-input" data-answer="ground" placeholder="???"> which warms the air above it, causing it to <input class="fitb-input" data-answer="rise" placeholder="???">.</div>
      <div class="fitb-item">In relief rainfall, the <input class="fitb-input" data-answer="windward" placeholder="???"> side of a mountain gets rain, while the <input class="fitb-input" data-answer="leeward" placeholder="???"> side stays dry (called a rain shadow).</div>
      <div class="fitb-item">Frontal rainfall occurs when a warm air mass slides up over a <input class="fitb-input" data-answer="cold" placeholder="???"> air mass at a <input class="fitb-input" data-answer="front" placeholder="???">.</div>
      <div class="fitb-item">The UK's prevailing wind comes from the <input class="fitb-input" data-answer="south-west/SW" placeholder="???"> bringing moisture from the <input class="fitb-input" data-answer="Atlantic" placeholder="???"> Ocean.</div>
    </div>
    <div class="btn-row"><button class="btn btn-primary btn-check">Check answers</button></div>
  </div>

  <!-- Activity 4: Quiz -->
  <div class="activity" id="quiz2">
    <h2>❓ Quick Quiz</h2>
    <p class="instructions">Select the best answer for each question.</p>

    <div class="quiz-question" data-q="0">
      <div class="q-text">1. Which cloud type is made of ice crystals?</div>
      <div class="quiz-options">
        <button class="quiz-option">Cumulus</button>
        <button class="quiz-option">Stratus</button>
        <button class="quiz-option">Cirrus</button>
        <button class="quiz-option">Nimbus</button>
      </div>
    </div>

    <div class="quiz-question" data-q="1">
      <div class="q-text">2. What causes convectional rainfall?</div>
      <div class="quiz-options">
        <button class="quiz-option">Warm air forced up over mountains</button>
        <button class="quiz-option">The sun heating the ground, making air rise</button>
        <button class="quiz-option">A warm air mass meeting a cold air mass</button>
        <button class="quiz-option">Ocean currents cooling the air</button>
      </div>
    </div>

    <div class="quiz-question" data-q="2">
      <div class="q-text">3. In relief rainfall, which side of a mountain gets the rain?</div>
      <div class="quiz-options">
        <button class="quiz-option">The leeward (sheltered) side</button>
        <button class="quiz-option">The windward (facing the wind) side</button>
        <button class="quiz-option">The summit only</button>
        <button class="quiz-option">Both sides equally</button>
      </div>
    </div>

    <div class="quiz-question" data-q="3">
      <div class="q-text">4. What happens to warm air when it meets cold air in frontal rainfall?</div>
      <div class="quiz-options">
        <button class="quiz-option">It sinks below the cold air</button>
        <button class="quiz-option">It stays at the same level</button>
        <button class="quiz-option">It slides up and over the cold air</button>
        <button class="quiz-option">It evaporates</button>
      </div>
    </div>

    <div class="quiz-question" data-q="4">
      <div class="q-text">5. Which cloud type brings short, heavy showers?</div>
      <div class="quiz-options">
        <button class="quiz-option">Cirrus</button>
        <button class="quiz-option">Stratus</button>
        <button class="quiz-option">Cumulus</button>
        <button class="quiz-option">Fog</button>
      </div>
    </div>

    <div class="quiz-question" data-q="5">
      <div class="q-text">6. Why does the west coast of the UK get a lot of rain?</div>
      <div class="quiz-options">
        <button class="quiz-option">It is close to the equator</button>
        <button class="quiz-option">The prevailing south-westerly wind brings moisture from the Atlantic Ocean</button>
        <button class="quiz-option">It has very high altitude</button>
        <button class="quiz-option">It always has low air pressure</button>
      </div>
    </div>
  </div>

  <div style="text-align:center;margin-top:30px;display:flex;gap:12px;justify-content:center">
    <a href="day1.html" class="btn btn-primary">← Day 1</a>
    <a href="day3.html" class="btn btn-success">Day 3 →</a>
  </div>

</div>

<script src="app.js"></script>
<script>
const D2_PAIRS = [
  { chip: 'sun-heats',  target: 'sun-heats'  },
  { chip: 'mountain',   target: 'mountain'   },
  { chip: 'warm-cold',  target: 'warm-cold'  },
  { chip: 'convection', target: 'convection' },
  { chip: 'windward',   target: 'windward'   },
  { chip: 'air-mass',   target: 'air-mass'   },
];
initDragDrop('dnd2', D2_PAIRS, 'day2', 'dnd');

const D2_CARDS = [
  { front: 'Cumulus clouds', back: 'Fluffy, low clouds. Can bring short heavy showers. May grow tall and dark.' },
  { front: 'Stratus clouds', back: 'Grey blanket of cloud, low in sky. Give a light drizzle but no heavy showers.' },
  { front: 'Cirrus clouds', back: 'Thin wispy clouds very high up (>6 km). Made of ice crystals. Sign of bad weather coming.' },
  { front: 'Convectional rainfall', back: 'Sun heats ground → air rises → cools → condenses → rain. Inland, summer.' },
  { front: 'Relief rainfall', back: 'Moist air forced up over mountains → cools → rains on windward side. Leeward side = rain shadow.' },
  { front: 'Frontal rainfall', back: 'Warm air mass meets cold air mass → warm air rises over cold → cools → rain.' },
  { front: 'Windward side', back: 'The side of a mountain facing the wind. Gets the rain in relief rainfall.' },
  { front: 'Leeward side', back: 'The sheltered side of a mountain. Stays dry — called the rain shadow.' },
  { front: 'Why does west UK get most rain?', back: 'The prevailing south-westerly wind brings moist air from the Atlantic, which rises over hills.' },
];
initFlashcards('fc2', D2_CARDS, 'day2', 'flashcards');
initFitb('fitb2', 'day2', 'fitb');

const D2_Q = [
  { q:'', options:[], answer: 2 },
  { q:'', options:[], answer: 1 },
  { q:'', options:[], answer: 1 },
  { q:'', options:[], answer: 2 },
  { q:'', options:[], answer: 2 },
  { q:'', options:[], answer: 1 },
];
initQuiz('quiz2', D2_Q, 'day2', 'quiz');
</script>
</body>
</html>
```

---

## Task 6: Day 3 Page (`site/day3.html`)

**File:** Create `site/day3.html`

**Topics:** Low vs high pressure; high pressure in summer vs winter.

**Activities:**
1. **Drag-and-drop** — match weather phenomena to low or high pressure
2. **Flashcards** — pressure terms → definitions
3. **Fill-in-the-blank** — sentences on pressure effects
4. **Quiz** — 6 questions

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Day 3 – Air Pressure & Weather</title>
  <link rel="stylesheet" href="style.css">
</head>
<body data-day="day3">

<nav>
  <a class="logo" href="index.html">🌤 Weather & Climate</a>
  <div class="nav-links">
    <a href="index.html">Home</a>
    <a href="day1.html">Day 1</a>
    <a href="day2.html">Day 2</a>
    <a href="day3.html">Day 3</a>
    <a href="day4.html">Day 4</a>
  </div>
</nav>

<div class="page-header">
  <span class="day-badge" style="background:var(--day3)">Day 3</span>
  <h1>Air Pressure &amp; Weather</h1>
  <p>Discover how air pressure shapes the weather — from sunny days to stormy nights.</p>
  <div style="max-width:400px;margin:16px auto 0;background:#ddd;border-radius:6px;height:10px;overflow:hidden">
    <div class="day-progress-fill" style="height:100%;width:0%;background:var(--day3);border-radius:6px;transition:width 0.5s"></div>
  </div>
  <p style="font-size:0.85rem;color:#888;margin-top:4px">Progress: <span class="day-progress-pct">0%</span></p>
</div>

<div class="container">

  <!-- ── LEARN ─────────────────────────────────── -->
  <div class="section-title"><span class="icon">📖</span> Learn</div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
    <div class="panel" style="border-top:4px solid #4A90D9">
      <h3>🔵 Low Pressure</h3>
      <ul class="steps">
        <li data-n="1">Warm air <strong>rises</strong> at the centre.</li>
        <li data-n="2">Rising air cools → clouds form.</li>
        <li data-n="3">Clouds bring <strong>rain</strong> and <strong>wind</strong>.</li>
        <li data-n="4">A <strong>falling barometer</strong> signals low pressure coming.</li>
      </ul>
      <p style="margin-top:10px;font-size:0.88rem;background:#e8f4fd;padding:8px;border-radius:8px">
        Low pressure = <strong>unsettled, stormy, windy, rainy</strong> weather.
      </p>
    </div>
    <div class="panel" style="border-top:4px solid #FF9800">
      <h3>🔴 High Pressure</h3>
      <ul class="steps">
        <li data-n="1">Cold air <strong>sinks</strong> at the centre.</li>
        <li data-n="2">Sinking air warms → no condensation.</li>
        <li data-n="3"><strong>No clouds</strong> form → clear, dry skies.</li>
        <li data-n="4">A <strong>rising barometer</strong> signals high pressure coming.</li>
      </ul>
      <p style="margin-top:10px;font-size:0.88rem;background:#fff8e1;padding:8px;border-radius:8px">
        High pressure = <strong>settled, dry, calm</strong> weather.
      </p>
    </div>
  </div>

  <div class="section-title" style="font-size:1.1rem;margin-top:16px"><span class="icon">☀️</span> High Pressure in Summer</div>
  <div class="card-grid" style="grid-template-columns:repeat(auto-fill,minmax(170px,1fr))">
    <div class="info-card"><div class="card-icon">☀️</div><h3>Hot sunny days</h3><p>No clouds to block the sun.</p></div>
    <div class="info-card"><div class="card-icon">💧</div><h3>Dew at night</h3><p>No cloud blanket → ground cools fast → water vapour condenses on grass.</p></div>
    <div class="info-card"><div class="card-icon">🌵</div><h3>Drought</h3><p>Long periods of no rain can cause drought.</p></div>
    <div class="info-card"><div class="card-icon">⛈️</div><h3>Thunderstorms</h3><p>Very hot inland days → air rises rapidly → huge black clouds → thunderstorms and flooding.</p></div>
  </div>

  <div class="section-title" style="font-size:1.1rem"><span class="icon">❄️</span> High Pressure in Winter</div>
  <div class="card-grid" style="grid-template-columns:repeat(auto-fill,minmax(170px,1fr))">
    <div class="info-card"><div class="card-icon">🌨️</div><h3>Frost</h3><p>No cloud blanket → ground cools rapidly at night → water vapour freezes on surfaces.</p></div>
    <div class="info-card"><div class="card-icon">🌫️</div><h3>Fog</h3><p>Water vapour condenses on dust and tiny particles in the air → thick fog, dangerous driving.</p></div>
    <div class="info-card"><div class="card-icon">🧊</div><h3>Ice</h3><p>Water on roads freezes as the sun goes down.</p></div>
    <div class="info-card"><div class="card-icon">😊</div><h3>Clear cold days</h3><p>No cloud → clear blue skies but very cold temperatures.</p></div>
  </div>

  <!-- ── PRACTICE ────────────────────────────────── -->
  <div class="section-title"><span class="icon">🧩</span> Practice</div>

  <!-- Activity 1: Drag-and-Drop -->
  <div class="activity" id="dnd3">
    <h2>🔗 Sort the Weather</h2>
    <p class="instructions">Drag each weather type to either Low Pressure or High Pressure.</p>
    <div class="dnd-area">
      <div class="dnd-chips">
        <div class="chip" data-chip="rain" draggable="true">Heavy rain 🌧️</div>
        <div class="chip" data-chip="clear" draggable="true">Clear blue skies ☀️</div>
        <div class="chip" data-chip="wind" draggable="true">Strong winds 💨</div>
        <div class="chip" data-chip="frost" draggable="true">Frost & fog ❄️</div>
        <div class="chip" data-chip="clouds" draggable="true">Lots of clouds ☁️</div>
        <div class="chip" data-chip="drought" draggable="true">Drought 🌵</div>
      </div>
      <div class="dnd-targets">
        <div class="dnd-target"><span class="target-label">🔵 Low Pressure</span><div class="drop-zone" data-target="rain">drop here</div></div>
        <div class="dnd-target"><span class="target-label">🔵 Low Pressure</span><div class="drop-zone" data-target="wind">drop here</div></div>
        <div class="dnd-target"><span class="target-label">🔵 Low Pressure</span><div class="drop-zone" data-target="clouds">drop here</div></div>
        <div class="dnd-target"><span class="target-label">🔴 High Pressure</span><div class="drop-zone" data-target="clear">drop here</div></div>
        <div class="dnd-target"><span class="target-label">🔴 High Pressure</span><div class="drop-zone" data-target="frost">drop here</div></div>
        <div class="dnd-target"><span class="target-label">🔴 High Pressure</span><div class="drop-zone" data-target="drought">drop here</div></div>
      </div>
    </div>
  </div>

  <!-- Activity 2: Flashcards -->
  <div class="activity" id="fc3">
    <h2>🃏 Flashcards</h2>
    <p class="instructions">Click to flip each card. Arrow buttons to navigate.</p>
    <div class="flashcard-deck">
      <div class="flashcard-viewport">
        <div class="flashcard-wrap">
          <div class="flashcard">
            <div class="flashcard-front"><span></span></div>
            <div class="flashcard-back"><span></span></div>
          </div>
        </div>
      </div>
      <div class="flashcard-nav">
        <button class="btn btn-primary btn-prev">← Prev</button>
        <span class="fc-counter">1 / 8</span>
        <button class="btn btn-primary btn-next">Next →</button>
      </div>
    </div>
  </div>

  <!-- ── TEST ───────────────────────────────────── -->
  <div class="section-title"><span class="icon">✏️</span> Test Yourself</div>

  <!-- Activity 3: Fill-in-blank -->
  <div class="activity" id="fitb3">
    <h2>✍️ Fill in the Blanks</h2>
    <p class="instructions">Complete each sentence.</p>
    <div class="fitb-list">
      <div class="fitb-item">If air pressure is <strong>low</strong>, it means air is <input class="fitb-input" data-answer="rising" placeholder="???">. This leads to clouds and <input class="fitb-input" data-answer="rain" placeholder="???">.</div>
      <div class="fitb-item">If air pressure is <strong>high</strong>, it means air is <input class="fitb-input" data-answer="sinking" placeholder="???">. This means <input class="fitb-input" data-answer="no clouds/clear skies" placeholder="???"> and dry weather.</div>
      <div class="fitb-item">A <input class="fitb-input" data-answer="barometer" placeholder="???"> is used to measure air pressure. A falling barometer means <input class="fitb-input" data-answer="rain/bad weather" placeholder="???"> is on the way.</div>
      <div class="fitb-item">In summer, high pressure brings <input class="fitb-input" data-answer="hot/sunny" placeholder="???"> weather. At night, no cloud means the ground cools fast, causing <input class="fitb-input" data-answer="dew" placeholder="???"> to form.</div>
      <div class="fitb-item">In winter, high pressure brings clear, cold days. At night, water vapour freezes on surfaces to give <input class="fitb-input" data-answer="frost" placeholder="???"> and condenses on dust particles to give <input class="fitb-input" data-answer="fog" placeholder="???">.</div>
    </div>
    <div class="btn-row"><button class="btn btn-primary btn-check">Check answers</button></div>
  </div>

  <!-- Activity 4: Quiz -->
  <div class="activity" id="quiz3">
    <h2>❓ Quick Quiz</h2>
    <p class="instructions">Choose the best answer.</p>

    <div class="quiz-question" data-q="0">
      <div class="q-text">1. What type of weather does low air pressure bring?</div>
      <div class="quiz-options">
        <button class="quiz-option">Hot, sunny, dry</button>
        <button class="quiz-option">Cold, frosty, clear</button>
        <button class="quiz-option">Cloudy, rainy, windy</button>
        <button class="quiz-option">Calm, foggy, cold</button>
      </div>
    </div>

    <div class="quiz-question" data-q="1">
      <div class="q-text">2. In low pressure, what happens to the air?</div>
      <div class="quiz-options">
        <button class="quiz-option">It sinks</button>
        <button class="quiz-option">It rises</button>
        <button class="quiz-option">It stays at the same height</button>
        <button class="quiz-option">It moves sideways only</button>
      </div>
    </div>

    <div class="quiz-question" data-q="2">
      <div class="q-text">3. What is dew?</div>
      <div class="quiz-options">
        <button class="quiz-option">Frozen rain</button>
        <button class="quiz-option">Water vapour that condensed on cold surfaces overnight</button>
        <button class="quiz-option">A type of fog</button>
        <button class="quiz-option">Condensation inside clouds</button>
      </div>
    </div>

    <div class="quiz-question" data-q="3">
      <div class="q-text">4. Why does high pressure in winter cause frost?</div>
      <div class="quiz-options">
        <button class="quiz-option">Because the wind blows snow from elsewhere</button>
        <button class="quiz-option">Because there is no cloud blanket to trap heat, so the ground cools rapidly at night</button>
        <button class="quiz-option">Because high pressure always brings snow</button>
        <button class="quiz-option">Because the sun is too weak in winter to melt ice</button>
      </div>
    </div>

    <div class="quiz-question" data-q="4">
      <div class="q-text">5. What does a rising barometer tell you?</div>
      <div class="quiz-options">
        <button class="quiz-option">Stormy weather is on the way</button>
        <button class="quiz-option">Temperature is increasing</button>
        <button class="quiz-option">Air pressure is increasing — fair weather coming</button>
        <button class="quiz-option">Wind speed is increasing</button>
      </div>
    </div>

    <div class="quiz-question" data-q="5">
      <div class="q-text">6. Which summer high pressure weather can cause flooding?</div>
      <div class="quiz-options">
        <button class="quiz-option">Fog</button>
        <button class="quiz-option">Frost</button>
        <button class="quiz-option">Thunderstorms from rapidly rising hot air inland</button>
        <button class="quiz-option">Sea breezes</button>
      </div>
    </div>
  </div>

  <div style="text-align:center;margin-top:30px;display:flex;gap:12px;justify-content:center">
    <a href="day2.html" class="btn btn-primary">← Day 2</a>
    <a href="day4.html" class="btn btn-success">Day 4 →</a>
  </div>

</div>

<script src="app.js"></script>
<script>
const D3_PAIRS = [
  { chip: 'rain',   target: 'rain'   },
  { chip: 'wind',   target: 'wind'   },
  { chip: 'clouds', target: 'clouds' },
  { chip: 'clear',  target: 'clear'  },
  { chip: 'frost',  target: 'frost'  },
  { chip: 'drought',target: 'drought'},
];
initDragDrop('dnd3', D3_PAIRS, 'day3', 'dnd');

const D3_CARDS = [
  { front: 'Low pressure', back: 'Air is rising. Brings clouds, rain and wind. Unsettled weather. Barometer falls.' },
  { front: 'High pressure', back: 'Air is sinking. No clouds form. Dry, calm weather. Barometer rises.' },
  { front: 'Barometer', back: 'Instrument that measures air pressure in millibars. Falling = rain, Rising = fair weather.' },
  { front: 'High pressure in summer', back: 'Hot sunny days, dew at night, possible drought, thunderstorms inland.' },
  { front: 'High pressure in winter', back: 'Clear cold days, frost, fog, ice on roads. No cloud to keep heat in.' },
  { front: 'Frost', back: 'Forms when water vapour freezes on cold surfaces overnight. Common in winter high pressure.' },
  { front: 'Fog', back: 'Water vapour condenses on tiny dust particles in the air. Makes driving dangerous.' },
  { front: 'Dew', back: 'Water vapour that condenses on grass and surfaces when they cool at night.' },
];
initFlashcards('fc3', D3_CARDS, 'day3', 'flashcards');
initFitb('fitb3', 'day3', 'fitb');

const D3_Q = [
  { q:'', options:[], answer: 2 },
  { q:'', options:[], answer: 1 },
  { q:'', options:[], answer: 1 },
  { q:'', options:[], answer: 1 },
  { q:'', options:[], answer: 2 },
  { q:'', options:[], answer: 2 },
];
initQuiz('quiz3', D3_Q, 'day3', 'quiz');
</script>
</body>
</html>
```

---

## Task 7: Day 4 Page (`site/day4.html`)

**File:** Create `site/day4.html`

**Topics:** Latitude, altitude, distance from sea, prevailing winds, ocean currents. Climate graphs (bar + line combo). Uses Chart.js CDN.

**Activities:**
1. **Drag-and-drop** — match factor to its effect
2. **Flashcards** — factor → explanation
3. **Fill-in-the-blank** — climate factor sentences
4. **Quiz** — 6 questions including one on reading a climate graph
5. **Interactive climate graph** — labelled London climate graph using Chart.js with a short "read the graph" exercise

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Day 4 – Climate Factors & Climate Graphs</title>
  <link rel="stylesheet" href="style.css">
</head>
<body data-day="day4">

<nav>
  <a class="logo" href="index.html">🌤 Weather & Climate</a>
  <div class="nav-links">
    <a href="index.html">Home</a>
    <a href="day1.html">Day 1</a>
    <a href="day2.html">Day 2</a>
    <a href="day3.html">Day 3</a>
    <a href="day4.html">Day 4</a>
  </div>
</nav>

<div class="page-header">
  <span class="day-badge" style="background:var(--day4)">Day 4</span>
  <h1>Factors Influencing Climate &amp; Climate Graphs</h1>
  <p>Why is Egypt hotter than the UK? Why is the west coast wetter? Find out today!</p>
  <div style="max-width:400px;margin:16px auto 0;background:#ddd;border-radius:6px;height:10px;overflow:hidden">
    <div class="day-progress-fill" style="height:100%;width:0%;background:var(--day4);border-radius:6px;transition:width 0.5s"></div>
  </div>
  <p style="font-size:0.85rem;color:#888;margin-top:4px">Progress: <span class="day-progress-pct">0%</span></p>
</div>

<div class="container">

  <!-- ── LEARN ─────────────────────────────────── -->
  <div class="section-title"><span class="icon">📖</span> Learn — Factors That Affect Climate</div>

  <div class="card-grid">
    <div class="info-card">
      <div class="card-icon">🌍</div>
      <h3>Latitude</h3>
      <p>The <strong>main factor</strong>. Further from the equator → cooler. The Earth is curved, so the sun's rays spread over a larger area at higher latitudes. That's why the UK is cooler than Egypt.</p>
    </div>
    <div class="info-card">
      <div class="card-icon">⛰️</div>
      <h3>Altitude</h3>
      <p>Higher above sea level → colder. Temperature drops by about <strong>1°C for every 100 m</strong> you climb. Ben Nevis (1344 m) has snow in summer!</p>
    </div>
    <div class="info-card">
      <div class="card-icon">🌊</div>
      <h3>Distance from the Sea</h3>
      <p>The sea warms and cools slowly. <strong>Coastal areas</strong>: cooler in summer, warmer in winter than inland. A sea breeze cools the coast in summer.</p>
    </div>
    <div class="info-card">
      <div class="card-icon">💨</div>
      <h3>Prevailing Wind</h3>
      <p>The UK's prevailing wind blows from the <strong>south-west</strong>. It picks up moisture from the Atlantic → brings rain, especially to the west coast.</p>
    </div>
    <div class="info-card">
      <div class="card-icon">🌀</div>
      <h3>Ocean Currents</h3>
      <p>The <strong>North Atlantic Drift</strong> (a warm ocean current) flows past the UK's west coast. It warms the wind, keeping winters milder than they would otherwise be.</p>
    </div>
    <div class="info-card">
      <div class="card-icon">🏙️</div>
      <h3>Other Local Factors</h3>
      <p><strong>Shelter</strong> (hills blocking wind), <strong>urban heat islands</strong> (cities are warmer due to heat from buildings and traffic).</p>
    </div>
  </div>

  <!-- Climate graph explanation -->
  <div class="section-title"><span class="icon">📊</span> Climate Graphs</div>
  <div class="definition-box" style="border-color:var(--day4)">
    <h3>How to read a climate graph</h3>
    <p>A climate graph shows <strong>average monthly temperature</strong> (as a <span style="color:#FF6B35;font-weight:700">red/orange line</span>) and <strong>average monthly rainfall</strong> (as <span style="color:#4A90D9;font-weight:700">blue bars</span>) for a place across 12 months.<br><br>
    Temperature is read on the <strong>right</strong> y-axis (°C). Rainfall is read on the <strong>left</strong> y-axis (mm).</p>
  </div>

  <div class="climate-graph-wrap" style="margin-bottom:24px">
    <canvas id="londonChart" height="120"></canvas>
  </div>

  <div class="activity" id="graph-questions">
    <h2>📊 Read the London Climate Graph</h2>
    <p class="instructions">Use the graph above to answer these questions — type your answers and press Check.</p>
    <div class="fitb-list">
      <div class="fitb-item">The hottest month in London is <input class="fitb-input" data-answer="July/August" style="width:100px" placeholder="???">.</div>
      <div class="fitb-item">The coldest month is <input class="fitb-input" data-answer="January" style="width:100px" placeholder="???">.</div>
      <div class="fitb-item">The wettest month is <input class="fitb-input" data-answer="October/November" style="width:130px" placeholder="???">.</div>
      <div class="fitb-item">The approximate maximum temperature in July is about <input class="fitb-input" data-answer="18/19/17" style="width:60px" placeholder="??"> °C.</div>
      <div class="fitb-item">Does London get more rain in summer or winter? <input class="fitb-input" data-answer="winter" style="width:80px" placeholder="???">.</div>
    </div>
    <div class="btn-row"><button class="btn btn-primary btn-check">Check answers</button></div>
  </div>

  <!-- ── PRACTICE ────────────────────────────────── -->
  <div class="section-title"><span class="icon">🧩</span> Practice</div>

  <!-- Activity 1: Drag-and-Drop -->
  <div class="activity" id="dnd4">
    <h2>🔗 Match the Factor to its Effect</h2>
    <p class="instructions">Drag each climate factor to the correct effect.</p>
    <div class="dnd-area">
      <div class="dnd-chips">
        <div class="chip" data-chip="latitude" draggable="true">Latitude</div>
        <div class="chip" data-chip="altitude" draggable="true">Altitude</div>
        <div class="chip" data-chip="sea" draggable="true">Distance from sea</div>
        <div class="chip" data-chip="wind" draggable="true">Prevailing wind</div>
        <div class="chip" data-chip="current" draggable="true">Ocean currents</div>
      </div>
      <div class="dnd-targets">
        <div class="dnd-target"><span class="target-label">Further from equator = cooler</span><div class="drop-zone" data-target="latitude">drop here</div></div>
        <div class="dnd-target"><span class="target-label">1°C colder per 100 m climbed</span><div class="drop-zone" data-target="altitude">drop here</div></div>
        <div class="dnd-target"><span class="target-label">Coasts are cooler in summer, warmer in winter</span><div class="drop-zone" data-target="sea">drop here</div></div>
        <div class="dnd-target"><span class="target-label">South-west wind brings moisture to UK west coast</span><div class="drop-zone" data-target="wind">drop here</div></div>
        <div class="dnd-target"><span class="target-label">North Atlantic Drift warms UK winters</span><div class="drop-zone" data-target="current">drop here</div></div>
      </div>
    </div>
  </div>

  <!-- Activity 2: Flashcards -->
  <div class="activity" id="fc4">
    <h2>🃏 Flashcards</h2>
    <p class="instructions">Click to flip. Arrows to navigate.</p>
    <div class="flashcard-deck">
      <div class="flashcard-viewport">
        <div class="flashcard-wrap">
          <div class="flashcard">
            <div class="flashcard-front"><span></span></div>
            <div class="flashcard-back"><span></span></div>
          </div>
        </div>
      </div>
      <div class="flashcard-nav">
        <button class="btn btn-primary btn-prev">← Prev</button>
        <span class="fc-counter">1 / 9</span>
        <button class="btn btn-primary btn-next">Next →</button>
      </div>
    </div>
  </div>

  <!-- ── TEST ───────────────────────────────────── -->
  <div class="section-title"><span class="icon">✏️</span> Test Yourself</div>

  <!-- Activity 3: Fill-in-blank -->
  <div class="activity" id="fitb4">
    <h2>✍️ Fill in the Blanks</h2>
    <p class="instructions">Complete each sentence.</p>
    <div class="fitb-list">
      <div class="fitb-item">The main factor affecting climate is <input class="fitb-input" data-answer="latitude" placeholder="???">. The further from the equator, the <input class="fitb-input" data-answer="colder" placeholder="???"> it gets.</div>
      <div class="fitb-item">Temperature falls by about <input class="fitb-input" data-answer="1°C/1" placeholder="???"> for every <input class="fitb-input" data-answer="100" placeholder="???"> metres you climb in altitude.</div>
      <div class="fitb-item">The sea warms and cools more <input class="fitb-input" data-answer="slowly" placeholder="???"> than the land. This means coastal areas are <input class="fitb-input" data-answer="cooler" placeholder="???"> in summer and warmer in winter than inland areas.</div>
      <div class="fitb-item">The UK's prevailing wind is from the <input class="fitb-input" data-answer="south-west/SW" placeholder="???">. This brings rain because it picks up moisture from the <input class="fitb-input" data-answer="Atlantic" placeholder="???"> Ocean.</div>
      <div class="fitb-item">The <input class="fitb-input" data-answer="North Atlantic Drift" placeholder="???"> is a warm ocean current that keeps UK winters <input class="fitb-input" data-answer="milder/warmer" placeholder="???"> than expected.</div>
    </div>
    <div class="btn-row"><button class="btn btn-primary btn-check">Check answers</button></div>
  </div>

  <!-- Activity 4: Quiz -->
  <div class="activity" id="quiz4">
    <h2>❓ Quick Quiz</h2>
    <p class="instructions">Select the best answer.</p>

    <div class="quiz-question" data-q="0">
      <div class="q-text">1. Why is Egypt hotter than the UK?</div>
      <div class="quiz-options">
        <button class="quiz-option">Egypt is closer to the sea</button>
        <button class="quiz-option">Egypt is closer to the equator, so the sun's rays are more concentrated</button>
        <button class="quiz-option">Egypt has higher altitude</button>
        <button class="quiz-option">Egypt has stronger prevailing winds</button>
      </div>
    </div>

    <div class="quiz-question" data-q="1">
      <div class="q-text">2. By how much does temperature fall for every 100 m increase in altitude?</div>
      <div class="quiz-options">
        <button class="quiz-option">5°C</button>
        <button class="quiz-option">0.1°C</button>
        <button class="quiz-option">1°C</button>
        <button class="quiz-option">10°C</button>
      </div>
    </div>

    <div class="quiz-question" data-q="2">
      <div class="q-text">3. Why are coastal areas warmer than inland areas in winter?</div>
      <div class="quiz-options">
        <button class="quiz-option">The sea releases stored heat slowly, keeping nearby land warmer</button>
        <button class="quiz-option">The sea reflects more sunlight in winter</button>
        <button class="quiz-option">Coastal areas are at lower altitude</button>
        <button class="quiz-option">Coastal areas have more cloud cover</button>
      </div>
    </div>

    <div class="quiz-question" data-q="3">
      <div class="q-text">4. What is the North Atlantic Drift?</div>
      <div class="quiz-options">
        <button class="quiz-option">A type of rainfall</button>
        <button class="quiz-option">A prevailing wind</button>
        <button class="quiz-option">A warm ocean current that warms the UK's west coast</button>
        <button class="quiz-option">A cold ocean current from the Arctic</button>
      </div>
    </div>

    <div class="quiz-question" data-q="4">
      <div class="q-text">5. On a climate graph, what does the line graph show?</div>
      <div class="quiz-options">
        <button class="quiz-option">Monthly rainfall in mm</button>
        <button class="quiz-option">Average monthly temperature in °C</button>
        <button class="quiz-option">Wind speed in mph</button>
        <button class="quiz-option">Hours of sunshine per month</button>
      </div>
    </div>

    <div class="quiz-question" data-q="5">
      <div class="q-text">6. Why does the west coast of the UK receive more rainfall than the east coast?</div>
      <div class="quiz-options">
        <button class="quiz-option">It is further from the equator</button>
        <button class="quiz-option">It is at higher altitude</button>
        <button class="quiz-option">The south-westerly prevailing wind brings moist Atlantic air which hits the western hills first</button>
        <button class="quiz-option">Ocean currents bring cold water to the west</button>
      </div>
    </div>
  </div>

  <div class="complete-banner" id="completeBanner">
    <h3>🎉 You've completed all 4 days!</h3>
    <p>Amazing work! You're ready for your test. Good luck! 🌟</p>
  </div>

  <div style="text-align:center;margin-top:30px;display:flex;gap:12px;justify-content:center">
    <a href="day3.html" class="btn btn-primary">← Day 3</a>
    <a href="index.html" class="btn btn-success">Back to Home 🏠</a>
  </div>

</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<script src="app.js"></script>
<script>
// London climate data
renderClimateGraph(
  'londonChart',
  'London — Average Monthly Climate',
  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  [5, 5, 8, 11, 14, 17, 19, 19, 16, 12, 8, 5],   // temps °C
  [55, 40, 42, 45, 48, 45, 45, 47, 50, 60, 60, 55] // rainfall mm
);

initFitb('graph-questions', 'day4', 'graph');

const D4_PAIRS = [
  { chip: 'latitude', target: 'latitude' },
  { chip: 'altitude', target: 'altitude' },
  { chip: 'sea',      target: 'sea'      },
  { chip: 'wind',     target: 'wind'     },
  { chip: 'current',  target: 'current'  },
];
initDragDrop('dnd4', D4_PAIRS, 'day4', 'dnd');

const D4_CARDS = [
  { front: 'Latitude', back: 'The main climate factor. Further from the equator = cooler, because sun rays spread over a larger area.' },
  { front: 'Altitude', back: 'Higher = colder. Temperature drops 1°C for every 100 metres above sea level.' },
  { front: 'Distance from the sea', back: 'Sea warms/cools slowly. Coastal areas are cooler in summer, warmer in winter than inland.' },
  { front: 'Prevailing wind (UK)', back: 'South-westerly. Brings moisture from the Atlantic. West coast gets most rain.' },
  { front: 'North Atlantic Drift', back: 'Warm ocean current flowing past the UK\'s west coast. Keeps winters milder.' },
  { front: 'Urban heat island', back: 'Cities are warmer than the countryside because roads, buildings and cars release heat.' },
  { front: 'Rain shadow', back: 'The dry leeward side of a mountain that gets little rain because moist air already rained on the windward side.' },
  { front: 'Climate graph — bars', back: 'Blue bars = average monthly rainfall in millimetres (mm). Read on the LEFT y-axis.' },
  { front: 'Climate graph — line', back: 'Orange/red line = average monthly temperature in °C. Read on the RIGHT y-axis.' },
];
initFlashcards('fc4', D4_CARDS, 'day4', 'flashcards');
initFitb('fitb4', 'day4', 'fitb');

const D4_Q = [
  { q:'', options:[], answer: 1 },
  { q:'', options:[], answer: 2 },
  { q:'', options:[], answer: 0 },
  { q:'', options:[], answer: 2 },
  { q:'', options:[], answer: 1 },
  { q:'', options:[], answer: 2 },
];
initQuiz('quiz4', D4_Q, 'day4', 'quiz');

// Show completion banner if all days done
document.addEventListener('DOMContentLoaded', () => {
  const allDone = [1,2,3,4].every(d => getDayProgress('day' + d) >= 50);
  if (allDone) document.getElementById('completeBanner').classList.add('show');
});
</script>
</body>
</html>
```

---

## Verification Checklist

After all files are written, open `site/index.html` in a browser and confirm:

- [ ] All 4 day cards show on the home page
- [ ] Navigation links work between all pages
- [ ] Day 1: Drag-and-drop instruments work; flashcards flip; fill-in-blank checks; quiz scores
- [ ] Day 2: All 4 activities functional
- [ ] Day 3: All 4 activities functional
- [ ] Day 4: Chart.js climate graph renders; all 4 activities functional
- [ ] Progress bars update on home page after completing activities
- [ ] Progress persists on page reload (localStorage)
- [ ] Layout looks good on mobile (narrow browser window)
