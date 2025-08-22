# @marufme/device-key 🔑

A lightweight, comprehensive device detection and fingerprinting library for modern web applications. Get detailed information about user devices, browsers, operating systems, and generate unique device fingerprints.

[![npm version](https://badge.fury.io/js/@marufme%2Fdevice-key.svg)](https://badge.fury.io/js/@marufme%2Fdevice-key)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **🖥️ Device Detection**: Identify device type (Desktop, Mobile, Tablet)
- **🌐 Browser Information**: Get browser name, version, engine, and vendor
- **💻 OS Detection**: Detect operating system name, version, platform, and architecture
- **🔋 Battery Status**: Monitor battery level, charging status, and charging time
- **🌍 Network Info**: Get network connection type and CPU cores
- **🆔 Device Fingerprinting**: Generate unique, stable device identifiers
- **🎨 Canvas Fingerprinting**: Advanced fingerprinting using Canvas and WebGL
- **🌍 Localization**: Language preferences and timezone information
- **📱 Hardware Details**: Screen resolution, pixel ratio, and CPU cores
- **🔒 Privacy Aware**: Server-side safe with graceful fallbacks

## 🚀 Installation

```bash
npm install @marufme/device-key
```

```bash
yarn add @marufme/device-key
```

```bash
pnpm add @marufme/device-key
```

## 📖 Quick Start

### Basic Usage

```typescript
import getDeviceInfo from "@marufme/device-key";

// Get comprehensive device information
const deviceInfo = await getDeviceInfo();
console.log(deviceInfo);
```

### Modular Usage

```typescript
import {
  getOSInfo,
  getBrowserInfo,
  getDeviceId,
  generateFingerprint,
} from "@marufme/device-key";

// Get specific information
const osInfo = getOSInfo();
const browserInfo = getBrowserInfo();
const deviceId = await getDeviceId();
const fingerprint = await generateFingerprint();
```

## 🔧 API Reference

### Main Function

#### `getDeviceInfo(): Promise<Device>`

Returns comprehensive device information including OS, browser, device details, network info, and more.

```typescript
const deviceInfo = await getDeviceInfo();
// Returns:
// {
//   os: { name, version, platform, architecture },
//   browser: { name, version, engine, vendor },
//   device: { deviceId, deviceType, hardwareConcurrency, screen, battery },
//   network: { connectionType, cores },
//   language: { current, types },
//   timezone: string,
//   userAgent: string
// }
```

### Individual Utilities

#### `getOSInfo(): OSInfo`

Detects operating system information.

```typescript
const osInfo = getOSInfo();
// Returns: { name, version, platform, architecture }
// Example: { name: "Windows", version: "10", platform: "Win32", architecture: "64-bit" }
```

**Supported OS**: Windows, macOS, Android, iOS, Linux

#### `getBrowserInfo(): BrowserInfo`

Detects browser information.

```typescript
const browserInfo = getBrowserInfo();
// Returns: { name, version, engine, vendor }
// Example: { name: "Chrome", version: "120.0.0.0", engine: "Blink", vendor: "Google Inc." }
```

**Supported Browsers**: Chrome, Firefox, Safari, Edge, Opera

#### `getDeviceInfoBasic(): Promise<DeviceBasicInfo>`

Gets basic device information including screen details and battery status.

```typescript
const deviceInfo = await getDeviceInfoBasic();
// Returns: { deviceId, deviceType, hardwareConcurrency, screen, battery }
```

#### `getDeviceId(): Promise<{ deviceId: string }>`

Generates or retrieves a stable device identifier.

```typescript
const { deviceId } = await getDeviceId();
// Returns a unique, persistent device identifier
```

#### `generateFingerprint(): Promise<string>`

Creates a unique device fingerprint using multiple data points.

```typescript
const fingerprint = await generateFingerprint();
// Returns a SHA-256 hash based on device characteristics
```

#### `getCanvasFingerprint(): string`

Generates a canvas-based fingerprint for additional device identification.

```typescript
const canvasFingerprint = getCanvasFingerprint();
// Returns a canvas data URL for fingerprinting
```

#### `getBatteryInfo(): Promise<BatteryInfo>`

Gets battery information (mobile devices only).

```typescript
const batteryInfo = await getBatteryInfo();
// Returns: { level, charging, chargingTime }
// level: 0-100 (percentage), charging: boolean, chargingTime: seconds or null
```

#### `getNetworkInfo(): NetworkInfo`

Gets network connection information.

```typescript
const networkInfo = getNetworkInfo();
// Returns: { connectionType, cores }
// connectionType: "slow-2g", "2g", "3g", "4g", etc.
```

#### `getUserAgent(): { userAgent: string }`

Gets the user agent string.

```typescript
const { userAgent } = getUserAgent();
// Returns the complete user agent string
```

## 📱 Device Types

The library automatically detects and categorizes devices:

- **Desktop**: Traditional computers and laptops
- **Mobile**: Smartphones and mobile devices
- **Tablet**: Tablet devices (including iPad)

## 🎯 Use Cases

- **Analytics**: Track device types and capabilities
- **User Experience**: Adapt UI based on device capabilities
- **Security**: Device fingerprinting for fraud detection
- **Performance**: Optimize based on device specifications
- **Debugging**: Collect device information for troubleshooting
- **A/B Testing**: Segment users by device characteristics

## 🔒 Privacy & Security

- **No External APIs**: All detection is done client-side
- **Graceful Fallbacks**: Works even when certain APIs are unavailable
- **Server-Side Safe**: Can run in Node.js environments
- **User Consent**: Respects user privacy preferences

## 🌐 Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Features gracefully degrade on older browsers

## 📦 Bundle Size

- **Minified**: ~15KB
- **Gzipped**: ~5KB
- **Tree-shakeable**: Import only what you need

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/maruf-me/device-key.git

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build the package
pnpm build

# Preview build
pnpm preview
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/maruf-me/device-key/issues)
- **Documentation**: [GitHub Wiki](https://github.com/maruf-me/device-key/wiki)
- **Author**: [MD Maruf Hossain](https://marufme.com)

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

---

Made with ❤️ by [MD Maruf Hossain](https://marufme.com)
