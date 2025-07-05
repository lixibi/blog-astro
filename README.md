<div align="center">
  <h1>李希宁的博客</h1>
  <p>基于 Astro 框架的个人博客，采用汉白玉风格设计</p>
</div>

## 项目简介 📖

这是一个基于 Astro 框架构建的个人博客系统，采用简洁优雅的汉白玉风格设计。项目从 astro-theme-cactus 主题 fork 而来，但已经完全重构，去除了后台管理和搜索功能，专注于简洁的阅读体验。

**主要特性：**
- 🎨 **汉白玉风格设计** - 简洁优雅的视觉体验
- 📝 **分类+标签系统** - 更好的内容组织方式
- 🚀 **静态站点生成** - 快速加载，SEO友好
- 📱 **响应式设计** - 完美适配各种设备
- 🌙 **暗黑模式支持** - 舒适的夜间阅读体验
- ⚡ **零依赖搜索** - 移除复杂的搜索功能，专注内容
- 🎯 **简化工作流** - 直接编辑Markdown文件即可发布

## 演示站点 💻

[在线预览](https://你的域名.com)

## 快速开始 🚀

### 1. 克隆项目

```bash
git clone https://github.com/lixibi/blog-astro.git
cd blog-astro
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:4321` 查看效果

### 4. 创建文章

在 `src/content/post/` 目录下创建 Markdown 文件：

```markdown
---
title: "你的文章标题"
description: "文章简介"
publishDate: "2025-01-15"
tags: ["标签1", "标签2"]
---

# 你的文章内容

这里是文章正文...
```

### 5. 部署到 Vercel

1. 将项目推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 每次推送代码，Vercel 会自动构建和部署

## 项目架构 🏗️

```
src/
├── components/          # 组件文件
│   ├── layout/         # 布局组件
│   ├── blog/           # 博客相关组件
│   └── note/           # 笔记相关组件
├── content/            # 内容文件
│   ├── post/           # 博客文章
│   └── note/           # 笔记文章
├── layouts/            # 页面布局
├── pages/              # 页面文件
├── styles/             # 样式文件
└── utils/              # 工具函数
```

## 内容管理 📚

### 文章分类

- **博客文章** (`src/content/post/`) - 正式的博客文章
- **笔记文章** (`src/content/note/`) - 学习笔记和随笔

### 标签系统

通过 `tags` 字段为文章添加标签，支持多标签分类。

### 文件命名规范

建议使用以下格式：
- `YYYY.MM.DD_文章标题.md`
- `YYYYMMDD_文章标题.md`

## 可用命令 📋

| 命令 | 操作 |
|------|------|
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm preview` | 预览构建结果 |
| `pnpm check` | 类型检查 |
| `pnpm lint` | 代码检查 |
| `pnpm format` | 代码格式化 |

## 个性化配置 ⚙️

### 基础信息

修改 `src/site.config.ts` 文件：

```typescript
export const siteConfig = {
  title: "你的博客标题",
  description: "博客描述",
  url: "https://你的域名.com",
  author: "你的名字",
  // ... 其他配置
}
```

### 导航菜单

在 `src/site.config.ts` 中修改 `menuLinks` 数组：

```typescript
export const menuLinks = [
  { title: "首页", path: "/" },
  { title: "博客", path: "/posts/" },
  { title: "笔记", path: "/notes/" },
  { title: "标签", path: "/tags/" },
]
```

### 个人信息

修改 `src/components/layout/HeaderWithPersonal.astro` 中的个人信息配置。

### 主题样式

项目采用 TailwindCSS，可以在 `src/styles/` 目录下自定义样式。

## 部署指南 🚀

### Vercel 部署

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置自动部署

### 其他平台

项目生成纯静态文件，支持部署到任何静态托管平台：
- Netlify
- GitHub Pages
- Cloudflare Pages
- 等等

## 更新日志 📅

### 主要改动

- ✅ **移除后台管理** - 简化为纯静态博客
- ✅ **移除搜索功能** - 专注内容阅读
- ✅ **重构样式系统** - 采用汉白玉风格
- ✅ **优化文章分类** - 实现分类+标签双重组织
- ✅ **简化构建流程** - 移除复杂的构建依赖

## 技术栈 🛠️

- **框架**: Astro
- **样式**: TailwindCSS
- **图标**: Astro Icon
- **部署**: Vercel
- **包管理**: pnpm

## 贡献指南 🤝

欢迎提交 Issue 和 Pull Request！

## 许可证 📄

MIT License

---

**简单三步，开始写作：**

1. 编辑 `src/content/post/` 下的 Markdown 文件
2. `git add . && git commit -m "新增文章" && git push`
3. 等待 Vercel 自动构建部署 ✨