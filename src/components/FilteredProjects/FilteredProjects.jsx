import styles from "./FilteredProjects.module.css";
import { useParams, Link } from "react-router-dom";
import projects from "../../data/projects";

export default function FilteredProjects() {
  const { category } = useParams();

  // Map URL params to tag names
  const tagMapping = {
    web: "web",
    android: "android",
    desktop: "desktop application"
  };

  const tagName = tagMapping[category];

  const filteredProjects = projects.filter(project =>
    project.tags && project.tags.includes(tagName)
  );

  const getCategoryTitle = (cat) => {
    switch(cat) {
      case 'web': return 'Web Development Projects';
      case 'android': return 'Android App Projects';
      case 'desktop': return 'Desktop Application Projects';
      default: return 'Projects';
    }
  };

  return (
    <section className={styles.filteredProjects}>
      <Link to="/" className={styles.backHome}>← Back to Home</Link>

      <h1 className={styles.title}>{getCategoryTitle(category)}</h1>

      <div className={styles.grid}>
        {filteredProjects.map((project) => (
          <Link key={project.slug} to={`/projects/${project.slug}`} className={styles.cardLink}>
            <div className={styles.card}>
              <img src={project.images[0]} alt={project.title} />
              <div className={styles.overlay}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.tags && (
                  <div className={styles.tags}>
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                )}
                {project.external && project.external !== "#" && (
                  <a href={project.external} target="_blank" rel="noreferrer">🔍</a>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className={styles.noProjects}>No projects found in this category.</p>
      )}
    </section>
  );
}