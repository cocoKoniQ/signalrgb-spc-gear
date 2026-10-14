// SignalRGB Plugin for SPC Gear GK630K TKL Keyboard
// Reverse engineered protocol for SinoWealth / Evision / VS11K series controller (VID: 0x3299, PID: 0x4E5B)

export function Name() { return "SPC Gear GK630K"; }
export function VendorId() { return 0x3299; }
export function ProductId() { return 0x4E5B; }
export function Publisher() { return "WhirlwindFX"; }
export function Documentation() { return "troubleshooting/spcgear"; }
export function Size() { return [18, 6]; }
export function DefaultPosition() { return [10, 100]; }
export function DefaultScale() { return 8.0; }
export function DeviceType() { return "keyboard"; }
export function Validate(endpoint) {
	return endpoint.interface === 1 && endpoint.usage === 0x0092 && endpoint.usage_page === 0xFF1C;
}
export function ImageUrl() {
	return "https://assets.signalrgb.com/devices/brands/logitech/keyboards/pro-tkl.png";
}

/* global
shutdownColor:readonly
LightingMode:readonly
refreshRate:readonly
packetDelay:readonly
forcedColor:readonly
*/
export function ControllableParameters() {
	return [
		{
			property: "shutdownColor",
			group: "lighting",
			label: "Shutdown Color",
			description: "This color is applied when SignalRGB or system shuts down",
			type: "color",
			default: "#000000"
		},
		{
			property: "LightingMode",
			group: "lighting",
			label: "Lighting Mode",
			description: "Switch between SignalRGB Canvas, Onboard Hardware Effects, or Forced Color",
			type: "combobox",
			values: ["Canvas", "Hardware (Onboard)", "Forced"],
			default: "Canvas"
		},
		{
			property: "refreshRate",
			group: "lighting",
			label: "Refresh Rate Target",
			description: "Target refresh rate. 30 FPS ensures rock-solid USB stability and eliminates packet drops during high-speed typing",
			type: "combobox",
			values: ["30 FPS (Recommended - Typing Safe)", "40 FPS", "60 FPS (Fast)"],
			default: "30 FPS (Recommended - Typing Safe)"
		},
		{
			property: "packetDelay",
			group: "lighting",
			label: "Packet Spacing Delay",
			description: "Delay in ms between USB chunk packets (default 2ms)",
			type: "number",
			min: "1",
			max: "5",
			step: "1",
			default: "2"
		},
		{
			property: "forcedColor",
			group: "lighting",
			label: "Forced Color",
			description: "Color used when Forced lighting mode is active",
			type: "color",
			default: "#009bde"
		}
	];
}

