import { Suspense } from "react";
import ClientTable from "./client/Table";
import { z } from "zod";
import { Alert } from "./alert";
import { AnalyticsImpressionSample } from "@bitmovin/api-sdk";
import Spinner from "@/components/client/Spinner";
import { intlFormat } from "date-fns";

export type UserSessionLogProps = {
  analyticsSamples: AnalyticsImpressionSample[];

  // TODO: would be better to add the table props types
  variant?: any;
};

export default function UserSessionLog(props: UserSessionLogProps) {
  return (
    <Suspense fallback={<Fallback {...props} />}>
      {/* @ts-expect-error suspense */}
      <Component {...props} />
    </Suspense>
  );
}

export function Fallback(props: UserSessionLogProps) {
  return (
    <div>
      <Spinner />
      Loading sessions
    </div>
  );
}

function returnValueOrEmptyString(value?: any) {
  return value ? value : "";
}

async function Component(props: UserSessionLogProps) {
  try {
    const analyticsSamples = props.analyticsSamples as any[];

    const relevantFieldsOnly = analyticsSamples
      .sort((a, b) => a.sequence_number - b.sequence_number)
      .map((sample: any) => {
        return {
          "#": returnValueOrEmptyString(sample.sequence_number),
          "Client Time": sample.client_time
            ? intlFormat(sample.client_time, {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
          State: returnValueOrEmptyString(sample.state),
          PST: returnValueOrEmptyString(sample.player_startuptime),
          VST: returnValueOrEmptyString(sample.video_startuptime),
          Duration: returnValueOrEmptyString(sample.duration),
          Buffered: returnValueOrEmptyString(sample.buffered),
          Played: returnValueOrEmptyString(sample.played),
          Seeked: returnValueOrEmptyString(sample.seeked),
          "Videotime Start": returnValueOrEmptyString(sample.videotime_start),
          "Videotime End": returnValueOrEmptyString(sample.videotime_end),
          "Video Bitrate": returnValueOrEmptyString(sample.video_bitrate),
          "Video Resolution":
            sample.video_window_width && sample.video_window_height
              ? `${sample.video_window_width}x${sample.video_window_height}`
              : "",
          "Subtitle Language": returnValueOrEmptyString(sample.subtitle_enabled),
          "Audio Language": returnValueOrEmptyString(sample.audio_language),
        };
      });

    const columns = Object.keys(relevantFieldsOnly[0]).map((fieldName) => {
      return {
        id: fieldName,
        children: <>{fieldName}</>,
      };
    });

    return <ClientTable {...props} columns={columns} items={relevantFieldsOnly} />;
  } catch (e) {
    const safeError = z.instanceof(Error).parse(e);
    return <Alert error={safeError}></Alert>;
  }
}
