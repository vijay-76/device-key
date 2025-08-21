// export * from "./utils";
import { getDeviceInfo } from "./core/device-info";
import { getCanvasFingerprint } from "./utils/fingerprint";
import { getUserAgent } from "./utils/user-agent";
import { getOSInfo } from "./utils/os";
import { getBrowserInfo } from "./utils/browser";

export default getDeviceInfo; // Default export is the rich object

// Named exports for modular usage
export {
  getDeviceInfo,
  getCanvasFingerprint,
  getUserAgent,
  getOSInfo,
  getBrowserInfo,
};
