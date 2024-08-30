import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { _ as _imports_1, a as _imports_3$1 } from "./virtual_public-CTyS1ncM.js";
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
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "radix3";
import "devalue";
import "axios";
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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "project-page-st1" }, _attrs))}><header class="tc-header-st18"><div class="container"><div class="fs-6 fw-700">Sản phẩm</div><div class="title mt-40"><div class="row"><div class="col-lg-7"><h1 class="fsz-50 fw-600 text-normal" style="${ssrRenderStyle({ "line-height": "normal" })}"> Tích luỹ linh hoạt <div class="d-flex gap-3 align-items-center"><span class="text-gradient-purple">Không kỳ hạn</span></div></h1></div><div class="col-lg-5"><div class="info mt-100"><div class="text fsz-16 fw-500" style="${ssrRenderStyle({ "color": "rgba(0, 0, 0, 0.77)" })}"> Bạn muốn tiền của mình sinh lời mỗi ngày mà không bị gò bó bởi bất kỳ hạn mức nào? Với sản phẩm tích lũy linh hoạt không kỳ hạn, bạn có thể tự do rút tiền bất cứ khi nào bạn cần, đồng thời nhận được lãi suất hấp dẫn. Chỉ cần một chiếc điện thoại thông minh, bạn có thể bắt đầu xây dựng tài sản ngay hôm nay. Đừng bỏ lỡ cơ hội sở hữu một công cụ tài chính linh hoạt và hiệu quả! </div></div></div></div></div></div></header><main><section class="tc-main-img-st18"><div class="img"><img${ssrRenderAttr("src", _imports_0)} alt="" class="img-cover"></div></section><section class="tc-cards-st18"><div class="container"><div class="content pb-50 border-bottom"><div class="row"><div class="col-lg-4"><div class="item mt-50"><p class="fsz-16 cr-666 mb-2">Đối tượng áp dụng:</p><h6 class="fsz-16 fw-600 my-2">Tất cả các khách hàng</h6></div></div><div class="col-lg-4"><div class="item mt-50"><p class="fsz-16 cr-666 mb-2">Phân loại:</p><h6 class="fsz-16 fw-600 my-2"> Sản phẩm Huy động KHÔNG kỳ hạn </h6></div></div><div class="col-lg-4"><div class="item mt-50"><p class="fsz-16 cr-666 mb-2">Tiêu chí:</p><h6 class="fsz-16 fw-600 my-2"> Gửi không kỳ hạn, lãi suất cao, nộp rút linh hoạt </h6></div></div></div></div></div></section><section class="tc-info-st18 py-5 mb-150 mt-60"><div class="container"><div class="row justify-content-center"><div class="col-lg-8"><div class="content"><h5 class="fsz-50 fw-600">Mô tả chung</h5><div class="text fsz-16 mt-30 fw-500" style="${ssrRenderStyle({ "color": "rgba(0, 0, 0, 0.66)" })}"> Tích lũy linh hoạt không kỳ hạn - Giải pháp tài chính thông minh cho mọi nhà. Với sản phẩm này, bạn có thể dễ dàng xây dựng quỹ dự phòng, thực hiện các mục tiêu tài chính dài hạn như mua nhà, mua xe, du lịch... Đặc biệt, sản phẩm còn hỗ trợ tích lũy tự động, giúp bạn hình thành thói quen tiết kiệm hiệu quả. </div><ul class="info-list mt-30"><li><span class="icon me-3"><img${ssrRenderAttr("src", _imports_1)} alt=""></span><span> Khách hàng lựa chọn đầu tư theo giá trị số tiền mong muốn</span></li><li><span class="icon me-3"><img${ssrRenderAttr("src", _imports_1)} alt=""></span><span> Số tiền đầu tư tối thiểu, rút tối đa: không giới hạn </span></li><li><span class="icon me-3"><img${ssrRenderAttr("src", _imports_1)} alt=""></span><span> Nhận lợi nhuận sau mỗi khoảng thời gian cố định tuỳ gói sản phẩm <div class="fw-500" style="${ssrRenderStyle({ "color": "rgba(0, 0, 0, 0.44)", "font-size": "14px", "line-height": "24px" })}"> *có bảng lãi suất theo ngày, tuần, tháng </div></span></li><li><span class="icon me-3"><img${ssrRenderAttr("src", _imports_1)} alt=""></span><span> Nộp/rút linh hoạt không ảnh hưởng đến lợi nhuận chi trả, không bị phạt rút trước hạn </span></li></ul></div></div></div></div></section><section class="tc-img-st18 mt-4"><div class="container"><div class="img"><img${ssrRenderAttr("src", _imports_3$1)} alt="" class="img-cover"></div></div></section><section class="tc-sub-imgs-st18 mb-150"><div class="container"><div class="row"><div class="col-lg-6"><div class="img mt-5 mt-lg-0"><section class="tc-testimonials-st10"><div class="container"><div class="content"><div style="${ssrRenderStyle({ "width": "500px" })}"><h5 class="fsz-50 fw-600">Công thức xác định</h5><div class="d-flex justify-content-center align-items-center formula-image"><img${ssrRenderAttr("src", _imports_3)} alt="" class="formula"></div><div><div>Trong đó:</div><ul class="formula_list"><li class="formula_item"><span class="symbol">C</span><span class="description">: Lợi nhuận nhận được của khoản đầu tư (đơn vị: đồng)</span></li><li class="formula_item"><span class="symbol">V</span><span class="description">: Giá trị khoảng tiền đầu tư (đơn vị: đồng)</span></li><li class="formula_item"><span class="symbol">r</span><span class="description">: Lợi suất của khoản đầu tư (%/năm)</span></li><li class="formula_item"><span class="symbol">t</span><span class="description">: Khoảng thời gian tính lợi nhuận (đơn vị: ngày)</span></li><li class="formula_item"><span class="symbol">n</span><span class="description">: Kỳ tính lợi nhuận</span></li></ul></div></div></div></div></section></div></div><div class="col-lg-6"><div class="img mt-5 mt-lg-0"><section class="tc-testimonials-st10"><div class="container" style="${ssrRenderStyle({ "padding": "0" })}"><div class="content row d-flex" style="${ssrRenderStyle({ "justify-content": "flex-end" })}"><div class="col-lg-10" style="${ssrRenderStyle({ "padding": "0" })}"><div class="interest-rate-card"><div class="d-flex flex-column justify-content-between align-items-center"><div class="title"> Lãi suất các <span class="text-gradient-purple">kỳ hạn</span></div><div class="time">% trên năm</div></div><div class="d-flex align-items-center justify-content-center w-100"><div class="button-group"><button class="${ssrRenderClass(["button", _ctx.active == 1 ? "active" : ""])}"> Theo ngày </button><button class="${ssrRenderClass(["button", _ctx.active == 2 ? "active" : ""])}"> Theo tháng/quý </button></div></div><div class="d-flex justify-content-around align-items-center"><div class="sub-title">Thời hạn</div><div class="sub-title">Lãi suất</div></div>`);
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
  _push(`</div></div></div></div></section></div></div></div></div></section></main></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dich-vu/KKH/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-DnH1N-UU.js.map
