import { useMemo, useState } from "react";
import styles from "./Certificates.module.css";
import certificates from "../../data/certificates";

const certificatesPerPage = 6;

const filters = [
  { id: "all", label: "All" },
  { id: "image", label: "Images" },
  { id: "pdf", label: "PDFs" },
];

const imageCount = certificates.filter((certificate) => certificate.type === "image").length;
const pdfCount = certificates.filter((certificate) => certificate.type === "pdf").length;

export default function Certificates() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [pageIndex, setPageIndex] = useState(0);

  const filteredCertificates = useMemo(() => {
    if (activeFilter === "all") return certificates;
    return certificates.filter((certificate) => certificate.type === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCertificates.length / certificatesPerPage));
  const currentPageIndex = Math.min(pageIndex, totalPages - 1);
  const visibleCertificates = filteredCertificates.slice(
    currentPageIndex * certificatesPerPage,
    currentPageIndex * certificatesPerPage + certificatesPerPage
  );
  const firstVisible = filteredCertificates.length ? currentPageIndex * certificatesPerPage + 1 : 0;
  const lastVisible = Math.min(
    (currentPageIndex + 1) * certificatesPerPage,
    filteredCertificates.length
  );
  const canGoBackward = currentPageIndex > 0;
  const canGoForward = currentPageIndex < totalPages - 1;

  const goBackward = () => {
    setPageIndex((currentPage) => Math.max(0, currentPage - 1));
  };

  const goForward = () => {
    setPageIndex((currentPage) => Math.min(totalPages - 1, currentPage + 1));
  };

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
              onClick={() => {
                setActiveFilter(filter.id);
                setPageIndex(0);
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className={styles.pager} aria-label="Certificate navigation">
          <p className={styles.counter}>
            Showing {firstVisible}-{lastVisible} of {filteredCertificates.length}
          </p>
          <div className={styles.pagerButtons}>
            <button
              type="button"
              className={styles.navButton}
              onClick={goBackward}
              disabled={!canGoBackward}
              aria-label="Show previous certificates"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <span className={styles.pageIndicator}>
              {currentPageIndex + 1} / {totalPages}
            </span>
            <button
              type="button"
              className={styles.navButton}
              onClick={goForward}
              disabled={!canGoForward}
              aria-label="Show next certificates"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
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
