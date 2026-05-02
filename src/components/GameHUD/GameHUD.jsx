import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './GameHUD.module.css';
// import { playSound, checkAchievements, createParticleEffect } from '../../utils/gameUtils';

const HUD_HIDE_DELAY = 3000;

const GameHUD = ({
  currentSection,
  sections,
  playerHealth,
  playerExp,
  onNavigate,
  onSectionClick
}) => {
  const [showMap, setShowMap] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  const [isHudVisible, setIsHudVisible] = useState(true);
  const hideTimerRef = useRef(null);

  const clearHideTimer = useCallback(() => {
    clearTimeout(hideTimerRef.current);
  }, []);

  const scheduleHudHide = useCallback(() => {
    clearHideTimer();

    hideTimerRef.current = setTimeout(() => {
      setIsHudVisible(false);
    }, HUD_HIDE_DELAY);
  }, [clearHideTimer]);

  const revealHud = useCallback(() => {
    setIsHudVisible(true);

    if (showMap) {
      clearHideTimer();
      return;
    }

    scheduleHudHide();
  }, [clearHideTimer, scheduleHudHide, showMap]);

  useEffect(() => {
    scheduleHudHide();

    return clearHideTimer;
  }, [clearHideTimer, scheduleHudHide]);

  useEffect(() => {
    const handleScroll = () => {
      revealHud();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [revealHud]);

  useEffect(() => {
    if (showMap) {
      clearHideTimer();
      setIsHudVisible(true);
      return;
    }

    scheduleHudHide();
  }, [clearHideTimer, scheduleHudHide, showMap]);

  useEffect(() => {
    // Check for new achievements
    // const newAchievements = checkAchievements(currentSection, sections.length, playerExp);
    // const unlockedAchievements = newAchievements.filter(
    //   achievement => !achievements.some(a => a.id === achievement.id)
    // );

    // if (unlockedAchievements.length > 0) {
    //   setAchievements(prev => [...prev, ...unlockedAchievements]);
    //   setShowAchievement(unlockedAchievements[0]);
    //   playSound('sectionComplete');

    //   // Hide achievement notification after 3 seconds
    //   setTimeout(() => setShowAchievement(null), 3000);
    // }
  }, [currentSection, playerExp, sections.length, achievements]);

  const handleSectionClick = (index, element = null) => {
    onSectionClick(index);
    setShowMap(false);
    // playSound('click');

    // if (element) {
    //   createParticleEffect(element, 'sparkle');
    // }
  };

  const handleNavigate = (direction, element = null) => {
    onNavigate(direction);
    // playSound('navigate');

    // if (element) {
    //   createParticleEffect(element, 'sparkle');
    // }
  };

  const handleMapOpen = () => {
    setShowMap(!showMap);
    // playSound('mapOpen');
  };

  return (
    <>
      <div
        className={styles.hudHoverZone}
        onMouseEnter={revealHud}
        aria-hidden="true"
      />

      {/* Main HUD */}
      <div
        className={`${styles.hud} ${!isHudVisible ? styles.hiddenHud : ''}`}
        onMouseEnter={revealHud}
        onMouseLeave={scheduleHudHide}
      >
        {/* Navigation Arrows */}
        <div className={styles.navigation}>
          <button
            className={styles.navArrow}
            onClick={(e) => handleNavigate(-1, e.target)}
          >
            ◀
          </button>

          <div className={styles.sectionIndicator}>
            <div className={styles.sectionDots}>
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`${styles.sectionDot} ${
                    index < currentSection ? styles.visited : ''
                  } ${index === currentSection ? styles.current : ''}`}
                  onClick={(e) => handleSectionClick(index, e.target)}
                  title={section.name}
                >
                  {index < currentSection ? '✓' : index + 1}
                </div>
              ))}
            </div>
            <div className={styles.currentSectionName}>
              {sections[currentSection]?.name || 'Unknown'}
            </div>
          </div>

          <button
            className={styles.navArrow}
            onClick={(e) => handleNavigate(1, e.target)}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Achievement Notification */}
      {showAchievement && (
        <div className={styles.achievement}>
          <div className={styles.achievementIcon}>{showAchievement.icon}</div>
          <div className={styles.achievementTitle}>{showAchievement.title}</div>
          <div className={styles.achievementDesc}>{showAchievement.description}</div>
        </div>
      )}

      {/* World Map Modal */}
      {showMap && (
        <div className={styles.mapOverlay} onClick={() => setShowMap(false)}>
          <div className={styles.mapContainer} onClick={(e) => e.stopPropagation()}>
            <h2>World Map</h2>
            <div className={styles.mapGrid}>
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`${styles.mapSection} ${
                    index <= currentSection ? styles.unlocked : styles.locked
                  } ${index === currentSection ? styles.currentLocation : ''}`}
                  onClick={() => index <= currentSection && handleSectionClick(index)}
                >
                  <div className={styles.mapIcon}>{section.icon}</div>
                  <div className={styles.mapName}>{section.name}</div>
                  {index > currentSection && (
                    <div className={styles.lockIcon}>🔒</div>
                  )}
                  {index === currentSection && (
                    <div className={styles.playerMarker}>📍</div>
                  )}
                </div>
              ))}
            </div>
            <button className={styles.closeMap} onClick={() => setShowMap(false)}>
              Close Map
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameHUD;
