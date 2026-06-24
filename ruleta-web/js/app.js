"use strict";

/* =========================================================
   ELEMENTOS DEL HTML
========================================================= */
const elements = {
  app: document.getElementById("app"),
  sidebar: document.getElementById("sidebar"),
  sidebarBackdrop: document.getElementById("sidebarBackdrop"),
  wheelShell: document.getElementById("wheelShell"),
  wheelRotator: document.getElementById("wheelRotator"),
  wheelImage: document.getElementById("wheelImage"),
  wheelCenter: document.getElementById("wheelCenter"),
  wheelPointer: document.getElementById("wheelPointer"),
  bulbRing: document.getElementById("bulbRing"),

  centerSpinBtn: document.getElementById("centerSpinBtn"),
  sidebarSpinBtn: document.getElementById("sidebarSpinBtn"),
  mobileSpinBtn: document.getElementById("mobileSpinBtn"),

  toggleSidebarBtn: document.getElementById("toggleSidebarBtn"),
  sidebarToggleIcon: document.getElementById("sidebarToggleIcon"),

  soundBtn: document.getElementById("soundBtn"),
  soundIcon: document.getElementById("soundIcon"),
  soundText: document.getElementById("soundText"),
  quickSoundBtn: document.getElementById("quickSoundBtn"),
  quickSoundIcon: document.getElementById("quickSoundIcon"),

  fullscreenBtn: document.getElementById("fullscreenBtn"),
  fullscreenIcon: document.getElementById("fullscreenIcon"),
  fullscreenText: document.getElementById("fullscreenText"),
  quickFullscreenBtn: document.getElementById("quickFullscreenBtn"),
  quickFullscreenIcon: document.getElementById("quickFullscreenIcon"),

  historyList: document.getElementById("historyList"),
  historyCount: document.getElementById("historyCount"),
  emptyHistory: document.getElementById("emptyHistory"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
  lastResult: document.getElementById("lastResult"),

  winnerOverlay: document.getElementById("winnerOverlay"),
  winnerCard: document.getElementById("winnerCard"),
  winnerTitle: document.getElementById("winnerTitle"),
  winnerDescription: document.getElementById("winnerDescription"),
  closeWinnerBtn: document.getElementById("closeWinnerBtn"),
  winnerCloseButton: document.getElementById("winnerCloseButton"),
  spinAgainBtn: document.getElementById("spinAgainBtn"),

  confettiCanvas: document.getElementById("confettiCanvas"),
  toast: document.getElementById("toast")
};

const requiredElements = [
  "app",
  "sidebar",
  "wheelShell",
  "wheelRotator",
  "wheelImage",
  "wheelCenter",
  "wheelPointer",
  "centerSpinBtn",
  "sidebarSpinBtn",
  "mobileSpinBtn",
  "winnerOverlay",
  "winnerCard",
  "winnerTitle",
  "winnerDescription",
  "confettiCanvas"
];

const missingElements = requiredElements.filter((name) => !elements[name]);

if (missingElements.length > 0) {
  console.error(
    "Faltan elementos requeridos en index.html:",
    missingElements.join(", ")
  );

  throw new Error("La estructura del HTML no coincide con js/app.js.");
}

const confettiContext = elements.confettiCanvas.getContext("2d");
const mobileQuery = window.matchMedia("(max-width: 820px)");

/* =========================================================
   CONFIGURACIÓN Y PREMIOS
========================================================= */
const STORAGE_KEYS = {
  history: "feria85-wheel-history",
  sound: "feria85-wheel-sound",
  sidebar: "feria85-wheel-sidebar"
};

/*
  0° corresponde a la parte superior de la imagen.
  Los grados aumentan en sentido horario.
*/
const sectors = [
  {
    id: "mac",
    label: "Maquillaje Express MAC",
    start: 349.5,
    end: 10,
    tone: "white",
    detail: "Has obtenido una experiencia de maquillaje Express MAC."
  },
  {
    id: "surprise-green-top",
    label: "Premio sorpresa",
    start: 10,
    end: 27.5,
    tone: "green",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "estee-lauder",
    label: "Limpieza Facial Express Estée Lauder",
    start: 27.5,
    end: 47.25,
    tone: "yellow",
    detail: "Has obtenido una experiencia de limpieza facial Express Estée Lauder."
  },
  {
    id: "surprise-blue-right-top",
    label: "Premio sorpresa",
    start: 47.25,
    end: 65.75,
    tone: "blue",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "palladio",
    label: "Maquillaje Express Palladio",
    start: 65.75,
    end: 81.25,
    tone: "white",
    detail: "Has obtenido una experiencia de maquillaje Express Palladio."
  },
  {
    id: "surprise-green-right",
    label: "Premio sorpresa",
    start: 81.25,
    end: 97.25,
    tone: "green",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "clinique-yellow",
    label: "Limpieza Facial Express Clinique",
    start: 97.25,
    end: 122,
    tone: "yellow",
    detail: "Has obtenido una experiencia de limpieza facial Express Clinique."
  },
  {
    id: "surprise-blue-lower-right",
    label: "Premio sorpresa",
    start: 122,
    end: 137.25,
    tone: "blue",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "maybelline",
    label: "Maquillaje Express Maybelline New York",
    start: 137.25,
    end: 157.5,
    tone: "white",
    detail: "Has obtenido una experiencia de maquillaje Express Maybelline New York."
  },
  {
    id: "surprise-green-bottom-right",
    label: "Premio sorpresa",
    start: 157.5,
    end: 170.75,
    tone: "green",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "natasha-denona",
    label: "Maquillaje Express Natasha Denona",
    start: 170.75,
    end: 189.25,
    tone: "white",
    detail: "Has obtenido una experiencia de maquillaje Express Natasha Denona."
  },
  {
    id: "surprise-green-bottom-left",
    label: "Premio sorpresa",
    start: 189.25,
    end: 202.5,
    tone: "green",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "surprise-yellow-bottom-left",
    label: "Premio sorpresa",
    start: 202.5,
    end: 217.75,
    tone: "yellow",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "surprise-blue-bottom-left",
    label: "Premio sorpresa",
    start: 217.75,
    end: 233.25,
    tone: "blue",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "loreal",
    label: "Maquillaje Express L'Oréal Paris",
    start: 233.25,
    end: 263.5,
    tone: "white",
    detail: "Has obtenido una experiencia de maquillaje Express L'Oréal Paris."
  },
  {
    id: "surprise-yellow-left",
    label: "Premio sorpresa",
    start: 263.5,
    end: 278.75,
    tone: "yellow",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "surprise-green-left",
    label: "Premio sorpresa",
    start: 278.75,
    end: 294.75,
    tone: "green",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "clinique-white",
    label: "Limpieza Facial Express Clinique",
    start: 294.75,
    end: 314.5,
    tone: "white",
    detail: "Has obtenido una experiencia de limpieza facial Express Clinique."
  },
  {
    id: "surprise-yellow-upper-left",
    label: "Premio sorpresa",
    start: 314.5,
    end: 332.5,
    tone: "yellow",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "surprise-blue-upper-left",
    label: "Premio sorpresa",
    start: 332.5,
    end: 349.5,
    tone: "blue",
    detail: "Consulta el premio sorpresa asignado."
  }
];

/* =========================================================
   ESTADO
========================================================= */
let currentRotation = 0;
let isSpinning = false;
let soundEnabled = true;
let history = [];
let audioContext = null;
let confettiAnimationId = null;
let toastTimer = null;
let winnerCloseTimer = null;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* =========================================================
   NÚMEROS ALEATORIOS
========================================================= */
function secureRandom() {
  if (window.crypto?.getRandomValues) {
    const values = new Uint32Array(1);
    window.crypto.getRandomValues(values);
    return values[0] / 4294967296;
  }

  return Math.random();
}

/* =========================================================
   UTILIDADES DE ÁNGULOS
========================================================= */
function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360;
}

