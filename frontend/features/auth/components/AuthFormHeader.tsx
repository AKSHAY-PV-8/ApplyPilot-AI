import Link from "next/link";
import styles from "./AuthFormHeader.module.css";

interface AuthFormHeaderProps {
  eyebrow: string;
  title: string;
  subtitleText: string;
  subtitleLinkText: string;
  subtitleLinkHref: string;
}

export function AuthFormHeader({ eyebrow, title, subtitleText, subtitleLinkText, subtitleLinkHref }: AuthFormHeaderProps) {
  return (
    <>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>
        {subtitleText} <Link href={subtitleLinkHref}>{subtitleLinkText}</Link>
      </p>
    </>
  );
}