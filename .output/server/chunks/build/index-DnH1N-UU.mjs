import { defineComponent, ref, useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _imports_1, a as _imports_3$1 } from './virtual_public-CTyS1ncM.mjs';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main = defineComponent({
  name: "home",
  components: {},
  setup(props, ctx) {
    const active = ref(1);
    return {
      active
    };
  }
});
const _imports_0 = publicAssetsURL("/resource1/inner_pages/assets/img/Frame_KKH-1.png");
const _imports_3 = publicAssetsURL("/resource1/inner_pages/assets/img/Formula_image.png");
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "project-page-st1" }, _attrs))}><header class="tc-header-st18"><div class="container"><div class="fs-6 fw-700">S\u1EA3n ph\u1EA9m</div><div class="title mt-40"><div class="row"><div class="col-lg-7"><h1 class="fsz-50 fw-600 text-normal" style="${ssrRenderStyle({ "line-height": "normal" })}"> T\xEDch lu\u1EF9 linh ho\u1EA1t <div class="d-flex gap-3 align-items-center"><span class="text-gradient-purple">Kh\xF4ng k\u1EF3 h\u1EA1n</span></div></h1></div><div class="col-lg-5"><div class="info mt-100"><div class="text fsz-16 fw-500" style="${ssrRenderStyle({ "color": "rgba(0, 0, 0, 0.77)" })}"> B\u1EA1n mu\u1ED1n ti\u1EC1n c\u1EE7a m\xECnh sinh l\u1EDDi m\u1ED7i ng\xE0y m\xE0 kh\xF4ng b\u1ECB g\xF2 b\xF3 b\u1EDFi b\u1EA5t k\u1EF3 h\u1EA1n m\u1EE9c n\xE0o? V\u1EDBi s\u1EA3n ph\u1EA9m t\xEDch l\u0169y linh ho\u1EA1t kh\xF4ng k\u1EF3 h\u1EA1n, b\u1EA1n c\xF3 th\u1EC3 t\u1EF1 do r\xFAt ti\u1EC1n b\u1EA5t c\u1EE9 khi n\xE0o b\u1EA1n c\u1EA7n, \u0111\u1ED3ng th\u1EDDi nh\u1EADn \u0111\u01B0\u1EE3c l\xE3i su\u1EA5t h\u1EA5p d\u1EABn. Ch\u1EC9 c\u1EA7n m\u1ED9t chi\u1EBFc \u0111i\u1EC7n tho\u1EA1i th\xF4ng minh, b\u1EA1n c\xF3 th\u1EC3 b\u1EAFt \u0111\u1EA7u x\xE2y d\u1EF1ng t\xE0i s\u1EA3n ngay h\xF4m nay. \u0110\u1EEBng b\u1ECF l\u1EE1 c\u01A1 h\u1ED9i s\u1EDF h\u1EEFu m\u1ED9t c\xF4ng c\u1EE5 t\xE0i ch\xEDnh linh ho\u1EA1t v\xE0 hi\u1EC7u qu\u1EA3! </div></div></div></div></div></div></header><main><section class="tc-main-img-st18"><div class="img"><img${ssrRenderAttr("src", _imports_0)} alt="" class="img-cover"></div></section><section class="tc-cards-st18"><div class="container"><div class="content pb-50 border-bottom"><div class="row"><div class="col-lg-4"><div class="item mt-50"><p class="fsz-16 cr-666 mb-2">\u0110\u1ED1i t\u01B0\u1EE3ng \xE1p d\u1EE5ng:</p><h6 class="fsz-16 fw-600 my-2">T\u1EA5t c\u1EA3 c\xE1c kh\xE1ch h\xE0ng</h6></div></div><div class="col-lg-4"><div class="item mt-50"><p class="fsz-16 cr-666 mb-2">Ph\xE2n lo\u1EA1i:</p><h6 class="fsz-16 fw-600 my-2"> S\u1EA3n ph\u1EA9m Huy \u0111\u1ED9ng KH\xD4NG k\u1EF3 h\u1EA1n </h6></div></div><div class="col-lg-4"><div class="item mt-50"><p class="fsz-16 cr-666 mb-2">Ti\xEAu ch\xED:</p><h6 class="fsz-16 fw-600 my-2"> G\u1EEDi kh\xF4ng k\u1EF3 h\u1EA1n, l\xE3i su\u1EA5t cao, n\u1ED9p r\xFAt linh ho\u1EA1t </h6></div></div></div></div></div></section><section class="tc-info-st18 py-5 mb-150 mt-60"><div class="container"><div class="row justify-content-center"><div class="col-lg-8"><div class="content"><h5 class="fsz-50 fw-600">M\xF4 t\u1EA3 chung</h5><div class="text fsz-16 mt-30 fw-500" style="${ssrRenderStyle({ "color": "rgba(0, 0, 0, 0.66)" })}"> T\xEDch l\u0169y linh ho\u1EA1t kh\xF4ng k\u1EF3 h\u1EA1n - Gi\u1EA3i ph\xE1p t\xE0i ch\xEDnh th\xF4ng minh cho m\u1ECDi nh\xE0. V\u1EDBi s\u1EA3n ph\u1EA9m n\xE0y, b\u1EA1n c\xF3 th\u1EC3 d\u1EC5 d\xE0ng x\xE2y d\u1EF1ng qu\u1EF9 d\u1EF1 ph\xF2ng, th\u1EF1c hi\u1EC7n c\xE1c m\u1EE5c ti\xEAu t\xE0i ch\xEDnh d\xE0i h\u1EA1n nh\u01B0 mua nh\xE0, mua xe, du l\u1ECBch... \u0110\u1EB7c bi\u1EC7t, s\u1EA3n ph\u1EA9m c\xF2n h\u1ED7 tr\u1EE3 t\xEDch l\u0169y t\u1EF1 \u0111\u1ED9ng, gi\xFAp b\u1EA1n h\xECnh th\xE0nh th\xF3i quen ti\u1EBFt ki\u1EC7m hi\u1EC7u qu\u1EA3. </div><ul class="info-list mt-30"><li><span class="icon me-3"><img${ssrRenderAttr("src", _imports_1)} alt=""></span><span> Kh\xE1ch h\xE0ng l\u1EF1a ch\u1ECDn \u0111\u1EA7u t\u01B0 theo gi\xE1 tr\u1ECB s\u1ED1 ti\u1EC1n mong mu\u1ED1n</span></li><li><span class="icon me-3"><img${ssrRenderAttr("src", _imports_1)} alt=""></span><span> S\u1ED1 ti\u1EC1n \u0111\u1EA7u t\u01B0 t\u1ED1i thi\u1EC3u, r\xFAt t\u1ED1i \u0111a: kh\xF4ng gi\u1EDBi h\u1EA1n </span></li><li><span class="icon me-3"><img${ssrRenderAttr("src", _imports_1)} alt=""></span><span> Nh\u1EADn l\u1EE3i nhu\u1EADn sau m\u1ED7i kho\u1EA3ng th\u1EDDi gian c\u1ED1 \u0111\u1ECBnh tu\u1EF3 g\xF3i s\u1EA3n ph\u1EA9m <div class="fw-500" style="${ssrRenderStyle({ "color": "rgba(0, 0, 0, 0.44)", "font-size": "14px", "line-height": "24px" })}"> *c\xF3 b\u1EA3ng l\xE3i su\u1EA5t theo ng\xE0y, tu\u1EA7n, th\xE1ng </div></span></li><li><span class="icon me-3"><img${ssrRenderAttr("src", _imports_1)} alt=""></span><span> N\u1ED9p/r\xFAt linh ho\u1EA1t kh\xF4ng \u1EA3nh h\u01B0\u1EDFng \u0111\u1EBFn l\u1EE3i nhu\u1EADn chi tr\u1EA3, kh\xF4ng b\u1ECB ph\u1EA1t r\xFAt tr\u01B0\u1EDBc h\u1EA1n </span></li></ul></div></div></div></div></section><section class="tc-img-st18 mt-4"><div class="container"><div class="img"><img${ssrRenderAttr("src", _imports_3$1)} alt="" class="img-cover"></div></div></section><section class="tc-sub-imgs-st18 mb-150"><div class="container"><div class="row"><div class="col-lg-6"><div class="img mt-5 mt-lg-0"><section class="tc-testimonials-st10"><div class="container"><div class="content"><div style="${ssrRenderStyle({ "width": "500px" })}"><h5 class="fsz-50 fw-600">C\xF4ng th\u1EE9c x\xE1c \u0111\u1ECBnh</h5><div class="d-flex justify-content-center align-items-center formula-image"><img${ssrRenderAttr("src", _imports_3)} alt="" class="formula"></div><div><div>Trong \u0111\xF3:</div><ul class="formula_list"><li class="formula_item"><span class="symbol">C</span><span class="description">: L\u1EE3i nhu\u1EADn nh\u1EADn \u0111\u01B0\u1EE3c c\u1EE7a kho\u1EA3n \u0111\u1EA7u t\u01B0 (\u0111\u01A1n v\u1ECB: \u0111\u1ED3ng)</span></li><li class="formula_item"><span class="symbol">V</span><span class="description">: Gi\xE1 tr\u1ECB kho\u1EA3ng ti\u1EC1n \u0111\u1EA7u t\u01B0 (\u0111\u01A1n v\u1ECB: \u0111\u1ED3ng)</span></li><li class="formula_item"><span class="symbol">r</span><span class="description">: L\u1EE3i su\u1EA5t c\u1EE7a kho\u1EA3n \u0111\u1EA7u t\u01B0 (%/n\u0103m)</span></li><li class="formula_item"><span class="symbol">t</span><span class="description">: Kho\u1EA3ng th\u1EDDi gian t\xEDnh l\u1EE3i nhu\u1EADn (\u0111\u01A1n v\u1ECB: ng\xE0y)</span></li><li class="formula_item"><span class="symbol">n</span><span class="description">: K\u1EF3 t\xEDnh l\u1EE3i nhu\u1EADn</span></li></ul></div></div></div></div></section></div></div><div class="col-lg-6"><div class="img mt-5 mt-lg-0"><section class="tc-testimonials-st10"><div class="container" style="${ssrRenderStyle({ "padding": "0" })}"><div class="content row d-flex" style="${ssrRenderStyle({ "justify-content": "flex-end" })}"><div class="col-lg-10" style="${ssrRenderStyle({ "padding": "0" })}"><div class="interest-rate-card"><div class="d-flex flex-column justify-content-between align-items-center"><div class="title"> L\xE3i su\u1EA5t c\xE1c <span class="text-gradient-purple">k\u1EF3 h\u1EA1n</span></div><div class="time">% tr\xEAn n\u0103m</div></div><div class="d-flex align-items-center justify-content-center w-100"><div class="button-group"><button class="${ssrRenderClass(["button", _ctx.active == 1 ? "active" : ""])}"> Theo ng\xE0y </button><button class="${ssrRenderClass(["button", _ctx.active == 2 ? "active" : ""])}"> Theo th\xE1ng/qu\xFD </button></div></div><div class="d-flex justify-content-around align-items-center"><div class="sub-title">Th\u1EDDi h\u1EA1n</div><div class="sub-title">L\xE3i su\u1EA5t</div></div>`);
  if (_ctx.active == 1) {
    _push(`<div><div class="content content-0 active"><div class="d-flex justify-content-around align-items-center item"><div>2-7 ng\xE0y</div><div>2.5%</div></div><div class="d-flex justify-content-around align-items-center item"><div>8-14 ng\xE0y</div><div>3.3%</div></div><div class="d-flex justify-content-around align-items-center item"><div>15-21 ng\xE0y</div><div>3.3%</div></div><div class="d-flex justify-content-around align-items-center item"><div>22-29 ng\xE0y</div><div>4.5%</div></div><div class="d-flex justify-content-around align-items-center item"><div>30-59 ng\xE0y</div><div>5.0%</div></div><div class="d-flex justify-content-around align-items-center item"><div>60-89 ng\xE0y</div><div>5.0%</div></div><div class="d-flex justify-content-around align-items-center item"><div>90 ng\xE0y</div><div>5.0%</div></div></div><div class="content content-1"><div class="d-flex justify-content-around align-items-center item"><div>1 th\xE1ng</div><div>4.0%</div></div><div class="d-flex justify-content-around align-items-center item"><div>2 th\xE1ng</div><div>-%</div></div><div class="d-flex justify-content-around align-items-center item"><div>3 th\xE1ng</div><div>5.1%</div></div><div class="d-flex justify-content-around align-items-center item"><div>4 th\xE1ng</div><div>5.2%</div></div><div class="d-flex justify-content-around align-items-center item"><div>5 th\xE1ng</div><div>5.3%</div></div><div class="d-flex justify-content-around align-items-center item"><div>6 th\xE1ng</div><div>5.5%</div></div><div class="d-flex justify-content-around align-items-center item"><div>7 th\xE1ng</div><div>-%</div></div><div class="d-flex justify-content-around align-items-center item"><div>9 th\xE1ng</div><div>6.0%</div></div><div class="d-flex justify-content-around align-items-center item"><div>12 th\xE1ng</div><div>6.5%</div></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.active == 2) {
    _push(`<div><div class="content content-1 active"><div class="d-flex justify-content-around align-items-center item"><div>1 th\xE1ng</div><div>4.0%</div></div><div class="d-flex justify-content-around align-items-center item"><div>2 th\xE1ng</div><div>-%</div></div><div class="d-flex justify-content-around align-items-center item"><div>3 th\xE1ng</div><div>5.1%</div></div><div class="d-flex justify-content-around align-items-center item"><div>4 th\xE1ng</div><div>5.2%</div></div><div class="d-flex justify-content-around align-items-center item"><div>5 th\xE1ng</div><div>5.3%</div></div><div class="d-flex justify-content-around align-items-center item"><div>6 th\xE1ng</div><div>5.5%</div></div><div class="d-flex justify-content-around align-items-center item"><div>7 th\xE1ng</div><div>-%</div></div><div class="d-flex justify-content-around align-items-center item"><div>9 th\xE1ng</div><div>6.0%</div></div><div class="d-flex justify-content-around align-items-center item"><div>12 th\xE1ng</div><div>6.5%</div></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div></div></section></div></div></div></div></section></main></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dich-vu/KKH/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-DnH1N-UU.mjs.map