const vKeys = [
	{ name: "Esc", id: 0, pos: [0, 0] },
	{ name: "F1", id: 1, pos: [2, 0] },
	{ name: "F2", id: 2, pos: [3, 0] },
	{ name: "F3", id: 3, pos: [4, 0] },
	{ name: "F4", id: 4, pos: [5, 0] },
	{ name: "F5", id: 5, pos: [6, 0] },
	{ name: "F6", id: 6, pos: [7, 0] },
	{ name: "F7", id: 7, pos: [8, 0] },
	{ name: "F8", id: 8, pos: [9, 0] },
	{ name: "F9", id: 9, pos: [10, 0] },
	{ name: "F10", id: 10, pos: [11, 0] },
	{ name: "F11", id: 11, pos: [12, 0] },
	{ name: "F12", id: 12, pos: [13, 0] },
	{ name: "Print Screen", id: 13, pos: [15, 0] },
	{ name: "Scroll Lock", id: 14, pos: [16, 0] },
	{ name: "Pause Break", id: 15, pos: [17, 0] },
	{ name: "`", id: 21, pos: [0, 1] },
	{ name: "1", id: 22, pos: [1, 1] },
	{ name: "2", id: 23, pos: [2, 1] },
	{ name: "3", id: 24, pos: [3, 1] },
	{ name: "4", id: 25, pos: [4, 1] },
	{ name: "5", id: 26, pos: [5, 1] },
	{ name: "6", id: 27, pos: [6, 1] },
	{ name: "7", id: 28, pos: [7, 1] },
	{ name: "8", id: 29, pos: [8, 1] },
	{ name: "9", id: 30, pos: [9, 1] },
	{ name: "0", id: 31, pos: [10, 1] },
	{ name: "-", id: 32, pos: [11, 1] },
	{ name: "=+", id: 33, pos: [12, 1] },
	{ name: "Backspace", id: 34, pos: [13, 1] },
	{ name: "Insert", id: 35, pos: [15, 1] },
	{ name: "Home", id: 36, pos: [16, 1] },
	{ name: "Page Up", id: 37, pos: [17, 1] },
	{ name: "Tab", id: 42, pos: [0, 2] },
	{ name: "Q", id: 43, pos: [1, 2] },
	{ name: "W", id: 44, pos: [2, 2] },
	{ name: "E", id: 45, pos: [3, 2] },
	{ name: "R", id: 46, pos: [4, 2] },
	{ name: "T", id: 47, pos: [5, 2] },
	{ name: "Y", id: 48, pos: [6, 2] },
	{ name: "U", id: 49, pos: [7, 2] },
	{ name: "I", id: 50, pos: [8, 2] },
	{ name: "O", id: 51, pos: [9, 2] },
	{ name: "P", id: 52, pos: [10, 2] },
	{ name: "[", id: 53, pos: [11, 2] },
	{ name: "]", id: 54, pos: [12, 2] },
	{ name: "Backslash", id: 55, pos: [13, 2] },
	{ name: "Del", id: 56, pos: [15, 2] },
	{ name: "End", id: 57, pos: [16, 2] },
	{ name: "Page Down", id: 58, pos: [17, 2] },
	{ name: "Caps Lock", id: 63, pos: [0, 3] },
	{ name: "A", id: 64, pos: [1, 3] },
	{ name: "S", id: 65, pos: [2, 3] },
	{ name: "D", id: 66, pos: [3, 3] },
	{ name: "F", id: 67, pos: [4, 3] },
	{ name: "G", id: 68, pos: [5, 3] },
	{ name: "H", id: 69, pos: [6, 3] },
	{ name: "J", id: 70, pos: [7, 3] },
	{ name: "K", id: 71, pos: [8, 3] },
	{ name: "L", id: 72, pos: [9, 3] },
	{ name: ";", id: 73, pos: [10, 3] },
	{ name: "'", id: 74, pos: [11, 3] },
	{ name: "Enter", id: 75, pos: [13, 3] },
	{ name: "Left Shift", id: 84, pos: [0, 4] },
	{ name: "Z", id: 85, pos: [1, 4] },
	{ name: "X", id: 86, pos: [2, 4] },
	{ name: "C", id: 87, pos: [3, 4] },
	{ name: "V", id: 88, pos: [4, 4] },
	{ name: "B", id: 89, pos: [5, 4] },
	{ name: "N", id: 90, pos: [6, 4] },
	{ name: "M", id: 91, pos: [7, 4] },
	{ name: ",", id: 92, pos: [8, 4] },
	{ name: ".", id: 93, pos: [9, 4] },
	{ name: "/", id: 94, pos: [10, 4] },
	{ name: "Right Shift", id: 95, pos: [13, 4] },
	{ name: "Up Arrow", id: 96, pos: [16, 4] },
	{ name: "Left Ctrl", id: 105, pos: [0, 5] },
	{ name: "Left Win", id: 106, pos: [1, 5] },
	{ name: "Left Alt", id: 107, pos: [2, 5] },
	{ name: "Space", id: 108, pos: [6, 5] },
	{ name: "Right Alt", id: 109, pos: [10, 5] },
	{ name: "Fn", id: 110, pos: [11, 5] },
	{ name: "Menu", id: 111, pos: [12, 5] },
	{ name: "Right Ctrl", id: 112, pos: [13, 5] },
	{ name: "Left Arrow", id: 113, pos: [15, 5] },
	{ name: "Down Arrow", id: 114, pos: [16, 5] },
	{ name: "Right Arrow", id: 115, pos: [17, 5] }
];

export function LedNames() {
	return vKeys.map(k => k.name);
}

export function LedPositions() {
	return vKeys.map(k => k.pos);
}

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) return [0, 0, 0];
	return [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16)
	];
}

function sendPacket(cmd, payload = [], offset = 0, explicitLen = 56) {
	const packet = new Array(64).fill(0);
	packet[0] = 0x04;
	packet[3] = cmd;
	packet[4] = explicitLen !== undefined ? explicitLen : payload.length;
	packet[5] = offset & 0xFF;
	packet[6] = (offset >> 8) & 0xFF;
	packet[7] = 0;
	for (let i = 0; i < payload.length; i++) {
		packet[8 + i] = payload[i];
	}
	let sum = 0;
	for (let i = 3; i < 64; i++) {
		sum += packet[i];
	}
	sum &= 0xFFFF;
	packet[1] = sum & 0xFF;
	packet[2] = (sum >> 8) & 0xFF;

	let written = false;
	for (let attempt = 0; attempt < 3 && !written; attempt++) {
		try {
			device.write(packet, 64);
			written = true;
		} catch (e) {
			if (attempt < 2) {
				device.pause(1);
			}
		}
	}
}

