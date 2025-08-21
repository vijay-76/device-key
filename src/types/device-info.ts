export interface Device {
  deviceId: string;
  deviceType: string;
  os: {
    name: string;
    version?: string;
  };
  browser: {
    name: string;
    version?: string;
  };
  screen: {
    width: number;
    height: number;
    pixelRatio: number;
  };
  language: string;
  timezone: string;
  canvasFingerprint: string;
  userAgent: string;
  network?: {
    ip?: string;
    connectionType?: string;
  };
}
