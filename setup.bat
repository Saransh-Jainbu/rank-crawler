@echo off
REM Setup script for Next.js IIT Rankings application

echo.
echo 📦 Setting up IIT Rankings Browser...
echo.

REM Copy data file to public directory
echo 📋 Copying data file...
copy iit_rankings_gender_neutral_20260522_100203.json public\data.json

echo.
echo ✅ Setup complete!
echo.
echo 🚀 To start development:
echo    npm install
echo    npm run dev
echo.
echo 📦 To build for production:
echo    npm run build
echo    npm start
echo.
echo 🚀 To deploy on Vercel:
echo    1. Push to GitHub
echo    2. Connect repo to Vercel
echo    3. Click 'Deploy'
echo.

pause
