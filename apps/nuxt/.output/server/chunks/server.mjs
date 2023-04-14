import { version, computed, shallowReactive, defineComponent, h, getCurrentInstance, inject as inject$1, onUnmounted, ref, watchEffect, watch, resolveComponent, Fragment, createApp, reactive, unref, useSSRContext, provide, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, toRef, isReadonly, shallowReadonly, markRaw, Text, defineAsyncComponent, effectScope, isRef, openBlock, createBlock, mergeProps, withCtx, renderSlot, createElementBlock, createTextVNode, toDisplayString, createCommentVNode, shallowRef, Transition, withDirectives, createElementVNode, normalizeClass, normalizeStyle, vShow, withModifiers, withKeys, toRefs, normalizeProps, guardReactiveProps, Teleport, nextTick, render } from 'vue';
import { $fetch } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { renderSSRHead } from '@unhead/ssr';
import { composableNames, getActiveHead, createServerHead as createServerHead$1 } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { hasProtocol, parseURL, parseQuery, withTrailingSlash as withTrailingSlash$1, withoutTrailingSlash as withoutTrailingSlash$1, joinURL, isEqual, stringifyParsedURL, stringifyQuery } from 'ufo';
import { a as useRuntimeConfig$1, c as createError$1, d as sendRedirect } from './node-server.mjs';
import { ColorTranslator } from 'colortranslator';
import { useRouter as useRouter$1, useRoute as useRoute$1 } from 'vue-router';
import { CoreWarnCodes, CompileErrorCodes, registerMessageResolver, resolveValue, registerLocaleFallbacker, fallbackWithLocaleChain, setDevToolsHook, createCompileError, DEFAULT_LOCALE as DEFAULT_LOCALE$1, updateFallbackLocale, NUMBER_FORMAT_OPTIONS_KEYS, DATETIME_FORMAT_OPTIONS_KEYS, setFallbackContext, createCoreContext, clearDateTimeFormat, clearNumberFormat, setAdditionalMeta, getFallbackContext, NOT_REOSLVED, parseTranslateArgs, translate, MISSING_RESOLVE_VALUE, parseDateTimeArgs, datetime, parseNumberArgs, number } from '@intlify/core-base';
import { parse, serialize } from 'cookie-es';
import isHTTPS from 'is-https';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'unstorage/drivers/fs';
import 'node:fs';
import 'node:url';
import 'pathe';
import '@intlify/bundle-utils';

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.4.1";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    async function contextCaller(hooks, args) {
      for (const hook of hooks) {
        await nuxtAppCtx.call(nuxtApp, () => hook(...args));
      }
    }
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter$1(nuxtApp, $name, value);
    defineGetter$1(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter$1(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter$1(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext._payloadReducers = {};
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      return target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = [];
  for (const plugin of _plugins2) {
    if (typeof plugin !== "function") {
      continue;
    }
    let _plugin = plugin;
    if (plugin.length > 1) {
      _plugin = (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    plugins2.push(_plugin);
  }
  plugins2.sort((a, b) => {
    var _a, _b;
    return (((_a = a.meta) == null ? void 0 : _a.order) || orderMap.default) - (((_b = b.meta) == null ? void 0 : _b.order) || orderMap.default);
  });
  return plugins2;
}
const orderMap = {
  pre: -20,
  default: 0,
  post: 20
};
function defineNuxtPlugin(plugin, meta) {
  var _a;
  if (typeof plugin === "function") {
    return /* @__PURE__ */ defineNuxtPlugin({ setup: plugin }, meta);
  }
  const wrapper = (nuxtApp) => {
    if (plugin.hooks) {
      nuxtApp.hooks.addHooks(plugin.hooks);
    }
    if (plugin.setup) {
      return plugin.setup(nuxtApp);
    }
  };
  wrapper.meta = {
    name: (meta == null ? void 0 : meta.name) || plugin.name || ((_a = plugin.setup) == null ? void 0 : _a.name),
    order: (meta == null ? void 0 : meta.order) || plugin.order || orderMap[plugin.enforce || "default"] || orderMap.default
  };
  wrapper[NuxtPluginIndicator] = true;
  return wrapper;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter$1(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const isVue2 = false;
const isVue3 = true;
/*!
  * pinia v2.0.34
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app2) {
      {
        pinia._a = app2;
        app2.provide(piniaSymbol, pinia);
        app2.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      }
    },
    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
function resolveUnref$1(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput$1(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref$1(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput$1(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput$1(v, k)];
      })
    );
  }
  return root;
}
const Vue3 = version.startsWith("3");
const headSymbol$1 = "usehead";
function injectHead$1() {
  return getCurrentInstance() && inject$1(headSymbol$1) || getActiveHead();
}
function vueInstall(head) {
  const plugin = {
    install(app2) {
      if (Vue3) {
        app2.config.globalProperties.$unhead = head;
        app2.config.globalProperties.$head = head;
        app2.provide(headSymbol$1, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1({
    ...options,
    plugins: [
      VueReactiveUseHeadPlugin(),
      ...(options == null ? void 0 : options.plugins) || []
    ]
  });
  head.install = vueInstall(head);
  return head;
}
const VueReactiveUseHeadPlugin = () => {
  return defineHeadPlugin({
    hooks: {
      "entries:resolve": function(ctx) {
        for (const entry2 of ctx.entries)
          entry2.resolvedInput = resolveUnrefHeadInput$1(entry2.input);
      }
    }
  });
};
function clientUseHead$1(input, options = {}) {
  const head = injectHead$1();
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput$1(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
function serverUseHead$1(input, options = {}) {
  const head = injectHead$1();
  return head.push(input, options);
}
function useHead$1(input, options = {}) {
  var _a;
  const head = injectHead$1();
  if (head) {
    const isBrowser = !!((_a = head.resolvedOptions) == null ? void 0 : _a.document);
    if (options.mode === "server" && isBrowser || options.mode === "client" && !isBrowser)
      return;
    return isBrowser ? clientUseHead$1(input, options) : serverUseHead$1(input, options);
  }
}
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject$1("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = useNuxtApp();
  const global2 = options.global || typeof name !== "string";
  const mw = typeof name !== "string" ? name : middleware;
  if (!mw) {
    console.warn("[nuxt] No route middleware passed to `addRouteMiddleware`.", name);
    return;
  }
  if (global2) {
    nuxtApp._middleware.global.push(mw);
  } else {
    nuxtApp._middleware.named[name] = mw;
  }
};
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, fullPath);
      const redirect = () => nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302)).then(() => inMiddleware ? (
        /* abort route navigation */
        false
      ) : void 0);
      if (!isExternal && inMiddleware) {
        router.beforeEach((final) => final.fullPath === fullPath ? redirect() : void 0);
        return to;
      }
      return redirect();
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function useRequestHeaders(include) {
  var _a;
  const headers = ((_a = useNuxtApp().ssrContext) == null ? void 0 : _a.event.node.req.headers) ?? {};
  if (!include) {
    return headers;
  }
  return Object.fromEntries(include.map((key) => key.toLowerCase()).filter((key) => headers[key]).map((key) => [key, headers[key]]));
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [{ "rel": "stylesheet", "href": "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap" }, { "rel": "stylesheet", "href": "https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" }], "style": [], "script": [], "noscript": [] };
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  const resolveTrailingSlashBehavior = (to, resolve2) => {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    const normalizeTrailingSlash = options.trailingSlash === "append" ? withTrailingSlash$1 : withoutTrailingSlash$1;
    if (typeof to === "string") {
      return normalizeTrailingSlash(to, true);
    }
    const path = "path" in to ? to.path : resolve2(to).path;
    return {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: normalizeTrailingSlash(path, true)
    };
  };
  return /* @__PURE__ */ defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, { acceptRelative: true });
      });
      const prefetched = ref(false);
      const el = void 0;
      const elRef = void 0;
      return () => {
        var _a, _b;
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate2 = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate: navigate2,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                // stub properties for compat with vue-router
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_b = slots.default) == null ? void 0 : _b.call(slots));
      };
    }
  });
}
const __nuxt_component_0 = /* @__PURE__ */ defineNuxtLink({ componentName: "NuxtLink" });
const plugin_vue3_okOeP2pQIt = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const components = {};
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const name in components) {
      nuxtApp.vueApp.component(name, components[name]);
      nuxtApp.vueApp.component("Lazy" + name, components[name]);
    }
  }
});
const unhead_zW6dvCvlhl = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  setup(nuxtApp) {
    const createHead = createServerHead;
    const head = createHead();
    head.push(appHead);
    nuxtApp.vueApp.use(head);
    {
      nuxtApp.ssrContext.renderMeta = async () => {
        const meta = await renderSSRHead(head);
        return {
          ...meta,
          bodyScriptsPrepend: meta.bodyTagsOpen,
          // resolves naming difference with NuxtMeta and Unhead
          bodyScripts: meta.bodyTags
        };
      };
    }
  }
});
const globalMiddleware = [];
function getRouteFromPath(fullPath) {
  if (typeof fullPath === "object") {
    fullPath = stringifyParsedURL({
      pathname: fullPath.path || "",
      search: stringifyQuery(fullPath.query || {}),
      hash: fullPath.hash || ""
    });
  }
  const url = parseURL(fullPath.toString());
  return {
    path: url.pathname,
    fullPath,
    query: parseQuery(url.search),
    hash: url.hash,
    // stub properties for compat with vue-router
    params: {},
    name: void 0,
    matched: [],
    redirectedFrom: void 0,
    meta: {},
    href: fullPath
  };
}
const router_V9gGtkNrTG = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  setup(nuxtApp) {
    const initialURL = nuxtApp.ssrContext.url;
    const routes = [];
    const hooks = {
      "navigate:before": [],
      "resolve:before": [],
      "navigate:after": [],
      error: []
    };
    const registerHook = (hook, guard) => {
      hooks[hook].push(guard);
      return () => hooks[hook].splice(hooks[hook].indexOf(guard), 1);
    };
    useRuntimeConfig().app.baseURL;
    const route = reactive(getRouteFromPath(initialURL));
    async function handleNavigation(url, replace) {
      try {
        const to = getRouteFromPath(url);
        for (const middleware of hooks["navigate:before"]) {
          const result = await middleware(to, route);
          if (result === false || result instanceof Error) {
            return;
          }
          if (result) {
            return handleNavigation(result, true);
          }
        }
        for (const handler of hooks["resolve:before"]) {
          await handler(to, route);
        }
        Object.assign(route, to);
        if (false)
          ;
        for (const middleware of hooks["navigate:after"]) {
          await middleware(to, route);
        }
      } catch (err) {
        for (const handler of hooks.error) {
          await handler(err);
        }
      }
    }
    const router = {
      currentRoute: route,
      isReady: () => Promise.resolve(),
      // These options provide a similar API to vue-router but have no effect
      options: {},
      install: () => Promise.resolve(),
      // Navigation
      push: (url) => handleNavigation(url),
      replace: (url) => handleNavigation(url),
      back: () => window.history.go(-1),
      go: (delta) => window.history.go(delta),
      forward: () => window.history.go(1),
      // Guards
      beforeResolve: (guard) => registerHook("resolve:before", guard),
      beforeEach: (guard) => registerHook("navigate:before", guard),
      afterEach: (guard) => registerHook("navigate:after", guard),
      onError: (handler) => registerHook("error", handler),
      // Routes
      resolve: getRouteFromPath,
      addRoute: (parentName, route2) => {
        routes.push(route2);
      },
      getRoutes: () => routes,
      hasRoute: (name) => routes.some((route2) => route2.name === name),
      removeRoute: (name) => {
        const index = routes.findIndex((route2) => route2.name === name);
        if (index !== -1) {
          routes.splice(index, 1);
        }
      }
    };
    nuxtApp.vueApp.component("RouterLink", {
      functional: true,
      props: {
        to: String,
        custom: Boolean,
        replace: Boolean,
        // Not implemented
        activeClass: String,
        exactActiveClass: String,
        ariaCurrentValue: String
      },
      setup: (props, { slots }) => {
        const navigate2 = () => handleNavigation(props.to, props.replace);
        return () => {
          var _a;
          const route2 = router.resolve(props.to);
          return props.custom ? (_a = slots.default) == null ? void 0 : _a.call(slots, { href: props.to, navigate: navigate2, route: route2 }) : h("a", { href: props.to, onClick: (e) => {
            e.preventDefault();
            return navigate2();
          } }, slots);
        };
      }
    });
    nuxtApp._route = route;
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    const initialLayout = useState("_layout");
    nuxtApp.hooks.hookOnce("app:created", async () => {
      router.beforeEach(async (to, from) => {
        to.meta = reactive(to.meta || {});
        if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
          to.meta.layout = initialLayout.value;
        }
        nuxtApp._processingMiddleware = true;
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const middleware of middlewareEntries) {
          const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
          {
            if (result === false || result instanceof Error) {
              const error = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              delete nuxtApp._processingMiddleware;
              return callWithNuxt(nuxtApp, showError, [error]);
            }
          }
          if (result || result === false) {
            return result;
          }
        }
      });
      router.afterEach(() => {
        delete nuxtApp._processingMiddleware;
      });
      await router.replace(initialURL);
      if (!isEqual(route.fullPath, initialURL)) {
        const event = await callWithNuxt(nuxtApp, useRequestEvent);
        const options = { redirectCode: event.node.res.statusCode !== 200 ? event.node.res.statusCode || 302 : 302 };
        await callWithNuxt(nuxtApp, navigateTo, [route.fullPath, options]);
      }
    });
    return {
      provide: {
        route,
        router
      }
    };
  }
});
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
version.startsWith("3");
const headSymbol = "usehead";
function injectHead() {
  return getCurrentInstance() && inject$1(headSymbol) || getActiveHead();
}
function clientUseHead(input, options = {}) {
  const head = injectHead();
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
function serverUseHead(input, options = {}) {
  const head = injectHead();
  return head.push(input, options);
}
function useHead(input, options = {}) {
  var _a;
  const head = injectHead();
  if (head) {
    const isBrowser = !!((_a = head.resolvedOptions) == null ? void 0 : _a.document);
    if (options.mode === "server" && isBrowser || options.mode === "client" && !isBrowser)
      return;
    return isBrowser ? clientUseHead(input, options) : serverUseHead(input, options);
  }
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
const presets = {
  light: {
    // Accent
    primary: "#154EC1",
    secondary: "#767C88",
    success: "#3D9209",
    info: "#158DE3",
    danger: "#E42222",
    warning: "#FFD43A",
    // Background Colors
    backgroundPrimary: "#f6f6f6",
    backgroundSecondary: "#FFFFFF",
    backgroundElement: "#ECF0F1",
    backgroundBorder: "#DEE5F2",
    // Text Colors
    textPrimary: "#262824",
    textInverted: "#FFFFFF",
    // Misc
    shadow: "rgba(0, 0, 0, 0.12)",
    focus: "#49A8FF"
  },
  dark: {
    // Accent
    primary: "#3472F0",
    secondary: "#767C88",
    success: "#66BE33",
    info: "#3EAAF8",
    danger: "#F34030",
    warning: "#FFD952",
    // Background Colors
    backgroundPrimary: "#050A10",
    backgroundSecondary: "#1F262F",
    backgroundElement: "#131A22",
    backgroundBorder: "#3D4C58",
    // Text Colors
    textPrimary: "#F1F1F1",
    textInverted: "#0B121A",
    // Misc
    shadow: "rgba(255, 255, 255, 0.12)",
    focus: "#49A8FF"
  }
};
const vaBreakpointSymbol = Symbol("vaBreakpoint");
const defaultThresholds = {
  xs: 0,
  sm: 640,
  md: 1024,
  lg: 1440,
  xl: 1920
};
const getBreakpointDefaultConfig = () => ({
  enabled: true,
  bodyClass: true,
  thresholds: defaultThresholds
});
var commonjsGlobal$1 = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear$1;
function eq$4(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq$4;
var eq$3 = eq_1;
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$3(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf$4;
var assocIndexOf$3 = _assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete$1(key) {
  var data = this.__data__, index = assocIndexOf$3(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete$1;
var assocIndexOf$2 = _assocIndexOf;
function listCacheGet$1(key) {
  var data = this.__data__, index = assocIndexOf$2(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var _listCacheGet = listCacheGet$1;
var assocIndexOf$1 = _assocIndexOf;
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas$1;
var assocIndexOf = _assocIndexOf;
function listCacheSet$1(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet$1;
var listCacheClear = _listCacheClear, listCacheDelete = _listCacheDelete, listCacheGet = _listCacheGet, listCacheHas = _listCacheHas, listCacheSet = _listCacheSet;
function ListCache$4(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry2 = entries[index];
    this.set(entry2[0], entry2[1]);
  }
}
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype["delete"] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;
var _ListCache = ListCache$4;
var ListCache$3 = _ListCache;
function stackClear$1() {
  this.__data__ = new ListCache$3();
  this.size = 0;
}
var _stackClear = stackClear$1;
function stackDelete$1(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete$1;
function stackGet$1(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet$1;
function stackHas$1(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas$1;
var freeGlobal$1 = typeof commonjsGlobal$1 == "object" && commonjsGlobal$1 && commonjsGlobal$1.Object === Object && commonjsGlobal$1;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$9 = freeGlobal || freeSelf || Function("return this")();
var _root = root$9;
var root$8 = _root;
var Symbol$6 = root$8.Symbol;
var _Symbol = Symbol$6;
var Symbol$5 = _Symbol;
var objectProto$d = Object.prototype;
var hasOwnProperty$a = objectProto$d.hasOwnProperty;
var nativeObjectToString$1 = objectProto$d.toString;
var symToStringTag$1 = Symbol$5 ? Symbol$5.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$a.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var _getRawTag = getRawTag$1;
var objectProto$c = Object.prototype;
var nativeObjectToString = objectProto$c.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$1;
var Symbol$4 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$4 ? Symbol$4.toStringTag : void 0;
function baseGetTag$9(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var _baseGetTag = baseGetTag$9;
function isObject$c(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject$c;
var baseGetTag$8 = _baseGetTag, isObject$b = isObject_1;
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$3(value) {
  if (!isObject$b(value)) {
    return false;
  }
  var tag = baseGetTag$8(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction$3;
var root$7 = _root;
var coreJsData$1 = root$7["__core-js_shared__"];
var _coreJsData = coreJsData$1;
var coreJsData = _coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked$1(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked$1;
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var _toSource = toSource$2;
var isFunction$2 = isFunction_1, isMasked = _isMasked, isObject$a = isObject_1, toSource$1 = _toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$b = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$9).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative$1(value) {
  if (!isObject$a(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$2(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}
var _baseIsNative = baseIsNative$1;
function getValue$1(object, key) {
  return object == null ? void 0 : object[key];
}
var _getValue = getValue$1;
var baseIsNative = _baseIsNative, getValue = _getValue;
function getNative$7(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var _getNative = getNative$7;
var getNative$6 = _getNative, root$6 = _root;
var Map$3 = getNative$6(root$6, "Map");
var _Map = Map$3;
var getNative$5 = _getNative;
var nativeCreate$4 = getNative$5(Object, "create");
var _nativeCreate = nativeCreate$4;
var nativeCreate$3 = _nativeCreate;
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}
var _hashClear = hashClear$1;
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete$1;
var nativeCreate$2 = _nativeCreate;
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$a = Object.prototype;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$8.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet$1;
var nativeCreate$1 = _nativeCreate;
var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$7.call(data, key);
}
var _hashHas = hashHas$1;
var nativeCreate = _nativeCreate;
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
var _hashSet = hashSet$1;
var hashClear = _hashClear, hashDelete = _hashDelete, hashGet = _hashGet, hashHas = _hashHas, hashSet = _hashSet;
function Hash$1(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry2 = entries[index];
    this.set(entry2[0], entry2[1]);
  }
}
Hash$1.prototype.clear = hashClear;
Hash$1.prototype["delete"] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;
var _Hash = Hash$1;
var Hash = _Hash, ListCache$2 = _ListCache, Map$2 = _Map;
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$2 || ListCache$2)(),
    "string": new Hash()
  };
}
var _mapCacheClear = mapCacheClear$1;
function isKeyable$1(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable$1;
var isKeyable = _isKeyable;
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData$4;
var getMapData$3 = _getMapData;
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete$1;
var getMapData$2 = _getMapData;
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}
var _mapCacheGet = mapCacheGet$1;
var getMapData$1 = _getMapData;
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}
var _mapCacheHas = mapCacheHas$1;
var getMapData = _getMapData;
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet$1;
var mapCacheClear = _mapCacheClear, mapCacheDelete = _mapCacheDelete, mapCacheGet = _mapCacheGet, mapCacheHas = _mapCacheHas, mapCacheSet = _mapCacheSet;
function MapCache$2(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry2 = entries[index];
    this.set(entry2[0], entry2[1]);
  }
}
MapCache$2.prototype.clear = mapCacheClear;
MapCache$2.prototype["delete"] = mapCacheDelete;
MapCache$2.prototype.get = mapCacheGet;
MapCache$2.prototype.has = mapCacheHas;
MapCache$2.prototype.set = mapCacheSet;
var _MapCache = MapCache$2;
var ListCache$1 = _ListCache, Map$1 = _Map, MapCache$1 = _MapCache;
var LARGE_ARRAY_SIZE = 200;
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$1(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet$1;
var ListCache = _ListCache, stackClear = _stackClear, stackDelete = _stackDelete, stackGet = _stackGet, stackHas = _stackHas, stackSet = _stackSet;
function Stack$2(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack$2.prototype.clear = stackClear;
Stack$2.prototype["delete"] = stackDelete;
Stack$2.prototype.get = stackGet;
Stack$2.prototype.has = stackHas;
Stack$2.prototype.set = stackSet;
var _Stack = Stack$2;
function arrayEach$1(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var _arrayEach = arrayEach$1;
var getNative$4 = _getNative;
var defineProperty$2 = function() {
  try {
    var func = getNative$4(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var _defineProperty = defineProperty$2;
var defineProperty$1 = _defineProperty;
function baseAssignValue$3(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var _baseAssignValue = baseAssignValue$3;
var baseAssignValue$2 = _baseAssignValue, eq$2 = eq_1;
var objectProto$8 = Object.prototype;
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
function assignValue$3(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$6.call(object, key) && eq$2(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue$2(object, key, value);
  }
}
var _assignValue = assignValue$3;
var assignValue$2 = _assignValue, baseAssignValue$1 = _baseAssignValue;
function copyObject$6(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue$1(object, key, newValue);
    } else {
      assignValue$2(object, key, newValue);
    }
  }
  return object;
}
var _copyObject = copyObject$6;
function baseTimes$1(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var _baseTimes = baseTimes$1;
function isObjectLike$b(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$b;
var baseGetTag$7 = _baseGetTag, isObjectLike$a = isObjectLike_1;
var argsTag$2 = "[object Arguments]";
function baseIsArguments$1(value) {
  return isObjectLike$a(value) && baseGetTag$7(value) == argsTag$2;
}
var _baseIsArguments = baseIsArguments$1;
var baseIsArguments = _baseIsArguments, isObjectLike$9 = isObjectLike_1;
var objectProto$7 = Object.prototype;
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;
var isArguments$4 = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike$9(value) && hasOwnProperty$5.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArguments_1 = isArguments$4;
var isArray$a = Array.isArray;
var isArray_1 = isArray$a;
var isBufferExports = {};
var isBuffer$3 = {
  get exports() {
    return isBufferExports;
  },
  set exports(v) {
    isBufferExports = v;
  }
};
function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
(function(module, exports) {
  var root2 = _root, stubFalse2 = stubFalse_1;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? root2.Buffer : void 0;
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
  var isBuffer2 = nativeIsBuffer || stubFalse2;
  module.exports = isBuffer2;
})(isBuffer$3, isBufferExports);
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex$4(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var _isIndex = isIndex$4;
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength$3(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var isLength_1 = isLength$3;
var baseGetTag$6 = _baseGetTag, isLength$2 = isLength_1, isObjectLike$8 = isObjectLike_1;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$3 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray$1(value) {
  return isObjectLike$8(value) && isLength$2(value.length) && !!typedArrayTags[baseGetTag$6(value)];
}
var _baseIsTypedArray = baseIsTypedArray$1;
function baseUnary$4(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary$4;
var _nodeUtilExports = {};
var _nodeUtil = {
  get exports() {
    return _nodeUtilExports;
  },
  set exports(v) {
    _nodeUtilExports = v;
  }
};
(function(module, exports) {
  var freeGlobal2 = _freeGlobal;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal2.process;
  var nodeUtil2 = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  module.exports = nodeUtil2;
})(_nodeUtil, _nodeUtilExports);
var baseIsTypedArray = _baseIsTypedArray, baseUnary$3 = _baseUnary, nodeUtil$3 = _nodeUtilExports;
var nodeIsTypedArray = nodeUtil$3 && nodeUtil$3.isTypedArray;
var isTypedArray$2 = nodeIsTypedArray ? baseUnary$3(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray_1 = isTypedArray$2;
var baseTimes = _baseTimes, isArguments$3 = isArguments_1, isArray$9 = isArray_1, isBuffer$2 = isBufferExports, isIndex$3 = _isIndex, isTypedArray$1 = isTypedArray_1;
var objectProto$6 = Object.prototype;
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
function arrayLikeKeys$2(value, inherited) {
  var isArr = isArray$9(value), isArg = !isArr && isArguments$3(value), isBuff = !isArr && !isArg && isBuffer$2(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$4.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex$3(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys$2;
var objectProto$5 = Object.prototype;
function isPrototype$3(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$5;
  return value === proto;
}
var _isPrototype = isPrototype$3;
function overArg$2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg$2;
var overArg$1 = _overArg;
var nativeKeys$1 = overArg$1(Object.keys, Object);
var _nativeKeys = nativeKeys$1;
var isPrototype$2 = _isPrototype, nativeKeys = _nativeKeys;
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function baseKeys$1(object) {
  if (!isPrototype$2(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$3.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys$1;
var isFunction$1 = isFunction_1, isLength$1 = isLength_1;
function isArrayLike$4(value) {
  return value != null && isLength$1(value.length) && !isFunction$1(value);
}
var isArrayLike_1 = isArrayLike$4;
var arrayLikeKeys$1 = _arrayLikeKeys, baseKeys = _baseKeys, isArrayLike$3 = isArrayLike_1;
function keys$3(object) {
  return isArrayLike$3(object) ? arrayLikeKeys$1(object) : baseKeys(object);
}
var keys_1 = keys$3;
var copyObject$5 = _copyObject, keys$2 = keys_1;
function baseAssign$1(object, source) {
  return object && copyObject$5(source, keys$2(source), object);
}
var _baseAssign = baseAssign$1;
function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var _nativeKeysIn = nativeKeysIn$1;
var isObject$9 = isObject_1, isPrototype$1 = _isPrototype, nativeKeysIn = _nativeKeysIn;
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function baseKeysIn$1(object) {
  if (!isObject$9(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype$1(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$2.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var _baseKeysIn = baseKeysIn$1;
var arrayLikeKeys = _arrayLikeKeys, baseKeysIn = _baseKeysIn, isArrayLike$2 = isArrayLike_1;
function keysIn$5(object) {
  return isArrayLike$2(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var keysIn_1 = keysIn$5;
var copyObject$4 = _copyObject, keysIn$4 = keysIn_1;
function baseAssignIn$1(object, source) {
  return object && copyObject$4(source, keysIn$4(source), object);
}
var _baseAssignIn = baseAssignIn$1;
var _cloneBufferExports = {};
var _cloneBuffer = {
  get exports() {
    return _cloneBufferExports;
  },
  set exports(v) {
    _cloneBufferExports = v;
  }
};
(function(module, exports) {
  var root2 = _root;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? root2.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
  function cloneBuffer2(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  module.exports = cloneBuffer2;
})(_cloneBuffer, _cloneBufferExports);
function copyArray$2(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var _copyArray = copyArray$2;
function arrayFilter$1(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var _arrayFilter = arrayFilter$1;
function stubArray$2() {
  return [];
}
var stubArray_1 = stubArray$2;
var arrayFilter = _arrayFilter, stubArray$1 = stubArray_1;
var objectProto$2 = Object.prototype;
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var _getSymbols = getSymbols$3;
var copyObject$3 = _copyObject, getSymbols$2 = _getSymbols;
function copySymbols$1(source, object) {
  return copyObject$3(source, getSymbols$2(source), object);
}
var _copySymbols = copySymbols$1;
function arrayPush$3(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var _arrayPush = arrayPush$3;
var overArg = _overArg;
var getPrototype$3 = overArg(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype$3;
var arrayPush$2 = _arrayPush, getPrototype$2 = _getPrototype, getSymbols$1 = _getSymbols, stubArray = stubArray_1;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush$2(result, getSymbols$1(object));
    object = getPrototype$2(object);
  }
  return result;
};
var _getSymbolsIn = getSymbolsIn$2;
var copyObject$2 = _copyObject, getSymbolsIn$1 = _getSymbolsIn;
function copySymbolsIn$1(source, object) {
  return copyObject$2(source, getSymbolsIn$1(source), object);
}
var _copySymbolsIn = copySymbolsIn$1;
var arrayPush$1 = _arrayPush, isArray$8 = isArray_1;
function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$8(object) ? result : arrayPush$1(result, symbolsFunc(object));
}
var _baseGetAllKeys = baseGetAllKeys$2;
var baseGetAllKeys$1 = _baseGetAllKeys, getSymbols = _getSymbols, keys$1 = keys_1;
function getAllKeys$1(object) {
  return baseGetAllKeys$1(object, keys$1, getSymbols);
}
var _getAllKeys = getAllKeys$1;
var baseGetAllKeys = _baseGetAllKeys, getSymbolsIn = _getSymbolsIn, keysIn$3 = keysIn_1;
function getAllKeysIn$2(object) {
  return baseGetAllKeys(object, keysIn$3, getSymbolsIn);
}
var _getAllKeysIn = getAllKeysIn$2;
var getNative$3 = _getNative, root$5 = _root;
var DataView$1 = getNative$3(root$5, "DataView");
var _DataView = DataView$1;
var getNative$2 = _getNative, root$4 = _root;
var Promise$2 = getNative$2(root$4, "Promise");
var _Promise = Promise$2;
var getNative$1 = _getNative, root$3 = _root;
var Set$1 = getNative$1(root$3, "Set");
var _Set = Set$1;
var getNative = _getNative, root$2 = _root;
var WeakMap$1 = getNative(root$2, "WeakMap");
var _WeakMap = WeakMap$1;
var DataView = _DataView, Map$4 = _Map, Promise$1 = _Promise, Set$2 = _Set, WeakMap = _WeakMap, baseGetTag$5 = _baseGetTag, toSource = _toSource;
var mapTag$3 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$4), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap);
var getTag$3 = baseGetTag$5;
if (DataView && getTag$3(new DataView(new ArrayBuffer(1))) != dataViewTag$2 || Map$4 && getTag$3(new Map$4()) != mapTag$3 || Promise$1 && getTag$3(Promise$1.resolve()) != promiseTag || Set$2 && getTag$3(new Set$2()) != setTag$3 || WeakMap && getTag$3(new WeakMap()) != weakMapTag$1) {
  getTag$3 = function(value) {
    var result = baseGetTag$5(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var _getTag = getTag$3;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function initCloneArray$1(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty$1.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var _initCloneArray = initCloneArray$1;
var root$1 = _root;
var Uint8Array$1 = root$1.Uint8Array;
var _Uint8Array = Uint8Array$1;
var Uint8Array = _Uint8Array;
function cloneArrayBuffer$3(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}
var _cloneArrayBuffer = cloneArrayBuffer$3;
var cloneArrayBuffer$2 = _cloneArrayBuffer;
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var _cloneDataView = cloneDataView$1;
var reFlags = /\w*$/;
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var _cloneRegExp = cloneRegExp$1;
var Symbol$3 = _Symbol;
var symbolProto$1 = Symbol$3 ? Symbol$3.prototype : void 0, symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function cloneSymbol$1(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var _cloneSymbol = cloneSymbol$1;
var cloneArrayBuffer$1 = _cloneArrayBuffer;
function cloneTypedArray$2(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$1(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray = cloneTypedArray$2;
var cloneArrayBuffer = _cloneArrayBuffer, cloneDataView = _cloneDataView, cloneRegExp = _cloneRegExp, cloneSymbol = _cloneSymbol, cloneTypedArray$1 = _cloneTypedArray;
var boolTag$1 = "[object Boolean]", dateTag$2 = "[object Date]", mapTag$2 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag$1(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$2:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray$1(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$2:
    case stringTag$2:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$2:
      return cloneSymbol(object);
  }
}
var _initCloneByTag = initCloneByTag$1;
var isObject$8 = isObject_1;
var objectCreate = Object.create;
var baseCreate$1 = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$8(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var _baseCreate = baseCreate$1;
var baseCreate = _baseCreate, getPrototype$1 = _getPrototype, isPrototype = _isPrototype;
function initCloneObject$2(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype$1(object)) : {};
}
var _initCloneObject = initCloneObject$2;
var getTag$2 = _getTag, isObjectLike$7 = isObjectLike_1;
var mapTag$1 = "[object Map]";
function baseIsMap$1(value) {
  return isObjectLike$7(value) && getTag$2(value) == mapTag$1;
}
var _baseIsMap = baseIsMap$1;
var baseIsMap = _baseIsMap, baseUnary$2 = _baseUnary, nodeUtil$2 = _nodeUtilExports;
var nodeIsMap = nodeUtil$2 && nodeUtil$2.isMap;
var isMap$1 = nodeIsMap ? baseUnary$2(nodeIsMap) : baseIsMap;
var isMap_1 = isMap$1;
var getTag$1 = _getTag, isObjectLike$6 = isObjectLike_1;
var setTag$1 = "[object Set]";
function baseIsSet$1(value) {
  return isObjectLike$6(value) && getTag$1(value) == setTag$1;
}
var _baseIsSet = baseIsSet$1;
var baseIsSet = _baseIsSet, baseUnary$1 = _baseUnary, nodeUtil$1 = _nodeUtilExports;
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
var isSet$1 = nodeIsSet ? baseUnary$1(nodeIsSet) : baseIsSet;
var isSet_1 = isSet$1;
var Stack$1 = _Stack, arrayEach = _arrayEach, assignValue$1 = _assignValue, baseAssign = _baseAssign, baseAssignIn = _baseAssignIn, cloneBuffer$1 = _cloneBufferExports, copyArray$1 = _copyArray, copySymbols = _copySymbols, copySymbolsIn = _copySymbolsIn, getAllKeys = _getAllKeys, getAllKeysIn$1 = _getAllKeysIn, getTag = _getTag, initCloneArray = _initCloneArray, initCloneByTag = _initCloneByTag, initCloneObject$1 = _initCloneObject, isArray$7 = isArray_1, isBuffer$1 = isBufferExports, isMap = isMap_1, isObject$7 = isObject_1, isSet = isSet_1, keys = keys_1, keysIn$2 = keysIn_1;
var CLONE_DEEP_FLAG$2 = 1, CLONE_FLAT_FLAG$1 = 2, CLONE_SYMBOLS_FLAG$2 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag$1 = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag$1 = "[object Number]", objectTag$1 = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag$1] = cloneableTags[objectTag$1] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone$2(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$2, isFlat = bitmask & CLONE_FLAT_FLAG$1, isFull = bitmask & CLONE_SYMBOLS_FLAG$2;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject$7(value)) {
    return value;
  }
  var isArr = isArray$7(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray$1(value, result);
    }
  } else {
    var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer$1(value, isDeep);
    }
    if (tag == objectTag$1 || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject$1(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack$1());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone$2(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone$2(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn$1 : getAllKeys : isFlat ? keysIn$2 : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue$1(result, key2, baseClone$2(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var _baseClone = baseClone$2;
var baseClone$1 = _baseClone;
var CLONE_DEEP_FLAG$1 = 1, CLONE_SYMBOLS_FLAG$1 = 4;
function cloneDeep(value) {
  return baseClone$1(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1);
}
var cloneDeep_1 = cloneDeep;
function arrayReduce$1(array, iteratee, accumulator, initAccum) {
  var index = -1, length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}
var _arrayReduce = arrayReduce$1;
function basePropertyOf$1(object) {
  return function(key) {
    return object == null ? void 0 : object[key];
  };
}
var _basePropertyOf = basePropertyOf$1;
var basePropertyOf = _basePropertyOf;
var deburredLetters = {
  // Latin-1 Supplement block.
  "À": "A",
  "Á": "A",
  "Â": "A",
  "Ã": "A",
  "Ä": "A",
  "Å": "A",
  "à": "a",
  "á": "a",
  "â": "a",
  "ã": "a",
  "ä": "a",
  "å": "a",
  "Ç": "C",
  "ç": "c",
  "Ð": "D",
  "ð": "d",
  "È": "E",
  "É": "E",
  "Ê": "E",
  "Ë": "E",
  "è": "e",
  "é": "e",
  "ê": "e",
  "ë": "e",
  "Ì": "I",
  "Í": "I",
  "Î": "I",
  "Ï": "I",
  "ì": "i",
  "í": "i",
  "î": "i",
  "ï": "i",
  "Ñ": "N",
  "ñ": "n",
  "Ò": "O",
  "Ó": "O",
  "Ô": "O",
  "Õ": "O",
  "Ö": "O",
  "Ø": "O",
  "ò": "o",
  "ó": "o",
  "ô": "o",
  "õ": "o",
  "ö": "o",
  "ø": "o",
  "Ù": "U",
  "Ú": "U",
  "Û": "U",
  "Ü": "U",
  "ù": "u",
  "ú": "u",
  "û": "u",
  "ü": "u",
  "Ý": "Y",
  "ý": "y",
  "ÿ": "y",
  "Æ": "Ae",
  "æ": "ae",
  "Þ": "Th",
  "þ": "th",
  "ß": "ss",
  // Latin Extended-A block.
  "Ā": "A",
  "Ă": "A",
  "Ą": "A",
  "ā": "a",
  "ă": "a",
  "ą": "a",
  "Ć": "C",
  "Ĉ": "C",
  "Ċ": "C",
  "Č": "C",
  "ć": "c",
  "ĉ": "c",
  "ċ": "c",
  "č": "c",
  "Ď": "D",
  "Đ": "D",
  "ď": "d",
  "đ": "d",
  "Ē": "E",
  "Ĕ": "E",
  "Ė": "E",
  "Ę": "E",
  "Ě": "E",
  "ē": "e",
  "ĕ": "e",
  "ė": "e",
  "ę": "e",
  "ě": "e",
  "Ĝ": "G",
  "Ğ": "G",
  "Ġ": "G",
  "Ģ": "G",
  "ĝ": "g",
  "ğ": "g",
  "ġ": "g",
  "ģ": "g",
  "Ĥ": "H",
  "Ħ": "H",
  "ĥ": "h",
  "ħ": "h",
  "Ĩ": "I",
  "Ī": "I",
  "Ĭ": "I",
  "Į": "I",
  "İ": "I",
  "ĩ": "i",
  "ī": "i",
  "ĭ": "i",
  "į": "i",
  "ı": "i",
  "Ĵ": "J",
  "ĵ": "j",
  "Ķ": "K",
  "ķ": "k",
  "ĸ": "k",
  "Ĺ": "L",
  "Ļ": "L",
  "Ľ": "L",
  "Ŀ": "L",
  "Ł": "L",
  "ĺ": "l",
  "ļ": "l",
  "ľ": "l",
  "ŀ": "l",
  "ł": "l",
  "Ń": "N",
  "Ņ": "N",
  "Ň": "N",
  "Ŋ": "N",
  "ń": "n",
  "ņ": "n",
  "ň": "n",
  "ŋ": "n",
  "Ō": "O",
  "Ŏ": "O",
  "Ő": "O",
  "ō": "o",
  "ŏ": "o",
  "ő": "o",
  "Ŕ": "R",
  "Ŗ": "R",
  "Ř": "R",
  "ŕ": "r",
  "ŗ": "r",
  "ř": "r",
  "Ś": "S",
  "Ŝ": "S",
  "Ş": "S",
  "Š": "S",
  "ś": "s",
  "ŝ": "s",
  "ş": "s",
  "š": "s",
  "Ţ": "T",
  "Ť": "T",
  "Ŧ": "T",
  "ţ": "t",
  "ť": "t",
  "ŧ": "t",
  "Ũ": "U",
  "Ū": "U",
  "Ŭ": "U",
  "Ů": "U",
  "Ű": "U",
  "Ų": "U",
  "ũ": "u",
  "ū": "u",
  "ŭ": "u",
  "ů": "u",
  "ű": "u",
  "ų": "u",
  "Ŵ": "W",
  "ŵ": "w",
  "Ŷ": "Y",
  "ŷ": "y",
  "Ÿ": "Y",
  "Ź": "Z",
  "Ż": "Z",
  "Ž": "Z",
  "ź": "z",
  "ż": "z",
  "ž": "z",
  "Ĳ": "IJ",
  "ĳ": "ij",
  "Œ": "Oe",
  "œ": "oe",
  "ŉ": "'n",
  "ſ": "s"
};
var deburrLetter$1 = basePropertyOf(deburredLetters);
var _deburrLetter = deburrLetter$1;
function arrayMap$2(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var _arrayMap = arrayMap$2;
var baseGetTag$4 = _baseGetTag, isObjectLike$5 = isObjectLike_1;
var symbolTag = "[object Symbol]";
function isSymbol$4(value) {
  return typeof value == "symbol" || isObjectLike$5(value) && baseGetTag$4(value) == symbolTag;
}
var isSymbol_1 = isSymbol$4;
var Symbol$2 = _Symbol, arrayMap$1 = _arrayMap, isArray$6 = isArray_1, isSymbol$3 = isSymbol_1;
var INFINITY$1 = 1 / 0;
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString$1(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$6(value)) {
    return arrayMap$1(value, baseToString$1) + "";
  }
  if (isSymbol$3(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
var _baseToString = baseToString$1;
var baseToString = _baseToString;
function toString$6(value) {
  return value == null ? "" : baseToString(value);
}
var toString_1 = toString$6;
var deburrLetter = _deburrLetter, toString$5 = toString_1;
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange$3 = "\\u0300-\\u036f", reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$3 = "\\u20d0-\\u20ff", rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3;
var rsCombo$2 = "[" + rsComboRange$3 + "]";
var reComboMark = RegExp(rsCombo$2, "g");
function deburr$1(string) {
  string = toString$5(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
}
var deburr_1 = deburr$1;
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function asciiWords$1(string) {
  return string.match(reAsciiWord) || [];
}
var _asciiWords = asciiWords$1;
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function hasUnicodeWord$1(string) {
  return reHasUnicodeWord.test(string);
}
var _hasUnicodeWord = hasUnicodeWord$1;
var rsAstralRange$2 = "\\ud800-\\udfff", rsComboMarksRange$2 = "\\u0300-\\u036f", reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$2 = "\\u20d0-\\u20ff", rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange$2 = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos$1 = "['’]", rsBreak = "[" + rsBreakRange + "]", rsCombo$1 = "[" + rsComboRange$2 + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange$2 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz$1 = "\\ud83c[\\udffb-\\udfff]", rsModifier$1 = "(?:" + rsCombo$1 + "|" + rsFitz$1 + ")", rsNonAstral$1 = "[^" + rsAstralRange$2 + "]", rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ$2 = "\\u200d";
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos$1 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos$1 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod$1 = rsModifier$1 + "?", rsOptVar$1 = "[" + rsVarRange$2 + "]?", rsOptJoin$1 = "(?:" + rsZWJ$2 + "(?:" + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsOptVar$1 + reOptMod$1 + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1, rsEmoji = "(?:" + [rsDingbat, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsSeq$1;
var reUnicodeWord = RegExp([
  rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
  rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
  rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
  rsUpper + "+" + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join("|"), "g");
function unicodeWords$1(string) {
  return string.match(reUnicodeWord) || [];
}
var _unicodeWords = unicodeWords$1;
var asciiWords = _asciiWords, hasUnicodeWord = _hasUnicodeWord, toString$4 = toString_1, unicodeWords = _unicodeWords;
function words$1(string, pattern, guard) {
  string = toString$4(string);
  pattern = guard ? void 0 : pattern;
  if (pattern === void 0) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}
var words_1 = words$1;
var arrayReduce = _arrayReduce, deburr = deburr_1, words = words_1;
var rsApos = "['’]";
var reApos = RegExp(rsApos, "g");
function createCompounder$3(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
  };
}
var _createCompounder = createCompounder$3;
var createCompounder$2 = _createCompounder;
var kebabCase = createCompounder$2(function(result, word, index) {
  return result + (index ? "-" : "") + word.toLowerCase();
});
var kebabCase_1 = kebabCase;
function baseSlice$2(array, start, end) {
  var index = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
var _baseSlice = baseSlice$2;
var baseSlice$1 = _baseSlice;
function castSlice$1(array, start, end) {
  var length = array.length;
  end = end === void 0 ? length : end;
  return !start && end >= length ? array : baseSlice$1(array, start, end);
}
var _castSlice = castSlice$1;
var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1, rsVarRange$1 = "\\ufe0e\\ufe0f";
var rsZWJ$1 = "\\u200d";
var reHasUnicode = RegExp("[" + rsZWJ$1 + rsAstralRange$1 + rsComboRange$1 + rsVarRange$1 + "]");
function hasUnicode$2(string) {
  return reHasUnicode.test(string);
}
var _hasUnicode = hasUnicode$2;
function asciiToArray$1(string) {
  return string.split("");
}
var _asciiToArray = asciiToArray$1;
var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = "\\ufe0e\\ufe0f";
var rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ = "\\u200d";
var reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
function unicodeToArray$1(string) {
  return string.match(reUnicode) || [];
}
var _unicodeToArray = unicodeToArray$1;
var asciiToArray = _asciiToArray, hasUnicode$1 = _hasUnicode, unicodeToArray = _unicodeToArray;
function stringToArray$1(string) {
  return hasUnicode$1(string) ? unicodeToArray(string) : asciiToArray(string);
}
var _stringToArray = stringToArray$1;
var castSlice = _castSlice, hasUnicode = _hasUnicode, stringToArray = _stringToArray, toString$3 = toString_1;
function createCaseFirst$1(methodName) {
  return function(string) {
    string = toString$3(string);
    var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
    return chr[methodName]() + trailing;
  };
}
var _createCaseFirst = createCaseFirst$1;
var createCaseFirst = _createCaseFirst;
var upperFirst$2 = createCaseFirst("toUpperCase");
var upperFirst_1 = upperFirst$2;
var toString$2 = toString_1, upperFirst$1 = upperFirst_1;
function capitalize$1(string) {
  return upperFirst$1(toString$2(string).toLowerCase());
}
var capitalize_1 = capitalize$1;
var capitalize = capitalize_1, createCompounder$1 = _createCompounder;
var camelCase = createCompounder$1(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});
var camelCase_1 = camelCase;
const camelCase$1 = camelCase_1;
var reWhitespace = /\s/;
function trimmedEndIndex$1(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var _trimmedEndIndex = trimmedEndIndex$1;
var trimmedEndIndex = _trimmedEndIndex;
var reTrimStart = /^\s+/;
function baseTrim$1(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
var _baseTrim = baseTrim$1;
var baseTrim = _baseTrim, isObject$6 = isObject_1, isSymbol$2 = isSymbol_1;
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber$2(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol$2(value)) {
    return NAN;
  }
  if (isObject$6(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject$6(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_1 = toNumber$2;
var isArray$5 = isArray_1, isSymbol$1 = isSymbol_1;
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey$1(value, object) {
  if (isArray$5(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol$1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var _isKey = isKey$1;
var MapCache = _MapCache;
var FUNC_ERROR_TEXT$1 = "Expected a function";
function memoize$1(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache)();
  return memoized;
}
memoize$1.Cache = MapCache;
var memoize_1 = memoize$1;
var memoize = memoize_1;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped$1(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var _memoizeCapped = memoizeCapped$1;
var memoizeCapped = _memoizeCapped;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath$1 = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number2, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number2 || match);
  });
  return result;
});
var _stringToPath = stringToPath$1;
var isArray$4 = isArray_1, isKey = _isKey, stringToPath = _stringToPath, toString$1 = toString_1;
function castPath$6(value, object) {
  if (isArray$4(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString$1(value));
}
var _castPath = castPath$6;
var isSymbol$5 = isSymbol_1;
var INFINITY = 1 / 0;
function toKey$4(value) {
  if (typeof value == "string" || isSymbol$5(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var _toKey = toKey$4;
var castPath$5 = _castPath, toKey$3 = _toKey;
function baseGet$2(object, path) {
  path = castPath$5(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey$3(path[index++])];
  }
  return index && index == length ? object : void 0;
}
var _baseGet = baseGet$2;
var assignValue = _assignValue, castPath$4 = _castPath, isIndex$2 = _isIndex, isObject$4 = isObject_1, toKey$2 = _toKey;
function baseSet$1(object, path, value, customizer) {
  if (!isObject$4(object)) {
    return object;
  }
  path = castPath$4(path, object);
  var index = -1, length = path.length, lastIndex = length - 1, nested = object;
  while (nested != null && ++index < length) {
    var key = toKey$2(path[index]), newValue = value;
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return object;
    }
    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : void 0;
      if (newValue === void 0) {
        newValue = isObject$4(objValue) ? objValue : isIndex$2(path[index + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}
var _baseSet = baseSet$1;
var baseGet$1 = _baseGet, baseSet = _baseSet, castPath$3 = _castPath;
function basePickBy$1(object, paths, predicate) {
  var index = -1, length = paths.length, result = {};
  while (++index < length) {
    var path = paths[index], value = baseGet$1(object, path);
    if (predicate(value, path)) {
      baseSet(result, castPath$3(path, object), value);
    }
  }
  return result;
}
var _basePickBy = basePickBy$1;
function baseHasIn$1(object, key) {
  return object != null && key in Object(object);
}
var _baseHasIn = baseHasIn$1;
var castPath$2 = _castPath, isArguments$2 = isArguments_1, isArray$3 = isArray_1, isIndex$1 = _isIndex, isLength = isLength_1, toKey$1 = _toKey;
function hasPath$1(object, path, hasFunc) {
  path = castPath$2(path, object);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = toKey$1(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex$1(key, length) && (isArray$3(object) || isArguments$2(object));
}
var _hasPath = hasPath$1;
var baseHasIn = _baseHasIn, hasPath = _hasPath;
function hasIn$1(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}
var hasIn_1 = hasIn$1;
var basePickBy = _basePickBy, hasIn = hasIn_1;
function basePick$1(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}
var _basePick = basePick$1;
var Symbol$1 = _Symbol, isArguments$1 = isArguments_1, isArray$2 = isArray_1;
var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : void 0;
function isFlattenable$1(value) {
  return isArray$2(value) || isArguments$1(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var _isFlattenable = isFlattenable$1;
var arrayPush = _arrayPush, isFlattenable = _isFlattenable;
function baseFlatten$1(array, depth, predicate, isStrict, result) {
  var index = -1, length = array.length;
  predicate || (predicate = isFlattenable);
  result || (result = []);
  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten$1(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
var _baseFlatten = baseFlatten$1;
var baseFlatten = _baseFlatten;
function flatten$1(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}
var flatten_1 = flatten$1;
function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var _apply = apply$1;
var apply$2 = _apply;
var nativeMax = Math.max;
function overRest$2(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply$2(func, this, otherArgs);
  };
}
var _overRest = overRest$2;
function constant$1(value) {
  return function() {
    return value;
  };
}
var constant_1 = constant$1;
function identity$2(value) {
  return value;
}
var identity_1 = identity$2;
var constant = constant_1, defineProperty = _defineProperty, identity$1 = identity_1;
var baseSetToString$1 = !defineProperty ? identity$1 : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var _baseSetToString = baseSetToString$1;
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut$1(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var _shortOut = shortOut$1;
var baseSetToString = _baseSetToString, shortOut = _shortOut;
var setToString$2 = shortOut(baseSetToString);
var _setToString = setToString$2;
var flatten = flatten_1, overRest$1 = _overRest, setToString$1 = _setToString;
function flatRest$2(func) {
  return setToString$1(overRest$1(func, void 0, flatten), func + "");
}
var _flatRest = flatRest$2;
var basePick = _basePick, flatRest$1 = _flatRest;
var pick = flatRest$1(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});
var pick_1 = pick;
var toString = toString_1;
var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}
var uniqueId_1 = uniqueId;
const uniqueId$1 = uniqueId_1;
var baseAssignValue = _baseAssignValue, eq$1 = eq_1;
function assignMergeValue$2(object, key, value) {
  if (value !== void 0 && !eq$1(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
var _assignMergeValue = assignMergeValue$2;
function createBaseFor$1(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var _createBaseFor = createBaseFor$1;
var createBaseFor = _createBaseFor;
var baseFor$1 = createBaseFor();
var _baseFor = baseFor$1;
var isArrayLike$1 = isArrayLike_1, isObjectLike$3 = isObjectLike_1;
function isArrayLikeObject$1(value) {
  return isObjectLike$3(value) && isArrayLike$1(value);
}
var isArrayLikeObject_1 = isArrayLikeObject$1;
var baseGetTag$2 = _baseGetTag, getPrototype = _getPrototype, isObjectLike$2 = isObjectLike_1;
var objectTag = "[object Object]";
var funcProto = Function.prototype, objectProto = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject$2(value) {
  if (!isObjectLike$2(value) || baseGetTag$2(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var isPlainObject_1 = isPlainObject$2;
function safeGet$2(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
var _safeGet = safeGet$2;
var copyObject$1 = _copyObject, keysIn$1 = keysIn_1;
function toPlainObject$1(value) {
  return copyObject$1(value, keysIn$1(value));
}
var toPlainObject_1 = toPlainObject$1;
var assignMergeValue$1 = _assignMergeValue, cloneBuffer = _cloneBufferExports, cloneTypedArray = _cloneTypedArray, copyArray = _copyArray, initCloneObject = _initCloneObject, isArguments = isArguments_1, isArray$1 = isArray_1, isArrayLikeObject = isArrayLikeObject_1, isBuffer = isBufferExports, isFunction$4 = isFunction_1, isObject$3 = isObject_1, isPlainObject$1 = isPlainObject_1, isTypedArray = isTypedArray_1, safeGet$1 = _safeGet, toPlainObject = toPlainObject_1;
function baseMergeDeep$1(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet$1(object, key), srcValue = safeGet$1(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue$1(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray$1(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray$1(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject$1(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject$3(objValue) || isFunction$4(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue$1(object, key, newValue);
}
var _baseMergeDeep = baseMergeDeep$1;
var Stack = _Stack, assignMergeValue = _assignMergeValue, baseFor = _baseFor, baseMergeDeep = _baseMergeDeep, isObject$2 = isObject_1, keysIn = keysIn_1, safeGet = _safeGet;
function baseMerge$1(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack());
    if (isObject$2(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge$1, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
var _baseMerge = baseMerge$1;
var identity = identity_1, overRest = _overRest, setToString = _setToString;
function baseRest$1(func, start) {
  return setToString(overRest(func, start, identity), func + "");
}
var _baseRest = baseRest$1;
var eq = eq_1, isArrayLike = isArrayLike_1, isIndex = _isIndex, isObject$1$1 = isObject_1;
function isIterateeCall$1(value, index, object) {
  if (!isObject$1$1(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
var _isIterateeCall = isIterateeCall$1;
var baseRest = _baseRest, isIterateeCall = _isIterateeCall;
function createAssigner$1(assigner) {
  return baseRest(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var _createAssigner = createAssigner$1;
var baseMerge = _baseMerge, createAssigner = _createAssigner;
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
var merge_1 = merge;
function last$1(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : void 0;
}
var last_1 = last$1;
var baseGet = _baseGet, baseSlice = _baseSlice;
function parent$1(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}
var _parent = parent$1;
var castPath$1 = _castPath, last = last_1, parent = _parent, toKey = _toKey;
function baseUnset$1(object, path) {
  path = castPath$1(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}
var _baseUnset = baseUnset$1;
var isPlainObject = isPlainObject_1;
function customOmitClone$1(value) {
  return isPlainObject(value) ? void 0 : value;
}
var _customOmitClone = customOmitClone$1;
var arrayMap = _arrayMap, baseClone = _baseClone, baseUnset = _baseUnset, castPath = _castPath, copyObject = _copyObject, customOmitClone = _customOmitClone, flatRest = _flatRest, getAllKeysIn = _getAllKeysIn;
var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
var omit = flatRest(function(object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap(paths, function(path) {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});
var omit_1 = omit;
function baseClamp$1(number2, lower, upper) {
  if (number2 === number2) {
    if (upper !== void 0) {
      number2 = number2 <= upper ? number2 : upper;
    }
    if (lower !== void 0) {
      number2 = number2 >= lower ? number2 : lower;
    }
  }
  return number2;
}
var _baseClamp = baseClamp$1;
var baseClamp = _baseClamp, toNumber = toNumber_1;
function clamp(number2, lower, upper) {
  if (upper === void 0) {
    upper = lower;
    lower = void 0;
  }
  if (upper !== void 0) {
    upper = toNumber(upper);
    upper = upper === upper ? upper : 0;
  }
  if (lower !== void 0) {
    lower = toNumber(lower);
    lower = lower === lower ? lower : 0;
  }
  return baseClamp(toNumber(number2), lower, upper);
}
var clamp_1 = clamp;
var nodeUtil = _nodeUtilExports;
nodeUtil && nodeUtil.isDate;
let app;
const setCurrentApp = (instance) => {
  app = instance;
};
const getCurrentApp = () => app;
const inject = (key, value) => {
  var _a;
  const app2 = (_a = getCurrentApp()) == null ? void 0 : _a._context.provides[key];
  return app2 || inject$1(key, value);
};
const isObject$1 = (obj) => obj && typeof obj === "object" && !Array.isArray(obj);
const mergeDeep = (target, source) => {
  if (!isObject$1(target) || !isObject$1(source)) {
    return source;
  }
  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];
    if (isObject$1(targetValue) && isObject$1(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });
  return target;
};
const getColorDefaultConfig = () => ({
  get variables() {
    return this.presets[this.currentPresetName];
  },
  set variables(value) {
    this.presets[this.currentPresetName] = value;
  },
  threshold: 150,
  presets: {
    light: presets.light,
    dark: presets.dark
  },
  currentPresetName: "light"
});
const VuesticIconAliases = [
  {
    name: "va-arrow-first",
    to: "mi-first_page"
  },
  {
    name: "va-arrow-last",
    to: "mi-last_page"
  },
  {
    name: "va-arrow-right",
    to: "mi-chevron_right"
  },
  {
    name: "va-arrow-left",
    to: "mi-chevron_left"
  },
  {
    name: "va-arrow-down",
    to: "mi-expand_more"
  },
  {
    name: "va-arrow-up",
    to: "mi-expand_less"
  },
  {
    name: "va-calendar",
    to: "mi-calendar_today"
  },
  {
    name: "va-delete",
    to: "mi-delete_outline"
  },
  {
    name: "va-check",
    to: "mi-check"
  },
  {
    name: "va-check-circle",
    to: "mi-check_circle"
  },
  {
    name: "va-warning",
    to: "mi-warning"
  },
  {
    name: "va-clear",
    to: "mi-highlight_off"
  },
  {
    name: "va-close",
    to: "mi-close"
  },
  {
    name: "va-loading",
    to: "mi-loop"
  }
];
const VuesticIconFonts = [
  {
    name: "mi-{icon}",
    class: "material-icons",
    resolve: ({ icon }) => ({ content: icon })
  },
  // Fallback
  {
    name: "{icon}",
    class: "material-icons",
    resolve: ({ icon }) => ({ content: icon })
  }
];
const createIconsConfig = (config) => {
  config.aliases = config.aliases || [];
  config.fonts = config.fonts || [];
  return [
    ...config.aliases,
    ...VuesticIconAliases,
    ...config.fonts,
    ...VuesticIconFonts
  ];
};
const getIconDefaultConfig = () => createIconsConfig({});
const getComponentsDefaultConfig = () => (
  // TODO: Should be handled in size service
  {
    VaIcon: {
      sizesConfig: {
        defaultSize: 24,
        sizes: {
          small: 16,
          medium: 24,
          large: 32
        }
      }
    },
    VaRating: {
      sizesConfig: {
        defaultSize: 24,
        sizes: {
          small: 16,
          medium: 24,
          large: 32
        }
      }
    },
    all: {},
    presets: {
      VaButton: {
        default: {
          backgroundOpacity: 1,
          hoverBehavior: "mask",
          hoverOpacity: 0.15,
          pressedBehavior: "mask",
          pressedOpacity: 0.13
        },
        primary: {
          backgroundOpacity: 0.1,
          hoverBehavior: "opacity",
          hoverOpacity: 0.07,
          pressedBehavior: "opacity",
          pressedOpacity: 0.13
        },
        secondary: {
          backgroundOpacity: 0,
          hoverBehavior: "opacity",
          hoverOpacity: 0.07,
          pressedBehavior: "opacity",
          pressedOpacity: 0.13
        },
        plain: {
          plain: true,
          hoverBehavior: "mask",
          hoverOpacity: 0.15,
          pressedBehavior: "mask",
          pressedOpacity: 0.13
        },
        plainOpacity: {
          plain: true,
          textOpacity: 0.6,
          hoverBehavior: "opacity",
          hoverOpacity: 1,
          pressedBehavior: "opacity",
          pressedOpacity: 0.9
        }
      }
    }
  }
);
const getI18nConfigDefaults = () => ({
  // PROPS
  /** Select search field default text */
  search: "Search",
  /** Select no options text */
  noOptions: "Items not found",
  /** Modal Ok button default text */
  ok: "Ok",
  /** Modal Cancel button default text */
  cancel: "Cancel",
  /** FileUpload default button text */
  uploadFile: "Upload file",
  /** FileUpload default undo button text */
  undo: "Undo",
  /** FileUpload default dropzone text */
  dropzone: "Drop files here to upload",
  /** FileUpload default file deleted alert text */
  fileDeleted: "File deleted",
  // Aria attributes
  /** Alert close button aria-label */
  closeAlert: "close alert",
  backToTop: "back to top",
  toggleDropdown: "toggle dropdown",
  carousel: "carousel",
  goPreviousSlide: "go previous slide",
  goNextSlide: "go next slide",
  goSlide: "go slide {index}",
  slideOf: "slide {index} of {length}",
  close: "close",
  openColorPicker: "open color picker",
  colorSelection: "color selection",
  colorName: "color {color}",
  decreaseCounter: "decrease counter",
  increaseCounter: "increase counter",
  selectAllRows: "select all rows",
  sortColumnBy: "sort column by {name}",
  selectRowByIndex: "select row {index}",
  resetDate: "reset date",
  nextPeriod: "next period",
  switchView: "switch view",
  previousPeriod: "previous period",
  removeFile: "remove file",
  reset: "reset",
  pagination: "pagination",
  goToTheFirstPage: "go to the first page",
  goToPreviousPage: "go to the previous page",
  goToSpecificPage: "go to the {page} page",
  goToSpecificPageInput: "enter the page number to go",
  goNextPage: "go next page",
  goLastPage: "go last page",
  /** Rating aria-label */
  currentRating: "current rating {value} of {max}",
  /** Rating item aria-label */
  voteRating: "vote rating {value} of {max}",
  /** Select search input aria-label */
  optionsFilter: "options filter",
  splitPanels: "split panels",
  movePaginationLeft: "move pagination left",
  movePaginationRight: "move pagination right",
  resetTime: "reset time",
  closeToast: "close toast",
  /**
   * Select aria-label selected option prefix
   *
   * @example
   *
   * `Selected option: {option}` or `Selected option: Animal`
   */
  selectedOption: "Selected option",
  /** Select aria-label if no option is selected */
  noSelectedOption: "Option is not selected",
  breadcrumbs: "breadcrumbs",
  counterValue: "counter value",
  selectedDate: "selected date",
  selectedTime: "selected time",
  progressState: "progress state",
  color: "color",
  /** Stepper next button text */
  next: "Next",
  /** Stepper previous button text */
  back: "Previous",
  /** Stepper finish button text */
  finish: "Finish",
  step: "step",
  progress: "progress",
  /** Skeleton aria label */
  loading: "Loading",
  /** Slider aria label */
  sliderValue: "Current slider value is {value}",
  /** Switch aria label */
  switch: "Switch"
});
const isServer = () => true;
const isClient = () => !isServer();
const fakeGlobal = {};
const getGlobal = () => {
  {
    if (typeof globalThis === "undefined") {
      return fakeGlobal;
    }
    return globalThis;
  }
};
const addOrUpdateStyleElement = (id, getStyles) => {
  {
    return;
  }
};
const ColorsClassesPresets = [
  {
    prefix: "bg",
    property: "background-color"
  },
  {
    prefix: "text",
    property: ["color", "fill"]
  }
];
const defineVuesticPlugin = (fabric) => fabric;
const extractGlobalProperties = (app2) => app2.config.globalProperties;
const defineGlobalProperty = (app2, key, v) => {
  const globalProperties = extractGlobalProperties(app2);
  globalProperties[key] = v;
};
const getGlobalProperty$1 = (app2, key) => {
  return extractGlobalProperties(app2)[key];
};
const getColorsClassesDefaultConfig = () => ColorsClassesPresets;
const createColorHelpersPlugin = () => {
  {
    return;
  }
};
const ColorsClassesPlugin = defineVuesticPlugin(() => ({
  install(app2) {
    defineGlobalProperty(app2, "$vaColorsClasses", createColorHelpersPlugin());
  }
}));
const GLOBAL_CONFIG = Symbol("GLOBAL_CONFIG");
const createGlobalConfig = () => {
  const globalConfig = ref({
    colors: getColorDefaultConfig(),
    icons: getIconDefaultConfig(),
    components: getComponentsDefaultConfig(),
    breakpoint: getBreakpointDefaultConfig(),
    i18n: getI18nConfigDefaults(),
    colorsClasses: getColorsClassesDefaultConfig(),
    /**
     * global config variable to pass nuxt-link component to vuestic-ui via @vuestic/nuxt
     * TODO: give a try to integrate inertia js router components via this option
     * TODO: if this try won't be success, may be remake to provide/inject
     */
    routerComponent: void 0
  });
  const getGlobalConfig = () => globalConfig.value;
  const setGlobalConfig = (updater) => {
    const config = typeof updater === "function" ? updater(globalConfig.value) : updater;
    globalConfig.value = cloneDeep_1(config);
  };
  const mergeGlobalConfig = (updater) => {
    const config = typeof updater === "function" ? updater(globalConfig.value) : updater;
    globalConfig.value = mergeDeep(cloneDeep_1(globalConfig.value), config);
  };
  return {
    getGlobalConfig,
    setGlobalConfig,
    mergeGlobalConfig,
    globalConfig
  };
};
const provideForCurrentApp = (provide2) => {
  var _a, _b;
  const provides = ((_a = getCurrentInstance()) == null ? void 0 : _a.appContext.provides) || ((_b = getCurrentApp()) == null ? void 0 : _b._context.provides);
  if (!provides) {
    throw new Error("Vue app not found for provide");
  }
  provides[GLOBAL_CONFIG] = provide2;
  return provide2;
};
function useGlobalConfig() {
  let injected = inject(GLOBAL_CONFIG);
  if (!injected) {
    injected = createGlobalConfig();
    provideForCurrentApp(injected);
  }
  return injected;
}
const processShim = typeof process !== "undefined" ? process : {};
const envShim = processShim.env || {};
const nodeEnv = envShim.NODE_ENV || "";
const isDev = typeof __DEV__ !== "undefined" ? __DEV__ : !["prod", "production"].includes(nodeEnv);
const warn$1 = (...attrs) => {
  if (isDev) {
    console.warn(...attrs);
  }
  return false;
};
const VaAppCachePluginKey = Symbol("VaAppCachePlugin");
const CachePlugin = defineVuesticPlugin(() => ({
  install(app2) {
    const cache = {
      colorContrast: {}
    };
    app2.provide(VaAppCachePluginKey, cache);
  }
}));
const useCache = () => inject(VaAppCachePluginKey, {
  colorContrast: {}
});
const useReactiveComputed = (obj) => {
  const objectRef = typeof obj === "function" ? computed(obj) : computed(obj);
  const proxy = new Proxy(objectRef, {
    get(target, p, receiver) {
      return unref(Reflect.get(objectRef.value, p, receiver));
    },
    set(target, p, value) {
      if (isRef(objectRef.value[p]) && !isRef(value)) {
        objectRef.value[p].value = value;
      } else {
        objectRef.value[p] = value;
      }
      return true;
    },
    deleteProperty(target, p) {
      return Reflect.deleteProperty(objectRef.value, p);
    },
    has(target, p) {
      return Reflect.has(objectRef.value, p);
    },
    ownKeys() {
      return Object.keys(objectRef.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    }
  });
  return reactive(proxy);
};
const isCSSVariable = (strColor) => /var\(--.+\)/.test(strColor);
const cssVariableName = (colorName) => `--va-${kebabCase_1(colorName)}`;
const normalizeColorName = (colorName) => camelCase$1(colorName);
const colorToRgba = (color, opacity) => {
  return new ColorTranslator(color).setA(opacity).RGBA;
};
const getColorLightness = (color) => {
  const { R, G, B } = new ColorTranslator(color);
  return Math.sqrt(R * R * 0.241 + G * G * 0.691 + B * B * 0.068);
};
const getBoxShadowColor = (color, opacity = 0.4) => {
  return new ColorTranslator(color).setA(opacity).RGBA;
};
const getBoxShadowColorFromBg = (background, opacity = 0.4) => {
  return new ColorTranslator(background).setA(opacity).RGBA;
};
const getHoverColor = (color, opacity = 0.2) => {
  return new ColorTranslator(color).setA(opacity).RGBA;
};
const getFocusColor = (color, opacity = 0.3) => {
  return new ColorTranslator(color).setA(opacity).RGBA;
};
const shiftHSLAColor = (color, offset) => {
  const result = new ColorTranslator(color);
  if (offset.h) {
    result.setH(result.H + offset.h);
  }
  if (offset.s) {
    result.setS(result.S + offset.s);
  }
  if (offset.l) {
    result.setL(result.L + offset.l);
  }
  if (offset.a) {
    result.setA(result.A + offset.a);
  }
  return result.HSLA;
};
const setHSLAColor = (color, newColor) => {
  const result = new ColorTranslator(color);
  if (newColor.h !== void 0) {
    result.setH(newColor.h);
  }
  if (newColor.s !== void 0) {
    result.setS(newColor.s);
  }
  if (newColor.l !== void 0) {
    result.setL(newColor.l);
  }
  if (newColor.a !== void 0) {
    result.setA(newColor.a);
  }
  return result.HSLA;
};
const shiftGradientColor = (color) => {
  const newColor = ColorTranslator.toHSLA(color, false);
  if (newColor.s < 10) {
    return shiftHSLAColor(newColor, { h: 2, s: 5, l: 10 });
  }
  if (newColor.s < 30) {
    return shiftHSLAColor(newColor, { s: -14, l: 11 });
  }
  if (newColor.h >= 0 && newColor.h < 44 || newColor.h >= 285) {
    return shiftHSLAColor(newColor, { h: 11, s: 27, l: 8 });
  }
  if (newColor.h >= 44 && newColor.h < 85) {
    return shiftHSLAColor(newColor, { h: 3, l: 9 });
  }
  if (newColor.h >= 85 && newColor.h < 165) {
    return shiftHSLAColor(newColor, { h: 16, l: 14 });
  }
  if (newColor.h >= 165 && newColor.h < 285) {
    return shiftHSLAColor(newColor, { h: -15, s: 3, l: 2 });
  }
  throw new Error("This method should handle all colors. But it didn't for some reason.");
};
const getGradientBackground = (color) => {
  const colorLeft = shiftGradientColor(color);
  const colorRight = ColorTranslator.toHSLA(color);
  return `linear-gradient(to right, ${colorLeft}, ${colorRight})`;
};
const getStateMaskGradientBackground = (color, maskColor, maskOpacity) => {
  const mask = colorToRgba(maskColor, maskOpacity);
  return `linear-gradient(0deg, ${mask}, ${mask}), ${color}`;
};
const isColor = (strColor) => {
  const cssColorRegex = /^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$|(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*,?\s*\)?)(,\s*(0?\.\d+)?|1)?\)/;
  return cssColorRegex.test(strColor.toLocaleLowerCase());
};
const useColors = () => {
  const gc = useGlobalConfig();
  if (!gc) {
    throw new Error("useColors must be used in setup function or Vuestic GlobalConfigPlugin is not registered!");
  }
  const { setGlobalConfig, globalConfig } = gc;
  const colors = useReactiveComputed({
    get: () => globalConfig.value.colors.variables,
    set: (v) => {
      setColors(v);
    }
  });
  const setColors = (colors2) => {
    globalConfig.value.colors.variables = {
      ...globalConfig.value.colors.variables,
      ...colors2
    };
  };
  const getColors = () => {
    return colors;
  };
  const getColor = (prop, defaultColor, preferVariables) => {
    if (!defaultColor) {
      defaultColor = getColors().primary;
    }
    const colors2 = getColors();
    if (!prop) {
      prop = getColor(defaultColor);
    }
    const colorValue = colors2[prop] || colors2[normalizeColorName(prop)];
    if (colorValue) {
      return preferVariables ? `var(${cssVariableName(prop)})` : colorValue;
    }
    if (isColor(prop)) {
      return prop;
    }
    if (preferVariables && isCSSVariable(prop)) {
      return prop;
    }
    if (isDev) {
      console.warn(`'${prop}' is not a proper color! Use HEX or default color themes
      names (https://vuestic.dev/en/styles/colors#default-color-themes)`);
    }
    return getColor(defaultColor);
  };
  const getComputedColor = (color) => {
    return computed(() => getColor(color));
  };
  const colorsToCSSVariable = (colors2, prefix = "va") => {
    return Object.keys(colors2).filter((key) => colors2[key] !== void 0).reduce((acc, colorName) => {
      acc[`--${prefix}-${colorName}`] = getColor(colors2[colorName], void 0, true);
      return acc;
    }, {});
  };
  const cache = useCache();
  const getColorLightnessFromCache = (color) => {
    if (typeof color !== "string") {
      return getColorLightness(color);
    }
    if (!cache.colorContrast[color]) {
      cache.colorContrast[color] = getColorLightness(color);
    }
    return cache.colorContrast[color];
  };
  const computedDarkColor = computed(() => {
    return getColorLightnessFromCache(getColor("textPrimary")) > globalConfig.value.colors.threshold ? "textInverted" : "textPrimary";
  });
  const computedLightColor = computed(() => {
    return getColorLightnessFromCache(getColor("textPrimary")) > globalConfig.value.colors.threshold ? "textPrimary" : "textInverted";
  });
  const getTextColor = (color, darkColor, lightColor) => {
    darkColor = darkColor || computedDarkColor.value;
    lightColor = lightColor || computedLightColor.value;
    return getColorLightnessFromCache(color) > globalConfig.value.colors.threshold ? darkColor : lightColor;
  };
  const currentPresetName = computed(() => globalConfig.value.colors.currentPresetName);
  const presets2 = computed(() => globalConfig.value.colors.presets);
  const applyPreset = (presetName) => {
    globalConfig.value.colors.currentPresetName = presetName;
    if (!globalConfig.value.colors.presets[presetName]) {
      return warn$1(`Preset ${presetName} does not exist`);
    }
    globalConfig.value.colors.variables = { ...globalConfig.value.colors.presets[presetName] };
  };
  return {
    colors,
    currentPresetName,
    presets: presets2,
    applyPreset,
    setColors,
    getColors,
    getColor,
    getComputedColor,
    getBoxShadowColor,
    getBoxShadowColorFromBg,
    getHoverColor,
    getFocusColor,
    getGradientBackground,
    getTextColor,
    shiftHSLAColor,
    setHSLAColor,
    colorsToCSSVariable,
    colorToRgba,
    getStateMaskGradientBackground
  };
};
const isMatchRegex = (str, regex) => {
  return regex.test(str);
};
const regexGroupsValues = (str, regex) => {
  if (typeof regex !== "string" && regex.global) {
    return [...str.matchAll(regex)].map((g) => g.slice(1));
  }
  const match = str.match(regex) || [];
  if (!match) {
    return [];
  }
  if (match.length > 1) {
    return match.slice(1);
  }
  return match;
};
const dynamicSegmentRegex = /{[^}]*}/g;
const dynamicSegmentStringToRegex = (template) => {
  return template.replace(dynamicSegmentRegex, "(.*)");
};
const dynamicSegmentsNames = (template) => {
  return (template.match(dynamicSegmentRegex) || []).map((g) => g.replace(/{|}/g, ""));
};
const dynamicSegmentsValues = (str, template) => {
  return regexGroupsValues(str, dynamicSegmentStringToRegex(template));
};
const dynamicSegments = (str, template) => {
  const params = dynamicSegmentsNames(template);
  const values = dynamicSegmentsValues(str, template);
  return params.reduce((acc, paramValue, i) => ({ ...acc, [paramValue]: values[i] }), {});
};
const strictMatch = (str, regex) => {
  return (str.match(regex) || [])[0] === str;
};
const isMatchDynamicSegments = (str, template) => {
  const templateRegex = dynamicSegmentStringToRegex(template);
  return strictMatch(str, new RegExp(templateRegex));
};
const isIconConfigurationString = (config) => {
  return typeof config.name === "string";
};
const isIconConfigurationRegex = (config) => {
  return config.name instanceof RegExp;
};
const isMatchConfiguration = (iconName, iconConfiguration) => {
  if (isIconConfigurationString(iconConfiguration)) {
    return isMatchDynamicSegments(iconName, iconConfiguration.name);
  }
  if (isIconConfigurationRegex(iconConfiguration)) {
    return isMatchRegex(iconName, iconConfiguration.name);
  }
  return false;
};
const resolveIconConfigurationString = (iconName, iconConfiguration) => {
  const args = dynamicSegments(iconName, iconConfiguration.name);
  return iconConfiguration.resolve && iconConfiguration.resolve(args);
};
const resolveIconConfigurationRegex = (iconName, iconConfig) => {
  if (iconConfig.name.global) {
    throw new Error(`Bad icon config with name ${iconConfig.name}. Please, don't use global regex as name.`);
  }
  const args = regexGroupsValues(iconName, iconConfig.name);
  return iconConfig.resolveFromRegex && iconConfig.resolveFromRegex(...args);
};
const resolveIconConfiguration = (iconName, iconConfiguration) => {
  if (isIconConfigurationString(iconConfiguration)) {
    return resolveIconConfigurationString(iconName, iconConfiguration);
  }
  if (isIconConfigurationRegex(iconConfiguration)) {
    return resolveIconConfigurationRegex(iconName, iconConfiguration);
  }
  throw Error("Unknown icon config");
};
const findMatchedIconConfiguration = (iconName, globalIconConfig, namesToIgnore = []) => {
  const matchedConfig = globalIconConfig.find((config) => {
    if (namesToIgnore.includes(config.name.toString())) {
      return false;
    }
    return isMatchConfiguration(iconName, config);
  });
  if (!matchedConfig) {
    throw new Error(`Can not find icon config from ${iconName}. Please provide default config.`);
  }
  return matchedConfig;
};
const findIconConfiguration = (iconName, globalIconConfig, namesToIgnore = []) => {
  if (!iconName) {
    return;
  }
  const matchedIconConfiguration = findMatchedIconConfiguration(iconName, globalIconConfig, namesToIgnore);
  const resolvedIconConfiguration = merge_1(resolveIconConfiguration(iconName, matchedIconConfiguration), matchedIconConfiguration);
  namesToIgnore = [...namesToIgnore, matchedIconConfiguration.name.toString()];
  return merge_1(
    findIconConfiguration(resolvedIconConfiguration.to, globalIconConfig, namesToIgnore),
    resolvedIconConfiguration
  );
};
const iconPropsFromIconConfiguration = (iconConfiguration) => {
  const junkKeys = ["name", "to", "resolve", "resolveFromRegex"];
  const configuration = iconConfiguration;
  junkKeys.forEach((key) => {
    delete configuration[key];
  });
  return configuration;
};
const getIconConfiguration = (name, iconConfig) => {
  const configuration = findIconConfiguration(name, iconConfig);
  if (configuration === void 0) {
    return {};
  }
  return iconPropsFromIconConfiguration(configuration);
};
const useIcon = () => {
  const { globalConfig } = useGlobalConfig();
  return {
    getIcon: (name) => getIconConfiguration(name, globalConfig.value.icons)
  };
};
const GlobalConfigPlugin = defineVuesticPlugin((config) => ({
  install(app2) {
    const globalConfig = createGlobalConfig();
    if (config) {
      globalConfig.mergeGlobalConfig(config);
    }
    if (config == null ? void 0 : config.componentsAll) {
      console.warn("Global config -> `componentsAll` was moved to Global config -> components.all. Please replace this to make it work. More info here: https://github.com/epicmaxco/vuestic-ui/issues/1967");
    }
    app2.provide(GLOBAL_CONFIG, globalConfig);
    defineGlobalProperty(app2, "$vaConfig", globalConfig);
  }
}));
const createColorConfigPlugin = (app2, config) => {
  var _a;
  const { colors: configColors, getTextColor, getColor, currentPresetName, applyPreset } = useColors();
  const renderCSSVariables = (colors = configColors) => {
    if (!colors) {
      return;
    }
    const colorNames = Object.keys(colors);
    const renderedColors = colorNames.map((key) => `${cssVariableName(key)}: ${colors[key]}`).join(";");
    const renderedOnColors = colorNames.map((key) => `${cssVariableName(`on-${key}`)}: ${getColor(getTextColor(colors[key]))}`).join(";");
    return `${renderedColors};${renderedOnColors}`;
  };
  const updateColors = (newValue) => {
    if (!newValue) {
      return;
    }
    {
      return;
    }
  };
  watch(configColors, (newValue) => {
  }, { immediate: true, deep: true });
  if ((_a = config == null ? void 0 : config.colors) == null ? void 0 : _a.currentPresetName) {
    applyPreset(config.colors.currentPresetName);
  }
  return {
    renderCSSVariables,
    updateColors
  };
};
const ColorConfigPlugin = defineVuesticPlugin((config) => ({
  install(app2) {
    defineGlobalProperty(app2, "$vaColorConfig", createColorConfigPlugin(app2, config));
  }
}));
const getRandomString = (stringLength = 4) => {
  return Math.random().toString(36).substring(2, stringLength + 2);
};
const generateUniqueId = () => {
  return `${getRandomString(8)}-${getRandomString(4)}-${getRandomString(4)}`;
};
const useClientOnly = (cb) => {
  const isMounted = computed(isClient);
  const result = ref(null);
  watch(isMounted, () => {
    if (isMounted.value) {
      result.value = cb();
    }
  }, { immediate: true });
  return result;
};
const useWindow = () => useClientOnly(() => window);
const useEvent = (event, listener, target) => {
  const source = target && typeof target !== "boolean" ? target : useWindow();
  const capture = typeof target === "boolean" ? target : false;
  watch(source, (newValue, oldValue) => {
    var _a, _b;
    if (!Array.isArray(event)) {
      (_a = unref(newValue)) == null ? void 0 : _a.addEventListener(event, listener, capture);
      (_b = unref(oldValue)) == null ? void 0 : _b.removeEventListener(event, listener, capture);
    } else {
      event.forEach((e) => {
        var _a2, _b2;
        (_a2 = unref(newValue)) == null ? void 0 : _a2.addEventListener(e, listener, capture);
        (_b2 = unref(oldValue)) == null ? void 0 : _b2.removeEventListener(e, listener, capture);
      });
    }
  }, { immediate: true });
};
function useWindowSize() {
  const windowSizes = reactive({
    width: void 0,
    height: void 0
  });
  const setCurrentWindowSizes = () => {
    windowSizes.width = window == null ? void 0 : window.innerWidth;
    windowSizes.height = window == null ? void 0 : window.innerHeight;
  };
  const isMounted = computed(isClient);
  watch(isMounted, (newValue) => {
    if (!newValue) {
      return;
    }
    setCurrentWindowSizes();
  }, { immediate: true });
  useEvent("resize", setCurrentWindowSizes, true);
  return { windowSizes };
}
const useDocument = () => useClientOnly(() => document);
const createBreakpointConfigPlugin = (app2) => {
  var _a;
  const globalConfig = (_a = getGlobalProperty$1(app2, "$vaConfig")) == null ? void 0 : _a.globalConfig;
  if (!globalConfig) {
    warn$1("createBreakpointConfigPlugin: globalConfig is not defined!");
    return {};
  }
  const breakpointConfig = computed(() => {
    const breakpoint = globalConfig.value.breakpoint;
    if (!breakpoint) {
      warn$1("createBreakpointConfigPlugin: breakpointConfig is not defined!");
    }
    return breakpoint ?? {};
  });
  if (!breakpointConfig.value.enabled) {
    return {};
  }
  if (!breakpointConfig.value.thresholds || !Object.values(breakpointConfig.value.thresholds).length) {
    warn$1("createBreakpointConfigPlugin: there are no defined thresholds!");
    return {};
  }
  const { windowSizes } = useWindowSize();
  const isMounted = computed(isClient);
  const currentBreakpoint = computed(() => {
    if (!isMounted.value || !windowSizes.width) {
      return;
    }
    return Object.entries(breakpointConfig.value.thresholds).reduce((acc, [key, value]) => {
      if (windowSizes.width >= value) {
        acc = key;
      }
      return acc;
    }, "xs");
  });
  const screenClasses = computed(() => Object.keys(breakpointConfig.value.thresholds).reduce((acc, threshold) => {
    acc[threshold] = `va-screen-${threshold}`;
    return acc;
  }, {}));
  const uniqueId2 = computed(generateUniqueId);
  addOrUpdateStyleElement(`va-helpers-media-${uniqueId2.value}`);
  const getDocument = useDocument();
  watch(currentBreakpoint, (newValue) => {
    if (!newValue || !breakpointConfig.value.bodyClass || !getDocument.value) {
      return;
    }
    getDocument.value.body.classList.forEach((className) => {
      if (Object.values(screenClasses.value).includes(className)) {
        getDocument.value.body.classList.remove(className);
      }
    });
    getDocument.value.body.classList.add(screenClasses.value[newValue]);
  }, { immediate: true });
  const breakpointHelpers = computed(() => {
    const isXs = currentBreakpoint.value === "xs";
    const isSm = currentBreakpoint.value === "sm";
    const isMd = currentBreakpoint.value === "md";
    const isLg = currentBreakpoint.value === "lg";
    const isXl = currentBreakpoint.value === "xl";
    return {
      xs: isXs,
      sm: isSm,
      md: isMd,
      lg: isLg,
      xl: isXl,
      smUp: isSm || isMd || isLg || isXl,
      mdUp: isMd || isLg || isXl,
      lgUp: isLg || isXl,
      smDown: isXs || isSm,
      mdDown: isXs || isSm || isMd,
      lgDown: isXs || isSm || isMd || isLg
    };
  });
  return useReactiveComputed(() => ({
    width: windowSizes.width,
    height: windowSizes.height,
    current: currentBreakpoint.value,
    thresholds: breakpointConfig.value.thresholds,
    ...breakpointHelpers.value
  }));
};
const BreakpointConfigPlugin = defineVuesticPlugin(() => ({
  install(app2) {
    const breakpointConfig = createBreakpointConfigPlugin(app2);
    app2.provide(vaBreakpointSymbol, breakpointConfig);
    defineGlobalProperty(app2, "$vaBreakpoint", breakpointConfig);
  }
}));
const LocalConfigKey = "VaLocalConfig";
const CONFIGS_DEFAULT = computed(() => []);
function useLocalConfig() {
  return inject$1(LocalConfigKey, CONFIGS_DEFAULT);
}
const useComponentConfigProps = (component, originalProps) => {
  const localConfig = useLocalConfig();
  const { globalConfig } = useGlobalConfig();
  const instancePreset = computed(() => originalProps.preset);
  const getPresetProps = (presetName) => {
    var _a, _b, _c;
    return (_c = (_b = (_a = globalConfig.value.components) == null ? void 0 : _a.presets) == null ? void 0 : _b[component.name]) == null ? void 0 : _c[presetName];
  };
  return computed(() => {
    var _a, _b;
    const globalConfigProps = {
      ...(_a = globalConfig.value.components) == null ? void 0 : _a.all,
      ...(_b = globalConfig.value.components) == null ? void 0 : _b[component.name]
    };
    const localConfigProps = localConfig.value.reduce(
      (finalConfig, config) => config[component.name] ? { ...finalConfig, ...config[component.name] } : finalConfig,
      {}
    );
    const presetName = instancePreset.value || localConfigProps.preset || globalConfigProps.preset;
    const presetProps = presetName && getPresetProps(presetName);
    return { ...globalConfigProps, ...localConfigProps, ...presetProps };
  });
};
const toCamelCase = (str) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
const findCamelCased = (obj, key) => {
  const found = Object.keys(obj).find((k) => toCamelCase(k) === key);
  return found && obj[found];
};
const createPropsWithCustomConfig = (instance, propsFromConfig) => {
  const instanceProps = instance.props;
  return new Proxy(instanceProps, {
    get: (target, key) => {
      var _a;
      if (typeof key !== "string") {
        return target[key];
      }
      const incomingProps = instance.vnode.props || {};
      const originalProp = target[key];
      const propFromConfig = (_a = propsFromConfig.value) == null ? void 0 : _a[key];
      const incomingProp = findCamelCased(incomingProps, key);
      if (incomingProp !== void 0) {
        return originalProp;
      }
      if (propFromConfig !== void 0) {
        return propFromConfig;
      }
      return originalProp;
    }
  });
};
const patchInstanceProps = (instance, props) => {
  instance.props = props;
};
const createProxyComponent = (component) => {
  const customSetup = (originalProps, ctx) => {
    var _a;
    const instance = getCurrentInstance();
    const propsFromConfig = useComponentConfigProps(component, originalProps);
    const props = createPropsWithCustomConfig(instance, propsFromConfig);
    patchInstanceProps(instance, props);
    return (_a = component.setup) == null ? void 0 : _a.call(component, shallowReadonly(props), ctx);
  };
  return new Proxy(component, {
    get(target, key) {
      if (key === "setup") {
        return customSetup;
      }
      return target[key];
    }
  });
};
const CLASS_COMPONENT_KEY = "__c";
const patchClassComponent = (component) => {
  component[CLASS_COMPONENT_KEY] = createProxyComponent(component[CLASS_COMPONENT_KEY]);
  return component;
};
const withConfigTransport = (component) => {
  if ("setup" in component) {
    return createProxyComponent(component);
  } else if (CLASS_COMPONENT_KEY in component) {
    return patchClassComponent(component);
  } else {
    component.setup = () => ({
      /* Fake setup function */
    });
    return createProxyComponent(component);
  }
};
const withConfigTransport$1 = withConfigTransport;
const sizesConfig = {
  defaultSize: 48,
  sizes: {
    small: 32,
    medium: 48,
    large: 64
  }
};
const fontSizesConfig = {
  defaultSize: 1,
  sizes: {
    small: 0.75,
    medium: 1,
    large: 1.25
  }
};
const useSizeProps = {
  size: {
    type: [String, Number],
    default: "",
    validator: (size) => {
      return typeof size === "string" || typeof size === "number";
    }
  },
  sizesConfig: {
    type: Object,
    default: () => sizesConfig
  },
  fontSizesConfig: {
    type: Object,
    default: () => fontSizesConfig
  }
};
const fontRegex = /(?<fontSize>\d+)(?<extension>px|rem)/i;
const convertToRem = (px) => px / 16 - 0.5;
const useSize = (props, componentName = ((_a) => (_a = getCurrentInstance()) == null ? void 0 : _a.type.name)()) => {
  const { getGlobalConfig } = useGlobalConfig();
  const sizesConfigGlobal = computed(() => {
    var _a2, _b;
    return componentName ? (_b = (_a2 = getGlobalConfig().components) == null ? void 0 : _a2[componentName]) == null ? void 0 : _b.sizesConfig : void 0;
  });
  const sizeComputed = computed(() => {
    var _a2, _b, _c;
    const { defaultSize, sizes } = props.sizesConfig;
    const defaultSizeGlobal = (_a2 = sizesConfigGlobal.value) == null ? void 0 : _a2.defaultSize;
    if (!props.size) {
      return `${defaultSizeGlobal || defaultSize}px`;
    }
    if (typeof props.size === "string") {
      const sizeFromGlobalConfig = (_c = (_b = sizesConfigGlobal.value) == null ? void 0 : _b.sizes) == null ? void 0 : _c[props.size];
      const sizeFromProps = sizes[props.size];
      if (sizeFromGlobalConfig) {
        return `${sizeFromGlobalConfig}px`;
      }
      if (sizeFromProps) {
        return `${sizeFromProps}px`;
      }
      return props.size;
    }
    return `${props.size}px`;
  });
  const fontSizeInRem = computed(() => {
    const { defaultSize, sizes } = props.fontSizesConfig;
    if (!props.size) {
      return defaultSize;
    }
    if (typeof props.size === "string") {
      if (props.size in sizes) {
        return sizes[props.size];
      }
      const fontSizeParsed = props.size.match(fontRegex);
      if (!fontSizeParsed || !fontSizeParsed.groups) {
        throw new Error("Size prop should be either valid string or number");
      }
      const { extension, fontSize } = fontSizeParsed.groups;
      return extension === "rem" ? +fontSize : convertToRem(+fontSize);
    }
    return convertToRem(props.size);
  });
  const fontSizeComputed = computed(() => `${fontSizeInRem.value}rem`);
  return {
    sizeComputed,
    fontSizeComputed,
    fontSizeInRem
  };
};
const useComponentPresetProp = {
  preset: {
    type: String,
    default: void 0
  }
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  name: "VaIcon",
  props: {
    ...useSizeProps,
    ...useComponentPresetProp,
    name: { type: String, default: "" },
    tag: { type: String },
    component: { type: Object },
    color: { type: String },
    rotation: { type: [String, Number] },
    spin: { type: [String, Boolean] },
    flip: {
      type: String,
      default: "off",
      validator: (value) => ["off", "horizontal", "vertical", "both"].includes(value)
    }
  },
  setup(props, { attrs }) {
    const { getColor } = useColors();
    const { sizeComputed } = useSize(props);
    const { getIcon } = useIcon();
    const iconConfig = computed(() => getIcon(props.name));
    const computedTag = computed(() => props.component || props.tag || iconConfig.value.component || iconConfig.value.tag || "i");
    const computedAttrs = computed(() => ({ ...iconConfig.value.attrs, ...omit_1(attrs, ["class"]) }));
    const getSpinClass = (spin) => {
      if (spin === void 0 || spin === false) {
        return;
      }
      return spin === "counter-clockwise" ? "va-icon--spin-reverse" : "va-icon--spin";
    };
    const computedClass = computed(() => [
      iconConfig.value.class,
      getSpinClass(props.spin ?? iconConfig.value.spin)
    ]);
    const transformStyle = computed(() => {
      const rotation = props.rotation ? `rotate(${props.rotation}deg)` : "";
      const flipY = props.flip === "vertical" || props.flip === "both" ? -1 : 1;
      const flipX = props.flip === "horizontal" || props.flip === "both" ? -1 : 1;
      const scale = props.flip === "off" ? "" : `scale(${flipY}, ${flipX})`;
      return `${scale} ${rotation}`.trim();
    });
    const computedStyle = computed(() => ({
      transform: transformStyle.value,
      cursor: attrs.onClick ? "pointer" : null,
      color: props.color ? getColor(props.color, void 0, true) : iconConfig.value.color,
      fontSize: sizeComputed.value,
      height: sizeComputed.value,
      lineHeight: sizeComputed.value
    }));
    const tabindexComputed = computed(() => attrs.tabindex ?? -1);
    const ariaHiddenComputed = computed(() => attrs.role !== "button" || tabindexComputed.value < 0);
    return {
      iconConfig,
      computedTag,
      computedAttrs,
      computedClass,
      computedStyle,
      ariaHiddenComputed
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.computedTag), mergeProps({
    class: ["va-icon", _ctx.computedClass],
    style: _ctx.computedStyle,
    "aria-hidden": _ctx.ariaHiddenComputed,
    notranslate: ""
  }, _ctx.computedAttrs), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, () => [
        _ctx.iconConfig.content ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createTextVNode(toDisplayString(_ctx.iconConfig.content), 1)
        ], 64)) : createCommentVNode("", true)
      ])
    ]),
    _: 3
  }, 16, ["class", "style", "aria-hidden"]);
}
const VaIcon$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$4]]);
const useTextColor = (componentColor, isTransparent = false) => {
  const { props } = getCurrentInstance();
  const { getColor, getTextColor } = useColors();
  const textColorComputed = computed(() => {
    if (props.textColor) {
      return getColor(props.textColor);
    }
    const componentColorHex = getColor(unref(componentColor) || props.color);
    return unref(isTransparent) ? componentColorHex : getColor(getTextColor(componentColorHex));
  });
  return { textColorComputed };
};
const applyI18nTemplate = (key, values) => {
  if (!values) {
    return key;
  }
  Object.keys(values).forEach((valueKey) => {
    key = key.replace(`{${valueKey}}`, String(values[valueKey]));
  });
  return key;
};
const useTranslation = () => {
  const { globalConfig } = useGlobalConfig();
  const config = computed(() => globalConfig.value.i18n);
  return {
    /** Translate prop. Translate only if key has `$t:` prefix */
    tp: (key, values) => {
      if (!key) {
        return "";
      }
      if (key.startsWith("$t:")) {
        key = config.value[key.slice(3)] || key;
      }
      return applyI18nTemplate(key, values) || key;
    },
    t(key, values) {
      const translated = config.value[key];
      if (!translated) {
        warn$1(`${key} not found in VuesticUI i18n config`);
        return key;
      }
      return applyI18nTemplate(translated, values) || key;
    }
  };
};
const useTimer = () => {
  let timer;
  const start = (...args) => {
    timer = window.setTimeout(...args);
    return timer;
  };
  const clear = () => timer && window.clearTimeout(timer);
  return {
    start,
    clear
  };
};
const VaToastRenderer = /* @__PURE__ */ defineComponent({
  name: "VaToastRenderer",
  props: {
    render: { type: Function, required: true }
  },
  setup: (props) => () => props.render()
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  name: "VaToast",
  components: { VaIcon: VaIcon$1, VaToastRenderer },
  emits: ["on-click", "on-close"],
  props: {
    ...useComponentPresetProp,
    title: { type: String, default: "" },
    offsetY: { type: Number, default: 16 },
    offsetX: { type: Number, default: 16 },
    message: { type: [String, Function], default: "" },
    dangerouslyUseHtmlString: { type: Boolean, default: false },
    icon: { type: String, default: "close" },
    customClass: { type: String, default: "" },
    duration: { type: Number, default: 5e3 },
    color: { type: String, default: "" },
    closeable: { type: Boolean, default: true },
    onClose: { type: Function },
    onClick: { type: Function },
    multiLine: { type: Boolean, default: false },
    position: {
      type: String,
      default: "top-right",
      validator: (value) => ["top-right", "top-left", "bottom-right", "bottom-left"].includes(value)
    },
    render: { type: Function },
    ariaCloseLabel: { type: String, default: "$t:close" }
  },
  setup(props, { emit }) {
    const rootElement = shallowRef();
    const { getColor } = useColors();
    const { textColorComputed } = useTextColor();
    const visible = ref(false);
    const positionX = computed(() => {
      return props.position.includes("right") ? "right" : "left";
    });
    const positionY = computed(() => {
      return props.position.includes("top") ? "top" : "bottom";
    });
    const toastClasses = computed(() => [
      props.customClass,
      props.multiLine ? "va-toast--multiline" : ""
    ]);
    const toastStyles = computed(() => ({
      [positionY.value]: `${props.offsetY}px`,
      [positionX.value]: `${props.offsetX}px`,
      backgroundColor: getColor(props.color),
      color: textColorComputed.value
    }));
    const computedMessage = computed(() => typeof props.message === "function" ? props.message() : props.message);
    const destroyElement = () => {
      var _a, _b;
      (_a = rootElement.value) == null ? void 0 : _a.removeEventListener("transitionend", destroyElement);
      (_b = rootElement.value) == null ? void 0 : _b.remove();
    };
    const onToastClick = () => {
      if (typeof props.onClick === "function") {
        props.onClick();
      } else {
        emit("on-click");
      }
    };
    const onToastClose = () => {
      var _a;
      visible.value = false;
      (_a = rootElement.value) == null ? void 0 : _a.addEventListener("transitionend", destroyElement);
      if (typeof props.onClose === "function") {
        props.onClose();
      } else {
        emit("on-close");
      }
    };
    const timer = useTimer();
    const clearTimer = timer.clear;
    const startTimer = () => {
      if (props.duration > 0) {
        timer.start(() => visible.value && onToastClose(), props.duration);
      }
    };
    return {
      ...useTranslation(),
      visible,
      toastClasses,
      toastStyles,
      computedMessage,
      onToastClick,
      onToastClose,
      startTimer,
      clearTimer
    };
  }
});
const _hoisted_1$2 = ["role"];
const _hoisted_2$2 = { class: "va-toast__group" };
const _hoisted_3$1 = ["textContent"];
const _hoisted_4$1 = { class: "va-toast__content" };
const _hoisted_5$1 = ["innerHTML"];
const _hoisted_6$1 = ["textContent"];
const _hoisted_7$1 = {
  key: 1,
  class: "va-toast__content"
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VaToastRenderer = resolveComponent("VaToastRenderer");
  const _component_va_icon = resolveComponent("va-icon");
  return openBlock(), createBlock(Transition, { name: "va-toast-fade" }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        ref: "rootElement",
        role: _ctx.$props.closeable ? "alertdialog" : "alert",
        class: normalizeClass(["va-toast", _ctx.toastClasses]),
        style: normalizeStyle(_ctx.toastStyles),
        onMouseenter: _cache[0] || (_cache[0] = (...args) => _ctx.clearTimer && _ctx.clearTimer(...args)),
        onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.startTimer && _ctx.startTimer(...args)),
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onToastClick && _ctx.onToastClick(...args))
      }, [
        createElementVNode("div", _hoisted_2$2, [
          _ctx.$props.title ? (openBlock(), createElementBlock("h2", {
            key: 0,
            class: "va-toast__title",
            textContent: toDisplayString(_ctx.$props.title)
          }, null, 8, _hoisted_3$1)) : createCommentVNode("", true),
          withDirectives(createElementVNode("div", _hoisted_4$1, [
            _ctx.$props.dangerouslyUseHtmlString ? (openBlock(), createElementBlock("div", {
              key: 0,
              innerHTML: _ctx.computedMessage
            }, null, 8, _hoisted_5$1)) : (openBlock(), createElementBlock("p", {
              key: 1,
              textContent: toDisplayString(_ctx.computedMessage)
            }, null, 8, _hoisted_6$1))
          ], 512), [
            [vShow, _ctx.$props.message]
          ]),
          _ctx.$props.render ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
            createVNode(_component_VaToastRenderer, {
              render: _ctx.$props.render
            }, null, 8, ["render"])
          ])) : createCommentVNode("", true),
          _ctx.$props.closeable ? (openBlock(), createBlock(_component_va_icon, {
            key: 2,
            class: "va-toast__close-icon",
            role: "button",
            "aria-label": _ctx.tp(_ctx.$props.ariaCloseLabel),
            tabindex: "0",
            size: "small",
            name: _ctx.$props.icon,
            onClick: withModifiers(_ctx.onToastClose, ["stop"]),
            onKeydown: withKeys(withModifiers(_ctx.onToastClose, ["stop"]), ["enter"])
          }, null, 8, ["aria-label", "name", "onClick", "onKeydown"])) : createCommentVNode("", true)
        ])
      ], 46, _hoisted_1$2), [
        [vShow, _ctx.visible]
      ])
    ]),
    _: 1
  });
}
const _VaToast = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$3]]);
const VaToast = withConfigTransport$1(_VaToast);
const GAP = 5;
let seed = 1;
getGlobal().vaToastInstances = [];
const getTranslateValue = (item, position) => {
  if (item.el) {
    const direction = position.includes("bottom") ? -1 : 1;
    return (item.el.offsetHeight + GAP) * direction;
  }
  return 0;
};
const getNewTranslateValue = (transformY, redundantHeight, position) => {
  const direction = position.includes("bottom") ? -1 : 1;
  return parseInt(transformY, 10) - (redundantHeight + GAP) * direction;
};
const getNodeProps$1 = (vNode) => {
  var _a;
  return ((_a = vNode.component) == null ? void 0 : _a.props) || {};
};
const closeNotification = (targetInstance, destroyElementFn) => {
  var _a;
  if (!targetInstance) {
    return;
  }
  if (!getGlobal().vaToastInstances.length) {
    seed = 1;
    return;
  }
  const targetInstanceIndex = getGlobal().vaToastInstances.findIndex((instance) => instance === targetInstance);
  if (targetInstanceIndex < 0) {
    return;
  }
  const nodeProps = getNodeProps$1(targetInstance);
  const {
    offsetX: targetOffsetX,
    offsetY: targetOffsetY,
    position: targetPosition
  } = nodeProps;
  const redundantHeight = (_a = targetInstance.el) == null ? void 0 : _a.offsetHeight;
  destroyElementFn();
  getGlobal().vaToastInstances = getGlobal().vaToastInstances.reduce((acc, instance, index) => {
    if (instance === targetInstance) {
      return acc;
    }
    if (instance.component) {
      const { offsetX, offsetY, position } = getNodeProps$1(instance);
      const isNextInstance = index > targetInstanceIndex && targetOffsetX === offsetX && targetOffsetY === offsetY && targetPosition === position;
      if (isNextInstance && instance.el && redundantHeight) {
        const [_, transformY] = instance.el.style.transform.match(/[\d-]+(?=px)/g);
        const transformYNew = getNewTranslateValue(transformY, redundantHeight, position);
        instance.el.style.transform = `translate(0, ${transformYNew}px)`;
      }
    }
    return [...acc, instance];
  }, []);
  if (!getGlobal().vaToastInstances.length) {
    seed = 1;
  }
};
const destroy$1 = (el, node) => {
  if (el) {
    render(null, el);
    el.remove();
  }
  el = null;
};
const mount$1 = (component, {
  props,
  children,
  element,
  appContext
} = {}) => {
  let el = element;
  let vNode;
  const onClose = () => {
    closeNotification(vNode, () => destroy$1(el));
    if (props == null ? void 0 : props.onClose) {
      props.onClose();
    }
  };
  vNode = createVNode(component, { ...props, onClose }, children);
  if (appContext) {
    vNode.appContext = appContext;
  }
  if (el) {
    render(vNode, el);
  }
  return { vNode, el };
};
const closeAllNotifications = (appContext) => {
  if (!getGlobal().vaToastInstances.length) {
    seed = 1;
    return;
  }
  getGlobal().vaToastInstances.forEach((instance) => {
    if (appContext && instance.appContext !== appContext) {
      return;
    }
    getNodeProps$1(instance).onClose();
  });
};
const closeById = (id) => {
  const targetInstance = getGlobal().vaToastInstances.find((instance) => {
    var _a;
    return ((_a = instance.el) == null ? void 0 : _a.id) === id;
  });
  if (targetInstance) {
    const nodeProps = getNodeProps$1(targetInstance);
    nodeProps.onClose();
  }
};
const getToastOptions = (options) => {
  if (typeof options === "string") {
    return {
      message: options
    };
  }
  return options;
};
const createToastInstance = (customProps, appContext) => {
  const { vNode, el } = mount$1(VaToast, { appContext, props: getToastOptions(customProps) });
  const nodeProps = getNodeProps$1(vNode);
  if (el && vNode.el && nodeProps) {
    document.body.appendChild(el.childNodes[0]);
    const { offsetX, offsetY, position } = nodeProps;
    vNode.el.style.display = "flex";
    vNode.el.id = "notification_" + seed;
    let transformY = 0;
    getGlobal().vaToastInstances.filter((item) => {
      const {
        offsetX: itemOffsetX,
        offsetY: itemOffsetY,
        position: itemPosition
      } = getNodeProps$1(item);
      return itemOffsetX === offsetX && itemOffsetY === offsetY && position === itemPosition;
    }).forEach((item) => {
      transformY += getTranslateValue(item, position);
    });
    vNode.el.style.transform = `translate(0, ${transformY}px)`;
    seed += 1;
    getGlobal().vaToastInstances.push(vNode);
    return vNode.el.id;
  }
  return null;
};
const createVaToastPlugin = (app2) => ({
  /** Returns toast instance id */
  init(options) {
    return createToastInstance(options, app2 == null ? void 0 : app2._context);
  },
  close(id) {
    closeById(id);
  },
  closeAll(allApps = false) {
    closeAllNotifications(allApps ? void 0 : app2 == null ? void 0 : app2._context);
  }
});
const VaToastPlugin = defineVuesticPlugin(() => ({
  install(app2) {
    defineGlobalProperty(app2, "$vaToast", createVaToastPlugin(app2));
  }
}));
const vaDropdownPlugin = {
  closeDropdown() {
    let vm = this;
    while (vm = vm.$parent) {
      const name = vm.$options.name;
      if (name === "VaDropdown") {
        vm.hide();
        break;
      }
    }
  }
};
const VaDropdownPlugin = defineVuesticPlugin(() => ({
  install(app2) {
    defineGlobalProperty(app2, "$closeDropdown", vaDropdownPlugin.closeDropdown);
    defineGlobalProperty(app2, "$vaDropdown", vaDropdownPlugin);
  }
}));
const useButtonBackground = (colorComputed, isPressed, isHovered) => {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("`useButtonBackground` hook must be used only inside of setup function!");
  }
  const props = instance.props;
  const { getColor, getGradientBackground: getGradientBackground2 } = useColors();
  const backgroundColor = computed(() => {
    if (props.plain) {
      return "transparent";
    }
    return props.gradient ? getGradientBackground2(colorComputed.value) : colorComputed.value;
  });
  const hoveredBgState = computed(() => !props.plain && isHovered.value);
  const pressedBgState = computed(() => !props.plain && isPressed.value);
  const backgroundColorOpacity = computed(() => {
    if (pressedBgState.value && props.pressedBehavior === "opacity") {
      return props.pressedOpacity;
    }
    if (hoveredBgState.value && props.hoverBehavior === "opacity") {
      return props.hoverOpacity;
    }
    return props.backgroundOpacity;
  });
  const hoveredMaskState = computed(() => hoveredBgState.value && props.hoverBehavior === "mask");
  const pressedMaskState = computed(() => pressedBgState.value && props.pressedBehavior === "mask");
  const backgroundMaskOpacity = computed(() => {
    if (pressedMaskState.value) {
      return props.pressedOpacity;
    }
    if (hoveredMaskState.value) {
      return props.hoverOpacity;
    }
    return 0;
  });
  const backgroundMaskColor = computed(() => {
    if (pressedMaskState.value) {
      return getColor(props.pressedMaskColor);
    }
    if (hoveredMaskState.value) {
      return getColor(props.hoverMaskColor);
    }
    return "transparent";
  });
  return {
    backgroundColor,
    backgroundColorOpacity,
    backgroundMaskOpacity,
    backgroundMaskColor
  };
};
const useRouterLinkProps = {
  tag: { type: String, default: "span" },
  to: { type: [String, Object], default: void 0 },
  replace: { type: Boolean, default: void 0 },
  append: { type: Boolean, default: void 0 },
  exact: { type: Boolean, default: void 0 },
  activeClass: { type: String, default: void 0 },
  exactActiveClass: { type: String, default: void 0 },
  href: { type: String, default: void 0 },
  target: { type: String, default: void 0 },
  disabled: { type: Boolean, default: false }
};
const useRouterLink = (props) => {
  var _a;
  const globalProperties = computed(() => {
    var _a2;
    return (_a2 = getCurrentInstance()) == null ? void 0 : _a2.appContext.config.globalProperties;
  });
  const vueRouter = computed(() => {
    var _a2;
    return (_a2 = globalProperties.value) == null ? void 0 : _a2.$router;
  });
  const vueRoute = computed(() => {
    var _a2;
    return (_a2 = globalProperties.value) == null ? void 0 : _a2.$route;
  });
  const { getGlobalConfig } = useGlobalConfig();
  const routerComponent = getGlobalConfig().routerComponent;
  const isNuxt = !!((_a = globalProperties.value) == null ? void 0 : _a.$nuxt);
  const isNuxtLink = computed(() => !!(!props.disabled && props.to && isNuxt && routerComponent));
  const tagComputed = computed(() => {
    if (props.disabled) {
      return props.tag;
    }
    if (props.href && !props.to) {
      return "a";
    }
    if (isNuxtLink.value) {
      return routerComponent;
    }
    if (props.to) {
      return "router-link";
    }
    return props.tag || "div";
  });
  const isLinkTag = computed(() => isNuxtLink.value || ["a", "router-link"].includes(tagComputed.value));
  const linkAttributesComputed = computed(() => {
    if (!isLinkTag.value) {
      return {};
    }
    return tagComputed.value === "a" ? {
      target: props.target,
      href: hrefComputed.value
    } : {
      target: props.target,
      to: props.to,
      replace: props.replace,
      append: props.append,
      activeClass: props.activeClass,
      exact: props.exact,
      exactActiveClass: props.exactActiveClass
    };
  });
  const isActiveRouterLink = computed(() => {
    if (!vueRouter.value || !props.to) {
      return false;
    }
    const to = vueRouter.value.resolve(props.to).href;
    const currentHref = vueRouter.value.currentRoute.value.path;
    return to.replace("#", "") === currentHref.replace("#", "");
  });
  const hrefComputed = computed(() => {
    var _a2;
    return props.href || (props.to ? (_a2 = vueRouter.value) == null ? void 0 : _a2.resolve(props.to, vueRoute.value).href : void 0);
  });
  return {
    isLinkTag,
    tagComputed,
    hrefComputed,
    isActiveRouterLink,
    linkAttributesComputed
  };
};
const useButtonAttributes = (props) => {
  const { linkAttributesComputed, isLinkTag } = useRouterLink(props);
  const typeComputed = computed(() => isLinkTag.value ? void 0 : props.type);
  const buttonAttributesComputed = computed(() => {
    const disabledAttributes = {
      "aria-disabled": !!props.disabled,
      disabled: !!props.disabled
    };
    if (isLinkTag.value) {
      return disabledAttributes;
    }
    return {
      type: typeComputed.value,
      tabindex: props.loading || props.disabled ? -1 : 0,
      ...disabledAttributes
    };
  });
  return computed(() => ({ ...linkAttributesComputed.value, ...buttonAttributesComputed.value }));
};
const getOpacity = (opacity) => {
  {
    return opacity;
  }
};
const useButtonTextColor = (textColorComputed, colorComputed, isPressed, isHovered) => {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("`useButtonTextColor` hook must be used only inside of setup function!");
  }
  const props = instance.props;
  const { getColor, colorToRgba: colorToRgba2, getStateMaskGradientBackground: getStateMaskGradientBackground2 } = useColors();
  const plainColorStyles = computed(() => ({
    background: "transparent",
    color: textColorComputed.value,
    "-webkit-background-clip": "text",
    "background-clip": "text",
    opacity: getPlainTextOpacity.value
  }));
  const getStateColor = (maskColor, stateOpacity, stateBehavior) => {
    const maskStateColor = getColor(maskColor);
    let stateStyles;
    if (stateBehavior === "opacity") {
      stateStyles = { color: colorToRgba2(textColorComputed.value, stateOpacity) };
    } else {
      stateStyles = {
        background: getStateMaskGradientBackground2(colorComputed.value, maskStateColor, stateOpacity),
        color: stateOpacity < 1 ? colorToRgba2(textColorComputed.value, getOpacity(stateOpacity)) : maskStateColor
      };
    }
    return { ...plainColorStyles.value, ...stateStyles };
  };
  const hoverTextColorComputed = computed(() => {
    return getStateColor(props.hoverMaskColor, props.hoverOpacity, props.hoverBehavior);
  });
  const pressedTextColorComputed = computed(() => {
    return getStateColor(props.pressedMaskColor, props.pressedOpacity, props.pressedBehavior);
  });
  const getPlainTextOpacity = computed(() => {
    if (props.disabled) {
      return void 0;
    }
    if (props.textOpacity === 1 || isHovered.value && !isPressed.value) {
      return 1;
    }
    return isPressed.value ? 0.9 : props.textOpacity;
  });
  return computed(() => {
    const defaultColorStyles = {
      color: textColorComputed.value,
      background: "transparent"
    };
    props.plain && Object.assign(defaultColorStyles, plainColorStyles.value, { background: textColorComputed.value });
    if (!props.plain) {
      return defaultColorStyles;
    }
    if (isPressed.value) {
      return pressedTextColorComputed.value;
    }
    if (isHovered.value) {
      return hoverTextColorComputed.value;
    }
    return defaultColorStyles;
  });
};
const VaIcon = withConfigTransport$1(VaIcon$1);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  name: "VaProgressCircle",
  props: {
    ...useSizeProps,
    ...useComponentPresetProp,
    modelValue: { type: Number, default: 0 },
    indeterminate: { type: Boolean, default: false },
    thickness: { type: Number, default: 0.06 },
    color: { type: String, default: "primary" },
    ariaLabel: { type: String, default: "$t:progressState" }
  },
  setup(props) {
    const { getColor } = useColors();
    const { sizeComputed } = useSize(props);
    const cappedThickness = computed(() => clamp_1(props.thickness, 0, 1) / 2 * 100);
    const radius = computed(() => 20 - 20 * cappedThickness.value / 100);
    const dasharray = computed(() => 2 * Math.PI * radius.value);
    const dashoffset = computed(() => dasharray.value * (1 - clamp_1(props.modelValue, 0, 100) / 100));
    const colorComputed = computed(() => getColor(props.color, void 0, true));
    const { tp } = useTranslation();
    return {
      infoStyle: computed(() => ({ color: colorComputed.value })),
      rootStyle: computed(() => ({
        width: sizeComputed.value,
        height: sizeComputed.value
      })),
      rootClass: computed(() => ({
        "va-progress-circle--indeterminate": props.indeterminate
      })),
      ariaAttributesComputed: computed(() => ({
        role: "progressbar",
        "aria-label": tp(props.ariaLabel),
        "aria-valuenow": !props.indeterminate ? props.modelValue : void 0
      })),
      colorComputed,
      radius,
      dasharray,
      dashoffset,
      cappedThickness
    };
  }
});
const _hoisted_1$1 = {
  class: "va-progress-circle__wrapper",
  viewBox: "0 0 40 40"
};
const _hoisted_2$1 = ["r", "stroke", "stroke-width", "stroke-dasharray", "stroke-dashoffset"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    class: ["va-progress-circle", _ctx.rootClass],
    style: _ctx.rootStyle
  }, _ctx.ariaAttributesComputed), [
    (openBlock(), createElementBlock("svg", _hoisted_1$1, [
      createElementVNode("circle", {
        class: "va-progress-circle__overlay",
        cx: "50%",
        cy: "50%",
        r: _ctx.radius,
        fill: "none",
        stroke: _ctx.colorComputed,
        "stroke-width": _ctx.cappedThickness + "%",
        "stroke-dasharray": _ctx.dasharray,
        "stroke-dashoffset": _ctx.dashoffset
      }, null, 8, _hoisted_2$1)
    ])),
    _ctx.$slots.default ? (openBlock(), createElementBlock("div", {
      key: 0,
      style: normalizeStyle(_ctx.infoStyle),
      class: "va-progress-circle__info"
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 4)) : createCommentVNode("", true)
  ], 16);
}
const _VaProgressCircle = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$2]]);
const VaProgressCircle = withConfigTransport$1(_VaProgressCircle);
const useHoverStyleProps = {
  hoverBehavior: {
    type: String,
    default: "mask",
    validator: (value) => ["opacity", "mask"].includes(value)
  },
  hoverOpacity: { type: Number, default: 0.15 },
  hoverMaskColor: { type: String, default: "textInverted" }
};
const usePressedStyleProps = {
  pressedBehavior: {
    type: String,
    default: "mask",
    validator: (value) => ["opacity", "mask"].includes(value)
  },
  pressedOpacity: { type: Number, default: 0.13 },
  pressedMaskColor: { type: String, default: "textPrimary" }
};
const useLoadingProps = {
  loading: { type: Boolean, default: false }
};
const unwrapEl = (el) => {
  if (!el) {
    return;
  }
  if ("$el" in el) {
    return el.$el;
  }
  return el;
};
const focusElement = (el) => {
  if (!el) {
    return;
  }
  el.focus();
  el.dispatchEvent(new Event("focus", { bubbles: true }));
};
const blurElement = (el) => {
  if (!el) {
    return;
  }
  el.blur();
  el.dispatchEvent(new Event("blur", { bubbles: true }));
};
function useFocus(el, emit) {
  const isFocused = ref(false);
  const onFocus = (e) => {
    isFocused.value = true;
    emit == null ? void 0 : emit("focus", e);
  };
  const onBlur = (e) => {
    isFocused.value = false;
    emit == null ? void 0 : emit("blur", e);
  };
  const focus = () => {
    if (!(el == null ? void 0 : el.value)) {
      return;
    }
    focusElement(unwrapEl(el == null ? void 0 : el.value));
  };
  const blur = () => {
    if (!(el == null ? void 0 : el.value)) {
      return;
    }
    blurElement(unwrapEl(el == null ? void 0 : el.value));
  };
  return {
    isFocused,
    onFocus,
    onBlur,
    focus,
    blur
  };
}
function useHover(el, disabled) {
  const isHovered = ref(false);
  const onMouseEnter = () => {
    isHovered.value = true;
  };
  const onMouseLeave = () => {
    isHovered.value = false;
  };
  disabled && watch(disabled, (v) => {
    if (v) {
      isHovered.value = false;
    }
  });
  return { isHovered, onMouseEnter, onMouseLeave };
}
function usePressed(el) {
  const isPressed = ref(false);
  const onMouseDown = () => {
    isPressed.value = true;
  };
  const onMouseUp = () => {
    isPressed.value = false;
  };
  return { isPressed, onMouseDown, onMouseUp };
}
const checkSlotChildrenDeep = (v, initial = true) => {
  var _a;
  if (!v || initial && (!isFunction_1(v) || !((_a = v()) == null ? void 0 : _a.length))) {
    return false;
  }
  const slotData = initial ? v() : v;
  if (Array.isArray(slotData)) {
    return slotData.some((el) => {
      return Array.isArray(el.children) ? checkSlotChildrenDeep(el.children, false) : el.children || el.props;
    });
  }
  return !!slotData.children;
};
const useSlotPassed = (name = "default") => {
  const { slots } = getCurrentInstance();
  return computed(() => checkSlotChildrenDeep(slots[name]));
};
const useBem = (prefix, modifiers) => {
  if (isDev && !prefix) {
    console.warn('You must pass the @param "prefix" to the useBem hook!');
  }
  const modifiersList = computed(() => isFunction_1(modifiers) ? modifiers() : unref(modifiers));
  const computedBemClassesObject = computed(() => {
    return Object.entries(unref(modifiersList)).reduce((classesObj, [modifierName, value]) => {
      if (value) {
        classesObj[`${prefix}--${kebabCase_1(modifierName)}`] = true;
      }
      return classesObj;
    }, {});
  });
  const computedBemClassesArray = computed(() => Object.keys(computedBemClassesObject.value));
  const computedBemClassesString = computed(() => computedBemClassesArray.value.join(" "));
  return new Proxy({}, {
    ownKeys() {
      return Reflect.ownKeys(computedBemClassesObject.value);
    },
    getOwnPropertyDescriptor(_, key) {
      return Reflect.getOwnPropertyDescriptor(computedBemClassesObject.value, key);
    },
    get(_, key, receiver) {
      switch (key) {
        case "asArray":
          return computedBemClassesArray;
        case "asString":
          return computedBemClassesString;
        case "asObject":
          return computedBemClassesObject;
        default:
          return Reflect.get(computedBemClassesObject.value, key, receiver);
      }
    }
  });
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  name: "VaButton",
  components: { VaIcon, VaProgressCircle },
  props: {
    ...useComponentPresetProp,
    ...useSizeProps,
    ...useHoverStyleProps,
    ...usePressedStyleProps,
    ...useLoadingProps,
    ...useRouterLinkProps,
    tag: { type: String, default: "button" },
    type: { type: String, default: "button" },
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    color: { type: String, default: "primary" },
    textColor: { type: String, default: "" },
    textOpacity: { type: Number, default: 1 },
    backgroundOpacity: { type: Number, default: 1 },
    borderColor: { type: String, default: "" },
    // only for filled bg state
    gradient: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    size: {
      type: String,
      default: "medium",
      validator: (v) => ["small", "medium", "large"].includes(v)
    },
    icon: { type: String, default: "" },
    iconRight: { type: String, default: "" },
    iconColor: { type: String, default: "" }
  },
  setup(props) {
    const { getColor } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const { sizeComputed } = useSize(props);
    const loaderSizeComputed = computed(() => {
      const size = /([0-9]*)(px)/.exec(sizeComputed.value);
      return size ? `${+size[1] / 2}${size[2]}` : sizeComputed.value;
    });
    const { tagComputed } = useRouterLink(props);
    const attributesComputed = useButtonAttributes(props);
    const { disabled } = toRefs(props);
    const button = shallowRef();
    const { focus, blur } = useFocus(button);
    const { isHovered } = useHover(button, disabled);
    const { isPressed } = usePressed();
    const iconColorComputed = computed(() => props.iconColor ? getColor(props.iconColor) : textColorComputed.value);
    const iconAttributesComputed = computed(() => ({
      color: iconColorComputed.value
    }));
    const wrapperClassComputed = computed(() => ({ "va-button__content--loading": props.loading }));
    const isSlotContentPassed = useSlotPassed();
    const isOneIcon = computed(() => !!(props.iconRight && !props.icon || !props.iconRight && props.icon));
    const isOnlyIcon = computed(() => !isSlotContentPassed.value && isOneIcon.value);
    const computedClass = useBem("va-button", () => ({
      ...pick_1(props, ["disabled", "block", "loading", "round", "plain"]),
      small: props.size === "small",
      normal: !props.size || props.size === "medium",
      large: props.size === "large",
      opacity: props.textOpacity < 1,
      bordered: !!props.borderColor,
      iconOnly: isOnlyIcon.value,
      leftIcon: !isOnlyIcon.value && !!props.icon && !props.iconRight,
      rightIcon: !isOnlyIcon.value && !props.icon && !!props.iconRight
    }));
    const isTransparentBg = computed(() => props.plain || props.backgroundOpacity < 0.5);
    const { textColorComputed } = useTextColor(colorComputed, isTransparentBg);
    const {
      backgroundColor,
      backgroundColorOpacity,
      backgroundMaskOpacity,
      backgroundMaskColor
    } = useButtonBackground(colorComputed, isPressed, isHovered);
    const contentColorComputed = useButtonTextColor(textColorComputed, colorComputed, isPressed, isHovered);
    const computedStyle = computed(() => ({
      borderColor: props.borderColor ? getColor(props.borderColor) : "transparent",
      ...contentColorComputed.value
    }));
    const publicMethods = { focus, blur };
    return {
      button,
      tagComputed,
      computedClass,
      computedStyle,
      textColorComputed,
      loaderSizeComputed,
      attributesComputed,
      wrapperClassComputed,
      iconAttributesComputed,
      backgroundColor,
      backgroundMaskColor,
      backgroundMaskOpacity,
      backgroundColorOpacity,
      ...publicMethods
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_va_icon = resolveComponent("va-icon");
  const _component_va_progress_circle = resolveComponent("va-progress-circle");
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tagComputed), mergeProps({
    ref: "button",
    class: ["va-button", _ctx.computedClass],
    style: typeof _ctx.computedStyle === "object" ? Array.isArray(_ctx.computedStyle) ? [..._ctx.computedStyle, `--va-0-background-color: ${String(_ctx.backgroundColor)};--va-1-background-color-opacity: ${String(_ctx.backgroundColorOpacity)};--va-2-background-mask-color: ${String(_ctx.backgroundMaskColor)};--va-3-background-mask-opacity: ${String(_ctx.backgroundMaskOpacity)}`] : { ..._ctx.computedStyle, "--va-0-background-color": String(_ctx.backgroundColor), "--va-1-background-color-opacity": String(_ctx.backgroundColorOpacity), "--va-2-background-mask-color": String(_ctx.backgroundMaskColor), "--va-3-background-mask-opacity": String(_ctx.backgroundMaskOpacity) } : _ctx.computedStyle + `;--va-0-background-color: ${String(_ctx.backgroundColor)};--va-1-background-color-opacity: ${String(_ctx.backgroundColorOpacity)};--va-2-background-mask-color: ${String(_ctx.backgroundMaskColor)};--va-3-background-mask-opacity: ${String(_ctx.backgroundMaskOpacity)}`
  }, _ctx.attributesComputed), {
    default: withCtx(() => [
      createElementVNode("span", {
        class: normalizeClass(["va-button__content", _ctx.wrapperClassComputed])
      }, [
        renderSlot(_ctx.$slots, "prepend", normalizeProps(guardReactiveProps({ icon: _ctx.icon, iconAttributes: _ctx.iconAttributesComputed })), () => [
          _ctx.icon ? (openBlock(), createBlock(_component_va_icon, mergeProps({
            key: 0,
            class: "va-button__left-icon",
            name: _ctx.icon
          }, _ctx.iconAttributesComputed), null, 16, ["name"])) : createCommentVNode("", true)
        ]),
        renderSlot(_ctx.$slots, "default"),
        renderSlot(_ctx.$slots, "append", normalizeProps(guardReactiveProps({ icon: _ctx.iconRight, iconAttributes: _ctx.iconAttributesComputed })), () => [
          _ctx.iconRight ? (openBlock(), createBlock(_component_va_icon, mergeProps({
            key: 0,
            class: "va-button__right-icon",
            name: _ctx.iconRight
          }, _ctx.iconAttributesComputed), null, 16, ["name"])) : createCommentVNode("", true)
        ])
      ], 2),
      _ctx.loading ? renderSlot(_ctx.$slots, "loading", normalizeProps(mergeProps({ key: 0 }, {
        size: _ctx.loaderSizeComputed,
        color: _ctx.textColorComputed
      })), () => [
        createVNode(_component_va_progress_circle, {
          class: "va-button__loader",
          size: _ctx.loaderSizeComputed,
          color: _ctx.textColorComputed,
          thickness: 0.15,
          indeterminate: ""
        }, null, 8, ["size", "color", "thickness"])
      ]) : createCommentVNode("", true)
    ]),
    _: 3
  }, 16, ["class", "style"]);
}
const _VaButton = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$1]]);
const VaButton = withConfigTransport$1(_VaButton);
const useCurrentComponentId = () => {
  const instance = getCurrentInstance();
  return `${instance.appContext.app._uid}_${instance.uid}`;
};
const openedModals = [];
const useBlur = (shouldBlur, isModalShown) => {
  const id = useCurrentComponentId();
  const document2 = useDocument();
  const blur = () => {
    var _a;
    if (openedModals.includes(id)) {
      return;
    }
    openedModals.push(id);
    (_a = document2.value) == null ? void 0 : _a.body.classList.add("va-modal-overlay-background--blurred");
  };
  const removeBlur = () => {
    var _a;
    const modalIndex = openedModals.indexOf(id);
    if (modalIndex === -1) {
      return;
    }
    openedModals.splice(modalIndex, 1);
    if (openedModals.length === 0) {
      (_a = document2.value) == null ? void 0 : _a.body.classList.remove("va-modal-overlay-background--blurred");
    }
  };
  watchEffect(() => {
    if (!shouldBlur.value) {
      return;
    }
    if (isModalShown.value) {
      blur();
    } else {
      removeBlur();
    }
  });
};
const useStatefulProps = {
  stateful: { type: Boolean, default: false },
  modelValue: { type: void 0 }
};
const useStatefulEmits = ["update:modelValue"];
const useStateful = (props, emit, key = "modelValue", options = {}) => {
  const { defaultValue, eventName } = options;
  const event = eventName || `update:${key.toString()}`;
  const valueState = ref(defaultValue === void 0 ? props[key] : defaultValue);
  let unwatchModelValue;
  const watchModelValue = () => {
    unwatchModelValue = watch(() => props[key], (modelValue) => {
      valueState.value = modelValue;
    });
  };
  watch(() => props.stateful, (stateful) => {
    stateful ? watchModelValue() : unwatchModelValue == null ? void 0 : unwatchModelValue();
  }, { immediate: true });
  const valueComputed = computed({
    get: () => {
      if (props.stateful) {
        return valueState.value;
      }
      return props[key];
    },
    set: (value) => {
      if (props.stateful) {
        valueState.value = value;
      }
      emit(event, value);
    }
  });
  return { valueComputed };
};
const FOCUSABLE_ELEMENTS_SELECTOR = ":where(a, button, input, textarea, select):not([disabled]), *[tabindex]";
let trapInEl = null;
const useTrapFocus = () => {
  const document2 = useDocument();
  const window2 = useWindow();
  let focusableElements = [];
  let firstFocusableElement = null;
  let lastFocusableElement = null;
  let isFocusTrapped = false;
  const focusFirstElement = () => {
    firstFocusableElement == null ? void 0 : firstFocusableElement.focus();
  };
  const focusLastElement = () => {
    lastFocusableElement == null ? void 0 : lastFocusableElement.focus();
  };
  const onKeydown = (evt) => {
    var _a, _b;
    const isTabPressed = evt.code === "Tab";
    const isShiftPressed = evt.shiftKey;
    if (!isTabPressed) {
      return;
    }
    if (!isFocusTrapped) {
      isFocusTrapped = true;
      evt.preventDefault();
      isShiftPressed ? focusLastElement() : focusFirstElement();
      return;
    }
    if (((_a = document2.value) == null ? void 0 : _a.activeElement) === lastFocusableElement && !isShiftPressed) {
      evt.preventDefault();
      focusFirstElement();
      return;
    }
    if (((_b = document2.value) == null ? void 0 : _b.activeElement) === firstFocusableElement && isShiftPressed) {
      evt.preventDefault();
      focusLastElement();
    }
  };
  const trapFocusIn = (el) => {
    trapInEl = el;
    freeFocus();
    trapFocus();
  };
  const trapFocus = () => {
    var _a;
    if (!trapInEl) {
      return;
    }
    focusableElements = Array.from(trapInEl.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR));
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
    (_a = window2.value) == null ? void 0 : _a.addEventListener("keydown", onKeydown);
  };
  const freeFocus = () => {
    var _a;
    focusableElements = [];
    firstFocusableElement = null;
    lastFocusableElement = null;
    isFocusTrapped = false;
    (_a = window2.value) == null ? void 0 : _a.removeEventListener("keydown", onKeydown);
  };
  return {
    trapFocus,
    freeFocus,
    trapFocusIn
  };
};
const modalsStack = shallowReactive([]);
const useModalLevel = () => {
  const modalId = uniqueId$1();
  const modalLevel = computed(
    () => modalsStack.findIndex(({ id }) => id === modalId)
  );
  const registerModal = () => {
    if (modalLevel.value !== -1) {
      return;
    }
    modalsStack.push({
      id: modalId
    });
  };
  const unregisterModal = () => {
    if (modalLevel.value === -1) {
      return;
    }
    modalsStack.splice(modalLevel.value, 1);
  };
  const isTopLevelModal = computed(
    () => modalLevel.value !== -1 && modalLevel.value === modalsStack.length - 1
  );
  const isLowestLevelModal = computed(
    () => modalLevel.value === 0
  );
  const isMoreThenOneModalOpen = computed(() => modalsStack.length > 1);
  return {
    modalId,
    modalLevel,
    registerModal,
    unregisterModal,
    isTopLevelModal,
    isLowestLevelModal,
    isMoreThenOneModalOpen
  };
};
const ModalElement = /* @__PURE__ */ defineComponent({
  name: "ModalElement",
  inheritAttrs: false,
  props: {
    ...useComponentPresetProp,
    isTransition: { type: Boolean, default: true }
  },
  setup: (props, { slots, attrs }) => () => {
    var _a;
    return props.isTransition ? h(Transition, { ...attrs }, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots, attrs);
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  name: "VaModal",
  inheritAttrs: false,
  components: { VaButton, VaIcon, ModalElement },
  emits: [
    ...useStatefulEmits,
    "cancel",
    "ok",
    "before-open",
    "open",
    "before-close",
    "close",
    "click-outside"
  ],
  props: {
    ...useStatefulProps,
    modelValue: { type: Boolean, default: false },
    attachElement: { type: String, default: "body" },
    allowBodyScroll: { type: Boolean, default: false },
    disableAttachment: { type: Boolean, default: false },
    title: { type: String, default: "" },
    message: { type: String, default: "" },
    okText: { type: String, default: "$t:ok" },
    cancelText: { type: String, default: "$t:cancel" },
    hideDefaultActions: { type: Boolean, default: false },
    fullscreen: { type: Boolean, default: false },
    mobileFullscreen: { type: Boolean, default: true },
    noDismiss: { type: Boolean, default: false },
    noOutsideDismiss: { type: Boolean, default: false },
    noEscDismiss: { type: Boolean, default: false },
    maxWidth: { type: String, default: "" },
    maxHeight: { type: String, default: "" },
    anchorClass: { type: String },
    size: {
      type: String,
      default: "medium",
      validator: (value) => ["medium", "small", "large"].includes(value)
    },
    fixedLayout: { type: Boolean, default: false },
    withoutTransitions: { type: Boolean, default: false },
    overlay: { type: Boolean, default: true },
    overlayOpacity: { type: [Number, String], default: 0.6 },
    blur: { type: Boolean, default: false },
    zIndex: { type: [Number, String], default: void 0 },
    backgroundColor: { type: String, default: "background-secondary" },
    noPadding: { type: Boolean, default: false },
    beforeClose: { type: Function },
    ariaCloseLabel: { type: String, default: "$t:close" }
  },
  setup(props, { emit }) {
    const rootElement = shallowRef();
    const modalDialog = shallowRef();
    const { trapFocusIn, freeFocus } = useTrapFocus();
    const {
      registerModal,
      unregisterModal,
      isTopLevelModal,
      isLowestLevelModal
    } = useModalLevel();
    const { getColor } = useColors();
    const { textColorComputed } = useTextColor(toRef(props, "backgroundColor"));
    const { valueComputed } = useStateful(props, emit);
    const computedClass = computed(() => ({
      "va-modal--fullscreen": props.fullscreen,
      "va-modal--mobile-fullscreen": props.mobileFullscreen,
      "va-modal--fixed-layout": props.fixedLayout,
      "va-modal--no-padding": props.noPadding,
      [`va-modal--size-${props.size}`]: props.size !== "medium"
    }));
    const computedModalContainerStyle = computed(() => ({ "z-index": props.zIndex }));
    const computedDialogStyle = computed(() => ({
      maxWidth: props.maxWidth,
      maxHeight: props.maxHeight,
      color: textColorComputed.value,
      background: getColor(props.backgroundColor)
    }));
    const computedOverlayStyles = computed(() => {
      if (!props.overlay || !isLowestLevelModal.value) {
        return;
      }
      return {
        "background-color": `rgba(0, 0, 0, ${props.overlayOpacity})`,
        "z-index": props.zIndex && Number(props.zIndex) - 1
      };
    });
    const show = () => {
      valueComputed.value = true;
    };
    const hide = (cb) => {
      const _hide = () => {
        valueComputed.value = false;
        cb == null ? void 0 : cb();
      };
      props.beforeClose ? props.beforeClose(_hide) : _hide();
    };
    const toggle = () => {
      valueComputed.value = !valueComputed.value;
    };
    const cancel = () => {
      hide(() => emit("cancel"));
    };
    const ok = () => {
      hide(() => emit("ok"));
    };
    const trapFocusInModal = () => {
      nextTick(() => {
        if (modalDialog.value) {
          trapFocusIn(modalDialog.value);
        }
      });
    };
    const onBeforeEnterTransition = (el) => emit("before-open", el);
    const onAfterEnterTransition = (el) => emit("open", el);
    const onBeforeLeaveTransition = (el) => emit("before-close", el);
    const onAfterLeaveTransition = (el) => emit("close", el);
    const listenKeyUp = (e) => {
      const hideModal = () => {
        if (e.code === "Escape" && !props.noEscDismiss && !props.noDismiss && isTopLevelModal.value) {
          cancel();
        }
      };
      setTimeout(hideModal);
    };
    const window2 = useWindow();
    watchEffect(() => {
      var _a, _b;
      if (valueComputed.value) {
        (_a = window2.value) == null ? void 0 : _a.addEventListener("keyup", listenKeyUp);
      } else {
        (_b = window2.value) == null ? void 0 : _b.removeEventListener("keyup", listenKeyUp);
      }
    });
    useBlur(toRef(props, "blur"), valueComputed);
    const documentRef = useDocument();
    const setBodyOverflow = (overflow) => {
      if (!documentRef.value || props.allowBodyScroll) {
        return;
      }
      documentRef.value.body.style.overflow = overflow;
    };
    watch(valueComputed, (newValueComputed) => {
      if (newValueComputed) {
        registerModal();
        setBodyOverflow("hidden");
        return;
      }
      if (isLowestLevelModal.value) {
        freeFocus();
        setBodyOverflow("");
      }
      unregisterModal();
    });
    watch(isTopLevelModal, (newIsTopLevelModal) => {
      if (newIsTopLevelModal) {
        trapFocusInModal();
      }
    });
    const publicMethods = {
      ...useTranslation(),
      show,
      hide,
      toggle,
      cancel,
      ok,
      onBeforeEnterTransition,
      onAfterEnterTransition,
      onBeforeLeaveTransition,
      onAfterLeaveTransition,
      listenKeyUp
    };
    return {
      getColor,
      rootElement,
      modalDialog,
      valueComputed,
      computedClass,
      computedDialogStyle,
      computedModalContainerStyle,
      computedOverlayStyles,
      ...publicMethods
    };
  }
});
const _hoisted_1 = ["aria-labelledby"];
const _hoisted_2 = {
  key: 0,
  class: "va-modal__anchor"
};
const _hoisted_3 = {
  key: 0,
  class: "va-modal"
};
const _hoisted_4 = { key: 0 };
const _hoisted_5 = {
  key: 1,
  class: "va-modal__header"
};
const _hoisted_6 = {
  key: 2,
  class: "va-modal__message"
};
const _hoisted_7 = {
  key: 3,
  class: "va-modal__message"
};
const _hoisted_8 = {
  key: 4,
  class: "va-modal__footer"
};
const _hoisted_9 = {
  key: 5,
  class: "va-modal__footer"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_va_icon = resolveComponent("va-icon");
  const _component_va_button = resolveComponent("va-button");
  const _component_modal_element = resolveComponent("modal-element");
  return openBlock(), createElementBlock("div", {
    ref: "rootElement",
    class: normalizeClass(["va-modal-entry", _ctx.$props.anchorClass]),
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": _ctx.title
  }, [
    _ctx.$slots.anchor ? (openBlock(), createElementBlock("div", _hoisted_2, [
      renderSlot(_ctx.$slots, "anchor", normalizeProps(guardReactiveProps({ show: _ctx.show, hide: _ctx.hide, toggle: _ctx.toggle })))
    ])) : createCommentVNode("", true),
    (openBlock(), createBlock(Teleport, {
      to: _ctx.attachElement,
      disabled: _ctx.$props.disableAttachment
    }, [
      createVNode(_component_modal_element, mergeProps({
        name: "va-modal",
        isTransition: !_ctx.$props.withoutTransitions,
        appear: "",
        duration: 300
      }, _ctx.$attrs, {
        onBeforeEnter: _ctx.onBeforeEnterTransition,
        onAfterEnter: _ctx.onAfterEnterTransition,
        onBeforeLeave: _ctx.onBeforeLeaveTransition,
        onAfterLeave: _ctx.onAfterLeaveTransition
      }), {
        default: withCtx(() => [
          _ctx.valueComputed ? (openBlock(), createElementBlock("div", _hoisted_3, [
            _ctx.$props.overlay ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "va-modal__overlay",
              style: normalizeStyle(_ctx.computedOverlayStyles)
            }, null, 4)) : createCommentVNode("", true),
            createElementVNode("div", {
              class: "va-modal__container",
              style: normalizeStyle(_ctx.computedModalContainerStyle)
            }, [
              createElementVNode("div", {
                ref: "modalDialog",
                class: normalizeClass(["va-modal__dialog", _ctx.computedClass]),
                style: normalizeStyle(_ctx.computedDialogStyle)
              }, [
                _ctx.$props.fullscreen ? (openBlock(), createBlock(_component_va_icon, {
                  key: 0,
                  name: "va-close",
                  class: "va-modal__close",
                  role: "button",
                  "aria-label": _ctx.tp(_ctx.$props.ariaCloseLabel),
                  tabindex: "0",
                  onClick: _ctx.cancel,
                  onKeydown: [
                    withKeys(_ctx.cancel, ["space"]),
                    withKeys(_ctx.cancel, ["enter"])
                  ]
                }, null, 8, ["aria-label", "onClick", "onKeydown"])) : createCommentVNode("", true),
                createElementVNode("div", {
                  class: "va-modal__inner",
                  style: normalizeStyle({ maxWidth: _ctx.$props.maxWidth, maxHeight: _ctx.$props.maxHeight })
                }, [
                  _ctx.$slots.content ? (openBlock(), createElementBlock("div", _hoisted_4, [
                    renderSlot(_ctx.$slots, "content", normalizeProps(guardReactiveProps({ cancel: _ctx.cancel, ok: _ctx.ok })))
                  ])) : createCommentVNode("", true),
                  !_ctx.$slots.content ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    _ctx.title ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: "va-modal__title",
                      style: normalizeStyle({ color: _ctx.getColor("primary") })
                    }, toDisplayString(_ctx.$props.title), 5)) : createCommentVNode("", true),
                    _ctx.$slots.header ? (openBlock(), createElementBlock("div", _hoisted_5, [
                      renderSlot(_ctx.$slots, "header")
                    ])) : createCommentVNode("", true),
                    _ctx.$props.message ? (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(_ctx.$props.message), 1)) : createCommentVNode("", true),
                    _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_7, [
                      renderSlot(_ctx.$slots, "default")
                    ])) : createCommentVNode("", true),
                    (_ctx.$props.cancelText || _ctx.$props.okText) && !_ctx.$props.hideDefaultActions ? (openBlock(), createElementBlock("div", _hoisted_8, [
                      _ctx.$props.cancelText ? (openBlock(), createBlock(_component_va_button, {
                        key: 0,
                        preset: "secondary",
                        color: "secondary",
                        class: "va-modal__default-cancel-button",
                        onClick: _ctx.cancel
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.tp(_ctx.$props.cancelText)), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true),
                      createVNode(_component_va_button, { onClick: _ctx.ok }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.tp(_ctx.$props.okText)), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])) : createCommentVNode("", true),
                    _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_9, [
                      renderSlot(_ctx.$slots, "footer")
                    ])) : createCommentVNode("", true)
                  ], 64)) : createCommentVNode("", true)
                ], 4)
              ], 6)
            ], 4)
          ])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["isTransition", "onBeforeEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave"])
    ], 8, ["to", "disabled"]))
  ], 10, _hoisted_1);
}
const _VaModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render]]);
const VaModal = withConfigTransport$1(_VaModal);
const getNodeProps = (vNode) => {
  var _a;
  return ((_a = vNode.component) == null ? void 0 : _a.props) || {};
};
const destroy = (el, vNode) => {
  if (el) {
    render(null, el);
    el.remove();
  }
  el = null;
};
const mount = (component, { props, appContext } = {}) => {
  const el = document == null ? void 0 : document.createElement("div");
  let vNode;
  const onClose = (event) => {
    var _a;
    (_a = props == null ? void 0 : props.onClose) == null ? void 0 : _a.call(props, event);
    destroy(el);
  };
  const onUpdateModelValue = (value) => {
    var _a;
    (_a = props == null ? void 0 : props["onUpdate:modelValue"]) == null ? void 0 : _a.call(props, value);
    if ((props == null ? void 0 : props.withoutTransitions) && !value) {
      nextTick(() => {
        destroy(el);
      });
    }
  };
  vNode = h(component, {
    ...props,
    stateful: (props == null ? void 0 : props.stateful) ?? true,
    modelValue: true,
    onClose,
    "onUpdate:modelValue": onUpdateModelValue
  });
  if (appContext) {
    vNode.appContext = appContext;
  }
  if (el) {
    render(vNode, el);
  }
  return { vNode, el };
};
const getModalOptions = (options) => typeof options === "string" ? { message: options } : options;
const createModalInstance = (customProps, appContext) => {
  const { vNode, el } = mount(VaModal, { appContext, props: getModalOptions(customProps) });
  if (el && vNode.el && getNodeProps(vNode)) {
    document.body.appendChild(el.childNodes[0]);
  }
  return vNode;
};
const createVaModalPlugin = (app2) => ({
  init(options) {
    return createModalInstance(options, app2 == null ? void 0 : app2._context);
  }
});
const VaModalPlugin = defineVuesticPlugin(() => ({
  install(app2) {
    defineGlobalProperty(app2, "$vaModal", createVaModalPlugin(app2));
  }
}));
const isPluginFabric = (plugin) => typeof plugin === "function";
const usePlugin = (app2, plugin, ...options) => {
  if (isPluginFabric(plugin)) {
    app2.use(plugin(...options));
  } else {
    app2.use(plugin);
  }
};
const ESSENTIAL_PLUGIN_NAMES = ["GlobalConfigPlugin", "ColorConfigPlugin"];
const createVuesticEssential = defineVuesticPlugin((options = {}) => ({
  install(app2) {
    const { config, components: components2, plugins: plugins2 } = options;
    setCurrentApp(app2);
    usePlugin(app2, (plugins2 == null ? void 0 : plugins2.GlobalConfigPlugin) || GlobalConfigPlugin, config);
    usePlugin(app2, (plugins2 == null ? void 0 : plugins2.CachePlugin) || CachePlugin);
    usePlugin(app2, (plugins2 == null ? void 0 : plugins2.ColorConfigPlugin) || ColorConfigPlugin, config);
    if (plugins2) {
      Object.entries(plugins2).forEach(([name, plugin]) => {
        if (ESSENTIAL_PLUGIN_NAMES.includes(name)) {
          return;
        }
        usePlugin(app2, plugin);
      });
    }
    if (components2) {
      Object.entries(components2).forEach(([name, component]) => {
        app2.component(name, component);
      });
    }
    setCurrentApp(null);
  }
}));
function getGlobalProperty(app2, key) {
  return app2.config.globalProperties[key];
}
const plugin_FRmGFsEaPh = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const { vueApp: app2 } = nuxtApp;
  const { config } = JSON.parse(`{"config":{"colors":{"variables":{"primary":"#6366f1","secondary":"#8b5cf6"}},"components":{"VaButton":{}}},"css":["smart-helpers","typography"],"fonts":true}`);
  const userConfig = config;
  app2.use(createVuesticEssential({
    config: { ...userConfig, routerComponent: markRaw(__nuxt_component_0) },
    plugins: {
      BreakpointConfigPlugin,
      VaDropdownPlugin,
      VaToastPlugin,
      VaModalPlugin,
      ColorsClassesPlugin
    },
    components: {}
  }));
  const colorConfig = getGlobalProperty(app2, "$vaColorConfig");
  if (colorConfig) {
    useHead(computed(() => {
      return {
        htmlAttrs: {
          style: colorConfig.renderCSSVariables()
        }
      };
    }));
  }
  const colorsClasses = getGlobalProperty(app2, "$vaColorsClasses");
  if (colorsClasses) {
    useHead(computed(() => {
      return {
        htmlAttrs: {
          style: colorsClasses.renderColorHelpers()
        }
      };
    }));
  }
});
const composition_jPqDWTOxqW = /* @__PURE__ */ defineNuxtPlugin(() => {
});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var sharedExports = {};
var shared$1 = {
  get exports() {
    return sharedExports;
  },
  set exports(v) {
    sharedExports = v;
  }
};
var shared_prod = {};
/*!
  * shared v9.3.0-beta.17
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
var hasRequiredShared_prod;
function requireShared_prod() {
  if (hasRequiredShared_prod)
    return shared_prod;
  hasRequiredShared_prod = 1;
  const inBrowser = false;
  let mark;
  let measure;
  const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
  function format(message, ...args) {
    if (args.length === 1 && isObject2(args[0])) {
      args = args[0];
    }
    if (!args || !args.hasOwnProperty) {
      args = {};
    }
    return message.replace(RE_ARGS, (match, identifier) => {
      return args.hasOwnProperty(identifier) ? args[identifier] : "";
    });
  }
  const makeSymbol2 = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
  const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
  const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
  const isNumber = (val) => typeof val === "number" && isFinite(val);
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
  const isEmptyObject = (val) => isPlainObject2(val) && Object.keys(val).length === 0;
  function warn2(msg, err) {
    if (typeof console !== "undefined") {
      console.warn(`[intlify] ` + msg);
      if (err) {
        console.warn(err.stack);
      }
    }
  }
  const assign2 = Object.assign;
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : {});
  };
  function escapeHtml(rawText) {
    return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  const hasOwnProperty2 = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty2.call(obj, key);
  }
  const isArray2 = Array.isArray;
  const isFunction2 = (val) => typeof val === "function";
  const isString2 = (val) => typeof val === "string";
  const isBoolean = (val) => typeof val === "boolean";
  const isSymbol2 = (val) => typeof val === "symbol";
  const isObject2 = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return isObject2(val) && isFunction2(val.then) && isFunction2(val.catch);
  };
  const objectToString2 = Object.prototype.toString;
  const toTypeString = (value) => objectToString2.call(value);
  const isPlainObject2 = (val) => toTypeString(val) === "[object Object]";
  const toDisplayString2 = (val) => {
    return val == null ? "" : isArray2(val) || isPlainObject2(val) && val.toString === objectToString2 ? JSON.stringify(val, null, 2) : String(val);
  };
  const RANGE = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (count >= start) {
        for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
          if (j < 0 || j >= lines.length)
            continue;
          const line = j + 1;
          res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j]}`);
          const lineLength = lines[j].length;
          if (j === i) {
            const pad = start - (count - lineLength) + 1;
            const length = Math.max(1, end > count ? lineLength - pad : end - start);
            res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
          } else if (j > i) {
            if (end > count) {
              const length = Math.max(Math.min(end - count, lineLength), 1);
              res.push(`   |  ` + "^".repeat(length));
            }
            count += lineLength + 1;
          }
        }
        break;
      }
    }
    return res.join("\n");
  }
  function createEmitter() {
    const events = /* @__PURE__ */ new Map();
    const emitter = {
      events,
      on(event, handler) {
        const handlers = events.get(event);
        const added = handlers && handlers.push(handler);
        if (!added) {
          events.set(event, [handler]);
        }
      },
      off(event, handler) {
        const handlers = events.get(event);
        if (handlers) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        }
      },
      emit(event, payload) {
        (events.get(event) || []).slice().map((handler) => handler(payload));
        (events.get("*") || []).slice().map((handler) => handler(event, payload));
      }
    };
    return emitter;
  }
  shared_prod.assign = assign2;
  shared_prod.createEmitter = createEmitter;
  shared_prod.escapeHtml = escapeHtml;
  shared_prod.format = format;
  shared_prod.friendlyJSONstringify = friendlyJSONstringify;
  shared_prod.generateCodeFrame = generateCodeFrame;
  shared_prod.generateFormatCacheKey = generateFormatCacheKey;
  shared_prod.getGlobalThis = getGlobalThis;
  shared_prod.hasOwn = hasOwn;
  shared_prod.inBrowser = inBrowser;
  shared_prod.isArray = isArray2;
  shared_prod.isBoolean = isBoolean;
  shared_prod.isDate = isDate;
  shared_prod.isEmptyObject = isEmptyObject;
  shared_prod.isFunction = isFunction2;
  shared_prod.isNumber = isNumber;
  shared_prod.isObject = isObject2;
  shared_prod.isPlainObject = isPlainObject2;
  shared_prod.isPromise = isPromise;
  shared_prod.isRegExp = isRegExp;
  shared_prod.isString = isString2;
  shared_prod.isSymbol = isSymbol2;
  shared_prod.makeSymbol = makeSymbol2;
  shared_prod.mark = mark;
  shared_prod.measure = measure;
  shared_prod.objectToString = objectToString2;
  shared_prod.toDisplayString = toDisplayString2;
  shared_prod.toTypeString = toTypeString;
  shared_prod.warn = warn2;
  return shared_prod;
}
(function(module) {
  {
    module.exports = requireShared_prod();
  }
})(shared$1);
/*!
  * vue-i18n v9.3.0-beta.17
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION$1 = "9.3.0-beta.17";
function initFeatureFlags$1() {
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    sharedExports.getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
}
CoreWarnCodes.__EXTEND_POINT__;
let code$2 = CompileErrorCodes.__EXTEND_POINT__;
const inc$2 = () => ++code$2;
const I18nErrorCodes$1 = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: code$2,
  // legacy module errors
  INVALID_ARGUMENT: inc$2(),
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: inc$2(),
  NOT_INSLALLED: inc$2(),
  NOT_AVAILABLE_IN_LEGACY_MODE: inc$2(),
  // directive module errors
  REQUIRED_VALUE: inc$2(),
  INVALID_VALUE: inc$2(),
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc$2(),
  NOT_INSLALLED_WITH_PROVIDE: inc$2(),
  // unexpected error
  UNEXPECTED_ERROR: inc$2(),
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc$2(),
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: inc$2(),
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc$2(),
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc$2(),
  // for enhancement
  __EXTEND_POINT__: inc$2()
  // 29
};
function createI18nError$1(code2, ...args) {
  return createCompileError(code2, null, void 0);
}
const TranslateVNodeSymbol$1 = /* @__PURE__ */ sharedExports.makeSymbol("__translateVNode");
const DatetimePartsSymbol$1 = /* @__PURE__ */ sharedExports.makeSymbol("__datetimeParts");
const NumberPartsSymbol$1 = /* @__PURE__ */ sharedExports.makeSymbol("__numberParts");
const SetPluralRulesSymbol$1 = sharedExports.makeSymbol("__setPluralRules");
sharedExports.makeSymbol("__intlifyMeta");
const InejctWithOption$1 = /* @__PURE__ */ sharedExports.makeSymbol("__injectWithOption");
function handleFlatJson$1(obj) {
  if (!sharedExports.isObject(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!sharedExports.hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (sharedExports.isObject(obj[key])) {
        handleFlatJson$1(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        currentObj = currentObj[subKeys[i]];
      }
      currentObj[subKeys[lastIndex]] = obj[key];
      delete obj[key];
      if (sharedExports.isObject(currentObj[subKeys[lastIndex]])) {
        handleFlatJson$1(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages$1(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = sharedExports.isPlainObject(messages) ? messages : sharedExports.isArray(__i18n) ? {} : { [locale]: {} };
  if (sharedExports.isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy$2(resource, ret[locale2]);
        } else {
          deepCopy$2(resource, ret);
        }
      } else {
        sharedExports.isString(custom) && deepCopy$2(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (sharedExports.hasOwn(ret, key)) {
        handleFlatJson$1(ret[key]);
      }
    }
  }
  return ret;
}
const isNotObjectOrIsArray$1 = (val) => !sharedExports.isObject(val) || sharedExports.isArray(val);
function deepCopy$2(src, des) {
  if (isNotObjectOrIsArray$1(src) || isNotObjectOrIsArray$1(des)) {
    throw createI18nError$1(I18nErrorCodes$1.INVALID_VALUE);
  }
  for (const key in src) {
    if (sharedExports.hasOwn(src, key)) {
      if (isNotObjectOrIsArray$1(src[key]) || isNotObjectOrIsArray$1(des[key])) {
        des[key] = src[key];
      } else {
        deepCopy$2(src[key], des[key]);
      }
    }
  }
}
function getComponentOptions$1(instance) {
  return instance.type;
}
function adjustI18nResources$1(global2, options, componentOptions) {
  let messages = sharedExports.isObject(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages$1(globalThis.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      global2.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (sharedExports.isObject(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (sharedExports.isObject(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode$1(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META$1 = "__INTLIFY_META__";
let composerID$1 = 0;
function defineCoreMissingHandler$1(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo$1 = () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions$1(instance)[DEVTOOLS_META$1]) ? { [DEVTOOLS_META$1]: meta } : null;
};
function createComposer$1(options = {}, VueI18nLegacy) {
  const { __root } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = sharedExports.isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : sharedExports.isString(options.locale) ? options.locale : DEFAULT_LOCALE$1
  );
  const _fallbackLocale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : sharedExports.isString(options.fallbackLocale) || sharedExports.isArray(options.fallbackLocale) || sharedExports.isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = ref(getLocaleMessages$1(_locale.value, options));
  const _datetimeFormats = ref(sharedExports.isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(sharedExports.isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : sharedExports.isBoolean(options.missingWarn) || sharedExports.isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : sharedExports.isBoolean(options.fallbackWarn) || sharedExports.isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : sharedExports.isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = sharedExports.isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = sharedExports.isFunction(options.missing) ? defineCoreMissingHandler$1(options.missing) : null;
  let _postTranslation = sharedExports.isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : sharedExports.isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : sharedExports.isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION$1,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = sharedExports.isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = sharedExports.isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return sharedExports.isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler$1(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    if (__INTLIFY_PROD_DEVTOOLS__) {
      try {
        setAdditionalMeta(getMetaInfo$1());
        if (!_isGlobal) {
          _context.fallbackContext = __root ? getFallbackContext() : void 0;
        }
        ret = fn(_context);
      } finally {
        setAdditionalMeta(null);
        if (!_isGlobal) {
          _context.fallbackContext = void 0;
        }
      }
    } else {
      ret = fn(_context);
    }
    if (sharedExports.isNumber(ret) && ret === NOT_REOSLVED) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError$1(I18nErrorCodes$1.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => sharedExports.isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !sharedExports.isObject(arg3)) {
      throw createI18nError$1(I18nErrorCodes$1.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, sharedExports.assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => sharedExports.isString(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => sharedExports.isString(val));
  }
  function normalize(values) {
    return values.map((val) => sharedExports.isString(val) || sharedExports.isNumber(val) || sharedExports.isBoolean(val) ? createTextNode$1(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[TranslateVNodeSymbol$1](...args),
      (key) => [createTextNode$1(key)],
      (val) => sharedExports.isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[NumberPartsSymbol$1](...args),
      () => [],
      (val) => sharedExports.isString(val) || sharedExports.isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[DatetimePartsSymbol$1](...args),
      () => [],
      (val) => sharedExports.isString(val) || sharedExports.isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    const targetLocale = sharedExports.isString(locale2) ? locale2 : _locale.value;
    const message = getLocaleMessage(targetLocale);
    return _context.messageResolver(message, key) !== null;
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage2(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    deepCopy$2(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format) {
    _datetimeFormats.value[locale2] = format;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format);
  }
  function mergeDateTimeFormat(locale2, format) {
    _datetimeFormats.value[locale2] = sharedExports.assign(_datetimeFormats.value[locale2] || {}, format);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format) {
    _numberFormats.value[locale2] = format;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format);
  }
  function mergeNumberFormat(locale2, format) {
    _numberFormats.value[locale2] = sharedExports.assign(_numberFormats.value[locale2] || {}, format);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format);
  }
  composerID$1++;
  if (__root && sharedExports.inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID$1,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage: mergeLocaleMessage2,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol$1]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOption$1] = options.__injectWithOption;
    composer[TranslateVNodeSymbol$1] = translateVNode;
    composer[DatetimePartsSymbol$1] = datetimeParts;
    composer[NumberPartsSymbol$1] = numberParts;
  }
  return composer;
}
const baseFormatProps$1 = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponetI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg$1({ slots }, keys2) {
  if (keys2.length === 1 && keys2[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        // prettier-ignore
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys2.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag$1(tag) {
  return Fragment;
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-t",
  props: sharedExports.assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (val) => sharedExports.isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps$1),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n$1({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys2 = Object.keys(slots).filter((key) => key !== "_");
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = sharedExports.isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg$1(context, keys2);
      const children = i18n[TranslateVNodeSymbol$1](props.keypath, arg, options);
      const assignedAttrs = sharedExports.assign({}, attrs);
      const tag = sharedExports.isString(props.tag) || sharedExports.isObject(props.tag) ? props.tag : getFragmentableTag$1();
      return h(tag, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode$1(target) {
  return sharedExports.isArray(target) && !sharedExports.isString(target[0]);
}
function renderFormatter$1(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (sharedExports.isString(props.format)) {
      options.key = props.format;
    } else if (sharedExports.isObject(props.format)) {
      if (sharedExports.isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? sharedExports.assign({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (sharedExports.isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode$1(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (sharedExports.isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = sharedExports.assign({}, attrs);
    const tag = sharedExports.isString(props.tag) || sharedExports.isObject(props.tag) ? props.tag : getFragmentableTag$1();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-n",
  props: sharedExports.assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps$1),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n$1({
      useScope: "parent",
      __useComponent: true
    });
    return renderFormatter$1(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol$1](...args)
    ));
  }
});
const NumberFormat = NumberFormatImpl;
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-d",
  props: sharedExports.assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps$1),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n$1({
      useScope: "parent",
      __useComponent: true
    });
    return renderFormatter$1(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol$1](...args)
    ));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
function getComposer$2(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError$1(I18nErrorCodes$1.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    if (sharedExports.inBrowser && i18n.global === composer) {
      el.__i18nWatcher = watch(composer.locale, () => {
        binding.instance && binding.instance.$forceUpdate();
      });
    }
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (sharedExports.inBrowser && el.__i18nWatcher) {
      el.__i18nWatcher();
      el.__i18nWatcher = void 0;
      delete el.__i18nWatcher;
    }
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (sharedExports.isString(value)) {
    return { path: value };
  } else if (sharedExports.isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError$1(I18nErrorCodes$1.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError$1(I18nErrorCodes$1.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (sharedExports.isString(locale)) {
    options.locale = locale;
  }
  if (sharedExports.isNumber(choice)) {
    options.plural = choice;
  }
  if (sharedExports.isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app2, i18n, ...options) {
  const pluginOptions = sharedExports.isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = sharedExports.isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    app2.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
    app2.component(NumberFormat.name, NumberFormat);
    app2.component(DatetimeFormat.name, DatetimeFormat);
  }
  {
    app2.directive("t", vTDirective(i18n));
  }
}
const I18nInjectionKey$1 = /* @__PURE__ */ sharedExports.makeSymbol("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = sharedExports.isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = /* @__PURE__ */ sharedExports.makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    const i18n = {
      // mode
      get mode() {
        return "composition";
      },
      // allowComposition
      get allowComposition() {
        return __allowComposition;
      },
      // install plugin
      async install(app2, ...options2) {
        app2.__VUE_I18N_SYMBOL__ = symbol;
        app2.provide(app2.__VUE_I18N_SYMBOL__, i18n);
        if (sharedExports.isPlainObject(options2[0])) {
          const opts = options2[0];
          i18n.__composerExtend = opts.__composerExtend;
          i18n.__vueI18nExtend = opts.__vueI18nExtend;
        }
        if (__globalInjection) {
          injectGlobalFields(app2, i18n.global);
        }
        {
          apply(app2, i18n, ...options2);
        }
        const unmountApp = app2.unmount;
        app2.unmount = () => {
          i18n.dispose();
          unmountApp();
        };
      },
      // global accessor
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      // @internal
      __instances,
      // @internal
      __getInstance,
      // @internal
      __setInstance,
      // @internal
      __deleteInstance
    };
    return i18n;
  }
}
function useI18n$1(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError$1(I18nErrorCodes$1.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError$1(I18nErrorCodes$1.NOT_INSLALLED);
  }
  const i18n = getI18nInstance$1(instance);
  const global2 = getGlobalComposer$1(i18n);
  const componentOptions = getComponentOptions$1(instance);
  const scope = getScope$1(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources$1(global2, options, componentOptions);
    return global2;
  }
  if (scope === "parent") {
    let composer2 = getComposer$3(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = global2;
    }
    return composer2;
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = sharedExports.assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (global2) {
      composerOptions.__root = global2;
    }
    composer = createComposer$1(composerOptions);
    if (i18nInternal.__composerExtend) {
      i18nInternal.__composerExtend(composer);
    }
    setupLifeCycle$1(i18nInternal, instance);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = scope.run(() => createComposer$1(options));
    if (obj == null) {
      throw createI18nError$1(I18nErrorCodes$1.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance$1(instance) {
  {
    const i18n = inject$1(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey$1);
    if (!i18n) {
      throw createI18nError$1(!instance.isCE ? I18nErrorCodes$1.UNEXPECTED_ERROR : I18nErrorCodes$1.NOT_INSLALLED_WITH_PROVIDE);
    }
    return i18n;
  }
}
function getScope$1(options, componentOptions) {
  return sharedExports.isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer$1(i18n) {
  return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer$3(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = target.parent;
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function setupLifeCycle$1(i18n, target, composer) {
  {
    onUnmounted(() => {
      i18n.__deleteInstance(target);
    }, target);
  }
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app2, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError$1(I18nErrorCodes$1.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app2.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError$1(I18nErrorCodes$1.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app2.config.globalProperties, `$${method}`, desc);
  });
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
{
  initFeatureFlags$1();
}
if (__INTLIFY_PROD_DEVTOOLS__) {
  const target = sharedExports.getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
/*!
  * vue-i18n v9.3.0-beta.17
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.3.0-beta.17";
function initFeatureFlags() {
  if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
    sharedExports.getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
  }
}
CoreWarnCodes.__EXTEND_POINT__;
let code = CompileErrorCodes.__EXTEND_POINT__;
const inc = () => ++code;
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: code,
  // legacy module errors
  INVALID_ARGUMENT: inc(),
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: inc(),
  NOT_INSLALLED: inc(),
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  // directive module errors
  REQUIRED_VALUE: inc(),
  INVALID_VALUE: inc(),
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  NOT_INSLALLED_WITH_PROVIDE: inc(),
  // unexpected error
  UNEXPECTED_ERROR: inc(),
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  // for enhancement
  __EXTEND_POINT__: inc()
  // 29
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, void 0);
}
const TranslateVNodeSymbol = /* @__PURE__ */ sharedExports.makeSymbol("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ sharedExports.makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ sharedExports.makeSymbol("__numberParts");
const SetPluralRulesSymbol = sharedExports.makeSymbol("__setPluralRules");
sharedExports.makeSymbol("__intlifyMeta");
const InejctWithOption = /* @__PURE__ */ sharedExports.makeSymbol("__injectWithOption");
function handleFlatJson(obj) {
  if (!sharedExports.isObject(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!sharedExports.hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (sharedExports.isObject(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        currentObj = currentObj[subKeys[i]];
      }
      currentObj[subKeys[lastIndex]] = obj[key];
      delete obj[key];
      if (sharedExports.isObject(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = sharedExports.isPlainObject(messages) ? messages : sharedExports.isArray(__i18n) ? {} : { [locale]: {} };
  if (sharedExports.isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy$1(resource, ret[locale2]);
        } else {
          deepCopy$1(resource, ret);
        }
      } else {
        sharedExports.isString(custom) && deepCopy$1(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (sharedExports.hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
const isNotObjectOrIsArray = (val) => !sharedExports.isObject(val) || sharedExports.isArray(val);
function deepCopy$1(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
  for (const key in src) {
    if (sharedExports.hasOwn(src, key)) {
      if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
        des[key] = src[key];
      } else {
        deepCopy$1(src[key], des[key]);
      }
    }
  }
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(global2, options, componentOptions) {
  let messages = sharedExports.isObject(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(globalThis.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      global2.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (sharedExports.isObject(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (sharedExports.isObject(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo = () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = sharedExports.isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : sharedExports.isString(options.locale) ? options.locale : DEFAULT_LOCALE$1
  );
  const _fallbackLocale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : sharedExports.isString(options.fallbackLocale) || sharedExports.isArray(options.fallbackLocale) || sharedExports.isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(sharedExports.isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(sharedExports.isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : sharedExports.isBoolean(options.missingWarn) || sharedExports.isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : sharedExports.isBoolean(options.fallbackWarn) || sharedExports.isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : sharedExports.isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = sharedExports.isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = sharedExports.isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = sharedExports.isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : sharedExports.isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : sharedExports.isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = sharedExports.isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = sharedExports.isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return sharedExports.isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    if (__INTLIFY_PROD_DEVTOOLS__) {
      try {
        setAdditionalMeta(getMetaInfo());
        if (!_isGlobal) {
          _context.fallbackContext = __root ? getFallbackContext() : void 0;
        }
        ret = fn(_context);
      } finally {
        setAdditionalMeta(null);
        if (!_isGlobal) {
          _context.fallbackContext = void 0;
        }
      }
    } else {
      ret = fn(_context);
    }
    if (sharedExports.isNumber(ret) && ret === NOT_REOSLVED) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => sharedExports.isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !sharedExports.isObject(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, sharedExports.assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => sharedExports.isString(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => sharedExports.isString(val));
  }
  function normalize(values) {
    return values.map((val) => sharedExports.isString(val) || sharedExports.isNumber(val) || sharedExports.isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[TranslateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => sharedExports.isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[NumberPartsSymbol](...args),
      () => [],
      (val) => sharedExports.isString(val) || sharedExports.isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[DatetimePartsSymbol](...args),
      () => [],
      (val) => sharedExports.isString(val) || sharedExports.isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    const targetLocale = sharedExports.isString(locale2) ? locale2 : _locale.value;
    const message = getLocaleMessage(targetLocale);
    return _context.messageResolver(message, key) !== null;
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage2(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    deepCopy$1(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format) {
    _datetimeFormats.value[locale2] = format;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format);
  }
  function mergeDateTimeFormat(locale2, format) {
    _datetimeFormats.value[locale2] = sharedExports.assign(_datetimeFormats.value[locale2] || {}, format);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format) {
    _numberFormats.value[locale2] = format;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format);
  }
  function mergeNumberFormat(locale2, format) {
    _numberFormats.value[locale2] = sharedExports.assign(_numberFormats.value[locale2] || {}, format);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format);
  }
  composerID++;
  if (__root && sharedExports.inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage: mergeLocaleMessage2,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOption] = options.__injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponetI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys2) {
  if (keys2.length === 1 && keys2[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        // prettier-ignore
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys2.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag(tag) {
  return Fragment;
}
/* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-t",
  props: sharedExports.assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (val) => sharedExports.isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys2 = Object.keys(slots).filter((key) => key !== "_");
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = sharedExports.isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys2);
      const children = i18n[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = sharedExports.assign({}, attrs);
      const tag = sharedExports.isString(props.tag) || sharedExports.isObject(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
});
function isVNode(target) {
  return sharedExports.isArray(target) && !sharedExports.isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (sharedExports.isString(props.format)) {
      options.key = props.format;
    } else if (sharedExports.isObject(props.format)) {
      if (sharedExports.isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? sharedExports.assign({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (sharedExports.isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (sharedExports.isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = sharedExports.assign({}, attrs);
    const tag = sharedExports.isString(props.tag) || sharedExports.isObject(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
/* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-n",
  props: sharedExports.assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: "parent",
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol](...args)
    ));
  }
});
/* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-d",
  props: sharedExports.assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: "parent",
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol](...args)
    ));
  }
});
const I18nInjectionKey = /* @__PURE__ */ sharedExports.makeSymbol("global-vue-i18n");
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSLALLED);
  }
  const i18n = getI18nInstance(instance);
  const global2 = getGlobalComposer(i18n);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(global2, options, componentOptions);
    return global2;
  }
  if (scope === "parent") {
    let composer2 = getComposer$1(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = global2;
    }
    return composer2;
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = sharedExports.assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (global2) {
      composerOptions.__root = global2;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      i18nInternal.__composerExtend(composer);
    }
    setupLifeCycle(i18nInternal, instance);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function getI18nInstance(instance) {
  {
    const i18n = inject$1(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSLALLED_WITH_PROVIDE);
    }
    return i18n;
  }
}
function getScope(options, componentOptions) {
  return sharedExports.isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
  return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer$1(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = target.parent;
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function setupLifeCycle(i18n, target, composer) {
  {
    onUnmounted(() => {
      i18n.__deleteInstance(target);
    }, target);
  }
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
{
  initFeatureFlags();
}
if (__INTLIFY_PROD_DEVTOOLS__) {
  const target = sharedExports.getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const STRATEGIES = {
  PREFIX: "prefix",
  PREFIX_EXCEPT_DEFAULT: "prefix_except_default",
  PREFIX_AND_DEFAULT: "prefix_and_default",
  NO_PREFIX: "no_prefix"
};
const DEFAULT_LOCALE = "";
const DEFAULT_STRATEGY = STRATEGIES.PREFIX_EXCEPT_DEFAULT;
const DEFAULT_TRAILING_SLASH = false;
const DEFAULT_ROUTES_NAME_SEPARATOR = "___";
const DEFAULT_LOCALE_ROUTE_NAME_SUFFIX = "default";
const DEFAULT_DETECTION_DIRECTION = "ltr";
const DEFAULT_BASE_URL = "";
const DEFAULT_DYNAMIC_PARAMS_KEY = "";
/*!
  * shared v9.3.0-beta.16
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const assign = Object.assign;
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const TRAILING_SLASH_RE = /\/$|\/\?/;
function hasTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s] = input.split("?");
  return (s0.slice(0, -1) || "/") + (s.length > 0 ? `?${s.join("?")}` : "");
}
function withTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s] = input.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "");
}
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[vue-i18n-routing] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
function getNormalizedLocales(locales) {
  locales = locales || [];
  const normalized = [];
  for (const locale of locales) {
    if (isString(locale)) {
      normalized.push({ code: locale });
    } else {
      normalized.push(locale);
    }
  }
  return normalized;
}
function isI18nInstance(i18n) {
  return i18n != null && "global" in i18n && "mode" in i18n;
}
function isComposer(target) {
  return target != null && !("__composer" in target) && isRef(target.locale);
}
function isVueI18n(target) {
  return target != null && "__composer" in target;
}
function isExportedGlobalComposer(target) {
  return target != null && !("__composer" in target) && !isRef(target.locale);
}
function isLegacyVueI18n$1(target) {
  return target != null && ("__VUE_I18N_BRIDGE__" in target || "_sync" in target);
}
function getComposer(i18n) {
  return isI18nInstance(i18n) ? isComposer(i18n.global) ? i18n.global : i18n.global.__composer : isVueI18n(i18n) ? i18n.__composer : i18n;
}
function getLocale(i18n) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  return isComposer(target) ? target.locale.value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target) ? target.locale : target.locale;
}
function getLocales(i18n) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  return isComposer(target) ? target.locales.value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target) ? target.locales : target.locales;
}
function getLocaleCodes(i18n) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  return isComposer(target) ? target.localeCodes.value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target) ? target.localeCodes : target.localeCodes;
}
function setLocale(i18n, locale) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  if (isComposer(target)) {
    {
      target.locale.value = locale;
    }
  } else if (isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n$1(target)) {
    target.locale = locale;
  } else {
    throw new Error("TODO:");
  }
}
function getRouteName(routeName) {
  return isString(routeName) ? routeName : isSymbol(routeName) ? routeName.toString() : "(null)";
}
function getLocaleRouteName(routeName, locale, {
  defaultLocale,
  strategy,
  routesNameSeparator,
  defaultLocaleRouteNameSuffix
}) {
  let name = getRouteName(routeName) + (strategy === "no_prefix" ? "" : routesNameSeparator + locale);
  if (locale === defaultLocale && strategy === "prefix_and_default") {
    name += routesNameSeparator + defaultLocaleRouteNameSuffix;
  }
  return name;
}
function resolveBaseUrl(baseUrl, context) {
  if (isFunction(baseUrl)) {
    return baseUrl(context);
  }
  return baseUrl;
}
function matchBrowserLocale(locales, browserLocales) {
  const matchedLocales = [];
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales.find((l) => l.iso.toLowerCase() === browserCode.toLowerCase());
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index / browserLocales.length });
      break;
    }
  }
  for (const [index, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split("-")[0].toLowerCase();
    const matchedLocale = locales.find((l) => l.iso.split("-")[0].toLowerCase() === languageCode);
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index / browserLocales.length });
      break;
    }
  }
  return matchedLocales;
}
const DefaultBrowserLocaleMatcher = matchBrowserLocale;
function compareBrowserLocale(a, b) {
  if (a.score === b.score) {
    return b.code.length - a.code.length;
  }
  return b.score - a.score;
}
const DefaultBrowerLocaleComparer = compareBrowserLocale;
function findBrowserLocale(locales, browserLocales, { matcher = DefaultBrowserLocaleMatcher, comparer = DefaultBrowerLocaleComparer } = {}) {
  const normalizedLocales = [];
  for (const l of locales) {
    const { code: code2 } = l;
    const iso = l.iso || code2;
    normalizedLocales.push({ code: code2, iso });
  }
  const matchedLocales = matcher(normalizedLocales, browserLocales);
  if (matchedLocales.length > 1) {
    matchedLocales.sort(comparer);
  }
  return matchedLocales.length ? matchedLocales[0].code : "";
}
function proxyVueInstance(target) {
  return function() {
    return Reflect.apply(
      target,
      {
        getRouteBaseName: this.getRouteBaseName,
        localePath: this.localePath,
        localeRoute: this.localeRoute,
        localeLocation: this.localeLocation,
        resolveRoute: this.resolveRoute,
        switchLocalePath: this.switchLocalePath,
        localeHead: this.localeHead,
        i18n: this.$i18n,
        route: this.$route,
        router: this.$router
      },
      arguments
    );
  };
}
function extendI18n(i18n, {
  locales = [],
  localeCodes: localeCodes2 = [],
  baseUrl = DEFAULT_BASE_URL,
  hooks = {},
  context = {}
} = {}) {
  const scope = effectScope();
  const orgInstall = i18n.install;
  i18n.install = (vue, ...options) => {
    const pluginOptions = isPluginOptions(options[0]) ? assign({}, options[0]) : { inject: true };
    if (pluginOptions.inject == null) {
      pluginOptions.inject = true;
    }
    const orgComposerExtend = pluginOptions.__composerExtend;
    pluginOptions.__composerExtend = (c) => {
      const g = getComposer(i18n);
      c.locales = computed(() => g.locales.value);
      c.localeCodes = computed(() => g.localeCodes.value);
      c.baseUrl = computed(() => g.baseUrl.value);
      if (isFunction(orgComposerExtend)) {
        Reflect.apply(orgComposerExtend, pluginOptions, [c]);
      }
    };
    if (isVueI18n(i18n.global)) {
      const orgVueI18nExtend = pluginOptions.__vueI18nExtend;
      pluginOptions.__vueI18nExtend = (vueI18n) => {
        extendVueI18n(vueI18n, hooks.onExtendVueI18n);
        if (isFunction(orgVueI18nExtend)) {
          Reflect.apply(orgVueI18nExtend, pluginOptions, [vueI18n]);
        }
      };
    }
    options[0] = pluginOptions;
    Reflect.apply(orgInstall, i18n, [vue, ...options]);
    const composer = getComposer(i18n);
    scope.run(() => extendComposer(composer, { locales, localeCodes: localeCodes2, baseUrl, hooks, context }));
    if (isVueI18n(i18n.global)) {
      extendVueI18n(i18n.global, hooks.onExtendVueI18n);
    }
    const app2 = vue;
    const exported = i18n.mode === "composition" ? app2.config.globalProperties.$i18n : null;
    if (exported) {
      extendExportedGlobal(exported, composer, hooks.onExtendExportedGlobal);
    }
    if (pluginOptions.inject) {
      vue.mixin({
        methods: {
          resolveRoute: proxyVueInstance(resolveRoute),
          localePath: proxyVueInstance(localePath),
          localeRoute: proxyVueInstance(localeRoute),
          localeLocation: proxyVueInstance(localeLocation),
          switchLocalePath: proxyVueInstance(switchLocalePath),
          getRouteBaseName: proxyVueInstance(getRouteBaseName),
          localeHead: proxyVueInstance(localeHead)
        }
      });
    }
    if (app2.unmount) {
      const unmountApp = app2.unmount;
      app2.unmount = () => {
        scope.stop();
        unmountApp();
      };
    }
  };
  return scope;
}
function extendComposer(composer, options) {
  const { locales, localeCodes: localeCodes2, baseUrl, context } = options;
  const _locales = ref(locales);
  const _localeCodes = ref(localeCodes2);
  const _baseUrl = ref("");
  composer.locales = computed(() => _locales.value);
  composer.localeCodes = computed(() => _localeCodes.value);
  composer.baseUrl = computed(() => _baseUrl.value);
  {
    _baseUrl.value = resolveBaseUrl(baseUrl, context);
  }
  if (options.hooks && options.hooks.onExtendComposer) {
    options.hooks.onExtendComposer(composer);
  }
}
function extendExportedGlobal(exported, g, hook) {
  const properties = [
    {
      locales: {
        get() {
          return g.locales.value;
        }
      },
      localeCodes: {
        get() {
          return g.localeCodes.value;
        }
      },
      baseUrl: {
        get() {
          return g.baseUrl.value;
        }
      }
    }
  ];
  hook && properties.push(hook(g));
  for (const property of properties) {
    for (const [key, descriptor] of Object.entries(property)) {
      Object.defineProperty(exported, key, descriptor);
    }
  }
}
function extendVueI18n(vueI18n, hook) {
  const composer = getComposer(vueI18n);
  const properties = [
    {
      locales: {
        get() {
          return composer.locales.value;
        }
      },
      localeCodes: {
        get() {
          return composer.localeCodes.value;
        }
      },
      baseUrl: {
        get() {
          return composer.baseUrl.value;
        }
      }
    }
  ];
  hook && properties.push(hook(composer));
  for (const property of properties) {
    for (const [key, descriptor] of Object.entries(property)) {
      Object.defineProperty(vueI18n, key, descriptor);
    }
  }
}
function isPluginOptions(options) {
  return isObject(options) && ("inject" in options || "__composerExtend" in options || "__vueI18nExtend" in options);
}
const GlobalOptionsRegistory = makeSymbol("vue-i18n-routing-gor");
function registerGlobalOptions(router, options) {
  const _options = router[GlobalOptionsRegistory];
  if (_options) {
    warn("already registered global options");
  } else {
    router[GlobalOptionsRegistory] = options;
  }
}
function getGlobalOptions(router) {
  var _a;
  return (_a = router[GlobalOptionsRegistory]) != null ? _a : {};
}
function getLocalesRegex(localeCodes2) {
  return new RegExp(`^/(${localeCodes2.join("|")})(?:/|$)`, "i");
}
function createLocaleFromRouteGetter(localeCodes2, routesNameSeparator, defaultLocaleRouteNameSuffix) {
  const localesPattern = `(${localeCodes2.join("|")})`;
  const defaultSuffixPattern = `(?:${routesNameSeparator}${defaultLocaleRouteNameSuffix})?`;
  const regexpName = new RegExp(`${routesNameSeparator}${localesPattern}${defaultSuffixPattern}$`, "i");
  const regexpPath = getLocalesRegex(localeCodes2);
  const getLocaleFromRoute = (route) => {
    if (isObject(route)) {
      if (route.name) {
        const name = isString(route.name) ? route.name : route.name.toString();
        const matches = name.match(regexpName);
        if (matches && matches.length > 1) {
          return matches[1];
        }
      } else if (route.path) {
        const matches = route.path.match(regexpPath);
        if (matches && matches.length > 1) {
          return matches[1];
        }
      }
    } else if (isString(route)) {
      const matches = route.match(regexpPath);
      if (matches && matches.length > 1) {
        return matches[1];
      }
    }
    return "";
  };
  return getLocaleFromRoute;
}
function getI18nRoutingOptions(router, proxy, {
  defaultLocale = DEFAULT_LOCALE,
  defaultDirection = DEFAULT_DETECTION_DIRECTION,
  defaultLocaleRouteNameSuffix = DEFAULT_LOCALE_ROUTE_NAME_SUFFIX,
  routesNameSeparator = DEFAULT_ROUTES_NAME_SEPARATOR,
  strategy = DEFAULT_STRATEGY,
  trailingSlash = DEFAULT_TRAILING_SLASH,
  localeCodes: localeCodes2 = [],
  prefixable: prefixable2 = DefaultPrefixable,
  switchLocalePathIntercepter = DefaultSwitchLocalePathIntercepter,
  dynamicRouteParamsKey = DEFAULT_DYNAMIC_PARAMS_KEY
} = {}) {
  const options = getGlobalOptions(router);
  return {
    defaultLocale: proxy.defaultLocale || options.defaultLocale || defaultLocale,
    defaultDirection: proxy.defaultDirection || options.defaultDirection || defaultDirection,
    defaultLocaleRouteNameSuffix: proxy.defaultLocaleRouteNameSuffix || options.defaultLocaleRouteNameSuffix || defaultLocaleRouteNameSuffix,
    routesNameSeparator: proxy.routesNameSeparator || options.routesNameSeparator || routesNameSeparator,
    strategy: proxy.strategy || options.strategy || strategy,
    trailingSlash: proxy.trailingSlash || options.trailingSlash || trailingSlash,
    localeCodes: proxy.localeCodes || options.localeCodes || localeCodes2,
    prefixable: proxy.prefixable || options.prefixable || prefixable2,
    switchLocalePathIntercepter: proxy.switchLocalePathIntercepter || options.switchLocalePathIntercepter || switchLocalePathIntercepter,
    dynamicRouteParamsKey: proxy.dynamicRouteParamsKey || options.dynamicRouteParamsKey || dynamicRouteParamsKey
  };
}
function split(str, index) {
  const result = [str.slice(0, index), str.slice(index)];
  return result;
}
function resolve(router, route, strategy, locale) {
  if (strategy === "prefix") {
    if (isArray(route.matched) && route.matched.length > 0) {
      return route.matched[0];
    }
    const [rootSlash, restPath] = split(route.path, 1);
    const targetPath = `${rootSlash}${locale}${restPath === "" ? restPath : `/${restPath}`}`;
    const _route = router.options.routes.find((r) => r.path === targetPath);
    if (_route == null) {
      return route;
    } else {
      const _resolevableRoute = assign({}, _route);
      _resolevableRoute.path = targetPath;
      return router.resolve(_resolevableRoute);
    }
  } else {
    return router.resolve(route);
  }
}
const RESOLVED_PREFIXED = /* @__PURE__ */ new Set(["prefix_and_default", "prefix_except_default"]);
function prefixable(optons) {
  const { currentLocale, defaultLocale, strategy } = optons;
  const isDefaultLocale = currentLocale === defaultLocale;
  return !(isDefaultLocale && RESOLVED_PREFIXED.has(strategy)) && !(strategy === "no_prefix");
}
const DefaultPrefixable = prefixable;
function getRouteBaseName(givenRoute) {
  const router = this.router;
  const { routesNameSeparator } = getI18nRoutingOptions(router, this);
  const route = givenRoute != null ? isRef(givenRoute) ? unref(givenRoute) : givenRoute : this.route;
  if (route == null || !route.name) {
    return;
  }
  const name = getRouteName(route.name);
  return name.split(routesNameSeparator)[0];
}
function localePath(route, locale) {
  const localizedRoute = resolveRoute.call(this, route, locale);
  return localizedRoute == null ? "" : localizedRoute.redirectedFrom || localizedRoute.fullPath;
}
function localeRoute(route, locale) {
  const resolved = resolveRoute.call(this, route, locale);
  return resolved == null ? void 0 : resolved;
}
function localeLocation(route, locale) {
  const resolved = resolveRoute.call(this, route, locale);
  return resolved == null ? void 0 : resolved;
}
function resolveRoute(route, locale) {
  const router = this.router;
  const i18n = this.i18n;
  const _locale = locale || getLocale(i18n);
  const { routesNameSeparator, defaultLocale, defaultLocaleRouteNameSuffix, strategy, trailingSlash, prefixable: prefixable2 } = getI18nRoutingOptions(router, this);
  let _route = route;
  if (isString(route)) {
    if (_route[0] === "/") {
      _route = { path: route };
    } else {
      _route = { name: route };
    }
  }
  let localizedRoute = assign({}, _route);
  if (localizedRoute.path && !localizedRoute.name) {
    let _resolvedRoute = null;
    try {
      _resolvedRoute = resolve(router, localizedRoute, strategy, _locale);
    } catch {
    }
    const resolvedRoute = _resolvedRoute;
    const resolvedRouteName = getRouteBaseName.call(this, resolvedRoute);
    if (isString(resolvedRouteName)) {
      localizedRoute = {
        name: getLocaleRouteName(resolvedRouteName, _locale, {
          defaultLocale,
          strategy,
          routesNameSeparator,
          defaultLocaleRouteNameSuffix
        }),
        params: resolvedRoute.params,
        query: resolvedRoute.query,
        hash: resolvedRoute.hash
      };
      {
        localizedRoute.state = resolvedRoute.state;
      }
    } else {
      if (prefixable2({ currentLocale: _locale, defaultLocale, strategy })) {
        localizedRoute.path = `/${_locale}${localizedRoute.path}`;
      }
      localizedRoute.path = trailingSlash ? withTrailingSlash(localizedRoute.path, true) : withoutTrailingSlash(localizedRoute.path, true);
    }
  } else {
    if (!localizedRoute.name && !localizedRoute.path) {
      localizedRoute.name = getRouteBaseName.call(this, this.route);
    }
    localizedRoute.name = getLocaleRouteName(localizedRoute.name, _locale, {
      defaultLocale,
      strategy,
      routesNameSeparator,
      defaultLocaleRouteNameSuffix
    });
  }
  try {
    const resolvedRoute = router.resolve(localizedRoute);
    if (isVue3 ? resolvedRoute.name : resolvedRoute.route.name) {
      return resolvedRoute;
    }
    return router.resolve(route);
  } catch (e) {
    if (e.type === 1) {
      return null;
    }
  }
}
const DefaultSwitchLocalePathIntercepter = (path) => path;
function getLocalizableMetaFromDynamicParams(route, key) {
  const metaDefault = {};
  if (key === DEFAULT_DYNAMIC_PARAMS_KEY) {
    return metaDefault;
  }
  const meta = route.meta;
  if (isRef(meta)) {
    return meta.value[key] || metaDefault;
  } else {
    return meta[key] || metaDefault;
  }
}
function switchLocalePath(locale) {
  const route = this.route;
  const name = getRouteBaseName.call(this, route);
  if (!name) {
    return "";
  }
  const { switchLocalePathIntercepter, dynamicRouteParamsKey } = getI18nRoutingOptions(this.router, this);
  const { params, ...routeCopy } = route;
  const langSwitchParams = getLocalizableMetaFromDynamicParams(route, dynamicRouteParamsKey)[locale] || {};
  const _baseRoute = {
    name,
    params: {
      ...params,
      ...langSwitchParams
    }
  };
  const baseRoute = assign({}, routeCopy, _baseRoute);
  let path = localePath.call(this, baseRoute, locale);
  path = switchLocalePathIntercepter(path, locale);
  return path;
}
function localeHead({ addDirAttribute = false, addSeoAttributes = false, identifierAttribute = "hid" } = {}) {
  const router = this.router;
  const i18n = this.i18n;
  const { defaultDirection } = getI18nRoutingOptions(router, this);
  const metaObject = {
    htmlAttrs: {},
    link: [],
    meta: []
  };
  if (i18n.locales == null || i18n.baseUrl == null) {
    return metaObject;
  }
  const locale = getLocale(i18n);
  const locales = getLocales(i18n);
  const currentLocale = getNormalizedLocales(locales).find((l) => l.code === locale) || {
    code: locale
  };
  const currentLocaleIso = currentLocale.iso;
  const currentLocaleDir = currentLocale.dir || defaultDirection;
  if (addDirAttribute) {
    metaObject.htmlAttrs.dir = currentLocaleDir;
  }
  if (addSeoAttributes && locale && i18n.locales) {
    if (currentLocaleIso) {
      metaObject.htmlAttrs.lang = currentLocaleIso;
    }
    addHreflangLinks.call(this, locales, unref(i18n.baseUrl), metaObject.link, identifierAttribute);
    addCanonicalLinksAndOgUrl.call(
      this,
      unref(i18n.baseUrl),
      metaObject.link,
      metaObject.meta,
      identifierAttribute,
      addSeoAttributes
    );
    addCurrentOgLocale(currentLocale, currentLocaleIso, metaObject.meta, identifierAttribute);
    addAlternateOgLocales(locales, currentLocaleIso, metaObject.meta, identifierAttribute);
  }
  return metaObject;
}
function addHreflangLinks(locales, baseUrl, link, identifierAttribute) {
  const router = this.router;
  const { defaultLocale, strategy } = getI18nRoutingOptions(router, this);
  if (strategy === STRATEGIES.NO_PREFIX) {
    return;
  }
  const localeMap = /* @__PURE__ */ new Map();
  for (const locale of locales) {
    const localeIso = locale.iso;
    if (!localeIso) {
      warn("Locale ISO code is required to generate alternate link");
      continue;
    }
    const [language, region] = localeIso.split("-");
    if (language && region && (locale.isCatchallLocale || !localeMap.has(language))) {
      localeMap.set(language, locale);
    }
    localeMap.set(localeIso, locale);
  }
  for (const [iso, mapLocale] of localeMap.entries()) {
    const localePath2 = switchLocalePath.call(this, mapLocale.code);
    if (localePath2) {
      link.push({
        [identifierAttribute]: `i18n-alt-${iso}`,
        rel: "alternate",
        href: toAbsoluteUrl(localePath2, baseUrl),
        hreflang: iso
      });
    }
  }
  if (defaultLocale) {
    const localePath2 = switchLocalePath.call(this, defaultLocale);
    if (localePath2) {
      link.push({
        [identifierAttribute]: "i18n-xd",
        rel: "alternate",
        href: toAbsoluteUrl(localePath2, baseUrl),
        hreflang: "x-default"
      });
    }
  }
}
function addCanonicalLinksAndOgUrl(baseUrl, link, meta, identifierAttribute, seoAttributesOptions) {
  const route = this.route;
  const currentRoute = localeRoute.call(this, {
    ...route,
    name: getRouteBaseName.call(this, route)
  });
  if (currentRoute) {
    let href = toAbsoluteUrl(currentRoute.path, baseUrl);
    const canonicalQueries = isObject(seoAttributesOptions) && seoAttributesOptions.canonicalQueries || [];
    if (canonicalQueries.length) {
      const currentRouteQueryParams = currentRoute.query;
      const params = new URLSearchParams();
      for (const queryParamName of canonicalQueries) {
        if (queryParamName in currentRouteQueryParams) {
          const queryParamValue = currentRouteQueryParams[queryParamName];
          if (isArray(queryParamValue)) {
            queryParamValue.forEach((v) => params.append(queryParamName, v || ""));
          } else {
            params.append(queryParamName, queryParamValue || "");
          }
        }
      }
      const queryString = params.toString();
      if (queryString) {
        href = `${href}?${queryString}`;
      }
    }
    link.push({
      [identifierAttribute]: "i18n-can",
      rel: "canonical",
      href
    });
    meta.push({
      [identifierAttribute]: "i18n-og-url",
      property: "og:url",
      content: href
    });
  }
}
function addCurrentOgLocale(currentLocale, currentLocaleIso, meta, identifierAttribute) {
  const hasCurrentLocaleAndIso = currentLocale && currentLocaleIso;
  if (!hasCurrentLocaleAndIso) {
    return;
  }
  meta.push({
    [identifierAttribute]: "i18n-og",
    property: "og:locale",
    content: hypenToUnderscore(currentLocaleIso)
  });
}
function addAlternateOgLocales(locales, currentLocaleIso, meta, identifierAttribute) {
  const localesWithoutCurrent = locales.filter((locale) => {
    const localeIso = locale.iso;
    return localeIso && localeIso !== currentLocaleIso;
  });
  if (localesWithoutCurrent.length) {
    const alternateLocales = localesWithoutCurrent.map((locale) => ({
      [identifierAttribute]: `i18n-og-alt-${locale.iso}`,
      property: "og:locale:alternate",
      content: hypenToUnderscore(locale.iso)
    }));
    meta.push(...alternateLocales);
  }
}
function hypenToUnderscore(str) {
  return (str || "").replace(/-/g, "_");
}
function toAbsoluteUrl(urlOrPath, baseUrl) {
  if (urlOrPath.match(/^https?:\/\//)) {
    return urlOrPath;
  }
  return baseUrl + urlOrPath;
}
function proxyForComposable(options, target) {
  const {
    router,
    route,
    i18n,
    defaultLocale,
    strategy,
    defaultLocaleRouteNameSuffix,
    trailingSlash,
    routesNameSeparator
  } = options;
  return function(...args) {
    return Reflect.apply(
      target,
      {
        router,
        route,
        i18n,
        defaultLocale,
        strategy,
        defaultLocaleRouteNameSuffix,
        trailingSlash,
        routesNameSeparator
      },
      args
    );
  };
}
function useSwitchLocalePath({
  router = useRouter$1(),
  route = useRoute$1(),
  i18n = useI18n(),
  defaultLocale = void 0,
  defaultLocaleRouteNameSuffix = void 0,
  routesNameSeparator = void 0,
  strategy = void 0,
  trailingSlash = void 0
} = {}) {
  return proxyForComposable(
    {
      router,
      route,
      i18n,
      defaultLocale,
      defaultLocaleRouteNameSuffix,
      routesNameSeparator,
      strategy,
      trailingSlash
    },
    switchLocalePath
  );
}
const localeCodes = ["en", "zh"];
const localeMessages = {
  "en": [{ key: "../../../packages/locales/en-US.json", load: () => import(
    './en-US-dc562e7c.mjs'
    /* webpackChunkName: "lang_en_US_json_en_US_json" */
  ) }],
  "zh": [{ key: "../../../packages/locales/zh-CN.json", load: () => import(
    './zh-CN-468e4fb7.mjs'
    /* webpackChunkName: "lang_zh_CN_json_zh_CN_json" */
  ) }]
};
const additionalMessages = Object({ "en": [], "zh": [] });
const resolveNuxtI18nOptions = async (context) => {
  const nuxtI18nOptions = Object({});
  nuxtI18nOptions.experimental = Object({ "jsTsFormatResource": false });
  nuxtI18nOptions.precompile = Object({ "strictMessage": true, "escapeHtml": false });
  nuxtI18nOptions.vueI18n = Object({});
  nuxtI18nOptions.locales = [Object({ "code": "en", "file": "en-US.json" }), Object({ "code": "zh", "file": "zh-CN.json" })];
  nuxtI18nOptions.defaultLocale = "zh";
  nuxtI18nOptions.defaultDirection = "ltr";
  nuxtI18nOptions.routesNameSeparator = "___";
  nuxtI18nOptions.trailingSlash = false;
  nuxtI18nOptions.defaultLocaleRouteNameSuffix = "default";
  nuxtI18nOptions.strategy = "prefix_except_default";
  nuxtI18nOptions.lazy = true;
  nuxtI18nOptions.langDir = "../../packages/locales";
  nuxtI18nOptions.rootRedirect = null;
  nuxtI18nOptions.detectBrowserLanguage = Object({ "alwaysRedirect": false, "cookieCrossOrigin": true, "cookieDomain": null, "cookieKey": "i18n_redirected", "cookieSecure": false, "fallbackLocale": "", "redirectOn": "root", "useCookie": true });
  nuxtI18nOptions.differentDomains = false;
  nuxtI18nOptions.baseUrl = "";
  nuxtI18nOptions.dynamicRouteParams = false;
  nuxtI18nOptions.customRoutes = "page";
  nuxtI18nOptions.pages = Object({});
  nuxtI18nOptions.skipSettingLocaleOnNavigate = false;
  nuxtI18nOptions.types = "composition";
  nuxtI18nOptions.debug = false;
  return nuxtI18nOptions;
};
const nuxtI18nOptionsDefault = Object({ experimental: Object({ "jsTsFormatResource": false }), precompile: Object({ "strictMessage": true, "escapeHtml": false }), vueI18n: "", locales: [], defaultLocale: "", defaultDirection: "ltr", routesNameSeparator: "___", trailingSlash: false, defaultLocaleRouteNameSuffix: "default", strategy: "prefix_except_default", lazy: false, langDir: null, rootRedirect: null, detectBrowserLanguage: Object({ "alwaysRedirect": false, "cookieCrossOrigin": false, "cookieDomain": null, "cookieKey": "i18n_redirected", "cookieSecure": false, "fallbackLocale": "", "redirectOn": "root", "useCookie": true }), differentDomains: false, baseUrl: "", dynamicRouteParams: false, customRoutes: "page", pages: Object({}), skipSettingLocaleOnNavigate: false, types: "composition", debug: false });
const nuxtI18nInternalOptions = Object({ __normalizedLocales: [Object({ "code": "en", "file": "en-US.json" }), Object({ "code": "zh", "file": "zh-CN.json" })] });
const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n";
const isSSG = false;
function formatMessage(message) {
  return NUXT_I18N_MODULE_ID + " " + message;
}
function isLegacyVueI18n(target) {
  return target != null && ("__VUE_I18N_BRIDGE__" in target || "_sync" in target);
}
function callVueI18nInterfaces(i18n, name, ...args) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  const [obj, method] = [target, target[name]];
  return Reflect.apply(method, obj, [...args]);
}
function getVueI18nPropertyValue(i18n, name) {
  const target = isI18nInstance(i18n) ? i18n.global : i18n;
  const ret = isComposer(target) ? target[name].value : isExportedGlobalComposer(target) || isVueI18n(target) || isLegacyVueI18n(target) ? target[name] : target[name];
  return ret;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function proxyNuxt(nuxt, target) {
  return function() {
    return Reflect.apply(
      target,
      {
        i18n: nuxt.$i18n,
        getRouteBaseName: nuxt.$getRouteBaseName,
        localePath: nuxt.$localePath,
        localeRoute: nuxt.$localeRoute,
        switchLocalePath: nuxt.$switchLocalePath,
        localeHead: nuxt.$localeHead,
        route: nuxt.$router.currentRoute.value,
        router: nuxt.$router
      },
      // eslint-disable-next-line prefer-rest-params
      arguments
    );
  };
}
function parseAcceptLanguage(input) {
  return input.split(",").map((tag) => tag.split(";")[0]);
}
function deepCopy(src, des, predicate) {
  for (const key in src) {
    if (sharedExports.isObject(src[key])) {
      if (!sharedExports.isObject(des[key]))
        des[key] = {};
      deepCopy(src[key], des[key], predicate);
    } else {
      if (predicate) {
        if (predicate(src[key], des[key])) {
          des[key] = src[key];
        }
      } else {
        des[key] = src[key];
      }
    }
  }
}
async function loadMessage(context, loader, locale) {
  var _a, _b;
  const i18nConfig = (_a = context.$config.public) == null ? void 0 : _a.i18n;
  let message = null;
  try {
    const getter = await loader().then((r) => r.default || r);
    if (sharedExports.isFunction(getter)) {
      if ((_b = i18nConfig.experimental) == null ? void 0 : _b.jsTsFormatResource) {
        message = await getter(context, locale).then((r) => r.default || r);
      } else {
        console.warn(
          formatMessage(
            "Not support js / ts extension format as default. you can do enable with `i18n.experimental.jsTsFormatResource: true` (experimental)"
          )
        );
      }
    } else {
      message = getter;
    }
  } catch (e) {
    console.error(formatMessage("Failed locale loading: " + e.message));
  }
  return message;
}
const loadedMessages = /* @__PURE__ */ new Map();
async function loadLocale(context, locale, setter) {
  {
    const loaders = localeMessages[locale];
    if (loaders != null) {
      if (loaders.length === 1) {
        const { key, load } = loaders[0];
        let message = null;
        if (loadedMessages.has(key)) {
          message = loadedMessages.get(key);
        } else {
          message = await loadMessage(context, load, locale);
          if (message != null) {
            loadedMessages.set(key, message);
          }
        }
        if (message != null) {
          setter(locale, message);
        }
      } else if (loaders.length > 1) {
        const targetMessage = {};
        for (const { key, load } of loaders) {
          let message = null;
          if (loadedMessages.has(key)) {
            message = loadedMessages.get(key);
          } else {
            message = await loadMessage(context, load, locale);
            if (message != null) {
              loadedMessages.set(key, message);
            }
          }
          if (message != null) {
            deepCopy(message, targetMessage);
          }
        }
        setter(locale, targetMessage);
      }
    }
  }
}
async function loadAdditionalLocale(context, locale, merger) {
  {
    const additionalLoaders = additionalMessages[locale] || [];
    for (const additionalLoader of additionalLoaders) {
      const message = await loadMessage(context, additionalLoader, locale);
      if (message != null) {
        merger(locale, message);
      }
    }
  }
}
function getBrowserLocale(options, context) {
  let ret;
  {
    const header = useRequestHeaders(["accept-language"]);
    const accept = header["accept-language"];
    if (accept) {
      ret = findBrowserLocale(options.__normalizedLocales, parseAcceptLanguage(accept));
    }
  }
  return ret;
}
function getLocaleCookie(context, {
  useCookie = nuxtI18nOptionsDefault.detectBrowserLanguage.useCookie,
  cookieKey = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieKey,
  localeCodes: localeCodes2 = []
} = {}) {
  if (useCookie) {
    let localeCode;
    {
      const cookie = useRequestHeaders(["cookie"]);
      if ("cookie" in cookie) {
        const parsedCookie = parse(cookie["cookie"]);
        localeCode = parsedCookie[cookieKey];
      }
    }
    if (localeCode && localeCodes2.includes(localeCode)) {
      return localeCode;
    }
  }
}
function setLocaleCookie(locale, context, {
  useCookie = nuxtI18nOptionsDefault.detectBrowserLanguage.useCookie,
  cookieKey = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieKey,
  cookieDomain = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieDomain,
  cookieSecure = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieSecure,
  cookieCrossOrigin = nuxtI18nOptionsDefault.detectBrowserLanguage.cookieCrossOrigin
} = {}) {
  if (!useCookie) {
    return;
  }
  const date = /* @__PURE__ */ new Date();
  const cookieOptions = {
    expires: new Date(date.setDate(date.getDate() + 365)),
    path: "/",
    sameSite: cookieCrossOrigin ? "none" : "lax",
    secure: cookieCrossOrigin || cookieSecure
  };
  if (cookieDomain) {
    cookieOptions.domain = cookieDomain;
  }
  {
    if (context.res) {
      const { res } = context;
      let headers = res.getHeader("Set-Cookie") || [];
      if (!sharedExports.isArray(headers)) {
        headers = [String(headers)];
      }
      const redirectCookie = serialize(cookieKey, locale, cookieOptions);
      headers.push(redirectCookie);
      res.setHeader("Set-Cookie", headers);
    }
  }
}
const DefaultDetectBrowserLanguageFromResult = {
  locale: "",
  stat: false,
  reason: "unknown",
  from: "unknown"
};
function detectBrowserLanguage(route, context, nuxtI18nOptions, nuxtI18nInternalOptions2, localeCodes2 = [], locale = "", mode) {
  const { strategy } = nuxtI18nOptions;
  const { redirectOn, alwaysRedirect, useCookie, fallbackLocale } = nuxtI18nOptions.detectBrowserLanguage;
  const path = sharedExports.isString(route) ? route : route.path;
  if (strategy !== "no_prefix") {
    if (redirectOn === "root") {
      if (path !== "/") {
        return { locale: "", stat: false, reason: "not_redirect_on_root" };
      }
    } else if (redirectOn === "no prefix") {
      if (!alwaysRedirect && path.match(getLocalesRegex(localeCodes2))) {
        return { locale: "", stat: false, reason: "not_redirect_on_no_prefix" };
      }
    }
  }
  let localeFrom = "unknown";
  let cookieLocale;
  let matchedLocale;
  if (useCookie) {
    matchedLocale = cookieLocale = getLocaleCookie(context, { ...nuxtI18nOptions.detectBrowserLanguage, localeCodes: localeCodes2 });
    localeFrom = "cookie";
  }
  if (!matchedLocale) {
    matchedLocale = getBrowserLocale(nuxtI18nInternalOptions2);
    localeFrom = "navigator_or_header";
  }
  const finalLocale = matchedLocale || fallbackLocale;
  if (!matchedLocale && fallbackLocale) {
    localeFrom = "fallback";
  }
  const vueI18nLocale = locale || nuxtI18nOptions.vueI18n.locale;
  if (finalLocale && (!useCookie || alwaysRedirect || !cookieLocale)) {
    if (strategy === "no_prefix") {
      return { locale: finalLocale, stat: true, from: localeFrom };
    } else {
      if (finalLocale !== vueI18nLocale) {
        return { locale: finalLocale, stat: true, from: localeFrom };
      } else if (alwaysRedirect) {
        const redirectOnRoot = path === "/";
        const redirectOnAll = redirectOn === "all";
        const redirectOnNoPrefix = redirectOn === "no prefix" && !path.match(getLocalesRegex(localeCodes2));
        if (redirectOnRoot || redirectOnAll || redirectOnNoPrefix) {
          return { locale: finalLocale, stat: true, from: localeFrom };
        }
      }
    }
  }
  if (mode === "ssg_setup" && finalLocale) {
    return { locale: finalLocale, stat: true, from: localeFrom };
  }
  return { locale: "", stat: false, reason: "not_found_match" };
}
function getHost() {
  let host;
  {
    const header = useRequestHeaders(["x-forwarded-host", "host"]);
    let detectedHost;
    if ("x-forwarded-host" in header) {
      detectedHost = header["x-forwarded-host"];
    } else if ("host" in header) {
      detectedHost = header["host"];
    }
    host = sharedExports.isArray(detectedHost) ? detectedHost[0] : detectedHost;
  }
  return host;
}
function getLocaleDomain(locales) {
  let host = getHost() || "";
  if (host) {
    const matchingLocale = locales.find((locale) => locale.domain === host);
    if (matchingLocale) {
      return matchingLocale.code;
    } else {
      host = "";
    }
  }
  return host;
}
function getDomainFromLocale(localeCode, locales, nuxt) {
  const lang = locales.find((locale) => locale.code === localeCode);
  if (lang && lang.domain) {
    if (hasProtocol(lang.domain)) {
      return lang.domain;
    }
    let protocol;
    {
      const {
        node: { req }
      } = useRequestEvent(nuxt);
      protocol = req && isHTTPS(req) ? "https" : "http";
    }
    return protocol + "://" + lang.domain;
  }
  console.warn(formatMessage("Could not find domain name for locale " + localeCode));
}
function setCookieLocale(i18n, locale) {
  return callVueI18nInterfaces(i18n, "setLocaleCookie", locale);
}
function mergeLocaleMessage(i18n, locale, messages) {
  return callVueI18nInterfaces(i18n, "mergeLocaleMessage", locale, messages);
}
function onBeforeLanguageSwitch(i18n, oldLocale, newLocale, initial, context) {
  return callVueI18nInterfaces(i18n, "onBeforeLanguageSwitch", oldLocale, newLocale, initial, context);
}
function onLanguageSwitched(i18n, oldLocale, newLocale) {
  return callVueI18nInterfaces(i18n, "onLanguageSwitched", oldLocale, newLocale);
}
function makeFallbackLocaleCodes(fallback, locales) {
  let fallbackLocales = [];
  if (sharedExports.isArray(fallback)) {
    fallbackLocales = fallback;
  } else if (sharedExports.isObject(fallback)) {
    const targets = [...locales, "default"];
    for (const locale of targets) {
      if (fallback[locale]) {
        fallbackLocales = [...fallbackLocales, ...fallback[locale].filter(Boolean)];
      }
    }
  } else if (sharedExports.isString(fallback) && locales.every((locale) => locale !== fallback)) {
    fallbackLocales.push(fallback);
  }
  return fallbackLocales;
}
async function loadInitialMessages(context, messages, options) {
  const { defaultLocale, initialLocale, localeCodes: localeCodes2, fallbackLocale, langDir, lazy } = options;
  const setter = (locale, message) => {
    const base = messages[locale] || {};
    messages[locale] = { ...base, ...message };
  };
  if (langDir) {
    if (lazy && fallbackLocale) {
      const fallbackLocales = makeFallbackLocaleCodes(fallbackLocale, [defaultLocale, initialLocale]);
      await Promise.all(fallbackLocales.map((locale) => loadLocale(context, locale, setter)));
    }
    const locales = lazy ? [...(/* @__PURE__ */ new Set()).add(defaultLocale).add(initialLocale)] : localeCodes2;
    await Promise.all(locales.map((locale) => loadLocale(context, locale, setter)));
  }
  return messages;
}
async function mergeAdditionalMessages(context, i18n, locale) {
  await loadAdditionalLocale(
    context,
    locale,
    (locale2, message) => mergeLocaleMessage(i18n, locale2, message)
  );
}
async function loadAndSetLocale(newLocale, context, i18n, {
  useCookie = nuxtI18nOptionsDefault.detectBrowserLanguage.useCookie,
  skipSettingLocaleOnNavigate = nuxtI18nOptionsDefault.skipSettingLocaleOnNavigate,
  differentDomains = nuxtI18nOptionsDefault.differentDomains,
  initial = false,
  lazy = false,
  langDir = null
} = {}) {
  let ret = false;
  const oldLocale = getLocale(i18n);
  if (!newLocale) {
    return [ret, oldLocale];
  }
  if (!initial && differentDomains) {
    return [ret, oldLocale];
  }
  if (oldLocale === newLocale) {
    return [ret, oldLocale];
  }
  const localeOverride = await onBeforeLanguageSwitch(i18n, oldLocale, newLocale, initial, context);
  const localeCodes2 = getLocaleCodes(i18n);
  if (localeOverride && localeCodes2 && localeCodes2.includes(localeOverride)) {
    if (localeOverride === oldLocale) {
      return [ret, oldLocale];
    }
    newLocale = localeOverride;
  }
  if (langDir) {
    const i18nFallbackLocales = getVueI18nPropertyValue(i18n, "fallbackLocale");
    if (lazy) {
      const setter = (locale, message) => mergeLocaleMessage(i18n, locale, message);
      if (i18nFallbackLocales) {
        const fallbackLocales = makeFallbackLocaleCodes(i18nFallbackLocales, [newLocale]);
        await Promise.all(fallbackLocales.map((locale) => loadLocale(context, locale, setter)));
      }
      await loadLocale(context, newLocale, setter);
    }
  }
  await mergeAdditionalMessages(context, i18n, newLocale);
  if (skipSettingLocaleOnNavigate) {
    return [ret, oldLocale];
  }
  if (useCookie) {
    setCookieLocale(i18n, newLocale);
  }
  setLocale(i18n, newLocale);
  await onLanguageSwitched(i18n, oldLocale, newLocale);
  ret = true;
  return [ret, oldLocale];
}
function detectLocale(route, context, routeLocaleGetter, nuxtI18nOptions, initialLocaleLoader, normalizedLocales, localeCodes2 = [], ssgStatus = "normal") {
  const { strategy, defaultLocale, differentDomains } = nuxtI18nOptions;
  const initialLocale = sharedExports.isFunction(initialLocaleLoader) ? initialLocaleLoader() : initialLocaleLoader;
  const { locale: browserLocale, stat, reason, from } = nuxtI18nOptions.detectBrowserLanguage ? detectBrowserLanguage(route, context, nuxtI18nOptions, nuxtI18nInternalOptions, localeCodes2, initialLocale, ssgStatus) : DefaultDetectBrowserLanguageFromResult;
  if (reason === "detect_ignore_on_ssg") {
    return initialLocale;
  }
  let finalLocale = browserLocale;
  if (!finalLocale) {
    if (differentDomains) {
      finalLocale = getLocaleDomain(normalizedLocales);
    } else if (strategy !== "no_prefix") {
      finalLocale = routeLocaleGetter(route);
    } else {
      if (!nuxtI18nOptions.detectBrowserLanguage) {
        finalLocale = initialLocale;
      }
    }
  }
  if (!finalLocale && nuxtI18nOptions.detectBrowserLanguage && nuxtI18nOptions.detectBrowserLanguage.useCookie) {
    finalLocale = getLocaleCookie(context, { ...nuxtI18nOptions.detectBrowserLanguage, localeCodes: localeCodes2 });
  }
  if (!finalLocale) {
    finalLocale = defaultLocale || "";
  }
  return finalLocale;
}
function detectRedirect(route, context, targetLocale, routeLocaleGetter, nuxtI18nOptions) {
  const { strategy, defaultLocale, differentDomains } = nuxtI18nOptions;
  let redirectPath = "";
  if (!isI18nRouteDefined(route)) {
    return redirectPath;
  }
  if (!differentDomains && strategy !== "no_prefix" && // skip if already on the new locale unless the strategy is "prefix_and_default" and this is the default
  // locale, in which case we might still redirect as we prefer unprefixed route in this case.
  (routeLocaleGetter(route) !== targetLocale || strategy === "prefix_and_default" && targetLocale === defaultLocale)) {
    const { fullPath } = route;
    const decodedRoute = decodeURI(fullPath);
    const routePath = context.$switchLocalePath(targetLocale) || context.$localePath(fullPath, targetLocale);
    if (sharedExports.isString(routePath) && routePath && routePath !== fullPath && routePath !== decodedRoute && !routePath.startsWith("//")) {
      redirectPath = routePath;
    }
  }
  if (differentDomains || isSSG) {
    const switchLocalePath2 = useSwitchLocalePath({
      i18n: getComposer(context.$i18n),
      route,
      router: context.$router
    });
    const routePath = switchLocalePath2(targetLocale);
    if (sharedExports.isString(routePath)) {
      redirectPath = routePath;
    }
  }
  return redirectPath;
}
function isRootRedirectOptions(rootRedirect) {
  return sharedExports.isObject(rootRedirect) && "path" in rootRedirect && "statusCode" in rootRedirect;
}
const useRedirectState = () => useState(NUXT_I18N_MODULE_ID + ":redirect", () => "");
function _navigate(redirectPath, status) {
  {
    return navigateTo(redirectPath, { redirectCode: status });
  }
}
async function navigate(args, {
  status = 301,
  rootRedirect = nuxtI18nOptionsDefault.rootRedirect,
  differentDomains = nuxtI18nOptionsDefault.differentDomains,
  skipSettingLocaleOnNavigate = nuxtI18nOptionsDefault.skipSettingLocaleOnNavigate
} = {}) {
  const { i18n, locale, route } = args;
  let { redirectPath } = args;
  if (route.path === "/" && rootRedirect) {
    if (sharedExports.isString(rootRedirect)) {
      redirectPath = "/" + rootRedirect;
    } else if (isRootRedirectOptions(rootRedirect)) {
      redirectPath = "/" + rootRedirect.path;
      status = rootRedirect.statusCode;
    }
    return _navigate(redirectPath, status);
  }
  if (!differentDomains) {
    if (redirectPath) {
      return _navigate(redirectPath, status);
    }
  } else {
    const state = useRedirectState();
    {
      state.value = redirectPath;
    }
  }
}
function inejctNuxtHelpers(nuxt, i18n) {
  defineGetter(nuxt, "$i18n", i18n.global);
  for (const pair of [
    ["getRouteBaseName", getRouteBaseName],
    ["localePath", localePath],
    ["localeRoute", localeRoute],
    ["switchLocalePath", switchLocalePath],
    ["localeHead", localeHead]
  ]) {
    defineGetter(nuxt, "$" + pair[0], proxyNuxt(nuxt, pair[1]));
  }
}
function extendPrefixable(differentDomains) {
  return (opts) => {
    return DefaultPrefixable(opts) && !differentDomains;
  };
}
function extendSwitchLocalePathIntercepter(differentDomains, normalizedLocales, nuxt) {
  return (path, locale) => {
    if (differentDomains) {
      const domain = getDomainFromLocale(locale, normalizedLocales, nuxt);
      if (domain) {
        return joinURL(domain, path);
      } else {
        return path;
      }
    } else {
      return DefaultSwitchLocalePathIntercepter(path);
    }
  };
}
function extendBaseUrl(baseUrl, options) {
  return (context) => {
    var _a, _b;
    if (sharedExports.isFunction(baseUrl)) {
      const baseUrlResult = baseUrl(context);
      return baseUrlResult;
    }
    const { differentDomains, localeCodeLoader, normalizedLocales } = options;
    const localeCode = sharedExports.isFunction(localeCodeLoader) ? localeCodeLoader() : localeCodeLoader;
    if (differentDomains && localeCode) {
      const domain = getDomainFromLocale(localeCode, normalizedLocales, options.nuxt);
      if (domain) {
        return domain;
      }
    }
    const config = (_b = (_a = context.$config) == null ? void 0 : _a.public) == null ? void 0 : _b.i18n;
    if (config == null ? void 0 : config.baseUrl) {
      return config.baseUrl;
    }
    return baseUrl;
  };
}
function isI18nRouteDefined(route) {
  var _a;
  const i18nLocales = (_a = route.matched[0]) == null ? void 0 : _a.meta.nuxtI18n;
  return i18nLocales ? Object.keys(i18nLocales).length > 0 : false;
}
const i18n_qcL2i4RXTC = /* @__PURE__ */ defineNuxtPlugin(async (nuxt) => {
  let __temp, __restore;
  const router = useRouter();
  const route = useRoute();
  const { vueApp: app2 } = nuxt;
  const nuxtContext = nuxt;
  const nuxtI18nOptions = ([__temp, __restore] = executeAsync(() => resolveNuxtI18nOptions()), __temp = await __temp, __restore(), __temp);
  const useCookie = nuxtI18nOptions.detectBrowserLanguage && nuxtI18nOptions.detectBrowserLanguage.useCookie;
  const { __normalizedLocales: normalizedLocales } = nuxtI18nInternalOptions;
  const {
    defaultLocale,
    differentDomains,
    skipSettingLocaleOnNavigate,
    lazy,
    langDir,
    routesNameSeparator,
    defaultLocaleRouteNameSuffix,
    strategy,
    rootRedirect
  } = nuxtI18nOptions;
  nuxtI18nOptions.baseUrl = extendBaseUrl(nuxtI18nOptions.baseUrl, {
    differentDomains,
    nuxt: nuxtContext,
    localeCodeLoader: defaultLocale,
    normalizedLocales
  });
  const getLocaleFromRoute = createLocaleFromRouteGetter(localeCodes, routesNameSeparator, defaultLocaleRouteNameSuffix);
  const vueI18nOptions = nuxtI18nOptions.vueI18n;
  vueI18nOptions.messages = vueI18nOptions.messages || {};
  vueI18nOptions.fallbackLocale = vueI18nOptions.fallbackLocale ?? false;
  registerGlobalOptions(router, {
    ...nuxtI18nOptions,
    dynamicRouteParamsKey: "nuxtI18n",
    switchLocalePathIntercepter: extendSwitchLocalePathIntercepter(differentDomains, normalizedLocales, nuxtContext),
    prefixable: extendPrefixable(differentDomains)
  });
  const getDefaultLocale = (defaultLocale2) => defaultLocale2 || vueI18nOptions.locale || "en-US";
  let initialLocale = detectLocale(
    route,
    nuxt.ssrContext,
    getLocaleFromRoute,
    nuxtI18nOptions,
    getDefaultLocale(defaultLocale),
    normalizedLocales,
    localeCodes,
    "normal"
  );
  vueI18nOptions.messages = ([__temp, __restore] = executeAsync(() => loadInitialMessages(nuxtContext, vueI18nOptions.messages, {
    ...nuxtI18nOptions,
    initialLocale,
    fallbackLocale: vueI18nOptions.fallbackLocale,
    localeCodes
  })), __temp = await __temp, __restore(), __temp);
  initialLocale = getDefaultLocale(initialLocale);
  const i18n = createI18n({
    ...vueI18nOptions,
    locale: initialLocale
  });
  let notInitialSetup = true;
  const isInitialLocaleSetup = (locale) => initialLocale !== locale && notInitialSetup;
  extendI18n(i18n, {
    locales: nuxtI18nOptions.locales,
    localeCodes,
    baseUrl: nuxtI18nOptions.baseUrl,
    context: nuxtContext,
    hooks: {
      onExtendComposer(composer) {
        composer.strategy = strategy;
        composer.localeProperties = computed(() => {
          return normalizedLocales.find((l) => l.code === composer.locale.value) || {
            code: composer.locale.value
          };
        });
        composer.setLocale = async (locale) => {
          const localeSetup = isInitialLocaleSetup(locale);
          const [modified] = await loadAndSetLocale(locale, nuxtContext, i18n, {
            useCookie,
            differentDomains,
            initial: localeSetup,
            skipSettingLocaleOnNavigate,
            lazy,
            langDir
          });
          if (modified && localeSetup) {
            notInitialSetup = false;
          }
          const redirectPath = detectRedirect(route, nuxtContext, locale, getLocaleFromRoute, nuxtI18nOptions);
          await navigate(
            {
              i18n,
              redirectPath,
              locale,
              route
            },
            {
              differentDomains,
              skipSettingLocaleOnNavigate,
              rootRedirect
            }
          );
        };
        composer.differentDomains = differentDomains;
        composer.getBrowserLocale = () => getBrowserLocale(nuxtI18nInternalOptions, nuxt.ssrContext);
        composer.getLocaleCookie = () => getLocaleCookie(nuxt.ssrContext, { ...nuxtI18nOptions.detectBrowserLanguage, localeCodes });
        composer.setLocaleCookie = (locale) => setLocaleCookie(locale, nuxt.ssrContext, nuxtI18nOptions.detectBrowserLanguage || void 0);
        composer.onBeforeLanguageSwitch = (oldLocale, newLocale, initialSetup, context) => nuxt.callHook("i18n:beforeLocaleSwitch", { oldLocale, newLocale, initialSetup, context });
        composer.onLanguageSwitched = (oldLocale, newLocale) => nuxt.callHook("i18n:localeSwitched", { oldLocale, newLocale });
        composer.finalizePendingLocaleChange = async () => {
          if (!i18n.__pendingLocale) {
            return;
          }
          setLocale(i18n, i18n.__pendingLocale);
          if (i18n.__resolvePendingLocalePromise) {
            await i18n.__resolvePendingLocalePromise();
          }
          i18n.__pendingLocale = void 0;
        };
        composer.waitForPendingLocaleChange = async () => {
          if (i18n.__pendingLocale && i18n.__pendingLocalePromise) {
            await i18n.__pendingLocalePromise;
          }
        };
      },
      onExtendExportedGlobal(g) {
        return {
          strategy: {
            get() {
              return g.strategy;
            }
          },
          localeProperties: {
            get() {
              return g.localeProperties.value;
            }
          },
          setLocale: {
            get() {
              return async (locale) => Reflect.apply(g.setLocale, g, [locale]);
            }
          },
          differentDomains: {
            get() {
              return g.differentDomains;
            }
          },
          getBrowserLocale: {
            get() {
              return () => Reflect.apply(g.getBrowserLocale, g, []);
            }
          },
          getLocaleCookie: {
            get() {
              return () => Reflect.apply(g.getLocaleCookie, g, []);
            }
          },
          setLocaleCookie: {
            get() {
              return (locale) => Reflect.apply(g.setLocaleCookie, g, [locale]);
            }
          },
          onBeforeLanguageSwitch: {
            get() {
              return (oldLocale, newLocale, initialSetup, context) => Reflect.apply(g.onBeforeLanguageSwitch, g, [oldLocale, newLocale, initialSetup, context]);
            }
          },
          onLanguageSwitched: {
            get() {
              return (oldLocale, newLocale) => Reflect.apply(g.onLanguageSwitched, g, [oldLocale, newLocale]);
            }
          },
          finalizePendingLocaleChange: {
            get() {
              return () => Reflect.apply(g.finalizePendingLocaleChange, g, []);
            }
          },
          waitForPendingLocaleChange: {
            get() {
              return () => Reflect.apply(g.waitForPendingLocaleChange, g, []);
            }
          }
        };
      },
      onExtendVueI18n(composer) {
        return {
          strategy: {
            get() {
              return composer.strategy;
            }
          },
          localeProperties: {
            get() {
              return composer.localeProperties.value;
            }
          },
          setLocale: {
            get() {
              return async (locale) => Reflect.apply(composer.setLocale, composer, [locale]);
            }
          },
          differentDomains: {
            get() {
              return composer.differentDomains;
            }
          },
          getBrowserLocale: {
            get() {
              return () => Reflect.apply(composer.getBrowserLocale, composer, []);
            }
          },
          getLocaleCookie: {
            get() {
              return () => Reflect.apply(composer.getLocaleCookie, composer, []);
            }
          },
          setLocaleCookie: {
            get() {
              return (locale) => Reflect.apply(composer.setLocaleCookie, composer, [locale]);
            }
          },
          onBeforeLanguageSwitch: {
            get() {
              return (oldLocale, newLocale, initialSetup, context) => Reflect.apply(composer.onBeforeLanguageSwitch, composer, [oldLocale, newLocale, initialSetup, context]);
            }
          },
          onLanguageSwitched: {
            get() {
              return (oldLocale, newLocale) => Reflect.apply(composer.onLanguageSwitched, composer, [oldLocale, newLocale]);
            }
          },
          finalizePendingLocaleChange: {
            get() {
              return () => Reflect.apply(composer.finalizePendingLocaleChange, composer, []);
            }
          },
          waitForPendingLocaleChange: {
            get() {
              return () => Reflect.apply(composer.waitForPendingLocaleChange, composer, []);
            }
          }
        };
      }
    }
  });
  const pluginOptions = {
    __composerExtend: (c) => {
      const g = getComposer(i18n);
      c.strategy = g.strategy;
      c.localeProperties = computed(() => g.localeProperties.value);
      c.setLocale = g.setLocale;
      c.differentDomains = g.differentDomains;
      c.getBrowserLocale = g.getBrowserLocale;
      c.getLocaleCookie = g.getLocaleCookie;
      c.setLocaleCookie = g.setLocaleCookie;
      c.onBeforeLanguageSwitch = g.onBeforeLanguageSwitch;
      c.onLanguageSwitched = g.onLanguageSwitched;
      c.finalizePendingLocaleChange = g.finalizePendingLocaleChange;
      c.waitForPendingLocaleChange = g.waitForPendingLocaleChange;
    }
  };
  app2.use(i18n, pluginOptions);
  inejctNuxtHelpers(nuxtContext, i18n);
  [__temp, __restore] = executeAsync(() => mergeAdditionalMessages(nuxtContext, i18n, initialLocale)), await __temp, __restore();
  addRouteMiddleware(
    "locale-changing",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
      let __temp2, __restore2;
      const locale = detectLocale(
        to,
        nuxt.ssrContext,
        getLocaleFromRoute,
        nuxtI18nOptions,
        () => {
          return getLocale(i18n) || getDefaultLocale(defaultLocale);
        },
        normalizedLocales,
        localeCodes,
        "normal"
      );
      const localeSetup = isInitialLocaleSetup(locale);
      const [modified] = ([__temp2, __restore2] = executeAsync(() => loadAndSetLocale(locale, nuxtContext, i18n, {
        useCookie,
        differentDomains,
        initial: localeSetup,
        skipSettingLocaleOnNavigate,
        lazy,
        langDir
      })), __temp2 = await __temp2, __restore2(), __temp2);
      if (modified && localeSetup) {
        notInitialSetup = false;
      }
      const redirectPath = detectRedirect(to, nuxtContext, locale, getLocaleFromRoute, nuxtI18nOptions);
      return navigate(
        {
          i18n,
          redirectPath,
          locale,
          route: to
        },
        {
          differentDomains,
          skipSettingLocaleOnNavigate,
          rootRedirect
        }
      );
    }),
    { global: true }
  );
}, 1);
const unocss_MzCDxu9LMj = /* @__PURE__ */ defineNuxtPlugin(() => {
});
const _plugins = [
  plugin_vue3_okOeP2pQIt,
  components_plugin_KR1HBZs4kY,
  unhead_zW6dvCvlhl,
  router_V9gGtkNrTG,
  plugin_FRmGFsEaPh,
  composition_jPqDWTOxqW,
  i18n_qcL2i4RXTC,
  unocss_MzCDxu9LMj
];
const _sfc_main$1 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      locale,
      locales,
      setLocale: setLocale2
    } = useI18n();
    const availableLocales = computed(() => {
      return locales.value.filter((i) => i.code !== locale.value);
    });
    return (_ctx, _push, _parent2, _attrs) => {
      const _component_VaButton = VaButton;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "py-20 px-12 text-center" }, _attrs))}><span text="blue 5xl hover:red" cursor="default">Hello Nuxt 3</span><br><div i-carbon-car text-4xl inline-block></div><br>`);
      _push(ssrRenderComponent(_component_VaButton, {
        to: "/",
        "active-class": "ring-3 ring-blue"
      }, {
        default: withCtx((_, _push2, _parent3, _scopeId) => {
          if (_push2) {
            _push2(` test `);
          } else {
            return [
              createTextVNode(" test ")
            ];
          }
        }),
        _: 1
      }, _parent2));
      _push(`<button btn>${ssrInterpolate(_ctx.$t("account.bot"))}</button><!--[-->`);
      ssrRenderList(unref(availableLocales), (locale2) => {
        _push(`<a href="#">${ssrInterpolate(locale2.name)}</a>`);
      });
      _push(`<!--]--></main>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppComponent = _sfc_main$1;
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = /* @__PURE__ */ defineAsyncComponent(() => import('./error-component-6c27da50.mjs').then((r) => r.default || r));
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./island-renderer-ed4b9540.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = callWithNuxt(nuxtApp, showError, [err]);
        onServerPrefetch(() => p);
        return false;
      }
    });
    const { islandContext } = nuxtApp.ssrContext;
    return (_ctx, _push, _parent2, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent2));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent2));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent2);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent2));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../node_modules/.pnpm/registry.npmmirror.com+nuxt@3.4.1_kkszfygjbhcpf2dvqbzulp6vae/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { __nuxt_component_0 as _, createError as c, entry$1 as default, useHead$1 as u };
//# sourceMappingURL=server.mjs.map
