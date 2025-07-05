import fs from 'node:fs';
import path from 'node:path';
import type { AstroIntegration } from 'astro';

export function imageProcessor(): AstroIntegration {
  return {
    name: 'markdown-image-processor',
    hooks: {
      'astro:build:start': () => {
        console.log('🖼️  开始处理Markdown图片...');
        processMarkdownImages();
      }
    }
  };
}

function processMarkdownImages() {
  const contentDirs = [
    'src/content/post',
    'src/content/note'
  ];

  let totalImages = 0;
  let totalArticles = 0;

  contentDirs.forEach(contentDir => {
    if (!fs.existsSync(contentDir)) {
      console.log(`⚠️  目录不存在: ${contentDir}`);
      return;
    }

    console.log(`📂 处理目录: ${contentDir}`);
    
    // 获取目录中的所有文件
    const allFiles = fs.readdirSync(contentDir);
    const mdFiles = allFiles.filter(f => f.endsWith('.md'));
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];
    const imageFiles = allFiles.filter(f => {
      const ext = path.extname(f).toLowerCase().slice(1);
      return imageExtensions.includes(ext);
    });
    
    console.log(`📋 找到 ${mdFiles.length} 个Markdown文件, ${imageFiles.length} 个图片文件`);
    
    // 为每个内容类型创建图片目录
    const targetBaseDir = contentDir.includes('post') ? 'public/images/posts' : 'public/images/notes';
    if (!fs.existsSync(targetBaseDir)) {
      fs.mkdirSync(targetBaseDir, { recursive: true });
    }
    
    // 复制所有图片到目标目录
    imageFiles.forEach(imageFile => {
      const sourcePath = path.join(contentDir, imageFile);
      const targetPath = path.join(targetBaseDir, imageFile);
      
      try {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`🖼️  复制图片: ${imageFile} -> ${targetBaseDir}`);
        totalImages++;
      } catch (error) {
        console.error(`❌ 复制失败: ${imageFile}`, error);
      }
    });
    
    // 处理每个Markdown文件
    mdFiles.forEach(mdFile => {
      totalArticles++;
      const articlePath = path.join(contentDir, mdFile);
      const articleName = path.basename(mdFile, '.md');
      
      try {
        let content = fs.readFileSync(articlePath, 'utf8');
        const originalContent = content;
        
        console.log(`📄 处理文章: ${articleName}`);
        
        // 替换相对路径图片引用为绝对路径
        const imagePattern = /!\[([^\]]*)\]\(([^/)]+\.(jpg|jpeg|png|gif|webp|svg|bmp))\)/gi;
        const basePath = contentDir.includes('post') ? '/images/posts' : '/images/notes';
        
        let matchCount = 0;
        content = content.replace(imagePattern, (match, alt, filename) => {
          // 检查图片文件是否存在
          if (imageFiles.includes(filename)) {
            matchCount++;
            const newPath = `![${alt}](${basePath}/${filename})`;
            console.log(`  🔄 替换: ${filename} -> ${basePath}/${filename}`);
            return newPath;
          } else {
            console.log(`  ⚠️  图片文件不存在: ${filename}`);
            return match; // 保持原样
          }
        });
        
        if (content !== originalContent) {
          fs.writeFileSync(articlePath, content, 'utf8');
          console.log(`  ✏️  更新完成，替换了 ${matchCount} 个图片引用`);
        } else {
          console.log(`  ℹ️  无需更新图片路径`);
        }
      } catch (error) {
        console.error(`❌ 处理文章失败: ${articleName}`, error);
      }
    });
  });

  console.log(`📊 处理完成 - 文章: ${totalArticles}篇, 图片: ${totalImages}个`);
}