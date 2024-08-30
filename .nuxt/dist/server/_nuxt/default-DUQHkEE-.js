import { _ as __nuxt_component_0$1 } from "./nuxt-link-BQUldJ2o.js";
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { _ as _export_sfc, b as useRuntimeConfig } from "../server.mjs";
import { _ as _imports_0$1 } from "./virtual_public-BQZui9UJ.js";
import { u as useSeoMeta } from "./index-CbBkZ2tD.js";
import { u as useHead } from "./vue.f36acd1f-DvSg21Lc.js";
import "node:http";
import "node:https";
import "node:zlib";
import "node:stream";
import "node:buffer";
import "node:util";
import "node:url";
import "node:net";
import "node:fs";
import "node:path";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "radix3";
import "devalue";
import "axios";
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
        _push2(` Về chúng tôi `);
      } else {
        return [
          createTextVNode(" Về chúng tôi ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="nav-item" data-v-21d2504d><p class="nav-link" data-v-21d2504d>Sản phẩm &amp; dịch vụ</p><div class="dropdown-menu" data-v-21d2504d>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    href: "/dich-vu/kkh",
    class: "dropdown-item"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Không kỳ hạn`);
      } else {
        return [
          createTextVNode("Không kỳ hạn")
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
        _push2(`Tích lũy cuối kỳ`);
      } else {
        return [
          createTextVNode("Tích lũy cuối kỳ")
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
        _push2(`Tích lũy hàng tháng`);
      } else {
        return [
          createTextVNode("Tích lũy hàng tháng")
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
        _push2(` Tuyển dụng `);
      } else {
        return [
          createTextVNode(" Tuyển dụng ")
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
          _push2(`Về chúng tôi`);
        } else {
          return [
            createTextVNode("Về chúng tôi")
          ];
        }
      }),
      _: 1
    }, _parent));
    _push(`</li><li class="nav-item" data-v-21d2504d><p class="nav-link" data-v-21d2504d>Sản phẩm &amp; dịch vụ</p>`);
    if (_ctx.isDropdownOpen) {
      _push(`<div class="dropdown-menu" data-v-21d2504d>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        href: "/dich-vu/kkh",
        class: "dropdown-item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Không kỳ hạn`);
          } else {
            return [
              createTextVNode("Không kỳ hạn")
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
            _push2(`Tích lũy cuối kỳ`);
          } else {
            return [
              createTextVNode("Tích lũy cuối kỳ")
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
            _push2(`Tích lũy hàng tháng`);
          } else {
            return [
              createTextVNode("Tích lũy hàng tháng")
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
          _push2(`Tuyển dụng`);
        } else {
          return [
            createTextVNode("Tuyển dụng")
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
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "tc-footer-st1" }, _attrs))} data-v-cfae711a><div class="main-footer" data-v-cfae711a><div class="container" data-v-cfae711a><div data-v-cfae711a><a href="/" class="logo" data-v-cfae711a><img${ssrRenderAttr("src", _imports_0$1)} alt="" data-v-cfae711a></a></div><div class="links-wrapper" data-v-cfae711a><div class="row" data-v-cfae711a><div class="col-lg-3" data-v-cfae711a><div class="links-group mt-5 mt-lg-0" data-v-cfae711a><h6 class="fsz-18 mb-4 title-company fw-600" data-v-cfae711a> Công Ty Cổ Phần <br data-v-cfae711a> Công Nghệ Tài Chính Finra Capital </h6><ul class="links" data-v-cfae711a><li data-v-cfae711a><a href="javascript:;" class="contacts-company" data-v-cfae711a>Số 3 Phan Đình Phùng, Phường Hàng Mã, Quận Ba Đình, Thành Phố Hà Nội</a></li><li data-v-cfae711a><a href="javascript:;" class="contacts-company" data-v-cfae711a>HotLine: 0936.333.663</a></li><li data-v-cfae711a><a href="mailto:info@finra.com.vn" class="contacts-company" data-v-cfae711a>Email: info@finra.com.vn</a></li></ul></div></div><div class="col-lg-1" data-v-cfae711a></div><div class="col-lg-8" data-v-cfae711a><div class="row" data-v-cfae711a><div class="col-lg-3" data-v-cfae711a><div class="links-group mt-5 mt-lg-0" data-v-cfae711a><h6 class="fsz-18 mb-4" data-v-cfae711a>Về Finra</h6><ul class="links" data-v-cfae711a><li data-v-cfae711a><a href="/ve-chung-toi" data-v-cfae711a>Giới thiệu</a></li><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Tin tức</a></li><li data-v-cfae711a><a href="/tuyen-dung" data-v-cfae711a>Tuyển dụng</a></li></ul></div></div><div class="col-lg-3" data-v-cfae711a><div class="links-group mt-5 mt-lg-0" data-v-cfae711a><h6 class="fsz-18 mb-4" data-v-cfae711a>Tền tảng giao dịch</h6><ul class="links" data-v-cfae711a><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Website</a></li><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Mobile App</a></li></ul></div></div><div class="col-lg-3" data-v-cfae711a><div class="links-group mt-5 mt-lg-0" data-v-cfae711a><h6 class="fsz-18 mb-4" data-v-cfae711a>Hỗ trợ khách hàng</h6><ul class="links" data-v-cfae711a><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>HDSD Mobile App</a></li><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Software &amp; Download</a></li></ul></div></div><div class="col-lg-3" data-v-cfae711a><div class="links-group mt-5 mt-lg-0" data-v-cfae711a><h6 class="fsz-18 mb-4" data-v-cfae711a>Sản phẩm</h6><ul class="links" data-v-cfae711a><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Tích luỹ đầu tư</a></li><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Phân phối trái phiếu</a></li><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Chứng chỉ quỹ</a></li><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Đầu tư theo danh mục</a></li><li data-v-cfae711a><a href="javascript:;" data-v-cfae711a>Quản lý tiêu dùng cá nhân</a></li></ul></div></div></div></div></div></div></div></div></footer>`);
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
    let title = "FINRA Capital - Giải pháp đầu tư tài chính ưu việt";
    let description = "Finra dẫn đầu về nền tảng công nghệ đầu tư tài chính, tận ";
    description += "dụng sáng tạo công nghệ để tư vấn, cung cấp các giải pháp ";
    description += "công nghệ đầu tư tài chính cho khách hàng";
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
export {
  _default as default
};
//# sourceMappingURL=default-DUQHkEE-.js.map
