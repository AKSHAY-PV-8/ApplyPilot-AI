"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HamburgerIcon, CloseIcon } from "@/components/icons";
import type { CurrentUser } from "../hooks/useCurrentUser";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar({ user }: { user: CurrentUser | null }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        ApplyPilot AI
      </Link>

      <div className={styles.links}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={styles.link}>{link.label}</a>
        ))}
      </div>

      <div className={styles.actions}>
        {user ? (
          <div className={styles.userBadge}>
            <div className={styles.avatar}>{user.name?.[0]?.toUpperCase() ?? "U"}</div>
            <span className={styles.userName}>{user.name}</span>
          </div>
        ) : (
          <>
            <Button href="/login" variant="ghost" size="sm" className={styles.desktopOnly}>Sign in</Button>
            <Button href="/register" size="sm">Get started</Button>
          </>
        )}
        <button className={styles.hamburger} onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          {!user && (
            <div className={styles.mobileActions}>
              <Button href="/login" variant="ghost" fullWidth>Sign in</Button>
              <Button href="/register" fullWidth>Get started</Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}