import styles from "./Divider.module.css";

export function Divider({ children }: { children: React.ReactNode }) {
  return <div className={styles.divider}>{children}</div>;
}