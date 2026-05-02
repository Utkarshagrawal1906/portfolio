import styles from "./Header.module.css";
import bg from "../../assets/background.png";
import bgMobile from "../../assets/background mobile.png";
import logo from "../../assets/Logo.jpeg";
import { useState, useRef, useEffect, useMemo } from "react";
import Typed from "typed.js";

const graphNodes = [
  { x: 8, y: 16, tech: { label: "JS", color: "#f7df1e", text: "#111827" } },
  { x: 24, y: 9, tech: { label: "Java", color: "#f89820", text: "#111827" } },
  { x: 42, y: 18, tech: { label: "Py", color: "#3776ab", text: "#ffffff" } },
  { x: 62, y: 11, tech: { label: "React", color: "#61dafb", text: "#0f172a" } },
  { x: 84, y: 20, tech: { label: "AWS", color: "#ff9900", text: "#111827" } },
  { x: 15, y: 34 },
  { x: 35, y: 31, tech: { label: "Node", color: "#68a063", text: "#ffffff" } },
  { x: 55, y: 38, tech: { label: "HTML", color: "#e34f26", text: "#ffffff" } },
  { x: 74, y: 32, tech: { label: "CSS", color: "#1572b6", text: "#ffffff" } },
  { x: 91, y: 43, tech: { label: "Django", color: "#092e20", text: "#ffffff" } },
  { x: 7, y: 55, tech: { label: "Vue", color: "#42b883", text: "#0f172a" } },
  { x: 28, y: 51 },
  { x: 47, y: 61, tech: { label: "API", color: "#22c55e", text: "#052e16" } },
  { x: 68, y: 55, tech: { label: "GCP", color: "#4285f4", text: "#ffffff" } },
  { x: 86, y: 66, tech: { label: "SQL", color: "#38bdf8", text: "#0f172a" } },
  { x: 18, y: 77, tech: { label: "Git", color: "#f05032", text: "#ffffff" } },
  { x: 38, y: 82, tech: { label: "Kotlin", color: "#a855f7", text: "#ffffff" } },
  { x: 58, y: 73, tech: { label: "Spring", color: "#6db33f", text: "#ffffff" } },
  { x: 77, y: 85, tech: { label: "Android", color: "#3ddc84", text: "#092e20" } },
  { x: 94, y: 78 },
];

const graphLinks = [
  [0, 1],
  [0, 5],
  [1, 2],
  [2, 3],
  [2, 6],
  [3, 4],
  [3, 8],
  [4, 9],
  [5, 6],
  [5, 10],
  [6, 7],
  [6, 11],
  [7, 8],
  [7, 12],
  [8, 9],
  [8, 13],
  [9, 14],
  [10, 11],
  [10, 15],
  [11, 12],
  [11, 16],
  [12, 13],
  [12, 17],
  [13, 14],
  [13, 18],
  [14, 19],
  [15, 16],
  [16, 17],
  [17, 18],
  [18, 19],
];

const cursorPushRadius = 16;
const graphAreaWidth = 0.6;

const techFadeZones = {
  python: { xMin: 74, xMax: 96, yMin: 38, yMax: 66 },
  java: { xMin: 88, xMax: 100, yMin: 70, yMax: 94 },
};

const isInFadedGraphZone = (node, zones) => {
  return zones.some(
    (zone) =>
      node.x >= zone.xMin &&
      node.x <= zone.xMax &&
      node.y >= zone.yMin &&
      node.y <= zone.yMax
  );
};

