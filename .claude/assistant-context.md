# 李希宁博客项目助手上下文

## 项目架构概述

这是一个基于 Astro 5.0 的现代化博客系统，部署在 Vercel 上。

### 技术栈
- **框架**: Astro 5.0.3 + TypeScript
- **样式**: Tailwind CSS + 自定义组件系统
- **部署**: Vercel with @astrojs/vercel adapter
- **内容管理**: Astro Content Collections
- **包管理**: pnpm

### 关键配置文件
- `astro.config.ts` - Astro 主配置，必须包含 vercel() adapter
- `src/content.config.ts` - 内容集合定义
- `vercel.json` - Vercel 部署配置
- `package.json` - 依赖管理

## 内容结构

### 文章类型
1. **posts** (`src/content/post/`) - 主要博客文章
2. **notes** (`src/content/note/`) - 学习笔记
3. **recommendations** (`src/content/recommendation/`) - 书影推荐
4. **wx** (`src/content/wx/`) - 微信公众号文章

### 文章命名规范
- 格式：`YYYYMMDD_标题.md` 或 `YYYY.MM.DD_标题.md`
- 示例：`20250706_简约而不简单的生活哲学.md`

### Frontmatter 结构
```yaml
---
title: "文章标题"
description: "文章描述"
publishDate: "YYYY-MM-DD"
tags: ["标签1", "标签2"]
ogImage: "/social-card.avif"  # 可选
draft: false  # 可选，默认false
---
```

## 首页文章显示逻辑

### 数据流程
1. `src/pages/index.astro` 调用 `getAllPosts()` 获取所有文章
2. 使用 `collectionDateSort()` 按发布日期倒序排序
3. 取前 `MAX_POSTS = 6` 篇文章显示在首页

### 排序函数
```typescript
// src/utils/date.ts
export function collectionDateSort(
  a: CollectionEntry<"post" | "note">,
  b: CollectionEntry<"post" | "note">,
) {
  return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}
```

## 常见问题与解决方案

### 新文章不在首页显示
**根本原因分析（2025-07-06 调试经验）：**

1. **Vercel Adapter 缺失**
   - 问题：安装了 `@astrojs/vercel` 但未在 `astro.config.ts` 中配置
   - 解决：添加 `import vercel from "@astrojs/vercel"` 和 `adapter: vercel()`

2. **Content Collections 警告**
   - 问题：`wx` 目录存在但未在 `content.config.ts` 中定义
   - 解决：添加 wx 集合定义

3. **缓存问题**
   - Vercel 部署缓存
   - 浏览器缓存
   - 解决：强制刷新 (Ctrl+F5) + 等待 Vercel 重新部署

### 调试流程
1. **本地构建测试**: `pnpm build` 确认无错误
2. **检查生成文件**: 验证 `dist/index.html` 包含新文章
3. **检查配置**: 确认 Vercel adapter 正确配置
4. **推送部署**: git push 触发 Vercel 重新部署
5. **清除缓存**: 强制刷新浏览器

### 关键配置示例

#### astro.config.ts 必需配置
```typescript
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  // ... 其他配置
});
```

#### content.config.ts 完整集合
```typescript
export const collections = { 
  post, 
  note, 
  recommendation, 
  wx  // 必须包含所有实际存在的目录
};
```

## 开发工作流

### 添加新文章
1. 在 `src/content/post/` 创建 Markdown 文件
2. 确保 frontmatter 格式正确
3. 本地测试：`pnpm build` 验证构建
4. 提交推送：`git add . && git commit && git push`
5. 等待 Vercel 部署完成（2-5分钟）
6. 浏览器强制刷新查看结果

### 排查问题
1. 检查本地构建是否成功
2. 验证 frontmatter 格式
3. 确认文章在正确目录
4. 检查 Vercel 部署日志
5. 清除浏览器缓存

## 重要提醒

- **永远先本地构建测试**：确保 `pnpm build` 无错误
- **Vercel Adapter 必需**：没有 adapter 会导致静态文件路径问题
- **Content Collections 完整性**：所有目录都要在 config 中定义
- **缓存清理**：部署后需要强制刷新浏览器
- **等待部署**：Vercel 部署需要时间，不要急于判断问题

---
*最后更新: 2025-07-06*
*调试场景: 新文章不在首页显示问题*