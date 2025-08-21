export interface DeviceInfo {
  deviceName: string;
  platform: string;
  userAgent: string;
  screenResolution: string;
  language: string;
  timezone: string;
}

export class DeviceInfoService {
  private static deviceInfo: DeviceInfo | null = null;

  // 🔧 change this to your server endpoint
  // private static DEVICE_SYNC_ENDPOINT = "/api/device/sync";
  private static LOCAL_KEY = "device_id";

  /**
   * Basic info (similar to Flutter)
   */
  static getDeviceInfo(): DeviceInfo {
    if (this.deviceInfo) {
      return this.deviceInfo;
    }

    if (typeof window === "undefined") {
      return {
        deviceName: "Server",
        platform: "Web",
        userAgent: "Server-Side-Rendering",
        screenResolution: "0x0",
        language: "en",
        timezone: "UTC",
      };
    }

    const ua = navigator.userAgent;
    const screen = window.screen;
    let browserName = "Unknown Browser";
    let osName = "Unknown OS";

    if (ua.includes("Chrome") && !ua.includes("Edg")) browserName = "Chrome";
    else if (ua.includes("Firefox")) browserName = "Firefox";
    else if (ua.includes("Safari") && !ua.includes("Chrome"))
      browserName = "Safari";
    else if (ua.includes("Edg")) browserName = "Edge";
    else if (ua.includes("Opera")) browserName = "Opera";

    if (ua.includes("Windows")) osName = "Windows";
    else if (ua.includes("Mac")) osName = "macOS";
    else if (ua.includes("Linux")) osName = "Linux";
    else if (ua.includes("Android")) osName = "Android";
    else if (ua.includes("iPhone") || ua.includes("iPad")) osName = "iOS";

    const deviceName = `${browserName} ${osName}`;

    this.deviceInfo = {
      deviceName,
      platform: "Web",
      userAgent: ua,
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language || "en",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    };

    return this.deviceInfo;
  }

  /**
   * Return Only OS Name
   */
  static getOsName(): string {
    const ua = navigator.userAgent;
    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac")) return "macOS";
    if (ua.includes("Linux")) return "Linux";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
    return "Unknown";
  }

  /**
   * SHA-256 hash to hex
   */
  private static async sha256(msg: string): Promise<string> {
    const data = new TextEncoder().encode(msg);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(buf)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  /**
   * Collect static info
   */
  private static collectBasicInfo(): string {
    const nav = navigator;
    return [
      nav.userAgent,
      nav.platform,
      this.getOsName(),
      `${screen.width}x${screen.height}`,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      nav.language,
      (nav as any).deviceMemory ?? "",
      (nav as any).hardwareConcurrency ?? "",
    ].join("::");
  }

  /**
   * Canvas fingerprint
   */
  private static getCanvasFingerprint(): string {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    canvas.width = 200;
    canvas.height = 50;
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillStyle = "#f60";
    ctx.fillRect(0, 0, 200, 50);
    ctx.fillStyle = "#069";
    ctx.fillText("canvas fingerprint test", 2, 2);
    return canvas.toDataURL();
  }

  /**
   * WebGL fingerprint (GPU)
   */
  private static getWebGLFingerprint(): string {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) return "";
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const vendor = ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) : "";
    const renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "";
    return `${vendor}::${renderer}`;
  }

  /**
   * Build a fingerprint hash
   */
  static async generateFingerprint(): Promise<string> {
    const data =
      this.collectBasicInfo() +
      "|" +
      this.getCanvasFingerprint() +
      "|" +
      this.getWebGLFingerprint();

    return this.sha256(data);
  }

  /**
   * Returns a stable deviceId (stored in localStorage).
   */
  static async getDeviceId(): Promise<string> {
    if (typeof window === "undefined") {
      return "server-mode";
    }

    // 1. Try localStorage
    const existing = localStorage.getItem(this.LOCAL_KEY);
    if (existing) {
      return existing;
    }

    // 2. Generate deviceId by fingerprint
    const deviceId = await this.generateFingerprint();

    // 4. Store in localStorage
    localStorage.setItem(this.LOCAL_KEY, deviceId);

    return deviceId;
  }

  /** (optional) Reset cached info */
  static reset() {
    this.deviceInfo = null;
    localStorage.removeItem(this.LOCAL_KEY);
  }
}

export default DeviceInfoService;

// export interface DeviceInfo {
//   deviceName: string;
//   platform: string;
//   userAgent: string;
//   screenResolution: string;
//   language: string;
//   timezone: string;
// }

// export class DeviceInfoService {
//   private static deviceInfo: DeviceInfo | null = null;

//   // 🔧 change this to your server endpoint
//   // private static DEVICE_SYNC_ENDPOINT = "/api/device/sync";
//   private static LOCAL_KEY = "device_id";

//   /**
//    * Basic info (similar to Flutter)
//    */
//   static getDeviceInfo(): DeviceInfo {
//     if (this.deviceInfo) {
//       return this.deviceInfo;
//     }

//     if (typeof window === "undefined") {
//       return {
//         deviceName: "Server",
//         platform: "Web",
//         userAgent: "Server-Side-Rendering",
//         screenResolution: "0x0",
//         language: "en",
//         timezone: "UTC",
//       };
//     }

//     const ua = navigator.userAgent;
//     const screen = window.screen;
//     let browserName = "Unknown Browser";
//     let osName = "Unknown OS";

