# Vercel Admin 路由调试指南

## 当前问题
访问 `/admin` 时出现 500 错误：`FUNCTION_INVOCATION_FAILED`

## 调试步骤

### 1. 首先测试基本路由
访问：`https://blog.lixining.com/admin-test`

如果这个页面能正常显示，说明Vercel的SSR功能正常工作。

### 2. 检查Vercel环境变量
在Vercel Dashboard中确认以下环境变量已设置：

```
OAUTH_GITHUB_CLIENT_ID=你的GitHub OAuth Client ID
OAUTH_GITHUB_CLIENT_SECRET=你的GitHub OAuth Client Secret
```

**重要**：设置环境变量后必须重新部署！

### 3. 获取GitHub OAuth凭据

#### 方法1：创建新的OAuth App
1. 访问：https://github.com/settings/applications/new
2. 填写：
   - Application name: `Blog Admin`
   - Homepage URL: `https://blog.lixining.com`
   - Authorization callback URL: `https://blog.lixining.com/oauth/callback`
3. 创建后复制 Client ID 和 Client Secret

#### 方法2：检查现有OAuth App
1. 访问：https://github.com/settings/developers
2. 找到现有的OAuth应用
3. 确认回调URL是：`https://blog.lixining.com/oauth/callback`

### 4. 检查Vercel函数日志
1. 在Vercel Dashboard中进入项目
2. 点击 "Functions" 标签
3. 查看最近的错误日志
4. 寻找具体的错误信息

### 5. 常见问题解决

#### 问题1：环境变量未设置
**症状**：500错误，函数调用失败
**解决**：在Vercel中设置环境变量并重新部署

#### 问题2：GitHub OAuth配置错误
**症状**：OAuth认证失败
**解决**：检查回调URL和域名配置

#### 问题3：内存或超时问题
**症状**：函数超时或内存不足
**解决**：已在vercel.json中增加内存和超时限制

### 6. 验证步骤

按顺序验证：
1. ✅ `/admin-test` - 基本SSR功能
2. ✅ 环境变量已设置
3. ✅ GitHub OAuth应用配置正确
4. ✅ `/admin` - Decap CMS界面

### 7. 如果仍然失败

请提供以下信息：
1. `/admin-test` 页面显示的环境变量状态
2. Vercel函数日志中的具体错误信息
3. GitHub OAuth应用的配置截图

## 临时解决方案

如果admin路由仍然无法工作，可以：
1. 使用本地开发环境进行内容编辑
2. 直接编辑GitHub仓库中的markdown文件
3. 考虑使用其他CMS解决方案
