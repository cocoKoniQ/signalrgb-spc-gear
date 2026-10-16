# =====================================================================
# SPC Gear GK630K SignalRGB Plugin - 1-Click Installer
# =====================================================================
[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   SPC Gear GK630K - SignalRGB Plugin Installer           " -ForegroundColor Cyan
Write-Host "==========================================================`n" -ForegroundColor Cyan

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$SourcePlugin = Join-Path $ScriptDir "SPC_Gear_GK630K.js"

if (-not (Test-Path $SourcePlugin)) {
    Write-Host "[ERROR] Could not find 'SPC_Gear_GK630K.js' in script directory!" -ForegroundColor Red
    Write-Host "Make sure you run this script from the repository folder." -ForegroundColor Yellow
    exit 1
}

# Target SignalRGB User Plugins Directory
$PluginsDir = Join-Path $env:USERPROFILE "Documents\WhirlwindFX\Plugins"
$TargetPlugin = Join-Path $PluginsDir "SPC_Gear_GK630K.js"

Write-Host "[1/3] Checking SignalRGB Plugins directory..." -ForegroundColor White
if (-not (Test-Path $PluginsDir)) {
    Write-Host "      Plugins directory not found, creating: $PluginsDir" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $PluginsDir -Force | Out-Null
} else {
    Write-Host "      Found plugins directory: $PluginsDir" -ForegroundColor Green
}

Write-Host "`n[2/3] Installing SPC_Gear_GK630K.js..." -ForegroundColor White
try {
    Copy-Item -Path $SourcePlugin -Destination $TargetPlugin -Force
    $hash = (Get-FileHash -Path $TargetPlugin -Algorithm SHA256).Hash.Substring(0, 12)
    Write-Host "      Plugin copied successfully! (SHA256: $hash)" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Failed to copy plugin: $_" -ForegroundColor Red
    exit 1
}

Write-Host "`n[3/3] Checking SignalRGB running status..." -ForegroundColor White
$signalProcess = Get-Process -Name "SignalRGB" -ErrorAction SilentlyContinue

if ($signalProcess) {
    Write-Host "      SignalRGB is currently running." -ForegroundColor Yellow
    Write-Host "      ----------------------------------------------------------" -ForegroundColor Yellow
    Write-Host "      ACTION REQUIRED:" -ForegroundColor Cyan
    Write-Host "      Please RESTART SignalRGB, or go to:" -ForegroundColor White
    Write-Host "        SignalRGB > Devices > SPC Gear GK630K > Toggle Off & On" -ForegroundColor White
    Write-Host "      ----------------------------------------------------------" -ForegroundColor Yellow
} else {
    Write-Host "      SignalRGB is not currently running." -ForegroundColor Green
    Write-Host "      The plugin will load automatically the next time you open SignalRGB!" -ForegroundColor Green
}

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "   INSTALLATION COMPLETE! Enjoy per-key RGB on GK630K!   " -ForegroundColor Green
Write-Host "==========================================================`n" -ForegroundColor Green
