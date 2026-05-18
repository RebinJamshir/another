const reels = Array.from(document.querySelectorAll('.reel'));

function boostPlaybackMotion() {
  reels.forEach((reel, idx) => {
    const speed = idx === 0 ? 1.4 : 1.8;
    reel.style.animationDuration = `${Math.max(1.8, 3.2 - speed)}s`;
  });
}

function resetPlaybackMotion() {
  reels.forEach((reel) => {
    reel.style.animationDuration = '3s';
  });
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    resetPlaybackMotion();
  } else {
    boostPlaybackMotion();
  }
});

window.addEventListener('pointerdown', boostPlaybackMotion);
window.addEventListener('pointerup', resetPlaybackMotion);

boostPlaybackMotion();
