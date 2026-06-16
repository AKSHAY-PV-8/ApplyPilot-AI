import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.brand}>ApplyPilot AI</span>
      <span className={styles.copy}>© {new Date().getFullYear()} ApplyPilot AI. All rights reserved.</span>
    </footer>
  );
}