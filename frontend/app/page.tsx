"use client";

import { getUser } from "@/services/auth";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

interface User{
  id: string,
  name: string,
  email: string
}

export default function HomePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const fetchUser = async () => {
      try{
        const userResponse = await getUser();
        console.log("user Response",userResponse)
        setUser(userResponse)

      }catch{
        router.replace("/login")
      }
    }

    fetchUser();
  }, [router]);
  return (
    <div className="">
      <div className="">Home Page</div>
    </div>
  );
}
