// export * from "./utils";
import { getOSInfo } from "./utils/os";
import { getNetworkInfo } from "./utils/network";
import { getBrowserInfo } from "./utils/browser";
import { getBatteryInfo } from "./utils/battery";
import { getDeviceId } from "./utils/getDeviceId";
import { getUserAgent } from "./utils/user-agent";
import { getDeviceInfo } from "./core/device-info";
import { generateFingerprint } from "./utils/fingerprint";
import { getCanvasFingerprint } from "./utils/fingerprint";

export default getDeviceInfo; // Default export is the rich object

// Named exports for modular usage
export {
  getOSInfo,
  getDeviceId,
  getUserAgent,
  getDeviceInfo,
  getBatteryInfo,
  getBrowserInfo,
  getNetworkInfo,
  generateFingerprint,
  getCanvasFingerprint,
};
