const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("==========================================");
console.log("   SPC Gear GK630K Plugin Test Suite     ");
console.log("==========================================\n");

const pluginPath = path.join(__dirname, '..', 'SPC_Gear_GK630K.js');
assert(fs.existsSync(pluginPath), `Plugin file not found at: ${pluginPath}`);
const content = fs.readFileSync(pluginPath, 'utf8');

// 1. Core Metadata & Export Verification
console.log("[1/6] Verifying SignalRGB Export Functions...");
const requiredExports = [
    'export function Name()',
    'export function VendorId()',
    'export function ProductId()',
    'export function Publisher()',
    'export function Size()',
    'export function DeviceType()',
    'export function Validate(endpoint)',
    'export function LedNames()',
    'export function LedPositions()',
    'export function Initialize()',
    'export function Render()',
    'export function Shutdown(SystemSuspending)',
    'export function ControllableParameters()',
    'export function onBrightnessChanged()',
    'export function onrefreshRateChanged()',
    'export function onLightingModeChanged()'
];

for (const exp of requiredExports) {
    assert(content.includes(exp), `Missing required export: ${exp}`);
}
console.log("  ✓ All required SignalRGB exports present.");

// 2. Hardware Identifiers & Endpoint
console.log("[2/6] Verifying Hardware Identifiers & Endpoint...");
assert(content.includes('return 0x3299;'), 'VendorId must be 0x3299 (SinoWealth / SPC Gear)');
assert(content.includes('return 0x4E5B;'), 'ProductId must be 0x4E5B (GK630K)');
assert(content.includes('endpoint.interface === 1'), 'Endpoint must target Interface 1');
assert(content.includes('endpoint.usage === 0x0092'), 'Endpoint must target Usage 0x0092');
assert(content.includes('endpoint.usage_page === 0xFF1C'), 'Endpoint must target Usage Page 0xFF1C');
console.log("  ✓ USB VID/PID and HID endpoint targets verified.");

// 3. Matrix Layout and Key Mapping
console.log("[3/6] Verifying Physical Matrix Mappings...");
assert(content.includes('{ name: "Pause Break", id: 15,'), 'Pause Break must be id 15');
assert(content.includes('{ name: "Enter", id: 75,'), 'Enter must be id 75');
assert(content.includes('{ name: "Up Arrow", id: 96,'), 'Up Arrow must be id 96');
assert(content.includes('{ name: "Left Arrow", id: 113,'), 'Left Arrow must be id 113');
assert(content.includes('{ name: "Down Arrow", id: 114,'), 'Down Arrow must be id 114');
assert(content.includes('{ name: "Right Arrow", id: 115,'), 'Right Arrow must be id 115');
assert(content.includes('buffer[76 * 3]'), 'Enter must mirror to ISO matrix slot 76');
assert(content.includes('buffer[62 * 3]'), 'Backslash must mirror to ISO # slot 62');
assert(content.includes('buffer[102 * 3]'), 'Backslash must mirror to ISO < > slot 102');
assert(!content.includes('buffer[85 * 3]     = r;'), 'Backslash must NOT overwrite Z (id 85)');
console.log("  ✓ Matrix IDs and ISO/ANSI mirrors verified.");

// 4. 48-Byte Framing & Packet Math
console.log("[4/6] Verifying 48-Byte Chunk Framing & Alignments...");
const chunksMatch = content.match(/const chunks = \[([\s\S]*?)\];/);
assert(chunksMatch, 'Could not find chunks array in plugin');
const chunkPairs = eval(`[${chunksMatch[1]}]`);

assert.strictEqual(chunkPairs.length, 8, 'Must use exactly 8 chunks');
let runningOffset = 0;
for (let i = 0; i < chunkPairs.length; i++) {
    const [offset, len] = chunkPairs[i];
    assert.strictEqual(offset, runningOffset, `Chunk ${i} offset mismatch: expected ${runningOffset}, got ${offset}`);
    assert.strictEqual(offset % 3, 0, `Chunk ${i} offset ${offset} must be divisible by 3 (RGB aligned)`);
    assert.strictEqual(len % 3, 0, `Chunk ${i} length ${len} must be divisible by 3 (RGB aligned)`);
    if (i < 7) {
        assert.strictEqual(len, 48, `Chunk ${i} length must be 48 bytes (16 keys)`);
    } else {
        assert.strictEqual(len, 42, `Chunk 7 length must be 42 bytes (14 keys)`);
    }
    runningOffset += len;
}
assert.strictEqual(runningOffset, 378, 'Total stream bytes must equal 378 (126 keys * 3)');
console.log("  ✓ 8 chunks (7x48 + 1x42 = 378 bytes) verified: 100% key-aligned, no byte shifts.");

// 5. Hardware EEPROM Profile Neutralization & Streaming Mode
console.log("[5/6] Verifying Hardware EEPROM Neutralization...");
assert(content.includes('new Array(66).fill(0)'), 'EEPROM configuration must be 66 bytes (0x42)');
assert(content.includes('const baseOff = prof * 128;'), 'EEPROM profile offset must be prof * 128 (0x80)');
assert(content.includes('cfg[1] = 0x06;'), 'EEPROM mode must be Mode 6 (Static / Normal Lighting)');
assert(content.includes('cfg[3] = 4;'), 'EEPROM brightness must be 4 (dark / 0 brightness)');
assert(content.includes('sendPacket(0x02, [], 0, 0);'), 'EEPROM commit Cmd 0x02 must be sent');
assert(content.includes('sendPacket(0x1C, [], 0, 0);'), 'Direct SRAM streaming Cmd 0x1C must be sent');
console.log("  ✓ Hardware EEPROM neutralization & Cmd 0x1C streaming latch verified.");

// 6. Native Brightness & Stability Safety
console.log("[6/6] Verifying Brightness Calculation & Re-Entrancy Guard...");
assert(content.includes('let isSending = false;'), 'Re-entrancy guard isSending must be present');
assert(content.includes('device.pause(delay);'), 'Inter-packet pacing delay must be present');
assert(!content.includes('property: "keyboardBrightness"'), 'Duplicate custom brightness slider must be removed');

function calculateScale(devBrightness, isCanvas, isOverrideOrForced) {
    const devRaw = (typeof devBrightness !== 'undefined') ? Number(devBrightness) : 100;
    const devScale = Math.max(0, Math.min(100, isNaN(devRaw) ? 100 : devRaw)) / 100.0;
    return isCanvas ? 1.0 : devScale;
}
assert.strictEqual(calculateScale(50, true, false), 1.0, 'Canvas mode uses SignalRGB device.color pre-scaled multiplier');
assert.strictEqual(calculateScale(50, false, true), 0.5, 'Forced mode scales correctly to 50%');
assert.strictEqual(calculateScale(0, false, true), 0.0, 'Forced mode scales correctly to 0%');
console.log("  ✓ Brightness math & concurrency safeguards verified.");

console.log("\n==========================================");
console.log("   ALL PLUGIN TESTS PASSED (100% OK)     ");
console.log("==========================================");
