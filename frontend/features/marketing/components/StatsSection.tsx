import { stats } from "../data";
import styles from "./StatsSection.module.css";

export function StatsSection() {
  return (
    <section className={styles.stats}>
      <div className={styles.inner}>
        {stats.map((s) => (
          <div key={s.label}>
            <span className={styles.num}>{s.number}</span>
            <div className={styles.label}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}