"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const initials = (user?.name || user?.email || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap');

        .ap-dash-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(250,250,250,0.9);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #E8EAF0;
          font-family: 'Inter', sans-serif;
        }
        .ap-dash-nav-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 0 clamp(1rem,4vw,2rem);
          height: 62px;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        }
        .ap-nav-logo {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: 1.1rem; color: #1E2D40;
          text-decoration: none;
          display: flex; align-items: center; gap: 8px;
          flex-shrink: 0;
        }
        .ap-nav-logo-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #4F46E5; display: inline-block;
        }
        .ap-nav-right {
          display: flex; align-items: center; gap: 1.25rem;
        }
        .ap-nav-dash-link {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.875rem; font-weight: 500;
          color: #64748B; text-decoration: none;
          padding: 0.35rem 0.75rem; border-radius: 8px;
          transition: background 0.18s, color 0.18s;
        }
        .ap-nav-dash-link:hover { background: #EEF2FF; color: #4F46E5; }
        .ap-nav-user {
          display: flex; align-items: center; gap: 10px;
        }
        .ap-nav-user-name {
          font-size: 0.875rem; font-weight: 500; color: #475569;
        }
        .ap-nav-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: #fff; font-weight: 700; font-size: 0.82rem;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; letter-spacing: 0.02em;
        }
        .ap-nav-logout {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border-radius: 8px;
          border: 1.5px solid #E2E8F0;
          background: transparent; cursor: pointer;
          color: #94A3B8; transition: color 0.18s, border-color 0.18s, background 0.18s;
        }
        .ap-nav-logout:hover {
          color: #EF4444; border-color: #FECACA; background: #FEF2F2;
        }
        .ap-nav-divider {
          width: 1px; height: 22px; background: #E2E8F0; flex-shrink: 0;
        }
        @media (max-width: 480px) {
          .ap-nav-user-name { display: none; }
        }
      `}</style>

      <header className="ap-dash-nav">
        <div className="ap-dash-nav-inner">
          <Link href="/dashboard" className="ap-nav-logo">
            <span className="ap-nav-logo-dot" />
            ApplyPilot AI
          </Link>

          <div className="ap-nav-right">
            <Link href="/dashboard" className="ap-nav-dash-link">
              <LayoutDashboard size={15} />
              Dashboard
            </Link>

            {user && (
              <>
                <div className="ap-nav-divider" />
                <div className="ap-nav-user">
                  <span className="ap-nav-user-name">
                    {user.name || user.email}
                  </span>
                  <div className="ap-nav-avatar">{initials}</div>
                  <button
                    onClick={handleLogout}
                    className="ap-nav-logout"
                    title="Sign out"
                    aria-label="Sign out"
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}