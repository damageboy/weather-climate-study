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
function initDragDrop(containerId, pairs, dayKey, activityKey) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const chips = container.querySelectorAll('.chip');
  let dragged = null;

  chips.forEach(chip => {
    chip.setAttribute('draggable', 'true');

    chip.addEventListener('dragstart', e => {
      dragged = chip;
      e.dataTransfer.effectAllowed = 'move';
    });

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

  container.querySelectorAll('.drop-zone').forEach(zone => {
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
    if (zone.querySelector('.chip')) return;
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
    const wrongCount = container.querySelectorAll('.drop-zone.wrong').length;
    if (correct + wrongCount === total) {
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
        if (answered.every(Boolean)) {
          let score = 0;
          answered.forEach((_, i) => {
            const qDiv = container.querySelector(`[data-q="${i}"]`);
            if (qDiv?.querySelector('.quiz-option.correct.selected')) score++;
          });
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
