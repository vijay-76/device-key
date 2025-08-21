// export const getNetworkInfo = (): { connectionType?: string } => {
//   if (typeof navigator !== "undefined" && (navigator as any).connection) {
//     return { connectionType: (navigator as any).connection.effectiveType };
//   }
//   return {};
// };

export const getNetworkInfo = (): { connectionType?: string } => {
  if ("connection" in navigator) {
    return { connectionType: (navigator as any).connection.effectiveType };
  }
  return {};
};
