import styles from "./FilteredProjects.module.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import projects from "../../data/projects";
import certificates from "../../data/certificates";
import services from "../../data/services";

const getRelatedCertificates = (keywords) => {
  return certificates.filter((certificate) =>
    keywords.some((keyword) => certificate.searchText.includes(keyword.toLowerCase()))
  );
};

export default function FilteredProjects() {
  const { category } = useParams();
  const service = services.find((item) => item.slug === category);

  if (!service) {
    return (
      <section className={styles.filteredProjects}>
        <Link to="/" className={styles.backHome}>
          <i className="fa-solid fa-arrow-left"></i>
          Back to Home
        </Link>
        <div className={styles.emptyState}>
          <h1>Service Not Found</h1>
          <p>This service page does not exist yet.</p>
        </div>
      </section>
    );
  }

  const filteredProjects = projects.filter((project) =>
    project.tags?.some((tag) => service.projectTags.includes(tag))
  );
  const relatedCertificates = getRelatedCertificates(service.certificateKeywords);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const gridRef = useRef(null);
  const projectGridRef = useRef(null);
  const [certColumns, setCertColumns] = useState(1);
  const [projColumns, setProjColumns] = useState(1);

  useEffect(() => {
    const updateLayout = () => {
      setIsMobile(window.innerWidth <= 600);
      const grid = gridRef.current;
      if (grid) {
        const cols = getComputedStyle(grid).gridTemplateColumns
          .split(" ")
          .filter(Boolean).length;
        setCertColumns(cols || 1);
      }

      const projGrid = projectGridRef.current;
      if (projGrid) {
        const pcols = getComputedStyle(projGrid).gridTemplateColumns
          .split(" ")
          .filter(Boolean).length;
        setProjColumns(pcols || 1);
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // Show two visible rows worth of certificates based on current columns
  const visibleCertificateCount = Math.max(1, certColumns) * 2;
  const visibleRelatedCertificates = relatedCertificates.slice(0, visibleCertificateCount);

  const visibleProjectCount = Math.max(1, projColumns) * 2;
  const visibleFilteredProjects = filteredProjects.slice(0, visibleProjectCount);

  return (
    <section className={styles.filteredProjects}>
      <Link to="/" className={styles.backHome}>
        <i className="fa-solid fa-arrow-left"></i>
        Back to Home
      </Link>

      <div className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Service Focus</p>
          <h1>{service.title}</h1>
          <p>{service.desc}</p>
        </div>

        <div className={styles.summary} aria-label={`${service.title} summary`}>
          <div className={styles.summaryItem}>
            <strong>{filteredProjects.length}</strong>
            <span>Related projects</span>
          </div>
          <div className={styles.summaryItem}>
            <strong>{relatedCertificates.length}</strong>
            <span>Certificates</span>
          </div>
          <div className={styles.summaryItem}>
            <strong>{service.skills.length}</strong>
            <span>Skills</span>
          </div>
        </div>
      </div>

      <section className={styles.sectionBlock} aria-labelledby="service-projects">
        <div className={styles.sectionHeader}>
          <h2 id="service-projects">Projects</h2>
          <span>{filteredProjects.length}</span>
        </div>

        {filteredProjects.length > 0 ? (
          <div className={styles.projectGrid} ref={projectGridRef}>
            {visibleFilteredProjects.map((project) => (
              <Link key={project.slug} to={`/projects/${project.slug}`} className={styles.cardLink}>
                <article className={styles.projectCard}>
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className={styles.cardContent}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {project.tags && (
                      <div className={styles.tags}>
                        {project.tags.map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.noProjects}>No projects found in this service yet.</p>
        )}
      </section>

      <section className={styles.sectionBlock} aria-labelledby="service-skills">
        <div className={styles.sectionHeader}>
          <h2 id="service-skills">Skills</h2>
          <span>{service.skills.length}</span>
        </div>

        <div className={styles.skillGrid}>
          {service.skills.map((skill) => (
            <span key={skill} className={styles.skillPill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.sectionBlock} aria-labelledby="service-certificates">
        <div className={styles.sectionHeader}>
          <h2 id="service-certificates">Certificates</h2>
          <span>{relatedCertificates.length}</span>
        </div>

        {relatedCertificates.length > 0 ? (
          <div className={styles.certificateGrid} ref={gridRef}>
            {visibleRelatedCertificates.map((certificate) => (
              <article key={certificate.url} className={styles.certificateCard}>
                <div className={styles.certificatePreview}>
                  {certificate.type === "pdf" ? (
                    isMobile ? (
                      <div className={styles.pdfPreview} aria-label={`${certificate.title} PDF`}>
                        <i className="fa-solid fa-file-pdf"></i>
                        <span>{certificate.extension}</span>
                      </div>
                    ) : (
                      <object
                        className={styles.pdfFrame}
                        data={`${certificate.url}#toolbar=0&navpanes=0`}
                        type="application/pdf"
                        aria-label={`${certificate.title} PDF preview`}
                      >
                        <a href={certificate.url}>Open {certificate.title}</a>
                      </object>
                    )
                  ) : (
                    <img
                      src={certificate.url}
                      alt={certificate.title}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h3>{certificate.title}</h3>
                  <a
                    className={styles.openButton}
                    href={certificate.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-solid fa-up-right-from-square"></i>
                    Open
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.noProjects}>No matching certificates found for this service yet.</p>
        )}
      </section>
    </section>
  );
}
