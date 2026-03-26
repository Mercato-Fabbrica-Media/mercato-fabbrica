import Image from "next/image";
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
    <div className="relative w-full pb-[20px] md:pb-[32px] min-h-[280px] max-h-[calc(562px)] h-[calc(75vw_-_20px)] md:h-[calc(75vw_-_30px)] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
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

        <div className="absolute inset-0 flex top-0 items-start md:items-center justify-center z-10 px-4">
          <div className="text-center relative top-[30px] md:-top-[12px] max-w-[230px] md:max-w-[520px]">
            {children}
          </div>
        </div>

        {currentQuestion && totalQuestions && (
          <div className="absolute top-13 md:top-24 md:right-11 right-1 z-20">
            <div className="px-4 py-2 rounded-sm">
              <span className="text-white md:text-[28px] font-central-avenue tracking-wide text-[16px]">
                N<span className="antialiased relative md:text-[26px] md:leading-[26px] text-[16px] leading-[16px] inline-block md:top-[-2px] top-[0]">o</span> {currentQuestion.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        )}
      </div>

      {highlight && (
        <div className="h-[20px] md:h-[30px] absolute bottom-0 left-0 w-full flex items-center justify-between px-4 md:px-16 py-0 bg-[#eae7e2] bg-opacity-95 z-20 highlight-container">
          <div className="text-black text-justify font-untitled-serif-italic text-xs leading-normal tracking-[0.004px] whitespace-nowrap overflow-hidden text-ellipsis text-[7px] antialiased md:text-[14px]">
            {highlight}
          </div>
          <div className="flex items-center gap-2 md:gap-2">
            <button 
              aria-label="Like this image" 
              className="hover:opacity-60 transition-opacity duration-200"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#333" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-[16px] h-[16px] md:w-[22px] md:h-[22px] hover:cursor-pointer"
              >
                <path d="M19.25 4.75A5.38 5.38 0 0 0 12 8.13 5.38 5.38 0 0 0 4.75 4.75 5.38 5.38 0 0 0 3 9.38c0 4.24 7.18 10.37 9 11.62 1.82-1.25 9-7.38 9-11.62A5.38 5.38 0 0 0 19.25 4.75z"/>
              </svg>
            </button>
            <button 
              aria-label="Share this image" 
              className="hover:opacity-60 transition-opacity duration-200"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#333" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-[16px] h-[16px] md:w-[22px] md:h-[22px] hover:cursor-pointer"
              >
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
