import { useState, useRef, useEffect, useCallback } from "react";
import Header from "../Header/Header";
import About from "../About/About";
import Services from "../Services/Services";
import Portfolio from "../Portfolio/Portfolio";
import Achievements from "../Achievements/Achievements";
import Contact from "../Contact/Contact";
import GameHUD from "../GameHUD/GameHUD";
import AnimatedBackground from "../AnimatedBackground/AnimatedBackground";
import styles from "./Home.module.css";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [playerExp, setPlayerExp] = useState(25);
  const [currentTypedTech, setCurrentTypedTech] = useState([]);

  const sections = [
    { id: "header", name: "Home", component: Header, icon: "🏠" },
    { id: "about", name: "About", component: About, icon: "👤" },
    { id: "services", name: "Services", component: Services, icon: "⚔️" },
    { id: "portfolio", name: "Portfolio Gallery", component: Portfolio, icon: "🎨" },
    { id: "achievements", name: "Achievements", component: Achievements, icon: "🏆" },
    { id: "contact", name: "Contact", component: Contact, icon: "📡" }
  ];

  const scrollToSection = (index) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
      setCurrentSection(index);

      // Award experience for navigation
      setPlayerExp(prev => Math.min(100, prev + 5));
    }
  };

  const navigateSection = (direction) => {
    let newIndex = currentSection + direction;

    // Circular navigation: wrap around at boundaries
    if (newIndex < 0) {
      newIndex = sections.length - 1;
    } else if (newIndex >= sections.length) {
      newIndex = 0;
    }

    scrollToSection(newIndex);
  };

  // Memoize the callback to prevent Header from re-rendering unnecessarily and resetting Typed instance
  // Since 'setCurrentTypedTech' is stable, we can just do:
  const handleTypedTextChange = useCallback((tech) => {
    setCurrentTypedTech(tech);
  }, []);

  const handleSectionClick = (index) => {
    scrollToSection(index);
  };

  // Handle scroll events to update current section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((_, index) => {
        const element = document.getElementById(`section-${index}`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className={styles.gameContainer}>
      <GameHUD
        currentSection={currentSection}
        sections={sections}
        playerHealth={playerHealth}
        playerExp={playerExp}
        onNavigate={navigateSection}
        onSectionClick={handleSectionClick}
      />

      <div className={styles.sectionsContainer}>
        {sections.map((section, index) => (
          <div
            key={section.id}
            id={`section-${index}`}
            className={styles.section}
          >
            <AnimatedBackground sectionId={section.id} currentTypedTech={currentTypedTech} />
            <div className={styles.sectionContent}>
              {section.id === 'header' ?
                <Header onTypedTextChange={handleTypedTextChange} /> :
                <section.component />
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
