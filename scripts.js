// ── CONFIG ──
const PASSWORD = '!TrainingApp202';
const BIN_ID   = '6a1c1ce5ddf5aa59f77b7666';
const API_KEY  = 'YOUR_API_KEY_HERE'; // Paste your JSONBin Master Key here
const BIN_URL  = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// ── EXERCISE DEFINITIONS ──
const PHASES = {
  1: {
    label: 'Phase 1 — Foundation',
    sets: 3, reps: 8,
    exercises: [
      { id: 'bench',   name: 'Flat Barbell Bench Press' },
      { id: 'fly',     name: 'Dumbbell Chest Fly' },
      { id: 'incline', name: 'Incline Dumbbell Press', from: 3 },
    ]
  },
  2: {
    label: 'Phase 2 — Development',
    sets: 3, reps: 10,
    exercises: [
      { id: 'bench',      name: 'Flat Barbell Bench Press' },
      { id: 'closegrip',  name: 'Close-Grip Bench Press' },
      { id: 'incline',    name: 'Incline Dumbbell Press' },
      { id: 'fly',        name: 'Dumbbell Chest Fly' },
      { id: 'pullover',   name: 'Dumbbell Pullover', optional: true },
    ]
  },
  3: {
    label: 'Phase 3 — Strength Push',
    sets: 4, reps: 6,
    exercises: [
      { id: 'bench',     name: 'Flat Barbell Bench Press' },
      { id: 'closegrip', name: 'Close-Grip Bench Press' },
      { id: 'incline',   name: 'Incline Dumbbell Press' },
      { id: 'fly',       name: 'Dumbbell Chest Fly' },
      { id: 'pullover',  name: 'Dumbbell Pullover', optional: true },
    ]
  }
};

const EXERCISE_COLOURS = {
  bench:     '#c0392b',
  fly:       '#2980b9',
  incline:   '#27ae60',
  closegrip: '#8e44ad',
  pullover:  '#e67e22',
};

// ── STATE ──
let sessions = [];
let currentPhase = 1;
let charts = {};

// ── PASSWORD ──
function checkPassword() {
  const val = document.getElementById('gateInput').value;
  if (val === PASSWORD) {
    document.getElementById('gate').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    loadData();
  } else {
    document.getElementById('gateError').style.display = 'block';
    document.getElementById('gateInput').value = '';
    document.getElementById('gateInput').focus();
  }
}

document.getElementById('gateInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') checkPassword();
});

// ── NAV ──
function showView(id, btn) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('view-' + id).classList.add('active');
  btn.classList.add('active');
  if (id === 'progress') renderProgress();
  if (id === 'history') renderHistory();
  if (id === 'dashboard') renderDashboard();
}

// ── PHASE SELECTION ──
function selectPhase(n, btn) {
  currentPhase = n;
  document.querySelectorAll('.phase-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderExerciseLog();
}

// ── EXERCISE LOG ──
function renderExerciseLog() {
  const phase = PHASES[currentPhase];
  const week  = parseInt(document.getElementById('sel-week').value);
  const container = document.getElementById('exercise-log-list');
  container.innerHTML = '';

  phase.exercises.forEach(ex => {
    if (ex.from && week < ex.from) return;

    const card = document.createElement('div');
    card.className = 'exercise-log-card';
    card.dataset.exId = ex.id;

    const label = ex.optional
      ? `<span style="color:var(--optional);font-size:6.5pt;margin-left:6px;">Optional</span>`
      : '';

    const formGuideHTML = FORM_GUIDES[ex.id] || '';

    card.innerHTML = `
      <div class="exercise-log-head">
        <div>
          <div class="exercise-log-name">${ex.name}${label}</div>
          <div class="exercise-log-target">${phase.sets} sets × ${phase.reps} reps</div>
        </div>
        <button class="fg-toggle-btn" onclick="toggleFormGuide('${ex.id}', this)">
          <span>Form Guide</span><span class="fg-arrow">▾</span>
        </button>
      </div>
      <div class="exercise-log-body">
        <div class="form-group">
          <div class="set-row-label">Weight (kg)</div>
          <input type="number" class="form-input" id="w-${ex.id}" placeholder="e.g. 40" step="0.5" min="0">
        </div>
        <div class="form-group">
          <div class="set-row-label">Sets completed</div>
          <input type="number" class="form-input" id="s-${ex.id}" placeholder="${phase.sets}" min="0" max="10" value="${phase.sets}">
        </div>
        <div class="form-group">
          <div class="set-row-label">Notes</div>
          <input type="text" class="form-input" id="n-${ex.id}" placeholder="How did it feel?">
        </div>
      </div>
      ${formGuideHTML}`;

    container.appendChild(card);
  });
}

function toggleFormGuide(exId, btn) {
  const guide = document.getElementById('ifg-' + exId);
  if (!guide) return;
  const isOpen = guide.classList.contains('open');
  guide.classList.toggle('open');
  btn.classList.toggle('open');
  btn.querySelector('.fg-arrow').textContent = isOpen ? '▾' : '▴';
}

// Init exercise log on week change
document.getElementById('sel-week').addEventListener('change', renderExerciseLog);
renderExerciseLog();

// ── JSONBIN API ──
function loadingStart() {
  const bar = document.getElementById('loadingBar');
  bar.style.width = '60%';
}
function loadingDone() {
  const bar = document.getElementById('loadingBar');
  bar.style.width = '100%';
  setTimeout(() => { bar.style.width = '0%'; }, 400);
}

async function loadData() {
  loadingStart();
  try {
    const res = await fetch(BIN_URL + '/latest', {
      headers: { 'X-Master-Key': API_KEY }
    });
    const data = await res.json();
    sessions = data.record?.sessions || [];
    renderDashboard();
  } catch(e) {
    showToast('Could not load data — check API key', 'error');
  }
  loadingDone();
}

async function saveData() {
  const res = await fetch(BIN_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': API_KEY
    },
    body: JSON.stringify({ sessions })
  });
  if (!res.ok) throw new Error('Save failed');
}

