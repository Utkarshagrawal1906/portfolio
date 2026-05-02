import styles from "./Project.module.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import projects from "../../data/projects";

const maxVisibleImages = 3;
const slideDuration = 450;

export default function Project() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  const animationFrameRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const [startImageIndex, setStartImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);
  const [isSliding, setIsSliding] = useState(false);
  const [previewDirection, setPreviewDirection] = useState(null);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      clearTimeout(animationTimeoutRef.current);
    };
  }, []);

  if (!project) {
    return (
      <section className={styles.notFound}>
        <h2>Project not found</h2>
        <Link to="/">Back to portfolio</Link>
      </section>
    );
  }

  const imageCount = project.images.length;
  const visibleImageCount = Math.min(maxVisibleImages, imageCount);
  const canNavigateImages = imageCount > 1;

  const getImageAt = (index) => {
    return project.images[(index + imageCount) % imageCount];
  };

  const trackStartIndex =
    slideDirection === "previous" ? startImageIndex - 1 : startImageIndex;

  const visibleImages = Array.from(
    { length: canNavigateImages ? visibleImageCount + 1 : visibleImageCount },
    (_, offset) => getImageAt(trackStartIndex + offset)
  );

  const previewImage =
    previewDirection === "previous"
      ? getImageAt(startImageIndex - 1)
      : previewDirection === "next"
        ? getImageAt(startImageIndex + visibleImageCount)
        : null;
  const visibleEndImageIndex = Math.min(startImageIndex + visibleImageCount, imageCount);

  const moveImages = (direction) => {
    if (!canNavigateImages || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    setPreviewDirection(null);
    setSlideDirection(direction);
    setIsSliding(false);

    animationFrameRef.current = requestAnimationFrame(() => {
      setIsSliding(true);
    });

    animationTimeoutRef.current = setTimeout(() => {
      setStartImageIndex((currentIndex) => {
        if (direction === "previous") {
          return (currentIndex - 1 + imageCount) % imageCount;
        }

        return (currentIndex + 1) % imageCount;
      });
      setIsSliding(false);
      setSlideDirection(null);
      isAnimatingRef.current = false;
    }, slideDuration);
  };

  const prevImage = () => moveImages("previous");

  const nextImage = () => moveImages("next");

  return (
    <section className={styles.project}>
      <Link to="/" className={styles.backTop}>← Back to Portfolio</Link>
      
      <h1 className={styles.centeredTitle}>{project.title}</h1>

      {project.external && (
        <div className={styles.externalSection}>
          <a href={project.external} target="_blank" rel="noreferrer" className={styles.external}>View Live Project</a>
          <p className={styles.externalDesc}>Check out the live version of this project</p>
        </div>
      )}

      <div className={styles.largeGallery}>
        {previewImage && !isSliding && (
          <div
            className={`${styles.previewImage} ${
              previewDirection === "previous"
                ? styles.previousPreview
                : styles.nextPreview
            }`}
            aria-hidden="true"
          >
            <img src={previewImage} alt="" />
          </div>
        )}

        {canNavigateImages && (
          <button
            className={styles.navButton}
            onClick={prevImage}
            onMouseEnter={() => setPreviewDirection("previous")}
            onMouseLeave={() => setPreviewDirection(null)}
            onFocus={() => setPreviewDirection("previous")}
            onBlur={() => setPreviewDirection(null)}
            aria-label="Show previous project image"
          >
            ‹
          </button>
        )}

        <div className={styles.galleryViewport}>
          <div
            className={`${styles.galleryTrack} ${
              slideDirection === "previous" ? styles.trackPrevious : ""
            } ${isSliding ? styles.trackSliding : ""}`}
            style={{
              "--visible-images": visibleImageCount,
              "--track-images": visibleImages.length,
            }}
          >
            {visibleImages.map((image, index) => (
              <div className={styles.imageCard} key={`${image}-${index}`}>
                <img
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {canNavigateImages && (
          <button
            className={styles.navButton}
            onClick={nextImage}
            onMouseEnter={() => setPreviewDirection("next")}
            onMouseLeave={() => setPreviewDirection(null)}
            onFocus={() => setPreviewDirection("next")}
            onBlur={() => setPreviewDirection(null)}
            aria-label="Show next project image"
          >
            ›
          </button>
        )}

        {canNavigateImages && (
          <div className={styles.imageCounter}>
            {visibleEndImageIndex} / {imageCount}
          </div>
        )}
      </div>

      <div className={styles.fullDescription}>
        <h3>Project Details</h3>
        <p>{project.description}</p>
        <p>More detailed description can be added here. You can extend the `projects` data file to include long descriptions, tech stack, screenshots and links.</p>
      </div>
    </section>
  );
}
