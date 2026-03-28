import { redirect } from "next/navigation";
import { getCurrentAccountId } from "~/server/auth/session";
import {
  getFunnelStats,
  getDropoffByQuestion,
  getTimePerQuestion,
  getSaveFailureRate,
} from "~/server/analytics/queries";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const accountId = await getCurrentAccountId();
  if (!accountId) redirect("/login");

  const [funnel, dropoff, timing, saves] = await Promise.all([
    getFunnelStats(),
    getDropoffByQuestion(),
    getTimePerQuestion(),
    getSaveFailureRate(),
  ]);

  const timingMap = Object.fromEntries(
    timing.map((t) => [t.questionId, t]),
  );

  return (
    <div className="min-h-screen bg-[#eae7e2] px-4 py-8 md:px-16">
      <h1 className="mb-8 text-[22px] font-bold tracking-wide text-black">
        Analytics
      </h1>

      {/* Funnel Summary */}
      <section className="mb-10">
        <h2 className="mb-4 text-[16px] font-bold uppercase tracking-widest text-black">
          Funnel Summary
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat label="Login Views" value={funnel.loginViewed} />
          <Stat label="Login Success" value={funnel.loginSuccess} />
          <Stat label="Register Views" value={funnel.registerViewed} />
          <Stat label="Register Success" value={funnel.registerSuccess} />
          <Stat label="Questionnaire Started" value={funnel.started} />
          <Stat label="Questionnaire Completed" value={funnel.completed} />
          <Stat
            label="Completion Rate"
            value={`${funnel.completionRate}%`}
            highlight={funnel.completionRate < 50}
          />
        </div>
      </section>

      {/* Drop-off by Question */}
      <section className="mb-10">
        <h2 className="mb-4 text-[16px] font-bold uppercase tracking-widest text-black">
          Drop-off by Question
        </h2>
        {dropoff.length === 0 ? (
          <p className="text-[14px] text-gray-500">No data yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-black text-[11px] uppercase tracking-widest">
                  <th className="py-2 pr-4">Q</th>
                  <th className="py-2 pr-4">Question</th>
                  <th className="py-2 pr-4">Views</th>
                  <th className="py-2 pr-4">Saves</th>
                  <th className="py-2 pr-4">Continue</th>
                  <th className="py-2 pr-4">Drop</th>
                  <th className="py-2">Time (s)</th>
                </tr>
              </thead>
              <tbody>
                {dropoff.map((row) => {
                  const t = timingMap[row.questionId];
                  const isHighDrop =
                    row.dropoff !== null &&
                    row.views > 0 &&
                    row.dropoff / row.views > 0.2;
                  const isSlow = t && t.avgSeconds > 10;

                  return (
                    <tr
                      key={row.questionId}
                      className="border-b border-gray-300"
                    >
                      <td className="py-2 pr-4 font-mono">
                        {row.questionId}
                      </td>
                      <td className="max-w-[300px] truncate py-2 pr-4">
                        {row.questionText}
                      </td>
                      <td className="py-2 pr-4">{row.views}</td>
                      <td className="py-2 pr-4">{row.saves}</td>
                      <td className="py-2 pr-4">
                        {row.continueCount ?? "—"}
                      </td>
                      <td
                        className={`py-2 pr-4 ${isHighDrop ? "font-bold text-red-700" : ""}`}
                      >
                        {row.dropoff ?? "—"}
                        {isHighDrop && " !!"}
                      </td>
                      <td
                        className={`py-2 ${isSlow ? "font-bold text-amber-700" : ""}`}
                      >
                        {t ? t.avgSeconds : "—"}
                        {isSlow && " !!"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Save Failure Rate */}
      <section className="mb-10">
        <h2 className="mb-4 text-[16px] font-bold uppercase tracking-widest text-black">
          Save Reliability
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat label="Total Saves" value={saves.total} />
          <Stat label="Successful" value={saves.saved} />
          <Stat label="Failed" value={saves.failed} highlight={saves.failed > 0} />
          <Stat
            label="Success Rate"
            value={`${saves.successRate}%`}
            highlight={saves.successRate < 99}
          />
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="bg-white px-4 py-3">
      <div className="text-[10px] uppercase tracking-widest text-gray-500">
        {label}
      </div>
      <div
        className={`mt-1 text-[20px] font-bold ${highlight ? "text-red-700" : "text-black"}`}
      >
        {value}
      </div>
    </div>
  );
}
