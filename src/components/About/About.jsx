import styles from "./About.module.css";
import { useState } from "react";
import { playSound } from "../../utils/gameUtils";

import profile from "../../assets/profile.png";

export default function About() {
  const [activeTab, setActiveTab] = useState("skills");
  const [pageTurn, setPageTurn] = useState(0);

  const changeTab = (tab) => {
    if (tab === activeTab) return;

    playSound('pageFlip');
    setActiveTab(tab);
    setPageTurn((turn) => turn + 1);
  };

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col1}>
            <img src={profile} alt="Utkarsh profile" loading="lazy" decoding="async" />
          </div>

          <div className={styles.col2}>
            <h2 className={styles.title}>About Me</h2>
            <p className={styles.lead}>Hi everyone, I am an enthusiastic software engineer with big vision. Continuously moving towards innovation, creating solutions and contributing to the betterment of the world around me.</p>

            <div className={styles.tabTitles}>
              <button className={`${styles.tab} ${activeTab === 'skills' ? styles.active : ''}`} onClick={() => changeTab('skills')}>Skills</button>
              <button className={`${styles.tab} ${activeTab === 'experience' ? styles.active : ''}`} onClick={() => changeTab('experience')}>Experience</button>
              <button className={`${styles.tab} ${activeTab === 'education' ? styles.active : ''}`} onClick={() => changeTab('education')}>Education</button>
            </div>

            <div className={styles.content}>
              <div key={pageTurn} className={styles.bookPage}>
                {activeTab === 'skills' && (
                  <dl>
                    <dt>Java</dt>
                    <dd>Desktop Applications using Java Swing or Java FX or Web-App using Spring-Boot</dd>
                    <dt>Python</dt>
                    <dd>AI Based Voice Assistants, Automation Scripts, Web-App using Django, FastAPI</dd>
                    <dt>HTML, CSS, JavaScript</dt>
                    <dd>Designing UI/UX for Web-App using React JS, Vue.js, Node JS</dd>
                    <dt>Contact Center</dt>
                    <dd>Creating/Managing contact center cloud systems via AWS Connect/Five9/Google Dialog Flow</dd>
                    <dt>Cloud</dt>
                    <dd>Experience with AWS, Google Cloud for deploying applications and managing infrastructure</dd>
                    <dt>Android Development</dt>
                    <dd>Designing Android Apps using Java, Kotlin(Jetpack compose)</dd>
                  </dl>
                )}

                {activeTab === 'experience' && (
                  <dl>
                    <dt>TCS Systems Engineer - C1</dt>
                    <sup>April 2026 to Present</sup>
                    <dd>Collaborating with the GenAI Chatbot team for American Express to automate operational workflows using Python and cloud services, improving internal process efficiency</dd>
                    <dd>Led a sub-team of 4 engineers to build and execute Python-based ETL pipelines for data ingestion in OpenSearch</dd>
                    
                    <dt>Cognizant Programmer Analyst - GenC Next</dt>
                    <sup>Sep-2023 to April 2026</sup>
                    <dd>Proposed, designed, and single-handedly developed an automated server-management Django backend tool, deployed in production to manage 2,600+ Amex servers and dramatically reduce manual operational workload</dd>
                    <dd>Built backend components for Amex’s internal operations platform (VIRAAT), implementing Python(Flask)-based APIs and automation workflows that improved processing efficiency and reduced manual efforts</dd>
                    <dd>Led a sub-team of 4 engineers to build and execute Python-based ETL pipelines for data ingestion in OpenSearch</dd>

                    <dt>Cognizant Programmer Analyst - GenC Next Intern</dt>
                    <sup>March-2023 to July-2023</sup>
                    <dd>Worked on contact center systems and assisted in building automation and integration tests.</dd>

                    <dt>Wipro Talent Next Intern</dt>
                    <sup>Apr-2022 to Jun-2022</sup>
                    <dd>Contributed to web-app features and QA tasks as part of the intern program.</dd>

                    <dt>M.O.T.S pvt ltd Intern</dt>
                    <sup>Sep-2021 to Oct-2021</sup>
                    <dd>Worked on various projects and gained hands-on experience.</dd>
                  </dl>
                )}

                {activeTab === 'education' && (
                  <dl>
                    <dt>Bachelor Of Technology</dt>
                    <sup>2019-2023</sup>
                    <dd>Completed B.Tech from KIET Group of Institutions (Ghaziabad) in Computer Science and Information Technology (CSIT)</dd>
                    <dt>Intermediate Science</dt>
                    <sup>2017-2019</sup>
                    <dd>Completed 12th from Blue Bird Senior Secondary School (Aligarh)</dd>
                    <dt>High School</dt>
                    <sup>2017</sup>
                    <dd>Completed 10th from Blue Bird Senior Secondary School (Aligarh)</dd>
                  </dl>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
