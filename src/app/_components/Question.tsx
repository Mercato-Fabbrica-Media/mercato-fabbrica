"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface QuestionProps {
  questionId: number;
  question?: string;
  options?: string[];
  currentQuestion?: number;
  totalQuestions?: number;
  onPrevious?: () => void;
  onNext?: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
  shareMoreTitle?: string;
  shareMorePlaceholder?: string;
  previousHref?: string;
  nextHref?: string;
  initialChoice?: string | null;
  initialShareMore?: string;
}

export default function Question({
  questionId,
  question = "When selecting an everyday item, what primarily guides your choice?",
  options = [
    "functionality and practicality",
    "aesthetic appeal and design",
    "brand reputation or recommendations",
    "ethical and environmental considerations",
  ],
  currentQuestion = 1,
  totalQuestions = 33,
  onPrevious,
  onNext,
  shareMoreTitle = "share more",
  shareMorePlaceholder = "THOUGHTS...",
  previousHref,
  nextHref,
  initialChoice,
  initialShareMore,
}: QuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [shareMoreText, setShareMoreText] = useState(initialShareMore ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!initialChoice) {
      setSelectedOption(null);
      return;
    }
    const normalized = initialChoice.trim().toLowerCase();
    const matchIndex = options.findIndex(
      (option) => option.trim().toLowerCase() === normalized,
    );
    setSelectedOption(matchIndex >= 0 ? matchIndex : null);
  }, [initialChoice, options]);

  useEffect(() => {
    setShareMoreText(initialShareMore ?? "");
  }, [initialShareMore]);

  const persistResponse = useCallback(
    async (override?: { response?: number | null; shareMore?: string }) => {
      const optionIndex =
        override && "response" in override ? override.response : selectedOption;
      const shareMore =
        override && "shareMore" in override
          ? (override.shareMore ?? "")
          : (shareMoreText ?? "");

      const payload = {
        questionId,
        response:
          typeof optionIndex === "number" && optionIndex >= 0
            ? options[optionIndex]
            : null,
        shareMore,
      };

      setIsSaving(true);
      try {
        const res = await fetch("/api/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.status === 401) {
          router.replace("/login");
          return;
        }
        if (!res.ok) {
          console.error("Failed to save response", await res.text());
        }
      } catch (error) {
        console.error("Error saving response", error);
      } finally {
        setIsSaving(false);
      }
    },
    [questionId, options, selectedOption, shareMoreText, router],
  );

  const handleOptionToggle = (index: number) => {
    const nextValue = selectedOption === index ? null : index;
    setSelectedOption(nextValue);
    void persistResponse({ response: nextValue });
  };

  const handleShareMoreBlur = () => {
    void persistResponse({ shareMore: shareMoreText });
  };

  const handlePreviousClick = async () => {
    await persistResponse();
    if (previousHref) {
      router.push(previousHref);
      return;
    }

    onPrevious?.();
  };

  const handleNextClick = async () => {
    await persistResponse();
    if (nextHref) {
      router.push(nextHref);
      return;
    }

    onNext?.();
  };

  const disabledNav = isSaving;
  const getOptionGridPosition = (index: number) => {
    switch (index) {
      case 0:
        return "col-start-1 row-start-1";
      case 1:
        return "col-start-1 row-start-2";
      case 2:
        return "col-start-2 row-start-1";
      case 3:
        return "col-start-2 row-start-2";
      default:
        return "";
    }
  };

  const inputClasses = `font-sackers-gothic w-full border-0 border-b-2 md:border-b-2 border-black bg-transparent md:pb-1 md:text-[20px] font-light tracking-[0.02em] text-black lowercase placeholder-black focus:border-black focus:outline-none text-[10px] antialiased`

  return (
    <div className="bg-[#e8e5e0] md:px-16 md:py-16 md:pt-[42px] px-4 py-4 pt-5">
      <div className="mx-auto">
        <div className="md:mb-12 mb-5">
          <h1 className="font-sucker-heavy md:mb-12 md:text-[28px] text-black mb-[18px] text-[14px] leading-[18px] md:leading-[32px] tracking-[0] antialiased md:-tracking-[1.5px]">
            {question?.toLowerCase()}
          </h1>

          <div className="space-y-[19px] md:space-y-0 md:grid md:grid-cols-2 md:gap-x-2 md:gap-y-9">
            {options
              .filter((option) => option !== "--")
              .map((option, index) => (
                <label
                  key={index}
                  className={`group flex cursor-pointer items-center gap-2 md:gap-3 ${getOptionGridPosition(index)}`}
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedOption === index}
                      onChange={() => handleOptionToggle(index)}
                      className="sr-only"
                    />
                    <div
                      className={`md:h-[18px] md:w-[18px] border-1 md:border-2 border-black transition-colors duration-200 h-[9px] w-[9px] antialiased ${
                        selectedOption === index ? "bg-black" : "bg-transparent"
                      }`}
                    >
                      {selectedOption === index && (
                        <svg
                          className="top-0 left-0 md:top-[1px] md:left-[1px] absolute md:w-[15.5px] text-white max-sm:h-[9px] w-[9px]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span
                    className="tracking-[0px] antialiased md:text-[20px] leading-none md:tracking-[0.01px] text-black lowercase transition-opacity duration-200 group-hover:opacity-70 text-[10px]"
                  >
                    {option}
                  </span>
                </label>
              ))}
          </div>
        </div>

        <div className="md:mb-11 mb-4">
          <div className="bg-white px-8 md:py-3 text-center leading-none py-2">
            <span className="font-untitled-sans md:text-[28px] tracking-[0.01em] text-black uppercase px-4 text-[14px] leading-normal">
              {currentQuestion.toString().padStart(2, "0")} /{" "}
              {totalQuestions.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="md:mb-11 flex items-center justify-center mb-[34px] gap-[24px]">
          {
            <button
              onClick={() => void handlePreviousClick()}
              className="flex cursor-pointer items-center justify-center text-gray-600 transition-colors hover:text-gray-800 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={(!previousHref && !onPrevious) || disabledNav}
              aria-label="Previous question"
            >
              <Image
                src="/assets/images/triangle-left.svg"
                alt="Previous"
                width={56}
                height={42}
                className="h-[19px] w-[19px] md:h-[54px] md:w-[54px]"
              />
            </button>
          }

          {
            <button
              onClick={() => void handleNextClick()}
              className="flex cursor-pointer items-center justify-center text-gray-600 transition-colors hover:text-gray-800 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={(!nextHref && !onNext) || disabledNav}
              aria-label="Next question"
            >
              <Image
                src="/assets/images/Triangle-right.svg"
                alt="Next"
                width={56}
                height={42}
                className="h-[19px] w-[19px] md:h-[54px] md:w-[54px]"
              />
            </button>
          }
        </div>

        <div className="font-sucker-heavy md:mb-12 md:text-[28px] md:tracking-[0.02em] text-black mb-[18px] text-[14px] leading-[18px] md:leading-[32px] tracking-[0] antialiased">share more</div>

        <div className="space-y-8">
          {shareMoreTitle &&
            <h2 className="font-sackers-gothic tracking-none md:mb-[50px] md:text-[28px] leading-none text-black mb-[25px] text-[14px]">
              {shareMoreTitle}
            </h2>
          }

          <div className="space-y-4 md:space-y-11">
            <div>
              <input
                type="text"
                placeholder={shareMorePlaceholder}
                value={shareMoreText}
                onChange={(e) => setShareMoreText(e.target.value)}
                onBlur={handleShareMoreBlur}
                className={inputClasses}
              />
            </div>
            <div>
              <input
                type="text"
                className={inputClasses}
              />
            </div>
            <div>
              <input
                type="text"
                className={inputClasses}
              />
            </div>
            <div>
              <input
                type="text"
                className={inputClasses}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