function getSectorWidth(sector) {
  return normalizeAngle(sector.end - sector.start);
}

function angleIsInsideSector(angle, sector) {
  const normalizedAngle = normalizeAngle(angle);
  const start = normalizeAngle(sector.start);
  const end = normalizeAngle(sector.end);

  if (start < end) {
    return normalizedAngle >= start && normalizedAngle < end;
  }

  return normalizedAngle >= start || normalizedAngle < end;
}

function findSectorIndex(angle) {
  return sectors.findIndex((sector) => angleIsInsideSector(angle, sector));
}

function getSectorAtPointer(rotation) {
  const imageAngleAtPointer = normalizeAngle(-rotation);
  const index = findSectorIndex(imageAngleAtPointer);

  return {
    index,
    sector: sectors[index] || sectors[0]
  };
}

function chooseWeightedSector() {
  const totalDegrees = sectors.reduce(
    (total, sector) => total + getSectorWidth(sector),
    0
  );

  let randomDegrees = secureRandom() * totalDegrees;

  for (const sector of sectors) {
    const width = getSectorWidth(sector);

    if (randomDegrees < width) {
      return sector;
    }

    randomDegrees -= width;
  }

  return sectors[sectors.length - 1];
}

function chooseSafeAngleInsideSector(sector) {
  const width = getSectorWidth(sector);
  const margin = Math.min(2.4, width * 0.2);
  const availableWidth = Math.max(0.5, width - margin * 2);

  return normalizeAngle(
    sector.start + margin + secureRandom() * availableWidth
  );
}

