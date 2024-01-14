<template></template>

<script lang="ts">
export default async function () {
	const [App, router, store] = await Promise.all([_.$importVue("@/layout/LayoutAppBook.vue"), _.$importVue("@/router.vue"), _.$importVue("@/store/store.vue")]);

	Vue.prototype.$t = Vue.prototype.i18n;
	/* app entry  */
	function setRemBase() {
		debugger;
		const wWidth = $(window).width();
		const rate = wWidth / 375;
		const unit = (16 * rate) / 16;
		$("html").css("font-size", unit + "px");
	}
	debugger;
	$(window)
		.on("resize", setRemBase)
		.on("orientationchange", function () {
			debugger;
			// 这个时候屏幕的尺寸数据还没有变化
			let orientation = window.orientation;
			switch (orientation) {
				case 90:
				case -90:
					orientation = "landscape"; //这里是横屏
					break;
				default:
					orientation = "portrait"; //竖屏
			}
		});
	// 监听屏幕转动
	window.addEventListener("orientationchange", function () {
		debugger;
		// 这个时候屏幕的尺寸数据还没有变化
		let orientation = window.orientation;
		switch (orientation) {
			case 90:
			case -90:
				orientation = "landscape"; //这里是横屏
				break;
			default:
				orientation = "portrait"; //竖屏
		}
	});

	setRemBase();

	return new Vue({
		el: "#app",
		router,
		store,
		async created() {
			$("body").removeClass("x-loading");
		},
		render(h) {
			return h(App);
		}
	});
}
</script>

<style lang="less">
@import url("/@/assets/styles/book_main");

:root {
	--animation-time: 0.4s;
	--animation-type: linear;

	--ratio: 375 / 10;
	--text-large: 18px;
	--text-big: 16px;
	--text-medium: 14px;
	--text-small: 12px;
	--text-tiny: 10px;

	--text-large-lh: 20px;
	--text-big-lh: 18px;
	--text-medium-lh: 16px;
	--text-small-lh: 15px;
	--text-tiny-lh: 12px;

	--text-big-max-height3: 54px;
	--text-medium-max-height3: 48px;
	--text-samll-max-height3: 42px;
	--text-big-max-height2: 36px;
	--text-medium-max-height2: 32px;
	--text-medium-max-height: 16px;
	--text-small-max-height2: 30px;
	--text-small-max-height: 15px;
	--text-tiny-max-height: 12px;
}
</style>
