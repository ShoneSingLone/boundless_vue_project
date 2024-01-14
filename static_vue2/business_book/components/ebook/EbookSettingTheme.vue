<template>
	<transition name="slide-up">
		<div class="setting-wrapper" v-show="menuVisible && settingVisible === 1">
			<div class="setting-theme">
				<div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(index)">
					<div class="preview" :style="{ background: item.style.body.background }" :class="{ selected: item.name === defaultTheme }"></div>
					<div class="text" :class="{ selected: item.name === defaultTheme }">
						{{ item.alias }}
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
export default async function () {
	const { ebookMixin } = await _.$importVue("@/utils/mixin.vue");
	const { saveTheme } = await _.$importVue("@/utils/localStorage.vue");
	return {
		mixins: [ebookMixin],
		methods: {
			setTheme(index) {
				const theme = this.themeList[index];
				this.setDefaultTheme(theme.name).then(() => {
					this.currentBook.rendition.themes.select(this.defaultTheme);
				});
				saveTheme(theme.name);
				this.initGlobalStyle();
			}
		}
	};
}
</script>
