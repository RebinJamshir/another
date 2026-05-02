const deadlines = [
  { subject: 'COA', date: '2026-05-07' },
  { subject: 'Software', date: '2026-05-11' },
  { subject: 'Discrete Mathematics', date: '2026-05-12' },
  { subject: 'Economics', date: '2026-05-14' },
  { subject: 'Operating System', date: '2026-05-16' },
  { subject: 'Physics', date: '2026-05-20' },
  { subject: 'Electrical & Electronics', date: '2026-05-25' }
];

const MS_DAY = 1000 * 60 * 60 * 24;
const finalDate = new Date('2026-05-25T00:00:00');
const now = new Date();

const dayDiff = (target) => Math.ceil((target - now) / MS_DAY);
const totalDays = dayDiff(finalDate);

document.getElementById('mainDays').textContent = Math.max(totalDays, 0);

const grid = document.getElementById('deadlineGrid');
const statusFor = (days) => {
  if (days < 7) return { text: 'Critical', cls: 'critical' };
  if (days < 30) return { text: 'Soon', cls: 'soon' };
  return { text: 'Safe', cls: 'safe' };
};

const parsed = deadlines.map((d) => {
  const date = new Date(`${d.date}T00:00:00`);
  const days = dayDiff(date);
  return { ...d, parsedDate: date, days };
});

parsed.forEach((item) => {
  const badge = statusFor(item.days);
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <h3>${item.subject}</h3>
    <p class="meta">${new Date(item.date).toLocaleDateString('en-GB')}</p>
    <p class="days">${item.days} day${item.days === 1 ? '' : 's'} left</p>
    <span class="badge ${badge.cls}">${badge.text}</span>
  `;
  grid.appendChild(card);
});

const dial = document.getElementById('dial');
const markersEl = document.getElementById('markers');
const selectedSubject = document.getElementById('selectedSubject');
const selectedDays = document.getElementById('selectedDays');

const markerCount = parsed.length;
const step = 360 / markerCount;
let rotation = 0;
let selectedIndex = 0;
let dragging = false;

function renderMarkers() {
  markersEl.innerHTML = '';
  parsed.forEach((item, idx) => {
    const angle = idx * step;
    const marker = document.createElement('div');
    marker.className = `marker ${idx === selectedIndex ? 'active' : ''}`;
    marker.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(var(--size) * -0.42))`;
    marker.innerHTML = `<div class="dot"></div><div class="label">${item.subject}</div>`;
    markersEl.appendChild(marker);
  });
  markersEl.style.transform = `rotate(${rotation}deg)`;
}

function setSelected(idx) {
  selectedIndex = (idx + markerCount) % markerCount;
  const item = parsed[selectedIndex];
  selectedSubject.textContent = item.subject;
  selectedDays.textContent = `${item.days} day${item.days === 1 ? '' : 's'} left`;
  dial.setAttribute('aria-valuenow', selectedIndex);
  renderMarkers();
}

function snapRotation() {
  const nearest = Math.round(-rotation / step);
  rotation = -nearest * step;
  setSelected(nearest);
}

function angleFromEvent(e) {
  const point = e.touches ? e.touches[0] : e;
  const rect = dial.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  return Math.atan2(point.clientY - cy, point.clientX - cx) * 180 / Math.PI;
}

let lastAngle = 0;
function startDrag(e) { dragging = true; lastAngle = angleFromEvent(e); }
function moveDrag(e) {
  if (!dragging) return;
  const angle = angleFromEvent(e);
  rotation += angle - lastAngle;
  lastAngle = angle;
  markersEl.style.transform = `rotate(${rotation}deg)`;
}
function endDrag() { if (!dragging) return; dragging = false; snapRotation(); }

dial.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', moveDrag);
window.addEventListener('mouseup', endDrag);

dial.addEventListener('touchstart', startDrag, { passive: true });
window.addEventListener('touchmove', moveDrag, { passive: true });
window.addEventListener('touchend', endDrag);

renderMarkers();
setSelected(0);