export function Initialize() {
	if (typeof device.getHidEndpoints === "function") {
		const endpoints = device.getHidEndpoints();
		for (let i = 0; i < endpoints.length; i++) {
			const ep = endpoints[i];
			if (ep.interface === 1 && ep.usage_page === 0xFF1C && ep.usage === 0x0092) {
				device.set_endpoint(ep.interface, ep.usage, ep.usage_page, ep.collection);
				break;
			}
		}
	}

	// Apply Frame Rate Target (default 30 FPS provides typing stability and USB headroom)
	if (typeof device.setFrameRateTarget === "function") {
		const fps = (typeof refreshRate !== "undefined" && refreshRate.includes("60")) ? 60 : 
		            (typeof refreshRate !== "undefined" && refreshRate.includes("40")) ? 40 : 30;
		device.setFrameRateTarget(fps);
	}

	// Handshake & Switch keyboard firmware to Static / Normal Mode (0x01)
	// Mode 0x01 enables all keys across the matrix and eliminates profile indicator blinking on Esc, F1-F4
	sendPacket(0xAA, [], 0, 0);
	device.pause(5);
	sendPacket(0x01, [], 0, 0);
	device.pause(5);

	// Software Mode Lock: informs SinoWealth MCU that external software is streaming
	// Prevents MCU watchdog from falling back to hardware animations during typing
	try {
		device.write([0x04, 0x8C, 0x00, 0x0B, 0x30, 0x50, 0x01], 64);
		device.pause(5);
	} catch (e) {
		// Ignore
	}

	sendPacket(0xAA, [], 0, 0);
	device.pause(5);
	const cfg = new Array(26).fill(0);
	cfg[0] = 0;    // Profile 0
	cfg[1] = 0x01; // Mode 1 (Normal / Static Lighting)
	cfg[2] = 2;    // Speed = 2
	cfg[3] = 0;    // Brightness = 0 (max brightness in firmware)
	cfg[6] = 255;  // Default R
	cfg[7] = 255;  // Default G
	cfg[8] = 255;  // Default B
	sendPacket(0x06, cfg, 0, 26);
	device.pause(5);

	sendPacket(0xAA, [], 0, 0);
	device.pause(5);
	sendPacket(0x02, [], 0, 0);
	device.pause(10);
	try {
		device.clearReadBuffer();
	} catch (e) {
		// Ignore
	}
}

export function onrefreshRateChanged() {
	if (typeof device.setFrameRateTarget === "function") {
		const fps = (typeof refreshRate !== "undefined" && refreshRate.includes("60")) ? 60 : 
		            (typeof refreshRate !== "undefined" && refreshRate.includes("40")) ? 40 : 30;
		device.setFrameRateTarget(fps);
	}
}

export function onBrightnessChanged() {
	// Let continuous Render() pick up the change at 30 FPS without flooding the USB queue
}

export function onforcedColorChanged() {
	// Handled on next Render() frame
}

export function onpacketDelayChanged() {
	// Handled on next Render() frame
}

export function onLightingModeChanged() {
	if (LightingMode === "Hardware (Onboard)") {
		// Signal MCU to reload active hardware profile from EEPROM
		sendPacket(0xAA, [], 0, 0);
		device.pause(5);
		sendPacket(0x02, [], 0, 0);
	} else {
		// Resuming software streaming
		sendPacket(0xAA, [], 0, 0);
		device.pause(5);
		sendPacket(0x01, [], 0, 0);
		device.pause(5);
		try {
			device.write([0x04, 0x8C, 0x00, 0x0B, 0x30, 0x50, 0x01], 64);
			device.pause(5);
		} catch (e) {
			// Ignore
		}
		sendColors();
	}
}

export function Render() {
	if (typeof LightingMode !== "undefined" && LightingMode === "Hardware (Onboard)") {
		return;
	}
	sendColors();
}

export function Shutdown(SystemSuspending) {
	const color = SystemSuspending ? "#000000" : (typeof shutdownColor !== "undefined" ? shutdownColor : "#000000");
	sendColors(color);
	try {
		device.clearReadBuffer();
	} catch (e) {
		// Ignore
	}
}

let isSending = false;
function sendColors(overrideColor) {
	if (isSending) {
		return;
	}
	isSending = true;
	try {
		_doSendColors(overrideColor);
	} finally {
		isSending = false;
	}
}

