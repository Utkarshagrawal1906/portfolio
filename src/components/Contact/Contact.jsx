import styles from "./Contact.module.css";
import { useState, useEffect } from "react";
import resume from "../../assets/utkarsh Resume.pdf";
import leetcodeLogo from '../../assets/leetcode.png';
export default function Contact() {
  const [status, setStatus] = useState("");

  // auto-clear status after 5 seconds
  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(''), 5000);
    return () => clearTimeout(t);
  }, [status]);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwgyMoYCjYO7SjLXeOsIWXaGQCIFZcTQJ9Jtd1eG6nrbu4mgh9kqTJr-kbUtWcNSVG0/exec';

    try {
      const res = await fetch(scriptURL, { method: 'POST', body: new FormData(form) });
      if (res.ok) {
        setStatus('Message Sent Successfully');
        form.reset();
      } else {
        setStatus('Error sending message');
      }
    } catch (err) {
      setStatus('Error sending message');
    }
  }

  return (
    <section id="contact" className={styles.contact}>
      <h2 className={styles.title}>Contact Me</h2>

      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={styles.contactCard}>
            <p className={styles.contactItem}><span className={styles.icon}>📧</span><a href="mailto:utkarshagofficial@gmail.com">utkarshagofficial@gmail.com</a></p>
            <p className={styles.contactItem}><span className={styles.icon}>📱</span><a href="tel:+919870601702">+91 9870601702</a></p>

            <div className={styles.icons}>
              <a href="https://www.linkedin.com/in/utkarsh-agrawal-3157871a8" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
              <a href="https://github.com/Utkarshagrawal1906" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
              <a href="https://www.hackerrank.com/UtkarshAg" aria-label="HackerRank"><i className="fa-brands fa-hackerrank"></i></a>
              <a href="https://leetcode.com/utkarsh197" aria-label="LeetCode"><img width="24" height="24" src={leetcodeLogo} alt="leetcode"/></a>
            </div>

            <a href={resume} download="Utkarsh Agrawal Resume" className={styles.cv}>Download CV</a>
          </div>
        </div>

        <form onSubmit={handleSubmit} name="submit-to-google-sheet" className={styles.form}>
          <input type="text" name="Name" placeholder="Your Name" required />
          <input type="email" name="Email" placeholder="Your Email" required />
          <textarea name="Message" placeholder="Your Message" rows="6" required />
          <button type="submit">Send</button>
          {status && <span className={styles.status}>{status}</span>}
        </form>
      </div>
    </section>
  );
}