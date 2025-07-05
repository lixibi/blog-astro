@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo ==========================================
echo     Obsidian 当前文件夹图片处理脚本
echo ==========================================
echo.

:: 确保public/images目录存在
if not exist "public\images\posts" mkdir "public\images\posts"
if not exist "public\images\notes" mkdir "public\images\notes"

echo 🔍 扫描并处理文章中的图片...

set total_images=0
set total_articles=0

:: 处理博客文章
echo 📝 处理博客文章目录...
for /r "src\content\post" %%f in (*.md) do (
    set /a total_articles+=1
    set "article_path=%%~dpf"
    set "article_name=%%~nf"
    
    :: 检查是否有图片文件
    set has_images=0
    
    if exist "!article_path!*.jpg" set has_images=1
    if exist "!article_path!*.jpeg" set has_images=1
    if exist "!article_path!*.png" set has_images=1
    if exist "!article_path!*.gif" set has_images=1
    if exist "!article_path!*.webp" set has_images=1
    if exist "!article_path!*.svg" set has_images=1
    if exist "!article_path!*.bmp" set has_images=1
    
    if !has_images! equ 1 (
        echo   📁 处理文章: !article_name!
        
        :: 创建对应的图片目录
        set "target_dir=public\images\posts\!article_name!"
        if not exist "!target_dir!" mkdir "!target_dir!"
        
        :: 复制图片文件
        for %%img in ("!article_path!*.jpg" "!article_path!*.jpeg" "!article_path!*.png" "!article_path!*.gif" "!article_path!*.webp" "!article_path!*.svg" "!article_path!*.bmp") do (
            if exist "%%img" (
                copy "%%img" "!target_dir!\" >nul 2>&1
                if not errorlevel 1 (
                    echo     🖼️  复制: %%~nximg
                    set /a total_images+=1
                )
            )
        )
        
        :: 更新文章中的图片路径
        powershell -NoProfile -Command ^
            "$file = '%%f'; ^
             $articleName = '!article_name!'; ^
             $content = Get-Content $file -Raw -Encoding UTF8; ^
             $originalContent = $content; ^
             $content = $content -replace '\!\[([^\]]*)\]\(([^/)]+\.(jpg|jpeg|png|gif|webp|svg|bmp))\)', '![$$1](/images/posts/' + $articleName + '/$$2)'; ^
             if ($content -ne $originalContent) { ^
                 Set-Content $file -Value $content -Encoding UTF8; ^
                 Write-Host '     ✏️  更新图片路径'; ^
             }"
    )
)

echo.
echo 📝 处理笔记文章目录...
for /r "src\content\note" %%f in (*.md) do (
    set /a total_articles+=1
    set "article_path=%%~dpf"
    set "article_name=%%~nf"
    
    :: 检查是否有图片文件
    set has_images=0
    
    if exist "!article_path!*.jpg" set has_images=1
    if exist "!article_path!*.jpeg" set has_images=1
    if exist "!article_path!*.png" set has_images=1
    if exist "!article_path!*.gif" set has_images=1
    if exist "!article_path!*.webp" set has_images=1
    if exist "!article_path!*.svg" set has_images=1
    if exist "!article_path!*.bmp" set has_images=1
    
    if !has_images! equ 1 (
        echo   📁 处理笔记: !article_name!
        
        :: 创建对应的图片目录
        set "target_dir=public\images\notes\!article_name!"
        if not exist "!target_dir!" mkdir "!target_dir!"
        
        :: 复制图片文件
        for %%img in ("!article_path!*.jpg" "!article_path!*.jpeg" "!article_path!*.png" "!article_path!*.gif" "!article_path!*.webp" "!article_path!*.svg" "!article_path!*.bmp") do (
            if exist "%%img" (
                copy "%%img" "!target_dir!\" >nul 2>&1
                if not errorlevel 1 (
                    echo     🖼️  复制: %%~nximg
                    set /a total_images+=1
                )
            )
        )
        
        :: 更新文章中的图片路径
        powershell -NoProfile -Command ^
            "$file = '%%f'; ^
             $articleName = '!article_name!'; ^
             $content = Get-Content $file -Raw -Encoding UTF8; ^
             $originalContent = $content; ^
             $content = $content -replace '\!\[([^\]]*)\]\(([^/)]+\.(jpg|jpeg|png|gif|webp|svg|bmp))\)', '![$$1](/images/notes/' + $articleName + '/$$2)'; ^
             if ($content -ne $originalContent) { ^
                 Set-Content $file -Value $content -Encoding UTF8; ^
                 Write-Host '     ✏️  更新图片路径'; ^
             }"
    )
)

echo.
echo ==========================================
echo 📊 处理完成统计：
echo    处理文章总数: !total_articles! 篇
echo    复制图片总数: !total_images! 个
echo ==========================================
echo.

:: 询问是否继续发布
if !total_images! gtr 0 (
    echo 🚀 检测到图片变更，建议发布更新
    set /p "PUBLISH=是否立即发布博客？[Y/n]: "
    if /i "!PUBLISH!"=="y" (
        echo.
        call publish.bat
    ) else if /i "!PUBLISH!"=="" (
        echo.
        call publish.bat
    ) else (
        echo ✅ 图片处理完成，稍后可运行 publish.bat 发布
    )
) else (
    echo ℹ️  未发现需要处理的图片文件
)

echo.
pause