export const getOSInfo = (): { name: string } => {
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return { name: "Windows" };
  if (ua.includes("Mac")) return { name: "macOS" };
  if (ua.includes("Linux")) return { name: "Linux" };
  if (ua.includes("Android")) return { name: "Android" };
  if (ua.includes("iPhone") || ua.includes("iPad")) return { name: "iOS" };
  return { name: "Unknown" };
};