// ── SAVE SESSION ──
async function saveSession() {
  const btn    = document.getElementById('save-btn');
  const status = document.getElementById('save-status');
  const phase  = PHASES[currentPhase];
  const week   = parseInt(document.getElementById('sel-week').value);
  const day    = document.getElementById('sel-day').value;

  const exerciseData = [];
  const cards = document.querySelectorAll('.exercise-log-card');

  cards.forEach(card => {
    const id   = card.dataset.exId;
    const ex   = phase.exercises.find(e => e.id === id);
    const wVal = document.getElementById('w-' + id)?.value;
    const sVal = document.getElementById('s-' + id)?.value;
    const nVal = document.getElementById('n-' + id)?.value;

    if (wVal) {
      exerciseData.push({
        id,
        name: ex.name,
        weight: parseFloat(wVal),
        sets: parseInt(sVal) || phase.sets,
        targetReps: phase.reps,
        notes: nVal || ''
      });
    }
  });

  if (exerciseData.length === 0) {
    showToast('Enter at least one weight to save', 'error');
    return;
  }

  btn.disabled = true;
  status.textContent = 'Saving...';

  const session = {
    id: Date.now(),
    date: new Date().toISOString(),
    phase: currentPhase,
    week,
    day,
    exercises: exerciseData
  };

  sessions.push(session);

  try {
    await saveData();
    showToast('Session saved', 'success');
    status.textContent = '';
    document.querySelectorAll('.exercise-log-card input').forEach(i => {
      if (i.type !== 'number' || i.id.startsWith('s-')) return;
      i.value = '';
    });
    document.querySelectorAll('input[id^="n-"]').forEach(i => i.value = '');
    renderDashboard();
  } catch(e) {
    sessions.pop();
    showToast('Save failed — check connection', 'error');
    status.textContent = '';
  }

  btn.disabled = false;
}

// ── DASHBOARD ──
function renderDashboard() {
  document.getElementById('stat-sessions').textContent = sessions.length;

  const benchSessions = sessions.filter(s => s.exercises.some(e => e.id === 'bench'));
  if (benchSessions.length) {
    const best = Math.max(...benchSessions.map(s =>
      s.exercises.find(e => e.id === 'bench')?.weight || 0
    ));
    document.getElementById('stat-pb').textContent = best + 'kg';
    document.getElementById('stat-pb-sub').textContent = 'Flat bench press';
  }

  if (sessions.length) {
    const latest = sessions[sessions.length - 1];
    document.getElementById('stat-week').textContent = 'Wk ' + latest.week;
    document.getElementById('stat-phase-sub').textContent = 'Phase ' + latest.phase;
  }

  const list = document.getElementById('recent-list');
  if (sessions.length === 0) {
    list.innerHTML = '<div class="empty-state"><p>No sessions logged yet</p></div>';
    return;
  }

  const recent = [...sessions].reverse().slice(0, 5);
  list.innerHTML = recent.map(s => {
    const d = new Date(s.date);
    const dateStr = d.toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' });
    const phClass = `ph${s.phase}`;
    const phLabel = ['','Foundation','Development','Strength'][s.phase];
    const exNames = s.exercises.map(e => e.name.split(' ').slice(-1)[0]).join(' · ');
    return `<div class="recent-item">
      <div>
        <div style="font-weight:600;font-size:9pt;color:#ddd;">${s.day} — Week ${s.week}</div>
        <div class="recent-date">${dateStr} · ${exNames}</div>
      </div>
      <span class="recent-phase ${phClass}">${phLabel}</span>
    </div>`;
  }).join('');
}

