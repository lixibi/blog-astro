import { c as createAstro, a as createComponent } from '../chunks/astro/server_UGElL9ja.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://demo.343700.xyz/");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return Astro2.redirect("/tags/", 301);
}, "C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/categories/index.astro", void 0);

const $$file = "C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/categories/index.astro";
const $$url = "/categories";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
