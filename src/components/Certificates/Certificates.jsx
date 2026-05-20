import { useMemo, useState } from "react";
import styles from "./Certificates.module.css";

const certificateModules = import.meta.glob(
  "../../assets/certificates/*.{pdf,png,jpg,jpeg}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const prettifyFileName = (path) => {
  const fileName = path.split("/").pop() || "Certificate";
  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const certificates = Object.entries(certificateModules)
  .map(([path, url]) => {
    const extension = path.split(".").pop()?.toLowerCase() || "";
    const isPdf = extension === "pdf";

    return {
      title: prettifyFileName(path),
      url,
      extension,
      type: isPdf ? "pdf" : "image",
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

const filters = [
  { id: "all", label: "All" },
  { id: "image", label: "Images" },
  { id: "pdf", label: "PDFs" },
];

export default function Certificates() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleCertificates = useMemo(() => {
    if (activeFilter === "all") return certificates;
    return certificates.filter((certificate) => certificate.type === activeFilter);
  }, [activeFilter]);

  const imageCount = certificates.filter((certificate) => certificate.type === "image").length;
  const pdfCount = certificates.filter((certificate) => certificate.type === "pdf").length;

  return (
    <section id="certificates" className={styles.certificates}>
      <div className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Verified Learning</p>
          <h1>Certificates Showcase</h1>
          <p className={styles.heroText}>
            My gallery for professional credentials, awards, cloud badges,
            learning milestones, and proof of hands-on growth across technologies.
          </p>
        </div>

        <div className={styles.summary} aria-label="Certificate summary">
          <div className={styles.summaryItem}>
            <strong>{certificates.length}</strong>
            <span>Total certificates</span>
          </div>
          <div className={styles.summaryItem}>
            <strong>{imageCount}</strong>
            <span>Image files</span>
          </div>
          <div className={styles.summaryItem}>
            <strong>{pdfCount}</strong>
            <span>PDF files</span>
          </div>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.filters} aria-label="Certificate filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`${styles.filterButton} ${
                activeFilter === filter.id ? styles.activeFilter : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p className={styles.counter}>
          Showing {visibleCertificates.length} of {certificates.length}
        </p>
      </div>

      {visibleCertificates.length > 0 ? (
        <div className={styles.grid}>
          {visibleCertificates.map((certificate) => (
            <article
              key={certificate.url}
              className={`${styles.card} ${styles[certificate.type]}`}
            >
              <div className={styles.preview}>
                {/* <span className={styles.fileBadge}>
                  <i
                    className={
                      certificate.type === "pdf"
                        ? ""
                        : "fa-solid fa-image"
                    }
                  ></i>
                  {certificate.extension}
                </span> */}

                {certificate.type === "pdf" ? (
                  <object
                    className={styles.pdfFrame}
                    data={`${certificate.url}#toolbar=0&navpanes=0`}
                    type="application/pdf"
                    aria-label={`${certificate.title} PDF preview`}
                  >
                    <a href={certificate.url}>Open {certificate.title}</a>
                  </object>
                ) : (
                  <img src={certificate.url} alt={certificate.title} loading="lazy" />
                )}
              </div>

              <div className={styles.content}>
                <h2>{certificate.title}</h2>
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
        <div className={styles.emptyState}>
          <div>
            <i className="fa-solid fa-award"></i>
            <h2>Certificates Coming Soon</h2>
            <p>Your credentials will shine here.</p>
          </div>
        </div>
      )}
    </section>
  );
}
