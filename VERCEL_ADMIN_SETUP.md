# Vercel Admin 路由配置指南

## 问题描述
本地可以访问 `/admin` 路由，但在 Vercel 上返回 500 错误。

## 解决方案

### 1. 设置 Vercel 环境变量

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的项目 (blog-astro)
3. 进入 **Settings** → **Environment Variables**
4. 添加以下环境变量：

```
OAUTH_GITHUB_CLIENT_ID=您的GitHub OAuth Client ID
OAUTH_GITHUB_CLIENT_SECRET=您的GitHub OAuth Client Secret
```

**获取 GitHub OAuth 凭据：**
1. 访问 [GitHub Developer Settings](https://github.com/settings/applications)
2. 点击 "New OAuth App" 或编辑现有应用
3. 设置：
   - **Application name**: Blog Admin
   - **Homepage URL**: `https://blog.lixining.com`
   - **Authorization callback URL**: `https://blog.lixining.com/oauth/callback`
4. 创建后获取 Client ID 和 Client Secret

### 2. 检查配置文件

确认以下文件配置正确：

#### `public/admin/config.yml`
```yaml
backend:
  name: github
  branch: main
  repo: lixibi/blog-astro
  site_domain: blog.lixining.com
  base_url: https://blog.lixining.com
  auth_endpoint: oauth
```

#### `astro.config.ts`
```typescript
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: "https://blog.lixining.com/",
  // ...
});
```

### 3. 重新部署

设置完环境变量后：
1. 在 Vercel Dashboard 中点击 "Redeploy"
2. 或者推送新的代码触发自动部署

### 4. 验证部署

部署完成后访问：
- `https://blog.lixining.com/admin` - 应该显示 Decap CMS 登录界面
- `https://blog.lixining.com/oauth` - 应该返回 OAuth 相关响应

### 5. 故障排除

如果仍然无法访问：

1. **检查 Vercel 函数日志**：
   - 在 Vercel Dashboard → Functions 查看错误日志

2. **验证环境变量**：
   - 确保环境变量名称完全正确
   - 确保没有多余的空格或特殊字符

3. **检查 GitHub OAuth 应用**：
   - 确认回调 URL 完全匹配
   - 确认应用状态为 Active

4. **运行检查脚本**：
   ```bash
   node check-admin.js
   ```

## 常见错误

### 500 Internal Server Error
- 通常是环境变量缺失或配置错误
- 检查 Vercel 环境变量设置

### 404 Not Found
- 路由配置问题
- 确认 `astro-decap-cms-oauth` 集成正确安装

### OAuth 认证失败
- GitHub OAuth 应用配置错误
- 检查回调 URL 和域名设置

## 成功标志

当配置正确时，访问 `/admin` 应该看到：
- Decap CMS 界面
- "Login with GitHub" 按钮
- 页面标题为 "Content Manager"