//     if (ua.includes("Chrome") && !ua.includes("Edg")) browserName = "Chrome";
//     else if (ua.includes("Firefox")) browserName = "Firefox";
//     else if (ua.includes("Safari") && !ua.includes("Chrome"))
//       browserName = "Safari";
//     else if (ua.includes("Edg")) browserName = "Edge";
//     else if (ua.includes("Opera")) browserName = "Opera";

//     if (ua.includes("Windows")) osName = "Windows";
//     else if (ua.includes("Mac")) osName = "macOS";
//     else if (ua.includes("Linux")) osName = "Linux";
//     else if (ua.includes("Android")) osName = "Android";
//     else if (ua.includes("iPhone") || ua.includes("iPad")) osName = "iOS";

//     const deviceName = `${browserName} ${osName}`;

//     this.deviceInfo = {
//       deviceName,
//       platform: "Web",
//       userAgent: ua,
//       screenResolution: `${screen.width}x${screen.height}`,
//       language: navigator.language || "en",
//       timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
//     };

//     return this.deviceInfo;
//   }

//   /**
//    * Return Only OS Name
//    */
//   static getOsName(): string {
//     const ua = navigator.userAgent;
//     if (ua.includes("Windows")) return "Windows";
//     if (ua.includes("Mac")) return "macOS";
//     if (ua.includes("Linux")) return "Linux";
//     if (ua.includes("Android")) return "Android";
//     if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
//     return "Unknown";
//   }

//   /**
//    * SHA-256 hash to hex
//    */
//   private static async sha256(msg: string): Promise<string> {
//     const data = new TextEncoder().encode(msg);
//     const buf = await crypto.subtle.digest("SHA-256", data);
//     return [...new Uint8Array(buf)]
//       .map((b) => b.toString(16).padStart(2, "0"))
//       .join("");
//   }

//   /**
//    * Collect static info
//    */
//   private static collectBasicInfo(): string {
//     const nav = navigator;
//     return [
//       // nav.userAgent,
//       // nav.platform,
//       this.getOsName(),
//       `${screen.width}x${screen.height}`,
//       Intl.DateTimeFormat().resolvedOptions().timeZone,
//       nav.language,
//       (nav as any).deviceMemory ?? "",
//       (nav as any).hardwareConcurrency ?? "",
//     ].join("::");
//   }

//   /**
//    * Canvas fingerprint
//    */
//   private static getCanvasFingerprint(): string {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return "";
//     canvas.width = 200;
//     canvas.height = 50;
//     ctx.textBaseline = "top";
//     ctx.font = "14px Arial";
//     ctx.fillStyle = "#f60";
//     ctx.fillRect(0, 0, 200, 50);
//     ctx.fillStyle = "#069";
//     ctx.fillText("canvas fingerprint test", 2, 2);
//     return canvas.toDataURL();
//   }

//   /**
//    * WebGL fingerprint (GPU)
//    */
//   private static getWebGLFingerprint(): string {
//     const canvas = document.createElement("canvas");
//     const gl = canvas.getContext("webgl");
//     if (!gl) return "";
//     const ext = gl.getExtension("WEBGL_debug_renderer_info");
//     const vendor = ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) : "";
//     const renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "";
//     return `${vendor}::${renderer}`;
//   }

//   /**
//    * Build a fingerprint hash
//    */
//   static async generateFingerprint(): Promise<string> {
//     const data =
//       this.collectBasicInfo() +
//       "|" +
//       this.getCanvasFingerprint() +
//       "|" +
//       this.getWebGLFingerprint();

//     return this.sha256(data);
//   }

//   /**
//    * Returns a stable deviceId (stored in localStorage).
//    */
//   static async getDeviceId(): Promise<string> {
//     if (typeof window === "undefined") {
//       return "server-mode";
//     }

//     // 1. Try localStorage
//     const existing = localStorage.getItem(this.LOCAL_KEY);
//     if (existing) {
//       return existing;
//     }

//     // 2. Generate deviceId by fingerprint
//     const deviceId = await this.generateFingerprint();

//     // 4. Store in localStorage
//     localStorage.setItem(this.LOCAL_KEY, deviceId);

//     // return deviceId;
//     return deviceId;
//   }

//   /**
//    * Returns a stable deviceId (stored in localStorage + synced with server).
//    */
//   // static async getOrCreateDeviceId(): Promise<string> {
//   //   if (typeof window === "undefined") {
//   //     return "server-mode";
//   //   }

//   //   // 1. Try localStorage
//   //   const existing = localStorage.getItem(this.LOCAL_KEY);
//   //   if (existing) {
//   //     return existing;
//   //   }

//   //   // 2. Generate fingerprint
//   //   const fingerprint = await this.generateFingerprint();

//   //   // 3. Sync with server → get deviceId
//   //   const res = await fetch(this.DEVICE_SYNC_ENDPOINT, {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify({ fingerprint }),
//   //   });

//   //   if (!res.ok) {
//   //     throw new Error(`Device sync failed (${res.status})`);
//   //   }

//   //   const data = await res.json();
//   //   const deviceId = data.deviceId;

//   //   // 4. Store in localStorage
//   //   localStorage.setItem(this.LOCAL_KEY, deviceId);

//   //   return deviceId;
//   // }

//   /** (optional) Reset cached info */
//   static reset() {
//     this.deviceInfo = null;
//     localStorage.removeItem(this.LOCAL_KEY);
//   }
// }

// export default DeviceInfoService;
