import { A as Autoplay, N as Navigation, S as Swiper, a as SwiperSlide } from "./entry-styles-2.mjs-odfW0i3F.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import { _ as _imports_0 } from "./virtual_public-BQZui9UJ.js";
import { publicAssetsURL } from "#internal/nuxt/paths";
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
  const _component_swiper = Swiper;
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
              _push3(`<header class="tc-header-st1" style="${ssrRenderStyle({ "background-image": "url('/resource1/home1_creativeAgency/assets/img/slider-1.png')" })}"${_scopeId2}><div class="container"${_scopeId2}><div class="row gx-lg-0"${_scopeId2}><div class="col-lg-8 pb-120"${_scopeId2}><div class="info text-white"${_scopeId2}><a href="/dich-vu/kkh"${_scopeId2}><h6 class="text-white"${_scopeId2}> Trải nghiệm đặc biệt tạo nên một <span class="text-finra-primary"${_scopeId2}>FINRA</span> ưu việt </h6></a><a href="/dich-vu/kkh"${_scopeId2}><h1${_scopeId2}> Giải pháp <br${_scopeId2}><span class="text-right text-gradient-green"${_scopeId2}> Đầu tư tài chính </span></h1><div class="text fsz-16 col-lg-9 text-white"${_scopeId2}> Finra dẫn đầu về nền tảng công nghệ đầu tư tài chính, tận dụng sáng tạo công nghệ để tư vấn, cung cấp các giải pháp công nghệ đầu tư tài chính cho khách hàng. </div></a><div class="btns mt-50 d-flex align-items-center"${_scopeId2}><button class="primary-btn"${_scopeId2}><a href="/dich-vu/kkh" class="d-flex align-items-center gap-2 justify-content-center"${_scopeId2}> Chi tiết <span class="bg-custom-icon"${_scopeId2}><i class="fa-solid fa-arrow-right custom-icon"${_scopeId2}></i></span></a></button><a href="javascript:;" class="text-black fs-6 d-block ms-5 p-2"${_scopeId2}><span class="text-white" style="${ssrRenderStyle({ "text-decoration": "underline" })}"${_scopeId2}> Liên hệ tư vấn </span></a></div></div></div></div></div></header>`);
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
                              createTextVNode(" Trải nghiệm đặc biệt tạo nên một "),
                              createVNode("span", { class: "text-finra-primary" }, "FINRA"),
                              createTextVNode(" ưu việt ")
                            ])
                          ]),
                          createVNode("a", { href: "/dich-vu/kkh" }, [
                            createVNode("h1", null, [
                              createTextVNode(" Giải pháp "),
                              createVNode("br"),
                              createVNode("span", { class: "text-right text-gradient-green" }, " Đầu tư tài chính ")
                            ]),
                            createVNode("div", { class: "text fsz-16 col-lg-9 text-white" }, " Finra dẫn đầu về nền tảng công nghệ đầu tư tài chính, tận dụng sáng tạo công nghệ để tư vấn, cung cấp các giải pháp công nghệ đầu tư tài chính cho khách hàng. ")
                          ]),
                          createVNode("div", { class: "btns mt-50 d-flex align-items-center" }, [
                            createVNode("button", { class: "primary-btn" }, [
                              createVNode("a", {
                                href: "/dich-vu/kkh",
                                class: "d-flex align-items-center gap-2 justify-content-center"
                              }, [
                                createTextVNode(" Chi tiết "),
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
                              }, " Liên hệ tư vấn ")
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
              _push3(`<header class="tc-header-st1" style="${ssrRenderStyle({ "background-image": "url('/resource1/home1_creativeAgency/assets/img/slider-2.png')" })}"${_scopeId2}><div class="container"${_scopeId2}><div class="row gx-lg-0"${_scopeId2}><div class="col-lg-8 pb-120"${_scopeId2}><div class="info text-white"${_scopeId2}><a href="/tuyen-dung"${_scopeId2}><h6 class="text-black"${_scopeId2}> Trải nghiệm đặc biệt tạo nên một <span style="${ssrRenderStyle({ "color": "#2f7bf2" })}"${_scopeId2}>FINRA</span> ưu việt </h6></a><a href="/tuyen-dung"${_scopeId2}><h1 style="${ssrRenderStyle({ "color": "black !important" })}"${_scopeId2}> Tìm kiếm <br${_scopeId2}><span class="text-right" style="${ssrRenderStyle({ "padding-left": "0 !important", "color": "#2f7bf2 !important" })}"${_scopeId2}> Nhân tài mới cho Finra </span></h1><div class="text fsz-16 col-lg-9 text-black"${_scopeId2}> Cùng Finra kiến tạo giải pháp đầu tư tài chính, mở lối tương lai tài chính vững vàng cho người Việt </div></a><div class="btns mt-50 d-flex align-items-center"${_scopeId2}><button class="primary-btn"${_scopeId2}><a href="/tuyen-dung" class="d-flex align-items-center gap-2 justify-content-center"${_scopeId2}> Xem tin tuyển dụng <span class="bg-custom-icon"${_scopeId2}><i class="fa-solid fa-arrow-right custom-icon"${_scopeId2}></i></span></a></button><a href="#" class="text-black fs-6 d-block ms-5 p-2"${_scopeId2}><span class="text-black" style="${ssrRenderStyle({ "text-decoration": "underline" })}"${_scopeId2}> Liên hệ tư vấn </span></a></div></div></div></div></div></header>`);
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
                              createTextVNode(" Trải nghiệm đặc biệt tạo nên một "),
                              createVNode("span", { style: { "color": "#2f7bf2" } }, "FINRA"),
                              createTextVNode(" ưu việt ")
                            ])
                          ]),
                          createVNode("a", { href: "/tuyen-dung" }, [
                            createVNode("h1", { style: { "color": "black !important" } }, [
                              createTextVNode(" Tìm kiếm "),
                              createVNode("br"),
                              createVNode("span", {
                                class: "text-right",
                                style: { "padding-left": "0 !important", "color": "#2f7bf2 !important" }
                              }, " Nhân tài mới cho Finra ")
                            ]),
                            createVNode("div", { class: "text fsz-16 col-lg-9 text-black" }, " Cùng Finra kiến tạo giải pháp đầu tư tài chính, mở lối tương lai tài chính vững vàng cho người Việt ")
                          ]),
                          createVNode("div", { class: "btns mt-50 d-flex align-items-center" }, [
                            createVNode("button", { class: "primary-btn" }, [
                              createVNode("a", {
                                href: "/tuyen-dung",
                                class: "d-flex align-items-center gap-2 justify-content-center"
                              }, [
                                createTextVNode(" Xem tin tuyển dụng "),
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
                              }, " Liên hệ tư vấn ")
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
              _push3(`<header class="tc-header-st1" style="${ssrRenderStyle({ "background-image": "url('/resource1/home1_creativeAgency/assets/img/slider-3.png')" })}"${_scopeId2}><div class="container"${_scopeId2}><div class="row gx-lg-0"${_scopeId2}><div class="col-lg-8 pb-120"${_scopeId2}><div class="info text-white"${_scopeId2}><a href="/ve-chung-toi"${_scopeId2}><h6 class="text-white"${_scopeId2}> Trải nghiệm đặc biệt tạo nên một <span class="text-finra-primary"${_scopeId2}>FINRA</span> ưu việt </h6></a><a href="/ve-chung-toi"${_scopeId2}><h1${_scopeId2}> Finra <br${_scopeId2}><span class="text-right text-gradient-green" style="${ssrRenderStyle({ "padding-left": "0 !important" })}"${_scopeId2}> VỀ CHÚNG TÔI </span></h1><div class="text fsz-16 col-lg-9 text-white"${_scopeId2}> Finra dẫn đầu về nền tảng công nghệ đầu tư tài chính, tận dụng sáng tạo công nghệ để tư vấn, cung cấp các giải pháp công nghệ đầu tư tài chính cho khách hàng. </div></a><div class="btns mt-50 d-flex align-items-center"${_scopeId2}><button class="primary-btn"${_scopeId2}><a href="/ve-chung-toi" class="d-flex align-items-center gap-2 justify-content-center"${_scopeId2}> Chi tiết <span class="bg-custom-icon"${_scopeId2}><i class="fa-solid fa-arrow-right custom-icon"${_scopeId2}></i></span></a></button><a href="#" class="text-black fs-6 d-block ms-5 p-2"${_scopeId2}><span class="text-white" style="${ssrRenderStyle({ "text-decoration": "underline" })}"${_scopeId2}> Liên hệ tư vấn </span></a></div></div></div></div></div></header>`);
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
                              createTextVNode(" Trải nghiệm đặc biệt tạo nên một "),
                              createVNode("span", { class: "text-finra-primary" }, "FINRA"),
                              createTextVNode(" ưu việt ")
                            ])
                          ]),
                          createVNode("a", { href: "/ve-chung-toi" }, [
                            createVNode("h1", null, [
                              createTextVNode(" Finra "),
                              createVNode("br"),
                              createVNode("span", {
                                class: "text-right text-gradient-green",
                                style: { "padding-left": "0 !important" }
                              }, " VỀ CHÚNG TÔI ")
                            ]),
                            createVNode("div", { class: "text fsz-16 col-lg-9 text-white" }, " Finra dẫn đầu về nền tảng công nghệ đầu tư tài chính, tận dụng sáng tạo công nghệ để tư vấn, cung cấp các giải pháp công nghệ đầu tư tài chính cho khách hàng. ")
                          ]),
                          createVNode("div", { class: "btns mt-50 d-flex align-items-center" }, [
                            createVNode("button", { class: "primary-btn" }, [
                              createVNode("a", {
                                href: "/ve-chung-toi",
                                class: "d-flex align-items-center gap-2 justify-content-center"
                              }, [
                                createTextVNode(" Chi tiết "),
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
                              }, " Liên hệ tư vấn ")
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
                            createTextVNode(" Trải nghiệm đặc biệt tạo nên một "),
                            createVNode("span", { class: "text-finra-primary" }, "FINRA"),
                            createTextVNode(" ưu việt ")
                          ])
                        ]),
                        createVNode("a", { href: "/dich-vu/kkh" }, [
                          createVNode("h1", null, [
                            createTextVNode(" Giải pháp "),
                            createVNode("br"),
                            createVNode("span", { class: "text-right text-gradient-green" }, " Đầu tư tài chính ")
                          ]),
                          createVNode("div", { class: "text fsz-16 col-lg-9 text-white" }, " Finra dẫn đầu về nền tảng công nghệ đầu tư tài chính, tận dụng sáng tạo công nghệ để tư vấn, cung cấp các giải pháp công nghệ đầu tư tài chính cho khách hàng. ")
                        ]),
                        createVNode("div", { class: "btns mt-50 d-flex align-items-center" }, [
                          createVNode("button", { class: "primary-btn" }, [
                            createVNode("a", {
                              href: "/dich-vu/kkh",
                              class: "d-flex align-items-center gap-2 justify-content-center"
                            }, [
                              createTextVNode(" Chi tiết "),
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
                            }, " Liên hệ tư vấn ")
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
                            createTextVNode(" Trải nghiệm đặc biệt tạo nên một "),
                            createVNode("span", { style: { "color": "#2f7bf2" } }, "FINRA"),
                            createTextVNode(" ưu việt ")
                          ])
                        ]),
                        createVNode("a", { href: "/tuyen-dung" }, [
                          createVNode("h1", { style: { "color": "black !important" } }, [
                            createTextVNode(" Tìm kiếm "),
                            createVNode("br"),
                            createVNode("span", {
                              class: "text-right",
                              style: { "padding-left": "0 !important", "color": "#2f7bf2 !important" }
                            }, " Nhân tài mới cho Finra ")
                          ]),
                          createVNode("div", { class: "text fsz-16 col-lg-9 text-black" }, " Cùng Finra kiến tạo giải pháp đầu tư tài chính, mở lối tương lai tài chính vững vàng cho người Việt ")
                        ]),
                        createVNode("div", { class: "btns mt-50 d-flex align-items-center" }, [
                          createVNode("button", { class: "primary-btn" }, [
                            createVNode("a", {
                              href: "/tuyen-dung",
                              class: "d-flex align-items-center gap-2 justify-content-center"
                            }, [
                              createTextVNode(" Xem tin tuyển dụng "),
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
                            }, " Liên hệ tư vấn ")
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
                            createTextVNode(" Trải nghiệm đặc biệt tạo nên một "),
                            createVNode("span", { class: "text-finra-primary" }, "FINRA"),
                            createTextVNode(" ưu việt ")
                          ])
                        ]),
                        createVNode("a", { href: "/ve-chung-toi" }, [
                          createVNode("h1", null, [
                            createTextVNode(" Finra "),
                            createVNode("br"),
                            createVNode("span", {
                              class: "text-right text-gradient-green",
                              style: { "padding-left": "0 !important" }
                            }, " VỀ CHÚNG TÔI ")
                          ]),
                          createVNode("div", { class: "text fsz-16 col-lg-9 text-white" }, " Finra dẫn đầu về nền tảng công nghệ đầu tư tài chính, tận dụng sáng tạo công nghệ để tư vấn, cung cấp các giải pháp công nghệ đầu tư tài chính cho khách hàng. ")
                        ]),
                        createVNode("div", { class: "btns mt-50 d-flex align-items-center" }, [
                          createVNode("button", { class: "primary-btn" }, [
                            createVNode("a", {
                              href: "/ve-chung-toi",
                              class: "d-flex align-items-center gap-2 justify-content-center"
                            }, [
                              createTextVNode(" Chi tiết "),
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
                            }, " Liên hệ tư vấn ")
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
  _push(`<section class="tc-testimonials-st10"><div class="container"><div class="content row d-flex justify-content-center mb-0"><div class="col-lg-12"><div class="row justify-content-between flex-column-reverse flex-lg-row"><div class="col-lg-6"><div class="interest-rate-card"><div class="d-flex flex-column justify-content-between align-items-center"><div class="title"> Lãi suất các <span class="text-gradient-purple">kỳ hạn</span></div><div class="time">% trên năm</div></div><div class="d-flex align-items-center justify-content-center w-100"><div class="button-group"><button class="${ssrRenderClass(["button", _ctx.active == 1 ? "active" : ""])}"> Theo ngày </button><button class="${ssrRenderClass(["button", _ctx.active == 2 ? "active" : ""])}"> Theo tháng/quý </button></div></div><div class="d-flex justify-content-around align-items-center"><div class="sub-title">Thời hạn</div><div class="sub-title">Lãi suất</div></div>`);
  if (_ctx.active == 1) {
    _push(`<div><div class="content content-0 active"><div class="d-flex justify-content-around align-items-center item"><div>2-7 ngày</div><div>2.5%</div></div><div class="d-flex justify-content-around align-items-center item"><div>8-14 ngày</div><div>3.3%</div></div><div class="d-flex justify-content-around align-items-center item"><div>15-21 ngày</div><div>3.3%</div></div><div class="d-flex justify-content-around align-items-center item"><div>22-29 ngày</div><div>4.5%</div></div><div class="d-flex justify-content-around align-items-center item"><div>30-59 ngày</div><div>5.0%</div></div><div class="d-flex justify-content-around align-items-center item"><div>60-89 ngày</div><div>5.0%</div></div><div class="d-flex justify-content-around align-items-center item"><div>90 ngày</div><div>5.0%</div></div></div><div class="content content-1"><div class="d-flex justify-content-around align-items-center item"><div>1 tháng</div><div>4.0%</div></div><div class="d-flex justify-content-around align-items-center item"><div>2 tháng</div><div>-%</div></div><div class="d-flex justify-content-around align-items-center item"><div>3 tháng</div><div>5.1%</div></div><div class="d-flex justify-content-around align-items-center item"><div>4 tháng</div><div>5.2%</div></div><div class="d-flex justify-content-around align-items-center item"><div>5 tháng</div><div>5.3%</div></div><div class="d-flex justify-content-around align-items-center item"><div>6 tháng</div><div>5.5%</div></div><div class="d-flex justify-content-around align-items-center item"><div>7 tháng</div><div>-%</div></div><div class="d-flex justify-content-around align-items-center item"><div>9 tháng</div><div>6.0%</div></div><div class="d-flex justify-content-around align-items-center item"><div>12 tháng</div><div>6.5%</div></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.active == 2) {
    _push(`<div><div class="content content-1 active"><div class="d-flex justify-content-around align-items-center item"><div>1 tháng</div><div>4.0%</div></div><div class="d-flex justify-content-around align-items-center item"><div>2 tháng</div><div>-%</div></div><div class="d-flex justify-content-around align-items-center item"><div>3 tháng</div><div>5.1%</div></div><div class="d-flex justify-content-around align-items-center item"><div>4 tháng</div><div>5.2%</div></div><div class="d-flex justify-content-around align-items-center item"><div>5 tháng</div><div>5.3%</div></div><div class="d-flex justify-content-around align-items-center item"><div>6 tháng</div><div>5.5%</div></div><div class="d-flex justify-content-around align-items-center item"><div>7 tháng</div><div>-%</div></div><div class="d-flex justify-content-around align-items-center item"><div>9 tháng</div><div>6.0%</div></div><div class="d-flex justify-content-around align-items-center item"><div>12 tháng</div><div>6.5%</div></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div><div class="col-lg-6"><div class="d-flex flex-column align-items-start justify-content-between"><div class="info wow fadeIn slow position-relative" data-wow-delay="0.2s"><div><div class="text fsz-50 cr-777 content-heading"> Tin cậy với nền tảng <br><span class="sub-title">công nghệ vượt trội</span></div><div class="title-outstanding-platform"><ul class="ps-3"><li> Đội ngũ chuyên viên giàu kinh nghiệm và chuyên môn </li><li> Giải pháp công nghệ tài chính sáng tạo và số hoá toàn diện </li><li>Đầu tư chuyên nghiệp và dễ dàng</li></ul></div><div><div class="content-outstanding-platform"> Chúng tôi không ngừng nỗ lực nghiên cứu phát triển sản phẩm và trải nghiệm khách hàng để đưa Finra Capital trở thành thương hiệu được khách hàng tin tưởng lựa chọn hàng đầu trong lĩnh vực công nghệ đầu tư tài chính! </div></div><div class="end-content"> &quot;Tại Finra Capital - Bạn là ưu tiên số một của chúng tôi&quot; </div></div></div></div></div></div></div></div></div></section><section class="tc-background"><div class="container"><div class="tc-background__img"></div></div></section><section class="products pb-500"><div class="container"><div class="products__header"><h1 class="d-block">Sản phẩm của</h1><img${ssrRenderAttr("src", _imports_0)} alt=""></div><div class="products__title"><h1 class="text-gradient-purple"> Tích luỹ dễ dàng, lợi nhuận hấp dẫn </h1><span>Đa dạng nhu cầu. Thời gian tích luỹ linh động. Bắt đầu chỉ từ 50.000 VND</span></div><div class="products__list"><div class="products__item"><div class="products__item-img"><img${ssrRenderAttr("src", _imports_1)} alt="" class="img-cover"></div><div class="products__item-content"><div class="products__item-content-relative"><div class="products__item-content__title"><h2>Tích luỹ linh hoạt</h2><span>Không giới hạn đầu tư</span></div><div class="products__item-content__date"><div class="d-flex align-items-center justify-content-between gap-3" style="${ssrRenderStyle({ "width": "100%" })}"><h2>KỲ HẠN TÍCH LUỸ</h2><span>Không kỳ hạn</span></div><div class="d-flex align-items-center justify-content-between gap-3" style="${ssrRenderStyle({ "width": "100%" })}"><h2>Lợi nhuận</h2><span>4% / năm</span></div></div><div class="products__item-content__links"><div class="products__item-content__links-tag"><a href="">#Lợi nhuận hàng ngày</a></div><div class="products__item-content__links-tag"><a href="">#Nạp/rút linh hoạt</a></div></div><div class="circle-bottom"></div></div></div></div><div class="products__item"><div class="products__item-img"><img${ssrRenderAttr("src", _imports_2)} alt="" class="img-cover"></div><div class="products__item-content"><div class="products__item-content-relative"><div class="products__item-content__title"><h2>Tích luỹ theo tháng</h2><span>Tối thiểu 2 triệu</span></div><div class="products__item-content__date"><div class="d-flex align-items-center justify-content-between gap-3" style="${ssrRenderStyle({ "width": "100%" })}"><h2>KỲ HẠN TÍCH LUỸ</h2><span>1 Tháng</span></div><div class="d-flex align-items-center justify-content-between gap-3" style="${ssrRenderStyle({ "width": "100%" })}"><h2>Lợi nhuận</h2><span>5%/ năm</span></div></div><div class="products__item-content__links"><div class="products__item-content__links-tag"><a href="">#Lợi nhuận hàng ngày</a></div><div class="products__item-content__links-tag"><a href="">#Nạp/rút linh hoạt</a></div></div><div class="circle-bottom"></div></div></div></div><div class="products__item"><div class="products__item-img"><img${ssrRenderAttr("src", _imports_3)} alt="" class="img-cover"></div><div class="products__item-content"><div class="products__item-content-relative"><div class="products__item-content__title"><h2>Tích luỹ theo kỳ</h2><span>Tối thiểu 5 triệu</span></div><div class="products__item-content__date"><div class="d-flex align-items-center justify-content-between gap-3" style="${ssrRenderStyle({ "width": "100%" })}"><h2>KỲ HẠN TÍCH LUỸ</h2><span>3-8 tháng</span></div><div class="d-flex align-items-center justify-content-between gap-3" style="${ssrRenderStyle({ "width": "100%" })}"><h2>Lợi nhuận</h2><span>6%/ năm</span></div></div><div class="products__item-content__links"><div class="products__item-content__links-tag"><a href="">#Lợi nhuận hàng ngày</a></div><div class="products__item-content__links-tag"><a href="">#Nạp/rút linh hoạt</a></div></div><div class="circle-bottom"></div></div></div></div></div><div class="products__footer"><button class="products__read-more">Tìm hiểu ngay</button></div></div></section><section class="tc-partner"><div class="container"><div class="title"> Đối tác đồng hành <span class="text-gradient-green">uy tín</span></div><div class="fw-500 mb-30"> Được định hướng bởi sứ mệnh dẫn đầu. Đi cùng là những đối tác uy tín trên thị trường của FINRA </div><div class="row mt-100"><div class="col-12 col-lg-4 d-flex flex-column align-items-center gap-3"><a class="d-block" href=""><img${ssrRenderAttr("src", _imports_4)} alt="youtube icon"></a><div class="partner_des"> Đối tác chiến lược sản phẩm cùng sàn chứng khoán UP Securities, đem tới sự đa dạng về sản phẩm </div></div><div class="col-12 col-lg-4 d-flex flex-column align-items-center gap-3"><a class="d-block" href="https://tornadoinvest.com.vn" target="_blank"><img${ssrRenderAttr("src", _imports_5)} alt="youtube icon"></a><div class="partner_des"> F1 trading là công ty dẫn đầu tại Việt Nam trong lĩnh vực đầu tư phái sinh hàng hóa quốc tế với tiềm năng tăng trưởng cao </div></div><div class="col-12 col-lg-4 d-flex flex-column align-items-center gap-3"><a class="d-block" href="https://bidv.com.vn" target="_blank"><img${ssrRenderAttr("src", _imports_6)} alt="youtube icon"></a><div class="partner_des"> Ngân hàng BIDV là đối tác cung cấp giải pháp thanh toán an toàn và bảo mật cho người dùng của Finra </div></div></div></div></section><section class="tc-faq"><div class="container"><div class="row"><div class="col-4"><h1 class="faq-header">Các bạn hỏi?</h1><span class="faq-sub-header">FINRA trả lời</span></div><div class="col-8"><div class="dropdown"><div class="dropdown-item"><div class="faq-question"><h2>FINRA là ai?</h2><div class="arrow-icon" style="${ssrRenderStyle({ "transform": "rotate(45deg)" })}"><img${ssrRenderAttr("src", _imports_7)} alt="" class="img-cover"></div></div><div class="faq-answer"> Finra là ứng dụng đầu tư và quản lý tài chính thông minh giúp bạn dễ dàng tích lũy, đầu tư và quản lý tài chính cá nhân để tự tin xây dựng tương lai tài chính vững vàng. </div></div><div class="dropdown-item"><div class="faq-question"><h2>Làm thế nào để mở tài khoản Finra?</h2><div class="arrow-icon"><img${ssrRenderAttr("src", _imports_7)} alt="" class="img-cover"></div></div><div class="faq-answer d-none"> Finra là ứng dụng đầu tư và quản lý tài chính thông minh giúp bạn dễ dàng tích lũy, đầu tư và quản lý tài chính cá nhân để tự tin xây dựng tương lai tài chính vững vàng. </div></div><div class="dropdown-item"><div class="faq-question"><h2>Finra có uy tín không?</h2><div class="arrow-icon"><img${ssrRenderAttr("src", _imports_7)} alt="" class="img-cover"></div></div><div class="faq-answer d-none"> Finra là ứng dụng đầu tư và quản lý tài chính thông minh giúp bạn dễ dàng tích lũy, đầu tư và quản lý tài chính cá nhân để tự tin xây dựng tương lai tài chính vững vàng. </div></div></div></div></div></div></section><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-TnBoA31o.js.map
