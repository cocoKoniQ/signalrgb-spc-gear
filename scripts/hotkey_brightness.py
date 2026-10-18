"""
Optional Windows Hotkey Brightness Helper for SPC Gear GK630K in SignalRGB
--------------------------------------------------------------------------
This script runs in the background and allows you to adjust keyboard brightness
using physical hotkeys:
  - Ctrl + Up Arrow:   Increase Keyboard Brightness (+10%)
  - Ctrl + Down Arrow: Decrease Keyboard Brightness (-10%)
  - Ctrl + \ :         Toggle Keyboard Lighting On / Off

Requires Python 3 (standard library only, no pip dependencies needed).
"""

import utils.transport
import utils.session
import ctypes
from ctypes import wintypes
import time
import sys
import winreg

user32 = ctypes.windll.user32

MOD_CONTROL = 0x0002
MOD_NOREPEAT = 0x4000
VK_UP = 0x26
VK_DOWN = 0x28
VK_OEM_5 = 0xDC  # Backslash \

HOTKEY_ID_UP = 1
HOTKEY_ID_DOWN = 2
HOTKEY_ID_TOGGLE = 3

REG_PATH = r"Software\WhirlwindFX\SignalRgb\devices\3299:4e5b:2:9"

def get_brightness():
    try:
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, REG_PATH, 0, winreg.KEY_READ) as key:
            val, _ = winreg.QueryValueEx(key, "keyboardBrightness")
            return int(val)
    except Exception:
        return 100

def set_brightness(val):
    val = max(0, min(100, val))
    try:
        with winreg.CreateKey(winreg.HKEY_CURRENT_USER, REG_PATH) as key:
            winreg.SetValueEx(key, "keyboardBrightness", 0, winreg.REG_SZ, str(val))
            print(f"[GK630K] Keyboard brightness set to: {val}%")
    except Exception as e:
        print(f"Error updating registry: {e}")

def main():
    # Register Ctrl + Up
    if not user32.RegisterHotKey(None, HOTKEY_ID_UP, MOD_CONTROL | MOD_NOREPEAT, VK_UP):
        print("Failed to register Ctrl + Up hotkey")
    # Register Ctrl + Down
    if not user32.RegisterHotKey(None, HOTKEY_ID_DOWN, MOD_CONTROL | MOD_NOREPEAT, VK_DOWN):
        print("Failed to register Ctrl + Down hotkey")
    # Register Ctrl + \
    if not user32.RegisterHotKey(None, HOTKEY_ID_TOGGLE, MOD_CONTROL | MOD_NOREPEAT, VK_OEM_5):
        print("Failed to register Ctrl + \\ hotkey")

    print("=== GK630K Hotkey Helper Active ===")
    print("Controls:")
    print("  Ctrl + Up Arrow   : Increase Brightness")
    print("  Ctrl + Down Arrow : Decrease Brightness")
    print("  Ctrl + \\          : Toggle On/Off")
    print("Press Ctrl + C in this window to exit.\n")

    msg = wintypes.MSG()
    last_saved = 100
    while user32.GetMessageW(ctypes.byref(msg), None, 0, 0) != 0:
        if msg.message == 0x0312:  # WM_HOTKEY
            hk_id = msg.wParam
            cur = get_brightness()
            if hk_id == HOTKEY_ID_UP:
                set_brightness(cur + 10)
            elif hk_id == HOTKEY_ID_DOWN:
                set_brightness(cur - 10)
            elif hk_id == HOTKEY_ID_TOGGLE:
                if cur > 0:
                    last_saved = cur
                    set_brightness(0)
                else:
                    set_brightness(last_saved if last_saved > 0 else 100)
        user32.TranslateMessage(ctypes.byref(msg))
        user32.DispatchMessageW(ctypes.byref(msg))

if __name__ == "__main__":
    main()
