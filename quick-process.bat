@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo 🔄 快速处理当前文件夹图片...

:: 确保目录存在
if not exist "public\images\posts" mkdir "public\images\posts"
if not exist "public\images\notes" mkdir "public\images\notes"

:: 处理posts中的图片
for /r "src\content\post" %%f in (*.md) do (
    set "article_dir=%%~dpf"
    set "article_name=%%~nf"
    
    :: 检查是否有图片文件
    set has_images=0
    for %%img in ("!article_dir!*.jpg" "!article_dir!*.png" "!article_dir!*.jpeg" "!article_dir!*.gif" "!article_dir!*.webp") do (
        if exist "%%img" (
            set has_images=1
            :: 创建目标目录
            if not exist "public\images\posts\!article_name!" mkdir "public\images\posts\!article_name!"
            
            :: 复制图片
            copy "%%img" "public\images\posts\!article_name!\" >nul 2>&1
            echo 📷 复制: %%~nximg
        )
    )
    
    :: 更新文章中的路径
    if !has_images! equ 1 (
        powershell -Command "(Get-Content '%%f' -Raw) -replace '!\[([^\]]*)\]\(([^/)]+\.(jpg|jpeg|png|gif|webp))\)', '![$$1](/images/posts/!article_name!/$$2)' | Set-Content '%%f'"
        echo ✏️  更新: !article_name!
    )
)

:: 处理notes中的图片
for /r "src\content\note" %%f in (*.md) do (
    set "article_dir=%%~dpf"
    set "article_name=%%~nf"
    
    :: 检查是否有图片文件
    set has_images=0
    for %%img in ("!article_dir!*.jpg" "!article_dir!*.png" "!article_dir!*.jpeg" "!article_dir!*.gif" "!article_dir!*.webp") do (
        if exist "%%img" (
            set has_images=1
            :: 创建目标目录
            if not exist "public\images\notes\!article_name!" mkdir "public\images\notes\!article_name!"
            
            :: 复制图片
            copy "%%img" "public\images\notes\!article_name!\" >nul 2>&1
            echo 📷 复制: %%~nximg
        )
    )
    
    :: 更新文章中的路径
    if !has_images! equ 1 (
        powershell -Command "(Get-Content '%%f' -Raw) -replace '!\[([^\]]*)\]\(([^/)]+\.(jpg|jpeg|png|gif|webp))\)', '![$$1](/images/notes/!article_name!/$$2)' | Set-Content '%%f'"
        echo ✏️  更新: !article_name!
    )
)

echo ✅ 图片处理完成
call publish.bat