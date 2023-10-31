<template>
	<transition name="slide-up">
		<div class="setting-wrapper" v-show="menuVisible && settingVisible === 0">
			<div class="setting-font-size">
				<div
					class="preview"
					:style="{ fontSize: fontSizeList[0].fontSize + 'px' }">
					A
				</div>
				<div
					class="select-wrapper"
					v-for="(item, index) of fontSizeList"
					:key="index"
					:style="
						index === 0 || index === fontSizeList.length - 1 ? flexRadio : ''
					"
					@click="setFontSize(item.fontSize)">
					<div class="line" :style="index === 0 ? noBorder : ''"></div>
					<div class="point-wrapper">
						<div class="point" v-show="defaultFontSize === item.fontSize">
							<div class="small-point"></div>
						</div>
					</div>
					<div
						class="line"
						:style="index === fontSizeList.length - 1 ? noBorder : ''"></div>
				</div>
				<div
					class="preview"
					:style="{
						fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'
					}">
					A
				</div>
			</div>
			<div class="setting-font-family" @click="showFontFamilyPopup">
				<div class="setting-font-family-text-wrapper">
					<span class="setting-font-family-text">{{ defaultFontFamily }}</span>
				</div>
				<div class="setting-font-family-icon-wrapper">
					<span class="icon-forward"></span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default async function () {
	const { FONT_SIZE_LIST } = await _.$importVue("@/utils/book.vue");
	const { saveFontSize } = await _.$importVue("@/utils/localStorage.vue");
	const { ebookMixin } = await _.$importVue("@/utils/mixin.vue");
	return {
		mixins: [ebookMixin],
		data() {
			return {
				fontSizeList: FONT_SIZE_LIST,
				noBorder: {
					borderTop: "none",
					flex: "0 0 0"
				},
				flexRadio: {
					flex: "0.5"
				}
			};
		},
		methods: {
			setFontSize(fontSize) {
				this.setDefaultFontSize(fontSize);
				saveFontSize(this.fileName, fontSize);
				this.currentBook.rendition.themes.fontSize(fontSize + "px");
			},
			showFontFamilyPopup() {
				this.setFontFamilyVisible(true);
			}
		}
	};
}
</script>
