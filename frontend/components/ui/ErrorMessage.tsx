import { AlertCircleIcon } from "@/components/icons";
import styles from "./ErrorMessage.module.css";

export function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.error}>
      <AlertCircleIcon />
      {children}
    </div>
  );
}