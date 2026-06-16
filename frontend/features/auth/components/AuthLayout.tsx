import { ReactNode } from "react";
import styles from "./AuthLayout.module.css";

export function AuthLayout({ leftPanel, children }: { leftPanel: ReactNode; children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className={styles.left}>{leftPanel}</div>
      <div className={styles.right}>
        <div className={styles.formBox}>{children}</div>
      </div>
    </div>
  );
}