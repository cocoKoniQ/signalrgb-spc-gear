# =====================================================================
# SPC Gear GK630K SignalRGB Plugin - Uninstaller
# =====================================================================
[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Yellow
Write-Host "   SPC Gear GK630K - SignalRGB Plugin Uninstaller         " -ForegroundColor Yellow
Write-Host "==========================================================`n" -ForegroundColor Yellow

$PluginsDir = Join-Path $env:USERPROFILE "Documents\WhirlwindFX\Plugins"
$TargetPlugin = Join-Path $PluginsDir "SPC_Gear_GK630K.js"

if (Test-Path $TargetPlugin) {
    try {
        Remove-Item -Path $TargetPlugin -Force
        Write-Host "[SUCCESS] Plugin successfully removed from:" -ForegroundColor Green
        Write-Host "  $TargetPlugin" -ForegroundColor White
        Write-Host "`nPlease restart SignalRGB to apply the changes." -ForegroundColor Cyan
    } catch {
        Write-Host "[ERROR] Could not remove plugin: $_" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[INFO] Plugin was not found in: $TargetPlugin" -ForegroundColor Gray
    Write-Host "Nothing to remove." -ForegroundColor Gray
}

Write-Host "`n==========================================================" -ForegroundColor Yellow
