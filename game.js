// Simple lane-based mini-games for Level 1 and Level 2

const screens = {
  intro: document.getElementById("level-intro"),
  game: document.getElementById("game-screen"),
  level2Intro: document.getElementById("level2-intro"),
  level2Game: document.getElementById("level2-game-screen"),
  level3Intro: document.getElementById("level3-intro"),
  level3Game: document.getElementById("level3-game-screen"),
};

const overlays = {
  fail: document.getElementById("overlay-fail"),
  success: document.getElementById("overlay-success"),
};

const buttons = {
  spotted: document.getElementById("btn-spotted"),
  skipIntro: document.getElementById("btn-skip-intro"),
  left: document.getElementById("btn-left"),
  right: document.getElementById("btn-right"),
  spotted2: document.getElementById("btn-spotted-2"),
  skipIntro2: document.getElementById("btn-skip-intro-2"),
  throw2: document.getElementById("btn-throw-2"),
  spotted3: document.getElementById("btn-spotted-3"),
  skipIntro3: document.getElementById("btn-skip-intro-3"),
  jump3: document.getElementById("btn-jump-3"),
  tryAgain: document.getElementById("btn-try-again"),
  skipLevel: document.getElementById("btn-skip-level"),
  nextLevel: document.getElementById("btn-next-level"),
};

const timerEl = document.getElementById("game-timer");
const roadEl = document.getElementById("road");
const playerCarEl = document.getElementById("player-car");
const timer2El = document.getElementById("game-timer-2");
const roadPlatesEl = document.getElementById("road-plates");
const plateStackEl = document.getElementById("plate-stack");
const ballEl = document.getElementById("ball");
const timer3El = document.getElementById("game-timer-3");
const platformerEl = document.getElementById("platformer");
const cowEl = document.getElementById("cow");
const successMessageEl = document.getElementById("success-message");
const failTitleEl = document.querySelector("#overlay-fail .card-title");
const failTextEl = document.querySelector("#overlay-fail .card-text");
const skipLevelBtn = document.getElementById("btn-skip-level");

// Game state
let currentLevel = 1;

// Level 1 – dodging cars
const LANES = [0, 1, 2]; // left, center, right
let playerLane = 1;
let enemyCars = [];
let lastSpawnTime = 0;
let spawnInterval = 1300; // ms (slightly slower to start)
let gameRunning = false;
let gameStartTime = 0;
let gameDuration = 20000; // 20s
let animationFrameId = null;

// Level 2 – bowling-style yellow plates
let plates = [];
let game2Running = false;
let game2StartTime = 0;
let game2Duration = 20000; // 20s
let animationFrameId2 = null;
let ballVX = 0;
let ballVY = -260; // upward px/sec
let ballInFlight = false;

// Level 3 – platformer (cow jumping hurdles)
let hurdles = [];
let game3Running = false;
let game3StartTime = 0;
let game3Duration = 20000;
let animationFrameId3 = null;
let lastHurdleSpawn3 = 0;
let hurdleSpawnInterval3 = 1700;
let cowVy = 0;
let cowY = 0; // height above ground (0 = on ground)
const GRAVITY = -700; // pulls cow back down toward ground
const JUMP_STRENGTH = 380;

// Helpers
function setScreen(active) {
  Object.values(screens).forEach((el) => {
    el.classList.remove("screen--active");
  });
  active.classList.add("screen--active");
}

function showOverlay(overlay) {
  overlay.classList.add("overlay--visible");
}

function hideOverlays() {
  Object.values(overlays).forEach((o) =>
    o.classList.remove("overlay--visible")
  );
}

function resetGameState() {
  cancelAnimationFrame(animationFrameId);
  enemyCars.forEach((car) => car.el.remove());
  enemyCars = [];
  playerLane = 1;
  positionPlayerCar();
  timerEl.textContent = "20s";
  gameRunning = false;
}

