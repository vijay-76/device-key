import { getBatteryInfo } from "./battery";
import { getDeviceId } from "./getDeviceId";

export type DeviceBasicInfo = {
  deviceId: string;
  deviceType: string;
  hardwareConcurrency: number;
  screen: { width: number; height: number; pixelRatio: number };
  battery: { level: number; charging: boolean; chargingTime: number | null };
};

export const getDeviceInfoBasic = async (): Promise<DeviceBasicInfo> => {
  const ua = navigator.userAgent;
  const deviceType = /Mobi|Android/i.test(ua)
    ? "Mobile"
    : /Tablet|iPad/i.test(ua)
    ? "Tablet"
    : "Desktop";

  let screenInfo: DeviceBasicInfo["screen"] = {
    width: window.screen.width,
    height: window.screen.height,
    pixelRatio: window.devicePixelRatio,
  };

  // Hardware concurrency (CPU cores)
  const hardwareConcurrency = navigator.hardwareConcurrency || 0;

  // Device ID (stable)
  const { deviceId } = await getDeviceId();

  // // ✅ Check if saved value exists
  // const saved = localStorage.getItem(SCREEN_KEY);
  // if (saved) {
  //   screenInfo = JSON.parse(saved);
  // } else {
  //   // ✅ Save the original physical screen size
  //   localStorage.setItem(SCREEN_KEY, JSON.stringify(screenInfo));
  // }

  return {
    deviceId,
    deviceType,
    hardwareConcurrency,
    screen: screenInfo,
    battery: await getBatteryInfo(),
  };
};
