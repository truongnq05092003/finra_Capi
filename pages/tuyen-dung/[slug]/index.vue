<template>
  <div class="career-page-st1">
    <!--  Start header  -->

    <div class="project-page-st1">
      <header class="tc-header-st18">
        <div class="container">
          <div class="fs-6 fw-600">Vị trí</div>
          <div class="title mt-40">
            <div class="row">
              <div class="col-lg-7">
                <h1 class="fsz-50 text-capitalize">{{jobDetail?.name}}</h1>
              </div>
              <div class="col-lg-5">
                <div class="info mt-50">
                  <div
                    class="text fsz-16 fw-500"
                    style="color: rgba(0, 0, 0, 0.77)"
                  >
                    {{jobDetail?.desc}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
    <!--  End header  -->

    <!--Contents-->
    <main>
      <!--  Start section  -->
      <section class="tc-main-img-st20">
        <div class="img">
          <img
            src="/resource1/inner_pages/assets/img/careers/Frame_carrers_detail.png"
            alt=""
          />
        </div>
        <div class="features">
          <div class="container">
            <!-- <div class="content">
              <div class="row">
                <div class="col-lg-3">
                  <div class="item" style="padding: 0 20px">
                    <p class="fsz-16 cr-666 mb-2">FINRA</p>
                    <h6 class="fsz-16 fw-bold">Giám đốc vùng</h6>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="item" style="padding: 0 20px">
                    <p class="fsz-16 cr-666 mb-2">Mã chức danh</p>
                    <h6 class="fsz-16 fw-bold">-</h6>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="item" style="padding: 0 20px">
                    <p class="fsz-16 cr-666 mb-2">Cấp bậc</p>
                    <h6 class="fsz-16 fw-bold">-</h6>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="item" style="padding: 0 20px">
                    <p class="fsz-16 cr-666 mb-2">Bộ phận</p>
                    <h6 class="fsz-16 fw-bold">-</h6>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="item" style="padding: 0 20px">
                    <p class="fsz-16 cr-666 mb-2">Khối/ Ban</p>
                    <h6 class="fsz-16 fw-bold">KHỐI KHCN</h6>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="item" style="padding: 0 20px">
                    <p class="fsz-16 cr-666 mb-2">Phòng ban</p>
                    <h6 class="fsz-16 fw-bold">
                      PHÒNG KINH DOANh (SALE - FINRA)
                    </h6>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="item" style="padding: 0 20px">
                    <p class="fsz-16 cr-666 mb-2">Báo cáo trực tiếp</p>
                    <h6 class="fsz-16 fw-bold">Phó Tổng GĐ</h6>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="item" style="padding: 0 20px">
                    <p class="fsz-16 cr-666 mb-2">Cấp dưới trực tiếp</p>
                    <h6 class="fsz-16 fw-bold">
                      Trưởng phòng Kinh Doanh/ Trưởng nhóm Kinh Doanh
                    </h6>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </section>
      <!--  End section  -->

      <section class="tc-content-st20">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="content">
                <div class="requirements" v-html="jobDetail?.content">
                </div>
              </div>
            </div>
            <div class="col-lg-8 mt-5">
              <div class="send__info">
                <div class="grid grid-cols-8 mt-2">
                  <div>
                    <p>Số điện thoại<span class="text-red">*</span>:</p>
                  </div>
                  <div class="col-span-7">
                    <input type="text" placeholder="Nhập số điện thoại" style="width: 100%" v-model="uPhone"/>
                  </div>
                </div>
                <div class="grid grid-cols-8 mt-4">
                  <div >
                    <p>Email<span class="text-red">*</span>:</p>
                  </div>
                  <div class="col-span-7">
                    <input type="text"  placeholder="Nhập email" style="width: 100%" v-model="uEmail"/>
                  </div>
                </div>
                <div class="btn-apply">
                  <button class="btn btn--primary btn--lg btn-submit mt-4 align-items-center" @click="applyJob"><p>Ứng Tuyển</p></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
    <!--End-Contents-->
  </div>
</template>
<script setup lang="ts">
import type { AxiosInstance } from 'axios';
import { useNuxtApp } from '#app';
import { JobService } from '~/services/JobService';
import type {JobDetail} from "~/types/JobResponse";
import {onMounted} from "vue";

// Get Axios instance from Nuxt app context
const { $axios } = useNuxtApp();
const axiosInstance = $axios as AxiosInstance;
// Create an instance of JobService
const jobService = new JobService(axiosInstance);
const jobDetail = ref<JobDetail>();
const uPhone = ref("");
const uEmail = ref("");

const { slug } = useRoute().params;
const getJobDetail = async () => {
  try{
    const response = await jobService.getJobBySlug(slug);
    if (response.code === 0){
      jobDetail.value = response.data;
    }
  }catch (e) {
    console.error('Failed to fetch job detail:', e);
  }
}

const { $axiosP } = useNuxtApp();
const applyJob = async () => {
  try{
    const response = await $axiosP.post('/public/apply-job', {
      email: uEmail.value,
      phone: uPhone.value,
      job: jobDetail.value?.slug
    })
    if (response.data.code === 0){
      alert("Đăng ký thành công");
    }
  }catch (e) {
    console.error('Failed to apply job:', e);
  }
}

onMounted(async () => {
  await getJobDetail();
})

useSeoMeta({
  title: jobDetail.value?.name,
  ogTitle: jobDetail.value?.name,
  description: jobDetail.value?.desc,
  ogDescription: jobDetail.value?.desc,
  ogImage: jobDetail.value?.image
})
</script>

<style scoped>
.table {
  font-family: "SVN-Poppins" !important;
  overflow: scroll;
}
.send__info{
  border: 2px solid rgba(86,67,128, 0.7) ;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.1);
}
.send__info > div{
  padding: 1rem;
}

.send__info input:focus{
  border-bottom: 1px solid #564380;
  border-radius: 0.3rem;
  padding-bottom: 0.1rem;
}

.btn-apply{
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-apply button{
  background-color: #6732cd;
  background: -webkit-linear-gradient(#3ee5cd, #6732cd);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient( #3ee5cd, #6732cd); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 1.2rem;
}

.text-red{
  color: red;
}

</style>
