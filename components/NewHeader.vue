<template>
  <nav class="navbar navbar-expand-lg navbar-light sub-font tc-navbar-st1">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img
          src="/resource1/home1_creativeAgency/assets/img/logo.svg"
          alt=""
          class="logo"
        />
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="open = !open"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse navbar-collapse-pc" id="">
        <ul class="navbar-nav">
          <li class="nav-item">
            <nuxt-link to="/ve-chung-toi" class="nav-link">
              Về chúng tôi
            </nuxt-link>
          </li>
          <li class="nav-item">
            <p class="nav-link">Sản phẩm & dịch vụ</p>
            <div class="dropdown-menu">
              <nuxt-link href="/dich-vu/kkh" class="dropdown-item"
                >Không kỳ hạn</nuxt-link
              >
              <nuxt-link to="/dich-vu/tlck" class="dropdown-item"
                >Tích lũy cuối kỳ</nuxt-link
              >
              <nuxt-link to="/dich-vu/tlht" class="dropdown-item"
                >Tích lũy hàng tháng</nuxt-link
              >
            </div>
          </li>
          <li class="nav-item">
            <nuxt-link to="/tuyen-dung" class="nav-link">
              Tuyển dụng
            </nuxt-link>
          </li>
        </ul>

        <ul class="navbar-nav">
          <!--
					<li class="nav-item">
						<nuxt-link
							to="/tuyen-dung"
							class="nav-link"
						>
							Mở tài khoản
						</nuxt-link>
					</li>
					-->
          <li class="nav-item">
            <button class=" btn-hotline d-flex" style="justify-content: center; align-items: center; gap: 10px;">
              Hotline: 0936.333.663
              
            <div class="" style="width: 28px; height: 28px;">
              <img
            src="/resource1/inner_pages/assets/img/arrow_2.png"
            alt=""
            class="img-cover"
          />
            </div>
            </button>
          </li>
        </ul>
      </div>

      <div
        class="collapse navbar-collapse navbar-collapse-mb"
        id="navbarSupportedContent"
        v-if="open"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/ve-chung-toi"
              >Về chúng tôi</nuxt-link
            >
          </li>
          <li class="nav-item" @click="isDropdownOpen = !isDropdownOpen">
            <p class="nav-link">Sản phẩm & dịch vụ</p>
            <div class="dropdown-menu" v-if="isDropdownOpen">
              <nuxt-link href="/dich-vu/kkh" class="dropdown-item"
                >Không kỳ hạn</nuxt-link
              >
              <nuxt-link to="/dich-vu/tlck" class="dropdown-item"
                >Tích lũy cuối kỳ</nuxt-link
              >
              <nuxt-link to="/dich-vu/tlht" class="dropdown-item"
                >Tích lũy hàng tháng</nuxt-link
              >
            </div>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/tuyen-dung">Tuyển dụng</nuxt-link>
          </li>
          <!--
					<li class="nav-item">
						<a
							class="nav-link"
							href="../inner_pages/about.html"
							>Mở tài khoản </a
						>
					</li>
					-->
          <li class="nav-item">
            <button class=" btn-hotline d-flex" style="justify-content: center; align-items: center; gap: 10px;">
              Hotline: 0936.333.663
              
            <div class="" style="width: 28px; height: 28px;">
              <img
            src="/resource1/inner_pages/assets/img/arrow_2.png"
            alt=""
            class="img-cover"
          />
            </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "new-header",
  components: {},
  setup(props, ctx) {
    const open = ref(false);
    const isDropdownOpen = ref(false);
    return {
      open,
      isDropdownOpen,
    };
  },
});
</script>
<style scoped>
.btn-hotline{
  border-radius: 16px;
  border: 1px solid, #B65FFC;
  font-family: SVN-Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.2px;
  background: var(--444, linear-gradient(90deg, #B65FFC 0%, #B04FFF 100%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
padding: 10px 24px;
}

.nav-item {
  position: relative;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
}
.dropdown-item {
  font-weight: 600;
}
.dropdown-item:hover {
  color: #b65ffc !important;
}
@media (max-width: 768px) {
  .dropdown-menu {
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: none !important;
  }
}
</style>
