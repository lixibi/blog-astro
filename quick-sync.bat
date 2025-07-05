@echo off
chcp 65001 > nul

echo 🔄 Obsidian 图片快速同步...

:: 创建目录
if not exist "public\images\obsidian" mkdir "public\images\obsidian"

:: 复制图片
xcopy "public\images\obsidian\*" "public\images\posts\" /y /q 2>nul
xcopy "public\images\obsidian\*" "public\images\notes\" /y /q 2>nul

:: 转换路径 - 简化版
for /r "src\content" %%f in (*.md) do (
    powershell -Command "(Get-Content '%%f' -Raw) -replace 'public/images/obsidian/', '/images/posts/' | Set-Content '%%f'"
)

echo ✅ 同步完成
call publish.bat