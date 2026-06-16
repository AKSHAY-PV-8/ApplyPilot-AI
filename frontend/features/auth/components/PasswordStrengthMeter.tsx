import { getPasswordStrength } from "../utils/passwordStrength";
import styles from "./PasswordStrengthMeter.module.css";

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;
  const { score, label, color } = getPasswordStrength(password);

  return (
    <>
      <div className={styles.bar}>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className={styles.segment} style={{ background: n <= score ? color : "var(--color-border)" }} />
        ))}
      </div>
      <div className={styles.label} style={{ color }}>{label}</div>
    </>
  );
}