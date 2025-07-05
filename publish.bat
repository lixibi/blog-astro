@echo off
chcp 65001 > nul

echo ==========================================
echo        博客文章自动推送脚本
echo ==========================================
echo.

echo 📦 构建项目...
call pnpm build
echo.
echo 📦 构建命令执行完毕
echo.

echo 📁 添加文件到暂存区...
git add .
echo ✅ 文件添加成功！

echo 💾 创建提交...
git commit -m "新增文章"
echo ✅ 提交成功！

echo 📤 推送到远程仓库...
git push
echo ✅ 推送成功！

echo.
echo ==========================================
echo ✅ 成功完成！文章已推送到远程仓库
echo ==========================================
echo.
pause