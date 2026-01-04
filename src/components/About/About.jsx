import styles from "./About.module.css";
import { useState } from "react";

import profile from "../../assets/profile.png";

export default function About() {
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col1}>
            <img src={profile} alt="Utkarsh profile" />
          </div>

          <div className={styles.col2}>
            <h2 className={styles.title}>About Me</h2>
            <p className={styles.lead}>Hi everyone, I am an enthusiastic software engineer with big vision. Continuously moving towards innovation, creating solutions and contributing to the betterment of the world around me.</p>

            <div className={styles.tabTitles}>
              <button className={`${styles.tab} ${activeTab === 'skills' ? styles.active : ''}`} onClick={() => setActiveTab('skills')}>Skills</button>
              <button className={`${styles.tab} ${activeTab === 'experience' ? styles.active : ''}`} onClick={() => setActiveTab('experience')}>Experience</button>
              <button className={`${styles.tab} ${activeTab === 'education' ? styles.active : ''}`} onClick={() => setActiveTab('education')}>Education</button>
            </div>

            <div className={styles.content}>
              {activeTab === 'skills' && (
                <dl>
                  <dt>Java</dt>
                  <dd>Desktop Applications using Java Swing or Web-App using Spring-Boot</dd>
                  <dt>Python</dt>
                  <dd>AI Based Voice Assistants, Automation Scripts, Web-App using Django</dd>
                  <dt>HTML, CSS, JavaScript</dt>
                  <dd>Designing UI/UX for Web-App</dd>
                  <dt>AWS, Genesys</dt>
                  <dd>Creating/Managing contact center cloud systems via AWS Connect/Genesys Engage</dd>
                  <dt>Android Development</dt>
                  <dd>Designing Android Apps using Java, Kotlin</dd>
                </dl>
              )}

              {activeTab === 'experience' && (
                <dl>
                  <dt>Cognizant Programmer Analyst - GenC Next</dt>
                  <sup>Sep-2023 to Present</sup>
                  <dd>Created automation tools for DevOps and SRE team using Python which reduced change validation time up to 80%.</dd>
                  <dd>Developed IVR System using AWS Connect, Lambda, Lex, Polly, CloudWatch, DynamoDB and S3.</dd>

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
    </section>
  );
}