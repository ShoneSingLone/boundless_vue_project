<template>
	<div>
		<ebook-setting-font />
		<ebook-setting-theme />
		<ebook-setting-progress />
		<transition name="slide-up">
			<div
				class="menu-wrapper"
				:class="{ 'hide-box-shadow': !menuVisible || settingVisible >= 0 }"
				v-show="menuVisible">
				<div class="icon-wrapper">
					<span class="icon-menu icon" @click="showSetting(3)"></span>
				</div>
				<div class="icon-wrapper">
					<span class="icon-progress" @click="showSetting(2)"></span>
				</div>
				<div class="icon-wrapper">
					<span class="icon-bright" @click="showSetting(1)"></span>
				</div>
				<div class="icon-wrapper">
					<span class="icon-A" @click="showSetting(0)"></span>
				</div>
			</div>
		</transition>
		<ebook-setting-font-popup />
		<ebook-slide />
	</div>
</template>

<script>
export default async function () {
	const EbookSettingFont = await _.$importVue("./EbookSettingFont.vue");
	const EbookSettingFontPopup = await _.$importVue(
		"./EbookSettingFontPopup.vue"
	);
	const EbookSettingTheme = await _.$importVue("./EbookSettingTheme.vue");
	const EbookSettingProgress = await _.$importVue("./EbookSettingProgress.vue");
	const EbookSlide = await _.$importVue("./EbookSlide.vue");
	const { ebookMixin } = await _.$importVue("@/utils/mixin.vue");
	return {
		mixins: [ebookMixin],
		components: {
			EbookSettingFont,
			EbookSettingFontPopup,
			EbookSettingTheme,
			EbookSettingProgress,
			EbookSlide
		},
		methods: {
			showSetting(key) {
				this.setSettingVisible(key);
			}
		}
	};
}
</script>
