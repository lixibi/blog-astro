# 这个目录用于存放博客文章的图片

## 目录结构建议
```
posts/
├── 2025/
│   ├── 01/          # 2025年1月的文章图片
│   ├── 02/          # 2025年2月的文章图片
│   └── ...
├── 2024/
│   └── ...
└── common/          # 通用图片（logo、图标等）
```

## 使用方法
1. 将图片放入对应的年月文件夹
2. 在Markdown文章中使用相对路径引用：
   ```markdown
   ![图片描述](/images/posts/2025/01/your-image.jpg)
   ```

## 命名建议
- 使用有意义的文件名
- 避免中文和特殊字符
- 例：`blog-setup-screenshot.png`、`philosophy-diagram.jpg`