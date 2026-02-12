(function () {
  const btnYes = document.getElementById('btnYes');
  const btnNo = document.getElementById('btnNo');
  const successOverlay = document.getElementById('successOverlay');
  const buttonsWrap = document.querySelector('.buttons-wrap');
  const card = document.querySelector('.invite-card');

  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0;

  let noButtonPosition = { x: 0, y: 0 };
  let mouseX = -9999;
  let mouseY = -9999;
  const runAwayRadius = 220;
  const runAwaySpeed = 28;

  // Position No button next to Yes initially
  function initNoButtonPosition() {
    noButtonPosition.x = 56;
    noButtonPosition.y = 0;
    applyNoButtonPosition();
  }

  function applyNoButtonPosition() {
    btnNo.style.transform = `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`;
  }

  function getNoButtonCenter() {
    const wrapRect = buttonsWrap.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    return {
      x: wrapRect.left + wrapRect.width / 2 + noButtonPosition.x,
      y: wrapRect.top + noButtonPosition.y + btnRect.height / 2,
    };
  }

  function clampNoButtonToWrap() {
    const wrapRect = buttonsWrap.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    const padding = 8;
    const minX = -wrapRect.width / 2 + btnRect.width / 2 + padding;
    const maxX = wrapRect.width / 2 - btnRect.width / 2 - padding;
    const minY = 0;
    const maxY = Math.max(0, wrapRect.height - btnRect.height - padding);
    noButtonPosition.x = Math.max(minX, Math.min(maxX, noButtonPosition.x));
    noButtonPosition.y = Math.max(minY, Math.min(maxY, noButtonPosition.y));
  }

  // Desktop: every frame, move No button away from cursor when it's in range
  function runAwayLoop() {
    if (isTouchDevice()) return;
    const center = getNoButtonCenter();
    const dx = mouseX - center.x;
    const dy = mouseY - center.y;
    const dist = Math.hypot(dx, dy);
    if (dist < runAwayRadius && dist > 2) {
      const force = 1 - dist / runAwayRadius;
      const move = (runAwaySpeed * force) / dist;
      noButtonPosition.x -= dx * move;
      noButtonPosition.y -= dy * move;
      clampNoButtonToWrap();
      applyNoButtonPosition();
    }
  }

  function onPointerMove(e) {
    if (isTouchDevice()) return;
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function tick() {
    runAwayLoop();
    requestAnimationFrame(tick);
  }
  tick();

  // Mobile: move No button to random position on tap
  function onNoClick(e) {
    if (!isTouchDevice()) return;
    e.preventDefault();
    moveNoToRandomPosition();
  }

  function moveNoToRandomPosition() {
    const wrapRect = buttonsWrap.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    const padding = 12;
    const minX = -wrapRect.width / 2 + btnRect.width / 2 + padding;
    const maxX = wrapRect.width / 2 - btnRect.width / 2 - padding;
    const maxY = Math.max(0, wrapRect.height - btnRect.height - padding);
    noButtonPosition.x = minX + Math.random() * Math.max(0, maxX - minX);
    noButtonPosition.y = padding + Math.random() * Math.max(0, maxY - padding);
    applyNoButtonPosition();
  }

  // Style buttons wrap so No can move around
  buttonsWrap.style.position = 'relative';
  btnNo.style.position = 'absolute';
  btnNo.style.left = '50%';
  btnNo.style.top = '0';
  btnNo.style.marginLeft = `-${btnNo.offsetWidth / 2}px`;

  initNoButtonPosition();

  document.addEventListener('pointermove', onPointerMove, { passive: true });
  btnNo.addEventListener('click', onNoClick);

  btnYes.addEventListener('click', function () {
    successOverlay.classList.remove('hidden');
  });

  // Re-init position on resize
  window.addEventListener('resize', function () {
    clampNoButtonToWrap();
    applyNoButtonPosition();
  });
})();