function easeOutQuint(progress) {
  return 1 - Math.pow(1 - progress, 5);
}

/* =========================================================
   BOMBILLOS
========================================================= */
function createBulbs(total = 24) {
  if (!elements.bulbRing) {
    return;
  }

  elements.bulbRing.replaceChildren();

  for (let index = 0; index < total; index += 1) {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const radius = 47.8;
    const bulb = document.createElement("span");

    bulb.className = "bulb";
    bulb.style.left = `${50 + Math.cos(angle) * radius}%`;
    bulb.style.top = `${50 + Math.sin(angle) * radius}%`;
    bulb.style.animationDelay = `${index * 70}ms`;

    elements.bulbRing.appendChild(bulb);
  }
}

/* =========================================================
   GIRO DE LA RULETA
========================================================= */
function setSpinButtonsDisabled(disabled) {
  [
    elements.centerSpinBtn,
    elements.sidebarSpinBtn,
    elements.mobileSpinBtn,
    elements.spinAgainBtn
  ].forEach((button) => {
    if (button) {
      button.disabled = disabled;
    }
  });
}

function spinWheel() {
  if (isSpinning) {
    return;
  }

  closeWinner();
  closeSidebarOnMobile();
  ensureAudioContext();

  const selectedSector = chooseWeightedSector();
  const selectedAngle = chooseSafeAngleInsideSector(selectedSector);
  const targetNormalizedRotation = normalizeAngle(360 - selectedAngle);
  const currentNormalizedRotation = normalizeAngle(currentRotation);
  const alignmentDelta = normalizeAngle(
    targetNormalizedRotation - currentNormalizedRotation
  );
  const fullTurns = (6 + Math.floor(secureRandom() * 3)) * 360;
  const targetRotation = currentRotation + fullTurns + alignmentDelta;
  const duration = prefersReducedMotion
    ? 1200
    : 6900 + secureRandom() * 1100;

  animateWheel(currentRotation, targetRotation, duration, selectedSector);
}

