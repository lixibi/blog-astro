import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CyGcHJAM.mjs';
import { manifest } from './manifest_Vz0C37e1.mjs';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/admin.astro.mjs');
const _page4 = () => import('./pages/admin-test.astro.mjs');
const _page5 = () => import('./pages/categories/_category_.astro.mjs');
const _page6 = () => import('./pages/categories.astro.mjs');
const _page7 = () => import('./pages/notes/rss.xml.astro.mjs');
const _page8 = () => import('./pages/notes/_---page_.astro.mjs');
const _page9 = () => import('./pages/notes/_---slug_.astro.mjs');
const _page10 = () => import('./pages/oauth/callback.astro.mjs');
const _page11 = () => import('./pages/oauth.astro.mjs');
const _page12 = () => import('./pages/og-image/_---slug_.png.astro.mjs');
const _page13 = () => import('./pages/posts/_---page_.astro.mjs');
const _page14 = () => import('./pages/posts/_---slug_.astro.mjs');
const _page15 = () => import('./pages/recommendations.astro.mjs');
const _page16 = () => import('./pages/rss.xml.astro.mjs');
const _page17 = () => import('./pages/tags/_tag_/_---page_.astro.mjs');
const _page18 = () => import('./pages/tags.astro.mjs');
const _page19 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.0.3_@types+node@22.10.1_jiti@1.21.6_rollup@4.28.0_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["node_modules/.pnpm/astro-decap-cms-oauth@0.5.1_astro@5.0.3_@types+node@22.10.1_jiti@1.21.6_rollup@4.28.0_typescript@5.7.2_yaml@2.6.1_/node_modules/astro-decap-cms-oauth/src/admin.astro", _page3],
    ["src/pages/admin-test.astro", _page4],
    ["src/pages/categories/[category].astro", _page5],
    ["src/pages/categories/index.astro", _page6],
    ["src/pages/notes/rss.xml.ts", _page7],
    ["src/pages/notes/[...page].astro", _page8],
    ["src/pages/notes/[...slug].astro", _page9],
    ["node_modules/.pnpm/astro-decap-cms-oauth@0.5.1_astro@5.0.3_@types+node@22.10.1_jiti@1.21.6_rollup@4.28.0_typescript@5.7.2_yaml@2.6.1_/node_modules/astro-decap-cms-oauth/src/oauth/callback.ts", _page10],
    ["node_modules/.pnpm/astro-decap-cms-oauth@0.5.1_astro@5.0.3_@types+node@22.10.1_jiti@1.21.6_rollup@4.28.0_typescript@5.7.2_yaml@2.6.1_/node_modules/astro-decap-cms-oauth/src/oauth/index.ts", _page11],
    ["src/pages/og-image/[...slug].png.ts", _page12],
    ["src/pages/posts/[...page].astro", _page13],
    ["src/pages/posts/[...slug].astro", _page14],
    ["src/pages/recommendations/index.astro", _page15],
    ["src/pages/rss.xml.ts", _page16],
    ["src/pages/tags/[tag]/[...page].astro", _page17],
    ["src/pages/tags/index.astro", _page18],
    ["src/pages/index.astro", _page19]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "6575b9bf-d2a0-4dd4-b300-5be973b2032a",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
