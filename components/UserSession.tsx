import "server-only";

import { Suspense } from "react";
import { AnalyticsImpressionSample } from "@bitmovin/api-sdk";
import Spinner from "@/components/client/Spinner";
import React from "react";
import { z } from "zod";
import { Alert } from "./alert";

export type UserSessionProps = {
  analyticsSamples: AnalyticsImpressionSample[];
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
    const analyticsSamples = props.analyticsSamples;

    // Should not be as it's 'AnalyticsImpressionSample[]' but Typescript types are all over the place.
    // Example: Types define `browserVersionMajor` but API returns `browser_version_major`
    const firstSample = (analyticsSamples as any)[0];

    const customDataLiArray = [];
    for (let i = 1; i <= 30; i++) {
      customDataLiArray.push(<li>Custom Data {i}: {firstSample[`custom_data_${i}`]}</li>);
    }

    const errorSample = (analyticsSamples as any).find((sample: any) => sample.state === "error");
    const errorInfoElement = errorSample 
      ? <li>Error: {errorSample.error_message} ({errorSample.error_code}). Details: {errorSample.data}</li>
      : <li>No error occurred</li>;

    return (
      <ul>
        <li>Analytics Version: {firstSample.platform} {firstSample.analytics_version}</li>
        {errorInfoElement}
        <li>Browser: {firstSample.browser} {firstSample.browser_version_major}.{firstSample.browser_version_minor}</li>
        <li>Device Type/Class: {firstSample.device_type}/{firstSample.device_class}</li>
        <li>Operating System: {firstSample.operatingsystem} {firstSample.operatingsystem_version_major}.{firstSample.operatingsystem_version_minor}</li>
        <li>Location (IP Address): {firstSample.city.charAt(0).toUpperCase() + firstSample.city.slice(1)}, {firstSample.country} ({firstSample.ip_address})</li>
        <li>User ID / Custom User ID: {firstSample.user_id} / {firstSample.custom_user_id}</li>
        <li>ISP / CDN: {firstSample.isp} / {firstSample.cdn_provider}</li>
        <li>URL: {firstSample.domain}{firstSample.path}</li>
        <li>Video Title / ID: {firstSample.video_title} / {firstSample.video_id}</li>
        <li>Player Version: {firstSample.player_version}</li>
        <li>Screen Size: {firstSample.screen_width}x{firstSample.screen_height}</li>
        {customDataLiArray}
        <li>Experiment Name: {firstSample.experiment_name}</li>
      </ul>
    );
  } catch (e) {
    const safeError = z.instanceof(Error).parse(e);
    return <Alert error={safeError} />
  }
}
