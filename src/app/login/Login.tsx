"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "~/lib/analytics";

interface LoginResponse {
  error?: string;
  [key: string]: unknown;
}

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => { track("login_viewed"); }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const jsonData: unknown = await resp.json();
      if (typeof jsonData === "object" && jsonData !== null) {
        const data = jsonData as LoginResponse;
        if (!resp.ok) {
          throw new Error(data.error ?? "Login failed");
        }
      } else {
        throw new Error("Invalid login response");
      }

      track("login_success");
      sessionStorage.setItem("isLogin", "true");
      router.push("/question");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unexpected error occurred";
      track("login_failed", { metadata: { error: msg } });
      if (err instanceof Error) setError(err.message);
      else setError("Unexpected error occurred");
    }
  }

  return (
    <div className="flex h-[1300px] max-sm:h-[calc(100vh-343px)] flex-col bg-[#eae7e2] px-4 md:px-16 pt-[24px] pb-8 md:pt-[40px]">
      <div className="mx-auto w-full max-w-lg min-w-full">
        <form onSubmit={handleSubmit} className="flex flex-col md:gap-7">
          <h2 className="md:text-[22px] text-[10px] font-sucker-heavy tracking-[0.1em] text-black mb-4 md:mb-3">
            sign in
          </h2>

          {error && <p className="text-red-600 text-[10px] mb-2">{error}</p>}

          <div className="md:flex md:gap-20">
            <div className="flex flex-col mb-4 md:mb-0 gap-2 md:w-1/2">
              <input
                id="email"
                type="email"
                placeholder="email address"
                className="antialiased input-custom-border rounded-none border-0 bg-transparent px-0 py-1 md:py-2 text-[12px] md:text-[21px] font-normal text-[#0A0909] placeholder-black focus:ring-0 focus:outline-none"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                required
              />
            </div>

            <div className="flex flex-col gap-2 md:w-1/2">
              <input
                id="password"
                type="password"
                placeholder="password"
                className="antialiased input-custom-border rounded-none border-0 bg-transparent px-0 py-1 md:py-2 text-[12px] md:text-[21px] font-normal text-[#0A0909] placeholder-black focus:ring-0 focus:outline-none"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div className="text-right mb-4 md:mb-2">
            <a
              href="/forgot-password"
              className="text-[8px] md:text-sm font-bold tracking-[0.12em] text-black uppercase hover:underline"
            >
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-white py-[6px] md:py-3 text-[14px] md:text-[26px] font-untitled-sans tracking-[0.01px] text-black uppercase transition hover:bg-black hover:text-white"
          >
            Login
          </button>

          <div className="text-center mt-4">
            <div className="text-[10px] leading-normal md:text-[20px] md:mb-2 tracking-[0.12em] text-black uppercase">
              Don&apos;t have a membership?
            </div>
            <a
              href="/register"
              className="font-sucker-heavy text-[10px] leading-normal md:text-[20px] font-bold tracking-[0.1em] text-black uppercase hover:underline"
            >
              Create a Membership
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
