import { _ as __nuxt_component_0$1 } from './nuxt-link-BQUldJ2o.mjs';
import { defineComponent, ref, useSSRContext, mergeProps, withCtx, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _export_sfc, b as useRuntimeConfig } from './server.mjs';
import { _ as _imports_0$1 } from './virtual_public-BQZui9UJ.mjs';
import { u as useSeoMeta } from './index-CbBkZ2tD.mjs';
import { u as useHead } from './vue.f36acd1f-DvSg21Lc.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:net';
import 'node:path';
import 'axios';

const _sfc_main$2 = defineComponent({
  name: "new-header",
  components: {},
  setup(props, ctx) {
    const open = ref(false);
    const isDropdownOpen = ref(false);
    return {
      open,
      isDropdownOpen
    };
  }
});
const _imports_0 = publicAssetsURL("/resource1/home1_creativeAgency/assets/img/logo.svg");
const _imports_1 = publicAssetsURL("/resource1/inner_pages/assets/img/arrow_2.png");
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0$1;
  _push(`<nav${ssrRenderAttrs(mergeProps({ class: "navbar navbar-expand-lg navbar-light sub-font tc-navbar-st1" }, _attrs))} data-v-21d2504d><div class="container-fluid" data-v-21d2504d><a class="navbar-brand" href="/" data-v-21d2504d><img${ssrRenderAttr("src", _imports_0)} alt="" class="logo" data-v-21d2504d></a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" data-v-21d2504d><span class="navbar-toggler-icon" data-v-21d2504d></span></button><div class="collapse navbar-collapse navbar-collapse-pc" id="" data-v-21d2504d><ul class="navbar-nav" data-v-21d2504d><li class="nav-item" data-v-21d2504d>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    to: "/ve-chung-toi",
    class: "nav-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` V\u1EC1 ch\xFAng t\xF4i `);
      } else {
        return [
          createTextVNode(" V\u1EC1 ch\xFAng t\xF4i ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="nav-item" data-v-21d2504d><p class="nav-link" data-v-21d2504d>S\u1EA3n ph\u1EA9m &amp; d\u1ECBch v\u1EE5</p><div class="dropdown-menu" data-v-21d2504d>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    href: "/dich-vu/kkh",
    class: "dropdown-item"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Kh\xF4ng k\u1EF3 h\u1EA1n`);
      } else {
        return [
          createTextVNode("Kh\xF4ng k\u1EF3 h\u1EA1n")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_nuxt_link, {
    to: "/dich-vu/tlck",
    class: "dropdown-item"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`T\xEDch l\u0169y cu\u1ED1i k\u1EF3`);
      } else {
        return [
          createTextVNode("T\xEDch l\u0169y cu\u1ED1i k\u1EF3")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_nuxt_link, {
    to: "/dich-vu/tlht",
    class: "dropdown-item"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`T\xEDch l\u0169y h\xE0ng th\xE1ng`);
      } else {
        return [
          createTextVNode("T\xEDch l\u0169y h\xE0ng th\xE1ng")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></li><li class="nav-item" data-v-21d2504d>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    to: "/tuyen-dung",
    class: "nav-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Tuy\u1EC3n d\u1EE5ng `);
      } else {
        return [
          createTextVNode(" Tuy\u1EC3n d\u1EE5ng ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul><ul class="navbar-nav" data-v-21d2504d><li class="nav-item" data-v-21d2504d><button class="btn-hotline d-flex" style="${ssrRenderStyle({ "justify-content": "center", "align-items": "center", "gap": "10px" })}" data-v-21d2504d> Hotline: 0936.333.663 <div class="" style="${ssrRenderStyle({ "width": "28px", "height": "28px" })}" data-v-21d2504d><img${ssrRenderAttr("src", _imports_1)} alt="" class="img-cover" data-v-21d2504d></div></button></li></ul></div>`);
  if (_ctx.open) {
    _push(`<div class="collapse navbar-collapse navbar-collapse-mb" id="navbarSupportedContent" data-v-21d2504d><ul class="navbar-nav" data-v-21d2504d><li class="nav-item" data-v-21d2504d>`);
    _push(ssrRenderComponent(_component_nuxt_link, {
      class: "nav-link",
      to: "/ve-chung-toi"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`V\u1EC1 ch\xFAng t\xF4i`);
        } else {
          return [
            createTextVNode("V\u1EC1 ch\xFAng t\xF4i")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</li><li class="nav-item" data-v-21d2504d><p class="nav-link" data-v-21d2504d>S\u1EA3n ph\u1EA9m &amp; d\u1ECBch v\u1EE5</p>`);
    if (_ctx.isDropdownOpen) {
      _push(`<div class="dropdown-menu" data-v-21d2504d>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        href: "/dich-vu/kkh",
        class: "dropdown-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Kh\xF4ng k\u1EF3 h\u1EA1n`);
          } else {
            return [
              createTextVNode("Kh\xF4ng k\u1EF3 h\u1EA1n")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/dich-vu/tlck",
        class: "dropdown-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`T\xEDch l\u0169y cu\u1ED1i k\u1EF3`);
          } else {
            return [
              createTextVNode("T\xEDch l\u0169y cu\u1ED1i k\u1EF3")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/dich-vu/tlht",
        class: "dropdown-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`T\xEDch l\u0169y h\xE0ng th\xE1ng`);
          } else {
            return [
              createTextVNode("T\xEDch l\u0169y h\xE0ng th\xE1ng")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</li><li class="nav-item" data-v-21d2504d>`);
    _push(ssrRenderComponent(_component_nuxt_link, {
      class: "nav-link",
      to: "/tuyen-dung"
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`Tuy\u1EC3n d\u1EE5ng`);
        } else {
          return [
            createTextVNode("Tuy\u1EC3n d\u1EE5ng")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</li><li class="nav-item" data-v-21d2504d><button class="btn-hotline d-flex" style="${ssrRenderStyle({ "justify-content": "center", "align-items": "center", "gap": "10px" })}" data-v-21d2504d> Hotline: 0936.333.663 <div class="" style="${ssrRenderStyle({ "width": "28px", "height": "28px" })}" data-v-21d2504d><img${ssrRenderAttr("src", _imports_1)} alt="" class="img-cover" data-v-21d2504d></div></button></li></ul></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></nav>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NewHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-21d2504d"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "tc-footer-st1" }, _attrs))} data-v-cfae711a><div class="main-footer" data-v-cfae711a><div class="container" data-v-cfae711a><div data-v-cfae711a><a href="/" class="logo" data-v-cfae711a><img${ssrRenderAttr("src", _imports_0$1)} alt="" data-v-cfae711a></a></div><div class="links-wrapper" data-v-cfae711a><div class="row" data-v-cfae711a><div class="col-lg-3" data-v-cfae711a><div class="links-group mt-5 mt-lg-0" data-v-cfae711a><h6 class="fsz-18 mb-4 title-company fw-600" data-v-cfae711a> C\xF4ng Ty C\u1ED5 Ph\u1EA7n <br data-v-cfae711a> C\xF4ng Ngh\u1EC7 T\xE0i Ch\xEDnh Finra Capital </h6><ul class="links" data-v-cfae711a><li data-v-cfae711a><a href="javascript:;" class="contacts-company" data-v-cfae711a>S\u1ED1 3 Phan \u0110\xECnh Ph\xF9ng, Ph\u01B0\u1EDDng H\xE0ng M\xE3, Qu\u1EADn Ba \u0110\xECnh, Th\xE0nh Ph\u1ED1 H\xE0 N\u1ED9i</a></li><li data-v-cfae711a><a href="javascript:;" class="contacts-company" data-v-cfae711a>HotLine: 0936.333.663</a></li><li data-v-cfae711a><a href="mailto:info@finra.com.vn" class="contacts-company" data-v-cfae711a>Email: info@finra.com.vn</a></li></ul></div></div><div class="col-lg-1" data-v-cfae711a></div><div class="col-lg-8" data-v-cfae711a><div class="row" data-v-cfae711a><div class="col-lg-3" data-v-cfae711a><div class="links-group mt-5 mt-lg-0" data-v-cfae711a><h6 class="fsz-18 mb-4" data-v-cfae711a>V\u1EC1 Finra</h6><ul class="links" data-v-cfae711a><li data-v-cfae711a><a href="/ve-chung-toi" data-v-cfae711a>Gi\u1EDBi thi\u1EC7u</a></li><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Tin t\u1EE9c</a></li><li data-v-cfae711a><a href="/tuyen-dung" data-v-cfae711a>Tuy\u1EC3n d\u1EE5ng</a></li></ul></div></div><div class="col-lg-3" data-v-cfae711a><div class="links-group mt-5 mt-lg-0" data-v-cfae711a><h6 class="fsz-18 mb-4" data-v-cfae711a>T\u1EC1n t\u1EA3ng giao d\u1ECBch</h6><ul class="links" data-v-cfae711a><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Website</a></li><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Mobile App</a></li></ul></div></div><div class="col-lg-3" data-v-cfae711a><div class="links-group mt-5 mt-lg-0" data-v-cfae711a><h6 class="fsz-18 mb-4" data-v-cfae711a>H\u1ED7 tr\u1EE3 kh\xE1ch h\xE0ng</h6><ul class="links" data-v-cfae711a><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>HDSD Mobile App</a></li><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Software &amp; Download</a></li></ul></div></div><div class="col-lg-3" data-v-cfae711a><div class="links-group mt-5 mt-lg-0" data-v-cfae711a><h6 class="fsz-18 mb-4" data-v-cfae711a>S\u1EA3n ph\u1EA9m</h6><ul class="links" data-v-cfae711a><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>T\xEDch lu\u1EF9 \u0111\u1EA7u t\u01B0</a></li><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Ph\xE2n ph\u1ED1i tr\xE1i phi\u1EBFu</a></li><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Ch\u1EE9ng ch\u1EC9 qu\u1EF9</a></li><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>\u0110\u1EA7u t\u01B0 theo danh m\u1EE5c</a></li><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Qu\u1EA3n l\xFD ti\xEAu d\xF9ng c\xE1 nh\xE2n</a></li></ul></div></div></div></div></div></div></div></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/defaultFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-cfae711a"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    useHead({
      link: [
        {
          rel: "canonical",
          href: config.public.hostBaseUrl
        },
        {
          key: 1,
          rel: "icon",
          type: "image/svg+xml",
          href: "/resource/images/finra_fav.svg"
        },
        { rel: "stylesheet", type: "text/css", href: "/resource/css/bootstrap.min.css" },
        { rel: "stylesheet", type: "text/css", href: "/resource/css/all.min.css" },
        { rel: "stylesheet", type: "text/css", href: "/resource1/common/css/common_style.css" },
        // { rel: "stylesheet", type: "text/css", href: "/resource/css/up_style.css" },
        { rel: "stylesheet", type: "text/css", href: "/resource1/home1_creativeAgency/assets/css/home_1_style.css" },
        { rel: "stylesheet", type: "text/css", href: "/resource1/inner_pages/assets/css/inner_pages.css" }
      ],
      script: []
    });
    let title = "FINRA Capital - Gi\u1EA3i ph\xE1p \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh \u01B0u vi\u1EC7t";
    let description = "Finra d\u1EABn \u0111\u1EA7u v\u1EC1 n\u1EC1n t\u1EA3ng c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh, t\u1EADn ";
    description += "d\u1EE5ng s\xE1ng t\u1EA1o c\xF4ng ngh\u1EC7 \u0111\u1EC3 t\u01B0 v\u1EA5n, cung c\u1EA5p c\xE1c gi\u1EA3i ph\xE1p ";
    description += "c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh cho kh\xE1ch h\xE0ng";
    let ogImg = config.public.hostBaseUrl + "/resource/billboard_1200_600.jpg";
    useSeoMeta({
      title,
      ogTitle: title,
      description,
      ogDescription: description,
      ogType: "article",
      ogImage: ogImg,
      ogUrl: config.public.hostBaseUrl
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NewHeader = __nuxt_component_0;
      const _component_DefaultFooter = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-a3b6048d>`);
      _push(ssrRenderComponent(_component_NewHeader, null, null, _parent));
      _push(`<div class="scroll-to-top" id="toTop" data-v-a3b6048d><i class="fa fa-arrow-up" data-v-a3b6048d></i></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_DefaultFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a3b6048d"]]);

export { _default as default };
//# sourceMappingURL=default-DUQHkEE-.mjs.map
