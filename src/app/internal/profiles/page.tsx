import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAccountId } from "~/server/auth/session";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function ProfilesIndex() {
  const currentAccount = await getCurrentAccountId();
  if (!currentAccount) redirect("/login");

  const profiles = await db.ariaProfileRecord.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      accountId: true,
      primaryArchetype: true,
      secondaryArchetype: true,
      confidenceScore: true,
      completenessScore: true,
      compilerVersion: true,
      state: true,
      createdAt: true,
    },
  });

  return (
    <div className="min-h-screen bg-[#eae7e2] px-4 py-8 md:px-16">
      <h1 className="mb-2 text-[22px] font-bold tracking-wide text-black">
        ARIA Profiles
      </h1>
      <p className="mb-8 text-[13px] text-gray-500">
        {profiles.length} compiled profile{profiles.length !== 1 && "s"}
      </p>

      {profiles.length === 0 ? (
        <p className="text-[14px] text-gray-500">
          No profiles compiled yet. Complete the questionnaire to generate one.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-black text-[11px] uppercase tracking-widest">
                <th className="py-2 pr-4">Account</th>
                <th className="py-2 pr-4">Primary</th>
                <th className="py-2 pr-4">Secondary</th>
                <th className="py-2 pr-4">Confidence</th>
                <th className="py-2 pr-4">Completeness</th>
                <th className="py-2 pr-4">State</th>
                <th className="py-2 pr-4">Compiler</th>
                <th className="py-2">Compiled</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr
                  key={p.accountId}
                  className="border-b border-gray-300"
                >
                  <td className="py-2 pr-4">
                    <Link
                      href={`/internal/profiles/${p.accountId}`}
                      className="font-mono underline"
                    >
                      {p.accountId}
                    </Link>
                  </td>
                  <td className="py-2 pr-4">
                    {formatArchetype(p.primaryArchetype)}
                  </td>
                  <td className="py-2 pr-4">
                    {formatArchetype(p.secondaryArchetype)}
                  </td>
                  <td className="py-2 pr-4">
                    <Score value={p.confidenceScore} />
                  </td>
                  <td className="py-2 pr-4">
                    <Score value={p.completenessScore} />
                  </td>
                  <td className="py-2 pr-4">
                    <span
                      className={
                        p.state === "active"
                          ? "text-green-700"
                          : p.state === "partial"
                            ? "text-amber-700"
                            : "text-gray-500"
                      }
                    >
                      {p.state}
                    </span>
                  </td>
                  <td className="py-2 pr-4 font-mono text-[11px]">
                    {p.compilerVersion}
                  </td>
                  <td className="py-2 text-[11px] text-gray-500">
                    {p.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function formatArchetype(key: string | null) {
  if (!key) return <span className="text-gray-400">—</span>;
  return key.replace("the_", "").replace(/_/g, " ");
}

function Score({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  return (
    <span
      className={
        pct >= 80
          ? "text-green-700"
          : pct >= 50
            ? "text-amber-700"
            : "text-red-700"
      }
    >
      {pct}%
    </span>
  );
}
