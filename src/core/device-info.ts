import { generateFingerprint } from "../utils/fingerprint";
import { getOSInfo } from "../utils/os";
import { getBrowserInfo } from "../utils/browser";
import { getDeviceInfoBasic } from "../utils/device";
import { getNetworkInfo } from "../utils/network";
import { getUserAgent } from "../utils/user-agent";
import type { Device } from "../types/device-info";

const LOCAL_KEY = "device_id";

export const getDeviceInfo = async (): Promise<Device> => {
  const os = getOSInfo();
  const browser = getBrowserInfo();
  const { deviceType, screen } = getDeviceInfoBasic();
  const network = getNetworkInfo();
  const { userAgent } = getUserAgent();

  // Device ID (stable)
  let deviceId = "server-mode";
  if (typeof window !== "undefined") {
    const existing = localStorage.getItem(LOCAL_KEY);
    if (existing) {
      deviceId = existing;
    } else {
      deviceId = await generateFingerprint();
      localStorage.setItem(LOCAL_KEY, deviceId);
    }
  }

  return {
    deviceId,
    deviceType,
    os,
    browser,
    screen,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    canvasFingerprint: await generateFingerprint(),
    userAgent,
    network,
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

// // Helper to parse browser details
// function parseBrowserDetails(ua: string) {
//   let browserName = "Unknown";
//   let browserFullVersion = "0.0.0";

//   if (ua.includes("Chrome") && !ua.includes("Edg")) {
//     browserName = "Chrome";
//     browserFullVersion = ua.match(/Chrome\/([\d.]+)/)?.[1] || "0.0.0";
//   } else if (ua.includes("Firefox")) {
//     browserName = "Firefox";
//     browserFullVersion = ua.match(/Firefox\/([\d.]+)/)?.[1] || "0.0.0";
//   }

//   const browserMajorVersion = browserFullVersion.split(".")[0] || "0";

//   return {
//     browserName,
//     browserMajorVersion,
//     browserFullVersion,
//     os: getOsName(),
//     osVersion: "",
//     device: "Other",
//     userAgent: ua,
//   };
// }

// // Detect incognito mode
// async function detectIncognitoMode(): Promise<boolean> {
//   if (!("storage" in navigator)) return false;
//   try {
//     const quota = await (navigator as any).storage.estimate();
//     return quota && quota.quota < 120000000;
//   } catch {
//     return false;
//   }
// }
