export const getNetworkInfo = (): {
  connectionType?: string;
  cores?: number;
} => {
  const info: { connectionType?: string; cores?: number } = {};

  // ✅ Get network type if available
  if ("connection" in navigator) {
    info.connectionType = (navigator as any).connection.effectiveType;
  }

  // ✅ Get number of CPU cores
  if ("hardwareConcurrency" in navigator) {
    info.cores = navigator.hardwareConcurrency;
  }

  return info;
};
