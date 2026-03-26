"use client";
import Banner from "~/app/_components/Banner";
import Login from "~/app/login/Login";

export default function LoginPage() {
  return (
    <>
      <Banner
        mainImageSrc="/assets/images/banner-1.png"
        highlight={
          <>
            <span>
              Artist Highlight: Image by Carmen Mitrotta              
            </span>
          </>
        }
      >
        <div className="leading-[1.18] tracking-[0.01em] font-central-avenue text-center text-white uppercase text-[32px] lg:text-[72px] antialiased">
          <div>First</div>
          <div>
            We Eat,
            <span className="relative top-[3px] ml-2 align-super text-[1.3rem] lg:text-[2.2rem] lg:-top-[2px] font-normal underline">
              then
            </span>
          </div>
          <div>We Do</div>
          <div>Everything</div>
          <div>Else</div>
        </div>
      </Banner>
      <Login />
    </>
  );
}
