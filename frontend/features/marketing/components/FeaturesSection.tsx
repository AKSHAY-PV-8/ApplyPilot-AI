import { ResumeIcon, LightningIcon, ClipboardIcon, ChatIcon } from "@/components/icons";
import { features } from "../data";
import styles from "./FeaturesSection.module.css";

const ICONS = [ResumeIcon, LightningIcon, ClipboardIcon, ChatIcon];

export function FeaturesSection() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.eyebrow}>What ApplyPilot Does</div>
      <div className={styles.title}>Every tool you need to get hired</div>
      <p className={styles.desc}>
        From crafting your first resume to acing your final interview — ApplyPilot AI handles the
        heavy lifting so you can focus on what matters.
      </p>
      <div className={styles.grid}>
        {features.map((f, i) => {
          const Icon = ICONS[i];
          return (
            <div className={styles.card} key={f.title}>
              <div className={styles.iconWrap}><Icon /></div>
              <div className={styles.cardTitle}>{f.title}</div>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}