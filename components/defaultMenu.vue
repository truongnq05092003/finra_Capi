<template>
<button id="toTop" @click="scrollOnTop" v-show="isScrolled">To Top</button>
<header id="up-header" class="up-header">

	<nav class="navbar navbar-expand-lg navbar-bottom">
	  <div class="container">
	    <NuxtLink to="/" class="navbar-brand">
	    <img width="153" height="24" src="/resource/images/logo.svg">
	    </NuxtLink>
	    <!--<a class="navbar-brand" href="#"><img width="153" height="24" src="/resource/images/logo-up.png"></a>-->
	    <button class="navbar-toggler" @click="toggleMenu" style="outline: none;box-shadow:none !important;" 
		type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
		aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	      <span class="navbar-toggler-icon"><i class="fas fa-bars" aria-hidden="true"></i></span>
	    </button>
	    <a href="#" class="d-block d-lg-none btn btn-open-account">Mở tài khoản</a>
	    <a href="#" class="d-none d-sm-block d-lg-none btn btn-log-in">Log In</a>
	    <div class="collapse navbar-collapse" id="up-nav-bottom">
	    	<ul class="navbar-nav align-items-center">
	    		<li class="nav-item"><a href="#" class="nav-link">Về Chúng tôi</a></li>
	    		
                <li class="nav-item dropdown"><a href="#" class="nav-link dropdown-toggle" id="nav-technology"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sản Phẩm & Dịch Vụ</a>
                   
                </li>
				
				
				
				<li class="nav-item dropdown"><a href="javascript:;" class="nav-link dropdown-toggle" id="nav-technology"
	    		data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tuyển Dụng</a>
                    
                </li>
				<!--
				<li class="nav-item dropdown d-none d-lg-block">
					<a href="#" class="nav-link nav-login dropdown-toggle" id="nav-log-in" data-bs-toggle="dropdown"
					aria-haspopup="true" aria-expanded="false">Đăng nhập</a>
               
                </li>
				<li class="nav-item dropdown d-none d-lg-block">
					<a href="#" class="nav-link nav-open-account dropdown-toggle" id="nav-open-account" data-bs-toggle="dropdown"
					aria-haspopup="true" aria-expanded="false">Mở tài khoản</a>
				
				</li>
				-->
	    	</ul>
	    </div>
	  </div>
	</nav>
</header>
<div class="menu-mobile d-lg-none" :class="{ opened: isMenuOpened }">
    <div class="close-button"><a href="javascript:void(0);" target="_self" @click="closeMenu" :class="{ opened: isMenuOpened }" class="btn-close" aria-label="Close Menu"><i class="fas fa-times"></i></a></div>
    <div class="logo-container">
    	<a href="/" class="brand-logo" aria-label="Interactive Brokers Home">
    		<img width="153" height="24" src="/resource/images/logo.svg">
    		<span>UP Securities</span>
    	</a>
    </div>
    <div class="search-container">
        <div class="search-box">
            <form action="" method="get" class="search_form" id="search_form_id">
                <input type="text" class="form-control" placeholder="Tìm kiếm" name="query" maxlength="64" autocomplete="off" id="searchFieldMobile" aria-label="Search">
                <button type="submit" class="btn-search-submit" value="" id="searchsubmitMobile" aria-label="Submit Search"><i class="fas fa-search" aria-hidden="true"></i></button>
            </form>
        </div>
    </div>
    <ul>
		
		<li class="nav-item">
			<a href="javascript:;">Về chúng tôi</a>	        
	    </li>
	    <li class="nav-item">
			<a href="javascript:;">Sản phẩm & Dịch vụ</a>	        
	    </li>
	    <li class="nav-item">
			<a href="javascript:;">Tuyển Dụng</a>	        
	    </li>
	    
	    <!--
	    <li class="has-submenu"><a href="#" data-submenu="submenu-language">Language</a>
	        <div class="submenu" id="submenu-language">
	            <p class="nav-link-back"><a href="javascript:void(0);" target="_self" data-submenu-close="submenu-language">Back</a></p>
	            <p class="submenu-title">LANGUAGE</p>
	            <ul>
	            <li><a href="#">English</a></li>
	            <li><a href="#">Español</a></li>
	            <li><a href="#">Português</a></li>
	            <li><a href="#">中文简体</a></li>
	            <li><a href="#">中文繁體</a></li>
	            </ul>
	        </div>
	    </li>
	    -->
    </ul>
</div>
<div class="website-overlay d-lg-none" @click="closeMenu" :class="{ opened: isMenuOpened }"></div>
</template>
<script>
export default {
  data() {
    return {
      isMenuOpened: false,
      // isSubMenuOpened: false,
      isScrolled: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY >= 10;
    },
    scrollOnTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    toggleMenu() {
      this.isMenuOpened = !this.isMenuOpened;
    },
    closeMenu() {
      this.isMenuOpened = false;
    },
	 openSubMenu(submenuId) {
      const submenu = document.getElementById(submenuId);
      submenu.classList.add('opened');
    },
    closeSubMenu(submenuId) {
      const submenu = document.getElementById(submenuId);
      submenu.classList.remove('opened');
    },
    isSubMenuOpened(submenuId) {
      const submenu = document.getElementById(submenuId);
      return submenu.classList.contains('opened');
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>