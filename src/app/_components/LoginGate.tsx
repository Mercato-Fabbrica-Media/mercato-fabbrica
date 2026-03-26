"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LoginGateProps {
  children: React.ReactNode;
}

export default function LoginGate({ children }: LoginGateProps) {
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/check");
        if (res.ok) {
          sessionStorage.setItem("isLogin", "true");
          setCanRender(true);
        } else {
          sessionStorage.removeItem("isLogin");
          router.replace("/login");
        }
      } catch {
        sessionStorage.removeItem("isLogin");
        router.replace("/login");
      }
    }

    void checkAuth();
  }, [router]);

  if (!canRender) {
    return null;
  }

  return <>{children}</>;
}
