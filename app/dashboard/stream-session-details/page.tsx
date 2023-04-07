import { PageProps } from "@/app/types";
import { redirect } from "next/navigation";

import {
  fetchStreamSessionDetails,
} from "@/server/aws";
import Board from "@/client/Board";
import getDictionary from "@/server/dictionaries";
import Spinner from "@/client/Spinner";
import Header from "@/client/Header";
import Table from "@/client/Table";

export default async function Page(props: PageProps<"/dashboard/stream-session-details">) {
  const dict = await getDictionary("en");
  const channelArn = props.searchParams.channelArn;
  const streamId = props.searchParams.streamId;

  if (!streamId || !channelArn) {
    redirect("/");
  }

  const details = await fetchStreamSessionDetails({ next: { revalidate: 60 } }, channelArn, streamId);

  const encodingConfigItems = getEncodingConfigItems(details.streamSession?.ingestConfiguration);

  return (
    <Board
      fallback={<Spinner fallback={<p>{dict.loading}</p>} />}
      empty={<Spinner fallback={<p>{dict.loading}</p>} />}
      items={(
        [
          {
            id: 'StreamSessionEvents' as const,
            definition: {
              minColumnSpan: 2,
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
                <Table
                  fallback={
                    <Spinner fallback={<p>Loading...</p>} />
                  }
                  columnDefinitions={[]}
                  items={(
                    details.streamSession?.truncatedEvents?.map(event => {
                      return {
                        name: <>{event.name || ''}</>,
                        time: <>{event.eventTime?.toISOString() || ''}</>,
                      }
                    }) || []
                  )}
                  columns={{
                    name: {
                      header: <>{"Event"}</>,
                    },
                    time: {
                      header: <>{"Time"}</>,
                    }
                  }}
                />
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
                <h5>No data yet</h5>
              ),
              disableContentPaddings: false,
            }
          },
          {
            id: 'IngestCodecConfiguration' as const,
            definition: {
              minColumnSpan: 1,
              minRowSpan: 6,
            },
            data: {
              header: (
                <Header
                  variant="h3"
                  fallback={
                    <Spinner fallback={<p>Loading...</p>} />
                  }
                >
                  Encoding Configuration
                </Header>
              ),
              footer: <></>,
              element: (
                <Table
                  fallback={
                    <Spinner fallback={<p>Loading...</p>} />
                  }
                  columnDefinitions={[]}
                  items={(
                    encodingConfigItems
                  )}
                  columns={{
                    name: {
                      header: <>{"Name"}</>,
                    },
                    value: {
                      header: <>{"Details"}</>,
                    }
                  }}
                />
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
                <h5>No data yet</h5>
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
                <h5>No data yet</h5>
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
                <h5>No data yet</h5>
              ),
              disableContentPaddings: false,
            }
          },
        ]
      )}
    />
  );
}

function getEncodingConfigItems(encodingConfig: IngestConfiguration | undefined) {
  const encodingConfigItems = [];

  if (encodingConfig?.video) {
    for (const key of Object.keys(encodingConfig?.video)) {
      encodingConfigItems.push({
        name: <>{key}</>,
        value: <>{(encodingConfig.video as any)[key]}</>,
      });
    }
  }
  if (encodingConfig?.audio) {
    for (const key of Object.keys(encodingConfig?.audio)) {
      encodingConfigItems.push({
        name: <>{key}</>,
        value: <>{(encodingConfig.audio as any)[key]}</>,
      });
    }
  }

  return encodingConfigItems;
}
