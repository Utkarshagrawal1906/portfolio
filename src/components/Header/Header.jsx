import styles from "./Header.module.css";
import bg from "../../assets/background.png";
import logo from "../../assets/Logo.jpeg";
import { useState, useRef, useEffect } from "react";
import Typed from "typed.js";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const typedRef = useRef(null);

  useEffect(() => {
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: [
        'a passionate <i>Java Application</i> Developer',
        'a passionate <i>Python</i> Application Developer',
        'an enthusiastic <i>Web</i> Developer',
        'an enthusiastic <i>Android</i> Developer',
        'a <i>Software Developer</i> at Cognizant',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1100,
      loop: true,
      smartBackspace: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <nav className={styles.nav}>
        <img src={logo} className={styles.logo} alt="Logo" />
        <ul className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
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