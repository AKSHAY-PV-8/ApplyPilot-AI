import { GoogleIcon } from "@/components/icons";
import styles from "./GoogleAuthButton.module.css";

export function GoogleAuthButton({ label = "Continue with Google" }: { label?: string }) {
  return (
    <button className={styles.btn} type="button">
      <GoogleIcon />
      {label}
    </button>
  );
}