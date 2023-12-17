<template>
	<header class="AppLayoutHeader flex middle">
		<span :click="goToGroup" class="flex middle pointer">
			<xIcon :icon="icon" :style="logoStyle" />
		</span>
		<BreadcrumbNavigation />
		<xGap f />
		<ToolUserBar />
	</header>
</template>

<script>
export default async function () {
	return {
		components: {
			ToolUserBar: () => _.$importVue("@/components/ToolUserBar.vue"),
			BreadcrumbNavigation: () => _.$importVue("@/components/BreadcrumbNavigation.vue")
		},
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
			icon() {
				if (["/api/group", "/wiki", "/xI"].includes(this.$route.path)) {
					return "_yapi_logo";
				}
				return "back_group";
			},
			logoStyle() {
				return { width: "48px", height: "48px" };
			},
			languageLabel() {
				return _.find(this.languageOptions, {
					value: this.language
				}).label;
			}
		},
		methods: {
			goToGroup() {
				this.$router.push("/api/group");
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
