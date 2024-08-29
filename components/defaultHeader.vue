<template>
	<section
		class="hero-carousel"
		id="hero-carousel"
		style="margin-top: 80.42px"
	>
		<div
			id="carouselBannerAds"
			class="carousel slide"
			data-bs-ride="carousel"
		>
			<div class="carousel-indicators d-none d-md-flex">
				<button
					type="button"
					data-bs-target="#carouselBannerAds"
					data-bs-slide-to="0"
					class="carousel-indicator-screener active"
					aria-current="true"
					aria-label="Slide 1"
				></button>
				<button
					type="button"
					data-bs-target="#carouselBannerAds"
					data-bs-slide-to="1"
					class="carousel-indicator-ibkr-desktop"
					aria-label="Slide 2"
				></button>
				<button
					type="button"
					data-bs-target="#carouselBannerAds"
					data-bs-slide-to="2"
					class="carousel-indicator-overnight-trading"
					aria-label="Slide 3"
				></button>
			</div>
			<div class="carousel-inner">
				<div class="carousel-item carousel-screener active">
					<div class="hero-img-cropping-wrapper">
						<img
							src="/resource/images/banner_image.png"
							width="1600"
							height="1050"
						/>
					</div>
					<div class="container">
						<div class="row align-items-xl-center">
							<div class="col-12 col-lg-5 col-xl-7">
								<div class="hero-content">
									<h1 class="hero-headline">Trải nghiệm đặc biệt tạo nên một</h1>
									<h1>FINRA ưu việt</h1>
									<p class="hero-subhead">Giải pháp Đầu tư tài chính</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item carousel-ibkr-desktop">
					<div class="hero-img-cropping-wrapper">
						<img
							src="/resource/images/banner-home-sp-dv.jpg"
							width="1600"
							height="1050"
						/>
					</div>
					<div class="container">
						<div class="row align-items-xl-center">
							<div class="col-12 col-lg-5 col-xl-7">
								<div class="hero-content">
									<h1 class="hero-headline">The Future of Desktop Trading. Today.</h1>
									<p class="hero-subhead">
										Built from the ground up, IBKR Desktop combines the best of our proven features
										with a unique set of groundbreaking tools in a streamlined, intuitive interface
										that's easy to navigate.
									</p>
									<p class="hero-subhead">
										Seeing is believing. <strong>Download IBKR Desktop</strong> to experience the
										future of trading today.
									</p>
									<div class="hero-cta">
										<a
											style="border-radius: 0 !important"
											class="btn-secondary btn"
											href="#"
											>Learn More</a
										>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item carousel-overnight-trading">
					<div class="hero-img-cropping-wrapper">
						<img
							src="/resource/images/about.jpg"
							width="1600"
							height="1050"
						/>
					</div>
					<div class="container">
						<div class="row align-items-xl-center">
							<div class="col-12 col-lg-7 col-xl-6">
								<div class="hero-content">
									<h1 class="hero-headline">Trade US Stocks and Options Around the Clock</h1>
									<p class="hero-subhead">
										React immediately to market-moving news and trade over 10,000 US Stocks and
										ETFs, plus US Equity Index options, when it’s convenient for you.
									</p>
									<div class="hero-cta">
										<a
											style="border-radius: 0 !important"
											class="btn btn-secondary"
											href="#"
											>Learn More</a
										>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