function animateWheel(startRotation, targetRotation, duration, expectedSector) {
  isSpinning = true;
  setSpinButtonsDisabled(true);
  elements.wheelShell.classList.add("is-spinning");
  elements.wheelShell.setAttribute("aria-busy", "true");
  elements.lastResult.textContent = "Girando…";

  const startTime = performance.now();
  let previousSectorIndex = getSectorAtPointer(startRotation).index;
  let lastTickTime = 0;

  playSpinStartSound();

  function frame(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuint(progress);

    currentRotation =
      startRotation + (targetRotation - startRotation) * easedProgress;

    elements.wheelRotator.style.transform = `rotate(${currentRotation}deg)`;

    const pointerResult = getSectorAtPointer(currentRotation);

    if (
      pointerResult.index !== previousSectorIndex &&
      now - lastTickTime > 40
    ) {
      playTickSound(Math.max(0.15, 1 - progress));
      previousSectorIndex = pointerResult.index;
      lastTickTime = now;
    }

    if (progress < 1) {
      requestAnimationFrame(frame);
      return;
    }

    currentRotation = targetRotation;
    elements.wheelRotator.style.transform = `rotate(${currentRotation}deg)`;
    finishSpin(expectedSector);
  }

  requestAnimationFrame(frame);
}

function finishSpin(expectedSector) {
  const finalResult = getSectorAtPointer(currentRotation);
  const finalSector = finalResult.sector || expectedSector;

  isSpinning = false;
  setSpinButtonsDisabled(false);
  elements.wheelShell.classList.remove("is-spinning");
  elements.wheelShell.setAttribute("aria-busy", "false");
  elements.lastResult.textContent = finalSector.label;

  addHistoryEntry(finalSector);
  playWinnerSound();

  window.setTimeout(() => {
    showWinner(finalSector);
    launchConfetti();
  }, prefersReducedMotion ? 50 : 320);
}

/* =========================================================
   HISTORIAL
========================================================= */
function loadHistory() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.history) || "[]"
    );

    history = Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.warn("No se pudo cargar el historial:", error);
    history = [];
  }

  renderHistory();

  if (history.length > 0) {
    elements.lastResult.textContent = history[0].label;
  }
}

function saveHistory() {
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history));
}

function addHistoryEntry(sector) {
  history.unshift({
    id: `${Date.now()}-${secureRandom().toString(16).slice(2)}`,
    label: sector.label,
    tone: sector.tone,
    timestamp: new Date().toISOString()
  });

  history = history.slice(0, 30);
  saveHistory();
  renderHistory();
}

function renderHistory() {
  elements.historyList.replaceChildren();
  elements.historyCount.textContent = String(history.length);
  elements.emptyHistory.hidden = history.length > 0;

  const timeFormatter = new Intl.DateTimeFormat("es-CR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  history.forEach((entry, index) => {
    const item = document.createElement("li");
    const position = document.createElement("span");
    const prize = document.createElement("div");
    const prizeName = document.createElement("strong");
    const prizeCaption = document.createElement("span");
    const time = document.createElement("time");

    item.className = "history-item";
    position.className = "history-position";
    prize.className = "history-prize";
    time.className = "history-time";

    position.textContent = String(index + 1);
    prizeName.textContent = entry.label;
    prizeCaption.textContent =
      index === 0 ? "Último resultado" : "Resultado anterior";

    const date = new Date(entry.timestamp);
    time.dateTime = entry.timestamp;
    time.textContent = Number.isNaN(date.getTime())
      ? ""
      : timeFormatter.format(date);

    prize.append(prizeName, prizeCaption);
    item.append(position, prize, time);
    elements.historyList.appendChild(item);
  });
}

function clearHistory() {
  if (history.length === 0) {
    showToast("El historial ya está vacío.");
    return;
  }

  const confirmed = window.confirm(
    "¿Deseas eliminar todo el historial de resultados?"
  );

  if (!confirmed) {
    return;
  }

  history = [];
  saveHistory();
  renderHistory();
  elements.lastResult.textContent = "Aún no se ha girado";
  showToast("Historial eliminado.");
}

