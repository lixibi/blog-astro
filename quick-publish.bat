@echo off
chcp 65001 > nul

echo 🚀 快速发布博客文章...

:: 检查变更
git status --short

echo.
set /p "msg=请输入提交信息 (回车使用默认): "
if "%msg%"=="" set msg=新增文章

echo.
echo 📁 添加文件...
git add .

echo 💾 提交变更...
git commit -m "%msg%"

echo 📤 推送到远程...
git push

echo.
echo ✅ 完成！请等待 Vercel 自动部署
pause