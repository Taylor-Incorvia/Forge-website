# Starts the built site on http://localhost:4173 and exposes it through a public
# Cloudflare quick tunnel. Both run DETACHED, so they survive this terminal
# closing and are not owned by any Claude Code session.
#
#   powershell -File scripts/serve-public.ps1
#
# The tunnel points at the PORT, not at the build output, so `scripts/rebuild.ps1`
# can replace the site underneath it without changing the public URL.
#
# Quick tunnels get a random hostname on every start and cannot be given a fixed
# name without a Cloudflare account — so only start this once per session.

$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$logDir = Join-Path $root '.local'
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$tunnelLog = Join-Path $logDir 'tunnel.log'
$urlFile = Join-Path $logDir 'tunnel-url.txt'
$cloudflared = "$env:LOCALAPPDATA\cloudflared\cloudflared.exe"

if (-not (Test-Path $cloudflared)) {
    throw "cloudflared not found at $cloudflared"
}

# --- preview server -------------------------------------------------------
& (Join-Path $PSScriptRoot 'rebuild.ps1') -SkipBuild

# --- tunnel ---------------------------------------------------------------
if (Test-Path $tunnelLog) { Remove-Item $tunnelLog -Force }

Start-Process -FilePath $cloudflared `
    -ArgumentList 'tunnel', '--url', 'http://localhost:4173', '--no-autoupdate' `
    -WindowStyle Hidden `
    -RedirectStandardError $tunnelLog

# cloudflared prints the assigned hostname to stderr a few seconds in.
$url = $null
foreach ($i in 1..30) {
    Start-Sleep -Milliseconds 500
    if (Test-Path $tunnelLog) {
        $match = Select-String -Path $tunnelLog -Pattern 'https://[a-z0-9-]+\.trycloudflare\.com' |
            Select-Object -First 1
        if ($match) { $url = $match.Matches[0].Value; break }
    }
}

if (-not $url) { throw "Tunnel did not report a URL. See $tunnelLog" }

Set-Content -Path $urlFile -Value $url -Encoding utf8
Write-Output ''
Write-Output "  Public URL : $url"
Write-Output "  Local      : http://localhost:4173"
Write-Output "  Saved to   : $urlFile"
