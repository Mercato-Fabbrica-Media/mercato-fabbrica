import "server-only";
import { db } from "~/server/db";
import type { AriaProfile } from "./types";

/**
 * Persists an AriaProfile to the database.
 * Upserts by accountId — latest compilation wins.
 */
export async function saveProfile(profile: AriaProfile) {
  return db.ariaProfileRecord.upsert({
    where: {
      profileId: profile.profile_id,
    },
    create: {
      profileId: profile.profile_id,
      accountId: profile.account_id,
      profileVersion: profile.profile_version,
      compilerVersion: profile.source_profile.compiler_version,
      questionnaireVersion: profile.source_profile.questionnaire_version,
      primaryArchetype: profile.identity_summary.primary_archetype,
      secondaryArchetype: profile.identity_summary.secondary_archetype,
      confidenceScore: profile.identity_summary.confidence_score,
      completenessScore: profile.identity_summary.completeness_score,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      profileData: JSON.parse(JSON.stringify(profile)),
      state: profile.status.state,
    },
    update: {
      profileVersion: profile.profile_version,
      compilerVersion: profile.source_profile.compiler_version,
      questionnaireVersion: profile.source_profile.questionnaire_version,
      primaryArchetype: profile.identity_summary.primary_archetype,
      secondaryArchetype: profile.identity_summary.secondary_archetype,
      confidenceScore: profile.identity_summary.confidence_score,
      completenessScore: profile.identity_summary.completeness_score,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      profileData: JSON.parse(JSON.stringify(profile)),
      state: profile.status.state,
    },
  });
}

/**
 * Loads the latest AriaProfile for an account.
 */
export async function loadProfile(
  accountId: number,
): Promise<AriaProfile | null> {
  const record = await db.ariaProfileRecord.findFirst({
    where: { accountId },
    orderBy: { createdAt: "desc" },
  });

  if (!record) return null;
  return record.profileData as unknown as AriaProfile;
}
