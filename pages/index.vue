<template>
  <FinraSlider />

  <section class="tc-testimonials-st10">
    <div class="container">
      <div class="content row d-flex justify-content-center mb-0">
        <div class="col-lg-12">
          <div
            class="row justify-content-between flex-column-reverse flex-lg-row"
          >
            <div class="col-lg-6">
              <div class="interest-rate-card">
                <div
                  class="d-flex flex-column justify-content-between align-items-center"
                >
                  <div class="title">
                    Lãi suất các
                    <span class="text-gradient-purple">kỳ hạn</span>
                  </div>
                  <div class="time">% trên năm</div>
                </div>

                <div
                  class="d-flex align-items-center justify-content-center w-100"
                >
                  <div class="button-group">
                    <button
                      :class="['button', active == 1 ? 'active' : '']"
                      @click="active = 1"
                    >
                      Theo ngày
                    </button>
                    <button
                      :class="['button', active == 2 ? 'active' : '']"
                      @click="active = 2"
                    >
                      Theo tháng/quý
                    </button>
                  </div>
                </div>
                <div class="d-flex justify-content-around align-items-center">
                  <div class="sub-title">Thời hạn</div>
                  <div class="sub-title">Lãi suất</div>
                </div>

                <div v-if="active == 1">
                  <div class="content content-0 active">
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>2-7 ngày</div>
                      <div>2.5%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>8-14 ngày</div>
                      <div>3.3%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>15-21 ngày</div>
                      <div>3.3%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>22-29 ngày</div>
                      <div>4.5%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>30-59 ngày</div>
                      <div>5.0%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>60-89 ngày</div>
                      <div>5.0%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>90 ngày</div>
                      <div>5.0%</div>
                    </div>
                  </div>

                  <div class="content content-1">
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>1 tháng</div>
                      <div>4.0%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>2 tháng</div>
                      <div>-%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>3 tháng</div>
                      <div>5.1%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>4 tháng</div>
                      <div>5.2%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>5 tháng</div>
                      <div>5.3%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>6 tháng</div>
                      <div>5.5%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>7 tháng</div>
                      <div>-%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>9 tháng</div>
                      <div>6.0%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>12 tháng</div>
                      <div>6.5%</div>
                    </div>
                  </div>
                </div>
                <div v-if="active == 2">
                  <!-- <div class="content content-0 active">
										<div class="d-flex justify-content-around align-items-center item">
											<div>2-7 ngày</div>
											<div>2.5%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>8-14 ngày</div>
											<div>3.3%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>15-21 ngày</div>
											<div>3.3%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>22-29 ngày</div>
											<div>4.5%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>30-59 ngày</div>
											<div>5.0%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>60-89 ngày</div>
											<div>5.0%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>90 ngày</div>
											<div>5.0%</div>
										</div>
									</div> -->

                  <div class="content content-1 active">
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>1 tháng</div>
                      <div>4.0%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>2 tháng</div>
                      <div>-%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>3 tháng</div>
                      <div>5.1%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>4 tháng</div>
                      <div>5.2%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>5 tháng</div>
                      <div>5.3%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>6 tháng</div>
                      <div>5.5%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>7 tháng</div>
                      <div>-%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>9 tháng</div>
                      <div>6.0%</div>
                    </div>
                    <div
                      class="d-flex justify-content-around align-items-center item"
                    >
                      <div>12 tháng</div>
                      <div>6.5%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div
                class="d-flex flex-column align-items-start justify-content-between"
              >
                <div
                  class="info wow fadeIn slow position-relative"
                  data-wow-delay="0.2s"
                >
                  <div>
                    <div class="text fsz-50 cr-777 content-heading">
                      Tin cậy với nền tảng <br />
                      <span class="sub-title">công nghệ vượt trội</span>
                    </div>
                    <div class="title-outstanding-platform">
                      <ul class="ps-3">
                        <li>
                          Đội ngũ chuyên viên giàu kinh nghiệm và chuyên môn
                        </li>
                        <li>
                          Giải pháp công nghệ tài chính sáng tạo và số hoá toàn
                          diện
                        </li>
                        <li>Đầu tư chuyên nghiệp và dễ dàng</li>
                      </ul>
                    </div>
                    <div>
                      <div class="content-outstanding-platform">
                        Chúng tôi không ngừng nỗ lực nghiên cứu phát triển sản
                        phẩm và trải nghiệm khách hàng để đưa Finra Capital trở
                        thành thương hiệu được khách hàng tin tưởng lựa chọn
                        hàng đầu trong lĩnh vực công nghệ đầu tư tài chính!
                      </div>
                    </div>
                    <div class="end-content">
                      "Tại Finra Capital - Bạn là ưu tiên số một của chúng tôi"
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

  <!-- <section class="tc-blog-st4">
    <div class="container wow fadeIn slow" data-wow-delay="0.2s">
      <div class="title-wrapper">
        <div class="row justify-content-between">
          <div class="col-lg-12">
            <div class="text fsz-16 mt-20">
              Chúng tôi đem đến sự hấp dẫn trong
            </div>
            <div class="text title">
              Sản phẩm cho <span class="text-gradient-purple">bạn</span>
            </div>
          </div>
        </div>
      </div>
      <div class="posts-slider">
        <div class="posts-item">
          <div class="post-overlay">
            <nuxt-link to="/dich-vu/KKH" class="img d-block th-500">
              <img
                src="/resource1/home1_creativeAgency/assets/img/product_item_1.png"
                alt=""
                class="img-cover"
              />
              <div class="post-sub">Nộp/rút linh hoạt</div>
            </nuxt-link>
            <div class="info">
              <div class="tags">
                <div class=""><span>Gói đầu tư</span></div>
              </div>
              <h2 class="fs-1">
                <nuxt-link to="/dich-vu/KKH" class="hover-purple"
                  >Tích luỹ linh hoạt</nuxt-link
                >
              </h2>
              <div class="fs-4 mt-2">
                <nuxt-link to="/dich-vu/KKH" class="hover-purple"
                  >Không giới hạn đầu tư</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
        <div class="posts-item">
          <div class="post-overlay">
            <nuxt-link to="/dich-vu/TLCK" class="img d-block th-500">
              <img
                src="/resource1/home1_creativeAgency/assets/img/product_item_2.png"
                alt=""
                class="img-cover"
              />
              <div class="post-sub">Nộp/rút linh hoạt</div>
            </nuxt-link>
            <div class="info">
              <div class="tags">
                <div class=""><span>Gói đầu tư</span></div>
              </div>
              <h2 class="fs-1">
                <nuxt-link to="/dich-vu/TLCK" class="hover-purple"
                  >Tích luỹ nhận lãi cuối kỳ</nuxt-link
                >
              </h2>
              <div class="fs-4 mt-2">
                <nuxt-link to="/dich-vu/TLCK" class="hover-purple"
                  >Tối thiểu 5 triệu</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
        <div class="posts-item">
          <div class="post-overlay">
            <nuxt-link to="/dich-vu/TLHT" class="img d-block th-500">
              <img
                src="/resource1/home1_creativeAgency/assets/img/product_item_3.png"
                alt=""
                class="img-cover"
              />
              <div class="post-sub">Nộp/rút linh hoạt</div>
            </nuxt-link>
            <div class="info">
              <div class="tags">
                <div class=""><span>Gói đầu tư</span></div>
              </div>
              <h2 class="fs-1">
                <nuxt-link to="/dich-vu/TLHT" class="hover-purple"
                  >Tích luỹ nhận lãi hàng tháng</nuxt-link
                >
              </h2>
              <div class="fs-4 mt-2">
                <nuxt-link to="/dich-vu/TLHT" class="hover-purple"
                  >Tối thiểu 2 triệu</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> -->

  <!-- Start:: background  -->
  <section class="tc-background">
    <div class="container">
      <div class="tc-background__img"></div>
    </div>
  </section>
  <!-- End:: background  -->

  <!-- Start:: product list -->
  <section class="products pb-500">
    <div class="container">
      <div class="products__header">
        <h1 class="d-block">Sản phẩm của</h1>
        <img
          src="/resource1/home1_creativeAgency/assets/img/logo_wh.svg"
          alt=""
        />
      </div>

      <div class="products__title">
        <h1 class="text-gradient-purple">
          Tích luỹ dễ dàng, lợi nhuận hấp dẫn
        </h1>
        <span
          >Đa dạng nhu cầu. Thời gian tích luỹ linh động. Bắt đầu chỉ từ 50.000
          VND</span
        >
      </div>

      <div class="products__list">
        <div class="products__item">
          <div class="products__item-img">
            <img
              src="/resource/images/inifiltti.svg"
              alt=""
              class="img-cover"
            />
          </div>

          <div class="products__item-content">
            <div class="products__item-content-relative">
              <div class="products__item-content__title">
                <h2>Tích luỹ linh hoạt</h2>
                <span>Không giới hạn đầu tư</span>
              </div>

              <div class="products__item-content__date">
                <div
                  class="d-flex align-items-center justify-content-between gap-3"
                  style="width: 100%"
                >
                  <h2>KỲ HẠN TÍCH LUỸ</h2>
                  <span>Không kỳ hạn</span>
                </div>

                <div
                  class="d-flex align-items-center justify-content-between gap-3"
                  style="width: 100%"
                >
                  <h2>Lợi nhuận</h2>
                  <span>4% / năm</span>
                </div>
              </div>

              <div class="products__item-content__links">
                <div class="products__item-content__links-tag">
                  <a href="">#Lợi nhuận hàng ngày</a>
                </div>
                <div class="products__item-content__links-tag">
                  <a href="">#Nạp/rút linh hoạt</a>
                </div>
              </div>

              <div class="circle-bottom"></div>
            </div>
          </div>
        </div>
        <div class="products__item">
          <div class="products__item-img">
            <img
              src="/resource/images/money_hand.svg"
              alt=""
              class="img-cover"
            />
          </div>

          <div class="products__item-content">
            <div class="products__item-content-relative">
              <div class="products__item-content__title">
                <h2>Tích luỹ theo tháng</h2>
                <span>Tối thiểu 2 triệu</span>
              </div>

              <div class="products__item-content__date">
                <div
                  class="d-flex align-items-center justify-content-between gap-3"
                  style="width: 100%"
                >
                  <h2>KỲ HẠN TÍCH LUỸ</h2>
                  <span>1 Tháng</span>
                </div>

                <div
                  class="d-flex align-items-center justify-content-between gap-3"
                  style="width: 100%"
                >
                  <h2>Lợi nhuận</h2>
                  <span>5%/ năm</span>
                </div>
              </div>

              <div class="products__item-content__links">
                <div class="products__item-content__links-tag">
                  <a href="">#Lợi nhuận hàng ngày</a>
                </div>
                <div class="products__item-content__links-tag">
                  <a href="">#Nạp/rút linh hoạt</a>
                </div>
              </div>

              <div class="circle-bottom"></div>
            </div>
          </div>
        </div>
        <div class="products__item">
          <div class="products__item-img">
            <img src="/resource/images/pig-icon.svg" alt="" class="img-cover" />
          </div>

          <div class="products__item-content">
            <div class="products__item-content-relative">
              <div class="products__item-content__title">
                <h2>Tích luỹ theo kỳ</h2>
                <span>Tối thiểu 5 triệu</span>
              </div>

              <div class="products__item-content__date">
                <div
                  class="d-flex align-items-center justify-content-between gap-3"
                  style="width: 100%"
                >
                  <h2>KỲ HẠN TÍCH LUỸ</h2>
                  <span>3-8 tháng</span>
                </div>

                <div
                  class="d-flex align-items-center justify-content-between gap-3"
                  style="width: 100%"
                >
                  <h2>Lợi nhuận</h2>
                  <span>6%/ năm</span>
                </div>
              </div>

              <div class="products__item-content__links">
                <div class="products__item-content__links-tag">
                  <a href="">#Lợi nhuận hàng ngày</a>
                </div>
                <div class="products__item-content__links-tag">
                  <a href="">#Nạp/rút linh hoạt</a>
                </div>
              </div>

              <div class="circle-bottom"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="products__footer">
        <button class="products__read-more">Tìm hiểu ngay</button>
      </div>
    </div>
  </section>
  <!-- End:: product list -->

  <!-- Begin:  partner-->
  <section class="tc-partner">
    <div class="container">
      <div class="title">
        Đối tác đồng hành <span class="text-gradient-green">uy tín</span>
      </div>
      <div class="fw-500 mb-30">
        Được định hướng bởi sứ mệnh dẫn đầu. Đi cùng là những đối tác uy tín
        trên thị trường của FINRA
      </div>
      <div class="row mt-100">
        <div
          class="col-12 col-lg-4 d-flex flex-column align-items-center gap-3"
        >
          <a class="d-block" href="">
            <img
              src="/resource1/home1_creativeAgency/assets/img/ups_logo.svg"
              alt="youtube icon"
            />
          </a>
          <div class="partner_des">
            Đối tác chiến lược sản phẩm cùng sàn chứng khoán UP Securities, đem
            tới sự đa dạng về sản phẩm
          </div>
        </div>

        <div
          class="col-12 col-lg-4 d-flex flex-column align-items-center gap-3"
        >
          <a
            class="d-block"
            href="https://tornadoinvest.com.vn"
            target="_blank"
          >
            <img
              src="/resource1/home1_creativeAgency/assets/img/f1_logo.svg"
              alt="youtube icon"
            />
          </a>
          <div class="partner_des">
            F1 trading là công ty dẫn đầu tại Việt Nam trong lĩnh vực đầu tư
            phái sinh hàng hóa quốc tế với tiềm năng tăng trưởng cao
          </div>
        </div>

        <div
          class="col-12 col-lg-4 d-flex flex-column align-items-center gap-3"
        >
          <a class="d-block" href="https://bidv.com.vn" target="_blank">
            <img
              src="/resource1/home1_creativeAgency/assets/img/bidv_logo.svg"
              alt="youtube icon"
            />
          </a>
          <div class="partner_des">
            Ngân hàng BIDV là đối tác cung cấp giải pháp thanh toán an toàn và
            bảo mật cho người dùng của Finra
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End:  partner-->

  <!-- Start:: FAQ -->
  <section class="tc-faq">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <h1 class="faq-header">Các bạn hỏi?</h1>
          <span class="faq-sub-header">FINRA trả lời</span>
        </div>
        <div class="col-8">
          <div class="dropdown">
            <div class="dropdown-item">
              <div class="faq-question">
                <h2>FINRA là ai?</h2>
                <div class="arrow-icon" style="transform: rotate(45deg);">
                  <img
                    src="/resource/images/Arrow-right.svg"
                    alt=""
                    class="img-cover"
                  />
                </div>
              </div>

              <div class="faq-answer">
                Finra là ứng dụng đầu tư và quản lý tài chính thông minh giúp
                bạn dễ dàng tích lũy, đầu tư và quản lý tài chính cá nhân để tự
                tin xây dựng tương lai tài chính vững vàng.
              </div>
            </div>
            <div class="dropdown-item">
              <div class="faq-question">
                <h2>Làm thế nào để mở tài khoản Finra?</h2>
                <div class="arrow-icon">
                  <img
                    src="/resource/images/Arrow-right.svg"
                    alt=""
                    class="img-cover"
                  />
                </div>
              </div>

              <div class="faq-answer d-none">
                Finra là ứng dụng đầu tư và quản lý tài chính thông minh giúp
                bạn dễ dàng tích lũy, đầu tư và quản lý tài chính cá nhân để tự
                tin xây dựng tương lai tài chính vững vàng.
              </div>
            </div>

            <div class="dropdown-item">
              <div class="faq-question">
                <h2>Finra có uy tín không?</h2>
                <div class="arrow-icon">
                  <img
                    src="/resource/images/Arrow-right.svg"
                    alt=""
                    class="img-cover"
                  />
                </div>
              </div>

              <div class="faq-answer d-none">
                Finra là ứng dụng đầu tư và quản lý tài chính thông minh giúp
                bạn dễ dàng tích lũy, đầu tư và quản lý tài chính cá nhân để tự
                tin xây dựng tương lai tài chính vững vàng.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End:: FAQ -->
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "home",
  components: {},
  setup(props, ctx) {
    const active = ref(1);

    return {
      active,
    };
  },
});
</script>
<style>
.tc-background {
  padding-top: 160px;
}

.tc-background .tc-background__img {
  background-image: url("/resource/images/beautiful-cryptocurrwncy-concept.png");
  width: 100%;
  padding-top: 40%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;
}

.tc-partner {
  margin: 0 0 160px;
}

.tc-partner .partner_des {
  color: #2b3648;
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0.2px;
}

.sub-title {
  background: var(
    --111,
    linear-gradient(239deg, #c06ae4 9.03%, #4d24c6 85.56%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: SVN-Poppins;
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: 64px;
  letter-spacing: 0.2px;
}

.title-outstanding-platform ul {
  margin-bottom: 24px;
  margin-top: 24px;
  margin-left: 20px;
  list-style: disc;
}

.title-outstanding-platform ul li {
  color: #2b3648;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0.2px;
}

.content-outstanding-platform {
  color: #2b3648;
  font-size: 20px !important;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  /* 160% */
  letter-spacing: 0.2px;
}
.end-content {
  margin-top: 96px;
  color: #000;
  font-size: 24px;
  font-style: italic;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.2px;
}

/* Start::  tc-testimonials-st10*/

/* End::  tc-testimonials-st10*/
</style>
