"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { track } from "~/lib/analytics";

interface AuthResponse {
  error?: string;
  [key: string]: unknown;
}

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    newsletter: false,
  });
  const [error, setError] = useState("");

  useEffect(() => { track("register_viewed"); }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const resp = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      const json: unknown = await resp.json();
      if (typeof json === "object" && json !== null) {
        const data = json as AuthResponse;
        if (!resp.ok) throw new Error(data.error ?? "Registration failed");
      } else {
        throw new Error("Invalid response");
      }

      track("register_success");
      sessionStorage.setItem("isLogin", "true");
      router.push("/question");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unexpected error occurred";
      track("register_failed", { metadata: { error: msg } });
      if (err instanceof Error) setError(err.message);
      else setError("Unexpected error occurred");
    }
  };

  return (
    <div className="flex h-[1300px] max-sm:h-[calc(100vh-343px)] flex-col bg-[#eae7e2] px-4 md:px-16 pt-[24px] pb-8 md:pt-[40px]">
      <div className="mx-auto w-full max-w-lg min-w-full">
        <form onSubmit={handleSubmit} className="flex flex-col md:gap-5">
          <h2 className="md:text-[22px] text-[10px] font-sucker-heavy tracking-[0.1em] text-black mb-4 md:mb-3">
            register
          </h2>

          {error && <p className="text-red-600 text-[10px] mb-2">{error}</p>}

          <div className="md:flex md:gap-20">
            <div className="flex flex-col mb-4 md:mb-3 gap-2 md:w-1/2">
              <input
                type="text"
                name="firstName"
                placeholder="first name*"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="antialiased input-custom-border rounded-none border-0 bg-transparent px-0 py-1 md:py-2 text-[12px] md:text-[21px] font-normal text-[#0A0909] placeholder-black focus:ring-0 focus:outline-none"
              />
            </div>
            <div className="flex flex-col mb-4 md:mb-3 gap-2 md:w-1/2">
              <input
                type="text"
                name="lastName"
                placeholder="last name*"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="antialiased input-custom-border rounded-none border-0 bg-transparent px-0 py-1 md:py-2 text-[12px] md:text-[21px] font-normal text-[#0A0909] placeholder-black focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          <div className="md:flex md:gap-20">
            <div className="flex flex-col mb-4 md:mb-0 gap-2 md:w-1/2">
              <input
                type="email"
                name="email"
                placeholder="email address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="antialiased input-custom-border rounded-none border-0 bg-transparent px-0 py-1 md:py-2 text-[12px] md:text-[21px] font-normal text-[#0A0909] placeholder-black focus:ring-0 focus:outline-none"
              />
            </div>
            <div className="flex flex-col mb-4 md:mb-0 gap-2 md:w-1/2">
              <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="tracking-[.05rem] input-custom-border rounded-none border-0 bg-transparent px-0 py-1 md:py-2 text-[8px] md:text-[16px] font-normal text-[#0A0909] placeholder-black focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-0 flex items-start space-x-2 md:mt-6">
            <input
              type="checkbox"
              name="newsletter"
              id="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
              className="relative md:top-[4px] h-[10px] w-[10px] md:w-[16px] md:h-[16px] appearance-none border border-black bg-transparent focus:ring-0 focus:ring-offset-0"
            />
            <label
              htmlFor="newsletter"
              className="cursor-pointer md:text-[20px] leading-normal font-medium tracking-[0.03rem] text-[#0A0909] text-[8px] md:relative md:-top-[4px]"
            >
              subscribe me to the joyous living newsletter
            </label>
          </div>

          <div className="pt-0 md:relative md:-top-[15px]">
            <p className="cursor-pointer md:text-[20px] leading-normal font-medium tracking-[0.03rem] text-[#0A0909] text-[8px]">
              by clicking on &apos;create a membership&apos;, you accept our
              confidentiality policies
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full cursor-pointer bg-white py-[6px] md:py-3 text-[14px] md:text-[26px] font-untitled-sans tracking-[0.01px] text-black uppercase transition hover:bg-black hover:text-white"
            >
              CREATE MEMBERSHIP
            </button>
          </div>

          <div className="pt-4 text-center">
            <p className="text-[10px] leading-normal md:text-[20px] font-bold tracking-[0.12em] text-black uppercase hover:underline">
              already have a membership?
            </p>
            <Link
              href="/login"
              className="font-sucker-heavy text-[10px] leading-normal md:text-[20px] font-bold tracking-[0.1em] text-black uppercase hover:underline"
            >
              login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