function _doSendColors(overrideColor) {
	const TOTAL_BYTES = 378; // 126 keys * 3 bytes (RGB) = 378 bytes
	const buffer = new Array(TOTAL_BYTES).fill(0);

	// Built-in device brightness scaling (from SignalRGB native device card slider)
	const devRaw = (typeof device.getBrightness === "function") ? Number(device.getBrightness()) : 100;
	const devScale = Math.max(0, Math.min(100, isNaN(devRaw) ? 100 : devRaw)) / 100.0;

	for (let i = 0; i < vKeys.length; i++) {
		const key = vKeys[i];
		let col;
		if (overrideColor) {
			const base = hexToRgb(overrideColor);
			col = [Math.round(base[0] * devScale), Math.round(base[1] * devScale), Math.round(base[2] * devScale)];
		} else if (typeof LightingMode !== "undefined" && LightingMode === "Forced") {
			const base = hexToRgb(forcedColor);
			col = [Math.round(base[0] * devScale), Math.round(base[1] * devScale), Math.round(base[2] * devScale)];
		} else {
			// Canvas mode: device.color(x, y) is ALREADY scaled by devScale by SignalRGB
			col = device.color(key.pos[0], key.pos[1]);
		}

		const r = Math.max(0, Math.min(255, col[0]));
		const g = Math.max(0, Math.min(255, col[1]));
		const b = Math.max(0, Math.min(255, col[2]));

		const idx = key.id * 3;
		buffer[idx]     = r;
		buffer[idx + 1] = g;
		buffer[idx + 2] = b;

		// Mirror to alternate matrix slots for keys with revision/layout variance (ANSI & ISO)
		if (key.name === "Enter") {
			buffer[76 * 3]     = r;
			buffer[76 * 3 + 1] = g;
			buffer[76 * 3 + 2] = b;
		} else if (key.name === "Backslash") {
			// ISO # ~ key adjacent to Enter
			buffer[62 * 3]     = r;
			buffer[62 * 3 + 1] = g;
			buffer[62 * 3 + 2] = b;
			// ISO < > / \ | key adjacent to Left Shift
			buffer[102 * 3]     = r;
			buffer[102 * 3 + 1] = g;
			buffer[102 * 3 + 2] = b;
		} else if (key.name === "Print Screen") {
			buffer[16 * 3]     = r;
			buffer[16 * 3 + 1] = g;
			buffer[16 * 3 + 2] = b;
		} else if (key.name === "Up Arrow") {
			buffer[99 * 3]     = r;
			buffer[99 * 3 + 1] = g;
			buffer[99 * 3 + 2] = b;
		} else if (key.name === "Left Arrow") {
			buffer[117 * 3]     = r;
			buffer[117 * 3 + 1] = g;
			buffer[117 * 3 + 2] = b;
			buffer[119 * 3]     = r;
			buffer[119 * 3 + 1] = g;
			buffer[119 * 3 + 2] = b;
		} else if (key.name === "Down Arrow") {
			buffer[118 * 3]     = r;
			buffer[118 * 3 + 1] = g;
			buffer[118 * 3 + 2] = b;
			buffer[120 * 3]     = r;
			buffer[120 * 3 + 1] = g;
			buffer[120 * 3 + 2] = b;
		} else if (key.name === "Right Arrow") {
			buffer[121 * 3]     = r;
			buffer[121 * 3 + 1] = g;
			buffer[121 * 3 + 2] = b;
		}
	}

	// Stream 378 bytes in 7 chunks: 6x56 bytes + 1x42 bytes via Cmd 0x12 (Real-Time SRAM Streaming)
	// Exact framing (total 378 bytes) prevents MCU SRAM buffer overrun that caused Esc/F1-F4 flickering.
	// Configurable packetDelay (default 2ms) gives the 8051 MCU headroom to service typing interrupts without dropping packets.
	const chunks = [
		[0, 56],
		[56, 56],
		[112, 56],
		[168, 56],
		[224, 56],
		[280, 56],
		[336, 42]
	];
	const delay = (typeof packetDelay !== "undefined") ? Math.max(1, Math.min(5, Number(packetDelay))) : 2;
	for (let i = 0; i < chunks.length; i++) {
		const [offset, len] = chunks[i];
		const chunk = buffer.slice(offset, offset + len);
		sendPacket(0x12, chunk, offset, len);
		device.pause(delay);
	}

	// Commit / Latch frame to LED registers via Cmd 0x1C (prevents timeout fallback during typing)
	sendPacket(0x1C, [], 0, 0);
	device.pause(delay);
}
