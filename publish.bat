@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo ==========================================
echo        博客文章自动推送脚本
echo ==========================================
echo.

:: 检查是否在git仓库中
git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误：当前目录不是git仓库
    pause
    exit /b 1
)

:: 检查工作区状态
echo 🔍 检查文件变更...
git status --porcelain > temp_status.txt

if not exist temp_status.txt (
    echo ❌ 无法获取git状态
    pause
    exit /b 1
)

:: 检查是否有变更
for /f %%i in (temp_status.txt) do set HAS_CHANGES=1

if not defined HAS_CHANGES (
    echo ✅ 没有检测到文件变更
    del temp_status.txt
    pause
    exit /b 0
)

echo.
echo 📝 检测到以下文件变更：
echo.

:: 分析变更类型
set NEW_POSTS=0
set NEW_NOTES=0
set MODIFIED_POSTS=0
set MODIFIED_NOTES=0
set NEW_IMAGES=0
set OTHER_CHANGES=0

for /f "tokens=1,* delims= " %%a in (temp_status.txt) do (
    set STATUS=%%a
    set FILEPATH=%%b
    
    if "!FILEPATH:~0,17!"=="src/content/post/" (
        if "!STATUS!"=="??" (
            set /a NEW_POSTS+=1
            echo ➕ 新增博客文章: !FILEPATH!
        ) else (
            set /a MODIFIED_POSTS+=1
            echo ✏️  修改博客文章: !FILEPATH!
        )
    ) else if "!FILEPATH:~0,17!"=="src/content/note/" (
        if "!STATUS!"=="??" (
            set /a NEW_NOTES+=1
            echo ➕ 新增笔记文章: !FILEPATH!
        ) else (
            set /a MODIFIED_NOTES+=1
            echo ✏️  修改笔记文章: !FILEPATH!
        )
    ) else if "!FILEPATH:~0,14!"=="public/images/" (
        if "!STATUS!"=="??" (
            set /a NEW_IMAGES+=1
            echo 🖼️  新增图片: !FILEPATH!
        ) else (
            echo 🖼️  更新图片: !FILEPATH!
        )
    ) else (
        set /a OTHER_CHANGES+=1
        if "!STATUS!"=="??" (
            echo ➕ 新增文件: !FILEPATH!
        ) else if "!STATUS!"=="M" (
            echo ✏️  修改文件: !FILEPATH!
        ) else if "!STATUS!"=="D" (
            echo ❌ 删除文件: !FILEPATH!
        ) else (
            echo 🔄 变更文件: !FILEPATH!
        )
    )
)

del temp_status.txt

:: 生成智能提交信息
set COMMIT_MSG=""
if !NEW_POSTS! gtr 0 (
    if !NEW_POSTS! equ 1 (
        set COMMIT_MSG="新增博客文章"
    ) else (
        set COMMIT_MSG="新增 !NEW_POSTS! 篇博客文章"
    )
)

if !NEW_NOTES! gtr 0 (
    if defined COMMIT_MSG (
        if !NEW_NOTES! equ 1 (
            set COMMIT_MSG=!COMMIT_MSG:~0,-1! 和 1 篇笔记"
        ) else (
            set COMMIT_MSG=!COMMIT_MSG:~0,-1! 和 !NEW_NOTES! 篇笔记"
        )
    ) else (
        if !NEW_NOTES! equ 1 (
            set COMMIT_MSG="新增笔记文章"
        ) else (
            set COMMIT_MSG="新增 !NEW_NOTES! 篇笔记文章"
        )
    )
)

if !MODIFIED_POSTS! gtr 0 (
    if defined COMMIT_MSG (
        set COMMIT_MSG=!COMMIT_MSG:~0,-1!；更新博客内容"
    ) else (
        set COMMIT_MSG="更新博客内容"
    )
)

if !MODIFIED_NOTES! gtr 0 (
    if defined COMMIT_MSG (
        set COMMIT_MSG=!COMMIT_MSG:~0,-1!；更新笔记内容"
    ) else (
        set COMMIT_MSG="更新笔记内容"
    )
)

if !OTHER_CHANGES! gtr 0 (
    if defined COMMIT_MSG (
        set COMMIT_MSG=!COMMIT_MSG:~0,-1!；其他文件更新"
    ) else (
        set COMMIT_MSG="更新项目文件"
    )
)

:: 如果没有生成提交信息，使用默认
if !COMMIT_MSG!=="" set COMMIT_MSG="更新内容"

echo.
echo 📊 变更统计：
echo    新增博客文章: !NEW_POSTS! 篇
echo    新增笔记文章: !NEW_NOTES! 篇
echo    修改博客文章: !MODIFIED_POSTS! 篇
echo    修改笔记文章: !MODIFIED_NOTES! 篇
echo    新增图片文件: !NEW_IMAGES! 个
echo    其他文件变更: !OTHER_CHANGES! 个
echo.
echo 🏷️  建议提交信息: !COMMIT_MSG!
echo.

:: 询问用户是否继续
set /p "CONFIRM=是否继续提交并推送？[Y/n]: "
if /i "!CONFIRM!"=="n" (
    echo ❌ 操作已取消
    pause
    exit /b 0
)
if /i "!CONFIRM!"=="no" (
    echo ❌ 操作已取消
    pause
    exit /b 0
)

echo.
echo 🚀 开始提交和推送...
echo.

:: 添加所有变更
echo 📁 添加文件到暂存区...
git add .
if errorlevel 1 (
    echo ❌ 添加文件失败
    pause
    exit /b 1
)

:: 提交变更
echo 💾 创建提交...
git commit -m !COMMIT_MSG!
if errorlevel 1 (
    echo ❌ 提交失败
    pause
    exit /b 1
)

:: 推送到远程仓库
echo 📤 推送到远程仓库...
git push
if errorlevel 1 (
    echo ❌ 推送失败，请检查网络连接或仓库权限
    pause
    exit /b 1
)

echo.
echo ==========================================
echo ✅ 成功完成！文章已推送到远程仓库
echo ==========================================
echo.
echo 📈 Vercel 将在几分钟内自动构建和部署
echo 🌐 请稍等片刻后访问你的博客网站查看更新
echo.
pause