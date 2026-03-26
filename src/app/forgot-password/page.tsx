import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-[1300px] max-sm:h-[calc(100vh-343px)] flex-col bg-[#eae7e2] px-4 md:px-16 pt-[24px] pb-8 md:pt-[40px]">
      <div className="mx-auto w-full max-w-lg min-w-full">
        <h2 className="md:text-[22px] text-[10px] font-sucker-heavy tracking-[0.1em] text-black mb-4 md:mb-3">
          reset password
        </h2>
        <p className="md:text-[20px] text-[10px] leading-normal tracking-[0.03rem] text-[#0A0909] mb-6">
          Please contact us at{" "}
          <a
            href="mailto:support@mercatofabbrica.com"
            className="underline font-bold"
          >
            support@mercatofabbrica.com
          </a>{" "}
          to reset your password.
        </p>
        <Link
          href="/login"
          className="font-sucker-heavy text-[10px] leading-normal md:text-[20px] font-bold tracking-[0.1em] text-black uppercase hover:underline"
        >
          back to login
        </Link>
      </div>
    </div>
  );
}
