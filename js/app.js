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
  // Nueva clave para no mezclar el historial de la ruleta anterior.
  history: "feria85-wheel-history-2026",
  sound: "feria85-wheel-sound",
  sidebar: "feria85-wheel-sidebar"
};

/*
  La nueva ruleta tiene 20 sectores iguales.

  - 0° corresponde al centro del sector situado arriba,
    justo debajo de la flecha.
  - Los grados aumentan en sentido horario.
  - Cada sector mide 18°.
  - El primer sector ocupa desde 351° hasta 9°.
*/
const sectors = [
  {
    id: "clinique-makeup",
    label: "Maquillaje Express Clinique",
    start: 351,
    end: 9,
    tone: "white",
    detail: "Has obtenido una experiencia de maquillaje Express Clinique."
  },
  {
    id: "surprise-green-top",
    label: "Premio sorpresa",
    start: 9,
    end: 27,
    tone: "green",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "estee-lauder-cleaning",
    label: "Limpieza Facial Express Estée Lauder",
    start: 27,
    end: 45,
    tone: "yellow",
    detail: "Has obtenido una experiencia de limpieza facial Express Estée Lauder."
  },
  {
    id: "surprise-blue-upper-right",
    label: "Premio sorpresa",
    start: 45,
    end: 63,
    tone: "blue",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "palladio-makeup",
    label: "Maquillaje Express Palladio",
    start: 63,
    end: 81,
    tone: "white",
    detail: "Has obtenido una experiencia de maquillaje Express Palladio."
  },
  {
    id: "surprise-green-right",
    label: "Premio sorpresa",
    start: 81,
    end: 99,
    tone: "green",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "surprise-orange-right",
    label: "Premio sorpresa",
    start: 99,
    end: 117,
    tone: "yellow",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "clinique-cleaning-lower-right",
    label: "Limpieza Facial Express Clinique",
    start: 117,
    end: 135,
    tone: "yellow",
    detail: "Has obtenido una experiencia de limpieza facial Express Clinique."
  },
  {
    id: "surprise-blue-lower-right",
    label: "Premio sorpresa",
    start: 135,
    end: 153,
    tone: "blue",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "surprise-orange-bottom-right",
    label: "Premio sorpresa",
    start: 153,
    end: 171,
    tone: "yellow",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "natasha-denona-makeup",
    label: "Maquillaje Express Natasha Denona",
    start: 171,
    end: 189,
    tone: "white",
    detail: "Has obtenido una experiencia de maquillaje Express Natasha Denona."
  },
  {
    id: "maybelline-makeup",
    label: "Maquillaje Express Maybelline New York",
    start: 189,
    end: 207,
    tone: "blue",
    detail: "Has obtenido una experiencia de maquillaje Express Maybelline New York."
  },
  {
    id: "surprise-orange-bottom-left",
    label: "Premio sorpresa",
    start: 207,
    end: 225,
    tone: "yellow",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "surprise-green-lower-left",
    label: "Premio sorpresa",
    start: 225,
    end: 243,
    tone: "green",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "loreal-makeup",
    label: "Maquillaje Express L'Oréal Paris",
    start: 243,
    end: 261,
    tone: "white",
    detail: "Has obtenido una experiencia de maquillaje Express L'Oréal Paris."
  },
  {
    id: "surprise-yellow-left",
    label: "Premio sorpresa",
    start: 261,
    end: 279,
    tone: "yellow",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "surprise-orange-left",
    label: "Premio sorpresa",
    start: 279,
    end: 297,
    tone: "yellow",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "clinique-cleaning-upper-left",
    label: "Limpieza Facial Express Clinique",
    start: 297,
    end: 315,
    tone: "green",
    detail: "Has obtenido una experiencia de limpieza facial Express Clinique."
  },
  {
    id: "surprise-orange-upper-left",
    label: "Premio sorpresa",
    start: 315,
    end: 333,
    tone: "yellow",
    detail: "Consulta el premio sorpresa asignado."
  },
  {
    id: "surprise-blue-top-left",
    label: "Premio sorpresa",
    start: 333,
    end: 351,
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
let activeSpinAnimation = null;
let activeTickTimer = null;

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

function clearActiveSpinAnimation() {
  if (activeSpinAnimation) {
    activeSpinAnimation.onfinish = null;
    activeSpinAnimation.oncancel = null;
    activeSpinAnimation.cancel();
    activeSpinAnimation = null;
  }
}

function stopTickSequence() {
  if (activeTickTimer) {
    window.clearTimeout(activeTickTimer);
    activeTickTimer = null;
  }
}

/*
  Genera el sonido mecánico de la flecha sin calcular la rotación
  en cada fotograma. Al principio los clics son más frecuentes y,
  conforme la ruleta desacelera, se van separando progresivamente.
*/
function startTickSequence(duration) {
  stopTickSequence();

  if (!soundEnabled || prefersReducedMotion) {
    return;
  }

  const startTime = performance.now();

  function scheduleNextTick() {
    if (!isSpinning) {
      stopTickSequence();
      return;
    }

    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    if (progress >= 0.965) {
      stopTickSequence();
      return;
    }

    playTickSound(Math.max(0.15, 1 - progress));

    // De 55 ms al inicio hasta aproximadamente 285 ms al final.
    const nextDelay = 55 + Math.pow(progress, 2.35) * 230;
    activeTickTimer = window.setTimeout(scheduleNextTick, nextDelay);
  }

  activeTickTimer = window.setTimeout(scheduleNextTick, 70);
}

function settleWheelAt(targetRotation, expectedSector) {
  /*
    Mantener solo el ángulo equivalente entre 0° y 359° evita que
    el número de grados crezca indefinidamente después de muchos giros.
  */
  currentRotation = normalizeAngle(targetRotation);
  elements.wheelRotator.style.transform =
    `translateZ(0) rotate(${currentRotation}deg)`;

  clearActiveSpinAnimation();
  stopTickSequence();
  finishSpin(expectedSector);
}

function animateWheelWithWebAnimations(
  startRotation,
  targetRotation,
  duration,
  expectedSector
) {
  clearActiveSpinAnimation();

  const startTransform =
    `translateZ(0) rotate(${startRotation}deg)`;
  const endTransform =
    `translateZ(0) rotate(${targetRotation}deg)`;

  elements.wheelRotator.style.transform = startTransform;

  activeSpinAnimation = elements.wheelRotator.animate(
    [
      { transform: startTransform },
      { transform: endTransform }
    ],
    {
      duration,
      // Inicio firme y desaceleración larga, sin frenado brusco.
      easing: "cubic-bezier(0.10, 0.72, 0.12, 1)",
      fill: "forwards"
    }
  );

  activeSpinAnimation.onfinish = () => {
    settleWheelAt(targetRotation, expectedSector);
  };

  activeSpinAnimation.oncancel = () => {
    stopTickSequence();
  };
}

/*
  Respaldo para navegadores antiguos que no soporten Web Animations API.
  En navegadores modernos no se utiliza este método.
*/
function animateWheelWithRequestAnimationFrame(
  startRotation,
  targetRotation,
  duration,
  expectedSector
) {
  const startTime = performance.now();

  function frame(now) {
    if (!isSpinning) {
      return;
    }

    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuint(progress);
    const rotation =
      startRotation + (targetRotation - startRotation) * easedProgress;

    elements.wheelRotator.style.transform =
      `translateZ(0) rotate(${rotation}deg)`;

    if (progress < 1) {
      requestAnimationFrame(frame);
      return;
    }

    settleWheelAt(targetRotation, expectedSector);
  }

  requestAnimationFrame(frame);
}

function animateWheel(startRotation, targetRotation, duration, expectedSector) {
  isSpinning = true;
  setSpinButtonsDisabled(true);
  elements.wheelShell.classList.add("is-spinning");
  elements.wheelShell.setAttribute("aria-busy", "true");
  elements.lastResult.textContent = "Girando…";

  playSpinStartSound();
  startTickSequence(duration);

  if (typeof elements.wheelRotator.animate === "function") {
    animateWheelWithWebAnimations(
      startRotation,
      targetRotation,
      duration,
      expectedSector
    );
    return;
  }

  animateWheelWithRequestAnimationFrame(
    startRotation,
    targetRotation,
    duration,
    expectedSector
  );
}

function finishSpin(expectedSector) {
  stopTickSequence();

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
   PREPARACIÓN DE RENDIMIENTO
========================================================= */
function prepareWheelPerformance() {
  /*
    Estas propiedades promueven únicamente la capa giratoria a la GPU.
    No alteran tamaño, posición, diseño ni comportamiento responsive.
  */
  elements.wheelRotator.style.willChange = "transform";
  elements.wheelRotator.style.backfaceVisibility = "hidden";
  elements.wheelRotator.style.transformOrigin = "50% 50%";
  elements.wheelRotator.style.transform =
    `translateZ(0) rotate(${currentRotation}deg)`;

  elements.wheelImage.style.backfaceVisibility = "hidden";
  elements.wheelImage.style.transform = "translateZ(0)";
}

/* =========================================================
   INICIO
========================================================= */
prepareWheelPerformance();
createBulbs();
restoreSidebarState();
restoreSoundPreference();
loadHistory();
updateFullscreenButtons();
verifyImages();
resizeConfettiCanvas();
