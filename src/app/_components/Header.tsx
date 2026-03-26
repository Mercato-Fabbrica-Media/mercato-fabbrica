"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 grid w-full items-center border-b border-gray-300 bg-[#eae7e2] px-4 md:px-16 py-[10px] md:py-[20px] max-xl:flex xl:grid-cols-3">
      <div className="flex items-center gap-2">
        <Link href="/" className="no-underline">
          <div className="flex flex-col items-center">
            <div className="relative h-[22px] w-[22px] md:h-[30px] md:w-[30px]">
              <Image
                src="/assets/images/Logo.png"
                alt="Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <span className="text-[6px] tracking-[1.1px] font-bold text-black md:text-[8px]">
              MEMBERS
            </span>
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
          <Link
            href="/blockchain"
            className="text-[9px] md:text-[11px] text-black hover:opacity-70"
          >
            blockchain
          </Link>
          <Link
            href="/assistance"
            className="text-[9px] md:text-[11px] text-black hover:opacity-70"
          >
            assistance
          </Link>
          <Link
            href="/obsessions"
            className="text-[9px] md:text-[11px] text-black hover:opacity-70"
          >
            obsessions
          </Link>
        </nav>

        <button
          aria-label="Cart"
          className="relative flex gap-2 hover:opacity-70"
        >
          <Image
            src="/assets/images/Cart.svg"
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
