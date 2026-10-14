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
| **Refresh Rate Target** | Combobox | `30 FPS (Recommended - Typing Safe)` | Target frame rate (30, 40, or 60 FPS). 30 FPS provides 17ms of quiet USB bus time per frame, completely eliminating dropped packets during typing. |
| **Packet Spacing Delay** | Slider | `2 ms` | Inter-chunk USB delay (1–5ms). Default `2ms` provides optimal balance. Increase to `3ms` if connected through a busy hub. |
| **Forced Color** | Color | `#009BDE` | Color used when `Forced` mode is selected. |
| **Shutdown Color** | Color | `#000000` | Color applied when Windows or SignalRGB shuts down / suspends. |

> [!NOTE]
> **Keyboard Brightness:** Brightness is controlled directly via SignalRGB's native device brightness slider on the device card. A single unified slider prevents double-dimming and ensures instant, flicker-free adjustments.

---

## 💡 About the Physical `SPC (Fn)` Key & Brightness

### Why doesn't physical `SPC + Up / Down Arrow` dim SignalRGB?
- On the GK630K, the `SPC` key is an internal hardware `Fn` key. The USB HID standard has no scancode for `Fn`.
- When you press `SPC + Up` or `SPC + Down`, the keyboard's internal microcontroller intercepts the combination **entirely in hardware** and **never sends any signal over USB to Windows**.
- When SignalRGB is active, it streams raw 24-bit RGB values directly to each key's LED driver. This continuously overwrites the MCU's internal brightness setting.

### How to adjust brightness:
1. **In SignalRGB:** Use the native **Brightness** slider on the SPC Gear GK630K device card.
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
- **Real-Time LED Streaming:** Command `0x12` writes linear 24-bit RGB values (378 bytes total for 126 matrix slots) in 8 chunk packets ($7 \times 48\text{ bytes} + 1 \times 42\text{ bytes}$). Every chunk length and offset is an exact multiple of 3 (16 keys $\times$ 3 bytes = 48 bytes; 14 keys $\times$ 3 bytes = 42 bytes), guaranteeing that no RGB key is ever split across packet boundaries.
- **Software Mode Lock & Streaming Activation:** `[0x04, 0x8C, 0x00, 0x0B, 0x30, 0x50, 0x01]` (`Cmd 0x0B`) and Command `0x1C` switch the SinoWealth MCU into Direct SRAM Streaming mode upon initialization, routing the LED PWM engine directly to USB SRAM.
- **Hardware Mode Neutralization:** On startup, all 3 onboard hardware profiles in EEPROM are set to Mode 6 (Static / Normal in vendor `default_light.json`) with RGB `[0, 0, 0]` and Brightness 0 using the exact 66-byte (`0x42`) layout at offset `profile * 128` (`0x80`). This completely disables onboard reactive keystroke animations (such as Traverse mode 9 and Reaction mode 7) from firing into LED registers during typing.
- **Continuous Frame Refresh:** Streams all 8 chunks every frame (taking 16ms total with 2ms pacing at 30 FPS, leaving 17.3ms of completely idle USB time). If any USB packet is ever contended by a keystroke interrupt, the next frame instantly refreshes the matrix within 33ms without stale buffer artifacts.
- **Hardware Matrix:**
  - Function row: Esc (`0`), F1–F12 (`1..12`), Print Screen (`13`), Scroll Lock (`14`), Pause Break (`15`)
  - Enter: Matrix slot `75` (mirrored to `76`)
  - Arrows: Up (`96`), Left (`113`), Down (`114`), Right (`115`)
  - ISO expansions: ISO `# ~` (`62`), ISO `< >` (`102`)

---

## 🛠️ Troubleshooting

- **Pause Break, Enter, or Arrow keys not lit:** Earlier versions used placeholder matrix IDs (`16` instead of `15` for Pause; `99, 119, 120, 121` for Arrows). The latest version uses the exact SinoWealth hardware matrix (`13, 14, 15` and `96, 113, 114, 115`).
- **Esc, F1–F4 blinking or flashing:** Caused by MCU SRAM buffer overruns (sending 392 bytes instead of the exact 378 bytes). Ensure you are running the latest version from this repo.
- **Keys flashing wrong color / pink or blue strip when rapid typing:** Caused by 56-byte chunk boundaries splitting 24-bit RGB keys across USB packets (e.g. $56 \div 3 = 18.667$). When a packet contended with a typing keystroke, adjacent color channels shifted ($G \to B$ in pure green, or cyan to magenta/pink). Fixed permanently by switching to 48-byte packets ($16 \text{ keys} \times 3 \text{ bytes}$ exact), continuous refresh, and 66-byte EEPROM profile neutralization.
- **Device not showing up in SignalRGB:** Verify that `SPC_Gear_GK630K.js` is placed in `Documents\WhirlwindFX\Plugins\` and restart SignalRGB. Check `%LOCALAPPDATA%\WhirlwindFX\SignalRgb\logs` for `Custom Plugin File Loaded`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Feel free to modify, distribute, and contribute improvements!
