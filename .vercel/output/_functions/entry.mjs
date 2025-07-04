import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CyGcHJAM.mjs';
import { manifest } from './manifest_C4jlDLMO.mjs';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/categories/_category_.astro.mjs');
const _page4 = () => import('./pages/categories.astro.mjs');
const _page5 = () => import('./pages/notes/rss.xml.astro.mjs');
const _page6 = () => import('./pages/notes/_---page_.astro.mjs');
const _page7 = () => import('./pages/notes/_---slug_.astro.mjs');
const _page8 = () => import('./pages/og-image/_---slug_.png.astro.mjs');
const _page9 = () => import('./pages/posts/_---page_.astro.mjs');
const _page10 = () => import('./pages/posts/_---slug_.astro.mjs');
const _page11 = () => import('./pages/recommendations.astro.mjs');
const _page12 = () => import('./pages/rss.xml.astro.mjs');
const _page13 = () => import('./pages/tags/_tag_/_---page_.astro.mjs');
const _page14 = () => import('./pages/tags.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.0.3_@types+node@22.10.1_jiti@1.21.6_rollup@4.28.0_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/categories/[category].astro", _page3],
    ["src/pages/categories/index.astro", _page4],
    ["src/pages/notes/rss.xml.ts", _page5],
    ["src/pages/notes/[...page].astro", _page6],
    ["src/pages/notes/[...slug].astro", _page7],
    ["src/pages/og-image/[...slug].png.ts", _page8],
    ["src/pages/posts/[...page].astro", _page9],
    ["src/pages/posts/[...slug].astro", _page10],
    ["src/pages/recommendations/index.astro", _page11],
    ["src/pages/rss.xml.ts", _page12],
    ["src/pages/tags/[tag]/[...page].astro", _page13],
    ["src/pages/tags/index.astro", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "faf6f247-d143-47a7-b9d3-fb3e99433842",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
