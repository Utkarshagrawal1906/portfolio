// Simple sound effects for the game interface
export const playSound = (soundType) => {
  if (typeof window === 'undefined') return;

  // Create audio context for web audio API
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const audioContext = new AudioContext();

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

  const playPageFlip = () => {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const createPaperSwipe = ({ delay, duration, startFrequency, endFrequency, volume }) => {
      const startTime = audioContext.currentTime + delay;
      const bufferSize = Math.floor(audioContext.sampleRate * duration);
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      let smoothedNoise = 0;

      for (let i = 0; i < bufferSize; i += 1) {
        const progress = i / bufferSize;
        const envelope = Math.sin(progress * Math.PI) * Math.pow(1 - progress, 0.55);
        smoothedNoise = smoothedNoise * 0.72 + (Math.random() * 2 - 1) * 0.28;
        data[i] = smoothedNoise * envelope;
      }

      const noise = audioContext.createBufferSource();
      const filter = audioContext.createBiquadFilter();
      const gainNode = audioContext.createGain();

      noise.buffer = buffer;
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(startFrequency, startTime);
      filter.frequency.exponentialRampToValueAtTime(endFrequency, startTime + duration);
      filter.Q.setValueAtTime(0.7, startTime);

      gainNode.gain.setValueAtTime(0.0001, startTime);
      gainNode.gain.exponentialRampToValueAtTime(volume, startTime + 0.025);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      noise.start(startTime);
      noise.stop(startTime + duration);
    };

    createPaperSwipe({
      delay: 0,
      duration: 0.24,
      startFrequency: 420,
      endFrequency: 1800,
      volume: 0.045,
    });

    createPaperSwipe({
      delay: 0.08,
      duration: 0.18,
      startFrequency: 2400,
      endFrequency: 950,
      volume: 0.032,
    });
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
    case 'pageFlip':
      playPageFlip();
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
