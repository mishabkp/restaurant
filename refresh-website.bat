@echo off
echo Clearing browser cache and opening website...
echo.

REM Kill any running browser instances
taskkill /F /IM msedge.exe >nul 2>&1
taskkill /F /IM chrome.exe >nul 2>&1
timeout /t 1 /nobreak >nul

REM Open the main website
echo Opening Restaurant Navigator...
start "" "C:\Users\kpmiz\Desktop\restaurant-navigator\index.html"

echo.
echo Website opened! Press Ctrl+F5 to force refresh and clear cache.
echo.
pause
