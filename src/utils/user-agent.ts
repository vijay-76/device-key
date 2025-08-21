// export const getUserAgent = (): string => {
//   return typeof navigator !== "undefined" ? navigator.userAgent : "SSR";
// };
export const getUserAgent = (): { userAgent: string } => {
  return { userAgent: navigator.userAgent };
};
