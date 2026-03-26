import Image from "next/image";
import Link from "next/link";

interface QuestionnaireProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  backgroundImage?: string;
  showIcon?: boolean;
  highlight?: React.ReactNode;
  buttonUrl?: string;
}

export default function Questionnaire({
  title,
  subtitle,
  description,
  buttonText,
  backgroundImage,
  highlight,
  buttonUrl = "/question",
}: QuestionnaireProps) {
  return (
    <div className="relative h-[2429px] max-sm:h-[calc(100vh-52px)] overflow-hidden">
      <div className="absolute inset-0 z-0 brightness-75">
        <Image
          src={backgroundImage ?? ""}
          alt="Questionnaire Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="relative top-[8px] md:top-[100px] lg:top-[230px] z-10 mx-auto px-8 text-center">
        <div className="md:mb-[45px] lg:mb-[100px]">
          <div className="inline-block py-4 pb-9 px-8 md:py-6">
            <h1 className="mb-2 text-[32px] md:text-[72px] font-central-avenue font-bold tracking-[0.026px] text-white antialiased">
              {title?.includes("CHOICES") ? (
                <>
                  {title.split(" ")[0]}{" "}
                  <span className="relative -top-[12px] md:-top-[25px] md:text-[36px] font-central-avenue text-sm font-normal text-white underline">
                    {title.split(" ")[1]}
                  </span>
                </>
              ) : (
                title?.includes("CHOICE*") ? (
                  <>
                    {title.split("CHOICE*")[0]?.split(" ")[0]}{" "}
                    <div className="flex gap-4">
                      {title.split("CHOICE*")[0]?.split(" ")[1]}{" "}
                      <span className="relative font-central-avenue text-3xl font-normal text-white underline max-sm:text-sm md:text-4xl">
                        CHOICE
                      </span>
                    </div>
                  </>
                ):
                (
                  title?.includes("SUBTLE CHOICE BASED QUESTIONS") ? (
                    <div>
                      <p className="flex gap-4 text-center justify-center">
                        SUBTLE
                        <span className="relative font-central-avenue text-3xl font-normal text-white underline max-sm:text-sm md:text-4xl">
                          CHOICE
                        </span>
                      </p>
                      <p>BASED QUESTIONS</p>
                    </div>
                  ):
                  (
                    title
                  )
                )
              )}
            </h1>
            <h2 className="hidden text-7xl max-sm:text-[32px] font-central-avenue tracking-[0.026px] max-sm:tracking-[0.01px] text-white max-sm:text-2xl md:text-7xl">
              {subtitle}
            </h2>
          </div>
        </div>

        <div className="mx-auto max-w-[800px] md:mb-[48px]">
          <p className="antialiased leading-[36px] text-[18px] font-untitled-serif tracking-[0.026px] text-white md:text-[48px] md:leading-[84px]">
            {description}
          </p>
        </div>
      </div>

      <div className="align-center relative top-18 md:top-55 z-20 mx-auto px-16 max-sm:px-4">
        {buttonText && (
          <div className="mb-4 md:mb-8 w-full">
            <button className="group relative w-full overflow-hidden bg-white px-2 md:px-12 py-5 lg:py-[40px] font-untitled-sans font-bold tracking-widest text-gray-800 uppercase transition-colors duration-300 hover:bg-gray-100 leading-none">
              <span className="relative z-10 text-[14px] md:text-2xl lg:text-4xl font-bold tracking-[0.013px]">
                {buttonText}
              </span>
            </button>
          </div>
        )}
        <div className="z-20 mt-0 md:mt-12 flex justify-center">
          <Link href={buttonUrl}>
            <Image              
              src="/assets/images/Triangle.png"
              alt="Triangle"
              width={108}
              height={81}
              className="cursor-pointer w-[37px] h-[40px] md:w-[74px] md:h-[90px]"
            />
          </Link>
        </div>
      </div>

      {highlight && (
        <div className="absolute bottom-0 left-0 z-20 flex w-full items-center justify-between px-4 md:px-16 py-3">
          <div className="font-untitled-serif-italic text-[8px] md:text-[12px] overflow-hidden text-justify leading-normal font-normal tracking-[0.004px] text-ellipsis whitespace-nowrap text-white antialiased">
            {highlight}
          </div>
          <div className="flex items-center gap-2 md:gap-6">
            <button
              aria-label="Like this image"
              className="transition-opacity duration-200 hover:opacity-60"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EAE7E3"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[10px] w-[10px] md:h-[16px] md:w-[16px]"
              >
                <path d="M19.25 4.75A5.38 5.38 0 0 0 12 8.13 5.38 5.38 0 0 0 4.75 4.75 5.38 5.38 0 0 0 3 9.38c0 4.24 7.18 10.37 9 11.62 1.82-1.25 9-7.38 9-11.62A5.38 5.38 0 0 0 19.25 4.75z" />
              </svg>
            </button>
            <button
              aria-label="Share this image"
              className="transition-opacity duration-200 hover:opacity-60"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EAE7E3"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[10px] w-[10px] md:h-[16px] md:w-[16px] max-sm:background-white"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