/* =========================================================
   MODAL DEL PREMIO
========================================================= */
function showWinner(sector) {
  window.clearTimeout(winnerCloseTimer);

  elements.winnerCard.dataset.tone = sector.tone;
  elements.winnerTitle.textContent = sector.label;
  elements.winnerDescription.textContent = sector.detail;
  elements.winnerOverlay.hidden = false;
  elements.winnerOverlay.inert = false;
  elements.winnerOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  requestAnimationFrame(() => {
    elements.winnerOverlay.classList.add("is-visible");
  });

  window.setTimeout(() => {
    elements.spinAgainBtn?.focus();
  }, 80);
}

function closeWinner() {
  if (elements.winnerOverlay.hidden) {
    return;
  }

  elements.winnerOverlay.classList.remove("is-visible");
  elements.winnerOverlay.setAttribute("aria-hidden", "true");
  elements.winnerOverlay.inert = true;
  document.body.classList.remove("modal-open");
  stopConfetti();

  window.clearTimeout(winnerCloseTimer);
  winnerCloseTimer = window.setTimeout(() => {
    elements.winnerOverlay.hidden = true;
  }, prefersReducedMotion ? 0 : 280);
}

function spinAgain() {
  closeWinner();
  window.setTimeout(spinWheel, prefersReducedMotion ? 0 : 160);
}

/* =========================================================
   PANEL LATERAL
========================================================= */
function restoreSidebarState() {
  const savedState = localStorage.getItem(STORAGE_KEYS.sidebar);
  const shouldCollapse = savedState
    ? savedState === "collapsed"
    : mobileQuery.matches;

  setSidebarCollapsed(shouldCollapse, false);
}

function setSidebarCollapsed(collapsed, save = true) {
  elements.app.classList.toggle("sidebar-collapsed", collapsed);
  document.body.classList.toggle("sidebar-is-collapsed", collapsed);
  document.body.classList.toggle(
    "mobile-menu-open",
    mobileQuery.matches && !collapsed
  );

  if (save) {
    localStorage.setItem(
      STORAGE_KEYS.sidebar,
      collapsed ? "collapsed" : "expanded"
    );
  }

  updateSidebarButton();
}

function toggleSidebar() {
  const collapsed = elements.app.classList.contains("sidebar-collapsed");
  setSidebarCollapsed(!collapsed);
}

function closeSidebarOnMobile() {
  if (mobileQuery.matches) {
    setSidebarCollapsed(true);
  }
}

function updateSidebarButton() {
  const collapsed = elements.app.classList.contains("sidebar-collapsed");

  elements.sidebarToggleIcon.textContent = collapsed ? "☰" : "✕";
  elements.toggleSidebarBtn.setAttribute(
    "aria-label",
    collapsed ? "Mostrar panel lateral" : "Ocultar panel lateral"
  );
  elements.toggleSidebarBtn.setAttribute("aria-expanded", String(!collapsed));
}

function handleViewportChange(event) {
  if (!event.matches) {
    document.body.classList.remove("mobile-menu-open");
    return;
  }

  if (elements.app.classList.contains("sidebar-collapsed")) {
    document.body.classList.remove("mobile-menu-open");
  } else {
    document.body.classList.add("mobile-menu-open");
  }
}

/* =========================================================
   SONIDO
========================================================= */
function restoreSoundPreference() {
  soundEnabled =
    localStorage.getItem(STORAGE_KEYS.sound) !== "disabled";
  updateSoundButtons();
}

function toggleSound() {
  soundEnabled = !soundEnabled;

  localStorage.setItem(
    STORAGE_KEYS.sound,
    soundEnabled ? "enabled" : "disabled"
  );

  if (soundEnabled) {
    ensureAudioContext();
    playToggleSound();
  }

  updateSoundButtons();
}

function updateSoundButtons() {
  const icon = soundEnabled ? "🔊" : "🔇";
  const text = soundEnabled ? "Sonido activado" : "Sonido desactivado";

  elements.soundIcon.textContent = icon;
  elements.quickSoundIcon.textContent = icon;
  elements.soundText.textContent = text;
  elements.soundBtn.setAttribute("aria-pressed", String(soundEnabled));
  elements.quickSoundBtn.setAttribute("aria-pressed", String(soundEnabled));
}

