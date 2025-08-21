export const getBrowserInfo = (): { name: string } => {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome") && !ua.includes("Edg")) return { name: "Chrome" };
  if (ua.includes("Firefox")) return { name: "Firefox" };
  if (ua.includes("Safari") && !ua.includes("Chrome"))
    return { name: "Safari" };
  if (ua.includes("Edg")) return { name: "Edge" };
  if (ua.includes("Opera")) return { name: "Opera" };
  return { name: "Unknown" };
};