function resetGame2State() {
  cancelAnimationFrame(animationFrameId2);
  plates.forEach((p) => p.el.remove());
  plates = [];
  ballInFlight = false;
  resetBallPosition();
  timer2El.textContent = "20s";
  game2Running = false;
  if (buttons.throw2) {
    buttons.throw2.disabled = false;
  }
}

function laneToX(laneIndex) {
  const roadWidth = roadEl.clientWidth;
  const laneWidth = roadWidth / LANES.length;
  const carWidth = playerCarEl.offsetWidth || 52;
  const laneCenter = laneWidth * laneIndex + laneWidth / 2;
  return laneCenter - carWidth / 2;
}

function positionPlayerCar() {
  const x = laneToX(playerLane);
  playerCarEl.style.left = `${x}px`;
}

function resetBallPosition() {
  const roadRect = roadPlatesEl.getBoundingClientRect();
  const ballRect = ballEl.getBoundingClientRect();
  const roadWidth = roadRect.width || roadPlatesEl.clientWidth;
  const centerX = roadWidth / 2 - ballRect.width / 2;
  ballEl.style.left = `${centerX}px`;
  ballEl.style.bottom = "16px";
  ballVX = 0;
  ballVY = -260;
  ballInFlight = false;
}

function spawnEnemyCar() {
  const enemy = document.createElement("div");
  enemy.className = "car car--enemy";
  const lane = LANES[Math.floor(Math.random() * LANES.length)];
  const x = laneToX(lane);
  enemy.style.left = `${x}px`;
  enemy.style.top = "-100px";
  roadEl.appendChild(enemy);

  // Gradually increase speed over time so the game starts easier
  const now = performance.now();
  const elapsed = gameStartTime ? now - gameStartTime : 0;
  const progress = Math.min(1, elapsed / gameDuration); // 0 → 1 over the round
  const baseSpeed = 80;
  const maxSpeed = 260;
  const speed =
    baseSpeed +
    (maxSpeed - baseSpeed) * progress +
    (Math.random() * 30 - 15); // small jitter

  enemyCars.push({
    el: enemy,
    lane,
    y: -100,
    speed,
  });
}

function rectsOverlap(a, b) {
  return !(
    a.right < b.left ||
    a.left > b.right ||
    a.bottom < b.top ||
    a.top > b.bottom
  );
}

function updateTimer(now) {
  const elapsed = now - gameStartTime;
  const remaining = Math.max(0, gameDuration - elapsed);
  const seconds = Math.ceil(remaining / 1000);
  timerEl.textContent = `${seconds}s`;
  return remaining <= 0;
}

function updateTimer2(now) {
  const elapsed = now - game2StartTime;
  const remaining = Math.max(0, game2Duration - elapsed);
  const seconds = Math.ceil(remaining / 1000);
  timer2El.textContent = `${seconds}s`;
  return remaining <= 0;
}

function updateTimer3(now) {
  const elapsed = now - game3StartTime;
  const remaining = Math.max(0, game3Duration - elapsed);
  const seconds = Math.ceil(remaining / 1000);
  timer3El.textContent = `${seconds}s`;
  return remaining <= 0;
}

function resetGame3State() {
  cancelAnimationFrame(animationFrameId3);
  hurdles.forEach((h) => h.el.remove());
  hurdles = [];
  cowVy = 0;
  cowY = 0;
  if (cowEl) {
    cowEl.style.bottom = "24px";
  }
  if (timer3El) timer3El.textContent = "20s";
  game3Running = false;
}

function endGameSuccess() {
  gameRunning = false;
  game2Running = false;
  game3Running = false;

  if (currentLevel === 1) {
    successMessageEl.textContent =
      "You spot the best on road.. just like how you are my best person! Happy birthday, love.";
    buttons.nextLevel.textContent = "Go to level 2";
  } else if (currentLevel === 2) {
    successMessageEl.textContent =
      "Just like the game, you make every journey fun sweetheart! Keep this brithday smile forever!";
    buttons.nextLevel.textContent = "Go to level 3";
  } else {
    successMessageEl.textContent =
      "You win the game and I win in life with you my love! Happy birthday cutie pie!";
    buttons.nextLevel.textContent = "Play again";
  }

  showOverlay(overlays.success);
}

