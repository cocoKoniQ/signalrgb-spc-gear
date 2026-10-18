# SignalRGB Plugin for SPC Gear GK630K

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![SignalRGB Supported](https://img.shields.io/badge/SignalRGB-Compatible-9cf)](https://signalrgb.com)
[![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen.svg)](tests/test_plugin.js)
[![Open an Issue](https://img.shields.io/badge/Device_Request-Open-blue.svg)](https://github.com/cocoKoniQ/signalrgb-spc-gear/issues/new)

SignalRGB plugin for the SPC Gear GK630K Tournament (TKL) mechanical keyboard. Provides real-time per-key RGB canvas synchronization, native brightness control, and full lighting integration.

---

## Compatibility

This plugin is currently compatible with **one specific keyboard model**:

| Keyboard Model | Layout | Status |
| :--- | :--- | :--- |
| **SPC Gear GK630K Tournament** | TKL (ANSI & ISO) | Fully Supported |

> **Important:** Other keyboards—including other SPC Gear or Endorfy models (such as the GK650K, GK530, or Endorfy Omnis)—are not yet supported out of the box because each model uses different USB Product IDs and internal LED wiring.

---

## Want Your Keyboard Supported?

If you have another SPC Gear or Endorfy keyboard, we would love to add support for it. Because each model uses specific hardware identifiers and LED mapping, we need a small amount of information from an owner to make it work.

If you can take two minutes to provide your keyboard's hardware identifier, we will build and integrate support for your model:

1. Open PowerShell on Windows.
2. Paste and run this command:
   ```powershell
   Get-CimInstance Win32_PnPEntity | Where-Object { $_.DeviceID -match "VID_3299" } | Select-Object Name, DeviceID
   ```
3. Open a [Device Request on GitHub](https://github.com/cocoKoniQ/signalrgb-spc-gear/issues/new) and paste the command output along with your keyboard model.

We will create the configuration and provide a build for you to test.

---

## Features

- **Per-Key Canvas Synchronization:** Full integration with SignalRGB effects, game integrations, and audio visualizers.
- **Native Brightness Integration:** Controlled directly via the SignalRGB device brightness slider without flickering.
- **ANSI and ISO Layout Support:** Key mappings calibrated for both US/ANSI and European ISO physical layouts.
- **Hardware Mode Switch:** Option to toggle between SignalRGB software control and onboard factory lighting modes.
- **Clean Sleep and Shutdown:** Shuts off lighting or applies your chosen static color when Windows suspends or turns off.

---

## Installation

### Option 1: Automatic 1-Click Installer (Recommended)

1. Download or clone this repository.
2. Right-click `install.ps1` and select **Run with PowerShell** (or run `powershell -ExecutionPolicy Bypass -File .\install.ps1`).
3. Restart SignalRGB.

---

### Option 2: Manual Installation

1. Save `SPC_Gear_GK630K.js` to your computer.
2. Press `Win` + `R`, paste the following path, and press `Enter`:
   ```text
   %USERPROFILE%\Documents\WhirlwindFX\Plugins\
   ```
3. Copy `SPC_Gear_GK630K.js` into that folder.
4. Ensure the official vendor utility (`GK630K Keyboard.exe`) is closed and not running in the system tray.
5. Restart SignalRGB. The keyboard will appear under **Devices** > **SPC Gear GK630K**.

---

## Settings in SignalRGB

Click the **SPC Gear GK630K** card in SignalRGB to configure settings:

| Setting | Options | Default | Description |
| :--- | :--- | :--- | :--- |
| **Lighting Mode** | `Canvas`, `Hardware (Onboard)`, `Forced` | `Canvas` | Choose between SignalRGB effects, factory hardware effects, or a static color. |
| **Refresh Rate Target** | `30 FPS`, `40 FPS`, `60 FPS` | `30 FPS` | Frame rate target for USB updates. 30 FPS is recommended for maximum stability. |
| **Packet Spacing Delay** | `1 ms` to `5 ms` | `2 ms` | Inter-packet USB timing delay. |
| **Forced Color** | Color picker | `#009BDE` | Static color used when Lighting Mode is set to Forced. |
| **Shutdown Color** | Color picker | `#000000` | Color applied on system sleep or shutdown. |

---

## Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **Keyboard not detected** | Plugin file placed in incorrect folder | Run `install.ps1` or ensure `SPC_Gear_GK630K.js` is inside `%USERPROFILE%\Documents\WhirlwindFX\Plugins\`. Restart SignalRGB. |
| **Lighting reverts or flashes** | Official vendor software running | Close `GK630K Keyboard.exe` from the Windows system tray. |
| **Keys do not light up** | Outdated plugin file | Ensure you have the latest build from this repository and restart SignalRGB. |

---

## License

This project is licensed under the [MIT License](LICENSE).
