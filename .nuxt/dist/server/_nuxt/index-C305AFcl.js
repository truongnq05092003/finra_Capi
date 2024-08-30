import { A as Autoplay, P as Pagination, N as Navigation, S as Swiper, a as SwiperSlide } from "./entry-styles-2.mjs-odfW0i3F.js";
import { defineComponent, ref, computed, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderStyle, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
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
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "radix3";
import "devalue";
import "axios";
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
const _imports_0 = "" + __buildAssetsURL("about1.DYJw-N59.png");
const _imports_1 = "" + __buildAssetsURL("iphone.BCWdYaCf.png");
const _imports_2 = "" + __buildAssetsURL("logo_wh.BzAx-18N.svg");
const _imports_3 = "data:image/svg+xml,%3csvg%20width='304'%20height='303'%20viewBox='0%200%20304%20303'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M59%201V40H231L1%20269L34%20302L264%2072V221H303V1H59Z'%20fill='white'%20stroke='%23151515'/%3e%3c/svg%3e";
const _imports_4 = "" + __buildAssetsURL("shap_img.YpnqcsZ-.png");
const _imports_5 = "data:image/svg+xml,%3csvg%20width='62'%20height='93'%20viewBox='0%200%2062%2093'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M52.6893%2033.1423H7.32073C3.29869%2033.1423%200.0810547%2036.36%200.0810547%2040.3822V85.7517C0.0810547%2092.1871%207.88381%2095.4049%2012.4689%2090.9001L57.8376%2045.5305C62.3422%2040.9453%2059.1246%2033.1423%2052.6893%2033.1423Z'%20fill='url(%23paint0_linear_110_1616)'/%3e%3cpath%20d='M54.1367%200H7.48099C3.37851%200%200%203.29814%200%207.48116V54.1378C0%2060.7341%208.04408%2064.1127%2012.7096%2059.3666L59.3653%2012.7099C64.1113%208.04425%2060.8133%200%2054.1367%200Z'%20fill='url(%23paint1_linear_110_1616)'/%3e%3cpath%20d='M12.7903%2059.3666L39.014%2033.1423H7.32035C3.29831%2033.1423%200.0806769%2036.36%200.0806769%2040.3822V54.0574C0.000236034%2060.7341%208.04432%2064.0323%2012.7903%2059.3666Z'%20fill='%232F7BF2'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_110_1616'%20x1='53.0541'%20y1='36.0528'%20x2='-0.952484'%20y2='67.9996'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23C06AE4'/%3e%3cstop%20offset='1'%20stop-color='%234D24C6'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_110_1616'%20x1='60.024'%20y1='2.10611'%20x2='-1.4092e-06'%20y2='36.8568'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%2300FDC2'/%3e%3cstop%20offset='1'%20stop-color='%2300C3DE'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
const _imports_6 = "" + __buildAssetsURL("clound.B5oQCtjL.png");
const _imports_7 = "data:image/svg+xml,%3csvg%20width='20'%20height='19'%20viewBox='0%200%2020%2019'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.51859%2018.508C9.15859%2016.444%207.69459%2013.852%204.91059%2011.764C3.54259%2010.732%202.15059%2010.06%200.782594%209.772V8.764C3.49459%208.116%206.15859%206.292%207.86259%203.82C8.72659%202.572%209.27859%201.348%209.51859%200.0759997H10.5266C10.9346%202.5%2012.8066%205.188%2015.3506%206.988C16.5986%207.876%2017.8946%208.476%2019.2146%208.764V9.772C16.5506%2010.324%2013.4546%2012.7%2011.9186%2015.124C11.1506%2016.348%2010.6946%2017.476%2010.5266%2018.508H9.51859Z'%20fill='url(%23paint0_linear_110_1640)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_110_1640'%20x1='-5.00402'%20y1='20.0476'%20x2='14.8738'%20y2='15.7613'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%232F7BF2'/%3e%3cstop%20offset='1'%20stop-color='%231CFFC7'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
const _imports_8 = "" + __buildAssetsURL("thunder.BT2ulupp.png");
const _imports_9 = "" + __buildAssetsURL("star5.J7dUw4uj.png");
const _imports_10 = "" + __buildAssetsURL("arrow.BDVLlJnA.png");
const _imports_11 = "" + __buildAssetsURL("ups_logo.Dbx9ziTU.svg");
const _imports_12 = "" + __buildAssetsURL("f1_logo.BpUfssxC.svg");
const _imports_13 = "" + __buildAssetsURL("bidv_logo.COiTvVpu.svg");
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_swiper = Swiper;
  const _component_swiper_slide = SwiperSlide;
  _push(`<!--[--><header class="tc-innerHeader-st1" data-v-a81c1319><div class="container mt-100" data-v-a81c1319><div class="fs-6 fw-700" data-v-a81c1319>Về chúng tôi</div><div class="title col-lg-8 mt-20" data-v-a81c1319><h1 class="fsz-50 text-capitalize fw-600" data-v-a81c1319> Hành trình hướng tới <span class="text-gradient-purple" data-v-a81c1319>dẫn đầu</span> về nền tảng công nghệ đầu tư tài chính </h1></div><div class="info mt-30" data-v-a81c1319><div class="row" data-v-a81c1319><div class="col-lg-8" data-v-a81c1319><div class="text fsz-16 fw-500" style="${ssrRenderStyle({ "color": "rgba(43, 54, 72, 0.66)" })}" data-v-a81c1319> Với tư duy sáng tạo công nghệ, số hoá toàn diện chúng tôi hướng tới các tư vấn, khuyến nghị được cá nhân hoá cho mọi khách hàng, cung cấp cho khách hàng của chúng tôi những sản phẩm đầu tư hiệu suất cao với cấu trúc lãi suất minh bạch. </div></div></div></div></div></header><main data-v-a81c1319><section class="tc-about-st10" data-v-a81c1319><div class="main-img" data-v-a81c1319><img${ssrRenderAttr("src", _imports_0)} alt="about image" class="img-cover" data-v-a81c1319></div></section><section data-v-a81c1319><div class="container mt-100 tc-proud" data-v-a81c1319><div class="row" data-v-a81c1319><div class="col-lg-6 d-flex flex-column justify-content-around" data-v-a81c1319><div data-v-a81c1319><div class="fs-6 fw-500" data-v-a81c1319> Với đội ngũ chuyên viên giàu kinh nghiệm và chuyên môn </div><div class="mt-20" data-v-a81c1319><h1 class="title fsz-48 fw-600" data-v-a81c1319> Chúng tôi tự hào mang đến cho khách hàng giải pháp đầu tư tối ưu nhất <span class="text-gradient-purple d-inline" data-v-a81c1319>dựa trên sự nhiệt huyết và trung thực</span></h1></div></div><div class="info mt-30" data-v-a81c1319><div class="text fsz-16 cr-777" data-v-a81c1319> Chúng tôi không ngừng nỗ lực nghiên cứu các công nghệ số hoá mới nhất để tạo ra sự khác biệt về sản phẩm tập trung vào thành công lâu dài bền vững của khách hàng và <span class="text-gradient-purple" data-v-a81c1319>đưa Finra Capital</span> trở thành thương hiệu được khách hàng tin tưởng có ảnh hưởng tích cực với phương châm: </div><div class="slogan mt-20" data-v-a81c1319> “ Tại Finra Capital - Bạn là ưu tiên số một của chúng tôi <span class="quote-icon" data-v-a81c1319>“</span></div></div></div><div class="col-lg-1" data-v-a81c1319></div><div class="col-lg-5" data-v-a81c1319><img${ssrRenderAttr("src", _imports_1)} alt="" data-v-a81c1319></div></div></div></section><section class="tc-about-st10" data-v-a81c1319><div class="about" data-v-a81c1319><div class="container" data-v-a81c1319><div class="row gx-5" data-v-a81c1319><div class="col-lg-6" data-v-a81c1319><div class="title-side wow fadeIn slow" data-v-a81c1319><div class="icon th-50 mb-15" data-v-a81c1319><img${ssrRenderAttr("src", _imports_2)} alt="" class="logo" data-v-a81c1319></div><h2 class="title" data-v-a81c1319>Tầm nhìn &amp; sứ mệnh</h2><div class="cont" data-v-a81c1319><img${ssrRenderAttr("src", _imports_3)} alt="" class="arrow" data-v-a81c1319></div></div></div><div class="col-lg-6" data-v-a81c1319><div class="progress-side wow fadeIn slow" data-v-a81c1319><div class="shap-img" data-v-a81c1319><img${ssrRenderAttr("src", _imports_4)} alt="" data-v-a81c1319></div><div class="row" data-v-a81c1319><div class="col-lg-8" data-v-a81c1319><div class="text fsz-16 cr-777 mt-40 content-heading" data-v-a81c1319> Mục tiêu đầu tư tài chính <span class="text-gradient-purple" data-v-a81c1319>đơn giản</span> hơn và <span class="text-gradient-purple" data-v-a81c1319>chuyên nghiệp</span></div><div data-v-a81c1319><div class="content" data-v-a81c1319> Giúp khách hàng của chúng tôi có được cơ hội đầu tư tốt nhất, đảm bảo hiệu suất cao bằng sự sáng tạo, đam mê và chính trực. </div><div class="content" data-v-a81c1319> Tạo ra thay đổi tích cực, trở thành đơn vị dẫn đầu đáng tin cậy nhất trong lĩnh vực dịch vụ đầu tư tài chính. </div></div></div></div></div></div></div></div></div></section><section class="tc-services-st1" style="${ssrRenderStyle({ "background-color": "#1D4692" })}" data-v-a81c1319><div class="container wow fadeIn slow" data-v-a81c1319><div class="title" data-v-a81c1319><div class="row justify-content-between align-items-end" data-v-a81c1319><div class="col-lg-6" data-v-a81c1319><img${ssrRenderAttr("src", _imports_5)} alt="" class="logo" data-v-a81c1319><h2 class="fsz-50 text-capitalize" data-v-a81c1319>Giá trị cốt lõi</h2></div><div class="col-lg-4 mt-4 mt-lg-0" data-v-a81c1319><p style="${ssrRenderStyle({ "color": "#fff" })}" data-v-a81c1319> “Tinh thần quan tâm, chia sẻ và thấu hiểu là nền tảng cho thành công của chúng tôi trong việc phục vụ khách hàng và xã hội&quot; </p></div></div></div><div class="services-slider" data-v-a81c1319>`);
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
              _push3(`<div class="swiper-slide" data-v-a81c1319${_scopeId2}><div class="service-card" data-v-a81c1319${_scopeId2}><div class="icon" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_6)} alt="" data-v-a81c1319${_scopeId2}></div><div class="card-title" data-v-a81c1319${_scopeId2}><h6 class="fsz-24 fw-500" data-v-a81c1319${_scopeId2}>Hiệu quả</h6></div><div class="content" data-v-a81c1319${_scopeId2}> Chúng tôi luôn công bằng và nỗ lực duy trì các tiêu chuẩn đạo đức cao nhất để đặt lợi ích của khách hàng lên hàng đầu nhằm tạo ra hiệu quả năng suất tốt nhất </div><div class="bottom-slider" data-v-a81c1319${_scopeId2}><div class="num-line" data-v-a81c1319${_scopeId2}><span class="num" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_7)} alt="" class="logo" data-v-a81c1319${_scopeId2}></span></div></div></div></div>`);
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
                      createVNode("h6", { class: "fsz-24 fw-500" }, "Hiệu quả")
                    ]),
                    createVNode("div", { class: "content" }, " Chúng tôi luôn công bằng và nỗ lực duy trì các tiêu chuẩn đạo đức cao nhất để đặt lợi ích của khách hàng lên hàng đầu nhằm tạo ra hiệu quả năng suất tốt nhất "),
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
              _push3(`<div class="swiper-slide" data-v-a81c1319${_scopeId2}><div class="service-card" data-v-a81c1319${_scopeId2}><div class="icon" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_8)} alt="" data-v-a81c1319${_scopeId2}></div><div class="card-title" data-v-a81c1319${_scopeId2}><h6 class="fsz-24 fw-500" data-v-a81c1319${_scopeId2}>Sáng tạo</h6></div><div class="content" data-v-a81c1319${_scopeId2}> Không ngừng cải thiện trải nghiệm của khách hàng thông qua sự đổi mới nền tảng công nghệ để tạo sự khách biệt mang lại lợi ích cho khách hàng của chúng tôi. </div><div class="bottom-slider" data-v-a81c1319${_scopeId2}><div class="num-line" data-v-a81c1319${_scopeId2}><span class="num" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_7)} alt="" class="logo" data-v-a81c1319${_scopeId2}></span></div></div></div></div>`);
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
                      createVNode("h6", { class: "fsz-24 fw-500" }, "Sáng tạo")
                    ]),
                    createVNode("div", { class: "content" }, " Không ngừng cải thiện trải nghiệm của khách hàng thông qua sự đổi mới nền tảng công nghệ để tạo sự khách biệt mang lại lợi ích cho khách hàng của chúng tôi. "),
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
              _push3(`<div class="swiper-slide" data-v-a81c1319${_scopeId2}><div class="service-card" data-v-a81c1319${_scopeId2}><div class="icon" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_9)} alt="" data-v-a81c1319${_scopeId2}></div><div class="card-title" data-v-a81c1319${_scopeId2}><h6 class="fsz-24 fw-500" data-v-a81c1319${_scopeId2}>Chính trực</h6></div><div class="content" data-v-a81c1319${_scopeId2}> Chúng tôi đề cao sự tuân thủ quy định của pháp luật và quy định quản trị rủi ro, và cân nhắc các mặt rủi ro và hiệu quả mang lại trong mọi hoạt động với Phương châm đơn giản: Làm điều đúng đắn. </div><div class="bottom-slider" data-v-a81c1319${_scopeId2}><div class="num-line" data-v-a81c1319${_scopeId2}><span class="num" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_7)} alt="" class="logo" data-v-a81c1319${_scopeId2}></span></div></div></div></div>`);
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
                      createVNode("h6", { class: "fsz-24 fw-500" }, "Chính trực")
                    ]),
                    createVNode("div", { class: "content" }, " Chúng tôi đề cao sự tuân thủ quy định của pháp luật và quy định quản trị rủi ro, và cân nhắc các mặt rủi ro và hiệu quả mang lại trong mọi hoạt động với Phương châm đơn giản: Làm điều đúng đắn. "),
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
              _push3(`<div class="swiper-slide" data-v-a81c1319${_scopeId2}><div class="service-card" data-v-a81c1319${_scopeId2}><div class="icon" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_10)} alt="" data-v-a81c1319${_scopeId2}></div><div class="card-title" data-v-a81c1319${_scopeId2}><h6 class="fsz-24 fw-500" data-v-a81c1319${_scopeId2}>Niềm tin &amp; Chia sẻ</h6></div><div class="content" data-v-a81c1319${_scopeId2}> Xây dựng niềm tin với khách hàng bằng cách ứng xử có đạo đức, đồng cảm và chủ động. Chúng tôi trở nên mạnh mẽ hơn khi cùng gắn kết quyền lợi của mình với khách hàng của chúng tôi bằng sự hài hòa và chia sẽ các giá trị cốt lõi. </div><div class="bottom-slider" data-v-a81c1319${_scopeId2}><div class="num-line" data-v-a81c1319${_scopeId2}><span class="num" data-v-a81c1319${_scopeId2}><img${ssrRenderAttr("src", _imports_7)} alt="" class="logo" data-v-a81c1319${_scopeId2}></span></div></div></div></div>`);
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
                      createVNode("h6", { class: "fsz-24 fw-500" }, "Niềm tin & Chia sẻ")
                    ]),
                    createVNode("div", { class: "content" }, " Xây dựng niềm tin với khách hàng bằng cách ứng xử có đạo đức, đồng cảm và chủ động. Chúng tôi trở nên mạnh mẽ hơn khi cùng gắn kết quyền lợi của mình với khách hàng của chúng tôi bằng sự hài hòa và chia sẽ các giá trị cốt lõi. "),
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
                    createVNode("h6", { class: "fsz-24 fw-500" }, "Hiệu quả")
                  ]),
                  createVNode("div", { class: "content" }, " Chúng tôi luôn công bằng và nỗ lực duy trì các tiêu chuẩn đạo đức cao nhất để đặt lợi ích của khách hàng lên hàng đầu nhằm tạo ra hiệu quả năng suất tốt nhất "),
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
                    createVNode("h6", { class: "fsz-24 fw-500" }, "Sáng tạo")
                  ]),
                  createVNode("div", { class: "content" }, " Không ngừng cải thiện trải nghiệm của khách hàng thông qua sự đổi mới nền tảng công nghệ để tạo sự khách biệt mang lại lợi ích cho khách hàng của chúng tôi. "),
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
                    createVNode("h6", { class: "fsz-24 fw-500" }, "Chính trực")
                  ]),
                  createVNode("div", { class: "content" }, " Chúng tôi đề cao sự tuân thủ quy định của pháp luật và quy định quản trị rủi ro, và cân nhắc các mặt rủi ro và hiệu quả mang lại trong mọi hoạt động với Phương châm đơn giản: Làm điều đúng đắn. "),
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
                    createVNode("h6", { class: "fsz-24 fw-500" }, "Niềm tin & Chia sẻ")
                  ]),
                  createVNode("div", { class: "content" }, " Xây dựng niềm tin với khách hàng bằng cách ứng xử có đạo đức, đồng cảm và chủ động. Chúng tôi trở nên mạnh mẽ hơn khi cùng gắn kết quyền lợi của mình với khách hàng của chúng tôi bằng sự hài hòa và chia sẽ các giá trị cốt lõi. "),
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
  _push(`</div><div class="service-footer mt-50" data-v-a81c1319><div class="quote-icon" data-v-a81c1319></div><span class="text-gradient-green" data-v-a81c1319>“ Finra Capital </span> không chỉ thay đổi cách thức đầu tư tài chính theo hướng tốt hơn mà còn thay đổi cuộc sống của bạn theo hướng tốt đẹp hơn <span class="quote-icon" data-v-a81c1319>“</span><div class="quote-icon" data-v-a81c1319></div></div></div></section><section class="tc-partner mt-100 mb-100" data-v-a81c1319><div class="container" data-v-a81c1319><div data-v-a81c1319><a href="#" class="logo" data-v-a81c1319><img${ssrRenderAttr("src", _imports_2)} alt="" data-v-a81c1319></a></div><div class="title fs-1" data-v-a81c1319> Sự đồng hành <br data-v-a81c1319> của <span class="text-gradient-green" data-v-a81c1319>uy tín</span></div><div class="fw-500" data-v-a81c1319>Đối tác của Finra</div><div class="row" data-v-a81c1319><div class="col-lg-4" data-v-a81c1319></div><div class="col-lg-8 d-flex gap-3 align-items-center justify-content-md-between justify-content-between flex-wrap flex-lg-nowrap" data-v-a81c1319><div data-v-a81c1319><img${ssrRenderAttr("src", _imports_11)} alt="youtube icon" data-v-a81c1319></div><div data-v-a81c1319><img${ssrRenderAttr("src", _imports_12)} alt="youtube icon" data-v-a81c1319></div><div data-v-a81c1319><img${ssrRenderAttr("src", _imports_13)} alt="youtube icon" data-v-a81c1319></div></div></div></div></section></main><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ve-chung-toi/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a81c1319"]]);
export {
  index as default
};
//# sourceMappingURL=index-C305AFcl.js.map