function endGameFail() {
  gameRunning = false;
  game2Running = false;
  game3Running = false;
  if (currentLevel === 1) {
    if (failTitleEl) failTitleEl.textContent = "Oops! Someone got in the way.";
    if (failTextEl) failTextEl.textContent = "Wanna try again sweetu or just jump to the next level!";
    if (skipLevelBtn) {
      skipLevelBtn.textContent = "Skip to next level";
      skipLevelBtn.classList.remove("hidden");
    }
  } else if (currentLevel === 2) {
    if (failTitleEl) failTitleEl.textContent = "Time out! Some plates are still left.";
    if (failTextEl) failTextEl.textContent = "Hit the plates or jump to the next level. Either way you're my yellow!";
    if (skipLevelBtn) {
      skipLevelBtn.textContent = "Skip to next level";
      skipLevelBtn.classList.remove("hidden");
    }
  } else {
    if (failTitleEl) failTitleEl.textContent = "Oops! The cow hit something!";
    if (failTextEl) failTextEl.textContent = "Like a cow's opinion, it doesn't matter. Try again to finish the game!";
    if (skipLevelBtn) {
      skipLevelBtn.textContent = "End game";
      skipLevelBtn.classList.remove("hidden");
    }
  }
  showOverlay(overlays.fail);
}

function gameLoop(timestamp) {
  if (!gameRunning) return;

  if (!gameStartTime) {
    gameStartTime = timestamp;
  }

  const elapsedSinceStart = timestamp - gameStartTime;

  // Spawn enemies
  if (timestamp - lastSpawnTime > spawnInterval) {
    spawnEnemyCar();
    lastSpawnTime = timestamp;
  }

  // Move enemies
  const roadHeight = roadEl.clientHeight;
  const dt = 16; // approximate per-frame delta in ms

  enemyCars.forEach((enemy) => {
    enemy.y += (enemy.speed * dt) / 1000;
    enemy.el.style.top = `${enemy.y}px`;
  });

  // Remove off-screen enemies
  enemyCars = enemyCars.filter((enemy) => {
    if (enemy.y > roadHeight + 120) {
      enemy.el.remove();
      return false;
    }
    return true;
  });

  // Collision detection
  const playerRect = playerCarEl.getBoundingClientRect();
  for (const enemy of enemyCars) {
    const enemyRect = enemy.el.getBoundingClientRect();
    if (rectsOverlap(playerRect, enemyRect)) {
      endGameFail();
      cancelAnimationFrame(animationFrameId);
      return;
    }
  }

  // Timer
  const finished = updateTimer(timestamp);
  if (finished) {
    endGameSuccess();
    cancelAnimationFrame(animationFrameId);
    return;
  }

  animationFrameId = requestAnimationFrame(gameLoop);
}

function startGame() {
  currentLevel = 1;
  resetGameState();
  hideOverlays();
  setScreen(screens.game);
  gameStartTime = 0;
  lastSpawnTime = 0;
  gameRunning = true;
  positionPlayerCar();
  animationFrameId = requestAnimationFrame(gameLoop);
}

