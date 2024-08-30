import { defineComponent, ref, mergeProps, unref, useSSRContext } from "vue";
import { e as useNuxtApp, f as useRoute, _ as _export_sfc } from "../server.mjs";
import { u as useSeoMeta } from "./index-CbBkZ2tD.js";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import "devalue";
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
import "axios";
import "./vue.f36acd1f-DvSg21Lc.js";
const _imports_0 = publicAssetsURL("/resource1/inner_pages/assets/img/careers/Frame_carrers_detail.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c, _d, _e;
    useNuxtApp();
    const jobDetail = ref();
    const uPhone = ref("");
    const uEmail = ref("");
    useRoute().params;
    useNuxtApp();
    useSeoMeta({
      title: (_a = jobDetail.value) == null ? void 0 : _a.name,
      ogTitle: (_b = jobDetail.value) == null ? void 0 : _b.name,
      description: (_c = jobDetail.value) == null ? void 0 : _c.desc,
      ogDescription: (_d = jobDetail.value) == null ? void 0 : _d.desc,
      ogImage: (_e = jobDetail.value) == null ? void 0 : _e.image
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "career-page-st1" }, _attrs))} data-v-14782ceb><div class="project-page-st1" data-v-14782ceb><header class="tc-header-st18" data-v-14782ceb><div class="container" data-v-14782ceb><div class="fs-6 fw-600" data-v-14782ceb>Vị trí</div><div class="title mt-40" data-v-14782ceb><div class="row" data-v-14782ceb><div class="col-lg-7" data-v-14782ceb><h1 class="fsz-50 text-capitalize" data-v-14782ceb>${ssrInterpolate((_a2 = unref(jobDetail)) == null ? void 0 : _a2.name)}</h1></div><div class="col-lg-5" data-v-14782ceb><div class="info mt-50" data-v-14782ceb><div class="text fsz-16 fw-500" style="${ssrRenderStyle({ "color": "rgba(0, 0, 0, 0.77)" })}" data-v-14782ceb>${ssrInterpolate((_b2 = unref(jobDetail)) == null ? void 0 : _b2.desc)}</div></div></div></div></div></div></header></div><main data-v-14782ceb><section class="tc-main-img-st20" data-v-14782ceb><div class="img" data-v-14782ceb><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-14782ceb></div><div class="features" data-v-14782ceb><div class="container" data-v-14782ceb></div></div></section><section class="tc-content-st20" data-v-14782ceb><div class="container" data-v-14782ceb><div class="row justify-content-center" data-v-14782ceb><div class="col-lg-8" data-v-14782ceb><div class="content" data-v-14782ceb><div class="requirements" data-v-14782ceb>${((_c2 = unref(jobDetail)) == null ? void 0 : _c2.content) ?? ""}</div></div></div><div class="col-lg-8 mt-5" data-v-14782ceb><div class="send__info" data-v-14782ceb><div class="grid grid-cols-8 mt-2" data-v-14782ceb><div data-v-14782ceb><p data-v-14782ceb>Số điện thoại<span class="text-red" data-v-14782ceb>*</span>:</p></div><div class="col-span-7" data-v-14782ceb><input type="text" placeholder="Nhập số điện thoại" style="${ssrRenderStyle({ "width": "100%" })}"${ssrRenderAttr("value", unref(uPhone))} data-v-14782ceb></div></div><div class="grid grid-cols-8 mt-4" data-v-14782ceb><div data-v-14782ceb><p data-v-14782ceb>Email<span class="text-red" data-v-14782ceb>*</span>:</p></div><div class="col-span-7" data-v-14782ceb><input type="text" placeholder="Nhập email" style="${ssrRenderStyle({ "width": "100%" })}"${ssrRenderAttr("value", unref(uEmail))} data-v-14782ceb></div></div><div class="btn-apply" data-v-14782ceb><button class="btn btn--primary btn--lg btn-submit mt-4 align-items-center" data-v-14782ceb><p data-v-14782ceb>Ứng Tuyển</p></button></div></div></div></div></div></section></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tuyen-dung/[slug]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-14782ceb"]]);
export {
  index as default
};
//# sourceMappingURL=index-DmhC5EG2.js.map
