"use client";
import { Button } from "@/components/ui/Button";
import { useHeroSlideshow } from "../hooks/useHeroSlideshow";
import { heroSlides } from "../data";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const { slide, slideIndex, setSlideIndex, animating } = useHeroSlideshow();

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <h1 className={styles.heading}>
          <span className={`${styles.verb}${animating ? ` ${styles.exit}` : ""}`}>{slide.verb}</span>{" "}
          Your Dream Job <span className={styles.subWord}>{slide.sub}</span>
        </h1>
        <p className={`${styles.desc}${animating ? ` ${styles.fade}` : ""}`}>{slide.desc}</p>
        <div className={styles.cta}>
          <Button href="/dashboard" size="lg">Start for free →</Button>
          <Button href="#features" variant="outline" size="lg">See how it works</Button>
        </div>
        <div className={styles.dots}>
          {heroSlides.map((_, i) => (
            <button key={i} className={`${styles.dot}${i === slideIndex ? ` ${styles.dotActive}` : ""}`} onClick={() => setSlideIndex(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <div className={`${styles.illustration} ${styles.floating}`}>
          <HeroIllustration />
          <div className={`${styles.floatingCard} ${styles.fcTop}`}>
            <div className={styles.fcLabel}>Match Score</div>
            <div className={styles.fcVal}>92% <span className={styles.fcGreen}>↑</span></div>
          </div>
          <div className={`${styles.floatingCard} ${styles.fcBot}`}>
            <div className={styles.fcLabel}>Applications sent</div>
            <div className={styles.fcVal}>24 <span className={styles.fcMeta}>this week</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 500 480" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%">
      <rect x="60" y="40" width="380" height="400" rx="24" fill="#fff" stroke="#E8EAF0" strokeWidth="1.5" />
      <rect x="60" y="40" width="380" height="64" rx="24" fill="#4F46E5" />
      <rect x="60" y="80" width="380" height="24" rx="0" fill="#4F46E5" />
      <circle cx="140" cy="72" r="28" fill="#EEF2FF" />
      <circle cx="140" cy="62" r="11" fill="#A5B4FC" />
      <ellipse cx="140" cy="86" rx="17" ry="10" fill="#A5B4FC" />
      <rect x="180" y="58" width="120" height="10" rx="5" fill="#fff" opacity="0.9" />
      <rect x="180" y="74" width="80" height="8" rx="4" fill="#C7D2FE" />
      <rect x="92" y="128" width="60" height="8" rx="4" fill="#4F46E5" opacity="0.9" />
      <rect x="92" y="148" width="316" height="7" rx="3.5" fill="#E2E8F0" />
      <rect x="92" y="163" width="270" height="7" rx="3.5" fill="#E2E8F0" />
      <rect x="92" y="178" width="290" height="7" rx="3.5" fill="#E2E8F0" />
      <rect x="92" y="208" width="50" height="7" rx="3.5" fill="#4F46E5" opacity="0.85" />
      <rect x="92" y="228" width="68" height="24" rx="12" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1" />
      <rect x="170" y="228" width="58" height="24" rx="12" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1" />
      <rect x="238" y="228" width="74" height="24" rx="12" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1" />
      <rect x="322" y="228" width="56" height="24" rx="12" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1" />
      <rect x="104" y="237" width="44" height="6" rx="3" fill="#818CF8" />
      <rect x="182" y="237" width="34" height="6" rx="3" fill="#818CF8" />
      <rect x="250" y="237" width="50" height="6" rx="3" fill="#818CF8" />
      <rect x="334" y="237" width="32" height="6" rx="3" fill="#818CF8" />
      <rect x="92" y="274" width="70" height="7" rx="3.5" fill="#4F46E5" opacity="0.85" />
      <rect x="92" y="294" width="180" height="7" rx="3.5" fill="#1E2D40" opacity="0.8" />
      <rect x="92" y="308" width="140" height="6" rx="3" fill="#94A3B8" />
      <rect x="92" y="322" width="316" height="6" rx="3" fill="#E2E8F0" />
      <rect x="92" y="335" width="260" height="6" rx="3" fill="#E2E8F0" />
      <rect x="310" y="284" width="86" height="58" rx="14" fill="#10B981" opacity="0.12" />
      <text x="353" y="315" textAnchor="middle" fontSize="22" fontWeight="800" fill="#10B981" fontFamily="Syne, sans-serif">95</text>
      <text x="353" y="330" textAnchor="middle" fontSize="9" fill="#10B981" fontFamily="Inter, sans-serif" fontWeight="600">ATS SCORE</text>
      <rect x="92" y="375" width="316" height="44" rx="12" fill="#4F46E5" />
      <text x="250" y="402" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" fontFamily="Inter, sans-serif">Apply with AI ✦</text>
    </svg>
  );
}