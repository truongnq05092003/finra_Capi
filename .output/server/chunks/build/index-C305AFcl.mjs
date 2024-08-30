import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { A as Autoplay, P as Pagination, N as Navigation, S as Swiper2, a as SwiperSlide } from './entry-styles-2.mjs-odfW0i3F.mjs';
import { defineComponent, ref, computed, useSSRContext, unref, withCtx, createVNode } from 'vue';
import { ssrRenderStyle, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
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
  components: {},
  name: "AboutUs",
  setup() {
    let vSwiperRef = null;
    const vSwiperIndex = ref(0);
    const setVSwiperRef = (swiper) => {
      vSwiperRef = swiper;
    };
    const handleChangeSlide = (index2) => {
      vSwiperRef == null ? void 0 : vSwiperRef.slideTo(index2);
    };
    const updateVSwiperIndex = () => {
      var _a;
      return Array.from({ length: ((_a = vSwiperRef == null ? void 0 : vSwiperRef.slides) == null ? void 0 : _a.length) || 0 }, (_, index2) => index2 === (vSwiperRef == null ? void 0 : vSwiperRef.activeIndex));
    };
    const dots = computed(() => {
      var _a;
      return Array.from({ length: ((_a = vSwiperRef == null ? void 0 : vSwiperRef.slides) == null ? void 0 : _a.length) || 0 }, (_, index2) => index2 === (vSwiperRef == null ? void 0 : vSwiperRef.activeIndex));
    });
    return {
      vSwiperRef,
      vSwiperIndex,
      SwiperAutoplay: Autoplay,
      SwiperPagination: Pagination,
      setVSwiperRef,
      updateVSwiperIndex,
      handleChangeSlide,
      dots
    };
  }
});
const _imports_0 = "" + buildAssetsURL("about1.DYJw-N59.png");
const _imports_1 = "" + buildAssetsURL("iphone.BCWdYaCf.png");
const _imports_2 = "" + buildAssetsURL("logo_wh.BzAx-18N.svg");
const _imports_3 = "data:image/svg+xml,%3csvg%20width='304'%20height='303'%20viewBox='0%200%20304%20303'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M59%201V40H231L1%20269L34%20302L264%2072V221H303V1H59Z'%20fill='white'%20stroke='%23151515'/%3e%3c/svg%3e";
const _imports_4 = "" + buildAssetsURL("shap_img.YpnqcsZ-.png");
const _imports_5 = "data:image/svg+xml,%3csvg%20width='62'%20height='93'%20viewBox='0%200%2062%2093'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M52.6893%2033.1423H7.32073C3.29869%2033.1423%200.0810547%2036.36%200.0810547%2040.3822V85.7517C0.0810547%2092.1871%207.88381%2095.4049%2012.4689%2090.9001L57.8376%2045.5305C62.3422%2040.9453%2059.1246%2033.1423%2052.6893%2033.1423Z'%20fill='url(%23paint0_linear_110_1616)'/%3e%3cpath%20d='M54.1367%200H7.48099C3.37851%200%200%203.29814%200%207.48116V54.1378C0%2060.7341%208.04408%2064.1127%2012.7096%2059.3666L59.3653%2012.7099C64.1113%208.04425%2060.8133%200%2054.1367%200Z'%20fill='url(%23paint1_linear_110_1616)'/%3e%3cpath%20d='M12.7903%2059.3666L39.014%2033.1423H7.32035C3.29831%2033.1423%200.0806769%2036.36%200.0806769%2040.3822V54.0574C0.000236034%2060.7341%208.04432%2064.0323%2012.7903%2059.3666Z'%20fill='%232F7BF2'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_110_1616'%20x1='53.0541'%20y1='36.0528'%20x2='-0.952484'%20y2='67.9996'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23C06AE4'/%3e%3cstop%20offset='1'%20stop-color='%234D24C6'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_110_1616'%20x1='60.024'%20y1='2.10611'%20x2='-1.4092e-06'%20y2='36.8568'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%2300FDC2'/%3e%3cstop%20offset='1'%20stop-color='%2300C3DE'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
const _imports_6 = "" + buildAssetsURL("clound.B5oQCtjL.png");
const _imports_7 = "data:image/svg+xml,%3csvg%20width='20'%20height='19'%20viewBox='0%200%2020%2019'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.51859%2018.508C9.15859%2016.444%207.69459%2013.852%204.91059%2011.764C3.54259%2010.732%202.15059%2010.06%200.782594%209.772V8.764C3.49459%208.116%206.15859%206.292%207.86259%203.82C8.72659%202.572%209.27859%201.348%209.51859%200.0759997H10.5266C10.9346%202.5%2012.8066%205.188%2015.3506%206.988C16.5986%207.876%2017.8946%208.476%2019.2146%208.764V9.772C16.5506%2010.324%2013.4546%2012.7%2011.9186%2015.124C11.1506%2016.348%2010.6946%2017.476%2010.5266%2018.508H9.51859Z'%20fill='url(%23paint0_linear_110_1640)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_110_1640'%20x1='-5.00402'%20y1='20.0476'%20x2='14.8738'%20y2='15.7613'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%232F7BF2'/%3e%3cstop%20offset='1'%20stop-color='%231CFFC7'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
const _imports_8 = "" + buildAssetsURL("thunder.BT2ulupp.png");
const _imports_9 = "" + buildAssetsURL("star5.J7dUw4uj.png");
const _imports_10 = "" + buildAssetsURL("arrow.BDVLlJnA.png");
const _imports_11 = "" + buildAssetsURL("ups_logo.Dbx9ziTU.svg");
const _imports_12 = "" + buildAssetsURL("f1_logo.BpUfssxC.svg");
const _imports_13 = "" + buildAssetsURL("bidv_logo.COiTvVpu.svg");
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_swiper = Swiper2;
  const _component_swiper_slide = SwiperSlide;
  _push(`<!--[--><header class="tc-innerHeader-st1" data-v-a81c1319><div class="container mt-100" data-v-a81c1319><div class="fs-6 fw-700" data-v-a81c1319>V\u1EC1 ch\xFAng t\xF4i</div><div class="title col-lg-8 mt-20" data-v-a81c1319><h1 class="fsz-50 text-capitalize fw-600" data-v-a81c1319> H\xE0nh tr\xECnh h\u01B0\u1EDBng t\u1EDBi <span class="text-gradient-purple" data-v-a81c1319>d\u1EABn \u0111\u1EA7u</span> v\u1EC1 n\u1EC1n t\u1EA3ng c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh </h1></div><div class="info mt-30" data-v-a81c1319><div class="row" data-v-a81c1319><div class="col-lg-8" data-v-a81c1319><div class="text fsz-16 fw-500" style="${ssrRenderStyle({ "color": "rgba(43, 54, 72, 0.66)" })}" data-v-a81c1319> V\u1EDBi t\u01B0 duy s\xE1ng t\u1EA1o c\xF4ng ngh\u1EC7, s\u1ED1 ho\xE1 to\xE0n di\u1EC7n ch\xFAng t\xF4i h\u01B0\u1EDBng t\u1EDBi c\xE1c t\u01B0 v\u1EA5n, khuy\u1EBFn ngh\u1ECB \u0111\u01B0\u1EE3c c\xE1 nh\xE2n ho\xE1 cho m\u1ECDi kh\xE1ch h\xE0ng, cung c\u1EA5p cho kh\xE1ch h\xE0ng c\u1EE7a ch\xFAng t\xF4i nh\u1EEFng s\u1EA3n ph\u1EA9m \u0111\u1EA7u t\u01B0 hi\u1EC7u su\u1EA5t cao v\u1EDBi c\u1EA5u tr\xFAc l\xE3i su\u1EA5t minh b\u1EA1ch. </div></div></div></div></div></header><main data-v-a81c1319><section class="tc-about-st10" data-v-a81c1319><div class="main-img" data-v-a81c1319><img${ssrRenderAttr("src", _imports_0)} alt="about image" class="img-cover" data-v-a81c1319></div></section><section data-v-a81c1319><div class="container mt-100 tc-proud" data-v-a81c1319><div class="row" data-v-a81c1319><div class="col-lg-6 d-flex flex-column justify-content-around" data-v-a81c1319><div data-v-a81c1319><div class="fs-6 fw-500" data-v-a81c1319> V\u1EDBi \u0111\u1ED9i ng\u0169 chuy\xEAn vi\xEAn gi\xE0u kinh nghi\u1EC7m v\xE0 chuy\xEAn m\xF4n </div><div class="mt-20" data-v-a81c1319><h1 class="title fsz-48 fw-600" data-v-a81c1319> Ch\xFAng t\xF4i t\u1EF1 h\xE0o mang \u0111\u1EBFn cho kh\xE1ch h\xE0ng gi\u1EA3i ph\xE1p \u0111\u1EA7u t\u01B0 t\u1ED1i \u01B0u nh\u1EA5t <span class="text-gradient-purple d-inline" data-v-a81c1319>d\u1EF1a tr\xEAn s\u1EF1 nhi\u1EC7t huy\u1EBFt v\xE0 trung th\u1EF1c</span></h1></div></div><div class="info mt-30" data-v-a81c1319><div class="text fsz-16 cr-777" data-v-a81c1319> Ch\xFAng t\xF4i kh\xF4ng ng\u1EEBng n\u1ED7 l\u1EF1c nghi\xEAn c\u1EE9u c\xE1c c\xF4ng ngh\u1EC7 s\u1ED1 ho\xE1 m\u1EDBi nh\u1EA5t \u0111\u1EC3 t\u1EA1o ra s\u1EF1 kh\xE1c bi\u1EC7t v\u1EC1 s\u1EA3n ph\u1EA9m t\u1EADp trung v\xE0o th\xE0nh c\xF4ng l\xE2u d\xE0i b\u1EC1n v\u1EEFng c\u1EE7a kh\xE1ch h\xE0ng v\xE0 <span class="text-gradient-purple" data-v-a81c1319>\u0111\u01B0a Finra Capital</span> tr\u1EDF th\xE0nh th\u01B0\u01A1ng hi\u1EC7u \u0111\u01B0\u1EE3c kh\xE1ch h\xE0ng tin t\u01B0\u1EDFng c\xF3 \u1EA3nh h\u01B0\u1EDFng t\xEDch c\u1EF1c v\u1EDBi ph\u01B0\u01A1ng ch\xE2m: </div><div class="slogan mt-20" data-v-a81c1319> \u201C T\u1EA1i Finra Capital - B\u1EA1n l\xE0 \u01B0u ti\xEAn s\u1ED1 m\u1ED9t c\u1EE7a ch\xFAng t\xF4i <span class="quote-icon" data-v-a81c1319>\u201C</span></div></div></div><div class="col-lg-1" data-v-a81c1319></div><div class="col-lg-5" data-v-a81c1319><img${ssrRenderAttr("src", _imports_1)} alt="" data-v-a81c1319></div></div></div></section><section class="tc-about-st10" data-v-a81c1319><div class="about" data-v-a81c1319><div class="container" data-v-a81c1319><div class="row gx-5" data-v-a81c1319><div class="col-lg-6" data-v-a81c1319><div class="title-side wow fadeIn slow" data-v-a81c1319><div class="icon th-50 mb-15" data-v-a81c1319><img${ssrRenderAttr("src", _imports_2)} alt="" class="logo" data-v-a81c1319></div><h2 class="title" data-v-a81c1319>T\u1EA7m nh\xECn &amp; s\u1EE9 m\u1EC7nh</h2><div class="cont" data-v-a81c1319><img${ssrRenderAttr("src", _imports_3)} alt="" class="arrow" data-v-a81c1319></div></div></div><div class="col-lg-6" data-v-a81c1319><div class="progress-side wow fadeIn slow" data-v-a81c1319><div class="shap-img" data-v-a81c1319><img${ssrRenderAttr("src", _imports_4)} alt="" data-v-a81c1319></div><div class="row" data-v-a81c1319><div class="col-lg-8" data-v-a81c1319><div class="text fsz-16 cr-777 mt-40 content-heading" data-v-a81c1319> M\u1EE5c ti\xEAu \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh <span class="text-gradient-purple" data-v-a81c1319>\u0111\u01A1n gi\u1EA3n</span> h\u01A1n v\xE0 <span class="text-gradient-purple" data-v-a81c1319>chuy\xEAn nghi\u1EC7p</span></div><div data-v-a81c1319><div class="content" data-v-a81c1319> Gi\xFAp kh\xE1ch h\xE0ng c\u1EE7a ch\xFAng t\xF4i c\xF3 \u0111\u01B0\u1EE3c c\u01A1 h\u1ED9i \u0111\u1EA7u t\u01B0 t\u1ED1t nh\u1EA5t, \u0111\u1EA3m b\u1EA3o hi\u1EC7u su\u1EA5t cao b\u1EB1ng s\u1EF1 s\xE1ng t\u1EA1o, \u0111am m\xEA v\xE0 ch\xEDnh tr\u1EF1c. </div><div class="content" data-v-a81c1319> T\u1EA1o ra thay \u0111\u1ED5i t\xEDch c\u1EF1c, tr\u1EDF th\xE0nh \u0111\u01A1n v\u1ECB d\u1EABn \u0111\u1EA7u \u0111\xE1ng tin c\u1EADy nh\u1EA5t trong l\u0129nh v\u1EF1c d\u1ECBch v\u1EE5 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh. </div></div></div></div></div></div></div></div></div></section><section class="tc-services-st1" style="${ssrRenderStyle({ "background-color": "#1D4692" })}" data-v-a81c1319><div class="container wow fadeIn slow" data-v-a81c1319><div class="title" data-v-a81c1319><div class="row justify-content-between align-items-end" data-v-a81c1319><div class="col-lg-6" data-v-a81c1319><img${ssrRenderAttr("src", _imports_5)} alt="" class="logo" data-v-a81c1319><h2 class="fsz-50 text-capitalize" data-v-a81c1319>Gi\xE1 tr\u1ECB c\u1ED1t l\xF5i</h2></div><div class="col-lg-4 mt-4 mt-lg-0" data-v-a81c1319><p style="${ssrRenderStyle({ "color": "#fff" })}" data-v-a81c1319> \u201CTinh th\u1EA7n quan t\xE2m, chia s\u1EBB v\xE0 th\u1EA5u hi\u1EC3u l\xE0 n\u1EC1n t\u1EA3ng cho th\xE0nh c\xF4ng c\u1EE7a ch\xFAng t\xF4i trong vi\u1EC7c ph\u1EE5c v\u1EE5 kh\xE1ch h\xE0ng v\xE0 x\xE3 h\u1ED9i&quot; </p></div></div></div><div class="services-slider" data-v-a81c1319>`);
  _push(ssrRenderComponent(_component_swiper, {
    modules: ["SwiperNavigation" in _ctx ? _ctx.SwiperNavigation : unref(Navigation), "SwiperAutoplay" in _ctx ? _ctx.SwiperAutoplay : unref(Autoplay)],
    pagination: true,
    "slides-per-view": 1,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    speed: 1e3,
    "space-between": 80,
    "initial-slide": _ctx.vSwiperIndex,
    breakpoints: {
      1920: { slidesPerView: 4 },
      760: { slidesPerView: 4 }
    }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="swiper-slide" data-v-a81c1319${_scopeId2}><div class="service-card" data-v-a81c1319${_scopeId2}><div class="icon" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_6)} alt="" data-v-a81c1319${_scopeId2}></div><div class="card-title" data-v-a81c1319${_scopeId2}><h6 class="fsz-24 fw-500" data-v-a81c1319${_scopeId2}>Hi\u1EC7u qu\u1EA3</h6></div><div class="content" data-v-a81c1319${_scopeId2}> Ch\xFAng t\xF4i lu\xF4n c\xF4ng b\u1EB1ng v\xE0 n\u1ED7 l\u1EF1c duy tr\xEC c\xE1c ti\xEAu chu\u1EA9n \u0111\u1EA1o \u0111\u1EE9c cao nh\u1EA5t \u0111\u1EC3 \u0111\u1EB7t l\u1EE3i \xEDch c\u1EE7a kh\xE1ch h\xE0ng l\xEAn h\xE0ng \u0111\u1EA7u nh\u1EB1m t\u1EA1o ra hi\u1EC7u qu\u1EA3 n\u0103ng su\u1EA5t t\u1ED1t nh\u1EA5t </div><div class="bottom-slider" data-v-a81c1319${_scopeId2}><div class="num-line" data-v-a81c1319${_scopeId2}><span class="num" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_7)} alt="" class="logo" data-v-a81c1319${_scopeId2}></span></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "swiper-slide" }, [
                  createVNode("div", { class: "service-card" }, [
                    createVNode("div", { class: "icon" }, [
                      createVNode("img", {
                        src: _imports_6,
                        alt: ""
                      })
                    ]),
                    createVNode("div", { class: "card-title" }, [
                      createVNode("h6", { class: "fsz-24 fw-500" }, "Hi\u1EC7u qu\u1EA3")
                    ]),
                    createVNode("div", { class: "content" }, " Ch\xFAng t\xF4i lu\xF4n c\xF4ng b\u1EB1ng v\xE0 n\u1ED7 l\u1EF1c duy tr\xEC c\xE1c ti\xEAu chu\u1EA9n \u0111\u1EA1o \u0111\u1EE9c cao nh\u1EA5t \u0111\u1EC3 \u0111\u1EB7t l\u1EE3i \xEDch c\u1EE7a kh\xE1ch h\xE0ng l\xEAn h\xE0ng \u0111\u1EA7u nh\u1EB1m t\u1EA1o ra hi\u1EC7u qu\u1EA3 n\u0103ng su\u1EA5t t\u1ED1t nh\u1EA5t "),
                    createVNode("div", { class: "bottom-slider" }, [
                      createVNode("div", { class: "num-line" }, [
                        createVNode("span", { class: "num" }, [
                          createVNode("img", {
                            src: _imports_7,
                            alt: "",
                            class: "logo"
                          })
                        ])
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="swiper-slide" data-v-a81c1319${_scopeId2}><div class="service-card" data-v-a81c1319${_scopeId2}><div class="icon" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_8)} alt="" data-v-a81c1319${_scopeId2}></div><div class="card-title" data-v-a81c1319${_scopeId2}><h6 class="fsz-24 fw-500" data-v-a81c1319${_scopeId2}>S\xE1ng t\u1EA1o</h6></div><div class="content" data-v-a81c1319${_scopeId2}> Kh\xF4ng ng\u1EEBng c\u1EA3i thi\u1EC7n tr\u1EA3i nghi\u1EC7m c\u1EE7a kh\xE1ch h\xE0ng th\xF4ng qua s\u1EF1 \u0111\u1ED5i m\u1EDBi n\u1EC1n t\u1EA3ng c\xF4ng ngh\u1EC7 \u0111\u1EC3 t\u1EA1o s\u1EF1 kh\xE1ch bi\u1EC7t mang l\u1EA1i l\u1EE3i \xEDch cho kh\xE1ch h\xE0ng c\u1EE7a ch\xFAng t\xF4i. </div><div class="bottom-slider" data-v-a81c1319${_scopeId2}><div class="num-line" data-v-a81c1319${_scopeId2}><span class="num" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_7)} alt="" class="logo" data-v-a81c1319${_scopeId2}></span></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "swiper-slide" }, [
                  createVNode("div", { class: "service-card" }, [
                    createVNode("div", { class: "icon" }, [
                      createVNode("img", {
                        src: _imports_8,
                        alt: ""
                      })
                    ]),
                    createVNode("div", { class: "card-title" }, [
                      createVNode("h6", { class: "fsz-24 fw-500" }, "S\xE1ng t\u1EA1o")
                    ]),
                    createVNode("div", { class: "content" }, " Kh\xF4ng ng\u1EEBng c\u1EA3i thi\u1EC7n tr\u1EA3i nghi\u1EC7m c\u1EE7a kh\xE1ch h\xE0ng th\xF4ng qua s\u1EF1 \u0111\u1ED5i m\u1EDBi n\u1EC1n t\u1EA3ng c\xF4ng ngh\u1EC7 \u0111\u1EC3 t\u1EA1o s\u1EF1 kh\xE1ch bi\u1EC7t mang l\u1EA1i l\u1EE3i \xEDch cho kh\xE1ch h\xE0ng c\u1EE7a ch\xFAng t\xF4i. "),
                    createVNode("div", { class: "bottom-slider" }, [
                      createVNode("div", { class: "num-line" }, [
                        createVNode("span", { class: "num" }, [
                          createVNode("img", {
                            src: _imports_7,
                            alt: "",
                            class: "logo"
                          })
                        ])
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="swiper-slide" data-v-a81c1319${_scopeId2}><div class="service-card" data-v-a81c1319${_scopeId2}><div class="icon" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_9)} alt="" data-v-a81c1319${_scopeId2}></div><div class="card-title" data-v-a81c1319${_scopeId2}><h6 class="fsz-24 fw-500" data-v-a81c1319${_scopeId2}>Ch\xEDnh tr\u1EF1c</h6></div><div class="content" data-v-a81c1319${_scopeId2}> Ch\xFAng t\xF4i \u0111\u1EC1 cao s\u1EF1 tu\xE2n th\u1EE7 quy \u0111\u1ECBnh c\u1EE7a ph\xE1p lu\u1EADt v\xE0 quy \u0111\u1ECBnh qu\u1EA3n tr\u1ECB r\u1EE7i ro, v\xE0 c\xE2n nh\u1EAFc c\xE1c m\u1EB7t r\u1EE7i ro v\xE0 hi\u1EC7u qu\u1EA3 mang l\u1EA1i trong m\u1ECDi ho\u1EA1t \u0111\u1ED9ng v\u1EDBi Ph\u01B0\u01A1ng ch\xE2m \u0111\u01A1n gi\u1EA3n: L\xE0m \u0111i\u1EC1u \u0111\xFAng \u0111\u1EAFn. </div><div class="bottom-slider" data-v-a81c1319${_scopeId2}><div class="num-line" data-v-a81c1319${_scopeId2}><span class="num" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_7)} alt="" class="logo" data-v-a81c1319${_scopeId2}></span></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "swiper-slide" }, [
                  createVNode("div", { class: "service-card" }, [
                    createVNode("div", { class: "icon" }, [
                      createVNode("img", {
                        src: _imports_9,
                        alt: ""
                      })
                    ]),
                    createVNode("div", { class: "card-title" }, [
                      createVNode("h6", { class: "fsz-24 fw-500" }, "Ch\xEDnh tr\u1EF1c")
                    ]),
                    createVNode("div", { class: "content" }, " Ch\xFAng t\xF4i \u0111\u1EC1 cao s\u1EF1 tu\xE2n th\u1EE7 quy \u0111\u1ECBnh c\u1EE7a ph\xE1p lu\u1EADt v\xE0 quy \u0111\u1ECBnh qu\u1EA3n tr\u1ECB r\u1EE7i ro, v\xE0 c\xE2n nh\u1EAFc c\xE1c m\u1EB7t r\u1EE7i ro v\xE0 hi\u1EC7u qu\u1EA3 mang l\u1EA1i trong m\u1ECDi ho\u1EA1t \u0111\u1ED9ng v\u1EDBi Ph\u01B0\u01A1ng ch\xE2m \u0111\u01A1n gi\u1EA3n: L\xE0m \u0111i\u1EC1u \u0111\xFAng \u0111\u1EAFn. "),
                    createVNode("div", { class: "bottom-slider" }, [
                      createVNode("div", { class: "num-line" }, [
                        createVNode("span", { class: "num" }, [
                          createVNode("img", {
                            src: _imports_7,
                            alt: "",
                            class: "logo"
                          })
                        ])
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="swiper-slide" data-v-a81c1319${_scopeId2}><div class="service-card" data-v-a81c1319${_scopeId2}><div class="icon" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_10)} alt="" data-v-a81c1319${_scopeId2}></div><div class="card-title" data-v-a81c1319${_scopeId2}><h6 class="fsz-24 fw-500" data-v-a81c1319${_scopeId2}>Ni\u1EC1m tin &amp; Chia s\u1EBB</h6></div><div class="content" data-v-a81c1319${_scopeId2}> X\xE2y d\u1EF1ng ni\u1EC1m tin v\u1EDBi kh\xE1ch h\xE0ng b\u1EB1ng c\xE1ch \u1EE9ng x\u1EED c\xF3 \u0111\u1EA1o \u0111\u1EE9c, \u0111\u1ED3ng c\u1EA3m v\xE0 ch\u1EE7 \u0111\u1ED9ng. Ch\xFAng t\xF4i tr\u1EDF n\xEAn m\u1EA1nh m\u1EBD h\u01A1n khi c\xF9ng g\u1EAFn k\u1EBFt quy\u1EC1n l\u1EE3i c\u1EE7a m\xECnh v\u1EDBi kh\xE1ch h\xE0ng c\u1EE7a ch\xFAng t\xF4i b\u1EB1ng s\u1EF1 h\xE0i h\xF2a v\xE0 chia s\u1EBD c\xE1c gi\xE1 tr\u1ECB c\u1ED1t l\xF5i. </div><div class="bottom-slider" data-v-a81c1319${_scopeId2}><div class="num-line" data-v-a81c1319${_scopeId2}><span class="num" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_7)} alt="" class="logo" data-v-a81c1319${_scopeId2}></span></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "swiper-slide" }, [
                  createVNode("div", { class: "service-card" }, [
                    createVNode("div", { class: "icon" }, [
                      createVNode("img", {
                        src: _imports_10,
                        alt: ""
                      })
                    ]),
                    createVNode("div", { class: "card-title" }, [
                      createVNode("h6", { class: "fsz-24 fw-500" }, "Ni\u1EC1m tin & Chia s\u1EBB")
                    ]),
                    createVNode("div", { class: "content" }, " X\xE2y d\u1EF1ng ni\u1EC1m tin v\u1EDBi kh\xE1ch h\xE0ng b\u1EB1ng c\xE1ch \u1EE9ng x\u1EED c\xF3 \u0111\u1EA1o \u0111\u1EE9c, \u0111\u1ED3ng c\u1EA3m v\xE0 ch\u1EE7 \u0111\u1ED9ng. Ch\xFAng t\xF4i tr\u1EDF n\xEAn m\u1EA1nh m\u1EBD h\u01A1n khi c\xF9ng g\u1EAFn k\u1EBFt quy\u1EC1n l\u1EE3i c\u1EE7a m\xECnh v\u1EDBi kh\xE1ch h\xE0ng c\u1EE7a ch\xFAng t\xF4i b\u1EB1ng s\u1EF1 h\xE0i h\xF2a v\xE0 chia s\u1EBD c\xE1c gi\xE1 tr\u1ECB c\u1ED1t l\xF5i. "),
                    createVNode("div", { class: "bottom-slider" }, [
                      createVNode("div", { class: "num-line" }, [
                        createVNode("span", { class: "num" }, [
                          createVNode("img", {
                            src: _imports_7,
                            alt: "",
                            class: "logo"
                          })
                        ])
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode("div", { class: "swiper-slide" }, [
                createVNode("div", { class: "service-card" }, [
                  createVNode("div", { class: "icon" }, [
                    createVNode("img", {
                      src: _imports_6,
                      alt: ""
                    })
                  ]),
                  createVNode("div", { class: "card-title" }, [
                    createVNode("h6", { class: "fsz-24 fw-500" }, "Hi\u1EC7u qu\u1EA3")
                  ]),
                  createVNode("div", { class: "content" }, " Ch\xFAng t\xF4i lu\xF4n c\xF4ng b\u1EB1ng v\xE0 n\u1ED7 l\u1EF1c duy tr\xEC c\xE1c ti\xEAu chu\u1EA9n \u0111\u1EA1o \u0111\u1EE9c cao nh\u1EA5t \u0111\u1EC3 \u0111\u1EB7t l\u1EE3i \xEDch c\u1EE7a kh\xE1ch h\xE0ng l\xEAn h\xE0ng \u0111\u1EA7u nh\u1EB1m t\u1EA1o ra hi\u1EC7u qu\u1EA3 n\u0103ng su\u1EA5t t\u1ED1t nh\u1EA5t "),
                  createVNode("div", { class: "bottom-slider" }, [
                    createVNode("div", { class: "num-line" }, [
                      createVNode("span", { class: "num" }, [
                        createVNode("img", {
                          src: _imports_7,
                          alt: "",
                          class: "logo"
                        })
                      ])
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode("div", { class: "swiper-slide" }, [
                createVNode("div", { class: "service-card" }, [
                  createVNode("div", { class: "icon" }, [
                    createVNode("img", {
                      src: _imports_8,
                      alt: ""
                    })
                  ]),
                  createVNode("div", { class: "card-title" }, [
                    createVNode("h6", { class: "fsz-24 fw-500" }, "S\xE1ng t\u1EA1o")
                  ]),
                  createVNode("div", { class: "content" }, " Kh\xF4ng ng\u1EEBng c\u1EA3i thi\u1EC7n tr\u1EA3i nghi\u1EC7m c\u1EE7a kh\xE1ch h\xE0ng th\xF4ng qua s\u1EF1 \u0111\u1ED5i m\u1EDBi n\u1EC1n t\u1EA3ng c\xF4ng ngh\u1EC7 \u0111\u1EC3 t\u1EA1o s\u1EF1 kh\xE1ch bi\u1EC7t mang l\u1EA1i l\u1EE3i \xEDch cho kh\xE1ch h\xE0ng c\u1EE7a ch\xFAng t\xF4i. "),
                  createVNode("div", { class: "bottom-slider" }, [
                    createVNode("div", { class: "num-line" }, [
                      createVNode("span", { class: "num" }, [
                        createVNode("img", {
                          src: _imports_7,
                          alt: "",
                          class: "logo"
                        })
                      ])
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode("div", { class: "swiper-slide" }, [
                createVNode("div", { class: "service-card" }, [
                  createVNode("div", { class: "icon" }, [
                    createVNode("img", {
                      src: _imports_9,
                      alt: ""
                    })
                  ]),
                  createVNode("div", { class: "card-title" }, [
                    createVNode("h6", { class: "fsz-24 fw-500" }, "Ch\xEDnh tr\u1EF1c")
                  ]),
                  createVNode("div", { class: "content" }, " Ch\xFAng t\xF4i \u0111\u1EC1 cao s\u1EF1 tu\xE2n th\u1EE7 quy \u0111\u1ECBnh c\u1EE7a ph\xE1p lu\u1EADt v\xE0 quy \u0111\u1ECBnh qu\u1EA3n tr\u1ECB r\u1EE7i ro, v\xE0 c\xE2n nh\u1EAFc c\xE1c m\u1EB7t r\u1EE7i ro v\xE0 hi\u1EC7u qu\u1EA3 mang l\u1EA1i trong m\u1ECDi ho\u1EA1t \u0111\u1ED9ng v\u1EDBi Ph\u01B0\u01A1ng ch\xE2m \u0111\u01A1n gi\u1EA3n: L\xE0m \u0111i\u1EC1u \u0111\xFAng \u0111\u1EAFn. "),
                  createVNode("div", { class: "bottom-slider" }, [
                    createVNode("div", { class: "num-line" }, [
                      createVNode("span", { class: "num" }, [
                        createVNode("img", {
                          src: _imports_7,
                          alt: "",
                          class: "logo"
                        })
                      ])
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode("div", { class: "swiper-slide" }, [
                createVNode("div", { class: "service-card" }, [
                  createVNode("div", { class: "icon" }, [
                    createVNode("img", {
                      src: _imports_10,
                      alt: ""
                    })
                  ]),
                  createVNode("div", { class: "card-title" }, [
                    createVNode("h6", { class: "fsz-24 fw-500" }, "Ni\u1EC1m tin & Chia s\u1EBB")
                  ]),
                  createVNode("div", { class: "content" }, " X\xE2y d\u1EF1ng ni\u1EC1m tin v\u1EDBi kh\xE1ch h\xE0ng b\u1EB1ng c\xE1ch \u1EE9ng x\u1EED c\xF3 \u0111\u1EA1o \u0111\u1EE9c, \u0111\u1ED3ng c\u1EA3m v\xE0 ch\u1EE7 \u0111\u1ED9ng. Ch\xFAng t\xF4i tr\u1EDF n\xEAn m\u1EA1nh m\u1EBD h\u01A1n khi c\xF9ng g\u1EAFn k\u1EBFt quy\u1EC1n l\u1EE3i c\u1EE7a m\xECnh v\u1EDBi kh\xE1ch h\xE0ng c\u1EE7a ch\xFAng t\xF4i b\u1EB1ng s\u1EF1 h\xE0i h\xF2a v\xE0 chia s\u1EBD c\xE1c gi\xE1 tr\u1ECB c\u1ED1t l\xF5i. "),
                  createVNode("div", { class: "bottom-slider" }, [
                    createVNode("div", { class: "num-line" }, [
                      createVNode("span", { class: "num" }, [
                        createVNode("img", {
                          src: _imports_7,
                          alt: "",
                          class: "logo"
                        })
                      ])
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="service-footer mt-50" data-v-a81c1319><div class="quote-icon" data-v-a81c1319></div><span class="text-gradient-green" data-v-a81c1319>\u201C Finra Capital </span> kh\xF4ng ch\u1EC9 thay \u0111\u1ED5i c\xE1ch th\u1EE9c \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh theo h\u01B0\u1EDBng t\u1ED1t h\u01A1n m\xE0 c\xF2n thay \u0111\u1ED5i cu\u1ED9c s\u1ED1ng c\u1EE7a b\u1EA1n theo h\u01B0\u1EDBng t\u1ED1t \u0111\u1EB9p h\u01A1n <span class="quote-icon" data-v-a81c1319>\u201C</span><div class="quote-icon" data-v-a81c1319></div></div></div></section><section class="tc-partner mt-100 mb-100" data-v-a81c1319><div class="container" data-v-a81c1319><div data-v-a81c1319><a href="#" class="logo" data-v-a81c1319><img${ssrRenderAttr("src", _imports_2)} alt="" data-v-a81c1319></a></div><div class="title fs-1" data-v-a81c1319> S\u1EF1 \u0111\u1ED3ng h\xE0nh <br data-v-a81c1319> c\u1EE7a <span class="text-gradient-green" data-v-a81c1319>uy t\xEDn</span></div><div class="fw-500" data-v-a81c1319>\u0110\u1ED1i t\xE1c c\u1EE7a Finra</div><div class="row" data-v-a81c1319><div class="col-lg-4" data-v-a81c1319></div><div class="col-lg-8 d-flex gap-3 align-items-center justify-content-md-between justify-content-between flex-wrap flex-lg-nowrap" data-v-a81c1319><div data-v-a81c1319><img${ssrRenderAttr("src", _imports_11)} alt="youtube icon" data-v-a81c1319></div><div data-v-a81c1319><img${ssrRenderAttr("src", _imports_12)} alt="youtube icon" data-v-a81c1319></div><div data-v-a81c1319><img${ssrRenderAttr("src", _imports_13)} alt="youtube icon" data-v-a81c1319></div></div></div></div></section></main><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ve-chung-toi/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a81c1319"]]);

export { index as default };
//# sourceMappingURL=index-C305AFcl.mjs.map
