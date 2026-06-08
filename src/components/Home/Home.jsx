import { lazy, Suspense, useState, useEffect, useCallback, useMemo, useRef } from "react";
import Header from "../Header/Header";
import GameHUD from "../GameHUD/GameHUD";
import AnimatedBackground from "../AnimatedBackground/AnimatedBackground";
import styles from "./Home.module.css";

const About = lazy(() => import("../About/About"));
const Services = lazy(() => import("../Services/Services"));
const Portfolio = lazy(() => import("../Portfolio/Portfolio"));
const Achievements = lazy(() => import("../Achievements/Achievements"));
const Certificates = lazy(() => import("../Certificates/Certificates"));
const Contact = lazy(() => import("../Contact/Contact"));

function DeferredSection({ children, eager = false }) {
  const sectionRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(eager);

  useEffect(() => {
    if (shouldRender) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={sectionRef} className={styles.deferredSection}>
      {shouldRender ? children : null}
    </div>
  );
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [playerHealth] = useState(100);
  const [playerExp, setPlayerExp] = useState(25);
  const [currentTypedTech, setCurrentTypedTech] = useState([]);

  const sections = useMemo(() => [
    { id: "header", name: "Home", component: Header, icon: "🏠" },
    { id: "about", name: "About", component: About, icon: "👤" },
    { id: "services", name: "Services", component: Services, icon: "⚔️" },
    { id: "portfolio", name: "Portfolio Gallery", component: Portfolio, icon: "🎨" },
    { id: "achievements", name: "Achievements", component: Achievements, icon: "🏆" },
    { id: "certificates", name: "Certificates", component: Certificates, icon: "🎓" },
    { id: "contact", name: "Contact", component: Contact, icon: "📡" }
  ], []);

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
    let animationFrame = null;

    const handleScroll = () => {
      if (animationFrame) return;

      animationFrame = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach((_, index) => {
          const element = document.getElementById(`section-${index}`);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setCurrentSection((currentIndex) => (
                currentIndex === index ? currentIndex : index
              ));
            }
          }
        });

        animationFrame = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
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
            <DeferredSection eager={index <= 1}>
              <AnimatedBackground
                sectionId={section.id}
                currentTypedTech={section.id === "header" ? currentTypedTech : undefined}
              />
              <div className={styles.sectionContent}>
                <Suspense fallback={null}>
                  {section.id === 'header' ?
                    <Header onTypedTextChange={handleTypedTextChange} /> :
                    <section.component />
                  }
                </Suspense>
              </div>
            </DeferredSection>
          </div>
        ))}
      </div>
    </div>
  );
}
