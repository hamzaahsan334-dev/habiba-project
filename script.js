document.addEventListener('DOMContentLoaded', () => {
  // Initial Celebration
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FFB7C5', '#FFDDE1', '#FF007F', '#FFFFFF']
  });

  createFloatingElements();
});

function createFloatingElements() {
  const container = document.getElementById('hearts-container');
  const symbols = ['❤️', '💖', '💗', '🎀', '🌸', '✨'];
  
  setInterval(() => {
    const el = document.createElement('div');
    const isBow = Math.random() > 0.8;
    
    el.className = isBow ? 'floating-bow' : 'floating-heart';
    el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    
    // Sometimes spawn a tiny Kitty font icon if available, or just stick to bows
    if (Math.random() > 0.95) el.innerText = '🐱'; 

    el.style.left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 3 + 4;
    el.style.animationDuration = duration + 's';
    el.style.fontSize = Math.random() * 25 + 15 + 'px';
    el.style.zIndex = Math.floor(Math.random() * 5);
    
    container.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, duration * 1000);
  }, 400);
}

function nextSection() {
  const current = document.getElementById('greeting-section');
  const next = document.getElementById('question-section');
  
  current.style.animation = 'bounceOut 0.5s ease-in forwards';
  setTimeout(() => {
    current.classList.remove('active');
    next.classList.add('active');
  }, 500);
}

function showSuccess() {
  document.getElementById('question-section').classList.remove('active');
  const successSection = document.getElementById('success-section');
  successSection.classList.add('active');
  successSection.classList.add('success');

  // Celebration Loop
  const duration = 20 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({ 
      ...defaults, 
      particleCount, 
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#FFB7C5', '#FF007F', '#FFFFFF']
    });
    confetti({ 
      ...defaults, 
      particleCount, 
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#FFB7C5', '#FF007F', '#FFFFFF']
    });
  }, 250);
}

// "No" Button Escape Logic
const noBtn = document.getElementById('no-btn');

const moveButton = () => {
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const padding = 30;
  // Calculate random position within viewport
  const newX = Math.random() * (containerWidth - btnWidth - padding * 2) + padding;
  const newY = Math.random() * (containerHeight - btnHeight - padding * 2) + padding;

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
  noBtn.style.position = 'fixed';
};

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveButton();
});
