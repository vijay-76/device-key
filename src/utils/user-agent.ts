export const getUserAgent = (): { userAgent: string } => {
  return { userAgent: navigator.userAgent };
};
