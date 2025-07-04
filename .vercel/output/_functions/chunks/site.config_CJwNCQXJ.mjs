const siteConfig = {
  // Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
  author: "李希宁",
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
  date: {
    locale: "zh-CN",
    options: {
      day: "numeric",
      month: "narrow",
      year: "numeric"
    }
  },
  // Used as the default description meta property and webmanifest description
  description: "李希宁的个人博客 - 专注于AI技术、Web开发和游戏领域，分享技术心得与生活感悟",
  // HTML lang property, found in src/layouts/Base.astro L:18 & astro.config.ts L:48
  lang: "zh-CN",
  // Meta property, found in src/components/BaseHead.astro L:42
  ogLocale: "zh-CN",
  // Used to construct the meta title property found in src/components/BaseHead.astro L:11, and webmanifest name found in astro.config.ts L:42
  title: "李希宁的博客"
};
const menuLinks = [
  {
    path: "/",
    title: "首页"
  },
  {
    path: "/about/",
    title: "关于"
  },
  {
    path: "/posts/",
    title: "文章"
  },
  {
    path: "/notes/",
    title: "笔记"
  },
  {
    path: "/tags/",
    title: "标签"
  }
];

export { menuLinks as m, siteConfig as s };
