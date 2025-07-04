import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_B7_79M3p.mjs';
import { l as decodeKey } from './chunks/astro/server_UGElL9ja.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Administrator/Documents/code/blog-astro/blog-astro/","adapterName":"@astrojs/vercel","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"recommendations/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/recommendations","isIndex":true,"type":"page","pattern":"^\\/recommendations\\/?$","segments":[[{"content":"recommendations","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/recommendations/index.astro","pathname":"/recommendations","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tags/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tags","isIndex":true,"type":"page","pattern":"^\\/tags\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DTIbhfSr.js"}],"styles":[{"type":"inline","content":"[data-astro-image]{aspect-ratio:var(--w) /var(--h);height:auto;-o-object-fit:var(--fit);object-fit:var(--fit);-o-object-position:var(--pos);object-position:var(--pos);width:100%}[data-astro-image=responsive]{max-height:calc(var(--h)*1px);max-width:calc(var(--w)*1px)}[data-astro-image=fixed]{height:calc(var(--h)*1px);width:calc(var(--w)*1px)}\n"}],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.0.3_@types+node@22.10.1_jiti@1.21.6_rollup@4.28.0_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DTIbhfSr.js"}],"styles":[],"routeData":{"route":"/categories","isIndex":true,"type":"page","pattern":"^\\/categories\\/?$","segments":[[{"content":"categories","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/categories/index.astro","pathname":"/categories","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DTIbhfSr.js"}],"styles":[{"type":"inline","content":"[data-astro-image]{aspect-ratio:var(--w) /var(--h);height:auto;-o-object-fit:var(--fit);object-fit:var(--fit);-o-object-position:var(--pos);object-position:var(--pos);width:100%}[data-astro-image=responsive]{max-height:calc(var(--h)*1px);max-width:calc(var(--w)*1px)}[data-astro-image=fixed]{height:calc(var(--h)*1px);width:calc(var(--w)*1px)}\n"}],"routeData":{"route":"/notes/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/notes\\/rss\\.xml\\/?$","segments":[[{"content":"notes","dynamic":false,"spread":false}],[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/notes/rss.xml.ts","pathname":"/notes/rss.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DTIbhfSr.js"}],"styles":[{"type":"inline","content":"[data-astro-image]{aspect-ratio:var(--w) /var(--h);height:auto;-o-object-fit:var(--fit);object-fit:var(--fit);-o-object-position:var(--pos);object-position:var(--pos);width:100%}[data-astro-image=responsive]{max-height:calc(var(--h)*1px);max-width:calc(var(--w)*1px)}[data-astro-image=fixed]{height:calc(var(--h)*1px);width:calc(var(--w)*1px)}\n"}],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://blog.lixining.com/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/notes/[...page].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/notes/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/posts/[...page].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/recommendations/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/tags/[tag]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/components/RecommendationSection.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/components/note/Note.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/notes/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/notes/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/data/post.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/og-image/[...slug].png.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/og-image/[...slug].png@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/recommendations/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/[tag]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/layouts/BlogPost.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/notes/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/notes/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/categories/[category]@_@astro":"pages/categories/_category_.astro.mjs","\u0000@astro-page:src/pages/categories/index@_@astro":"pages/categories.astro.mjs","\u0000@astro-page:src/pages/notes/rss.xml@_@ts":"pages/notes/rss.xml.astro.mjs","\u0000@astro-page:src/pages/notes/[...page]@_@astro":"pages/notes/_---page_.astro.mjs","\u0000@astro-page:src/pages/notes/[...slug]@_@astro":"pages/notes/_---slug_.astro.mjs","\u0000@astro-page:src/pages/posts/[...page]@_@astro":"pages/posts/_---page_.astro.mjs","\u0000@astro-page:src/pages/recommendations/index@_@astro":"pages/recommendations.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/tags/[tag]/[...page]@_@astro":"pages/tags/_tag_/_---page_.astro.mjs","\u0000@astro-page:src/pages/tags/index@_@astro":"pages/tags.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.0.3_@types+node@22.10.1_jiti@1.21.6_rollup@4.28.0_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/og-image/[...slug].png@_@ts":"pages/og-image/_---slug_.png.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/posts/[...slug]@_@astro":"pages/posts/_---slug_.astro.mjs","C:/Users/Administrator/Documents/code/blog-astro/blog-astro/node_modules/.pnpm/astro@5.0.3_@types+node@22.10.1_jiti@1.21.6_rollup@4.28.0_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BQbhRW6C.mjs","C:\\Users\\Administrator\\Documents\\code\\blog-astro\\blog-astro\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","C:\\Users\\Administrator\\Documents\\code\\blog-astro\\blog-astro\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_Di7ntLsY.mjs","\u0000@astrojs-manifest":"manifest_DGwBGf-I.mjs","C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/tags/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.Dz5SvbUs.js","C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/layouts/BlogPost.astro?astro&type=script&index=0&lang.ts":"_astro/BlogPost.astro_astro_type_script_index_0_lang.CSRpGidt.js","C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/components/layout/HeaderWithPersonal.astro?astro&type=script&index=0&lang.ts":"_astro/HeaderWithPersonal.astro_astro_type_script_index_0_lang.DuSsDY4R.js","C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/components/Search.astro?astro&type=script&index=0&lang.ts":"_astro/Search.astro_astro_type_script_index_0_lang.DnOuxdM7.js","C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts":"_astro/ThemeToggle.astro_astro_type_script_index_0_lang.CB-gjd7v.js","astro:scripts/page.js":"_astro/page.DTIbhfSr.js","C:/Users/Administrator/Documents/code/blog-astro/blog-astro/node_modules/.pnpm/@pagefind+default-ui@1.2.0/node_modules/@pagefind/default-ui/npm_dist/mjs/ui-core.mjs":"_astro/ui-core.Cz22mMHB.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/pages/tags/index.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"tag-search\"),o=document.getElementById(\"tags-list\"),i=document.getElementById(\"no-results\"),d=document.querySelectorAll(\".tag-item\");function c(t){const e=t.toLowerCase().trim();let n=0;d.forEach(l=>{const a=(l.getAttribute(\"data-tag\")||\"\").includes(e)||e===\"\";l.style.display=a?\"block\":\"none\",a&&n++}),n===0&&e!==\"\"?(o.style.display=\"none\",i.style.display=\"block\"):(o.style.display=\"flex\",i.style.display=\"none\")}s?.addEventListener(\"input\",t=>{const e=t.target;c(e.value)});s?.addEventListener(\"keydown\",t=>{t.key===\"Escape\"&&(s.value=\"\",c(\"\"),s.blur())});"],["C:/Users/Administrator/Documents/code/blog-astro/blog-astro/src/layouts/BlogPost.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"to-top-btn\"),n=document.getElementById(\"blog-hero\");function c(t){t.forEach(o=>{e.dataset.show=(!o.isIntersecting).toString()})}e.addEventListener(\"click\",()=>{document.documentElement.scrollTo({behavior:\"smooth\",top:0})});const r=new IntersectionObserver(c);r.observe(n);"]],"assets":["/_astro/ec.szm7m.css","/_astro/ec.8zarh.js","/_astro/roboto-mono-700.CAZppuP3.ttf","/_astro/roboto-mono-regular.Ceay284C.ttf","/_astro/_slug_.Bi0LIISz.css","/icon.svg","/social-card.avif","/icons/bilibili.svg","/icons/linux.do.svg","/icons/nodeseek.svg","/_astro/domElement.CpM5XNjJ.js","/_astro/HeaderWithPersonal.astro_astro_type_script_index_0_lang.DuSsDY4R.js","/_astro/page.DTIbhfSr.js","/_astro/Search.astro_astro_type_script_index_0_lang.DnOuxdM7.js","/_astro/ThemeToggle.astro_astro_type_script_index_0_lang.CB-gjd7v.js","/_astro/ui-core.Cz22mMHB.js","/_astro/page.DTIbhfSr.js","/404.html","/about/index.html","/recommendations/index.html","/tags/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"cS9jMDC6EhZ1KjIsmUD0bgryhzafrP/P2i9dcPEZ9Nc=","envGetSecretEnabled":true});

export { manifest };
