# SignalRGB Plugin for SPC Gear & Endorfy Keyboards

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![SignalRGB Supported](https://img.shields.io/badge/SignalRGB-Compatible-9cf?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJMMiA3bDEwIDUgOS00LjUtOS00LjV6TTIgMTdsMTAgNSA5LTQuNS0xLjUtMS4zNEwxMiAxOC4xNmwtOC41LTQuMTRMMiAxN3ptMCA0bDEwIDUgOS00LjUtMS41LTEuMzRMMTIgMjIuMTZsLTguNS00LjE0TDIgMjF6Ii8+PC9zdmc+)](https://signalrgb.com)
[![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen.svg)](tests/test_plugin.js)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Production-ready, reverse-engineered **[SignalRGB](https://signalrgb.com)** plugin for the **SPC Gear GK630K Tournament (TKL)** mechanical keyboard (with ongoing expansion towards a **General SPC Gear / Endorfy Device Plugin**).

Brings true per-key RGB canvas lighting, game screen integration, and audio visualization to SPC Gear hardware with rock-solid typing stability and zero flickering.

---

## 🌟 Highlights

- **🎯 True Per-Key RGB Canvas Synchronization:** Full real-time per-key RGB streaming synced to your games, ambient screen colors, and audio visualizers.
- **⚡ 100% Typing-Glitch Free (48-Byte Framing):** Patented 48-byte packet framing ($16 \text{ keys} \times 3 \text{ bytes}$ exact). Eliminates the notorious color-phase shift (pink/blue strips) during high-speed typing.
- **💡 Unified Native Brightness:** Integrates directly with SignalRGB's native device brightness slider without stacking, double-dimming, or watchdog fallbacks.
- **🛡️ EEPROM Hardware Mode Neutralization:** Automatically locks out onboard reactive effects (Traverse, Reaction, Ripples) so rapid typing never triggers conflicting hardware animations.
- **⌨️ ANSI & European ISO Layout Support:** Accurate LED matrix mapping covering US/ANSI and European ISO layouts (Enter, Backslash, and Arrow keys).
- **🎛️ Onboard Hardware Mode Toggle:** Easily switch between SignalRGB software control and the keyboard's 18 factory animations via a dropdown in SignalRGB.
- **🌙 Clean Sleep & Shutdown:** Turns off gracefully or displays custom colors when Windows sleeps or powers down.

---

## 🚀 How to Apply (Quick Start)

Choose either the **1-Click Automatic Installer** or the **Manual 30-Second Copy**:

### Method 1: Automatic 1-Click Install (Recommended)

1. Clone or download this repository to your PC.
2. Right-click [`install.ps1`](install.ps1) and choose **Run with PowerShell**  
   *(or run in PowerShell: `powershell -ExecutionPolicy Bypass -File .\install.ps1`)*.
3. The script automatically places the plugin into your SignalRGB user plugins folder and checks if SignalRGB is running.
4. **Restart SignalRGB** (or toggle the device under **Devices** > **SPC Gear GK630K**).

---

### Method 2: Manual 30-Second Copy (Foolproof)

1. **Download the plugin file:**  
   Save [`SPC_Gear_GK630K.js`](SPC_Gear_GK630K.js) to your computer.

2. **Open the SignalRGB Plugins folder:**  
   Press <kbd>Win</kbd> + <kbd>R</kbd>, paste the following path, and press <kbd>Enter</kbd>:
   ```text
   %USERPROFILE%\Documents\WhirlwindFX\Plugins\
   ```

3. **Paste the file:**  
   Copy `SPC_Gear_GK630K.js` directly into that folder.

4. **Close the Vendor App:**  
   Ensure the official software (`GK630K Keyboard.exe`) is closed and not running in your system tray (running both simultaneously causes USB endpoint conflicts).

5. **Restart SignalRGB:**  
   Restart SignalRGB. Go to **Devices** → your **SPC Gear GK630K** will appear and automatically begin syncing!

---

## 🗺️ Roadmap: General SPC Gear & Endorfy Plugin

We are actively developing a **Universal SPC Gear / Endorfy Plugin** to support the brand's full ecosystem within a single unified driver:

| Device Category | Planned Models | Status |
| :--- | :--- | :--- |
| **TKL Keyboards** | **SPC Gear GK630K Tournament** (Kailh Red/Blue/Brown, Pudding, Onyx White) | ✅ **Supported & Production-Ready** |
| **Full Size Keyboards** | **SPC Gear GK650K Omnis**, **Endorfy Threepack** series | 🔄 *In Progress (Seeking packet captures)* |
| **Compact Keyboards** | **SPC Gear GK530**, **GK540**, **GK550** | 📋 *Planned* |
| **Gaming Mice** | **SPC Gear LIX / LIX Wireless**, **LIX Plus**, **GEM**, **GEM Plus** | 📋 *Planned* |

---

## 🙋 Requesting Compatibility for Your Device

If you own an SPC Gear or Endorfy keyboard, mouse, or pad that isn't working with SignalRGB yet, **we want to add it!**

1. Go to **[Issues → Device Compatibility Request](https://github.com/cocoKoniQ/signalrgb-spc-gear/issues/new?template=device_request.md)**.
2. Fill out the quick template with your model name and USB Hardware IDs:
   - Press <kbd>Win</kbd> + <kbd>X</kbd> → select **Device Manager**.
   - Expand **Keyboards** or **Human Interface Devices**.
   - Right-click your device → **Properties** → **Details** tab → Select **Hardware Ids**.
   - Copy the string (e.g. `HID\VID_3299&PID_4E5B...`).
3. Let us know if you can test development builds. We will work with you to map the matrix and build a supported profile!

---

## ⚙️ Controllable Settings in SignalRGB

Click the **SPC Gear GK630K** device card in SignalRGB to configure:

| Setting | Options / Range | Default | Purpose |
| :--- | :--- | :--- | :--- |
| **Lighting Mode** | `Canvas`, `Hardware (Onboard)`, `Forced` | `Canvas` | Switch between live SignalRGB effects, native factory MCU modes, or a static override color. |
| **Refresh Rate Target** | `30 FPS (Recommended)`, `40 FPS`, `60 FPS` | `30 FPS` | 30 FPS provides optimal USB headroom and leaves 17ms of quiet bus time per frame for keystroke interrupts. |
| **Packet Spacing Delay** | `1 ms` to `5 ms` | `2 ms` | Inter-chunk USB pacing delay. Default `2ms` provides rock-solid stability. |
| **Forced Color** | Color picker | `#009BDE` | Static color used when `Forced` mode is enabled. |
| **Shutdown Color** | Color picker | `#000000` | Color applied when Windows or SignalRGB shuts down / suspends. |

> [!TIP]
> **Keyboard Brightness:** Controlled directly using SignalRGB's standard device brightness slider. The plugin uses unified scaling so you get smooth, flicker-free dimming without double-multiplication.

---

## 💡 Note on the Physical `SPC (Fn)` Key

- **Hardware Fn Interception:** On the GK630K, the `SPC` key operates as an internal hardware `Fn` key. The USB HID standard does not transmit scancodes for `Fn` combinations.
- When you press <kbd>SPC</kbd> + <kbd>Up</kbd> / <kbd>Down</kbd>, the microcontroller intercepts the shortcut locally and **does not send any signal over USB to Windows**.
- When SignalRGB is active, its continuous color stream overrides internal MCU brightness.
- To dim your keyboard, use the slider on the SignalRGB device card, or toggle `Lighting Mode` to `Hardware (Onboard)` to use factory keys.
- *Optional:* A background hotkey script is included in [`scripts/hotkey_brightness.py`](scripts/hotkey_brightness.py) for binding custom Windows shortcuts (<kbd>Ctrl</kbd> + <kbd>Up</kbd> / <kbd>Down</kbd>) if desired.

---

## 🔬 Protocol & Engineering Architecture

The plugin communicates via 64-byte USB HID Output Reports targeting endpoint `0xFF1C:0x0092`:

```text
Byte:   [0]    [1]      [2]     [3]   [4]   [5]     [6]     [7]    [8 .. 63]
Field: [0x04] [CSUM_L] [CSUM_H] [CMD] [LEN] [OFF_L] [OFF_H] [0x00] [PAYLOAD DATA (up to 56B)]
```

### 1. 48-Byte Framing & Elimination of Color Shifts
- Earlier community implementations used 56-byte chunks. Because $56 \div 3 = 18.667$, 24-bit RGB keys were split across packet boundaries. If a packet was delayed during high-speed typing, the color stream suffered a 1-to-2 byte phase shift ($G \to B$ in green, turning keys blue; cyan turning to magenta/pink).
- This plugin streams 378 total matrix bytes ($126 \text{ keys} \times 3$) in **8 chunks of 48 bytes** ($7 \times 48\text{B} + 1 \times 42\text{B} = 378\text{B}$).
- Because $48 \pmod 3 = 0$ and $42 \pmod 3 = 0$, **every single chunk begins on byte 0 of an RGB key (Red) and ends on byte 2 (Blue)**. Keys are never split across packets.

### 2. Direct SRAM Streaming & Zero-Flash Safety Policy
- Disassembly of `GK630K Keyboard.exe` revealed that `Cmd 0x02` and `Cmd 0x06` trigger non-volatile EEPROM Flash erase and write cycles. While writing to Flash memory, the MCU halts global interrupts (`EA = 0`), which causes Windows HID endpoint timeouts, USB port resets, and 1-second keyboard reboots.
- This plugin operates **100% in volatile SRAM** using `Cmd 0x1C` and `Cmd 0x12`. It never writes to EEPROM during runtime, eliminating input freezes and multi-reset reboot loops.

### 3. Hardware-Safe Frame Rate Limiting & Watchdog Management
- `Cmd 0x0B` (`[0x04, 0x8C, 0x00, 0x0B, 0x30, 0x50, 0x01]`) and `Cmd 0x1C` route the SinoWealth LED driver directly to USB SRAM.
- The plugin enforces a strict hardware frame rate limiter (`minInterval` in JS) guaranteeing that frames never stream faster than 30 FPS (~33ms budget).
- With 8 packets taking 16ms ($8 \times 2\text{ms}$), every frame leaves **at least 17ms of quiet USB bus time**, ensuring the MCU's keyboard matrix scanning and USB input reports are never starved.

---

## 🧪 Testing

To run the automated verification test suite:

```bash
npm test
# or
node tests/test_plugin.js
```

All 6 test stages validate API exports, matrix IDs, ISO mirrors, 48-byte chunk alignment, and EEPROM packet structures.

---

## 🛠️ Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **Keyboard not detected in SignalRGB** | Plugin not in folder or wrong directory | Run `install.ps1` or copy `SPC_Gear_GK630K.js` into `%USERPROFILE%\Documents\WhirlwindFX\Plugins\`. Restart SignalRGB. |
| **Lighting flickers or reverts after a few seconds** | Vendor app conflict | Completely close `GK630K Keyboard.exe` from the Windows system tray. |
| **Enter, Pause, or Arrow keys unlit** | Old plugin version | Make sure you are using the latest version from this repository with matrix IDs `15, 75, 96, 113, 114, 115`. |
| **Off-colored keys when typing** | 56-byte chunk misalignment | Fixed in the latest 48-byte framing update. Update your plugin and restart SignalRGB. |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).  
Contributions, hardware captures, and pull requests are warmly welcomed!