function ensureAudioContext() {
  if (!soundEnabled) {
    return null;
  }

  if (!audioContext) {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      return null;
    }

    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  return audioContext;
}

function playTone({
  frequency = 440,
  endFrequency = frequency,
  duration = 0.08,
  volume = 0.04,
  type = "sine",
  delay = 0
} = {}) {
  const context = ensureAudioContext();

  if (!context || !soundEnabled) {
    return;
  }

  const start = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(
    Math.max(1, endFrequency),
    start + duration
  );

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function playTickSound(speedFactor = 1) {
  playTone({
    frequency: 620 + speedFactor * 460,
    endFrequency: 430 + speedFactor * 200,
    duration: 0.024 + speedFactor * 0.016,
    volume: 0.015 + speedFactor * 0.018,
    type: "square"
  });
}

function playSpinStartSound() {
  playTone({
    frequency: 180,
    endFrequency: 620,
    duration: 0.28,
    volume: 0.055,
    type: "sawtooth"
  });
}

function playWinnerSound() {
  [
    { frequency: 523.25, delay: 0 },
    { frequency: 659.25, delay: 0.12 },
    { frequency: 783.99, delay: 0.24 },
    { frequency: 1046.5, delay: 0.39 }
  ].forEach((note) => {
    playTone({
      frequency: note.frequency,
      endFrequency: note.frequency * 1.01,
      duration: 0.3,
      volume: 0.065,
      type: "sine",
      delay: note.delay
    });
  });
}

function playToggleSound() {
  playTone({
    frequency: 520,
    endFrequency: 760,
    duration: 0.12,
    volume: 0.04,
    type: "sine"
  });
}

/* =========================================================
   PANTALLA COMPLETA
========================================================= */
async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.warn("No se pudo cambiar la pantalla completa:", error);
    showToast("El navegador no permitió activar la pantalla completa.");
  }
}

function updateFullscreenButtons() {
  const isActive = Boolean(document.fullscreenElement);

  elements.fullscreenIcon.textContent = isActive ? "↙" : "⛶";
  elements.quickFullscreenIcon.textContent = isActive ? "↙" : "⛶";
  elements.fullscreenText.textContent = isActive
    ? "Salir de pantalla completa"
    : "Pantalla completa";
}

/* =========================================================
   CONFETI
========================================================= */
function resizeConfettiCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  elements.confettiCanvas.width = Math.floor(window.innerWidth * ratio);
  elements.confettiCanvas.height = Math.floor(window.innerHeight * ratio);
  elements.confettiCanvas.style.width = `${window.innerWidth}px`;
  elements.confettiCanvas.style.height = `${window.innerHeight}px`;
  confettiContext.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function launchConfetti() {
  if (prefersReducedMotion) {
    return;
  }

  stopConfetti();
  resizeConfettiCanvas();

  const colors = [
    "#003f9f",
    "#0a5bc0",
    "#00a86b",
    "#ffc400",
    "#ff6418",
    "#ffffff"
  ];
  const totalPieces = mobileQuery.matches ? 85 : 170;
  const pieces = Array.from({ length: totalPieces }, () => ({
    x: window.innerWidth * (0.25 + secureRandom() * 0.5),
    y: -30 - secureRandom() * 180,
    vx: (secureRandom() - 0.5) * 8,
    vy: 3 + secureRandom() * 6,
    gravity: 0.08 + secureRandom() * 0.06,
    rotation: secureRandom() * Math.PI,
    rotationSpeed: (secureRandom() - 0.5) * 0.25,
    width: 6 + secureRandom() * 8,
    height: 4 + secureRandom() * 7,
    color: colors[Math.floor(secureRandom() * colors.length)],
    opacity: 0.85 + secureRandom() * 0.15
  }));

  const startTime = performance.now();

  function animate(now) {
    confettiContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

    pieces.forEach((piece) => {
      piece.vy += piece.gravity;
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.rotation += piece.rotationSpeed;

      confettiContext.save();
      confettiContext.translate(piece.x, piece.y);
      confettiContext.rotate(piece.rotation);
      confettiContext.globalAlpha = piece.opacity;
      confettiContext.fillStyle = piece.color;
      confettiContext.fillRect(
        -piece.width / 2,
        -piece.height / 2,
        piece.width,
        piece.height
      );
      confettiContext.restore();
    });

    const elapsed = now - startTime;
    const stillVisible = pieces.some(
      (piece) => piece.y < window.innerHeight + 70
    );

    if (elapsed < 4800 && stillVisible) {
      confettiAnimationId = requestAnimationFrame(animate);
    } else {
      stopConfetti();
    }
  }

  confettiAnimationId = requestAnimationFrame(animate);
}

