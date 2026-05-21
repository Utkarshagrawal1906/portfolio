import styles from "./Portfolio.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import projects from "../../data/projects";

const visibleCount = 6; // number of projects visible before "See More"

function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className={styles.cardLink}>
      <div className={styles.card}>
        <img src={project.images[0]} alt={project.title} />
        <div className={styles.overlay}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {project.external && project.external !== "#" && (
            <a href={project.external} target="_blank" rel="noreferrer">🔍</a>
          )}
        </div>
      </div>
    </Link>
  );
}

const projectsByYear = projects.reduce((groups, project) => {
  const year = project.year || "Other";
  return {
    ...groups,
    [year]: [...(groups[year] || []), project],
  };
}, {});

const projectYears = Object.keys(projectsByYear).sort((a, b) => Number(a) - Number(b));

export default function Portfolio() {
  const [showMore, setShowMore] = useState(false);
  const previewProjects = projects.slice(0, visibleCount);

  return (
    <section id="portfolio" className={styles.portfolio}>
      <h2 className={styles.title}>Portfolio</h2>

      {!showMore ? (
        <div className={styles.grid}>
          {previewProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className={styles.yearGroups}>
          {projectYears.map((year) => (
            <div key={year} className={styles.yearSection}>
              <h3 className={styles.yearTitle}>{year}</h3>
              <div className={styles.yearGrid}>
                {projectsByYear[year].map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <button className={styles.moreBtn} onClick={() => setShowMore(s => !s)}>
        {showMore ? "See Less" : "See More"}
      </button>
    </section>
  );
}
