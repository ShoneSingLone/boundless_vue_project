<template>
	<div class="AppLayoutHeader">
		<xIcon icon="_icon_wiki" style="width: 48px; height: 48px" />
		<!-- <xIcon img="@/assets/svg/icon_wiki.svg" style="width: 48px; height: 48px" /> -->
		<xGap f />
		<xGap f />
		<xItem :configs="language" style="width: 240px" />
		<xGap l />
		<xItem :configs="AppTheme" style="width: 240px" />
		<xGap l />
		<DocThemeToggler :configs="language" style="width: 240px" />
		<!-- <xInput v-model="APP.searchKey" style="width: 200px" placeholder="Search"></xInput> -->
	</div>
</template>

<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			DocThemeToggler: () => _.$importVue("@/components/DocThemeToggler.vue")
		},
		data() {
			return {
				AppTheme: {
					label: "UI主题",
					value: _.$lStorage._doc_app_theme || "默认",
					itemType: "xItemSelect",
					options: [
						{
							label: "默认",
							value: "默认"
						},
						{
							label: "tiny",
							value: "tiny"
						}
					],
					onEmitValue({ val }) {
						_.$setAppTheme(val);
						_.$lStorage._doc_app_theme = val;
					}
				},
				language: {
					label: i18n("语言"),
					value: _.$lStorage._doc_app_lang || "zh-CN",
					itemType: "xItemSelect",
					options: [
						{
							label: "中文",
							value: "zh-CN"
						},
						{
							label: "English",
							value: "en-US"
						}
					],
					onEmitValue({ val }) {
						_.$lStorage._doc_app_lang = val;
						if (localStorage["X-Language"] !== val) {
							localStorage["X-Language"] = val;
							location.reload();
						}
					}
				}
			};
		}
	});
}
</script>

<style lang="less">
.AppLayoutHeader {
	display: flex;
	align-items: center;
	height: 64px;
	padding-left: 20px;
	padding-right: 20px;
	line-height: 44px;
	background-color: var(--el-color-white);
	box-shadow: var(--el-box-shadow-lighter);
	z-index: 1;
}
</style>
