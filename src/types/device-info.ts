import type { BrowserInfo } from "../utils/browser";
import type { DeviceBasicInfo } from "../utils/device";
import type { OSInfo } from "../utils/os";

export interface Device {
  os: OSInfo;
  browser: BrowserInfo;
  device: DeviceBasicInfo;
  language: {
    current: string;
    types: string[];
  };
  timezone: string;
  // canvasFingerprint: string;
  userAgent: string;
  network?: {
    cores?: number;
    connectionType?: string;
  };
}
