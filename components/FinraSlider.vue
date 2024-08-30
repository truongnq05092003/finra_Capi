<template>
  <div class="finra-slider">
    <swiper
      :modules="[SwiperNavigation, SwiperAutoplay]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :speed="1000"
      :space-between="0"
      :initial-slide="vSwiperIndex"
      @swiper="setVSwiperRef"
      @slide-change="updateVSwiperIndex"
    >
      <!-- <swiper-slide>
        <header
          class="tc-header-st1"
          style="
            background-image: url('/resource1/home1_creativeAgency/assets/img/slider-1.png');
          "
        >
          <div class="container">
            <div class="row gx-lg-0">
              <div class="col-lg-8 pb-120">
                <div class="info text-white">
                  <a href="/dich-vu/kkh">
                    <h6 class="text-white">
                    Trải nghiệm đặc biệt tạo nên một
                    <span class="text-finra-primary">FINRA</span> ưu việt
                  </h6>
                  </a>
                  <a href="/dich-vu/kkh">
                    <h1>
                    Giải pháp <br />
                    <span class="text-right text-gradient-green">
                      Đầu tư tài chính
                    </span>
                  </h1>
                  <div class="text fsz-16 col-lg-9 text-white">
                    Finra dẫn đầu về nền tảng công nghệ đầu tư tài chính, tận
                    dụng sáng tạo công nghệ để tư vấn, cung cấp các giải pháp
                    công nghệ đầu tư tài chính cho khách hàng.
                  </div>
                  </a>

                  <div class="btns mt-50 d-flex align-items-center">
                    <button class="primary-btn">
                      <a
                        href="/dich-vu/kkh"
                        class="d-flex align-items-center gap-2 justify-content-center"
                      >
                        Chi tiết
                        <span class="bg-custom-icon">
                          <i class="fa-solid fa-arrow-right custom-icon"></i>
                        </span>
                      </a>
                    </button>
                    <a
                      href="javascript:;"
                      class="text-black fs-6 d-block ms-5 p-2"
                    >
                      <span
                        class="text-white"
                        style="text-decoration: underline"
                      >
                        Liên hệ tư vấn
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </swiper-slide> -->
      <swiper-slide>
        <header
          class="tc-header-st1"
          style="
            background-image: url('/resource1/home1_creativeAgency/assets/img/slider-2.png');
          "
        >
          <div class="container">
            <div class="row gx-lg-0">
              <div class="col-lg-8 pb-120">
                <div class="info text-white">
                  <a href="/tuyen-dung">
                    <h6 class="text-black">
                      Trải nghiệm đặc biệt tạo nên một
                      <span style="color: #2f7bf2">FINRA</span> ưu việt
                    </h6>
                  </a>
                  <a href="/tuyen-dung">
                    <h1 style="color: black !important">
                      Tìm kiếm
                      <!-- <div
                      class="d-inline"
                        ><img
                          src="/resource/images/Search.svg"
                          alt=""
                          class="img-cover"
                      /></div> -->
                      <br />
                      <span
                        class="text-right"
                        style="
                          padding-left: 0 !important;
                          color: #2f7bf2 !important;
                        "
                      >
                        Nhân tài mới cho Finra
                      </span>
                    </h1>
                    <div class="text fsz-16 col-lg-9 text-black">
                      Cùng Finra kiến tạo giải pháp đầu tư tài chính, mở lối
                      tương lai tài chính vững vàng cho người Việt
                    </div>
                  </a>

                  <div class="btns mt-50 d-flex align-items-center">
                    <button class="primary-btn">
                      <a
                        href="/tuyen-dung"
                        class="d-flex align-items-center gap-2 justify-content-center"
                      >
                        Xem tin tuyển dụng
                        <span class="bg-custom-icon">
                          <i class="fa-solid fa-arrow-right custom-icon"></i>
                        </span>
                      </a>
                    </button>
                    <a href="#" class="text-black fs-6 d-block ms-5 p-2">
                      <span
                        class="text-black"
                        style="text-decoration: underline"
                      >
                        Liên hệ tư vấn
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </swiper-slide>
      <!-- <swiper-slide>
        <header
          class="tc-header-st1"
          style="
            background-image: url('/resource1/home1_creativeAgency/assets/img/slider-3.png');
          "
        >
          <div class="container">
            <div class="row gx-lg-0">
              <div class="col-lg-8 pb-120">
                <div class="info text-white">
                  <a href="/ve-chung-toi">
                    <h6 class="text-white">
                    Trải nghiệm đặc biệt tạo nên một
                    <span class="text-finra-primary">FINRA</span> ưu việt
                  </h6>
                  </a>
                  
                  <a href="/ve-chung-toi">
                    <h1>
                    Finra <br />
                    <span
                      class="text-right text-gradient-green"
                      style="padding-left: 0 !important"
                    >
                      VỀ CHÚNG TÔI
                    </span>
                  </h1>
                  <div class="text fsz-16 col-lg-9 text-white">
                    Finra dẫn đầu về nền tảng công nghệ đầu tư tài chính, tận
                    dụng sáng tạo công nghệ để tư vấn, cung cấp các giải pháp
                    công nghệ đầu tư tài chính cho khách hàng.
                  </div>
                  </a>

                  <div class="btns mt-50 d-flex align-items-center">
                    <button class="primary-btn">
                      <a
                        href="/ve-chung-toi"
                        class="d-flex align-items-center gap-2 justify-content-center"
                      >
                        Chi tiết

                        <span class="bg-custom-icon">
                          <i class="fa-solid fa-arrow-right custom-icon"></i>
                        </span>
                      </a>
                    </button>
                    <a href="#" class="text-black fs-6 d-block ms-5 p-2">
                      <span
                        class="text-white"
                        style="text-decoration: underline"
                      >
                        Liên hệ tư vấn
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </swiper-slide> -->
    </swiper>

    <!-- slider nav btn -->
    <div class="finra-btn">
      <div class="container">
        <div class="col-lg-12">
          <div
            class="d-flex align-items-center gap-3 justify-content-center justify-content-lg-start"
          >
            <button class="icon-nav" @click="prevVSwiperSlide">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button class="icon-nav" @click="nextVSwiperSlide">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SwiperAutoplay } from "#imports";
export default defineComponent({
  name: "finra-slider",
  components: {},
  setup(props, ctx) {
    let vSwiperRef: any = null;
    const vSwiperIndex = ref<number>(0);

    const setVSwiperRef = (swiper: any) => {
      vSwiperRef = swiper;
    };

    const handleChangeSlide = (index: number) => {
      vSwiperRef?.slideTo(index);
    };

    const updateVSwiperIndex = () => {
      vSwiperIndex.value = vSwiperRef?.activeIndex || 0;
    };

    const prevVSwiperSlide = () => vSwiperRef?.slidePrev();
    const nextVSwiperSlide = () => vSwiperRef?.slideNext();

    return {
      vSwiperRef,
      vSwiperIndex,
      SwiperAutoplay,
      SwiperNavigation,
      setVSwiperRef,
      updateVSwiperIndex,
      handleChangeSlide,
      prevVSwiperSlide,
      nextVSwiperSlide,
    };
  },
});
</script>

<style>
.finra-slider {
  position: relative;
}

.finra-slider .finra-btn {
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 40px;
}

.finra-slider .justify-content-center {
  justify-content: start !important;
}

@media screen and (max-width: 991px) {
  .finra-slider .finra-btn {
    bottom: 40px !important;
  }

  .finra-slider .justify-content-center {
    justify-content: center !important;
  }
}
</style>
