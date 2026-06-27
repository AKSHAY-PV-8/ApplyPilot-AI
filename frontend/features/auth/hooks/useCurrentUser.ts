"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, logoutUser } from "@/services/auth";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
}

export function useCurrentUser() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    getUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // ignore — clear local state regardless
    } finally {
      setUser(null);
      router.replace("/login");
    }
  };

  return { user, logout };
}