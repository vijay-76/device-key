export interface BatteryInfo {
  level: number;
  charging: boolean;
  chargingTime: number | null;
}

export const getBatteryInfo = async (): Promise<BatteryInfo> => {
  // Battery info
  let batteryInfo: BatteryInfo = {
    level: 0,
    charging: false,
    chargingTime: null,
  };

  if ("getBattery" in navigator) {
    const battery = await (navigator as any).getBattery();
    batteryInfo = {
      level: battery.level * 100, // convert to percentage
      charging: battery.charging,
      chargingTime:
        battery.chargingTime && battery.chargingTime !== Infinity
          ? battery.chargingTime
          : null,
    };
  }

  return batteryInfo;
};
