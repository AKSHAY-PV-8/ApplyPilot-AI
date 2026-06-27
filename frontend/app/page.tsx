"use client";
import { Navbar } from "@/features/marketing/components/Navbar";
import { HeroSection } from "@/features/marketing/components/HeroSection";
import { StatsSection } from "@/features/marketing/components/StatsSection";
import { FeaturesSection } from "@/features/marketing/components/FeaturesSection";
import { CtaSection } from "@/features/marketing/components/CtaSection";
import { Footer } from "@/features/marketing/components/Footer";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

export default function HomePage() {
  const { user, logout } = useCurrentUser();

  return (
    <>
      <Navbar user={user} onLogout={logout} />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </>
  );
}