function stopConfetti() {
  if (confettiAnimationId) {
    cancelAnimationFrame(confettiAnimationId);
    confettiAnimationId = null;
  }

  confettiContext.clearRect(
    0,
    0,
    elements.confettiCanvas.width,
    elements.confettiCanvas.height
  );
}

/* =========================================================
   MENSAJES Y VALIDACIÓN DE IMÁGENES
========================================================= */
function showToast(message) {
  if (!elements.toast) {
    return;
  }

  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);

  toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 2600);
}

function verifyImages() {
  [
    elements.wheelImage,
    elements.wheelCenter,
    elements.wheelPointer
  ].forEach((image) => {
    image.addEventListener("error", () => {
      showToast(
        `No se pudo cargar ${image.getAttribute("src")}. Revisa la carpeta assets.`
      );
    });
  });
}

/* =========================================================
   TECLADO
========================================================= */
function handleKeyboard(event) {
  const modalVisible =
    !elements.winnerOverlay.hidden &&
    elements.winnerOverlay.classList.contains("is-visible");

  if (event.key === "Escape") {
    if (modalVisible) {
      closeWinner();
      return;
    }

    if (mobileQuery.matches && document.body.classList.contains("mobile-menu-open")) {
      closeSidebarOnMobile();
      return;
    }
  }

  const interactiveTags = ["INPUT", "TEXTAREA", "BUTTON", "SELECT", "A"];

  if (
    event.code === "Space" &&
    !modalVisible &&
    !interactiveTags.includes(document.activeElement?.tagName)
  ) {
    event.preventDefault();
    spinWheel();
  }
}

/* =========================================================
   EVENTOS
========================================================= */
elements.centerSpinBtn.addEventListener("click", spinWheel);
elements.sidebarSpinBtn.addEventListener("click", spinWheel);
elements.mobileSpinBtn.addEventListener("click", spinWheel);
elements.toggleSidebarBtn?.addEventListener("click", toggleSidebar);
elements.sidebarBackdrop?.addEventListener("click", closeSidebarOnMobile);
elements.soundBtn?.addEventListener("click", toggleSound);
elements.quickSoundBtn?.addEventListener("click", toggleSound);
elements.fullscreenBtn?.addEventListener("click", toggleFullscreen);
elements.quickFullscreenBtn?.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", updateFullscreenButtons);
elements.clearHistoryBtn?.addEventListener("click", clearHistory);
elements.closeWinnerBtn?.addEventListener("click", closeWinner);
elements.winnerCloseButton?.addEventListener("click", closeWinner);
elements.spinAgainBtn?.addEventListener("click", spinAgain);

elements.winnerOverlay.addEventListener("click", (event) => {
  if (event.target === elements.winnerOverlay) {
    closeWinner();
  }
});

window.addEventListener("resize", resizeConfettiCanvas);
document.addEventListener("keydown", handleKeyboard);
mobileQuery.addEventListener?.("change", handleViewportChange);

/* =========================================================
   INICIO
========================================================= */
createBulbs();
restoreSidebarState();
restoreSoundPreference();
loadHistory();
updateFullscreenButtons();
verifyImages();
resizeConfettiCanvas();
