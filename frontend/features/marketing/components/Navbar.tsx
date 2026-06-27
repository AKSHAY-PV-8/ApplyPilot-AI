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

interface NavbarProps {
  user: CurrentUser | null;
  onLogout: () => Promise<void>;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await onLogout();
    setLoggingOut(false);
  };

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <span className={styles.logoDot} />
        ApplyPilot AI
      </Link>

      <div className={styles.links}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </a>
        ))}
      </div>

      <div className={styles.actions}>
        {user ? (
          <div className={styles.userBadge}>
            <div className={styles.avatar}>
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <span className={styles.userName}>{user.name}</span>
            <button
              className={styles.logoutBtn}
              onClick={handleLogout}
              disabled={loggingOut}
              aria-label="Sign out"
              title="Sign out"
            >
              {loggingOut ? (
                <span className={styles.spinner} />
              ) : (
                <LogoutIcon />
              )}
            </button>
          </div>
        ) : (
          <>
            <Button
              href="/login"
              variant="ghost"
              size="sm"
              className={styles.desktopOnly}
            >
              Sign in
            </Button>
            <Button href="/register" size="sm">
              Get started
            </Button>
          </>
        )}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {user ? (
            <div className={styles.mobileActions}>
              <div className={styles.mobileUser}>
                <div className={styles.avatar}>
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <span className={styles.mobileUserName}>{user.name}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                fullWidth
                disabled={loggingOut}
              >
                {loggingOut ? "Signing out…" : "Sign out"}
              </Button>
            </div>
          ) : (
            <div className={styles.mobileActions}>
              <Button href="/login" variant="ghost" fullWidth>
                Sign in
              </Button>
              <Button href="/register" fullWidth>
                Get started
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}