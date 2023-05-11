import "server-only";

import { Suspense } from "react";
import { AnalyticsImpressionSample } from "@bitmovin/api-sdk";
import Spinner from "@/components/client/Spinner";
import React from "react";
import { z } from "zod";
import { Alert } from "./alert";

export type UserSessionProps = {
  data: AnalyticsImpressionSample[];
};

export default function UserSession(props: UserSessionProps) {
  return (
    <Suspense fallback={<Fallback {...props} />}>
      {/* @ts-expect-error suspense */}
      <Component {...props} />
    </Suspense>
  );
}

export function Fallback(props: Partial<UserSessionProps>) {
  return (
    <div>
      <Spinner />
      Loading sessions
    </div>
  );
}

async function Component(props: UserSessionProps) {
  try {
    const analyticsSamples = props.data;

    // Should not be as it's 'AnalyticsImpressionSample[]' but Typescript types are all over the place.
    // Example: Types define `browserVersionMajor` but API returns `browser_version_major`
    const firstSample = (analyticsSamples as any)[0];

    const customDataFields = [];
    for (let i = 2; i <= 30; i += 3) {
      customDataFields.push(
        <tr>
          {firstSample[`custom_data_${i}`] ? <td>Custom Data {i}</td> : <td></td>}
          {firstSample[`custom_data_${i}`] ? (
            <td>
              <b>{firstSample[`custom_data_${i}`]}</b>
            </td>
          ) : (
            <td></td>
          )}
          {firstSample[`custom_data_${i + 1}`] ? <td>Custom Data {i + 1}</td> : <td></td>}
          {firstSample[`custom_data_${i + 1}`] ? (
            <td>
              <b>{firstSample[`custom_data_${i + 1}`]}</b>
            </td>
          ) : (
            <td></td>
          )}
          {firstSample[`custom_data_${i + 2}`] ? <td>Custom Data {i + 2}</td> : <td></td>}
          {firstSample[`custom_data_${i + 2}`] ? (
            <td>
              <b>{firstSample[`custom_data_${i + 2}`]}</b>
            </td>
          ) : (
            <td></td>
          )}
        </tr>
      );
    }

    const errorSample = (analyticsSamples as any).find((sample: any) => sample.state === "error");
    const errorInfoElement = errorSample ? (
      <tr>
        <td>Error Code</td>
        <td>
          <b>{errorSample.error_code ?? "No code available"}</b>
        </td>
        <td>Error Message</td>
        <td>
          <b>{errorSample.error_message ?? "No message available"}</b>
        </td>
        <td>Additional Data</td>
        <td>
          <b>{errorSample ? JSON.stringify(errorSample.data) : "No additional data available"}</b>
        </td>
      </tr>
    ) : (
      <tr>
        <td colSpan={2}>
          <b>No error occurred</b>
        </td>
      </tr>
    );

    return (
      <>
        <table width="100%">
          <thead>
            <tr>
              <th colSpan={6}>Errors</th>
            </tr>
          </thead>
          <tbody>{errorInfoElement}</tbody>
          <thead>
            <tr>
              <th colSpan={6}>Device</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Operating System</td>
              <td>
                <b>
                  {firstSample.operatingsystem} {firstSample.operatingsystem_version_major}.
                  {firstSample.operatingsystem_version_minor}
                </b>
              </td>
              <td>ISP</td>
              <td>
                <b>{firstSample.isp}</b>
              </td>
              <td>User ID</td>
              <td>
                <b>{firstSample.user_id}</b>
              </td>
            </tr>
            <tr>
              <td>Browser</td>
              <td>
                <b>
                  {firstSample.browser} {firstSample.browser_version_major}.{firstSample.browser_version_minor}
                </b>
              </td>
              <td>IP Address</td>
              <td>
                <b>{firstSample.ip_address}</b>
              </td>
              <td>Custom User ID</td>
              <td>
                <b>{firstSample.custom_user_id}</b>
              </td>
            </tr>
            <tr>
              <td>Device Type</td>
              <td>
                <b>
                  {firstSample.device_type} ({firstSample.device_class})
                </b>
              </td>
              <td>Screen Size</td>
              <td>
                <b>
                  {firstSample.screen_width}x{firstSample.screen_height}
                </b>
              </td>
              <td>Visited Page</td>
              <td>
                <b>
                  {firstSample.domain}
                  {firstSample.path}
                </b>
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th colSpan={6}>Player</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Player Technology</td>
              <td></td>
              <td>Analytics Version</td>
              <td>
                <b>
                  {firstSample.platform} {firstSample.analytics_version}
                </b>
              </td>
              <td>Session Type</td>
              <td></td>
            </tr>
            <tr>
              <td>Player Version</td>
              <td>
                <b>{firstSample.player_version}</b>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th colSpan={6}>Stream</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Stream Format</td>
              <td></td>
              <td>Video ID</td>
              <td>
                <b>{firstSample.video_id}</b>
              </td>
              <td>Audio Language</td>
              <td></td>
            </tr>
            <tr>
              <td>Audio Codec</td>
              <td></td>
              <td>Video Title</td>
              <td>
                <b>{firstSample.video_title}</b>
              </td>
              <td>Subtitles</td>
              <td></td>
            </tr>
            <tr>
              <td>Video Codec</td>
              <td></td>
              <td>Video Duration</td>
              <td></td>
              <td>CDN Provider</td>
              <td>
                <b>{firstSample.cdn_provider}</b>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Manifest URL</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th colSpan={6}>Custom Data</th>
            </tr>
          </thead>
          <tbody>
            {customDataFields}
            {firstSample.experiment_name ? (
              <tr>
                <td>Experiment Name</td>
                <td>
                  <b>{firstSample.experiment_name}</b>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
          <thead>
            <tr>
              <th colSpan={6}>User Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>City</td>
              <td>{firstSample.city.charAt(0).toUpperCase() + firstSample.city.slice(1)}</td>
              <td>Country</td>
              <td>{firstSample.country}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </>
    );
  } catch (e) {
    const safeError = z.instanceof(Error).parse(e);
    return <Alert error={safeError} />;
  }
}
