import styles from "./Project.module.css";
import { useParams, Link } from "react-router-dom";
import projects from "../../data/projects";

export default function Project() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <section className={styles.notFound}>
        <h2>Project not found</h2>
        <Link to="/">Back to portfolio</Link>
      </section>
    );
  }

  return (
    <section className={styles.project}>
      <div className={styles.header} style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${project.images[0]})`}}>
        <div className={styles.headerInner}>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          {project.external && (
            <a href={project.external} target="_blank" rel="noreferrer" className={styles.external}>Open external</a>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.gallery}>
          {project.images.map((img, idx) => (
            <img key={idx} src={img} alt={`${project.title} ${idx+1}`} />
          ))}
        </div>

        <div className={styles.details}>
          <h3>Project Details</h3>
          <p>{project.description}</p>
          <p>More detailed description can be added here. You can extend the `projects` data file to include long descriptions, tech stack, screenshots and links.</p>
          <Link to="/" className={styles.back}>← Back to Portfolio</Link>
        </div>
      </div>
    </section>
  );
}
