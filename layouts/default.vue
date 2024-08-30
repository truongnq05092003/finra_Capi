<template>
	<div>
		<!-- <DefaultMenu /> -->
		<!-- <DefaultHeader /> -->
		<NewHeader />
		<div
			class="scroll-to-top"
			id="toTop"
		>
			<i class="fa fa-arrow-up"></i>
		</div>
		<slot />
		<DefaultFooter />
	</div>
</template>
<script setup lang="ts">
import FinraSlider from "~/components/FinraSlider.vue";
const config = useRuntimeConfig();
//const dataFetch = await $fetch('https://jsonplaceholder.typicode.com/photos')
//console.log(dataFetch)
useHead({
	meta: [
		{
			name: "viewport",
			content: "width=device-width, initial-scale=0.8, maximum-scale=0.8",
		},
	],
	link: [
		{
			rel: "canonical",
			href: config.public.hostBaseUrl,
		},
		{
			key: 1,
			rel: "icon",
			type: "image/svg+xml",
			href: "/resource/images/finra_fav.svg",
		},
		{ rel: "stylesheet", type: "text/css", href: "/resource/css/bootstrap.min.css" },
		{ rel: "stylesheet", type: "text/css", href: "/resource/css/all.min.css" },
		{ rel: "stylesheet", type: "text/css", href: "/resource1/common/css/common_style.css" },
		// { rel: "stylesheet", type: "text/css", href: "/resource/css/up_style.css" },
		{ rel: "stylesheet", type: "text/css", href: "/resource1/home1_creativeAgency/assets/css/home_1_style.css" },
		{ rel: "stylesheet", type: "text/css", href: "/resource1/inner_pages/assets/css/inner_pages.css" },
	],
	script: [],
});

let title = "FINRA Capital - Giải pháp đầu tư tài chính ưu việt";
let description = "Finra dẫn đầu về nền tảng công nghệ đầu tư tài chính, tận ";
description += "dụng sáng tạo công nghệ để tư vấn, cung cấp các giải pháp ";
description += "công nghệ đầu tư tài chính cho khách hàng";
let ogImg = config.public.hostBaseUrl + "/resource/billboard_1200_600.jpg";

useSeoMeta({
	title: title,
	ogTitle: title,
	description: description,
	ogDescription: description,
	ogType: "article",
	ogImage: ogImg,
	ogUrl: config.public.hostBaseUrl,
});

onMounted(() => {
	$(window).scroll(function () {
		if ($(window).scrollTop() >= 10) {
			$("#toTop").show();
		} else {
			$("#toTop").hide();
		}
	});
	function ScrollOnTop() {
		$("html,body").animate(
			{
				scrollTop: 0,
			},
			"fast"
		);
	}
	$("#toTop").click(function () {
		ScrollOnTop();
	});
	$(".navbar-toggler").click(function () {
		$(".menu-mobile").addClass("opened");
		$(".website-overlay").addClass("opened");
	});
	$(".website-overlay, .btn-close").click(function () {
		$(".menu-mobile").removeClass("opened");
		$(".website-overlay").removeClass("opened");
	});

	$(".menu-open-account").click(function () {
		$(".submenu").addClass("opened");
	});
	$(".nav-link-back").click(function () {
		$(".submenu").removeClass("opened");
	});
	// SET MATCH MEDIA BREAKPOINT
	var mqSm = window.matchMedia("(max-width:767.98px)");
	var mqLg = window.matchMedia("(min-width:768px) and (max-height:1299.98px)");
	var mqV = window.matchMedia("(min-width:768px) and (min-height:1300px)");
	$(document).ready(function () {
		$(".social-sidebar span").click(function () {
			$(".social-sidebar div").toggleClass("social-sidebar-hide");
			$(".social-sidebar span").toggleClass("toggle-arrow");

			var checkBootstrap = setInterval(heroSize, 500);
			function heroSize() {
				var bootstrap_enabled = typeof $().carousel == "function";
				if ((bootstrap_enabled = true)) {
					// Set Carousel Speed
					$("#carouselBannerAds").carousel({
						interval: 5000,
					});
					// HERO IMAGE RESIZE
					if (mqSm.matches) {
						// Smaller than tablet
						// DEACTIVE HERO BANNER
						$("#carouselBannerAds").removeClass("carousel slide");
						$("#carouselBannerAds").removeAttr("data-bs-ride", "carousel");
						$("#carouselBannerAds").carousel("pause");
					} else if (mqLg.matches) {
						// tablet size and larger
						// setHeroHeight();
					} else if (mqV.matches) {
						$("#carouselBannerAds").addClass("carousel slide");
						$("#carouselBannerAds").attr("data-bs-ride", "carousel");
						$("#carouselBannerAds").carousel("cycle");
						$("#hero-carousel").removeAttr("style");
					}
					// Clear Set Interval Once bootstrap_enabled returns true
					clearInterval(checkBootstrap);
					checkBootstrap = null;
				}
			}
			$(window).resize(function () {
				// ACTIVATE/DEACTIVE HERO BANNER
				if (mqSm.matches) {
					$("#carouselBannerAds").removeClass("carousel slide");
					$("#carouselBannerAds").removeAttr("data-bs-ride", "carousel");
					$("#carouselBannerAds").carousel("pause");
					$("#hero-carousel").removeAttr("style");
				} else if (mqLg.matches) {
					$("#carouselBannerAds").addClass("carousel slide");
					$("#carouselBannerAds").attr("data-bs-ride", "carousel");
					$("#carouselBannerAds").carousel("cycle");
					//setHeroHeight();
				} else if (mqV.matches) {
					$("#carouselBannerAds").addClass("carousel slide");
					$("#carouselBannerAds").attr("data-bs-ride", "carousel");
					$("#carouselBannerAds").carousel("cycle");
					$("#hero-carousel").removeAttr("style");
				}
			});
		});
	});
});
</script>
<style scoped>
.scroll-to-top {
	border: 1px solid #b65ffc;
	position: fixed;
	bottom: 20px;
	right: 20px;
	padding: 10px 15px;
	background-color: #fff;
	color: #b65ffc;
	cursor: pointer;
	z-index: 9999;
}
</style>
