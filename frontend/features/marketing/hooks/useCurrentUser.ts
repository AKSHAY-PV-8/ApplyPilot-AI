"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/services/authApi";

export interface CurrentUser { id: string; name: string; email: string; }

export function useCurrentUser() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    let isMounted = true;
    getUser()
      .then((res) => { if (isMounted) setUser(res); })
      .catch(() => { router.replace("/login"); });
    return () => { isMounted = false; };
  }, [router]);

  return user;
}