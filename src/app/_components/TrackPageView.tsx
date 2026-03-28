"use client";
import { useEffect } from "react";
import { track } from "~/lib/analytics";

export default function TrackPageView({
  eventName,
  questionnaireId,
}: {
  eventName: string;
  questionnaireId?: number;
}) {
  useEffect(() => {
    track(eventName, { questionnaireId });
  }, [eventName, questionnaireId]);

  return null;
}
