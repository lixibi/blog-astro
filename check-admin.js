// 检查admin路由和环境变量的脚本
console.log('=== Admin Route Check ===');
console.log('Environment Variables:');
console.log('OAUTH_GITHUB_CLIENT_ID:', process.env.OAUTH_GITHUB_CLIENT_ID ? 'Set' : 'Not Set');
console.log('OAUTH_GITHUB_CLIENT_SECRET:', process.env.OAUTH_GITHUB_CLIENT_SECRET ? 'Set' : 'Not Set');
console.log('OAUTH_GITHUB_REPO_ID:', process.env.OAUTH_GITHUB_REPO_ID ? 'Set' : 'Not Set');

// 检查admin路由是否可访问
async function checkAdminRoute() {
  try {
    const response = await fetch('https://blog.lixining.com/admin');
    console.log('Admin route status:', response.status);
    console.log('Admin route headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const text = await response.text();
      console.log('Admin page loaded successfully');
      console.log('Page contains "Content Manager":', text.includes('Content Manager'));
      console.log('Page contains "decap-cms":', text.includes('decap-cms'));
    } else {
      console.log('Admin route failed with status:', response.status);
    }
  } catch (error) {
    console.error('Error checking admin route:', error.message);
  }
}

// 检查OAuth路由
async function checkOAuthRoute() {
  try {
    const response = await fetch('https://blog.lixining.com/oauth');
    console.log('OAuth route status:', response.status);
  } catch (error) {
    console.error('Error checking OAuth route:', error.message);
  }
}

// 运行检查
if (typeof window === 'undefined') {
  // Node.js环境
  checkAdminRoute();
  checkOAuthRoute();
} else {
  // 浏览器环境
  console.log('Run this script in Node.js environment');
}