export default function Header({ onTypedTextChange }) {
  // const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [graphCursor, setGraphCursor] = useState(null);
  const [visibleTechs, setVisibleTechs] = useState([]);
  const typedRef = useRef(null);
  const activeFadeZones = useMemo(() => {
    return visibleTechs
      .map((tech) => techFadeZones[tech])
      .filter(Boolean);
  }, [visibleTechs]);

  const visibleGraphNodes = useMemo(() => {
    if (!graphCursor) return graphNodes;

    return graphNodes.map((node) => {
      const dx = node.x - graphCursor.x;
      const dy = node.y - graphCursor.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance >= cursorPushRadius) return node;

      const safeDistance = distance || 0.01;
      const push = (cursorPushRadius - distance) * 0.95;

      return {
        x: node.x + (dx / safeDistance) * push,
        y: node.y + (dy / safeDistance) * push,
      };
    });
  }, [graphCursor]);

  useEffect(() => {
    if (!typedRef.current) return;

    const techMap = {
      0: 'java',
      1: 'python',
      2: 'web',
      3: 'android',
      4: 'software'
    };

    let activeTechs = [];

    const typed = new Typed(typedRef.current, {
      strings: [
        'a passionate <i>Java Application</i> Developer',
        'a passionate <i>Python</i> Application Developer',
        'an enthusiastic <i>Web</i> Developer',
        'an enthusiastic <i>Android</i> Developer',
        'a <i>Software Developer</i> at TCS',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1100,
      loop: true,
      onStringTyped: (arrayPos, self) => {
        const tech = techMap[arrayPos];
        if (tech) {
          // If it's the first one (Java), reset or start fresh. 
          // Since it loops, when arrayPos is 0, we should probably reset.
          if (arrayPos === 0) {
            activeTechs = [tech];
          } else {
            // Append if not already present (though sequential typing shouldn't duplicate in one cycle)
            if (!activeTechs.includes(tech)) {
              activeTechs.push(tech);
            }
          }
          if (onTypedTextChange) {
            onTypedTextChange([...activeTechs]);
          }
          setVisibleTechs([...activeTechs]);
        }
      },
      // Ensure we catch the very first render or reset if needed, 
      // but onStringTyped handles the completion of typing.
    });

    return () => {
      typed.destroy();
    };
  }, [onTypedTextChange]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleHeaderMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const graphWidth = rect.width * graphAreaWidth;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || x > graphWidth || y < 0 || y > rect.height) {
      setGraphCursor(null);
      return;
    }

    setGraphCursor({
      x: (x / graphWidth) * 100,
      y: (y / rect.height) * 100,
    });
  };

  return (
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${isMobile ? bgMobile : bg})` }}
      onMouseMove={handleHeaderMouseMove}
      onMouseLeave={() => setGraphCursor(null)}
    >
      <div className={styles.graphLayer} aria-hidden="true">
        <svg
          className={styles.graphSvg}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <g>
            {graphLinks.map(([from, to]) => (
              <line
                key={`${from}-${to}`}
                x1={visibleGraphNodes[from].x}
                y1={visibleGraphNodes[from].y}
                x2={visibleGraphNodes[to].x}
                y2={visibleGraphNodes[to].y}
                className={`${styles.graphLine} ${
                  isInFadedGraphZone(graphNodes[from], activeFadeZones) ||
                  isInFadedGraphZone(graphNodes[to], activeFadeZones)
                    ? styles.fadedGraphLine
                    : ""
                }`}
              />
            ))}

            {visibleGraphNodes.map((node, index) => {
              const baseNode = graphNodes[index];
              const isFaded = isInFadedGraphZone(baseNode, activeFadeZones);

              if (!baseNode.tech) {
                return (
                  <circle
                    key={index}
                    cx={node.x}
                    cy={node.y}
                    r="1.3"
                    className={`${styles.graphNode} ${
                      isFaded ? styles.fadedGraphNode : ""
                    }`}
                  />
                );
              }

              return (
                <g key={index}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="3.1"
                    className={`${styles.techNode} ${
                      isFaded ? styles.fadedTechNode : ""
                    }`}
                    style={{
                      "--tech-color": baseNode.tech.color,
                    }}
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    className={`${styles.techNodeText} ${
                      isFaded ? styles.fadedTechText : ""
                    }`}
                    fill={baseNode.tech.text}
                  >
                    {baseNode.tech.label}
                  </text>
                </g>
              );
            })}
          </g>

        </svg>
      </div>

      <nav className={styles.nav}>
        <img src={logo} className={styles.logo} alt="Logo" />
        {/* <ul className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#achievements">Achievements</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button> */}
      </nav>

      <div className={styles.text}>
        <p>I am <span ref={typedRef}></span></p>
        <h1>
          Hi, I'm <span>Utkarsh Agrawal</span>
        </h1>
      </div>
    </header>
  );
}
