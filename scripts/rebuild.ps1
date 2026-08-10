# Rebuilds the site with ZERO downtime on :4173, and leaves the Cloudflare
# tunnel alone so the public URL never changes.
#
#   powershell -File scripts/rebuild.ps1
#   powershell -File scripts/rebuild.ps1 -Restart    # force a fresh server
#
# The preview server keeps running through the build. `vite preview` reads from
# dist/ per request, so writing new files underneath it is fine — what is NOT
# fine is emptying the directory it is serving, which both 502s every in-flight
# request and races the file handles it holds open on Windows.
#
# WA_KEEP_DIST=1 makes vite.config skip emptyOutDir, so the build writes over
# the top instead. Old hashed assets accumulate locally; harmless, because CI
# builds from a clean checkout. Use -Restart if you want dist/ pruned.

param([switch]$Restart, [switch]$SkipBuild)

$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$logDir = Join-Path $root '.local'
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$env:Path = "$env:LOCALAPPDATA\node;$env:Path"
Set-Location $root

function Get-PreviewPid {
    try {
        Get-NetTCPConnection -LocalPort 4173 -State Listen -ErrorAction Stop |
            Select-Object -ExpandProperty OwningProcess -Unique | Select-Object -First 1
    } catch { $null }
}

# --- optionally tear down (only when explicitly asked) --------------------
if ($Restart) {
    $existing = Get-PreviewPid
    if ($existing) {
        try { Stop-Process -Id $existing -Force -ErrorAction Stop; Write-Output "  stopped pid $existing" } catch {}
        Start-Sleep -Milliseconds 700
    }
}

$serverUp = [bool](Get-PreviewPid)

# --- build (server stays up) ---------------------------------------------
if (-not $SkipBuild) {
    # Keep dist/ in place only while something is actively serving it.
    if ($serverUp) { $env:WA_KEEP_DIST = '1' } else { Remove-Item Env:\WA_KEEP_DIST -ErrorAction SilentlyContinue }
    Write-Output $(if ($serverUp) { '  building (server stays up)...' } else { '  building...' })

    $ok = $false
    foreach ($attempt in 1..3) {
        & "$env:LOCALAPPDATA\node\npm.cmd" run build 2>&1 | Select-Object -Last 3
        if ($LASTEXITCODE -eq 0) { $ok = $true; break }
        Write-Output "  build attempt $attempt failed, retrying..."
        Start-Sleep -Seconds 2
    }
    Remove-Item Env:\WA_KEEP_DIST -ErrorAction SilentlyContinue
    if (-not $ok) { throw 'Build failed after 3 attempts.' }
}

# --- start only if it is not already serving ------------------------------
if (-not (Get-PreviewPid)) {
    Start-Process -FilePath "$env:LOCALAPPDATA\node\npm.cmd" `
        -ArgumentList 'run', 'preview', '--', '--port', '4173' `
        -WorkingDirectory $root `
        -WindowStyle Hidden `
        -RedirectStandardOutput (Join-Path $logDir 'preview.log') `
        -RedirectStandardError (Join-Path $logDir 'preview.err.log')
    Start-Sleep -Milliseconds 1500
    Write-Output '  preview started'
}

$code = try { (Invoke-WebRequest -Uri 'http://localhost:4173/' -UseBasicParsing -TimeoutSec 10).StatusCode } catch { 'no response' }
Write-Output "  preview on :4173 -> $code"

$urlFile = Join-Path $logDir 'tunnel-url.txt'
if (Test-Path $urlFile) { Write-Output "  public URL: $((Get-Content $urlFile -Raw).Trim())" }
