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
    const isLoggedIn = window.sessionStorage.getItem("isLogin") === "true";

    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    setCanRender(true);
  }, [router]);

  if (!canRender) {
    return null;
  }

  return <>{children}</>;
}
