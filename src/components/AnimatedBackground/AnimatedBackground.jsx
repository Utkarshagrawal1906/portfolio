import React, { memo } from 'react';
import styles from './AnimatedBackground.module.css';

const AnimatedBackground = ({ sectionId, currentTypedTech }) => {
  const renderBackground = () => {
    switch (sectionId) {
      case 'header':
        // Ensure activeTechs is an array
        const activeTechs = Array.isArray(currentTypedTech) ? currentTypedTech : [];

        return (
          <svg className={styles.animatedSvg} viewBox="0 0 100vw 100vh" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="homeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.8">
                  <animate attributeName="stop-opacity" values="0.8;1;0.8" dur="6s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#000000" stopOpacity="0.7">
                  <animate attributeName="stop-opacity" values="0.7;0.9;0.7" dur="6s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>

            <rect width="100vw" height="100vh" fill="url(#homeGradient)" />

            {/* Technology Logos that flash based on typed text - Accumulating */}

            {/* Java - Top Left */}
            {activeTechs.includes('java') && (
              <g className={styles.techLogo}>
                <circle cx="62vw" cy="80vh" r="1.6vw" fill="#ed8b00" opacity="0.5">
                  <animate attributeName="r" values="1.6vw;2vw;1.6vw" dur="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1s" repeatCount="indefinite" />
                </circle>
                <text x="62vw" y="80.35vh" textAnchor="middle" fill="white" fontSize="0.78vw" fontWeight="bold">JAVA</text>
              </g>
            )}

            {/* Python - Top Right */}
            {activeTechs.includes('python') && (
              <g className={styles.techLogo}>
                <rect x="56vw" y="47.6vh" width="3.5vw" height="3.2vw" fill="#3776ab" opacity="0.5" rx="0.8vw">
                  <animate attributeName="width" values="3.2vw;4vw;3.2vw" dur="1s" repeatCount="indefinite" />
                  <animate attributeName="height" values="3.2vw;4vw;3.2vw" dur="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1s" repeatCount="indefinite" />
                </rect>
                <text x="58vw" y="50.85vh" textAnchor="middle" fill="white" fontSize="0.82vw" fontWeight="bold">PYTHON</text>
              </g>
            )}

            {/* Web - Bottom Left */}
            {activeTechs.includes('web') && (
              <g className={styles.techLogo}>
                <rect x="58.4vw" y="23.4vh" width="3.2vw" height="3.2vw" fill="#61dafb" opacity="0.5" rx="0.8vw">
                  <animate attributeName="width" values="3.2vw;4vw;3.2vw" dur="1s" repeatCount="indefinite" />
                  <animate attributeName="height" values="3.2vw;4vw;3.2vw" dur="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1s" repeatCount="indefinite" />
                </rect>
                <text x="60vw" y="26.65vh" textAnchor="middle" fill="#282c34" fontSize="0.82vw" fontWeight="bold">WEB</text>
              </g>
            )}

            {/* Android - Bottom Right */}
            {activeTechs.includes('android') && (
              <g className={styles.techLogo}>
                <circle cx="87vw" cy="28vh" r="1.5vw" fill="#3ddc84" opacity="0.5">
                  <animate attributeName="r" values="1.5vw;2vw;1.5vw" dur="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="86.4vw" cy="27vh" r="0.3vw" fill="#ffffff" />
                <circle cx="87.6vw" cy="27vh" r="0.3vw" fill="#ffffff" />
                <path d="M86vw,26vh Q90vw,30vh 94vw,26vh" stroke="#ffffff" strokeWidth="0.5vw" fill="none" />
                <text x="87vw" y="29vh" textAnchor="middle" fill="white" fontSize="0.5vw">ANDROID</text>
                <text x="87vw" y="30vh" textAnchor="middle" fill="white" fontSize="0.4vw">DEVELOPER</text>
              </g>
            )}

            {/* Software - Center */}
            {activeTechs.includes('software') && (
              <g className={styles.techLogo}>
                <rect x="86.4vw" y="53.4vh" width="3.2vw" height="3.2vw" fill="#007acc" opacity="0.5" rx="0.8vw">
                  <animate attributeName="width" values="3.2vw;4vw;3.2vw" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="height" values="3.2vw;4vw;3.2vw" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1.5s" repeatCount="indefinite" />
                </rect>
                <text x="88.5vw" y="57.65vh" textAnchor="middle" fill="white" fontSize="0.82vw" fontWeight="bold">TCS</text>
              </g>
            )}

            {/* Floating geometric shapes - positioned for full screen width */}
            <rect x="70vw" y="40vh" width="6vw" height="6vw" fill="#ffd93d" opacity="0.3" transform="rotate(45)">
              <animate attributeName="y" values="40vh;50vh;40vh" dur="4s" repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="rotate" values="45 73vw 43vw;90 73vw 43vw;45 73vw 43vw" dur="6s" repeatCount="indefinite" />
            </rect>
            <polygon points="50vw,15vh 53vw,20vh 47vw,20vh" fill="#ff6b6b" opacity="0.3">
              <animate attributeName="points" values="50vw,15vh 53vw,20vh 47vw,20vh;50vw,18vh 53vw,23vh 47vw,23vh;50vw,15vh 53vw,20vh 47vw,20vh" dur="5s" repeatCount="indefinite" />
            </polygon>
          </svg>
        );

      case 'about':
        // Generate staircase path
        // Steps going from bottom-left to top-right
        // Each step is 10x10 units
        // Center approximate at 50,50
        // We cover a wide range to ensure no gaps during animation
        let stairsPath = "M -20 120 ";
        for (let i = 0; i < 20; i++) {
          // x starts at -20, increments by 10 each step
          // y starts at 120, decrements by 10 each step
          const x = -20 + (i * 10);
          const y = 120 - (i * 10);
          // Draw horizontal tread, then vertical riser
          stairsPath += `L ${x + 10} ${y} L ${x + 10} ${y - 10} `;
        }
        // Close the shape for solid fill (bottom-right corner)
        stairsPath += "L 200 150 L -20 150 Z";

        return (
          <svg className={styles.animatedSvg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="aboutGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.4">
                  <animate attributeName="stop-opacity" values="0.4;0.6;0.4" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
              </radialGradient>
            </defs>

            {/* Background Gradient */}
            <rect width="100" height="100" fill="url(#aboutGradient)" />

            {/* Infinite Staircase Group */}
            <g transform="translate(20, 1)">
              {/* The solid stair shape */}
              <path d={stairsPath} fill="#4ecdc4" fillOpacity="0.05" stroke="#4ecdc4" strokeWidth="0.5" strokeOpacity="0.4">
                <animateTransform attributeName="transform" type="translate" from="0 0" to="-10 10" dur="1s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Climber gaining knowledge through effort */}
            <g transform="translate(20, 1)" opacity="0.72">
              <g>
                <animateTransform attributeName="transform" type="translate" from="0 0" to="-10 10" dur="1s" repeatCount="indefinite" />

                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="45 53.9;50 53.9;50 43.9;55 43.9;60 43.9;60 33.9;65 33.9;70 33.9;70 23.9;75 23.9"
                    keyTimes="0;0.12;0.2;0.32;0.44;0.52;0.64;0.76;0.84;1"
                    dur="6s"
                    repeatCount="indefinite"
                    calcMode="linear"
                  />

                  <g transform="scale(0.48)">
                    <ellipse cx="1" cy="9" rx="5" ry="0.8" fill="#000000" opacity="0.24">
                      <animate attributeName="rx" values="5;4;4;3.5;6;4;3.5" dur="6s" repeatCount="indefinite" />
                    </ellipse>

                    <g>
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="-8;2;2;-5;5;-24;6;1;-4;0"
                        dur="6s"
                        repeatCount="indefinite"
                      />

                      <circle cx="0" cy="-10" r="2.8" fill="#ffd8a8" />
                      <path d="M-2.6,-11.4 Q0,-14 2.8,-11.6" fill="none" stroke="#2b2b2b" strokeWidth="1" strokeLinecap="round" />

                      <rect x="-3.4" y="-7" width="6.8" height="9" rx="2" fill="#4ecdc4" />
                      <path d="M-3,-4 Q-6,-4 -7,-1" stroke="#ffd8a8" strokeWidth="1.5" strokeLinecap="round" fill="none">
                        <animate
                          attributeName="d"
                          values="M-3,-4 Q-6,-4 -7,-1;M-3,-4 Q-6,-4 -7,-1;M-3,-4 Q-6,-8 -2,-11;M-3,-4 Q-2,-9 3,-12;M-3,-4 Q-2,-9 3,-12;M-3,-4 Q-6,-4 -7,-1;M-3,-4 Q-6,-8 -2,-11;M-3,-4 Q-2,-9 3,-12;M-3,-4 Q-6,-4 -7,-1;M-3,-4 Q-6,-8 -2,-11"
                          keyTimes="0;0.12;0.2;0.32;0.44;0.52;0.64;0.76;0.84;1"
                          dur="6s"
                          repeatCount="indefinite"
                          calcMode="linear"
                        />
                      </path>
                      <path d="M3,-4 Q5,-8 8,-11" stroke="#ffd8a8" strokeWidth="1.5" strokeLinecap="round" fill="none">
                        <animate
                          attributeName="d"
                          values="M3,-4 Q5,-8 8,-11;M3,-4 Q6,-6 8,-8;M3,-4 Q7,-3 6,-1;M3,-4 Q7,-3 6,-1;M3,-4 Q6,-8 9,-11;M3,-4 Q6,-8 9,-11;M3,-4 Q7,-3 6,-1;M3,-4 Q6,-7 10,-9;M3,-4 Q6,-7 10,-9;M3,-4 Q7,-3 6,-1"
                          keyTimes="0;0.12;0.2;0.32;0.44;0.52;0.64;0.76;0.84;1"
                          dur="6s"
                          repeatCount="indefinite"
                          calcMode="linear"
                        />
                      </path>
                      <circle cx="-7" cy="-1" r="0.85" fill="#ffd8a8">
                        <animate
                          attributeName="cx"
                          values="-7;-7;-2;3;3;-7;-2;3;-7;-2"
                          keyTimes="0;0.12;0.2;0.32;0.44;0.52;0.64;0.76;0.84;1"
                          dur="6s"
                          repeatCount="indefinite"
                          calcMode="linear"
                        />
                        <animate
                          attributeName="cy"
                          values="-1;-1;-11;-12;-12;-1;-11;-12;-1;-11"
                          keyTimes="0;0.12;0.2;0.32;0.44;0.52;0.64;0.76;0.84;1"
                          dur="6s"
                          repeatCount="indefinite"
                          calcMode="linear"
                        />
                      </circle>
                      <circle cx="8" cy="-11" r="0.85" fill="#ffd8a8">
                        <animate
                          attributeName="cx"
                          values="8;8;6;6;9;9;6;10;10;6"
                          keyTimes="0;0.12;0.2;0.32;0.44;0.52;0.64;0.76;0.84;1"
                          dur="6s"
                          repeatCount="indefinite"
                          calcMode="linear"
                        />
                        <animate
                          attributeName="cy"
                          values="-11;-8;-1;-1;-11;-11;-1;-9;-9;-1"
                          keyTimes="0;0.12;0.2;0.32;0.44;0.52;0.64;0.76;0.84;1"
                          dur="6s"
                          repeatCount="indefinite"
                          calcMode="linear"
                        />
                      </circle>

                      <path d="M-1,2 L-5,8" stroke="#2b8146" strokeWidth="1.7" strokeLinecap="round">
                        <animate attributeName="d" values="M-1,2 L-5,8;M-1,2 L-2,8;M-1,2 L-5,8;M-1,2 L-2,8;M-1,2 L-7,6;M-1,2 L-2,8;M-1,2 L-5,8" dur="6s" repeatCount="indefinite" />
                      </path>
                      <path d="M1,2 L4,8" stroke="#2b8146" strokeWidth="1.7" strokeLinecap="round">
                        <animate attributeName="d" values="M1,2 L4,8;M1,2 L6,6;M1,2 L4,8;M1,2 L6,6;M1,2 L3,9;M1,2 L6,6;M1,2 L4,8" dur="6s" repeatCount="indefinite" />
                      </path>

                      <circle cx="7" cy="-15" r="0.9" fill="#ffd93d">
                        <animate attributeName="opacity" values="0;0.8;0.2;1;0;0.9;0.4" dur="6s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="10" cy="-12.8" r="0.65" fill="#4ecdc4">
                        <animate attributeName="opacity" values="0.5;0;0.8;0.2;0;1;0.5" dur="6s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        );

      case 'services':
        return (
          <svg className={styles.animatedSvg} viewBox="0 0 100vw 100vh" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="servicesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.1">
                  <animate attributeName="stop-opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#000000" stopOpacity="0.15">
                  <animate attributeName="stop-opacity" values="0.15;0.25;0.15" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Energy bolts - positioned across full screen width */}
            <path d="M25vw,15vh L27vw,13vh L29vw,15vh L27vw,17vh Z" fill="#ffd93d" opacity="0.4">
              <animate attributeName="d" values="M25vw,15vh L27vw,13vh L29vw,15vh L27vw,17vh Z;M25vw,17vh L27vw,15vh L29vw,17vh L27vw,19vh Z;M25vw,15vh L27vw,13vh L29vw,15vh L27vw,17vh Z" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M70vw,35vh L72vw,33vh L74vw,35vh L72vw,37vh Z" fill="#ff6b6b" opacity="0.4">
              <animate attributeName="d" values="M70vw,35vh L72vw,33vh L74vw,35vh L72vw,37vh Z;M70vw,37vh L72vw,35vh L74vw,37vh L72vw,39vh Z;M70vw,35vh L72vw,33vh L74vw,35vh L72vw,37vh Z" dur="2.5s" repeatCount="indefinite" />
            </path>
            <rect width="100vw" height="100vh" fill="url(#servicesGradient)" />
          </svg>
        );

      case 'portfolio':
        return (
          <svg className={styles.animatedSvg} viewBox="0 0 100vw 100vh" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="portfolioGradient" cx="30%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.1">
                  <animate attributeName="stop-opacity" values="0.1;0.25;0.1" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
              </radialGradient>
            </defs>
            {/* Floating art elements - positioned across full screen width */}
            <ellipse cx="12vw" cy="20vh" rx="5vw" ry="3vh" fill="#ffd93d" opacity="0.3" transform="rotate(-15)">
              <animateTransform attributeName="transform" type="rotate" values="-15 12vw 20vh;-45 12vw 20vh;-15 12vw 20vh" dur="6s" repeatCount="indefinite" />
            </ellipse>
            <rect x="75vw" y="60vh" width="8vw" height="5vh" fill="#a8e6cf" opacity="0.2" rx="1vw">
              <animate attributeName="x" values="75vw;80vw;75vw" dur="5s" repeatCount="indefinite" />
              <animate attributeName="y" values="60vh;55vh;60vh" dur="5s" repeatCount="indefinite" />
            </rect>
            <circle cx="50vw" cy="35vh" r="4vw" fill="#ff6b6b" opacity="0.2">
              <animate attributeName="r" values="4vw;6vw;4vw" dur="4s" repeatCount="indefinite" />
            </circle>
            <rect width="100vw" height="100vh" fill="url(#portfolioGradient)" />
          </svg>
        );

      case 'contact':
        return (
          <svg className={styles.animatedSvg} viewBox="0 0 100vw 100vh" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.8">
                  <animate attributeName="stop-opacity" values="0.8;0.95;0.8" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#313131" stopOpacity="0.6">
                  <animate attributeName="stop-opacity" values="0.6;0.85;0.6" dur="4s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            {/* Communication signals - positioned across full screen width */}
            <path d="M15vw,25vh Q25vw,15vh Q35vw,25vh Q25vw,35vh Q15vw,25vh" stroke="#667eea" strokeWidth="2" fill="none" opacity="0.4">
              <animate attributeName="d" values="M15vw,25vh Q25vw,15vh Q35vw,25vh Q25vw,35vh Q15vw,25vh;M15vw,27vh Q25vw,17vh Q35vw,27vh Q25vw,37vh Q15vw,27vh;M15vw,25vh Q25vw,15vh Q35vw,25vh Q25vw,35vh Q15vw,25vh" dur="3s" repeatCount="indefinite" />
            </path>
            <circle cx="70vw" cy="15vh" r="2vw" fill="#764ba2" opacity="0.3">
              <animate attributeName="r" values="2vw;3vw;2vw" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="15vh;18vh;15vh" dur="2s" repeatCount="indefinite" />
            </circle>
            <rect x="40vw" cy="60vh" width="6vw" height="4vh" fill="#ffd93d" opacity="0.2" rx="1.5vw">
              <animate attributeName="width" values="6vw;9vw;6vw" dur="3.5s" repeatCount="indefinite" />
            </rect>
            <rect width="100vw" height="100vh" fill="url(#contactGradient)" />
          </svg>
        );

      case 'achievements':
        return (
          <svg className={styles.animatedSvg} viewBox="0 0 100vw 100vh" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="achievementsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#020617" stopOpacity="0.88" />
                <stop offset="55%" stopColor="#0f172a" stopOpacity="0.76" />
                <stop offset="100%" stopColor="#111827" stopOpacity="0.82" />
              </linearGradient>
            </defs>
            <rect width="100vw" height="100vh" fill="url(#achievementsGradient)" />
            <path d="M8vw,24vh C24vw,10vh 38vw,42vh 56vw,25vh S82vw,16vh 94vw,36vh" stroke="#7dd3fc" strokeWidth="2" strokeOpacity="0.16" fill="none">
              <animate attributeName="d" values="M8vw,24vh C24vw,10vh 38vw,42vh 56vw,25vh S82vw,16vh 94vw,36vh;M8vw,29vh C24vw,14vh 38vw,36vh 56vw,31vh S82vw,10vh 94vw,40vh;M8vw,24vh C24vw,10vh 38vw,42vh 56vw,25vh S82vw,16vh 94vw,36vh" dur="7s" repeatCount="indefinite" />
            </path>
            <path d="M6vw,76vh C22vw,60vh 38vw,80vh 52vw,64vh S80vw,56vh 96vw,72vh" stroke="#f3bd55" strokeWidth="2" strokeOpacity="0.14" fill="none">
              <animate attributeName="d" values="M6vw,76vh C22vw,60vh 38vw,80vh 52vw,64vh S80vw,56vh 96vw,72vh;M6vw,70vh C22vw,66vh 38vw,74vh 52vw,68vh S80vw,50vh 96vw,78vh;M6vw,76vh C22vw,60vh 38vw,80vh 52vw,64vh S80vw,56vh 96vw,72vh" dur="8s" repeatCount="indefinite" />
            </path>
            <circle cx="18vw" cy="36vh" r="2vw" fill="#7dd3fc" opacity="0.12">
              <animate attributeName="r" values="2vw;3.4vw;2vw" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="82vw" cy="22vh" r="2.5vw" fill="#f3bd55" opacity="0.1">
              <animate attributeName="r" values="2.5vw;4vw;2.5vw" dur="5s" repeatCount="indefinite" />
            </circle>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.backgroundContainer}>
      {renderBackground()}
    </div>
  );
};

export default memo(AnimatedBackground);
