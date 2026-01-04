import styles from "./Portfolio.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import projects from "../../data/projects";

const visibleCount = 6; // number of projects visible before "See More"

export default function Portfolio() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="portfolio" className={styles.portfolio}>
      <h2 className={styles.title}>Portfolio</h2>

      <div className={styles.grid}>
        {projects.slice(0, visibleCount).map((project) => (
          <Link key={project.slug} to={`/projects/${project.slug}`} className={styles.cardLink}>
            <div className={styles.card}>
              <img src={project.images[0]} alt={project.title} />
              <div className={styles.overlay}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.external && project.external !== "#" && (
                  <a href={project.external} target="_blank" rel="noreferrer">🔗</a>
                )}
              </div>
            </div>
          </Link>
        ))}

        {showMore && projects.slice(visibleCount).map((project) => (
          <Link key={project.slug} to={`/projects/${project.slug}`} className={styles.cardLink}>
            <div className={styles.card}>
              <img src={project.images[0]} alt={project.title} />
              <div className={styles.overlay}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.external && project.external !== "#" && (
                  <a href={project.external} target="_blank" rel="noreferrer">🔗</a>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button className={styles.moreBtn} onClick={() => setShowMore(s => !s)}>
        {showMore ? "See Less" : "See More"}
      </button>
    </section>
  );
}