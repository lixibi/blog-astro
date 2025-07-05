@echo off
chcp 65001 > nul

echo ==========================================
echo        简化博客发布脚本
echo ==========================================
echo.

:: 检查是否在git仓库中
git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误：当前目录不是git仓库
    pause
    exit /b 1
)

echo 🔍 检查文件变更...
git status --short

echo.
set /p "msg=请输入提交信息 (回车使用默认): "
if "%msg%"=="" set msg=更新博客内容

echo.
echo 📁 添加所有文件...
git add .

echo 💾 创建提交...
git commit -m "%msg%

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

if errorlevel 1 (
    echo ❌ 提交失败或没有变更
    pause
    exit /b 1
)

echo 📤 推送到远程仓库...
git push

if errorlevel 1 (
    echo ❌ 推送失败，请检查网络连接
    pause
    exit /b 1
)

echo.
echo ==========================================
echo ✅ 发布成功！
echo ==========================================
echo.
echo 📋 说明：
echo - 图片会在构建时自动处理
echo - Vercel 将在几分钟内自动构建部署
echo - 请稍等片刻后访问博客查看更新
echo.
pause