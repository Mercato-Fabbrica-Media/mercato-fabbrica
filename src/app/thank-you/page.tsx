import Link from "next/link";

export default function ThankYou() {
  const backgroundImage = '/assets/images/thank-you.png';

  return (
    <>
      <div className="min-h-screen relative" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="flex items-center justify-center sm:min-h-screen px-8 md:py-16 py-7">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="md:mt-[50px] lg:mt-[170px] lg:mb-[90px] text-4xl max-sm:text-[24px] md:text-5xl lg:text-[96px] font-untitled-serif text-white mb-11 md:mb-14 leading-tight antialiased">
              <p>Pleasure with purpose</p>
              <p>becomes <em className="italic">Joyous Living</em>.</p>
            </h1>

            <div className="space-y-6 mb-18 md:mb-22 max-w-4xl mx-auto lg:mb-24">
              <p className="antialiased lg:leading-[84px] md:leading-[48px] font-untitled-serif text-white text-[18px] leading-[36px] tracking-[0] md:text-2xl lg:text-5xl">
                We&apos;re deeply grateful for the time you&apos;ve taken to share your insights with us. Your responses help us shape a more nuanced and meaningful experience—one that resonates with the intricate tapestry of your life, values, and aesthetic.
                <br/>Thank you for granting us a window into your world.
              </p>
            </div>

            <div className="mb-16">
              <Link
                className="bg-white text-black px-12 lg:px-[60px] lg:py-[40px] py-[15px] lg:text-[36px] text-[18px] font-untitled-sans tracking-[0.01px] uppercase hover:bg-gray-100 transition-colors duration-200 max-sm:mt-[80px]"
                href="/"
              >
                THANK YOU
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full py-4 px-4 text-white text-justify font-untitled-serif-italic text-xs leading-normal tracking-[0.004px] whitespace-nowrap overflow-hidden text-ellipsis text-[7px] antialiased md:text-[12px]">Artist Highlight: Image by Theo Vamvounakis and Kerinan Monaghan Seasonal Fruit Jams, 2018</div>
      </div> 
    </>
  );
}