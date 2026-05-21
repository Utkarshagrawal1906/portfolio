import styles from "./Services.module.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import services from "../../data/services";

const desktopVisibleCount = 3;
const slideDuration = 450;

export default function Services() {
  const cardRefs = useRef([]);
  const animationFrameRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const [startIndex, setStartIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);
  const [isSliding, setIsSliding] = useState(false);
  const [previewDirection, setPreviewDirection] = useState(null);
  const [visibleCount, setVisibleCount] = useState(desktopVisibleCount);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 560px)");
    const updateVisibleCount = () => {
      setVisibleCount(mediaQuery.matches ? 1 : desktopVisibleCount);
    };

    updateVisibleCount();
    mediaQuery.addEventListener("change", updateVisibleCount);

    return () => {
      mediaQuery.removeEventListener("change", updateVisibleCount);
      cancelAnimationFrame(animationFrameRef.current);
      clearTimeout(animationTimeoutRef.current);
    };
  }, []);

  const getServiceAt = (index) => {
    const serviceIndex = (index + services.length) % services.length;
    return {
      ...services[serviceIndex],
      serviceIndex,
    };
  };

  const trackStartIndex =
    slideDirection === "previous" ? startIndex - 1 : startIndex;

  const visibleServices = Array.from({ length: visibleCount + 1 }, (_, offset) => {
    return getServiceAt(trackStartIndex + offset);
  });

  const previewService =
    previewDirection === "previous"
      ? getServiceAt(startIndex - 1)
      : previewDirection === "next"
        ? getServiceAt(startIndex + visibleCount)
        : null;

  const moveServices = (direction) => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    setPreviewDirection(null);
    setSlideDirection(direction);
    setIsSliding(false);

    animationFrameRef.current = requestAnimationFrame(() => {
      setIsSliding(true);
    });

    animationTimeoutRef.current = setTimeout(() => {
      setStartIndex((currentIndex) => {
        if (direction === "previous") {
          return (currentIndex - 1 + services.length) % services.length;
        }

        return (currentIndex + 1) % services.length;
      });
      setIsSliding(false);
      setSlideDirection(null);
      isAnimatingRef.current = false;
    }, slideDuration);
  };

  const showPreviousServices = () => moveServices("previous");

  const showNextServices = () => {
    moveServices("next");
  };

  const featuredCardIndex =
    visibleCount === 1
      ? 0
      : slideDirection === "next"
        ? visibleCount - 1
        : Math.floor(visibleCount / 2);

  const getCardScale = (index, isHovering = false) => {
    if (index === featuredCardIndex) {
      return isHovering ? 1.12 : 1.08;
    }

    return isHovering ? 1.05 : 1;
  };

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${getCardScale(index, true)})`;
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    card.style.transform = `rotateX(0deg) rotateY(0deg) scale(${getCardScale(index)})`;
  };

  return (
    <section id="services">
      <div className={styles.container}>
        <h1 className={styles.subtitle}>My Services</h1>

        <div className={styles.carousel}>
          {previewService && !isSliding && (
            <div
              className={`${styles.previewCard} ${
                previewDirection === "previous"
                  ? styles.previousPreview
                  : styles.nextPreview
              }`}
              aria-hidden="true"
            >
              <i className={previewService.icon}></i>
              <h2>{previewService.title}</h2>
            </div>
          )}

          <button
            type="button"
            className={styles.navButton}
            onClick={showPreviousServices}
            onMouseEnter={() => setPreviewDirection("previous")}
            onMouseLeave={() => setPreviewDirection(null)}
            onFocus={() => setPreviewDirection("previous")}
            onBlur={() => setPreviewDirection(null)}
            aria-label="Show previous services"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className={styles.servicesViewport}>
            <div
              className={`${styles.servicesTrack} ${
                slideDirection === "previous" ? styles.trackPrevious : ""
              } ${isSliding ? styles.trackSliding : ""}`}
              style={{
                "--visible-services": visibleCount,
                "--track-services": visibleServices.length,
              }}
            >
              {visibleServices.map((service, index) => (
                <Link
                  to={`/services/${service.slug}`}
                  key={`${service.title}-${service.serviceIndex}-${index}`}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`${styles.cardLink} ${styles.card} ${
                    index === featuredCardIndex ? styles.middleCard : ""
                  } ${index < featuredCardIndex ? styles.previousCard : ""} ${
                    index > featuredCardIndex ? styles.nextCard : ""
                  }`}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <i className={service.icon}></i>
                  <h2>{service.title}</h2>
                  <p>{service.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={styles.navButton}
            onClick={showNextServices}
            onMouseEnter={() => setPreviewDirection("next")}
            onMouseLeave={() => setPreviewDirection(null)}
            onFocus={() => setPreviewDirection("next")}
            onBlur={() => setPreviewDirection(null)}
            aria-label="Show next services"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
