import { PageProps } from "@/app/types";
import { redirect } from "next/navigation";

import {
  fetchStreamSessionDetails,
} from "@/server/aws";
import Board from "@/client/Board";
import getDictionary from "@/server/dictionaries";
import Spinner from "@/client/Spinner";
import Header from "@/client/Header";
import BoardItem from "@/client/BoardItem";
import Table from "@/client/Table";

export default async function Page(props: PageProps<"/dashboard/stream-session-details">) {
  const dict = await getDictionary("en");
  const channelArn = props.searchParams.channelArn;
  const streamId = props.searchParams.streamId;

  if (!streamId || !channelArn) {
    redirect("/");
  }

  const details = await fetchStreamSessionDetails({}, channelArn, streamId);

  return (
    <Board
      fallback={<Spinner fallback={<p>{dict.loading}</p>} />}
      empty={<Spinner fallback={<p>{dict.loading}</p>} />}
      items={(
        [
          {
            id: 'StreamSessionEvents' as const,
            definition: {
              minColumnSpan: 1,
              minRowSpan: 3,
            },
            data: {
              header: (
                <Header
                  variant="h3"
                  fallback={
                    <Spinner fallback={<p>Loading...</p>} />
                  }
                >
                  Stream Events
                </Header>
              ),
              footer: <></>,
              element: (
                <h5>Test</h5>
              ),
              disableContentPaddings: false,
            }
          },
          {
            id: 'StreamSessionMetrics' as const,
            definition: {
              minColumnSpan: 1,
              minRowSpan: 3,
            },
            data: {
              header: (
                <Header
                  variant="h3"
                  fallback={
                    <Spinner fallback={<p>Loading...</p>} />
                  }
                >
                  Stream Metrics
                </Header>
              ),
              footer: <></>,
              element: (
                <h5>Test</h5>
              ),
              disableContentPaddings: false,
            }
          },
          {
            id: 'IngestCodecConfiguration' as const,
            definition: {
              minColumnSpan: 1,
              minRowSpan: 3,
            },
            data: {
              header: (
                <Header
                  variant="h3"
                  fallback={
                    <Spinner fallback={<p>Loading...</p>} />
                  }
                >
                  Codec Configuration
                </Header>
              ),
              footer: <></>,
              element: (
                <h5>Test</h5>
              ),
              disableContentPaddings: false,
            }
          },
          {
            id: 'StreamSessionHealth' as const,
            definition: {
              minColumnSpan: 1,
              minRowSpan: 3,
            },
            data: {
              header: (
                <Header
                  variant="h3"
                  fallback={
                    <Spinner fallback={<p>Loading...</p>} />
                  }
                >
                  Stream Health
                </Header>
              ),
              footer: <></>,
              element: (
                <h5>Test</h5>
              ),
              disableContentPaddings: false,
            }
          },
          {
            id: 'PlaybackHealth' as const,
            definition: {
              minColumnSpan: 1,
              minRowSpan: 3,
            },
            data: {
              header: (
                <Header
                  variant="h3"
                  fallback={
                    <Spinner fallback={<p>Loading...</p>} />
                  }
                >
                  Playback Health
                </Header>
              ),
              footer: <></>,
              element: (
                <h5>Test</h5>
              ),
              disableContentPaddings: false,
            }
          },
          {
            id: 'PlaybackSessionList' as const,
            definition: {
              minColumnSpan: 1,
              minRowSpan: 3,
            },
            data: {
              header: (
                <Header
                  variant="h3"
                  fallback={
                    <Spinner fallback={<p>Loading...</p>} />
                  }
                >
                  Playback Session List
                </Header>
              ),
              footer: <></>,
              element: (
                <h5>Test</h5>
              ),
              disableContentPaddings: false,
            }
          },
        ]
      )}
    />
  );
}
