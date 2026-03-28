"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "~/lib/analytics";

interface LoginGateProps {
  children: React.ReactNode;
}

export default function LoginGate({ children }: LoginGateProps) {
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/account/check");
        if (res.ok) {
          sessionStorage.setItem("isLogin", "true");
          setCanRender(true);
        } else {
          track("auth_check_failed", { metadata: { status: res.status } });
          sessionStorage.removeItem("isLogin");
          router.replace("/login");
        }
      } catch {
        track("auth_check_failed", { metadata: { error: "network" } });
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
