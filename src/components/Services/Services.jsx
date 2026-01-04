import styles from "./Services.module.css";

export default function Services() {
  return (
    <section id="services">
      <div className={styles.container}>
        <h1 className={styles.subtitle}>My Services</h1>

        <div className={styles.services}>
          <div className={styles.card}>
            <i className="fa-solid fa-globe"></i>
            <h2>Web Development</h2>
            <p>Developed various websites using modern technologies.</p>
          </div>

          <div className={styles.card}>
            <i className="fa-brands fa-android"></i>
            <h2>App Development</h2>
            <p>Developed Android apps using Java and Kotlin.</p>
          </div>

          <div className={styles.card}>
            <i className="fa-solid fa-desktop"></i>
            <h2>Desktop Applications</h2>
            <p>Built desktop tools using Java & Python.</p>
          </div>
        </div>
      </div>
    </section>
  );
}