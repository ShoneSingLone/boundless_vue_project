<template>
	<transition name="popup-slide-up">
		<div class="ebook-popup-list" v-if="fontFamilyVisible">
			<div class="ebook-popup-title">
				<div class="ebook-popup-title-icon" @click="hide">
					<span class="icon-down2"></span>
				</div>
				<span class="ebook-popup-title-text">{{ $t("book.selectFont") }}</span>
			</div>
			<div class="ebook-popup-list-wrapper">
				<div class="ebook-popup-item" v-for="(item, index) of fontFamily" :key="index" @click="setFontFamily(item.font)">
					<div class="ebook-popup-item-text" :class="{ selected: isSelected(item) }">
						{{ item.font }}
					</div>
					<div class="ebook-popup-item-check" v-if="isSelected(item)">
						<span class="icon-check"></span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default async function () {
	const { ebookMixin } = await _.$importVue("@/utils/mixin.vue");
	const { FONT_FAMILY } = await _.$importVue("@/utils/book.vue");
	const { saveFontFamily } = await _.$importVue("@/utils/localStorage.vue");
	return {
		mixins: [ebookMixin],
		data() {
			return {
				fontFamily: FONT_FAMILY
			};
		},
		methods: {
			isSelected(item) {
				return this.defaultFontFamily === item.font;
			},
			hide() {
				this.setFontFamilyVisible(false);
			},
			setFontFamily(font) {
				this.setDefaultFontFamily(font);
				saveFontFamily(this.fileName, font);
				if (font === "Default") {
					this.currentBook.rendition.themes.font("Times New Roman");
				}
				this.currentBook.rendition.themes.font(font);
			}
		}
	};
}
</script>
