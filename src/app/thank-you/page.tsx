import Link from "next/link";
import Image from "next/image";
import HighlightActions from "~/app/_components/HighlightActions";
import TrackPageView from "~/app/_components/TrackPageView";
import { getCurrentAccountId } from "~/server/auth/session";
import { compileAndStoreProfile } from "~/server/aria";
import type { AriaProfile } from "~/server/aria";
import { buildRecommendationRationale } from "~/server/aria/interpretation/rationale";
import { renderProfile } from "~/server/aria/interpretation/renderProfile";
import { selectRecommendationRails } from "~/server/aria/interpretation/rails";

export const dynamic = "force-dynamic";

function getTopVector(profile: AriaProfile): { label: string; value: number } | null {
  const labels: Record<string, string> = {
    complexity_preference: "complexity and structure",
    sentiment_preference: "emotional depth and meaning",
    sensory_preference: "sensory richness",
    time_preference: "temporal anchoring and tradition",
    technique_preference: "technique and craft",
  };

  const entries = Object.entries(profile.preference_vectors) as [string, number][];
  const top = entries.sort((a, b) => b[1] - a[1])[0];
  if (!top || top[1] === 0) return null;

  const key = top[0];
  return { label: labels[key] ?? key, value: top[1] };
}

export default async function ThankYou() {
  const backgroundImage = "/assets/images/thank-you.png";

  const accountId = await getCurrentAccountId();
  let profile: AriaProfile | null = null;

  if (accountId) {
    try {
      profile = await compileAndStoreProfile(accountId);
    } catch {
      console.error("[ARIA] Profile compilation failed for account", accountId);
    }
  }

  const presentation = profile
    ? renderProfile({
        primary: profile.identity_summary.primary_archetype,
        secondary: [
          profile.identity_summary.secondary_archetype,
          profile.identity_summary.tertiary_archetype,
        ].filter((value): value is NonNullable<typeof value> => value !== null),
        confidence: profile.identity_summary.discrimination,
      })
    : null;

  const hasProfile = Boolean(
    profile &&
      presentation?.title &&
      presentation?.interpretation &&
      profile.identity_summary.confidence_score > 0,
  );
  const topVector = profile ? getTopVector(profile) : null;
  const recommendationRails = profile
    ? selectRecommendationRails({
        primaryArchetype: profile.identity_summary.primary_archetype,
        secondaryArchetypes: [
          profile.identity_summary.secondary_archetype,
          profile.identity_summary.tertiary_archetype,
        ].filter((value): value is NonNullable<typeof value> => value !== null),
        confidence: profile.identity_summary.discrimination,
      })
    : null;
  const recommendationRationale = profile
    ? buildRecommendationRationale({
        primaryArchetype: profile.identity_summary.primary_archetype,
        secondaryArchetypes: [
          profile.identity_summary.secondary_archetype,
          profile.identity_summary.tertiary_archetype,
        ].filter((value): value is NonNullable<typeof value> => value !== null),
        confidence: profile.identity_summary.discrimination,
        itemName: "Your recommendations",
        attributes: presentation?.recommendationEmphasis,
      })
    : null;

  return (
    <>
      <TrackPageView eventName="questionnaire_completed" />
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
            {hasProfile ? (
              <>
                <div className="mb-6 text-[11px] uppercase tracking-[0.3em] text-white/60 md:text-[14px]">
                  Your ARIA Signature
                </div>

                {presentation?.descriptor && (
                  <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/65 md:text-[13px]">
                    {presentation.descriptor}
                  </div>
                )}

                <h1 className="mb-8 text-4xl font-untitled-serif text-white antialiased max-sm:text-[28px] md:mb-12 md:text-5xl lg:text-[96px] lg:leading-tight">
                  {presentation?.title}
                </h1>

                <div className="mx-auto mb-10 max-w-4xl space-y-6 md:mb-16">
                  <p className="font-untitled-serif text-[16px] leading-[30px] tracking-[0] text-white antialiased md:text-xl md:leading-[40px] lg:text-[28px] lg:leading-[48px]">
                    {presentation?.interpretation}
                  </p>

                  {presentation?.clusterSummary && (
                    <p className="font-untitled-serif text-[14px] leading-[26px] text-white/70 antialiased md:text-lg md:leading-[36px] lg:text-[22px] lg:leading-[40px]">
                      {presentation.clusterSummary}
                    </p>
                  )}

                  {topVector && (
                    <p className="font-untitled-serif text-[14px] leading-[26px] text-white/80 antialiased md:text-lg md:leading-[36px] lg:text-[22px] lg:leading-[40px]">
                      Your strongest signal dimension is{" "}
                      <em className="italic text-white">{topVector.label}</em>.
                    </p>
                  )}

                  {recommendationRationale && (
                    <div className="mx-auto max-w-3xl rounded-sm border border-white/15 bg-black/15 px-5 py-5 text-left backdrop-blur-[2px]">
                      <div className="mb-2 text-[10px] uppercase tracking-[0.22em] text-white/55 md:text-[11px]">
                        {recommendationRationale.shortLabel}
                      </div>
                      <p className="font-untitled-serif text-[14px] leading-[24px] text-white/85 antialiased md:text-[18px] md:leading-[30px]">
                        {recommendationRationale.sentence}
                      </p>
                      {recommendationRails && recommendationRails.labels.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {recommendationRails.labels.map((label) => (
                            <span
                              key={label}
                              className="border border-white/20 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/70 md:text-[11px]"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mb-8 text-[10px] uppercase tracking-[0.2em] text-white/40 md:text-[12px]">
                  Composed by ARIA&trade; Engine &middot; enigmatic_choices v1.0
                </div>
              </>
            ) : (
              <>
                <h1 className="mb-11 text-4xl leading-tight font-untitled-serif text-white antialiased max-sm:text-[24px] md:mb-14 md:mt-[50px] md:text-5xl lg:mb-[90px] lg:mt-0 lg:text-[96px]">
                  <p>Pleasure with purpose</p>
                  <p>
                    becomes <em className="italic">Joyous Living</em>.
                  </p>
                </h1>

                <div className="mx-auto mb-18 space-y-6 md:mb-22 lg:mb-24 lg:h-[672px] lg:w-[880px]">
                  <p className="text-center font-untitled-serif text-[18px] leading-[36px] tracking-[0] text-white antialiased md:text-2xl md:leading-[48px] lg:text-[48px] lg:leading-[84px]">
                    <span className="hidden lg:inline">
                      We&apos;re deeply grateful for the time you&apos;ve<br />
                      taken to share your insights with us.<br />
                      Your responses help us shape a more<br />
                      nuanced and meaningful experience—one<br />
                      that resonates with the intricate tapestry<br />
                      of your life, values, and aesthetic.<br />
                      Thank you for granting us a window into<br />
                      your world.
                    </span>
                    <span className="lg:hidden">
                      We&apos;re deeply grateful for the time you&apos;ve taken to
                      share your insights with us. Your responses help us shape a
                      more nuanced and meaningful experience—one that resonates with
                      the intricate tapestry of your life, values, and aesthetic.
                      <br />
                      Thank you for granting us a window into your world.
                    </span>
                  </p>
                </div>
              </>
            )}

            <div className="mb-4 md:mb-8">
              <Link
                className="inline-flex items-center justify-center bg-white px-12 py-[15px] text-[18px] uppercase tracking-[0.01px] text-black font-untitled-sans transition-colors duration-200 hover:bg-gray-100 max-sm:mt-[80px] lg:h-[103px] lg:w-[598px] lg:text-[36px]"
                href="/aperitivo"
              >
                {hasProfile ? "EXPLORE YOUR WORLD" : "THANK YOU"}
              </Link>
            </div>
            <div className="mt-0 md:mt-12 flex justify-center">
              <Link href="/aperitivo">
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
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 md:bottom-5 md:left-[72px] md:right-[72px]">
            <div className="text-center text-[7px] font-untitled-serif-italic leading-normal tracking-[0.004px] text-white antialiased md:text-left md:text-[12px]">
              Artist Highlight: Theo Vamvounakis &amp; Kerinan Monaghan, Seasonal Fruit Jams, 2018
            </div>
            <div className="shrink-0">
              <HighlightActions />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
