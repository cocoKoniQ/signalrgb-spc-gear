# Contributing

Thank you for your interest in contributing to the SignalRGB SPC Gear project.

---

## Requesting Support for Another Keyboard

We want to expand support to other SPC Gear and Endorfy models. Because microcontrollers and LED matrix wirings differ across models, we need device information from owners to build compatible drivers.

To request support for your keyboard:

1. Connect your keyboard to your Windows PC.
2. Open PowerShell and run:
   ```powershell
   Get-CimInstance Win32_PnPEntity | Where-Object { $_.DeviceID -match "VID_3299" } | Select-Object Name, DeviceID
   ```
3. Open a [Device Request on GitHub](https://github.com/cocoKoniQ/signalrgb-spc-gear/issues/new) with the command output and your keyboard model name.

We will create the device profile and provide a test build.

---

## Code Contributions

If you would like to contribute code directly:

1. Clone this repository.
2. Ensure [Node.js](https://nodejs.org) is installed.
3. Make your modifications to `SPC_Gear_GK630K.js` (or add your device model).
4. Run the test suite:
   ```bash
   node tests/test_plugin.js
   ```
5. Ensure all verification checks pass before opening a Pull Request.
