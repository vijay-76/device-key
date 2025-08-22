import { getOSInfo } from "../utils/os";
import { getBrowserInfo } from "../utils/browser";
import { getDeviceInfoBasic } from "../utils/device";
import { getNetworkInfo } from "../utils/network";
import { getUserAgent } from "../utils/user-agent";
import type { Device } from "../types/device-info";

export const getDeviceInfo = async (): Promise<Device> => {
  const os = getOSInfo();
  const browser = getBrowserInfo();
  const network = getNetworkInfo();
  const { userAgent } = getUserAgent();
  const device = await getDeviceInfoBasic();

  return {
    os,
    device,
    browser,
    network,
    userAgent,
    language: {
      current: navigator.language,
      types: Array.from(navigator.languages),
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};

// import { generateFingerprint } from "./fingerprint";

// export const getDeviceInfo = async (): Promise<{
//   identification: Identification;
// }> => {
//   const visitorId = await generateFingerprint();
//   const timestamp = Date.now();
//   const time = new Date(timestamp).toISOString();
//   const url = typeof window !== "undefined" ? window.location.href : "";
//   const referrer = typeof document !== "undefined" ? document.referrer : "";

//   const ua = navigator.userAgent;
//   const browserDetails = parseBrowserDetails(ua);

//   // Optional IP + Geo (external API)
//   let ipData = {};
//   try {
//     const res = await fetch("https://ipapi.co/json/");
//     if (res.ok) ipData = await res.json();
//   } catch (e) {
//     ipData = {};
//   }

//   return {
//     identification: {
//       data: {
//         visitorId,
//         requestId: `${timestamp}.${Math.random().toString(36).substring(2, 8)}`,
//         browserDetails,
//         incognito: await detectIncognitoMode(),
//         ip: (ipData as any).ip || "",
//         ipLocation: ipData,
//         timestamp,
//         time,
//         url,
//         tag: { referrerLink: referrer },
//         confidence: { score: 1, revision: "v1.0" },
//         visitorFound: true,
//         firstSeenAt: { global: time, subscription: time },
//         lastSeenAt: { global: time, subscription: time },
//         replayed: false,
//         sdk: { platform: "js", version: "1.0.0" },
//       },
//     },
//   };
// };
