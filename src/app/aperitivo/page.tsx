import Link from "next/link";
import Image from "next/image";


export default function Aperitivo() {
  const backgroundImage = "/assets/images/aperitivo-vignetta-substack.png";

  return (
    <div className="bg-[#e8e5e0]">
      <div
        className="relative mx-auto min-h-[calc(100vh-80px)] w-full max-w-[1440px] lg:h-[1910px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.34)), url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="px-8 py-7 md:py-16 lg:pt-[168px]">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="mb-11 text-4xl leading-tight font-untitled-serif text-white antialiased max-sm:text-[24px] md:mb-14 md:mt-[50px] md:text-5xl lg:mb-[90px] lg:mt-0 lg:text-[96px]">
              <p>The journey</p>
              <p>
                continues in <em className="italic">Aperitivo</em>.
              </p>
            </h1>

            <div className="mx-auto mb-18 space-y-6 md:mb-22 lg:mb-24 lg:h-[672px] lg:w-[880px]">
              <p className="text-center font-untitled-serif text-[18px] leading-[36px] tracking-[0] text-white antialiased md:text-2xl md:leading-[48px] lg:text-[48px] lg:leading-[84px]">
                <span className="hidden lg:inline">
                  While we ready your full Mercato<br />
                  Fabbrica experience, we invite you into our<br />
                  living room of taste and culture—a place<br />
                  for seasonal reflections, stories, and rituals<br />
                  shared in good company. <em className="italic">Aperitivo</em><br />
                  is where the flavor of your journey<br />
                  keeps unfolding.
                </span>
                <span className="lg:hidden">
                  While we ready your full Mercato Fabbrica experience, we invite
                  you into our living room of taste and culture—a place for
                  seasonal reflections, stories, and rituals shared in good
                  company. <em className="italic">Aperitivo</em> is where the
                  flavor of your journey keeps unfolding.
                </span>
              </p>
            </div>

            <div className="mb-4 md:mb-8">
              <Link
                className="inline-flex items-center justify-center bg-white px-12 py-[15px] text-[18px] uppercase tracking-[0.01px] text-black font-untitled-sans transition-colors duration-200 hover:bg-gray-100 max-sm:mt-[80px] lg:h-[103px] lg:w-[598px] lg:text-[36px]"
                href="/"
              >
                READ THE VIGNETTA &rarr;
              </Link>
            </div>
            <div className="mt-0 flex justify-center md:mt-12">
              <Link href="/">
                <Image
                  src="/assets/images/Triangle.png"
                  alt="Triangle"
                  width={108}
                  height={81}
                  className="h-[40px] w-[37px] cursor-pointer md:h-[90px] md:w-[74px]"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-[72px] md:right-[72px] lg:bottom-auto lg:top-[1709px]">
          <div className="text-[18px] font-untitled-serif-italic leading-normal tracking-[0.004px] text-white antialiased lg:text-[48px]">
            A celebration of taste.
          </div>
        </div>
      </div>
    </div>
  );
}
