"use client";

import { useState } from "react";
import Image from "next/image";

export default function HighlightActions() {
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      // User cancelled share dialog
    }
  };

  return (
    <div className="flex items-center gap-2 md:gap-6 lg:gap-[13px]">
      <button
        aria-label="Like this image"
        className={`transition-opacity duration-200 hover:opacity-60 hover:cursor-pointer ${liked ? "opacity-100" : "opacity-60"}`}
        onClick={handleLike}
      >
        <Image
          src="/assets/images/Heart.svg"
          alt="Heart"
          width={37}
          height={34}
          className="h-[10px] w-[10px] md:h-[16px] md:w-[16px]"
        />
      </button>
      <button
        aria-label="Share this image"
        className="relative transition-opacity duration-200 hover:opacity-60 hover:cursor-pointer"
        onClick={() => void handleShare()}
      >
        <Image
          src="/assets/images/Share.svg"
          alt="Share"
          width={35}
          height={36}
          className="h-[10px] w-[10px] md:h-[16px] md:w-[16px]"
        />
        {shared && (
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white whitespace-nowrap">
            Link copied
          </span>
        )}
      </button>
    </div>
  );
}
