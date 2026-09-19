@echo off
setlocal

@rem build for production
bun run build || exit /b 1

@rem push to the main branch
git add . || exit /b 1
git commit -m "New build deployment" || exit /b 1
git push || exit /b 1

@rem push to the github-pages branch
for /f "delims=" %%i in ('git subtree split --prefix build main') do set "BUILD_COMMIT=%%i"
if not defined BUILD_COMMIT exit /b 1
git push origin %BUILD_COMMIT%:github-pages --force || exit /b 1