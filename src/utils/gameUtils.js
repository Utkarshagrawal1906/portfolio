// Simple sound effects for the game interface
export const playSound = (soundType) => {
  // Create audio context for web audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const playTone = (frequency, duration, type = 'sine') => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  switch (soundType) {
    case 'navigate':
      playTone(440, 0.1, 'square'); // A4 note
      break;
    case 'sectionComplete':
      playTone(523, 0.2, 'sine'); // C5 note
      setTimeout(() => playTone(659, 0.2, 'sine'), 100); // E5 note
      break;
    case 'mapOpen':
      playTone(330, 0.15, 'triangle'); // E4 note
      break;
    case 'click':
      playTone(800, 0.05, 'square');
      break;
    default:
      console.log(`Sound: ${soundType}`);
  }
};

// Achievement system
export const checkAchievements = (currentSection, totalSections, playerExp) => {
  const achievements = [];

  if (currentSection === totalSections - 1) {
    achievements.push({
      id: 'portfolioMaster',
      title: 'Portfolio Master',
      description: 'Completed the entire portfolio journey!',
      icon: '🏆'
    });
  }

  if (playerExp >= 50) {
    achievements.push({
      id: 'experiencedExplorer',
      title: 'Experienced Explorer',
      description: 'Gained 50 XP exploring the portfolio',
      icon: '⭐'
    });
  }

  if (currentSection >= 2) {
    achievements.push({
      id: 'dedicatedViewer',
      title: 'Dedicated Viewer',
      description: 'Visited multiple sections of the portfolio',
      icon: '🎯'
    });
  }

  return achievements;
};

// Particle effect utility (simple CSS-based)
export const createParticleEffect = (element, type = 'sparkle') => {
  if (!element) return;

  const particle = document.createElement('div');
  particle.className = `particle particle-${type}`;

  // Position particle randomly near the element
  const rect = element.getBoundingClientRect();
  particle.style.left = `${rect.left + Math.random() * rect.width}px`;
  particle.style.top = `${rect.top + Math.random() * rect.height}px`;

  document.body.appendChild(particle);

  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 1000);
};