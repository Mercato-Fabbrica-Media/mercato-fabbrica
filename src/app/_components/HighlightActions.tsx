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
    <div className="flex items-center gap-2 md:gap-2">
      <button
        aria-label="Like this image"
        className="hover:opacity-60 transition-opacity duration-200 hover:cursor-pointer"
        onClick={handleLike}
      >
        <Image
          src="/assets/images/Heart.svg"
          alt="Like"
          width={17}
          height={16}
          className={`w-[16px] h-[16px] md:w-[17px] md:h-[16px] ${liked ? "opacity-100" : "opacity-60"}`}
        />
      </button>
      <button
        aria-label="Share this image"
        className="relative hover:opacity-60 transition-opacity duration-200 hover:cursor-pointer"
        onClick={() => void handleShare()}
      >
        <Image
          src="/assets/images/Share.svg"
          alt="Share"
          width={16}
          height={16}
          className="w-[16px] h-[16px] md:w-[16px] md:h-[16px]"
        />
        {shared && (
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-black whitespace-nowrap">
            Link copied
          </span>
        )}
      </button>
    </div>
  );
}
