import { SuccessCheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import styles from "./SuccessScreen.module.css";

export function SuccessScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <SuccessCheckIcon />
        </div>
        <div className={styles.title}>You&apos;re in! 🎉</div>
        <p className={styles.desc}>Your ApplyPilot AI account is ready. Start crafting applications that get noticed.</p>
        <Button href="/login" fullWidth>Go to sign in →</Button>
      </div>
    </div>
  );
}