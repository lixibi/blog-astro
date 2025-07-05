@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo ==========================================
echo        Obsidian 图片同步脚本
echo ==========================================
echo.

:: 创建必要的目录
if not exist "public\images\posts" mkdir "public\images\posts"
if not exist "public\images\notes" mkdir "public\images\notes"
if not exist "public\images\obsidian" mkdir "public\images\obsidian"

echo 🔍 检查Obsidian附件文件夹...
if not exist "public\images\obsidian\*" (
    echo ℹ️  未发现Obsidian附件文件，跳过同步
    goto :convert_paths
)

echo 📁 发现Obsidian附件文件，开始同步...

:: 统计文件数量
set file_count=0
for %%f in ("public\images\obsidian\*") do set /a file_count+=1

if !file_count! gtr 0 (
    echo 📋 发现 !file_count! 个附件文件
    
    :: 复制到posts和notes目录
    echo 📂 复制到 posts 目录...
    xcopy "public\images\obsidian\*" "public\images\posts\" /y /q 2>nul
    
    echo 📂 复制到 notes 目录...
    xcopy "public\images\obsidian\*" "public\images\notes\" /y /q 2>nul
    
    echo ✅ 图片同步完成
) else (
    echo ℹ️  附件文件夹为空
)

:convert_paths
echo.
echo 🔄 转换Markdown文件中的图片路径...

:: 检查是否安装PowerShell
powershell -Command "exit" 2>nul
if errorlevel 1 (
    echo ❌ 需要PowerShell支持，请安装PowerShell
    pause
    exit /b 1
)

set converted_count=0

:: 转换posts目录中的文件
echo 📝 处理博客文章...
for /r "src\content\post" %%f in (*.md) do (
    powershell -NoProfile -Command ^
        "$content = Get-Content '%%f' -Raw -Encoding UTF8; ^
         $original = $content; ^
         $content = $content -replace 'public/images/obsidian/', '/images/posts/'; ^
         $content = $content -replace 'public\\images\\obsidian\\', '/images/posts/'; ^
         $content = $content -replace '\.\./\.\./\.\./public/images/', '/images/'; ^
         if ($content -ne $original) { ^
             Set-Content '%%f' -Value $content -Encoding UTF8; ^
             Write-Host '  ✏️  更新: %%~nxf'; ^
         }"
    if not errorlevel 1 set /a converted_count+=1
)

:: 转换notes目录中的文件
echo 📝 处理笔记文章...
for /r "src\content\note" %%f in (*.md) do (
    powershell -NoProfile -Command ^
        "$content = Get-Content '%%f' -Raw -Encoding UTF8; ^
         $original = $content; ^
         $content = $content -replace 'public/images/obsidian/', '/images/notes/'; ^
         $content = $content -replace 'public\\images\\obsidian\\', '/images/notes/'; ^
         $content = $content -replace '\.\./\.\./\.\./public/images/', '/images/'; ^
         if ($content -ne $original) { ^
             Set-Content '%%f' -Value $content -Encoding UTF8; ^
             Write-Host '  ✏️  更新: %%~nxf'; ^
         }"
    if not errorlevel 1 set /a converted_count+=1
)

echo.
echo 📊 处理完成：
echo    - 同步图片文件: !file_count! 个
echo    - 处理Markdown文件: !converted_count! 个
echo.

:: 询问是否直接发布
set /p "PUBLISH=是否直接发布博客？[Y/n]: "
if /i "!PUBLISH!"=="y" (
    echo.
    echo 🚀 启动发布流程...
    call publish.bat
) else if /i "!PUBLISH!"=="" (
    echo.
    echo 🚀 启动发布流程...
    call publish.bat
) else (
    echo ✅ 同步完成，可以手动运行 publish.bat 发布
)

echo.
pause