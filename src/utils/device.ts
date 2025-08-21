export const getDeviceInfoBasic = (): {
  deviceType: string;
  screen: { width: number; height: number; pixelRatio: number };
} => {
  const ua = navigator.userAgent;
  const deviceType = /Mobi|Android/i.test(ua)
    ? "Mobile"
    : /Tablet|iPad/i.test(ua)
    ? "Tablet"
    : "Desktop";

  return {
    deviceType,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      pixelRatio: window.devicePixelRatio,
    },
  };
};
