# Obsidian + 博客图片管理方案 🖼️

## 方案一：Obsidian附件文件夹 + 自动复制脚本（推荐）

### 1. 配置Obsidian附件设置
在Obsidian中：
1. 设置 → 文件与链接 → 附件默认存放路径
2. 选择"指定文件夹"
3. 设置为：`public/images/obsidian/`

### 2. 创建图片同步脚本
```batch
@echo off
echo 🔄 同步Obsidian图片到博客目录...

:: 确保目标目录存在
if not exist "public\images\posts" mkdir "public\images\posts"
if not exist "public\images\notes" mkdir "public\images\notes"

:: 复制Obsidian附件到对应目录
xcopy "public\images\obsidian\*" "public\images\posts\" /s /y /q 2>nul
xcopy "public\images\obsidian\*" "public\images\notes\" /s /y /q 2>nul

echo ✅ 图片同步完成
```

## 方案二：直接配置Obsidian附件路径

### 配置步骤
1. 在Obsidian设置中：
   - 附件默认存放路径：`public/images/posts`
   - 新建附件的存放位置：`当前文件所在文件夹的子文件夹`
   - 子文件夹名称：`assets`

### 目录结构
```
src/content/post/
├── 2025-01-15_文章标题.md
└── assets/
    ├── image1.png
    └── image2.jpg
```

## 方案三：统一附件文件夹（最简单）

### 1. Obsidian设置
- 附件默认存放路径：`public/images/`
- 使用子文件夹：否

### 2. 在文章中的引用方式
```markdown
# Obsidian中编辑时
![图片](../../../public/images/example.jpg)

# 发布后自动转换为
![图片](/images/example.jpg)
```

## 方案四：使用Obsidian插件

### 推荐插件
1. **Image auto upload Plugin** - 自动上传图片
2. **Paste image rename** - 粘贴时重命名图片
3. **Path title** - 智能路径管理

## 实际工作流程（推荐方案一）

### 1. 在Obsidian中写作
```markdown
# 正常插入图片，Obsidian会自动处理
![我的截图](public/images/obsidian/screenshot-2025-01-15.png)
```

### 2. 完成写作后
```batch
# 运行同步脚本
sync-images.bat

# 发布博客
publish.bat
```

### 3. 图片路径自动处理
发布脚本会自动将Obsidian的图片路径转换为博客的标准路径。

## 路径转换脚本

我来创建一个自动转换图片路径的脚本：
```batch
@echo off
echo 🔄 转换Obsidian图片路径...

:: 遍历所有md文件，替换图片路径
for /r "src\content" %%f in (*.md) do (
    powershell -Command "(Get-Content '%%f') -replace 'public/images/obsidian/', '/images/' | Set-Content '%%f'"
)

echo ✅ 路径转换完成
```

## 建议的最佳实践

1. **使用方案一**：既保持Obsidian的便利性，又符合博客的结构
2. **图片命名规范**：`YYYY-MM-DD-描述.扩展名`
3. **定期清理**：删除不用的图片文件
4. **备份重要图片**：使用git版本控制

这样你就可以在Obsidian中正常写作，图片管理完全自动化！