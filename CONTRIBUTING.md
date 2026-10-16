# Contributing to the SPC Gear / Endorfy SignalRGB Project

Thank you for your interest in contributing to the **SPC Gear / Endorfy SignalRGB Plugin Project**! 🚀

Our goal is to build a rock-solid, comprehensive community plugin supporting the entire lineup of SPC Gear and Endorfy mechanical keyboards, mice, and peripherals.

---

## 🗺️ Roadmap: Towards a General SPC Gear / Endorfy Plugin

We are currently expanding this repository from a dedicated GK630K plugin into a **Universal SPC Gear / Endorfy Device Plugin** capable of dynamically detecting and driving multiple models:
- **Keyboards:** GK650K Omnis (Full Size), GK530 (TKL), GK540, GK550, Threepack series.
- **Mice:** LIX Wireless, LIX Plus, GEM, GEM Plus, etc.

If you own an SPC Gear or Endorfy peripheral that is not yet supported, you can help us add it!

---

## ⌨️ Requesting Support for Your Device

If you have an unsupported device:
1. Open a **[Device Compatibility Request](https://github.com/cocoKoniQ/signalrgb-spc-gear/issues/new?template=device_request.md)**.
2. Provide your device's exact USB Hardware IDs (VID & PID) from Windows Device Manager:
   - Press <kbd>Win</kbd> + <kbd>X</kbd> → **Device Manager**.
   - Expand **Keyboards** or **Human Interface Devices**.
   - Right-click your device → **Properties** → **Details** tab → Select **Hardware Ids**.
3. Mention the official vendor software version.
4. Let us know if you are available to test development builds!

---

## 🛠️ Development & Testing Workflow

### 1. Prerequisites
- [Node.js](https://nodejs.org) (v18 or newer recommended).
- [SignalRGB](https://signalrgb.com) installed.

### 2. Running Automated Tests
Before submitting any code changes, run the automated verification suite:
```bash
npm test
# or
node tests/test_plugin.js
```
The test suite validates:
- SignalRGB API exports and signatures.
- Byte-level packet chunk alignment (must be exact multiples of 3).
- Total matrix byte length ($126 \times 3 = 378$ bytes for GK630K).
- ISO/ANSI matrix index mappings.
- EEPROM profile initialization and software mode locks.

### 3. Testing in SignalRGB
To test live changes on your keyboard:
1. Run `powershell -ExecutionPolicy Bypass -File .\install.ps1`.
2. In SignalRGB, open the **Console** (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> in developer mode) to inspect live device logs.
3. Verify smooth 30 FPS / 60 FPS streaming across various dynamic effects (e.g. Rainbow, Canvas, Audio Visualizer).
4. Perform a rapid typing test to ensure no dropped chunks or color phase shifts occur.

---

## 📜 Pull Request Guidelines

1. **Keep code clean and documented:** Explain the rationale behind any hardware constants, offsets, or matrix indices.
2. **Never split RGB triplets:** Ensure all USB streaming packet lengths and offsets are exact multiples of 3 ($3 \text{ bytes} = 1 \text{ RGB key}$) to prevent color-phase shifts ($G \leftrightarrow B$).
3. **Preserve backward compatibility:** Do not break existing GK630K functionality when adding new models.
4. **All tests must pass:** Ensure `npm test` runs with 100% success before submitting your PR.
