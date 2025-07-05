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
    if (!fs.existsSync(contentDir)) return;

    const files = fs.readdirSync(contentDir, { withFileTypes: true });
    
    files.forEach(file => {
      if (file.isFile() && file.name.endsWith('.md')) {
        totalArticles++;
        const articlePath = path.join(contentDir, file.name);
        const articleDir = path.dirname(articlePath);
        const articleName = path.basename(file.name, '.md');
        
        // 检查是否有图片文件
        const imageFiles = fs.readdirSync(articleDir).filter(f => 
          /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(f)
        );
        
        if (imageFiles.length > 0) {
          console.log(`  📁 处理文章: ${articleName}`);
          
          // 确定目标目录
          const targetDir = contentDir.includes('post') 
            ? `public/images/posts/${articleName}`
            : `public/images/notes/${articleName}`;
          
          // 创建目标目录
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          
          // 复制图片文件
          imageFiles.forEach(imageFile => {
            const sourcePath = path.join(articleDir, imageFile);
            const targetPath = path.join(targetDir, imageFile);
            
            try {
              fs.copyFileSync(sourcePath, targetPath);
              console.log(`    🖼️  复制: ${imageFile}`);
              totalImages++;
            } catch (error) {
              console.error(`    ❌ 复制失败: ${imageFile}`, error);
            }
          });
          
          // 更新Markdown文件中的图片路径
          try {
            let content = fs.readFileSync(articlePath, 'utf8');
            const originalContent = content;
            
            // 替换相对路径图片引用
            const imagePattern = /!\[([^\]]*)\]\(([^/)]+\.(jpg|jpeg|png|gif|webp|svg|bmp))\)/gi;
            const basePath = contentDir.includes('post') ? '/images/posts' : '/images/notes';
            
            content = content.replace(imagePattern, (match, alt, filename) => {
              return `![${alt}](${basePath}/${articleName}/${filename})`;
            });
            
            if (content !== originalContent) {
              fs.writeFileSync(articlePath, content, 'utf8');
              console.log(`    ✏️  更新图片路径`);
            }
          } catch (error) {
            console.error(`    ❌ 更新失败: ${articleName}`, error);
          }
        }
      }
    });
  });

  console.log(`📊 处理完成 - 文章: ${totalArticles}篇, 图片: ${totalImages}个`);
}