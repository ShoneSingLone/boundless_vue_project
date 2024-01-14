<template>
	<div class="AppLayoutHeader">
		<xIcon img="@/assets/svg/icon_report.svg" style="width: 48px; height: 48px" />
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		methods: {
			handleCommand(value) {
				if (localStorage["X-Language"] !== value) {
					localStorage["X-Language"] = value;
					window.location.reload();
				}
			}
		},
		data() {
			return {
				value1: "",
				languageOptions: [
					{
						label: "中文",
						value: "zh-CN"
					},
					{
						label: "English",
						value: "en-US"
					}
				],
				language: localStorage["X-Language"] || "zh-CN"
			};
		},
		computed: {
			languageLabel() {
				return _.find(this.languageOptions, {
					value: this.language
				}).label;
			}
		},
		mounted() {
			localStorage["X-Language"] = this.language;
		}
	};
}
</script>

<style lang="less">
.AppLayoutHeader {
	display: flex;
	align-items: center;
	height: 64px;
	padding-left: 20px;
	line-height: 44px;
	background-color: var(--el-color-white);
	box-shadow: var(--el-box-shadow-lighter);
	z-index: 1;
}
</style>
