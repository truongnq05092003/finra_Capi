<template>
	<FinraSlider />

	<section class="tc-testimonials-st10">
		<div class="container">
			<div class="content row d-flex justify-content-center">
				<div class="col-lg-12">
					<div class="row justify-content-between flex-column-reverse flex-lg-row">
						<div class="col-lg-5">
							<div class="interest-rate-card">
								<div class="d-flex flex-column justify-content-between align-items-center">
									<div class="title">
										Lãi suất các <span class="text-gradient-purple">kỳ hạn</span>
									</div>
									<div class="time">% trên năm</div>
								</div>

								<div class="d-flex align-items-center justify-content-center w-100">
									<div class="button-group">
										<button :class="['button', active == 1 ? 'active' : '']" @click="active = 1">
											Theo ngày
										</button>
										<button :class="['button', active == 2 ? 'active' : '']" @click="active = 2">
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
									</div>

									<div class="content content-1">
										<div class="d-flex justify-content-around align-items-center item">
											<div>1 tháng</div>
											<div>4.0%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>2 tháng</div>
											<div>-%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>3 tháng</div>
											<div>5.1%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>4 tháng</div>
											<div>5.2%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>5 tháng</div>
											<div>5.3%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>6 tháng</div>
											<div>5.5%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>7 tháng</div>
											<div>-%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>9 tháng</div>
											<div>6.0%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
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
										<div class="d-flex justify-content-around align-items-center item">
											<div>1 tháng</div>
											<div>4.0%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>2 tháng</div>
											<div>-%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>3 tháng</div>
											<div>5.1%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>4 tháng</div>
											<div>5.2%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>5 tháng</div>
											<div>5.3%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>6 tháng</div>
											<div>5.5%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>7 tháng</div>
											<div>-%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>9 tháng</div>
											<div>6.0%</div>
										</div>
										<div class="d-flex justify-content-around align-items-center item">
											<div>12 tháng</div>
											<div>6.5%</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-7 row">
							<div class="col-lg-2 d-flex justify-content-lg-end align-items-start logo-icon">
								<img src="public/resource1/home1_creativeAgency/assets/img/logo_icon.svg" alt="" />
							</div>

							<div class="col-lg-10 d-flex flex-column align-items-start justify-content-between">
								<div class="info wow fadeIn slow position-relative" data-wow-delay="0.2s">
									<div>
										<div class="text fsz-50 cr-777 content-heading">
											Tin cậy với nền tảng <br>
											<span class="sub-title">công nghệ vượt trội</span>
										</div>
										<div class="title-outstanding-platform">
											<ul>
												<li>Đội ngũ chuyên viên giàu kinh nghiệm và chuyên môn</li>
												<li>Giải pháp công nghệ tài chính sáng tạo và số hoá toàn diện</li>
												<li>Đầu tư chuyên nghiệp và dễ dàng</li>
											</ul>
										</div>
										<div>
											<div class=" content-outstanding-platform">
												Chúng tôi không ngừng nỗ lực nghiên cứu phát triển sản phẩm và trải
												nghiệm khách hàng để đưa Finra Capital trở thành thương hiệu được khách
												hàng tin tưởng lựa chọn hàng đầu trong lĩnh vực công nghệ đầu tư tài
												chính!
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

	<section class="tc-blog-st4">
		<div class="container wow fadeIn slow" data-wow-delay="0.2s">
			<div class="title-wrapper">
				<div class="row justify-content-between">
					<div class="col-lg-12">
						<div class="text fsz-16 mt-20">Chúng tôi đem đến sự hấp dẫn trong</div>
						<div class="text title">Sản phẩm cho <span class="text-gradient-purple">bạn</span></div>
					</div>
				</div>
			</div>
			<div class="posts-slider">
				<div class="posts-item">
					<div class="post-overlay">
						<nuxt-link to="/dich-vu/KKH" class="img d-block th-500">
							<img src="/resource1/home1_creativeAgency/assets/img/product_item_1.png" alt=""
								class="img-cover" />
							<div class="post-sub">Nộp/rút linh hoạt</div>
						</nuxt-link>
						<div class="info">
							<div class="tags">
								<div class=""><span>Gói đầu tư</span></div>
							</div>
							<h2 class="fs-1">
								<nuxt-link to="/dich-vu/KKH" class="hover-purple">Tích luỹ linh hoạt</nuxt-link>
							</h2>
							<div class="fs-4 mt-2">
								<nuxt-link to="/dich-vu/KKH" class="hover-purple">Không giới hạn đầu tư</nuxt-link>
							</div>
						</div>
					</div>
				</div>
				<div class="posts-item">
					<div class="post-overlay">
						<nuxt-link to="/dich-vu/TLCK" class="img d-block th-500">
							<img src="/resource1/home1_creativeAgency/assets/img/product_item_2.png" alt=""
								class="img-cover" />
							<div class="post-sub">Nộp/rút linh hoạt</div>
						</nuxt-link>
						<div class="info">
							<div class="tags">
								<div class=""><span>Gói đầu tư</span></div>
							</div>
							<h2 class="fs-1">
								<nuxt-link to="/dich-vu/TLCK" class="hover-purple">Tích luỹ nhận lãi cuối kỳ</nuxt-link>
							</h2>
							<div class="fs-4 mt-2">
								<nuxt-link to="/dich-vu/TLCK" class="hover-purple">Tối thiểu 5 triệu</nuxt-link>
							</div>
						</div>
					</div>
				</div>
				<div class="posts-item">
					<div class="post-overlay">
						<nuxt-link to="/dich-vu/TLHT" class="img d-block th-500">
							<img src="/resource1/home1_creativeAgency/assets/img/product_item_3.png" alt=""
								class="img-cover" />
							<div class="post-sub">Nộp/rút linh hoạt</div>
						</nuxt-link>
						<div class="info">
							<div class="tags">
								<div class=""><span>Gói đầu tư</span></div>
							</div>
							<h2 class="fs-1">
								<nuxt-link to="/dich-vu/TLHT" class="hover-purple">Tích luỹ nhận lãi hàng
									tháng</nuxt-link>
							</h2>
							<div class="fs-4 mt-2">
								<nuxt-link to="/dich-vu/TLHT" class="hover-purple">Tối thiểu 2 triệu</nuxt-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Begin:  partner-->
	<section class="tc-partner mb-100">
		<div class="container">
			<div>
				<a href="#" class="logo">
					<img src="/resource1/home1_creativeAgency/assets/img/logo_wh copy 2.svg" alt="" />
				</a>
			</div>
			<div class="title">
				Sự đồng hành <br />
				của <span class="text-gradient-green">uy tín</span>
			</div>
			<div class="fw-500 mb-30">Đối tác của Finra</div>
			<div class="row">
				<div class="col-12 col-lg-4"></div>
				<div
					class="col-12 col-lg-8 d-flex flex-column flex-lg-row gap-5 align-items-center justify-content-between">
					<div>
						<img src="/resource1/home1_creativeAgency/assets/img/ups_logo.svg" alt="youtube icon" />
					</div>
					<div>
						<a href="https://tornadoinvest.com.vn" target="_blank">
							<img src="/resource1/home1_creativeAgency/assets/img/f1_logo.svg" alt="youtube icon" />
						</a>
					</div>
					<div>
						<a href="https://bidv.com.vn" target="_blank">
							<img src="/resource1/home1_creativeAgency/assets/img/bidv_logo.svg" alt="youtube icon" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- End:  partner-->
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
.sub-title {
	background: var(--111, linear-gradient(239deg, #C06AE4 9.03%, #4D24C6 85.56%));
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
	color: #2B3648;
	font-size: 20px;
	font-style: normal;
	font-weight: 500;
	line-height: 32px;
	letter-spacing: 0.2px;
}
3
.content-outstanding-platform {
	color: #2B3648;
	font-size: 20px !important;
	font-style: normal;
	font-weight: 500;
	line-height: 32px;
	/* 160% */
	letter-spacing: 0.2px;
}
.end-content{
	margin-top: 96px;
	color: #000;
	font-size: 24px;
	font-style: italic;
	font-weight: 600;
	line-height: normal;
	letter-spacing: 0.2px;
}
</style>