"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const futureNavItems = ["blockchain", "assistance", "obsessions"];
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/account/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { firstName?: string } | null) => {
        if (data?.firstName) setFirstName(data.firstName);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 mx-auto grid w-full max-w-[1440px] items-center border-b border-gray-300 bg-[#eae7e2] px-4 md:px-[72px] py-[10px] md:h-[82px] md:py-0 max-xl:flex xl:grid-cols-3">
      <div className="flex items-center gap-2">
        <Link href="/" className="no-underline">
          <div className="flex flex-col items-center">
            <div className="relative h-[22px] w-[22px] md:h-[30px] md:w-[30px]">
              <Image
                src="/assets/images/HEN_SMALL_RGB.png"
                alt="Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            {firstName ? (
              <span className="block text-center text-[6px] font-sackers-gothic tracking-[1.1px] text-black md:text-[8px]">
                <span className="block">HELLO</span>
                <span className="block">{firstName.toUpperCase()}</span>
              </span>
            ) : (
              <span className="block text-center text-[6px] font-sackers-gothic tracking-[1.1px] text-black md:text-[8px]">
                MEMBERS
              </span>
            )}
          </div>
        </Link>
      </div>

      <div className="flex flex-1 justify-center">
        <Link href="/" className="no-underline">
          <Image
            src="/assets/images/main-logo.png"
            alt="Logo"
            width={340}
            height={41}
            className="object-contain max-w-[200px] md:max-w-[340px]"
          />
        </Link>
      </div>

      <div className="flex items-center justify-end gap-3 md:gap-6">
        <button aria-label="Search" className="hover:opacity-70">
          <Image
            src="/assets/images/search.png"
            alt="Logo"
            width={20}
            height={20}
            className="object-contain hover:cursor-pointer"
          />
          {/* <svg
            width={16}
            height={16}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx={11} cy={11} r={8} />
            <line x1={21} y1={21} x2={16.65} y2={16.65} />
          </svg> */}
        </button>

        <nav className="items-center gap-5 md:gap-7 hidden lg:flex">
          {futureNavItems.map((item) => (
            <span
              key={item}
              aria-disabled="true"
              className="cursor-default text-[9px] text-black/70 md:text-[11px]"
            >
              {item}
            </span>
          ))}
        </nav>

        <button
          aria-label="Cart"
          className="relative flex gap-2 hover:opacity-70"
        >
          <Image
            src="/assets/images/Shopping_Cart.svg"
            alt="Cart"
            width={23}
            height={17}
            className="object-contain hover:cursor-pointer"
          />
          <span className="font-central-avenue absolute -top-1 left-6 text-[9px] text-black max-sm:hidden">
            0
          </span>
          <span className="hidden md:flex md:items-center md:text-[11px]">cart</span>
        </button>
      </div>
    </header>
  );
}
