# SignalRGB Plugin: SPC Gear GK630K TKL Keyboard

Real-time per-key RGB synchronization plugin for the **SPC Gear GK630K Tournament (TKL)** mechanical keyboard in **[SignalRGB](https://signalrgb.com)**.

Reverse engineered from the official vendor software (`GK630K Keyboard.exe`) for SinoWealth / Evision / Sonix series USB controllers.

---

## 🌟 Features

- **True Per-Key RGB Canvas Synchronization:** Full 60 FPS real-time per-key color streaming synced with your games, screen canvas, and audio visualizers.
- **Dedicated Keyboard Brightness Slider:** Independent 0–100% brightness control in SignalRGB device settings without dimming other devices on your canvas.
- **Hardware Mode Switch:** Toggle between SignalRGB software control and the keyboard's 18 onboard factory animations with a single dropdown click.
- **Typing Stability Engine:** Tuned 2ms inter-packet spacing and Software Mode Lock (`Cmd 0x0B`) to prevent lighting glitches or watchdog resets during intense typing or gaming.
- **ANSI & European ISO Layout Support:** Accurate LED matrix mapping covering standard US/ANSI and international ISO layouts (Enter, Backslash, and Arrow keys).
- **Clean Sleep & Shutdown Handling:** Supports custom shutdown colors or turns off cleanly when Windows enters sleep or powers down.

---

## ⌨️ Supported Hardware

| Specification | Value |
| :--- | :--- |
| **Brand / Manufacturer** | SPC Gear / Cooling.pl / Endorfy |
| **Model** | GK630K Tournament RGB Mechanical Keyboard (TKL) |
| **Variants** | GK630K Kailh Blue / Brown / Red, Onyx White, Pudding Editions |
| **Microcontroller** | SinoWealth / Evision VS11K series (`VS11K09A`) |
| **USB Vendor ID (VID)** | `0x3299` |
| **USB Product ID (PID)** | `0x4E5B` |
| **Target HID Endpoint** | Interface `1`, Usage Page `0xFF1C`, Usage `0x0092`, Collection `4` |

---

## 🚀 Quick 1-Minute Installation

1. **Download the plugin file:**
   Download [`SPC_Gear_GK630K.js`](SPC_Gear_GK630K.js) from this repository.

2. **Copy to your SignalRGB Plugins folder:**
   Press <kbd>Win</kbd> + <kbd>R</kbd>, paste the following path, and press <kbd>Enter</kbd>:
   ```text
   %USERPROFILE%\Documents\WhirlwindFX\Plugins\
   ```
   Paste `SPC_Gear_GK630K.js` into this folder.

3. **Close the Official SPC Gear App:**
   Make sure the official software (`GK630K Keyboard.exe`) is **closed** and not running in the system tray. Running both applications simultaneously causes USB endpoint collision.

4. **Restart SignalRGB:**
   Restart SignalRGB. Go to **Devices** → Your **SPC Gear GK630K** will appear and automatically calibrate.

---

## ⚙️ Controllable Parameters

Inside SignalRGB, click on the **SPC Gear GK630K** card to access its settings:

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Lighting Mode** | Combobox | `Canvas` | `Canvas` (SignalRGB effects), `Hardware (Onboard)` (restores native MCU effects), or `Forced` (static color). |
| **Keyboard Brightness** | Slider | `100%` | Adjusts brightness (0–100%) specifically for this keyboard without altering global effect brightness. |
| **Packet Spacing Delay** | Slider | `2 ms` | Inter-chunk USB delay (1–5ms). Default `2ms` provides optimal typing stability. Increase to `3ms` if connected through a busy hub. |
| **Forced Color** | Color | `#009BDE` | Color used when `Forced` mode is selected. |
| **Shutdown Color** | Color | `#000000` | Color applied when Windows or SignalRGB shuts down / suspends. |

---

## 💡 About the Physical `SPC (Fn)` Key & Brightness

### Why doesn't physical `SPC + Up / Down Arrow` dim SignalRGB?
- On the GK630K, the `SPC` key is an internal hardware `Fn` key. The USB HID standard has no scancode for `Fn`.
- When you press `SPC + Up` or `SPC + Down`, the keyboard's internal microcontroller intercepts the combination **entirely in hardware** and **never sends any signal over USB to Windows**.
- When SignalRGB is active, it streams raw 24-bit RGB values directly to each key's LED driver 60 times a second. This continuously overwrites the MCU's internal brightness setting.

### How to adjust brightness with keys:
1. **In SignalRGB:** Use the **Keyboard Brightness** slider in device settings.
2. **Onboard Hardware Mode:** Set `Lighting Mode` to `Hardware (Onboard)` in SignalRGB to immediately restore 100% native control to the physical `SPC + Up/Down` keys.
3. **Optional Hotkey Helper:** We provide an optional standalone Python script in [`scripts/hotkey_brightness.py`](scripts/hotkey_brightness.py) that listens for <kbd>Ctrl</kbd> + <kbd>Up</kbd> / <kbd>Down</kbd> to adjust keyboard brightness on the fly without opening SignalRGB.

---

## 🔬 Reverse-Engineered Protocol Specifications

All control packets sent to endpoint `0xFF1C:0x0092` are 64-byte HID Output Reports:

```text
[0x04] [CSUM_L] [CSUM_H] [CMD] [LEN] [OFF_L] [OFF_H] [0x00] [ ... PAYLOAD (up to 56 bytes) ... ]
```

- **Report ID:** `0x04`
- **Checksum:** 16-bit little-endian sum of bytes 3 through 63 (`sum(packet[3..63]) & 0xFFFF`).
- **Real-Time LED Streaming:** Command `0x12` writes linear 24-bit RGB values (378 bytes total for 126 matrix slots) in 7 chunk packets ($6 \times 56\text{ bytes} + 1 \times 42\text{ bytes}$).
- **Software Mode Lock:** `[0x04, 0x8C, 0x00, 0x0B, 0x30, 0x50, 0x01]` prevents the MCU watchdog timer from reverting to hardware animations during PC streaming.

---

## 🛠️ Troubleshooting

- **Esc, F1–F4 blinking or flashing:** This was caused by MCU SRAM buffer overruns (sending 392 bytes instead of the exact 378 bytes). Ensure you are running the latest version from this repo.
- **Lighting glitches when typing rapidly:** Increase **Packet Spacing Delay** to `3 ms` in device settings.
- **Device not showing up in SignalRGB:** Verify that `SPC_Gear_GK630K.js` is placed in `Documents\WhirlwindFX\Plugins\` and restart SignalRGB. Check `%LOCALAPPDATA%\WhirlwindFX\SignalRgb\logs` for `Custom Plugin File Loaded`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Feel free to modify, distribute, and contribute improvements!
