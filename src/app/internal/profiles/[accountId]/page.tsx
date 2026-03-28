import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getCurrentAccountId } from "~/server/auth/session";
import { loadProfile } from "~/server/aria/store";

export const dynamic = "force-dynamic";

export default async function ProfileDetail({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const currentAccount = await getCurrentAccountId();
  if (!currentAccount) redirect("/login");

  const { accountId: rawId } = await params;
  const accountId = Number.parseInt(rawId, 10);
  if (Number.isNaN(accountId)) notFound();

  const profile = await loadProfile(accountId);
  if (!profile) notFound();

  return (
    <div className="min-h-screen bg-[#eae7e2] px-4 py-8 md:px-16">
      <Link
        href="/internal/profiles"
        className="mb-6 inline-block text-[12px] uppercase tracking-widest text-gray-500 hover:text-black"
      >
        &larr; All Profiles
      </Link>

      <h1 className="mb-1 text-[22px] font-bold tracking-wide text-black">
        ARIA Profile — Account {profile.account_id}
      </h1>
      <div className="mb-8 flex flex-wrap gap-4 text-[11px] text-gray-500">
        <span>v{profile.profile_version}</span>
        <span>Compiler {profile.source_profile.compiler_version}</span>
        <span>Questionnaire {profile.source_profile.questionnaire_version}</span>
        <span>Compiled {profile.source_profile.compiled_at.slice(0, 16).replace("T", " ")}</span>
        <span
          className={
            profile.status.state === "active"
              ? "text-green-700"
              : "text-amber-700"
          }
        >
          {profile.status.state}
        </span>
      </div>

      {/* Identity Summary */}
      <Section title="Identity Summary">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          <Stat
            label="Primary"
            value={formatArchetype(profile.identity_summary.primary_archetype)}
          />
          <Stat
            label="Secondary"
            value={formatArchetype(profile.identity_summary.secondary_archetype)}
          />
          <Stat
            label="Tertiary"
            value={formatArchetype(profile.identity_summary.tertiary_archetype ?? null)}
          />
          <Stat
            label="Discrimination"
            value={profile.identity_summary.discrimination.replace(/_/g, " ")}
            warn={profile.identity_summary.discrimination === "low_separation"}
          />
          <Stat
            label="Rank Spread"
            value={profile.identity_summary.rank_spread.toFixed(3)}
            warn={profile.identity_summary.rank_spread < 0.03}
          />
          <Stat
            label="Confidence"
            value={pct(profile.identity_summary.confidence_score)}
            warn={profile.identity_summary.confidence_score < 0.5}
          />
          <Stat
            label="Completeness"
            value={pct(profile.identity_summary.completeness_score)}
            warn={profile.identity_summary.completeness_score < 0.8}
          />
        </div>
      </Section>

      {/* Preference Vectors */}
      <Section title="Preference Vectors">
        <BarChart
          data={profile.preference_vectors as unknown as Record<string, number>}
        />
      </Section>

      {/* Archetype Scores (all 11) */}
      <Section title="Archetype Scores">
        <BarChart
          data={profile.archetype_scores}
          format={formatArchetype}
          highlight={profile.identity_summary.primary_archetype}
        />
      </Section>

      {/* Behavioral Modifiers */}
      <Section title="Behavioral Modifiers">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat
            label="Decisiveness"
            value={pct(profile.behavioral_modifiers.decisiveness)}
          />
          <Stat
            label="Completion Commitment"
            value={pct(profile.behavioral_modifiers.completion_commitment)}
          />
        </div>
      </Section>

      {/* Provenance */}
      <Section title="Provenance">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat
            label="Questions Answered"
            value={`${profile.provenance.total_questions_answered} / ${profile.provenance.total_questions_available}`}
          />
          <Stat
            label="Explicit Signal"
            value={pct(profile.provenance.explicit_signal_weight)}
          />
          <Stat
            label="Behavioral Signal"
            value={pct(profile.provenance.behavioral_signal_weight)}
          />
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-[14px] font-bold uppercase tracking-widest text-black">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Stat({
  label,
  value,
  warn = false,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div className="bg-white px-4 py-3">
      <div className="text-[10px] uppercase tracking-widest text-gray-500">
        {label}
      </div>
      <div
        className={`mt-1 text-[18px] font-bold ${warn ? "text-amber-700" : "text-black"}`}
      >
        {value}
      </div>
    </div>
  );
}

function BarChart({
  data,
  format,
  highlight,
}: {
  data: Record<string, number>;
  format?: (key: string | null) => string;
  highlight?: string | null;
}) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, v]) => v), 0.01);

  return (
    <div className="space-y-2">
      {entries.map(([key, value]) => {
        const label = format ? format(key) : key.replace(/_preference$/, "").replace(/_/g, " ");
        const widthPct = Math.max((value / max) * 100, 2);
        const isHighlight = highlight === key;

        return (
          <div key={key} className="flex items-center gap-3">
            <div className="w-[140px] text-right text-[11px] text-gray-600">
              {label}
            </div>
            <div className="flex-1">
              <div
                className={`h-5 transition-all ${isHighlight ? "bg-black" : "bg-gray-400"}`}
                style={{ width: `${widthPct}%` }}
              />
            </div>
            <div
              className={`w-[50px] text-right font-mono text-[12px] ${isHighlight ? "font-bold" : ""}`}
            >
              {value.toFixed(3)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatArchetype(key: string | null): string {
  if (!key) return "—";
  return (
    "The " +
    key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

function pct(value: number): string {
  return `${Math.round(value * 100)}%`;
}
