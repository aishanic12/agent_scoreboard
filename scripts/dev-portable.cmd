@echo off
set "PATH=%~dp0..\tools\node-v24.18.0-win-x64;%PATH%"
cd /d "%~dp0.."
npm run dev