// ── PROGRESS ──
function renderProgress() {
  const container = document.getElementById('charts-container');
  const pbGrid    = document.getElementById('pb-grid');
  const empty     = document.getElementById('progress-empty');

  if (sessions.length === 0) {
    container.innerHTML = '';
    pbGrid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  const exData = {};
  sessions.forEach(s => {
    s.exercises.forEach(ex => {
      if (!exData[ex.id]) exData[ex.id] = { name: ex.name, points: [] };
      exData[ex.id].points.push({
        date: new Date(s.date),
        weight: ex.weight,
        week: s.week,
        phase: s.phase
      });
    });
  });

  pbGrid.innerHTML = Object.entries(exData).map(([id, data]) => {
    const best = Math.max(...data.points.map(p => p.weight));
    const bestPoint = data.points.find(p => p.weight === best);
    const d = new Date(bestPoint.date);
    const dateStr = d.toLocaleDateString('en-GB', { day:'numeric', month:'short' });
    return `<div class="pb-card">
      <div class="pb-exercise">${data.name}</div>
      <div class="pb-weight">${best}<span>kg</span></div>
      <div class="pb-date">Week ${bestPoint.week} · ${dateStr}</div>
    </div>`;
  }).join('');

  Object.values(charts).forEach(c => c.destroy());
  charts = {};
  container.innerHTML = '';

  Object.entries(exData).forEach(([id, data]) => {
    if (data.points.length < 2) return;

    const div = document.createElement('div');
    div.className = 'chart-card';
    div.innerHTML = `
      <div class="chart-title">${data.name}</div>
      <div class="chart-meta">Weight progression · All sessions</div>
      <div class="chart-wrap"><canvas id="chart-${id}"></canvas></div>`;
    container.appendChild(div);

    const labels  = data.points.map(p => {
      const d = new Date(p.date);
      return `Wk${p.week} ${d.toLocaleDateString('en-GB',{day:'numeric',month:'short'})}`;
    });
    const weights = data.points.map(p => p.weight);
    const colour  = EXERCISE_COLOURS[id] || '#888';

    const ctx = document.getElementById('chart-' + id).getContext('2d');
    charts[id] = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'kg',
          data: weights,
          borderColor: colour,
          backgroundColor: colour + '20',
          fill: true,
          tension: 0.3,
          pointRadius: 5,
          pointBackgroundColor: colour,
          pointBorderColor: '#1a1a1a',
          pointBorderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#111',
            titleColor: '#888',
            bodyColor: '#fff',
            borderColor: '#333',
            borderWidth: 1,
            callbacks: { label: ctx => ` ${ctx.parsed.y}kg` }
          }
        },
        scales: {
          x: {
            ticks: { color: '#555', font: { family: 'DM Mono', size: 9 } },
            grid: { color: '#222' }
          },
          y: {
            ticks: {
              color: '#555',
              font: { family: 'DM Mono', size: 9 },
              callback: v => v + 'kg'
            },
            grid: { color: '#222' }
          }
        }
      }
    });
  });

  if (container.innerHTML === '') {
    container.innerHTML = '<div class="empty-state" style="padding:20px 0;"><p>Log 2+ sessions per exercise to see charts</p></div>';
  }
}

// ── HISTORY ──
function renderHistory() {
  const list = document.getElementById('history-list');
  if (sessions.length === 0) {
    list.innerHTML = '<div class="empty-state"><p>No sessions logged yet</p></div>';
    return;
  }

  const sorted = [...sessions].reverse();
  list.innerHTML = sorted.map((s, i) => {
    const d = new Date(s.date);
    const dateStr = d.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
    const phLabel = ['','Foundation','Development','Strength'][s.phase];
    const phClass = `ph${s.phase}`;
    const exRows = s.exercises.map(ex =>
      `<div class="history-ex-row">
        <div class="history-ex-name">${ex.name}</div>
        <div class="history-ex-stats">${ex.weight}kg · ${ex.sets} sets × ${ex.targetReps} reps${ex.notes ? ' · ' + ex.notes : ''}</div>
      </div>`
    ).join('');
    const realIdx = sessions.length - 1 - i;
    return `<div class="history-item">
      <div class="history-head" onclick="toggleHistory(this)">
        <div>
          <div class="history-date">${s.day} — Week ${s.week}</div>
          <div class="history-meta">${dateStr} · <span class="recent-phase ${phClass}" style="padding:1px 6px;">${phLabel}</span></div>
        </div>
        <div style="color:#444;font-size:14pt;">›</div>
      </div>
      <div class="history-body">
        ${exRows}
        <button class="delete-btn" onclick="deleteSession(${realIdx})">Delete this session</button>
      </div>
    </div>`;
  }).join('');
}

function toggleHistory(head) {
  const body = head.nextElementSibling;
  body.classList.toggle('open');
}

async function deleteSession(idx) {
  if (!confirm('Delete this session? This cannot be undone.')) return;
  sessions.splice(idx, 1);
  try {
    await saveData();
    showToast('Session deleted', 'success');
    renderHistory();
    renderDashboard();
  } catch(e) {
    showToast('Delete failed', 'error');
  }
}

// ── DASHBOARD TOGGLES ──
function toggleDashSection(id) {
  const el    = document.getElementById(id);
  const arrow = document.getElementById('ws-arrow');
  const isOpen = el.style.display !== 'none';
  el.style.display = isOpen ? 'none' : 'block';
  if (arrow) arrow.textContent = isOpen ? '▾' : '▴';
}

// ── TOAST ──
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => { t.className = `toast ${type}`; }, 2800);
}