function gameLoop2(timestamp) {
  if (!game2Running) return;

  if (!game2StartTime) {
    game2StartTime = timestamp;
  }

  const dt = 16; // ms

  // Move ball
  if (ballInFlight) {
    const dy = (ballVY * dt) / 1000;
    const dx = (ballVX * dt) / 1000;
    const currentTop = ballEl.offsetTop;
    const currentLeft = parseFloat(ballEl.style.left) || roadPlatesEl.clientWidth / 2 - 9;
    ballEl.style.top = `${currentTop + dy}px`;
    ballEl.style.left = `${currentLeft + dx}px`;

    const ballRect = ballEl.getBoundingClientRect();
    const roadRect = roadPlatesEl.getBoundingClientRect();
    // Bounce on left/right walls, disappear only on top/bottom
    const hitLeftWall = ballRect.left <= roadRect.left;
    const hitRightWall = ballRect.right >= roadRect.right;
    if (hitLeftWall || hitRightWall) {
      ballVX = -ballVX;
    }

    const outTop = ballRect.bottom < roadRect.top;
    const outBottom = ballRect.top > roadRect.bottom;
    if (outTop || outBottom) {
      ballInFlight = false;
      if (buttons.throw2) {
        buttons.throw2.disabled = false;
      }
    }
  }

  // Collision with plates — destroy only one plate per hit, then bounce ball back
  const ballRect = ballEl.getBoundingClientRect();
  for (const p of plates) {
    const plateRect = p.el.getBoundingClientRect();
    if (rectsOverlap(ballRect, plateRect)) {
      p.el.remove();
      p.hit = true;
      ballVY = Math.abs(ballVY); // bounce back down
      break; // only one plate per hit
    }
  }

  // Remove destroyed plates
  plates = plates.filter((p) => !p.hit);

  if (plates.length === 0) {
    endGameSuccess();
    cancelAnimationFrame(animationFrameId2);
    return;
  }

  const finished = updateTimer2(timestamp);
  if (finished) {
    endGameFail();
    cancelAnimationFrame(animationFrameId2);
    return;
  }

  animationFrameId2 = requestAnimationFrame(gameLoop2);
}

function startLevel2Game() {
  currentLevel = 2;
  resetGame2State();
  hideOverlays();
  setScreen(screens.level2Game);
  game2StartTime = 0;
  game2Running = true;
  // Build a small pyramid stack of yellow plates
  plates = [];
  plateStackEl.innerHTML = "";
  const total = 6; // small stack so it feels like bowling pins
  for (let i = 0; i < total; i++) {
    const plate = document.createElement("div");
    plate.className = "plate plate--yellow";
    plate.textContent = "Y-PLT";
    plateStackEl.appendChild(plate);
    plates.push({ el: plate, hit: false });
  }

  resetBallPosition();
  animationFrameId2 = requestAnimationFrame(gameLoop2);
}

function gameLoop3(timestamp) {
  if (!game3Running) return;
  if (!game3StartTime) game3StartTime = timestamp;

  const dt = 16;
  const pw = platformerEl.clientWidth;
  const ph = platformerEl.clientHeight;

  // Spawn hurdles
  if (timestamp - lastHurdleSpawn3 > hurdleSpawnInterval3) {
    const h = document.createElement("div");
    h.className = "hurdle";

    // Randomize hurdle appearance: car, tree, pothole, etc.
    const hurdleTypes = [
      { emoji: "🚗", height: 34 },
      { emoji: "🌳", height: 40 },
      { emoji: "🕳️", height: 26 },
      { emoji: "🚧", height: 32 },
    ];
    const type = hurdleTypes[Math.floor(Math.random() * hurdleTypes.length)];
    h.textContent = type.emoji;
    h.style.height = `${type.height}px`;

    platformerEl.appendChild(h);
    hurdles.push({ el: h, x: pw });
    lastHurdleSpawn3 = timestamp;
  }

  // Move hurdles left
  // Start slow and ramp up gently
  const hurdleSpeed = 80 + (timestamp - game3StartTime) * 0.008;
  hurdles.forEach((h) => {
    h.x -= (hurdleSpeed * dt) / 1000;
    h.el.style.left = `${h.x}px`;
  });
  hurdles = hurdles.filter((h) => {
    if (h.x < -40) {
      h.el.remove();
      return false;
    }
    return true;
  });

  // Cow physics
  cowVy += (GRAVITY * dt) / 1000;
  cowY += (cowVy * dt) / 1000;
  if (cowY < 0) {
    cowY = 0;
    cowVy = 0;
  }
  cowEl.style.bottom = `${24 + cowY}px`;

  // Collision with hurdles
  const cowRect = cowEl.getBoundingClientRect();
  for (const h of hurdles) {
    const hRect = h.el.getBoundingClientRect();
    if (rectsOverlap(cowRect, hRect)) {
      endGameFail();
      cancelAnimationFrame(animationFrameId3);
      return;
    }
  }

  const finished = updateTimer3(timestamp);
  if (finished) {
    endGameSuccess();
    cancelAnimationFrame(animationFrameId3);
    return;
  }

  animationFrameId3 = requestAnimationFrame(gameLoop3);
}

