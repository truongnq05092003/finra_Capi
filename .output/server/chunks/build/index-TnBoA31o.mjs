import { A as Autoplay, N as Navigation, S as Swiper2, a as SwiperSlide } from './entry-styles-2.mjs-odfW0i3F.mjs';
import { defineComponent, ref, useSSRContext, mergeProps, unref, withCtx, createVNode, createTextVNode } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { _ as _imports_0 } from './virtual_public-BQZui9UJ.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../runtime.mjs';
import 'fs';
import 'path';
import 'unhead';
import 'axios';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import '@unhead/shared';

const _sfc_main$1 = defineComponent({
  name: "finra-slider",
  components: {},
  setup(props, ctx) {
    let vSwiperRef = null;
    const vSwiperIndex = ref(0);
    const setVSwiperRef = (swiper) => {
      vSwiperRef = swiper;
    };
    const handleChangeSlide = (index2) => {
      vSwiperRef == null ? void 0 : vSwiperRef.slideTo(index2);
    };
    const updateVSwiperIndex = () => {
      vSwiperIndex.value = (vSwiperRef == null ? void 0 : vSwiperRef.activeIndex) || 0;
    };
    const prevVSwiperSlide = () => vSwiperRef == null ? void 0 : vSwiperRef.slidePrev();
    const nextVSwiperSlide = () => vSwiperRef == null ? void 0 : vSwiperRef.slideNext();
    return {
      vSwiperRef,
      vSwiperIndex,
      SwiperAutoplay: Autoplay,
      SwiperNavigation: Navigation,
      setVSwiperRef,
      updateVSwiperIndex,
      handleChangeSlide,
      prevVSwiperSlide,
      nextVSwiperSlide
    };
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_swiper = Swiper2;
  const _component_swiper_slide = SwiperSlide;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "finra-slider" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_swiper, {
    modules: ["SwiperNavigation" in _ctx ? _ctx.SwiperNavigation : unref(Navigation), "SwiperAutoplay" in _ctx ? _ctx.SwiperAutoplay : unref(Autoplay)],
    "slides-per-view": 1,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    speed: 1e3,
    "space-between": 0,
    "initial-slide": _ctx.vSwiperIndex,
    onSwiper: _ctx.setVSwiperRef,
    onSlideChange: _ctx.updateVSwiperIndex
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<header class="tc-header-st1" style="${ssrRenderStyle({ "background-image": "url('/resource1/home1_creativeAgency/assets/img/slider-1.png')" })}"${_scopeId2}><div class="container"${_scopeId2}><div class="row gx-lg-0"${_scopeId2}><div class="col-lg-8 pb-120"${_scopeId2}><div class="info text-white"${_scopeId2}><a href="/dich-vu/kkh"${_scopeId2}><h6 class="text-white"${_scopeId2}> Tr\u1EA3i nghi\u1EC7m \u0111\u1EB7c bi\u1EC7t t\u1EA1o n\xEAn m\u1ED9t <span class="text-finra-primary"${_scopeId2}>FINRA</span> \u01B0u vi\u1EC7t </h6></a><a href="/dich-vu/kkh"${_scopeId2}><h1${_scopeId2}> Gi\u1EA3i ph\xE1p <br${_scopeId2}><span class="text-right text-gradient-green"${_scopeId2}> \u0110\u1EA7u t\u01B0 t\xE0i ch\xEDnh </span></h1><div class="text fsz-16 col-lg-9 text-white"${_scopeId2}> Finra d\u1EABn \u0111\u1EA7u v\u1EC1 n\u1EC1n t\u1EA3ng c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh, t\u1EADn d\u1EE5ng s\xE1ng t\u1EA1o c\xF4ng ngh\u1EC7 \u0111\u1EC3 t\u01B0 v\u1EA5n, cung c\u1EA5p c\xE1c gi\u1EA3i ph\xE1p c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh cho kh\xE1ch h\xE0ng. </div></a><div class="btns mt-50 d-flex align-items-center"${_scopeId2}><button class="primary-btn"${_scopeId2}><a href="/dich-vu/kkh" class="d-flex align-items-center gap-2 justify-content-center"${_scopeId2}> Chi ti\u1EBFt <span class="bg-custom-icon"${_scopeId2}><i class="fa-solid fa-arrow-right custom-icon"${_scopeId2}></i></span></a></button><a href="javascript:;" class="text-black fs-6 d-block ms-5 p-2"${_scopeId2}><span class="text-white" style="${ssrRenderStyle({ "text-decoration": "underline" })}"${_scopeId2}> Li\xEAn h\u1EC7 t\u01B0 v\u1EA5n </span></a></div></div></div></div></div></header>`);
            } else {
              return [
                createVNode("header", {
                  class: "tc-header-st1",
                  style: { "background-image": "url('/resource1/home1_creativeAgency/assets/img/slider-1.png')" }
                }, [
                  createVNode("div", { class: "container" }, [
                    createVNode("div", { class: "row gx-lg-0" }, [
                      createVNode("div", { class: "col-lg-8 pb-120" }, [
                        createVNode("div", { class: "info text-white" }, [
                          createVNode("a", { href: "/dich-vu/kkh" }, [
                            createVNode("h6", { class: "text-white" }, [
                              createTextVNode(" Tr\u1EA3i nghi\u1EC7m \u0111\u1EB7c bi\u1EC7t t\u1EA1o n\xEAn m\u1ED9t "),
                              createVNode("span", { class: "text-finra-primary" }, "FINRA"),
                              createTextVNode(" \u01B0u vi\u1EC7t ")
                            ])
                          ]),
                          createVNode("a", { href: "/dich-vu/kkh" }, [
                            createVNode("h1", null, [
                              createTextVNode(" Gi\u1EA3i ph\xE1p "),
                              createVNode("br"),
                              createVNode("span", { class: "text-right text-gradient-green" }, " \u0110\u1EA7u t\u01B0 t\xE0i ch\xEDnh ")
                            ]),
                            createVNode("div", { class: "text fsz-16 col-lg-9 text-white" }, " Finra d\u1EABn \u0111\u1EA7u v\u1EC1 n\u1EC1n t\u1EA3ng c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh, t\u1EADn d\u1EE5ng s\xE1ng t\u1EA1o c\xF4ng ngh\u1EC7 \u0111\u1EC3 t\u01B0 v\u1EA5n, cung c\u1EA5p c\xE1c gi\u1EA3i ph\xE1p c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh cho kh\xE1ch h\xE0ng. ")
                          ]),
                          createVNode("div", { class: "btns mt-50 d-flex align-items-center" }, [
                            createVNode("button", { class: "primary-btn" }, [
                              createVNode("a", {
                                href: "/dich-vu/kkh",
                                class: "d-flex align-items-center gap-2 justify-content-center"
                              }, [
                                createTextVNode(" Chi ti\u1EBFt "),
                                createVNode("span", { class: "bg-custom-icon" }, [
                                  createVNode("i", { class: "fa-solid fa-arrow-right custom-icon" })
                                ])
                              ])
                            ]),
                            createVNode("a", {
                              href: "javascript:;",
                              class: "text-black fs-6 d-block ms-5 p-2"
                            }, [
                              createVNode("span", {
                                class: "text-white",
                                style: { "text-decoration": "underline" }
                              }, " Li\xEAn h\u1EC7 t\u01B0 v\u1EA5n ")
                            ])
                          ])
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
              _push3(`<header class="tc-header-st1" style="${ssrRenderStyle({ "background-image": "url('/resource1/home1_creativeAgency/assets/img/slider-2.png')" })}"${_scopeId2}><div class="container"${_scopeId2}><div class="row gx-lg-0"${_scopeId2}><div class="col-lg-8 pb-120"${_scopeId2}><div class="info text-white"${_scopeId2}><a href="/tuyen-dung"${_scopeId2}><h6 class="text-black"${_scopeId2}> Tr\u1EA3i nghi\u1EC7m \u0111\u1EB7c bi\u1EC7t t\u1EA1o n\xEAn m\u1ED9t <span style="${ssrRenderStyle({ "color": "#2f7bf2" })}"${_scopeId2}>FINRA</span> \u01B0u vi\u1EC7t </h6></a><a href="/tuyen-dung"${_scopeId2}><h1 style="${ssrRenderStyle({ "color": "black !important" })}"${_scopeId2}> T\xECm ki\u1EBFm <br${_scopeId2}><span class="text-right" style="${ssrRenderStyle({ "padding-left": "0 !important", "color": "#2f7bf2 !important" })}"${_scopeId2}> Nh\xE2n t\xE0i m\u1EDBi cho Finra </span></h1><div class="text fsz-16 col-lg-9 text-black"${_scopeId2}> C\xF9ng Finra ki\u1EBFn t\u1EA1o gi\u1EA3i ph\xE1p \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh, m\u1EDF l\u1ED1i t\u01B0\u01A1ng lai t\xE0i ch\xEDnh v\u1EEFng v\xE0ng cho ng\u01B0\u1EDDi Vi\u1EC7t </div></a><div class="btns mt-50 d-flex align-items-center"${_scopeId2}><button class="primary-btn"${_scopeId2}><a href="/tuyen-dung" class="d-flex align-items-center gap-2 justify-content-center"${_scopeId2}> Xem tin tuy\u1EC3n d\u1EE5ng <span class="bg-custom-icon"${_scopeId2}><i class="fa-solid fa-arrow-right custom-icon"${_scopeId2}></i></span></a></button><a href="#" class="text-black fs-6 d-block ms-5 p-2"${_scopeId2}><span class="text-black" style="${ssrRenderStyle({ "text-decoration": "underline" })}"${_scopeId2}> Li\xEAn h\u1EC7 t\u01B0 v\u1EA5n </span></a></div></div></div></div></div></header>`);
            } else {
              return [
                createVNode("header", {
                  class: "tc-header-st1",
                  style: { "background-image": "url('/resource1/home1_creativeAgency/assets/img/slider-2.png')" }
                }, [
                  createVNode("div", { class: "container" }, [
                    createVNode("div", { class: "row gx-lg-0" }, [
                      createVNode("div", { class: "col-lg-8 pb-120" }, [
                        createVNode("div", { class: "info text-white" }, [
                          createVNode("a", { href: "/tuyen-dung" }, [
                            createVNode("h6", { class: "text-black" }, [
                              createTextVNode(" Tr\u1EA3i nghi\u1EC7m \u0111\u1EB7c bi\u1EC7t t\u1EA1o n\xEAn m\u1ED9t "),
                              createVNode("span", { style: { "color": "#2f7bf2" } }, "FINRA"),
                              createTextVNode(" \u01B0u vi\u1EC7t ")
                            ])
                          ]),
                          createVNode("a", { href: "/tuyen-dung" }, [
                            createVNode("h1", { style: { "color": "black !important" } }, [
                              createTextVNode(" T\xECm ki\u1EBFm "),
                              createVNode("br"),
                              createVNode("span", {
                                class: "text-right",
                                style: { "padding-left": "0 !important", "color": "#2f7bf2 !important" }
                              }, " Nh\xE2n t\xE0i m\u1EDBi cho Finra ")
                            ]),
                            createVNode("div", { class: "text fsz-16 col-lg-9 text-black" }, " C\xF9ng Finra ki\u1EBFn t\u1EA1o gi\u1EA3i ph\xE1p \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh, m\u1EDF l\u1ED1i t\u01B0\u01A1ng lai t\xE0i ch\xEDnh v\u1EEFng v\xE0ng cho ng\u01B0\u1EDDi Vi\u1EC7t ")
                          ]),
                          createVNode("div", { class: "btns mt-50 d-flex align-items-center" }, [
                            createVNode("button", { class: "primary-btn" }, [
                              createVNode("a", {
                                href: "/tuyen-dung",
                                class: "d-flex align-items-center gap-2 justify-content-center"
                              }, [
                                createTextVNode(" Xem tin tuy\u1EC3n d\u1EE5ng "),
                                createVNode("span", { class: "bg-custom-icon" }, [
                                  createVNode("i", { class: "fa-solid fa-arrow-right custom-icon" })
                                ])
                              ])
                            ]),
                            createVNode("a", {
                              href: "#",
                              class: "text-black fs-6 d-block ms-5 p-2"
                            }, [
                              createVNode("span", {
                                class: "text-black",
                                style: { "text-decoration": "underline" }
                              }, " Li\xEAn h\u1EC7 t\u01B0 v\u1EA5n ")
                            ])
                          ])
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
              _push3(`<header class="tc-header-st1" style="${ssrRenderStyle({ "background-image": "url('/resource1/home1_creativeAgency/assets/img/slider-3.png')" })}"${_scopeId2}><div class="container"${_scopeId2}><div class="row gx-lg-0"${_scopeId2}><div class="col-lg-8 pb-120"${_scopeId2}><div class="info text-white"${_scopeId2}><a href="/ve-chung-toi"${_scopeId2}><h6 class="text-white"${_scopeId2}> Tr\u1EA3i nghi\u1EC7m \u0111\u1EB7c bi\u1EC7t t\u1EA1o n\xEAn m\u1ED9t <span class="text-finra-primary"${_scopeId2}>FINRA</span> \u01B0u vi\u1EC7t </h6></a><a href="/ve-chung-toi"${_scopeId2}><h1${_scopeId2}> Finra <br${_scopeId2}><span class="text-right text-gradient-green" style="${ssrRenderStyle({ "padding-left": "0 !important" })}"${_scopeId2}> V\u1EC0 CH\xDANG T\xD4I </span></h1><div class="text fsz-16 col-lg-9 text-white"${_scopeId2}> Finra d\u1EABn \u0111\u1EA7u v\u1EC1 n\u1EC1n t\u1EA3ng c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh, t\u1EADn d\u1EE5ng s\xE1ng t\u1EA1o c\xF4ng ngh\u1EC7 \u0111\u1EC3 t\u01B0 v\u1EA5n, cung c\u1EA5p c\xE1c gi\u1EA3i ph\xE1p c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh cho kh\xE1ch h\xE0ng. </div></a><div class="btns mt-50 d-flex align-items-center"${_scopeId2}><button class="primary-btn"${_scopeId2}><a href="/ve-chung-toi" class="d-flex align-items-center gap-2 justify-content-center"${_scopeId2}> Chi ti\u1EBFt <span class="bg-custom-icon"${_scopeId2}><i class="fa-solid fa-arrow-right custom-icon"${_scopeId2}></i></span></a></button><a href="#" class="text-black fs-6 d-block ms-5 p-2"${_scopeId2}><span class="text-white" style="${ssrRenderStyle({ "text-decoration": "underline" })}"${_scopeId2}> Li\xEAn h\u1EC7 t\u01B0 v\u1EA5n </span></a></div></div></div></div></div></header>`);
            } else {
              return [
                createVNode("header", {
                  class: "tc-header-st1",
                  style: { "background-image": "url('/resource1/home1_creativeAgency/assets/img/slider-3.png')" }
                }, [
                  createVNode("div", { class: "container" }, [
                    createVNode("div", { class: "row gx-lg-0" }, [
                      createVNode("div", { class: "col-lg-8 pb-120" }, [
                        createVNode("div", { class: "info text-white" }, [
                          createVNode("a", { href: "/ve-chung-toi" }, [
                            createVNode("h6", { class: "text-white" }, [
                              createTextVNode(" Tr\u1EA3i nghi\u1EC7m \u0111\u1EB7c bi\u1EC7t t\u1EA1o n\xEAn m\u1ED9t "),
                              createVNode("span", { class: "text-finra-primary" }, "FINRA"),
                              createTextVNode(" \u01B0u vi\u1EC7t ")
                            ])
                          ]),
                          createVNode("a", { href: "/ve-chung-toi" }, [
                            createVNode("h1", null, [
                              createTextVNode(" Finra "),
                              createVNode("br"),
                              createVNode("span", {
                                class: "text-right text-gradient-green",
                                style: { "padding-left": "0 !important" }
                              }, " V\u1EC0 CH\xDANG T\xD4I ")
                            ]),
                            createVNode("div", { class: "text fsz-16 col-lg-9 text-white" }, " Finra d\u1EABn \u0111\u1EA7u v\u1EC1 n\u1EC1n t\u1EA3ng c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh, t\u1EADn d\u1EE5ng s\xE1ng t\u1EA1o c\xF4ng ngh\u1EC7 \u0111\u1EC3 t\u01B0 v\u1EA5n, cung c\u1EA5p c\xE1c gi\u1EA3i ph\xE1p c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh cho kh\xE1ch h\xE0ng. ")
                          ]),
                          createVNode("div", { class: "btns mt-50 d-flex align-items-center" }, [
                            createVNode("button", { class: "primary-btn" }, [
                              createVNode("a", {
                                href: "/ve-chung-toi",
                                class: "d-flex align-items-center gap-2 justify-content-center"
                              }, [
                                createTextVNode(" Chi ti\u1EBFt "),
                                createVNode("span", { class: "bg-custom-icon" }, [
                                  createVNode("i", { class: "fa-solid fa-arrow-right custom-icon" })
                                ])
                              ])
                            ]),
                            createVNode("a", {
                              href: "#",
                              class: "text-black fs-6 d-block ms-5 p-2"
                            }, [
                              createVNode("span", {
                                class: "text-white",
                                style: { "text-decoration": "underline" }
                              }, " Li\xEAn h\u1EC7 t\u01B0 v\u1EA5n ")
                            ])
                          ])
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
              createVNode("header", {
                class: "tc-header-st1",
                style: { "background-image": "url('/resource1/home1_creativeAgency/assets/img/slider-1.png')" }
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row gx-lg-0" }, [
                    createVNode("div", { class: "col-lg-8 pb-120" }, [
                      createVNode("div", { class: "info text-white" }, [
                        createVNode("a", { href: "/dich-vu/kkh" }, [
                          createVNode("h6", { class: "text-white" }, [
                            createTextVNode(" Tr\u1EA3i nghi\u1EC7m \u0111\u1EB7c bi\u1EC7t t\u1EA1o n\xEAn m\u1ED9t "),
                            createVNode("span", { class: "text-finra-primary" }, "FINRA"),
                            createTextVNode(" \u01B0u vi\u1EC7t ")
                          ])
                        ]),
                        createVNode("a", { href: "/dich-vu/kkh" }, [
                          createVNode("h1", null, [
                            createTextVNode(" Gi\u1EA3i ph\xE1p "),
                            createVNode("br"),
                            createVNode("span", { class: "text-right text-gradient-green" }, " \u0110\u1EA7u t\u01B0 t\xE0i ch\xEDnh ")
                          ]),
                          createVNode("div", { class: "text fsz-16 col-lg-9 text-white" }, " Finra d\u1EABn \u0111\u1EA7u v\u1EC1 n\u1EC1n t\u1EA3ng c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh, t\u1EADn d\u1EE5ng s\xE1ng t\u1EA1o c\xF4ng ngh\u1EC7 \u0111\u1EC3 t\u01B0 v\u1EA5n, cung c\u1EA5p c\xE1c gi\u1EA3i ph\xE1p c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh cho kh\xE1ch h\xE0ng. ")
                        ]),
                        createVNode("div", { class: "btns mt-50 d-flex align-items-center" }, [
                          createVNode("button", { class: "primary-btn" }, [
                            createVNode("a", {
                              href: "/dich-vu/kkh",
                              class: "d-flex align-items-center gap-2 justify-content-center"
                            }, [
                              createTextVNode(" Chi ti\u1EBFt "),
                              createVNode("span", { class: "bg-custom-icon" }, [
                                createVNode("i", { class: "fa-solid fa-arrow-right custom-icon" })
                              ])
                            ])
                          ]),
                          createVNode("a", {
                            href: "javascript:;",
                            class: "text-black fs-6 d-block ms-5 p-2"
                          }, [
                            createVNode("span", {
                              class: "text-white",
                              style: { "text-decoration": "underline" }
                            }, " Li\xEAn h\u1EC7 t\u01B0 v\u1EA5n ")
                          ])
                        ])
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
              createVNode("header", {
                class: "tc-header-st1",
                style: { "background-image": "url('/resource1/home1_creativeAgency/assets/img/slider-2.png')" }
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row gx-lg-0" }, [
                    createVNode("div", { class: "col-lg-8 pb-120" }, [
                      createVNode("div", { class: "info text-white" }, [
                        createVNode("a", { href: "/tuyen-dung" }, [
                          createVNode("h6", { class: "text-black" }, [
                            createTextVNode(" Tr\u1EA3i nghi\u1EC7m \u0111\u1EB7c bi\u1EC7t t\u1EA1o n\xEAn m\u1ED9t "),
                            createVNode("span", { style: { "color": "#2f7bf2" } }, "FINRA"),
                            createTextVNode(" \u01B0u vi\u1EC7t ")
                          ])
                        ]),
                        createVNode("a", { href: "/tuyen-dung" }, [
                          createVNode("h1", { style: { "color": "black !important" } }, [
                            createTextVNode(" T\xECm ki\u1EBFm "),
                            createVNode("br"),
                            createVNode("span", {
                              class: "text-right",
                              style: { "padding-left": "0 !important", "color": "#2f7bf2 !important" }
                            }, " Nh\xE2n t\xE0i m\u1EDBi cho Finra ")
                          ]),
                          createVNode("div", { class: "text fsz-16 col-lg-9 text-black" }, " C\xF9ng Finra ki\u1EBFn t\u1EA1o gi\u1EA3i ph\xE1p \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh, m\u1EDF l\u1ED1i t\u01B0\u01A1ng lai t\xE0i ch\xEDnh v\u1EEFng v\xE0ng cho ng\u01B0\u1EDDi Vi\u1EC7t ")
                        ]),
                        createVNode("div", { class: "btns mt-50 d-flex align-items-center" }, [
                          createVNode("button", { class: "primary-btn" }, [
                            createVNode("a", {
                              href: "/tuyen-dung",
                              class: "d-flex align-items-center gap-2 justify-content-center"
                            }, [
                              createTextVNode(" Xem tin tuy\u1EC3n d\u1EE5ng "),
                              createVNode("span", { class: "bg-custom-icon" }, [
                                createVNode("i", { class: "fa-solid fa-arrow-right custom-icon" })
                              ])
                            ])
                          ]),
                          createVNode("a", {
                            href: "#",
                            class: "text-black fs-6 d-block ms-5 p-2"
                          }, [
                            createVNode("span", {
                              class: "text-black",
                              style: { "text-decoration": "underline" }
                            }, " Li\xEAn h\u1EC7 t\u01B0 v\u1EA5n ")
                          ])
                        ])
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
              createVNode("header", {
                class: "tc-header-st1",
                style: { "background-image": "url('/resource1/home1_creativeAgency/assets/img/slider-3.png')" }
              }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row gx-lg-0" }, [
                    createVNode("div", { class: "col-lg-8 pb-120" }, [
                      createVNode("div", { class: "info text-white" }, [
                        createVNode("a", { href: "/ve-chung-toi" }, [
                          createVNode("h6", { class: "text-white" }, [
                            createTextVNode(" Tr\u1EA3i nghi\u1EC7m \u0111\u1EB7c bi\u1EC7t t\u1EA1o n\xEAn m\u1ED9t "),
                            createVNode("span", { class: "text-finra-primary" }, "FINRA"),
                            createTextVNode(" \u01B0u vi\u1EC7t ")
                          ])
                        ]),
                        createVNode("a", { href: "/ve-chung-toi" }, [
                          createVNode("h1", null, [
                            createTextVNode(" Finra "),
                            createVNode("br"),
                            createVNode("span", {
                              class: "text-right text-gradient-green",
                              style: { "padding-left": "0 !important" }
                            }, " V\u1EC0 CH\xDANG T\xD4I ")
                          ]),
                          createVNode("div", { class: "text fsz-16 col-lg-9 text-white" }, " Finra d\u1EABn \u0111\u1EA7u v\u1EC1 n\u1EC1n t\u1EA3ng c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh, t\u1EADn d\u1EE5ng s\xE1ng t\u1EA1o c\xF4ng ngh\u1EC7 \u0111\u1EC3 t\u01B0 v\u1EA5n, cung c\u1EA5p c\xE1c gi\u1EA3i ph\xE1p c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh cho kh\xE1ch h\xE0ng. ")
                        ]),
                        createVNode("div", { class: "btns mt-50 d-flex align-items-center" }, [
                          createVNode("button", { class: "primary-btn" }, [
                            createVNode("a", {
                              href: "/ve-chung-toi",
                              class: "d-flex align-items-center gap-2 justify-content-center"
                            }, [
                              createTextVNode(" Chi ti\u1EBFt "),
                              createVNode("span", { class: "bg-custom-icon" }, [
                                createVNode("i", { class: "fa-solid fa-arrow-right custom-icon" })
                              ])
                            ])
                          ]),
                          createVNode("a", {
                            href: "#",
                            class: "text-black fs-6 d-block ms-5 p-2"
                          }, [
                            createVNode("span", {
                              class: "text-white",
                              style: { "text-decoration": "underline" }
                            }, " Li\xEAn h\u1EC7 t\u01B0 v\u1EA5n ")
                          ])
                        ])
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
  _push(`<div class="finra-btn"><div class="container"><div class="col-lg-12"><div class="d-flex align-items-center gap-3 justify-content-center justify-content-lg-start"><button class="icon-nav"><i class="fa-solid fa-chevron-left"></i></button><button class="icon-nav"><i class="fa-solid fa-chevron-right"></i></button></div></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FinraSlider.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
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
const _imports_1 = publicAssetsURL("/resource/images/inifiltti.svg");
const _imports_2 = publicAssetsURL("/resource/images/money_hand.svg");
const _imports_3 = publicAssetsURL("/resource/images/pig-icon.svg");
const _imports_4 = publicAssetsURL("/resource1/home1_creativeAgency/assets/img/ups_logo.svg");
const _imports_5 = publicAssetsURL("/resource1/home1_creativeAgency/assets/img/f1_logo.svg");
const _imports_6 = publicAssetsURL("/resource1/home1_creativeAgency/assets/img/bidv_logo.svg");
const _imports_7 = publicAssetsURL("/resource/images/Arrow-right.svg");
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_FinraSlider = __nuxt_component_0;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_FinraSlider, null, null, _parent));
  _push(`<section class="tc-testimonials-st10"><div class="container"><div class="content row d-flex justify-content-center mb-0"><div class="col-lg-12"><div class="row justify-content-between flex-column-reverse flex-lg-row"><div class="col-lg-6"><div class="interest-rate-card"><div class="d-flex flex-column justify-content-between align-items-center"><div class="title"> L\xE3i su\u1EA5t c\xE1c <span class="text-gradient-purple">k\u1EF3 h\u1EA1n</span></div><div class="time">% tr\xEAn n\u0103m</div></div><div class="d-flex align-items-center justify-content-center w-100"><div class="button-group"><button class="${ssrRenderClass(["button", _ctx.active == 1 ? "active" : ""])}"> Theo ng\xE0y </button><button class="${ssrRenderClass(["button", _ctx.active == 2 ? "active" : ""])}"> Theo th\xE1ng/qu\xFD </button></div></div><div class="d-flex justify-content-around align-items-center"><div class="sub-title">Th\u1EDDi h\u1EA1n</div><div class="sub-title">L\xE3i su\u1EA5t</div></div>`);
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
  _push(`</div></div><div class="col-lg-6"><div class="d-flex flex-column align-items-start justify-content-between"><div class="info wow fadeIn slow position-relative" data-wow-delay="0.2s"><div><div class="text fsz-50 cr-777 content-heading"> Tin c\u1EADy v\u1EDBi n\u1EC1n t\u1EA3ng <br><span class="sub-title">c\xF4ng ngh\u1EC7 v\u01B0\u1EE3t tr\u1ED9i</span></div><div class="title-outstanding-platform"><ul class="ps-3"><li> \u0110\u1ED9i ng\u0169 chuy\xEAn vi\xEAn gi\xE0u kinh nghi\u1EC7m v\xE0 chuy\xEAn m\xF4n </li><li> Gi\u1EA3i ph\xE1p c\xF4ng ngh\u1EC7 t\xE0i ch\xEDnh s\xE1ng t\u1EA1o v\xE0 s\u1ED1 ho\xE1 to\xE0n di\u1EC7n </li><li>\u0110\u1EA7u t\u01B0 chuy\xEAn nghi\u1EC7p v\xE0 d\u1EC5 d\xE0ng</li></ul></div><div><div class="content-outstanding-platform"> Ch\xFAng t\xF4i kh\xF4ng ng\u1EEBng n\u1ED7 l\u1EF1c nghi\xEAn c\u1EE9u ph\xE1t tri\u1EC3n s\u1EA3n ph\u1EA9m v\xE0 tr\u1EA3i nghi\u1EC7m kh\xE1ch h\xE0ng \u0111\u1EC3 \u0111\u01B0a Finra Capital tr\u1EDF th\xE0nh th\u01B0\u01A1ng hi\u1EC7u \u0111\u01B0\u1EE3c kh\xE1ch h\xE0ng tin t\u01B0\u1EDFng l\u1EF1a ch\u1ECDn h\xE0ng \u0111\u1EA7u trong l\u0129nh v\u1EF1c c\xF4ng ngh\u1EC7 \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh! </div></div><div class="end-content"> &quot;T\u1EA1i Finra Capital - B\u1EA1n l\xE0 \u01B0u ti\xEAn s\u1ED1 m\u1ED9t c\u1EE7a ch\xFAng t\xF4i&quot; </div></div></div></div></div></div></div></div></div></section><section class="tc-background"><div class="container"><div class="tc-background__img"></div></div></section><section class="products pb-500"><div class="container"><div class="products__header"><h1 class="d-block">S\u1EA3n ph\u1EA9m c\u1EE7a</h1><img${ssrRenderAttr("src", _imports_0)} alt=""></div><div class="products__title"><h1 class="text-gradient-purple"> T\xEDch lu\u1EF9 d\u1EC5 d\xE0ng, l\u1EE3i nhu\u1EADn h\u1EA5p d\u1EABn </h1><span>\u0110a d\u1EA1ng nhu c\u1EA7u. Th\u1EDDi gian t\xEDch lu\u1EF9 linh \u0111\u1ED9ng. B\u1EAFt \u0111\u1EA7u ch\u1EC9 t\u1EEB 50.000 VND</span></div><div class="products__list"><div class="products__item"><div class="products__item-img"><img${ssrRenderAttr("src", _imports_1)} alt="" class="img-cover"></div><div class="products__item-content"><div class="products__item-content-relative"><div class="products__item-content__title"><h2>T\xEDch lu\u1EF9 linh ho\u1EA1t</h2><span>Kh\xF4ng gi\u1EDBi h\u1EA1n \u0111\u1EA7u t\u01B0</span></div><div class="products__item-content__date"><div class="d-flex align-items-center justify-content-between gap-3" style="${ssrRenderStyle({ "width": "100%" })}"><h2>K\u1EF2 H\u1EA0N T\xCDCH LU\u1EF8</h2><span>Kh\xF4ng k\u1EF3 h\u1EA1n</span></div><div class="d-flex align-items-center justify-content-between gap-3" style="${ssrRenderStyle({ "width": "100%" })}"><h2>L\u1EE3i nhu\u1EADn</h2><span>4% / n\u0103m</span></div></div><div class="products__item-content__links"><div class="products__item-content__links-tag"><a href="">#L\u1EE3i nhu\u1EADn h\xE0ng ng\xE0y</a></div><div class="products__item-content__links-tag"><a href="">#N\u1EA1p/r\xFAt linh ho\u1EA1t</a></div></div><div class="circle-bottom"></div></div></div></div><div class="products__item"><div class="products__item-img"><img${ssrRenderAttr("src", _imports_2)} alt="" class="img-cover"></div><div class="products__item-content"><div class="products__item-content-relative"><div class="products__item-content__title"><h2>T\xEDch lu\u1EF9 theo th\xE1ng</h2><span>T\u1ED1i thi\u1EC3u 2 tri\u1EC7u</span></div><div class="products__item-content__date"><div class="d-flex align-items-center justify-content-between gap-3" style="${ssrRenderStyle({ "width": "100%" })}"><h2>K\u1EF2 H\u1EA0N T\xCDCH LU\u1EF8</h2><span>1 Th\xE1ng</span></div><div class="d-flex align-items-center justify-content-between gap-3" style="${ssrRenderStyle({ "width": "100%" })}"><h2>L\u1EE3i nhu\u1EADn</h2><span>5%/ n\u0103m</span></div></div><div class="products__item-content__links"><div class="products__item-content__links-tag"><a href="">#L\u1EE3i nhu\u1EADn h\xE0ng ng\xE0y</a></div><div class="products__item-content__links-tag"><a href="">#N\u1EA1p/r\xFAt linh ho\u1EA1t</a></div></div><div class="circle-bottom"></div></div></div></div><div class="products__item"><div class="products__item-img"><img${ssrRenderAttr("src", _imports_3)} alt="" class="img-cover"></div><div class="products__item-content"><div class="products__item-content-relative"><div class="products__item-content__title"><h2>T\xEDch lu\u1EF9 theo k\u1EF3</h2><span>T\u1ED1i thi\u1EC3u 5 tri\u1EC7u</span></div><div class="products__item-content__date"><div class="d-flex align-items-center justify-content-between gap-3" style="${ssrRenderStyle({ "width": "100%" })}"><h2>K\u1EF2 H\u1EA0N T\xCDCH LU\u1EF8</h2><span>3-8 th\xE1ng</span></div><div class="d-flex align-items-center justify-content-between gap-3" style="${ssrRenderStyle({ "width": "100%" })}"><h2>L\u1EE3i nhu\u1EADn</h2><span>6%/ n\u0103m</span></div></div><div class="products__item-content__links"><div class="products__item-content__links-tag"><a href="">#L\u1EE3i nhu\u1EADn h\xE0ng ng\xE0y</a></div><div class="products__item-content__links-tag"><a href="">#N\u1EA1p/r\xFAt linh ho\u1EA1t</a></div></div><div class="circle-bottom"></div></div></div></div></div><div class="products__footer"><button class="products__read-more">T\xECm hi\u1EC3u ngay</button></div></div></section><section class="tc-partner"><div class="container"><div class="title"> \u0110\u1ED1i t\xE1c \u0111\u1ED3ng h\xE0nh <span class="text-gradient-green">uy t\xEDn</span></div><div class="fw-500 mb-30"> \u0110\u01B0\u1EE3c \u0111\u1ECBnh h\u01B0\u1EDBng b\u1EDFi s\u1EE9 m\u1EC7nh d\u1EABn \u0111\u1EA7u. \u0110i c\xF9ng l\xE0 nh\u1EEFng \u0111\u1ED1i t\xE1c uy t\xEDn tr\xEAn th\u1ECB tr\u01B0\u1EDDng c\u1EE7a FINRA </div><div class="row mt-100"><div class="col-12 col-lg-4 d-flex flex-column align-items-center gap-3"><a class="d-block" href=""><img${ssrRenderAttr("src", _imports_4)} alt="youtube icon"></a><div class="partner_des"> \u0110\u1ED1i t\xE1c chi\u1EBFn l\u01B0\u1EE3c s\u1EA3n ph\u1EA9m c\xF9ng s\xE0n ch\u1EE9ng kho\xE1n UP Securities, \u0111em t\u1EDBi s\u1EF1 \u0111a d\u1EA1ng v\u1EC1 s\u1EA3n ph\u1EA9m </div></div><div class="col-12 col-lg-4 d-flex flex-column align-items-center gap-3"><a class="d-block" href="https://tornadoinvest.com.vn" target="_blank"><img${ssrRenderAttr("src", _imports_5)} alt="youtube icon"></a><div class="partner_des"> F1 trading l\xE0 c\xF4ng ty d\u1EABn \u0111\u1EA7u t\u1EA1i Vi\u1EC7t Nam trong l\u0129nh v\u1EF1c \u0111\u1EA7u t\u01B0 ph\xE1i sinh h\xE0ng h\xF3a qu\u1ED1c t\u1EBF v\u1EDBi ti\u1EC1m n\u0103ng t\u0103ng tr\u01B0\u1EDFng cao </div></div><div class="col-12 col-lg-4 d-flex flex-column align-items-center gap-3"><a class="d-block" href="https://bidv.com.vn" target="_blank"><img${ssrRenderAttr("src", _imports_6)} alt="youtube icon"></a><div class="partner_des"> Ng\xE2n h\xE0ng BIDV l\xE0 \u0111\u1ED1i t\xE1c cung c\u1EA5p gi\u1EA3i ph\xE1p thanh to\xE1n an to\xE0n v\xE0 b\u1EA3o m\u1EADt cho ng\u01B0\u1EDDi d\xF9ng c\u1EE7a Finra </div></div></div></div></section><section class="tc-faq"><div class="container"><div class="row"><div class="col-4"><h1 class="faq-header">C\xE1c b\u1EA1n h\u1ECFi?</h1><span class="faq-sub-header">FINRA tr\u1EA3 l\u1EDDi</span></div><div class="col-8"><div class="dropdown"><div class="dropdown-item"><div class="faq-question"><h2>FINRA l\xE0 ai?</h2><div class="arrow-icon" style="${ssrRenderStyle({ "transform": "rotate(45deg)" })}"><img${ssrRenderAttr("src", _imports_7)} alt="" class="img-cover"></div></div><div class="faq-answer"> Finra l\xE0 \u1EE9ng d\u1EE5ng \u0111\u1EA7u t\u01B0 v\xE0 qu\u1EA3n l\xFD t\xE0i ch\xEDnh th\xF4ng minh gi\xFAp b\u1EA1n d\u1EC5 d\xE0ng t\xEDch l\u0169y, \u0111\u1EA7u t\u01B0 v\xE0 qu\u1EA3n l\xFD t\xE0i ch\xEDnh c\xE1 nh\xE2n \u0111\u1EC3 t\u1EF1 tin x\xE2y d\u1EF1ng t\u01B0\u01A1ng lai t\xE0i ch\xEDnh v\u1EEFng v\xE0ng. </div></div><div class="dropdown-item"><div class="faq-question"><h2>L\xE0m th\u1EBF n\xE0o \u0111\u1EC3 m\u1EDF t\xE0i kho\u1EA3n Finra?</h2><div class="arrow-icon"><img${ssrRenderAttr("src", _imports_7)} alt="" class="img-cover"></div></div><div class="faq-answer d-none"> Finra l\xE0 \u1EE9ng d\u1EE5ng \u0111\u1EA7u t\u01B0 v\xE0 qu\u1EA3n l\xFD t\xE0i ch\xEDnh th\xF4ng minh gi\xFAp b\u1EA1n d\u1EC5 d\xE0ng t\xEDch l\u0169y, \u0111\u1EA7u t\u01B0 v\xE0 qu\u1EA3n l\xFD t\xE0i ch\xEDnh c\xE1 nh\xE2n \u0111\u1EC3 t\u1EF1 tin x\xE2y d\u1EF1ng t\u01B0\u01A1ng lai t\xE0i ch\xEDnh v\u1EEFng v\xE0ng. </div></div><div class="dropdown-item"><div class="faq-question"><h2>Finra c\xF3 uy t\xEDn kh\xF4ng?</h2><div class="arrow-icon"><img${ssrRenderAttr("src", _imports_7)} alt="" class="img-cover"></div></div><div class="faq-answer d-none"> Finra l\xE0 \u1EE9ng d\u1EE5ng \u0111\u1EA7u t\u01B0 v\xE0 qu\u1EA3n l\xFD t\xE0i ch\xEDnh th\xF4ng minh gi\xFAp b\u1EA1n d\u1EC5 d\xE0ng t\xEDch l\u0169y, \u0111\u1EA7u t\u01B0 v\xE0 qu\u1EA3n l\xFD t\xE0i ch\xEDnh c\xE1 nh\xE2n \u0111\u1EC3 t\u1EF1 tin x\xE2y d\u1EF1ng t\u01B0\u01A1ng lai t\xE0i ch\xEDnh v\u1EEFng v\xE0ng. </div></div></div></div></div></div></section><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-TnBoA31o.mjs.map
