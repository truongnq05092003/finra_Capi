<template>
  <!--  Start innerHeader  -->
  <header class="tc-innerHeader-st1">
    <div class="container mt-100">
      <div class="fs-6 fw-700">Về chúng tôi</div>
      <div class="title col-lg-8 mt-20">
        <h1 class="fsz-50 text-capitalize fw-600">
          Hành trình hướng tới
          <span class="text-gradient-purple">dẫn đầu</span> về nền tảng công
          nghệ đầu tư tài chính
        </h1>
      </div>
      <div class="info mt-30">
        <div class="row">
          <div class="col-lg-8">
            <div
              class="text fsz-16 fw-500"
              style="color: rgba(43, 54, 72, 0.66)"
            >
              Với tư duy sáng tạo công nghệ, số hoá toàn diện chúng tôi hướng tới các tư vấn, khuyến nghị được cá nhân hoá cho mọi khách hàng,
              cung cấp cho khách hàng của chúng tôi những sản phẩm đầu tư hiệu
              suất cao với cấu trúc lãi suất minh bạch.
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!--  End innerHeader  -->
  <!--Contents-->
  <main>
    <section class="tc-about-st10">
      <div class="main-img">
        <img
          src="/public/resource1/common/img/about1.png"
          alt="about image"
          class="img-cover"
        />
      </div>
    </section>

    <section>
      <div class="container mt-100 tc-proud">
        <div class="row">
          <div class="col-lg-6 d-flex flex-column justify-content-around">
            <div>
              <div class="fs-6 fw-500">
                Với đội ngũ chuyên viên giàu kinh nghiệm và chuyên môn
              </div>
              <div class="mt-20">
                <h1 class="title fsz-48 fw-600">
                  Chúng tôi tự hào mang đến cho khách hàng giải pháp đầu tư tối ưu nhất
                  <span class="text-gradient-purple d-inline"
                    >dựa trên sự nhiệt huyết và trung thực</span
                  >
                </h1>
              </div>
            </div>

            <div class="info mt-30">
              <div class="text fsz-16 cr-777">
                Chúng tôi không ngừng nỗ lực nghiên cứu các công nghệ số hoá mới
                nhất để tạo ra sự khác biệt về sản phẩm tập trung vào
                thành công lâu dài bền vững của khách hàng và
                <span class="text-gradient-purple">đưa Finra Capital</span> trở
                thành thương hiệu được khách hàng tin tưởng có ảnh hưởng tích cực với
                phương châm:
              </div>
              <div class="slogan mt-20">
                “ Tại Finra Capital - Bạn là ưu tiên số một của chúng tôi
                <span class="quote-icon">“</span>
              </div>
            </div>
          </div>
          <div class="col-lg-1"></div>
          <div class="col-lg-5">
            <img src="../../public/resource1/common/img/iphone.png" alt="" />
          </div>
        </div>
      </div>
    </section>

    <!--  Start section  -->
    <section class="tc-about-st10">
      <div class="about">
        <div class="container">
          <div class="row gx-5">
            <div class="col-lg-6">
              <div class="title-side wow fadeIn slow" >
                <div class="icon th-50 mb-15">
                  <img
                    src="../../public/resource1/common/img/logo_wh.svg"
                    alt=""
                    class="logo"
                  />
                </div>
                <h2 class="title">Tầm nhìn & sứ mệnh</h2>
                <div class="cont">
                  <img
                    src="../../public/resource1/common/img/arrow_lg.svg"
                    alt=""
                    class="arrow"
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="progress-side wow fadeIn slow" >
                <div class="shap-img">
                  <img
                    src="../../public/resource1/common/img/shap_img.png"
                    alt=""
                  />
                </div>
                <div class="row">
                  <div class="col-lg-8">
                    <div class="text fsz-16 cr-777 mt-40 content-heading">
                      Mục tiêu đầu tư tài chính
                      <span class="text-gradient-purple">đơn giản</span> hơn và
                      <span class="text-gradient-purple">chuyên nghiệp</span>                        
                    </div>
                    <div>
                      <div class="content">
                        Giúp khách hàng của chúng tôi có được cơ hội đầu tư tốt
                        nhất, đảm bảo hiệu suất cao bằng sự sáng tạo, đam mê và
                        chính trực.
                      </div>
                      <div class="content">
                        Tạo ra thay đổi tích cực, trở thành đơn vị dẫn đầu đáng
                        tin cậy nhất trong lĩnh vực dịch vụ đầu tư tài chính.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--  End section  -->

    <!--  Start services  -->
    <section class="tc-services-st1" style="background-color: #1D4692;">
      <div class="container wow fadeIn slow">
        <div class="title">
          <div class="row justify-content-between align-items-end">
            <div class="col-lg-6">
              <img
                src="../../public/resource1/common/img/logo_icon.svg"
                alt=""
                class="logo"
              />
              <h2 class="fsz-50 text-capitalize">Giá trị cốt lõi</h2>
            </div>
            <div class="col-lg-4 mt-4 mt-lg-0">
              <p style="color: #fff;">
                “Tinh thần quan tâm, chia sẻ và thấu hiểu là nền tảng cho thành
                công của chúng tôi trong việc phục vụ khách hàng và xã hội"
              </p>
            </div>
          </div>
        </div>

        <div class="services-slider">
          <swiper
            :modules="[SwiperNavigation, SwiperAutoplay]"
            :pagination="true"
            :slides-per-view="1"
            :loop="true"
            :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
            :speed="1000"
            :space-between="80"
            :initial-slide="vSwiperIndex"
            :breakpoints="{
                1920: { slidesPerView: 4 },
                760: { slidesPerView: 4 }
              }"
           
          >
            <!--<swiper-slide>
              
              <div class="swiper-slide">
                <div class="service-card">
                  <div class="icon">
                    <img
                      src="../../public/resource1/common/img/heart.png"
                      alt=""
                    />
                  </div>
                  <div class="card-title">
                    <h6 class="fsz-24 fw-500">Niềm tin</h6>
                  </div>
                  <div class="content">
                    Xây dựng niềm tin với khách hàng bằng cách ứng xử có đạo
                    đức, đồng cảm và chủ động.
                  </div>
                  <div class="bottom-slider">
                    <div class="num-line">
                      <span class="num">
                        <img
                          src="../../public/resource1/common/img/star_green.svg"
                          alt=""
                          class="logo"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>-->
            <swiper-slide>
              <div class="swiper-slide">
                <div class="service-card">
                  <div class="icon">
                    <img
                      src="../../public/resource1/common/img/clound.png"
                      alt=""
                    />
                  </div>
                  <div class="card-title">
                    <h6 class="fsz-24 fw-500">Hiệu quả</h6>
                  </div>
                  <div class="content">
                    Chúng tôi luôn công bằng và nỗ lực duy trì các tiêu chuẩn đạo đức cao nhất để đặt lợi ích của khách hàng lên hàng đầu nhằm tạo ra hiệu quả năng suất tốt nhất
                  </div>
                  <div class="bottom-slider">
                    <div class="num-line">
                      <span class="num">
                        <img
                          src="../../public/resource1/common/img/star_green.svg"
                          alt=""
                          class="logo"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="swiper-slide">
                <div class="service-card">
                  <div class="icon">
                    <img
                      src="../../public/resource1/common/img/thunder.png"
                      alt=""
                    />
                  </div>
                  <div class="card-title">
                    <h6 class="fsz-24 fw-500">Sáng tạo</h6>
                  </div>
                  <div class="content">
                    Không ngừng cải thiện trải nghiệm của khách hàng thông qua
                    sự đổi mới nền tảng công nghệ để tạo sự khách biệt mang lại
                    lợi ích cho khách hàng của chúng tôi.
                  </div>
                  <div class="bottom-slider">
                    <div class="num-line">
                      <span class="num">
                        <img
                          src="../../public/resource1/common/img/star_green.svg"
                          alt=""
                          class="logo"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="swiper-slide">
                <div class="service-card">
                  <div class="icon">
                    <img
                      src="../../public/resource1/common/img/star5.png"
                      alt=""
                    />
                  </div>
                  <div class="card-title">
                    <h6 class="fsz-24 fw-500">Chính trực</h6>
                  </div>
                  <div class="content">
                    Chúng tôi đề cao sự tuân thủ quy định của pháp luật và quy định quản trị rủi ro, và cân nhắc các mặt rủi ro và hiệu quả mang lại trong mọi hoạt động với Phương châm đơn giản: Làm điều đúng đắn.
                  </div>
                  <div class="bottom-slider">
                    <div class="num-line">
                      <span class="num">
                        <img
                          src="../../public/resource1/common/img/star_green.svg"
                          alt=""
                          class="logo"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="swiper-slide">
                <div class="service-card">
                  <div class="icon">
                    <img
                      src="../../public/resource1/common/img/arrow.png"
                      alt=""
                    />
                  </div>
                  <div class="card-title">
                    <h6 class="fsz-24 fw-500">Niềm tin & Chia sẻ</h6>
                  </div>
                  <div class="content">
                    Xây dựng niềm tin với khách hàng bằng cách ứng xử có đạo đức, đồng cảm và chủ động. Chúng tôi trở nên mạnh mẽ hơn khi cùng gắn kết quyền lợi của mình với khách hàng của chúng tôi bằng sự hài hòa và chia sẽ các giá trị cốt lõi.
                  </div>
                  <div class="bottom-slider">
                    <div class="num-line">
                      <span class="num">
                        <img
                          src="../../public/resource1/common/img/star_green.svg"
                          alt=""
                          class="logo"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="service-footer mt-50">
          <div class="quote-icon">
            <!-- <img src="assets/img/quote_left.svg" alt="" class="vec9"> -->
          </div>
          <span class="text-gradient-green">“ Finra Capital </span>
          không chỉ thay đổi cách thức đầu tư tài chính theo hướng tốt hơn mà
          còn thay đổi cuộc sống của bạn theo hướng tốt đẹp hơn
          <span class="quote-icon">“</span>
          <div class="quote-icon">
            <!-- <img src="assets/img/quote_right.svg" alt="" class="vec9"> -->
          </div>
        </div>
      </div>
    </section>
    <!--  End services  -->
    <!-- Begin:  partner-->
    <section class="tc-partner mt-100 mb-100">
      <div class="container">
        <div>
          <a href="#" class="logo">
            <img src="../../public/resource1/common/img/logo_wh.svg" alt="" />
          </a>
        </div>
        <div class="title fs-1">
          Sự đồng hành <br />
          của <span class="text-gradient-green">uy tín</span>
        </div>
        <div class="fw-500">Đối tác của Finra</div>
        <div class="row">
          <div class="col-lg-4"></div>
          <div
            class="col-lg-8 d-flex gap-3 align-items-center justify-content-md-between justify-content-between flex-wrap flex-lg-nowrap"
          >
            <div>
              <img
                src="../../public/resource1/common/img/ups_logo.svg"
                alt="youtube icon"
              />
            </div>
            <div>
              <img
                src="../../public/resource1/common/img/f1_logo.svg"
                alt="youtube icon"
              />
            </div>
            <div>
              <img
                src="../../public/resource1/common/img/bidv_logo.svg"
                alt="youtube icon"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End:  partner-->
  </main>
  <!--End-Contents-->
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { SwiperAutoplay, SwiperPagination } from "#imports";
export default defineComponent({
  components: {},
  name: 'AboutUs',
  setup() {
    let vSwiperRef: any = null;
    const vSwiperIndex = ref<number>(0);

    const setVSwiperRef = (swiper: any) => {
      vSwiperRef = swiper;
    };

    const handleChangeSlide = (index: number) => {
      vSwiperRef?.slideTo(index);
    };

    const updateVSwiperIndex = () => {
      return Array.from({ length: vSwiperRef?.slides?.length || 0 }, (_, index) => index === vSwiperRef?.activeIndex);
    };


    const dots = computed(() => {
      return Array.from({ length: vSwiperRef?.slides?.length || 0 }, (_, index) => index === vSwiperRef?.activeIndex);
    });

    return {
      vSwiperRef,
      vSwiperIndex,
      SwiperAutoplay,
      SwiperPagination,
      setVSwiperRef,
      updateVSwiperIndex,
      handleChangeSlide,
      dots,
    };
  },
});
</script>
<style scoped>
.swiper-slide {
}
.swiper-pagination {
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
}

.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
  background: #fff;
  opacity: 0.5;
  margin: 0 4px;
  cursor: pointer;
}

.swiper-pagination-bullet-active {
  background: #007bff; /* Change color for active dot */
}
</style>
