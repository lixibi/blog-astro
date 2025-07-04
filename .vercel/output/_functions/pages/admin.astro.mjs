import { a as createComponent, r as renderTemplate, b as addAttribute, e as renderHead } from '../chunks/astro/server_UGElL9ja.mjs';
import { P as PUBLIC_DECAP_CMS_VERSION } from '../chunks/client_C4DogGe3.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Admin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="noindex"><link href="/admin/config.yml" type="text/yaml" rel="cms-config-url"><title>Content Manager</title>', "</head> <body> <!-- Include the script that builds the page and powers Decap CMS --> <script", "><\/script> </body> </html>"])), renderHead(), addAttribute(`https://unpkg.com/decap-cms@^${PUBLIC_DECAP_CMS_VERSION}/dist/decap-cms.js`, "src"));
}, "C:/Users/Administrator/Documents/code/blog-astro/blog-astro/node_modules/.pnpm/astro-decap-cms-oauth@0.5.1_astro@5.0.3_@types+node@22.10.1_jiti@1.21.6_rollup@4.28.0_typescript@5.7.2_yaml@2.6.1_/node_modules/astro-decap-cms-oauth/src/admin.astro", void 0);

const $$file = "C:/Users/Administrator/Documents/code/blog-astro/blog-astro/node_modules/.pnpm/astro-decap-cms-oauth@0.5.1_astro@5.0.3_@types+node@22.10.1_jiti@1.21.6_rollup@4.28.0_typescript@5.7.2_yaml@2.6.1_/node_modules/astro-decap-cms-oauth/src/admin.astro";
const $$url = undefined;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Admin,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
