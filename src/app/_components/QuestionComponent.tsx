import Link from "next/link";
import Image from "next/image";

interface QuestionComponentProps {
  description?: string;
  sectionNumber?: number;
  sectionTitle?: string;
  children?: React.ReactNode;
  privacyNotice?: string;
  previousUrl?: string;
  nextUrl?: string;
}

export default function QuestionComponent({
  description,
  sectionTitle,
  privacyNotice,
  previousUrl,
  nextUrl,
}: QuestionComponentProps) {
  return (
    <div className="flex max-sm:h-[calc(100vh-343px)] md:min-h-[1350px] flex-col bg-[#e8e5e0]">
      <div className="flex-1 md:px-[72px] py-5 md:py-9 px-4">
        <div className="md:mb-[95px] mb-16">
          <p className="text-[13px] leading-[18px] md:text-[26px] md:leading-[36px] lowercase text-justify font-sucker md:font-bold antialiased text-black">
            {description}
          </p>
        </div>

        <div className="mb-16">
          <div className="bg-white md:px-8 md:py-4.5 px-4 py-[9px] text-center">
            <h2 className="text-[28px] max-sm:text-[14px] font-untitled-sans leading-[100%] tracking-[0.01px] text-black uppercase">
              {sectionTitle}
            </h2>
          </div>

          <div className="mt-[42px] max-sm:mt-[16px] flex items-center justify-center gap-[42px] max-sm:gap-[24px]">
            <Link
              className="flex items-center justify-center opacity-100 transition-opacity duration-200 hover:opacity-70"
              aria-label="Previous section"
              href={previousUrl ?? ""}
            >
              <Image
                src="/assets/images/triangle-left.svg"
                alt="Previous section"
                width={42}
                height={32}
                className="max-sm:w-[20px] max-sm:h-[20px]"
              />
            </Link>

            <Link
              className="flex items-center justify-center opacity-100 transition-opacity duration-200 hover:opacity-70"
              aria-label="Next section"
              href={nextUrl ?? ""}
            >
              <Image
                src="/assets/images/Triangle-right.svg"
                alt="Next section"
                width={42}
                height={32}
                className="max-sm:w-[20px] max-sm:h-[20px]"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="md:px-[72px] md:py-8 pt-0 pb-8 px-4 mt-auto">
        <div className="mx-auto">
          <p className="md:text-[21px] text-[8px] leading-[18px] md:leading-[27px] text-justify font-normal font-untitled-serif text-[#0A0909] antialiased">
            {privacyNotice}
          </p>
        </div>
      </div>
    </div>
  );
}
