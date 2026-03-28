import Image from "next/image";
import HighlightActions from "./HighlightActions";
interface BannerProps {
  leftImageSrc?: string;
  rightImageSrc?: string;
  alt?: string;
  children: React.ReactNode;
  highlight?: React.ReactNode;
  mainImageSrc?: string;
  currentQuestion?: number;
  totalQuestions?: number;
}

export default function Banner({ 
  leftImageSrc,
  rightImageSrc,
  alt = "", 
  children, 
  highlight,
  mainImageSrc,
  currentQuestion,
  totalQuestions
}: BannerProps) {
  return (
    <div className="relative w-full pb-[20px] md:pb-[32px] min-h-[280px] h-[calc(75vw_-_20px)] md:h-[560px] flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full banner-container">
        {mainImageSrc && <div className="absolute left-0 top-0 w-full h-full z-0">
          <Image
            src={mainImageSrc}
            alt={`${alt} - main`}
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>}

        {leftImageSrc && <div className="absolute left-0 top-0 w-1/2 h-full z-0">
          <Image
            src={leftImageSrc}
            alt={`${alt} - left`}
            fill
            priority
            className="object-cover object-center"
            sizes="50vw"
          />
        </div>}
        
        {rightImageSrc && <div className="absolute right-0 top-0 w-1/2 h-full z-0">
          <Image
            src={rightImageSrc}
            alt={`${alt} - right`}
            fill
            priority
            className="object-cover object-center"
            sizes="50vw"
          />
        </div>}

        <div className="absolute inset-0 flex top-0 items-start justify-center z-10 px-4">
          <div className="text-center relative top-[30px] lg:top-[78px] max-w-[230px] md:max-w-[520px]">
            {children}
          </div>
        </div>

      </div>

      {currentQuestion && totalQuestions && (
        <div className="absolute top-13 right-1 md:top-[48px] md:right-[72px] z-20">
          <div className="md:px-0 px-4 py-2 rounded-sm">
            <span className="text-white md:text-[28px] font-central-avenue tracking-wide text-[16px]">
              N<span className="antialiased relative md:text-[26px] md:leading-[26px] text-[16px] leading-[16px] inline-block md:top-[-2px] top-[0]">o</span> {currentQuestion.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      )}

      <div className="h-[20px] md:h-[30px] absolute bottom-0 left-0 w-full flex items-center justify-between px-4 md:px-[72px] py-0 bg-[#eae7e2] bg-opacity-95 z-20 highlight-container">
        <div className="text-black text-justify font-untitled-serif-italic text-xs leading-normal tracking-[0.004px] whitespace-nowrap overflow-hidden text-ellipsis text-[7px] antialiased md:text-[14px]">
          {highlight}
        </div>
        <div className="lg:absolute lg:left-[1323px]">
          <HighlightActions />
        </div>
      </div>
    </div>
  );
}
