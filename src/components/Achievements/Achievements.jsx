import styles from "./Achievements.module.css";

const achievementStats = [
  { value: "100%", label: "Tution Fees Scholarship in B.tech" },
  { value: "Finalist", label: "RoboGuru Global Coding Challenge 2018" },
  { value: "3 Rank", label: "Kiccks-Di-Hackks CSIT Department" },
  { value: "65 Global Rank", label: "Leetcode Bi-weekly Contest 165" },
];

const achievements = [
  {
    title: "Raising the Bar Award",
    period: "Cognizant - American Express",
    accent: "impact",
    icon: "fa-solid fa-award",
    summary:
      "Received this Award in (2025) for consistently delivering high-quality code/solutions",
    signal: "Upgrading the Standards",
  },
 {
    title: "5 Star Rating",
    period: "Cognizant",
    accent: "leadership",
    icon: "fa-solid fa-star",
    summary:
      "Received this Full Star Rating in (2026) for consistently innovative ideas with minimal Supervision and Showing strong leadership skills.",
    signal: "Excellent Performance",
  },
  {
    title: "Generative AI",
    period: "GenAI Professional",
    accent: "ai",
    icon: "fa-solid fa-robot",
    summary:
      "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
    signal: "Enterprise AI",
  },
  {
    title: "Published Android utility experience",
    period: "Sanskrit-Hindi-English Dictionary",
    accent: "product",
    icon: "fa-brands fa-google-play",
    summary:
      "Built and released an Android app on PlayStore, Downloads from 35+ countries and 4.9 rating on Play Store.",
    signal: "Public release",
  },
  {
    title: "Cloud Practitioner",
    period: "Amazon Web Services",
    accent: "cloud",
    icon: "fa-solid fa-cloud",
    summary:
      "AWS Certified Cloud Practitioner certification in 2024, demonstrating foundational cloud knowledge and skills.",
    signal: "Cloud",
  },
  {
    title: "99.4 Percentile at Chess.com",
    period: "Chess.com",
    accent: "craft",
    icon: "fa-solid fa-chess",
    summary:
      "2004 rating at Blitz, 1844 at Rapid and 1777 at Bullet, showcasing strategic thinking and problem-solving skills.",
    signal: "Strategic Thinker",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className={styles.achievements}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Milestones</p>
        <h2>Achievements</h2>
        <p className={styles.intro}>
          A compact map of the work that best represents my engineering impact,
          leadership, product thinking, and consistency as a builder.
        </p>
      </div>

      <div className={styles.statsGrid}>
        {achievementStats.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.showcase}>
        <div className={styles.timeline} aria-hidden="true">
          {achievements.map((achievement, index) => (
            <span
              key={achievement.title}
              className={`${styles.timelineNode} ${styles[achievement.accent]}`}
              style={{ "--node-index": index }}
            />
          ))}
        </div>

        <div className={styles.cards}>
          {achievements.map((achievement, index) => (
            <article
              className={`${styles.card} ${styles[achievement.accent]}`}
              key={achievement.title}
              style={{ "--card-index": index }}
            >
              <div className={styles.cardTop}>
                <span className={styles.icon}>
                  <i className={achievement.icon}></i>
                </span>
                <span className={styles.signal}>{achievement.signal}</span>
              </div>
              <h3>{achievement.title}</h3>
              <p className={styles.period}>{achievement.period}</p>
              <p>{achievement.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