function startLevel3Game() {
  currentLevel = 3;
  resetGame3State();
  hideOverlays();
  setScreen(screens.level3Game);
  game3StartTime = 0;
  lastHurdleSpawn3 = 0;
  game3Running = true;
  animationFrameId3 = requestAnimationFrame(gameLoop3);
}

// Event bindings
buttons.spotted.addEventListener("click", () => {
  startGame();
});

buttons.skipIntro.addEventListener("click", () => {
  startGame();
});

buttons.spotted2.addEventListener("click", () => {
  startLevel2Game();
});

buttons.skipIntro2.addEventListener("click", () => {
  startLevel2Game();
});

buttons.spotted3.addEventListener("click", () => {
  startLevel3Game();
});

buttons.skipIntro3.addEventListener("click", () => {
  startLevel3Game();
});

buttons.jump3.addEventListener("click", () => {
  if (!game3Running) return;
  if (cowY <= 0) {
    cowVy = JUMP_STRENGTH;
  }
});

buttons.left.addEventListener("click", () => {
  if (!gameRunning) return;
  playerLane = Math.max(0, playerLane - 1);
  positionPlayerCar();
});

buttons.right.addEventListener("click", () => {
  if (!gameRunning) return;
  playerLane = Math.min(LANES.length - 1, playerLane + 1);
  positionPlayerCar();
});

buttons.throw2.addEventListener("click", () => {
  if (!game2Running || ballInFlight) return;
  // start a new throw straight up — reset position so ball appears at launcher
  const roadWidth = roadPlatesEl.clientWidth;
  const ballSize = 18;
  const centerX = roadWidth / 2 - ballSize / 2;
  ballEl.style.removeProperty("top"); // clear so bottom takes effect
  ballEl.style.transform = "none"; // use left edge for positioning
  ballEl.style.left = `${centerX}px`;
  ballEl.style.bottom = "32px";
  // Random direction (biased upward so ball can hit plates)
  const speed = 260;
  const angleRad = (Math.random() * 140 - 70) * (Math.PI / 180); // -70° to +70° from vertical
  ballVX = speed * Math.sin(angleRad);
  ballVY = -speed * Math.cos(angleRad);
  ballInFlight = true;
  buttons.throw2.disabled = true;
});

buttons.tryAgain.addEventListener("click", () => {
  hideOverlays();
  if (currentLevel === 1) startGame();
  else if (currentLevel === 2) startLevel2Game();
  else startLevel3Game();
});

buttons.skipLevel.addEventListener("click", () => {
  hideOverlays();
  if (currentLevel === 3) {
    // End game: show final success message for Level 3
    endGameSuccess();
  } else {
    // Treat skip as a success for this level so copy/buttons update correctly
    endGameSuccess();
  }
});

buttons.nextLevel.addEventListener("click", () => {
  hideOverlays();
  if (currentLevel === 1) setScreen(screens.level2Intro);
  else if (currentLevel === 2) setScreen(screens.level3Intro);
  else setScreen(screens.intro);
});

// Initial layout adjustment once DOM is ready
window.addEventListener("load", () => {
  positionPlayerCar();
  resetBallPosition();
});

window.addEventListener("resize", () => {
  positionPlayerCar();
  resetBallPosition();
});

